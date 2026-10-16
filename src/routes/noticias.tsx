import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Newspaper, Tags } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { TerritoryHero } from "@/components/site/territory";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

const categories = [
  "Justiça e Tribunais",
  "Polícia e Segurança",
  "Ministério Público e Defensoria",
  "Legislação e Direitos",
  "Política e Sociedade",
  "Mercado Jurídico",
  "Radar territorial e acontecimentos locais",
] as const;

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Notícias | Banca Paulista",
        description:
          "Notícias sobre Justiça, segurança pública, direitos, instituições e acontecimentos de São Paulo e do Brasil.",
        path: "/noticias",
      }),
      { name: "robots", content: "noindex, follow" },
    ],
    links: canonicalLink("/noticias"),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Notícias", path: "/noticias" },
          ]),
        ),
      },
    ],
  }),
  component: NoticiasPage,
});

function NoticiasPage() {
  return (
    <main className="home-light">
      <TerritoryHero
        eyebrow="Editorias Banca Paulista"
        title="Notícias"
        lead="Justiça, segurança pública, direitos e acontecimentos que movimentam São Paulo e o Brasil."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Notícias", path: "/noticias" },
        ]}
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Em destaque
              </p>
              <h2 className="mt-3 font-serif text-4xl text-brand-navy">Reportagem principal</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Este espaço receberá a reportagem de maior relevância, com imagem, categoria,
                manchete, resumo, autoria, data e acesso à publicação completa.
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-brand-navy/25 bg-card p-7 text-center shadow-sm">
              <Newspaper className="mx-auto size-8 text-gold" aria-hidden />
              <p className="mt-4 font-serif text-xl text-brand-navy">Destaque em preparação</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Nenhuma reportagem foi publicada nesta editoria ainda.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-background py-14 md:py-20">
        <Container>
          <div className="flex items-start gap-3">
            <Tags className="mt-1 size-6 text-gold" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Cobertura editorial
              </p>
              <h2 className="mt-2 font-serif text-4xl text-brand-navy">Categorias</h2>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-brand-navy/15 bg-card px-4 py-2 text-sm font-medium text-brand-navy"
              >
                {category}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <div className="flex items-start gap-3">
            <Clock3 className="mt-1 size-6 text-gold" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Em ordem cronológica
              </p>
              <h2 className="mt-2 font-serif text-4xl text-brand-navy">Últimas notícias</h2>
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-dashed border-brand-navy/25 bg-card p-8 text-center shadow-sm md:p-12">
            <Newspaper className="mx-auto size-9 text-gold" aria-hidden />
            <p className="mt-5 font-serif text-2xl text-brand-navy">Em preparação.</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
              A Banca Paulista está estruturando sua cobertura jornalística.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
