import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import net from "node:net";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import {
  assertDemoResponse,
  digestArtifact,
  STAGING_ACCOUNT_ID,
  STAGING_ORIGIN,
  STAGING_WORKER,
  validateStagingArtifact,
} from "./staging-artifact";
import { checkStagingDeploy } from "./check-staging-deploy";
import { runVerifiedStagingUpload } from "./staging-upload-gate";

const root = resolve(import.meta.dirname, "..");
const buildId = randomUUID();
const outputDir = join(tmpdir(), `lawsp-banca-staging-${buildId}`);
const localStateDir = join(tmpdir(), `lawsp-banca-staging-state-${buildId}`);
const wrangler = ["x", "--yes", "wrangler@4.151.0"];
const routes = ["/noticias/brasil", "/noticias/regioes/norte", "/noticias/estados/ac"] as const;

async function main() {
  if (process.argv[2] === "--initial-preflight") {
    validateSourceTarget();
    await validateCloudflareIdentity();
    await validateGit();
    console.log(`Preflight inicial aprovado: ${STAGING_WORKER} · ${STAGING_ACCOUNT_ID}`);
    return;
  }
  assert.equal(process.argv[2], "--locked", "Execute via bun run deploy:staging for host locking");
  assert.equal(process.env["STAGING_DEPLOY_LOCK_HELD"], "1", "Staging deploy lock is not held");

  validateSourceTarget();
  const identity = await validateGit();
  await validateCloudflareIdentity();
  const environment = {
    ...process.env,
    DEPLOYMENT_ENV: "staging",
    PUBLIC_SITE_URL: STAGING_ORIGIN,
    VITE_ATLAS_DEMO: "true",
    BP_BUILD_OUTPUT: outputDir,
  };

  console.log(`Build ${buildId} · commit ${identity.commit} · Worker ${STAGING_WORKER}`);
  run("bun", ["run", "build:staging"], environment);
  let artifactPath = "";
  let artifactDigest = "";
  const deployOutput = await runVerifiedStagingUpload({
    verifyArtifact: async () => {
      const artifact = await validateStagingArtifact({
        buildId,
        commit: identity.commit,
        outputDir,
      });
      artifactPath = artifact.configPath;
      await checkStagingDeploy({ root, outputDir, expectedCommit: identity.commit });
    },
    verifySsr: async () => {
      await verifyLocalWorker(artifactPath, identity.commit);
    },
    preflight: async () => {
      await validateGit(identity.commit);
      await validateCloudflareIdentity();
      await checkStagingDeploy({ root, outputDir, expectedCommit: identity.commit });
    },
    digest: async () => {
      artifactDigest = await digestArtifact(outputDir);
      return artifactDigest;
    },
    upload: async () =>
      run(
        "bun",
        [...wrangler, "deploy", "--config", artifactPath, "--name", STAGING_WORKER],
        environment,
      ),
  });
  const versionId = deployOutput.match(/Current Version ID:\s*([0-9a-f-]{36})/i)?.[1];
  assert(versionId, "Wrangler did not report the uploaded Version ID");

  const deployments = await getDeployments();
  const deployed = deployments.deployments.find((item) =>
    item.versions.some((version) => version.version_id === versionId),
  );
  assert(deployed, `Deployment record for version ${versionId} was not found`);
  const traffic = deployed.versions.find((version) => version.version_id === versionId)?.percentage;
  assert.equal(traffic, 100, "New version does not receive 100% traffic");

  const routeResults: Record<string, number> = {};
  for (const path of routes) {
    const response = await retryResponse(`${STAGING_ORIGIN}${path}`, identity.commit);
    await assertDemoResponse(response, path);
    assert.equal(
      response.headers.get("x-banca-commit"),
      identity.commit,
      `${path} serves a different commit`,
    );
    routeResults[path] = response.status;
  }
  const sitemap = await fetch(`${STAGING_ORIGIN}/sitemap.xml?build=${buildId}`);
  assert.equal(sitemap.status, 404, "Staging sitemap must remain disabled");
  assert.match(sitemap.headers.get("x-robots-tag") ?? "", /noindex/i);

  const afterRoutes = await getDeployments();
  const latest = [...afterRoutes.deployments].sort((a, b) =>
    b.created_on.localeCompare(a.created_on),
  )[0];
  const latestVersion = latest?.versions.find((version) => version.percentage > 0);
  assert.equal(
    latestVersion?.version_id,
    versionId,
    "A later deployment replaced the version during public validation; investigate the concurrent publisher",
  );
  assert.equal(latestVersion?.percentage, 100);
  console.log(
    JSON.stringify(
      {
        buildId,
        commit: identity.commit,
        worker: STAGING_WORKER,
        versionId,
        deploymentId: deployed.id,
        trafficPercent: traffic,
        artifactSha256: artifactDigest,
        routes: routeResults,
        sitemapStatus: sitemap.status,
      },
      null,
      2,
    ),
  );
}

async function validateGit(expectedCommit?: string) {
  const branch = git("branch", "--show-current");
  assert.equal(branch, "codex/banca-redesign", "Wrong branch for staging");
  assert.equal(git("status", "--porcelain"), "", "Commit reviewed changes before deployment");
  const commit = git("rev-parse", "--verify", "HEAD^{commit}");
  assert.match(commit, /^[a-f0-9]{40}$/, "HEAD is not a valid commit");
  if (expectedCommit) assert.equal(commit, expectedCommit, "HEAD changed during publication");
  return { branch, commit };
}

function git(...args: string[]) {
  return exec("git", args);
}

function validateSourceTarget() {
  const source = readFileSync(resolve(root, "wrangler.jsonc"), "utf8");
  assert.match(source, /"name"\s*:\s*"banca"/, "Source config must target Worker banca");
  assert.match(
    source,
    new RegExp(`"account_id"\\s*:\\s*"${STAGING_ACCOUNT_ID}"`),
    "Source config must target the authorized account",
  );
  assert.match(source, /"workers_dev"\s*:\s*true/);
  assert.match(source, /"DEPLOYMENT_ENV"\s*:\s*"staging"/);
  assert.match(source, /"PUBLIC_SITE_URL"\s*:\s*"https:\/\/banca\.paulista\.workers\.dev"/);
}

async function validateCloudflareIdentity() {
  const output = run("bun", [...wrangler, "whoami"], process.env);
  assert(
    output.includes(STAGING_ACCOUNT_ID),
    "Wrangler is not authenticated to the authorized Cloudflare account",
  );
  assert(!output.toLowerCase().includes("not authenticated"), "Wrangler is not authenticated");
}

function exec(command: string, args: string[]) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || `${command} failed`);
  return result.stdout.trim();
}

function run(command: string, args: string[], env: NodeJS.ProcessEnv) {
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.status !== 0)
    throw new Error(`${command} ${args.join(" ")} exited with ${result.status}`);
  return result.stdout;
}

export async function verifyLocalWorker(configPath: string, commit: string) {
  const port = await getFreePort();
  const child = spawn(
    "bun",
    [
      ...wrangler,
      "dev",
      "--local",
      "--config",
      configPath,
      "--ip",
      "127.0.0.1",
      "--port",
      String(port),
      "--persist-to",
      localStateDir,
      "--log-level",
      "error",
      "--show-interactive-dev-session=false",
    ],
    {
      cwd: root,
      env: { ...process.env, EXTERNAL_NEWS_ENABLED: "false" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let logs = "";
  child.stdout.on("data", (chunk: Buffer) => {
    logs += chunk.toString();
  });
  child.stderr.on("data", (chunk: Buffer) => {
    logs += chunk.toString();
  });
  try {
    let ready = false;
    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (child.exitCode !== null) throw new Error(`Local Wrangler exited early:\n${logs}`);
      try {
        const response = await fetch(`http://127.0.0.1:${port}/noticias/estados/ac`);
        if (response.status > 0) {
          ready = true;
          break;
        }
      } catch {
        /* Worker is still starting. */
      }
      await delay(500);
    }
    assert(ready, `Local Wrangler did not start:\n${logs}`);
    for (const path of routes) {
      const response = await fetch(`http://127.0.0.1:${port}${path}`);
      await assertDemoResponse(response, path);
      assert.equal(response.headers.get("x-banca-commit"), commit);
    }
    const sitemap = await fetch(`http://127.0.0.1:${port}/sitemap.xml`);
    assert.equal(sitemap.status, 404, "Local staging sitemap must be disabled");
    assert.match(sitemap.headers.get("x-robots-tag") ?? "", /noindex/i);
  } finally {
    child.kill("SIGTERM");
    await Promise.race([
      new Promise<void>((resolveExit) => child.once("exit", () => resolveExit())),
      delay(5000),
    ]);
    await rm(localStateDir, { recursive: true, force: true });
  }
}

async function getFreePort() {
  const server = net.createServer();
  await new Promise<void>((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolveListen);
  });
  const address = server.address();
  assert(address && typeof address !== "string");
  await new Promise<void>((resolveClose, reject) =>
    server.close((error) => (error ? reject(error) : resolveClose())),
  );
  return address.port;
}

async function retryResponse(url: string, commit: string) {
  let lastError: unknown;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    try {
      const response = await fetch(`${url}?build=${commit}-${attempt}`, { cache: "no-store" });
      if (response.headers.get("x-banca-commit") === commit) return response;
      lastError = new Error(
        `Expected commit ${commit}; response had ${response.headers.get("x-banca-commit") ?? "no header"}`,
      );
    } catch (error) {
      lastError = error;
    }
    await delay(1000);
  }
  throw lastError;
}

interface DeploymentVersion {
  version_id: string;
  percentage: number;
}
interface DeploymentRecord {
  id: string;
  created_on: string;
  versions: DeploymentVersion[];
}
async function getDeployments() {
  const result = exec("bun", [
    ...wrangler,
    "deployments",
    "list",
    "--name",
    STAGING_WORKER,
    "--json",
  ]);
  return { deployments: JSON.parse(result) as DeploymentRecord[] };
}

if (import.meta.main) {
  if (process.argv[2] === "--verify-local") {
    const configPath = process.argv[3];
    const commit = process.argv[4];
    assert(
      configPath && commit,
      "Usage: deploy-staging.ts --verify-local <wrangler-config> <commit>",
    );
    verifyLocalWorker(resolve(configPath), commit)
      .then(() => console.log(`Validação SSR local aprovada para ${commit}`))
      .catch((error: unknown) => {
        console.error(
          `Validação SSR local reprovada: ${error instanceof Error ? error.message : error}`,
        );
        process.exitCode = 1;
      });
  } else {
    main().catch((error: unknown) => {
      console.error(
        `Publicação de homologação interrompida antes da próxima etapa: ${error instanceof Error ? error.message : error}`,
      );
      process.exitCode = 1;
    });
  }
}
