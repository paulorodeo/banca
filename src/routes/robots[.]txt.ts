import { createFileRoute } from "@tanstack/react-router";
import { runtimePublicOrigin } from "@/lib/public-url";
import { robotsTxt } from "@/lib/sitemap";
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        try {
          return new Response(robotsTxt(runtimePublicOrigin(process.env)), {
            headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
          });
        } catch {
          return new Response("User-agent: *\nDisallow: /\n", {
            status: 503,
            headers: { "Cache-Control": "no-store" },
          });
        }
      },
    },
  },
});
