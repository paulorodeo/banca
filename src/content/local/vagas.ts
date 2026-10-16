interface JobOpening {
  id: string;
  slug: string;
  cargo: string;
  organizacao: string;
  localizacao: string;
  tipo: "profissional" | "estagio";
  modalidade?: "Presencial" | "Híbrida" | "Remota";
  contratacao?: string;
  remuneracao?: {
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
    tipo: "profissional",
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
    tipo: "profissional",
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
    tipo: "profissional",
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
    tipo: "profissional",
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
    tipo: "profissional",
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
    tipo: "profissional",
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
    tipo: "profissional",
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
    tipo: "profissional",
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
  {
    id: "vtal-advogado-especialista-trabalhista",
    slug: "advogado-especialista-trabalhista-vtal",
    cargo: "Advogado Especialista Trabalhista",
    organizacao: "V.tal",
    localizacao: "São Paulo/SP",
    tipo: "profissional",
    modalidade: "Híbrida",
    contratacao: "Efetivo",
    resumo:
      "Atuação jurídica trabalhista especializada, com uso de ferramentas de inteligência artificial e Legal Ops nas rotinas da área.",
    exigeOabAtiva: true,
    prazoAnunciado: "01/12/2026",
    fonte: {
      nome: "Gupy / V.tal",
      url: "https://vtal.gupy.io/jobs/12669805",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "daniel-advogado-tecnologia-privacidade",
    slug: "advogado-tecnologia-privacidade-daniel",
    cargo: "Advogado de Tecnologia, Privacidade e Proteção de Dados",
    organizacao: "Daniel Advogados",
    localizacao: "São Paulo/SP",
    tipo: "profissional",
    modalidade: "Híbrida",
    contratacao: "Efetivo",
    resumo:
      "Atuação em direito digital, privacidade e proteção de dados, tecnologia e demandas de contencioso relacionadas à área.",
    prazoAnunciado: "30/11/2026",
    fonte: {
      nome: "Gupy / Daniel Advogados",
      url: "https://daniel-ip.gupy.io/jobs/12693293",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "machado-meyer-advogado-pleno-special-situations",
    slug: "advogado-pleno-empresarial-machado-meyer",
    cargo: "Advogado Pleno Empresarial — Special Situations",
    organizacao: "Machado Meyer",
    localizacao: "São Paulo/SP",
    tipo: "profissional",
    modalidade: "Híbrida",
    contratacao: "Efetivo",
    resumo:
      "Atuação em reestruturação financeira, operações empresariais, insolvência e operações de M&A.",
    prazoAnunciado: "14/11/2026",
    fonte: {
      nome: "Gupy / Machado Meyer",
      url: "https://machadomeyer.gupy.io/jobs/12490664",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "bichara-advogado-junior-empresarial",
    slug: "advogado-junior-empresarial-bichara",
    cargo: "Advogado Júnior Empresarial",
    organizacao: "Bichara Advogados",
    localizacao: "São Paulo/SP",
    tipo: "profissional",
    modalidade: "Presencial",
    contratacao: "Efetivo",
    resumo: "Atuação jurídica na área de Direito Empresarial.",
    prazoAnunciado: "01/12/2026",
    fonte: {
      nome: "Gupy / Bichara Advogados",
      url: "https://bichara-advogados.gupy.io/jobs/12168330",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "sanchez-advogado-junior-remoto",
    slug: "advogado-junior-remoto-sanchez",
    cargo: "Advogado Júnior Remoto",
    organizacao: "Sanchez e Sanchez Sociedade de Advogados",
    localizacao: "Remoto",
    tipo: "profissional",
    modalidade: "Remota",
    contratacao: "Autônomo",
    resumo:
      "Análise documental, elaboração de peças, pesquisa jurídica e acompanhamento processual em trabalho remoto.",
    prazoAnunciado: "03/12/2026",
    fonte: {
      nome: "Gupy / Sanchez e Sanchez Sociedade de Advogados",
      url: "https://sanchezadv.gupy.io/jobs/12674254",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "geopixel-analista-juridico-licitacoes",
    slug: "analista-juridico-licitacoes-geopixel",
    cargo: "Analista Jurídico — Licitações",
    organizacao: "Geopixel",
    localizacao: "São José dos Campos/SP",
    tipo: "profissional",
    modalidade: "Híbrida",
    contratacao: "Efetivo",
    resumo:
      "Atuação em licitações, contratos administrativos e rotinas ligadas à Lei nº 14.133/2021.",
    prazoAnunciado: "01/11/2026",
    fonte: {
      nome: "Gupy / Geopixel",
      url: "https://geopixel.gupy.io/jobs/12412938",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "itau-analista-operacoes-juridicas-junior",
    slug: "analista-operacoes-juridicas-junior-itau",
    cargo: "Analista de Operações Jurídicas Júnior",
    organizacao: "Itaú Unibanco",
    localizacao: "São Paulo/SP",
    tipo: "profissional",
    modalidade: "Híbrida",
    contratacao: "Temporário",
    resumo:
      "Atendimento a determinações judiciais, ofícios e solicitações de autoridades em operações jurídicas.",
    prazoAnunciado: "04/11/2026",
    fonte: {
      nome: "Gupy / Itaú Unibanco",
      url: "https://vemproitau.gupy.io/jobs/11970152",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "corsan-aegea-analista-juridico-consumerista",
    slug: "analista-juridico-consumerista-corsan-aegea",
    cargo: "Analista Jurídico — Contencioso Consumerista",
    organizacao: "Corsan / Aegea",
    localizacao: "Porto Alegre/RS",
    tipo: "profissional",
    modalidade: "Presencial",
    contratacao: "Efetivo",
    resumo:
      "Atuação em contencioso consumerista, gestão de escritórios parceiros e acompanhamento processual.",
    exigeOabAtiva: true,
    fonte: {
      nome: "Gupy / Corsan Aegea",
      url: "https://vagascorsanaegea.gupy.io/jobs/12671960",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "softplan-estagio-juridico-remoto",
    slug: "estagio-juridico-remoto-softplan",
    cargo: "Estágio Jurídico Remoto",
    organizacao: "Softplan",
    localizacao: "Remoto",
    tipo: "estagio",
    modalidade: "Remota",
    contratacao: "Estágio",
    resumo:
      "Apoio com documentação jurídica, pesquisa legislativa, contratos e suporte à equipe. Requer Direito em andamento a partir do 5º período.",
    prazoAnunciado: "08/11/2026",
    fonte: {
      nome: "Gupy / Softplan",
      url: "https://softplan.gupy.io/jobs/12693972",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "eztec-estagio-juridico-imobiliario",
    slug: "estagio-juridico-imobiliario-eztec",
    cargo: "Estágio Jurídico Imobiliário",
    organizacao: "Eztec",
    localizacao: "São Paulo/SP",
    tipo: "estagio",
    modalidade: "Presencial",
    contratacao: "Estágio",
    resumo:
      "Apoio em contratos, distratos, documentação imobiliária e cartórios. Destinado a estudantes de Direito entre o 5º e o 7º semestre.",
    prazoAnunciado: "16/11/2026",
    fonte: {
      nome: "Gupy / Eztec",
      url: "https://eztec.gupy.io/jobs/12696876",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "tauil-chequer-estagio-contencioso-civel-arbitragem",
    slug: "estagio-contencioso-civel-arbitragem-tauil-chequer",
    cargo: "Estágio em Contencioso Cível e Arbitragem",
    organizacao: "Tauil & Chequer Advogados",
    localizacao: "São Paulo/SP",
    tipo: "estagio",
    modalidade: "Presencial",
    contratacao: "Estágio",
    resumo:
      "Pesquisa jurídica, acompanhamento de processos, organização de documentos e apoio às atividades de arbitragem.",
    prazoAnunciado: "23/11/2026",
    fonte: {
      nome: "Gupy / Tauil & Chequer Advogados",
      url: "https://tauilechequerahead.gupy.io/jobs/12588615",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "cmmm-estagio-direito-civel",
    slug: "estagio-direito-civel-cmmm",
    cargo: "Estágio em Direito Cível",
    organizacao: "CMMM Advogados",
    localizacao: "São Paulo/SP",
    tipo: "estagio",
    modalidade: "Presencial",
    contratacao: "Estágio · 6 horas diárias",
    resumo: "Apoio aos advogados e às rotinas da área cível.",
    prazoAnunciado: "27/10/2026",
    fonte: {
      nome: "Gupy / CMMM Advogados",
      url: "https://cmmm.gupy.io/jobs/12332875",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "demarest-estagio-juridico-tributario",
    slug: "estagio-juridico-tributario-demarest",
    cargo: "Estágio Jurídico Tributário",
    organizacao: "Demarest Advogados",
    localizacao: "Rio de Janeiro/RJ",
    tipo: "estagio",
    modalidade: "Híbrida",
    contratacao: "Estágio",
    resumo:
      "Atuação em contencioso e consultivo tributário. Requer Direito entre o 4º e o 7º semestre e inglês avançado ou fluente.",
    fonte: {
      nome: "LinkedIn / Demarest Advogados",
      url: "https://br.linkedin.com/jobs/view/est%C3%A1gio-jur%C3%ADdico-tribut%C3%A1rio-at-demarest-advogados-4470104061",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
  {
    id: "queiroz-cavalcanti-estagio-civel-estrategico",
    slug: "estagio-civel-estrategico-queiroz-cavalcanti",
    cargo: "Estágio em Direito Cível Estratégico",
    organizacao: "Queiroz Cavalcanti Advocacia",
    localizacao: "Recife/PE",
    tipo: "estagio",
    contratacao: "Estágio",
    resumo:
      "Elaboração de peças, relatórios e movimentação processual. Requer estudante de Direito a partir do 4º período.",
    fonte: {
      nome: "LinkedIn / Queiroz Cavalcanti Advocacia",
      url: "https://br.linkedin.com/jobs/view/est%C3%A1gio-em-direito-estrat%C3%A9gico-c%C3%ADvel-at-queiroz-cavalcanti-advocacia-4454695128",
      consultadaEm: "16/10/2026",
    },
    statusEditorial: "publicado",
  },
];

export const vagasPublicadas = vagas.filter((vaga) => vaga.statusEditorial === "publicado");
