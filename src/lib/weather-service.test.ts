import { describe, expect, it, mock } from "bun:test";
import { createWeatherService, type WeatherCache } from "./weather-service.server";
import type { WeatherSnapshot } from "./weather-model";
import { WeatherProviderError } from "./weather-provider.server";

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
      async (_key: string, uf = "SP") =>
        ({
          provider: "WeatherAPI.com",
          city: uf === "SP" ? "São Paulo" : "Rio de Janeiro",
          tempC: 22,
        }) as WeatherSnapshot,
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
  it("keeps per-capital cache entries isolated and queries only selected capitals", async () => {
    const provider = mock(
      async (_key: string, uf = "SP") =>
        ({
          provider: "WeatherAPI.com",
          city: uf === "RJ" ? "Rio de Janeiro" : "São Paulo",
        }) as WeatherSnapshot,
    );
    const env = { WEATHERAPI_KEY: "test-only", WEATHER_CACHE: cache() };
    const service = createWeatherService(provider);
    await service(env, "SP");
    await service(env, "RJ");
    await service(env, "RJ");
    expect(provider.mock.calls.map(([_, uf]) => uf)).toEqual(["SP", "RJ"]);
  });
  it("uses the reserve only after an eligible primary failure", async () => {
    const primaryWorks = mock(async (key: string) => {
      if (key !== "primary") throw new Error("unexpected reserve request");
      return { provider: "WeatherAPI.com", tempC: 20 } as WeatherSnapshot;
    });
    const env = { WEATHERAPI_KEY: "primary", WEATHERAPI_FALLBACK_KEY: "reserve" };
    expect((await createWeatherService(primaryWorks)(env)).status).toBe(200);
    expect(primaryWorks).toHaveBeenCalledTimes(1);

    const primaryFails = mock(async (key: string) => {
      if (key === "primary") throw new WeatherProviderError("unavailable", true);
      return { provider: "WeatherAPI.com", tempC: 18 } as WeatherSnapshot;
    });
    expect(
      (await createWeatherService(primaryFails)({ ...env, WEATHER_CACHE: cache() })).status,
    ).toBe(200);
    expect(primaryFails.mock.calls.map(([key]) => key)).toEqual(["primary", "reserve"]);
  });
  it("does not use the reserve to bypass a non-eligible provider restriction", async () => {
    const provider = mock(async () => {
      throw new WeatherProviderError("quota_reached", false);
    });
    const response = await createWeatherService(provider)({
      WEATHERAPI_KEY: "primary",
      WEATHERAPI_FALLBACK_KEY: "reserve",
    });
    expect(response.status).toBe(503);
    expect(provider).toHaveBeenCalledTimes(1);
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
