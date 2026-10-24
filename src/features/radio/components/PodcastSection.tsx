import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, LoaderCircle, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Container } from "@/components/site/primitives";
import type { PodcastFeed, PodcastEpisode } from "../podcast-feed";
import { useRadioController } from "./RadioProvider";

const PODCAST_URL = "https://podcast.bancapaulista.org/";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const rounded = Math.floor(seconds);
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const remaining = rounded % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`
    : `${minutes}:${String(remaining).padStart(2, "0")}`;
};

const formatDate = (value: string) =>
  value
    ? new Intl.DateTimeFormat("pt-BR", {
        timeZone: "America/Sao_Paulo",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(value))
    : "Data não informada";

export function PodcastSection({
  result,
}: {
  result: { ok: true; feed: PodcastFeed } | { ok: false };
}) {
  const { pausePlayback, registerExternalPauseHandler } = useRadioController();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const pausePodcast = useCallback(() => audioRef.current?.pause(), []);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = volume;
    audioRef.current = audio;
    const onPlay = () => {
      setPlaying(true);
      setLoading(false);
      setError(false);
    };
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () =>
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
    };
    const onError = () => {
      setPlaying(false);
      setLoading(false);
      setError(true);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
    // The shared audio element is created once for this route.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => registerExternalPauseHandler(pausePodcast),
    [pausePodcast, registerExternalPauseHandler],
  );

  const toggleEpisode = async (episode: PodcastEpisode) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (activeId === episode.id && !audio.paused) {
      audio.pause();
      return;
    }
    pausePlayback();
    setError(false);
    setLoading(true);
    if (activeId !== episode.id || audio.src !== episode.audioUrl) {
      audio.pause();
      audio.src = episode.audioUrl;
      audio.load();
      setActiveId(episode.id);
      setCurrentTime(0);
      setDuration(episode.durationSeconds ?? 0);
    }
    try {
      await audio.play();
    } catch {
      setLoading(false);
      setPlaying(false);
      setError(true);
    }
  };

  const episodes = result.ok ? result.feed.episodes : [];
  return (
    <section
      className="border-b border-[#101B2B]/10 bg-white py-16 md:py-24"
      aria-labelledby="podcast-heading"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-[#9B7940]">
              PARA OUVIR QUANDO QUISER
            </p>
            <h2 id="podcast-heading" className="mt-4 font-serif text-3xl md:text-4xl">
              Podcast Banca Digital
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#101B2B]/70 md:text-base">
              Notícias, análises e informação para ouvir quando quiser.
            </p>
          </div>
          <a
            href={PODCAST_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-md border border-[#101B2B]/15 px-4 text-xs font-semibold transition hover:border-[#C8A66A] hover:bg-[#C8A66A]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101B2B]"
          >
            Ver todos os episódios <ExternalLink size={15} aria-hidden />
          </a>
        </div>

        {episodes.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => {
              const active = activeId === episode.id;
              const episodeDuration = active && duration > 0 ? duration : episode.durationSeconds;
              return (
                <article
                  key={episode.id}
                  className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-[#F8F8F6] shadow-sm transition ${active ? "border-[#C8A66A] ring-2 ring-[#C8A66A]/20" : "border-[#101B2B]/10"}`}
                >
                  {episode.imageUrl ? (
                    <img
                      src={episode.imageUrl}
                      alt=""
                      loading="lazy"
                      className="aspect-[16/9] w-full bg-[#101B2B] object-cover"
                    />
                  ) : (
                    <div
                      className="flex aspect-[16/9] w-full items-center justify-center bg-[#101B2B] font-serif text-4xl text-[#C8A66A]"
                      aria-hidden
                    >
                      BD
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#9B7940]">
                      <time dateTime={episode.publishedAt}>{formatDate(episode.publishedAt)}</time>
                      {episodeDuration ? (
                        <>
                          <span aria-hidden>·</span>
                          <span>{formatTime(episodeDuration)}</span>
                        </>
                      ) : null}
                    </div>
                    <h3
                      className="mt-3 line-clamp-3 font-serif text-xl leading-snug"
                      title={episode.title}
                    >
                      {episode.title}
                    </h3>
                    {episode.description ? (
                      <p className="mt-3 line-clamp-4 text-sm leading-6 text-[#101B2B]/65">
                        {episode.description}
                      </p>
                    ) : null}
                    <div className="mt-auto pt-5">
                      {active ? (
                        <div className="mb-4 space-y-2" aria-label="Progresso do episódio">
                          <input
                            aria-label="Progresso do podcast"
                            type="range"
                            min="0"
                            max={duration || 1}
                            step="1"
                            value={Math.min(currentTime, duration || 1)}
                            onChange={(event) => {
                              if (audioRef.current)
                                audioRef.current.currentTime = Number(event.currentTarget.value);
                            }}
                            className="h-1 w-full accent-[#C8A66A]"
                          />
                          <div className="flex justify-between text-[0.68rem] tabular-nums text-[#101B2B]/55">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                          </div>
                        </div>
                      ) : null}
                      <div className="flex items-center gap-3 border-t border-[#101B2B]/10 pt-4">
                        <button
                          type="button"
                          onClick={() => void toggleEpisode(episode)}
                          aria-label={
                            active && playing
                              ? `Pausar ${episode.title}`
                              : `Reproduzir ${episode.title}`
                          }
                          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#101B2B] text-[#C8A66A] transition hover:bg-[#17263A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A66A]"
                        >
                          {active && loading ? (
                            <LoaderCircle
                              size={18}
                              className="animate-spin motion-reduce:animate-none"
                            />
                          ) : active && playing ? (
                            <Pause size={18} fill="currentColor" />
                          ) : (
                            <Play size={18} fill="currentColor" className="translate-x-0.5" />
                          )}
                        </button>
                        <span className="min-w-0 flex-1 text-xs font-semibold text-[#101B2B]/65">
                          {active && playing
                            ? "Reproduzindo"
                            : active
                              ? "Episódio selecionado"
                              : "Ouvir episódio"}
                        </span>
                        {active ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const audio = audioRef.current;
                                if (!audio) return;
                                audio.muted = !audio.muted;
                                setVolume(audio.muted ? 0 : audio.volume || 0.8);
                              }}
                              aria-label={
                                volume === 0 ? "Ativar som do podcast" : "Silenciar podcast"
                              }
                              className="rounded p-1 text-[#101B2B]/65 hover:text-[#101B2B]"
                            >
                              {volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
                            </button>
                            <input
                              aria-label="Volume do podcast"
                              type="range"
                              min="0"
                              max="1"
                              step="0.01"
                              value={volume}
                              onChange={(event) => {
                                const next = Number(event.currentTarget.value);
                                setVolume(next);
                                if (audioRef.current) {
                                  audioRef.current.muted = false;
                                  audioRef.current.volume = next;
                                }
                              }}
                              className="h-1 w-16 accent-[#C8A66A]"
                            />
                          </div>
                        ) : null}
                      </div>
                      {active && error ? (
                        <p role="status" className="mt-3 text-xs text-[#9A3D2D]">
                          Não foi possível reproduzir este episódio. Tente novamente.
                        </p>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-[#101B2B]/10 bg-[#F8F8F6] p-6 text-sm leading-7 text-[#101B2B]/70">
            Os episódios estão temporariamente indisponíveis. Você pode acessá-los na página
            completa do podcast.
          </div>
        )}
      </Container>
    </section>
  );
}
