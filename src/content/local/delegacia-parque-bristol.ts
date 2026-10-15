import type { Delegacia, Regiao } from "../types";
import { AVISO_RODAPE } from "./delegacias-extra";

const slug = "advogado-criminal-83-dp-parque-bristol";

/** Fonte de denominação e existência administrativa: docs/auditoria-delegacias-2026-10-15.md. */
export const delegaciaParqueBristol: Delegacia = {
  id: "dp-83",
  slug,
  h1: "83º DP — Parque Bristol",
  cardTitulo: "83º Distrito Policial",
  cardSubtitulo: "Parque Bristol",
  cardResumo: "Guia editorial do 83º DP e da região de Parque Bristol, em São Paulo.",
  seo: {
    title: "83º DP Parque Bristol | Guia territorial — Banca Paulista",
    description:
      "Guia independente do 83º DP — Parque Bristol, com contexto territorial e informações sobre documentos e procedimentos policiais.",
    canonicalPath: `/delegacias/${slug}`,
  },
  introducao:
    "Guia editorial do 83º Distrito Policial — Parque Bristol. A denominação consta de fontes públicas; confirme os dados de atendimento nos canais oficiais. O portal não pertence à Polícia Civil nem oferece atendimento jurídico.",
  unidade: {
    numero: "83",
    nomeOficial: "83º Distrito Policial — Parque Bristol",
    dadosDeDesenvolvimento: true,
  },
  regiaoSlug: "parque-bristol",
  bairros: ["Parque Bristol"],
  contextoTerritorial:
    "Parque Bristol integra o eixo do Ipiranga, na Zona Sul de São Paulo. Esta referência organiza a navegação editorial e não delimita a circunscrição do 83º DP nem a unidade responsável por um endereço específico.",
  observacaoBairros:
    "A unidade responsável depende do endereço exato, da natureza dos fatos e da organização da Polícia Civil. Confirme-a nos canais oficiais; proximidade geográfica não define circunscrição.",
  secoes: [
    {
      titulo: "Identificação do 83º DP",
      paragrafos: [
        "Ao consultar boletim, intimação ou inquérito, confira o número da unidade e os identificadores do procedimento. O nome do bairro isoladamente não determina a delegacia responsável.",
        "A existência administrativa da unidade não confirma horário de atendimento, telefone ou atribuições de plantão. Consulte os canais oficiais antes de se deslocar.",
      ],
    },
    {
      titulo: "Intimações e documentos",
      paragrafos: [
        "Uma intimação pode envolver vítima, testemunha ou pessoa investigada. A condição da pessoa e as providências cabíveis dependem do documento recebido e da análise individual do caso.",
        "Se o contato chegar por mensagem ou telefone, confirme sua autenticidade por um canal oficial independente. Não envie documentos sensíveis ao portal.",
      ],
    },
  ],
  avisoRodape: AVISO_RODAPE,
  situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante"],
  conteudosRelacionados: ["intimacao-o-que-considerar-antes-de-responder"],
  faq: [
    {
      id: "dp83-oficial",
      pergunta: "Esta página é oficial do 83º DP?",
      resposta:
        "Não. A Banca Paulista é um portal editorial independente, sem vínculo com a Polícia Civil.",
    },
    {
      id: "dp83-atendimento",
      pergunta: "Qual é o horário ou telefone do 83º DP?",
      resposta:
        "O guia não publica dados operacionais sem confirmação atual. Consulte os canais oficiais da Polícia Civil antes de se deslocar.",
    },
    {
      id: "dp83-circunscricao",
      pergunta: "Morar em Parque Bristol determina a unidade responsável?",
      resposta:
        "Não. A circunscrição depende do endereço exato e da organização policial; a referência territorial deste guia não a define.",
    },
    {
      id: "dp83-profissionais",
      pergunta: "Há advogado disponível pelo portal?",
      resposta:
        "Ainda não há profissionais participantes publicados. O portal não recebe casos nem oferece atendimento de urgência.",
    },
  ],
};

export const regiaoParqueBristol: Regiao = {
  id: "reg-parque-bristol",
  slug: "parque-bristol",
  nome: "Parque Bristol",
  descricao:
    "Guia do 83º DP — Parque Bristol, com contexto territorial e informação sobre procedimentos policiais.",
  bairros: ["Parque Bristol"],
  href: `/delegacias/${slug}`,
  zona: "zona-sul",
};

/** Links editoriais próximos; não representam circunscrição ou transferência de procedimentos. */
export const relacionadasParqueBristol = {
  [slug]: ["advogado-criminal-17-dp-ipiranga", "advogado-criminal-26-dp-sacoma"],
};
