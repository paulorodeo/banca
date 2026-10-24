import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  Check,
  ChevronDown,
  ChevronUp,
  LoaderCircle,
  Pause,
  Play,
  Radio,
  Volume2,
  VolumeX,
} from "lucide-react";
import { radioStations } from "../data/stations";
import { useRadioController } from "./RadioProvider";

export function MiniRadioPlayer() {
  const {
    station,
    playing,
    loading,
    error,
    playbackBlocked,
    volume,
    muted,
    selectStation,
    togglePlayback,
    setVolume,
    toggleMute,
    nowPlaying,
  } = useRadioController();
  const location = useLocation();
  const [scrolledPastThreshold, setScrolledPastThreshold] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPastThreshold(window.scrollY > 350);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const visible = scrolledPastThreshold || playing || loading || expanded;
  if (!visible || location.pathname === "/radio") return null;
  const currentSong =
    nowPlaying?.title && nowPlaying.artist
      ? `${nowPlaying.artist} · ${nowPlaying.title}`
      : station.name;

  return (
    <aside
      className="fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6"
      aria-label="Rádio Banca Paulista"
    >
      {!expanded ? (
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
            if (!playing && !loading) togglePlayback();
          }}
          aria-label="Abrir player de rádio"
          className="flex h-11 w-[105px] items-center gap-2 rounded-full border border-[#C8A66A]/35 bg-[#101B2B] px-3 text-[#F4F1EB] shadow-xl shadow-black/20 transition hover:border-[#C8A66A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A66A]"
        >
          <Radio size={18} className="text-[#C8A66A]" />
          <span className="text-sm font-medium">Rádio</span>
          {playing && (
            <span aria-label="Reproduzindo" className="ml-auto flex h-3 items-end gap-0.5">
              <i className="h-2 w-0.5 animate-pulse bg-[#C8A66A] motion-reduce:animate-none" />
              <i className="h-3 w-0.5 animate-pulse bg-[#C8A66A] [animation-delay:150ms] motion-reduce:animate-none" />
              <i className="h-1.5 w-0.5 animate-pulse bg-[#C8A66A] [animation-delay:300ms] motion-reduce:animate-none" />
            </span>
          )}
        </button>
      ) : (
        <section
          onKeyDown={(event) => {
            if (event.key === "Escape") setMenuOpen(false);
          }}
          className="w-[min(330px,calc(100vw-2rem))] rounded-2xl border border-[#C8A66A]/25 bg-[#101B2B] p-4 text-[#F4F1EB] shadow-2xl shadow-black/25"
        >
          <header className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-[#C8A66A]">
              BANCA PAULISTA · RÁDIO
            </span>
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                setMenuOpen(false);
              }}
              aria-label="Recolher player"
              className="rounded-full p-1.5 text-[#F4F1EB]/70 hover:bg-white/10 hover:text-white"
            >
              <ChevronDown size={17} />
            </button>
          </header>
          <div className="mb-3 flex min-w-0 items-center gap-3">
            {nowPlaying?.art && (
              <img
                src={nowPlaying.art}
                alt=""
                className="h-10 w-10 shrink-0 rounded-md object-cover"
              />
            )}
            <div className="min-w-0">
              <p className="truncate font-serif text-lg leading-tight">{currentSong}</p>
              <p className="mt-1 truncate text-xs text-[#F4F1EB]/65">{station.subtitle}</p>
            </div>
          </div>
          {menuOpen && (
            <div
              role="listbox"
              aria-label="Selecionar emissora"
              className="mb-3 max-h-56 space-y-1 overflow-y-auto rounded-xl border border-white/10 bg-[#17263a] p-1"
            >
              {radioStations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={station.id === item.id}
                  onClick={() => {
                    if (station.id !== item.id) selectStation(item, true);
                    else if (!playing && !loading) togglePlayback();
                    setMenuOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-white/10 ${station.id === item.id ? "text-[#C8A66A]" : "text-[#F4F1EB]"}`}
                >
                  <span>
                    <span className="block text-sm font-medium">{item.name}</span>
                    <span className="mt-0.5 block text-[11px] text-[#F4F1EB]/55">
                      {item.subtitle}
                    </span>
                  </span>
                  {station.id === item.id && <Check size={16} />}
                </button>
              ))}
            </div>
          )}
          {error && (
            <p role="status" className="mb-2 text-xs text-[#e9b6a9]">
              A transmissão não respondeu. Verifique a conexão e tente novamente.
            </p>
          )}
          {playbackBlocked && (
            <p role="status" className="mb-2 text-xs text-[#F4F1EB]/75">
              O navegador bloqueou a reprodução. Toque em reproduzir para tentar novamente.
            </p>
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={playing ? "Pausar rádio" : "Reproduzir rádio"}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C8A66A] text-[#101B2B] transition hover:bg-[#d7b77f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F1EB]"
            >
              {loading ? (
                <LoaderCircle size={19} className="animate-spin" />
              ) : playing ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="translate-x-0.5" />
              )}
            </button>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Ativar som" : "Silenciar rádio"}
                className="rounded p-1 text-[#F4F1EB]/75 hover:text-white"
              >
                {muted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
              </button>
              <input
                aria-label="Volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={muted ? 0 : volume}
                onChange={(event) => {
                  setVolume(Number(event.currentTarget.value));
                }}
                className="h-1 min-w-0 flex-1 accent-[#C8A66A]"
              />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label="Escolher emissora"
              className="flex max-w-[104px] items-center gap-1 truncate rounded-lg border border-white/15 px-2 py-2 text-xs text-[#F4F1EB]/90 hover:border-[#C8A66A]/60"
            >
              <span className="truncate">{station.name}</span>
              {menuOpen ? (
                <ChevronDown size={14} className="shrink-0" />
              ) : (
                <ChevronUp size={14} className="shrink-0" />
              )}
            </button>
          </div>
        </section>
      )}
    </aside>
  );
}
