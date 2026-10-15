import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { paginas } from "./paginas";
import { institutionalPaths } from "@/lib/sitemap";

describe("Política de Integridade, Ética e Independência Editorial", () => {
  const policy = paginas.find((pagina) => pagina.slug === "integridade-e-etica");

  test("preserva os 22 tópicos e o índice tem âncoras únicas correspondentes", () => {
    assert.ok(policy);
    assert.equal(policy.blocos.length, 22);
    assert.equal(policy.indice?.length, 22);
    assert.equal(new Set(policy.indice?.map((item) => item.id)).size, 22);
    assert.deepEqual(
      policy.blocos.map((bloco) => bloco.titulo),
      policy.indice?.map((item) => item.rotulo),
    );
    assert.ok(policy.blocos.every((bloco) => bloco.paragrafos.length > 0));
    assert.ok(policy.blocos[7]?.lista?.length);
  });

  test("aponta para fontes OAB oficiais e usa rota e canonical próprios", () => {
    assert.ok(policy);
    assert.equal(policy.seo.canonicalPath, "/integridade-e-etica");
    assert.equal(policy.atualizadoEm, "15 de outubro de 2026");
    const links = policy.blocos.flatMap((bloco) => bloco.links ?? []);
    assert.ok(links.some((link) => link.href.includes("provimentos/205-2021")));
    assert.ok(links.some((link) => link.href.includes("resolucoes/02-2015")));
    assert.ok(links.some((link) => link.href.includes("l8906.htm")));
    assert.ok(links.some((link) => link.href.includes("detementa/22176")));
    assert.ok(institutionalPaths.some((path) => path === "/integridade-e-etica"));
  });

  test("as três políticas se ligam entre si sem anunciar contratação ou contato inexistente", () => {
    const terms = paginas.find((pagina) => pagina.slug === "termos-de-uso");
    const privacy = paginas.find((pagina) => pagina.slug === "privacidade");
    assert.ok(terms && privacy && policy);

    const hrefs = (pagina: NonNullable<typeof policy>) =>
      (pagina.linksRelacionados ?? []).map((link) => link.href);
    assert.ok(hrefs(terms).includes("/privacidade"));
    assert.ok(hrefs(terms).includes("/integridade-e-etica"));
    assert.ok(hrefs(privacy).includes("/termos-de-uso"));
    assert.ok(hrefs(privacy).includes("/integridade-e-etica"));
    assert.ok(hrefs(policy).includes("/termos-de-uso"));
    assert.ok(hrefs(policy).includes("/privacidade"));
    assert.ok(policy.linksRelacionados?.some((link) => link.href === "/profissionais"));
    assert.ok(policy.blocos[17]?.paragrafos.join(" ").includes("não há canal operacional"));
  });
});
