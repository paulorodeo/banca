import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsArticlePage } from "@/components/site/news-article-page";
import type { NoticiaEditorial } from "@/content/types";
import { breadcrumbSchema, canonicalLink, newsArticleSchema, pageMeta } from "@/lib/seo";

const path = "/noticias/dhenis-martins-dos-santos-discussao-dfir-divulgacao-cpf-endereco";
const seoTitle = "Dhenis Martins dos Santos: nota fiscal exposta no LinkedIn";
const seoDescription =
  "Perfil associado a Dhenis Martins dos Santos publica nota fiscal com CPF e endereço durante discussão no LinkedIn. Entenda o contexto e as questões de privacidade.";

export const Route = createFileRoute(
  "/noticias/dhenis-martins-dos-santos-discussao-dfir-divulgacao-cpf-endereco",
)({
  loader: async () => {
    if (
      !import.meta.env.DEV &&
      import.meta.env.MODE !== "staging" &&
      import.meta.env.MODE !== "production"
    )
      throw notFound();

    const { rascunhoExposicaoDadosLinkedin } =
      await import("@/content/local/rascunho-exposicao-dados-linkedin");
    const noticia: NoticiaEditorial = {
      ...rascunhoExposicaoDadosLinkedin,
      resumo: rascunhoExposicaoDadosLinkedin.linhaFina,
      notas: [],
    };
    return noticia;
  },
  head: ({ loaderData }) => ({
    meta: [
      ...pageMeta({
        title: seoTitle,
        description: seoDescription,
        path,
        type: "article",
      }),
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
  component: StagingNewsPage,
});

function StagingNewsPage() {
  const noticia = Route.useLoaderData();
  return <NewsArticlePage noticia={noticia} />;
}
