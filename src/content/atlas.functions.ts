import { createServerFn } from "@tanstack/react-start";
import { categoriaNoticiaPorId } from "./local/noticia-categorias";
import { noticias } from "./local/noticias";
import type { Media } from "./types";

export type AtlasLayer =
  | "noticias"
  | "justica"
  | "politica"
  | "economia"
  | "agronegocio"
  | "clima"
  | "infraestrutura"
  | "rodovias"
  | "populacao";

export type AtlasEditorialItem = {
  id: string;
  slug?: string;
  titulo: string;
  resumo: string;
  categoria: string;
  categoriaId?: string;
  editorias: AtlasLayer[];
  publicadoEm?: string;
  imagem?: Media;
  ufs: string[];
  ufPrincipal?: string;
  regiao?: string;
  isDemo: boolean;
};

const layerByCategory: Partial<Record<string, AtlasLayer[]>> = {
  "justica-tribunais": ["justica"],
  "legislacao-direitos": ["justica"],
  "ministerio-publico-defensoria": ["justica"],
  "politica-sociedade": ["politica"],
  "mercado-imobiliario": ["economia"],
  "economia-negocios": ["economia"],
  "agronegocio-rural": ["agronegocio"],
  "cidades-urbanismo": ["infraestrutura"],
};

const spLocationPattern =
  /\b(?:São Paulo|S\.P\.|Zona (?:Norte|Sul|Leste|Oeste)|Pirituba|Paraisópolis|Capela do Socorro|Alto de Pinheiros|Anhangabaú|Lapa|Pinheiros|Brasilândia|Jaçanã|Tremembé|Ribeirão Preto|Altinópolis|Franca)\b/i;

function atlasItemFromPublishedNews(item: (typeof noticias)[number]): AtlasEditorialItem {
  // A coleção de notícias mantém algumas relações em formatos legados; esta leitura
  // apenas extrai nomes existentes e não infere um território a partir de instituição.
  const relationData: unknown = item.relacionamentos;
  let territoryNames: string[] = [];
  if (Array.isArray(relationData)) {
    territoryNames = relationData
      .filter((relation) => relation?.tipo === "territorio")
      .map((relation) => String(relation.nome ?? ""));
  } else if (relationData && typeof relationData === "object") {
    const territories = (relationData as { territorios?: unknown }).territorios;
    if (Array.isArray(territories))
      territoryNames = territories.map((territory) => String(territory?.nome ?? ""));
  }
  const evidence = [item.titulo, item.resumo, ...territoryNames].join(" ");
  const ufs = spLocationPattern.test(evidence) ? ["SP"] : [];
  const categoryId = categoriaNoticiaPorId[item.id];
  return {
    id: item.id,
    slug: item.slug,
    titulo: item.titulo,
    resumo: item.resumo,
    categoria: item.categoria,
    ...(categoryId ? { categoriaId: categoryId } : {}),
    editorias: ["noticias", ...(categoryId ? (layerByCategory[categoryId] ?? []) : [])],
    publicadoEm: item.publicadoEm,
    ...(item.imagem ? { imagem: item.imagem } : {}),
    ufs,
    ...(ufs.length ? { ufPrincipal: ufs[0], regiao: "Sudeste" } : {}),
    isDemo: false,
  };
}

const demoEnabled =
  import.meta.env["VITE_ATLAS_DEMO"] === "true" &&
  (import.meta.env.DEV || import.meta.env.MODE === "staging");

export const readAtlasEditorial = createServerFn({ method: "GET" }).handler(
  async (): Promise<AtlasEditorialItem[]> => {
    const published = [...noticias]
      .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm))
      .map(atlasItemFromPublishedNews);
    if (!demoEnabled) return published;

    const { atlasDemoNews } = await import("./demo/atlasNoticias");
    return [...atlasDemoNews, ...published];
  },
);
