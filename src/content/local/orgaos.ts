import type { PublicInstitution, PublicInstitutionCategory } from "../types";

/**
 * Taxonomia editorial compartilhada pelo menu e pelo índice de órgãos.
 * Ela agrupa fichas já publicadas sem alterar a categoria técnica do cadastro.
 */
export interface OrgaosCategory {
  id: string;
  nome: string;
  categorias: PublicInstitutionCategory[];
}

export const categoriasOrgaos: OrgaosCategory[] = [
  {
    id: "policia-investigacao",
    nome: "Polícia e Investigação",
    categorias: ["policia-civil-especializada"],
  },
  { id: "ministerio-publico", nome: "Ministério Público", categorias: ["ministerio-publico"] },
  { id: "defensoria-publica", nome: "Defensoria Pública", categorias: ["defensoria-publica"] },
  { id: "justica-tribunais", nome: "Justiça e Tribunais", categorias: ["foruns-tribunais"] },
  {
    id: "cartorios-registros",
    nome: "Cartórios e Registros",
    categorias: ["servicos-registrais-administrativos"],
  },
  {
    id: "protecao-direitos",
    nome: "Proteção de Direitos",
    categorias: ["direitos-humanos-protecao"],
  },
  {
    id: "servicos-publicos-administrativos",
    nome: "Serviços Públicos e Administrativos",
    categorias: [],
  },
];

export interface OrgaosCategoryWithInstitutions extends OrgaosCategory {
  instituicoes: PublicInstitution[];
}

export function categoriasComInstituicoes(
  instituicoes: PublicInstitution[],
): OrgaosCategoryWithInstitutions[] {
  return categoriasOrgaos.map((categoria) => ({
    ...categoria,
    instituicoes: instituicoes.filter((institution) =>
      categoria.categorias.includes(institution.categoria),
    ),
  }));
}
