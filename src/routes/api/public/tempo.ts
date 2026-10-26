import { createFileRoute } from "@tanstack/react-router";
import { weatherResponse, type WeatherEnv } from "@/lib/weather-service.server";

export const Route = createFileRoute("/api/public/tempo")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        // Workers bindings are read only on the server; local development uses process.env.
        let env: WeatherEnv = {
          ...(process.env["WEATHERAPI_KEY"]
            ? { WEATHERAPI_KEY: process.env["WEATHERAPI_KEY"] }
            : {}),
          ...(process.env["WEATHERAPI_FALLBACK_KEY"]
            ? { WEATHERAPI_FALLBACK_KEY: process.env["WEATHERAPI_FALLBACK_KEY"] }
            : {}),
          ...(process.env["DEPLOYMENT_ENV"]
            ? { DEPLOYMENT_ENV: process.env["DEPLOYMENT_ENV"] }
            : {}),
        };
        try {
          env = (await import("cloudflare:workers")).env;
        } catch {
          /* Local Vite runtime. */
        }
        const uf = new URL(request.url).searchParams.get("uf") ?? "SP";
        return weatherResponse(env, uf);
      },
    },
  },
});
