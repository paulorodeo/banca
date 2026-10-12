import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { adaptPayloadArticle, articleSearchSchema, parseLexical, safeUrl } from './payload';
import { cmsConfig, fetchCms, type SharedCache, type CmsConfig } from './payload-transport';
import { loadArticle, loadArticlePage } from './articles.server';
import { ArticleRichText } from '../components/site/article-rich-text';

const config: CmsConfig = { baseUrl: 'https://cms.test', path: '/api/articles', ttl: 60, timeout: 100, namespace: 'test' };
const territory = { regions: new Set(['zona-sul']), delegacias: new Set<string>(), bairros: new Set<string>(), themes: new Set<string>() };
const article = { id: 'test-only', title: 'Documento de teste', slug: 'documento-teste', excerpt: 'Fixture exclusiva dos testes.', _status: 'published', publishedAt: '2026-10-12T00:00:00Z', content: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Texto <script>teste</script>', format: 3 }] }] } } };
const response = (docs: unknown[]) => Response.json({ docs, page: 1, totalPages: docs.length ? 1 : 0, totalDocs: docs.length });
const memoryCache = () => {
  const entries = new Map<string, Response>();
  const cache: SharedCache = { match: async request => entries.get(request.url)?.clone(), put: async (request, value) => { entries.set(request.url, value.clone()); } };
  return { cache, expire: () => { for (const [key, value] of entries) { const headers = new Headers(value.headers); headers.set('x-banca-expires', '1'); entries.set(key, new Response(value.body, { headers })); } } };
};
describe('Payload editorial contract', () => {
  test('adapts English fields, never fabricates author, rejects drafts/missing dates', () => {
    const doc = adaptPayloadArticle(article, config.baseUrl, territory);
    assert.equal(doc.titulo, article.title); assert.equal(doc.autor, undefined);
    assert.throws(() => adaptPayloadArticle({ ...article, _status: 'draft' }, config.baseUrl, territory));
    assert.throws(() => adaptPayloadArticle({ ...article, publishedAt: undefined }, config.baseUrl, territory));
  });
  test('validates territorial relations, media and strips admin fields', () => {
    assert.throws(() => adaptPayloadArticle({ ...article, regions: [{ slug: 'inventado' }] }, config.baseUrl, territory));
    const doc = adaptPayloadArticle({ ...article, adminToken: 'test-only', cover: { id: 1, url: '/media/capa.jpg', alt: 'Capa' } }, config.baseUrl, territory);
    assert.equal(doc.capa?.url, 'https://cms.test/media/capa.jpg'); assert.equal('adminToken' in doc, false);
    assert.equal(safeUrl('javascript:alert(1)'), undefined);
  });
  test('renders safe Lexical headings, lists, links, quotes, images and separators', () => {
    const text = { type: 'text', text: '<script>teste</script>', format: 3 };
    const nodes = parseLexical([
      { type: 'heading', tag: 'h1', children: [text] },
      { type: 'list', listType: 'number', children: [{ type: 'listitem', children: [text] }] },
      { type: 'list', listType: 'bullet', children: [{ type: 'listitem', children: [text] }] },
      { type: 'paragraph', children: [{ type: 'link', fields: { url: 'javascript:alert(1)' }, children: [text] }, { type: 'link', fields: { url: 'https://example.test' }, children: [text] }] },
      { type: 'quote', children: [text] }, { type: 'horizontalrule' }, { type: 'linebreak' },
      { type: 'upload', value: { id: 1, url: '/photo.jpg', alt: 'Foto', width: 800, height: 600 } },
    ], config.baseUrl);
    const html = renderToStaticMarkup(<ArticleRichText nodes={nodes} />);
    for (const tag of ['<h2', '<ol', '<ul', '<li', '<blockquote', '<hr', '<br', '<img', '<strong', '<em']) assert.ok(html.includes(tag), tag);
    assert.ok(html.includes('&lt;script&gt;')); assert.ok(!html.includes('javascript:')); assert.ok(!html.includes('<script>'));
    assert.throws(() => parseLexical([{ type: 'unknown-block' }], config.baseUrl));
  });
  test('query validation bounds pagination and avoids unsafe filters', () => {
    assert.deepEqual(articleSearchSchema.parse({ page: -1, limit: 1000, sort: 'invalid', category: '<script>' }), { page: 1, limit: 12, sort: '-publishedAt', category: '' });
    assert.equal(cmsConfig({}), null); assert.throws(() => cmsConfig({ PAYLOAD_API_URL: 'http://untrusted.test' }));
  });
});
describe('CMS lifecycle and cache', () => {
  test('enforces published query, has no cookies or authorization, caches across consumers', async () => {
    const { cache } = memoryCache(); let calls = 0;
    const fetcher: typeof fetch = async (url, init) => {
      calls++; const parsed = new URL(String(url));
      assert.equal(parsed.searchParams.get('where[_status][equals]'), 'published');
      assert.equal(parsed.searchParams.get('draft'), 'false'); assert.equal(init?.credentials, 'omit');
      assert.equal(new Headers(init?.headers).get('authorization'), null);
      return response([article]);
    };
    assert.ok(await loadArticle(config, article.slug, cache, fetcher));
    assert.ok(await loadArticle(config, article.slug, cache, fetcher)); assert.equal(calls, 1);
  });
  test('publication, update and withdrawal are revalidated after TTL; no stale fallback', async () => {
    const { cache, expire } = memoryCache(); let docs: unknown[] = [];
    const fetcher: typeof fetch = async () => response(docs);
    assert.equal(await loadArticle(config, article.slug, cache, fetcher), null);
    docs = [article]; expire(); assert.equal((await loadArticle(config, article.slug, cache, fetcher))?.titulo, article.title);
    docs = [{ ...article, title: 'Atualizado' }]; expire(); assert.equal((await loadArticle(config, article.slug, cache, fetcher))?.titulo, 'Atualizado');
    docs = []; expire(); assert.equal(await loadArticle(config, article.slug, cache, fetcher), null);
    expire(); await assert.rejects(() => loadArticle(config, article.slug, cache, async () => { throw new Error('offline'); }));
  });
  test('cache namespace invalidates all article variants', async () => {
    const { cache } = memoryCache(); let calls = 0;
    const fetcher: typeof fetch = async () => { calls++; return response([article]); };
    await loadArticle(config, article.slug, cache, fetcher);
    await loadArticle({ ...config, namespace: 'test-next' }, article.slug, cache, fetcher);
    assert.equal(calls, 2);
  });
  test('never exposes draft if VPS access is misconfigured; nonexistent slug is null', async () => {
    await assert.rejects(() => loadArticle(config, article.slug, undefined, async () => response([{ ...article, _status: 'draft' }])));
    assert.equal(await loadArticle(config, 'nonexistent', undefined, async () => response([])), null);
  });
  test('pagination and category filter are server queries; categories have no drafts predicate', async () => {
    const search = articleSearchSchema.parse({ page: 2, limit: 1, category: 'direitos' });
    const fetcher: typeof fetch = async input => {
      const url = new URL(String(input));
      if (url.pathname === '/api/categories') {
        assert.equal(url.searchParams.has('where[_status][equals]'), false);
        return Response.json({ docs: [{ slug: 'direitos', title: 'Direitos' }] });
      }
      assert.equal(url.searchParams.get('page'), '2'); assert.equal(url.searchParams.get('limit'), '1');
      assert.equal(url.searchParams.get('where[category.slug][equals]'), 'direitos');
      return Response.json({ docs: [article], page: 2, totalPages: 3, totalDocs: 3 });
    };
    const page = await loadArticlePage(config, search, undefined, fetcher);
    assert.equal(page.page, 2); assert.equal(page.totalPages, 3); assert.equal(page.docs.length, 1);
  });
  test('connection failure, HTTP errors and timeout fail explicitly without local substitution', async () => {
    await assert.rejects(() => loadArticlePage(config, articleSearchSchema.parse({}), undefined, async () => new Response('', { status: 500 })));
    const fetcher: typeof fetch = async (_, init) => new Promise((_, reject) => { init?.signal?.addEventListener('abort', () => reject(new Error('timeout'))); });
    await assert.rejects(() => fetchCms({ ...config, timeout: 5 }, new URLSearchParams(), undefined, fetcher));
  });
  test('local legitimate articles remain available only with unconfigured CMS', async () => {
    const result = await loadArticlePage(null, articleSearchSchema.parse({ limit: 1 }));
    assert.equal(result.source, 'local'); assert.equal(result.docs.length, 1); assert.ok(result.totalPages > 1);
    assert.equal(await loadArticle(null, 'nonexistent'), null);
  });
});
