export interface RadioStation {
  id: string;
  name: string;
  subtitle: string;
  stream: string;
  hls?: boolean;
  fallback?: string;
}

export const radioStations: RadioStation[] = [
  {
    id: "banca-digital",
    name: "Banca Digital",
    subtitle: "Smooth Jazz & Soft Rock",
    stream: "https://live.fazenda.rodeo/hls/bancadigital/live.m3u8",
    hls: true,
  },
  {
    id: "fazenda-country",
    name: "Fazenda Rodeo Country",
    subtitle: "Country Music",
    stream: "https://live.fazenda.rodeo/hls/country/live.m3u8",
    hls: true,
  },
  {
    id: "radio-agronejo",
    name: "Rádio Agronejo",
    subtitle: "Sertanejo & Agronejo",
    stream: "https://live.fazenda.rodeo/hls/sertanejo/live.m3u8",
    hls: true,
    fallback: "https://live.fazenda.rodeo/listen/sertanejo/radio.mp3",
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
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/Radio_ALPHAFM_ADP.aac?dist=site-alphafm",
  },
  {
    id: "bandnews-fm",
    name: "BandNews FM",
    subtitle: "96,9 FM · São Paulo",
    stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/BANDNEWSFM_SPAAC.m3u8",
    hls: true,
  },
  {
    id: "cbn-sp",
    name: "CBN São Paulo",
    subtitle: "Jornalismo e informação",
    stream: "https://stream.sgr.globo.com/hls/aCBNSP/aCBNSP.m3u8",
    hls: true,
  },
];
