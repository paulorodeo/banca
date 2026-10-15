import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { delegacias } from "./delegacias";
import { regioes } from "./regioes";
import { delegaciasLeste, distritosLeste, regioesLeste } from "./delegacias-leste";

describe("Lote editorial da Zona Leste", () => {
  test("inclui exatamente os 34 números publicados", () => {
    assert.deepEqual(
      distritosLeste.map((dp) => dp.numero),
      [
        8, 10, 18, 21, 22, 24, 29, 30, 31, 32, 41, 42, 44, 49, 50, 52, 53, 54, 55, 56, 57, 58, 59,
        62, 63, 64, 65, 66, 67, 68, 69, 70, 81, 103,
      ],
    );
    assert.equal(new Set(delegaciasLeste.map((dp) => dp.slug)).size, 34);
    assert.equal(new Set(regioes.map((regiao) => regiao.slug)).size, regioes.length);
  });
  test("cada card aponta ao DP real e à região correspondente", () => {
    for (const regiao of regioesLeste) {
      const dp = delegacias.find((item) => `/delegacias/${item.slug}` === regiao.href);
      assert.ok(dp, regiao.href);
      assert.equal(dp.regiaoSlug, regiao.slug);
      assert.equal(regiao.zona, "zona-leste");
    }
  });
  test("os dois guias de Itaquera são distintos", () => {
    assert.equal(
      delegaciasLeste.find((dp) => dp.unidade.numero === "32")?.slug,
      "advogado-criminal-32-dp-itaquera",
    );
    assert.equal(
      delegaciasLeste.find((dp) => dp.unidade.numero === "103")?.slug,
      "advogado-criminal-103-dp-itaquera",
    );
    assert.equal(regioesLeste.filter((regiao) => regiao.nome.startsWith("Itaquera")).length, 2);
    assert.equal(
      regioesLeste.find((regiao) => regiao.href.endsWith("103-dp-itaquera"))?.territorioSlug,
      "itaquera",
    );
    assert.ok(regioesLeste.every((regiao) => !/\d+º DP/.test(regiao.nome)));
  });
  test("não inventa dados operacionais ou bairros atendidos", () => {
    for (const dp of delegaciasLeste) {
      for (const key of ["endereco", "telefone", "horario", "competencia"] as const)
        assert.equal(dp.unidade[key], undefined);
      assert.ok(dp.avisoRodape?.includes("sem vínculo com a Polícia Civil"));
      assert.ok(dp.observacaoBairros?.includes("Não indicam bairros atendidos"));
      assert.deepEqual(
        dp.bairros,
        dp.unidade.numero === "59" ? ["Jardim dos Ipês", "Jardim Noêmia"] : [dp.cardSubtitulo],
      );
    }
  });
  test("grafo novo é recíproco e sem destinos inexistentes", () => {
    for (const dp of delegacias.filter((item) =>
      distritosLeste.some((novo) => String(novo.numero) === item.unidade.numero),
    )) {
      assert.ok(dp.delegaciasRelacionadas?.length);
      for (const link of dp.delegaciasRelacionadas ?? []) {
        const destino = delegacias.find((item) => item.slug === link.slug);
        assert.ok(destino);
        assert.ok(destino.delegaciasRelacionadas?.some((item) => item.slug === dp.slug));
      }
    }
  });
  test("reaproveita os nove DPs da Oeste sem duplicação ou reclassificação", () => {
    for (const numero of [7, 14, 15, 23, 51, 75, 78, 91, 93])
      assert.equal(delegacias.filter((dp) => dp.unidade.numero === String(numero)).length, 1);
    assert.equal(regioes.find((regiao) => regiao.slug === "itaim-bibi")?.zona, "zona-sul");
    assert.equal(regioes.filter((regiao) => regiao.zona === "zona-oeste").length, 8);
  });
});
