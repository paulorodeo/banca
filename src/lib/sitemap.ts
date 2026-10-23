import { absoluteUrl, PRODUCTION_SITE_ORIGIN } from "./public-url";
import type { Bairro, ConteudoJuridico, Delegacia, NoticiaEditorial, Zona } from "@/content/types";

export const institutionalPaths = [
  "/",
  "/sobre",
  "/contato",
  // Rota antiga permanece até a política nova poder ser ativada e redirecionada.
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/integridade-e-etica",
  "/profissionais",
  "/areas-de-atuacao",
  "/plantao-criminal",
  "/delegacias",
  "/regioes",
  "/noticias",
  "/artigos",
  "/radio",
] as const;

export interface SitemapCandidate {
  path: string;
  canonicalPath: string;
  published: boolean;
  indexable: boolean;
  redirected?: boolean;
}

const neverIndexPaths = new Set(["/radar", "/privacidade"]);

/** Keep only public, canonical pages. A duplicate canonical URL is emitted once. */
export function selectSitemapPaths(candidates: SitemapCandidate[], origin: string): string[] {
  const paths: string[] = [];
  const seen = new Set<string>();
  for (const candidate of candidates) {
    if (!candidate.published || !candidate.indexable || candidate.redirected) continue;
    if (
      [...neverIndexPaths].some(
        (blocked) => candidate.path === blocked || candidate.path.startsWith(`${blocked}/`),
      )
    )
      continue;
    if (candidate.path !== candidate.canonicalPath) continue;
    const path = candidate.path;
    if (!path.startsWith("/") || path.startsWith("//") || path.includes("?") || path.includes("#"))
      throw new Error(`Invalid sitemap path: ${path}`);
    // Validate that every location resolves to the same, configured HTTPS origin.
    absoluteUrl(path, origin);
    if (seen.has(path)) continue;
    seen.add(path);
    paths.push(path);
  }
  return paths;
}

export function publishedPaths(
  input: {
    delegacias: Delegacia[];
    zonas: Zona[];
    bairros: Bairro[];
    articles: ConteudoJuridico[];
    noticias?: NoticiaEditorial[];
    hasVagas?: boolean;
  },
  origin = PRODUCTION_SITE_ORIGIN,
): string[] {
  const expectedZones = ["centro", "zona-norte", "zona-leste", "zona-sul", "zona-oeste"];
  const zoneSlugs = input.zonas.map((item) => item.slug);
  if (
    expectedZones.some((slug) => !zoneSlugs.includes(slug)) ||
    zoneSlugs.some((slug) => !expectedZones.includes(slug))
  )
    throw new Error("Sitemap requires the five canonical regional pages");

  const candidates: SitemapCandidate[] = [
    ...institutionalPaths.map((path) => ({
      path,
      canonicalPath: path,
      published: true,
      indexable: true,
    })),
    ...input.delegacias.map((item) => ({
      path: `/delegacias/${item.slug}`,
      canonicalPath: item.seo.canonicalPath,
      published: true,
      indexable: !item.seo.noindex,
    })),
    ...input.zonas.map((item) => ({
      path: `/regioes/${item.slug}`,
      canonicalPath: `/regioes/${item.slug}`,
      published: true,
      indexable: true,
    })),
    ...(input.hasVagas
      ? [{ path: "/vagas", canonicalPath: "/vagas", published: true, indexable: true }]
      : []),
    ...input.bairros.map((item) => ({
      path: `/bairros/${item.slug}`,
      canonicalPath: item.seo.canonicalPath,
      published: item.status === "publicado",
      indexable: !item.seo.noindex,
    })),
    ...input.articles.map((item) => ({
      path: `/artigos/${item.slug}`,
      canonicalPath: `/artigos/${item.slug}`,
      published: item.status === "publicado",
      indexable: true,
    })),
    ...(input.noticias ?? []).map((item) => ({
      path: `/noticias/${item.slug}`,
      canonicalPath: item.seo.canonicalPath,
      published: true,
      indexable: !item.seo.noindex,
    })),
  ];
  return selectSitemapPaths(candidates, origin);
}
const escapeXml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]!,
  );
export function sitemapXml(paths: string[], origin: string): string {
  const uniquePaths = selectSitemapPaths(
    paths.map((path) => ({ path, canonicalPath: path, published: true, indexable: true })),
    origin,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${uniquePaths.map((path) => `  <url><loc>${escapeXml(absoluteUrl(path, origin))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
export function robotsTxt(origin: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml", origin)}\n`;
}
