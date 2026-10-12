import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { delegacias } from "./delegacias";
import { regioes } from "./regioes";

describe("Americanópolis na grade territorial", () => {
  test("completa 33 delegacias sem duplicar unidades", () => {
    assert.equal(delegacias.length, 33);
    assert.equal(new Set(delegacias.map((dp) => dp.unidade.numero)).size, 33);
    assert.deepEqual(delegacias.slice(-3).map((dp) => dp.unidade.numero), ["101", "85", "95"]);
  });

  test("inclui Americanópolis entre as 33 regiões da home", () => {
    assert.equal(regioes.length, 33);
    assert.equal(regioes.find((regiao) => regiao.slug === "americanopolis")?.href,
      "/delegacias/advogado-criminal-97-dp-americanopolis",
    );
  });

  test("classifica Americanópolis como área ampliada, não núcleo físico", () => {
    assert.equal(delegacias.find((dp) => dp.unidade.numero === "97")?.escopoTerritorial, "extendedArea");
  });

  test("conecta reciprocamente o 97º aos quatro distritos do lote", () => {
    const americanopolis = delegacias.find((dp) => dp.unidade.numero === "97");
    for (const numero of ["35", "80", "98", "43"]) {
      const vizinha = delegacias.find((dp) => dp.unidade.numero === numero);
      assert.equal(americanopolis?.delegaciasRelacionadas?.some((rel) => rel.slug === vizinha?.slug), true);
      assert.equal(vizinha?.delegaciasRelacionadas?.some((rel) => rel.slug === americanopolis?.slug), true);
    }
  });
});