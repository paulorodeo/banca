import { normalizeWeather, type WeatherApiResponse, type WeatherSnapshot } from "./weather-model";

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
  const response = await fetcher(`https://api.weatherapi.com/v1/forecast.json?${query}`, {
    signal: AbortSignal.timeout(6500),
  });
  if (!response.ok) throw new Error("weather_provider_unavailable");
  return normalizeWeather((await response.json()) as WeatherApiResponse);
}
