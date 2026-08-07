import type { Delegacia } from "../types";
import { AVISO_RODAPE } from "./delegacias-extra";

/**
 * Lote 3 — eixo Campo Limpo, Capão Redondo e M'Boi Mirim:
 * 47º (Capão Redondo), 92º (Parque Santo Antônio) e 100º (Jardim Herculano).
 * Nenhum dado operacional das unidades é afirmado. O contexto histórico
 * refere-se ao bairro e possui finalidade exclusivamente informativa.
 */

const OBS_PADRAO =
  "Os bairros e pontos citados são referências territoriais. A unidade policial responsável por determinada ocorrência depende do endereço exato dos fatos, da natureza da ocorrência e da organização territorial da Polícia Civil.";

const FAQ_SEM_VINCULO = (numero: string) => ({
  pergunta: `O escritório possui vínculo com o ${numero} DP?`,
  resposta: `Não. O Escritório de Advocacia é privado e independente, sem parceria, credenciamento, indicação ou vínculo institucional com o ${numero} Distrito Policial, com a Polícia Civil ou com o Estado de São Paulo.`,
});

const FAQ_TRIAGEM = {
  pergunta: "O primeiro contato garante atendimento?",
  resposta:
    "Não. O contato inicial serve para triagem, verificação de disponibilidade, análise de conflito de interesses e avaliação preliminar de viabilidade. Não constitui consulta jurídica nem promessa de resultado.",
};

export const delegaciasExtra4: Delegacia[] = [
  {
    id: "dp-47",
    slug: "advogado-criminal-47-dp-capao-redondo",
    h1: "Advogado criminal próximo ao 47º DP Capão Redondo",
    cardTitulo: "Advogado criminal próximo ao 47º DP",
    cardSubtitulo: "Capão Redondo",
    cardResumo:
      "Atendimento jurídico criminal no Capão Redondo, Jardim Amália e bairros próximos, incluindo situações relacionadas ao 47º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 47º DP Capão Redondo | São Paulo",
      description:
        "Atendimento jurídico criminal no Capão Redondo, Jardim Amália, Cohab Adventista e região da Estrada de Itapecerica, incluindo procedimentos relacionados ao 47º DP.",
      canonicalPath: "/delegacias/advogado-criminal-47-dp-capao-redondo",
      keywords: [
        "advogado criminal 47º DP Capão Redondo",
        "advogado criminal Estrada de Itapecerica",
        "advogado para intimação Capão Redondo",
        "advogado criminal Jardim Amália",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento jurídico criminal a moradores, famílias, profissionais, comerciantes e empresas no Capão Redondo, Jardim Amália, Cohab Adventista, Jardim Comercial, Jardim Macedônia e regiões próximas, incluindo procedimentos relacionados ao 47º Distrito Policial — Capão Redondo. O atendimento pode ocorrer após o recebimento de uma intimação, o registro de um boletim de ocorrência, uma prisão, uma convocação para prestar esclarecimentos ou a identificação de investigação em andamento. Cada situação é analisada de forma individualizada e reservada, considerando os fatos, os documentos disponíveis, a posição jurídica da pessoa envolvida e a fase atual do procedimento.",
    unidade: {
      numero: "47",
      nomeOficial: "47º Distrito Policial — Capão Redondo",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "O Capão Redondo é uma das regiões mais populosas da Zona Sul de São Paulo, com intensa ocupação residencial, comércio de rua, escolas, unidades de saúde, estações de transporte, condomínios e empresas, articulada pelos eixos da Estrada de Itapecerica e da Avenida Carlos Caldeira Filho.",
    regiaoSlug: "capao-redondo",
    bairros: [
      "Capão Redondo",
      "Jardim Amália",
      "Cohab Adventista",
      "Jardim Comercial",
      "Jardim Macedônia",
      "Jardim Lídia",
      "Jardim São Bento Novo",
    ],
    observacaoBairros: OBS_PADRAO,
    secoes: [
      {
        titulo: "Situações jurídicas que podem ser analisadas",
        paragrafos: [
          "A existência de um boletim de ocorrência não significa automaticamente que a pessoa será indiciada, denunciada ou processada. É necessário examinar o conteúdo do procedimento, os elementos disponíveis e a condição de cada pessoa envolvida.",
        ],
        lista: [
          "prisão em flagrante e intimações policiais",
          "acompanhamento em depoimentos e oitivas",
          "boletins de ocorrência e inquéritos policiais",
          "furtos, roubos e receptação",
          "estelionato, fraudes e investigações digitais",
          "ameaças, perseguição e crimes contra a honra",
          "lesões corporais e conflitos familiares com repercussão criminal",
          "medidas protetivas",
          "ocorrências envolvendo veículos e acidentes de trânsito",
          "busca e apreensão",
          "orientação jurídica a vítimas e defesa de pessoas investigadas",
        ],
      },
      {
        titulo: "Fui intimado pelo 47º DP: o que devo verificar?",
        paragrafos: [
          "Uma intimação deve ser analisada antes do comparecimento sempre que houver tempo para isso. Uma pessoa pode participar de um procedimento como vítima, testemunha, investigada, representante de empresa ou responsável por determinado documento.",
          "O simples recebimento de uma intimação não permite concluir qual será o desenvolvimento da investigação.",
        ],
        lista: [
          "número do boletim ou do procedimento",
          "unidade policial responsável",
          "data e horário indicados",
          "nome da pessoa convocada e do setor responsável",
          "documentos solicitados",
          "forma como a convocação foi realizada",
          "existência de prazo",
          "condição em que a pessoa poderá ser ouvida",
        ],
      },
      {
        titulo: "Contexto histórico do Capão Redondo",
        paragrafos: [
          "A formação do Capão Redondo está ligada à expansão da Zona Sul de São Paulo durante o século XX. No início da ocupação urbana, a região era formada por áreas rurais, córregos, chácaras, matas e caminhos de terra.",
          "Por volta de 1912, moradores de regiões mais centrais passaram a utilizar aquele território para descanso, pescaria e lazer. A tradição local associa a origem do nome a uma formação de mata aproximadamente circular — um capão redondo.",
          "Com a expansão industrial de São Paulo e de Santo Amaro, a região passou a receber novos moradores e loteamentos. A partir da segunda metade do século XX, a urbanização acelerou, acompanhada pelo crescimento do comércio, das escolas e dos serviços públicos.",
          "A Estrada de Itapecerica consolidou-se como um dos principais corredores locais, ligando Campo Limpo, Capão Redondo, Jardim Ângela e os municípios ao sul da capital. Posteriormente, o metrô e os corredores de ônibus aumentaram a integração com outras regiões. Hoje o Capão Redondo possui identidade cultural própria e forte presença no cenário artístico e social paulistano.",
        ],
      },
      {
        titulo: "O 47º Distrito Policial e a Estrada de Itapecerica",
        paragrafos: [
          "O 47º Distrito Policial está localizado no eixo da Estrada de Itapecerica, uma das principais referências viárias do Capão Redondo. A localização facilita a identificação da unidade por moradores de diferentes bairros próximos e cria uma referência territorial para quem recebe documentos mencionando o 47º DP.",
          "A referência à delegacia nesta página possui finalidade exclusivamente territorial e informativa. O Escritório de Advocacia não integra a unidade, não atua em nome da Polícia Civil e não possui acesso privilegiado a autoridades ou procedimentos.",
        ],
      },
      {
        titulo: "Bairros, eixos e referências territoriais",
        lista: [
          "Estrada de Itapecerica",
          "Avenida Carlos Caldeira Filho",
          "estação Capão Redondo",
          "estação Campo Limpo",
          "Terminal Capelinha",
          "Parque Santo Dias",
          "eixo Capão Redondo–Campo Limpo",
          "eixo Capão Redondo–Jardim Ângela",
          "divisa com Itapecerica da Serra",
        ],
      },
      {
        titulo: "Atendimento a vítimas e familiares",
        paragrafos: [
          "O escritório também pode analisar situações em que a pessoa procura orientação como vítima ou familiar. A preservação adequada das informações pode ser relevante para a compreensão posterior dos fatos.",
        ],
        lista: [
          "existência de boletim de ocorrência",
          "preservação de mensagens e registros eletrônicos",
          "identificação de testemunhas",
          "imagens disponíveis",
          "documentos médicos",
          "existência de medida protetiva",
          "necessidade de acompanhamento do procedimento",
          "eventual intimação recebida posteriormente",
        ],
      },
      {
        titulo: "Atendimento a empresas e comerciantes",
        paragrafos: [
          "Empresas e estabelecimentos podem aparecer em procedimentos policiais como vítimas de furto ou fraude, proprietários de bens, responsáveis por imagens de segurança, empregadores, destinatários de requisições ou investigados.",
          "Não é recomendável apagar ou modificar registros relacionados aos fatos.",
        ],
        lista: [
          "imagens de câmeras e registros de acesso",
          "notas fiscais e contratos",
          "mensagens e comprovantes",
          "dados de sistemas internos",
          "registros de veículos",
          "identificação de funcionários e prestadores",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "busca-e-apreensao"],
    faq: [
      {
        id: "dp47-faq-1",
        pergunta: "O escritório atende procedimentos relacionados ao 47º DP Capão Redondo?",
        resposta:
          "Sim. O escritório pode analisar intimações, boletins de ocorrência, investigações e demais procedimentos relacionados ao 47º Distrito Policial, mediante análise prévia.",
      },
      {
        id: "dp47-faq-2",
        pergunta: "Fui intimado para comparecer ao 47º DP. Posso procurar advogado antes?",
        resposta:
          "Sim. A intimação pode ser analisada antes do comparecimento para compreender o procedimento e verificar as providências adequadas.",
      },
      {
        id: "dp47-faq-3",
        pergunta: "Fui chamado apenas por telefone. O que faço?",
        resposta:
          "É recomendável confirmar a unidade policial, o número do procedimento, a identificação do setor responsável e a data indicada por canais oficiais antes de fornecer informações sensíveis.",
      },
      {
        id: "dp47-faq-4",
        pergunta: "O escritório atende moradores próximos à Estrada de Itapecerica?",
        resposta:
          "Sim. A região pode integrar a área de atendimento. A delegacia responsável pela ocorrência, contudo, deve ser confirmada conforme o endereço dos fatos.",
      },
      {
        id: "dp47-faq-5",
        pergunta: "O advogado pode acompanhar um depoimento?",
        resposta:
          "O acompanhamento pode ser avaliado conforme a natureza do procedimento, a condição da pessoa convocada e a disponibilidade profissional.",
      },
      {
        id: "dp47-faq-6",
        pergunta: "Uma vítima pode contratar advogado para acompanhar o inquérito?",
        resposta:
          "A situação pode ser analisada. A vítima também pode possuir interesse jurídico no acompanhamento das providências adotadas durante a investigação.",
      },
      { id: "dp47-faq-7", ...FAQ_SEM_VINCULO("47º") },
      { id: "dp47-faq-8", ...FAQ_TRIAGEM },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "busca-e-apreensao-limites-da-decisao-judicial",
    ],
  },
  {
    id: "dp-92",
    slug: "advogado-criminal-92-dp-parque-santo-antonio",
    h1: "Advogado criminal próximo ao 92º DP Parque Santo Antônio",
    cardTitulo: "Advogado criminal próximo ao 92º DP",
    cardSubtitulo: "Parque Santo Antônio",
    cardResumo:
      "Atendimento jurídico criminal no Parque Santo Antônio, Jardim São Luís e bairros próximos, incluindo procedimentos relacionados ao 92º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 92º DP Parque Santo Antônio | SP",
      description:
        "Atendimento jurídico criminal no Parque Santo Antônio, Jardim São Luís, Jardim Casablanca e região do 92º Distrito Policial, na Zona Sul de São Paulo.",
      canonicalPath: "/delegacias/advogado-criminal-92-dp-parque-santo-antonio",
      keywords: [
        "advogado criminal 92º DP Parque Santo Antônio",
        "advogado criminal Jardim São Luís",
        "advogado criminal M'Boi Mirim",
        "advogado para intimação Parque Santo Antônio",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento a moradores, famílias, profissionais, comerciantes e empresas no Parque Santo Antônio, Jardim São Luís, Jardim das Flores, Jardim Casablanca, Jardim Leni, Jardim Ibirapuera e regiões próximas, incluindo situações relacionadas ao 92º Distrito Policial — Parque Santo Antônio. A atuação pode envolver intimações, depoimentos, prisão em flagrante, boletins de ocorrência, investigações, medidas protetivas e outros procedimentos com possível repercussão criminal. Cada caso é analisado individualmente, com tratamento reservado das informações.",
    unidade: {
      numero: "92",
      nomeOficial: "92º Distrito Policial — Parque Santo Antônio",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "O Parque Santo Antônio está inserido no distrito administrativo de Jardim São Luís e na região de M'Boi Mirim, com forte presença residencial, comércio local, escolas, unidades de saúde, empresas, oficinas e conexões com os corredores da Estrada do M'Boi Mirim e da Avenida Maria Coelho Aguiar.",
    regiaoSlug: "parque-santo-antonio",
    bairros: [
      "Parque Santo Antônio",
      "Jardim São Luís",
      "Jardim das Flores",
      "Jardim Casablanca",
      "Jardim Leni",
      "Jardim Ibirapuera",
      "Jardim São Francisco",
    ],
    observacaoBairros: OBS_PADRAO,
    secoes: [
      {
        titulo: "Presença regional do escritório",
        paragrafos: [
          "O Escritório de Advocacia está estabelecido na região de Jardim das Flores, na Zona Sul de São Paulo, território diretamente conectado ao Parque Santo Antônio, ao Jardim São Luís e à região de M'Boi Mirim.",
          "Essa proximidade territorial permite acompanhamento próximo de situações da região, sem que isso represente qualquer vínculo com a unidade policial ou garantia de resultado. O endereço postal e os dados de contato do escritório correspondem sempre a Jardim das Flores — São Paulo/SP.",
        ],
      },
      {
        titulo: "Situações jurídicas que podem ser analisadas",
        paragrafos: [
          "A estratégia jurídica não pode ser definida apenas pela narrativa inicial: documentos, mensagens, testemunhas, imagens e os atos já praticados no procedimento precisam ser considerados.",
        ],
        lista: [
          "intimações policiais e acompanhamento em depoimentos",
          "prisão em flagrante e inquérito policial",
          "boletins de ocorrência",
          "furtos, roubos e receptação",
          "estelionato e fraudes eletrônicas",
          "ameaça, perseguição e crimes contra a honra",
          "lesões corporais e conflitos familiares",
          "medidas protetivas",
          "ocorrências em condomínios",
          "investigações envolvendo empresas",
          "busca e apreensão e crimes relacionados a documentos",
          "orientação a vítimas e defesa de pessoas investigadas",
        ],
      },
      {
        titulo: "Recebi uma intimação do 92º DP",
        paragrafos: [
          "Nem toda pessoa intimada está sendo investigada. A convocação pode estar relacionada à condição de vítima, testemunha, representante de empresa ou pessoa que possui determinada informação relevante.",
        ],
        lista: [
          "número do procedimento",
          "unidade responsável",
          "data e horário",
          "forma de convocação",
          "documentos solicitados",
          "condição aparente da pessoa convocada",
          "existência de prazo",
          "autoridade ou setor indicado",
        ],
      },
      {
        titulo: "Parque Santo Antônio dentro do Jardim São Luís",
        paragrafos: [
          "Durante boa parte do século XX, essa porção da Zona Sul apresentava extensas chácaras e áreas pouco urbanizadas. A partir da década de 1950, a região passou por intenso processo de loteamento e ocupação.",
          "A expansão industrial de Santo Amaro atraiu trabalhadores do interior paulista e de diversos estados, estimulando o surgimento de novas vilas residenciais, processo que se intensificou a partir do final da década de 1960.",
          "Com o crescimento populacional surgiram corredores comerciais, escolas, serviços, equipamentos públicos e organizações comunitárias. Atualmente, Parque Santo Antônio e Jardim São Luís integram um território densamente ocupado e conectado a Campo Limpo, Capão Redondo, Santo Amaro e Jardim Ângela.",
        ],
      },
      {
        titulo: "História territorial do 92º Distrito Policial",
        paragrafos: [
          "O 92º Distrito Policial possui relação consolidada com o Parque Santo Antônio. Documentos públicos registram a utilização do imóvel da Rua Maria Benedita Rodrigues para instalação da unidade policial desde o final da década de 1980.",
          "Essa presença transformou a delegacia em referência territorial conhecida pelos moradores. A menção ao 92º DP nesta página serve apenas para identificação geográfica e informativa: não existe vínculo institucional entre o Escritório de Advocacia e a unidade policial.",
        ],
      },
      {
        titulo: "Referências territoriais próximas",
        lista: [
          "Estrada do M'Boi Mirim",
          "Avenida Maria Coelho Aguiar",
          "Avenida Guido Caloi",
          "Avenida Luiz Gushiken",
          "Jardim São Luís e Jardim das Flores",
          "região do Centro Empresarial de São Paulo",
          "eixo Jardim São Luís–Campo Limpo",
          "eixo Jardim São Luís–Jardim Ângela",
        ],
      },
      {
        titulo: "Atendimento a empresas e profissionais",
        paragrafos: [
          "Jardim São Luís e arredores concentram empresas, centros empresariais, estabelecimentos comerciais, clínicas, escritórios, oficinas e prestadores de serviços. Uma empresa pode figurar em procedimento como vítima, empregadora, proprietária de bens, responsável por documentos ou imagens, destinatária de requisição ou investigada.",
        ],
        lista: [
          "contratos e documentos fiscais",
          "controles internos e registros de acesso",
          "imagens de câmeras",
          "mensagens e comprovantes de pagamento",
          "informações de sistemas",
          "identificação dos envolvidos",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "busca-e-apreensao"],
    faq: [
      {
        id: "dp92-faq-1",
        pergunta: "O escritório atende procedimentos relacionados ao 92º DP?",
        resposta:
          "Sim. Situações relacionadas ao 92º Distrito Policial podem ser analisadas mediante triagem e verificação da possibilidade de atendimento.",
      },
      {
        id: "dp92-faq-2",
        pergunta: "Parque Santo Antônio pertence ao Jardim São Luís?",
        resposta:
          "Parque Santo Antônio está inserido administrativamente no distrito de Jardim São Luís. A denominação popular de bairros pode ser mais específica do que a divisão administrativa municipal.",
      },
      {
        id: "dp92-faq-3",
        pergunta: "Fui convocado para prestar depoimento. Significa que sou acusado?",
        resposta:
          "Não necessariamente. É necessário identificar a condição da pessoa dentro do procedimento antes de chegar a essa conclusão.",
      },
      {
        id: "dp92-faq-4",
        pergunta: "O escritório fica próximo da região?",
        resposta:
          "O escritório está estabelecido na região de Jardim das Flores, na Zona Sul de São Paulo, território próximo ao Parque Santo Antônio e ao Jardim São Luís. Isso não representa vínculo com a unidade policial nem garantia de atendimento.",
      },
      {
        id: "dp92-faq-5",
        pergunta: "O advogado pode acompanhar uma vítima?",
        resposta:
          "Dependendo da situação e da natureza do procedimento, a atuação em favor da vítima também pode ser analisada.",
      },
      {
        id: "dp92-faq-6",
        pergunta: "Uma empresa pode solicitar acompanhamento?",
        resposta:
          "Sim. Pessoas jurídicas e seus representantes podem estar envolvidos em investigações, ocorrências patrimoniais ou solicitações de documentos.",
      },
      { id: "dp92-faq-7", ...FAQ_SEM_VINCULO("92º") },
      { id: "dp92-faq-8", ...FAQ_TRIAGEM },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "conflitos-societarios-e-exposicao-penal",
    ],
  },
  {
    id: "dp-100",
    slug: "advogado-criminal-100-dp-jardim-herculano",
    h1: "Advogado criminal próximo ao 100º DP Jardim Herculano",
    cardTitulo: "Advogado criminal próximo ao 100º DP",
    cardSubtitulo: "Jardim Herculano",
    cardResumo:
      "Atendimento jurídico criminal no Jardim Herculano, Jardim Ângela e regiões próximas, incluindo procedimentos relacionados ao 100º Distrito Policial.",
    seo: {
      title: "Advogado criminal próximo ao 100º DP Jardim Herculano | SP",
      description:
        "Atendimento jurídico criminal no Jardim Herculano, Jardim Ângela, Riviera Paulista e região do 100º Distrito Policial, na Zona Sul de São Paulo.",
      canonicalPath: "/delegacias/advogado-criminal-100-dp-jardim-herculano",
      keywords: [
        "advogado criminal 100º DP Jardim Herculano",
        "advogado criminal Jardim Ângela",
        "advogado criminal M'Boi Mirim",
        "advogado criminal Estrada da Riviera",
      ],
    },
    introducao:
      "O Escritório de Advocacia presta atendimento jurídico criminal a moradores, famílias, profissionais, comerciantes e empresas no Jardim Herculano, Jardim Ângela, Riviera Paulista, Jardim Nakamura e regiões próximas da Zona Sul, incluindo procedimentos relacionados ao 100º Distrito Policial — Jardim Herculano. O atendimento pode envolver situações urgentes ou procedimentos já em andamento, com análise de intimações, boletins de ocorrência, prisões, depoimentos e investigações. As informações são avaliadas de forma reservada.",
    unidade: {
      numero: "100",
      nomeOficial: "100º Distrito Policial — Jardim Herculano",
      dadosDeDesenvolvimento: true,
    },
    contextoTerritorial:
      "O Jardim Herculano está situado no distrito de Jardim Ângela e integra o território administrado pela Subprefeitura de M'Boi Mirim, com perfil predominantemente residencial, comércio local, escolas, equipamentos públicos, áreas verdes e corredores que conectam bairros do extremo sul da capital.",
    regiaoSlug: "jardim-herculano",
    bairros: [
      "Jardim Herculano",
      "Jardim Ângela",
      "Riviera Paulista",
      "Jardim Nakamura",
      "Jardim Horizonte Azul",
      "Parque do Lago",
    ],
    observacaoBairros: OBS_PADRAO,
    secoes: [
      {
        titulo: "Presença regional do escritório",
        paragrafos: [
          "O Escritório de Advocacia está estabelecido na região de Jardim das Flores / M'Boi Mirim, na Zona Sul de São Paulo, mesmo território administrativo que abrange o Jardim Ângela e o Jardim Herculano.",
          "A proximidade regional facilita o acompanhamento de situações da região, mas não representa vínculo com a Polícia Civil, filial local ou garantia de atendimento.",
        ],
      },
      {
        titulo: "Situações jurídicas que podem ser analisadas",
        paragrafos: [
          "Nenhuma classificação jurídica deve ser presumida exclusivamente com base na primeira descrição dos acontecimentos.",
        ],
        lista: [
          "prisão em flagrante e intimações",
          "acompanhamento em depoimentos",
          "boletins de ocorrência e inquéritos policiais",
          "furtos, roubos e receptação",
          "fraudes e falsidade documental",
          "ameaças, perseguição e crimes contra a honra",
          "lesões corporais e conflitos familiares",
          "medidas protetivas",
          "ocorrências envolvendo imóveis",
          "investigações digitais e busca e apreensão",
          "orientação de vítimas e defesa de investigados",
        ],
      },
      {
        titulo: "Recebi uma intimação do 100º DP Jardim Herculano",
        paragrafos: [
          "A pessoa que recebe uma intimação pode buscar orientação antes da data marcada. A análise prévia ajuda a identificar se o procedimento já possui boletim de ocorrência, investigação formal ou outro documento relacionado.",
        ],
        lista: [
          "número do procedimento",
          "nome da unidade",
          "data e horário",
          "documentos solicitados",
          "condição da pessoa convocada",
          "forma de recebimento e autenticidade da comunicação",
          "eventual prazo",
        ],
      },
      {
        titulo: "História territorial do Jardim Herculano",
        paragrafos: [
          "Historicamente, grande parte desse território foi composta por sítios, chácaras e áreas próximas aos mananciais da Zona Sul.",
          "A partir da década de 1950, o crescimento industrial de Santo Amaro estimulou expansão residencial cada vez mais intensa: antigas propriedades foram parceladas e novas vilas passaram a receber trabalhadores vindos de diferentes regiões do país. A ocupação se intensificou principalmente a partir do final da década de 1960.",
          "A expansão avançou também em direção às regiões próximas às represas e a áreas ambientalmente sensíveis. Nas décadas seguintes, o território recebeu equipamentos públicos, escolas, unidades de saúde, comércio e infraestrutura urbana.",
        ],
      },
      {
        titulo: "Parque Jardim Herculano e identidade territorial",
        paragrafos: [
          "Uma das principais referências ambientais da região é o Parque Municipal Jardim Herculano, área destinada à formação de parque público, com vegetação associada à Mata Atlântica, nascentes, trilhas e espaços de educação ambiental e lazer.",
          "O parque ajuda a caracterizar uma região em que áreas densamente ocupadas convivem com fragmentos verdes e territórios relacionados aos mananciais.",
        ],
      },
      {
        titulo: "O 100º Distrito Policial",
        paragrafos: [
          "O 100º Distrito Policial é uma referência policial da região do Jardim Herculano, instalado em imóvel destinado pelo Poder Público ao funcionamento da Polícia Civil e com identificação territorial vinculada ao bairro.",
          "A presença da delegacia no conteúdo desta página possui finalidade exclusivamente informativa e geográfica. O Escritório de Advocacia não possui qualquer vínculo institucional com a unidade.",
        ],
      },
      {
        titulo: "Referências territoriais próximas",
        lista: [
          "Estrada da Riviera",
          "Estrada do M'Boi Mirim",
          "Parque Jardim Herculano",
          "Riviera Paulista e Jardim Nakamura",
          "região da Represa Guarapiranga",
          "eixo Jardim Ângela–Jardim São Luís",
          "eixo M'Boi Mirim–Riviera",
        ],
      },
      {
        titulo: "Ocorrências envolvendo imóveis e áreas territoriais",
        paragrafos: [
          "A região apresenta áreas consolidadas, loteamentos e territórios próximos a zonas ambientalmente sensíveis. É importante distinguir conflitos civis, administrativos e criminais: nem toda controvérsia sobre imóvel constitui crime, mesmo quando existe boletim de ocorrência.",
        ],
        lista: [
          "ocupação de imóvel e ingresso não autorizado",
          "ameaça entre particulares",
          "dano e destruição de bens",
          "documentos relacionados à propriedade",
          "conflitos entre vizinhos",
          "questões ambientais com possível repercussão penal",
        ],
      },
      {
        titulo: "Atendimento a vítimas",
        paragrafos: [
          "Pessoas que aparecem no procedimento como vítimas também podem solicitar análise jurídica. Não é recomendável expor publicamente documentos ou informações sensíveis apenas para tentar comprovar uma versão dos fatos.",
        ],
        lista: [
          "documentos existentes e preservação de provas",
          "mensagens, fotografias e vídeos",
          "testemunhas",
          "registros médicos",
          "medidas protetivas",
          "acompanhamento do procedimento",
        ],
      },
    ],
    avisoRodape: AVISO_RODAPE,
    situacoesRelacionadas: ["intimacao", "inquerito", "prisao-em-flagrante", "busca-e-apreensao"],
    faq: [
      {
        id: "dp100-faq-1",
        pergunta: "O escritório atende procedimentos relacionados ao 100º DP Jardim Herculano?",
        resposta:
          "Sim. O escritório pode analisar situações relacionadas ao 100º Distrito Policial, conforme a natureza do procedimento e a disponibilidade para atendimento.",
      },
      {
        id: "dp100-faq-2",
        pergunta: "Jardim Herculano pertence ao Jardim Ângela?",
        resposta:
          "Administrativamente, o Jardim Herculano está inserido no distrito de Jardim Ângela e na região da Subprefeitura de M'Boi Mirim.",
      },
      {
        id: "dp100-faq-3",
        pergunta: "Fui intimado pelo 100º DP. O que devo informar inicialmente?",
        resposta:
          "Na triagem podem ser informados o número do documento ou procedimento, a data marcada, a unidade e uma descrição resumida da situação.",
      },
      {
        id: "dp100-faq-4",
        pergunta: "Preciso enviar todos os documentos imediatamente?",
        resposta:
          "Não. Informações gerais podem ser suficientes para a primeira triagem. Documentos sensíveis devem ser enviados somente pelo canal indicado pelo escritório.",
      },
      {
        id: "dp100-faq-5",
        pergunta: "Uma ocorrência envolvendo imóvel é necessariamente criminal?",
        resposta:
          "Não. Conflitos imobiliários podem apresentar aspectos civis, administrativos ou criminais. É necessário analisar os fatos individualmente.",
      },
      {
        id: "dp100-faq-6",
        pergunta: "Uma vítima também pode ser acompanhada por advogado?",
        resposta:
          "Sim. Dependendo da situação, a atuação jurídica em favor da vítima pode ser analisada.",
      },
      {
        id: "dp100-faq-7",
        pergunta: "O escritório funciona dentro do 100º DP?",
        resposta:
          "Não. O escritório é privado e independente, estabelecido na região de Jardim das Flores / M'Boi Mirim, sem instalação ou vínculo com a delegacia.",
      },
      { id: "dp100-faq-8", ...FAQ_SEM_VINCULO("100º") },
      { id: "dp100-faq-9", ...FAQ_TRIAGEM },
    ],
    conteudosRelacionados: [
      "intimacao-o-que-considerar-antes-de-responder",
      "protecao-patrimonial-e-planejamento-sucessorio",
    ],
  },
];
