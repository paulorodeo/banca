import { describe, expect, it } from "bun:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { AtlasRoadDataset } from "./atlas-roads.types";

const publicData = resolve(import.meta.dirname, "../../../public/data");

async function readDataset(name: string): Promise<AtlasRoadDataset> {
  return JSON.parse(await readFile(resolve(publicData, name), "utf8")) as AtlasRoadDataset;
}

describe("camadas rodoviárias públicas e documentadas do Atlas", () => {
  it("identifica o SNV 202201B como histórico e autorizado, sem declarar vigência", async () => {
    const data = await readDataset("atlas-roads-snv-202201b.json");
    expect(data.id).toBe("dnit-snv-202201b");
    expect(data.version).toBe("202201B");
    expect(data.rightsStatus).toBe("approved");
    expect(data.productionEligible).toBe(true);
    expect(data.ownerAuthorization).toContain("27/10/2026");
    expect(data.scope).toContain("não representa a versão vigente");
    expect(data.attribution).toContain("DNIT/SNV 202201B");
    expect(data.roads.map((road) => road.code)).toEqual([
      "BR-101",
      "BR-116",
      "BR-153",
      "BR-163",
      "BR-364",
    ]);
  });

  it("mantém atribuição CC BY, proveniência da geometria e ressalva de cobertura em SP", async () => {
    const data = await readDataset("atlas-roads-artesp-sp.json");
    expect(data.id).toBe("artesp-sp-concession-roads");
    expect(data.rightsStatus).toBe("approved");
    expect(data.productionEligible).toBe(true);
    expect(data.license).toContain("Creative Commons Attribution");
    expect(data.relationshipNote).toContain("não foi presumida junção linha a linha");
    expect(data.termsUrl).toContain("/terms");
    expect(data.scope).toContain("não representa todas as vias");
    expect(data.tabularSummary?.recordCount).toBe(14_372);
    expect(data.tabularSummary?.coordinateNote).toContain("não são eixos rodoviários");
    expect(data.sources?.length).toBe(23);
    expect(data.sources?.every((source) => /^[a-f0-9]{64}$/.test(source.sha256))).toBe(true);
    expect(data.sources?.find((source) => source.name === "KMZ SPMar")?.license).toContain(
      "Public Domain",
    );
    expect(data.roads.length).toBeGreaterThan(0);
    expect(data.roads.every((road) => road.ufs.every((uf) => uf === "SP"))).toBe(true);
    expect(
      data.roads.every((road) => road.segments.every((segment) => segment.path.startsWith("M"))),
    ).toBe(true);
    expect(data.counts.sourceVertices).toBeGreaterThan(data.counts.renderedVertices);
    expect(data.attribution).toContain("não endossa");
  });
});
