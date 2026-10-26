import { describe, expect, it } from "bun:test";
import { atlasDemoNews } from "../demo/atlasNoticias";
import type { AtlasLayer } from "../atlas.functions";
import { BRASIL_REGIONS, BRASIL_UFS, UFS_BY_REGION } from "./brasil-ufs";
import { filterAtlasStories } from "./brasil-atlas-model";

describe("atlas Brasil: seleção editorial e fixtures isoladas", () => {
  it("fornece geometria e ao menos uma pauta demonstrativa para cada uma das 27 UFs", () => {
    expect(BRASIL_UFS).toHaveLength(27);
    for (const state of BRASIL_UFS) {
      expect(state.d.length).toBeGreaterThan(0);
      expect(filterAtlasStories(atlasDemoNews, { uf: state.uf }).some((item) => item.isDemo)).toBe(true);
    }
  });

  it("filtra corretamente os cinco agrupamentos regionais oficiais", () => {
    expect(BRASIL_REGIONS).toHaveLength(5);
    for (const region of BRASIL_REGIONS) {
      const selectedStates = UFS_BY_REGION[region];
      const regional = filterAtlasStories(atlasDemoNews, { region });
      expect(regional.length).toBeGreaterThan(0);
      expect(regional.every((item) => item.ufs.some((uf) => selectedStates.includes(uf)))).toBe(true);
    }
  });

  it("demonstra todas as nove camadas e notícias multiestado sem criar URLs fictícias", () => {
    const layers: AtlasLayer[] = [
      "noticias", "justica", "politica", "economia", "agronegocio", "clima",
      "infraestrutura", "rodovias", "populacao",
    ];
    for (const layer of layers)
      expect(filterAtlasStories(atlasDemoNews, { layer }).some((item) => item.isDemo)).toBe(true);
    expect(atlasDemoNews.some((item) => item.ufs.length > 1)).toBe(true);
    expect(atlasDemoNews.every((item) => item.isDemo && !item.slug)).toBe(true);
  });

  it("mantém múltiplas manchetes no mesmo estado para testar o painel", () => {
    const spStories = filterAtlasStories(atlasDemoNews, { uf: "SP" });
    expect(spStories.length).toBeGreaterThan(1);
  });
});
