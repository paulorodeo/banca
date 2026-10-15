import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { bairros } from "./bairros";
import { delegacias } from "./delegacias";
import { homeFeaturedDistricts, homeNeighborhoodHighlights } from "./home-highlights";
import { regioes } from "./regioes";
import { zonas } from "./zonas";

const bairrosDestaque = homeNeighborhoodHighlights(regioes, delegacias, bairros, zonas);

describe("destaques territoriais da homepage", () => {
  test("identidade territorial evita duplicações e preserva todos os guias relacionados", () => {
    assert.equal(bairrosDestaque.length, 10);
    assert.equal(new Set(bairrosDestaque.map((item) => item.id)).size, bairrosDestaque.length);
    assert.ok(bairrosDestaque.every((item) => !/\d+º DP/.test(item.nome)));
    assert.deepEqual(
      bairrosDestaque
        .find((item) => item.id === "territorio-itaquera")
        ?.guias.map((guia) => guia.numero),
      ["32", "103"],
    );
    assert.deepEqual(
      bairrosDestaque
        .find((item) => item.id === "territorio-liberdade")
        ?.guias.map((guia) => guia.numero),
      ["1", "5"],
    );
  });

  test("destinos diferenciam página de bairro e guias policiais reais", () => {
    const pinheiros = bairrosDestaque.find((item) => item.id === "territorio-pinheiros");
    assert.equal(pinheiros?.paginaBairro, "/bairros/pinheiros");
    assert.equal(pinheiros?.guias[0]?.numero, "14");
    assert.ok(bairrosDestaque.every((item) => item.paginaBairro || item.guias.length));
    const guiasPublicados = new Set(delegacias.map((guia) => guia.slug));
    for (const item of bairrosDestaque) {
      for (const guia of item.guias) assert.ok(guiasPublicados.has(guia.slug), guia.slug);
    }
  });

  test("a referência conjunta de Lapa e Vila Romana não é separada por suposição", () => {
    const lapa = bairrosDestaque.find((item) => item.id === "territorio-lapa");
    assert.equal(lapa?.nome, regioes.find((regiao) => regiao.slug === "lapa")?.nome);
    assert.equal(lapa?.paginaBairro, undefined);
    assert.deepEqual(
      lapa?.guias.map((guia) => guia.numero),
      ["7"],
    );
  });

  test("seleção policial conserva quatro URLs canônicas e títulos editoriais sem travessão", () => {
    const destaques = homeFeaturedDistricts(delegacias);
    assert.deepEqual(
      destaques.map((item) => item.guia.unidade.numero),
      ["7", "14", "23", "78"],
    );
    assert.ok(destaques.every((item) => !/[—–]/.test(item.titulo)));
    assert.ok(destaques.every((item) => delegacias.some((guia) => guia.slug === item.guia.slug)));
  });
});
