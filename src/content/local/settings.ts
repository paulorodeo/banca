import type { Autor, SiteSettings } from "../types";
import retratoAsset from "@/assets/retrato.avif.asset.json";

export const siteSettings: SiteSettings = {
  nome: "Paulo Sinigalia — Advocacia e Consultoria Jurídica",
  advogado: "Paulo José Sinigalia",
  oab: "OAB/SP 411.502",
  cidade: "São Paulo",
  estado: "SP",
  descricaoCurta:
    "Atuação criminal e cível estratégica em São Paulo, com análise individualizada e acompanhamento reservado.",
};

export const autores: Autor[] = [
  {
    id: "autor-paulo-sinigalia",
    nome: "Paulo José Sinigalia",
    oab: "OAB/SP 411.502",
    cargo: "Advogado responsável",
    bio: "Advogado inscrito na OAB/SP sob o número 411.502, com atuação em direito criminal e cível estratégico na cidade de São Paulo. O trabalho é conduzido de forma reservada, com análise individualizada de cada situação e acompanhamento próximo do cliente.",
    retrato: {
      id: "media-retrato",
      url: retratoAsset.url,
      alt: "Retrato profissional do advogado Paulo José Sinigalia",
      width: 600,
      height: 600,
    },
  },
];