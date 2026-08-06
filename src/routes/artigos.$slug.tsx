import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { ConteudoJuridico } from "@/content/types";
import { Container, Hairline, Section } from "@/components/site/primitives";
import { CtaReservado, PageHero } from "@/components/site/blocks";
import { articleSchema, breadcrumbSchema, canonical, pageMeta } from "@/lib/seo";

interface Data {
  conteudo: ConteudoJuridico;
}

export const Route = createFileRoute("/artigos/$slug")({
  loader: async ({ params }): Promise<Data> => {
    const conteudo = await content.getConteudo(params.slug);
    if (!conteudo) throw notFound();
    return { conteudo };
  },
  head: ({ params, loaderData }) => {
    const path = `/artigos/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [{ title: "Conteúdo indisponível" }, { name: "robots", content: "noindex" }],
      };
    }
    const { conteudo } = loaderData as Data;
    return {
      meta: pageMeta({
        title: `${conteudo.titulo} | Paulo Sinigalia`,
        description: conteudo.resumo,
        path,
        type: "article",
      }),
      links: [{ rel: "canonical", href: canonical(path) }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articleSchema({
              titulo: conteudo.titulo,
              resumo: conteudo.resumo,
              path,
              publicadoEm: conteudo.publicadoEm,
              ...(conteudo.atualizadoEm ? { atualizadoEm: conteudo.atualizadoEm } : {}),
            }),
          ),
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
  component: ConteudoPage,
});

function ConteudoPage() {
  const { conteudo } = Route.useLoaderData() as Data;
  return (
    <>
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
          <article className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Publicado em{" "}
              {new Date(conteudo.publicadoEm).toLocaleDateString("pt-BR", { dateStyle: "long" })}
            </p>
            <Hairline className="my-8 max-w-24" />
            <div className="space-y-5">
              {conteudo.corpo.map((paragrafo) => (
                <p key={paragrafo} className="text-base leading-relaxed text-muted-foreground">
                  {paragrafo}
                </p>
              ))}
            </div>
          </article>
        </Container>
      </Section>
      <CtaReservado />
    </>
  );
}