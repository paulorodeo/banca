import { createFileRoute } from "@tanstack/react-router";
import { isStaging } from "@/lib/indexing";
import { publicSitemap } from "@/lib/sitemap.server";
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        if (isStaging(process.env))
          return new Response("Sitemap desativado no ambiente de homologação.", {
            status: 404,
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-store",
              "X-Robots-Tag": "noindex, nofollow",
            },
          });
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
