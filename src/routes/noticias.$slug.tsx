import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsArticlePage } from "@/components/site/news-article-page";
import { noticias } from "@/content/local/noticias";
import { noticiaFallback } from "@/content/local/settings";
import { breadcrumbSchema, canonicalLink, newsArticleSchema, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/noticias/$slug")({
  loader: ({ params }) => {
    const noticia = noticias.find((item) => item.slug === params.slug);
    if (!noticia) throw notFound();
    return noticia;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Notícia indisponível | Banca Paulista" },
          { name: "robots", content: "noindex" },
        ],
      };
    const noticia = loaderData;
    return {
      meta: [
        ...pageMeta({
          title: noticia.seo.title,
          description: noticia.seo.description,
          path: noticia.seo.canonicalPath,
          type: "article",
          image: noticia.imagem?.url ?? noticiaFallback.webp,
          imageMetadata: noticia.imagem
            ? {
                ...(noticia.imagem.width !== undefined ? { width: noticia.imagem.width } : {}),
                ...(noticia.imagem.height !== undefined ? { height: noticia.imagem.height } : {}),
                alt: noticia.imagem.alt,
              }
            : { alt: noticiaFallback.alt },
        }).map((meta) =>
          noticia.seo.ogTitle &&
          (meta["property"] === "og:title" || meta["name"] === "twitter:title")
            ? { ...meta, content: noticia.seo.ogTitle }
            : meta,
        ),
        ...(noticia.seo.keywords
          ? [{ name: "keywords", content: noticia.seo.keywords.join(", ") }]
          : []),
      ],
      links: canonicalLink(noticia.seo.canonicalPath),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            newsArticleSchema({
              titulo: noticia.titulo,
              resumo: noticia.resumo,
              path: noticia.seo.canonicalPath,
              publicadoEm: noticia.publicadoEm,
              autoria: noticia.autoria,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Notícias", path: "/noticias" },
              { name: noticia.titulo, path: noticia.seo.canonicalPath },
            ]),
          ),
        },
      ],
    };
  },
  component: NoticiaPage,
});

function NoticiaPage() {
  const noticia = Route.useLoaderData();
  return <NewsArticlePage noticia={noticia} />;
}
