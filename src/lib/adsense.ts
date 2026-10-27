import type { NoticiaEditorial, NoticiaBloco } from "@/content/types";

export const ADSENSE_PUBLISHER_ID = "ca-pub-5061534320708000";
export const ADSENSE_SCRIPT_ID = "banca-google-adsense";
export const ADSENSE_SCRIPT_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;

/** Public requests remain disabled until a reviewed consent integration is available. */
export const ADSENSE_REQUESTS_ENABLED = false;

export const ADSENSE_FORMATS = {
  display: {
    slot: "1053881070",
    attributes: {
      "data-ad-format": "auto",
      "data-full-width-responsive": "true",
    },
    style: { display: "block" },
  },
  inArticle: {
    slot: "8409626914",
    attributes: {
      "data-ad-layout": "in-article",
      "data-ad-format": "fluid",
    },
    style: { display: "block", textAlign: "center" },
  },
  multiplex: {
    slot: "3157300237",
    attributes: { "data-ad-format": "autorelaxed" },
    style: { display: "block" },
  },
  inFeed: {
    slot: "4913447061",
    attributes: {
      "data-ad-format": "fluid",
      "data-ad-layout-key": "-ef+6l-2u-b0+uf",
    },
    style: { display: "block" },
  },
} as const;

export type AdSenseFormat = keyof typeof ADSENSE_FORMATS;
export type AdSenseConsent = "unknown" | "granted" | "denied" | "unavailable";
export type AdRenderMode = "live" | "preview" | "hidden";

const articleRouteReservedSlugs = new Set(["brasil", "estados", "regioes"]);

export function isAdSensePageEligible(pathname: string): boolean {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/atlas-brasil" || path === "/noticias") return true;
  if (/^\/noticias\/regioes\/[^/]+$/.test(path)) return true;
  const match = path.match(/^\/noticias\/([^/]+)$/);
  return Boolean(match && !articleRouteReservedSlugs.has(match[1]!));
}

export function adRenderMode(input: {
  hostname: string;
  pathname: string;
  buildMode: string;
  enabled: boolean;
  consent: AdSenseConsent;
}): AdRenderMode {
  if (!isAdSensePageEligible(input.pathname)) return "hidden";
  if (
    input.enabled &&
    input.consent === "granted" &&
    input.hostname.toLowerCase().replace(/\.$/, "") === "bancapaulista.org"
  ) {
    return "live";
  }
  if (
    (input.buildMode === "development" || input.buildMode === "staging") &&
    input.hostname.toLowerCase().replace(/\.$/, "") !== "bancapaulista.org"
  ) {
    return "preview";
  }
  return "hidden";
}

function blockText(block: NoticiaBloco): string {
  if (block.tipo === "lista") return block.itens.join(" ");
  if (block.tipo === "tabela") return [...block.cabecalho, ...block.linhas.flat()].join(" ");
  if (block.tipo === "imagem") return [block.imagem.alt, block.imagem.caption].join(" ");
  return block.texto;
}

export function articleWordCount(article: NoticiaEditorial): number {
  return article.blocos.flatMap((block) => blockText(block).trim().split(/\s+/)).filter(Boolean)
    .length;
}

const sensitiveEditorialContext =
  /\b(?:cpf|cnpj|nota fiscal|endereço residencial|endereço completo|dados pessoais|doxxing|prontuário|laudo médico|violência sexual|abuso sexual|menor de idade|criança vítima|adolescente vítima)\b/i;
const sensitiveEditorialCategory = /\b(?:segurança pública|ocorrências policiais|violência)\b/i;

export function isArticleAdEligible(article: NoticiaEditorial): boolean {
  if (articleWordCount(article) < 650 || sensitiveEditorialCategory.test(article.categoria))
    return false;
  const editorialText = [
    article.titulo,
    article.resumo,
    ...article.blocos.map(blockText),
    ...article.notas,
  ].join(" ");
  return !sensitiveEditorialContext.test(editorialText);
}

function isPlainParagraph(part: string): boolean {
  const lines = part.trim().split("\n");
  if (!part.trim() || /^#{1,6}\s/.test(part.trim())) return false;
  if (lines.every((line) => /^\s*(?:[-*+]\s|\d+[.)]\s)/.test(line))) return false;
  if (lines.every((line) => /^\s*>\s?/.test(line))) return false;
  return true;
}

export type InArticleAdPosition = { blockIndex: number; markdownPartIndex?: number };

/** Inserts only at a complete paragraph boundary, never in a table, image, list or citation block. */
export function inArticleAdPosition(article: NoticiaEditorial): InArticleAdPosition | undefined {
  if (!isArticleAdEligible(article)) return undefined;
  const targetWords = Math.min(220, Math.floor(articleWordCount(article) * 0.4));
  let words = 0;
  for (const [blockIndex, block] of article.blocos.entries()) {
    if (block.tipo === "paragrafo") {
      words += block.texto.trim().split(/\s+/).filter(Boolean).length;
      if (words >= targetWords) return { blockIndex };
      continue;
    }
    if (block.tipo !== "markdown") continue;
    const parts = block.texto.split("\n\n");
    for (const [markdownPartIndex, part] of parts.entries()) {
      if (!isPlainParagraph(part)) continue;
      words += part.trim().split(/\s+/).filter(Boolean).length;
      if (words >= targetWords) return { blockIndex, markdownPartIndex };
    }
  }
  return undefined;
}

const initializedSlots = new WeakSet<object>();

export function pushAdSenseSlotOnce(
  element: object,
  queue: { push(value: Record<string, never>): unknown },
) {
  if (initializedSlots.has(element)) return false;
  initializedSlots.add(element);
  try {
    queue.push({});
    return true;
  } catch {
    return false;
  }
}
