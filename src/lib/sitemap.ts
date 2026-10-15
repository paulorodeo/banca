import { absoluteUrl } from "./public-url";
import type { Bairro, ConteudoJuridico, Delegacia, Zona } from "@/content/types";

export const institutionalPaths = [
  "/",
  "/sobre",
  "/contato",
  "/politica-de-privacidade",
  "/profissionais",
  "/areas-de-atuacao",
  "/plantao-criminal",
  "/delegacias",
  "/regioes",
  "/artigos",
] as const;

export function publishedPaths(input: {
  delegacias: Delegacia[];
  zonas: Zona[];
  bairros: Bairro[];
  articles: ConteudoJuridico[];
}): string[] {
  return [
    ...new Set([
      ...institutionalPaths,
      ...input.delegacias.map((item) => `/delegacias/${item.slug}`),
      ...input.zonas.map((item) => `/regioes/${item.slug}`),
      ...input.bairros
        .filter((item) => item.status === "publicado")
        .map((item) => `/bairros/${item.slug}`),
      ...input.articles
        .filter((item) => item.status === "publicado")
        .map((item) => `/artigos/${item.slug}`),
    ]),
  ];
}
const escapeXml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]!,
  );
export function sitemapXml(paths: string[], origin: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${escapeXml(absoluteUrl(path, origin))}</loc></url>`).join("\n")}\n</urlset>\n`;
}
export function robotsTxt(origin: string): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml", origin)}\n`;
}
