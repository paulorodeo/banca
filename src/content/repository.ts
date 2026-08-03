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
 * Ponto de troca para o Payload CMS.
 * Quando `CMS_API_URL` estiver definido, instanciar aqui um
 * `PayloadContentRepository` que consome a API REST do Payload
 * (ex.: `${CMS_API_URL}/api/delegacias?where[slug][equals]=...`).
 */
export const content: ContentRepository = new LocalContentRepository();