import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Tags } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { TerritoryHero } from "@/components/site/territory";
import { noticias } from "@/content/local/noticias";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

const categories = ["Segurança Pública", "Direito Imobiliário e Urbanístico"] as const;
const orderedNoticias = [...noticias].sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Notícias | Banca Paulista",
        description:
          "Notícias sobre segurança pública, direitos, instituições e acontecimentos de São Paulo.",
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

function date(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("pt-BR", {
    dateStyle: "long",
    timeZone: "UTC",
  });
}

function NoticiasPage() {
  const [featured, ...remaining] = orderedNoticias;
  if (!featured) return null;
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
              <p className="mt-3 text-sm text-muted-foreground">{featured.categoria}</p>
              <h2 className="mt-2 font-serif text-4xl text-brand-navy">{featured.titulo}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                {featured.resumo}
              </p>
              <Link
                to="/noticias/$slug"
                params={{ slug: featured.slug }}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-gold"
              >
                Ler reportagem completa <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="rounded-xl border border-brand-navy/15 bg-card p-7 shadow-sm">
              <p className="font-serif text-xl text-brand-navy">{featured.autoria}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Publicado em {date(featured.publicadoEm)}
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
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {remaining.map((noticia) => (
              <article
                key={noticia.id}
                className="rounded-xl border border-brand-navy/15 bg-card p-7 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  {noticia.categoria}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-brand-navy">{noticia.titulo}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{noticia.resumo}</p>
                <p className="mt-5 text-xs text-muted-foreground">{date(noticia.publicadoEm)}</p>
                <Link
                  to="/noticias/$slug"
                  params={{ slug: noticia.slug }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-gold"
                >
                  Ler reportagem completa <ArrowRight className="size-4" aria-hidden />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
