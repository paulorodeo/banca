import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { content } from "../repository";
import { categoriasComInstituicoes, categoriasOrgaos } from "./orgaos";

describe("categorias editoriais de órgãos e serviços", () => {
  test("agrupa somente fichas institucionais publicadas sem duplicar registros", async () => {
    const categorias = categoriasComInstituicoes(await content.listInstitutions());
    const slugs = categorias.flatMap((categoria) => categoria.instituicoes.map((item) => item.slug));

    assert.equal(new Set(slugs).size, slugs.length);
    assert.deepEqual(
      categorias.find((categoria) => categoria.id === "ministerio-publico")?.instituicoes.map(
        (item) => item.slug,
      ),
      ["gecradi", "gaeco"],
    );
    assert.deepEqual(
      categorias.find((categoria) => categoria.id === "policia-investigacao")?.instituicoes.map(
        (item) => item.slug,
      ),
      ["1-ddm-cambuci", "3-ddm-jaguare", "7-ddm-itaquera"],
    );
  });

  test("mantém categorias futuras configuradas sem inventar destinos", () => {
    assert.equal(categoriasOrgaos.length, 7);
    assert.ok(categoriasOrgaos.some((categoria) => categoria.id === "justica-tribunais"));
  });
});
