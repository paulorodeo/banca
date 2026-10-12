import type { Delegacia } from "../types";
import { AVISO_RODAPE } from "./delegacias-extra";

/**
 * Fechamento da Zona Sul: 101º, 85º e 95º DP.
 * Editorial informativo; dados operacionais e históricos não verificados são omitidos.
 */
interface Entrada {
  numero: string;
  slug: string;
  bairro: string;
  regiaoSlug: string;
  bairros: string[];
  vizinhos: string;
  escopo: string;
  contexto: string;
  secaoRegional: { titulo: string; paragrafos: string[] };
}

const ENDERECO =
  "Rua Antônio Raposo Barreto, 31 — Jardim das Flores — São Paulo/SP — CEP 04904-170";

function montar(e: Entrada): Delegacia {
  const ord = `${e.numero}º`;
  const nomeOficial = `${ord} Distrito Policial — ${e.bairro}`;
  const p = `dp${e.numero}`;
  return {
    id: `dp-${e.numero}`,
    slug: e.slug,
    h1: `Advogado criminal próximo ao ${ord} DP ${e.bairro}`,
    cardTitulo: `Advogado criminal próximo ao ${ord} DP`,
    cardSubtitulo: e.bairro,
    cardResumo: `Atendimento jurídico criminal em ${e.bairro}, na Zona Sul de São Paulo, incluindo intimações, inquéritos e ocorrências relacionadas ao ${ord} Distrito Policial.`,
    seo: {
      title: `Advogado criminal próximo ao ${ord} DP ${e.bairro} | Paulo Sinigalia`,
      description: `Orientação jurídica em ${e.bairro} para intimações, inquéritos e ocorrências relacionadas ao ${ord} DP. Paulo Sinigalia, OAB/SP 411.502, com escritório na Zona Sul.`,
      canonicalPath: `/delegacias/${e.slug}`,
      keywords: [
        `advogado criminal ${ord} DP ${e.bairro}`,
        `advogado criminal ${e.bairro}`,
        `advogado para intimação ${e.bairro}`,
        "advogado criminal Zona Sul São Paulo",
      ],
    },
    introducao: `Paulo José Sinigalia — OAB/SP 411.502 presta atendimento jurídico criminal a pessoas, famílias, profissionais e empresas de ${e.bairro}, na Zona Sul de São Paulo, incluindo situações relacionadas ao ${nomeOficial}. O escritório possui endereço físico no Jardim das Flores; a referência a ${e.bairro} indica área de atendimento, e não filial no bairro ou instalação junto à delegacia.`,
    unidade: { numero: e.numero, nomeOficial, dadosDeDesenvolvimento: true },
    contextoTerritorial: e.contexto,
    regiaoSlug: e.regiaoSlug,
    bairros: e.bairros,
    observacaoBairros: `${e.bairros.join(", ")} e ${e.vizinhos} são referências de navegação territorial. A unidade responsável depende do endereço exato dos fatos, da natureza da ocorrência e da organização da Polícia Civil.`,
    secoes: [
      {
        titulo: `Atendimento jurídico criminal em ${e.bairro}`,
        paragrafos: [
          "Intimação, menção em boletim de ocorrência e investigação são situações diferentes, e nenhuma delas equivale a condenação. A orientação individualizada identifica o que está documentado, as providências possíveis e os prazos aplicáveis.",
        ],
        lista: [
          "Análise de intimações e preparação para depoimentos",
          "Acompanhamento de inquéritos e defesa de pessoas investigadas",
          "Avaliação jurídica em situações de prisão em flagrante",
          "Orientação a vítimas de ameaças, lesões, furtos e fraudes",
          "Ocorrências envolvendo comércio, documentos e meios digitais",
        ],
      },
      e.secaoRegional,
      {
        titulo: `Escritório físico na Zona Sul: atendimento a ${e.bairro}`,
        paragrafos: [
          `O endereço do escritório é ${ENDERECO}, na região de M'Boi Mirim. ${e.bairro} integra ${e.escopo}.`,
          `Não há filial em ${e.bairro}, instalação dentro do ${ord} DP ou vínculo com a Polícia Civil. O acompanhamento depende de análise prévia, disponibilidade e ausência de conflito de interesses, sem promessa de resultado.`,
        ],
      },
      {
        titulo: `Recebi uma intimação do ${ord} DP. O que devo conferir?`,
        paragrafos: [
          "A convocação pode envolver vítima, testemunha, investigado ou representante de empresa. Não ignore a data indicada; se houver dificuldade de comparecimento, a providência adequada deve ser avaliada conforme o documento.",
          "Se o contato chegou por telefone ou mensagem, confirme sua autenticidade por um canal oficial obtido de forma independente, sem fornecer senhas ou códigos.",
        ],
        lista: [
          "Nome da pessoa convocada e condição no procedimento",
          "Unidade indicada e número do boletim ou inquérito",
          "Data, horário e local de comparecimento",
          "Documentos solicitados e eventual prazo",
        ],
      },
      {
        titulo: "Prisão em flagrante e orientação a vítimas",
        paragrafos: [
          "Em situação de prisão, é relevante identificar a unidade, o horário aproximado dos fatos e os documentos disponíveis. Não há liberação automática pelo acompanhamento de advogado: fiança e liberdade provisória dependem dos requisitos legais.",
          "Vítimas devem preservar mensagens, comprovantes e registros originais. Em risco atual à integridade física, procure os serviços públicos de emergência; a triagem do escritório não os substitui.",
        ],
      },
      {
        titulo: `O ${nomeOficial}`,
        paragrafos: [
          `A referência ao ${nomeOficial} serve para identificar a unidade mencionada em documentos. Não significa parceria, credenciamento ou vínculo institucional do escritório com a delegacia.`,
          "Endereço, telefone e horário da unidade devem ser confirmados nos canais oficiais da Polícia Civil antes de qualquer deslocamento.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "busca-e-apreensao"],
    faq: [
      {
        id: `${p}-faq-1`,
        pergunta: `O escritório atende procedimentos relacionados ao ${ord} DP ${e.bairro}?`,
        resposta: `Sim. Intimações, boletins de ocorrência e investigações relacionados à unidade podem ser submetidos à análise prévia, conforme a natureza do caso e a disponibilidade.`,
      },
      {
        id: `${p}-faq-2`,
        pergunta: `Uma intimação do ${ord} DP significa que estou sendo acusado?`,
        resposta: "Não necessariamente. A pessoa pode ser convocada como vítima, testemunha, investigada ou representante de empresa.",
      },
      {
        id: `${p}-faq-3`,
        pergunta: "Qual delegacia é responsável por um fato ocorrido na região?",
        resposta: `Depende do endereço exato e da natureza dos fatos. Os links para ${e.vizinhos} não representam delimitação oficial de circunscrição.`,
      },
      {
        id: `${p}-faq-4`,
        pergunta: `O escritório possui endereço em ${e.bairro}?`,
        resposta: `Não. O endereço físico é ${ENDERECO}. ${e.bairro} integra ${e.escopo}.`,
      },
      {
        id: `${p}-faq-5`,
        pergunta: `Existe vínculo com o ${ord} DP?`,
        resposta: "Não. O escritório é privado e independente, sem vínculo, parceria ou acesso privilegiado à Polícia Civil.",
      },
      {
        id: `${p}-faq-6`,
        pergunta: "Enviar informações garante contratação ou atendimento imediato?",
        resposta: "Não. O contato inicial serve apenas para triagem de viabilidade e não constitui consulta, contratação ou promessa de resultado.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  };
}

export const delegaciasExtra6: Delegacia[] = [
  montar({
    numero: "101",
    slug: "advogado-criminal-101-dp-jardim-imbuias",
    bairro: "Jardim Imbuias",
    regiaoSlug: "jardim-imbuias",
    bairros: ["Jardim Imbuias", "Grajaú", "Cantinho do Céu"],
    vizinhos: "Socorro, Cidade Dutra e Jardim Mirna",
    escopo: "a área ampliada de atendimento na Zona Sul, no eixo Grajaú–Socorro",
    contexto:
      "O Jardim Imbuias está na região do Grajaú, junto às margens da Represa Billings e do Cantinho do Céu. É uma área de grande densidade residencial e comércio de bairro, conectada a Socorro e Cidade Dutra pelos eixos viários do extremo sul.",
    secaoRegional: {
      titulo: "Grajaú, Cantinho do Céu e área de mananciais",
      paragrafos: [
        "A proximidade com a Billings faz da região uma área de proteção aos mananciais, o que pode envolver, além de ocorrências comuns, questões ambientais e de ocupação do solo. Cada situação exige análise do documento recebido e do local exato dos fatos.",
      ],
    },
  }),
  montar({
    numero: "85",
    slug: "advogado-criminal-85-dp-jardim-mirna",
    bairro: "Jardim Mirna",
    regiaoSlug: "jardim-mirna",
    bairros: ["Jardim Mirna", "Grajaú", "Parque América"],
    vizinhos: "Jardim Imbuias, Cidade Dutra e Socorro",
    escopo: "a área ampliada de atendimento na Zona Sul, no eixo do Grajaú",
    contexto:
      "O Jardim Mirna integra o distrito do Grajaú, um dos mais populosos da capital, com perfil predominantemente residencial, comércio local intenso e acesso pela Avenida Dona Belmira Marin e pela linha ferroviária da região.",
    secaoRegional: {
      titulo: "Atendimento no Grajaú e extremo sul",
      paragrafos: [
        "Em regiões de grande densidade, é comum que moradores recebam intimações como testemunhas ou vítimas de ocorrências próximas à residência ou ao trabalho. Entender a condição em que a pessoa será ouvida é o primeiro passo.",
      ],
    },
  }),
  montar({
    numero: "95",
    slug: "advogado-criminal-95-dp-heliopolis",
    bairro: "Heliópolis",
    regiaoSlug: "heliopolis",
    bairros: ["Heliópolis", "Sacomã", "Vila Heliópolis"],
    vizinhos: "Sacomã, Ipiranga e Americanópolis",
    escopo: "a área de atendimento da Zona Sul, na transição com o Ipiranga",
    contexto:
      "Heliópolis é uma das maiores comunidades de São Paulo, localizada entre o Sacomã e o Ipiranga, com intensa vida comunitária, comércio local e organizações sociais atuantes. A região faz divisa com São Caetano do Sul.",
    secaoRegional: {
      titulo: "Heliópolis, Sacomã e Ipiranga",
      paragrafos: [
        "Pela proximidade com a divisa municipal, fatos ocorridos na região podem envolver unidades de mais de um município. A conferência do endereço exato e do documento recebido evita deslocamentos desnecessários.",
      ],
    },
  }),
];
