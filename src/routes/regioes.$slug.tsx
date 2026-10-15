import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin } from "lucide-react";
import { content } from "@/content/repository";
import type { Bairro, Delegacia, Regiao, Zona } from "@/content/types";
import { artigoDaZona } from "@/content/local/zonas";
import { featuredNeighborhoods, zonePhotography } from "@/content/local/visual-media";
import { Container } from "@/components/site/primitives";
import { ProfessionalSidebar, TerritoryHero } from "@/components/site/territory";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

interface Data {
  zona: Zona;
  regioes: Regiao[];
  bairros: Bairro[];
  outrasZonas: Zona[];
  delegacias: Delegacia[];
}

const existingZoneHeroImages = {
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

export const Route = createFileRoute("/regioes/$slug")({
  loader: async ({ params }): Promise<Data> => {
    const [zona, allRegioes, allBairros, allZonas, allDelegacias] = await Promise.all([
      content.getZona(params.slug),
      content.listRegioes(),
      content.listBairros(),
      content.listZonas(),
      content.listDelegacias(),
    ]);
    if (!zona) throw notFound();
    return {
      zona,
      regioes: allRegioes.filter((regiao) => regiao.zona === zona.slug),
      bairros: allBairros.filter(
        (bairro) => bairro.zona === zona.slug || (zona.slug === "centro" && bairro.slug === "bras"),
      ),
      outrasZonas: allZonas.filter((item) => item.slug !== zona.slug),
      delegacias: allDelegacias.filter((item) =>
        allRegioes.some((regiao) => regiao.zona === zona.slug && regiao.slug === item.regiaoSlug),
      ),
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
        title:
          zona.slug === "zona-oeste"
            ? "Zona Oeste de São Paulo: bairros e informações jurídicas | Banca Paulista"
            : zona.slug === "zona-leste"
              ? "Zona Leste de São Paulo: bairros e informações jurídicas | Banca Paulista"
              : zona.slug === "zona-norte"
                ? "Zona Norte de São Paulo: bairros e informações jurídicas | Banca Paulista"
                : zona.slug === "zona-sul"
                  ? "Zona Sul de São Paulo: bairros e informações jurídicas | Banca Paulista"
                  : zona.slug === "centro"
                    ? "Centro de São Paulo: bairros e informações jurídicas | Banca Paulista"
                    : `${zona.nome}: bairros e informação territorial | Banca Paulista`,
        description:
          zona.slug === "zona-oeste"
            ? "Explore os bairros, as instituições públicas e as informações jurídicas da Zona Oeste de São Paulo."
            : zona.slug === "zona-leste"
              ? "Explore os bairros, as instituições públicas e as informações jurídicas da Zona Leste."
              : zona.slug === "zona-norte"
                ? "Explore os bairros, as instituições públicas e as informações jurídicas da Zona Norte."
                : zona.slug === "zona-sul"
                  ? "Explore os bairros, as instituições públicas e as informações jurídicas da Zona Sul."
                  : zona.slug === "centro"
                    ? "Explore os bairros, as instituições públicas e as informações jurídicas da região central da capital."
                    : `Navegue por bairros e guias publicados ${artigo} ${zona.nome} de São Paulo, com contexto urbano e relações institucionais verificadas.`,
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
  const { zona, regioes, bairros, outrasZonas, delegacias } = Route.useLoaderData() as Data;
  const published = new Set(bairros.map((bairro) => bairro.slug));
  const regionalPhoto = zona.slug === "centro" ? undefined : zonePhotography[zona.slug];
  const regionalHeroImage = regionalPhoto
    ? {
        avifSrc: `/images/sp/${regionalPhoto.asset}.avif`,
        fallbackSrc: `/images/sp/${regionalPhoto.asset}.webp`,
        alt: regionalPhoto.alt,
        width: regionalPhoto.width,
        height: regionalPhoto.height,
        focalPoint: regionalPhoto.position,
        priority: true,
      }
    : undefined;
  const existingHeroImage = zona.slug === "centro" ? existingZoneHeroImages[zona.slug] : undefined;
  const heroImage = regionalHeroImage ?? existingHeroImage;

  return (
    <div className="home-light">
      <TerritoryHero
        eyebrow="São Paulo · Hub territorial"
        title={
          zona.slug === "zona-oeste"
            ? "Zona Oeste de São Paulo"
            : zona.slug === "zona-leste"
              ? "Zona Leste de São Paulo"
              : zona.slug === "zona-norte"
                ? "Zona Norte de São Paulo"
                : zona.slug === "zona-sul"
                  ? "Zona Sul de São Paulo"
                  : zona.slug === "centro"
                    ? "Centro de São Paulo"
                    : zona.nome
        }
        lead={zona.introducao}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Regiões", path: "/regioes" },
          { name: zona.nome, path: `/regioes/${zona.slug}` },
        ]}
        {...(heroImage ? { image: heroImage } : {})}
      />

      {zona.slug === "zona-oeste" ? (
        <ZonaOesteContent
          zona={zona}
          regioes={regioes}
          delegacias={delegacias}
          outrasZonas={outrasZonas}
        />
      ) : zona.slug === "zona-leste" ? (
        <ZonaEditorialContent
          zona={zona}
          bairros={bairros}
          delegacias={delegacias}
          outrasZonas={outrasZonas}
        />
      ) : zona.slug === "zona-norte" || zona.slug === "zona-sul" || zona.slug === "centro" ? (
        <ZonaEditorialContent
          zona={zona}
          bairros={bairros}
          delegacias={delegacias}
          outrasZonas={outrasZonas}
        />
      ) : (
        <>
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
                    Conheça os bairros e os guias institucionais da região. Cada página reúne
                    contexto territorial e referências para a sua consulta.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{regioes.length} territórios</p>
              </div>
              <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
                <div className="grid min-w-0 gap-4 sm:grid-cols-2">
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
                <ProfessionalSidebar neighborhoodName={zona.nome} />
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
        </>
      )}
    </div>
  );
}

function ZonaOesteContent({
  zona,
  regioes,
  delegacias,
  outrasZonas,
}: {
  zona: Zona;
  regioes: Regiao[];
  delegacias: Delegacia[];
  outrasZonas: Zona[];
}) {
  const article = zona.artigoEditorial;

  return (
    <>
      <section className="py-14 md:py-20" aria-labelledby="bairros-zona-oeste">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Territórios publicados
          </p>
          <h2 id="bairros-zona-oeste" className="mt-3 font-serif text-4xl text-brand-navy">
            Bairros da Zona Oeste
          </h2>
          <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {regioes.map((regiao) => {
              return (
                <Link
                  key={regiao.id}
                  to="/bairros/$slug"
                  params={{ slug: regiao.slug }}
                  className="group flex min-h-48 flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-[transform,border-color] hover:-translate-y-0.5 hover:border-gold/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                >
                  <MapPin className="size-5 text-gold" aria-hidden />
                  <h3 className="mt-5 font-serif text-2xl text-brand-navy">{regiao.nome}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                    {regiao.descricao}
                  </p>
                  <span className="mt-5 flex items-center justify-between text-xs font-semibold text-brand-navy">
                    Conhecer o bairro
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

      {article ? (
        <section className="border-y border-border bg-card py-12 md:py-16">
          <Container>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(16rem,3fr)] lg:gap-12">
              <article className="min-w-0">
                <h2 className="font-serif text-3xl leading-tight text-brand-navy md:text-4xl">
                  {article.titulo}
                </h2>
                <div className="mt-4 h-px w-12 bg-gold" aria-hidden />
                {article.secoes.map((section, index) => (
                  <section key={section.titulo ?? `introducao-${index}`} className="mt-7">
                    {section.titulo ? (
                      <h3 className="font-serif text-2xl leading-snug text-brand-navy">
                        {section.titulo}
                      </h3>
                    ) : null}
                    {section.paragrafos.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-8 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </article>
              <div className="min-w-0">
                <ProfessionalSidebar neighborhoodName={zona.nome} />
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-14 md:py-20" aria-labelledby="delegacias-zona-oeste">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Guias informativos publicados
              </p>
              <h2 id="delegacias-zona-oeste" className="mt-3 font-serif text-4xl text-brand-navy">
                Delegacias da Zona Oeste
              </h2>
            </div>
            <Link
              to="/delegacias"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            >
              Ver todas as delegacias <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {delegacias.map((delegacia) => (
              <Link
                key={delegacia.id}
                to="/delegacias/$slug"
                params={{ slug: delegacia.slug }}
                className="group flex min-h-36 flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-gold/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                  Guia de delegacia
                </span>
                <span className="mt-3 font-serif text-xl text-brand-navy">
                  {delegacia.cardTitulo}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {delegacia.cardSubtitulo}
                </span>
                <span className="mt-auto flex items-center gap-2 pt-4 text-xs font-semibold text-brand-navy">
                  Abrir guia informativo <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-brand-navy py-10 text-ivory md:py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Navegação territorial
              </p>
              <h2 className="mt-2 font-serif text-2xl">Outras regiões de São Paulo</h2>
            </div>
            <nav aria-label="Outras regiões">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {outrasZonas.map((item) => (
                  <li key={item.id}>
                    <Link
                      to="/regioes/$slug"
                      params={{ slug: item.slug }}
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-ivory/85 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
                    >
                      {item.nome} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
}

function ZonaEditorialContent({
  zona,
  bairros,
  delegacias,
  outrasZonas,
}: {
  zona: Zona;
  bairros: Bairro[];
  delegacias: Delegacia[];
  outrasZonas: Zona[];
}) {
  const photoByTerritory = new Map(
    featuredNeighborhoods.map((photo) => [photo.territorioId, photo]),
  );
  const article = zona.artigoEditorial;

  return (
    <>
      <section className="py-14 md:py-20" aria-labelledby={`bairros-${zona.slug}`}>
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Territórios publicados
          </p>
          <h2 id={`bairros-${zona.slug}`} className="mt-3 font-serif text-4xl text-brand-navy">
            Bairros e localidades da {zona.nome}
          </h2>
          <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bairros.map((bairro) => {
              const photo = photoByTerritory.get(bairro.slug);
              return (
                <Link
                  key={bairro.slug}
                  to="/bairros/$slug"
                  params={{ slug: bairro.slug }}
                  className="group flex min-h-64 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-[transform,border-color] hover:-translate-y-0.5 hover:border-gold/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                >
                  {photo ? (
                    <picture className="block aspect-[16/9] overflow-hidden bg-muted">
                      <source srcSet={`/images/sp/${photo.asset}.avif`} type="image/avif" />
                      <img
                        src={`/images/sp/${photo.asset}.webp`}
                        alt={photo.alt}
                        width={320}
                        height={180}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </picture>
                  ) : null}
                  <span className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-2xl text-brand-navy">{bairro.nome}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                      {bairro.descricao}
                    </p>
                    <span className="mt-4 flex min-h-11 items-center justify-between text-sm font-semibold text-brand-navy">
                      {zona.slug === "centro" ? "Conhecer a região" : "Conhecer o bairro"}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {article ? (
        <section className="border-y border-border bg-card py-12 md:py-16">
          <Container>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(16rem,3fr)] lg:gap-12">
              <article className="min-w-0">
                <h2 className="font-serif text-3xl leading-tight text-brand-navy md:text-4xl">
                  {article.titulo}
                </h2>
                <div className="mt-4 h-px w-12 bg-gold" aria-hidden />
                {article.secoes.map((section, index) => (
                  <section key={section.titulo ?? `introducao-${index}`} className="mt-7">
                    {section.titulo ? (
                      <h3 className="font-serif text-2xl leading-snug text-brand-navy">
                        {section.titulo}
                      </h3>
                    ) : null}
                    {section.paragrafos.map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-8 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                    {zona.slug === "zona-sul" &&
                    section.titulo === "Bairros e referências territoriais" ? (
                      <p className="mt-4 text-base leading-8 text-muted-foreground">
                        Consulte também a página territorial de{" "}
                        <Link
                          to="/bairros/$slug"
                          params={{ slug: "santo-amaro" }}
                          className="font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                        >
                          Santo Amaro
                        </Link>
                        , cujo recorte editorial se concentra no entorno do Largo Treze.
                      </p>
                    ) : null}
                  </section>
                ))}
              </article>
              <div className="min-w-0">
                <ProfessionalSidebar neighborhoodName={zona.nome} />
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="py-14 md:py-20" aria-labelledby={`delegacias-${zona.slug}`}>
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Guias informativos publicados
              </p>
              <h2
                id={`delegacias-${zona.slug}`}
                className="mt-3 font-serif text-4xl text-brand-navy"
              >
                {zona.slug === "centro"
                  ? "Delegacias da região central"
                  : `Delegacias da ${zona.nome}`}
              </h2>
            </div>
            <Link
              to="/delegacias"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
            >
              Ver todas as delegacias <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {delegacias.map((delegacia) => (
              <Link
                key={delegacia.id}
                to="/delegacias/$slug"
                params={{ slug: delegacia.slug }}
                className="group flex min-h-36 flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-gold/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                  Guia de delegacia
                </span>
                <span className="mt-3 font-serif text-xl text-brand-navy">
                  {delegacia.cardTitulo}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {delegacia.cardSubtitulo}
                </span>
                <span className="mt-auto flex items-center gap-2 pt-4 text-xs font-semibold text-brand-navy">
                  Abrir guia informativo <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-brand-navy py-10 text-ivory md:py-12">
        <Container>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Navegação territorial
              </p>
              <h2 className="mt-2 font-serif text-2xl">Outras regiões de São Paulo</h2>
            </div>
            <nav aria-label="Outras regiões">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {outrasZonas.map((item) => (
                  <li key={item.id}>
                    <Link
                      to="/regioes/$slug"
                      params={{ slug: item.slug }}
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-ivory/85 hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
                    >
                      {item.nome} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </section>
    </>
  );
}
