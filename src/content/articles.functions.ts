import { createServerFn } from '@tanstack/react-start';
import { getRequest, setResponseHeader, setResponseStatus } from '@tanstack/react-start/server';
import { z } from 'zod';
import { articleSearchSchema, type ArticlePage } from './payload';
import type { ConteudoJuridico } from './types';
import { cmsConfig, type SharedCache } from './payload-transport';
import { loadArticle, loadArticlePage } from './articles.server';

type Failure = { ok: false; error: string };
type PageResult = { ok: true; page: ArticlePage } | Failure;
type ArticleResult = { ok: true; article: ConteudoJuridico | null; canonicalUrl: string } | Failure;
function runtimeCache(): SharedCache | undefined {
  // Standard Cache API on Cloudflare. No process-local Map masquerading as shared cache.
  const storage = globalThis.caches as (CacheStorage & { default?: SharedCache }) | undefined;
  return storage?.default;
}
function unavailable(): Failure {
  setResponseStatus(503);
  setResponseHeader('Cache-Control', 'no-store');
  return { ok: false, error: 'Publicações temporariamente indisponíveis. Tente novamente em instantes.' };
}
export const readArticles = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => articleSearchSchema.parse(data))
  .handler(async ({ data }): Promise<PageResult> => {
    setResponseHeader('Cache-Control', 'no-store');
    try {
      const config = cmsConfig(process.env);
      return { ok: true, page: await loadArticlePage(config, data, runtimeCache()) };
    } catch { return unavailable(); }
  });
export const readArticle = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => z.object({ slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160) }).parse(data))
  .handler(async ({ data }): Promise<ArticleResult> => {
    setResponseHeader('Cache-Control', 'no-store');
    try {
      const config = cmsConfig(process.env);
      const configuredOrigin = process.env['PUBLIC_SITE_URL'];
      const origin = configuredOrigin ? new URL(configuredOrigin).origin : new URL(getRequest().url).origin;
      if (config && origin === new URL(config.baseUrl).origin) throw new Error('Public origin cannot be the CMS origin');
      return { ok: true, article: await loadArticle(config, data.slug, runtimeCache()), canonicalUrl: `${origin}/artigos/${data.slug}` };
    } catch { return unavailable(); }
  });
