import type { NoticiaEditorial } from "@/content/types";
import { rascunhoExposicaoDadosLinkedin } from "./rascunho-exposicao-dados-linkedin";

/** Shared editorial record for both public addresses of the same report. */
export function noticiaDhenisParaRota(path: string): NoticiaEditorial {
  const { noindex: _noindex, ...publishedSeo } = rascunhoExposicaoDadosLinkedin.seo;
  return {
    ...rascunhoExposicaoDadosLinkedin,
    resumo: rascunhoExposicaoDadosLinkedin.linhaFina,
    notas: [],
    seo: { ...publishedSeo, canonicalPath: path },
  };
}
