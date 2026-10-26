import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  ATLAS_ROAD_CODES,
  ATLAS_ROAD_SOURCE_URL,
  buildAtlasRoadDataset,
  normalizeRoadFeatureCollection,
  type RoadFeature,
} from "../src/content/local/atlas-roads-build";

const output = resolve(".local/atlas-roads-dataset.json");
const args = process.argv.slice(2);
const download = args.includes("--download");
const inputs = args.filter((arg) => arg !== "--download");

async function fetchJson(url: string): Promise<unknown> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(60_000),
        headers: { accept: "application/geo+json, application/json" },
      });
      if (!response.ok) throw new Error(`ArcGIS HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < 2) await new Promise((resolveWait) => setTimeout(resolveWait, 350 * (attempt + 1)));
    }
  }
  throw lastError;
}

async function fetchCollections() {
  const metadata = await fetchJson(`${ATLAS_ROAD_SOURCE_URL}?f=pjson`) as {
    maxRecordCount?: number;
    objectIdField?: string;
    fields?: Array<{ name: string; type?: string }>;
  };
  const fields = metadata.fields ?? [];
  const fieldNames = new Set(fields.map((field) => field.name.toLowerCase()));
  const objectIdField = metadata.objectIdField ?? fields.find((field) => field.type === "esriFieldTypeOID")?.name;
  if (!objectIdField || !fieldNames.has("codigo_br")) throw new Error("Metadados ArcGIS sem campos de código BR/OBJECTID");
  const requiredFields = ["codigo_br", "unidade_fe", "sigla_tipo", "codigo_snv", "versao_snv"];
  if (requiredFields.some((field) => !fieldNames.has(field))) throw new Error("Schema ArcGIS não contém campos necessários à curadoria cartográfica");
  const maxRecordCount = Math.max(1, metadata.maxRecordCount ?? 500);
  const batchSize = Math.min(maxRecordCount, 150);
  const collections: Array<{ features: RoadFeature[] }> = [];
  for (const code of ATLAS_ROAD_CODES) {
    const idsQuery = new URLSearchParams({
      where: `codigo_br='${code}'`,
      returnIdsOnly: "true",
      f: "json",
    });
    const idResponse = await fetchJson(`${ATLAS_ROAD_SOURCE_URL}/query?${idsQuery}`) as { objectIds?: number[] };
    const ids = [...new Set(idResponse.objectIds ?? [])].sort((a, b) => a - b);
    if (!ids.length) throw new Error(`ArcGIS ${code}: nenhum trecho encontrado`);
    const features: RoadFeature[] = [];
    const receivedIds = new Set<number>();
    for (let offset = 0; offset < ids.length; offset += batchSize) {
      const batchIds = ids.slice(offset, offset + batchSize);
      const query = new URLSearchParams({
        objectIds: batchIds.join(","),
        outFields: [objectIdField, ...requiredFields, "extensao"].join(","),
        returnGeometry: "true",
        outSR: "4326",
        f: "geojson",
        resultRecordCount: String(maxRecordCount),
      });
      const data = await fetchJson(`${ATLAS_ROAD_SOURCE_URL}/query?${query}`);
      const batchFeatures = normalizeRoadFeatureCollection(data).features;
      if (batchFeatures.length !== batchIds.length) {
        throw new Error(`ArcGIS ${code}: paginação incompleta; esperados ${batchIds.length}, recebidos ${batchFeatures.length}`);
      }
      for (const feature of batchFeatures) {
        const attributes = feature.properties ?? {};
        const id = Number(attributes[objectIdField.toLowerCase()] ?? feature.id);
        if (!Number.isFinite(id) || !batchIds.includes(id) || receivedIds.has(id)) {
          throw new Error(`ArcGIS ${code}: ID ausente, inesperado ou duplicado (${String(id)})`);
        }
        receivedIds.add(id);
      }
      features.push(...batchFeatures);
    }
    if (receivedIds.size !== ids.length) throw new Error(`ArcGIS ${code}: contagem total não corresponde à lista de IDs`);
    collections.push({ features });
    console.log(`BR-${code}: ${features.length}/${ids.length} segmentos recebidos em lotes de até ${batchSize}`);
  }
  return collections;
}

async function main() {
  if (!download && inputs.length === 0) {
    throw new Error("Use --download para obter os dados, ou informe arquivos GeoJSON de entrada.");
  }
  const collections = download
    ? await fetchCollections()
    : await Promise.all(
      inputs.map(async (path) => normalizeRoadFeatureCollection(JSON.parse(await readFile(resolve(path), "utf8")))),
      );
  const dataset = buildAtlasRoadDataset(collections, new Date().toISOString());
  await mkdir(resolve(".local"), { recursive: true });
  await writeFile(output, `${JSON.stringify(dataset)}\n`);
  console.log(`Gerado: ${output}`);
  console.log(JSON.stringify({
    version: dataset.version,
    segments: dataset.counts.segments,
    sourceVertices: dataset.counts.sourceVertices,
    renderedVertices: dataset.counts.renderedVertices,
    roads: dataset.roads.map(({ code, ufs, segments }) => ({ code, ufs, segments: segments.length })),
  }, null, 2));
}

await main();
