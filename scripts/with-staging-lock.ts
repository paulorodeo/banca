import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { tmpdir } from "node:os";

export function runWithStagingLock(command: string[], lockPath = defaultLockPath()): number {
  if (command.length === 0) throw new Error("A command is required after the staging lock");
  const result = spawnSync("flock", ["-n", "-E", "75", resolve(lockPath), ...command], {
    stdio: "inherit",
    env: { ...process.env, STAGING_DEPLOY_LOCK_HELD: "1" },
  });
  if (result.error) throw result.error;
  if (result.status === 75) {
    console.error(
      "Outra publicação canônica de homologação já está em andamento neste host. Nenhum build foi iniciado.",
    );
  }
  return result.status ?? 1;
}

function defaultLockPath() {
  return `${tmpdir()}/banca-staging-deploy-${process.getuid?.() ?? "user"}.lock`;
}

if (import.meta.main) {
  const args = process.argv.slice(2);
  const delimiter = args.indexOf("--");
  if (delimiter < 0 || delimiter === args.length - 1) {
    console.error(
      "Uso: bun scripts/with-staging-lock.ts [--lock-path ARQUIVO] -- comando [argumentos]",
    );
    process.exitCode = 2;
  } else {
    let lockPath = defaultLockPath();
    const commandArgs: string[] = [];
    for (let index = 0; index < delimiter; index += 1) {
      if (args[index] === "--lock-path") {
        lockPath = args[index + 1] ?? "";
        index += 1;
      }
    }
    commandArgs.push(...args.slice(delimiter + 1));
    process.exitCode = runWithStagingLock(commandArgs, lockPath);
  }
}
