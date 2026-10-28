import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

export const STAGING_WORKER = "banca";
export const STAGING_ACCOUNT_ID = "7b2dfe1e7fa69edb06d7bf74d7ebc942";
export const STAGING_ORIGIN = "https://banca.paulista.workers.dev";
export const ACRE_FIXTURE = "Pauta demonstrativa: justiça em Acre";

export interface StagingArtifactIdentity {
  buildId: string;
  commit: string;
  outputDir: string;
}

export async function validateStagingArtifact(
  identity: StagingArtifactIdentity,
): Promise<{ configPath: string; serverEntry: string; publicDir: string }> {
  const outputDir = resolve(identity.outputDir);
  const configPath = join(outputDir, "server", "wrangler.json");
  const config = JSON.parse(await readFile(configPath, "utf8")) as Record<string, unknown>;
  const vars = config["vars"] as Record<string, string> | undefined;
  const assets = config["assets"] as Record<string, string> | undefined;

  assert.equal(config["name"], STAGING_WORKER, "Wrong staging Worker");
  assert.equal(config["account_id"], STAGING_ACCOUNT_ID, "Wrong Cloudflare account");
  assert.equal(vars?.["DEPLOYMENT_ENV"], "staging", "Artifact is not staging");
  assert.equal(vars?.["PUBLIC_SITE_URL"], STAGING_ORIGIN, "Wrong staging origin");
  assert.equal(vars?.["BUILD_COMMIT"], identity.commit, "Artifact commit does not match HEAD");
  assert.equal(assets?.["binding"], "ASSETS", "Assets binding is missing");
  assert.equal(assets?.["directory"], "../public", "Unexpected assets path");
  assert.deepEqual(config["kv_namespaces"], [
    { binding: "WEATHER_CACHE", id: "c6f5a6125aba45509501fb04a8c44d7d" },
    { binding: "EXTERNAL_NEWS_KV", id: "76a7d6ebb5d145d3903e5ae4f221264c" },
  ]);
  assert(
    !JSON.stringify(config).includes(".local/atlas-roads-dataset.json"),
    "Historical road dataset must not be included",
  );
  assert.equal(vars?.["EXTERNAL_NEWS_ENABLED"], "true");
  assert.deepEqual(config["triggers"], { crons: ["0 */2 * * *"] });

  const serverEntry = resolve(outputDir, "server", String(config["main"]));
  const publicDir = resolve(outputDir, "public");
  const serverFiles = await listFiles(join(outputDir, "server"));
  const clientFiles = await listFiles(join(publicDir, "assets"));
  const allArtifactFiles = await listFiles(outputDir);
  const serverBundle = await readTextFiles(serverFiles);
  const clientBundle = await readTextFiles(clientFiles);
  const artifactText = await readTextFiles(allArtifactFiles);
  const fixtureModules = serverFiles.filter((file) => /atlasNoticias[^/]*\.mjs$/.test(file));
  const fixtureBundle = await readTextFiles(fixtureModules);

  assert.match(serverBundle, /"VITE_ATLAS_DEMO":\s*"true"/);
  assert.match(
    clientBundle,
    /VITE_ATLAS_DEMO.{0,12}(?:`true`|"true")/,
    "Client Atlas demo flag does not match the staging profile",
  );
  assert(fixtureModules.length > 0, "Server fixture module is absent from the artifact");
  assert(fixtureBundle.includes("Acre"), "Acre fixture record is absent from the artifact");
  assert.match(
    fixtureBundle,
    /Pauta demonstrativa:\s*\$\{editoria\.nome\.toLowerCase\(\)\} em \$\{state\.nome\}/,
  );
  assert.match(fixtureBundle, /Texto fictício/);
  assert.match(fixtureBundle, /isDemo:\s*!0|isDemo:\s*true/);
  assert.match(clientBundle, /Conteúdo demonstrativo/);
  assert.match(clientBundle, /manchetes exibidas são fictícias/);
  assert(
    !artifactText.includes(".local/atlas-roads-dataset.json"),
    "Ignored local road build input must not be embedded in the artifact",
  );
  const roadsDir = join(publicDir, "data");
  const historicRoads = JSON.parse(
    await readFile(join(roadsDir, "atlas-roads-snv-202201b.json"), "utf8"),
  ) as Record<string, unknown>;
  assert.equal(historicRoads["id"], "dnit-snv-202201b");
  assert.equal(historicRoads["version"], "202201B");
  assert.equal(historicRoads["rightsStatus"], "approved", "Historical road approval is missing");
  assert.equal(historicRoads["productionEligible"], true);
  assert.match(String(historicRoads["scope"]), /históric/i);
  assert.match(
    String(historicRoads["attribution"]),
    /DNIT\/SNV 202201B.*Ibama\/PAMGIA.*histórica/is,
  );
  assert.match(String(historicRoads["ownerAuthorization"]), /Banca Paulista/);
  assert(
    Array.isArray(historicRoads["roads"]) && historicRoads["roads"].length === 5,
    "Expected the five approved historical federal highways",
  );

  const artespRoads = JSON.parse(
    await readFile(join(roadsDir, "atlas-roads-artesp-sp.json"), "utf8"),
  ) as Record<string, unknown>;
  assert.equal(artespRoads["id"], "artesp-sp-concession-roads");
  assert.equal(artespRoads["rightsStatus"], "approved", "ARTESP road approval is missing");
  assert.equal(artespRoads["productionEligible"], true);
  assert.match(String(artespRoads["license"]), /Creative Commons Attribution/i);
  assert.match(String(artespRoads["termsUrl"]), /dadosabertos\.artesp\.sp\.gov\.br\/terms/);
  assert.match(String(artespRoads["scope"]), /não representa todas as vias/i);
  assert.match(
    String(artespRoads["relationshipNote"]),
    /fontes paralelas.*não foi presumida junção/i,
  );
  assert.match(String(artespRoads["attribution"]), /ARTESP.*não endossa/is);
  const artespSources = artespRoads["sources"] as Array<Record<string, unknown>> | undefined;
  assert(artespSources && artespSources.length >= 2, "ARTESP source references are missing");
  assert(artespSources.every((source) => /^[a-f0-9]{64}$/.test(String(source["sha256"]))));
  const tabularSummary = artespRoads["tabularSummary"] as Record<string, unknown> | undefined;
  assert(tabularSummary && Number(tabularSummary["recordCount"]) > 0);
  assert.match(String(tabularSummary["coordinateNote"]), /não são eixos rodoviários/i);
  assert(Array.isArray(artespRoads["roads"]) && artespRoads["roads"].length > 0);

  const headersPolicy = await readFile(join(publicDir, "_headers"), "utf8");
  assert.match(
    headersPolicy,
    /\/\*\s+X-Robots-Tag:\s*noindex, nofollow, noarchive, noimageindex/i,
    "Global staging noindex is missing from the assets policy",
  );
  assert.match(
    serverBundle,
    /X-Robots-Tag.{0,120}noindex, nofollow, noarchive, noimageindex/s,
    "Global staging noindex is missing from the server bundle",
  );
  const serverSource = await readFile(serverEntry, "utf8");
  assert(serverSource.length > 0, "Cloudflare Worker entry is empty");
  assert.match(serverSource, /scheduled/, "Cloudflare scheduled handler is absent");
  assert.match(serverBundle, /external_news_sync_completed/, "External news cron plugin is absent");

  return { configPath, serverEntry, publicDir };
}

export async function assertDemoResponse(response: Response, path: string): Promise<string> {
  assert.equal(response.status, 200, `${path} must respond HTTP 200`);
  assert.match(
    response.headers.get("x-robots-tag") ?? "",
    /noindex,\s*nofollow,\s*noarchive,\s*noimageindex/i,
    `${path} is missing global noindex`,
  );
  const html = await response.text();
  assert.match(html, /<meta[^>]+name="robots"[^>]+noindex/i, `${path} has no robots meta`);
  assert.match(
    html,
    /Conteúdo demonstrativo|conteúdo demonstrativo/i,
    `${path} does not label demo content`,
  );
  assert.match(html, /Texto fictício|fictícias/i, `${path} does not identify fictional content`);
  if (path.endsWith("/estados/ac")) assert(html.includes(ACRE_FIXTURE), "Acre fixture is absent");
  return html;
}

export async function digestArtifact(root: string): Promise<string> {
  const files = await listFiles(root);
  const hash = createHash("sha256");
  for (const file of files) {
    hash.update(relative(root, file));
    hash.update("\0");
    hash.update(await readFile(file));
    hash.update("\0");
  }
  return hash.digest("hex");
}

async function listFiles(path: string): Promise<string[]> {
  const info = await stat(path);
  if (info.isFile()) return [path];
  const entries = await readdir(path, { withFileTypes: true });
  const files = await Promise.all(entries.map((entry) => listFiles(join(path, entry.name))));
  return files.flat().sort();
}

async function readTextFiles(files: string[]): Promise<string> {
  const chunks: string[] = [];
  for (const file of files) {
    if (/\.(?:mjs|js|html|json)$/.test(file)) chunks.push(await readFile(file, "utf8"));
  }
  return chunks.join("\n");
}
