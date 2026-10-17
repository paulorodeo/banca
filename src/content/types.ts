/**
 * Content model for the Banca Paulista editorial portal.
 *
 * These interfaces mirror the collections that will later be created in
 * Payload CMS (PostgreSQL). The front-end never reads raw data directly:
 * it consumes everything through the ContentRepository service layer.
 */

export interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}

export interface Media {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface Autor {
  id: string;
  nome: string;
  oab?: string;
  cargo: string;
  bio: string;
  retrato?: Media;
}

export interface FAQ {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface AreaAtuacao {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  descricao: string;
  topicos: string[];
  destaque?: boolean;
}

export interface SituacaoJuridica {
  id: string;
  slug: string;
  titulo: string;
  descricao: string;
}

export interface Zona {
  id: string;
  slug: string;
  /** Nome de exibição (ex.: "Zona Sul"). */
  nome: string;
  /** Texto curto do card na home e no índice de regiões. */
  descricao: string;
  /** Texto de abertura (lead) da página da zona. */
  introducao: string;
  /** Seções editoriais da página da zona. */
  secoes: { titulo: string; paragrafos: string[] }[];
  artigoEditorial?: {
    titulo: string;
    secoes: { titulo?: string; paragrafos: string[] }[];
  };
}

export interface Regiao {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  bairros: string[];
  /** Rota interna de destino do card (DP ou página de região). */
  href: string;
  /** Slug da zona a que a região pertence, para sinalização geográfica. */
  zona: string;
  /** Slug da página territorial comum quando mais de um guia aponta ao mesmo território. */
  territorioSlug?: string;
}

export type InstitutionCategory =
  | "delegacias"
  | "foruns-tribunais"
  | "defensorias-publicas"
  | "conselhos-tutelares"
  | "cartorios-registros"
  | "outras-instituicoes";

/** Cadastro editorial para órgãos, departamentos e unidades públicas. */
export type PublicInstitutionCategory =
  | "ministerio-publico"
  | "policia-civil-especializada"
  | "defensoria-publica"
  | "foruns-tribunais"
  | "direitos-humanos-protecao"
  | "servicos-registrais-administrativos";

export interface PublicInstitution {
  id: string;
  slug: string;
  /** Nome e URL canônica são únicos por registro, não por bairro relacionado. */
  nomeOficial: string;
  sigla?: string;
  tipo: "orgao" | "departamento" | "unidade-atendimento" | "nucleo-especializado" | "foro-regional";
  categoria: PublicInstitutionCategory;
  descricao: string;
  contatos?: {
    tipo: "telefone" | "email" | "site" | "outro";
    rotulo: string;
    valor: string;
    href?: string;
  }[];
  endereco?: {
    texto: string;
    fonteUrl?: string;
  };
  fontes: { titulo: string; url: string; publicadaEm?: string; consultadaEm?: string }[];
  statusEditorial: "rascunho" | "revisao" | "publicado";
  relacoesTerritoriais: {
    tipoTerritorio: "bairro" | "regiao" | "zona";
    slugTerritorio: string;
    relacao: "localizada" | "relacionada";
    descricao?: string;
    fonteUrl?: string;
  }[];
  seo: SeoConfig;
}

export interface NeighborhoodInstitutionRelation {
  id: string;
  category: InstitutionCategory;
  /** Slug canônico da unidade; nunca cria uma segunda página por bairro. */
  institutionSlug: string;
  institutionType: "delegacia";
  relation: "localizada" | "relacionada";
  relationLabel: string;
}

export interface Bairro {
  id: string;
  slug: string;
  nome: string;
  zona: string;
  status: "publicado" | "revisao";
  descricao: string;
  introducao: string;
  referenciasUrbanas: string[];
  /** Recorte editorial, distinto de distrito, subprefeitura e antigo município. */
  recorteTerritorial?: string;
  viasAcessos?: { nome: string; contexto: string }[];
  servicosLocais?: { nome: string; contexto: string; fonteUrl: string }[];
  localizacao?: { descricao: string; mapaUrl?: string; mapaLabel?: string };
  fotoTerritorial?: {
    asset: string;
    alt: string;
    legenda: string;
    autor: string;
    fonteUrl: string;
    licenca: string;
    licencaUrl: string;
    width: number;
    height: number;
  };
  bairrosVizinhos: string[];
  instituicoes: NeighborhoodInstitutionRelation[];
  secoes: { titulo: string; paragrafos: string[] }[];
  faq: FAQ[];
  seo: SeoConfig;
}

export interface ConteudoJuridico {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  publicadoEm: string;
  atualizadoEm?: string;
  autorId?: string;
  /** Only verified publications are exposed by the repository. */
  status?: "publicado" | "revisao";
  corpo: string[];
  areasRelacionadas: string[];
  richText?: import("./payload").RichNode[];
  capa?: Media;
  autor?: { nome: string; bio: string; oab?: string; foto?: Media };
  seoEditorial?: { title?: string; description?: string; socialImage?: Media };
  regions?: string[];
  delegacias?: string[];
  bairros?: string[];
}

/** A publicação jornalística permanece local até haver um contrato público de notícias no CMS. */
export type NoticiaBloco =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "titulo"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "tabela"; cabecalho: string[]; linhas: string[][] }
  /** Markdown editorial local, renderizado pelo mesmo template público de notícia. */
  | { tipo: "markdown"; texto: string };

export interface NoticiaRelacionamento {
  nome: string;
  tipo: "territorio" | "instituicao";
  relacao: "direto" | "regional" | "administrativo" | "informativo";
}

export interface NoticiaFonte {
  titulo: string;
  url: string;
}

export interface NoticiaEditorial {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  publicadoEm: string;
  autoria: string;
  seo: SeoConfig;
  blocos: NoticiaBloco[];
  notas: string[];
  /** Variações para futuros cards contextuais; nunca criam outra URL. */
  manchetesContextuais?: { zona?: string; bairro?: string; instituicao?: string };
  tags?: string[];
  relacionamentos?: NoticiaRelacionamento[];
  fontes?: NoticiaFonte[];
}

export interface DelegaciaUnidade {
  /** Dados institucionais. Nunca inventar: campos vazios ficam ocultos. */
  numero: string;
  nomeOficial: string;
  endereco?: string;
  telefone?: string;
  telefoneFonte?: string;
  telefoneFonteUrl?: string;
  telefoneFontePublicadaEm?: string;
  telefoneVerificadoEm?: string;
  telefoneStatus?: "historico-pendente" | "confirmado";
  telefoneTipo?: "unidade" | "central" | "outro serviço";
  horario?: string;
  competencia?: string;
  /** Marca explicitamente conteúdo de desenvolvimento não verificado. */
  dadosDeDesenvolvimento: boolean;
}

export interface Delegacia {
  id: string;
  slug: string;
  h1: string;
  seo: SeoConfig;
  introducao: string;
  /** Título curto do card na listagem (ex.: "Advogado criminal próximo ao 7º DP"). */
  cardTitulo: string;
  /** Subtítulo do card (bairro/região). */
  cardSubtitulo: string;
  /** Texto do card na listagem. */
  cardResumo: string;
  unidade: DelegaciaUnidade;
  contextoTerritorial: string;
  regiaoSlug: string;
  bairros: string[];
  /** Seções longas de conteúdo editorial da página. */
  secoes?: { titulo: string; paragrafos?: string[]; lista?: string[] }[];
  /** Observação sobre limites de circunscrição exibida abaixo dos bairros. */
  observacaoBairros?: string;
  /** Aviso informativo padrão exibido no rodapé da página. */
  avisoRodape?: string;
  situacoesRelacionadas: string[];
  /** Unidades territorialmente próximas, para navegação interna. */
  delegaciasRelacionadas?: { slug: string; titulo: string }[];
  faq: FAQ[];
  conteudosRelacionados: string[];
}

export interface PaginaInstitucional {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  seo: SeoConfig;
  blocos: {
    titulo: string;
    paragrafos: string[];
    lista?: string[];
    complemento?: string[];
    links?: { rotulo: string; href: string }[];
    subsecoes?: {
      titulo: string;
      paragrafos: string[];
      lista?: string[];
      complemento?: string[];
    }[];
  }[];
  introducao?: string[];
  indice?: { id: string; rotulo: string }[];
  linksRelacionados?: { rotulo: string; href: string }[];
  atualizadoEm?: string;
  notaFinal?: string[];
}

export interface SiteSettings {
  nome: string;
  oab?: string;
  cidade: string;
  estado: string;
  descricaoCurta: string;
}
