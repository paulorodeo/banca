import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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

export function useWeather() {
  return useQuery({
    queryKey: ["banca", "weather", "sao-paulo"],
    queryFn: loadWeather,
    staleTime: 15 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: typeof window !== "undefined",
  });
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
          className="hidden w-64 shrink-0 whitespace-nowrap text-right text-ivory/95 md:inline-block"
        >
          {clock.date}
        </time>
      ) : (
        <span className="hidden w-64 shrink-0 whitespace-nowrap text-right text-ivory/75 md:inline-block">
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
