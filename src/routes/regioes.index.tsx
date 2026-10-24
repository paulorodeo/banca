import { createFileRoute } from "@tanstack/react-router";
import { Compass, Map, Network } from "lucide-react";
import { content } from "@/content/repository";
import type { Zona } from "@/content/types";
import { withPublishedGuideCounts } from "@/content/local/zonas";
import { montarIndiceTerritorial, type TerritorioIndice } from "@/content/local/indice-territorial";
import { Container } from "@/components/site/primitives";
import { BancaEditorialBanner } from "@/components/site/banca-editorial-banner";
import {
  NeighborhoodIndex,
  ProfessionalSidebar,
  TerritoryHero,
  ZoneCardLight,
} from "@/components/site/territory";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

interface Data {
  zonas: (Zona & { quantidade: number })[];
  territorios: TerritorioIndice[];
}

export const Route = createFileRoute("/regioes/")({
  loader: async (): Promise<Data> => {
    const [zonas, regioes, bairros, delegacias] = await Promise.all([
      content.listZonas(),
      content.listRegioes(),
      content.listBairros(),
      content.listDelegacias(),
    ]);
    return {
      zonas: withPublishedGuideCounts(zonas, regioes, delegacias),
      territorios: montarIndiceTerritorial(regioes, delegacias, bairros, zonas),
    };
  },
  head: () => ({
    meta: pageMeta({
      title: "Regiões e territórios de São Paulo | Banca Paulista",
      description:
        "Explore as regiões de São Paulo e encontre páginas publicadas de bairros, órgãos públicos e guias territoriais organizados pelas cinco zonas da capital.",
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
  const { zonas, territorios } = Route.useLoaderData() as Data;

  return (
    <div className="home-light">
      <TerritoryHero
        eyebrow="São Paulo · Navegação territorial"
        title="São Paulo, território por território."
        lead="Explore bairros, distritos administrativos e localidades editoriais da capital. Cada guia policial mantém sua identificação própria."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Regiões", path: "/regioes" },
        ]}
        image={{
          avifSrc: "/images/sp/ponte.avif",
          fallbackSrc: "/images/sp/ponte.webp",
          alt: "Ponte Estaiada e paisagem urbana de São Paulo",
          width: 2048,
          height: 768,
          focalPoint: "center 52%",
          priority: true,
        }}
      />

      <section className="py-14 md:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Cinco zonas</p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl text-brand-navy">
            Um ponto de partida para cada território
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            As zonas organizam a descoberta editorial. Dentro de cada hub, bairros e guias
            publicados mantêm seus destinos próprios e suas relações territoriais verificadas.
          </p>
          <div className="regions-zone-grid mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {zonas.map((zona) => (
              <ZoneCardLight key={zona.id} zona={zona} quantidade={zona.quantidade} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-card py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Como funciona
              </p>
              <h2 className="mt-3 font-serif text-4xl text-brand-navy">
                A cidade, conectada pela informação
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Comece por uma zona, explore os bairros e acesse diretamente os guias das
                instituições. As relações territoriais ajudam a navegar; a competência e o
                atendimento devem ser confirmados nos canais oficiais.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Map, title: "Zonas", text: "Cinco portas de entrada para a cidade." },
                {
                  icon: Compass,
                  title: "Bairros",
                  text: "Páginas próprias somente quando publicadas.",
                },
                {
                  icon: Network,
                  title: "Instituições",
                  text: "Relações diretas com guias canônicos.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-lg border border-border bg-background p-5">
                  <Icon className="size-5 text-gold" aria-hidden />
                  <h3 className="mt-4 font-serif text-xl text-brand-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Índice territorial
          </p>
          <h2 className="mt-3 font-serif text-4xl text-brand-navy">Encontre um território</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            O índice distingue bairros, distritos administrativos e localidades editoriais. As
            ligações com guias de delegacias são referências de navegação e não definem a unidade
            responsável por um endereço.
          </p>
          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
            <div className="min-w-0">
              <NeighborhoodIndex territorios={territorios} zonas={zonas} />
            </div>
            <ProfessionalSidebar neighborhoodName="São Paulo" />
          </div>
        </Container>
      </section>
      <BancaEditorialBanner />
    </div>
  );
}
