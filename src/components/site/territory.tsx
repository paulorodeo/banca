import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Landmark,
  MapPin,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { filtrarTerritorios, type TerritorioIndice } from "@/content/local/indice-territorial";
import type { ConteudoJuridico, Delegacia, InstitutionCategory, Zona } from "@/content/types";
import { cn } from "@/lib/utils";
import { zonePhotography } from "@/content/local/visual-media";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";
import { Container } from "./primitives";

export interface TerritoryHeroImage {
  avifSrc: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  focalPoint?: string;
  priority?: boolean;
}

const categoryLabels: Record<InstitutionCategory, string> = {
  delegacias: "Delegacias de Polícia",
  "foruns-tribunais": "Fóruns e Tribunais",
  "defensorias-publicas": "Defensorias Públicas",
  "conselhos-tutelares": "Conselhos Tutelares",
  "cartorios-registros": "Cartórios e Registros",
  "outras-instituicoes": "Outras Instituições",
};

export function TerritoryHero({
  eyebrow,
  title,
  lead,
  crumbs,
  image,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs: Crumb[];
  image?: TerritoryHeroImage;
}) {
  return (
    <section className="territory-hero relative isolate overflow-hidden bg-brand-navy text-ivory">
      {image ? (
        <picture className="absolute inset-0 -z-20 block size-full">
          <source srcSet={image.avifSrc} type="image/avif" />
          <img
            src={image.fallbackSrc}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="100vw"
            loading={image.priority ? "eager" : "lazy"}
            fetchPriority={image.priority ? "high" : "auto"}
            decoding="async"
            className="size-full object-cover opacity-75"
            style={{ objectPosition: image.focalPoint ?? "center" }}
          />
        </picture>
      ) : null}
      <div className="absolute inset-0 -z-10 hero-overlay bg-gradient-to-r from-brand-navy via-brand-navy/70 to-brand-navy/10" />
      {!image && (
        <div className="territory-grid" aria-hidden>
          <span>SP</span>
        </div>
      )}
      <Container className="relative py-12 md:py-18">
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-serif text-5xl leading-none md:text-7xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-ivory/82 md:text-lg">{lead}</p>
      </Container>
    </section>
  );
}

export function ZoneCardLight({
  zona,
  quantidade,
  compact = false,
}: {
  zona: Zona;
  quantidade: number;
  compact?: boolean;
}) {
  const image = zonePhotography[zona.slug];
  return (
    <Link
      to="/regioes/$slug"
      params={{ slug: zona.slug }}
      className={cn("home-zone-card", !compact && "zone-card-complete")}
    >
      {image && (
        <picture>
          <source srcSet={`/images/sp/${image.asset}.avif`} type="image/avif" />
          <img
            src={`/images/sp/${image.asset}.webp`}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            style={{ objectPosition: image.position }}
          />
        </picture>
      )}
      <div>
        <h3>{zona.nome}</h3>
        <p>{zona.descricao}</p>
        <span className="home-zone-bottom">
          <span>
            <MapPin className="size-3.5" aria-hidden />
            {quantidade} {quantidade === 1 ? "guia publicado" : "guias publicados"}
          </span>
          <span className="home-round-arrow">
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </span>
      </div>
    </Link>
  );
}

export function NeighborhoodIndex({
  territorios,
  zonas,
}: {
  territorios: TerritorioIndice[];
  zonas: Zona[];
}) {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("todas");
  const visible = useMemo(
    () => filtrarTerritorios(territorios, query, zone),
    [query, territorios, zone],
  );
  const zoneDescriptions: Record<string, string> = {
    centro:
      "Da Liberdade à Santa Cecília, referências urbanas para explorar os guias publicados do centro da cidade.",
    "zona-norte":
      "Bairros, distritos e localidades nos eixos de Santana, Casa Verde, Pirituba e Perus.",
    "zona-leste":
      "Referências territoriais do Brás ao extremo leste, com os guias relacionados a cada lugar.",
    "zona-sul": "Territórios dos eixos Santo Amaro, Ipiranga, Grajaú e demais áreas da zona sul.",
    "zona-oeste":
      "De Pinheiros a Raposo Tavares, lugares com páginas e guias publicados na zona oeste.",
  };
  const typeLabels = {
    bairro: "Bairro",
    "distrito-administrativo": "Distrito administrativo",
    "localidade-editorial": "Localidade editorial",
  };
  const totalGuias = new Set(visible.flatMap((item) => item.guias.map((guia) => guia.slug))).size;
  const totalBairros = visible.filter((item) => item.tipo === "bairro").length;

  return (
    <div>
      <div className="grid gap-4 rounded-xl border border-brand-navy/20 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Pesquisar territórios</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Busque um bairro, distrito ou localidade"
            className="h-12 w-full rounded-md border border-brand-navy/35 bg-white pl-11 pr-4 text-sm text-brand-navy placeholder:text-brand-navy/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          />
        </label>
        <label className="flex items-center gap-3 text-xs font-semibold text-brand-navy">
          <span>Zona</span>
          <select
            value={zone}
            onChange={(event) => setZone(event.target.value)}
            className="h-12 rounded-md border border-brand-navy/35 bg-white px-4 text-sm font-normal text-brand-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            <option value="todas">Todas as zonas</option>
            {zonas.map((zona) => (
              <option key={zona.id} value={zona.slug}>
                {zona.nome}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-5 text-sm text-brand-navy/80" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? "território" : "territórios"} · {totalBairros}{" "}
        {totalBairros === 1 ? "bairro" : "bairros"} · {totalGuias}{" "}
        {totalGuias === 1 ? "guia policial relacionado" : "guias policiais relacionados"}
      </p>
      {visible.length ? (
        <div className="mt-8 space-y-12">
          {zonas.map((zona) => {
            const items = visible.filter((item) => item.zona === zona.slug);
            if (!items.length) return null;
            return (
              <section key={zona.slug} aria-labelledby={`indice-${zona.slug}`}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-brand-navy/20 pb-5">
                  <div>
                    <h3 id={`indice-${zona.slug}`} className="font-serif text-3xl text-brand-navy">
                      {zona.nome}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-navy/75">
                      {zoneDescriptions[zona.slug]}
                    </p>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-navy/70">
                      {items.length}{" "}
                      {items.length === 1 ? "território exibido" : "territórios exibidos"}
                    </p>
                  </div>
                  <Link
                    to="/regioes/$slug"
                    params={{ slug: zona.slug }}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                  >
                    Explorar {zona.nome} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-xl border border-brand-navy/20 bg-white p-5 shadow-sm"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/65">
                        {typeLabels[item.tipo]}
                      </p>
                      <h4 className="mt-2 font-serif text-xl text-brand-navy">{item.nome}</h4>
                      {item.paginaBairro ? (
                        <Link
                          to={item.paginaBairro}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                        >
                          {item.tipo === "distrito-administrativo"
                            ? "Ver página territorial"
                            : "Ver página do bairro"}{" "}
                          <ArrowRight className="size-4" aria-hidden />
                        </Link>
                      ) : null}
                      {item.guias.length ? (
                        <div className="mt-4 border-t border-brand-navy/15 pt-4">
                          <p className="text-xs font-semibold text-brand-navy/70">
                            {item.guias.length === 1
                              ? "Guia policial relacionado"
                              : "Guias policiais relacionados"}
                          </p>
                          <ul className="mt-2 space-y-2">
                            {item.guias.map((guia) => (
                              <li key={guia.slug}>
                                <Link
                                  to="/delegacias/$slug"
                                  params={{ slug: guia.slug }}
                                  className="text-sm text-brand-navy underline decoration-gold underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
                                >
                                  Ver guia da delegacia relacionada: {guia.numero}º DP, {guia.nome}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : !item.paginaBairro ? (
                        <p className="mt-4 text-sm text-brand-navy/70">
                          Sem página própria publicada.
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-brand-navy/30 bg-white p-8 text-center text-sm text-brand-navy/75">
          <p>Nenhum território corresponde à busca e à zona selecionada.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setZone("todas");
            }}
            className="mt-4 rounded-md bg-brand-navy px-4 py-2 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy"
          >
            Limpar busca e filtros
          </button>
        </div>
      )}
    </div>
  );
}

export function ProfessionalSidebar({ neighborhoodName }: { neighborhoodName: string }) {
  const [sort, setSort] = useState<"rotativa" | "az">("rotativa");
  return (
    <aside
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-labelledby="professionals-title"
    >
      <div className="flex gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
          <Users className="size-5" aria-hidden />
        </span>
        <div>
          <h2 id="professionals-title" className="font-serif text-xl text-brand-navy">
            Profissionais da Região
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Perfis independentes com cobertura territorial declarada e publicação verificada.
          </p>
        </div>
      </div>
      <div
        className="mt-5 grid grid-cols-2 rounded-md border border-border p-1"
        aria-label="Ordenação dos profissionais"
      >
        <button
          type="button"
          aria-pressed={sort === "rotativa"}
          disabled
          onClick={() => setSort("rotativa")}
          className={cn(
            "rounded px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60",
            sort === "rotativa" ? "bg-brand-navy text-ivory" : "text-muted-foreground",
          )}
        >
          Rotativa
        </button>
        <button
          type="button"
          aria-pressed={sort === "az"}
          disabled
          onClick={() => setSort("az")}
          className={cn(
            "rounded px-3 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60",
            sort === "az" ? "bg-brand-navy text-ivory" : "text-muted-foreground",
          )}
        >
          A–Z
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        A ordenação ficará disponível quando houver perfis publicados.
      </p>
      <div className="mt-5 rounded-lg bg-muted/60 p-5 text-center">
        <ShieldCheck className="mx-auto size-7 text-gold" aria-hidden />
        <p className="mt-3 font-serif text-lg text-brand-navy">Nenhum perfil publicado</p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          Ainda não há profissionais verificados para {neighborhoodName}. O portal não seleciona
          advogados nem recebe casos jurídicos.
        </p>
        <Link
          to="/profissionais"
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-navy hover:text-gold"
        >
          Entenda a participação profissional <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </aside>
  );
}

export interface NeighborhoodInstitution {
  id: string;
  category: InstitutionCategory;
  relationLabel: string;
  relation: "localizada" | "relacionada";
  delegacia: Delegacia;
}

export function InstitutionCard({ item }: { item: NeighborhoodInstitution }) {
  const { delegacia } = item;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="grid h-32 place-items-center bg-brand-navy text-gold" aria-hidden>
        <Building2 className="size-9 stroke-[1.4]" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-gold">
          {categoryLabels[item.category]}
        </p>
        <h3 className="mt-2 font-serif text-xl leading-tight text-brand-navy">
          {delegacia.unidade.numero}º Distrito Policial, {delegacia.cardSubtitulo}
        </h3>
        <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
          <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold" aria-hidden />
          {item.relationLabel}
        </p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          {item.relation === "localizada"
            ? "Localização verificada no bairro."
            : "Relação territorial editorial; confirme a unidade competente."}
        </p>
        <Link
          to="/delegacias/$slug"
          params={{ slug: delegacia.slug }}
          className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md border border-gold/60 px-4 text-xs font-semibold text-brand-navy transition-colors hover:bg-gold/10"
        >
          Ver guia <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function InstitutionDirectory({
  items,
  neighborhoodName,
}: {
  items: NeighborhoodInstitution[];
  neighborhoodName: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"todas" | InstitutionCategory>("todas");
  const availableCategories = useMemo(
    () => Array.from(new Set(items.map((item) => item.category))),
    [items],
  );
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return items.filter(
      (item) =>
        (category === "todas" || item.category === category) &&
        (!normalized ||
          item.delegacia.unidade.nomeOficial.toLocaleLowerCase("pt-BR").includes(normalized) ||
          item.relationLabel.toLocaleLowerCase("pt-BR").includes(normalized)),
    );
  }, [category, items, query]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">Buscar instituição em {neighborhoodName}</span>
        <Search
          className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar instituição por nome"
          className="h-12 w-full rounded-md border border-input bg-card pl-11 pr-4 text-sm text-foreground shadow-sm"
        />
      </label>
      <div
        className="mt-4 flex gap-2 overflow-x-auto pb-2"
        aria-label="Filtrar instituições por categoria"
      >
        {["todas" as const, ...availableCategories].map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={category === value}
            onClick={() => setCategory(value)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
              category === value
                ? "border-brand-navy bg-brand-navy text-ivory"
                : "border-border bg-card text-brand-navy hover:border-gold",
            )}
          >
            {value === "todas" ? "Todas" : categoryLabels[value]}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground" role="status" aria-live="polite">
        {visible.length}{" "}
        {visible.length === 1 ? "instituição encontrada" : "instituições encontradas"}
      </p>
      {availableCategories.map((sectionCategory) => {
        const sectionItems = visible.filter((item) => item.category === sectionCategory);
        if (!sectionItems.length) return null;
        return (
          <section
            key={sectionCategory}
            className="mt-9"
            aria-labelledby={`category-${sectionCategory}`}
          >
            <div className="flex items-center gap-3">
              <Landmark className="size-5 text-brand-navy" aria-hidden />
              <h2
                id={`category-${sectionCategory}`}
                className="font-serif text-2xl text-brand-navy"
              >
                {categoryLabels[sectionCategory]}
              </h2>
            </div>
            <div
              className={cn(
                "mt-4 grid gap-4",
                sectionItems.length === 1 ? "max-w-md" : "sm:grid-cols-2 xl:grid-cols-3",
              )}
            >
              {sectionItems.map((item) => (
                <InstitutionCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
      {!visible.length ? (
        <div className="mt-6 rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Nenhuma instituição publicada corresponde à busca e ao filtro selecionado.
        </div>
      ) : null}
    </div>
  );
}

export function RelatedArticles({ articles }: { articles: ConteudoJuridico[] }) {
  if (!articles.length) return null;
  return (
    <section
      className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm"
      aria-labelledby="related-title"
    >
      <div className="flex items-center gap-3">
        <BookOpen className="size-5 text-gold" aria-hidden />
        <h2 id="related-title" className="font-serif text-xl text-brand-navy">
          Artigos relacionados
        </h2>
      </div>
      <ul className="mt-4 divide-y divide-border">
        {articles.map((article) => (
          <li key={article.id} className="py-3 first:pt-0 last:pb-0">
            <Link
              to="/artigos/$slug"
              params={{ slug: article.slug }}
              className="group flex items-start justify-between gap-3 text-sm font-semibold text-brand-navy hover:text-gold"
            >
              {article.titulo}
              <ArrowRight
                className="mt-0.5 size-3.5 shrink-0 transition-transform group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
