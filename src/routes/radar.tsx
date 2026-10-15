import { createFileRoute, notFound } from "@tanstack/react-router";
import { Database, FileSearch, GitMerge, ShieldCheck } from "lucide-react";
import { RadarDirectory } from "@/components/site/radar-directory";
import { Container } from "@/components/site/primitives";
import { TerritoryHero } from "@/components/site/territory";
import { content } from "@/content/repository";
import type { RadarPublicRecord } from "@/content/radar";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

interface Data {
  records: RadarPublicRecord[];
}

export const Route = createFileRoute("/radar")({
  beforeLoad: () => {
    throw notFound();
  },
  loader: async (): Promise<Data> => ({ records: await content.listRadarRecords() }),
  head: ({ loaderData }) => {
    const hasRecords = Boolean((loaderData as Data | undefined)?.records.length);
    return {
      meta: [
        ...pageMeta({
          title: "Radar Paulista | Informação institucional e territorial",
          description:
            "Informações institucionais, normativas e territoriais verificadas, com fonte, contexto geográfico e revisão editorial.",
          path: "/radar",
        }),
        ...(!hasRecords ? [{ name: "robots", content: "noindex, follow" }] : []),
      ],
      links: canonicalLink("/radar"),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Radar Paulista", path: "/radar" },
            ]),
          ),
        },
      ],
    };
  },
  component: RadarPage,
});

function RadarPage() {
  const { records } = Route.useLoaderData() as Data;
  return (
    <div className="home-light">
      <TerritoryHero
        eyebrow="Inteligência jurídica e territorial"
        title="Radar Paulista"
        lead="Uma central editorial para informações institucionais, normativas e territoriais verificadas, com proveniência e contexto geográfico."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Radar Paulista", path: "/radar" },
        ]}
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Projeto editorial
              </p>
              <h2 className="mt-3 font-serif text-4xl text-brand-navy">
                Informação pública com contexto e revisão
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                O Radar não replica indiscriminadamente documentos nem publica cada item recebido.
                Registros elegíveis preservam a fonte, as datas e o território, passando por revisão
                antes da exposição pública.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Database,
                  title: "Fontes diversas",
                  text: "Contrato comum para APIs, feeds, documentos e importação manual.",
                },
                {
                  icon: GitMerge,
                  title: "Normalização",
                  text: "Deduplicação e classificação sem dependência obrigatória de IA.",
                },
                {
                  icon: ShieldCheck,
                  title: "Revisão humana",
                  text: "Privacidade e autorização editorial antes da publicação.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
                  <Icon className="size-5 text-gold" aria-hidden />
                  <h3 className="mt-4 font-serif text-xl text-brand-navy">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-background py-14 md:py-20">
        <Container>
          <div className="flex items-start gap-3">
            <FileSearch className="mt-1 size-6 text-gold" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Publicações verificadas
              </p>
              <h2 className="mt-2 font-serif text-4xl text-brand-navy">Consulte o Radar</h2>
            </div>
          </div>
          <div className="mt-8">
            <RadarDirectory records={records} />
          </div>
        </Container>
      </section>
    </div>
  );
}
