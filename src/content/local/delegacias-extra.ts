import type { Delegacia } from "../types";

export const AVISO_RODAPE =
  "Este conteúdo possui finalidade exclusivamente informativa. O Escritório de Advocacia não possui vínculo com a Polícia Civil, com o distrito policial mencionado ou com qualquer órgão público. A indicação de bairros próximos não representa definição oficial de circunscrição policial. Cada atendimento está sujeito à análise prévia de viabilidade, disponibilidade e ausência de conflito de interesses.";

/**
 * Páginas territoriais adicionais (Zona Oeste e Zona Sul) com conteúdo editorial
 * longo. Nenhum dado operacional da unidade é afirmado: contexto histórico
 * refere-se ao bairro, não à administração do distrito policial.
 */
export const delegaciasExtra: Delegacia[] = [
  {
    id: "dp-7",
    slug: "advogado-criminal-7-dp-vila-romana",
    h1: "Advogado criminal próximo ao 7º DP na Vila Romana",
    cardTitulo: "Advogado criminal próximo ao 7º DP",
    cardSubtitulo: "Vila Romana / Lapa",
    cardResumo:
      "O Escritório de Advocacia presta atendimento jurídico criminal na região da Vila Romana e da Lapa, incluindo procedimentos relacionados ao 7º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 7º DP Vila Romana | São Paulo",
      description:
        "Atendimento jurídico criminal na região do 7º DP, abrangendo Vila Romana, Lapa, Vila Ipojuca e bairros próximos da Zona Oeste de São Paulo.",
      canonicalPath: "/delegacias/advogado-criminal-7-dp-vila-romana",
      keywords: [
        "advogado criminal 7º DP Vila Romana",
        "advogado criminal Lapa São Paulo",
        "advogado criminal Zona Oeste SP",
      ],
    },
    introducao:
      "Atendimento jurídico para pessoas, famílias e empresas localizadas na Vila Romana, Lapa, Vila Ipojuca, Alto da Lapa e regiões próximas da Zona Oeste de São Paulo, incluindo situações que possam resultar em boletim de ocorrência, intimação, investigação ou procedimento relacionado ao 7º Distrito Policial.",
    unidade: {
      numero: "7",
      nomeOficial: "7º Distrito Policial — Vila Romana",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "A Vila Romana faz parte da expansão histórica da região da Lapa. Entre as décadas de 1880 e 1890, loteamentos como Vila Romana, Grão Burgo da Lapa e Vila Sofia impulsionaram a urbanização da área, atraindo especialmente famílias de imigrantes italianos. A proximidade com a ferrovia favoreceu posteriormente o crescimento industrial, comercial e residencial da Zona Oeste.",
    regiaoSlug: "lapa",
    bairros: [
      "Vila Romana",
      "Lapa",
      "Vila Ipojuca",
      "Alto da Lapa",
      "Água Branca",
      "Pompeia",
      "Vila Anglo Brasileira",
    ],
    observacaoBairros:
      "A inclusão de um bairro como referência geográfica não significa necessariamente que todas as ocorrências daquela localidade pertençam à circunscrição do 7º DP. A unidade responsável deve ser confirmada conforme o local e a natureza dos fatos.",
    secoes: [
      {
        titulo: "Atendimento jurídico criminal na região da Vila Romana",
        paragrafos: [
          "O Escritório de Advocacia realiza uma análise reservada das informações iniciais, identifica a natureza do procedimento e verifica as medidas jurídicas adequadas para cada situação, sem promessa de resultado e sem vínculo institucional com órgãos policiais.",
          "A atuação pode compreender a orientação de pessoas investigadas, vítimas, familiares, representantes de empresas ou pessoas convocadas para prestar esclarecimentos.",
        ],
        lista: [
          "prisão em flagrante",
          "intimação para comparecimento",
          "acompanhamento em depoimento",
          "boletim de ocorrência",
          "inquérito policial",
          "pedido de acesso a procedimento",
          "medidas cautelares",
          "busca e apreensão",
          "crimes patrimoniais",
          "conflitos envolvendo empresas, empregados ou prestadores",
          "orientação jurídica a vítimas e familiares",
        ],
      },
      {
        titulo: "Perfil atual da região",
        paragrafos: [
          "Atualmente, a região reúne condomínios residenciais, comércio de bairro, escritórios, estabelecimentos gastronômicos, escolas, clínicas e importantes corredores de circulação. Essa diversidade territorial pode gerar ocorrências envolvendo moradores, comerciantes, trabalhadores, empresas e pessoas em trânsito.",
          "O 7º Distrito Policial está localizado na Vila Romana e funciona como uma das referências policiais da região oeste. A menção à unidade nesta página tem finalidade territorial e informativa; não significa que o escritório integre ou represente a Polícia Civil.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["prisao-em-flagrante", "intimacao", "inquerito", "busca-e-apreensao"],
    faq: [
      {
        id: "dp7-faq-1",
        pergunta: "O Escritório de Advocacia atende procedimentos relacionados ao 7º DP?",
        resposta:
          "Sim. O escritório pode analisar situações relacionadas ao 7º Distrito Policial e a outras unidades da Zona Oeste, dependendo da natureza do caso, da disponibilidade profissional e da existência de eventual conflito de interesses.",
      },
      {
        id: "dp7-faq-2",
        pergunta: "O advogado pode acompanhar uma pessoa que foi intimada?",
        resposta:
          "Em determinadas situações, sim. Antes do comparecimento, é recomendável identificar o conteúdo da intimação, a condição em que a pessoa será ouvida e o procedimento ao qual o documento está vinculado.",
      },
      {
        id: "dp7-faq-3",
        pergunta: "Preciso enviar o boletim de ocorrência imediatamente?",
        resposta:
          "Não necessariamente. Na triagem inicial podem ser informados apenas os dados gerais do documento, como número, unidade policial e data. Documentos sensíveis devem ser compartilhados somente por canal indicado pelo escritório.",
      },
      {
        id: "dp7-faq-4",
        pergunta: "O 7º DP indicou este Escritório de Advocacia?",
        resposta:
          "Não. O escritório é privado e independente. Não existe parceria, indicação, credenciamento ou vínculo institucional com o 7º DP, com a Polícia Civil ou com o Governo do Estado.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    id: "dp-11",
    slug: "advogado-criminal-11-dp-santo-amaro",
    h1: "Advogado criminal próximo ao 11º DP Santo Amaro",
    cardTitulo: "Advogado criminal próximo ao 11º DP",
    cardSubtitulo: "Santo Amaro",
    cardResumo:
      "Atendimento jurídico criminal em Santo Amaro e bairros próximos, incluindo análise de ocorrências e procedimentos relacionados ao 11º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 11º DP Santo Amaro | SP",
      description:
        "Atendimento jurídico criminal na região do 11º DP Santo Amaro, incluindo Chácara Santo Antônio, Alto da Boa Vista e bairros próximos.",
      canonicalPath: "/delegacias/advogado-criminal-11-dp-santo-amaro",
      keywords: [
        "advogado criminal 11º DP Santo Amaro",
        "advogado criminal Santo Amaro",
        "advogado criminal Zona Sul SP",
      ],
    },
    introducao:
      "O Escritório de Advocacia atende pessoas e empresas em Santo Amaro, Chácara Santo Antônio, Alto da Boa Vista, Granja Julieta, Campo Grande e regiões próximas, inclusive quando existe boletim de ocorrência, intimação ou investigação relacionada ao 11º Distrito Policial.",
    unidade: {
      numero: "11",
      nomeOficial: "11º Distrito Policial — Santo Amaro",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "Santo Amaro possui uma das formações históricas mais antigas e particulares de São Paulo. A região teve uma capela ainda no século XVI, foi elevada a freguesia em 1686 e tornou-se município independente em 1832. Sua autonomia foi mantida por mais de cem anos, até a incorporação ao Município de São Paulo em 1935.",
    regiaoSlug: "santo-amaro",
    bairros: [
      "Santo Amaro",
      "Chácara Santo Antônio",
      "Alto da Boa Vista",
      "Granja Julieta",
      "Campo Grande",
      "Jardim Marajoara",
      "Brooklin",
    ],
    observacaoBairros:
      "Essas localidades são referências territoriais de proximidade. A definição da delegacia competente depende do endereço exato da ocorrência e da organização territorial da Polícia Civil.",
    secoes: [
      {
        titulo: "Atuação criminal em Santo Amaro",
        paragrafos: [
          "O atendimento começa pela compreensão dos fatos e pela identificação da posição jurídica da pessoa envolvida: investigado, vítima, familiar, testemunha, representante de empresa ou pessoa convocada para comparecer à unidade policial.",
          "A advocacia criminal na região pode envolver situações urgentes ou procedimentos que já estejam em andamento.",
        ],
        lista: [
          "análise de intimações e documentos policiais",
          "orientação antes de depoimentos",
          "acompanhamento em delegacia",
          "atuação em prisão em flagrante",
          "requerimento de acesso ao procedimento",
          "análise de medidas protetivas",
          "orientação a vítimas",
          "defesa em investigações",
          "acompanhamento de inquéritos",
          "atuação em crimes empresariais e patrimoniais",
          "avaliação de medidas judiciais relacionadas à investigação",
        ],
      },
      {
        titulo: "Perfil atual da região",
        paragrafos: [
          "Essa história ajuda a explicar por que Santo Amaro continua funcionando como um centro regional relativamente autônomo, com comércio intenso, serviços públicos, hospitais, escolas, empresas, terminais de transporte e grande circulação diária de pessoas.",
          "O 11º Distrito Policial integra essa estrutura territorial e atende ocorrências encaminhadas à unidade conforme sua atribuição. O escritório pode atuar em procedimentos relacionados ao distrito policial, mas não possui vínculo ou acesso privilegiado à Polícia Civil.",
          "A existência de um boletim de ocorrência não significa automaticamente que haverá indiciamento, denúncia ou processo criminal. Cada etapa deve ser analisada separadamente.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "investigacao-empresarial"],
    faq: [
      {
        id: "dp11-faq-1",
        pergunta: "Fui chamado ao 11º DP. Devo comparecer sem saber do que se trata?",
        resposta:
          "É recomendável compreender previamente o motivo do comparecimento, sempre que isso for possível. O advogado pode analisar a intimação e orientar sobre a natureza do ato antes da data indicada.",
      },
      {
        id: "dp11-faq-2",
        pergunta: "Uma empresa pode receber atendimento em procedimento policial?",
        resposta:
          "Sim. Empresas podem estar envolvidas como vítimas, comunicantes, investigadas ou responsáveis pela apresentação de documentos e representantes. A estratégia depende da natureza da ocorrência e da posição da pessoa jurídica.",
      },
      {
        id: "dp11-faq-3",
        pergunta: "O escritório atende prisões e situações urgentes em Santo Amaro?",
        resposta:
          "A possibilidade de atendimento depende da disponibilidade profissional, da localização, da natureza da ocorrência e da ausência de conflito de interesses. Situações urgentes devem ser comunicadas com informações objetivas.",
      },
      {
        id: "dp11-faq-4",
        pergunta: "A página pertence ao 11º Distrito Policial?",
        resposta:
          "Não. Esta é uma página de um Escritório de Advocacia privado. O nome da unidade é utilizado exclusivamente para informar a área geográfica e o tipo de procedimento que pode ser analisado.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "conflitos-societarios-e-exposicao-penal",
    ],
  },
  {
    id: "dp-16",
    slug: "advogado-criminal-16-dp-vila-clementino",
    h1: "Advogado criminal próximo ao 16º DP Vila Clementino",
    cardTitulo: "Advogado criminal próximo ao 16º DP",
    cardSubtitulo: "Vila Clementino",
    cardResumo:
      "O Escritório de Advocacia atende pessoas, profissionais e empresas na Vila Clementino, Vila Mariana, Saúde e bairros próximos ao 16º DP.",
    seo: {
      title: "Advogado criminal próximo ao 16º DP Vila Clementino",
      description:
        "Atendimento jurídico criminal na Vila Clementino, Vila Mariana, Saúde, Mirandópolis e região do 16º Distrito Policial em São Paulo.",
      canonicalPath: "/delegacias/advogado-criminal-16-dp-vila-clementino",
      keywords: [
        "advogado criminal 16º DP Vila Clementino",
        "advogado criminal Vila Mariana",
        "advogado criminal Saúde São Paulo",
      ],
    },
    introducao:
      "Atendimento jurídico criminal para pessoas e empresas situadas na Vila Clementino, Vila Mariana, Mirandópolis, Saúde, Indianópolis e áreas próximas, incluindo análise de intimações, boletins de ocorrência e procedimentos relacionados ao 16º Distrito Policial.",
    unidade: {
      numero: "16",
      nomeOficial: "16º Distrito Policial — Vila Clementino",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "A Vila Clementino está inserida na região histórica da Vila Mariana, cujo desenvolvimento foi impulsionado no final do século XIX pela instalação do Matadouro Municipal, pelas oficinas do Ferro Carril, pela abertura de estabelecimentos comerciais e pela chegada de famílias de imigrantes. Com o passar das décadas, a região consolidou uma forte presença de instituições ligadas à saúde, pesquisa, educação, cultura e prestação de serviços.",
    regiaoSlug: "vila-mariana",
    bairros: [
      "Vila Clementino",
      "Vila Mariana",
      "Mirandópolis",
      "Saúde",
      "Indianópolis",
      "Moema",
      "Chácara Inglesa",
    ],
    observacaoBairros:
      "A proximidade geográfica não determina automaticamente qual distrito policial será responsável pelo caso. Essa informação deve ser confirmada de acordo com o local dos fatos.",
    secoes: [
      {
        titulo: "Advocacia criminal na Vila Clementino",
        paragrafos: [
          "A atuação é conduzida com discrição, preservação das informações e avaliação individualizada da posição jurídica de cada pessoa envolvida.",
          "A Vila Clementino reúne hospitais, universidades, clínicas, laboratórios, residências, empresas e estabelecimentos comerciais. Nesse ambiente, as situações jurídicas podem envolver tanto relações particulares quanto acontecimentos ocorridos em ambientes profissionais ou institucionais.",
        ],
        lista: [
          "orientação antes de comparecimento à delegacia",
          "acompanhamento de profissionais e representantes de empresas",
          "análise de ocorrências em hospitais, clínicas ou estabelecimentos",
          "crimes contra o patrimônio",
          "conflitos entre particulares",
          "investigações envolvendo documentos ou sistemas digitais",
          "ocorrências de trânsito com repercussão criminal",
          "medidas protetivas",
          "depoimentos e oitivas",
          "defesa em inquéritos policiais",
          "orientação a vítimas e familiares",
        ],
      },
      {
        titulo: "Circulação e perfil institucional da área",
        paragrafos: [
          "O perfil da região cria uma circulação permanente de moradores, estudantes, pacientes, profissionais de saúde, empregados, empresários e visitantes. O 16º Distrito Policial é uma das referências territoriais da área para o registro e a apuração de ocorrências encaminhadas à unidade.",
          "O conteúdo de cada procedimento deve ser analisado antes da definição de qualquer estratégia.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "busca-e-apreensao", "investigacao-empresarial"],
    faq: [
      {
        id: "dp16-faq-1",
        pergunta:
          "Profissionais de saúde podem procurar o escritório por ocorrências relacionadas ao trabalho?",
        resposta:
          "Sim. Médicos, profissionais de enfermagem, gestores, clínicas e demais envolvidos podem solicitar uma análise jurídica quando existe ocorrência policial, intimação ou investigação relacionada a fatos ocorridos no ambiente profissional.",
      },
      {
        id: "dp16-faq-2",
        pergunta: "Posso ser ouvido como testemunha acompanhado por advogado?",
        resposta:
          "A possibilidade e a forma do acompanhamento devem ser analisadas conforme o procedimento e a condição da pessoa convocada. O primeiro passo é verificar o conteúdo da intimação.",
      },
      {
        id: "dp16-faq-3",
        pergunta: "O escritório consegue descobrir o conteúdo de qualquer investigação?",
        resposta:
          "Não existe acesso irrestrito ou privilegiado. O acesso depende da identificação do procedimento, da representação jurídica, das normas aplicáveis e de eventuais restrições legais ou judiciais.",
      },
      {
        id: "dp16-faq-4",
        pergunta: "A análise inicial representa contratação?",
        resposta:
          "Não. A triagem serve para compreender a situação, verificar a viabilidade de atendimento e identificar possíveis impedimentos. A contratação somente ocorre mediante concordância formal entre as partes.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    id: "dp-23",
    slug: "advogado-criminal-23-dp-perdizes",
    h1: "Advogado criminal próximo ao 23º DP Perdizes",
    cardTitulo: "Advogado criminal próximo ao 23º DP",
    cardSubtitulo: "Perdizes",
    cardResumo:
      "Atendimento jurídico criminal em Perdizes, Pacaembu, Pompeia e regiões próximas, incluindo procedimentos relacionados ao 23º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 23º DP Perdizes | São Paulo",
      description:
        "Atendimento jurídico criminal em Perdizes, Pacaembu, Pompeia, Sumaré e região do 23º Distrito Policial na Zona Oeste de São Paulo.",
      canonicalPath: "/delegacias/advogado-criminal-23-dp-perdizes",
      keywords: [
        "advogado criminal 23º DP Perdizes",
        "advogado criminal Perdizes",
        "advogado criminal Pompeia São Paulo",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento jurídico na região de Perdizes, Pacaembu, Pompeia, Sumaré, Água Branca e bairros próximos da Zona Oeste, inclusive em situações que estejam sendo registradas ou apuradas pelo 23º Distrito Policial.",
    unidade: {
      numero: "23",
      nomeOficial: "23º Distrito Policial — Perdizes",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "As referências históricas de Perdizes remontam a 1897, quando Joaquim Alves Fidelis passou a residir na região e criava perdizes em seu terreno. O local ficou conhecido como “quintal das perdizes”, expressão que acabou dando nome ao bairro. A história local também permanece registrada nos nomes de ruas como Turiassu, Itapicuru, Caetés, Apiacás, Apinajés e Cayowaá, que fazem referência a povos e denominações indígenas.",
    regiaoSlug: "perdizes",
    bairros: [
      "Perdizes",
      "Pacaembu",
      "Pompeia",
      "Sumaré",
      "Água Branca",
      "Barra Funda",
      "Vila Anglo Brasileira",
      "Jardim das Perdizes",
    ],
    observacaoBairros:
      "Essas referências são utilizadas para contextualização geográfica. Elas não substituem a consulta oficial sobre a circunscrição policial de cada endereço.",
    secoes: [
      {
        titulo: "Atendimento criminal em Perdizes e região",
        paragrafos: [
          "O atendimento pode envolver moradores, estudantes, profissionais, famílias, condomínios, comerciantes e empresas que necessitem compreender uma ocorrência policial ou adotar providências jurídicas.",
          "A atuação do escritório pode abranger situações ocorridas em residências, condomínios, estabelecimentos comerciais, instituições de ensino, vias públicas e ambientes profissionais.",
        ],
        lista: [
          "furtos, roubos e fraudes",
          "conflitos condominiais com repercussão criminal",
          "ameaças e crimes contra a honra",
          "ocorrências envolvendo documentos",
          "investigações digitais",
          "acidentes de trânsito",
          "intimações para depoimento",
          "medidas protetivas",
          "prisão em flagrante",
          "acompanhamento de vítimas",
          "defesa em investigação policial",
        ],
      },
      {
        titulo: "Perfil atual da região",
        paragrafos: [
          "Com o desenvolvimento urbano da Zona Oeste, Perdizes consolidou-se como uma área predominantemente residencial, mas com forte presença de universidades, escolas, clínicas, comércio, serviços, arenas de eventos e grandes condomínios.",
          "Essa combinação provoca intensa circulação diária e uma variedade de situações que podem demandar orientação jurídica. O enquadramento jurídico somente pode ser definido depois da análise objetiva dos fatos e dos documentos disponíveis.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["prisao-em-flagrante", "intimacao", "inquerito", "bloqueio-patrimonial"],
    faq: [
      {
        id: "dp23-faq-1",
        pergunta: "O escritório atende moradores de condomínios em Perdizes?",
        resposta:
          "Sim. Situações envolvendo moradores, funcionários, síndicos, prestadores de serviços e visitantes podem ser analisadas quando possuem repercussão policial ou criminal.",
      },
      {
        id: "dp23-faq-2",
        pergunta: "Uma discussão ou ameaça sempre gera processo criminal?",
        resposta:
          "Não. O desdobramento depende do conteúdo dos fatos, das provas existentes, da manifestação das pessoas envolvidas e das providências adotadas pelas autoridades competentes.",
      },
      {
        id: "dp23-faq-3",
        pergunta: "Prints de mensagens podem ser utilizados na análise inicial?",
        resposta:
          "Podem auxiliar na compreensão dos acontecimentos, mas devem ser preservados de maneira adequada. Não é recomendável editar, recortar excessivamente ou alterar os arquivos originais.",
      },
      {
        id: "dp23-faq-4",
        pergunta: "Existe garantia de que o escritório assumirá o caso?",
        resposta:
          "Não. O atendimento depende de análise de viabilidade, disponibilidade, área de atuação, ausência de conflito de interesses e formalização da contratação.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "protecao-patrimonial-e-planejamento-sucessorio",
    ],
  },
  {
    id: "dp-91",
    slug: "advogado-criminal-91-dp-ceagesp-vila-leopoldina",
    h1: "Advogado criminal próximo ao 91º DP CEAGESP",
    cardTitulo: "Advogado criminal próximo ao 91º DP",
    cardSubtitulo: "CEAGESP e Vila Leopoldina",
    cardResumo:
      "Atendimento jurídico criminal na Vila Leopoldina e região da CEAGESP, incluindo procedimentos relacionados ao 91º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 91º DP CEAGESP",
      description:
        "Atendimento jurídico criminal na Vila Leopoldina e região da CEAGESP, incluindo empresas, comerciantes, transportadores e moradores.",
      canonicalPath: "/delegacias/advogado-criminal-91-dp-ceagesp-vila-leopoldina",
      keywords: [
        "advogado criminal 91º DP CEAGESP",
        "advogado criminal Vila Leopoldina",
        "advogado criminal empresarial Zona Oeste",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento a pessoas e empresas na Vila Leopoldina, Vila Hamburguesa, Alto da Lapa, Jaguaré e região da CEAGESP, incluindo procedimentos policiais relacionados ao 91º Distrito Policial.",
    unidade: {
      numero: "91",
      nomeOficial: "91º Distrito Policial — CEAGESP / Vila Leopoldina",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "A Vila Leopoldina passou por uma forte transformação urbana ao longo do século XX. A região foi urbanizada durante a década de 1920 e posteriormente recebeu indústrias, armazéns e estruturas logísticas favorecidas pela proximidade com as ferrovias, marginais e os rios Pinheiros e Tietê. Em 1966, o então CEASA foi instalado na Vila Leopoldina; a CEAGESP surgiu em 1969, a partir da fusão do Centro Estadual de Abastecimento com a Companhia de Armazéns Gerais do Estado de São Paulo.",
    regiaoSlug: "vila-leopoldina",
    bairros: [
      "Vila Leopoldina",
      "Vila Hamburguesa",
      "Alto da Lapa",
      "Jaguaré",
      "Lapa",
      "Parque Villa-Lobos",
      "Entorno da CEAGESP",
    ],
    observacaoBairros:
      "Os pontos citados ajudam a reconhecer a área de atendimento, mas não representam uma declaração formal sobre os limites de circunscrição do 91º DP.",
    secoes: [
      {
        titulo: "Advocacia criminal na Vila Leopoldina e na região da CEAGESP",
        paragrafos: [
          "A atuação pode envolver moradores, comerciantes, permissionários, transportadores, motoristas, funcionários, empresas de logística, fornecedores e pessoas que circulam pelo polo de abastecimento.",
          "A região possui características residenciais, comerciais, industriais e logísticas. Por isso, as ocorrências podem envolver tanto relações pessoais quanto atividades empresariais e profissionais.",
        ],
        lista: [
          "ocorrências patrimoniais",
          "furtos e desvios de mercadorias",
          "fraudes comerciais",
          "conflitos envolvendo cargas e transportes",
          "apropriação indevida",
          "falsidade documental",
          "investigações empresariais",
          "acidentes com possível repercussão criminal",
          "intimações de empregados ou representantes",
          "prisão em flagrante",
          "busca e apreensão",
          "orientação de vítimas e empresas",
          "acompanhamento de inquérito policial",
        ],
      },
      {
        titulo: "Preservação de elementos e perfil atual da área",
        paragrafos: [
          "A atuação deve considerar a preservação de documentos, registros de acesso, imagens, notas, contratos, mensagens e demais elementos relacionados ao fato.",
          "Nas décadas seguintes à instalação do polo de abastecimento, a Vila Leopoldina passou a combinar a atividade logística tradicional com edifícios residenciais, escritórios, restaurantes, serviços, espaços culturais e empreendimentos imobiliários. O 91º Distrito Policial está associado territorialmente à região da CEAGESP e da Vila Leopoldina; a referência à unidade é exclusivamente informativa.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: [
      "investigacao-empresarial",
      "busca-e-apreensao",
      "intimacao",
      "inquerito",
    ],
    faq: [
      {
        id: "dp91-faq-1",
        pergunta: "O escritório atende empresas localizadas dentro ou próximas à CEAGESP?",
        resposta:
          "Sim, desde que o assunto esteja dentro da área de atuação do escritório e não exista conflito de interesses. Empresas, comerciantes e representantes podem solicitar análise de ocorrências e investigações.",
      },
      {
        id: "dp91-faq-2",
        pergunta: "Como preservar provas de uma ocorrência envolvendo mercadorias?",
        resposta:
          "É importante evitar alterações nos registros originais e preservar documentos, imagens, notas fiscais, controles de acesso, identificação de veículos, mensagens e dados de pessoas que presenciaram o fato.",
      },
      {
        id: "dp91-faq-3",
        pergunta: "Um funcionário intimado deve comparecer como representante da empresa?",
        resposta:
          "Isso dependerá do conteúdo da intimação e da condição em que foi convocado. A empresa e o profissional devem compreender previamente se o comparecimento é pessoal, testemunhal ou relacionado à representação da pessoa jurídica.",
      },
      {
        id: "dp91-faq-4",
        pergunta: "O escritório possui relação com a administração da CEAGESP ou com o 91º DP?",
        resposta:
          "Não. O Escritório de Advocacia é independente e não possui vínculo institucional, comercial ou administrativo com a CEAGESP, com o 91º Distrito Policial ou com a Polícia Civil.",
      },
    ],
    conteudosRelacionados: [
      "conflitos-societarios-e-exposicao-penal",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
];