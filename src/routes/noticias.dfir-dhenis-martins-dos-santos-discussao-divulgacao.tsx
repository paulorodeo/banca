import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsArticlePage } from "@/components/site/news-article-page";
import { noticiaDhenisParaRota } from "@/content/local/noticia-dhenis-route";
import { breadcrumbSchema, canonicalLink, newsArticleSchema, pageMeta } from "@/lib/seo";

const path = "/noticias/dfir-dhenis-martins-dos-santos-discussao-divulgacao";
const seoTitle = "Dhenis Martins dos Santos: nota fiscal exposta no LinkedIn";
const seoDescription =
  "Perfil associado a Dhenis Martins dos Santos publica nota fiscal com CPF e endereço durante discussão no LinkedIn. Entenda o contexto e as questões de privacidade.";

export const Route = createFileRoute(
  "/noticias/dfir-dhenis-martins-dos-santos-discussao-divulgacao",
)({
  loader: async () => {
    if (
      !import.meta.env.DEV &&
      import.meta.env.MODE !== "staging" &&
      import.meta.env.MODE !== "production"
    )
      throw notFound();
    return noticiaDhenisParaRota(path);
  },
  head: ({ loaderData }) => ({
    meta: [
      ...pageMeta({ title: seoTitle, description: seoDescription, path, type: "article" }),
      { name: "robots", content: "noarchive" },
    ],
    links: canonicalLink(path),
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify(
              newsArticleSchema({
                titulo: loaderData.titulo,
                resumo: loaderData.resumo,
                path,
                publicadoEm: loaderData.publicadoEm,
                autoria: loaderData.autoria,
              }),
            ),
          },
          {
            type: "application/ld+json",
            children: JSON.stringify(
              breadcrumbSchema([
                { name: "Início", path: "/" },
                { name: "Notícias", path: "/noticias" },
                { name: loaderData.titulo, path },
              ]),
            ),
          },
        ]
      : [],
  }),
  component: DhenisNewsPage,
});

function DhenisNewsPage() {
  const noticia = Route.useLoaderData();
  return <NewsArticlePage noticia={noticia} />;
}
