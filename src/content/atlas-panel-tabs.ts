import type { AtlasLayer } from "./atlas.functions";

export type AtlasPanelTab = "news" | "indicators" | "markets" | "conditions" | "map-data";
export type AtlasPanelTabDefinition = { id: AtlasPanelTab; label: string };

export function panelTabs(layer: AtlasLayer): AtlasPanelTabDefinition[] {
  if (layer === "noticias") return [{ id: "news", label: "Notícias" }];
  if (layer === "clima")
    return [
      { id: "conditions", label: "Condições" },
      { id: "news", label: "Notícias" },
    ];
  if (layer === "rodovias")
    return [
      { id: "map-data", label: "Mapa e dados" },
      { id: "news", label: "Notícias" },
    ];
  if (layer === "economia")
    return [
      { id: "indicators", label: "Indicadores" },
      { id: "markets", label: "Mercados" },
      { id: "news", label: "Notícias" },
    ];
  return [
    { id: "indicators", label: "Indicadores" },
    { id: "news", label: "Notícias" },
  ];
}

export function defaultPanelTab(layer: AtlasLayer): AtlasPanelTab {
  if (layer === "noticias") return "news";
  if (layer === "clima") return "conditions";
  if (layer === "rodovias") return "map-data";
  return "indicators";
}
