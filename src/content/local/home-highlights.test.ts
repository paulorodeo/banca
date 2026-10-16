import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { content } from "../repository";
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

  test("A homepage deve apresentar exatamente oito delegacias em destaque.", async () => {
    const catalogo = await content.listDelegacias();
    const destaques = homeFeaturedDistricts(catalogo);
    const slugsEsperados = [
      "advogado-criminal-7-dp-vila-romana",
      "advogado-14-dp-pinheiros",
      "advogado-criminal-23-dp-perdizes",
      "advogado-criminal-78-dp-jardins",
      "advogado-27-dp-campo-belo",
      "advogado-criminal-11-dp-santo-amaro",
      "advogado-criminal-30-dp-tatuape",
      "advogado-criminal-9-dp-carandiru",
    ];
    assert.equal(destaques.length, 8, "a grade não pode voltar a apresentar apenas cinco cards");
    assert.deepEqual(
      destaques.map((item) => item.guia.slug),
      slugsEsperados,
    );
    assert.deepEqual(
      destaques.map((item) => item.guia.unidade.numero),
      ["7", "14", "23", "78", "27", "11", "30", "9"],
    );
    assert.deepEqual(
      destaques.map((item) =>
        item.subtitulo ? `${item.titulo} · ${item.subtitulo}` : item.titulo,
      ),
      [
        "7º Distrito Policial, Vila Romana",
        "14º Distrito Policial de Pinheiros",
        "23º Distrito Policial, Perdizes",
        "78º Distrito Policial, Jardins",
        "27º DP Campo Belo",
        "11º Distrito Policial · Santo Amaro",
        "30º Distrito Policial · Tatuapé",
        "9º Distrito Policial · Carandiru",
      ],
    );
    assert.equal(new Set(destaques.map((item) => item.guia.slug)).size, 8);
    assert.equal(new Set(destaques.map((item) => item.guia.id)).size, 8);
    for (const destaque of destaques) {
      const registro = await content.getDelegacia(destaque.guia.slug);
      assert.ok(registro, `guia sem resolução no repositório: ${destaque.guia.slug}`);
      assert.equal(registro.id, destaque.guia.id);
      assert.equal(destaque.guia.seo.canonicalPath, `/delegacias/${destaque.guia.slug}`);
      assert.ok(destaque.titulo.startsWith(`${destaque.guia.unidade.numero}º`));
    }
    assert.equal(destaques.at(4)?.titulo, "27º DP Campo Belo");
    assert.equal(destaques.at(4)?.guia.unidade.nomeOficial, "27º Distrito Policial — Campo Belo");
    assert.equal(destaques.at(5)?.subtitulo, "Santo Amaro");
    assert.equal(destaques.at(6)?.subtitulo, "Tatuapé");
    assert.equal(destaques.at(7)?.subtitulo, "Carandiru");
    assert.ok(destaques.every((item) => !/[—–]/.test(item.titulo)));
    assert.ok(destaques.every((item) => item.guia.seo.canonicalPath.startsWith("/delegacias/")));
    assert.equal(catalogo.length, 93);
    assert.throws(
      () => homeFeaturedDistricts(catalogo.filter((guia) => guia.slug !== slugsEsperados[7])),
      /Guia destacado não publicado: advogado-criminal-9-dp-carandiru/,
      "a seleção incompleta deve falhar em vez de reduzir silenciosamente a grade",
    );
  });
});
