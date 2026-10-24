import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import type { PodcastFeed } from "./podcast-feed";
import { loadPodcastFeed } from "./podcast-feed.server";

type PodcastResult =
  { ok: true; feed: PodcastFeed } | { ok: false; error: "podcast_feed_unavailable" };

export const readPodcastFeed = createServerFn({ method: "GET" }).handler(
  async (): Promise<PodcastResult> => {
    setResponseHeader("Cache-Control", "no-store");
    try {
      return { ok: true, feed: await loadPodcastFeed() };
    } catch {
      return { ok: false, error: "podcast_feed_unavailable" };
    }
  },
);
