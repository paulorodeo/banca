import type { Delegacia } from "../types";
import { AVISO_RODAPE, delegaciasExtra } from "./delegacias-extra";
import { delegaciasExtra2 } from "./delegacias-extra-2";
import { delegaciasExtra3 } from "./delegacias-extra-3";

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
];

function build(seed: DelegaciaSeed): Delegacia {
  const h1 = `Advogado criminal próximo ao ${seed.ordinal} DP ${seed.bairro}`;
  return {
    id: `dp-${seed.numero}`,
    slug: seed.slug,
    h1,
    cardTitulo: `Advogado criminal próximo ao ${seed.ordinal} DP`,
    cardSubtitulo: seed.bairro,
    cardResumo: `Atendimento jurídico na região de ${seed.bairro}, em São Paulo, incluindo procedimentos relacionados ao ${seed.nomeOficial}.`,
    seo: {
      title: `Advogado Criminal Próximo ao ${seed.ordinal} DP ${seed.bairro} | Paulo Sinigalia`,
      description: `Atuação criminal e cível estratégica na região do ${seed.ordinal} DP ${seed.bairro}, em São Paulo. Análise individualizada e atendimento reservado com Paulo Sinigalia, OAB/SP 411.502.`,
      canonicalPath: `/delegacias/${seed.slug}`,
      keywords: [
        `advogado criminal ${seed.ordinal} DP ${seed.bairro}`,
        `advogado perto do ${seed.ordinal} DP`,
        `advogado ${seed.bairro} São Paulo`,
      ],
    },
    introducao: `O escritório presta atendimento a pessoas e empresas envolvidas em situações jurídicas na região de ${seed.bairro}, em São Paulo, incluindo procedimentos que tramitam no ${seed.nomeOficial}. A atuação é conduzida de forma reservada, com análise individualizada de cada caso.`,
    unidade: {
      numero: seed.numero,
      nomeOficial: seed.nomeOficial,
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial: seed.contextoTerritorial,
    regiaoSlug: seed.regiaoSlug,
    bairros: seed.bairros,
    observacaoBairros:
      "A indicação de bairros é referência territorial de proximidade e não define a circunscrição policial responsável, que depende do endereço exato e da natureza dos fatos.",
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: seed.situacoes,
    faq: [
      {
        id: `${seed.slug}-faq-1`,
        pergunta: `O escritório atende situações relacionadas ao ${seed.ordinal} DP ${seed.bairro}?`,
        resposta: `Sim. O escritório atende pessoas e empresas envolvidas em situações jurídicas na região de ${seed.bairro}, incluindo procedimentos vinculados ao ${seed.nomeOficial}, mediante análise prévia de cada caso.`,
      },
      {
        id: `${seed.slug}-faq-2`,
        pergunta: "O escritório possui vínculo com a Polícia Civil ou com a delegacia?",
        resposta:
          "Não. Trata-se de escritório de advocacia privado, sem qualquer vínculo institucional com a Polícia Civil, com o Estado de São Paulo ou com distritos policiais. As referências a unidades policiais têm finalidade exclusivamente informativa e territorial.",
      },
      {
        id: `${seed.slug}-faq-3`,
        pergunta: "Quais informações devo reunir antes do contato?",
        resposta:
          "Informações gerais sobre o que ocorreu, eventuais documentos oficiais recebidos e prazos indicados neste material. Não é necessário enviar documentos sensíveis pelo canal de triagem inicial.",
      },
      {
        id: `${seed.slug}-faq-4`,
        pergunta: "O envio de informações iniciais garante atendimento?",
        resposta:
          "Não. O envio de informações iniciais serve apenas para análise preliminar de viabilidade. Não constitui consulta jurídica, contratação, garantia de atendimento ou de resultado.",
      },
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
];

export const delegacias: Delegacia[] = [
  ...seeds.map(build),
  ...delegaciasExtra,
  ...delegaciasExtra2,
  ...delegaciasExtra3,
].sort((a, b) => ORDEM.indexOf(a.slug) - ORDEM.indexOf(b.slug));