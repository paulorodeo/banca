import { createFileRoute, Link } from "@tanstack/react-router";
import { CloudRain, Droplets, Wind, ThermometerSun, ArrowLeft } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { useWeather, WeatherIcon } from "@/components/site/weather-ticker";
import { canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/previsao-do-tempo";
const DISCLAIMER =
  "Informações meteorológicas para fins informativos. Previsões são estimativas e podem não representar as condições em todos os locais ou horários. Não use estes dados como única base para decisões de segurança, navegação, aviação ou emergências; consulte sempre os alertas e órgãos meteorológicos oficiais.";

export const Route = createFileRoute("/previsao-do-tempo")({
  head: () => ({
    meta: pageMeta({
      title: "Previsão do tempo em São Paulo | Banca Paulista",
      description:
        "Temperatura atual, previsão por hora e próximos três dias na cidade de São Paulo. Informações meteorológicas com fonte identificada.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
  }),
  component: ForecastPage,
});

function ForecastPage() {
  const { data, isPending, error } = useWeather();
  return (
    <div className="bg-white text-brand-navy">
      <section className="border-b border-gold/25 bg-brand-navy py-12 text-white md:py-16">
        <Container>
          <p className="text-xs font-bold uppercase tracking-widest text-gold">
            Meteorologia · São Paulo
          </p>
          <h1 className="mt-3 font-[Georgia,serif] text-3xl font-bold md:text-5xl">
            Previsão do tempo
          </h1>
          <p className="mt-3 max-w-2xl text-base text-ivory/85">
            Condições atuais e próximos dias na capital paulista.
          </p>
        </Container>
      </section>
      <Container className="py-10 md:py-14">
        {data ? (
          <>
            <section
              className="grid gap-5 border border-brand-navy/15 bg-[#f8f8f6] p-6 sm:grid-cols-[1fr_auto] md:p-9"
              aria-label="Condições atuais"
            >
              <div>
                <h2 className="font-[Georgia,serif] text-2xl font-bold">Agora em São Paulo</h2>
                <p className="mt-2 text-base font-semibold">{data.label}</p>
                <p className="mt-4 text-sm text-brand-navy/70">
                  Atualização do provedor: {data.updatedAt}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <WeatherIcon kind={data.kind} className="size-14 text-gold" />
                <strong className="text-5xl">{Math.round(data.tempC)}°C</strong>
              </div>
              <div className="grid gap-4 border-t border-brand-navy/15 pt-5 text-sm sm:col-span-2 sm:grid-cols-3">
                <span className="flex items-center gap-2">
                  <ThermometerSun className="size-5 text-gold" /> Sensação{" "}
                  {Math.round(data.feelsLikeC)}°C
                </span>
                <span className="flex items-center gap-2">
                  <Droplets className="size-5 text-gold" /> Umidade {data.humidity}%
                </span>
                <span className="flex items-center gap-2">
                  <Wind className="size-5 text-gold" /> Vento {Math.round(data.windKph)} km/h
                </span>
              </div>
            </section>
            <section className="mt-10">
              <h2 className="font-[Georgia,serif] text-2xl font-bold">Próximas horas</h2>
              <div
                className="mt-5 flex snap-x gap-3 overflow-x-auto pb-3"
                aria-label="Previsão por hora"
              >
                {data.hours.map((hour) => (
                  <div
                    key={hour.time}
                    className="flex min-w-32 snap-start flex-col items-center gap-3 border border-brand-navy/15 p-4 text-center"
                  >
                    <span className="text-sm font-semibold">{hour.time.slice(-5)}</span>
                    <WeatherIcon kind={hour.kind} className="size-7 text-gold" />
                    <strong className="text-lg">{Math.round(hour.tempC)}°C</strong>
                    <span className="flex items-center gap-1 text-xs text-brand-navy/70">
                      <CloudRain className="size-3.5" />
                      {hour.rainChance === null ? "—" : `${hour.rainChance}%`}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="mt-10">
              <h2 className="font-[Georgia,serif] text-2xl font-bold">Próximos três dias</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {data.days.map((day) => (
                  <article key={day.date} className="border border-brand-navy/15 p-5">
                    <h3 className="font-[Georgia,serif] text-xl font-bold">
                      {new Intl.DateTimeFormat("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "short",
                        timeZone: "UTC",
                      }).format(new Date(`${day.date}T12:00:00Z`))}
                    </h3>
                    <WeatherIcon kind={day.kind} className="mt-4 size-9 text-gold" />
                    <p className="mt-2 text-sm">{day.label}</p>
                    <p className="mt-4 text-lg font-bold">
                      {Math.round(day.maxC)}° / {Math.round(day.minC)}°
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs text-brand-navy/70">
                      <CloudRain className="size-4" /> Chuva:{" "}
                      {day.rainChance === null ? "indisponível" : `${day.rainChance}%`}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div role="status" className="border border-brand-navy/15 bg-[#f8f8f6] p-8">
            <p className="text-base font-semibold">
              {isPending
                ? "Consultando condições meteorológicas…"
                : "Previsão temporariamente indisponível."}
            </p>
            <p className="mt-2 text-sm">
              {error?.message === "weather_not_configured"
                ? "O serviço meteorológico aguarda a configuração da chave WeatherAPI pela equipe do portal."
                : "A página permanece acessível. Os dados serão exibidos quando o serviço estiver disponível."}
            </p>
          </div>
        )}
        <section className="mt-10 border-t border-brand-navy/15 pt-5 text-xs leading-6 text-brand-navy/75">
          <p>
            Dados meteorológicos:{" "}
            <a
              href="https://www.weatherapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-gold underline-offset-4"
            >
              WeatherAPI.com
            </a>
            .
          </p>
          <p className="mt-2">{DISCLAIMER}</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-1 font-semibold underline decoration-gold underline-offset-4"
          >
            <ArrowLeft className="size-4" /> Voltar ao portal
          </Link>
        </section>
      </Container>
    </div>
  );
}
