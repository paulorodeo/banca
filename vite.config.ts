// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import type { NitroConfig } from "nitro/types";
import { execFileSync } from "node:child_process";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const stagingBuild = process.env["DEPLOYMENT_ENV"] === "staging";
const cloudflare = {
  deployConfig: true,
  wrangler: {
    vars: {
      BUILD_COMMIT: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(),
    },
  },
} satisfies NonNullable<NitroConfig["cloudflare"]>;
export default defineConfig({
  nitro: {
    // Retain Nitro's generated entry, assets binding and node compatibility.
    cloudflare,
    ...(stagingBuild
      ? { routeRules: { "/**": { headers: { "X-Robots-Tag": "noindex, nofollow" } } } }
      : {}),
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
