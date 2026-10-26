import { z } from "zod";
/** WeatherAPI.com -> contrato mínimo e estável do frontend. */
export type WeatherKind = "sun" | "partly-cloudy" | "cloud" | "fog" | "rain" | "storm" | "snow";

export type WeatherHour = {
  time: string;
  tempC: number;
  rainChance: number | null;
  kind: WeatherKind;
  label: string;
};

export type WeatherDay = {
  date: string;
  minC: number;
  maxC: number;
  rainChance: number | null;
  kind: WeatherKind;
  label: string;
};

export type WeatherSnapshot = {
  city: string;
  timezone: string;
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  windKph: number;
  kind: WeatherKind;
  label: string;
  updatedAt: string;
  hours: WeatherHour[];
  days: WeatherDay[];
  provider: "WeatherAPI.com";
};

type Condition = { code: number; text: string };
type RawHour = {
  time: string;
  time_epoch: number;
  temp_c: number;
  chance_of_rain?: number;
  condition: Condition;
};
type RawDay = {
  date: string;
  day: {
    mintemp_c: number;
    maxtemp_c: number;
    daily_chance_of_rain?: number;
    condition: Condition;
  };
  hour: RawHour[];
};
export type WeatherApiResponse = {
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    last_updated: string;
    condition: Condition;
  };
  forecast: { forecastday: RawDay[] };
};

export function weatherKind(code: number): WeatherKind {
  if (code === 1000) return "sun";
  if (code === 1003) return "partly-cloudy";
  if (code === 1006 || code === 1009) return "cloud";
  if ([1030, 1135, 1147].includes(code)) return "fog";
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return "storm";
  if (
    [
      1066, 1069, 1072, 1114, 1117, 1168, 1171, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225,
      1237, 1249, 1252, 1255, 1258, 1261, 1264,
    ].includes(code)
  )
    return "snow";
  return "rain";
}

const percent = (value: unknown): number | null =>
  typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : null;

const conditionSchema = z.object({ code: z.number().int(), text: z.string().min(1) });
const rawSchema = z.object({
  current: z.object({
    temp_c: z.number().finite(),
    feelslike_c: z.number().finite(),
    humidity: z.number().min(0).max(100),
    wind_kph: z.number().nonnegative(),
    last_updated: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
    condition: conditionSchema,
  }),
  forecast: z.object({
    forecastday: z
      .array(
        z.object({
          date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
          day: z.object({
            mintemp_c: z.number().finite(),
            maxtemp_c: z.number().finite(),
            daily_chance_of_rain: z.number().optional(),
            condition: conditionSchema,
          }),
          hour: z.array(
            z.object({
              time: z.string(),
              time_epoch: z.number(),
              temp_c: z.number().finite(),
              chance_of_rain: z.number().optional(),
              condition: conditionSchema,
            }),
          ),
        }),
      )
      .min(1),
  }),
});

export function normalizeWeather(
  input: unknown,
  nowEpochSeconds = Math.floor(Date.now() / 1000),
  city = "São Paulo",
  timezone = "America/Sao_Paulo",
): WeatherSnapshot {
  const raw = rawSchema.parse(input);
  if (!raw.current || !raw.forecast?.forecastday?.length || !Number.isFinite(raw.current.temp_c)) {
    throw new Error("Invalid WeatherAPI response");
  }
  const hours = raw.forecast.forecastday
    .flatMap((item) => item.hour ?? [])
    .filter((hour) => hour.time_epoch >= nowEpochSeconds - 3600)
    .slice(0, 24)
    .map((hour) => ({
      time: hour.time,
      tempC: hour.temp_c,
      rainChance: percent(hour.chance_of_rain),
      kind: weatherKind(hour.condition.code),
      label: hour.condition.text,
    }));
  const days = raw.forecast.forecastday.slice(0, 3).map((item) => ({
    date: item.date,
    minC: item.day.mintemp_c,
    maxC: item.day.maxtemp_c,
    rainChance: percent(item.day.daily_chance_of_rain),
    kind: weatherKind(item.day.condition.code),
    label: item.day.condition.text,
  }));
  return {
    city,
    timezone,
    tempC: raw.current.temp_c,
    feelsLikeC: raw.current.feelslike_c,
    humidity: raw.current.humidity,
    windKph: raw.current.wind_kph,
    kind: weatherKind(raw.current.condition.code),
    label: raw.current.condition.text,
    updatedAt: raw.current.last_updated,
    hours,
    days,
    provider: "WeatherAPI.com",
  };
}
