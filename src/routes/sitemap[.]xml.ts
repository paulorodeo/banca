import { createFileRoute } from "@tanstack/react-router";
import { publicSitemap } from "@/lib/sitemap.server";
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          return new Response(await publicSitemap(process.env), {
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": "no-store",
            },
          });
        } catch {
          return new Response("Sitemap temporariamente indisponível.", {
            status: 503,
            headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
          });
        }
      },
    },
  },
});
