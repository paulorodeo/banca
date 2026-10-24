export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  audioUrl: string;
  imageUrl?: string;
  durationSeconds?: number;
}

export interface PodcastFeed {
  title: string;
  episodes: PodcastEpisode[];
}

const decodeXml = (value: string) =>
  value
    .replace(/^<!\[CDATA\[|\]\]>$/g, "")
    .replace(/&#(x?[0-9a-f]+);/gi, (_match, code: string) => {
      const parsed = Number.parseInt(code.replace(/^x/i, ""), code.startsWith("x") ? 16 : 10);
      return Number.isFinite(parsed) ? String.fromCodePoint(parsed) : "";
    })
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");

const text = (xml: string, tag: string) => {
  const escaped = tag.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, "i"));
  return match?.[1] ? decodeXml(match[1].trim()) : "";
};

const attribute = (xml: string, tag: string, name: string) => {
  const escaped = tag.replace(":", "\\:");
  const match = xml.match(new RegExp(`<${escaped}\\b[^>]*\\b${name}=["']([^"']+)["'][^>]*>`, "i"));
  return match?.[1] ? decodeXml(match[1].trim()) : "";
};

const secureUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
};

const cleanDescription = (value: string) =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/\*\*|__|[*_`#>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 280);

const duration = (value: string) => {
  if (!value) return undefined;
  const parts = value.split(":").map(Number);
  if (parts.some((part) => !Number.isFinite(part) || part < 0)) return undefined;
  const seconds =
    parts.length === 3
      ? parts[0]! * 3600 + parts[1]! * 60 + parts[2]!
      : parts.length === 2
        ? parts[0]! * 60 + parts[1]!
        : parts.length === 1
          ? parts[0]!
          : 0;
  return seconds > 0 ? Math.round(seconds) : undefined;
};

const enclosureDuration = (value: string) => {
  const seconds = Number(value);
  // The official feed currently exposes seconds in `length` instead of byte size.
  return Number.isFinite(seconds) && seconds > 0 && seconds <= 86_400
    ? Math.round(seconds)
    : undefined;
};

export function parsePodcastFeed(xml: string): PodcastFeed {
  const channel = xml.match(/<channel(?:\s[^>]*)?>([\s\S]*?)<\/channel>/i)?.[1];
  if (!channel) throw new Error("invalid_podcast_feed");
  const channelWithoutItems = channel.replace(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi, "");
  const channelImage =
    secureUrl(attribute(channelWithoutItems, "itunes:image", "href")) ??
    secureUrl(text(text(channelWithoutItems, "image"), "url"));
  const items = [...channel.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)];
  const episodes = items
    .map((match): PodcastEpisode | null => {
      const item = match[1] ?? "";
      const title = text(item, "title");
      const audioUrl = secureUrl(attribute(item, "enclosure", "url"));
      const type = attribute(item, "enclosure", "type");
      const published = new Date(text(item, "pubDate"));
      if (!title || !audioUrl || (type && !type.toLowerCase().startsWith("audio/"))) return null;
      const id = text(item, "guid") || audioUrl;
      const imageUrl = secureUrl(attribute(item, "itunes:image", "href")) ?? channelImage;
      const durationSeconds =
        duration(text(item, "itunes:duration")) ??
        enclosureDuration(attribute(item, "enclosure", "length"));
      return {
        id,
        title,
        description: cleanDescription(text(item, "description")),
        publishedAt: Number.isNaN(published.getTime()) ? "" : published.toISOString(),
        audioUrl,
        ...(imageUrl ? { imageUrl } : {}),
        ...(durationSeconds ? { durationSeconds } : {}),
      };
    })
    .filter((episode): episode is PodcastEpisode => episode !== null)
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .slice(0, 6);
  return { title: text(channelWithoutItems, "title") || "Podcast Banca Digital", episodes };
}
