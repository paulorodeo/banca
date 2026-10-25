import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsArticlePage } from "@/components/site/news-article-page";
import type { NoticiaEditorial } from "@/content/types";

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
  head: () => ({
    meta: [
      { title: "Dhenis Martins dos Santos: nota fiscal exposta no LinkedIn" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
  component: StagingNewsPage,
});

function StagingNewsPage() {
  const noticia = Route.useLoaderData();
  return <NewsArticlePage noticia={noticia} />;
}
