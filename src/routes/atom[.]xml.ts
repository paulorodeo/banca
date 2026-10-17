import { createFileRoute } from "@tanstack/react-router";
import { newsFeedResponse } from "@/lib/news-feeds.server";

export const Route = createFileRoute("/atom.xml")({
  server: {
    handlers: {
      GET: () => newsFeedResponse("atom", process.env),
    },
  },
});
