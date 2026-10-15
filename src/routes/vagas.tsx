import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { TerritoryHero } from "@/components/site/territory";
import { canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/vagas")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Vagas | Banca Paulista",
        description: "Oportunidades verificadas publicadas pela Banca Paulista.",
        path: "/vagas",
      }),
      { name: "robots", content: "noindex, follow" },
    ],
    links: canonicalLink("/vagas"),
  }),
  component: VagasPage,
});

function VagasPage() {
  return (
    <main className="home-light">
      <TerritoryHero
        eyebrow="Oportunidades"
        title="Vagas"
        lead="Espaço para oportunidades com origem, prazo e condições verificados antes da publicação."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Vagas", path: "/vagas" },
        ]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="max-w-2xl rounded-xl border border-brand-navy/20 bg-white p-8 shadow-sm">
            <BriefcaseBusiness className="size-7 text-gold" aria-hidden />
            <h2 className="mt-5 font-serif text-3xl text-brand-navy">
              Nenhuma vaga publicada no momento
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-navy/75">
              A Banca Paulista ainda não publicou oportunidades nesta página. Uma vaga aparecerá
              aqui somente depois de confirmados sua origem, suas condições e seu prazo.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
