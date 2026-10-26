import type { WeatherSnapshot } from "./weather-model";
import { fetchWeatherApi, WeatherProviderError } from "./weather-provider.server";
import { WEATHER_CAPITALS } from "@/content/local/weather-capitals";

export interface WeatherCache {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options: { expirationTtl: number }): Promise<unknown>;
}
export type WeatherEnv = {
  WEATHERAPI_KEY?: string;
  WEATHERAPI_FALLBACK_KEY?: string;
  WEATHER_CACHE?: WeatherCache;
  DEPLOYMENT_ENV?: string;
};
const TTL = 900;
type CachedResult = { expiresAt: number; data?: WeatherSnapshot; error?: string };

export function createWeatherService(provider = fetchWeatherApi, now = Date.now) {
  const memo = new Map<string, CachedResult>();
  const inFlight = new Map<string, Promise<CachedResult>>();
  async function read(env: WeatherEnv, uf: string): Promise<CachedResult> {
    const cacheKey =
      uf === "SP" ? "weatherapi:sao-paulo:v1" : `weatherapi:capital:${uf.toLowerCase()}:v1`;
    if (!env.WEATHERAPI_KEY) return { expiresAt: now() + 60_000, error: "weather_not_configured" };
    if (env.DEPLOYMENT_ENV === "staging" && !env.WEATHER_CACHE)
      return { expiresAt: now() + 60_000, error: "weather_cache_unavailable" };
    const cached = await env.WEATHER_CACHE?.get(cacheKey);
    if (cached) {
      try {
        const entry = JSON.parse(cached) as CachedResult;
        if (
          entry.expiresAt > now() &&
          ((entry.data?.provider === "WeatherAPI.com" &&
            entry.data.city === WEATHER_CAPITALS[uf]?.city) ||
            entry.error === "weather_unavailable")
        )
          return entry;
      } catch {
        // Invalid/obsolete cache data is ignored and refreshed from the provider.
      }
    }
    try {
      let data: WeatherSnapshot;
      try {
        data = await provider(env.WEATHERAPI_KEY, uf);
      } catch (error) {
        const canUseFallback =
          env.WEATHERAPI_FALLBACK_KEY &&
          env.WEATHERAPI_FALLBACK_KEY !== env.WEATHERAPI_KEY &&
          error instanceof WeatherProviderError &&
          error.fallbackEligible;
        if (!canUseFallback) throw error;
        // One request per credential at most. Do not retry or cascade past the reserve key.
        const fallbackKey = env.WEATHERAPI_FALLBACK_KEY;
        if (!fallbackKey) throw error;
        data = await provider(fallbackKey, uf);
      }
      const entry = { expiresAt: now() + TTL * 1000, data };
      await env.WEATHER_CACHE?.put(cacheKey, JSON.stringify(entry), { expirationTtl: TTL });
      return entry;
    } catch {
      // Briefly share provider failures too, to avoid retrying upstream per visitor.
      const entry = { expiresAt: now() + 60_000, error: "weather_unavailable" };
      await env.WEATHER_CACHE?.put(cacheKey, JSON.stringify(entry), { expirationTtl: 60 });
      return entry;
    }
  }
  return async (env: WeatherEnv, requestedUf = "SP") => {
    const uf = requestedUf.toUpperCase();
    if (!WEATHER_CAPITALS[uf])
      return Response.json(
        { error: "weather_location_invalid" },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    try {
      const cachedResult = memo.get(uf);
      if (!cachedResult || cachedResult.expiresAt <= now()) {
        let pending = inFlight.get(uf);
        if (!pending) {
          pending = read(env, uf).finally(() => inFlight.delete(uf));
          inFlight.set(uf, pending);
        }
        memo.set(uf, await pending);
      }
      const entry = memo.get(uf);
      if (entry?.error || !entry?.data)
        return Response.json(
          { error: entry?.error ?? "weather_unavailable" },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        );
      return Response.json(entry.data, {
        headers: {
          "Cache-Control": "public, max-age=60",
          "X-Weather-Cache": "shared-kv",
          "X-Weather-Location": uf,
        },
      });
    } catch {
      return Response.json(
        { error: "weather_unavailable" },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
  };
}

export const weatherResponse = createWeatherService();
