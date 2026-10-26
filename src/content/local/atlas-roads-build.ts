import type { AtlasRoad, AtlasRoadDataset, AtlasRoadSegment } from "./atlas-roads.types";

export const ATLAS_ROAD_CODES = ["101", "116", "153", "163", "364"] as const;
export const ATLAS_ROAD_SOURCE_URL =
  "https://pamgia.ibama.gov.br/server/rest/services/01_Publicacoes_Bases/tra_trecho_rodoviario_principal_l/MapServer/23";
export const ROAD_PROJECTION = {
  // Least-squares affine fit against the 27 IBGE 2025 UF paths already in brasil-ufs.ts.
  // The fitted state-bounds residual is below 0.2 SVG px; no per-state offsets are applied.
  xScale: 15.930925066329067,
  xOffset: 1202.7459972392758,
  yScale: -16.418860972589112,
  yOffset: 116.21088829096749,
  maxUfBoundsResidualPx: 0.1903,
} as const;

type Point = [number, number];
type RoadProperties = Record<string, string | number | null | undefined>;
type LineGeometry = { type: "LineString" | "MultiLineString"; coordinates: Point[] | Point[][] };
export type RoadFeature = { type?: string; id?: string | number; properties?: RoadProperties; geometry?: LineGeometry | null };

export function normalizeRoadFeatureCollection(input: unknown): { features: RoadFeature[] } {
  if (!input || typeof input !== "object") throw new Error("Entrada geográfica inválida");
  const value = input as { type?: unknown; features?: unknown; spatialReference?: { wkid?: number; latestWkid?: number } };
  if (!Array.isArray(value.features)) throw new Error("Entrada sem lista de feições");
  if (value.type === "FeatureCollection") return input as { features: RoadFeature[] };

  const wkid = value.spatialReference?.latestWkid ?? value.spatialReference?.wkid;
  if (wkid !== undefined && ![4326, 4674].includes(wkid)) {
    throw new Error(`Sistema de coordenadas ArcGIS não suportado sem reprojeção: EPSG:${wkid}`);
  }
  const features = value.features.map((candidate) => {
    if (!candidate || typeof candidate !== "object") throw new Error("Feição ArcGIS inválida");
    const feature = candidate as {
      attributes?: Record<string, string | number | null | undefined>;
      geometry?: { paths?: number[][][]; spatialReference?: { wkid?: number; latestWkid?: number } } | null;
    };
    const paths = feature.geometry?.paths;
    if (!feature.attributes || !Array.isArray(paths)) throw new Error("Feição ArcGIS sem atributos ou paths");
    const rawId = feature.attributes["objectid"] ?? feature.attributes["OBJECTID"];
    return {
      type: "Feature",
      ...(typeof rawId === "string" || typeof rawId === "number" ? { id: rawId } : {}),
      properties: Object.fromEntries(
        Object.entries(feature.attributes).map(([key, item]) => [key.toLowerCase(), item]),
      ),
      geometry: {
        type: paths.length === 1 ? "LineString" : "MultiLineString",
        coordinates: paths.map((path) => path.map(([x, y]) => [x, y] as Point)),
      } as LineGeometry,
    } satisfies RoadFeature;
  });
  return { features };
}

function normalizeRoadCode(value: unknown): `BR-${string}` | null {
  const digits = String(value ?? "").toUpperCase().replace(/\s|BR|-/g, "");
  if (!/^\d{1,3}$/.test(digits)) return null;
  return `BR-${digits.padStart(3, "0")}`;
}

function normalizeUf(value: unknown): string | null {
  const uf = String(value ?? "").trim().toUpperCase();
  return /^[A-Z]{2}$/.test(uf) ? uf : null;
}

export function projectRoadPoint([longitude, latitude]: Point): Point {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
    throw new Error("Coordenada rodoviária não finita");
  }
  if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
    throw new Error("Coordenada fora dos limites geográficos");
  }
  return [
    ROAD_PROJECTION.xScale * longitude + ROAD_PROJECTION.xOffset,
    ROAD_PROJECTION.yScale * latitude + ROAD_PROJECTION.yOffset,
  ];
}

function perpendicularDistance(point: Point, start: Point, end: Point): number {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) return Math.hypot(point[0] - start[0], point[1] - start[1]);
  const t = Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(point[0] - (start[0] + t * dx), point[1] - (start[1] + t * dy));
}

export function simplifyLine(points: Point[], tolerance = 0.7): Point[] {
  if (points.length <= 2) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;
  const stack: Array<[number, number]> = [[0, points.length - 1]];
  while (stack.length) {
    const [start, end] = stack.pop()!;
    let maxDistance = tolerance;
    let index = -1;
    for (let cursor = start + 1; cursor < end; cursor++) {
      const distance = perpendicularDistance(points[cursor]!, points[start]!, points[end]!);
      if (distance > maxDistance) {
        maxDistance = distance;
        index = cursor;
      }
    }
    if (index !== -1) {
      keep[index] = 1;
      stack.push([start, index], [index, end]);
    }
  }
  return points.filter((_, index) => keep[index] === 1);
}

function pathFromPoints(points: Point[]): string {
  return points
    .map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join("");
}

function linesFromGeometry(geometry: LineGeometry): Point[][] {
  if (geometry.type === "LineString") return [geometry.coordinates as Point[]];
  if (geometry.type === "MultiLineString") return geometry.coordinates as Point[][];
  return [];
}

export function buildAtlasRoadDataset(
  featureCollections: Array<{ features?: RoadFeature[] }>,
  extractedAt: string,
): AtlasRoadDataset {
  const roads = new Map<string, AtlasRoad>();
  const seen = new Set<string>();
  let sourceVertices = 0;
  let renderedVertices = 0;
  const versions = new Set<string>();
  const validUfs = new Set([
    "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT",
    "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO",
  ]);

  for (const collection of featureCollections) {
    for (const feature of collection.features ?? []) {
      if (!feature.geometry || !["LineString", "MultiLineString"].includes(feature.geometry.type)) continue;
      const properties = feature.properties ?? {};
      const code = normalizeRoadCode(properties["codigo_br"]);
      if (!code || !ATLAS_ROAD_CODES.includes(code.slice(3) as (typeof ATLAS_ROAD_CODES)[number])) continue;
      const uf = normalizeUf(properties["unidade_fe"]);
      if (!uf || !validUfs.has(uf)) throw new Error(`UF inválida em segmento ${String(properties["codigo_snv"] ?? feature.id)}`);
      const version = String(properties["versao_snv"] ?? "").trim();
      if (!version) throw new Error(`Versão SNV ausente em ${code}/${String(properties["codigo_snv"] ?? feature.id)}`);
      versions.add(version);
      const idBase = String(properties["codigo_snv"] ?? feature.id ?? properties["objectid"] ?? "").trim();
      if (!idBase) throw new Error(`Identificador estável ausente em ${code}/${uf}`);
      const road = roads.get(code) ?? { code, ufs: [], segments: [] };
      roads.set(code, road);

      for (const [lineIndex, sourceLine] of linesFromGeometry(feature.geometry).entries()) {
        if (sourceLine.length < 2) continue;
        sourceVertices += sourceLine.length;
        const projected = sourceLine.map(projectRoadPoint);
        const simplified = simplifyLine(projected);
        if (simplified.length < 2) continue;
        const path = pathFromPoints(simplified);
        const signature = `${code}|${uf}|${idBase}|${path}`;
        if (seen.has(signature)) continue;
        seen.add(signature);
        const id = `${idBase}${linesFromGeometry(feature.geometry).length > 1 ? `-${lineIndex + 1}` : ""}`;
        const segment: AtlasRoadSegment = {
          id,
          uf,
          segmentType: String(properties["sigla_tipo"] ?? "").trim().toUpperCase() || "B",
          path,
          sourceVertices: sourceLine.length,
          renderedVertices: simplified.length,
        };
        road.segments.push(segment);
        if (!road.ufs.includes(uf)) road.ufs.push(uf);
        renderedVertices += simplified.length;
      }
    }
  }

  const orderedRoads = ATLAS_ROAD_CODES.map((number) => roads.get(`BR-${number}`)).filter(
    (road): road is AtlasRoad => Boolean(road),
  );
  const missingRoads = ATLAS_ROAD_CODES.filter((number) => !roads.has(`BR-${number}`));
  if (missingRoads.length) throw new Error(`Geometrias ausentes para: ${missingRoads.join(", ")}`);
  if (versions.size !== 1) throw new Error(`Versões SNV divergentes: ${[...versions].join(", ")}`);
  for (const road of orderedRoads) {
    road.ufs.sort();
    road.segments.sort((a, b) => a.id.localeCompare(b.id, "en"));
  }

  return {
    source: "Departamento Nacional de Infraestrutura de Transportes (DNIT)",
    distributor: "Ibama/PAMGIA ArcGIS REST",
    version: [...versions][0]!,
    sourceUrl: ATLAS_ROAD_SOURCE_URL,
    extractedAt,
    crs: "SIRGAS 2000 (EPSG:4674); coordenadas retornadas em WGS 84 (EPSG:4326)",
    attribution: `Base cartográfica: DNIT/SNV ${[...versions][0]} — distribuição Ibama/PAMGIA. Uso local; licença específica de redistribuição pendente de confirmação.`,
    rightsStatus: "pending",
    productionEligible: false,
    projection: {
      name: "Affine lon/lat fit · IBGE Malha Territorial 2025 SVG",
      description: "Transformação linear ajustada por mínimos quadrados aos limites (bounding boxes) das 27 UFs do SVG existente; sem deslocamentos por estado.",
      ...ROAD_PROJECTION,
    },
    roads: orderedRoads,
    counts: {
      segments: orderedRoads.reduce((sum, road) => sum + road.segments.length, 0),
      sourceVertices,
      renderedVertices,
    },
  };
}
