import type { Bairro } from "../types";

/**
 * Bairros publicados permanecem locais e tipados até o contrato territorial
 * do Payload estar disponível. Relações apontam sempre para a unidade canônica.
 */
export const bairros: Bairro[] = [
  {
    id: "bairro-pinheiros",
    slug: "pinheiros",
    nome: "Pinheiros",
    zona: "zona-oeste",
    status: "publicado",
    descricao:
      "Instituições públicas, informações jurídicas e profissionais com atuação declarada na região de Pinheiros.",
    introducao:
      "Pinheiros integra a Zona Oeste de São Paulo e reúne áreas residenciais, comércio, serviços e importantes conexões de transporte. Esta página organiza apenas instituições e conteúdos com relação territorial registrada e verificável.",
    referenciasUrbanas: ["Largo da Batata", "Avenida Brigadeiro Faria Lima", "Rio Pinheiros"],
    bairrosVizinhos: ["Vila Madalena", "Alto de Pinheiros", "Jardim Paulistano", "Butantã"],
    instituicoes: [
      {
        id: "pinheiros-14-dp",
        category: "delegacias",
        institutionSlug: "advogado-14-dp-pinheiros",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel: "Referência territorial publicada para Pinheiros",
      },
    ],
    secoes: [
      {
        titulo: "Sobre Pinheiros",
        paragrafos: [
          "A navegação territorial do portal reúne, em uma única página, guias institucionais relacionados a Pinheiros. Cada unidade mantém sua própria página canônica e pode estar relacionada a mais de um território quando houver fundamento editorial verificado.",
          "A presença de uma instituição nesta página não afirma competência sobre todo o bairro. Endereços, horários, canais de contato e atribuições devem ser confirmados nos canais oficiais antes de qualquer deslocamento.",
        ],
      },
      {
        titulo: "Como utilizar este diretório",
        paragrafos: [
          "Use a busca e os filtros para localizar instituições já publicadas. Categorias sem dados aprovados não são preenchidas artificialmente e passam a aparecer somente quando houver registros verificados.",
          "A Banca Paulista é um portal editorial independente, sem vínculo com órgãos públicos. O conteúdo não substitui orientação profissional nem recebe relatos de casos jurídicos.",
        ],
      },
    ],
    faq: [
      {
        id: "pinheiros-competencia",
        pergunta: "Uma instituição próxima é necessariamente responsável pelo meu endereço?",
        resposta:
          "Não. Proximidade geográfica não determina competência policial, judicial ou administrativa. Confirme a unidade responsável nos canais oficiais com base no endereço e no serviço procurado.",
      },
      {
        id: "pinheiros-dados",
        pergunta: "Como confirmar endereço, horário e forma de atendimento?",
        resposta:
          "Consulte os canais oficiais da instituição antes do deslocamento. O portal omite dados operacionais que ainda não tenham fonte e revisão registradas.",
      },
    ],
    seo: {
      title: "Pinheiros: instituições e informação territorial | Banca Paulista",
      description:
        "Guia territorial de Pinheiros com instituições públicas publicadas, contexto local e navegação editorial pela Zona Oeste de São Paulo.",
      canonicalPath: "/bairros/pinheiros",
    },
  },
];
