import type { NoticiaEditorial } from "@/content/types";
import { noticias } from "@/content/local/noticias";
import { absoluteUrl, PRODUCTION_SITE_ORIGIN } from "@/lib/public-url";

export const MAX_NEWS_FEED_ITEMS = 50;
const NEWS_PATH = "/noticias";

function xml(value: string): string {
  // XML 1.0 forbids these control characters; stripping them keeps feeds well-formed.
  // eslint-disable-next-line no-control-regex
  const safeValue = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, "");
  return safeValue.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character]!;
  });
}

/**
 * Local NoticiaEditorial records are the published-only source used by the public index.
 * If a publication status is added later, drafts and review records stay out of feeds.
 */
function isPublished(item: NoticiaEditorial): boolean {
  const state = item as NoticiaEditorial & { status?: string; statusEditorial?: string };
  return (
    (state.status === undefined || state.status === "publicado") &&
    (state.statusEditorial === undefined || state.statusEditorial === "publicado")
  );
}

function isDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/**
 * Editorial records provide calendar dates only. XML date-time fields use midnight UTC as
 * a deterministic format conversion; this is not an editorial publication/update time.
 */
function technicalTimestamp(date: string): string {
  return `${date}T00:00:00.000Z`;
}

function configuredLimit(value?: string): number {
  const limit = Number(value ?? MAX_NEWS_FEED_ITEMS);
  if (!Number.isInteger(limit) || limit < 1) return MAX_NEWS_FEED_ITEMS;
  return Math.min(limit, MAX_NEWS_FEED_ITEMS);
}

export function newsFeedItems(
  source: NoticiaEditorial[] = noticias,
  limitSetting?: string,
): NoticiaEditorial[] {
  const limit = configuredLimit(limitSetting);
  const ordered = source
    .filter((item) => isPublished(item) && isDateOnly(item.publicadoEm))
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));
  const seen = new Set<string>();
  return ordered
    .filter((item) => {
      if (seen.has(item.seo.canonicalPath)) return false;
      seen.add(item.seo.canonicalPath);
      return true;
    })
    .slice(0, limit);
}

function canonicalUrl(item: NoticiaEditorial): string {
  return absoluteUrl(item.seo.canonicalPath, PRODUCTION_SITE_ORIGIN);
}

function imageUrl(item: NoticiaEditorial): string | undefined {
  const value = item.imagem?.url.trim();
  if (!value) return undefined;
  try {
    if (value.startsWith("/") && !value.startsWith("//"))
      return absoluteUrl(value, PRODUCTION_SITE_ORIGIN);
    const url = new URL(value);
    if ((url.protocol !== "https:" && url.protocol !== "http:") || url.username || url.password)
      return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

function imageMime(url: string): string | undefined {
  const pathname = new URL(url).pathname.toLowerCase();
  if (pathname.endsWith(".avif")) return "image/avif";
  if (pathname.endsWith(".webp")) return "image/webp";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  return undefined;
}

function rssItem(item: NoticiaEditorial): string {
  const url = canonicalUrl(item);
  const image = imageUrl(item);
  const creator = item.autoria.trim()
    ? `\n      <dc:creator>${xml(item.autoria)}</dc:creator>`
    : "";
  const media = image
    ? `\n      <media:content url="${xml(image)}" medium="image"${imageMime(image) ? ` type="${imageMime(image)}"` : ""} />`
    : "";
  return `    <item>
      <title>${xml(item.titulo)}</title>
      <link>${xml(url)}</link>
      <guid isPermaLink="true">${xml(url)}</guid>
      <description>${xml(item.resumo)}</description>
      <category>${xml(item.categoria)}</category>
      <pubDate>${new Date(technicalTimestamp(item.publicadoEm)).toUTCString()}</pubDate>${creator}${media}
    </item>`;
}

export function rssXml(
  options: {
    source?: NoticiaEditorial[];
    limit?: string;
    now?: Date;
  } = {},
): string {
  const items = newsFeedItems(options.source, options.limit);
  const now = options.now ?? new Date();
  const siteUrl = absoluteUrl(NEWS_PATH, PRODUCTION_SITE_ORIGIN);
  const feedUrl = absoluteUrl("/rss.xml", PRODUCTION_SITE_ORIGIN);
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Banca Paulista — Notícias</title>
    <link>${xml(siteUrl)}</link>
    <description>Notícias publicadas pela Banca Paulista sobre São Paulo.</description>
    <language>pt-BR</language>
    <generator>Banca Paulista</generator>
    <lastBuildDate>${now.toUTCString()}</lastBuildDate>
    <atom:link href="${xml(feedUrl)}" rel="self" type="application/rss+xml" />
    <!-- Datas editoriais sem horário usam 00:00 UTC apenas como conversão técnica, não como horário real de publicação. -->
${items.map(rssItem).join("\n")}
  </channel>
</rss>
`;
}

function atomEntry(item: NoticiaEditorial): string {
  const url = canonicalUrl(item);
  const published = technicalTimestamp(item.publicadoEm);
  const author = item.autoria.trim()
    ? `\n      <author><name>${xml(item.autoria)}</name></author>`
    : "";
  const image = imageUrl(item);
  const mime = image ? imageMime(image) : undefined;
  const enclosure = image
    ? `\n      <link rel="enclosure" href="${xml(image)}"${mime ? ` type="${mime}"` : ""} />`
    : "";
  return `    <entry>
      <id>${xml(url)}</id>
      <title type="text">${xml(item.titulo)}</title>
      <link rel="alternate" href="${xml(url)}" />
      <published>${published}</published>
      <updated>${published}</updated>${author}
      <category term="${xml(item.categoria)}" />
      <summary type="text">${xml(item.resumo)}</summary>${enclosure}
    </entry>`;
}

export function atomXml(
  options: {
    source?: NoticiaEditorial[];
    limit?: string;
    now?: Date;
  } = {},
): string {
  const items = newsFeedItems(options.source, options.limit);
  const now = options.now ?? new Date();
  const siteUrl = absoluteUrl(NEWS_PATH, PRODUCTION_SITE_ORIGIN);
  const feedUrl = absoluteUrl("/atom.xml", PRODUCTION_SITE_ORIGIN);
  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${xml(feedUrl)}</id>
  <title>Banca Paulista — Notícias</title>
  <subtitle>Notícias publicadas pela Banca Paulista sobre São Paulo.</subtitle>
  <link rel="alternate" href="${xml(siteUrl)}" />
  <link rel="self" href="${xml(feedUrl)}" type="application/atom+xml" />
  <updated>${now.toISOString()}</updated>
  <!-- Datas editoriais sem horário usam 00:00 UTC apenas como conversão técnica, não como horário real de publicação/atualização. -->
  <author><name>Banca Paulista</name></author>
${items.map(atomEntry).join("\n")}
</feed>
`;
}

export function newsFeedResponse(format: "rss" | "atom", env: Record<string, string | undefined>) {
  const body =
    format === "rss"
      ? rssXml({ limit: env["NEWS_FEED_LIMIT"] })
      : atomXml({ limit: env["NEWS_FEED_LIMIT"] });
  return new Response(body, {
    headers: {
      "Content-Type": `${format === "rss" ? "application/rss+xml" : "application/atom+xml"}; charset=utf-8`,
      "Cache-Control": "public, max-age=300, s-maxage=900, stale-while-revalidate=3600",
      "X-Content-Type-Options": "nosniff",
      ...(env["DEPLOYMENT_ENV"] === "staging" ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
    },
  });
}
