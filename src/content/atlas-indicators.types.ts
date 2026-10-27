export type AtlasIndicatorScope = "BR" | "REGION" | "UF";
export type AtlasIndicatorFreshness = "fresh" | "stale";
export type AtlasIndicator = {
  metric: string; label: string; value: number; unit: string;
  scopeType: AtlasIndicatorScope; scopeCode: string;
  sourceId: string; sourceName: string; sourceUrl: string;
  observedAt: string; fetchedAt: string; freshness: AtlasIndicatorFreshness;
  referencePeriod?: string; decimals?: number;
};
export type AtlasIndicatorResult = {
  status: "ready" | "partial" | "pending" | "unavailable";
  indicators: AtlasIndicator[]; message?: string;
};
export type AtlasIndicatorQuery = {
  layer: "justica" | "politica" | "economia" | "infraestrutura";
  uf?: string; region?: string;
};
