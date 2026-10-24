import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import type { PodcastFeed } from "./podcast-feed";
import { loadPodcastFeed, type PodcastFeedEnv } from "./podcast-feed.server";

type PodcastResult =
  { ok: true; feed: PodcastFeed } | { ok: false; error: "podcast_feed_unavailable" };

export const readPodcastFeed = createServerFn({ method: "GET" }).handler(
  async (): Promise<PodcastResult> => {
    setResponseHeader("Cache-Control", "no-store");
    try {
      let env: PodcastFeedEnv = {};
      try {
        env = (await import("cloudflare:workers")).env;
      } catch {
        /* Local Vite runtime uses the public feed URL. */
      }
      const fetcher: typeof fetch = env.PODCAST_FEED
        ? (input, init) => env.PODCAST_FEED!.fetch(input, init)
        : fetch;
      return { ok: true, feed: await loadPodcastFeed(fetcher) };
    } catch {
      return { ok: false, error: "podcast_feed_unavailable" };
    }
  },
);
