import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { bairros } from "./bairros";
import { delegacias } from "./delegacias";
import { regioes } from "./regioes";
import { zonas } from "./zonas";

describe("Páginas de bairro", () => {
  test("publica Pinheiros na Zona Oeste sem alterar o inventário de delegacias", () => {
    const pinheiros = bairros.find((bairro) => bairro.slug === "pinheiros");
    assert.equal(pinheiros?.status, "publicado");
    assert.equal(pinheiros?.zona, "zona-oeste");
    assert.equal(regioes.find((regiao) => regiao.slug === "pinheiros")?.zona, "zona-oeste");
    assert.equal(delegacias.length, 93);
  });

  test("toda relação aponta para zona e unidade canônica existentes", () => {
    const zoneSlugs = new Set(zonas.map((zona) => zona.slug));
    const delegationSlugs = new Set(delegacias.map((delegacia) => delegacia.slug));
    for (const bairro of bairros) {
      assert.ok(zoneSlugs.has(bairro.zona), bairro.slug);
      for (const relation of bairro.instituicoes) {
        assert.equal(relation.institutionType, "delegacia");
        assert.ok(delegationSlugs.has(relation.institutionSlug), relation.institutionSlug);
      }
    }
  });

  test("não publica dados operacionais ou perfis fictícios em Pinheiros", () => {
    const text = JSON.stringify(bairros);
    assert.doesNotMatch(text, /OAB\/?SP|WhatsApp|telefone|atendimento 24/i);
    const related = bairros[0]?.instituicoes.map((item) => item.institutionSlug) ?? [];
    assert.deepEqual(related, ["advogado-14-dp-pinheiros"]);
  });
});
