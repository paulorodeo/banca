import { createFileRoute } from "@tanstack/react-router";
import { NoticiasPage } from "./noticias";
import { encontraCategoriaNoticia } from "@/content/local/noticia-categorias";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

type NoticiasSearch = {
  categoria?: string;
};

export const Route = createFileRoute("/noticias/")({
  validateSearch: (search): NoticiasSearch => {
    const categoria = typeof search["categoria"] === "string" ? search["categoria"] : undefined;
    return categoria && encontraCategoriaNoticia(categoria) ? { categoria } : {};
  },
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Notícias | Banca Paulista",
        description:
          "Notícias sobre segurança pública, direitos, instituições e acontecimentos de São Paulo.",
        path: "/noticias",
      }),
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
  component: NoticiasIndexPage,
});

function NoticiasIndexPage() {
  const { categoria } = Route.useSearch();
  return <NoticiasPage {...(categoria ? { categoriaSlug: categoria } : {})} />;
}
