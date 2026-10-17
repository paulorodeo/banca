import { createFileRoute } from "@tanstack/react-router";
import { weatherResponse, type WeatherEnv } from "@/lib/weather-service.server";

export const Route = createFileRoute("/api/public/tempo")({
  server: {
    handlers: {
      GET: async () => {
        // Workers bindings are read only on the server; local development uses process.env.
        let env: WeatherEnv = process.env;
        try {
          env = (await import("cloudflare:workers")).env;
        } catch {
          /* Local Vite runtime. */
        }
        return weatherResponse(env);
      },
    },
  },
});
