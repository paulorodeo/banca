import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, LoaderCircle, Pause, Play, Radio, Volume2, VolumeX } from "lucide-react";
import { radioStations, type RadioStation } from "../data/stations";

interface NowPlaying {
  title?: string;
  artist?: string;
  art?: string;
}

export function MiniRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);
  const stationRef = useRef(radioStations[0]!);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [station, setStation] = useState<RadioStation>(radioStations[0]!);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [muted, setMuted] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = volume;
    audioRef.current = audio;
    const onPlay = () => { setPlaying(true); setLoading(false); setError(false); };
    const onPause = () => setPlaying(false);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onError = () => { setLoading(false); setPlaying(false); setError(true); };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);

    const onScroll = () => setVisible(window.scrollY > 350);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      hlsRef.current?.destroy();
      hlsRef.current = null;
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("error", onError);
    };
    // The audio element is intentionally created once for the global player.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { stationRef.current = station; }, [station]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    if (!playing || station.id !== "banca-digital") return;
    let alive = true;
    const fetchMetadata = async () => {
      try {
        const response = await fetch("https://live.fazenda.rodeo/api/nowplaying/bancadigital", { signal: AbortSignal.timeout(5000) });
        if (!response.ok) return;
        const payload: unknown = await response.json();
        const data = (payload as { now_playing?: { song?: NowPlaying } }).now_playing?.song;
        if (alive && data) setNowPlaying(data);
      } catch { /* Static station details remain available when metadata is offline. */ }
    };
    void fetchMetadata();
    const timer = window.setInterval(() => void fetchMetadata(), 30_000);
    return () => { alive = false; window.clearInterval(timer); };
  }, [playing, station.id]);

  async function startStation(selected: RadioStation) {
    const audio = audioRef.current;
    if (!audio) return;
    setError(false);
    setLoading(true);
    hlsRef.current?.destroy();
    hlsRef.current = null;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    if (selected.hls && !audio.canPlayType("application/vnd.apple.mpegurl")) {
      const { default: Hls } = await import("hls.js");
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hlsRef.current = hls;
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          void audio.play().catch(() => { setLoading(false); setPlaying(false); setError(true); });
        });
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return;
          if (selected.fallback && selected.stream !== selected.fallback) {
            hls.destroy();
            hlsRef.current = null;
            audio.src = selected.fallback;
            void audio.play().catch(() => { setLoading(false); setPlaying(false); setError(true); });
          } else {
            setLoading(false); setPlaying(false); setError(true);
          }
        });
        hls.loadSource(selected.stream);
        hls.attachMedia(audio);
        return;
      } else {
        if (selected.fallback) audio.src = selected.fallback;
        else { setLoading(false); setError(true); return; }
      }
    } else {
      audio.src = selected.stream;
    }
    try { await audio.play(); }
    catch { setLoading(false); setPlaying(false); setError(true); }
  }

  function selectStation(next: RadioStation) {
    setStation(next);
    setMenuOpen(false);
    setError(false);
    setNowPlaying(null);
    if (playing) void startStation(next);
  }

  function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      return;
    }
    void startStation(stationRef.current);
  }

  if (!visible) return null;
  const currentSong = nowPlaying?.title && nowPlaying?.artist
    ? `${nowPlaying.artist} · ${nowPlaying.title}`
    : station.name;

  return (
    <aside className="fixed bottom-5 left-4 z-40 sm:bottom-6 sm:left-6" aria-label="Rádio Banca Paulista">
      {!expanded ? (
        <button type="button" onClick={() => setExpanded(true)} aria-label="Abrir player de rádio" className="flex h-11 w-[105px] items-center gap-2 rounded-full border border-[#C8A66A]/35 bg-[#101B2B] px-3 text-[#F4F1EB] shadow-xl shadow-black/20 transition hover:border-[#C8A66A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A66A]">
          <Radio size={18} className="text-[#C8A66A]" />
          <span className="text-sm font-medium">Rádio</span>
          {playing && <span aria-label="Reproduzindo" className="ml-auto flex h-3 items-end gap-0.5"><i className="h-2 w-0.5 animate-pulse bg-[#C8A66A]" /><i className="h-3 w-0.5 animate-pulse bg-[#C8A66A] [animation-delay:150ms]" /><i className="h-1.5 w-0.5 animate-pulse bg-[#C8A66A] [animation-delay:300ms]" /></span>}
        </button>
      ) : (
        <section className="w-[min(330px,calc(100vw-2rem))] rounded-2xl border border-[#C8A66A]/25 bg-[#101B2B] p-4 text-[#F4F1EB] shadow-2xl shadow-black/25">
          <header className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.18em] text-[#C8A66A]">BANCA PAULISTA · RÁDIO</span>
            <button type="button" onClick={() => { setExpanded(false); setMenuOpen(false); }} aria-label="Recolher player" className="rounded-full p-1.5 text-[#F4F1EB]/70 hover:bg-white/10 hover:text-white"><ChevronDown size={17} /></button>
          </header>
          <div className="mb-3 flex min-w-0 items-center gap-3">
            {nowPlaying?.art && <img src={nowPlaying.art} alt="" className="h-10 w-10 shrink-0 rounded-md object-cover" />}
            <div className="min-w-0">
              <p className="truncate font-serif text-lg leading-tight">{currentSong}</p>
              <p className="mt-1 truncate text-xs text-[#F4F1EB]/65">{station.subtitle}</p>
            </div>
          </div>
          {menuOpen && <div role="listbox" aria-label="Selecionar emissora" className="mb-3 max-h-56 space-y-1 overflow-y-auto rounded-xl border border-white/10 bg-[#17263a] p-1">
            {radioStations.map((item) => <button key={item.id} type="button" role="option" aria-selected={station.id === item.id} onClick={() => selectStation(item)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-white/10 ${station.id === item.id ? "text-[#C8A66A]" : "text-[#F4F1EB]"}`}>
              <span><span className="block text-sm font-medium">{item.name}</span><span className="mt-0.5 block text-[11px] text-[#F4F1EB]/55">{item.subtitle}</span></span>{station.id === item.id && <Check size={16} />}
            </button>)}
          </div>}
          {error && <p role="status" className="mb-2 text-xs text-[#e9b6a9]">Não foi possível reproduzir esta emissora.</p>}
          <div className="flex items-center gap-3">
            <button type="button" onClick={togglePlayback} aria-label={playing ? "Pausar rádio" : "Reproduzir rádio"} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C8A66A] text-[#101B2B] transition hover:bg-[#d7b77f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4F1EB]">
              {loading ? <LoaderCircle size={19} className="animate-spin" /> : playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="translate-x-0.5" />}
            </button>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <button type="button" onClick={() => setMuted((value) => !value)} aria-label={muted ? "Ativar som" : "Silenciar rádio"} className="rounded p-1 text-[#F4F1EB]/75 hover:text-white">{muted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}</button>
              <input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setVolume(Number(event.currentTarget.value)); setMuted(false); }} className="h-1 min-w-0 flex-1 accent-[#C8A66A]" />
            </div>
            <button type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Escolher emissora" className="flex max-w-[104px] items-center gap-1 truncate rounded-lg border border-white/15 px-2 py-2 text-xs text-[#F4F1EB]/90 hover:border-[#C8A66A]/60">
              <span className="truncate">{station.name}</span>{menuOpen ? <ChevronDown size={14} className="shrink-0" /> : <ChevronUp size={14} className="shrink-0" />}
            </button>
          </div>
        </section>
      )}
    </aside>
  );
}
