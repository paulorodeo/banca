import { normalizeWeather, type WeatherApiResponse, type WeatherSnapshot } from "./weather-model";

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
  fetcher: typeof fetch = fetch,
): Promise<WeatherSnapshot> {
  const query = new URLSearchParams({
    key,
    q: "-23.5505,-46.6333",
    days: "3",
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
    const body = (await response.json().catch(() => null)) as
      | { error?: { code?: unknown } }
      | null;
    const code = body?.error?.code;
    // A monthly quota/plan restriction is not bypassed with another credential.
    const fallbackEligible =
      response.status >= 500 ||
      response.status === 429 ||
      (response.status === 401 && code === 2006);
    throw new WeatherProviderError("weather_provider_unavailable", fallbackEligible);
  }
  return normalizeWeather((await response.json()) as WeatherApiResponse);
}
