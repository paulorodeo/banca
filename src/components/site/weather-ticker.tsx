import { Link } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  Clock3,
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  MapPin,
  Sun,
  type LucideIcon,
} from "lucide-react";
import type { WeatherKind, WeatherSnapshot } from "@/lib/weather-model";

const icons: Record<WeatherKind, LucideIcon> = {
  sun: Sun,
  "partly-cloudy": CloudSun,
  cloud: Cloud,
  fog: CloudFog,
  rain: CloudRain,
  storm: CloudLightning,
  snow: CloudSnow,
};

export function WeatherIcon({
  kind,
  className = "size-4",
}: {
  kind: WeatherKind;
  className?: string;
}) {
  const Icon = icons[kind] ?? CloudSun;
  return <Icon className={className} aria-hidden />;
}

export async function loadWeather(): Promise<WeatherSnapshot> {
  const response = await fetch("/api/public/tempo", { headers: { Accept: "application/json" } });
  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(
      result.error === "weather_not_configured" ? "weather_not_configured" : "weather_unavailable",
    );
  }
  return (await response.json()) as WeatherSnapshot;
}

interface WeatherState {
  data: WeatherSnapshot | undefined;
  isPending: boolean;
  error: Error | null;
}

const WeatherContext = createContext<WeatherState | null>(null);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WeatherSnapshot | undefined>();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    let active = true;
    const refresh = () => {
      void loadWeather()
        .then((snapshot) => {
          if (active) {
            setData(snapshot);
            setError(null);
            setIsPending(false);
          }
        })
        .catch((reason: unknown) => {
          if (active) {
            setError(reason instanceof Error ? reason : new Error("weather_unavailable"));
            setIsPending(false);
          }
        });
    };
    refresh();
    const interval = window.setInterval(refresh, 15 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);
  return (
    <WeatherContext.Provider value={{ data, isPending, error }}>{children}</WeatherContext.Provider>
  );
}

export function useWeather() {
  const value = useContext(WeatherContext);
  if (!value) throw new Error("useWeather deve ser usado dentro de WeatherProvider");
  return value;
}

export function WeatherTicker() {
  // O mesmo relógio alimenta data e hora; só é inicializado no cliente para
  // manter a saída SSR estável e atualizar a data também na virada do dia.
  const [clock, setClock] = useState<{ date: string; time: string; iso: string } | null>(null);
  const { data } = useWeather();
  useEffect(() => {
    const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => {
      const now = new Date();
      setClock({
        date: dateFormatter.format(now),
        time: timeFormatter.format(now),
        iso: now.toISOString(),
      });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  const time = clock?.time ?? "--:--";
  const weather = data ? `${Math.round(data.tempC)} graus, ${data.label}` : "Tempo indisponível";
  return (
    <Link
      to="/previsao-do-tempo"
      aria-label={`Ver previsão do tempo em São Paulo. ${clock ? `${clock.date}, ${time}` : `Hora ${time}`}. ${weather}.`}
      className="inline-flex min-h-8 min-w-0 flex-1 flex-nowrap items-center justify-end gap-2 overflow-hidden rounded-sm text-xs font-semibold text-ivory hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
    >
      <MapPin className="size-3.5 shrink-0 text-gold" aria-hidden />
      <span className="whitespace-nowrap">São Paulo</span>
      <span aria-hidden="true" className="hidden text-gold/80 md:inline">
        ·
      </span>
      {clock ? (
        <time
          dateTime={clock.iso}
          className="hidden shrink-0 whitespace-nowrap text-ivory/95 md:inline"
        >
          {clock.date}
        </time>
      ) : (
        <span className="hidden shrink-0 whitespace-nowrap text-ivory/75 md:inline">
          Data local
        </span>
      )}
      <span aria-hidden="true" className="text-gold/80">
        ·
      </span>
      <span className="inline-flex w-14 shrink-0 items-center justify-end gap-1 whitespace-nowrap text-ivory/95 tabular-nums">
        <Clock3 className="size-3.5 text-gold" aria-hidden />
        {time}
      </span>
      <span aria-hidden="true" className="text-gold/80">
        ·
      </span>
      {data ? (
        <span
          className="inline-flex w-32 min-w-0 shrink-0 items-center gap-1.5 sm:w-52"
          title={data.label}
        >
          <WeatherIcon kind={data.kind} className="size-4 text-gold" />
          <span className="whitespace-nowrap">{Math.round(data.tempC)}°C</span>
          <span className="truncate">{data.label}</span>
        </span>
      ) : (
        <span className="inline-flex w-32 min-w-0 shrink-0 items-center gap-1 text-ivory/70 sm:w-52">
          <CloudSun className="size-4 text-gold" aria-hidden />
          <span className="truncate">Tempo indisponível</span>
        </span>
      )}
    </Link>
  );
}
