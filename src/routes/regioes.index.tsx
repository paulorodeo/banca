import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { Regiao, Zona } from "@/content/types";
import { artigoDaZona } from "@/content/local/zonas";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { CtaReservado, PageHero, RegiaoCard, ZonaCard } from "@/components/site/blocks";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

interface Data {
  zonas: (Zona & { quantidade: number })[];
  porZona: { zona: Zona; regioes: Regiao[] }[];
}

export const Route = createFileRoute("/regioes/")({
  loader: async (): Promise<Data> => {
    const [zonas, regioes] = await Promise.all([content.listZonas(), content.listRegioes()]);
    return {
      zonas: zonas.map((zona) => ({
        ...zona,
        quantidade: regioes.filter((regiao) => regiao.zona === zona.slug).length,
      })),
      porZona: zonas.map((zona) => ({
        zona,
        regioes: regioes.filter((regiao) => regiao.zona === zona.slug),
      })),
    };
  },
  head: () => ({
    meta: pageMeta({
      title: "Regiões em São Paulo | Banca Paulista",
      description:
        "Índice das regiões publicadas pelo portal em São Paulo, organizado por zona da cidade, com contexto territorial e páginas de referência por distrito.",
      path: "/regioes",
    }),
    links: canonicalLink("/regioes"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Regiões", path: "/regioes" },
          ]),
        ),
      },
    ],
  }),
  component: RegioesPage,
});

function RegioesPage() {
  const { zonas, porZona } = Route.useLoaderData() as Data;

  return (
    <>
      <PageHero
        eyebrow="Cobertura territorial"
        title="Regiões em São Paulo"
        lead="Índice organizado por zona da cidade, com páginas territoriais publicadas por distrito e cobertura ampliada de forma gradual."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Regiões", path: "/regioes" },
        ]}
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Zonas"
            title="Conteúdo organizado por zona"
            lead="Cada zona reúne as páginas territoriais publicadas, com contexto local e situações frequentes."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {zonas.map((zona) => (
              <ZonaCard key={zona.id} zona={zona} quantidade={zona.quantidade} />
            ))}
          </div>
        </Container>
      </Section>
      {porZona.map(({ zona, regioes }) =>
        regioes.length > 0 ? (
          <Section key={zona.id} tone={zona.slug === "zona-sul" ? "base" : "raised"}>
            <Container>
              <SectionHeading eyebrow={zona.nome} title={`Regiões publicadas ${artigoDaZona(zona.slug)} ${zona.nome}`} />
              <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {regioes.map((regiao) => (
                  <RegiaoCard key={regiao.id} regiao={regiao} />
                ))}
              </div>
            </Container>
          </Section>
        ) : null,
      )}
      <CtaReservado />
    </>
  );
}
