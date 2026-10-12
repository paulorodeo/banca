import { z } from 'zod';
import { conteudos } from './local/artigos-editoriais';
import { regioes } from './local/regioes';
import { delegacias } from './local/delegacias';
import { areas } from './local/areas';
import { adaptPayloadArticle, type ArticlePage, type ArticleSearch, type TerritoryRegistry } from './payload';
import { fetchCms, type CmsConfig, type SharedCache } from './payload-transport';

const registry: TerritoryRegistry = {
  regions: new Set(regioes.map(item => item.slug)), delegacias: new Set(delegacias.map(item => item.slug)),
  bairros: new Set(regioes.flatMap(item => item.bairros).map(item => item.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))),
  themes: new Set(areas.map(item => item.slug)),
};
const envelope = z.object({ docs: z.array(z.unknown()).max(100), page: z.number().int().min(1), totalPages: z.number().int().min(0), totalDocs: z.number().int().min(0) });
const categoryEnvelope = z.object({ docs: z.array(z.object({ slug: z.string().regex(/^[a-z0-9-]+$/), title: z.string().min(1) })).max(100) });
export async function loadArticlePage(config: CmsConfig | null, search: ArticleSearch, cache?: SharedCache, fetcher: typeof fetch = fetch): Promise<ArticlePage> {
  if (!config) {
    const all = [...conteudos].filter(item => item.status === 'publicado').sort((a, b) => search.sort === 'publishedAt' ? a.publicadoEm.localeCompare(b.publicadoEm) : b.publicadoEm.localeCompare(a.publicadoEm));
    const slugify = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const selected = search.category ? all.filter(item => slugify(item.categoria) === search.category) : all;
    return { docs: selected.slice((search.page - 1) * search.limit, search.page * search.limit), page: search.page, totalPages: Math.ceil(selected.length / search.limit), totalDocs: selected.length, categories: Array.from(new Map(all.map(item => [slugify(item.categoria), { slug: slugify(item.categoria), title: item.categoria }])).values()), source: 'local' };
  }
  const query = new URLSearchParams({ page: String(search.page), limit: String(search.limit), sort: search.sort });
  if (search.category) query.set('where[category.slug][equals]', search.category);
  const response = envelope.parse(await fetchCms(config, query, cache, fetcher, true, raw => { const parsed = envelope.parse(raw); parsed.docs.forEach(doc => adaptPayloadArticle(doc, config.baseUrl, registry)); }));
  const categories = categoryEnvelope.parse(await fetchCms({ ...config, path: '/api/categories' }, new URLSearchParams({ limit: '100', sort: 'title' }), cache, fetcher, false, raw => categoryEnvelope.parse(raw)));
  return { docs: response.docs.map(doc => adaptPayloadArticle(doc, config.baseUrl, registry)), page: response.page, totalPages: response.totalPages, totalDocs: response.totalDocs, categories: categories.docs, source: 'payload' };
}
export async function loadArticle(config: CmsConfig | null, slug: string, cache?: SharedCache, fetcher: typeof fetch = fetch) {
  if (!config) return conteudos.find(item => item.slug === slug && item.status === 'publicado') ?? null;
  const query = new URLSearchParams({ 'where[slug][equals]': slug, limit: '1', page: '1' });
  const response = envelope.parse(await fetchCms(config, query, cache, fetcher, true, raw => { const parsed = envelope.parse(raw); parsed.docs.forEach(doc => adaptPayloadArticle(doc, config.baseUrl, registry)); }));
  const doc = response.docs[0];
  return doc ? adaptPayloadArticle(doc, config.baseUrl, registry) : null;
}
