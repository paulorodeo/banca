import type { AtlasRoad, AtlasRoadDataset, AtlasRoadSegment } from "./atlas-roads.types";

export type RoadwayFactSource = NonNullable<AtlasRoadDataset["sources"]>[number];

export type RoadwayFactCard = {
  code: string;
  classification: string;
  territory: string;
  description: string;
  geometryCount: number;
  routeGeometryCount: number;
  ufs: string[];
  segmentTypes: Array<{ code: string; count: number }>;
  operators: string[];
  sources: RoadwayFactSource[];
};

export function filterRoadSegmentsForTerritory(
  segments: readonly AtlasRoadSegment[],
  stateCode: string | null,
  regionUfs?: readonly string[],
): AtlasRoadSegment[] {
  if (stateCode) return segments.filter((segment) => segment.uf === stateCode);
  if (regionUfs) return segments.filter((segment) => regionUfs.includes(segment.uf));
  return [...segments];
}

export function buildRoadwayFactCard(
  dataset: AtlasRoadDataset,
  road: AtlasRoad,
  visibleSegments: readonly AtlasRoadSegment[],
  territory: string,
): RoadwayFactCard {
  const ufs = [...new Set(road.segments.map((segment) => segment.uf))].sort();
  const operators = [
    ...new Set(visibleSegments.flatMap((segment) => (segment.operator ? [segment.operator] : []))),
  ].sort();
  const segmentTypes = summarizeSegmentTypes(visibleSegments);
  const sourceIds = new Set(road.segments.map((segment) => segment.id.split(":", 1)[0]));
  const sources = (dataset.sources ?? []).filter((source) => sourceIds.has(source.resourceId));
  const classification =
    dataset.id === "artesp-sp-concession-roads"
      ? "Rodovia estadual concedida · ARTESP/SP"
      : dataset.id === "dnit-snv-202201b"
        ? "Rodovia federal · SNV histórico"
        : dataset.source;
  const ufsText = ufs.length ? ufs.join(", ") : "UFs não informadas";
  const operatorsText = operators.length ? operators.join(", ") : null;

  let description: string;
  if (visibleSegments.length === 0) {
    description = `${road.code} não tem geometrias neste recorte (${territory}). A base desta rodovia registra dados em ${ufsText}.`;
  } else if (dataset.id === "artesp-sp-concession-roads") {
    description = `${road.code} tem ${visibleSegments.length.toLocaleString("pt-BR")} geometrias identificadas nos KMZ da ARTESP para ${territory}. As geometrias desta rodovia estão associadas a ${operatorsText ?? "operador não informado na fonte"}.`;
  } else {
    description = `O SNV ${dataset.version} registra ${visibleSegments.length.toLocaleString("pt-BR")} geometrias de ${road.code} em ${territory}. Na base completa, esta rodovia aparece em ${ufsText}, com ${road.segments.length.toLocaleString("pt-BR")} geometrias.`;
  }

  return {
    code: road.code,
    classification,
    territory,
    description,
    geometryCount: visibleSegments.length,
    routeGeometryCount: road.segments.length,
    ufs,
    segmentTypes,
    operators,
    sources,
  };
}

function summarizeSegmentTypes(segments: readonly AtlasRoadSegment[]) {
  const counts = new Map<string, number>();
  for (const segment of segments)
    counts.set(segment.segmentType, (counts.get(segment.segmentType) ?? 0) + 1);
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([code, count]) => ({ code, count }));
}
