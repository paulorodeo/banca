import { describe, expect, it } from "bun:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { buildRoadwayFactCard, filterRoadSegmentsForTerritory } from "./atlas-road-facts";
import type { AtlasRoadDataset } from "./atlas-roads.types";

const dataDir = resolve(import.meta.dirname, "../../../public/data");

async function readDataset(file: string): Promise<AtlasRoadDataset> {
  return JSON.parse(await readFile(resolve(dataDir, file), "utf8")) as AtlasRoadDataset;
}

describe("ficha dinâmica de rodovias", () => {
  it("gera conteúdo individual ao alternar entre as BRs do SNV", async () => {
    const dataset = await readDataset("atlas-roads-snv-202201b.json");
    const selected = ["BR-116", "BR-153", "BR-101"].map((code) => {
      const road = dataset.roads.find((item) => item.code === code)!;
      return buildRoadwayFactCard(dataset, road, road.segments, "Brasil");
    });

    expect(selected.map((item) => item.code)).toEqual(["BR-116", "BR-153", "BR-101"]);
    expect(
      selected.every((item) => item.classification === "Rodovia federal · SNV histórico"),
    ).toBe(true);
    expect(new Set(selected.map((item) => item.description)).size).toBe(3);
    expect(selected.every((item) => item.sources.length === 0)).toBe(true);
    expect(selected.every((item) => item.description.includes("SNV 202201B"))).toBe(true);
  });

  it("separa a geometria estadual ARTESP dos atributos tabulares XLSX", async () => {
    const dataset = await readDataset("atlas-roads-artesp-sp.json");
    const road = dataset.roads.find((item) => item.operators?.length) ?? dataset.roads[0]!;
    const card = buildRoadwayFactCard(dataset, road, road.segments, "São Paulo (SP)");

    expect(card.classification).toBe("Rodovia estadual concedida · ARTESP/SP");
    expect(card.operators.length).toBeGreaterThan(0);
    expect(card.sources.length).toBeGreaterThan(0);
    expect(
      card.sources.every((source) => source.resourceId !== "a7c33882-18a4-4c8c-9b17-5535783c6131"),
    ).toBe(true);
    expect(card.sources.every((source) => source.name.toUpperCase().includes("KMZ"))).toBe(true);
    expect(card.description).toContain(road.code);
    expect(card.description).toContain(road.operators?.[0] ?? "");
  });

  it("recalcula geometrias e tipos ao mudar do Sudeste para São Paulo", async () => {
    const dataset = await readDataset("atlas-roads-snv-202201b.json");
    const road = dataset.roads.find((item) => item.code === "BR-116")!;
    const southeast = ["ES", "MG", "RJ", "SP"];
    const regionSegments = filterRoadSegmentsForTerritory(road.segments, null, southeast);
    const stateSegments = filterRoadSegmentsForTerritory(road.segments, "SP");
    const regionCard = buildRoadwayFactCard(dataset, road, regionSegments, "Região Sudeste");
    const stateCard = buildRoadwayFactCard(dataset, road, stateSegments, "São Paulo (SP)");

    expect(regionCard.geometryCount).toBe(regionSegments.length);
    expect(stateCard.geometryCount).toBe(stateSegments.length);
    expect(stateCard.geometryCount).toBeLessThan(regionCard.geometryCount);
    expect(regionCard.territory).toBe("Região Sudeste");
    expect(stateCard.territory).toBe("São Paulo (SP)");
  });

  it("informa claramente quando uma ARTESP não tem geometrias no estado selecionado", async () => {
    const dataset = await readDataset("atlas-roads-artesp-sp.json");
    const road = dataset.roads[0]!;
    const stateSegments = filterRoadSegmentsForTerritory(road.segments, "BA");
    const card = buildRoadwayFactCard(dataset, road, stateSegments, "Bahia (BA)");

    expect(card.geometryCount).toBe(0);
    expect(card.description).toContain("não tem geometrias neste recorte");
    expect(card.description).toContain("Bahia (BA)");
    expect(card.ufs).toEqual(["SP"]);
    expect(card.operators).toEqual([]);
  });
});
