import type { Bairro, Delegacia, Regiao } from "../types";
import { featuredNeighborhoods } from "./visual-media";

export interface HomeNeighborhoodHighlight {
  id: string;
  href: string;
  nome: string;
  asset: string;
  alt: string;
}

export async function homeNeighborhoodHighlights(
  regioes: Regiao[],
  bairros: Bairro[],
  resolveBairro: (slug: string) => Promise<Bairro | null>,
): Promise<HomeNeighborhoodHighlight[]> {
  const regiaoPorSlug = new Map(regioes.map((regiao) => [regiao.slug, regiao]));
  const bairroPublicadoPorSlug = new Map(
    bairros
      .filter((bairro) => bairro.status === "publicado")
      .map((bairro) => [bairro.slug, bairro]),
  );

  return Promise.all(
    featuredNeighborhoods.map(async (item) => {
      const bairro = bairroPublicadoPorSlug.get(item.territorioId);
      if (!bairro) return null;

      const regiao = regiaoPorSlug.get(item.territorioId);
      if (!regiao) return null;

      // A lista publicada e a resolução do repositório precisam concordar.
      // O formato da URL isoladamente não torna um bairro publicável.
      const resolvido = await resolveBairro(bairro.slug);
      if (
        !resolvido ||
        resolvido.status !== "publicado" ||
        resolvido.slug !== bairro.slug ||
        regiao.slug !== resolvido.slug ||
        resolvido.seo.canonicalPath !== `/bairros/${resolvido.slug}`
      )
        return null;

      return {
        id: `territorio-${resolvido.slug}`,
        href: resolvido.seo.canonicalPath,
        nome: resolvido.nome,
        asset: item.asset,
        alt: item.alt,
      };
    }),
  ).then((items) => items.filter((item): item is HomeNeighborhoodHighlight => item !== null));
}

const featuredDistrictSlugs = [
  "advogado-criminal-7-dp-vila-romana",
  "advogado-14-dp-pinheiros",
  "advogado-criminal-23-dp-perdizes",
  "advogado-criminal-78-dp-jardins",
  "advogado-27-dp-campo-belo",
] as const;

const titleBySlug: Record<(typeof featuredDistrictSlugs)[number], string> = {
  "advogado-criminal-7-dp-vila-romana": "7º Distrito Policial, Vila Romana",
  "advogado-14-dp-pinheiros": "14º Distrito Policial de Pinheiros",
  "advogado-criminal-23-dp-perdizes": "23º Distrito Policial, Perdizes",
  "advogado-criminal-78-dp-jardins": "78º Distrito Policial, Jardins",
  "advogado-27-dp-campo-belo": "27º DP Campo Belo",
};

export function homeFeaturedDistricts(delegacias: Delegacia[]) {
  const porSlug = new Map(delegacias.map((guia) => [guia.slug, guia]));
  return featuredDistrictSlugs.map((slug) => {
    const guia = porSlug.get(slug);
    if (!guia) throw new Error(`Guia destacado não publicado: ${slug}`);
    return { guia, titulo: titleBySlug[slug] };
  });
}
