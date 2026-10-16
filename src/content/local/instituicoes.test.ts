import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { content } from "../repository";
import { instituicoes } from "./instituicoes";

describe("diretório de instituições públicas", () => {
  test("publica somente as fichas institucionais aprovadas", async () => {
    assert.deepEqual(
      instituicoes.map((institution) => institution.slug),
      [
        "gecradi",
        "gaeco",
        "1-ddm-cambuci",
        "3-ddm-jaguare",
        "7-ddm-itaquera",
        "defensoria-publica-sp",
        "nupir",
        "foro-regional-ii-santo-amaro",
        "foro-regional-iii-jabaquara",
      ],
    );
    assert.deepEqual(
      (await content.listInstitutions()).map((institution) => institution.slug),
      [
        "gecradi",
        "gaeco",
        "1-ddm-cambuci",
        "3-ddm-jaguare",
        "7-ddm-itaquera",
        "defensoria-publica-sp",
        "nupir",
        "foro-regional-ii-santo-amaro",
        "foro-regional-iii-jabaquara",
      ],
    );
    assert.equal((await content.getInstitution("gecradi"))?.sigla, "GECRADI");
    assert.equal((await content.getInstitution("gaeco"))?.sigla, "GAECO");
    assert.equal((await content.getInstitution("1-ddm-cambuci"))?.sigla, "1ª DDM");
    assert.equal((await content.getInstitution("3-ddm-jaguare"))?.sigla, "3ª DDM");
    assert.equal((await content.getInstitution("7-ddm-itaquera"))?.sigla, "7ª DDM");
    assert.equal((await content.getInstitution("nupir"))?.sigla, "NUPIR");
    assert.equal(await content.getInstitution("instituicao-nao-cadastrada"), null);
  });

  test("mantém fontes oficiais e não presume relações territoriais", () => {
    for (const institution of instituicoes) {
      assert.ok(
        [
          "ministerio-publico",
          "policia-civil-especializada",
          "defensoria-publica",
          "foruns-tribunais",
        ].includes(institution.categoria),
      );
      assert.equal(institution.relacoesTerritoriais.length, 0);
      assert.ok(institution.fontes.every((source) => source.url.startsWith("https://")));
      assert.ok(institution.fontes.every((source) => source.consultadaEm === "16/10/2026"));
    }
  });

  test("relaciona Defensoria e NUPIR sem duplicar a ficha do núcleo", async () => {
    const defensoria = await content.getInstitution("defensoria-publica-sp");
    const nupir = await content.getInstitution("nupir");
    assert.equal(defensoria?.tipo, "orgao");
    assert.equal(nupir?.tipo, "nucleo-especializado");
    assert.ok(defensoria?.contatos?.some((contact) => contact.href === "/instituicoes/nupir"));
    assert.ok(
      nupir?.contatos?.some((contact) => contact.href === "/instituicoes/defensoria-publica-sp"),
    );
  });

  test("mantém DDMs fora dos guias territoriais e sem horário editorial", () => {
    const ddms = instituicoes.filter(
      (institution) =>
        institution.slug.endsWith("-ddm-cambuci") ||
        institution.slug.endsWith("-ddm-jaguare") ||
        institution.slug.endsWith("-ddm-itaquera"),
    );
    assert.equal(ddms.length, 3);
    for (const ddm of ddms) {
      assert.equal(ddm.categoria, "policia-civil-especializada");
      assert.equal(ddm.relacoesTerritoriais.length, 0);
      assert.ok(ddm.descricao.includes("DECAP"));
      assert.ok(!ddm.descricao.includes("horário"));
    }
  });
});
