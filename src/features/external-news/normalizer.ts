import type { ExternalNewsItem, FeedSource } from "./types";
import { parseSafeXml, xmlChildren, xmlFirst, xmlLocalName, xmlText } from "./xml";

// Strip XML/HTML-derived control bytes before React renders the title as text.
const cleanText = (value: string, max: number) =>
  value
    .replace(/<[^>]*>/g, " ")
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);

export function canonicalExternalUrl(value: string, source: FeedSource): string | null {
  let url: URL;
  try {
    url = new URL(value.trim(), source.siteUrl);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
  if (!source.allowedHosts.includes(url.hostname)) return null;
  url.hash = "";
  for (const key of [...url.searchParams.keys()])
    if (/^(utm_.+|fbclid|gclid|mc_cid|mc_eid)$/i.test(key)) url.searchParams.delete(key);
  return url.toString();
}

function stableId(value: string) {
  let a = 0x811c9dc5;
  let b = 0x9e3779b9;
  for (let i = 0; i < value.length; i++) {
    a = Math.imul(a ^ value.charCodeAt(i), 0x01000193);
    b = Math.imul(b ^ value.charCodeAt(i), 0x85ebca6b);
  }
  return `${(a >>> 0).toString(36)}${(b >>> 0).toString(36)}`;
}

function dateValue(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 80) return null;
  const time = Date.parse(trimmed);
  if (!Number.isFinite(time) || time > Date.now() + 86_400_000) return null;
  return new Date(time).toISOString();
}

function elementValue(node: ReturnType<typeof xmlFirst>, name?: string) {
  if (!node) return "";
  if (name === "link" && node.attributes["href"]) return node.attributes["href"];
  return xmlText(node);
}

function parseItems(root: ReturnType<typeof parseSafeXml>, source: FeedSource) {
  const feed = root.children[0]!;
  const kind = xmlLocalName(feed.name);
  if (kind === "rss") {
    const channel = xmlFirst(feed, "channel");
    return (channel ? xmlChildren(channel, "item") : []).map((node) => ({
      node,
      title: elementValue(xmlFirst(node, "title")),
      url: elementValue(xmlFirst(node, "link")),
      guid: elementValue(xmlFirst(node, "guid")),
      published: elementValue(xmlFirst(node, "pubDate")) || elementValue(xmlFirst(node, "date")),
      updated: elementValue(xmlFirst(node, "updated")),
      language: elementValue(xmlFirst(node, "language")),
      tags: xmlChildren(node, "category").map(xmlText),
    }));
  }
  if (kind === "feed") {
    return xmlChildren(feed, "entry").map((node) => {
      const links = xmlChildren(node, "link");
      const alternate =
        links.find((link) => !link.attributes["rel"] || link.attributes["rel"] === "alternate") ??
        links[0];
      return {
        node,
        title: elementValue(xmlFirst(node, "title")),
        url: elementValue(alternate, "link"),
        guid: elementValue(xmlFirst(node, "id")),
        published:
          elementValue(xmlFirst(node, "published")) || elementValue(xmlFirst(node, "issued")),
        updated: elementValue(xmlFirst(node, "updated")),
        language: node.attributes["lang"] ?? "",
        tags: xmlChildren(node, "category").map(
          (category) => category.attributes["term"] ?? xmlText(category),
        ),
      };
    });
  }
  throw new Error("feed_format_unsupported");
}

export function normalizeFeed(
  xml: string,
  source: FeedSource,
  collectedAt = new Date().toISOString(),
) {
  const root = parseSafeXml(xml);
  const entries = parseItems(root, source).slice(0, 100);
  const items: ExternalNewsItem[] = [];
  let rejected = 0;
  for (const entry of entries) {
    const title = cleanText(entry.title, 240);
    const originalUrl = canonicalExternalUrl(entry.url, source);
    const originalGuid = cleanText(entry.guid, 500) || originalUrl || "";
    if (!title || !originalUrl || !originalGuid) {
      rejected++;
      continue;
    }
    const categories = entry.tags.map((tag) => cleanText(tag, 80).toLocaleLowerCase("pt-BR"));
    const mappedCategories = categories.map((tag) => source.categoryMap[tag]);
    if (source.defaultCategory) mappedCategories.push(source.defaultCategory);
    const subjectTags = [
      ...new Set(
        mappedCategories.filter(
          (tag): tag is string => !!tag && source.allowedCategories.includes(tag),
        ),
      ),
    ].slice(0, 8);
    const publishedAt = dateValue(entry.published);
    const updatedAt = dateValue(entry.updated);
    if ((entry.published && !publishedAt) || (entry.updated && !updatedAt)) {
      rejected++;
      continue;
    }
    items.push({
      id: `${source.id}:${stableId(`${originalUrl}\n${originalGuid}`)}`,
      sourceId: source.id,
      title,
      originalUrl,
      originalGuid,
      publishedAt,
      updatedAt,
      collectedAt,
      language: cleanText(entry.language, 20) || null,
      subjectTags,
      geographicScope: "unknown",
      regionCodes: [],
      stateCodes: [],
      cityIds: [],
      neighborhoodIds: [],
      institutionIds: [],
      agencyIds: [],
      highwayIds: [],
      originalEditorialNote: source.publicationNote,
      publicationStatus: "pending",
      rightsStatus: source.rightsStatus,
    });
  }
  return { items, received: entries.length, rejected };
}
