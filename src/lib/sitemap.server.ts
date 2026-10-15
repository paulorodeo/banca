import { delegacias } from "@/content/local/delegacias";
import { zonas } from "@/content/local/zonas";
import { bairros } from "@/content/local/bairros";
import { loadArticlePage } from "@/content/articles.server";
import { cmsConfig } from "@/content/payload-transport";
import type { ConteudoJuridico } from "@/content/types";
import { runtimePublicOrigin } from "./public-url";
import { publishedPaths, sitemapXml } from "./sitemap";

/** Fail without publishing a partial sitemap if the public editorial source is unavailable. */
export async function publicSitemap(env: Record<string, string | undefined>): Promise<string> {
  const origin = runtimePublicOrigin(env);
  const configured = cmsConfig(env);
  const config = configured ? { ...configured, siteOrigin: origin } : null;
  if (config && new URL(config.baseUrl).origin === origin)
    throw new Error("Public origin cannot be the CMS origin");
  const articles: ConteudoJuridico[] = [];
  for (let page = 1; page <= 1000; page++) {
    const result = await loadArticlePage(config, {
      page,
      limit: 24,
      sort: "-publishedAt",
      category: "",
    });
    articles.push(...result.docs);
    if (page >= result.totalPages)
      return sitemapXml(publishedPaths({ delegacias, zonas, bairros, articles }), origin);
  }
  throw new Error("Sitemap publication exceeds supported page bound");
}
