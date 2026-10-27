import { useEffect, useState } from "react";
import { readAtlasIndicators, type AtlasLayer } from "@/content/atlas.functions";
import type { AtlasIndicator, AtlasIndicatorResult } from "@/content/atlas-indicators.types";

const labels: Record<string, string> = {
  BR: "Brasil",
  Norte: "Região Norte",
  Nordeste: "Região Nordeste",
  "Centro-Oeste": "Região Centro-Oeste",
  Sudeste: "Região Sudeste",
  Sul: "Região Sul",
};

function IndicatorCard({ item }: { item: AtlasIndicator }) {
  const value = item.value.toLocaleString("pt-BR", {
    minimumFractionDigits: item.decimals ?? 0,
    maximumFractionDigits: item.decimals ?? 2,
  });
  const scope =
    item.scopeType === "UF"
      ? (item.label.split("·").at(-1)?.trim() ?? item.scopeCode)
      : (labels[item.scopeCode] ?? item.scopeCode);
  return (
    <article className="brazil-atlas-indicator-card">
      <span>{item.label}</span>
      <strong>
        {value} <small>{item.unit}</small>
      </strong>
      <p>
        {scope} · referência{" "}
        {item.referencePeriod ?? new Date(item.observedAt).toLocaleDateString("pt-BR")}
      </p>
      <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
        Fonte: {item.sourceName}
      </a>
      {item.freshness === "stale" ? (
        <small className="is-stale">Última leitura disponível</small>
      ) : null}
    </article>
  );
}

export function AtlasIndicatorPanel({
  layer,
  uf,
  region,
}: {
  layer: Extract<AtlasLayer, "justica" | "politica" | "economia" | "infraestrutura">;
  uf: string | null;
  region: string | null;
}) {
  const [result, setResult] = useState<AtlasIndicatorResult | null>(null);
  useEffect(() => {
    let active = true;
    setResult(null);
    void readAtlasIndicators({ data: { layer, ...(uf ? { uf } : region ? { region } : {}) } })
      .then((value) => {
        if (active) setResult(value);
      })
      .catch(() => {
        if (active)
          setResult({
            status: "unavailable",
            indicators: [],
            message: "Indicadores temporariamente indisponíveis.",
          });
      });
    return () => {
      active = false;
    };
  }, [layer, region, uf]);

  if (!result)
    return (
      <div className="brazil-atlas-indicators" role="status">
        Consultando fontes oficiais…
      </div>
    );
  if (!result.indicators.length)
    return (
      <div className="brazil-atlas-indicators brazil-atlas-empty">
        <h3>
          {layer === "justica"
            ? "Justiça"
            : layer === "infraestrutura"
              ? "Infraestrutura"
              : "Indicadores"}
        </h3>
        <p>{result.message ?? "Não há dados disponíveis para este recorte."}</p>
      </div>
    );
  return (
    <div className="brazil-atlas-indicators" aria-live="polite">
      {result.message ? <p className="brazil-atlas-indicator-status">{result.message}</p> : null}
      <div className="brazil-atlas-indicator-grid">
        {result.indicators.map((item) => (
          <IndicatorCard key={item.metric} item={item} />
        ))}
      </div>
      <p className="brazil-atlas-indicator-timestamp">
        Atualizado em{" "}
        {new Date(result.indicators[0]?.fetchedAt ?? Date.now()).toLocaleString("pt-BR")}
      </p>
    </div>
  );
}
