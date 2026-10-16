interface JobOpening {
  id: string;
  slug: string;
  cargo: string;
  organizacao: string;
  localizacao: string;
  modalidade?: "Presencial" | "Híbrida" | "Remota";
  contratacao?: string;
  remuneracao: {
    destaque: string;
    observacao?: string;
  };
  resumo: string;
  exigeOabAtiva?: boolean;
  inclusivaPcd?: boolean;
  prazoAnunciado?: string;
  fonte: {
    nome: string;
    url: string;
    consultadaEm: string;
  };
  statusEditorial: "publicado" | "rascunho";
}

/**
 * Vagas profissionais aprovadas para divulgação editorial.
 * A candidatura acontece exclusivamente no endereço individual da fonte.
 */
export const vagas: JobOpening[] = [
  {
    id: "on-the-job-advogada-trabalhista-contencioso",
    slug: "advogada-trabalhista-contencioso-on-the-job",
    cargo: "Advogada Trabalhista (Contencioso)",
    organizacao: "ON THE JOB RH",
    localizacao: "Pinheiros, São Paulo/SP",
    modalidade: "Presencial",
    contratacao: "PJ",
    remuneracao: { destaque: "R$ 8.000 a R$ 10.000 mensais" },
    resumo:
      "Atuação em processos trabalhistas, peças, audiências e gestão de prazos. A sexta-feira pode ser remota quando não houver audiência.",
    exigeOabAtiva: true,
    fonte: {
      nome: "ON THE JOB RH / Pandapé",
      url: "https://onthejobrh.pandape.infojobs.com.br/Detail/3815305",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "radar-advogado-civel-pleno",
    slug: "advogado-civel-pleno-radar-gestao",
    cargo: "Advogado(a) Cível Pleno",
    organizacao: "Radar da Gestão",
    localizacao: "São Paulo/SP, com acesso a Barueri",
    modalidade: "Presencial",
    contratacao: "PJ",
    remuneracao: { destaque: "R$ 6.800 a R$ 8.000 mensais" },
    resumo:
      "Contencioso cível com frentes imobiliária e empresarial, incluindo peças, pesquisas, prazos, audiências e organização da carteira processual.",
    exigeOabAtiva: true,
    fonte: {
      nome: "InfoJobs",
      url: "https://www.infojobs.com.br/vaga-de-advogadoa-civel-pleno-em-sao-paulo__11929482.aspx",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "youtility-advogado-contencioso-civel",
    slug: "advogado-contencioso-civel-youtility",
    cargo: "Advogado de Contencioso Cível",
    organizacao: "Youtility Center do Brasil",
    localizacao: "São Paulo/SP",
    modalidade: "Presencial",
    contratacao: "CLT",
    remuneracao: { destaque: "R$ 7.000 mensais" },
    resumo:
      "Condução e acompanhamento de carteira cível, controle de prazos, elaboração de peças e atualização de informações processuais.",
    exigeOabAtiva: true,
    fonte: {
      nome: "InfoJobs",
      url: "https://www.infojobs.com.br/vaga-de-advogado-contencioso-civel-em-sao-paulo__11964865.aspx",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "gs-business-advogado-previdenciario",
    slug: "advogado-previdenciario-gs-business",
    cargo: "Advogado Previdenciário",
    organizacao: "GS Business",
    localizacao: "Tatuapé, São Paulo/SP",
    modalidade: "Presencial",
    contratacao: "PJ / associado",
    remuneracao: {
      destaque: "Honorários fixos de R$ 4.000 mensais",
      observacao: "Variável de até R$ 1.500, condicionada ao desempenho.",
    },
    resumo:
      "Atuação em requerimentos e ações previdenciárias, recursos, prazos e orientação a clientes. Há possibilidade de um dia remoto semanal após a adaptação.",
    exigeOabAtiva: true,
    fonte: {
      nome: "InfoJobs",
      url: "https://www.infojobs.com.br/vaga-de-advogado-previdenciario-associado-pj-em-sao-paulo__11866094.aspx",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "justo-precatorio-advogado-previdenciario-junior",
    slug: "advogado-previdenciario-junior-justo-precatorio",
    cargo: "Advogado Previdenciário Júnior",
    organizacao: "Justo Precatório",
    localizacao: "Tatuapé, São Paulo/SP",
    modalidade: "Presencial",
    contratacao: "Associado / PJ",
    remuneracao: {
      destaque: "R$ 3.200 a R$ 3.600 mensais",
      observacao: "A descrição informa fixo de R$ 3.500, além de benefícios e bônus por metas.",
    },
    resumo:
      "Apoio a demandas de benefícios do INSS e processos previdenciários, com elaboração de peças, recursos, pesquisas e acompanhamento de casos.",
    fonte: {
      nome: "Indeed",
      url: "https://br.indeed.com/viewjob?jk=09aa06913da416e0",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "manpower-analista-juridico",
    slug: "analista-juridico-manpower",
    cargo: "Analista Jurídico",
    organizacao: "Manpower Staffing",
    localizacao: "São Paulo/SP",
    remuneracao: { destaque: "R$ 3.500 mensais" },
    resumo:
      "Atuação em atos societários, regularização empresarial, registros e acompanhamento de processos perante órgãos de registro e Receita Federal.",
    inclusivaPcd: true,
    prazoAnunciado: "04/11/2026",
    fonte: {
      nome: "Divulga Vagas",
      url: "https://divulgavagas.com.br/vaga-de-emprego/analista-juridico-a-117961-34716847",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "todorovic-paralegal-contencioso",
    slug: "paralegal-contencioso-todorovic",
    cargo: "Paralegal de Contencioso Cível e Criminal",
    organizacao: "Todorovic Advogados",
    localizacao: "Tatuapé, São Paulo/SP",
    modalidade: "Híbrida",
    contratacao: "PJ",
    remuneracao: {
      destaque: "R$ 2.500 a R$ 3.500 mensais",
      observacao: "Comissão informada separadamente pela fonte.",
    },
    resumo:
      "Apoio processual, pesquisa jurídica, organização documental e acompanhamento de rotinas cíveis e criminais. A inscrição na OAB não é exigida.",
    fonte: {
      nome: "InfoJobs",
      url: "https://www.infojobs.com.br/vaga-de-paralegal-contencioso-civel-criminal-em-sao-paulo__11942846.aspx",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "dnr-assistente-juridico",
    slug: "assistente-juridico-dnr",
    cargo: "Assistente Jurídico",
    organizacao: "DNR Gestão Empresarial e Bancária em Cobranças",
    localizacao: "Tatuapé, São Paulo/SP",
    modalidade: "Presencial",
    contratacao: "CLT",
    remuneracao: { destaque: "R$ 2.000 a R$ 2.300 mensais" },
    resumo:
      "Vaga efetiva para estudantes de Direito entre o 3º e o 9º semestre, com apoio em recuperação de crédito, acompanhamento processual e busca e apreensão.",
    fonte: {
      nome: "InfoJobs",
      url: "https://www.infojobs.com.br/vaga-de-assistente-juridico-em-sao-paulo__12016403.aspx",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
];

export const vagasPublicadas = vagas.filter((vaga) => vaga.statusEditorial === "publicado");
