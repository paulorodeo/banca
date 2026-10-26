import { describe, expect, it } from "bun:test";
import { normalizeFeed } from "./normalizer";
import { MemoryExternalNewsRepository } from "./repository.server";
import { queryExternalNews } from "./query.server";
import { syncExternalFeed } from "./ingestion.server";
import { feedSources } from "./sources";
import type { ExternalNewsItem, FeedSource } from "./types";
import { feedSourceById } from "./sources";
import type { Fetcher } from "@/lib/fetcher";

const agency = feedSources.find((source) => source.id === "agencia-brasil-ultimas")!;
const sampleRss = `<?xml version="1.0"?><rss version="2.0"><channel><item><title>Notícia &amp; atualização</title><link>https://agenciabrasil.ebc.com.br/noticia/2026/10/teste?utm_source=rss</link><guid>urn:item:1</guid><pubDate>Mon, 26 Oct 2026 12:00:00 GMT</pubDate><description>Texto que não deve ser armazenado.</description><category>Política</category></item></channel></rss>`;
const sampleAtom = `<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>Decisão &lt;em&gt;judicial&lt;/em&gt;</title><link rel="alternate" href="https://res.stj.jus.br/noticias/1"/><id>tag:stj,2026:item/1</id><published>2026-10-26T10:00:00Z</published><category term="Justiça"/></entry></feed>`;

function approvedItem(overrides: Partial<ExternalNewsItem> = {}): ExternalNewsItem {
  return {
    id: "agencia-brasil-ultimas:fixture",
    sourceId: "agencia-brasil-ultimas",
    title: "Referência oficial",
    originalUrl: "https://agenciabrasil.ebc.com.br/noticia/2026/10/uf",
    originalGuid: "fixture",
    publishedAt: new Date().toISOString(),
    updatedAt: null,
    collectedAt: new Date().toISOString(),
    language: "pt-BR",
    subjectTags: ["politica"],
    geographicScope: "national",
    regionCodes: [],
    stateCodes: [],
    cityIds: [],
    neighborhoodIds: [],
    institutionIds: [],
    agencyIds: [],
    highwayIds: [],
    originalEditorialNote: "Atribuir fonte.",
    publicationStatus: "approved",
    rightsStatus: "approved",
    ...overrides,
  };
}

describe("external news feed adapter", () => {
  it("normalizes RSS metadata only, strips tracking parameters, and leaves curation pending", () => {
    const result = normalizeFeed(sampleRss, agency);
    expect(result.received).toBe(1);
    expect(result.items[0]?.title).toBe("Notícia & atualização");
    expect(result.items[0]?.originalUrl).toBe(
      "https://agenciabrasil.ebc.com.br/noticia/2026/10/teste",
    );
    expect(result.items[0]?.subjectTags).toEqual(["politica"]);
    expect(result.items[0]?.publicationStatus).toBe("pending");
    expect(JSON.stringify(result.items[0])).not.toContain("Texto que não deve ser armazenado");
    expect(result.items[0]?.stateCodes).toEqual([]);
  });

  it("parses Atom namespaced category and link while stripping markup from title", () => {
    const source = {
      ...agency,
      id: "stj-noticias",
      siteUrl: "https://res.stj.jus.br/",
      allowedHosts: ["res.stj.jus.br"],
      categoryMap: { justiça: "justica" },
      allowedCategories: ["justica"],
    } satisfies FeedSource;
    const result = normalizeFeed(sampleAtom, source);
    expect(result.items[0]?.title).toBe("Decisão judicial");
    expect(result.items[0]?.originalUrl).toBe("https://res.stj.jus.br/noticias/1");
    expect(result.items[0]?.subjectTags).toEqual(["justica"]);
  });

  it("rejects malformed XML, DTD/entity declarations, invalid dates, and URLs outside the source host", () => {
    expect(() => normalizeFeed("<rss><channel><item></channel></rss>", agency)).toThrow(
      "feed_xml_malformed",
    );
    expect(() =>
      normalizeFeed('<!DOCTYPE rss [<!ENTITY x SYSTEM "file:///etc/passwd">]><rss/>', agency),
    ).toThrow("feed_xml_dtd_forbidden");
    const result = normalizeFeed(
      `<rss><channel><item><title>Sem data válida</title><link>https://example.com/noticia</link><guid>g</guid><pubDate>nunca</pubDate></item></channel></rss>`,
      agency,
    );
    expect(result.items).toHaveLength(0);
    expect(result.rejected).toBe(1);
  });

  it("deduplicates canonical URLs and source GUIDs", async () => {
    const repository = new MemoryExternalNewsRepository();
    const first = approvedItem();
    const second = { ...first, id: "second", originalUrl: `${first.originalUrl}?utm_medium=feed` };
    expect(await repository.writeItems(first.sourceId, [first])).toEqual({
      inserted: 1,
      duplicates: 0,
    });
    expect(await repository.writeItems(second.sourceId, [second])).toEqual({
      inserted: 0,
      duplicates: 1,
    });
  });

  it("rejects unsafe redirects and records an auditable sync report without approving items", async () => {
    const repository = new MemoryExternalNewsRepository();
    const source = { ...agency, status: "enabled" as const };
    const fetcher: Fetcher = async () =>
      new Response(null, { status: 302, headers: { location: "http://127.0.0.1/private" } });
    const report = await syncExternalFeed(source, repository, fetcher);
    expect(report.error).toBe("feed_host_not_allowed");
    expect(report.approved).toBe(0);
    expect(repository.reports.get(source.id)).toEqual(report);
  });

  it("queries only approved, rights-cleared, recent items with explicitly assigned geography", async () => {
    const repository = new MemoryExternalNewsRepository();
    const eligible = approvedItem();
    await repository.writeItems(agency.id, [
      eligible,
      approvedItem({ id: "pending", publicationStatus: "pending" }),
      approvedItem({ id: "rights-pending", rightsStatus: "pending" }),
      approvedItem({ id: "old", publishedAt: "2020-01-01T00:00:00.000Z" }),
      approvedItem({
        id: "state",
        originalUrl: "https://agenciabrasil.ebc.com.br/noticia/2026/10/sp",
        originalGuid: "state",
        geographicScope: "state",
        stateCodes: ["SP"],
      }),
    ]);
    const sources = new Map(feedSourceById);
    sources.set(agency.id, { ...agency, rightsStatus: "approved" });
    expect(await queryExternalNews(repository, {}, sources)).toHaveLength(1);
    expect(await queryExternalNews(repository, { stateCode: "SP" }, sources)).toHaveLength(1);
    expect(await queryExternalNews(null, {})).toEqual([]);
  });
});
