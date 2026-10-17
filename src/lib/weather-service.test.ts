import { describe, expect, it, mock } from "bun:test";
import { createWeatherService, type WeatherCache } from "./weather-service.server";
import type { WeatherSnapshot } from "./weather-model";

function cache(): WeatherCache {
  const values = new Map<string, string>();
  return {
    get: async (key) => values.get(key) ?? null,
    put: async (key, value) => {
      values.set(key, value);
    },
  };
}

describe("weather shared cache", () => {
  it("serves another instance from KV without another provider call and refreshes after TTL", async () => {
    let now = 1000;
    const provider = mock(
      async () => ({ provider: "WeatherAPI.com", tempC: 22 }) as WeatherSnapshot,
    );
    const env = { WEATHERAPI_KEY: "test-only", WEATHER_CACHE: cache(), DEPLOYMENT_ENV: "staging" };
    const first = createWeatherService(provider, () => now);
    await Promise.all([first(env), first(env)]);
    expect(provider).toHaveBeenCalledTimes(1);
    expect((await createWeatherService(provider, () => now)(env)).status).toBe(200);
    expect(provider).toHaveBeenCalledTimes(1);
    now += 901_000;
    await first(env);
    expect(provider).toHaveBeenCalledTimes(2);
  });
  it("reports missing configuration without consulting the provider", async () => {
    const provider = mock(async () => {
      throw new Error("must not run");
    });
    const response = await createWeatherService(provider)({});
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "weather_not_configured" });
    expect(provider).not.toHaveBeenCalled();
  });
  it("shares failures briefly without exposing upstream details", async () => {
    const provider = mock(async () => {
      throw new Error("secret-url");
    });
    const env = { WEATHERAPI_KEY: "test-only", WEATHER_CACHE: cache() };
    await createWeatherService(provider)(env);
    const response = await createWeatherService(provider)(env);
    expect(provider).toHaveBeenCalledTimes(1);
    expect(await response.json()).toEqual({ error: "weather_unavailable" });
  });
});
