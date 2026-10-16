import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { content } from "../repository";
import { instituicoes } from "./instituicoes";

describe("diretório de instituições públicas", () => {
  test("publica somente as fichas institucionais aprovadas", async () => {
    assert.deepEqual(
      instituicoes.map((institution) => institution.slug),
      ["gecradi", "gaeco"],
    );
    assert.deepEqual(
      (await content.listInstitutions()).map((institution) => institution.slug),
      ["gecradi", "gaeco"],
    );
    assert.equal((await content.getInstitution("gecradi"))?.sigla, "GECRADI");
    assert.equal((await content.getInstitution("gaeco"))?.sigla, "GAECO");
    assert.equal(await content.getInstitution("instituicao-nao-cadastrada"), null);
  });

  test("mantém fontes oficiais e não presume relações territoriais", () => {
    for (const institution of instituicoes) {
      assert.equal(institution.categoria, "ministerio-publico");
      assert.equal(institution.relacoesTerritoriais.length, 0);
      assert.ok(institution.fontes.every((source) => source.url.startsWith("https://www.mpsp.mp.br/")));
      assert.ok(institution.fontes.every((source) => source.consultadaEm === "16/10/2026"));
    }
  });
});
