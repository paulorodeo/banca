import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsArticlePage } from "@/components/site/news-article-page";
import type { NoticiaEditorial } from "@/content/types";

export const Route = createFileRoute("/noticias/preview-local")({
  loader: async () => {
    if (!import.meta.env.DEV) throw notFound();

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
      { title: "Prévia local — reportagem em revisão | Banca Paulista" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: LocalNewsPreview,
});

function LocalNewsPreview() {
  const noticia = Route.useLoaderData();
  return (
    <>
      <div
        role="status"
        className="border-y border-amber-400 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-950"
      >
        PRÉVIA LOCAL · RASCUNHO EM REVISÃO · NÃO PUBLICAR
      </div>
      <NewsArticlePage noticia={noticia} />
    </>
  );
}
