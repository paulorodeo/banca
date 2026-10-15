import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { paginas } from "./paginas";
import { institutionalPaths } from "@/lib/sitemap";

describe("Política de Privacidade local", () => {
  const privacy = paginas.find((pagina) => pagina.slug === "privacidade");

  test("mantém os 22 tópicos, índice único e subseções semânticas", () => {
    assert.ok(privacy);
    assert.equal(privacy.blocos.length, 22);
    assert.equal(privacy.indice?.length, 22);
    assert.equal(new Set(privacy.indice?.map((item) => item.id)).size, 22);
    assert.deepEqual(
      privacy.blocos.map((bloco) => bloco.titulo),
      privacy.indice?.map((item) => item.rotulo),
    );
    assert.ok(privacy.blocos.every((bloco) => bloco.paragrafos.length > 0));
    assert.ok(privacy.blocos[2]?.subsecoes?.some((item) => item.titulo.startsWith("3.1.")));
    assert.ok(privacy.blocos[6]?.subsecoes?.some((item) => item.titulo.startsWith("7.4.")));
  });

  test("usa rota canônica e mantém fora do sitemap até remover o bloqueio institucional", () => {
    assert.ok(privacy);
    assert.equal(privacy.seo.canonicalPath, "/privacidade");
    assert.equal(privacy.atualizadoEm, "15 de outubro de 2026");
    assert.ok(!institutionalPaths.some((path: string) => path === "/privacidade"));
    assert.ok(institutionalPaths.some((path) => path === "/politica-de-privacidade"));
  });

  test("liga políticas relacionadas às rotas atuais e registra a pendência do controlador", () => {
    assert.ok(privacy);
    const links = [
      ...privacy.blocos.flatMap((bloco) => bloco.links ?? []),
      ...(privacy.linksRelacionados ?? []),
    ];
    assert.ok(links.some((link) => link.href === "/termos-de-uso"));
    assert.ok(links.some((link) => link.href === "/integridade-e-etica"));
    assert.ok(links.some((link) => link.href === "/sobre"));
    assert.ok(links.some((link) => link.href === "/contato"));
    assert.ok(privacy.blocos[1]?.paragrafos.join(" ").includes("não estão confirmados"));
  });
});
