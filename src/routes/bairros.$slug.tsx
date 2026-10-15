import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ExternalLink, MapPin } from "lucide-react";
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
              {bairro.recorteTerritorial ? (
                <div className="mt-6 rounded-xl border-l-4 border-gold bg-background p-5">
                  <h3 className="font-serif text-xl text-brand-navy">Recorte deste guia</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {bairro.recorteTerritorial}
                  </p>
                </div>
              ) : null}
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
              {bairro.fotoTerritorial ? (
                <figure className="mt-7 flex items-start gap-4 rounded-xl border border-border bg-background p-4">
                  <picture className="size-24 shrink-0 overflow-hidden rounded-lg sm:size-32">
                    <source
                      srcSet={`/images/sp/${bairro.fotoTerritorial.asset}.avif`}
                      type="image/avif"
                    />
                    <img
                      src={`/images/sp/${bairro.fotoTerritorial.asset}.webp`}
                      alt={bairro.fotoTerritorial.alt}
                      width={bairro.fotoTerritorial.width}
                      height={bairro.fotoTerritorial.height}
                      loading="lazy"
                      className="size-full object-cover"
                    />
                  </picture>
                  <figcaption className="min-w-0 text-xs leading-5 text-muted-foreground">
                    <p>{bairro.fotoTerritorial.legenda}</p>
                    <p className="mt-2">
                      Foto: {bairro.fotoTerritorial.autor}.{" "}
                      <a
                        href={bairro.fotoTerritorial.fonteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-gold underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                      >
                        Fonte
                      </a>{" "}
                      e{" "}
                      <a
                        href={bairro.fotoTerritorial.licencaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-gold underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                      >
                        {bairro.fotoTerritorial.licenca}
                      </a>
                      .
                    </p>
                  </figcaption>
                </figure>
              ) : null}
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
                {bairro.bairrosVizinhos.length ? (
                  <>
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
                  </>
                ) : null}
                <Link
                  to="/regioes/$slug"
                  params={{ slug: zona.slug }}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-gold"
                >
                  Explorar toda a {zona.nome}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/regioes"
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                >
                  Ver todas as regiões <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {bairro.viasAcessos?.length ? (
        <section className="border-t border-border py-14 md:py-20" aria-labelledby="vias-bairro">
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              Circulação
            </p>
            <h2 id="vias-bairro" className="mt-3 font-serif text-4xl text-brand-navy">
              Vias e acessos
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Referências para entender o território, sem itinerários ou tempos de deslocamento.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {bairro.viasAcessos.map((acesso) => (
                <article key={acesso.nome} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-serif text-xl text-brand-navy">{acesso.nome}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{acesso.contexto}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {bairro.servicosLocais?.length ? (
        <section
          className="border-y border-border bg-card py-14 md:py-20"
          aria-labelledby="servicos-bairro"
        >
          <Container>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              {bairro.zona === "zona-oeste"
                ? "Instituições e serviços publicados"
                : "Equipamentos publicados"}
            </p>
            <h2 id="servicos-bairro" className="mt-3 font-serif text-4xl text-brand-navy">
              {bairro.zona === "zona-oeste"
                ? "Instituições e serviços no território"
                : "Cultura e serviços no território"}
            </h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {bairro.servicosLocais.map((servico) => (
                <article
                  key={servico.nome}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <h3 className="font-serif text-xl text-brand-navy">{servico.nome}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{servico.contexto}</p>
                  <a
                    href={servico.fonteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                  >
                    Consultar fonte oficial <ExternalLink className="size-4" aria-hidden />
                  </a>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-b border-border py-10 md:py-14">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] xl:grid-cols-[minmax(0,1fr)_21rem]">
            <div className="min-w-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                  Diretório territorial
                </p>
                <h2 className="mt-3 font-serif text-4xl text-brand-navy">
                  Guias institucionais relacionados a {bairro.nome}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Os guias mantêm páginas próprias. A relação editorial com o bairro não define
                  circunscrição ou atendimento. Confirme a unidade competente nos canais oficiais.
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

      {bairro.localizacao ? (
        <section className="py-14 md:py-20" aria-labelledby="localizacao-bairro">
          <Container>
            <div className="max-w-3xl rounded-xl border border-border bg-card p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Localização
              </p>
              <h2 id="localizacao-bairro" className="mt-3 font-serif text-3xl text-brand-navy">
                Onde fica o recorte desta página
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {bairro.localizacao.descricao}
              </p>
              {bairro.localizacao.mapaUrl && bairro.localizacao.mapaLabel ? (
                <a
                  href={bairro.localizacao.mapaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                >
                  {bairro.localizacao.mapaLabel} <ExternalLink className="size-4" aria-hidden />
                </a>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

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
          <p className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">
            Encontrou uma informação territorial que precisa de correção? Use o canal editorial em{" "}
            <Link
              to="/contato"
              className="font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            >
              contato
            </Link>
            .
          </p>
        </Container>
      </section>
    </div>
  );
}
