import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, LoaderCircle, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { radioStations } from "@/features/radio/data/stations";
import { useRadioController } from "@/features/radio/components/RadioProvider";
import { breadcrumbSchema, canonical, canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/radio";
const bancaStation = radioStations[0]!;

export const Route = createFileRoute("/radio")({
  head: () => ({
    meta: pageMeta({
      title: "Rádio Banca Digital | Smooth Jazz, Soft Rock e Informação",
      description:
        "Ouça a Rádio Banca Digital: Smooth Jazz, Soft Rock e boletins sobre Direito, Justiça, cultura e São Paulo. Uma rádio da Banca Paulista.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Rádio Banca Digital",
          description: "Smooth Jazz, Soft Rock e informação. Uma rádio da Banca Paulista.",
          url: canonical(PATH),
          publisher: { "@type": "Organization", name: "Banca Paulista", url: canonical("/") },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbSchema([
            { name: "Início", path: "/" },
            { name: "Rádio", path: PATH },
          ]),
        ),
      },
    ],
  }),
  component: RadioPage,
});

function RadioPage() {
  const {
    station,
    playing,
    loading,
    error,
    volume,
    muted,
    nowPlaying,
    togglePlayback,
    setVolume,
    toggleMute,
    selectStation,
  } = useRadioController();
  const track = nowPlaying?.title && nowPlaying.artist ? nowPlaying.title : station.name;
  const artist = nowPlaying?.title && nowPlaying.artist ? nowPlaying.artist : bancaStation.subtitle;

  return (
    <div className="bg-[#F4F1EB] text-[#101B2B]">
      <section className="relative overflow-hidden bg-[#101B2B] py-16 text-[#F4F1EB] md:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-1/2 size-[34rem] -translate-y-1/2 rounded-full border border-[#C8A66A]/10 md:right-[-5rem]"
        >
          <div className="absolute inset-8 rounded-full border border-[#C8A66A]/10" />
          <div className="absolute inset-20 rounded-full border border-[#C8A66A]/10" />
          <div className="absolute inset-32 rounded-full border border-[#C8A66A]/10" />
        </div>
        <Container className="relative grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div>
            <p className="mb-5 text-[0.65rem] font-semibold tracking-[0.22em] text-[#C8A66A]">
              BANCA PAULISTA APRESENTA
            </p>
            <h1 className="font-serif text-5xl font-medium tracking-wide sm:text-6xl md:text-7xl">
              BANCA DIGITAL
            </h1>
            <p className="mt-5 font-serif text-2xl text-[#C8A66A] md:text-3xl">
              A boa música encontra a informação.
            </p>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#F4F1EB]/75 md:text-base">
              Smooth Jazz, Soft Rock e informação para acompanhar o seu dia. Uma seleção musical
              feita para quem aprecia grandes clássicos, boas histórias e novas perspectivas sobre
              São Paulo.
            </p>
            <p className="mt-8 text-xs tracking-[0.12em] text-[#F4F1EB]/65">
              SMOOTH JAZZ <span className="px-2 text-[#C8A66A]">·</span> SOFT ROCK{" "}
              <span className="px-2 text-[#C8A66A]">·</span> INFORMAÇÃO
            </p>
            <p className="mt-3 text-xs text-[#F4F1EB]/45">Uma rádio da Banca Paulista.</p>
          </div>

          <section
            aria-label="Console da Rádio Banca Digital"
            className="rounded-2xl border border-white/10 bg-[#17263A] p-5 shadow-2xl shadow-black/20 sm:p-7"
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[0.62rem] font-semibold tracking-[0.2em] text-[#C8A66A]">
                RÁDIO ONLINE
              </span>
              <span className="flex items-center gap-2 text-[0.62rem] tracking-[0.16em] text-[#F4F1EB]/55">
                <i
                  className={`size-1.5 rounded-full ${playing ? "animate-pulse bg-[#C8A66A]" : "bg-[#F4F1EB]/30"}`}
                />
                {playing ? "NO AR" : "AO VIVO · SOB DEMANDA"}
              </span>
            </div>
            <div className="flex items-center gap-5">
              {nowPlaying?.art ? (
                <img
                  src={nowPlaying.art}
                  alt="Capa da faixa atual"
                  className="size-24 shrink-0 rounded-xl object-cover shadow-lg sm:size-32"
                />
              ) : (
                <div className="relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#C8A66A]/35 bg-[#101B2B] sm:size-32">
                  <div
                    aria-hidden
                    className="absolute inset-2 rounded-full border border-[#C8A66A]/15"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-5 rounded-full border border-[#C8A66A]/20"
                  />
                  <span className="relative font-serif text-4xl font-medium tracking-wider text-[#C8A66A]">
                    BD
                  </span>
                </div>
              )}
              <div className="min-w-0">
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[#F4F1EB]/50">
                  {station.name}
                </p>
                <p
                  className="mt-2 line-clamp-2 font-serif text-xl leading-tight sm:text-2xl"
                  aria-live="polite"
                >
                  {track}
                </p>
                <p className="mt-2 truncate text-xs text-[#F4F1EB]/60">{artist}</p>
              </div>
            </div>
            {error && (
              <p role="status" className="mt-4 text-xs text-[#edb5a8]">
                Não foi possível reproduzir esta emissora.
              </p>
            )}
            <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
              <button
                type="button"
                onClick={togglePlayback}
                aria-label={playing ? `Pausar ${station.name}` : `Reproduzir ${station.name}`}
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#C8A66A] text-[#101B2B] transition hover:bg-[#d7b77f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4F1EB] motion-reduce:transition-none"
              >
                {loading ? (
                  <LoaderCircle size={21} className="animate-spin motion-reduce:animate-none" />
                ) : playing ? (
                  <Pause size={20} fill="currentColor" />
                ) : (
                  <Play size={20} fill="currentColor" className="translate-x-0.5" />
                )}
              </button>
              <span className="min-w-0 flex-1 text-xs text-[#F4F1EB]/65">
                {playing ? "Transmitindo agora" : "Pressione play para ouvir"}
              </span>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Ativar som" : "Silenciar"}
                className="rounded p-2 text-[#F4F1EB]/70 hover:text-white"
              >
                {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                aria-label="Volume da Rádio Banca Digital"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={(event) => setVolume(Number(event.currentTarget.value))}
                className="w-20 accent-[#C8A66A] sm:w-24"
              />
            </div>
          </section>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#9B7940]">
            NOSSA SELEÇÃO MUSICAL
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">
            Duas sonoridades. Uma experiência.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#101B2B]/70 md:text-base">
            Dos acordes suaves do jazz aos grandes clássicos do rock, a Banca Digital reúne músicas
            que atravessam gerações e transformam a rotina em uma experiência mais agradável.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-xl border border-[#101B2B]/10 bg-white/55 p-7 md:p-9">
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-[#9B7940]">
                SMOOTH JAZZ
              </p>
              <h3 className="mt-4 font-serif text-2xl">O jazz que acompanha o seu ritmo.</h3>
              <p className="mt-4 text-sm leading-7 text-[#101B2B]/70">
                Melodias envolventes, arranjos sofisticados e interpretações que criam a atmosfera
                ideal para trabalhar, ler ou simplesmente aproveitar o momento.
              </p>
              <p className="mt-6 text-xs leading-6 text-[#101B2B]/55">
                <span className="font-semibold text-[#101B2B]/75">Referências de estilo:</span>{" "}
                George Benson, Bob James, Grover Washington Jr., Dave Koz e Diana Krall.
              </p>
            </article>
            <article className="rounded-xl border border-[#101B2B]/10 bg-white/55 p-7 md:p-9">
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-[#9B7940]">
                SOFT ROCK
              </p>
              <h3 className="mt-4 font-serif text-2xl">Clássicos que nunca saem de cena.</h3>
              <p className="mt-4 text-sm leading-7 text-[#101B2B]/70">
                Grandes sucessos internacionais, melodias inesquecíveis e músicas que acompanham
                diferentes gerações com elegância e familiaridade.
              </p>
              <p className="mt-6 text-xs leading-6 text-[#101B2B]/55">
                <span className="font-semibold text-[#101B2B]/75">Referências de estilo:</span> Phil
                Collins, Toto, Chicago, Christopher Cross, Fleetwood Mac e Simply Red.
              </p>
            </article>
          </div>
          <p className="mt-4 text-xs text-[#101B2B]/50">
            Os artistas são referências editoriais de estilo e não indicam gravações já cadastradas
            na programação.
          </p>
        </Container>
      </section>

      <section className="border-y border-white/10 bg-[#101B2B] py-16 text-[#F4F1EB] md:py-24">
        <Container>
          <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#C8A66A]">
            ALÉM DA MÚSICA
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">
            Informação que merece ser ouvida.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#F4F1EB]/70 md:text-base">
            A Banca Digital também é um espaço para conhecimento. Nossa proposta é intercalar a
            programação musical com boletins curtos sobre Direito, Justiça, cidadania, cultura e
            acontecimentos relevantes de São Paulo.
          </p>
          <div className="mt-10 grid gap-0 sm:grid-cols-3 sm:divide-x sm:divide-white/10">
            {[
              [
                "Minuto Jurídico",
                "Direitos, legislação e conceitos jurídicos explicados de maneira acessível.",
              ],
              [
                "Justiça em Pauta",
                "Decisões judiciais, instituições e acontecimentos jurídicos contextualizados.",
              ],
              [
                "São Paulo em Foco",
                "Informações e temas relacionados à capital, seus bairros, serviços e instituições.",
              ],
            ].map(([title, text]) => (
              <article
                key={title}
                className="border-t border-white/10 py-6 first:border-0 sm:border-t-0 sm:px-7 sm:first:pl-0 sm:last:pr-0"
              >
                <h3 className="font-serif text-xl text-[#C8A66A]">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#F4F1EB]/70">{text}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-[#F4F1EB]/50">
            Os boletins têm caráter informativo e não substituem orientação jurídica profissional.
          </p>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#9B7940]">
            MAIS MÚSICA
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl">Outras experiências para ouvir.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {radioStations
              .filter((item) => item.id === "fazenda-country" || item.id === "radio-agronejo")
              .map((item) => (
                <article
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-xl border border-[#101B2B]/10 bg-white/55 p-5 sm:p-7"
                >
                  <div>
                    <h3 className="font-serif text-xl">{item.name}</h3>
                    <p className="mt-1 text-sm text-[#101B2B]/60">{item.subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectStation(item, true)}
                    className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-md border border-[#101B2B]/15 px-4 text-xs font-semibold text-[#101B2B] transition hover:border-[#C8A66A] hover:bg-[#C8A66A]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101B2B] motion-reduce:transition-none"
                  >
                    Ouvir rádio <ArrowRight size={15} aria-hidden />
                  </button>
                </article>
              ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
