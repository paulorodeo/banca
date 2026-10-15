import type { Bairro, Delegacia, Regiao, Zona } from "../types";
import { montarIndiceTerritorial } from "./indice-territorial";
import { featuredNeighborhoods } from "./visual-media";

export interface HomeNeighborhoodHighlight {
  id: string;
  nome: string;
  asset: string;
  alt: string;
  paginaBairro?: string;
  guias: { slug: string; numero: string; nome: string }[];
}

export function homeNeighborhoodHighlights(
  regioes: Regiao[],
  delegacias: Delegacia[],
  bairros: Bairro[],
  zonas: Zona[],
): HomeNeighborhoodHighlight[] {
  const indice = montarIndiceTerritorial(regioes, delegacias, bairros, zonas);
  const porId = new Map(indice.map((territorio) => [territorio.id, territorio]));
  const lapaConjunta = regioes.find((regiao) => regiao.slug === "lapa");

  return featuredNeighborhoods.map((item) => {
    const territorio = porId.get(`territorio-${item.territorioId}`);
    if (!territorio) throw new Error(`Território destacado não cadastrado: ${item.territorioId}`);
    // O registro local da Lapa reúne Lapa e Vila Romana em uma referência
    // editorial. A homepage preserva esse nome sem criar páginas separadas.
    const nome =
      item.territorioId === "lapa" ? (lapaConjunta?.nome ?? territorio.nome) : territorio.nome;
    return {
      id: territorio.id,
      nome,
      asset: item.asset,
      alt: item.alt,
      ...(territorio.paginaBairro ? { paginaBairro: territorio.paginaBairro } : {}),
      guias: territorio.guias,
    };
  });
}

const featuredDistrictSlugs = [
  "advogado-criminal-7-dp-vila-romana",
  "advogado-14-dp-pinheiros",
  "advogado-criminal-23-dp-perdizes",
  "advogado-criminal-78-dp-jardins",
] as const;

const titleBySlug: Record<(typeof featuredDistrictSlugs)[number], string> = {
  "advogado-criminal-7-dp-vila-romana": "7º Distrito Policial, Vila Romana",
  "advogado-14-dp-pinheiros": "14º Distrito Policial de Pinheiros",
  "advogado-criminal-23-dp-perdizes": "23º Distrito Policial, Perdizes",
  "advogado-criminal-78-dp-jardins": "78º Distrito Policial, Jardins",
};

export function homeFeaturedDistricts(delegacias: Delegacia[]) {
  const porSlug = new Map(delegacias.map((guia) => [guia.slug, guia]));
  return featuredDistrictSlugs.map((slug) => {
    const guia = porSlug.get(slug);
    if (!guia) throw new Error(`Guia destacado não publicado: ${slug}`);
    return { guia, titulo: titleBySlug[slug] };
  });
}
