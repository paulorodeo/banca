import { createFileRoute } from "@tanstack/react-router";
import { newsFeedResponse } from "@/lib/news-feeds.server";

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: () => newsFeedResponse("rss", process.env),
    },
  },
});
