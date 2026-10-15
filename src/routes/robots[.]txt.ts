import { createFileRoute } from "@tanstack/react-router";
import { runtimePublicOrigin } from "@/lib/public-url";
import { isStaging } from "@/lib/indexing";
import { robotsTxt } from "@/lib/sitemap";
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () => {
        // Permit crawling so search engines can actually read the noindex HTTP header.
        if (isStaging(process.env))
          return new Response("User-agent: *\nAllow: /\n", {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-store",
              "X-Robots-Tag": "noindex, nofollow",
            },
          });
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
