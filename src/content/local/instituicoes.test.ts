import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { content } from "../repository";
import { instituicoes } from "./instituicoes";

describe("diretório de instituições públicas", () => {
  test("não publica páginas vazias nem registros ainda não aprovados", async () => {
    assert.deepEqual(instituicoes, []);
    assert.deepEqual(await content.listInstitutions(), []);
    assert.equal(await content.getInstitution("instituicao-nao-cadastrada"), null);
  });
});
