/** Primeiro lote editorial. Candidatos sem confirmação vigente ficam fora deste módulo. */
export type CategoriaPessoa =
  | "policia-civil"
  | "ministerio-publico"
  | "judiciario"
  | "oab-conselhos"
  | "defensoria-direitos"
  | "ensino-pesquisa";

export interface PessoaEditorial {
  id: string;
  nome: string;
  aliases?: string[];
  categoria: CategoriaPessoa;
  status: "publicado";
}

export interface InstituicaoReferenciada {
  id: string;
  nome: string;
  urlOficial: string;
  paginaNoPortal?: string;
}

export interface VinculoInstitucional {
  id: string;
  pessoaId: string;
  instituicaoId: string;
  cargo: string;
  funcao: string;
  periodo?: string;
  situacao: "atual" | "anterior" | "nao-confirmada";
  referenciaTerritorial?: string;
}

export interface EvidenciaPessoa {
  vinculoId: string;
  url: string;
  titulo: string;
  consultadaEm: string;
  publicadaEm?: string;
  situacaoEditorial: "confirmada" | "revisao-pendente";
}

export const instituicoesReferenciadas: InstituicaoReferenciada[] = [
  {
    id: "tjsp",
    nome: "Tribunal de Justiça de São Paulo",
    urlOficial: "https://portal.tjsp.jus.br/QuemSomos/Presidencia",
  },
  {
    id: "dpesp",
    nome: "Defensoria Pública do Estado de São Paulo",
    urlOficial:
      "https://www.defensoria.sp.def.br/institucional/defensoria-publica-geral/institucional-dpg",
  },
  {
    id: "oab-pinheiros",
    nome: "93ª Subseção da OAB-SP, Pinheiros",
    urlOficial: "https://www.oabsp.org.br/subsecao/pinheiros",
  },
];

export const pessoasEditoriais: PessoaEditorial[] = [
  {
    id: "francisco-eduardo-loureiro",
    nome: "Francisco Eduardo Loureiro",
    categoria: "judiciario",
    status: "publicado",
  },
  {
    id: "luciana-jordao-da-motta-armiliato-de-carvalho",
    nome: "Luciana Jordão da Motta Armiliato de Carvalho",
    aliases: ["Luciana Jordao da Motta Armiliato de Carvalho"],
    categoria: "defensoria-direitos",
    status: "publicado",
  },
  {
    id: "adriano-scalzaretto",
    nome: "Adriano Scalzaretto",
    categoria: "oab-conselhos",
    status: "publicado",
  },
];

export const vinculosInstitucionais: VinculoInstitucional[] = [
  {
    id: "loureiro-presidencia-tjsp-2026",
    pessoaId: "francisco-eduardo-loureiro",
    instituicaoId: "tjsp",
    cargo: "Presidente do TJSP",
    funcao: "Presidência do Tribunal",
    periodo: "Biênio 2026/2027",
    situacao: "atual",
  },
  {
    id: "luciana-dpg-2026",
    pessoaId: "luciana-jordao-da-motta-armiliato-de-carvalho",
    instituicaoId: "dpesp",
    cargo: "Defensora Pública-Geral",
    funcao: "Administração superior da Defensoria",
    periodo: "Biênio 2026/2028",
    situacao: "atual",
  },
  {
    id: "adriano-oab-pinheiros-2025",
    pessoaId: "adriano-scalzaretto",
    instituicaoId: "oab-pinheiros",
    cargo: "Presidente da 93ª Subseção",
    funcao: "Presidência da subseção",
    periodo: "Gestão 2025/2027",
    situacao: "atual",
    referenciaTerritorial: "Pinheiros, Zona Oeste",
  },
];

export const evidenciasPessoas: EvidenciaPessoa[] = [
  {
    vinculoId: "loureiro-presidencia-tjsp-2026",
    url: "https://portal.tjsp.jus.br/QuemSomos/Presidencia",
    titulo: "Presidência do TJSP",
    consultadaEm: "2026-10-15",
    situacaoEditorial: "confirmada",
  },
  {
    vinculoId: "luciana-dpg-2026",
    url: "https://www.defensoria.sp.def.br/institucional/defensoria-publica-geral/institucional-dpg",
    titulo: "Defensoria Pública-Geral",
    consultadaEm: "2026-10-15",
    situacaoEditorial: "confirmada",
  },
  {
    vinculoId: "adriano-oab-pinheiros-2025",
    url: "https://www.oabsp.org.br/subsecao/pinheiros",
    titulo: "Composição da OAB Pinheiros",
    consultadaEm: "2026-10-15",
    situacaoEditorial: "confirmada",
  },
];

export interface RegistroInstitucional {
  pessoa: PessoaEditorial;
  vinculo: VinculoInstitucional;
  instituicao: InstituicaoReferenciada;
  evidencia: EvidenciaPessoa;
}

export function listarRegistrosInstitucionais(): RegistroInstitucional[] {
  return vinculosInstitucionais
    .flatMap((vinculo) => {
      const pessoa = pessoasEditoriais.find((item) => item.id === vinculo.pessoaId);
      const instituicao = instituicoesReferenciadas.find(
        (item) => item.id === vinculo.instituicaoId,
      );
      const evidencia = evidenciasPessoas.find((item) => item.vinculoId === vinculo.id);
      if (
        !pessoa ||
        !instituicao ||
        !evidencia ||
        pessoa.status !== "publicado" ||
        vinculo.situacao !== "atual" ||
        evidencia.situacaoEditorial !== "confirmada"
      )
        return [];
      return [{ pessoa, vinculo, instituicao, evidencia }];
    })
    .sort((a, b) => a.pessoa.nome.localeCompare(b.pessoa.nome, "pt-BR"));
}

export function normalizarBuscaPessoa(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .trim();
}

export function buscarRegistrosInstitucionais(
  registros: RegistroInstitucional[],
  busca: string,
  categoria = "todas",
): RegistroInstitucional[] {
  const termo = normalizarBuscaPessoa(busca);
  return registros.filter(({ pessoa, vinculo, instituicao }) => {
    if (categoria !== "todas" && pessoa.categoria !== categoria) return false;
    return (
      !termo ||
      [
        pessoa.nome,
        ...(pessoa.aliases ?? []),
        vinculo.cargo,
        vinculo.funcao,
        instituicao.nome,
      ].some((valor) => normalizarBuscaPessoa(valor).includes(termo))
    );
  });
}
