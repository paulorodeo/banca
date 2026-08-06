import type { Delegacia } from "../types";
import { AVISO_RODAPE } from "./delegacias-extra";

/**
 * Expansão territorial: complemento da Zona Oeste (78º, 93º, 75º) e
 * expansão da Zona Sul (36º, 35º, 99º). Nenhum dado operacional das
 * unidades é afirmado; o contexto histórico refere-se ao bairro.
 */
export const delegaciasExtra2: Delegacia[] = [
  {
    id: "dp-78",
    slug: "advogado-criminal-78-dp-jardins",
    h1: "Advogado criminal próximo ao 78º DP Jardins",
    cardTitulo: "Advogado criminal próximo ao 78º DP",
    cardSubtitulo: "Jardins",
    cardResumo:
      "Atendimento jurídico criminal nos Jardins, Jardim América, Jardim Paulista e regiões próximas, incluindo procedimentos relacionados ao 78º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 78º DP Jardins | São Paulo",
      description:
        "Atendimento jurídico criminal na região do 78º DP Jardins, incluindo Jardim América, Jardim Paulista, Cerqueira César e bairros próximos.",
      canonicalPath: "/delegacias/advogado-criminal-78-dp-jardins",
      keywords: [
        "advogado criminal 78º DP Jardins",
        "advogado criminal Jardim América",
        "advogado criminal Jardim Paulista São Paulo",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento jurídico criminal a pessoas, famílias, profissionais e empresas na região do Jardim América, Jardim Paulista, Cerqueira César, Jardim Europa, Jardim Paulistano e bairros próximos, incluindo situações relacionadas ao 78º Distrito Policial — Jardins. O atendimento é realizado de maneira reservada, com análise da condição jurídica de cada pessoa envolvida e avaliação dos documentos disponíveis antes da definição das providências aplicáveis ao caso.",
    unidade: {
      numero: "78",
      nomeOficial: "78º Distrito Policial — Jardins",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "Os bairros conhecidos coletivamente como Jardins foram formados durante o processo de expansão urbana de São Paulo no início do século XX. Projetos como o Jardim América introduziram um modelo urbano caracterizado por ruas curvas, áreas arborizadas, lotes residenciais amplos e planejamento paisagístico diferenciado. Posteriormente, Jardim Europa, Jardim Paulista e Jardim Paulistano passaram a compor o conjunto territorial conhecido como Jardins.",
    regiaoSlug: "jardins",
    bairros: [
      "Jardim América",
      "Jardim Paulista",
      "Cerqueira César",
      "Jardim Europa",
      "Jardim Paulistano",
      "Bela Vista",
      "Consolação",
    ],
    observacaoBairros:
      "Essas localidades são apresentadas como referências geográficas. A definição da unidade policial responsável por determinada ocorrência depende do endereço exato dos fatos, da natureza da ocorrência e da organização territorial da Polícia Civil.",
    secoes: [
      {
        titulo: "Atendimento criminal nos Jardins e regiões próximas",
        paragrafos: [
          "A região dos Jardins concentra residências, condomínios, hotéis, restaurantes, hospitais, consultórios, escritórios, lojas, instituições financeiras e estabelecimentos de alto fluxo.",
          "Essa diversidade faz com que uma ocorrência possa envolver moradores, turistas, profissionais, funcionários, comerciantes, representantes de empresas ou pessoas que apenas estavam em trânsito pela região.",
          "A atuação depende da análise individualizada dos fatos. A simples existência de um boletim de ocorrência não permite concluir, por si só, que haverá indiciamento, denúncia ou processo criminal.",
        ],
        lista: [
          "intimações para comparecimento",
          "boletins de ocorrência",
          "prisão em flagrante",
          "acompanhamento em depoimentos",
          "furtos, roubos e crimes patrimoniais",
          "fraudes bancárias ou eletrônicas",
          "ameaças e perseguições",
          "crimes contra a honra",
          "conflitos com repercussão criminal",
          "investigações envolvendo empresas",
          "busca e apreensão",
          "orientação jurídica para vítimas",
          "acompanhamento de inquérito policial",
        ],
      },
      {
        titulo: "Contexto territorial e histórico dos Jardins",
        paragrafos: [
          "A transformação da Avenida Paulista e de seus arredores também modificou o perfil da região. Antigas residências deram lugar a edifícios, centros empresariais, hospitais, hotéis, comércio especializado e intensa circulação diária.",
          "O 78º Distrito Policial está inserido nesse contexto territorial e constitui uma das referências policiais da região.",
          "A menção à delegacia nesta página tem finalidade exclusivamente informativa e geográfica. O Escritório de Advocacia não possui vínculo, parceria ou relação institucional com o 78º DP ou com a Polícia Civil.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "busca-e-apreensao"],
    faq: [
      {
        id: "dp78-faq-1",
        pergunta: "O escritório atende procedimentos relacionados ao 78º DP Jardins?",
        resposta:
          "Sim. O Escritório de Advocacia pode analisar ocorrências, intimações e investigações relacionadas ao 78º Distrito Policial, desde que o assunto esteja dentro de sua área de atuação e não exista conflito de interesses.",
      },
      {
        id: "dp78-faq-2",
        pergunta: "Turistas ou pessoas de outras cidades podem solicitar atendimento?",
        resposta:
          "Sim. Uma pessoa não precisa morar nos Jardins para solicitar análise jurídica. O elemento relevante pode ser o local da ocorrência, a unidade policial responsável ou o procedimento em andamento.",
      },
      {
        id: "dp78-faq-3",
        pergunta: "Fui vítima de furto ou fraude na região. O advogado pode acompanhar o caso?",
        resposta:
          "A situação pode ser analisada para identificar as providências disponíveis, os documentos que devem ser preservados e a necessidade de acompanhamento do procedimento policial.",
      },
      {
        id: "dp78-faq-4",
        pergunta: "O 78º DP encaminha clientes para este escritório?",
        resposta:
          "Não. O escritório é privado e independente. Não existe indicação, credenciamento, parceria ou vínculo com o 78º DP, com a Polícia Civil ou com qualquer órgão público.",
      },
      {
        id: "dp78-faq-5",
        pergunta: "O contato inicial já representa uma consulta jurídica?",
        resposta:
          "Não. O contato inicial possui finalidade de triagem e verificação de viabilidade. A contratação somente acontece após análise preliminar, definição do serviço e formalização entre as partes.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "protecao-patrimonial-e-planejamento-sucessorio",
    ],
  },
  {
    id: "dp-93",
    slug: "advogado-criminal-93-dp-jaguare",
    h1: "Advogado criminal próximo ao 93º DP Jaguaré",
    cardTitulo: "Advogado criminal próximo ao 93º DP",
    cardSubtitulo: "Jaguaré",
    cardResumo:
      "Atendimento jurídico para moradores, profissionais e empresas no Jaguaré, Vila Lageado e bairros próximos ao 93º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 93º DP Jaguaré | Zona Oeste",
      description:
        "Atendimento jurídico criminal no Jaguaré, Vila Lageado, Rio Pequeno, Parque Continental e região do 93º Distrito Policial.",
      canonicalPath: "/delegacias/advogado-criminal-93-dp-jaguare",
      keywords: [
        "advogado criminal 93º DP Jaguaré",
        "advogado criminal Jaguaré",
        "advogado criminal Zona Oeste São Paulo",
      ],
    },
    introducao:
      "O Escritório de Advocacia atende pessoas e empresas localizadas no Jaguaré, Vila Lageado, Rio Pequeno, Parque Continental, Vila Dalva e regiões próximas da Zona Oeste de São Paulo, incluindo procedimentos vinculados ao 93º Distrito Policial — Jaguaré. A atuação pode envolver moradores, trabalhadores, comerciantes, transportadores, gestores, representantes empresariais, vítimas, investigados ou pessoas convocadas para prestar esclarecimentos.",
    unidade: {
      numero: "93",
      nomeOficial: "93º Distrito Policial — Jaguaré",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "O desenvolvimento moderno do Jaguaré está ligado ao projeto urbano concebido pelo engenheiro Henrique Dumont Villares durante a década de 1930. A região foi planejada para conciliar áreas residenciais, comerciais e industriais, aproveitando sua posição estratégica próxima ao Rio Pinheiros, às ferrovias e aos caminhos de ligação entre São Paulo e municípios da região oeste.",
    regiaoSlug: "jaguare",
    bairros: [
      "Jaguaré",
      "Vila Lageado",
      "Rio Pequeno",
      "Vila Dalva",
      "Parque Continental",
      "Jardim Bonfiglioli",
    ],
    observacaoBairros:
      "A indicação dessas localidades não representa afirmação oficial de que todos os endereços pertençam à circunscrição do 93º DP.",
    secoes: [
      {
        titulo: "Advocacia criminal no Jaguaré e no eixo da Avenida Corifeu",
        paragrafos: [
          "O Jaguaré apresenta uma combinação particular de bairros residenciais, áreas comerciais, antigos espaços industriais, centros logísticos, estabelecimentos de ensino e importantes corredores viários.",
          "Em razão desse perfil, os procedimentos policiais podem envolver acontecimentos ocorridos em empresas, galpões, condomínios, estabelecimentos comerciais, vias públicas ou ambientes profissionais.",
          "Documentos, mensagens, imagens de câmeras, registros de entrada, notas fiscais e controles internos devem ser preservados quando estiverem relacionados à ocorrência.",
        ],
        lista: [
          "prisão em flagrante",
          "intimação policial",
          "acompanhamento de depoimento",
          "inquérito policial",
          "crimes patrimoniais",
          "furto ou desvio de mercadorias",
          "roubo de cargas",
          "fraude empresarial",
          "falsidade documental",
          "apropriação indevida",
          "acidentes com repercussão criminal",
          "conflitos entre empresas e prestadores",
          "investigações relacionadas a sistemas digitais",
          "busca e apreensão",
          "orientação para vítimas e representantes empresariais",
        ],
      },
      {
        titulo: "Contexto territorial e histórico do Jaguaré",
        paragrafos: [
          "O crescimento industrial e logístico marcou profundamente a identidade local. Posteriormente, o bairro passou por transformações imobiliárias, com a implantação de condomínios, centros empresariais, escolas, serviços e novos estabelecimentos comerciais.",
          "Elementos como o Mirante do Jaguaré e a antiga Torre do Relógio permanecem como referências da história urbana da região.",
          "O 93º Distrito Policial está localizado no eixo da Avenida Corifeu de Azevedo Marques e integra a estrutura policial responsável pela apuração de ocorrências encaminhadas à unidade. O escritório mencionado nesta página não pertence à delegacia e não possui acesso privilegiado a procedimentos policiais.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: [
      "investigacao-empresarial",
      "intimacao",
      "inquerito",
      "busca-e-apreensao",
    ],
    faq: [
      {
        id: "dp93-faq-1",
        pergunta: "Empresas do Jaguaré podem solicitar acompanhamento criminal?",
        resposta:
          "Sim. Empresas podem aparecer em uma ocorrência como vítimas, investigadas, proprietárias de mercadorias, empregadoras ou responsáveis pela apresentação de documentos e representantes.",
      },
      {
        id: "dp93-faq-2",
        pergunta: "Um funcionário intimado pode ser acompanhado por advogado?",
        resposta:
          "A possibilidade de acompanhamento deve ser analisada conforme a condição em que o funcionário foi convocado, o conteúdo da intimação e a natureza do procedimento.",
      },
      {
        id: "dp93-faq-3",
        pergunta: "O escritório atua em casos envolvendo cargas ou mercadorias?",
        resposta:
          "Situações envolvendo furto, roubo, apropriação, desvio, fraude documental ou divergências com possível repercussão criminal podem ser analisadas individualmente.",
      },
      {
        id: "dp93-faq-4",
        pergunta: "Devo entregar documentos empresariais imediatamente?",
        resposta:
          "Antes de apresentar documentos, é importante identificar quem realizou a solicitação, qual procedimento está em andamento e quais informações foram efetivamente requisitadas.",
      },
      {
        id: "dp93-faq-5",
        pergunta: "O escritório possui relação com o 93º DP?",
        resposta:
          "Não. O Escritório de Advocacia é privado, independente e sem vínculo institucional com o 93º Distrito Policial, com a Polícia Civil ou com o Governo do Estado.",
      },
    ],
    conteudosRelacionados: [
      "conflitos-societarios-e-exposicao-penal",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    id: "dp-75",
    slug: "advogado-criminal-75-dp-jardim-arpoador",
    h1: "Advogado criminal próximo ao 75º DP Jardim Arpoador",
    cardTitulo: "Advogado criminal próximo ao 75º DP",
    cardSubtitulo: "Jardim Arpoador",
    cardResumo:
      "Atendimento jurídico criminal no Jardim Arpoador, Raposo Tavares, Jardim João XXIII e bairros próximos da Zona Oeste.",
    seo: {
      title: "Advogado criminal próximo ao 75º DP Jardim Arpoador",
      description:
        "Atendimento jurídico criminal no Jardim Arpoador, Raposo Tavares, Jardim João XXIII, Educandário e região do 75º DP.",
      canonicalPath: "/delegacias/advogado-criminal-75-dp-jardim-arpoador",
      keywords: [
        "advogado criminal 75º DP Jardim Arpoador",
        "advogado criminal Raposo Tavares",
        "advogado criminal Butantã",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento a moradores, famílias, trabalhadores, comerciantes e empresas no Jardim Arpoador, Jardim João XXIII, Raposo Tavares, Jardim Educandário, Parque Ipê e bairros próximos, incluindo situações relacionadas ao 75º Distrito Policial. O atendimento inicial busca identificar o que ocorreu, quem são as pessoas envolvidas, se existe boletim de ocorrência, intimação ou medida urgente e qual é a fase atual do procedimento.",
    unidade: {
      numero: "75",
      nomeOficial: "75º Distrito Policial — Jardim Arpoador",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "O Jardim Arpoador está inserido na área de influência do distrito Raposo Tavares e da Subprefeitura do Butantã. A ocupação dessa porção da Zona Oeste foi intensificada durante o século XX, especialmente com o parcelamento de terrenos e a expansão de bairros ao redor da Rodovia Raposo Tavares.",
    regiaoSlug: "raposo-tavares",
    bairros: [
      "Jardim Arpoador",
      "Jardim João XXIII",
      "Raposo Tavares",
      "Jardim Educandário",
      "Parque Ipê",
      "Jardim Amaralina",
      "Jardim das Esmeraldas",
    ],
    observacaoBairros:
      "Os limites entre circunscrições policiais não são necessariamente idênticos aos limites populares dos bairros. A delegacia responsável deve ser confirmada conforme o endereço da ocorrência.",
    secoes: [
      {
        titulo: "Atendimento jurídico criminal na região da Raposo Tavares",
        paragrafos: [
          "A região reúne bairros residenciais, comércio local, escolas, equipamentos públicos, condomínios, empresas e intenso deslocamento pelo eixo da Rodovia Raposo Tavares.",
          "As situações atendidas podem envolver ocorrências familiares, patrimoniais, profissionais, comerciais ou relacionadas à circulação de veículos e pessoas.",
          "A atuação jurídica não é definida apenas pela versão inicial de uma das partes. É necessário analisar documentos, mensagens, testemunhas e demais elementos disponíveis.",
        ],
        lista: [
          "prisão em flagrante",
          "intimação para comparecimento",
          "acompanhamento em depoimento",
          "boletim de ocorrência",
          "inquérito policial",
          "ameaças",
          "lesões corporais",
          "crimes contra a honra",
          "furtos, roubos e receptação",
          "fraudes em compras ou transferências",
          "conflitos familiares com repercussão criminal",
          "medidas protetivas",
          "ocorrências envolvendo veículos",
          "orientação jurídica para vítimas",
          "defesa de pessoas investigadas",
          "pedidos de acesso a procedimentos",
        ],
      },
      {
        titulo: "Contexto territorial e formação da região",
        paragrafos: [
          "O crescimento residencial foi acompanhado pela implantação de comércio, escolas, equipamentos públicos e novas conexões com outros bairros do Butantã e com municípios da região metropolitana.",
          "O Parque Raposo Tavares também se tornou uma referência territorial importante. A área ocupada pelo parque foi anteriormente utilizada como aterro e posteriormente transformada em espaço público de lazer e convivência.",
          "O 75º Distrito Policial constitui uma das referências policiais para procedimentos encaminhados à região. A utilização do nome da unidade nesta página é exclusivamente territorial e informativa, sem qualquer indicação de parceria com a delegacia.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["prisao-em-flagrante", "intimacao", "inquerito", "busca-e-apreensao"],
    faq: [
      {
        id: "dp75-faq-1",
        pergunta: "O escritório atende pessoas relacionadas ao 75º DP Jardim Arpoador?",
        resposta:
          "Sim. O atendimento pode abranger vítimas, investigados, familiares, testemunhas, comerciantes e representantes de empresas, mediante análise prévia.",
      },
      {
        id: "dp75-faq-2",
        pergunta: "Recebi uma intimação sem explicação detalhada. O que devo fazer?",
        resposta:
          "É importante preservar o documento e verificar o número do procedimento, a unidade policial, a data marcada e a condição em que a pessoa está sendo convocada.",
      },
      {
        id: "dp75-faq-3",
        pergunta: "Uma discussão entre vizinhos pode se tornar um procedimento criminal?",
        resposta:
          "Dependendo do que aconteceu, podem existir alegações de ameaça, dano, lesão, perseguição ou crime contra a honra. O enquadramento depende das circunstâncias e das provas.",
      },
      {
        id: "dp75-faq-4",
        pergunta: "Posso mandar todos os documentos pelo primeiro contato?",
        resposta:
          "Não é recomendável enviar documentos sensíveis antes da confirmação do canal oficial de atendimento. A triagem pode começar com informações gerais.",
      },
      {
        id: "dp75-faq-5",
        pergunta: "O envio das informações garante que o caso será assumido?",
        resposta:
          "Não. A contratação depende de análise de viabilidade, disponibilidade, ausência de conflito de interesses e formalização do serviço.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    id: "dp-36",
    slug: "advogado-criminal-36-dp-vila-mariana",
    h1: "Advogado criminal próximo ao 36º DP Vila Mariana",
    cardTitulo: "Advogado criminal próximo ao 36º DP",
    cardSubtitulo: "Vila Mariana",
    cardResumo:
      "Atendimento jurídico criminal na Vila Mariana, Paraíso, Ana Rosa, Ibirapuera e regiões próximas ao 36º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 36º DP Vila Mariana | SP",
      description:
        "Atendimento jurídico criminal na Vila Mariana, Paraíso, Ana Rosa, Ibirapuera e região do 36º Distrito Policial.",
      canonicalPath: "/delegacias/advogado-criminal-36-dp-vila-mariana",
      keywords: [
        "advogado criminal 36º DP Vila Mariana",
        "advogado criminal Vila Mariana",
        "advogado criminal Paraíso São Paulo",
      ],
    },
    introducao:
      "O Escritório de Advocacia atende pessoas, profissionais, famílias e empresas na Vila Mariana, Paraíso, Ana Rosa, Ibirapuera, Chácara Klabin e bairros próximos, incluindo procedimentos relacionados ao 36º Distrito Policial. A análise é realizada de maneira confidencial, considerando a posição jurídica da pessoa envolvida, a existência de medidas urgentes, os documentos recebidos e o estágio em que se encontra a investigação.",
    unidade: {
      numero: "36",
      nomeOficial: "36º Distrito Policial — Vila Mariana",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "A formação territorial da Vila Mariana é anterior ao reconhecimento administrativo do distrito. Registros históricos relacionam a área a uma sesmaria concedida no final do século XVIII. Durante o século XIX, a abertura de caminhos e a implantação da linha de transporte que ligava São Paulo a Santo Amaro favoreceram a ocupação da região.",
    regiaoSlug: "moema-vila-mariana",
    bairros: [
      "Vila Mariana",
      "Paraíso",
      "Ana Rosa",
      "Ibirapuera",
      "Chácara Klabin",
      "Aclimação",
      "Vila Clementino",
    ],
    observacaoBairros:
      "Essas referências não constituem uma definição oficial da circunscrição do 36º DP.",
    secoes: [
      {
        titulo: "Advocacia criminal na Vila Mariana",
        paragrafos: [
          "A Vila Mariana concentra áreas residenciais, condomínios, hospitais, universidades, escolas, museus, centros culturais, restaurantes, empresas e importantes vias de acesso.",
          "O fluxo diário envolve moradores, estudantes, pacientes, profissionais de saúde, funcionários, empresários e visitantes.",
          "O escritório também pode analisar ocorrências relacionadas a empresas, instituições de ensino, clínicas e estabelecimentos comerciais situados na região.",
        ],
        lista: [
          "intimações policiais",
          "depoimentos e oitivas",
          "prisão em flagrante",
          "inquéritos policiais",
          "ocorrências em condomínios",
          "crimes patrimoniais",
          "fraudes digitais",
          "ameaças ou perseguições",
          "crimes contra a honra",
          "ocorrências de trânsito",
          "conflitos em ambientes profissionais",
          "investigações envolvendo documentos",
          "medidas protetivas",
          "busca e apreensão",
          "orientação de vítimas",
          "defesa de pessoas investigadas",
        ],
      },
      {
        titulo: "Contexto histórico da Vila Mariana",
        paragrafos: [
          "A instalação do antigo Matadouro Municipal também contribuiu para o crescimento populacional e econômico. O espaço onde funcionava o matadouro tornou-se posteriormente uma importante referência cultural da cidade.",
          "Ao longo do século XX, a Vila Mariana consolidou-se como região residencial, acadêmica, hospitalar e cultural, mantendo ligação direta com o Centro, a Avenida Paulista, o Ibirapuera e outros bairros da Zona Sul.",
          "O 36º Distrito Policial está inserido nesse território urbano e recebe procedimentos conforme as atribuições definidas pela estrutura da Polícia Civil. O Escritório de Advocacia não possui vínculo institucional com a unidade policial.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "busca-e-apreensao"],
    faq: [
      {
        id: "dp36-faq-1",
        pergunta: "O escritório atende profissionais e empresas da Vila Mariana?",
        resposta:
          "Sim. Profissionais liberais, empresas, clínicas, instituições e estabelecimentos comerciais podem solicitar avaliação de procedimentos ou ocorrências com repercussão criminal.",
      },
      {
        id: "dp36-faq-2",
        pergunta:
          "Uma pessoa intimada precisa saber se será ouvida como testemunha ou investigada?",
        resposta:
          "Essa informação é importante para a preparação do atendimento. A intimação e os dados do procedimento devem ser analisados antes do comparecimento, quando possível.",
      },
      {
        id: "dp36-faq-3",
        pergunta: "O advogado pode acompanhar um depoimento no 36º DP?",
        resposta:
          "O acompanhamento pode ser avaliado conforme a natureza do ato, a condição da pessoa convocada e a disponibilidade profissional para a data indicada.",
      },
      {
        id: "dp36-faq-4",
        pergunta: "Prints e gravações podem ser utilizados?",
        resposta:
          "Esses elementos podem ser relevantes, mas devem ser preservados sem edição ou alteração. A validade e a utilidade dependerão do contexto e da forma de obtenção.",
      },
      {
        id: "dp36-faq-5",
        pergunta: "O escritório integra a estrutura da Polícia Civil?",
        resposta:
          "Não. Trata-se de escritório privado, independente e sem vínculo com o 36º DP ou com qualquer órgão de segurança pública.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    id: "dp-35",
    slug: "advogado-criminal-35-dp-jabaquara",
    h1: "Advogado criminal próximo ao 35º DP Jabaquara",
    cardTitulo: "Advogado criminal próximo ao 35º DP",
    cardSubtitulo: "Jabaquara",
    cardResumo:
      "Atendimento jurídico criminal no Jabaquara, Vila Guarani, Conceição, São Judas e bairros próximos ao 35º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 35º DP Jabaquara | São Paulo",
      description:
        "Atendimento jurídico criminal no Jabaquara, Vila Guarani, Conceição, São Judas e região do 35º Distrito Policial.",
      canonicalPath: "/delegacias/advogado-criminal-35-dp-jabaquara",
      keywords: [
        "advogado criminal 35º DP Jabaquara",
        "advogado criminal Jabaquara",
        "advogado criminal Zona Sul São Paulo",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento jurídico para pessoas, famílias, profissionais e empresas no Jabaquara, Vila Guarani, Conceição, São Judas, Vila do Encontro, Jardim Oriental e regiões próximas, incluindo procedimentos relacionados ao 35º Distrito Policial. O primeiro atendimento tem como objetivo compreender a ocorrência, verificar a existência de intimação, boletim de ocorrência ou prisão e identificar quais providências devem ser avaliadas.",
    unidade: {
      numero: "35",
      nomeOficial: "35º Distrito Policial — Jabaquara",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "A história da região do Jabaquara remonta ao período colonial e está relacionada ao antigo caminho utilizado entre São Paulo, Santo Amaro e áreas hoje pertencentes à região do ABC. O Sítio da Ressaca, construção do início do século XVIII, permanece como um dos marcos históricos mais conhecidos da área.",
    regiaoSlug: "jabaquara",
    bairros: [
      "Jabaquara",
      "Vila Guarani",
      "Conceição",
      "São Judas",
      "Jardim Oriental",
      "Vila do Encontro",
      "Vila Fachini",
    ],
    observacaoBairros:
      "A menção a esses bairros não significa que todas as ocorrências locais pertençam necessariamente ao 35º DP.",
    secoes: [
      {
        titulo: "Atendimento jurídico criminal no Jabaquara",
        paragrafos: [
          "O Jabaquara é um importante eixo residencial, comercial e de transporte da Zona Sul, com estações de metrô, terminais, hotéis, escolas, hospitais, empresas e grande circulação de pessoas.",
          "Essa característica pode resultar em ocorrências envolvendo moradores, passageiros, trabalhadores, comerciantes, motoristas, turistas e representantes empresariais.",
          "A estratégia jurídica depende do conteúdo formal do procedimento e não apenas das informações apresentadas informalmente pelas partes.",
        ],
        lista: [
          "prisões em flagrante",
          "intimações",
          "acompanhamento em delegacia",
          "furtos e roubos",
          "estelionato e fraudes eletrônicas",
          "receptação",
          "ameaças",
          "lesões corporais",
          "crimes contra a honra",
          "ocorrências em estabelecimentos comerciais",
          "conflitos envolvendo clientes e funcionários",
          "investigações relacionadas a veículos",
          "crimes documentais",
          "medidas protetivas",
          "defesa em inquérito",
          "orientação para vítimas e familiares",
        ],
      },
      {
        titulo: "Contexto histórico e territorial do Jabaquara",
        paragrafos: [
          "O nome Jabaquara possui origem tupi e costuma ser relacionado a ideias como refúgio, esconderijo, rocha ou cavidade, conforme as diferentes interpretações históricas.",
          "O processo de urbanização ganhou intensidade durante o século XX. A abertura de vias de ligação, a instalação do Aeroporto de Congonhas nas proximidades e o crescimento dos bairros residenciais impulsionaram a ocupação.",
          "A implantação do metrô e do Terminal Jabaquara consolidou a região como um dos principais pontos de conexão entre a capital, o litoral e municípios da região metropolitana. O 35º Distrito Policial integra a estrutura policial responsável pelos procedimentos encaminhados à área.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["prisao-em-flagrante", "intimacao", "inquerito", "busca-e-apreensao"],
    faq: [
      {
        id: "dp35-faq-1",
        pergunta: "O escritório atende ocorrências relacionadas ao Terminal Jabaquara?",
        resposta:
          "Situações ocorridas no terminal, no metrô ou em suas proximidades podem ser analisadas, mas é necessário confirmar a unidade policial responsável pelo registro e pela investigação.",
      },
      {
        id: "dp35-faq-2",
        pergunta: "Perdi documentos após um furto. O advogado pode ajudar?",
        resposta:
          "O atendimento jurídico pode orientar sobre preservação de informações, registros, medidas preventivas e eventual acompanhamento do procedimento criminal.",
      },
      {
        id: "dp35-faq-3",
        pergunta: "Uma empresa pode solicitar análise antes de entregar imagens de segurança?",
        resposta:
          "Sim. É possível verificar o pedido recebido, preservar as imagens e orientar a apresentação do material sem prejudicar a integridade das provas.",
      },
      {
        id: "dp35-faq-4",
        pergunta: "Fui convocado apenas por telefone. Isso é uma intimação válida?",
        resposta:
          "É necessário analisar quem realizou o contato, quais dados foram informados e se existe um procedimento identificado. Não se deve ignorar o chamado, mas também é prudente confirmar sua autenticidade.",
      },
      {
        id: "dp35-faq-5",
        pergunta: "Existe garantia de resultado?",
        resposta:
          "Não. Nenhum atendimento jurídico pode garantir arquivamento, absolvição, soltura, condenação ou qualquer outro resultado. A atuação é técnica e depende dos fatos, das provas e das decisões das autoridades competentes.",
      },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    id: "dp-99",
    slug: "advogado-criminal-99-dp-campo-grande",
    h1: "Advogado criminal próximo ao 99º DP Campo Grande",
    cardTitulo: "Advogado criminal próximo ao 99º DP",
    cardSubtitulo: "Campo Grande",
    cardResumo:
      "Atendimento jurídico criminal em Campo Grande, Jurubatuba, Jardim Marajoara e bairros próximos ao 99º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 99º DP Campo Grande | Zona Sul",
      description:
        "Atendimento jurídico criminal em Campo Grande, Jurubatuba, Jardim Marajoara, Jardim Sabará e região do 99º Distrito Policial.",
      canonicalPath: "/delegacias/advogado-criminal-99-dp-campo-grande",
      keywords: [
        "advogado criminal 99º DP Campo Grande",
        "advogado criminal Jurubatuba",
        "advogado criminal Zona Sul São Paulo",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento jurídico a pessoas, famílias, profissionais, condomínios e empresas em Campo Grande, Jurubatuba, Jardim Marajoara, Jardim Sabará, Vila São Pedro e regiões próximas, incluindo procedimentos relacionados ao 99º Distrito Policial. Cada situação é examinada conforme os fatos, a condição das pessoas envolvidas e os documentos já produzidos pela autoridade policial.",
    unidade: {
      numero: "99",
      nomeOficial: "99º Distrito Policial — Campo Grande",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "Campo Grande integra a região histórica de Santo Amaro. Durante muitos anos, esse território pertenceu ao antigo Município de Santo Amaro, que possuía extensão significativamente maior do que a atual divisão administrativa. Em 1935, Santo Amaro foi incorporado ao Município de São Paulo.",
    regiaoSlug: "campo-grande",
    bairros: [
      "Campo Grande",
      "Jurubatuba",
      "Jardim Marajoara",
      "Jardim Sabará",
      "Vila São Pedro",
      "Vila Sofia",
      "Interlagos",
    ],
    observacaoBairros:
      "Algumas dessas áreas podem ser atendidas por outras unidades policiais. A competência deve ser confirmada conforme o endereço exato da ocorrência.",
    secoes: [
      {
        titulo: "Advocacia criminal em Campo Grande e Jurubatuba",
        paragrafos: [
          "Campo Grande apresenta um perfil territorial diversificado, reunindo bairros residenciais, condomínios, comércio, centros empresariais, áreas industriais, galpões, escolas e importantes vias de circulação.",
          "Os procedimentos da região podem envolver tanto ocorrências particulares quanto situações relacionadas a ambientes profissionais e empresariais.",
          "Empresas devem preservar contratos, controles internos, registros de acesso, imagens, mensagens, dados de sistemas e documentos relacionados ao fato investigado.",
        ],
        lista: [
          "prisão em flagrante",
          "boletim de ocorrência",
          "intimações policiais",
          "acompanhamento em depoimento",
          "inquérito policial",
          "furtos, roubos e receptação",
          "fraudes empresariais",
          "apropriação ou desvio de valores",
          "falsificação de documentos",
          "acidentes de trânsito com repercussão criminal",
          "crimes digitais",
          "conflitos em condomínios",
          "ameaças e crimes contra a honra",
          "medidas protetivas",
          "busca e apreensão",
          "orientação jurídica a vítimas",
          "defesa de pessoas investigadas",
        ],
      },
      {
        titulo: "Contexto histórico de Campo Grande",
        paragrafos: [
          "Ao longo do século XX, a expansão industrial, a abertura de avenidas e o desenvolvimento dos eixos de Jurubatuba e Interlagos modificaram o perfil da região.",
          "Áreas anteriormente ocupadas por chácaras, terrenos amplos e atividades industriais passaram a receber bairros residenciais, condomínios, empresas, centros comerciais e prestadores de serviços.",
          "Campo Grande tornou-se um território de ligação entre Santo Amaro, Jurubatuba, Interlagos, Cidade Ademar e outras áreas da Zona Sul. O 99º Distrito Policial integra essa organização territorial e recebe ocorrências conforme sua atribuição. A referência ao distrito policial é exclusivamente informativa.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: [
      "investigacao-empresarial",
      "intimacao",
      "inquerito",
      "busca-e-apreensao",
    ],
    faq: [
      {
        id: "dp99-faq-1",
        pergunta: "O escritório atende empresas da região de Jurubatuba?",
        resposta:
          "Sim. Empresas, gestores, funcionários e representantes podem solicitar análise de ocorrências, intimações, investigações e pedidos de apresentação de documentos.",
      },
      {
        id: "dp99-faq-2",
        pergunta: "Um condomínio pode contratar atendimento criminal?",
        resposta:
          "Sim. Condomínios podem estar envolvidos em ocorrências relacionadas a moradores, funcionários, prestadores, visitantes, danos, furtos, ameaças ou imagens de segurança.",
      },
      {
        id: "dp99-faq-3",
        pergunta: "O advogado pode orientar a preservação de câmeras e registros?",
        resposta:
          "Sim. A preservação correta pode ser importante para evitar perda, alteração ou sobreposição automática de imagens e dados.",
      },
      {
        id: "dp99-faq-4",
        pergunta: "Toda ocorrência registrada no bairro será investigada pelo 99º DP?",
        resposta:
          "Não necessariamente. A unidade responsável depende da localização exata, da natureza dos fatos, do local do registro e da distribuição interna da Polícia Civil.",
      },
      {
        id: "dp99-faq-5",
        pergunta: "A triagem inicial garante que o escritório assumirá o procedimento?",
        resposta:
          "Não. A triagem serve para verificar a natureza do caso, a urgência, a disponibilidade profissional e a existência de impedimentos ou conflitos de interesses.",
      },
    ],
    conteudosRelacionados: [
      "conflitos-societarios-e-exposicao-penal",
      "intimacao-o-que-considerar-antes-de-responder",
    ],
  },
];
