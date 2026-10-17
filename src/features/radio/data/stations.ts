export interface RadioStation {
  id: string;
  name: string;
  subtitle: string;
  stream: string;
  hls?: boolean;
  hlsFallback?: string;
  publicLinks?: RadioPublicLink[];
}

export interface RadioPublicLink {
  format: "MP3" | "HLS" | "M3U" | "PLS";
  url: string;
  bitrate?: string;
}

export const radioStations: RadioStation[] = [
  {
    id: "banca-digital",
    name: "Banca Digital",
    subtitle: "Smooth Jazz & Soft Rock",
    stream: "https://live.fazenda.rodeo/listen/bancadigital/radio.mp3",
    hlsFallback: "https://live.fazenda.rodeo/hls/bancadigital/live.m3u8",
    publicLinks: [
      {
        format: "MP3",
        bitrate: "192 kbps",
        url: "https://live.fazenda.rodeo/listen/bancadigital/radio.mp3",
      },
      { format: "M3U", url: "https://live.fazenda.rodeo/public/bancadigital/playlist.m3u" },
      { format: "PLS", url: "https://live.fazenda.rodeo/public/bancadigital/playlist.pls" },
    ],
  },
  {
    id: "fazenda-country",
    name: "Fazenda Rodeo Country",
    subtitle: "Country Music",
    stream: "https://live.fazenda.rodeo/listen/country/radio.mp3",
    hlsFallback: "https://live.fazenda.rodeo/hls/country/live.m3u8",
    publicLinks: [
      {
        format: "MP3",
        bitrate: "192 kbps",
        url: "https://live.fazenda.rodeo/listen/country/radio.mp3",
      },
      { format: "HLS", url: "https://live.fazenda.rodeo/hls/country/live.m3u8" },
      { format: "M3U", url: "https://live.fazenda.rodeo/public/country/playlist.m3u" },
      { format: "PLS", url: "https://live.fazenda.rodeo/public/country/playlist.pls" },
    ],
  },
  {
    id: "radio-agronejo",
    name: "Rádio Agronejo",
    subtitle: "Sertanejo & Agronejo",
    stream: "https://live.fazenda.rodeo/listen/sertanejo/radio.mp3",
    hlsFallback: "https://live.fazenda.rodeo/hls/sertanejo/live.m3u8",
    publicLinks: [
      {
        format: "MP3",
        bitrate: "192 kbps",
        url: "https://live.fazenda.rodeo/listen/sertanejo/radio.mp3",
      },
      { format: "HLS", url: "https://live.fazenda.rodeo/hls/sertanejo/live.m3u8" },
      { format: "M3U", url: "https://live.fazenda.rodeo/public/sertanejo/playlist.m3u" },
      { format: "PLS", url: "https://live.fazenda.rodeo/public/sertanejo/playlist.pls" },
    ],
  },
  {
    id: "antena-1",
    name: "Antena 1",
    subtitle: "94,7 FM · São Paulo",
    stream: "https://antenaone.crossradio.com.br/stream/1",
  },
  {
    id: "alpha-fm",
    name: "Alpha FM",
    subtitle: "101,7 FM · São Paulo",
    stream:
      "https://playerservices.streamtheworld.com/api/livestream-redirect/Radio_ALPHAFM_ADP.aac?dist=site-alphafm",
  },
  {
    id: "bandnews-fm",
    name: "BandNews FM",
    subtitle: "96,9 FM · São Paulo",
    stream:
      "https://playerservices.streamtheworld.com/api/livestream-redirect/BANDNEWSFM_SPAAC.m3u8",
    hls: true,
  },
  {
    id: "cbn-sp",
    name: "CBN São Paulo",
    subtitle: "Jornalismo e informação",
    stream:
      "https://playerservices.streamtheworld.com/api/livestream-redirect/CBN_SPAAC.aac?dist=radioscombr",
  },
];
