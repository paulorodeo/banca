import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Gavel,
  House,
  Landmark,
  Scale,
  ShieldCheck,
  UsersRound,
  Wheat,
} from "lucide-react";

export type NoticiaCategoria = {
  slug: string;
  nome: string;
  descricao: string;
  icone: LucideIcon;
};

export const categoriasNoticias = [
  {
    slug: "justica-tribunais",
    nome: "Justiça e Tribunais",
    descricao: "Decisões e processos públicos",
    icone: Gavel,
  },
  {
    slug: "policia-seguranca",
    nome: "Polícia e Segurança",
    descricao: "Ocorrências e serviços públicos",
    icone: ShieldCheck,
  },
  {
    slug: "ministerio-publico-defensoria",
    nome: "Ministério Público e Defensoria",
    descricao: "Atuação e direitos coletivos",
    icone: Landmark,
  },
  {
    slug: "legislacao-direitos",
    nome: "Legislação e Direitos",
    descricao: "Normas, cidadania e garantias",
    icone: Scale,
  },
  {
    slug: "politica-sociedade",
    nome: "Política e Sociedade",
    descricao: "Debates e vida pública",
    icone: UsersRound,
  },
  {
    slug: "cidades-urbanismo",
    nome: "Cidades e Urbanismo",
    descricao: "Mobilidade, obras e território",
    icone: Building2,
  },
  {
    slug: "mercado-imobiliario",
    nome: "Mercado Imobiliário",
    descricao: "Habitação e patrimônio urbano",
    icone: House,
  },
  {
    slug: "agronegocio-rural",
    nome: "Agronegócio e Rural",
    descricao: "Campo, produção e território",
    icone: Wheat,
  },
  {
    slug: "economia-negocios",
    nome: "Economia e Negócios",
    descricao: "Investimentos e atividade econômica",
    icone: BriefcaseBusiness,
  },
  {
    slug: "mercado-juridico",
    nome: "Mercado Jurídico",
    descricao: "Profissão e serviços jurídicos",
    icone: BookOpenCheck,
  },
] as const satisfies readonly NoticiaCategoria[];

export type NoticiaCategoriaSlug = (typeof categoriasNoticias)[number]["slug"];

export const categoriaNoticiaPorId: Record<string, NoticiaCategoriaSlug> = {
  "noticia-retrofit-centro-2026": "mercado-imobiliario",
  "noticia-favela-moinho-2026": "politica-sociedade",
  "noticia-temporal-anhangabau-2026": "ministerio-publico-defensoria",
  "noticia-roubos-marginal-pinheiros-89-dp": "policia-seguranca",
  "noticia-paraisopolis-mochila-oito-tipos-drogas": "policia-seguranca",
  "noticia-titulos-propriedade-capela-do-socorro": "legislacao-direitos",
  "noticia-invasao-mansao-matsunaga-alto-de-pinheiros": "policia-seguranca",
  "noticia-bosque-salesianos-alto-da-lapa": "justica-tribunais",
  "noticia-investimentos-zona-oeste-lapa": "economia-negocios",
  "noticia-pm-mata-mulher-pirituba": "justica-tribunais",
  "noticia-2846-imoveis-zona-norte": "mercado-imobiliario",
  "noticia-obras-enchentes-corrego-paciencia": "cidades-urbanismo",
  "zona-leste-01": "policia-seguranca",
  "zona-leste-02": "cidades-urbanismo",
  "zona-leste-03": "cidades-urbanismo",
};

export function encontraCategoriaNoticia(slug: string | undefined) {
  return categoriasNoticias.find((categoria) => categoria.slug === slug);
}
