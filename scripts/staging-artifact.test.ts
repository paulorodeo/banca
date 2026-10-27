import { afterEach, describe, expect, test } from "bun:test";
import { existsSync, mkdtempSync } from "node:fs";
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawn, spawnSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { ACRE_FIXTURE, assertDemoResponse, validateStagingArtifact } from "./staging-artifact";
import { runVerifiedStagingUpload } from "./staging-upload-gate";
import { runWithStagingLock } from "./with-staging-lock";

const roots: string[] = [];
afterEach(async () => {
  await Promise.all(roots.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe("staging artifact preflight", () => {
  test("approves staging with fixtures in server and client bundles", async () => {
    const artifact = await createArtifact();
    await expect(
      validateStagingArtifact({ buildId: "test-build", commit: commit, outputDir: artifact }),
    ).resolves.toMatchObject({
      configPath: join(artifact, "server", "wrangler.json"),
    });
  });

  test("blocks staging artifacts without the Acre fixture", async () => {
    const artifact = await createArtifact({ includeFixture: false });
    await expect(
      validateStagingArtifact({ buildId: "test-build", commit, outputDir: artifact }),
    ).rejects.toThrow("Server fixture module is absent");
  });

  test("blocks mismatched client demo profile", async () => {
    const artifact = await createArtifact({ clientDemo: false });
    await expect(
      validateStagingArtifact({ buildId: "test-build", commit, outputDir: artifact }),
    ).rejects.toThrow("Client Atlas demo flag");
  });

  test("blocks production artifacts offered to staging", async () => {
    const artifact = await createArtifact({ environment: "production" });
    await expect(
      validateStagingArtifact({ buildId: "test-build", commit, outputDir: artifact }),
    ).rejects.toThrow("Artifact is not staging");
  });

  test("blocks an artifact from another commit", async () => {
    const artifact = await createArtifact({ artifactCommit: "a".repeat(40) });
    await expect(
      validateStagingArtifact({ buildId: "test-build", commit, outputDir: artifact }),
    ).rejects.toThrow("Artifact commit does not match HEAD");
  });

  test("blocks road data unless both approved datasets retain attribution and source evidence", async () => {
    const artifact = await createArtifact({ roadRightsApproved: false });
    await expect(
      validateStagingArtifact({ buildId: "test-build", commit, outputDir: artifact }),
    ).rejects.toThrow("Historical road approval is missing");
  });

  test("blocks a wrong Worker or Cloudflare account", async () => {
    const wrongWorker = await createArtifact({ worker: "banca-prod" });
    await expect(
      validateStagingArtifact({ buildId: "test-build", commit, outputDir: wrongWorker }),
    ).rejects.toThrow("Wrong staging Worker");
    const wrongAccount = await createArtifact({ account: "0".repeat(32) });
    await expect(
      validateStagingArtifact({ buildId: "test-build", commit, outputDir: wrongAccount }),
    ).rejects.toThrow("Wrong Cloudflare account");
  });

  test("requires SSR to pass before upload can run", async () => {
    let uploaded = false;
    await expect(
      runVerifiedStagingUpload({
        verifyArtifact: async () => {},
        verifySsr: async () => {
          throw new Error("SSR fixture missing");
        },
        preflight: async () => {},
        digest: async () => "sha256",
        upload: async () => {
          uploaded = true;
        },
      }),
    ).rejects.toThrow("SSR fixture missing");
    expect(uploaded).toBe(false);
  });

  test("blocks an artifact mutated after validation", async () => {
    let uploaded = false;
    let digestCall = 0;
    await expect(
      runVerifiedStagingUpload({
        verifyArtifact: async () => {},
        verifySsr: async () => {},
        preflight: async () => {},
        digest: async () => (++digestCall === 1 ? "first" : "changed"),
        upload: async () => {
          uploaded = true;
        },
      }),
    ).rejects.toThrow("Artifact integrity changed");
    expect(uploaded).toBe(false);
  });

  test("requires the fictional label and the specific Acre fixture in SSR", async () => {
    const html = `<!doctype html><meta name="robots" content="noindex,nofollow,noarchive"><p>Conteúdo demonstrativo</p><h1>${ACRE_FIXTURE}</h1><p>Texto fictício</p>`;
    const response = new Response(html, {
      headers: { "x-robots-tag": "noindex, nofollow, noarchive, noimageindex" },
    });
    await expect(assertDemoResponse(response, "/noticias/estados/ac")).resolves.toContain(
      ACRE_FIXTURE,
    );
  });

  test("blocks a second canonical process on the same host before its command starts", async () => {
    const lockDir = await mkdtemp(join(tmpdir(), "banca-staging-lock-test-"));
    roots.push(lockDir);
    const lockPath = join(lockDir, "deploy.lock");
    const holder = spawn("flock", ["-n", lockPath, "bash", "-c", "sleep 30"], { stdio: "ignore" });
    try {
      let acquired = false;
      for (let attempt = 0; attempt < 40; attempt += 1) {
        if (spawnSync("flock", ["-n", "-E", "75", lockPath, "true"]).status === 75) {
          acquired = true;
          break;
        }
        await delay(25);
      }
      expect(acquired).toBe(true);
      const markerPath = join(lockDir, "command-ran");
      const exitCode = runWithStagingLock(["touch", markerPath], lockPath);
      expect(exitCode).toBe(75);
      expect(existsSync(markerPath)).toBe(false);
    } finally {
      holder.kill("SIGTERM");
    }
  });

  test("wrapper passes the Bun-safe lock invocation without uploading", async () => {
    const testDir = await mkdtemp(join(tmpdir(), "banca-staging-wrapper-test-"));
    roots.push(testDir);
    const projectRoot = resolve(import.meta.dirname, "..");
    const packageJson = JSON.parse(await readFile(join(projectRoot, "package.json"), "utf8")) as {
      scripts: Record<string, string>;
    };
    expect(packageJson.scripts["deploy:staging"]).toBe("bash scripts/deploy-staging-locked.sh");
    const binDir = join(testDir, "bin");
    const fakeBun = join(binDir, "bun");
    const invocationLog = join(testDir, "invocations.log");
    await mkdir(binDir);
    await writeFile(
      fakeBun,
      `#!/usr/bin/env bash
set -euo pipefail
if [[ "$1" == "scripts/deploy-staging.ts" && "$2" == "--initial-preflight" ]]; then
  printf '%s\\n' preflight >> "$STAGING_WRAPPER_LOG"
  exit 0
fi
printf '%s\\n' "$@" >> "$STAGING_WRAPPER_LOG"
`,
    );
    await chmod(fakeBun, 0o755);
    const result = spawnSync("bash", ["scripts/deploy-staging-locked.sh"], {
      cwd: projectRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${binDir}:${process.env.PATH ?? ""}`,
        STAGING_WRAPPER_LOG: invocationLog,
      },
    });
    expect(result.status).toBe(0);
    expect(await readFile(invocationLog, "utf8")).toBe(
      [
        "preflight",
        "scripts/with-staging-lock.ts",
        "--run",
        "bun",
        "scripts/deploy-staging.ts",
        "--locked",
        "",
      ].join("\n"),
    );
  });

  test("Bun CLI preserves the command and --locked argument under flock", async () => {
    const testDir = await mkdtemp(join(tmpdir(), "banca-staging-cli-test-"));
    roots.push(testDir);
    const lockPath = join(testDir, "deploy.lock");
    const result = spawnSync(
      "bun",
      [
        "scripts/with-staging-lock.ts",
        "--lock-path",
        lockPath,
        "--run",
        "bash",
        "-c",
        'printf "%s\\n" "$@"',
        "bash",
        "--locked",
      ],
      { cwd: resolve(import.meta.dirname, ".."), encoding: "utf8" },
    );
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe("--locked");
  });

  test("releases the host lock when a child command fails", () => {
    const lockDir = mkdtempSync(join(tmpdir(), "banca-staging-lock-release-test-"));
    roots.push(lockDir);
    const lockPath = join(lockDir, "deploy.lock");
    expect(runWithStagingLock(["bash", "-c", "exit 17"], lockPath)).toBe(17);
    expect(runWithStagingLock(["true"], lockPath)).toBe(0);
  });
});

async function createArtifact(
  options: {
    includeFixture?: boolean;
    clientDemo?: boolean;
    environment?: string;
    artifactCommit?: string;
    worker?: string;
    account?: string;
    roadRightsApproved?: boolean;
  } = {},
) {
  const root = await mkdtemp(join(tmpdir(), "banca-staging-artifact-test-"));
  roots.push(root);
  const server = join(root, "server");
  const ssr = join(server, "_ssr");
  const assets = join(root, "public", "assets");
  await mkdir(ssr, { recursive: true });
  await mkdir(assets, { recursive: true });
  const dataDir = join(root, "public", "data");
  await mkdir(dataDir, { recursive: true });
  const rightsStatus = options.roadRightsApproved === false ? "pending" : "approved";
  await writeFile(
    join(dataDir, "atlas-roads-snv-202201b.json"),
    JSON.stringify({
      id: "dnit-snv-202201b",
      version: "202201B",
      scope: "Traçados históricos das cinco BRs.",
      rightsStatus,
      productionEligible: true,
      attribution:
        "Fonte: DNIT/SNV 202201B, distribuição Ibama/PAMGIA. Base histórica, não vigente.",
      ownerAuthorization: "Autorização do proprietário da Banca Paulista em 27/10/2026.",
      roads: Array.from({ length: 5 }, () => ({})),
    }),
  );
  await writeFile(
    join(dataDir, "atlas-roads-artesp-sp.json"),
    JSON.stringify({
      id: "artesp-sp-concession-roads",
      scope: "Malha concedida em SP; não representa todas as vias.",
      relationshipNote: "O XLSX e os KMZ são fontes paralelas; não foi presumida junção.",
      rightsStatus,
      productionEligible: true,
      license: "Creative Commons Attribution",
      termsUrl: "https://dadosabertos.artesp.sp.gov.br/terms",
      attribution: "ARTESP não endossa este produto.",
      sources: [{ sha256: "a".repeat(64) }, { sha256: "b".repeat(64) }],
      tabularSummary: {
        recordCount: 1,
        coordinateNote: "Pontos municipais não são eixos rodoviários.",
      },
      roads: [{}],
    }),
  );
  await writeFile(
    join(root, "public", "_headers"),
    "/*\n  X-Robots-Tag: noindex, nofollow, noarchive, noimageindex\n",
  );
  const artifactCommit = options.artifactCommit ?? commit;
  const fixtures =
    options.includeFixture === false
      ? ""
      : `const state = { nome: "Acre" }; const editoria = { nome: "Justiça" }; const title = \`Pauta demonstrativa: \${editoria.nome.toLowerCase()} em \${state.nome}\`; const summary = "Texto fictício"; isDemo: true;`;
  await writeFile(
    join(server, "index.mjs"),
    "X-Robots-Tag noindex, nofollow, noarchive, noimageindex; export default {};",
  );
  await writeFile(
    join(ssr, "atlas.functions-test.mjs"),
    `const flags = {"VITE_ATLAS_DEMO": "true"};`,
  );
  if (options.includeFixture !== false)
    await writeFile(join(ssr, "atlasNoticias-test.mjs"), fixtures);
  const clientFlag = options.clientDemo === false ? "false" : "true";
  await writeFile(
    join(assets, "atlas-test.js"),
    "VITE_ATLAS_DEMO:`" +
      clientFlag +
      "`; Conteúdo demonstrativo; manchetes exibidas são fictícias",
  );
  await writeFile(
    join(server, "wrangler.json"),
    JSON.stringify({
      name: options.worker ?? "banca",
      account_id: options.account ?? "7b2dfe1e7fa69edb06d7bf74d7ebc942",
      main: "index.mjs",
      workers_dev: true,
      keep_vars: true,
      vars: {
        BUILD_COMMIT: artifactCommit,
        DEPLOYMENT_ENV: options.environment ?? "staging",
        PUBLIC_SITE_URL: "https://banca.paulista.workers.dev",
      },
      assets: {
        binding: "ASSETS",
        directory: "../public",
        headers: { "/*": { "X-Robots-Tag": "noindex, nofollow, noarchive, noimageindex" } },
      },
      kv_namespaces: [{ binding: "WEATHER_CACHE", id: "c6f5a6125aba45509501fb04a8c44d7d" }],
    }),
  );
  return root;
}

const commit = "f".repeat(40);
