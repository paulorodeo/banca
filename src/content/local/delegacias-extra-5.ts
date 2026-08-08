import type { Delegacia } from "../types";
import { AVISO_RODAPE } from "./delegacias-extra";

/**
 * Lote 4 — eixo Cidade Ademar / Pedreira / Cupecê:
 * 80º (Vila Joaniza) e 98º (Jardim Miriam).
 * Nenhum dado operacional das unidades é afirmado. O contexto histórico
 * refere-se ao bairro e possui finalidade exclusivamente informativa.
 */

const OBS_PADRAO =
  "Os bairros e vias citados são referências territoriais. A unidade policial responsável por determinada ocorrência depende do endereço exato dos fatos, da natureza da ocorrência e da organização territorial da Polícia Civil.";

const FAQ_SEM_VINCULO = (numero: string) => ({
  pergunta: `Existe vínculo com o ${numero} DP?`,
  resposta: `Não. O Escritório de Advocacia é privado e independente, sem parceria, credenciamento, indicação ou vínculo institucional com o ${numero} Distrito Policial, com a Polícia Civil ou com qualquer órgão público.`,
});

export const delegaciasExtra5: Delegacia[] = [
  {
    id: "dp-80",
    slug: "advogado-criminal-80-dp-vila-joaniza",
    h1: "Advogado criminal próximo ao 80º DP Vila Joaniza",
    cardTitulo: "Advogado criminal próximo ao 80º DP",
    cardSubtitulo: "Vila Joaniza",
    cardResumo:
      "Atendimento jurídico criminal na Vila Joaniza, Cidade Ademar, Pedreira e bairros próximos, incluindo procedimentos relacionados ao 80º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 80º DP Vila Joaniza | Zona Sul SP",
      description:
        "Atendimento jurídico criminal na Vila Joaniza, Cidade Ademar, Pedreira e bairros próximos, incluindo procedimentos relacionados ao 80º Distrito Policial.",
      canonicalPath: "/delegacias/advogado-criminal-80-dp-vila-joaniza",
      keywords: [
        "advogado criminal 80º DP Vila Joaniza",
        "advogado criminal Vila Joaniza",
        "advogado próximo ao 80º DP",
        "advogado criminal Cidade Ademar",
        "advogado para intimação Vila Joaniza",
        "advogado criminal Avenida Yervant Kissajikian",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento jurídico criminal a moradores, famílias, profissionais, comerciantes e empresas da Vila Joaniza, Cidade Ademar, Pedreira e regiões próximas da Zona Sul de São Paulo, incluindo a análise de procedimentos relacionados ao 80º Distrito Policial — Vila Joaniza. Com escritório estabelecido na Zona Sul, o atendimento pode envolver pessoas que receberam intimações, foram mencionadas em boletins de ocorrência, precisam comparecer à delegacia ou estão relacionadas a investigações em andamento. Cada situação é analisada de maneira individualizada e reservada, considerando os documentos existentes, a posição jurídica das pessoas envolvidas e a fase do procedimento.",
    unidade: {
      numero: "80",
      nomeOficial: "80º Distrito Policial — Vila Joaniza",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "A Vila Joaniza está inserida em uma região densamente residencial e comercial, com intensa circulação de moradores, trabalhadores, comerciantes e prestadores de serviços. A Avenida Yervant Kissajikian constitui uma das principais referências territoriais, conectando diferentes bairros de Cidade Ademar e Pedreira e concentrando comércio, serviços e transporte.",
    regiaoSlug: "vila-joaniza",
    bairros: [
      "Vila Joaniza",
      "Cidade Ademar",
      "Jardim Martini",
      "Vila Missionária",
      "Pedreira",
      "Vila Constância",
      "Americanópolis",
    ],
    observacaoBairros: OBS_PADRAO,
    secoes: [
      {
        titulo: "Atendimento jurídico criminal na Vila Joaniza",
        paragrafos: [
          "A existência de um boletim de ocorrência não significa, por si só, que haverá indiciamento, denúncia ou processo criminal. É necessário examinar o conteúdo do procedimento e a condição de cada pessoa envolvida.",
        ],
        lista: [
          "intimações policiais, depoimentos e oitivas",
          "prisão em flagrante e inquérito policial",
          "boletins de ocorrência",
          "furtos, roubos e receptação",
          "estelionato e fraudes",
          "ameaças, perseguição e crimes contra a honra",
          "lesões corporais e conflitos familiares com repercussão criminal",
          "medidas protetivas",
          "ocorrências envolvendo veículos",
          "conflitos em estabelecimentos comerciais",
          "investigações digitais e busca e apreensão",
          "orientação a vítimas e defesa de pessoas investigadas",
        ],
      },
      {
        titulo: "Escritório de Advocacia com atuação na Zona Sul",
        paragrafos: [
          "O Escritório de Advocacia possui endereço físico no Jardim das Flores, região de M'Boi Mirim, Zona Sul de São Paulo, e presta atendimento jurídico em diferentes áreas da Zona Sul. A Vila Joaniza integra essa área ampliada de atuação regional.",
          "Isso não significa que exista filial do escritório junto ao 80º Distrito Policial ou dentro da Vila Joaniza. A referência territorial indica apenas a possibilidade de atendimento a pessoas e empresas relacionadas a procedimentos da região.",
        ],
      },
      {
        titulo: "Recebi uma intimação do 80º DP. O que devo verificar?",
        paragrafos: [
          "Uma pessoa convocada pode participar do procedimento como vítima, testemunha, investigada, representante de empresa ou responsável pela apresentação de determinado documento. Por isso, o simples recebimento de uma intimação não deve ser interpretado automaticamente como acusação.",
        ],
        lista: [
          "número do boletim de ocorrência ou procedimento",
          "unidade policial indicada",
          "data e horário do comparecimento",
          "nome da pessoa convocada",
          "documentos solicitados",
          "setor responsável, quando informado",
          "existência de prazo",
          "condição em que a pessoa será ouvida",
          "autenticidade do contato recebido",
        ],
      },
      {
        titulo: "Contexto histórico da Vila Joaniza",
        paragrafos: [
          "A história da Vila Joaniza está ligada à formação de Cidade Ademar e à transformação de antigas propriedades rurais em bairros urbanos durante o século XX. Antes da intensa urbanização, grandes extensões eram ocupadas por sítios, chácaras e fazendas.",
          "A expansão de São Paulo, o crescimento industrial de Santo Amaro e do ABC e a chegada de trabalhadores de diferentes partes do país contribuíram para a transformação dessas antigas propriedades em loteamentos residenciais, processo particularmente intenso na segunda metade do século XX.",
          "Novas moradias, estabelecimentos comerciais, escolas, equipamentos públicos e linhas de transporte acompanharam o crescimento populacional. Hoje a Vila Joaniza apresenta forte identidade residencial e comercial, diretamente conectada a Cidade Ademar, Pedreira, Americanópolis e outras áreas da Zona Sul.",
        ],
      },
      {
        titulo: "O 80º Distrito Policial — Vila Joaniza",
        paragrafos: [
          "O 80º Distrito Policial funciona como referência territorial da Polícia Civil para procedimentos relacionados à região e é oficialmente identificado como 80º Distrito Policial — Vila Joaniza, denominação que aparece em documentos públicos relacionados à organização territorial da Polícia Civil.",
          "A menção ao 80º DP nesta página possui finalidade exclusivamente informativa. O Escritório de Advocacia não pertence à delegacia, não possui parceria com a unidade e não dispõe de acesso privilegiado a procedimentos ou autoridades.",
        ],
      },
      {
        titulo: "Bairros e referências territoriais",
        lista: [
          "Avenida Yervant Kissajikian",
          "Praça da Vila Joaniza",
          "eixo Cidade Ademar–Pedreira",
          "proximidades da Avenida Cupecê",
          "bairros próximos à região de Americanópolis",
          "corredores comerciais de Cidade Ademar",
        ],
      },
      {
        titulo: "Atendimento a comerciantes e pequenos negócios",
        paragrafos: [
          "A Vila Joaniza possui forte presença de comércio local e pequenos empreendedores. Um estabelecimento pode participar de um procedimento como vítima de furto ou fraude, responsável por câmeras, empregador de pessoa envolvida, proprietário de mercadorias, destinatário de intimação ou investigado.",
          "Quando existir possível repercussão criminal, pode ser importante preservar o material relacionado ao fato.",
        ],
        lista: [
          "imagens de segurança",
          "notas fiscais e contratos",
          "comprovantes e mensagens",
          "identificação de funcionários",
          "registros de entrada e saída",
          "informações de sistemas",
        ],
      },
      {
        titulo: "Atendimento a vítimas",
        paragrafos: [
          "A atuação criminal não se limita à defesa de pessoas investigadas. Vítimas também podem necessitar de orientação sobre o andamento do boletim de ocorrência, a preservação de provas, intimações recebidas, apresentação de documentos, identificação de testemunhas, medidas protetivas e acompanhamento da investigação.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "busca-e-apreensao"],
    faq: [
      {
        id: "dp80-faq-1",
        pergunta: "O escritório atende procedimentos relacionados ao 80º DP Vila Joaniza?",
        resposta:
          "Sim. O escritório pode analisar intimações, boletins de ocorrência, investigações e outros procedimentos relacionados à unidade, conforme a natureza do caso e a viabilidade do atendimento.",
      },
      {
        id: "dp80-faq-2",
        pergunta: "Fui chamado ao 80º DP apenas por telefone. O que fazer?",
        resposta:
          "É recomendável confirmar a unidade, o número do procedimento, o setor responsável e a data indicada antes de fornecer documentos ou informações sensíveis.",
      },
      {
        id: "dp80-faq-3",
        pergunta: "Uma intimação significa que estou sendo investigado?",
        resposta:
          "Não necessariamente. A pessoa pode ser chamada como vítima, testemunha, investigada ou representante de uma empresa.",
      },
      {
        id: "dp80-faq-4",
        pergunta: "O advogado pode acompanhar um depoimento?",
        resposta:
          "A possibilidade pode ser avaliada conforme a natureza do procedimento, a condição da pessoa convocada e a disponibilidade profissional.",
      },
      {
        id: "dp80-faq-5",
        pergunta: "O escritório atende comerciantes da Vila Joaniza?",
        resposta:
          "Sim. Empresas, comerciantes e prestadores de serviços podem solicitar análise de ocorrências com possível repercussão criminal.",
      },
      {
        id: "dp80-faq-6",
        pergunta: "Posso encaminhar imagens de câmeras?",
        resposta:
          "As imagens relacionadas ao fato devem ser preservadas. O envio deve ocorrer por canal adequado e conforme a necessidade da análise.",
      },
      {
        id: "dp80-faq-7",
        pergunta: "O escritório fica dentro da Vila Joaniza?",
        resposta:
          "Não. O endereço físico do Escritório está no Jardim das Flores, na Zona Sul de São Paulo. A Vila Joaniza integra a área regional de atendimento.",
      },
      { id: "dp80-faq-8", ...FAQ_SEM_VINCULO("80º") },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    id: "dp-98",
    slug: "advogado-criminal-98-dp-jardim-miriam",
    h1: "Advogado criminal próximo ao 98º DP Jardim Miriam",
    cardTitulo: "Advogado criminal próximo ao 98º DP",
    cardSubtitulo: "Jardim Miriam",
    cardResumo:
      "Atendimento jurídico criminal no Jardim Miriam, Cidade Ademar, Cupecê e regiões próximas, incluindo procedimentos relacionados ao 98º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 98º DP Jardim Miriam | Zona Sul",
      description:
        "Atendimento jurídico criminal no Jardim Miriam, Cidade Ademar, Cupecê e bairros próximos, incluindo procedimentos relacionados ao 98º Distrito Policial.",
      canonicalPath: "/delegacias/advogado-criminal-98-dp-jardim-miriam",
      keywords: [
        "advogado criminal 98º DP Jardim Miriam",
        "advogado criminal Jardim Miriam",
        "advogado próximo ao 98º DP",
        "advogado criminal Avenida Cupecê",
        "advogado criminal Cidade Ademar",
        "advogado para intimação Jardim Miriam",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento jurídico criminal a moradores, famílias, profissionais, comerciantes e empresas do Jardim Miriam, Cidade Ademar, Cupecê e regiões próximas da Zona Sul de São Paulo, incluindo procedimentos relacionados ao 98º Distrito Policial — Jardim Miriam. Com atuação regional na Zona Sul, o escritório pode analisar intimações, boletins de ocorrência, investigações, depoimentos e outras situações que exijam orientação jurídica criminal, sempre de maneira reservada e individualizada.",
    unidade: {
      numero: "98",
      nomeOficial: "98º Distrito Policial — Jardim Miriam",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "O Jardim Miriam é um bairro tradicional da região de Cidade Ademar, com ligação direta ao eixo da Avenida Cupecê e a áreas próximas à divisa com Diadema. O território reúne residências, comércio de bairro, escolas, serviços públicos, pequenas empresas, oficinas e intensa circulação de trabalhadores e moradores.",
    regiaoSlug: "jardim-miriam",
    bairros: [
      "Jardim Miriam",
      "Cidade Ademar",
      "Vila Missionária",
      "Cidade Júlia",
      "Jardim Luso",
      "Cupecê",
    ],
    observacaoBairros: OBS_PADRAO,
    secoes: [
      {
        titulo: "Atendimento jurídico criminal no Jardim Miriam",
        paragrafos: [
          "Cada situação exige avaliação própria, considerando os documentos disponíveis, a fase do procedimento e a condição jurídica da pessoa envolvida.",
        ],
        lista: [
          "intimações, depoimentos e boletins de ocorrência",
          "prisão em flagrante e inquéritos policiais",
          "furtos, roubos e receptação",
          "fraudes e falsidade documental",
          "ameaças, perseguição e crimes contra a honra",
          "lesões corporais e conflitos familiares",
          "medidas protetivas",
          "ocorrências comerciais",
          "crimes digitais e busca e apreensão",
          "orientação jurídica de vítimas e defesa de investigados",
        ],
      },
      {
        titulo: "Escritório com atuação na Zona Sul",
        paragrafos: [
          "O Escritório de Advocacia possui endereço físico no Jardim das Flores, região de M'Boi Mirim, e presta atendimento em diferentes áreas da Zona Sul de São Paulo. O Jardim Miriam integra essa área ampliada de atuação.",
          "A página não significa que exista filial física no bairro ou instalação vinculada ao 98º Distrito Policial. O escritório permanece privado e independente de qualquer órgão público.",
        ],
      },
      {
        titulo: "Recebi uma intimação do 98º DP Jardim Miriam",
        paragrafos: [
          "Uma pessoa pode ser convocada como vítima, testemunha, representante empresarial ou investigada. Por isso, não é adequado concluir automaticamente que existe acusação simplesmente porque foi solicitado o comparecimento à delegacia.",
        ],
        lista: [
          "número do procedimento",
          "número do boletim de ocorrência",
          "data e horário",
          "pessoa convocada",
          "documentos solicitados",
          "setor responsável",
          "condição em que a pessoa será ouvida",
          "autenticidade do contato",
        ],
      },
      {
        titulo: "História do Jardim Miriam",
        paragrafos: [
          "A formação do Jardim Miriam está diretamente relacionada à expansão urbana de Cidade Ademar. Na década de 1950, a área ainda apresentava características rurais, com pequenas chácaras e pouca infraestrutura urbana.",
          "A chegada de energia elétrica, transporte, pavimentação, escolas e outros serviços ocorreu gradualmente à medida que a população crescia, com participação importante da mobilização dos próprios moradores. Um marco histórico local ocorreu em 18 de outubro de 1959, quando moradores se reuniram por meio da Sociedade Amigos do Jardim Miriam para reivindicar melhorias como transporte, energia elétrica, pavimentação, escolas, abastecimento, segurança e lazer.",
          "Nas décadas posteriores, o Jardim Miriam tornou-se uma região residencial densamente ocupada e cada vez mais integrada à malha urbana da Zona Sul. A Avenida Cupecê passou a desempenhar papel importante na ligação com Cidade Ademar, Jabaquara, Campo Belo e Diadema.",
        ],
      },
      {
        titulo: "Identidade cultural e comunitária",
        paragrafos: [
          "O Jardim Miriam possui uma história de organização comunitária que ultrapassa sua formação residencial. Associações de moradores, atividades culturais e iniciativas locais ajudaram a construir uma identidade própria para o bairro.",
          "A região possui equipamentos e projetos culturais que se tornaram referências comunitárias, o que permite compreender o Jardim Miriam como uma comunidade consolidada, e não apenas como localização do 98º Distrito Policial.",
        ],
      },
      {
        titulo: "O 98º Distrito Policial — Jardim Miriam",
        paragrafos: [
          "O 98º Distrito Policial constitui referência policial da região e é oficialmente identificado como 98º Distrito Policial — Jardim Miriam, com localização associada ao eixo da Avenida Ângelo Cristianini.",
          "A unidade participa institucionalmente da estrutura de segurança pública local, inclusive por meio de interlocução com a Subprefeitura e organizações comunitárias. A menção ao distrito policial nesta página é exclusivamente informativa.",
        ],
      },
      {
        titulo: "Bairros e eixos de referência",
        lista: [
          "Avenida Cupecê",
          "Avenida Ângelo Cristianini",
          "divisa com Diadema",
          "região de Cidade Ademar",
          "eixo Jardim Miriam–Jabaquara",
          "corredor de transporte Cupecê",
          "bairros próximos da Vila Missionária",
        ],
      },
      {
        titulo: "Fraudes e ocorrências digitais",
        paragrafos: [
          "Fraudes realizadas por aplicativos, plataformas de compra e venda, redes sociais e meios de pagamento eletrônico podem produzir diferentes tipos de registros e investigações. Não é recomendável apagar a conversa original após produzir apenas capturas de tela.",
        ],
        lista: [
          "conversas completas e arquivos originais",
          "comprovantes e extratos",
          "e-mails e links",
          "perfis utilizados e números de telefone",
          "datas e horários",
        ],
      },
      {
        titulo: "Atendimento a comerciantes e empresas",
        paragrafos: [
          "Estabelecimentos comerciais podem estar envolvidos como vítimas de furto ou fraude, responsáveis por imagens, empregadores, proprietários de mercadorias, destinatários de solicitações policiais ou investigados. A preservação organizada de documentos e registros pode ser relevante para a análise posterior.",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "busca-e-apreensao"],
    faq: [
      {
        id: "dp98-faq-1",
        pergunta: "O escritório atende procedimentos relacionados ao 98º DP Jardim Miriam?",
        resposta:
          "Sim. Intimações, boletins de ocorrência e investigações relacionadas à unidade podem ser analisados mediante triagem prévia.",
      },
      {
        id: "dp98-faq-2",
        pergunta: "O Jardim Miriam possui ligação com a Avenida Cupecê?",
        resposta:
          "Sim. A Avenida Cupecê é uma das principais referências de circulação e conexão territorial da região.",
      },
      {
        id: "dp98-faq-3",
        pergunta: "Fui convocado para prestar esclarecimentos. Estou sendo acusado?",
        resposta:
          "Não necessariamente. A pessoa pode participar do procedimento em diferentes condições, inclusive como vítima ou testemunha.",
      },
      {
        id: "dp98-faq-4",
        pergunta: "Uma vítima pode procurar advogado?",
        resposta:
          "Sim. Pessoas que figuram como vítimas também podem necessitar de orientação e acompanhamento jurídico.",
      },
      {
        id: "dp98-faq-5",
        pergunta: "O escritório atende pessoas próximas à divisa com Diadema?",
        resposta:
          "Situações ocorridas na região podem ser analisadas, mas é necessário identificar qual autoridade e qual unidade possuem atribuição sobre o procedimento.",
      },
      {
        id: "dp98-faq-6",
        pergunta: "Prints de conversas são suficientes?",
        resposta:
          "Podem ser úteis, mas é importante preservar o conteúdo original e o contexto completo sempre que possível.",
      },
      {
        id: "dp98-faq-7",
        pergunta: "O escritório possui endereço no Jardim Miriam?",
        resposta:
          "Não. O endereço físico está no Jardim das Flores, Zona Sul de São Paulo. O Jardim Miriam integra a área regional de atendimento.",
      },
      { id: "dp98-faq-8", ...FAQ_SEM_VINCULO("98º") },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "conflitos-societarios-e-exposicao-penal",
    ],
  },
];
