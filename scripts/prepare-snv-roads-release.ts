import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { AtlasRoadDataset } from "../src/content/local/atlas-roads.types";

const inputPath = resolve(process.argv[2] ?? ".local/atlas-roads-dataset.json");
const outputPath = resolve(process.argv[3] ?? "public/data/atlas-roads-snv-202201b.json");
const authorizedCodes = ["BR-101", "BR-116", "BR-153", "BR-163", "BR-364"];
const source = JSON.parse(await readFile(inputPath, "utf8")) as AtlasRoadDataset;

assert.equal(source.version, "202201B", "Expected the owner-authorized historical SNV release");
assert.deepEqual(
  source.roads.map((road) => road.code),
  authorizedCodes,
  "Unexpected road set in the local historical dataset",
);
assert.equal(
  source.counts.segments,
  1472,
  "Historical segment count changed; review before release",
);

const release: AtlasRoadDataset = {
  ...source,
  id: "dnit-snv-202201b",
  title: "Rodovias federais — histórico SNV 202201B",
  scope:
    "Traçados históricos das BR-101, BR-116, BR-153, BR-163 e BR-364; não representa a versão vigente da malha rodoviária.",
  accessedAt: source.extractedAt?.slice(0, 10) ?? "2026-10-26",
  license:
    "Uso de publicação autorizado pelo proprietário em 27/10/2026, sujeito às condições aplicáveis do DNIT e da distribuição Ibama/PAMGIA.",
  ownerAuthorization: "Autorização do proprietário da Banca Paulista registrada em 27/10/2026.",
  attribution:
    "Fonte: DNIT/SNV 202201B, distribuição Ibama/PAMGIA. Base histórica, não vigente. Uso e publicação autorizados pelo proprietário em 27/10/2026, sujeitos às condições aplicáveis do fornecedor. Traçado generalizado para visualização; não cadastral.",
  rightsStatus: "approved",
  productionEligible: true,
};

await writeFile(outputPath, `${JSON.stringify(release)}\n`, "utf8");
console.log(
  `Preparado ${outputPath}: SNV ${release.version}, ${release.counts.segments} segmentos, entrada preservada em ${inputPath}`,
);
