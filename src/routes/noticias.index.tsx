import { createFileRoute } from "@tanstack/react-router";
import { NoticiasPage } from "./noticias";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/noticias/")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Notícias | Banca Paulista",
        description:
          "Notícias sobre segurança pública, direitos, instituições e acontecimentos de São Paulo.",
        path: "/noticias",
      }),
      { name: "robots", content: "noindex, follow" },
    ],
    links: canonicalLink("/noticias"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Notícias", path: "/noticias" },
          ]),
        ),
      },
    ],
  }),
  component: NoticiasPage,
});
