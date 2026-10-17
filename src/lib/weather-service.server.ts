import type { WeatherSnapshot } from "./weather-model";
import { fetchWeatherApi } from "./weather-provider.server";

export interface WeatherCache {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options: { expirationTtl: number }): Promise<unknown>;
}
export type WeatherEnv = {
  WEATHERAPI_KEY?: string;
  WEATHER_CACHE?: WeatherCache;
  DEPLOYMENT_ENV?: string;
};
const TTL = 900;
const CACHE_KEY = "weatherapi:sao-paulo:v1";
type CachedResult = { expiresAt: number; data?: WeatherSnapshot; error?: string };

export function createWeatherService(provider = fetchWeatherApi, now = Date.now) {
  let memo: CachedResult | undefined;
  let inFlight: Promise<CachedResult> | undefined;
  async function read(env: WeatherEnv): Promise<CachedResult> {
    if (!env.WEATHERAPI_KEY) return { expiresAt: now() + 60_000, error: "weather_not_configured" };
    if (env.DEPLOYMENT_ENV === "staging" && !env.WEATHER_CACHE)
      return { expiresAt: now() + 60_000, error: "weather_cache_unavailable" };
    const cached = await env.WEATHER_CACHE?.get(CACHE_KEY);
    if (cached) {
      const entry = JSON.parse(cached) as CachedResult;
      if (
        entry.expiresAt > now() &&
        (entry.data?.provider === "WeatherAPI.com" || entry.error === "weather_unavailable")
      )
        return entry;
    }
    try {
      const data = await provider(env.WEATHERAPI_KEY);
      const entry = { expiresAt: now() + TTL * 1000, data };
      await env.WEATHER_CACHE?.put(CACHE_KEY, JSON.stringify(entry), { expirationTtl: TTL });
      return entry;
    } catch {
      // Briefly share provider failures too, to avoid retrying upstream per visitor.
      const entry = { expiresAt: now() + 60_000, error: "weather_unavailable" };
      await env.WEATHER_CACHE?.put(CACHE_KEY, JSON.stringify(entry), { expirationTtl: 60 });
      return entry;
    }
  }
  return async (env: WeatherEnv) => {
    try {
      if (!memo || memo.expiresAt <= now()) {
        inFlight ??= read(env).finally(() => {
          inFlight = undefined;
        });
        memo = await inFlight;
      }
      if (memo.error || !memo.data)
        return Response.json(
          { error: memo.error ?? "weather_unavailable" },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        );
      return Response.json(memo.data, {
        headers: { "Cache-Control": "public, max-age=60", "X-Weather-Cache": "shared-kv" },
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
