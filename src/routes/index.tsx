import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  Shield,
  Landmark,
  BookOpen,
  FileText,
  Users,
  Building2,
  Search,
  BriefcaseBusiness,
  Radar,
  Handshake,
  Newspaper,
} from "lucide-react";
import { content } from "@/content/repository";
import { Container } from "@/components/site/primitives";

import { websiteSchema, canonicalLink, pageMeta } from "@/lib/seo";
import type { ConteudoJuridico, Regiao, Zona, Delegacia, Bairro } from "@/content/types";

interface HomeData {
  regioes: Regiao[];
  bairros: Bairro[];
  delegacias: Delegacia[];
  zonas: (Zona & { quantidade: number })[];
  conteudos: ConteudoJuridico[];
  neighborhoods: import("@/content/local/home-highlights").HomeNeighborhoodHighlight[];
  artigosErro?: string;
}
import { readArticles } from "@/content/articles.functions";
import { editorialIllustrations } from "@/content/local/visual-media";
import { homeFeaturedDistricts, homeNeighborhoodHighlights } from "@/content/local/home-highlights";
import { ZoneCardLight } from "@/components/site/territory";
import { withPublishedGuideCounts } from "@/content/local/zonas";
import { NeighborhoodCarousel } from "@/components/site/neighborhood-carousel";
import { editorialIdentity, marca } from "@/content/local/settings";

const TITLE = `${marca.curto} — Informação jurídica e territorial`;
const DESCRIPTION = editorialIdentity.description;

export const Route = createFileRoute("/")({
  loader: async (): Promise<HomeData> => {
    const [regioes, delegacias, bairros, zonas, articles] = await Promise.all([
      content.listRegioes(),
      content.listDelegacias(),
      content.listBairros(),
      content.listZonas(),
      readArticles({ data: { page: 1, limit: 3, sort: "-publishedAt", category: "" } }),
    ]);
    const neighborhoods = await homeNeighborhoodHighlights(regioes, bairros, (slug) =>
      content.getBairro(slug),
    );
    return {
      regioes,
      delegacias,
      bairros,
      neighborhoods,
      zonas: withPublishedGuideCounts(zonas, regioes, delegacias),
      ...(articles.ok
        ? { conteudos: articles.page.docs }
        : { conteudos: [], artigosErro: articles.error }),
    };
  },
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/" }),
    links: [
      ...canonicalLink("/"),
      {
        rel: "preload",
        as: "image",
        href: "/images/sp/ponte-1024.avif",
        imageSrcSet:
          "/images/sp/ponte-640.avif 640w, /images/sp/ponte-1024.avif 1024w, /images/sp/ponte-1440.avif 1440w, /images/sp/ponte.avif 2048w",
        imageSizes: "100vw",
        type: "image/avif",
        fetchPriority: "high",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(websiteSchema("/")) }],
  }),
  component: Index,
});

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold">
      <span className="h-px w-7 bg-gold" aria-hidden />
      {children}
    </p>
  );
}

function HomeHeading({
  eyebrow,
  title,
  lead,
  to,
  cta,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  to: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-brand-navy md:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{lead}</p>
      </div>
      <Link
        to={to}
        className="home-section-action inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-brand-navy hover:underline"
      >
        {cta}
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

function Index() {
  const [heroReady, setHeroReady] = useState(false);
  const [heroPaused, setHeroPaused] = useState(false);
  const secondPhotoRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const img = secondPhotoRef.current;
    if (!img) return;
    let active = true;
    const ready = () => {
      void img
        .decode()
        .then(() => {
          if (active) setHeroReady(true);
        })
        .catch(() => {});
    };
    if (img.complete && img.naturalWidth > 0) ready();
    img.addEventListener("load", ready);
    return () => {
      active = false;
      img.removeEventListener("load", ready);
    };
  }, []);
  const { zonas, delegacias, conteudos, neighborhoods } = Route.useLoaderData();
  const featured = homeFeaturedDistricts(delegacias);
  return (
    <div className="home-light home-page">
      <section className="home-hero relative isolate overflow-hidden bg-brand-navy text-ivory">
        <picture className="absolute inset-0 -z-20 size-full">
          <source
            srcSet="/images/sp/ponte-640.avif 640w, /images/sp/ponte-1024.avif 1024w, /images/sp/ponte-1440.avif 1440w, /images/sp/ponte.avif 2048w"
            sizes="100vw"
            type="image/avif"
          />
          <img
            src="/images/sp/ponte.webp"
            srcSet="/images/sp/ponte-640.webp 640w, /images/sp/ponte-1024.webp 1024w, /images/sp/ponte-1440.webp 1440w, /images/sp/ponte.webp 2048w"
            sizes="100vw"
            alt="Ponte Estaiada ao entardecer, em São Paulo"
            width={2048}
            height={768}
            fetchPriority="high"
            className="size-full object-cover object-[65%_center]"
          />
        </picture>
        <picture
          aria-hidden="true"
          className={`hero-second-image absolute inset-0 -z-20 size-full ${heroReady ? "hero-image-ready" : ""}`}
          style={{ animationPlayState: heroPaused ? "paused" : "running" }}
        >
          <source
            srcSet="/images/sp/masp-640.avif 640w, /images/sp/masp-1024.avif 1024w, /images/sp/masp-1440.avif 1440w, /images/sp/masp.avif 2048w"
            sizes="100vw"
            type="image/avif"
          />
          <img
            src="/images/sp/masp.webp"
            srcSet="/images/sp/masp-640.webp 640w, /images/sp/masp-1024.webp 1024w, /images/sp/masp-1440.webp 1440w, /images/sp/masp.webp 2048w"
            sizes="100vw"
            alt=""
            width={2048}
            height={768}
            loading="lazy"
            fetchPriority="low"
            className="size-full object-cover"
            ref={secondPhotoRef}
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/5" />
        {heroReady && (
          <button
            type="button"
            aria-pressed={heroPaused}
            onClick={() => setHeroPaused((value) => !value)}
            className="hero-motion-control absolute bottom-4 right-5 z-10 rounded-full border border-white/40 bg-brand-navy/80 px-3 py-2 text-xs text-ivory hover:bg-brand-navy"
          >
            {heroPaused ? "Retomar imagens" : "Pausar imagens"}
          </button>
        )}
        <Container className="py-16 md:py-20 lg:py-24">
          <Eyebrow>São Paulo · Guias e informação</Eyebrow>
          <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.02] md:text-6xl lg:text-7xl">
            São Paulo, território por território.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-ivory/85 md:text-base">
            Explore São Paulo por regiões, bairros e instituições. Encontre guias territoriais,
            informações jurídicas e referências para compreender os serviços da capital paulista.
          </p>
          <form action="/delegacias" method="get" role="search" className="home-search">
            <Search className="size-5 shrink-0" aria-hidden />
            <label className="sr-only" htmlFor="home-search">
              Buscar delegacia, bairro ou número do DP
            </label>
            <input
              id="home-search"
              name="q"
              type="search"
              maxLength={100}
              placeholder="Pesquise por bairro, delegacia ou número do DP…"
            />
            <button type="submit" aria-label="Buscar nos guias de delegacias">
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </form>
          <p className="mt-6 flex items-center gap-2 text-xs text-ivory/75">
            <MapPin className="size-3.5" aria-hidden />
            Capital paulista · Portal editorial independente
          </p>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <HomeHeading
            eyebrow="Explore por região"
            title="Cinco regiões, um só portal"
            lead="Guias territoriais e referências para encontrar a informação da sua região."
            to="/regioes"
            cta="Ver todas as regiões"
          />
          <div className="home-zones">
            {zonas.map((zona) => (
              <ZoneCardLight key={zona.id} zona={zona} quantidade={zona.quantidade} compact />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-card py-12 md:py-16">
        <Container>
          <HomeHeading
            eyebrow="Jornalismo e atualidades"
            title="Notícias"
            lead="Cobertura de Justiça, instituições, direitos e acontecimentos que impactam a sociedade."
            to="/noticias"
            cta="Conhecer a editoria"
          />
          <div className="mt-7 flex items-start gap-4 rounded-lg border border-dashed border-brand-navy/25 bg-background p-6 md:p-8">
            <Newspaper className="size-8 shrink-0 text-gold" aria-hidden />
            <div>
              <h3 className="font-serif text-xl text-brand-navy">Cobertura em preparação</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                A Banca Paulista está estruturando sua cobertura jornalística. As reportagens serão
                apresentadas aqui quando estiverem publicadas.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="home-neighborhood-section">
        <Container>
          <HomeHeading
            eyebrow="Explore por bairro"
            title="Bairros em destaque"
            lead="Conheça os bairros e suas referências jurídicas e institucionais."
            to="/regioes"
            cta="Explorar territórios"
          />
          <NeighborhoodCarousel items={neighborhoods} />
        </Container>
      </section>

      <section className="border-y border-border bg-card py-12">
        <Container>
          <HomeHeading
            eyebrow="Instituições e serviços"
            title="Explore instituições jurídicas"
            lead="Guias informativos para compreender os órgãos e serviços da capital paulista."
            to="/delegacias"
            cta="Consultar delegacias"
          />
          <div className="home-institutions mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <Link
              to="/delegacias"
              className="institution-tile rounded-lg border border-gold/60 p-5 text-brand-navy hover:bg-gold/5"
            >
              <Shield className="size-7" aria-hidden />
              <h3 className="mt-4 font-serif text-xl">Delegacias</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {delegacias.length} guias publicados
              </p>
              <ArrowRight className="mt-4 size-4" aria-hidden />
            </Link>
            {[
              { icon: Landmark, name: "Fóruns" },
              { icon: FileText, name: "Cartórios" },
              { icon: Users, name: "INSS" },
              { icon: Building2, name: "Órgãos fiscais" },
              { icon: Landmark, name: "Outras instituições" },
            ].map(({ icon: Icon, name }) => (
              <div key={name} className="rounded-lg border border-border bg-background/50 p-5">
                <Icon className="size-7 text-brand-navy/65" aria-hidden />
                <h3 className="mt-4 font-serif text-xl text-brand-navy">{name}</h3>
                <p className="mt-3 text-xs text-muted-foreground">Em preparação</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <HomeHeading
            eyebrow="Delegacias em destaque"
            title="Acesso direto às principais delegacias de Polícia Civil"
            lead="Seleção editorial de guias informativos sobre delegacias de Polícia Civil de São Paulo. Os cards abrem páginas deste portal, sem vínculo com as unidades."
            to="/delegacias"
            cta="Ver todas as delegacias"
          />
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map(({ guia: dp, titulo, subtitulo }) => (
              <Link
                key={dp.id}
                to="/delegacias/$slug"
                params={{ slug: dp.slug }}
                className="home-featured-guide"
              >
                <span className="home-guide-icon" aria-hidden>
                  <Landmark className="size-7" />
                  <small>{dp.unidade.numero}º DP</small>
                </span>
                <div>
                  <h3 className="mt-4 font-serif text-xl leading-tight text-brand-navy">
                    {titulo}
                  </h3>
                  <p className="mt-3 text-xs text-muted-foreground">
                    {subtitulo ? `${subtitulo} · ` : ""}Guia informativo publicado
                  </p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-brand-navy" aria-hidden />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-card py-12">
        <Container>
          <HomeHeading
            eyebrow="Informação jurídica e cidadania"
            title="Artigos e orientações"
            lead="Informação editorial com autoria e publicação verificadas."
            to="/artigos"
            cta="Ver todos os artigos"
          />
          {conteudos.length ? (
            <div className="dark-cards mt-7 grid gap-5 md:grid-cols-3">
              {conteudos.map((article) => (
                <Link
                  key={article.id}
                  to="/artigos/$slug"
                  params={{ slug: article.slug }}
                  className="home-article-card"
                >
                  {article.capa ? (
                    <img
                      src={article.capa.url}
                      alt={article.capa.alt}
                      width={article.capa.width ?? 100}
                      height={article.capa.height ?? 100}
                      loading="lazy"
                    />
                  ) : (
                    <picture>
                      <source
                        srcSet={`/images/sp/${editorialIllustrations[article.slug] ?? "masp-article-thumb"}.avif`}
                        type="image/avif"
                      />
                      <img
                        src={`/images/sp/${editorialIllustrations[article.slug] ?? "masp-article-thumb"}.webp`}
                        alt=""
                        width={320}
                        height={320}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  )}
                  <div>
                    <h3>{article.titulo}</h3>
                    <p>
                      {article.categoria} ·{" "}
                      <time dateTime={article.publicadoEm}>
                        {new Date(article.publicadoEm).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </time>
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </Link>
              ))}
            </div>
          ) : (
            <div className="mt-7 flex items-start gap-4 rounded-lg border border-border bg-background p-6">
              <BookOpen className="size-7 shrink-0 text-gold" aria-hidden />
              <div>
                <h3 className="font-serif text-xl text-brand-navy">
                  Uma publicação começa com responsabilidade
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Os artigos aparecem aqui quando estiverem disponíveis e aprovados para publicação.
                  Conheça nossa proposta editorial.
                </p>
                <Link
                  to="/sobre"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-navy"
                >
                  Sobre o portal
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>

      <section className="participation-banner relative isolate overflow-hidden bg-brand-navy text-ivory">
        <picture className="absolute inset-0 -z-20 size-full">
          <source srcSet="/images/sp/participacao-profissional.avif" type="image/avif" />
          <img
            src="/images/sp/participacao-profissional.webp"
            alt=""
            width={2172}
            height={724}
            loading="lazy"
            className="size-full object-cover object-right"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-transparent" />
        <Container className="home-participation-content">
          <div className="max-w-3xl">
            <Eyebrow>Participação profissional</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
              É advogado e deseja conhecer a Banca Paulista?
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-ivory/85">
              Conheça a proposta editorial e os critérios de participação de profissionais
              independentes.
            </p>
          </div>
          <Link to="/profissionais" className="home-participation-cta">
            Conhecer a iniciativa
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>

      <section className="home-opportunities border-t border-border py-10 md:py-12">
        <Container>
          <div className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
            {[
              {
                icon: Users,
                title: "Profissionais",
                description:
                  "Amplie sua presença profissional em São Paulo. Conheça o espaço da Banca Paulista para apresentação de perfis independentes e atuação por região.",
                cta: "Conhecer o diretório",
                to: "/profissionais",
              },
              {
                icon: BriefcaseBusiness,
                title: "Vagas",
                description:
                  "Consulte vagas de trabalho divulgadas para São Paulo, organizadas por área e localização.",
                cta: "Explorar vagas",
                to: "/vagas",
              },
              {
                icon: Radar,
                title: "Radar Paulista",
                description:
                  "Fique por dentro do que movimenta São Paulo. Informações, acontecimentos e mudanças relevantes para bairros, empresas e cidadãos.",
                status: "Seção em desenvolvimento",
              },
              {
                icon: Handshake,
                title: "Negócios & Parcerias",
                description:
                  "Sua empresa pode ganhar espaço na Banca Paulista. Conheça possibilidades de divulgação, anúncios de vagas e parcerias institucionais.",
                status: "Canal comercial ainda não disponível",
              },
            ].map(({ icon: Icon, title, description, cta, to, status }) => (
              <article key={title} className="flex min-h-full flex-col px-5 first:pl-0 last:pr-0">
                <Icon className="size-5 text-brand-navy" aria-hidden />
                <h2 className="mt-4 font-serif text-sm text-brand-navy">{title}</h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{description}</p>
                {to && cta ? (
                  <Link
                    to={to}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-xs font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4 hover:text-brand-navy/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                  >
                    {cta} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                ) : (
                  <p className="mt-auto pt-4 text-xs font-medium text-brand-navy/65">{status}</p>
                )}
              </article>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
