import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { delegacias } from "./delegacias";

const contatos = {
  "7": "(11) 3864-7445",
  "14": "(11) 3032-1100",
  "15": "(11) 3079-8244",
  "23": "(11) 3864-5265",
  "27": "(11) 5543-2727",
  "51": "(11) 3727-1211",
  "55": "(11) 6919-8627",
  "78": "(11) 3082-0160",
  "83": "(11) 2331-9581",
  "96": "(11) 5505-1607",
  "97": "(11) 5588-4841",
  "98": "(11) 5621-7319",
  "102": "(11) 5686-3594",
} as const;

describe("Telefones editoriais de delegacias", () => {
  test("vincula os contatos fornecidos às unidades correspondentes", () => {
    assert.equal(Object.keys(contatos).length, 13);
    for (const [numero, telefone] of Object.entries(contatos)) {
      const unidades = delegacias.filter((dp) => dp.unidade.numero === numero);
      assert.equal(unidades.length, 1, `deve existir uma unidade ${numero}º DP`);
      assert.equal(unidades[0]?.unidade.telefone, telefone, `${numero}º DP`);
      assert.equal(unidades[0]?.unidade.telefoneTipo, "unidade", `${numero}º DP`);
      assert.ok(unidades[0]?.unidade.telefoneFonte, `${numero}º DP precisa indicar a fonte`);
      assert.equal(
        unidades[0]?.unidade.telefoneFonteUrl,
        "https://prefeitura.sp.gov.br/direitos_humanos/w/mulheres/rede_de_atendimento/209661",
        `${numero}º DP precisa apontar para a fonte original`,
      );
      assert.equal(unidades[0]?.unidade.telefoneFontePublicadaEm, "2022-03-24", `${numero}º DP`);
      assert.equal(unidades[0]?.unidade.telefoneStatus, "historico-pendente", `${numero}º DP`);
      assert.equal(
        unidades[0]?.unidade.telefoneVerificadoEm,
        undefined,
        `${numero}º DP não foi revalidado`,
      );
    }
    assert.equal(delegacias.filter((dp) => dp.unidade.telefone).length, 13);
  });
});
