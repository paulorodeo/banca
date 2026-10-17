import { describe, expect, it } from "bun:test";
import { normalizeWeather, weatherKind, type WeatherApiResponse } from "./weather-model";

const raw: WeatherApiResponse = {
  current: {
    temp_c: 22.4,
    feelslike_c: 23,
    humidity: 77,
    wind_kph: 9,
    last_updated: "2026-10-17 12:00",
    condition: { code: 1003, text: "Parcialmente nublado" },
  },
  forecast: {
    forecastday: [
      {
        date: "2026-10-17",
        day: {
          mintemp_c: 17,
          maxtemp_c: 25,
          daily_chance_of_rain: 30,
          condition: { code: 1003, text: "Parcialmente nublado" },
        },
        hour: [
          {
            time: "2026-10-17 13:00",
            time_epoch: 1792256400,
            temp_c: 23,
            chance_of_rain: 25,
            condition: { code: 1063, text: "Chuva" },
          },
        ],
      },
      {
        date: "2026-10-18",
        day: { mintemp_c: 16, maxtemp_c: 26, condition: { code: 1000, text: "Ensolarado" } },
        hour: [],
      },
    ],
  },
};

describe("normalização do clima de São Paulo", () => {
  it("mantém contrato e não inventa chance de chuva ausente", () => {
    const data = normalizeWeather(raw, 1792250000);
    expect(data.city).toBe("São Paulo");
    expect(data.tempC).toBe(22.4);
    expect(data.kind).toBe("partly-cloudy");
    expect(data.days).toHaveLength(2);
    expect(data.days[1]?.rainChance).toBeNull();
    expect(data.hours[0]?.kind).toBe("rain");
  });
  it("mapeia condições de tempestade", () => {
    expect(weatherKind(1276)).toBe("storm");
  });
});
