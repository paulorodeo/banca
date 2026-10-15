import { test } from "node:test";
import assert from "node:assert/strict";
import { zonas, withPublishedGuideCounts } from "./zonas";
import { regioes } from "./regioes";
import { delegacias } from "./delegacias";

test("os cards contam os 93 guias canônicos nas zonas editoriais aprovadas", () => {
  const summaries = withPublishedGuideCounts(zonas, regioes, delegacias);
  assert.deepEqual(
    summaries.map(({ slug, quantidade }) => [slug, quantidade]),
    [
      ["centro", 8],
      ["zona-norte", 16],
      ["zona-leste", 34],
      ["zona-sul", 27],
      ["zona-oeste", 8],
    ],
  );
  assert.equal(
    summaries.reduce((total, zona) => total + zona.quantidade, 0),
    93,
  );
});

test("mais referências territoriais ou linhas repetidas não inflam a quantidade de guias", () => {
  const firstRegion = regioes[0]!;
  const firstGuide = delegacias[0]!;
  assert.deepEqual(
    withPublishedGuideCounts(
      zonas,
      [...regioes, { ...firstRegion, id: "test-alias", slug: "test-alias" }],
      [...delegacias, firstGuide],
    ),
    withPublishedGuideCounts(zonas, regioes, delegacias),
  );
});
