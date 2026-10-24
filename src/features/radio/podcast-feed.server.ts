import { parsePodcastFeed, type PodcastFeed } from "./podcast-feed";

const FEED_URL = "https://feed-banca.paulista.workers.dev/rss.xml";
const CACHE_KEY = "https://banca.internal/podcast-feed-v1";
const MAX_FEED_BYTES = 500_000;
const CACHE_SECONDS = 300;

type SharedCache = Pick<Cache, "match" | "put">;
export interface PodcastFeedEnv {
  PODCAST_FEED?: { fetch: typeof fetch };
}

function runtimeCache(): SharedCache | undefined {
  const storage = globalThis.caches as (CacheStorage & { default?: SharedCache }) | undefined;
  return storage?.default;
}

async function boundedText(response: Response) {
  const declared = Number(response.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_FEED_BYTES)
    throw new Error("podcast_feed_too_large");
  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let output = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_FEED_BYTES) throw new Error("podcast_feed_too_large");
      output += decoder.decode(value, { stream: true });
    }
    return output + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

export async function loadPodcastFeed(fetcher: typeof fetch = fetch): Promise<PodcastFeed> {
  const cache = runtimeCache();
  const cacheRequest = new Request(CACHE_KEY);
  try {
    const cached = await cache?.match(cacheRequest);
    if (cached) return parsePodcastFeed(await boundedText(cached));
  } catch {
    // Cache failure must not prevent a fresh origin read.
  }
  const response = await fetcher(FEED_URL, {
    headers: { Accept: "application/rss+xml, application/xml;q=0.9" },
    credentials: "omit",
    redirect: "error",
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) throw new Error("podcast_feed_unavailable");
  const xml = await boundedText(response);
  const parsed = parsePodcastFeed(xml);
  if (cache) {
    try {
      await cache.put(
        cacheRequest,
        new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": `public, max-age=${CACHE_SECONDS}`,
          },
        }),
      );
    } catch {
      // The validated feed can still be served when cache storage is unavailable.
    }
  }
  return parsed;
}
