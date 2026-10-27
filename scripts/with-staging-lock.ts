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

export function parseLockInvocation(args: string[], fallbackLockPath = defaultLockPath()) {
  let index = 0;
  let lockPath = fallbackLockPath;
  if (args[index] === "--lock-path") {
    lockPath = args[index + 1] ?? "";
    if (!lockPath) throw new Error("A lock path is required after --lock-path");
    index += 2;
  }
  if (args[index] !== "--run") throw new Error("Expected --run before the command");
  const command = args.slice(index + 1);
  if (command.length === 0) throw new Error("A command is required after --run");
  return { command, lockPath };
}

function defaultLockPath() {
  return `${tmpdir()}/banca-staging-deploy-${process.getuid?.() ?? "user"}.lock`;
}

if (import.meta.main) {
  try {
    const { command, lockPath } = parseLockInvocation(process.argv.slice(2));
    process.exitCode = runWithStagingLock(command, lockPath);
  } catch (error) {
    console.error(
      `Uso: bun scripts/with-staging-lock.ts [--lock-path ARQUIVO] --run comando [argumentos]\n${error instanceof Error ? error.message : error}`,
    );
    process.exitCode = 2;
  }
}
