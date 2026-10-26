import { normalizeWeather, type WeatherApiResponse, type WeatherSnapshot } from "./weather-model";
import { WEATHER_CAPITALS } from "@/content/local/weather-capitals";
import type { Fetcher } from "./fetcher";

export class WeatherProviderError extends Error {
  constructor(
    message: string,
    readonly fallbackEligible: boolean,
  ) {
    super(message);
    this.name = "WeatherProviderError";
  }
}

/** Provider boundary: future providers must return this same snapshot contract. */
export async function fetchWeatherApi(
  key: string,
  uf = "SP",
  fetcher: Fetcher = fetch,
): Promise<WeatherSnapshot> {
  const capital = WEATHER_CAPITALS[uf];
  if (!capital) throw new WeatherProviderError("weather_location_invalid", false);
  const query = new URLSearchParams({
    key,
    q: `${capital.latitude},${capital.longitude}`,
    days: "1",
    lang: "pt",
    aqi: "no",
    alerts: "no",
  });
  let response: Response;
  try {
    response = await fetcher(`https://api.weatherapi.com/v1/forecast.json?${query}`, {
      signal: AbortSignal.timeout(6500),
    });
  } catch {
    throw new WeatherProviderError("weather_provider_unavailable", true);
  }
  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: { code?: unknown } } | null;
    const code = body?.error?.code;
    // A monthly quota/plan restriction is not bypassed with another credential.
    const fallbackEligible =
      response.status >= 500 ||
      response.status === 429 ||
      (response.status === 401 && code === 2006);
    throw new WeatherProviderError("weather_provider_unavailable", fallbackEligible);
  }
  return normalizeWeather(
    (await response.json()) as WeatherApiResponse,
    Math.floor(Date.now() / 1000),
    capital.city,
    capital.timezone,
  );
}
