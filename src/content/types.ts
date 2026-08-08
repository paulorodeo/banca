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
  /**
   * Relação territorial com o endereço físico do escritório:
   * localCore (núcleo próximo), extendedArea (região ampliada)
   * ou serviceArea (demais áreas atendidas).
   */
  escopoTerritorial?: "localCore" | "extendedArea" | "serviceArea";
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