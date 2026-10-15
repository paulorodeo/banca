import { ExternalLink, FileCheck2, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { radarCategoryLabels, type RadarCategory, type RadarPublicRecord } from "@/content/radar";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeZone: "UTC" }).format(
    new Date(value),
  );
}

export function RadarDirectory({ records }: { records: RadarPublicRecord[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | RadarCategory>("all");
  const [municipality, setMunicipality] = useState("all");
  const [order, setOrder] = useState<"newest" | "oldest">("newest");

  const categories = useMemo(
    () => Array.from(new Set(records.map((record) => record.category))),
    [records],
  );
  const municipalities = useMemo(
    () =>
      Array.from(
        new Map(
          records
            .filter((record) => record.municipalityCode && record.municipalityName)
            .map((record) => [record.municipalityCode!, record.municipalityName!]),
        ),
      ).sort(([, a], [, b]) => a.localeCompare(b, "pt-BR")),
    [records],
  );
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return records
      .filter((record) => category === "all" || record.category === category)
      .filter((record) => municipality === "all" || record.municipalityCode === municipality)
      .filter(
        (record) =>
          !normalized ||
          `${record.title} ${record.summary} ${record.sourceName}`
            .toLocaleLowerCase("pt-BR")
            .includes(normalized),
      )
      .sort((a, b) => {
        const delta = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        return order === "newest" ? delta : -delta;
      });
  }, [category, municipality, order, query, records]);

  return (
    <div>
      <div className="grid gap-4 rounded-xl border border-border bg-card p-4 shadow-sm lg:grid-cols-[minmax(16rem,1fr)_auto_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Pesquisar informações no Radar Paulista</span>
          <Search
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Pesquisar por assunto, órgão ou fonte"
            disabled={!records.length}
            className="h-12 w-full rounded-md border border-input bg-background pl-11 pr-4 text-sm text-foreground disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>
        <label className="flex flex-col gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Categoria
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as "all" | RadarCategory)}
            disabled={!categories.length}
            className="h-12 min-w-44 rounded-md border border-input bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground disabled:opacity-60"
          >
            <option value="all">Todas</option>
            {categories.map((value) => (
              <option key={value} value={value}>
                {radarCategoryLabels[value]}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Município
          <select
            value={municipality}
            onChange={(event) => setMunicipality(event.target.value)}
            disabled={!municipalities.length}
            className="h-12 min-w-40 rounded-md border border-input bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground disabled:opacity-60"
          >
            <option value="all">Todos</option>
            {municipalities.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Ordem
          <select
            value={order}
            onChange={(event) => setOrder(event.target.value === "oldest" ? "oldest" : "newest")}
            disabled={!records.length}
            className="h-12 min-w-36 rounded-md border border-input bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground disabled:opacity-60"
          >
            <option value="newest">Mais recentes</option>
            <option value="oldest">Mais antigos</option>
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted-foreground" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? "informação publicada" : "informações publicadas"}
      </p>

      {visible.length ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((record) => (
            <article
              key={record.id}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
                {radarCategoryLabels[record.category]}
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-brand-navy">
                {record.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                {record.summary}
              </p>
              <dl className="mt-5 space-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <div className="flex justify-between gap-4">
                  <dt>Fonte</dt>
                  <dd className="text-right text-foreground">{record.sourceName}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>Publicação</dt>
                  <dd className="text-right text-foreground">{formatDate(record.publishedAt)}</dd>
                </div>
                {record.lastVerifiedAt ? (
                  <div className="flex justify-between gap-4">
                    <dt>Verificação</dt>
                    <dd className="text-right text-foreground">
                      {formatDate(record.lastVerifiedAt)}
                    </dd>
                  </div>
                ) : null}
                {record.municipalityName ? (
                  <div className="flex justify-between gap-4">
                    <dt>Município</dt>
                    <dd className="text-right text-foreground">{record.municipalityName}</dd>
                  </div>
                ) : null}
              </dl>
              <a
                href={record.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 self-start text-xs font-semibold text-brand-navy hover:text-gold"
              >
                Consultar fonte original <ExternalLink className="size-3.5" aria-hidden />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-border bg-card px-6 py-14 text-center shadow-sm">
          <FileCheck2 className="mx-auto size-9 text-gold" aria-hidden />
          <h2 className="mt-4 font-serif text-3xl text-brand-navy">
            Radar em preparação editorial
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Ainda não há registros aprovados para publicação. Fontes futuras passarão por
            normalização, verificação de privacidade e revisão humana antes de aparecer aqui.
          </p>
          <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-gold" aria-hidden />
            Nenhum exemplo fictício é exibido
          </p>
        </div>
      )}
    </div>
  );
}
