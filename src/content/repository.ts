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
  Zona,
} from "./types";
import { areas, situacoes } from "./local/areas";
import { regioes } from "./local/regioes";
import { zonas } from "./local/zonas";
import { delegacias } from "./local/delegacias";
import { paginas } from "./local/paginas";
import { autores, siteSettings } from "./local/settings";
import { readArticle, readArticles } from "./articles.functions";

export interface ContentRepository {
  getSettings(): Promise<SiteSettings>;
  listAreas(): Promise<AreaAtuacao[]>;
  getArea(slug: string): Promise<AreaAtuacao | null>;
  listSituacoes(): Promise<SituacaoJuridica[]>;
  listRegioes(): Promise<Regiao[]>;
  getRegiao(slug: string): Promise<Regiao | null>;
  listZonas(): Promise<Zona[]>;
  getZona(slug: string): Promise<Zona | null>;
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
  async listZonas() {
    return zonas;
  }
  async getZona(slug: string) {
    return find(zonas, slug);
  }
  async listConteudos() {
    const result = await readArticles({ data: { page: 1, limit: 12, sort: '-publishedAt', category: '' } });
    if (!result.ok) throw new Error(result.error);
    return result.page.docs;
  }
  async getConteudo(slug: string) {
    const result = await readArticle({ data: { slug } });
    if (!result.ok) throw new Error(result.error);
    return result.article;
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

/** Territorial reads stay local; all article reads cross the server boundary. */
export const content: ContentRepository = new LocalContentRepository();