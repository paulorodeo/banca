import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ArrowRight,
  BookOpenText,
  ChevronLeft,
  ChevronRight,
  Search,
  TrendingUp,
} from "lucide-react";
import { Brand } from "@/components/site/brand";
import { NewsImage } from "@/components/site/news-image";
import { Container } from "@/components/site/primitives";
import { conteudos } from "@/content/local/artigos-editoriais";
import {
  categoriaNoticiaPorId,
  categoriasNoticias,
  encontraCategoriaNoticia,
  type NoticiaCategoria,
} from "@/content/local/noticia-categorias";
import { noticias } from "@/content/local/noticias";

const orderedNoticias = [...noticias].sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));

export const Route = createFileRoute("/noticias")({
  validateSearch: (search): { categoria?: string } => {
    const categoria = typeof search.categoria === "string" ? search.categoria : undefined;
    return encontraCategoriaNoticia(categoria) ? { categoria } : {};
  },
  component: Outlet,
});

function date(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function NoticiasPage() {
  const { categoria: categoriaSlug } = Route.useSearch();
  const categoriaSelecionada = encontraCategoriaNoticia(categoriaSlug);
  const [featured, ...afterFeatured] = orderedNoticias;
  if (!featured) return null;
  const noticiasFiltradas = categoriaSelecionada
    ? orderedNoticias.filter(
        (noticia) => categoriaNoticiaPorId[noticia.id] === categoriaSelecionada.slug,
      )
    : [];
  const secondary = afterFeatured.slice(0, 4);
  const latest = afterFeatured.slice(4, 10);
  const archive = afterFeatured.slice(10);
  const emAlta = orderedNoticias.slice(0, 5);
  const artigosEmDestaque = conteudos.filter((item) => item.status === "publicado").slice(0, 3);

  return (
    <main className="home-light noticias-editorial bg-white font-sans text-brand-navy">
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
            className="inline-flex min-h-10 items-center gap-3 border border-brand-navy/20 bg-white px-4 text-xs font-semibold text-brand-navy/75 transition-colors hover:border-gold hover:text-brand-navy"
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

      {!categoriaSelecionada ? (
        <section className="bg-white py-7 md:py-8">
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
                  <h1 className="mt-4 max-w-3xl font-[Georgia,serif] text-3xl font-bold leading-[1.05] tracking-[-0.018em] text-white sm:text-[2.35rem] md:text-[2.65rem]">
                    {featured.titulo}
                  </h1>
                  <p className="mt-4 max-w-2xl text-[0.95rem] font-medium leading-6 text-ivory/95 md:text-base">
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
      ) : null}

      <section className="border-y border-brand-navy/15 bg-white py-6 md:py-7">
        <Container>
          <CategoryCarousel categoriaSelecionada={categoriaSelecionada?.slug} />
        </Container>
      </section>

      <section id="ultimas-noticias" className="bg-white py-12 md:py-16">
        <Container>
          {categoriaSelecionada ? (
            <FilteredNews categoria={categoriaSelecionada} noticias={noticiasFiltradas} />
          ) : (
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
                <section className="bg-brand-navy p-6 text-ivory shadow-[0_14px_35px_-26px_rgba(3,26,47,0.9)]">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="size-6 text-gold" strokeWidth={1.8} aria-hidden />
                    <h2 className="font-[Georgia,serif] text-2xl font-bold text-white">Em alta</h2>
                  </div>
                  <ol className="mt-4 space-y-4">
                    {emAlta.map((item, index) => (
                      <li
                        key={item.id}
                        className="flex gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                      >
                        <span className="font-[Georgia,serif] text-2xl font-bold text-gold">
                          {index + 1}
                        </span>
                        <Link
                          to="/noticias/$slug"
                          params={{ slug: item.slug }}
                          className="text-[0.95rem] font-semibold leading-5 text-white hover:text-gold"
                        >
                          {item.titulo}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
                {artigosEmDestaque.length ? (
                  <section className="border border-brand-navy/15 bg-white p-6">
                    <div className="flex items-center justify-between gap-4 border-b border-brand-navy/15 pb-3">
                      <div className="flex items-center gap-2">
                        <BookOpenText className="size-5 text-gold" aria-hidden />
                        <h2 className="font-[Georgia,serif] text-xl font-bold text-brand-navy">
                          Artigos em destaque
                        </h2>
                      </div>
                      <Link
                        to="/artigos"
                        className="text-xs font-bold text-brand-navy underline decoration-gold underline-offset-4 hover:text-gold"
                      >
                        Ver todos
                      </Link>
                    </div>
                    <div className="divide-y divide-brand-navy/10">
                      {artigosEmDestaque.map((item) => (
                        <article key={item.id} className="py-4 first:pt-4 last:pb-0">
                          <p className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-gold">
                            {item.categoria}
                          </p>
                          <h3 className="mt-1 font-[Georgia,serif] text-[1.05rem] font-bold leading-[1.18] text-brand-navy">
                            <Link
                              to="/artigos/$slug"
                              params={{ slug: item.slug }}
                              className="hover:text-gold"
                            >
                              {item.titulo}
                            </Link>
                          </h3>
                          <p className="mt-2 text-sm font-medium leading-5 text-brand-navy/70">
                            {item.resumo}
                          </p>
                        </article>
                      ))}
                    </div>
                  </section>
                ) : null}
                <section className="border border-brand-navy/15 bg-white p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                    Cobertura Banca Paulista
                  </p>
                  <h2 className="mt-3 font-[Georgia,serif] text-2xl font-bold leading-tight text-brand-navy">
                    Informação verificada para acompanhar São Paulo.
                  </h2>
                  <p className="mt-3 text-[0.95rem] font-medium leading-6 text-brand-navy/70">
                    Reportagens sobre cidades, direitos, segurança pública e instituições, sempre
                    com as fontes no centro da apuração.
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
          )}
        </Container>
      </section>

      <section className="border-y border-gold/30 bg-[linear-gradient(105deg,#051c31_0%,#10395a_58%,#b8873e_160%)] py-10 text-ivory md:py-14">
        <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
              Banca Paulista
            </p>
            <h2 className="mt-3 font-[Georgia,serif] text-3xl font-bold leading-tight text-white md:text-4xl">
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

function CategoryCarousel({ categoriaSelecionada }: { categoriaSelecionada?: string }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<{ startX: number; startScrollLeft: number } | null>(null);
  const draggedRef = useRef(false);

  const scrollCategories = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({
      left: direction * Math.max(240, carouselRef.current.clientWidth * 0.72),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="font-[Georgia,serif] text-xl font-bold text-brand-navy">Editorias</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollCategories(-1)}
            className="grid size-9 place-items-center border border-brand-navy/20 text-brand-navy transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="Mostrar editorias anteriores"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollCategories(1)}
            className="grid size-9 place-items-center border border-brand-navy/20 text-brand-navy transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="Mostrar mais editorias"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
      <div className="relative">
        <div
          ref={carouselRef}
          tabIndex={0}
          role="region"
          aria-label="Navegação por editorias"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              scrollCategories(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              scrollCategories(1);
            }
          }}
          onPointerDown={(event) => {
            pointerRef.current = {
              startX: event.clientX,
              startScrollLeft: event.currentTarget.scrollLeft,
            };
            draggedRef.current = false;
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const pointer = pointerRef.current;
            if (!pointer) return;
            const distance = event.clientX - pointer.startX;
            if (Math.abs(distance) > 4) draggedRef.current = true;
            event.currentTarget.scrollLeft = pointer.startScrollLeft - distance;
          }}
          onPointerUp={() => {
            pointerRef.current = null;
          }}
          onPointerCancel={() => {
            pointerRef.current = null;
          }}
          className="-mx-5 flex snap-x snap-mandatory gap-0 overflow-x-auto px-5 pb-2 pr-16 [scrollbar-width:thin] sm:-mx-7 sm:px-7 md:-mx-10 md:px-10"
        >
          {categoriasNoticias.map(({ slug, nome, descricao, icone: Icon }) => {
            const ativa = categoriaSelecionada === slug;
            return (
              <Link
                key={slug}
                to="/noticias"
                search={{ categoria: slug }}
                aria-current={ativa ? "page" : undefined}
                onClick={(event) => {
                  if (draggedRef.current) {
                    event.preventDefault();
                    draggedRef.current = false;
                  }
                }}
                className={`group flex w-[13.25rem] shrink-0 snap-start items-start gap-3 border-r border-brand-navy/15 px-4 py-2 first:pl-0 last:border-r-0 ${
                  ativa ? "bg-[#f8f8f6]" : "bg-white"
                }`}
              >
                <Icon className="mt-0.5 size-7 shrink-0 text-gold" strokeWidth={1.8} aria-hidden />
                <span>
                  <span className="block font-[Georgia,serif] text-[0.97rem] font-bold leading-5 text-brand-navy transition-colors group-hover:text-gold">
                    {nome}
                  </span>
                  <span className="mt-1 block text-xs font-medium leading-4 text-brand-navy/65">
                    {descricao}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"
        />
      </div>
    </div>
  );
}

function FilteredNews({
  categoria,
  noticias: noticiasFiltradas,
}: {
  categoria: NoticiaCategoria;
  noticias: (typeof noticias)[number][];
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-5 border-b border-brand-navy/20 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-gold">Editoria</p>
          <h1 className="mt-2 font-[Georgia,serif] text-3xl font-bold tracking-[-0.015em] text-brand-navy md:text-[2.5rem]">
            {categoria.nome}
          </h1>
          <p className="mt-2 text-[0.95rem] font-medium text-brand-navy/70">
            {categoria.descricao}
          </p>
        </div>
        <Link
          to="/noticias"
          search={{}}
          className="text-sm font-bold text-brand-navy underline decoration-gold decoration-2 underline-offset-4 hover:text-gold"
        >
          Ver todas as notícias
        </Link>
      </div>
      {noticiasFiltradas.length ? (
        <div className="mt-8 grid gap-x-6 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {noticiasFiltradas.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-8 border-l-4 border-gold bg-[#f8f8f6] p-6 text-brand-navy">
          <h2 className="font-[Georgia,serif] text-2xl font-bold">
            Ainda não há reportagens nesta editoria.
          </h2>
          <p className="mt-2 text-[0.95rem] font-medium leading-6 text-brand-navy/70">
            Acompanhe a cobertura geral enquanto novas matérias são publicadas.
          </p>
        </div>
      )}
    </div>
  );
}

function SideHeadline({ item }: { item: (typeof noticias)[number] }) {
  return (
    <article className="group grid grid-cols-[7.25rem_1fr] gap-4 py-4 first:pt-0 last:pb-0 sm:grid-cols-[8.25rem_1fr] xl:min-h-[8.55rem]">
      <NewsImage image={item.imagem} className="aspect-[4/3] size-full object-cover" />
      <div className="pr-1">
        <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-gold">
          {item.categoria}
        </p>
        <h2 className="mt-1 font-[Georgia,serif] text-[1.06rem] font-bold leading-[1.14] tracking-[-0.01em] text-brand-navy md:text-[1.16rem]">
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
          className="mt-2 block text-[0.72rem] font-medium text-brand-navy/60"
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
      <h2 className="relative font-[Georgia,serif] text-[2rem] font-bold tracking-[-0.015em] text-brand-navy after:absolute after:-bottom-[13px] after:left-0 after:h-1 after:w-16 after:bg-gold">
        {title}
      </h2>
      <span className="text-xs font-bold uppercase tracking-[0.1em] text-brand-navy/60">
        Cobertura recente
      </span>
    </div>
  );
}

function NewsCard({ item }: { item: (typeof noticias)[number] }) {
  return (
    <article className="group border-b border-brand-navy/15 pb-6">
      <NewsImage image={item.imagem} className="aspect-[16/10] w-full object-cover" />
      <p className="mt-4 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-gold">
        {item.categoria}
      </p>
      <h3 className="mt-2 font-[Georgia,serif] text-[1.25rem] font-bold leading-[1.14] tracking-[-0.012em] text-brand-navy">
        <Link
          to="/noticias/$slug"
          params={{ slug: item.slug }}
          className="transition-colors group-hover:text-gold"
        >
          {item.titulo}
        </Link>
      </h3>
      <p className="mt-3 text-[0.95rem] font-medium leading-6 text-brand-navy/70">{item.resumo}</p>
      <time
        dateTime={item.publicadoEm}
        className="mt-4 block text-[0.72rem] font-medium text-brand-navy/60"
      >
        {date(item.publicadoEm)}
      </time>
    </article>
  );
}
