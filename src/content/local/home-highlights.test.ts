import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { content } from "../repository";
import { delegacias } from "./delegacias";
import { homeFeaturedDistricts, homeNeighborhoodHighlights } from "./home-highlights";
import { regioes } from "./regioes";
import { featuredNeighborhoods } from "./visual-media";

describe("destaques da homepage", () => {
  test("mostra somente bairros com página territorial publicada e resolvível", async () => {
    const bairros = await content.listBairros();
    const items = await homeNeighborhoodHighlights(regioes, bairros, (slug) =>
      content.getBairro(slug),
    );

    assert.deepEqual(
      items.map(({ id, nome, href }) => ({ id, nome, href })),
      [
        { id: "territorio-pinheiros", nome: "Pinheiros", href: "/bairros/pinheiros" },
        { id: "territorio-santo-amaro", nome: "Santo Amaro", href: "/bairros/santo-amaro" },
      ],
    );
    assert.ok(items.every((item) => !item.href.startsWith("/delegacias/")));
    assert.ok(items.every((item) => !/\d+º\s*DP/.test(item.nome)));
    assert.equal(new Set(items.map((item) => item.id)).size, items.length);
    assert.equal(featuredNeighborhoods.length, 10);
    assert.ok(featuredNeighborhoods.some((item) => item.territorioId === "itaquera"));
    assert.ok(featuredNeighborhoods.some((item) => item.territorioId === "lapa"));
  });

  test("retira itens sem registro publicado ou sem resolução própria", async () => {
    const bairros = await content.listBairros();
    const withoutSantoAmaro = bairros.filter((bairro) => bairro.slug !== "santo-amaro");
    const items = await homeNeighborhoodHighlights(regioes, withoutSantoAmaro, (slug) =>
      content.getBairro(slug),
    );
    assert.deepEqual(
      items.map((item) => item.href),
      ["/bairros/pinheiros"],
    );

    const unresolved = await homeNeighborhoodHighlights(regioes, bairros, async () => null);
    assert.deepEqual(unresolved, []);
  });

  test("inclui o 27º DP na seleção policial sem alterar seu registro canônico", () => {
    const destaques = homeFeaturedDistricts(delegacias);
    assert.deepEqual(
      destaques.map((item) => item.guia.unidade.numero),
      ["7", "14", "23", "78", "27"],
    );
    const campoBelo = destaques.at(-1)!;
    assert.equal(campoBelo.titulo, "27º DP Campo Belo");
    assert.equal(campoBelo.guia.slug, "advogado-27-dp-campo-belo");
    assert.equal(campoBelo.guia.unidade.nomeOficial, "27º Distrito Policial — Campo Belo");
    assert.ok(destaques.every((item) => !/[—–]/.test(item.titulo)));
    assert.ok(destaques.every((item) => delegacias.some((guia) => guia.slug === item.guia.slug)));
    assert.equal(delegacias.length, 93);
  });
});
