import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { environmentResponse } from "../src/lib/indexing";
import {
  STAGING_ACCOUNT_ID,
  STAGING_ORIGIN,
  STAGING_WORKER,
  validateStagingArtifact,
} from "./staging-artifact";

const root = resolve(import.meta.dirname, "..");

export async function checkStagingDeploy(options?: {
  root?: string;
  outputDir?: string;
  expectedCommit?: string;
  expectedBranch?: string;
  checkGit?: boolean;
}) {
  const projectRoot = options?.root ?? root;
  const outputDir = resolve(
    projectRoot,
    options?.outputDir ?? process.env["STAGING_OUTPUT_DIR"] ?? ".output",
  );
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd: projectRoot, encoding: "utf8" }).trim();
  const branch = git("branch", "--show-current");
  const commit = git("rev-parse", "--verify", "HEAD^{commit}");
  if (options?.checkGit !== false) {
    assert.equal(branch, options?.expectedBranch ?? "codex/banca-redesign", "Wrong branch");
    assert.equal(git("status", "--porcelain"), "", "Commit reviewed changes before deployment");
  }
  assert.equal(commit, options?.expectedCommit ?? commit, "HEAD changed during staging build");

  const identity = {
    buildId: process.env["STAGING_BUILD_ID"] ?? "preflight-test",
    commit,
    outputDir,
  };
  const artifact = await validateStagingArtifact(identity);
  const config = JSON.parse(readFileSync(artifact.configPath, "utf8")) as Record<string, unknown>;
  const vars = config["vars"] as Record<string, string>;
  assert.equal(config["name"], STAGING_WORKER);
  assert.equal(config["account_id"], STAGING_ACCOUNT_ID);
  assert.equal(vars["PUBLIC_SITE_URL"], STAGING_ORIGIN);
  assert.equal(vars["DEPLOYMENT_ENV"], "staging");
  assert.equal(vars["BUILD_COMMIT"], commit);
  assert(config["workers_dev"] && config["keep_vars"]);
  assert(
    !Array.isArray(config["routes"]) || config["routes"].length === 0,
    "Custom routes are outside scope",
  );
  assert(!config["route"], "Custom routes are outside scope");
  const triggers = config["triggers"] as { crons?: string[] } | undefined;
  assert(!triggers?.crons?.length, "Cron is outside scope");

  for (const asset of [
    "images/sp/masp.webp",
    "images/sp/banca-paulista-social.png",
    "brand/simbolo-banca-paulista-fundo-azul.svg",
  ])
    assert(existsSync(resolve(artifact.publicDir, asset)), `Missing static asset: ${asset}`);

  const stagingHtml = environmentResponse(
    new Response("<!doctype html>", { headers: { "content-type": "text/html; charset=utf-8" } }),
    vars,
  );
  assert.equal(
    stagingHtml.headers.get("X-Robots-Tag"),
    "noindex, nofollow, noarchive, noimageindex",
  );
  assert.equal(stagingHtml.headers.get("Cache-Control"), "no-store");
  assert.equal(stagingHtml.headers.get("X-Banca-Commit"), commit);
  return { branch, commit, ...artifact, config };
}

if (import.meta.main) {
  checkStagingDeploy()
    .then(({ branch, commit, configPath }) => {
      console.log(`Homologação validada: ${configPath} · ${branch} · ${commit}`);
    })
    .catch((error: unknown) => {
      console.error(
        `Preflight de homologação bloqueado: ${error instanceof Error ? error.message : error}`,
      );
      process.exitCode = 1;
    });
}
