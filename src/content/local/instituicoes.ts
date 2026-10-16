import type { PublicInstitution } from "../types";

/**
 * Fichas institucionais publicadas. Elas não atribuem competência territorial,
 * não apresentam canais de atendimento e remetem às páginas oficiais para
 * confirmação de serviços e atribuições.
 */
export const instituicoes: PublicInstitution[] = [
  {
    id: "mpsp-gecradi",
    slug: "gecradi",
    nomeOficial: "Grupo Especial de Combate aos Crimes Raciais e de Intolerância",
    sigla: "GECRADI",
    tipo: "departamento",
    categoria: "ministerio-publico",
    descricao:
      "Estrutura de atuação especial do Ministério Público do Estado de São Paulo voltada ao enfrentamento de crimes raciais e de intolerância. Segundo o MPSP, sua atuação abrange a identificação, a prevenção e a repressão de delitos de intolerância, preconceito e discriminação contra pessoas ou grupos.",
    contatos: [
      {
        tipo: "site",
        rotulo: "Página institucional",
        valor: "Consultar GECRADI no MPSP",
        href: "https://www.mpsp.mp.br/gecradi",
      },
    ],
    fontes: [
      {
        titulo: "GECRADI — Ministério Público do Estado de São Paulo",
        url: "https://www.mpsp.mp.br/gecradi",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "GECRADI | Ministério Público de São Paulo — Banca Paulista",
      description:
        "Ficha editorial do GECRADI, grupo especial do Ministério Público do Estado de São Paulo voltado ao enfrentamento de crimes raciais e de intolerância.",
      canonicalPath: "/instituicoes/gecradi",
    },
  },
  {
    id: "mpsp-gaeco",
    slug: "gaeco",
    nomeOficial: "Grupo de Atuação Especial de Combate ao Crime Organizado",
    sigla: "GAECO",
    tipo: "departamento",
    categoria: "ministerio-publico",
    descricao:
      "Estrutura de atuação especial do Ministério Público do Estado de São Paulo dedicada ao enfrentamento do crime organizado. O grupo integra a organização de grupos de atuação especial do MPSP e atua em temas relacionados à criminalidade organizada, conforme suas atribuições institucionais.",
    contatos: [
      {
        tipo: "site",
        rotulo: "Página institucional",
        valor: "Consultar GAECO no MPSP",
        href: "https://www.mpsp.mp.br/gaeco",
      },
    ],
    fontes: [
      {
        titulo: "GAECO — Ministério Público do Estado de São Paulo",
        url: "https://www.mpsp.mp.br/gaeco",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Grupos de Atuação Especial — Ministério Público do Estado de São Paulo",
        url: "https://www.mpsp.mp.br/grupos-de-atuacao-especial",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "GAECO | Ministério Público de São Paulo — Banca Paulista",
      description:
        "Ficha editorial do GAECO, grupo de atuação especial do Ministério Público do Estado de São Paulo dedicado ao enfrentamento do crime organizado.",
      canonicalPath: "/instituicoes/gaeco",
    },
  },
  {
    id: "pcsp-1-ddm-cambuci",
    slug: "1-ddm-cambuci",
    nomeOficial: "1ª Delegacia de Defesa da Mulher",
    sigla: "1ª DDM",
    tipo: "unidade-atendimento",
    categoria: "policia-civil-especializada",
    descricao:
      "Unidade policial especializada da Polícia Civil do Estado de São Paulo, vinculada ao DECAP e à 1ª Delegacia Seccional de Polícia. As DDMs realizam atendimento especializado a violências cometidas contra mulheres, com registro de ocorrências, investigação e apuração de crimes, além das providências relacionadas a medidas protetivas previstas na Lei Maria da Penha. Esta unidade funciona nas instalações da Casa da Mulher Brasileira; a delegacia e a Casa são entidades distintas.",
    contatos: [
      {
        tipo: "telefone",
        rotulo: "Telefone informado pela Prefeitura de São Paulo",
        valor: "(11) 3275-8000",
        href: "tel:+551132758000",
      },
      {
        tipo: "site",
        rotulo: "Relação oficial de unidades",
        valor: "Consultar DDMs na Polícia Civil",
        href: "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
      },
    ],
    endereco: {
      texto: "Casa da Mulher Brasileira — Rua Vieira Ravasco, 26, Cambuci, São Paulo/SP.",
      fonteUrl:
        "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
    },
    fontes: [
      {
        titulo: "Delegacias de Polícia de Defesa da Mulher — Polícia Civil do Estado de São Paulo",
        url: "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Delegacias de Defesa da Mulher — Prefeitura de São Paulo",
        url: "https://prefeitura.sp.gov.br/web/direitos_humanos/w/mulheres/rede_de_protecao/seguranca_e_justica/357715",
        publicadaEm: "29/09/2026",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "1ª DDM — Cambuci | Polícia Civil de São Paulo — Banca Paulista",
      description:
        "Ficha editorial da 1ª Delegacia de Defesa da Mulher, unidade especializada da Polícia Civil instalada na Casa da Mulher Brasileira, no Cambuci.",
      canonicalPath: "/instituicoes/1-ddm-cambuci",
    },
  },
  {
    id: "pcsp-3-ddm-jaguare",
    slug: "3-ddm-jaguare",
    nomeOficial: "3ª Delegacia de Defesa da Mulher",
    sigla: "3ª DDM",
    tipo: "unidade-atendimento",
    categoria: "policia-civil-especializada",
    descricao:
      "Unidade policial especializada da Polícia Civil do Estado de São Paulo, vinculada ao DECAP e à 3ª Delegacia Seccional de Polícia. As DDMs realizam atendimento especializado a violências cometidas contra mulheres, com registro de ocorrências, investigação e apuração de crimes, além das providências relacionadas a medidas protetivas previstas na Lei Maria da Penha. Esta ficha não equipara a DDM a um Distrito Policial territorial nem declara área de atendimento.",
    contatos: [
      {
        tipo: "telefone",
        rotulo: "Telefone informado pela Prefeitura de São Paulo",
        valor: "(11) 3768-4664",
        href: "tel:+551137684664",
      },
      {
        tipo: "site",
        rotulo: "Relação oficial de unidades",
        valor: "Consultar DDMs na Polícia Civil",
        href: "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
      },
    ],
    endereco: {
      texto: "Avenida Corifeu de Azevedo Marques, 4300, Jaguaré, São Paulo/SP.",
      fonteUrl:
        "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
    },
    fontes: [
      {
        titulo: "Delegacias de Polícia de Defesa da Mulher — Polícia Civil do Estado de São Paulo",
        url: "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Delegacias de Defesa da Mulher — Prefeitura de São Paulo",
        url: "https://prefeitura.sp.gov.br/web/direitos_humanos/w/mulheres/rede_de_protecao/seguranca_e_justica/357715",
        publicadaEm: "29/09/2026",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "3ª DDM — Jaguaré | Polícia Civil de São Paulo — Banca Paulista",
      description:
        "Ficha editorial da 3ª Delegacia de Defesa da Mulher, unidade especializada da Polícia Civil vinculada ao DECAP, no Jaguaré.",
      canonicalPath: "/instituicoes/3-ddm-jaguare",
    },
  },
  {
    id: "pcsp-7-ddm-itaquera",
    slug: "7-ddm-itaquera",
    nomeOficial: "7ª Delegacia de Defesa da Mulher",
    sigla: "7ª DDM",
    tipo: "unidade-atendimento",
    categoria: "policia-civil-especializada",
    descricao:
      "Unidade policial especializada da Polícia Civil do Estado de São Paulo, vinculada ao DECAP e à 7ª Delegacia Seccional de Polícia. As DDMs realizam atendimento especializado a violências cometidas contra mulheres, com registro de ocorrências, investigação e apuração de crimes, além das providências relacionadas a medidas protetivas previstas na Lei Maria da Penha. Esta ficha não equipara a DDM a um Distrito Policial territorial nem declara área de atendimento.",
    contatos: [
      {
        tipo: "telefone",
        rotulo: "Telefones informados pela Prefeitura de São Paulo",
        valor: "(11) 2071-3488 / (11) 2071-4707",
        href: "tel:+551120713488",
      },
      {
        tipo: "site",
        rotulo: "Relação oficial de unidades",
        valor: "Consultar DDMs na Polícia Civil",
        href: "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
      },
    ],
    endereco: {
      texto: "Rua Sábado D’Ângelo, 46, Itaquera, São Paulo/SP.",
      fonteUrl:
        "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
    },
    fontes: [
      {
        titulo: "Delegacias de Polícia de Defesa da Mulher — Polícia Civil do Estado de São Paulo",
        url: "https://www.policiacivil.sp.gov.br/portal/ShowProperty?dID=dID%3A+98544&nodeId=%2FdipolContent%2FUCM_071416%2F%2FidcPrimaryFile&revision=latestreleased",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Delegacias de Defesa da Mulher — Prefeitura de São Paulo",
        url: "https://prefeitura.sp.gov.br/web/direitos_humanos/w/mulheres/rede_de_protecao/seguranca_e_justica/357715",
        publicadaEm: "29/09/2026",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "7ª DDM — Itaquera | Polícia Civil de São Paulo — Banca Paulista",
      description:
        "Ficha editorial da 7ª Delegacia de Defesa da Mulher, unidade especializada da Polícia Civil vinculada ao DECAP, em Itaquera.",
      canonicalPath: "/instituicoes/7-ddm-itaquera",
    },
  },
];
