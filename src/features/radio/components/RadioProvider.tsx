import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { radioStations, type RadioStation } from "../data/stations";

export interface RadioSong {
  title?: string;
  artist?: string;
  art?: string;
}
interface RadioContextValue {
  station: RadioStation;
  playing: boolean;
  loading: boolean;
  error: boolean;
  volume: number;
  muted: boolean;
  nowPlaying: RadioSong | null;
  selectStation: (station: RadioStation, play?: boolean) => void;
  togglePlayback: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export function useRadioController() {
  const value = useContext(RadioContext);
  if (!value) throw new Error("useRadioController deve ser usado dentro de RadioProvider");
  return value;
}

export function RadioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);
  const stationRef = useRef<RadioStation>(radioStations[0]!);
  const playingRef = useRef(false);
  const loadingRef = useRef(false);
  const requestRef = useRef(0);
  const [station, setStation] = useState<RadioStation>(radioStations[0]!);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [muted, setMuted] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<RadioSong | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audioRef.current = audio;
    const onPlay = () => {
      playingRef.current = true;
      loadingRef.current = false;
      setPlaying(true);
      setLoading(false);
      setError(false);
    };
    const onPause = () => {
      playingRef.current = false;
      setPlaying(false);
    };
    const onWaiting = () => {
      loadingRef.current = true;
      setLoading(true);
    };
    const onCanPlay = () => {
      loadingRef.current = false;
      setLoading(false);
    };
    const onError = () => {
      loadingRef.current = false;
      setLoading(false);
      playingRef.current = false;
      setPlaying(false);
      setError(true);
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
    return () => {
      requestRef.current += 1;
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
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);
  useEffect(() => {
    if (!playing || station.id !== "banca-digital") return;
    let alive = true;
    const fetchMetadata = async () => {
      try {
        const response = await fetch("https://live.fazenda.rodeo/api/nowplaying/bancadigital", {
          signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) return;
        const payload: unknown = await response.json();
        const song = (payload as { now_playing?: { song?: RadioSong } }).now_playing?.song;
        if (alive && song) setNowPlaying(song);
      } catch {
        /* Metadata is optional. */
      }
    };
    void fetchMetadata();
    const timer = window.setInterval(() => void fetchMetadata(), 30_000);
    return () => {
      alive = false;
      window.clearInterval(timer);
    };
  }, [playing, station.id]);

  const startStation = useCallback(async (selected: RadioStation) => {
    const audio = audioRef.current;
    if (!audio) return;
    const requestId = ++requestRef.current;
    setError(false);
    loadingRef.current = true;
    setLoading(true);
    hlsRef.current?.destroy();
    hlsRef.current = null;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    const play = async () => {
      if (requestId !== requestRef.current) return;
      try {
        await audio.play();
      } catch {
        if (requestId === requestRef.current) {
          loadingRef.current = false;
          setLoading(false);
          setPlaying(false);
          setError(true);
        }
      }
    };
    if (selected.hls && !audio.canPlayType("application/vnd.apple.mpegurl")) {
      let Hls: typeof import("hls.js").default;
      try {
        Hls = (await import("hls.js")).default;
      } catch {
        if (requestId === requestRef.current) {
          loadingRef.current = false;
          setLoading(false);
          setError(true);
        }
        return;
      }
      if (requestId !== requestRef.current) return;
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hlsRef.current = hls;
        hls.on(Hls.Events.MANIFEST_PARSED, () => void play());
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal || requestId !== requestRef.current) return;
          hls.destroy();
          hlsRef.current = null;
          if (selected.fallback) {
            audio.src = selected.fallback;
            void play();
          } else {
            loadingRef.current = false;
            setLoading(false);
            setPlaying(false);
            setError(true);
          }
        });
        hls.loadSource(selected.stream);
        hls.attachMedia(audio);
        return;
      }
      if (!selected.fallback) {
        loadingRef.current = false;
        setLoading(false);
        setError(true);
        return;
      }
      audio.src = selected.fallback;
    } else audio.src = selected.stream;
    await play();
  }, []);

  const selectStation = useCallback(
    (next: RadioStation, play = playingRef.current || loadingRef.current) => {
      stationRef.current = next;
      setStation(next);
      setNowPlaying(null);
      setError(false);
      if (play) void startStation(next);
    },
    [startStation],
  );
  const togglePlayback = useCallback(() => {
    if (playingRef.current) audioRef.current?.pause();
    else void startStation(stationRef.current);
  }, [startStation]);
  const toggleMute = useCallback(() => setMuted((value) => !value), []);
  const changeVolume = useCallback((next: number) => {
    setVolume(next);
    if (next > 0) setMuted(false);
  }, []);
  const value = useMemo(
    () => ({
      station,
      playing,
      loading,
      error,
      volume,
      muted,
      nowPlaying,
      selectStation,
      togglePlayback,
      setVolume: changeVolume,
      toggleMute,
    }),
    [
      station,
      playing,
      loading,
      error,
      volume,
      muted,
      nowPlaying,
      selectStation,
      togglePlayback,
      changeVolume,
      toggleMute,
    ],
  );
  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
}
