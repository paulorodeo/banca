import type { Delegacia, Regiao } from "../types";
import { AVISO_RODAPE } from "./delegacias-extra";

interface DistritoLeste {
  numero: number;
  nome: string;
  localSlug: string;
  eixo: string;
  nomeOficialVerificado?: string;
  referenciasAdicionais?: string[];
}

// Agrupamentos de navegação editorial, nunca mapas de circunscrição policial.
export const distritosLeste: DistritoLeste[] = [
  { numero: 8, nome: "Brás", localSlug: "bras", eixo: "mooca" },
  { numero: 10, nome: "Penha", localSlug: "penha", eixo: "penha" },
  { numero: 18, nome: "Alto da Mooca", localSlug: "alto-da-mooca", eixo: "mooca" },
  {
    numero: 21,
    nome: "Chácara Seis de Outubro",
    localSlug: "chacara-seis-de-outubro",
    eixo: "penha",
  },
  { numero: 22, nome: "Vila Americana", localSlug: "vila-americana", eixo: "sao-miguel" },
  { numero: 24, nome: "Ponte Rasa", localSlug: "ponte-rasa", eixo: "ermelino" },
  { numero: 29, nome: "Vila Diva", localSlug: "vila-diva", eixo: "aricanduva" },
  { numero: 30, nome: "Tatuapé", localSlug: "tatuape", eixo: "tatuape" },
  { numero: 31, nome: "Vila Carrão", localSlug: "vila-carrao", eixo: "aricanduva" },
  { numero: 32, nome: "Itaquera", localSlug: "itaquera", eixo: "itaquera" },
  { numero: 41, nome: "Vila Rica", localSlug: "vila-rica", eixo: "sapopemba" },
  { numero: 42, nome: "Parque São Lucas", localSlug: "parque-sao-lucas", eixo: "sapopemba" },
  { numero: 44, nome: "Guaianases", localSlug: "guaianases", eixo: "guaianases" },
  { numero: 49, nome: "São Mateus", localSlug: "sao-mateus", eixo: "sao-mateus" },
  { numero: 50, nome: "Itaim Paulista", localSlug: "itaim-paulista", eixo: "itaim-paulista" },
  { numero: 52, nome: "Parque São Jorge", localSlug: "parque-sao-jorge", eixo: "tatuape" },
  { numero: 53, nome: "Parque do Carmo", localSlug: "parque-do-carmo", eixo: "itaquera" },
  { numero: 54, nome: "Cidade Tiradentes", localSlug: "cidade-tiradentes", eixo: "guaianases" },
  {
    numero: 55,
    nome: "Parque São Rafael",
    localSlug: "parque-sao-rafael",
    eixo: "sao-mateus",
    nomeOficialVerificado: "55º Distrito Policial — Parque São Rafael",
  },
  { numero: 56, nome: "Vila Alpina", localSlug: "vila-alpina", eixo: "mooca" },
  { numero: 57, nome: "Parque da Mooca", localSlug: "parque-da-mooca", eixo: "mooca" },
  { numero: 58, nome: "Vila Formosa", localSlug: "vila-formosa", eixo: "aricanduva" },
  {
    numero: 59,
    nome: "Jardim dos Ipês",
    localSlug: "jardim-noemia",
    eixo: "sao-mateus",
    nomeOficialVerificado: "59º Distrito Policial — Jardim dos Ipês",
    referenciasAdicionais: ["Jardim Noêmia"],
  },
  { numero: 62, nome: "Ermelino Matarazzo", localSlug: "ermelino-matarazzo", eixo: "ermelino" },
  { numero: 63, nome: "Vila Jacuí", localSlug: "vila-jacui", eixo: "sao-miguel" },
  { numero: 64, nome: "Cidade A. E. Carvalho", localSlug: "cidade-a-e-carvalho", eixo: "itaquera" },
  { numero: 65, nome: "Artur Alvim", localSlug: "artur-alvim", eixo: "itaquera" },
  { numero: 66, nome: "Jardim Aricanduva", localSlug: "jardim-aricanduva", eixo: "aricanduva" },
  { numero: 67, nome: "Jardim Robru", localSlug: "jardim-robru", eixo: "itaim-paulista" },
  { numero: 68, nome: "Lajeado", localSlug: "lajeado", eixo: "guaianases" },
  { numero: 69, nome: "Teotônio Vilela", localSlug: "teotonio-vilela", eixo: "sao-mateus" },
  { numero: 70, nome: "Sapopemba", localSlug: "sapopemba", eixo: "sapopemba" },
  { numero: 81, nome: "Belém", localSlug: "belem", eixo: "tatuape" },
  { numero: 103, nome: "Itaquera", localSlug: "itaquera-103-dp", eixo: "itaquera" },
];

function slugDistrito(dp: DistritoLeste): string {
  // O número distingue os dois DPs de Itaquera sem mudar a convenção pública.
  const lugar = dp.numero === 103 ? "itaquera" : dp.localSlug;
  return `advogado-criminal-${dp.numero}-dp-${lugar}`;
}

const referenciasDoEixo = (dp: DistritoLeste) =>
  distritosLeste.filter((outro) => outro.eixo === dp.eixo && outro.numero !== dp.numero);

export const regioesLeste: Regiao[] = distritosLeste.map((dp) => ({
  id: `reg-${dp.localSlug}`,
  slug: dp.localSlug,
  nome: dp.nome,
  descricao: `Guia do ${dp.numero}º DP — ${dp.nome}: identificação da unidade, intimações e documentos de procedimentos policiais.`,
  bairros: [dp.nome, ...(dp.referenciasAdicionais ?? [])],
  href: `/delegacias/${slugDistrito(dp)}`,
  zona: "zona-leste",
  ...(dp.numero === 103 ? { territorioSlug: "itaquera" } : {}),
}));

export const relacionadasLeste: Record<string, string[]> = Object.fromEntries(
  distritosLeste.map((dp) => [slugDistrito(dp), referenciasDoEixo(dp).map(slugDistrito)]),
);

export const delegaciasLeste: Delegacia[] = distritosLeste.map((dp) => {
  const slug = slugDistrito(dp);
  const unidade = dp.nomeOficialVerificado ?? `${dp.numero}º Distrito Policial de São Paulo`;
  const outros = referenciasDoEixo(dp)
    .map((outro) => `${outro.numero}º DP — ${outro.nome}`)
    .join(", ");
  return {
    id: `dp-${dp.numero}`,
    slug,
    h1: `${dp.numero}º DP — ${dp.nome}`,
    cardTitulo: `${dp.numero}º Distrito Policial`,
    cardSubtitulo: dp.nome,
    cardResumo: `Guia editorial do ${dp.numero}º DP — ${dp.nome}, com informações sobre documentos e procedimentos policiais.`,
    seo: {
      title: `${dp.numero}º DP ${dp.nome} | Guia territorial — Banca Paulista`,
      description: `Guia independente do ${dp.numero}º DP — ${dp.nome}, em São Paulo. Identificação da unidade, intimações, inquéritos e referências editoriais da Zona Leste.`,
      canonicalPath: `/delegacias/${slug}`,
    },
    introducao: `Guia editorial do ${unidade}, organizado pela referência territorial ${dp.nome}. ${dp.nomeOficialVerificado ? "A denominação consta de fonte pública." : "A denominação institucional atual está em verificação."} O nome do lugar não define circunscrição; confirme os dados de atendimento nos canais oficiais. Não é canal da Polícia Civil nem oferta de atendimento jurídico.`,
    unidade: { numero: String(dp.numero), nomeOficial: unidade, dadosDeDesenvolvimento: true },
    regiaoSlug: dp.localSlug,
    bairros: [dp.nome, ...(dp.referenciasAdicionais ?? [])],
    contextoTerritorial:
      dp.numero === 8
        ? "Brás é uma referência de transição entre Centro e Zona Leste. Sua inclusão nesta coleção é editorial: não altera a divisão administrativa da Polícia Civil nem determina qual unidade deve registrar ou investigar uma ocorrência."
        : dp.numero === 32 || dp.numero === 103
          ? `Itaquera aparece nesta coleção em dois guias distintos: 32º e 103º DP. O número ${dp.numero} identifica esta página; o nome do lugar, isoladamente, não permite escolher a unidade responsável por um endereço.`
          : `${dp.nome} é a referência usada neste guia para identificar o ${dp.numero}º DP na coleção editorial da Zona Leste. O número e a denominação da unidade devem ser confrontados com o boletim, a intimação ou o documento recebido; a referência ao lugar não descreve uma área de atendimento.`,
    observacaoBairros:
      "As referências territoriais organizam a navegação. Não indicam bairros atendidos, competência exclusiva ou limites de circunscrição. Confirme a unidade responsável pelo endereço exato e pela natureza dos fatos nos canais oficiais da Polícia Civil.",
    secoes: [
      {
        titulo: `Identificação do ${dp.numero}º DP — ${dp.nome}`,
        paragrafos: [
          `Ao consultar um documento que mencione o ${dp.numero}º DP, confira a numeração e a denominação da unidade, além do número do boletim de ocorrência ou do inquérito. Um nome de bairro em uma mensagem não substitui essa identificação.`,
          "Endereço e horário não são reproduzidos neste guia sem confirmação oficial atual. Quando houver telefone confirmado, ele aparece no bloco de contato da unidade; confirme os demais dados nos canais oficiais da Polícia Civil antes de se deslocar.",
        ],
      },
      {
        titulo: `Intimação com referência ao ${dp.numero}º DP`,
        paragrafos: [
          "Uma convocação pode mencionar vítima, testemunha, pessoa investigada ou representante de empresa. A condição em que a pessoa será ouvida deve ser verificada no documento; uma intimação não equivale a condenação.",
        ],
        lista: [
          "Nome da pessoa convocada e condição no procedimento",
          "Número da unidade e do boletim ou inquérito",
          "Data, horário, local e documentos solicitados",
          "Autenticidade do contato, confirmada por canal oficial independente",
        ],
      },
      {
        titulo: "Boletim de ocorrência e inquérito",
        paragrafos: [
          "O boletim registra a comunicação dos fatos; o inquérito reúne diligências de investigação. Preserve os documentos originais, comprovantes e mensagens relacionados ao fato. A unidade que aparece em um registro pode não ser a que realiza todas as etapas posteriores.",
          "Dúvidas sobre depoimentos, acesso a documentos, prazos ou direitos exigem avaliação individual por advogado ou pela Defensoria Pública. O portal não recebe relatos ou documentos de casos.",
        ],
      },
      {
        titulo: `Outros guias no eixo editorial de ${dp.nome}`,
        paragrafos: [
          `A navegação desta coleção também reúne ${outros}. Esses links não indicam transferência de procedimento, subordinação administrativa ou circunscrições contíguas. Confira a unidade no documento e nos canais oficiais.`,
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante"],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
    faq: [
      {
        id: `dp${dp.numero}-oficial`,
        pergunta: `Esta é a página oficial do ${dp.numero}º DP?`,
        resposta:
          "Não. Banca Paulista é um portal editorial independente, sem vínculo com a Polícia Civil ou órgãos públicos.",
      },
      {
        id: `dp${dp.numero}-endereco`,
        pergunta: `Como confirmar endereço e horário do ${dp.numero}º DP?`,
        resposta:
          "Consulte os canais oficiais da Polícia Civil antes de se deslocar. O guia não publica dados operacionais sem confirmação atual, nem garante funcionamento em determinado horário.",
      },
      {
        id: `dp${dp.numero}-circunscricao`,
        pergunta: `Morar em ${dp.nome} determina qual delegacia é responsável?`,
        resposta:
          "Não. A referência territorial não delimita circunscrição. A unidade responsável depende do endereço exato, da natureza dos fatos e da organização policial.",
      },
      {
        id: `dp${dp.numero}-intimacao`,
        pergunta: `Uma intimação do ${dp.numero}º DP significa acusação?`,
        resposta:
          "Não necessariamente. Confira no documento a condição de vítima, testemunha ou pessoa investigada e obtenha orientação profissional individualizada quando necessário.",
      },
      {
        id: `dp${dp.numero}-profissionais`,
        pergunta: "Há advogado ou plantão 24h disponível pelo portal?",
        resposta:
          "Ainda não há profissionais participantes publicados. O portal não presta consultas, não recebe casos e não oferece atendimento 24h.",
      },
    ],
  };
});
