import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader, setResponseStatus } from "@tanstack/react-start/server";
import { absoluteUrl, runtimePublicOrigin } from "@/lib/public-url";
import { z } from "zod";
import { articleSearchSchema, type ArticlePage } from "./payload";
import type { ConteudoJuridico } from "./types";
import { cmsConfig, type SharedCache } from "./payload-transport";
import { loadArticle, loadArticlePage } from "./articles.server";

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
  setResponseHeader("Cache-Control", "no-store");
  return {
    ok: false,
    error: "Publicações temporariamente indisponíveis. Tente novamente em instantes.",
  };
}
export const readArticles = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => articleSearchSchema.parse(data))
  .handler(async ({ data }): Promise<PageResult> => {
    setResponseHeader("Cache-Control", "no-store");
    try {
      const configured = cmsConfig(process.env);
      const config = configured
        ? { ...configured, siteOrigin: runtimePublicOrigin(process.env) }
        : null;
      return {
        ok: true,
        page: await loadArticlePage(
          config,
          data,
          config?.revisionPath ? runtimeCache() : undefined,
        ),
      };
    } catch {
      return unavailable();
    }
  });
export const readArticle = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z
      .object({
        slug: z
          .string()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
          .max(160),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<ArticleResult> => {
    setResponseHeader("Cache-Control", "no-store");
    try {
      const configured = cmsConfig(process.env);
      const config = configured
        ? { ...configured, siteOrigin: runtimePublicOrigin(process.env) }
        : null;
      const origin = runtimePublicOrigin(process.env);
      if (config && origin === new URL(config.baseUrl).origin)
        throw new Error("Public origin cannot be the CMS origin");
      return {
        ok: true,
        article: await loadArticle(
          config,
          data.slug,
          config?.revisionPath ? runtimeCache() : undefined,
        ),
        canonicalUrl: absoluteUrl(`/artigos/${data.slug}`, origin),
      };
    } catch {
      return unavailable();
    }
  });
