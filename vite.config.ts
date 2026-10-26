import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { buildProfile } from "./src/lib/deployment-profile";

const CLOUDFLARE_ACCOUNT_ID = "7b2dfe1e7fa69edb06d7bf74d7ebc942";
const STAGING_WEATHER_CACHE_ID = "c6f5a6125aba45509501fb04a8c44d7d";
const PRODUCTION_WEATHER_CACHE_ID = "c1b76e306aa340f6ab3c25517985395d";

const localAtlasRoadData: Plugin = {
  name: "local-atlas-road-data",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/__local/atlas-roads", async (request, response) => {
      if (request.method !== "GET") {
        response.statusCode = 405;
        response.end();
        return;
      }
      try {
        const data = await readFile(resolve(".local/atlas-roads-dataset.json"));
        response.statusCode = 200;
        response.setHeader("content-type", "application/json; charset=utf-8");
        response.setHeader("cache-control", "no-store");
        response.end(data);
      } catch {
        response.statusCode = 503;
        response.setHeader("content-type", "application/json; charset=utf-8");
        response.end(JSON.stringify({ error: "Dataset local de rodovias ainda não foi gerado." }));
      }
    });
  },
};

export default defineConfig(({ command, mode }) => {
  const deploymentEnv = process.env["DEPLOYMENT_ENV"];
  const modeEnv = loadEnv(mode, process.cwd(), "VITE_");
  const atlasDemoEnabled =
    (mode === "development" || mode === "staging") &&
    (process.env["VITE_ATLAS_DEMO"] ?? modeEnv["VITE_ATLAS_DEMO"]) === "true";
  if (!deploymentEnv) {
    const localSecrets = loadEnv("development", process.cwd(), "");
    for (const name of ["WEATHERAPI_KEY", "WEATHERAPI_FALLBACK_KEY"] as const) {
      if (!process.env[name] && localSecrets[name]) process.env[name] = localSecrets[name];
    }
  }

  const profile = deploymentEnv ? buildProfile(process.env) : undefined;
  const routeRules =
    profile && Object.keys(profile.routeHeaders).length > 0
      ? { "/**": { headers: profile.routeHeaders } }
      : undefined;
  const atlasDemoModule =
    mode === "development" || mode === "staging"
      ? "src/content/demo/atlasNoticias.ts"
      : "src/content/demo/atlasNoticias.disabled.ts";

  return {
    define: Object.fromEntries(
      [
        ...Object.entries(modeEnv),
        ["VITE_ATLAS_DEMO", atlasDemoEnabled ? "true" : "false"],
      ].map(([key, value]) => [`import.meta.env.${key}`, JSON.stringify(value)]),
    ),
    resolve: {
      tsconfigPaths: true,
      alias: [
        {
          find: "./demo/atlasNoticias",
          replacement: resolve(process.cwd(), atlasDemoModule),
        },
        { find: "@", replacement: resolve(process.cwd(), "src") },
      ],
      dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
    },
    server: { host: "::", port: 8080 },
    plugins: [
      localAtlasRoadData,
      tailwindcss(),
      tanstackStart({
        importProtection: {
          behavior: "error",
          client: { files: ["**/server/**"], specifiers: ["server-only"] },
        },
        server: { entry: "server" },
      }),
      ...(command === "build"
        ? [
            nitro({
              defaultPreset: "cloudflare-module",
              output: {
                dir: resolve(
                  process.cwd(),
                  profile?.outputDir ?? process.env["BP_BUILD_OUTPUT"] ?? ".output",
                ),
              },
              ...(routeRules ? { routeRules } : {}),
              cloudflare: {
                deployConfig: true,
                wrangler: {
                  account_id: CLOUDFLARE_ACCOUNT_ID,
                  name: deploymentEnv === "production" ? "banca-prod" : "banca",
                  workers_dev: deploymentEnv !== "production",
                  preview_urls: deploymentEnv === "production",
                  kv_namespaces: [
                    {
                      binding: "WEATHER_CACHE",
                      id:
                        deploymentEnv === "production"
                          ? PRODUCTION_WEATHER_CACHE_ID
                          : STAGING_WEATHER_CACHE_ID,
                    },
                  ],
                  services: [{ binding: "PODCAST_FEED", service: "feed-banca" }],
                  vars: {
                    BUILD_COMMIT: execFileSync("git", ["rev-parse", "HEAD"], {
                      encoding: "utf8",
                    }).trim(),
                    ...(profile?.runtimeVars ?? {}),
                  },
                },
              },
            }),
          ]
        : []),
      react(),
    ],
  };
});
