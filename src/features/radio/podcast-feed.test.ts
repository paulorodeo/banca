import { describe, expect, test } from "bun:test";
import { parsePodcastFeed } from "./podcast-feed";

describe("podcast RSS adapter", () => {
  test("parses, sorts and limits valid audio episodes", () => {
    const items = Array.from(
      { length: 7 },
      (_, index) => `
      <item><title>Episódio &amp; ${index}</title><description><![CDATA[**Resumo** ${index}]]></description>
      <enclosure url="https://audio.example/${index}.mp3" length="279.19" type="audio/mpeg" />
      <guid>episode-${index}</guid><pubDate>Sat, ${10 + index} Oct 2026 08:00:00 -0300</pubDate>
      <itunes:duration>01:${String(index).padStart(2, "0")}</itunes:duration></item>`,
    ).join("");
    const feed = parsePodcastFeed(`<rss><channel><title>Banca</title>${items}</channel></rss>`);
    expect(feed.episodes).toHaveLength(6);
    expect(feed.episodes[0]?.id).toBe("episode-6");
    expect(feed.episodes[0]?.title).toBe("Episódio & 6");
    expect(feed.episodes[0]?.durationSeconds).toBe(66);
    expect(feed.episodes[0]?.description).toBe("Resumo 6");
  });

  test("uses the official feed's duration-shaped enclosure length as fallback", () => {
    const feed = parsePodcastFeed(`<rss><channel><title>Banca</title><item>
      <title>Episódio</title><enclosure url="https://audio.example/a.mp3" length="279.19" type="audio/mpeg" />
    </item></channel></rss>`);
    expect(feed.episodes[0]?.durationSeconds).toBe(279);
  });

  test("rejects insecure and non-audio enclosures", () => {
    const feed = parsePodcastFeed(`<rss><channel><title>Banca</title>
      <item><title>HTTP</title><enclosure url="http://audio.example/a.mp3" type="audio/mpeg" /></item>
      <item><title>Imagem</title><enclosure url="https://audio.example/a.jpg" type="image/jpeg" /></item>
    </channel></rss>`);
    expect(feed.episodes).toEqual([]);
  });
});
