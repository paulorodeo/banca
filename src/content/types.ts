/**
 * Content model for the Paulo Sinigalia platform.
 *
 * These interfaces mirror the collections that will later be created in
 * Payload CMS (PostgreSQL). The front-end never reads raw data directly:
 * it consumes everything through the ContentRepository service layer.
 */

export interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
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
  oab: string;
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

export interface Regiao {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  bairros: string[];
  /** Rota interna de destino do card (DP ou página de região). */
  href: string;
}

export interface ConteudoJuridico {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  publicadoEm: string;
  atualizadoEm?: string;
  autorId: string;
  corpo: string[];
  areasRelacionadas: string[];
}

export interface DelegaciaUnidade {
  /** Dados institucionais. Nunca inventar: campos vazios ficam ocultos. */
  numero: string;
  nomeOficial: string;
  endereco?: string;
  telefone?: string;
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
  unidade: DelegaciaUnidade;
  contextoTerritorial: string;
  regiaoSlug: string;
  bairros: string[];
  situacoesRelacionadas: string[];
  faq: FAQ[];
  conteudosRelacionados: string[];
}

export interface PaginaInstitucional {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  seo: SeoConfig;
  blocos: { titulo: string; paragrafos: string[] }[];
}

export interface SiteSettings {
  nome: string;
  advogado: string;
  oab: string;
  cidade: string;
  estado: string;
  descricaoCurta: string;
}