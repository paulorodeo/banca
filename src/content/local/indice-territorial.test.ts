import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { bairros } from "./bairros";
import { delegacias } from "./delegacias";
import { filtrarTerritorios, montarIndiceTerritorial } from "./indice-territorial";
import { regioes } from "./regioes";
import { zonas } from "./zonas";

const indice = montarIndiceTerritorial(regioes, delegacias, bairros, zonas);
const porNome = (nome: string) => indice.find((item) => item.nome === nome);

describe("índice territorial de /regioes", () => {
  test("agrupa territórios sem perder os 93 destinos policiais", () => {
    assert.equal(delegacias.length, 93);
    assert.equal(new Set(indice.map((item) => item.nome)).size, indice.length);
    assert.deepEqual(
      new Set(indice.flatMap((item) => item.guias.map((guia) => guia.slug))),
      new Set(delegacias.map((guia) => guia.slug)),
    );
    assert.deepEqual(
      porNome("Itaquera")?.guias.map((guia) => guia.numero),
      ["32", "103"],
    );
    assert.deepEqual(
      porNome("Liberdade")?.guias.map((guia) => guia.numero),
      ["1", "5"],
    );
    assert.deepEqual(
      porNome("Brás")?.guias.map((guia) => guia.numero),
      ["8", "12"],
    );
    assert.equal(porNome("Pinheiros")?.paginaBairro, "/bairros/pinheiros");
    assert.ok(indice.every((item) => !/\d+º DP/.test(item.nome)));
  });

  test("mantém localidade e denominação policial em registros separados", () => {
    assert.ok(porNome("Campos Elíseos"));
    assert.ok(porNome("Santa Ifigênia"));
    assert.ok(porNome("Jardim dos Ipês"));
    assert.ok(porNome("Jardim Noêmia"));
    assert.equal(porNome("Santa Ifigênia")?.tipo, "localidade-editorial");
    assert.equal(porNome("Itaquera")?.tipo, "distrito-administrativo");
    assert.equal(porNome("Pinheiros")?.tipo, "bairro");
    assert.equal(porNome("Liberdade")?.paginaBairro, "/bairros/liberdade");
    assert.equal(porNome("Campos Elíseos")?.paginaBairro, "/bairros/campos-eliseos");
    assert.equal(porNome("Santa Ifigênia")?.paginaBairro, "/bairros/santa-ifigenia-localidade");
  });

  test("combina busca sem acento e filtro, com contagens deriváveis dos itens", () => {
    const norte = filtrarTerritorios(indice, "JACANA", "zona-norte");
    assert.deepEqual(
      norte.map((item) => item.nome),
      ["Jaçanã"],
    );
    assert.equal(filtrarTerritorios(indice, "JACANA", "zona-sul").length, 0);
    assert.deepEqual(
      filtrarTerritorios(indice, "Santa Efigenia", "todas").map((item) => item.nome),
      ["Santa Ifigênia"],
    );
    assert.deepEqual(
      filtrarTerritorios(indice, "Arthur Alvim", "zona-leste").map((item) => item.nome),
      ["Artur Alvim"],
    );
    assert.equal(filtrarTerritorios(indice, "", "todas").length, indice.length);
    for (const zona of zonas) {
      const itens = filtrarTerritorios(indice, "", zona.slug);
      assert.ok(itens.length > 0, zona.nome);
      assert.ok(itens.every((item) => item.zona === zona.slug));
    }
  });
});
