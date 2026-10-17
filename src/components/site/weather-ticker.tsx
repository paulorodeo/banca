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
  // Placeholder também no SSR, evitando divergência de hidratação.
  const [clock, setClock] = useState("--:--");
  const { data } = useWeather();
  useEffect(() => {
    const tick = () =>
      setClock(
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Sao_Paulo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <Link
      to="/previsao-do-tempo"
      aria-label={`Ver previsão do tempo em São Paulo. Hora: ${clock}. ${data ? `${Math.round(data.tempC)} graus, ${data.label}` : "Tempo indisponível"}.`}
      className="inline-flex min-h-8 items-center gap-2 rounded-sm text-xs font-semibold text-ivory hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
    >
      <MapPin className="size-3.5 text-gold" aria-hidden />
      <span>São Paulo</span>
      <span className="inline-flex items-center gap-1 text-ivory/90">
        <Clock3 className="size-3.5 text-gold" aria-hidden />
        {clock}
      </span>
      {data ? (
        <span className="inline-flex items-center gap-1.5" title={data.label}>
          <WeatherIcon kind={data.kind} className="size-4 text-gold" />
          {Math.round(data.tempC)}°C
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-ivory/70">
          <CloudSun className="size-4 text-gold" aria-hidden />
          Tempo indisponível
        </span>
      )}
    </Link>
  );
}
