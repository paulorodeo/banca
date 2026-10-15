import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { bairros } from "./bairros";
import { delegacias } from "./delegacias";
import { regioes } from "./regioes";
import { zonas } from "./zonas";
import { montarIndiceTerritorial } from "./indice-territorial";
import { homeNeighborhoodHighlights } from "./home-highlights";
import { content } from "../repository";
import { publishedPaths } from "@/lib/sitemap";

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

  test("Zona Oeste mantém um destino próprio para cada card territorial publicado", () => {
    const oeste = regioes.filter((regiao) => regiao.zona === "zona-oeste");
    const slugs = new Set(
      bairros.filter((bairro) => bairro.zona === "zona-oeste").map((bairro) => bairro.slug),
    );
    const paths = publishedPaths({ delegacias, zonas, bairros, articles: [] });

    assert.ok(oeste.length >= 8);
    for (const regiao of oeste) {
      assert.ok(slugs.has(regiao.slug), `${regiao.nome} sem página própria publicada`);
      assert.ok(paths.includes(`/bairros/${regiao.slug}`), `${regiao.slug} fora do sitemap`);
    }

    const lapa = bairros.find((bairro) => bairro.slug === "lapa");
    assert.equal(lapa?.nome, "Lapa e Vila Romana");
    assert.equal(regioes.find((regiao) => regiao.slug === "itaim-bibi")?.zona, "zona-sul");
    assert.equal(delegacias.length, 93);
  });

  test("cards da Zona Leste resolvem territórios publicados sem duplicar Itaquera", () => {
    const leste = regioes.filter((regiao) => regiao.zona === "zona-leste");
    const zonePages = bairros.filter((bairro) => bairro.zona === "zona-leste");
    const zoneSlugs = new Set(zonePages.map((bairro) => bairro.slug));
    const territorialTargets = new Set(leste.map((regiao) => regiao.territorioSlug ?? regiao.slug));
    const paths = publishedPaths({ delegacias, zonas, bairros, articles: [] });

    assert.equal(leste.length, 34);
    assert.equal(territorialTargets.size, 33);
    assert.equal(zonePages.length, 33);
    for (const slug of territorialTargets) {
      assert.ok(zoneSlugs.has(slug), `${slug} sem página própria`);
      assert.ok(paths.includes(`/bairros/${slug}`), `${slug} fora do sitemap`);
    }

    const itaquera = zonePages.find((bairro) => bairro.slug === "itaquera");
    assert.equal(itaquera?.nome, "Itaquera");
    assert.deepEqual(itaquera?.instituicoes.map((relation) => relation.institutionSlug).sort(), [
      "advogado-criminal-103-dp-itaquera",
      "advogado-criminal-32-dp-itaquera",
    ]);
    assert.equal(delegacias.length, 93);
  });

  test("não publica dados operacionais ou perfis fictícios em Pinheiros", () => {
    const text = JSON.stringify(bairros.find((bairro) => bairro.slug === "pinheiros"));
    assert.doesNotMatch(text, /OAB\/?SP|WhatsApp|telefone|atendimento 24/i);
    const related = bairros[0]?.instituicoes.map((item) => item.institutionSlug) ?? [];
    assert.deepEqual(related, ["advogado-14-dp-pinheiros"]);
  });

  test("publica um único piloto de Santo Amaro com relação policial canônica e recorte próprio", () => {
    const pilotos = bairros.filter((bairro) => bairro.slug === "santo-amaro");
    assert.equal(pilotos.length, 1);
    const piloto = pilotos[0]!;
    assert.equal(piloto.status, "publicado");
    assert.equal(piloto.zona, "zona-sul");
    assert.equal(regioes.find((regiao) => regiao.slug === piloto.slug)?.zona, "zona-sul");
    assert.equal(
      regioes.find((regiao) => regiao.slug === piloto.slug)?.href,
      "/delegacias/advogado-criminal-11-dp-santo-amaro",
    );
    assert.equal(piloto.seo.canonicalPath, "/bairros/santo-amaro");
    assert.ok(piloto.recorteTerritorial?.includes("subprefeitura"));
    assert.equal(piloto.instituicoes.length, 1);
    assert.equal(piloto.instituicoes[0]?.relation, "relacionada");
    assert.equal(piloto.instituicoes[0]?.institutionSlug, "advogado-criminal-11-dp-santo-amaro");
    assert.equal(
      delegacias.find((guia) => guia.unidade.numero === "11")?.slug,
      piloto.instituicoes[0]?.institutionSlug,
    );
    assert.ok(
      piloto.servicosLocais?.every((servico) =>
        servico.fonteUrl.startsWith("https://prefeitura.sp.gov.br/"),
      ),
    );
  });

  test("índice, destaque e sitemap oferecem Santo Amaro apenas quando publicado", async () => {
    const publicados = montarIndiceTerritorial(regioes, delegacias, bairros, zonas);
    assert.equal(
      publicados.find((item) => item.id === "territorio-santo-amaro")?.paginaBairro,
      "/bairros/santo-amaro",
    );
    const highlights = await homeNeighborhoodHighlights(regioes, bairros, (slug) =>
      content.getBairro(slug),
    );
    assert.equal(
      highlights.find((item) => item.id === "territorio-santo-amaro")?.href,
      "/bairros/santo-amaro",
    );
    assert.ok(
      publishedPaths({ delegacias, zonas, bairros, articles: [] }).includes("/bairros/santo-amaro"),
    );

    const emRevisao = bairros.map((bairro) =>
      bairro.slug === "santo-amaro" ? { ...bairro, status: "revisao" as const } : bairro,
    );
    assert.equal(
      montarIndiceTerritorial(regioes, delegacias, emRevisao, zonas).find(
        (item) => item.id === "territorio-santo-amaro",
      )?.paginaBairro,
      undefined,
    );
    const semSantoPublicado = await homeNeighborhoodHighlights(regioes, emRevisao, (slug) =>
      content.getBairro(slug),
    );
    assert.equal(
      semSantoPublicado.find((item) => item.id === "territorio-santo-amaro"),
      undefined,
    );
    assert.ok(
      !publishedPaths({ delegacias, zonas, bairros: emRevisao, articles: [] }).includes(
        "/bairros/santo-amaro",
      ),
    );
  });
});
