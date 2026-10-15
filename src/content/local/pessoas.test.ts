import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  buscarRegistrosInstitucionais,
  evidenciasPessoas,
  instituicoesReferenciadas,
  listarRegistrosInstitucionais,
  pessoasEditoriais,
  vinculosInstitucionais,
} from "./pessoas";

describe("piloto editorial de pessoas", () => {
  const registros = listarRegistrosInstitucionais();

  test("só expõe os três vínculos vigentes com evidência consultada", () => {
    assert.equal(registros.length, 3);
    assert.equal(new Set(registros.map(({ pessoa }) => pessoa.id)).size, 3);
    assert.deepEqual(
      registros.map(({ pessoa }) => pessoa.nome),
      [
        "Adriano Scalzaretto",
        "Francisco Eduardo Loureiro",
        "Luciana Jordão da Motta Armiliato de Carvalho",
      ],
    );
    assert.equal(
      registros.every(
        ({ evidencia, vinculo }) =>
          evidencia.situacaoEditorial === "confirmada" && vinculo.situacao === "atual",
      ),
      true,
    );
    assert.equal(pessoasEditoriais.length, 3);
    assert.equal(vinculosInstitucionais.length, 3);
    assert.equal(evidenciasPessoas.length, 3);
    assert.equal(instituicoesReferenciadas.length, 3);
  });

  test("busca combina categoria, cargo, instituição e normalização de acentos", () => {
    assert.deepEqual(
      buscarRegistrosInstitucionais(registros, "JORDAO", "defensoria-direitos").map(
        ({ pessoa }) => pessoa.id,
      ),
      ["luciana-jordao-da-motta-armiliato-de-carvalho"],
    );
    assert.deepEqual(
      buscarRegistrosInstitucionais(registros, "presidencia", "judiciario").map(
        ({ pessoa }) => pessoa.id,
      ),
      ["francisco-eduardo-loureiro"],
    );
    assert.deepEqual(
      buscarRegistrosInstitucionais(registros, "Pinheiros", "oab-conselhos").map(
        ({ pessoa }) => pessoa.id,
      ),
      ["adriano-scalzaretto"],
    );
    assert.equal(buscarRegistrosInstitucionais(registros, "Pinheiros", "judiciario").length, 0);
    assert.equal(buscarRegistrosInstitucionais(registros, "", "independentes").length, 0);
  });
});
