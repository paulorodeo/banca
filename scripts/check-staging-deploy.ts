import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const git = (...args: string[]) =>
  execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
assert.equal(git("branch", "--show-current"), "codex/banca-redesign", "Wrong branch");
assert.equal(git("status", "--porcelain"), "", "Commit reviewed changes before deployment");
const config = JSON.parse(readFileSync(resolve(root, ".output/server/wrangler.json"), "utf8"));
assert.equal(config.name, "banca");
assert.equal(config.vars.PUBLIC_SITE_URL, "https://banca.pjdigital-me.workers.dev");
assert.equal(config.vars.DEPLOYMENT_ENV, "staging");
assert.equal(config.vars.BUILD_COMMIT, git("rev-parse", "HEAD"), "Rebuild the committed source");
assert(config.workers_dev && config.keep_vars);
assert(
  !config.routes?.length && !config.route && !config.triggers?.crons?.length,
  "Domain routes and Cron are outside scope",
);
assert(existsSync(resolve(root, ".output/server", config.main)));
assert(
  readFileSync(resolve(root, ".output/public/_headers"), "utf8").includes(
    "X-Robots-Tag: noindex, nofollow",
  ),
);
console.log(`Homologação validada: banca · ${config.vars.BUILD_COMMIT}`);
