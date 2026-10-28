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
  let time = Date.parse(trimmed);
  if (!Number.isFinite(time)) {
    const portuguese =
      /^(?:[a-zç]{3},\s*)?([a-zç]{3})\s+(\d{1,2})\s+(\d{4})\s+(\d{2}:\d{2}:\d{2})$/i.exec(
        fold(trimmed),
      );
    const month = portuguese
      ? [
          "jan",
          "fev",
          "mar",
          "abr",
          "mai",
          "jun",
          "jul",
          "ago",
          "set",
          "out",
          "nov",
          "dez",
        ].indexOf(portuguese[1]!) + 1
      : 0;
    if (portuguese && month > 0)
      time = Date.parse(
        `${portuguese[3]}-${String(month).padStart(2, "0")}-${String(portuguese[2]).padStart(2, "0")}T${portuguese[4]}-03:00`,
      );
  }
  if (!Number.isFinite(time) || time > Date.now() + 86_400_000) return null;
  return new Date(time).toISOString();
}

const STATE_NAMES: Record<string, string> = {
  acre: "AC",
  alagoas: "AL",
  amapa: "AP",
  amazonas: "AM",
  bahia: "BA",
  ceara: "CE",
  "distrito federal": "DF",
  "espirito santo": "ES",
  goias: "GO",
  maranhao: "MA",
  "mato grosso": "MT",
  "mato grosso do sul": "MS",
  "minas gerais": "MG",
  para: "PA",
  paraiba: "PB",
  parana: "PR",
  pernambuco: "PE",
  piaui: "PI",
  "rio de janeiro": "RJ",
  "rio grande do norte": "RN",
  "rio grande do sul": "RS",
  rondonia: "RO",
  roraima: "RR",
  "santa catarina": "SC",
  "sao paulo": "SP",
  sergipe: "SE",
  tocantins: "TO",
};
const STATE_REGIONS: Record<string, string> = {
  AC: "N",
  AP: "N",
  AM: "N",
  PA: "N",
  RO: "N",
  RR: "N",
  TO: "N",
  AL: "NE",
  BA: "NE",
  CE: "NE",
  MA: "NE",
  PB: "NE",
  PE: "NE",
  PI: "NE",
  RN: "NE",
  SE: "NE",
  DF: "CO",
  GO: "CO",
  MT: "CO",
  MS: "CO",
  ES: "SE",
  MG: "SE",
  RJ: "SE",
  SP: "SE",
  PR: "S",
  RS: "S",
  SC: "S",
};

const fold = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function classifyTerritory(title: string) {
  const folded = ` ${fold(title)} `;
  const states = Object.entries(STATE_NAMES)
    .filter(([name]) =>
      new RegExp(`(?:^|[^a-z])${name.replaceAll(" ", "\\s+")}(?:[^a-z]|$)`).test(folded),
    )
    .map(([, code]) => code);
  const stateCodes = [...new Set(states)];
  const regionCodes = [...new Set(stateCodes.map((code) => STATE_REGIONS[code]!).filter(Boolean))];
  return {
    geographicScope: stateCodes.length === 1 ? ("state" as const) : ("unknown" as const),
    stateCodes,
    regionCodes,
  };
}

function classifySubjects(title: string, initial: string[], source: FeedSource) {
  const value = fold(title);
  const tags = new Set(initial);
  const add = (tag: string, pattern: RegExp) => {
    if (source.allowedCategories.includes(tag) && pattern.test(value)) tags.add(tag);
  };
  add("agronegocio", /\b(agropecuaria|agricultura|pecuaria|safra|produtor rural)\b/);
  add("rodovias", /\b(rodovia|br-\d{3}|estrada federal)\b/);
  add("infraestrutura", /\b(infraestrutura|transporte|transito|ferrovia|porto|aeroporto)\b/);
  add("justica", /\b(justica|tribunal|stf|stj|tse|decisao judicial|julgamento)\b/);
  add("politica", /\b(eleicao|eleitoral|congresso|camara|senado|governo|presidente)\b/);
  add("economia", /\b(economia|inflacao|juros|emprego|mercado|pib)\b/);
  return [...tags].slice(0, 8);
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
    const feedSubjectTags = [
      ...new Set(
        mappedCategories.filter(
          (tag): tag is string => !!tag && source.allowedCategories.includes(tag),
        ),
      ),
    ].slice(0, 8);
    const subjectTags = classifySubjects(title, feedSubjectTags, source);
    const publishedAt = dateValue(entry.published);
    const updatedAt = dateValue(entry.updated);
    if (!publishedAt || (entry.updated && !updatedAt)) {
      rejected++;
      continue;
    }
    const territory = classifyTerritory(title);
    const automaticallyApproved =
      source.technicalStatus === "operational" && source.editorialAuthorization === "approved";
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
      geographicScope: territory.geographicScope,
      regionCodes: territory.regionCodes,
      stateCodes: territory.stateCodes,
      cityIds: [],
      neighborhoodIds: [],
      institutionIds: [],
      agencyIds: [],
      highwayIds: [],
      originalEditorialNote: source.publicationNote,
      publicationStatus: automaticallyApproved ? "approved" : "pending",
      rightsStatus: automaticallyApproved ? "approved" : "pending",
      approvalMethod: automaticallyApproved ? "authorization-policy" : null,
    });
  }
  return { items, received: entries.length, rejected };
}
