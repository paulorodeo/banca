import { describe, expect, it } from "bun:test";
import {
  buildAtlasRoadDataset,
  normalizeRoadFeatureCollection,
  projectRoadPoint,
  simplifyLine,
} from "./atlas-roads-build";

describe("camada geográfica de rodovias do Atlas", () => {
  const feature = (codigo_br: string, uf: string, objectid: number, coordinates: [number, number][]) => ({
    type: "Feature",
    id: objectid,
    properties: {
      codigo_br,
      unidade_fe: uf,
      codigo_snv: `${codigo_br}B${uf}0001`,
      versao_snv: "202201B",
      sigla_tipo: "B",
    },
    geometry: { type: "LineString" as const, coordinates },
  });

  it("normaliza e agrega as cinco rodovias, sem alterar as linhas geográficas em segmentos retos fictícios", () => {
    const rows = [
      feature("101", "BA", 1, [[-38, -12], [-37.9, -12.1], [-37.8, -12.3]]),
      feature("BR 116", "SP", 2, [[-46.6, -23.5], [-46.2, -23.2]]),
      feature("BR153", "GO", 3, [[-49, -16], [-48.9, -15.9]]),
      feature("163", "MT", 4, [[-55, -12], [-54.8, -11.8]]),
      feature("BR-364", "RO", 5, [[-63, -9], [-62.8, -8.8]]),
    ];
    const dataset = buildAtlasRoadDataset([{ features: rows }], "2026-10-26T00:00:00.000Z");
    expect(dataset.roads.map((road) => road.code)).toEqual(["BR-101", "BR-116", "BR-153", "BR-163", "BR-364"]);
    expect(dataset.roads.every((road) => road.segments[0]?.path.includes("L"))).toBe(true);
    expect(dataset.productionEligible).toBe(false);
    expect(dataset.rightsStatus).toBe("pending");
  });

  it("preserva extremidades, valida coordenadas e usa transformação compatível com o SVG das UFs", () => {
    expect(simplifyLine([[0, 0], [0.1, 0.1], [2, 0], [3, 0]], 0.5)).toEqual([[0, 0], [3, 0]]);
    expect(projectRoadPoint([-73.9904, 5.2718])[0]).toBeCloseTo(24, 0);
    expect(projectRoadPoint([-29.299, -33.7508])[1]).toBeCloseTo(670, 0);
    expect(() => projectRoadPoint([Number.NaN, 0])).toThrow();
  });

  it("falha em vez de inventar geometrias ou misturar versões do SNV", () => {
    const one = feature("101", "BA", 1, [[-38, -12], [-37.9, -12.1]]);
    expect(() => buildAtlasRoadDataset([{ features: [one] }], "2026-10-26T00:00:00.000Z")).toThrow(/Geometrias ausentes/);
    const rest = ["116", "153", "163", "364"].map((code, index) =>
      feature(code, "SP", index + 2, [[-46, -23], [-45.9, -22.9]]),
    );
    rest[0]!.properties!.versao_snv = "202501A";
    expect(() => buildAtlasRoadDataset([{ features: [one, ...rest] }], "2026-10-26T00:00:00.000Z")).toThrow(/Versões SNV divergentes/);
  });

  it("normaliza uma resposta ArcGIS REST SIRGAS 2000 em linhas compatíveis com o pipeline", () => {
    const normalized = normalizeRoadFeatureCollection({
      spatialReference: { wkid: 4674 },
      features: [{
        attributes: { OBJECTID: 19, CODIGO_BR: "116", UNIDADE_FE: "SP", CODIGO_SNV: "116BSP001", VERSAO_SNV: "202201B", SIGLA_TIPO: "B" },
        geometry: { paths: [[[-46.6, -23.5], [-46.5, -23.4]]] },
      }],
    });
    expect(normalized.features[0]?.properties?.["codigo_br"]).toBe("116");
    expect(normalized.features[0]?.geometry?.type).toBe("LineString");
    expect(() => normalizeRoadFeatureCollection({ spatialReference: { wkid: 3857 }, features: [] })).toThrow(/EPSG:3857/);
  });
});
