import { test } from 'node:test';
import assert from 'node:assert/strict';
import { absoluteHead, absoluteUrl, articleListPath, publicOrigin } from '../lib/public-url';
import { parseLexical, safeUrl, articleSearchSchema } from './payload';
import { boundedText, cmsConfig, fetchCms, type SharedCache } from './payload-transport';
import { invalidationScope, verifyEditorialSignature } from './editorial-events';
const cfg = { baseUrl: 'https://cms.test', path: '/api/articles', ttl: 60, timeout: 1000, namespace: 'test', revisionPath: '/api/editorial-revision' };
function cacheFixture() {
 const values = new Map<string, Response>();
 const cache: SharedCache = { match: async r => values.get(r.url)?.clone(), put: async (r,v) => { values.set(r.url,v.clone()); } };
 return { values, cache };
}
test('public URLs reject unsafe origins and absolute paths', () => {
 assert.throws(() => publicOrigin('http://example.test'));
 assert.throws(() => publicOrigin('https://user:pass@example.test'));
 assert.throws(() => publicOrigin('https://example.test/path'));
 assert.throws(() => absoluteUrl('//evil.test'));
 assert.equal(absoluteUrl('/artigos', 'https://portal.test'), 'https://portal.test/artigos');
});
test('pagination and category retain self canonical; alternate sort shares collection', () => {
 assert.equal(articleListPath(articleSearchSchema.parse({page:2,category:'direitos',sort:'publishedAt'})), '/artigos?category=direitos&page=2');
 assert.equal(articleListPath(articleSearchSchema.parse({})), '/artigos');
});
test('runtime head normalizes canonical, OG and breadcrumbs but not stylesheet', () => {
 const head = absoluteHead('https://portal.test', () => ({ links: [{rel:'canonical',href:'https://lawsp.lovable.app/artigos'},{rel:'stylesheet',href:'/src/styles.css'}], meta:[{property:'og:url',content:'/artigos'}], scripts:[{type:'application/ld+json',children:JSON.stringify({item:'/artigos'})}] }));
 assert.equal(head.links[0]?.href,'https://portal.test/artigos');
 assert.equal(head.links[1]?.href,'/src/styles.css');
 assert.equal(JSON.parse(head.scripts[0]?.children ?? '{}').item,'https://portal.test/artigos');
});
test('Lexical never emits empty, HTTP external, CMS-relative or unsupported relation links', () => {
 const link = (fields: unknown) => ({type:'link',fields,children:[{type:'text',text:'Link'}]});
 for (const fields of [{url:''},{url:'http://external.test'},{linkType:'internal',doc:{relationTo:'users',value:{slug:'admin'}}}]) assert.equal(parseLexical([link(fields)],'https://cms.test')[0]?.type,'text');
 assert.equal(parseLexical([link({url:'/contato'})],'https://cms.test')[0]?.url,'https://lawsp.lovable.app/contato');
 assert.equal(parseLexical([link({linkType:'internal',doc:{relationTo:'articles',value:{slug:'publicado'}}})],'https://cms.test')[0]?.url,'https://lawsp.lovable.app/artigos/publicado');
 assert.equal(safeUrl(''),undefined);
 assert.throws(() => parseLexical([{type:'html',text:'unsafe'}],'https://cms.test'));
});
test('unvalidated content never enters cache', async () => {
 const {cache,values} = cacheFixture();
 await assert.rejects(() => fetchCms({baseUrl:cfg.baseUrl,path:cfg.path,ttl:cfg.ttl,timeout:cfg.timeout,namespace:cfg.namespace},new URLSearchParams(),cache,async () => Response.json({bad:true}),true,() => {throw new Error('invalid');}));
 assert.equal(values.size,0);
});
test('bounded reader rejects declared and streaming excess', async () => {
 await assert.rejects(() => boundedText(new Response('long',{headers:{'content-length':'999'}}),3));
 await assert.rejects(() => boundedText(new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode('long'));c.close();}})),3));
});
test('every editorial event invalidates detail, lists, categories and home including old slug', () => {
 for (const operation of ['publish','update','withdraw','delete','rename','category']) {
  const scope=invalidationScope({id:'event',revision:'2',operation,slug:'new',previousSlug:'old'});
  assert.deepEqual(scope.collections,['articles','categories','home']); assert.deepEqual(scope.slugs,['new','old']);
 }
});
test('revision invalidates all cached query variants without deploy', async () => {
 const {cache}=cacheFixture(); let revision='1', calls=0;
 const fetcher:typeof fetch=async input => new URL(String(input)).pathname===cfg.revisionPath ? Response.json({revision}) : (calls++,Response.json({revision}));
 for(const query of [new URLSearchParams(),new URLSearchParams({page:'2'}),new URLSearchParams({'where[slug][equals]':'old'})]) {
  await fetchCms(cfg,query,cache,fetcher); await fetchCms(cfg,query,cache,fetcher);
 }
 assert.equal(calls,3); revision='2';
 await fetchCms(cfg,new URLSearchParams(),cache,fetcher); assert.equal(calls,4);
});
test('withdrawal during origin read rejects old content and never caches it', async () => {
 const {cache,values}=cacheFixture(); let revision='1';
 const fetcher:typeof fetch=async input => {
  if(new URL(String(input)).pathname===cfg.revisionPath) return Response.json({revision});
  revision='2'; return Response.json({title:'withdrawn'});
 };
 await assert.rejects(() => fetchCms(cfg,new URLSearchParams(),cache,fetcher)); assert.equal(values.size,0);
});
test('revision failure never falls back to cached success', async () => {
 const {cache}=cacheFixture(); let fail=false;
 const fetcher:typeof fetch=async input => new URL(String(input)).pathname===cfg.revisionPath ? fail ? new Response('',{status:503}) : Response.json({revision:'1'}) : Response.json({docs:[]});
 await fetchCms(cfg,new URLSearchParams(),cache,fetcher); fail=true;
 await assert.rejects(() => fetchCms(cfg,new URLSearchParams(),cache,fetcher));
});
test('signature helper rejects forgery and expired timestamps', async () => {
 const now=Date.now();
 assert.equal(await verifyEditorialSignature('{}',String(now),'0'.repeat(64),'test-only',now),false);
 assert.equal(await verifyEditorialSignature('{}',String(now-600000),'0'.repeat(64),'test-only',now),false);
});
test('revision config accepts only an API path', () => {
 assert.throws(() => cmsConfig({PAYLOAD_API_URL:'https://cms.test',PAYLOAD_REVISION_PATH:'https://evil.test'}));
});
