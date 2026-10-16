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
  {
    id: "dpesp-defensoria-publica-sp",
    slug: "defensoria-publica-sp",
    nomeOficial: "Defensoria Pública do Estado de São Paulo",
    sigla: "DPESP",
    tipo: "orgao",
    categoria: "defensoria-publica",
    descricao:
      "Instituição pública estadual autônoma e função essencial à Justiça, voltada à orientação jurídica, à assistência jurídica integral e gratuita e à promoção e defesa dos direitos humanos. Sua estrutura reúne órgãos de administração superior, órgãos de execução e atuação, entre eles núcleos especializados; o atendimento ocorre em unidades distintas, que devem ser consultadas no diretório oficial, sem presumir um endereço único para toda a instituição.",
    contatos: [
      {
        tipo: "site",
        rotulo: "Endereços e telefones das unidades",
        valor: "Consultar unidades e canais da Defensoria",
        href: "https://www.defensoria.sp.def.br/institucional/enderecos-e-telefones",
      },
      {
        tipo: "outro",
        rotulo: "Núcleo especializado relacionado",
        valor: "NUPIR — Promoção da Igualdade Racial e Povos e Comunidades Tradicionais",
        href: "/instituicoes/nupir",
      },
    ],
    fontes: [
      {
        titulo: "A Instituição e organograma — Defensoria Pública do Estado de São Paulo",
        url: "https://www.defensoria.sp.def.br/institucional/organograma",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Endereços e telefones — Defensoria Pública do Estado de São Paulo",
        url: "https://www.defensoria.sp.def.br/institucional/enderecos-e-telefones",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "Defensoria Pública de SP | Assistência jurídica — Banca Paulista",
      description:
        "Guia editorial da Defensoria Pública do Estado de São Paulo, sua finalidade institucional, estrutura geral e canais oficiais de consulta.",
      canonicalPath: "/instituicoes/defensoria-publica-sp",
    },
  },
  {
    id: "dpesp-nupir",
    slug: "nupir",
    nomeOficial:
      "Núcleo Especializado de Promoção da Igualdade Racial e de Defesa dos Povos e Comunidades Tradicionais",
    sigla: "NUPIR",
    tipo: "nucleo-especializado",
    categoria: "defensoria-publica",
    descricao:
      "Núcleo especializado, consultivo e propositivo da Defensoria Pública do Estado de São Paulo. Atua na promoção da igualdade racial e na defesa dos direitos dos povos indígenas e das comunidades tradicionais, oferecendo suporte técnico-jurídico à instituição, propondo medidas judiciais e extrajudiciais e participando de ações de educação em direitos e de políticas públicas dentro de suas atribuições institucionais.",
    contatos: [
      {
        tipo: "email",
        rotulo: "E-mail institucional",
        valor: "nupir@defensoria.sp.def.br",
        href: "mailto:nupir@defensoria.sp.def.br",
      },
      {
        tipo: "site",
        rotulo: "Página institucional",
        valor: "Consultar NUPIR na Defensoria Pública",
        href: "https://www.defensoria.sp.def.br/pt/web/guest/nucleos-especializados/pagina-inicial-nucleos-especializados/promocao-da-igualdade-racial-e-de-defesa-dos-povos-e-comunidades-tradicionais",
      },
      {
        tipo: "outro",
        rotulo: "Instituição responsável",
        valor: "Defensoria Pública do Estado de São Paulo",
        href: "/instituicoes/defensoria-publica-sp",
      },
    ],
    fontes: [
      {
        titulo: "NUPIR — Defensoria Pública do Estado de São Paulo",
        url: "https://www.defensoria.sp.def.br/pt/web/guest/nucleos-especializados/pagina-inicial-nucleos-especializados/promocao-da-igualdade-racial-e-de-defesa-dos-povos-e-comunidades-tradicionais",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Endereços e telefones — Defensoria Pública do Estado de São Paulo",
        url: "https://www.defensoria.sp.def.br/institucional/enderecos-e-telefones",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "NUPIR | Defensoria Pública de São Paulo — Banca Paulista",
      description:
        "Ficha editorial do NUPIR, núcleo especializado da Defensoria Pública de São Paulo para promoção da igualdade racial e defesa de povos e comunidades tradicionais.",
      canonicalPath: "/instituicoes/nupir",
    },
  },
  {
    id: "tjsp-foro-regional-ii-santo-amaro",
    slug: "foro-regional-ii-santo-amaro",
    nomeOficial: "Foro Regional II — Santo Amaro",
    sigla: "Foro Regional II",
    tipo: "foro-regional",
    categoria: "foruns-tribunais",
    descricao:
      "Unidade do Tribunal de Justiça do Estado de São Paulo com instalações identificadas pelo TJSP em dois edifícios de Santo Amaro. O prédio da Avenida das Nações Unidas reúne varas cíveis e de família e sucessões; o da Avenida Adolfo Pinheiro reúne varas criminal, da infância e juventude, juizado especial cível e a unidade regional Sul II de violência doméstica e familiar contra a mulher. A ficha não infere competência territorial além das referências oficiais consultadas.",
    contatos: [
      {
        tipo: "site",
        rotulo: "Portal do Tribunal",
        valor: "Consultar serviços e canais do TJSP",
        href: "https://www.tjsp.jus.br/",
      },
      {
        tipo: "site",
        rotulo: "Referência institucional",
        valor: "Consultar a relação de foros da Capital",
        href: "https://www.tjsp.jus.br/Noticias/Noticia?codigoNoticia=58000",
      },
    ],
    endereco: {
      texto:
        "Prédio Nações Unidas: Avenida das Nações Unidas, 22939, Santo Amaro; Prédio Adolfo Pinheiro: Avenida Adolfo Pinheiro, 1992, Santo Amaro, São Paulo/SP.",
      fonteUrl: "https://www.tjsp.jus.br/Noticias/Noticia?codigoNoticia=58000",
    },
    fontes: [
      {
        titulo: "Entenda a competência territorial dos foros da Capital — TJSP",
        url: "https://www.tjsp.jus.br/Noticias/Noticia?codigoNoticia=58000",
        publicadaEm: "26/06/2019",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Portal do Tribunal de Justiça de São Paulo",
        url: "https://www.tjsp.jus.br/",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "Foro Regional II — Santo Amaro | TJSP — Banca Paulista",
      description:
        "Guia editorial do Foro Regional II — Santo Amaro, unidade do TJSP com referências oficiais a dois edifícios e seus serviços judiciais.",
      canonicalPath: "/instituicoes/foro-regional-ii-santo-amaro",
    },
  },
  {
    id: "tjsp-foro-regional-iii-jabaquara",
    slug: "foro-regional-iii-jabaquara",
    nomeOficial: "Foro Regional III — Jabaquara/Saúde",
    sigla: "Foro Regional III",
    tipo: "foro-regional",
    categoria: "foruns-tribunais",
    descricao:
      "Unidade do Tribunal de Justiça do Estado de São Paulo identificada pelo TJSP como Foro Regional III — Jabaquara/Saúde. A referência institucional consultada informa varas cíveis, de família e sucessões, criminal, da infância e juventude, juizado especial cível e de acidentes do trabalho. A localização na Vila Mariana não permite atribuir, por proximidade, competência a bairros ou regiões não indicados pela fonte.",
    contatos: [
      {
        tipo: "site",
        rotulo: "Portal do Tribunal",
        valor: "Consultar serviços e canais do TJSP",
        href: "https://www.tjsp.jus.br/",
      },
      {
        tipo: "site",
        rotulo: "Referência institucional",
        valor: "Consultar a relação de foros da Capital",
        href: "https://www.tjsp.jus.br/Noticias/Noticia?codigoNoticia=58000",
      },
    ],
    endereco: {
      texto: "Rua Afonso Celso, 1065, Vila Mariana, São Paulo/SP.",
      fonteUrl: "https://www.tjsp.jus.br/Noticias/Noticia?codigoNoticia=58000",
    },
    fontes: [
      {
        titulo: "Entenda a competência territorial dos foros da Capital — TJSP",
        url: "https://www.tjsp.jus.br/Noticias/Noticia?codigoNoticia=58000",
        publicadaEm: "26/06/2019",
        consultadaEm: "16/10/2026",
      },
      {
        titulo: "Portal do Tribunal de Justiça de São Paulo",
        url: "https://www.tjsp.jus.br/",
        consultadaEm: "16/10/2026",
      },
    ],
    statusEditorial: "publicado",
    relacoesTerritoriais: [],
    seo: {
      title: "Foro Regional III — Jabaquara/Saúde | TJSP — Banca Paulista",
      description:
        "Guia editorial do Foro Regional III — Jabaquara/Saúde, unidade do TJSP localizada na Vila Mariana, com serviços judiciais indicados pela fonte oficial.",
      canonicalPath: "/instituicoes/foro-regional-iii-jabaquara",
    },
  },
];
