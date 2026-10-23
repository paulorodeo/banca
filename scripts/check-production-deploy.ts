import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { environmentResponse } from "../src/lib/indexing";

const root = resolve(import.meta.dirname, "..");
const git = (...args: string[]) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
assert.equal(git("branch", "--show-current"), "codex/banca-redesign", "Wrong branch");
assert.equal(git("status", "--porcelain"), "", "Commit reviewed changes before deployment");

const config = JSON.parse(
  readFileSync(resolve(root, ".output-production/server/wrangler.json"), "utf8"),
);
assert.equal(config.name, "banca-prod");
assert.equal(config.account_id, "7b2dfe1e7fa69edb06d7bf74d7ebc942");
assert.equal(config.vars.PUBLIC_SITE_URL, "https://bancapaulista.org");
assert.equal(config.vars.DEPLOYMENT_ENV, "production");
assert.equal(config.vars.BUILD_COMMIT, git("rev-parse", "HEAD"), "Rebuild the committed source");
assert.equal(config.workers_dev, false);
assert.equal(config.preview_urls, true);
assert(config.keep_vars);
assert(
  !config.routes?.length && !config.route && !config.triggers?.crons?.length,
  "Transfer the custom domain only after validating the production Version URL",
);
assert(existsSync(resolve(root, ".output-production/server", config.main)));
assert.equal(config.assets?.binding, "ASSETS");
assert.equal(config.assets?.directory, "../public");
assert.deepEqual(config.kv_namespaces, [
  { binding: "WEATHER_CACHE", id: "c1b76e306aa340f6ab3c25517985395d" },
]);
for (const asset of [
  "images/sp/masp.webp",
  "images/sp/banca-paulista-social.png",
  "brand/simbolo-banca-paulista-fundo-azul.svg",
])
  assert(
    existsSync(resolve(root, ".output-production/public", asset)),
    `Missing static asset: ${asset}`,
  );

const productionHtml = environmentResponse(
  new Response("<!doctype html>", { headers: { "content-type": "text/html; charset=utf-8" } }),
  config.vars,
);
assert.equal(productionHtml.headers.get("X-Robots-Tag"), null);
assert.equal(productionHtml.headers.get("Strict-Transport-Security"), "max-age=604800");
console.log(`Produção validada: banca-prod · ${config.vars.BUILD_COMMIT}`);
