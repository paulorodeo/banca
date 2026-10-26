import { describe, expect, it } from "bun:test";
import { BRASIL_UFS, UFS_BY_REGION } from "./brasil-ufs";
import {
  BRAZIL_POPULATION_TOTAL,
  POPULATION_BY_REGION,
  POPULATION_BY_UF,
} from "./populacao-ibge-2026";
import { BRAZIL_GRAIN_PRODUCTION, GRAIN_PRODUCTION_BY_UF } from "./conab-graos-2025-26";

describe("camadas oficiais do Atlas", () => {
  it("confere as 27 populações e as somas das UFs contra totais oficiais de Brasil e região", () => {
    expect(Object.keys(POPULATION_BY_UF).sort()).toEqual(BRASIL_UFS.map((uf) => uf.uf).sort());
    expect(Object.values(POPULATION_BY_UF).reduce((sum, value) => sum + value, 0)).toBe(
      BRAZIL_POPULATION_TOTAL,
    );
    for (const [region, ufs] of Object.entries(UFS_BY_REGION)) {
      expect(ufs.reduce((sum, uf) => sum + (POPULATION_BY_UF[uf] ?? 0), 0)).toBe(
        POPULATION_BY_REGION[region] ?? 0,
      );
    }
  });

  it("confere o indicador de grãos por UF com o total Conab da série", () => {
    expect(Object.keys(GRAIN_PRODUCTION_BY_UF).sort()).toEqual(
      BRASIL_UFS.map((uf) => uf.uf).sort(),
    );
    expect(
      Object.values(GRAIN_PRODUCTION_BY_UF).reduce((sum, value) => sum + value, 0),
    ).toBeCloseTo(BRAZIL_GRAIN_PRODUCTION, 6);
  });
});
