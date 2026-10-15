import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { Delegacia, Regiao, Zona } from "@/content/types";
import { Container } from "@/components/site/primitives";
import { TerritoryHero, ProfessionalSidebar } from "@/components/site/territory";
import { DistrictDirectory } from "@/components/site/district-directory";
import { BookOpen, Shield, Landmark, Users, FileText } from "lucide-react";
import { canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/delegacias";

export const Route = createFileRoute("/delegacias/")({
  validateSearch: (search): { q?: string } =>
    typeof search["q"] === "string" && search["q"].trim()
      ? { q: search["q"].trim().slice(0, 100) }
      : {},
  loader: async (): Promise<{ delegacias: Delegacia[]; regioes: Regiao[]; zonas: Zona[] }> => ({
    delegacias: await content.listDelegacias(),
    regioes: await content.listRegioes(),
    zonas: await content.listZonas(),
  }),
  head: () => ({
    meta: pageMeta({
      title: "Delegacias em São Paulo | Guia Informativo — Banca Paulista",
      description:
        "Páginas informativas sobre delegacias de polícia em São Paulo, com contexto territorial e informação sobre procedimentos policiais.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
  }),
  component: DelegaciasPage,
});

function DelegaciasPage() {
  const { delegacias, regioes, zonas } = Route.useLoaderData();
  const { q } = Route.useSearch();
  return (
    <div className="home-light">
      <div className="border-b border-border bg-card">
        <Container className="flex flex-wrap items-center gap-x-7 gap-y-3 py-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2 font-semibold text-brand-navy">
            <Shield className="size-4" aria-hidden />
            Delegacias
          </span>
          {[
            { icon: Landmark, name: "Fóruns" },
            { icon: Users, name: "Defensorias" },
            { icon: Users, name: "Conselhos Tutelares" },
            { icon: FileText, name: "Cartórios" },
          ].map(({ icon: Icon, name }) => (
            <span key={name} className="flex items-center gap-2">
              <Icon className="size-4" aria-hidden />
              {name}
              <span className="sr-only"> — em preparação</span>
            </span>
          ))}
        </Container>
      </div>
      <TerritoryHero
        eyebrow="Órgãos públicos · Guia informativo"
        title="Delegacias em São Paulo"
        lead="Explore os guias por região e encontre informação para compreender as unidades e os procedimentos policiais da capital."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Delegacias", path: PATH },
        ]}
        image={{
          avifSrc: "/images/sp/ponte.avif",
          fallbackSrc: "/images/sp/ponte.webp",
          alt: "Ponte Estaiada e paisagem metropolitana de São Paulo",
          width: 2048,
          height: 768,
          priority: true,
          focalPoint: "65% center",
        }}
      />
      <section className="py-10 md:py-14">
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="min-w-0">
            <div className="mb-7 flex gap-4 rounded-xl border border-gold/20 bg-gold/5 p-6">
              <BookOpen className="mt-1 size-7 shrink-0 text-gold" aria-hidden />
              <div>
                <h2 className="font-serif text-2xl text-brand-navy">
                  Como usar o guia de delegacias
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Pesquise pelo nome, bairro ou número do DP e filtre por zona. As relações
                  territoriais são editoriais; confirme a unidade competente e os dados de
                  atendimento nos canais oficiais.
                </p>
              </div>
            </div>
            <DistrictDirectory
              delegacias={delegacias}
              regioes={regioes}
              zonas={zonas}
              initialQuery={q ?? ""}
            />
          </div>
          <ProfessionalSidebar neighborhoodName="São Paulo" />
        </Container>
      </section>
    </div>
  );
}
