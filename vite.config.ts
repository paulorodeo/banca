// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import type { NitroConfig } from "nitro/types";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { buildProfile } from "./src/lib/deployment-profile";

const deploymentEnv = process.env["DEPLOYMENT_ENV"];
const profile = deploymentEnv ? buildProfile(process.env) : undefined;
const cloudflare = {
  deployConfig: true,
  wrangler: {
    ...(deploymentEnv === "staging" ? { kv_namespaces: [{ binding: "WEATHER_CACHE", id: "2ea1635b66af4cdfa4523a6564a7f779" }] } : {}),
    vars: {
      BUILD_COMMIT: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
      ...(profile?.runtimeVars ?? {}),
    },
  },
} satisfies NonNullable<NitroConfig["cloudflare"]>;
export default defineConfig({
  nitro: {
    // Retain Nitro's generated entry, assets binding and node compatibility.
    cloudflare,
    output: {
      dir: resolve(
        process.cwd(),
        profile?.outputDir ?? process.env["BP_BUILD_OUTPUT"] ?? ".output",
      ),
    },
    ...(profile && Object.keys(profile.routeHeaders).length > 0
      ? {
          routeRules: {
            "/**": {
              headers: profile.routeHeaders,
            },
          },
        }
      : {}),
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
