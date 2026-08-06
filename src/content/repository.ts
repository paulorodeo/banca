/**
 * Camada de serviço de conteúdo.
 *
 * O front-end consome exclusivamente `content` (instância de ContentRepository).
 * Hoje ela é servida por dados locais de desenvolvimento; futuramente será
 * substituída por uma implementação REST apontando para o Payload CMS
 * (`CMS_API_URL`), sem alteração nas páginas ou componentes.
 */
import type {
  AreaAtuacao,
  Autor,
  ConteudoJuridico,
  Delegacia,
  PaginaInstitucional,
  Regiao,
  SiteSettings,
  SituacaoJuridica,
} from "./types";
import { areas, situacoes } from "./local/areas";
import { regioes } from "./local/regioes";
import { conteudos } from "./local/conteudos";
import { delegacias } from "./local/delegacias";
import { paginas } from "./local/paginas";
import { autores, siteSettings } from "./local/settings";

export interface ContentRepository {
  getSettings(): Promise<SiteSettings>;
  listAreas(): Promise<AreaAtuacao[]>;
  getArea(slug: string): Promise<AreaAtuacao | null>;
  listSituacoes(): Promise<SituacaoJuridica[]>;
  listRegioes(): Promise<Regiao[]>;
  getRegiao(slug: string): Promise<Regiao | null>;
  listConteudos(): Promise<ConteudoJuridico[]>;
  getConteudo(slug: string): Promise<ConteudoJuridico | null>;
  listDelegacias(): Promise<Delegacia[]>;
  getDelegacia(slug: string): Promise<Delegacia | null>;
  getPagina(slug: string): Promise<PaginaInstitucional | null>;
  getAutor(id: string): Promise<Autor | null>;
}

const find = <T extends { slug: string }>(list: T[], slug: string): T | null =>
  list.find((item) => item.slug === slug) ?? null;

export class LocalContentRepository implements ContentRepository {
  async getSettings() {
    return siteSettings;
  }
  async listAreas() {
    return areas;
  }
  async getArea(slug: string) {
    return find(areas, slug);
  }
  async listSituacoes() {
    return situacoes;
  }
  async listRegioes() {
    return regioes;
  }
  async getRegiao(slug: string) {
    return find(regioes, slug);
  }
  async listConteudos() {
    return [...conteudos].sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));
  }
  async getConteudo(slug: string) {
    return find(conteudos, slug);
  }
  async listDelegacias() {
    return delegacias;
  }
  async getDelegacia(slug: string) {
    return find(delegacias, slug);
  }
  async getPagina(slug: string) {
    return find(paginas, slug);
  }
  async getAutor(id: string) {
    return autores.find((a) => a.id === id) ?? null;
  }
}

/**
 * Adaptador do feed de artigos do Payload CMS.
 *
 * Ativado automaticamente quando `VITE_CMS_API_URL` está definido.
 * A coleção esperada é `artigos`, com os campos: slug, titulo, resumo,
 * categoria, publicadoEm, atualizadoEm, autorId, corpo[], areasRelacionadas[].
 * Em caso de indisponibilidade da API, o conteúdo local é utilizado como
 * fallback para não derrubar a página.
 */
interface PayloadDoc extends Partial<ConteudoJuridico> {
  id?: string;
  slug?: string;
}

function toConteudo(doc: PayloadDoc): ConteudoJuridico {
  return {
    id: String(doc.id ?? doc.slug ?? ""),
    slug: doc.slug ?? "",
    titulo: doc.titulo ?? "",
    resumo: doc.resumo ?? "",
    categoria: doc.categoria ?? "Artigo",
    publicadoEm: doc.publicadoEm ?? new Date().toISOString().slice(0, 10),
    ...(doc.atualizadoEm ? { atualizadoEm: doc.atualizadoEm } : {}),
    autorId: doc.autorId ?? "paulo-sinigalia",
    corpo: doc.corpo ?? [],
    areasRelacionadas: doc.areasRelacionadas ?? [],
  };
}

export class PayloadContentRepository extends LocalContentRepository {
  constructor(private readonly baseUrl: string) {
    super();
  }

  private async fetchArtigos(query = ""): Promise<ConteudoJuridico[] | null> {
    try {
      const res = await fetch(`${this.baseUrl}/api/artigos?limit=100&depth=0${query}`);
      if (!res.ok) return null;
      const json = (await res.json()) as { docs?: PayloadDoc[] };
      return (json.docs ?? []).map(toConteudo);
    } catch {
      return null;
    }
  }

  override async listConteudos() {
    const docs = await this.fetchArtigos("&sort=-publicadoEm");
    return docs ?? super.listConteudos();
  }

  override async getConteudo(slug: string) {
    const docs = await this.fetchArtigos(`&where[slug][equals]=${encodeURIComponent(slug)}`);
    if (!docs) return super.getConteudo(slug);
    return docs[0] ?? null;
  }
}

const CMS_API_URL = import.meta.env["VITE_CMS_API_URL"] as string | undefined;

/**
 * Ponto único de troca de fonte de dados: as páginas seguem consumindo
 * `content` sem alteração quando o Payload for conectado.
 */
export const content: ContentRepository = CMS_API_URL
  ? new PayloadContentRepository(CMS_API_URL.replace(/\/$/, ""))
  : new LocalContentRepository();