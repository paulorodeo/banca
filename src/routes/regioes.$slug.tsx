import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import { content } from "@/content/repository";
import type { Bairro, Regiao, Zona } from "@/content/types";
import { artigoDaZona } from "@/content/local/zonas";
import { Container } from "@/components/site/primitives";
import { TerritoryHero } from "@/components/site/territory";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

const zoneHeroImages = {
  centro: {
    avifSrc: "/images/sp/masp.avif",
    fallbackSrc: "/images/sp/masp.webp",
    alt: "Museu de Arte de São Paulo na Avenida Paulista",
    width: 2048,
    height: 768,
    focalPoint: "center 48%",
    priority: true,
  },
  "zona-sul": {
    avifSrc: "/images/sp/ponte.avif",
    fallbackSrc: "/images/sp/ponte.webp",
    alt: "Ponte Estaiada e paisagem urbana da Zona Sul de São Paulo",
    width: 2048,
    height: 768,
    focalPoint: "center 52%",
    priority: true,
  },
} as const;

interface Data {
  zona: Zona;
  regioes: Regiao[];
  bairros: Bairro[];
  outrasZonas: Zona[];
}

export const Route = createFileRoute("/regioes/$slug")({
  loader: async ({ params }): Promise<Data> => {
    const [zona, regioes, bairros, zonas] = await Promise.all([
      content.getZona(params.slug),
      content.listRegioes(),
      content.listBairros(),
      content.listZonas(),
    ]);
    if (!zona) throw notFound();
    return {
      zona,
      regioes: regioes.filter((regiao) => regiao.zona === zona.slug),
      bairros: bairros.filter((bairro) => bairro.zona === zona.slug),
      outrasZonas: zonas.filter((item) => item.slug !== zona.slug),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          ...pageMeta({
            title: "Região indisponível | Banca Paulista",
            description: "Consulte as regiões publicadas pela Banca Paulista.",
            path: "/regioes",
          }),
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { zona } = loaderData as Data;
    const path = `/regioes/${zona.slug}`;
    const artigo = artigoDaZona(zona.slug);
    return {
      meta: pageMeta({
        title: `${zona.nome}: bairros e informação territorial | Banca Paulista`,
        description: `Navegue por bairros e guias publicados ${artigo} ${zona.nome} de São Paulo, com contexto urbano e relações institucionais verificadas.`,
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
  const { zona, regioes, bairros, outrasZonas } = Route.useLoaderData() as Data;
  const published = new Set(bairros.map((bairro) => bairro.slug));
  const heroImage = zoneHeroImages[zona.slug as keyof typeof zoneHeroImages];

  return (
    <div className="home-light">
      <TerritoryHero
        eyebrow="São Paulo · Hub territorial"
        title={zona.nome}
        lead={zona.introducao}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Regiões", path: "/regioes" },
          { name: zona.nome, path: `/regioes/${zona.slug}` },
        ]}
        image={heroImage}
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Territórios publicados
              </p>
              <h2 className="mt-3 font-serif text-4xl text-brand-navy">
                Explore {artigoDaZona(zona.slug)} {zona.nome}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                Conheça os bairros e os guias institucionais da região. Cada página reúne contexto
                territorial e referências para a sua consulta.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">{regioes.length} territórios</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regioes.map((regiao) => {
              const hasNeighborhood = published.has(regiao.slug);
              return (
                <Link
                  key={regiao.id}
                  to={hasNeighborhood ? `/bairros/${regiao.slug}` : regiao.href}
                  className="group flex min-h-48 flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-[transform,border-color] hover:-translate-y-0.5 hover:border-gold/70"
                >
                  <MapPin className="size-5 text-gold" aria-hidden />
                  <h3 className="mt-5 font-serif text-2xl text-brand-navy">{regiao.nome}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                    {regiao.descricao}
                  </p>
                  <span className="mt-5 flex items-center justify-between text-xs font-semibold text-brand-navy">
                    {hasNeighborhood ? "Explorar bairro" : "Acessar guia existente"}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-card py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-9">
            {zona.secoes.map((secao) => (
              <article key={secao.titulo}>
                <h2 className="font-serif text-3xl text-brand-navy">{secao.titulo}</h2>
                <div className="mt-3 h-px w-12 bg-gold" aria-hidden />
                {secao.paragrafos.map((paragrafo) => (
                  <p key={paragrafo} className="mt-4 text-sm leading-7 text-muted-foreground">
                    {paragrafo}
                  </p>
                ))}
              </article>
            ))}
          </div>
          <aside className="rounded-xl bg-brand-navy p-7 text-ivory">
            <Compass className="size-6 text-gold" aria-hidden />
            <h2 className="mt-5 font-serif text-2xl">Outras zonas de São Paulo</h2>
            <ul className="mt-5 divide-y divide-white/10">
              {outrasZonas.map((item) => (
                <li key={item.id}>
                  <Link
                    to="/regioes/$slug"
                    params={{ slug: item.slug }}
                    className="flex items-center justify-between py-3 text-sm text-ivory/75 hover:text-gold"
                  >
                    {item.nome}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>
    </div>
  );
}
