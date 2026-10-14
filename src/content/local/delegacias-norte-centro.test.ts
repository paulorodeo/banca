import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { delegacias } from "./delegacias";
import { regioes } from "./regioes";

const NORTE = [9, 13, 19, 20, 28, 33, 38, 39, 40, 45, 46, 72, 73, 74, 87, 90];
const CENTRO = [1, 2, 3, 4, 5, 6, 12, 77];

describe("Zona Norte e Centro", () => {
  test("cards apontam para guias reais com os números pedidos", () => {
    const porSlug = new Map(delegacias.map((dp) => [`/delegacias/${dp.slug}`, dp]));
    for (const [zona, numeros] of [["zona-norte", NORTE], ["centro", CENTRO]] as const) {
      const cards = regioes.filter((r) => r.zona === zona);
      const nums = cards.map((r) => Number(porSlug.get(r.href)?.unidade.numero)).sort((a, b) => a - b);
      assert.deepEqual(nums, [...numeros].sort((a, b) => a - b));
    }
  });

  test("slugs e regiões únicos, incluindo Liberdade e Brás repetidos", () => {
    assert.equal(new Set(delegacias.map((dp) => dp.slug)).size, delegacias.length);
    assert.equal(new Set(regioes.map((r) => r.slug)).size, regioes.length);
    const slugs = delegacias.map((dp) => dp.slug);
    for (const s of ["advogado-criminal-1-dp-liberdade", "advogado-criminal-5-dp-liberdade", "advogado-criminal-12-dp-bras", "advogado-criminal-8-dp-bras"]) {
      assert.ok(slugs.includes(s), s);
    }
  });

  test("não publica dados operacionais nem plantão", () => {
    for (const dp of delegacias.filter((d) => [...NORTE, ...CENTRO].includes(Number(d.unidade.numero)))) {
      const texto = JSON.stringify(dp);
      assert.ok(!/\(11\)|CEP|\bRua\b|Avenida/.test(texto), dp.slug);
    }
  });
});
