import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import type { DelegaciaUnidade } from "@/content/types";
import { DelegaciaTelefone } from "./delegacia-telefone";

describe("DelegaciaTelefone", () => {
  test("renderiza o número revelado no HTML SSR e prepara link tel correto", () => {
    const unidade: DelegaciaUnidade = {
      numero: "14",
      nomeOficial: "14º Distrito Policial — Pinheiros",
      telefone: "(11) 3032-1100",
      telefoneFonte: "Cadastro de teste",
      telefoneFontePublicadaEm: "2022-03-24",
      telefoneStatus: "historico-pendente",
      telefoneTipo: "unidade",
      dadosDeDesenvolvimento: false,
    };

    const html = renderToStaticMarkup(<DelegaciaTelefone unidade={unidade} />);

    assert.match(html, /Telefone do 14º Distrito Policial/);
    assert.match(html, /<details/);
    assert.match(html, /<summary[^>]*>/);
    assert.match(html, /Ver número/);
    assert.match(html, /\(11\) 3032-XXXX/);
    assert.match(html, /href="tel:\+551130321100"/);
    assert.match(html, /\(11\) 3032-1100/);
    assert.match(html, /Cadastro de teste/);
    assert.match(html, /24 de março de 2022/);
    assert.match(html, /a atividade atual da linha não foi revalidada/);
    assert.doesNotMatch(html, /Verificado em:/);
  });

  test("usa estado informativo quando não há telefone", () => {
    const unidade: DelegaciaUnidade = {
      numero: "1",
      nomeOficial: "1º Distrito Policial — Sé",
      dadosDeDesenvolvimento: true,
    };

    const html = renderToStaticMarkup(<DelegaciaTelefone unidade={unidade} />);

    assert.match(html, /Telefone ainda não confirmado/);
    assert.match(html, /Este guia ainda não possui um telefone confirmado em fonte oficial/);
    assert.doesNotMatch(html, /Ver número|href="tel:/);
  });
});
