import { describe, expect, test } from "bun:test";
import type { NoticiaEditorial } from "@/content/types";
import { noticias } from "@/content/local/noticias";
import {
  atomXml,
  MAX_NEWS_FEED_ITEMS,
  newsFeedItems,
  newsFeedResponse,
  rssXml,
} from "./news-feeds.server";

describe("news feeds", () => {
  test("includes the 15 published local reports in descending publication-date order", () => {
    const items = newsFeedItems();
    expect(items).toHaveLength(15);
    expect(items.every((item) => noticias.includes(item))).toBe(true);
    expect(items.map((item) => item.publicadoEm)).toEqual(
      [...items].map((item) => item.publicadoEm).sort((a, b) => b.localeCompare(a)),
    );
    expect(newsFeedItems(undefined, "3")).toHaveLength(3);
    const moreThanLimit = Array.from({ length: 55 }, (_, index) => ({
      ...noticias[index % noticias.length]!,
      id: `feed-test-${index}`,
      slug: `feed-test-${index}`,
      seo: {
        ...noticias[index % noticias.length]!.seo,
        canonicalPath: `/noticias/feed-test-${index}`,
      },
    }));
    expect(newsFeedItems(moreThanLimit, "500")).toHaveLength(MAX_NEWS_FEED_ITEMS);
  });

  test("emits RSS and Atom with canonical production IDs, escaped content and own media", () => {
    const source: NoticiaEditorial[] = [
      {
        ...noticias[0]!,
        titulo: 'Título <especial> & "notícia"',
        resumo: "Resumo com & e <marcação>.",
        imagem: {
          id: "asset-test",
          url: "/images/news-test.webp",
          alt: "Imagem da reportagem",
          width: 800,
          height: 600,
        },
      },
    ];
    const now = new Date("2026-10-17T12:30:00.000Z");
    const rss = rssXml({ source, now });
    const atom = atomXml({ source, now });
    const canonical = `https://bancapaulista.org${source[0]!.seo.canonicalPath}`;

    expect(rss).toContain('<rss version="2.0"');
    expect(rss).toContain("<title>Título &lt;especial&gt; &amp; &quot;notícia&quot;</title>");
    expect(rss).toContain(`<guid isPermaLink="true">${canonical}</guid>`);
    expect(rss).toContain(`<media:content url="https://bancapaulista.org/images/news-test.webp"`);
    expect(rss).toContain('type="image/webp"');
    expect(rss).toContain("Fri, 16 Oct 2026 00:00:00 GMT");
    expect(rss).not.toContain("workers.dev");
    expect(rss).not.toContain("localhost");

    expect(atom).toContain('<feed xmlns="http://www.w3.org/2005/Atom"');
    expect(atom).toContain(`<id>${canonical}</id>`);
    expect(atom).toContain("<published>2026-10-16T00:00:00.000Z</published>");
    expect(atom).toContain(
      `<link rel="enclosure" href="https://bancapaulista.org/images/news-test.webp" type="image/webp" />`,
    );
    expect(atom).toContain("Resumo com &amp; e &lt;marcação&gt;.");
    expect(atom).not.toContain("workers.dev");
    expect(atom).not.toContain("localhost");
  });

  test("renders every report once in each feed with canonical URLs", () => {
    const rss = rssXml();
    const atom = atomXml();
    expect(rss.match(/<item>/g)).toHaveLength(15);
    expect(atom.match(/<entry>/g)).toHaveLength(15);
    for (const item of newsFeedItems()) {
      const url = `https://bancapaulista.org${item.seo.canonicalPath}`;
      expect(rss.match(new RegExp(`<guid isPermaLink="true">${url}</guid>`, "g"))).toHaveLength(1);
      expect(atom.match(new RegExp(`<id>${url}</id>`, "g"))).toHaveLength(1);
    }
  });

  test("excludes review records and marks staging feeds noindex", () => {
    const draft = { ...noticias[0]!, status: "rascunho" } as NoticiaEditorial;
    expect(newsFeedItems([draft])).toHaveLength(0);

    const rssResponse = newsFeedResponse("rss", { DEPLOYMENT_ENV: "staging" });
    const atomResponse = newsFeedResponse("atom", { DEPLOYMENT_ENV: "staging" });
    expect(rssResponse.headers.get("Content-Type")).toBe("application/rss+xml; charset=utf-8");
    expect(atomResponse.headers.get("Content-Type")).toBe("application/atom+xml; charset=utf-8");
    expect(rssResponse.headers.get("Cache-Control")).toContain("max-age=300");
    expect(atomResponse.headers.get("X-Robots-Tag")).toBe("noindex, nofollow");
  });
});
