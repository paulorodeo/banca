import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { delegacias } from "./delegacias";
import { regioes } from "./regioes";
import { zonas } from "./zonas";

describe("Zonas e arquitetura regional", () => {
  test("cinco zonas com slugs únicos", () => {
    assert.equal(zonas.length, 5);
    assert.equal(new Set(zonas.map((zona) => zona.slug)).size, 5);
    assert.deepEqual(zonas.map((zona) => zona.slug).sort(), [
      "centro",
      "zona-leste",
      "zona-norte",
      "zona-oeste",
      "zona-sul",
    ]);
  });

  test("toda região declara uma zona válida", () => {
    const slugs = new Set(zonas.map((zona) => zona.slug));
    for (const regiao of regioes) {
      assert.ok(slugs.has(regiao.zona), `${regiao.slug} sem zona válida`);
    }
  });

  test("Zona Sul reúne 27 regiões, Oeste 8 e Leste 34", () => {
    const porZona = (slug: string) => regioes.filter((regiao) => regiao.zona === slug).length;
    assert.equal(porZona("zona-sul"), 27);
    assert.equal(porZona("zona-oeste"), 8);
    assert.equal(porZona("zona-leste"), 34);
    assert.equal(porZona("zona-norte"), 16);
    assert.equal(porZona("centro"), 8);
  });

  test("Pinheiros é Zona Oeste e Americanópolis é Zona Sul", () => {
    assert.equal(regioes.find((regiao) => regiao.slug === "pinheiros")?.zona, "zona-oeste");
    assert.equal(regioes.find((regiao) => regiao.slug === "americanopolis")?.zona, "zona-sul");
  });
});

describe("Americanópolis na grade territorial", () => {
  test("preserva os guias anteriores e acrescenta 55º e 83º sem duplicar unidades", () => {
    assert.equal(delegacias.length, 93);
    assert.equal(new Set(delegacias.map((dp) => dp.unidade.numero)).size, 93);
    for (const numero of ["25", "55", "83", "85", "95"])
      assert.equal(delegacias.filter((dp) => dp.unidade.numero === numero).length, 1);
  });

  test("mantém Americanópolis entre as regiões da home", () => {
    assert.equal(regioes.length, 93);
    assert.equal(
      regioes.find((regiao) => regiao.slug === "americanopolis")?.href,
      "/delegacias/advogado-criminal-97-dp-americanopolis",
    );
  });

  test("não classifica Americanópolis por proximidade a um escritório", () => {
    assert.equal(
      "escopoTerritorial" in (delegacias.find((dp) => dp.unidade.numero === "97") ?? {}),
      false,
    );
  });

  test("conecta reciprocamente o 97º aos quatro distritos do lote", () => {
    const americanopolis = delegacias.find((dp) => dp.unidade.numero === "97");
    for (const numero of ["35", "80", "98", "43"]) {
      const vizinha = delegacias.find((dp) => dp.unidade.numero === numero);
      assert.equal(
        americanopolis?.delegaciasRelacionadas?.some((rel) => rel.slug === vizinha?.slug),
        true,
      );
      assert.equal(
        vizinha?.delegaciasRelacionadas?.some((rel) => rel.slug === americanopolis?.slug),
        true,
      );
    }
  });
});

describe("25º DP Parelheiros fecha a Zona Sul", () => {
  test("existe página do 25º DP com região própria", () => {
    const parelheiros = delegacias.find((dp) => dp.unidade.numero === "25");
    assert.equal(parelheiros?.slug, "advogado-criminal-25-dp-parelheiros");
    assert.equal(regioes.find((regiao) => regiao.slug === "parelheiros")?.zona, "zona-sul");
  });

  test("vínculo territorial recíproco com Jardim Imbuias e Jardim Mirna", () => {
    const parelheiros = delegacias.find((dp) => dp.unidade.numero === "25");
    for (const numero of ["101", "85"]) {
      const vizinha = delegacias.find((dp) => dp.unidade.numero === numero);
      assert.equal(
        parelheiros?.delegaciasRelacionadas?.some((rel) => rel.slug === vizinha?.slug),
        true,
      );
      assert.equal(
        vizinha?.delegaciasRelacionadas?.some((rel) => rel.slug === parelheiros?.slug),
        true,
      );
    }
  });
});

describe("Cobertura territorial de 93 DPs", () => {
  test("55º e 83º mantêm zonas e vínculos reais com telefone cadastrado separadamente", () => {
    for (const [numero, zona, regiaoSlug, slug] of [
      ["55", "zona-leste", "parque-sao-rafael", "advogado-criminal-55-dp-parque-sao-rafael"],
      ["83", "zona-sul", "parque-bristol", "advogado-criminal-83-dp-parque-bristol"],
    ] as const) {
      const dp = delegacias.find((item) => item.unidade.numero === numero);
      const regiao = regioes.find((item) => item.slug === regiaoSlug);
      assert.equal(dp?.slug, slug);
      assert.equal(dp?.seo.canonicalPath, `/delegacias/${slug}`);
      assert.equal(regiao?.zona, zona);
      assert.equal(regiao?.href, dp?.seo.canonicalPath);
      assert.equal(dp?.regiaoSlug, regiaoSlug);
      assert.equal(dp?.unidade.dadosDeDesenvolvimento, true);
      assert.ok(dp?.unidade.telefone);
      assert.ok(dp?.unidade.telefoneFonte);
      assert.equal(dp?.unidade.telefoneFontePublicadaEm, "2022-03-24");
      assert.equal(dp?.unidade.telefoneStatus, "historico-pendente");
      assert.equal(dp?.unidade.telefoneVerificadoEm, undefined);
      for (const key of ["endereco", "horario", "competencia"] as const)
        assert.equal(dp?.unidade[key], undefined);
      assert.ok(dp?.delegaciasRelacionadas?.length);
      for (const link of dp?.delegaciasRelacionadas ?? []) {
        const vizinha = delegacias.find((item) => item.slug === link.slug);
        assert.ok(vizinha?.delegaciasRelacionadas?.some((item) => item.slug === slug));
      }
    }
  });

  test("3º e 59º exibem denominações oficiais sem perder os slugs antigos", () => {
    const camposEliseos = delegacias.find((dp) => dp.unidade.numero === "3");
    const jardimDosIpes = delegacias.find((dp) => dp.unidade.numero === "59");
    assert.equal(camposEliseos?.slug, "advogado-criminal-3-dp-santa-ifigenia");
    assert.equal(jardimDosIpes?.slug, "advogado-criminal-59-dp-jardim-noemia");
    assert.equal(camposEliseos?.unidade.nomeOficial, "3º Distrito Policial — Campos Elíseos");
    assert.equal(jardimDosIpes?.unidade.nomeOficial, "59º Distrito Policial — Jardim dos Ipês");
    assert.ok(camposEliseos?.bairros.includes("Santa Ifigênia"));
    assert.ok(jardimDosIpes?.bairros.includes("Jardim Noêmia"));
  });
});

describe("Identidade editorial", () => {
  test("não publica identidade antiga, endereço de escritório ou oferta de triagem", () => {
    const texto = JSON.stringify(delegacias);
    assert.doesNotMatch(texto, /Sinigalia|411\.502|Antônio Raposo Barreto|04904-170|triagem/i);
    for (const dp of delegacias) {
      assert.ok(dp.seo.title.includes("Banca Paulista"));
      assert.ok(dp.faq.some((faq) => faq.resposta.includes("não há profissionais")));
    }
  });
  test("todos os interlinks territoriais possuem destino real", () => {
    const slugs = new Set(delegacias.map((dp) => dp.slug));
    for (const dp of delegacias)
      for (const vizinha of dp.delegaciasRelacionadas ?? []) assert.ok(slugs.has(vizinha.slug));
  });
});
