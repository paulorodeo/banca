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
import type {
  Bairro,
  ConteudoJuridico,
  Delegacia,
  InstitutionCategory,
  Regiao,
  Zona,
} from "@/content/types";
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
  regioes,
  zonas,
  bairrosPublicados,
}: {
  regioes: Regiao[];
  zonas: Zona[];
  bairrosPublicados: Bairro[];
}) {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("todas");
  const publishedSlugs = useMemo(
    () => new Set(bairrosPublicados.map((bairro) => bairro.slug)),
    [bairrosPublicados],
  );
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return regioes
      .filter((regiao) => zone === "todas" || regiao.zona === zone)
      .filter(
        (regiao) =>
          !normalized ||
          regiao.nome.toLocaleLowerCase("pt-BR").includes(normalized) ||
          regiao.bairros.some((bairro) => bairro.toLocaleLowerCase("pt-BR").includes(normalized)),
      )
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }, [query, regioes, zone]);

  return (
    <div>
      <div className="grid gap-4 rounded-xl border border-border bg-card p-4 shadow-sm md:grid-cols-[1fr_auto]">
        <label className="relative block">
          <span className="sr-only">Pesquisar bairros publicados</span>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquise por bairro ou região"
            className="h-12 w-full rounded-md border border-input bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
          />
        </label>
        <label className="flex items-center gap-3 text-xs font-semibold text-brand-navy">
          <span>Zona</span>
          <select
            value={zone}
            onChange={(event) => setZone(event.target.value)}
            className="h-12 rounded-md border border-input bg-background px-4 text-sm font-normal text-foreground"
          >
            <option value="todas">Todas</option>
            {zonas.map((zona) => (
              <option key={zona.id} value={zona.slug}>
                {zona.nome}
              </option>
            ))}
          </select>
        </label>
      </div>
      <p className="mt-4 text-sm text-muted-foreground" role="status" aria-live="polite">
        {visible.length}{" "}
        {visible.length === 1 ? "território encontrado" : "territórios encontrados"}
      </p>
      {visible.length ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((regiao) => {
            const hasNeighborhood = publishedSlugs.has(regiao.slug);
            return (
              <li key={regiao.id}>
                <Link
                  to={hasNeighborhood ? `/bairros/${regiao.slug}` : regiao.href}
                  className="group flex h-full items-center justify-between gap-4 rounded-lg border border-border bg-card p-4 text-brand-navy transition-colors hover:border-gold/70"
                >
                  <span>
                    <span className="block font-serif text-lg">{regiao.nome}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {hasNeighborhood ? "Página do bairro" : "Guia territorial existente"}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-5 rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Nenhum território corresponde à pesquisa e ao filtro selecionado.
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
            Profissionais na região
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
          onClick={() => setSort("rotativa")}
          className={cn(
            "rounded px-3 py-2 text-xs font-semibold",
            sort === "rotativa" ? "bg-brand-navy text-ivory" : "text-muted-foreground",
          )}
        >
          Rotativa
        </button>
        <button
          type="button"
          aria-pressed={sort === "az"}
          onClick={() => setSort("az")}
          className={cn(
            "rounded px-3 py-2 text-xs font-semibold",
            sort === "az" ? "bg-brand-navy text-ivory" : "text-muted-foreground",
          )}
        >
          A–Z
        </button>
      </div>
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
          {delegacia.unidade.nomeOficial}
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
