import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { paginas } from "./paginas";
import { institutionalPaths } from "@/lib/sitemap";

describe("Termos de Uso", () => {
  const terms = paginas.find((pagina) => pagina.slug === "termos-de-uso");

  test("preserva as 18 seções e o índice aponta para cada seção", () => {
    assert.ok(terms);
    assert.equal(terms.blocos.length, 18);
    assert.equal(terms.indice?.length, 18);
    assert.equal(new Set(terms.indice?.map((item) => item.id)).size, 18);
    assert.ok(terms.blocos.every((bloco, index) => terms.indice?.[index]?.rotulo));
    assert.ok(terms.blocos.every((bloco) => bloco.paragrafos.length > 0));
  });

  test("usa rota canônica, links institucionais existentes e data efetiva", () => {
    assert.ok(terms);
    assert.equal(terms.seo.canonicalPath, "/termos-de-uso");
    assert.equal(terms.atualizadoEm, "15 de outubro de 2026");
    assert.ok(institutionalPaths.includes("/termos-de-uso"));
    const links = terms.blocos.flatMap((bloco) => bloco.links ?? []).map((link) => link.href);
    assert.deepEqual(
      links.sort(),
      [
        "/sobre",
        "/politica-de-privacidade",
        "/contato",
        "/profissionais",
        "/regioes",
        "/delegacias",
      ].sort(),
    );
    assert.ok(terms.blocos[16]?.lista?.length);
  });
});
