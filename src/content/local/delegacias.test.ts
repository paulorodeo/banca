import { describe, expect, test } from "bun:test";
import { delegacias } from "./delegacias";
import { regioes } from "./regioes";

describe("Americanópolis na grade territorial", () => {
  test("completa 30 delegacias sem duplicar unidades", () => {
    expect(delegacias).toHaveLength(30);
    expect(new Set(delegacias.map((dp) => dp.unidade.numero)).size).toBe(30);
    expect(delegacias.slice(-3).map((dp) => dp.unidade.numero)).toEqual(["80", "97", "98"]);
  });

  test("inclui Americanópolis entre as 30 regiões da home", () => {
    expect(regioes).toHaveLength(30);
    expect(regioes.find((regiao) => regiao.slug === "americanopolis")?.href).toBe(
      "/delegacias/advogado-criminal-97-dp-americanopolis",
    );
  });

  test("classifica Americanópolis como área ampliada, não núcleo físico", () => {
    expect(delegacias.find((dp) => dp.unidade.numero === "97")?.escopoTerritorial).toBe("extendedArea");
  });

  test("conecta reciprocamente o 97º aos quatro distritos do lote", () => {
    const americanopolis = delegacias.find((dp) => dp.unidade.numero === "97");
    for (const numero of ["35", "80", "98", "43"]) {
      const vizinha = delegacias.find((dp) => dp.unidade.numero === numero);
      expect(americanopolis?.delegaciasRelacionadas?.some((rel) => rel.slug === vizinha?.slug)).toBe(true);
      expect(vizinha?.delegaciasRelacionadas?.some((rel) => rel.slug === americanopolis?.slug)).toBe(true);
    }
  });
});