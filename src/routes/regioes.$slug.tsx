import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { Regiao, Zona } from "@/content/types";
import { artigoDaZona } from "@/content/local/zonas";
import { Container, Hairline, Section, SectionHeading } from "@/components/site/primitives";
import { CtaReservado, PageHero, RegiaoCard } from "@/components/site/blocks";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

interface Data {
  zona: Zona;
  regioes: Regiao[];
}

export const Route = createFileRoute("/regioes/$slug")({
  loader: async ({ params }): Promise<Data> => {
    const zona = await content.getZona(params.slug);
    if (!zona) throw notFound();
    const regioes = await content.listRegioes();
    return { zona, regioes: regioes.filter((regiao) => regiao.zona === zona.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [...pageMeta({ title: "Região indisponível | Banca Paulista", description: "Consulte as regiões publicadas pela Banca Paulista.", path: "/regioes" }), { name: "robots", content: "noindex" }] };
    }
    const { zona } = loaderData as Data;
    const path = `/regioes/${zona.slug}`;
    const artigo = artigoDaZona(zona.slug);
    return {
      meta: pageMeta({
        title: `Delegacias e regiões ${artigo} ${zona.nome} | Banca Paulista`,
        description: `Guia editorial de delegacias e bairros ${artigo} ${zona.nome} de São Paulo. Contexto territorial e informações sobre procedimentos policiais, sem oferta de atendimento jurídico.`,
        path,
      }),
      links: canonicalLink(path),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Regiões", path: "/regioes" },
              { name: zona.nome, path },
            ]),
          ),
        },
      ],
    };
  },
  component: ZonaPage,
});

function ZonaPage() {
  const { zona, regioes } = Route.useLoaderData() as Data;

  return (
    <>
      <PageHero
        eyebrow="Cobertura territorial"
        title={zona.nome}
        lead={zona.introducao}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Regiões", path: "/regioes" },
          { name: zona.nome, path: `/regioes/${zona.slug}` },
        ]}
      />
      <Section>
        <Container>
          <div className="space-y-12">
            {zona.secoes.map((secao) => (
              <article key={secao.titulo}>
                <h2 className="text-2xl text-ivory md:text-3xl">{secao.titulo}</h2>
                <Hairline className="my-6 max-w-16" />
                {secao.paragrafos.map((paragrafo) => (
                  <p
                    key={paragrafo}
                    className="mb-4 text-base leading-relaxed text-muted-foreground"
                  >
                    {paragrafo}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </Container>
      </Section>
      {regioes.length > 0 && (
        <Section tone="raised">
          <Container>
            <SectionHeading
              eyebrow={zona.nome}
              title={`Regiões publicadas ${artigoDaZona(zona.slug)} ${zona.nome}`}
              lead="Páginas territoriais com contexto local, bairros de referência e situações frequentes."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {regioes.map((regiao) => (
                <RegiaoCard key={regiao.id} regiao={regiao} />
              ))}
            </div>
          </Container>
        </Section>
      )}
      <Section><Container><SectionHeading eyebrow={zona.nome} title="Profissionais participantes" lead="Ainda não há profissionais publicados nesta região. A cobertura desta página é editorial e não representa atendimento disponível." /></Container></Section>
      <CtaReservado />
    </>
  );
}
