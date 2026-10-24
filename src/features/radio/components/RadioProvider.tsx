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
  playbackBlocked: boolean;
  volume: number;
  muted: boolean;
  nowPlaying: RadioSong | null;
  selectStation: (station: RadioStation, play?: boolean) => void;
  togglePlayback: () => void;
  pausePlayback: () => void;
  registerExternalPauseHandler: (handler: () => void) => () => void;
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
  const attemptRef = useRef<{ id: number; source: "primary" | "fallback" } | null>(null);
  const mediaErrorHandlerRef = useRef<() => void>(() => undefined);
  const stationRef = useRef<RadioStation>(radioStations[0]!);
  const playingRef = useRef(false);
  const loadingRef = useRef(false);
  const requestRef = useRef(0);
  const externalPauseHandlerRef = useRef<(() => void) | null>(null);
  const [station, setStation] = useState<RadioStation>(radioStations[0]!);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
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
      setPlaybackBlocked(false);
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
      mediaErrorHandlerRef.current();
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("error", onError);
    return () => {
      requestRef.current += 1;
      attemptRef.current = null;
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
      mediaErrorHandlerRef.current = () => undefined;
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
    externalPauseHandlerRef.current?.();
    const requestId = ++requestRef.current;
    attemptRef.current = null;
    mediaErrorHandlerRef.current = () => undefined;
    setError(false);
    setPlaybackBlocked(false);
    loadingRef.current = true;
    setLoading(true);
    hlsRef.current?.destroy();
    hlsRef.current = null;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();

    const setFailure = () => {
      if (requestId !== requestRef.current) return;
      attemptRef.current = null;
      mediaErrorHandlerRef.current = () => undefined;
      loadingRef.current = false;
      playingRef.current = false;
      setLoading(false);
      setPlaying(false);
      setError(true);
      setPlaybackBlocked(false);
      hlsRef.current?.destroy();
      hlsRef.current = null;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };

    let loadMp3Fallback = () => undefined;
    const failAttempt = (source: "primary" | "fallback") => {
      if (source === "primary" && selected.mp3Fallback) loadMp3Fallback();
      else setFailure();
    };
    const play = async (source: "primary" | "fallback") => {
      if (requestId !== requestRef.current) return;
      try {
        await audio.play();
      } catch (error) {
        if (requestId !== requestRef.current) return;
        if (error instanceof DOMException && error.name === "NotAllowedError") {
          loadingRef.current = false;
          setLoading(false);
          setPlaying(false);
          setPlaybackBlocked(true);
          return;
        }
        failAttempt(source);
      }
    };

    let fallbackAttempted = false;
    const loadHls = async (url: string, source: "primary" | "fallback") => {
      if (requestId !== requestRef.current) return;
      attemptRef.current = { id: requestId, source };
      mediaErrorHandlerRef.current = () => undefined;
      loadingRef.current = true;
      playingRef.current = false;
      setLoading(true);
      setPlaying(false);
      hlsRef.current?.destroy();
      hlsRef.current = null;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      mediaErrorHandlerRef.current = () => failAttempt(source);

      if (audio.canPlayType("application/vnd.apple.mpegurl")) {
        audio.src = url;
        audio.load();
        await play(source);
        return;
      }

      let Hls: typeof import("hls.js").default;
      try {
        Hls = (await import("hls.js")).default;
      } catch {
        failAttempt(source);
        return;
      }
      if (requestId !== requestRef.current) return;
      if (Hls.isSupported()) {
        try {
          const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
          hlsRef.current = hls;
          hls.on(Hls.Events.MANIFEST_PARSED, () => void play(source));
          hls.on(Hls.Events.ERROR, (_event, data) => {
            if (!data.fatal || requestId !== requestRef.current) return;
            hls.destroy();
            hlsRef.current = null;
            failAttempt(source);
          });
          hls.loadSource(url);
          hls.attachMedia(audio);
        } catch {
          failAttempt(source);
        }
        return;
      }
      failAttempt(source);
    };

    loadMp3Fallback = () => {
      if (requestId !== requestRef.current || fallbackAttempted || !selected.mp3Fallback) return;
      fallbackAttempted = true;
      attemptRef.current = { id: requestId, source: "fallback" };
      mediaErrorHandlerRef.current = setFailure;
      hlsRef.current?.destroy();
      hlsRef.current = null;
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audio.src = selected.mp3Fallback;
      audio.load();
      void play("fallback");
    };

    mediaErrorHandlerRef.current = () => {
      if (requestId !== requestRef.current) return;
      const activeAttempt = attemptRef.current;
      if (activeAttempt?.id !== requestId) return;
      failAttempt(activeAttempt.source);
    };

    const primaryIsHls = selected.hls === true;
    attemptRef.current = { id: requestId, source: "primary" };
    if (primaryIsHls) {
      await loadHls(selected.stream, "primary");
    } else {
      audio.src = selected.stream;
      audio.load();
      await play("primary");
    }
  }, []);

  const selectStation = useCallback(
    (next: RadioStation, play = playingRef.current || loadingRef.current) => {
      stationRef.current = next;
      setStation(next);
      setNowPlaying(null);
      setError(false);
      setPlaybackBlocked(false);
      if (play) void startStation(next);
      else {
        requestRef.current += 1;
        attemptRef.current = null;
        mediaErrorHandlerRef.current = () => undefined;
        loadingRef.current = false;
        playingRef.current = false;
        setLoading(false);
        setPlaying(false);
        hlsRef.current?.destroy();
        hlsRef.current = null;
        const audio = audioRef.current;
        audio?.pause();
        audio?.removeAttribute("src");
        audio?.load();
      }
    },
    [startStation],
  );
  const togglePlayback = useCallback(() => {
    if (playingRef.current) audioRef.current?.pause();
    else void startStation(stationRef.current);
  }, [startStation]);
  const pausePlayback = useCallback(() => {
    requestRef.current += 1;
    attemptRef.current = null;
    mediaErrorHandlerRef.current = () => undefined;
    loadingRef.current = false;
    playingRef.current = false;
    setLoading(false);
    setPlaying(false);
    hlsRef.current?.destroy();
    hlsRef.current = null;
    audioRef.current?.pause();
  }, []);
  const registerExternalPauseHandler = useCallback((handler: () => void) => {
    externalPauseHandlerRef.current = handler;
    return () => {
      if (externalPauseHandlerRef.current === handler) externalPauseHandlerRef.current = null;
    };
  }, []);
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
      playbackBlocked,
      volume,
      muted,
      nowPlaying,
      selectStation,
      togglePlayback,
      pausePlayback,
      registerExternalPauseHandler,
      setVolume: changeVolume,
      toggleMute,
    }),
    [
      station,
      playing,
      loading,
      error,
      playbackBlocked,
      volume,
      muted,
      nowPlaying,
      selectStation,
      togglePlayback,
      pausePlayback,
      registerExternalPauseHandler,
      changeVolume,
      toggleMute,
    ],
  );
  return <RadioContext.Provider value={value}>{children}</RadioContext.Provider>;
}
