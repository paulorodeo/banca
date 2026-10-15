import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { content } from "@/content/repository";
import type { Bairro, ConteudoJuridico, Zona } from "@/content/types";
import { Container } from "@/components/site/primitives";
import {
  InstitutionDirectory,
  type NeighborhoodInstitution,
  ProfessionalSidebar,
  RelatedArticles,
  TerritoryHero,
} from "@/components/site/territory";
import { breadcrumbSchema, canonicalLink, faqSchema, pageMeta } from "@/lib/seo";

interface Data {
  bairro: Bairro;
  zona: Zona;
  institutions: NeighborhoodInstitution[];
  articles: ConteudoJuridico[];
}

export const Route = createFileRoute("/bairros/$slug")({
  loader: async ({ params }): Promise<Data> => {
    const bairro = await content.getBairro(params.slug);
    if (!bairro) throw notFound();

    const zona = await content.getZona(bairro.zona);
    if (!zona) throw notFound();

    const institutions = (
      await Promise.all(
        bairro.instituicoes.map(async (relation) => {
          if (relation.institutionType !== "delegacia") return null;
          const delegacia = await content.getDelegacia(relation.institutionSlug);
          return delegacia
            ? {
                id: relation.id,
                category: relation.category,
                relationLabel: relation.relationLabel,
                relation: relation.relation,
                delegacia,
              }
            : null;
        }),
      )
    ).filter((item): item is NeighborhoodInstitution => item !== null);

    const articles = await content
      .listConteudos()
      .then((items) => items.filter((item) => item.bairros?.includes(bairro.slug)).slice(0, 3))
      .catch(() => []);

    return { bairro, zona, institutions, articles };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          ...pageMeta({
            title: "Bairro indisponível | Banca Paulista",
            description: "Consulte os bairros publicados pela Banca Paulista.",
            path: "/regioes",
          }),
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { bairro, zona } = loaderData as Data;
    return {
      meta: pageMeta({
        title: bairro.seo.title,
        description: bairro.seo.description,
        path: bairro.seo.canonicalPath,
      }),
      links: canonicalLink(bairro.seo.canonicalPath),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Regiões", path: "/regioes" },
              { name: zona.nome, path: `/regioes/${zona.slug}` },
              { name: bairro.nome, path: bairro.seo.canonicalPath },
            ]),
          ),
        },
        { type: "application/ld+json", children: JSON.stringify(faqSchema(bairro.faq)) },
      ],
    };
  },
  component: NeighborhoodPage,
});

function NeighborhoodPage() {
  const { bairro, zona, institutions, articles } = Route.useLoaderData() as Data;

  return (
    <div className="home-light">
      <TerritoryHero
        eyebrow={`São Paulo / ${zona.nome} / ${bairro.nome}`}
        title={bairro.nome}
        lead={bairro.descricao}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Regiões", path: "/regioes" },
          { name: zona.nome, path: `/regioes/${zona.slug}` },
          { name: bairro.nome, path: bairro.seo.canonicalPath },
        ]}
      />

      <section className="border-b border-border py-10 md:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_21rem]">
            <div className="min-w-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Diretório territorial
                </p>
                <h2 className="mt-3 font-serif text-4xl text-brand-navy">
                  Instituições em {bairro.nome}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Consulte os guias publicados e confirme competência, endereço e horário nos canais
                  oficiais antes do deslocamento.
                </p>
              </div>
              <div className="mt-7">
                <InstitutionDirectory items={institutions} neighborhoodName={bairro.nome} />
              </div>
            </div>
            <div>
              <ProfessionalSidebar neighborhoodName={bairro.nome} />
              <RelatedArticles articles={articles} />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-card py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Contexto local
              </p>
              <h2 className="mt-3 font-serif text-4xl text-brand-navy">
                {bairro.nome} no território
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{bairro.introducao}</p>
              <div className="mt-7 rounded-xl border border-border bg-background p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                  Referências urbanas
                </p>
                <ul className="mt-4 space-y-3 text-sm text-brand-navy">
                  {bairro.referenciasUrbanas.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <MapPin className="size-4 text-gold" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-10">
              {bairro.secoes.map((section) => (
                <article key={section.titulo}>
                  <h2 className="font-serif text-3xl text-brand-navy">{section.titulo}</h2>
                  <div className="mt-3 h-px w-12 bg-gold" aria-hidden />
                  {section.paragrafos.map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-sm leading-7 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
              <div>
                <h2 className="font-serif text-3xl text-brand-navy">
                  Bairros vizinhos e referências próximas
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {bairro.bairrosVizinhos.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background px-4 py-2 text-xs text-brand-navy"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/regioes/$slug"
                  params={{ slug: zona.slug }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-gold"
                >
                  Explorar toda a {zona.nome}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Perguntas frequentes
          </p>
          <h2 className="mt-3 font-serif text-4xl text-brand-navy">
            Antes de procurar uma instituição
          </h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {bairro.faq.map((item) => (
              <div key={item.id} className="rounded-xl border border-border bg-card p-6">
                <dt className="flex gap-3 font-serif text-xl text-brand-navy">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                  {item.pergunta}
                </dt>
                <dd className="mt-3 text-sm leading-6 text-muted-foreground">{item.resposta}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </div>
  );
}
