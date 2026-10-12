import type { Delegacia } from "../types";
import { AVISO_RODAPE, delegaciasExtra } from "./delegacias-extra";
import { delegaciasExtra2 } from "./delegacias-extra-2";
import { delegaciasExtra3 } from "./delegacias-extra-3";
import { delegaciasExtra4 } from "./delegacias-extra-4";
import { delegaciasExtra5 } from "./delegacias-extra-5";
import { delegaciaAmericanopolis } from "./delegacia-americanopolis";
import { delegaciasExtra6 } from "./delegacias-extra-6";
import { delegaciasLeste, relacionadasLeste } from "./delegacias-leste";

interface DelegaciaSeed {
  slug: string;
  numero: string;
  ordinal: string;
  nomeOficial: string;
  bairro: string;
  regiaoSlug: string;
  bairros: string[];
  contextoTerritorial: string;
  situacoes: string[];
  conteudos: string[];
}

/**
 * Sementes de conteúdo local de desenvolvimento.
 * Nenhum dado operacional (endereço, telefone, horário, competência) é
 * informado: os campos existem no modelo e serão preenchidos via Payload CMS
 * a partir de fonte oficial verificada.
 */
const seeds: DelegaciaSeed[] = [
  {
    slug: "advogado-14-dp-pinheiros",
    numero: "14",
    ordinal: "14º",
    nomeOficial: "14º Distrito Policial — Pinheiros",
    bairro: "Pinheiros",
    regiaoSlug: "pinheiros",
    bairros: ["Pinheiros", "Vila Madalena", "Alto de Pinheiros", "Jardim Paulistano"],
    contextoTerritorial:
      "Pinheiros concentra atividade empresarial, vida noturna e uso residencial intenso, combinação que produz ocorrências de naturezas bastante distintas ao longo do dia.",
    situacoes: ["prisao-em-flagrante", "intimacao", "inquerito", "busca-e-apreensao"],
    conteudos: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    slug: "advogado-15-dp-itaim-bibi",
    numero: "15",
    ordinal: "15º",
    nomeOficial: "15º Distrito Policial — Itaim Bibi",
    bairro: "Itaim Bibi",
    regiaoSlug: "itaim-bibi",
    bairros: ["Itaim Bibi", "Vila Olímpia", "Vila Nova Conceição", "Brooklin Novo"],
    contextoTerritorial:
      "O Itaim Bibi reúne sedes corporativas e forte circulação profissional, com demandas frequentes ligadas a atividade empresarial e a patrimônio.",
    situacoes: ["investigacao-empresarial", "conflito-societario", "intimacao", "inquerito"],
    conteudos: [
      "conflitos-societarios-e-exposicao-penal",
      "intimacao-o-que-considerar-antes-de-responder",
    ],
  },
  {
    slug: "advogado-27-dp-campo-belo",
    numero: "27",
    ordinal: "27º",
    nomeOficial: "27º Distrito Policial — Campo Belo",
    bairro: "Campo Belo",
    regiaoSlug: "campo-belo",
    bairros: ["Campo Belo", "Jardim Aeroporto", "Vila Cordeiro", "Brooklin Paulista"],
    contextoTerritorial:
      "O Campo Belo é uma região residencial consolidada, próxima a eixos empresariais da zona sul, com demandas que envolvem patrimônio e relações familiares.",
    situacoes: ["intimacao", "inquerito", "bloqueio-patrimonial", "prisao-em-flagrante"],
    conteudos: [
      "intimacao-o-que-considerar-antes-de-responder",
      "protecao-patrimonial-e-planejamento-sucessorio",
    ],
  },
  {
    slug: "advogado-34-dp-morumbi",
    numero: "34",
    ordinal: "34º",
    nomeOficial: "34º Distrito Policial — Vila Sônia / Morumbi",
    bairro: "Vila Sônia/Morumbi",
    regiaoSlug: "morumbi",
    bairros: ["Morumbi", "Real Parque", "Jardim Vitória Régia", "Vila Andrade"],
    contextoTerritorial:
      "O Morumbi combina uso residencial de alto padrão e grandes equipamentos urbanos, cenário em que questões patrimoniais e de responsabilidade civil aparecem com frequência.",
    situacoes: ["bloqueio-patrimonial", "sucessao-e-patrimonio", "intimacao", "busca-e-apreensao"],
    conteudos: [
      "protecao-patrimonial-e-planejamento-sucessorio",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    slug: "advogado-51-dp-butanta",
    numero: "51",
    ordinal: "51º",
    nomeOficial: "51º Distrito Policial — Butantã",
    bairro: "Butantã",
    regiaoSlug: "butanta",
    bairros: ["Butantã", "Rio Pequeno", "Jardim Bonfiglioli", "Vila Sônia"],
    contextoTerritorial:
      "O Butantã possui perfil residencial, acadêmico e comercial, com circulação intensa e ocorrências variadas ao longo da semana.",
    situacoes: ["prisao-em-flagrante", "intimacao", "inquerito", "conflito-societario"],
    conteudos: [
      "intimacao-o-que-considerar-antes-de-responder",
      "conflitos-societarios-e-exposicao-penal",
    ],
  },
  {
    slug: "advogado-89-dp-portal-do-morumbi",
    numero: "89",
    ordinal: "89º",
    nomeOficial: "89º Distrito Policial — Portal do Morumbi",
    bairro: "Portal do Morumbi",
    regiaoSlug: "portal-do-morumbi",
    bairros: ["Portal do Morumbi", "Vila Andrade", "Jardim Ampliação", "Paraisópolis"],
    contextoTerritorial:
      "A região do Portal do Morumbi é predominantemente residencial, com forte presença de condomínios e demandas ligadas a patrimônio e convivência.",
    situacoes: ["intimacao", "inquerito", "sucessao-e-patrimonio", "bloqueio-patrimonial"],
    conteudos: [
      "protecao-patrimonial-e-planejamento-sucessorio",
      "intimacao-o-que-considerar-antes-de-responder",
    ],
  },
  {
    slug: "advogado-96-dp-brooklin",
    numero: "96",
    ordinal: "96º",
    nomeOficial: "96º Distrito Policial — Brooklin",
    bairro: "Brooklin",
    regiaoSlug: "brooklin",
    bairros: ["Brooklin Novo", "Brooklin Paulista", "Cidade Monções", "Campo Belo"],
    contextoTerritorial:
      "O Brooklin reúne uso corporativo e residencial, com demandas empresariais e patrimoniais que frequentemente exigem tratamento coordenado.",
    situacoes: ["investigacao-empresarial", "conflito-societario", "busca-e-apreensao", "intimacao"],
    conteudos: [
      "conflitos-societarios-e-exposicao-penal",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    slug: "advogado-criminal-25-dp-parelheiros",
    numero: "25",
    ordinal: "25º",
    nomeOficial: "25º Distrito Policial — Parelheiros",
    bairro: "Parelheiros",
    regiaoSlug: "parelheiros",
    bairros: ["Parelheiros", "Marsilac", "Vila Santana", "Barragem", "Sítio Represa"],
    contextoTerritorial:
      "Parelheiros e Marsilac são referências territoriais do extremo sul de São Paulo, em região de mananciais e proteção ambiental. O 25º DP — Parelheiros integra a 6ª Delegacia Seccional — Santo Amaro. Essa vinculação administrativa não permite inferir a circunscrição de um endereço; confirme a unidade responsável nos canais oficiais da Polícia Civil.",
    situacoes: ["intimacao", "inquerito", "prisao-em-flagrante"],
    conteudos: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
];

function build(seed: DelegaciaSeed): Delegacia {
  return {
    id: `dp-${seed.numero}`, slug: seed.slug,
    h1: `${seed.ordinal} DP — ${seed.bairro}`,
    cardTitulo: `${seed.ordinal} Distrito Policial`, cardSubtitulo: seed.bairro,
    cardResumo: `Guia territorial de ${seed.bairro} e dos procedimentos relacionados ao ${seed.ordinal} DP.`,
    seo: {
      title: `${seed.ordinal} DP ${seed.bairro} | Guia territorial — Banca Paulista`,
      description: `Contexto territorial de ${seed.bairro}, em São Paulo, e informações sobre intimações e procedimentos relacionados ao ${seed.ordinal} DP. Portal editorial independente.`,
      canonicalPath: `/delegacias/${seed.slug}`,
    },
    introducao: `Guia editorial da região de ${seed.bairro} e do ${seed.nomeOficial}. As referências geográficas não indicam disponibilidade de advogado nem delimitam a circunscrição policial.`,
    unidade: { numero: seed.numero, nomeOficial: seed.nomeOficial, dadosDeDesenvolvimento: true },
    contextoTerritorial: seed.contextoTerritorial, regiaoSlug: seed.regiaoSlug, bairros: seed.bairros,
    observacaoBairros: "A unidade responsável depende do endereço exato, da natureza dos fatos e da organização da Polícia Civil; bairros próximos não definem circunscrição oficial.",
    avisoRodape: AVISO_RODAPE, situacoesRelacionadas: seed.situacoes,
    faq: [
      { id: `${seed.slug}-faq-1`, pergunta: `Esta página pertence ao ${seed.ordinal} DP?`, resposta: "Não. Banca Paulista é um portal editorial independente, sem vínculo com a Polícia Civil ou com órgãos públicos." },
      { id: `${seed.slug}-faq-2`, pergunta: "Como confirmar a unidade responsável?", resposta: "Confira os documentos recebidos e os canais oficiais da Polícia Civil. A indicação de bairros nesta página não define a circunscrição policial." },
      { id: `${seed.slug}-faq-3`, pergunta: "Há advogado disponível por este portal?", resposta: "Ainda não há profissionais participantes publicados. O portal não recebe casos nem realiza consultas ou plantão de atendimento." },
    ],
    conteudosRelacionados: seed.conteudos,
  };
}

const ORDEM = [
  "advogado-14-dp-pinheiros",
  "advogado-15-dp-itaim-bibi",
  "advogado-27-dp-campo-belo",
  "advogado-34-dp-morumbi",
  "advogado-51-dp-butanta",
  "advogado-89-dp-portal-do-morumbi",
  "advogado-96-dp-brooklin",
  "advogado-criminal-11-dp-santo-amaro",
  "advogado-criminal-16-dp-vila-clementino",
  "advogado-criminal-7-dp-vila-romana",
  "advogado-criminal-23-dp-perdizes",
  "advogado-criminal-91-dp-ceagesp-vila-leopoldina",
  "advogado-criminal-78-dp-jardins",
  "advogado-criminal-93-dp-jaguare",
  "advogado-criminal-75-dp-jardim-arpoador",
  "advogado-criminal-36-dp-vila-mariana",
  "advogado-criminal-35-dp-jabaquara",
  "advogado-criminal-99-dp-campo-grande",
  "advogado-criminal-17-dp-ipiranga",
  "advogado-criminal-26-dp-sacoma",
  "advogado-criminal-102-dp-socorro",
  "advogado-criminal-37-dp-campo-limpo",
  "advogado-criminal-43-dp-cidade-ademar",
  "advogado-criminal-48-dp-cidade-dutra",
  "advogado-criminal-47-dp-capao-redondo",
  "advogado-criminal-92-dp-parque-santo-antonio",
  "advogado-criminal-100-dp-jardim-herculano",
  "advogado-criminal-80-dp-vila-joaniza",
  "advogado-criminal-97-dp-americanopolis",
  "advogado-criminal-98-dp-jardim-miriam",
  "advogado-criminal-101-dp-jardim-imbuias",
  "advogado-criminal-85-dp-jardim-mirna",
  "advogado-criminal-95-dp-heliopolis",
  "advogado-criminal-25-dp-parelheiros",
  ...delegaciasLeste.map((dp) => dp.slug),
];

/**
 * Grafo territorial interno: cada unidade aponta para vizinhas geograficamente
 * coerentes, distribuindo autoridade interna e ajudando o visitante a
 * localizar a unidade correta conforme o endereço dos fatos.
 */
const RELACIONADAS: Record<string, string[]> = {
  ...relacionadasLeste,
  "advogado-14-dp-pinheiros": [
    "advogado-criminal-7-dp-vila-romana",
    "advogado-criminal-23-dp-perdizes",
    "advogado-51-dp-butanta",
    "advogado-criminal-78-dp-jardins",
  ],
  "advogado-15-dp-itaim-bibi": [
    "advogado-14-dp-pinheiros",
    "advogado-criminal-78-dp-jardins",
    "advogado-27-dp-campo-belo",
    "advogado-96-dp-brooklin",
  ],
  "advogado-27-dp-campo-belo": [
    "advogado-15-dp-itaim-bibi",
    "advogado-96-dp-brooklin",
    "advogado-criminal-11-dp-santo-amaro",
    "advogado-criminal-35-dp-jabaquara",
  ],
  "advogado-34-dp-morumbi": [
    "advogado-89-dp-portal-do-morumbi",
    "advogado-51-dp-butanta",
    "advogado-criminal-37-dp-campo-limpo",
    "advogado-criminal-75-dp-jardim-arpoador",
  ],
  "advogado-51-dp-butanta": [
    "advogado-14-dp-pinheiros",
    "advogado-34-dp-morumbi",
    "advogado-criminal-93-dp-jaguare",
    "advogado-criminal-91-dp-ceagesp-vila-leopoldina",
  ],
  "advogado-89-dp-portal-do-morumbi": [
    "advogado-34-dp-morumbi",
    "advogado-criminal-37-dp-campo-limpo",
    "advogado-96-dp-brooklin",
    "advogado-criminal-11-dp-santo-amaro",
  ],
  "advogado-96-dp-brooklin": [
    "advogado-27-dp-campo-belo",
    "advogado-15-dp-itaim-bibi",
    "advogado-criminal-11-dp-santo-amaro",
    "advogado-criminal-35-dp-jabaquara",
  ],
  "advogado-criminal-11-dp-santo-amaro": [
    "advogado-criminal-102-dp-socorro",
    "advogado-27-dp-campo-belo",
    "advogado-96-dp-brooklin",
    "advogado-criminal-92-dp-parque-santo-antonio",
  ],
  "advogado-criminal-16-dp-vila-clementino": [
    "advogado-criminal-36-dp-vila-mariana",
    "advogado-criminal-35-dp-jabaquara",
    "advogado-criminal-17-dp-ipiranga",
    "advogado-27-dp-campo-belo",
  ],
  "advogado-criminal-7-dp-vila-romana": [
    "advogado-criminal-23-dp-perdizes",
    "advogado-criminal-91-dp-ceagesp-vila-leopoldina",
    "advogado-criminal-93-dp-jaguare",
    "advogado-14-dp-pinheiros",
  ],
  "advogado-criminal-23-dp-perdizes": [
    "advogado-criminal-7-dp-vila-romana",
    "advogado-14-dp-pinheiros",
    "advogado-criminal-91-dp-ceagesp-vila-leopoldina",
    "advogado-criminal-78-dp-jardins",
  ],
  "advogado-criminal-91-dp-ceagesp-vila-leopoldina": [
    "advogado-criminal-7-dp-vila-romana",
    "advogado-criminal-93-dp-jaguare",
    "advogado-51-dp-butanta",
    "advogado-criminal-23-dp-perdizes",
  ],
  "advogado-criminal-78-dp-jardins": [
    "advogado-14-dp-pinheiros",
    "advogado-15-dp-itaim-bibi",
    "advogado-criminal-23-dp-perdizes",
    "advogado-criminal-36-dp-vila-mariana",
  ],
  "advogado-criminal-93-dp-jaguare": [
    "advogado-criminal-91-dp-ceagesp-vila-leopoldina",
    "advogado-51-dp-butanta",
    "advogado-criminal-7-dp-vila-romana",
    "advogado-14-dp-pinheiros",
  ],
  "advogado-criminal-75-dp-jardim-arpoador": [
    "advogado-51-dp-butanta",
    "advogado-criminal-37-dp-campo-limpo",
    "advogado-34-dp-morumbi",
    "advogado-criminal-93-dp-jaguare",
  ],
  "advogado-criminal-36-dp-vila-mariana": [
    "advogado-criminal-16-dp-vila-clementino",
    "advogado-criminal-35-dp-jabaquara",
    "advogado-criminal-17-dp-ipiranga",
    "advogado-criminal-78-dp-jardins",
  ],
  "advogado-criminal-35-dp-jabaquara": [
    "advogado-criminal-97-dp-americanopolis",
    "advogado-criminal-43-dp-cidade-ademar",
    "advogado-27-dp-campo-belo",
    "advogado-criminal-16-dp-vila-clementino",
    "advogado-criminal-99-dp-campo-grande",
  ],
  "advogado-criminal-99-dp-campo-grande": [
    "advogado-criminal-48-dp-cidade-dutra",
    "advogado-criminal-102-dp-socorro",
    "advogado-criminal-43-dp-cidade-ademar",
    "advogado-criminal-35-dp-jabaquara",
  ],
  "advogado-criminal-17-dp-ipiranga": [
    "advogado-criminal-26-dp-sacoma",
    "advogado-criminal-36-dp-vila-mariana",
    "advogado-criminal-16-dp-vila-clementino",
  ],
  "advogado-criminal-26-dp-sacoma": [
    "advogado-criminal-95-dp-heliopolis",
    "advogado-criminal-17-dp-ipiranga",
    "advogado-criminal-35-dp-jabaquara",
    "advogado-criminal-16-dp-vila-clementino",
  ],
  "advogado-criminal-102-dp-socorro": [
    "advogado-criminal-101-dp-jardim-imbuias",
    "advogado-criminal-11-dp-santo-amaro",
    "advogado-criminal-99-dp-campo-grande",
    "advogado-criminal-48-dp-cidade-dutra",
    "advogado-criminal-92-dp-parque-santo-antonio",
  ],
  "advogado-criminal-37-dp-campo-limpo": [
    "advogado-34-dp-morumbi",
    "advogado-89-dp-portal-do-morumbi",
    "advogado-criminal-47-dp-capao-redondo",
    "advogado-criminal-92-dp-parque-santo-antonio",
    "advogado-criminal-100-dp-jardim-herculano",
  ],
  "advogado-criminal-43-dp-cidade-ademar": [
    "advogado-criminal-97-dp-americanopolis",
    "advogado-27-dp-campo-belo",
    "advogado-criminal-35-dp-jabaquara",
    "advogado-criminal-80-dp-vila-joaniza",
    "advogado-criminal-98-dp-jardim-miriam",
    "advogado-criminal-48-dp-cidade-dutra",
  ],
  "advogado-criminal-48-dp-cidade-dutra": [
    "advogado-criminal-85-dp-jardim-mirna",
    "advogado-criminal-99-dp-campo-grande",
    "advogado-criminal-102-dp-socorro",
    "advogado-criminal-43-dp-cidade-ademar",
    "advogado-criminal-35-dp-jabaquara",
  ],
  "advogado-criminal-47-dp-capao-redondo": [
    "advogado-criminal-37-dp-campo-limpo",
    "advogado-criminal-92-dp-parque-santo-antonio",
    "advogado-criminal-100-dp-jardim-herculano",
    "advogado-51-dp-butanta",
  ],
  "advogado-criminal-92-dp-parque-santo-antonio": [
    "advogado-criminal-37-dp-campo-limpo",
    "advogado-criminal-47-dp-capao-redondo",
    "advogado-criminal-100-dp-jardim-herculano",
    "advogado-criminal-102-dp-socorro",
  ],
  "advogado-criminal-100-dp-jardim-herculano": [
    "advogado-criminal-92-dp-parque-santo-antonio",
    "advogado-criminal-47-dp-capao-redondo",
    "advogado-criminal-102-dp-socorro",
    "advogado-criminal-37-dp-campo-limpo",
  ],
  "advogado-criminal-80-dp-vila-joaniza": [
    "advogado-criminal-97-dp-americanopolis",
    "advogado-criminal-43-dp-cidade-ademar",
    "advogado-criminal-98-dp-jardim-miriam",
    "advogado-criminal-35-dp-jabaquara",
    "advogado-27-dp-campo-belo",
  ],
  "advogado-criminal-98-dp-jardim-miriam": [
    "advogado-criminal-97-dp-americanopolis",
    "advogado-criminal-43-dp-cidade-ademar",
    "advogado-criminal-80-dp-vila-joaniza",
    "advogado-criminal-35-dp-jabaquara",
    "advogado-27-dp-campo-belo",
  ],
  "advogado-criminal-97-dp-americanopolis": [
    "advogado-criminal-35-dp-jabaquara",
    "advogado-criminal-80-dp-vila-joaniza",
    "advogado-criminal-98-dp-jardim-miriam",
    "advogado-criminal-43-dp-cidade-ademar",
    "advogado-criminal-95-dp-heliopolis",
  ],
  "advogado-criminal-101-dp-jardim-imbuias": [
    "advogado-criminal-102-dp-socorro",
    "advogado-criminal-48-dp-cidade-dutra",
    "advogado-criminal-85-dp-jardim-mirna",
    "advogado-criminal-25-dp-parelheiros",
  ],
  "advogado-criminal-85-dp-jardim-mirna": [
    "advogado-criminal-101-dp-jardim-imbuias",
    "advogado-criminal-48-dp-cidade-dutra",
    "advogado-criminal-102-dp-socorro",
    "advogado-criminal-25-dp-parelheiros",
  ],
  "advogado-criminal-95-dp-heliopolis": [
    "advogado-criminal-26-dp-sacoma",
    "advogado-criminal-17-dp-ipiranga",
    "advogado-criminal-97-dp-americanopolis",
  ],
  "advogado-criminal-25-dp-parelheiros": [
    "advogado-criminal-101-dp-jardim-imbuias",
    "advogado-criminal-85-dp-jardim-mirna",
    "advogado-criminal-48-dp-cidade-dutra",
    "advogado-criminal-47-dp-capao-redondo",
  ],
};

const base: Delegacia[] = [
  ...seeds.map(build),
  ...delegaciasExtra,
  ...delegaciasExtra2,
  ...delegaciasExtra3,
  ...delegaciasExtra4,
  ...delegaciasExtra5,
  delegaciaAmericanopolis,
  ...delegaciasExtra6,
  ...delegaciasLeste,
].sort((a, b) => ORDEM.indexOf(a.slug) - ORDEM.indexOf(b.slug));

const porSlug = new Map(base.map((dp) => [dp.slug, dp]));

export const delegacias: Delegacia[] = base.map((dp) => ({
  ...dp,
  delegaciasRelacionadas: (RELACIONADAS[dp.slug] ?? [])
    .map((slug) => porSlug.get(slug))
    .filter((vizinha): vizinha is Delegacia => Boolean(vizinha))
    .map((vizinha) => ({
      slug: vizinha.slug,
      titulo: `${vizinha.cardTitulo} ${vizinha.cardSubtitulo}`,
    })),
}));