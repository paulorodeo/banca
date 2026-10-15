import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, MapPin, Search } from "lucide-react";
import type { Delegacia, Regiao, Zona } from "@/content/types";
import { cn } from "@/lib/utils";

const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();

export function DistrictDirectory({
  delegacias,
  regioes,
  zonas,
  initialQuery = "",
}: {
  delegacias: Delegacia[];
  regioes: Regiao[];
  zonas: Zona[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [zone, setZone] = useState("todas");
  const regionBySlug = useMemo(
    () => new Map(regioes.map((region) => [region.slug, region])),
    [regioes],
  );
  const visible = useMemo(() => {
    const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
    return delegacias.filter((dp) => {
      const region = regionBySlug.get(dp.regiaoSlug);
      const haystack = normalizeSearch(
        [
          dp.unidade.numero,
          dp.unidade.nomeOficial,
          dp.cardSubtitulo,
          ...dp.bairros,
          ...(region?.bairros ?? []),
        ].join(" "),
      );
      return (
        (zone === "todas" || region?.zona === zone) &&
        terms.every((term) => haystack.includes(term))
      );
    });
  }, [delegacias, query, regionBySlug, zone]);
  return (
    <div>
      <div className="directory-controls rounded-xl border border-border bg-card p-4 shadow-sm">
        <label className="relative block">
          <span className="sr-only">Buscar delegacia, bairro ou número do DP</span>
          <Search
            className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-brand-navy"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar delegacia, bairro ou número do DP"
            className="h-13 w-full rounded-md border border-input bg-background pl-12 pr-4 text-sm text-foreground"
          />
        </label>
        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar delegacias por zona"
        >
          {[{ slug: "todas", nome: "Todas as zonas" }, ...zonas].map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setZone(item.slug)}
              aria-pressed={zone === item.slug}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                zone === item.slug
                  ? "border-brand-navy bg-brand-navy text-ivory"
                  : "border-border text-brand-navy hover:border-gold",
              )}
            >
              {item.nome}
            </button>
          ))}
        </div>
      </div>
      <div className="my-7 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-serif text-3xl text-brand-navy">Guias de delegacias</h2>
        <p role="status" aria-live="polite" className="text-xs text-muted-foreground">
          {visible.length} {visible.length === 1 ? "unidade encontrada" : "unidades encontradas"}
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {visible.map((dp) => {
          const region = regionBySlug.get(dp.regiaoSlug);
          const zoneName = zonas.find((item) => item.slug === region?.zona)?.nome;
          return (
            <article
              key={dp.id}
              className="district-card group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div
                className="district-card-art relative flex h-28 items-center justify-between overflow-hidden bg-brand-navy px-6 text-gold"
                aria-hidden
              >
                <span className="font-serif text-5xl">
                  {dp.unidade.numero}
                  <span className="ml-1 text-base">DP</span>
                </span>
                <Building2 className="size-12 stroke-1 opacity-50" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  {zoneName ?? "São Paulo"}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-brand-navy">
                  <Link
                    to="/delegacias/$slug"
                    params={{ slug: dp.slug }}
                    className="hover:text-gold"
                  >
                    {dp.unidade.nomeOficial}
                  </Link>
                </h3>
                <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                  <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  {dp.cardSubtitulo} · São Paulo
                </p>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Guia informativo sobre a unidade e os procedimentos policiais. Confirme os dados
                  de atendimento nos canais oficiais.
                </p>
                <Link
                  to="/delegacias/$slug"
                  params={{ slug: dp.slug }}
                  className="mt-5 inline-flex min-h-10 items-center gap-3 self-start rounded-md border border-gold/60 px-4 text-xs font-semibold text-brand-navy hover:bg-gold/10"
                >
                  Ver guia <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      {!visible.length && (
        <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">
          <p>Nenhuma unidade corresponde à pesquisa.</p>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-brand-navy underline"
            onClick={() => {
              setQuery("");
              setZone("todas");
            }}
          >
            Limpar busca e filtros
          </button>
        </div>
      )}
    </div>
  );
}
