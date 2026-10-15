import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { articleQuery } from "@/content/articles.queries";
import { Container, Hairline, Section } from "@/components/site/primitives";
import { CtaReservado, PageHero } from "@/components/site/blocks";
import { ArticleRichText } from "@/components/site/article-rich-text";
import { ArticleState, ArticlesPending } from "@/components/site/article-state";
import { articleSchema, breadcrumbSchema, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/artigos/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(articleQuery(params.slug));
    if (data.ok && !data.article) throw notFound();
    return data;
  },
  head: ({ params, loaderData }) => {
    const path = `/artigos/${params.slug}`;
    if (!loaderData?.ok || !loaderData.article)
      return {
        meta: [
          ...pageMeta({
            title: "Artigo indisponível | Banca Paulista",
            description: "Consulte as publicações atuais da Banca Paulista.",
            path,
          }),
          { name: "robots", content: "noindex" },
        ],
      };
    const conteudo = loaderData.article;
    const image = conteudo.capa?.url;
    return {
      meta: pageMeta({
        title: conteudo.seoEditorial?.title ?? `${conteudo.titulo} | Banca Paulista`,
        description: conteudo.seoEditorial?.description ?? conteudo.resumo,
        path,
        type: "article",
        ...(image?.startsWith("https://") ? { image } : {}),
      }).map((meta) =>
        meta["property"] === "og:url" ? { ...meta, content: loaderData.canonicalUrl } : meta,
      ),
      links: [{ rel: "canonical", href: loaderData.canonicalUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            ...articleSchema({
              titulo: conteudo.titulo,
              resumo: conteudo.resumo,
              path,
              publicadoEm: conteudo.publicadoEm,
              ...(conteudo.atualizadoEm ? { atualizadoEm: conteudo.atualizadoEm } : {}),
            }),
            url: loaderData.canonicalUrl,
            ...(image ? { image } : {}),
            ...(conteudo.autor ? { author: { "@type": "Person", name: conteudo.autor.nome } } : {}),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Artigos", path: "/artigos" },
              { name: conteudo.titulo, path },
            ]),
          ),
        },
      ],
    };
  },
  pendingComponent: ArticlesPending,
  errorComponent: () => <ArticleState />,
  notFoundComponent: () => <ArticleState missing />,
  component: ConteudoPage,
});
function ConteudoPage() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(articleQuery(slug));
  if (!data.ok) return <ArticleState />;
  const conteudo = data.article;
  if (!conteudo) return <ArticleState missing />;
  const date = (value: string) =>
    new Date(value).toLocaleDateString("pt-BR", { dateStyle: "long", timeZone: "UTC" });
  return (
    <div className="home-light editorial-page">
      <PageHero
        eyebrow={conteudo.categoria}
        title={conteudo.titulo}
        lead={conteudo.resumo}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Artigos", path: "/artigos" },
          { name: conteudo.titulo, path: `/artigos/${conteudo.slug}` },
        ]}
      />
      <Section>
        <Container>
          <article className="min-w-0 max-w-3xl">
            <p className="text-xs uppercase text-muted-foreground">
              Publicado em {date(conteudo.publicadoEm)}
              {conteudo.atualizadoEm && ` · Atualizado em ${date(conteudo.atualizadoEm)}`}
            </p>
            {conteudo.capa && (
              <figure className="mt-8">
                <img
                  src={conteudo.capa.url}
                  alt={conteudo.capa.alt}
                  width={conteudo.capa.width}
                  height={conteudo.capa.height}
                  className="h-auto w-full"
                  fetchPriority="high"
                />
                {conteudo.capa.caption && (
                  <figcaption className="mt-3 text-sm text-muted-foreground">
                    {conteudo.capa.caption}
                  </figcaption>
                )}
              </figure>
            )}
            <Hairline className="my-8 max-w-24" />
            {conteudo.richText ? (
              <ArticleRichText nodes={conteudo.richText} />
            ) : (
              <div className="space-y-5">
                {conteudo.corpo.map((paragraph, index) => (
                  <p key={index} className="text-base leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
            {conteudo.autor && (
              <footer className="mt-12 border-t border-border pt-6">
                <div className="flex items-start gap-4">
                  {conteudo.autor.foto && (
                    <img
                      src={conteudo.autor.foto.url}
                      alt={conteudo.autor.foto.alt}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="size-16 shrink-0 object-cover"
                    />
                  )}
                  <div>
                    <p className="text-foreground">{conteudo.autor.nome}</p>
                    {conteudo.autor.oab && (
                      <p className="mt-1 text-sm text-muted-foreground">{conteudo.autor.oab}</p>
                    )}
                    {conteudo.autor.bio && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {conteudo.autor.bio}
                      </p>
                    )}
                  </div>
                </div>
              </footer>
            )}
          </article>
        </Container>
      </Section>
      <CtaReservado />
    </div>
  );
}
