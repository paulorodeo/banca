import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenText,
  Building2,
  Landmark,
  Scale,
  Search,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Brand } from "@/components/site/brand";
import { NewsImage } from "@/components/site/news-image";
import { Container } from "@/components/site/primitives";
import { noticias } from "@/content/local/noticias";

const orderedNoticias = [...noticias].sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));
const editorias = [
  {
    label: "Justiça e tribunais",
    icon: Scale,
    slug: "temporal-anhangabau-justica-rejeita-pedido-mp-enchentes-sp",
  },
  {
    label: "Polícia e segurança",
    icon: ShieldCheck,
    slug: "roubos-marginal-pinheiros-cinco-detidos-89-dp",
  },
  {
    label: "Direitos e cidadania",
    icon: Landmark,
    slug: "favela-do-moinho-851-familias-parque-centro-sp",
  },
  {
    label: "Cidades e infraestrutura",
    icon: Building2,
    slug: "linha-2-verde-metro-penha-guarulhos-escavacoes-2032",
  },
  {
    label: "Urbanismo",
    icon: BookOpenText,
    slug: "retrofit-centro-sp-subsidio-25-por-cento-oito-distritos",
  },
  {
    label: "Mercado e serviços",
    icon: TrendingUp,
    slug: "investimentos-1-bilhao-obras-zona-oeste-lapa",
  },
] as const;

export const Route = createFileRoute("/noticias")({ component: Outlet });

function date(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function NoticiasPage() {
  const [featured, ...afterFeatured] = orderedNoticias;
  if (!featured) return null;
  const secondary = afterFeatured.slice(0, 4);
  const latest = afterFeatured.slice(4, 10);
  const archive = afterFeatured.slice(10);
  const emAlta = orderedNoticias.slice(0, 5);

  return (
    <main className="home-light bg-[#fbfaf7] text-brand-navy">
      <section className="border-b border-brand-navy/10 bg-brand-navy text-ivory">
        <Container className="flex min-h-8 items-center justify-between gap-4 py-1.5 text-[0.62rem] font-medium">
          <span className="hidden sm:inline">Jornalismo independente sobre São Paulo</span>
          <span className="sm:hidden">Banca Paulista · Notícias</span>
          <Link to="/sobre" className="rounded-sm text-ivory/75 transition-colors hover:text-gold">
            Conheça a Banca Paulista
          </Link>
        </Container>
      </section>
      <section className="border-b border-brand-navy/10 bg-white">
        <Container className="flex min-h-28 flex-wrap items-center justify-between gap-5 py-5 md:min-h-36">
          <Link to="/" aria-label="Banca Paulista — início" className="rounded-sm">
            <Brand scheme="light" size="large" />
          </Link>
          <Link
            to="/orgaos"
            className="inline-flex min-h-10 items-center gap-3 border border-brand-navy/15 bg-[#fbfaf7] px-4 text-xs text-muted-foreground transition-colors hover:border-gold hover:text-brand-navy"
          >
            <Search className="size-4 text-gold" aria-hidden />
            Buscar órgãos e serviços
          </Link>
        </Container>
      </section>
      <nav
        className="border-b border-gold/30 bg-brand-navy text-ivory"
        aria-label="Navegação editorial"
      >
        <Container className="flex min-h-11 items-center gap-6 overflow-x-auto whitespace-nowrap text-xs font-semibold">
          <Link to="/noticias" className="border-b-2 border-gold py-3 text-gold">
            Notícias
          </Link>
          <Link to="/artigos" className="py-3 text-ivory/80 hover:text-gold">
            Artigos
          </Link>
          <Link to="/regioes" className="py-3 text-ivory/80 hover:text-gold">
            Regiões
          </Link>
          <Link to="/orgaos" className="py-3 text-ivory/80 hover:text-gold">
            Órgãos e serviços
          </Link>
          <Link to="/sobre" className="py-3 text-ivory/80 hover:text-gold">
            Sobre
          </Link>
        </Container>
      </nav>

      <section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(24rem,0.85fr)]">
            <article className="group relative min-h-[30rem] overflow-hidden bg-brand-navy sm:min-h-[35rem]">
              <NewsImage
                image={featured.imagem}
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/55 to-brand-navy/5" />
              <div className="relative flex min-h-[30rem] max-w-4xl flex-col justify-end p-6 text-ivory sm:min-h-[35rem] sm:p-9 md:p-11">
                <p className="w-fit bg-gold px-3 py-1 text-[0.64rem] font-bold uppercase tracking-[0.1em] text-brand-navy">
                  {featured.categoria}
                </p>
                <h1 className="mt-4 max-w-3xl font-serif text-3xl leading-[1.04] text-white sm:text-4xl md:text-5xl">
                  {featured.titulo}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-ivory/85 md:text-base">
                  {featured.resumo}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ivory/75">
                  <span>{featured.autoria}</span>
                  <span aria-hidden>•</span>
                  <time dateTime={featured.publicadoEm}>{date(featured.publicadoEm)}</time>
                </div>
                <Link
                  to="/noticias/$slug"
                  params={{ slug: featured.slug }}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white underline decoration-gold decoration-2 underline-offset-8 transition-colors hover:text-gold"
                >
                  Ler reportagem <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </article>
            <div className="divide-y divide-brand-navy/10 border-y border-brand-navy/10 bg-white xl:border-y-0">
              {secondary.map((item) => (
                <SideHeadline key={item.id} item={item} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-navy/10 bg-white py-5 md:py-6">
        <Container>
          <div className="grid gap-y-5 sm:grid-cols-2 lg:grid-cols-6">
            {editorias.map(({ label, icon: Icon, slug }) => (
              <Link
                key={label}
                to="/noticias/$slug"
                params={{ slug }}
                className="group flex items-start gap-3 border-brand-navy/10 px-3 first:pl-0 sm:border-r lg:last:border-r-0"
              >
                <Icon className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden />
                <span className="font-serif text-sm leading-5 text-brand-navy transition-colors group-hover:text-gold">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section id="ultimas-noticias" className="py-12 md:py-16">
        <Container>
          <div className="grid gap-9 xl:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              <SectionTitle title="Últimas notícias" />
              <div className="mt-7 grid gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
                {latest.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
              {archive.length ? (
                <div className="mt-9 border-t border-brand-navy/15 pt-8">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
                    Mais reportagens
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {archive.map((item) => (
                      <Link
                        key={item.id}
                        to="/noticias/$slug"
                        params={{ slug: item.slug }}
                        className="group flex items-baseline justify-between gap-3 border-b border-brand-navy/10 py-3"
                      >
                        <span className="font-serif text-base leading-5 text-brand-navy group-hover:text-gold">
                          {item.titulo}
                        </span>
                        <ArrowRight className="size-4 shrink-0 text-gold" aria-hidden />
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <aside className="space-y-6" aria-label="Curadoria editorial">
              <section className="bg-brand-navy p-6 text-ivory">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">Em alta</p>
                <ol className="mt-4 space-y-4">
                  {emAlta.map((item, index) => (
                    <li
                      key={item.id}
                      className="flex gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      <span className="font-serif text-2xl text-gold/90">{index + 1}</span>
                      <Link
                        to="/noticias/$slug"
                        params={{ slug: item.slug }}
                        className="text-sm leading-5 text-ivory/90 hover:text-gold"
                      >
                        {item.titulo}
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="border border-brand-navy/15 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                  Cobertura Banca Paulista
                </p>
                <h2 className="mt-3 font-serif text-2xl leading-tight text-brand-navy">
                  Informação verificada para acompanhar São Paulo.
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Reportagens sobre cidades, direitos, segurança pública e instituições, sempre com
                  as fontes no centro da apuração.
                </p>
                <Link
                  to="/sobre"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4 hover:text-gold"
                >
                  Conheça nosso trabalho <ArrowRight className="size-4" aria-hidden />
                </Link>
              </section>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-y border-gold/30 bg-[linear-gradient(105deg,#051c31_0%,#10395a_58%,#b8873e_160%)] py-10 text-ivory md:py-14">
        <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
              Banca Paulista
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-white md:text-4xl">
              Jornalismo independente sobre o que importa para São Paulo.
            </h2>
            <p className="mt-4 text-sm leading-6 text-ivory/80">
              Justiça, instituições, cidades e pessoas em reportagens acessíveis e com contexto.
            </p>
          </div>
          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 self-start border border-gold px-5 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-brand-navy md:self-auto"
          >
            Conheça a Banca Paulista <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Container>
      </section>
    </main>
  );
}

function SideHeadline({ item }: { item: (typeof noticias)[number] }) {
  return (
    <article className="group grid grid-cols-[7rem_1fr] gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[8rem_1fr] xl:min-h-[8.5rem]">
      <NewsImage image={item.imagem} className="aspect-[4/3] size-full object-cover" />
      <div className="pr-1">
        <p className="text-[0.63rem] font-bold uppercase tracking-[0.1em] text-gold">
          {item.categoria}
        </p>
        <h2 className="mt-1 font-serif text-base leading-[1.12] text-brand-navy md:text-lg">
          <Link
            to="/noticias/$slug"
            params={{ slug: item.slug }}
            className="transition-colors group-hover:text-gold"
          >
            {item.titulo}
          </Link>
        </h2>
        <time
          dateTime={item.publicadoEm}
          className="mt-2 block text-[0.68rem] text-muted-foreground"
        >
          {date(item.publicadoEm)}
        </time>
      </div>
    </article>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-end justify-between border-b border-brand-navy/20 pb-3">
      <h2 className="relative font-serif text-3xl text-brand-navy after:absolute after:-bottom-[13px] after:left-0 after:h-0.5 after:w-16 after:bg-gold">
        {title}
      </h2>
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        Cobertura recente
      </span>
    </div>
  );
}

function NewsCard({ item }: { item: (typeof noticias)[number] }) {
  return (
    <article className="group border-b border-brand-navy/15 pb-6">
      <NewsImage image={item.imagem} className="aspect-[16/10] w-full object-cover" />
      <p className="mt-4 text-[0.63rem] font-bold uppercase tracking-[0.1em] text-gold">
        {item.categoria}
      </p>
      <h3 className="mt-2 font-serif text-xl leading-[1.12] text-brand-navy">
        <Link
          to="/noticias/$slug"
          params={{ slug: item.slug }}
          className="transition-colors group-hover:text-gold"
        >
          {item.titulo}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.resumo}</p>
      <time dateTime={item.publicadoEm} className="mt-4 block text-[0.7rem] text-muted-foreground">
        {date(item.publicadoEm)}
      </time>
    </article>
  );
}
