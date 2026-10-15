import type { Bairro } from "../types";
import { bairrosLeste } from "./bairros-leste";
import { bairrosNorteSul } from "./bairros-norte-sul";

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
  {
    id: "bairro-santo-amaro",
    slug: "santo-amaro",
    nome: "Santo Amaro",
    zona: "zona-sul",
    status: "publicado",
    descricao:
      "Conheça o núcleo histórico e comercial de Santo Amaro, seus acessos, equipamentos culturais e o guia policial relacionado.",
    introducao:
      "O Largo Treze de Maio e as vias ao seu redor formam uma referência urbana de Santo Amaro. A antiga sede municipal, hoje Paço Cultural Júlio Guerra, ajuda a contar uma história que antecede a incorporação de Santo Amaro a São Paulo em 1935.",
    recorteTerritorial:
      "Esta página usa o núcleo histórico e comercial de Santo Amaro como recorte editorial. O bairro, o distrito administrativo de mesmo nome, a atual subprefeitura e o antigo município têm extensões diferentes. A subprefeitura reúne os distritos de Santo Amaro, Campo Belo e Campo Grande; seus limites não são os limites deste guia.",
    referenciasUrbanas: [
      "Largo Treze de Maio",
      "Praça Floriano Peixoto",
      "Avenida Adolfo Pinheiro",
    ],
    viasAcessos: [
      {
        nome: "Avenida Adolfo Pinheiro",
        contexto:
          "Via de referência do centro de Santo Amaro. O Teatro Paulo Eiró fica nessa avenida, segundo a Secretaria Municipal de Cultura.",
      },
      {
        nome: "Avenida João Dias",
        contexto:
          "A Secretaria Municipal de Cultura registra a Biblioteca Prefeito Prestes Maia nessa avenida, em Santo Amaro.",
      },
      {
        nome: "Estação Largo Treze e terminal de ônibus",
        contexto:
          "A operadora da Linha 5 Lilás situa a estação em Santo Amaro, junto ao comércio do Largo Treze, e informa sua integração com o terminal urbano.",
      },
    ],
    servicosLocais: [
      {
        nome: "Paço Cultural Júlio Guerra",
        contexto:
          "Casa de cultura na Praça Floriano Peixoto, instalada na antiga sede municipal de Santo Amaro.",
        fonteUrl: "https://prefeitura.sp.gov.br/web/cultura/w/servicos/541",
      },
      {
        nome: "Biblioteca Prefeito Prestes Maia",
        contexto: "Equipamento cultural municipal na Avenida João Dias.",
        fonteUrl: "https://prefeitura.sp.gov.br/web/cultura/w/servicos/541",
      },
      {
        nome: "Teatro Paulo Eiró",
        contexto: "Teatro municipal na Avenida Adolfo Pinheiro.",
        fonteUrl: "https://prefeitura.sp.gov.br/web/cultura/w/servicos/541",
      },
    ],
    localizacao: {
      descricao:
        "O Largo Treze de Maio e a Praça Floriano Peixoto orientam a leitura deste núcleo histórico. Para conferir os limites oficiais do distrito, consulte o mapa municipal da Subprefeitura Santo Amaro.",
      mapaUrl: "https://capital.sp.gov.br/documents/d/licenciamento/vert_sa",
      mapaLabel: "Ver mapa oficial da Subprefeitura Santo Amaro",
    },
    fotoTerritorial: {
      asset: "santo-amaro-thumb",
      alt: "Estação Santo Amaro da Linha 5 Lilás",
      legenda:
        "Estação Santo Amaro, referência de transporte na Zona Sul. A imagem não delimita o recorte editorial desta página.",
      autor: "Fulvio Magalhães Lima de Souza",
      fonteUrl: "https://commons.wikimedia.org/wiki/File:Esta%C3%A7%C3%A3o_Santo_Amaro_Linha_5.jpg",
      licenca: "Domínio público",
      licencaUrl:
        "https://commons.wikimedia.org/wiki/File:Esta%C3%A7%C3%A3o_Santo_Amaro_Linha_5.jpg",
      width: 128,
      height: 128,
    },
    bairrosVizinhos: [],
    instituicoes: [
      {
        id: "santo-amaro-11-dp",
        category: "delegacias",
        institutionSlug: "advogado-criminal-11-dp-santo-amaro",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel: "Guia do 11º DP associado a Santo Amaro no cadastro editorial",
      },
    ],
    secoes: [
      {
        titulo: "Do antigo município ao núcleo atual",
        paragrafos: [
          "Santo Amaro foi município independente e passou a integrar a capital em 1935. O Paço Cultural Júlio Guerra ocupa o prédio da antiga sede municipal, na Praça Floriano Peixoto.",
          "Hoje o nome Santo Amaro identifica diferentes escalas da cidade. Este guia se concentra no núcleo do bairro e usa as divisões administrativas apenas para contextualização, sem reproduzir seus limites como se fossem os do bairro.",
        ],
      },
    ],
    faq: [
      {
        id: "santo-amaro-distrito",
        pergunta: "Bairro, distrito e subprefeitura de Santo Amaro são a mesma área?",
        resposta:
          "Não. O recorte editorial desta página acompanha o núcleo do bairro. O distrito administrativo e a subprefeitura são divisões oficiais distintas, e a subprefeitura também abrange Campo Belo e Campo Grande.",
      },
      {
        id: "santo-amaro-dp",
        pergunta: "O 11º DP atende todo o bairro?",
        resposta:
          "A relação editorial com Santo Amaro não define a circunscrição policial. Confirme a unidade responsável pelo endereço e pelo serviço pretendido nos canais oficiais da Polícia Civil.",
      },
    ],
    seo: {
      title: "Santo Amaro: história, acessos e serviços | Banca Paulista",
      description:
        "Explore o núcleo histórico de Santo Amaro, vias, transporte, equipamentos culturais e o guia do 11º DP relacionado, com distinção entre bairro e distrito.",
      canonicalPath: "/bairros/santo-amaro",
    },
  },
  {
    id: "bairro-butanta",
    slug: "butanta",
    nome: "Butantã",
    zona: "zona-oeste",
    status: "publicado",
    descricao:
      "Um recorte territorial da Zona Oeste associado a atividades universitárias, pesquisa, moradia e serviços.",
    introducao:
      "A página do Butantã reúne referências do território e o contexto universitário e de pesquisa descrito para esta parte da Zona Oeste. A Cidade Universitária Armando de Salles Oliveira, da Universidade de São Paulo, está situada na região do Butantã; essa referência não define os limites editoriais do bairro.",
    referenciasUrbanas: [
      "Cidade Universitária Armando de Salles Oliveira",
      "Universidade de São Paulo (USP)",
    ],
    bairrosVizinhos: [],
    instituicoes: [
      {
        id: "butanta-51-dp",
        category: "delegacias",
        institutionSlug: "advogado-51-dp-butanta",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel: "Guia do 51º DP relacionado ao Butantã no cadastro territorial",
      },
    ],
    secoes: [
      {
        titulo: "Universidade, pesquisa e vida urbana",
        paragrafos: [
          "A presença da Cidade Universitária Armando de Salles Oliveira, da USP, marca o contexto institucional do Butantã descrito neste guia. Ensino, pesquisa, cultura e serviços compõem temas relevantes para compreender a região.",
          "A circulação de estudantes, pesquisadores, trabalhadores e empresas pode envolver questões jurídicas sobre contratos, propriedade intelectual, locações, estágios, vínculos de trabalho e atividades de inovação. A página apresenta esses temas de modo geral, sem atribuir serviços específicos a instituições além das referências registradas.",
        ],
      },
      {
        titulo: "Moradia, serviços e consulta territorial",
        paragrafos: [
          "O material editorial da Zona Oeste também aponta transporte, infraestrutura urbana, uso dos imóveis e convivência entre áreas residenciais e atividades econômicas como assuntos ligados ao Butantã e aos bairros próximos.",
          "O cadastro do portal relaciona a esta página o guia do 51º DP. Essa relação editorial não declara que a unidade esteja dentro de todo o recorte do bairro nem define circunscrição ou atendimento. Consulte o guia e confirme questões operacionais nos canais oficiais.",
        ],
      },
    ],
    faq: [
      {
        id: "butanta-cidade-universitaria",
        pergunta: "A referência à Cidade Universitária define os limites do bairro?",
        resposta:
          "Não. Ela contextualiza a região do Butantã e não estabelece limites administrativos ou editoriais para este guia.",
      },
      {
        id: "butanta-delegacia",
        pergunta: "O guia do 51º DP define a unidade responsável por um endereço?",
        resposta:
          "Não. A relação editorial não define circunscrição. Confirme a unidade competente nos canais oficiais da Polícia Civil.",
      },
    ],
    seo: {
      title: "Butantã: contexto territorial e referências jurídicas | Banca Paulista",
      description:
        "Informações territoriais sobre o Butantã, referências universitárias e guia policial relacionado, com navegação pela Zona Oeste.",
      canonicalPath: "/bairros/butanta",
    },
  },
  {
    id: "bairro-perdizes",
    slug: "perdizes",
    nome: "Perdizes",
    zona: "zona-oeste",
    status: "publicado",
    descricao:
      "Informação territorial sobre Perdizes, com temas imobiliários e de convivência urbana presentes no material editorial da região.",
    introducao:
      "Perdizes aparece no conteúdo territorial da Zona Oeste entre os bairros com imóveis residenciais de diferentes épocas e condomínios. Esta página organiza temas relacionados a propriedade, locação, reformas e relações de vizinhança, sem presumir uma divisão administrativa ou atribuir características a todo endereço do bairro.",
    referenciasUrbanas: ["Perdizes", "Pompeia", "Sumaré"],
    bairrosVizinhos: [],
    instituicoes: [
      {
        id: "perdizes-23-dp",
        category: "delegacias",
        institutionSlug: "advogado-criminal-23-dp-perdizes",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel: "Guia do 23º DP relacionado a Perdizes no cadastro territorial",
      },
    ],
    secoes: [
      {
        titulo: "Imóveis, condomínios e relações de vizinhança",
        paragrafos: [
          "Compra e venda, locações, administração condominial, reformas e contratos imobiliários são temas editoriais pertinentes ao contexto residencial indicado para Perdizes. As circunstâncias variam conforme cada imóvel e relação contratual.",
          "A leitura da situação patrimonial pode envolver documentação registral, cadastro fiscal e regularidade urbanística, que são referências distintas. Esta página não oferece análise individual de documentos nem substitui a consulta aos órgãos e profissionais competentes.",
        ],
      },
      {
        titulo: "Guia institucional relacionado",
        paragrafos: [
          "O cadastro territorial mantém um guia do 23º Distrito Policial relacionado a Perdizes. O vínculo organiza a navegação do portal, mas não afirma localização dentro de todo o bairro, circunscrição ou responsabilidade por determinada ocorrência.",
        ],
      },
    ],
    faq: [
      {
        id: "perdizes-documentacao",
        pergunta: "Cadastro municipal e registro de propriedade são equivalentes?",
        resposta:
          "Não. O cadastro fiscal municipal e a matrícula no Cartório de Registro de Imóveis têm finalidades distintas; esta página não analisa a documentação de um imóvel específico.",
      },
      {
        id: "perdizes-delegacia",
        pergunta: "O guia relacionado informa a circunscrição do meu endereço?",
        resposta:
          "Não. A relação editorial não define competência ou atendimento. Confirme a unidade responsável nos canais oficiais.",
      },
    ],
    seo: {
      title: "Perdizes: imóveis e informação territorial | Banca Paulista",
      description:
        "Contexto territorial de Perdizes, temas imobiliários e acesso ao guia policial relacionado, com navegação pela Zona Oeste.",
      canonicalPath: "/bairros/perdizes",
    },
  },
  {
    id: "bairro-jardins",
    slug: "jardins",
    nome: "Jardins",
    zona: "zona-oeste",
    status: "publicado",
    descricao:
      "Página editorial do agrupamento Jardins, com referências a imóveis, patrimônio e atividade empresarial presentes no texto regional.",
    introducao:
      "Jardins é o agrupamento territorial usado pelo cadastro regional para este conteúdo. A página mantém esse recorte editorial e reúne assuntos sobre imóveis, patrimônio e atividade empresarial mencionados para a Zona Oeste, sem converter o nome do grupo em limites administrativos.",
    referenciasUrbanas: ["Jardim Paulista", "Jardim América", "Jardim Europa"],
    bairrosVizinhos: [],
    instituicoes: [
      {
        id: "jardins-78-dp",
        category: "delegacias",
        institutionSlug: "advogado-criminal-78-dp-jardins",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel: "Guia do 78º DP relacionado ao agrupamento Jardins no cadastro territorial",
      },
    ],
    secoes: [
      {
        titulo: "Imóveis e patrimônio",
        paragrafos: [
          "O material editorial da região inclui os Jardins entre as localidades em que podem ser pertinentes questões de compra e venda, locação, administração condominial, reformas e contratos imobiliários.",
          "Documentação registral, cadastro fiscal e regularidade urbanística são aspectos distintos da análise de um imóvel. As regras e condições dependem do endereço e da situação concreta, que não são avaliados por esta página.",
        ],
      },
      {
        titulo: "Empresas e atividades econômicas",
        paragrafos: [
          "O artigo regional aborda a atividade empresarial e os serviços como temas da Zona Oeste. Para o agrupamento Jardins, esta página mantém apenas esse contexto geral, sem atribuir perfil econômico uniforme a cada bairro que o compõe.",
          "O cadastro também relaciona o guia do 78º DP a este agrupamento. A associação não informa circunscrição nem determina atendimento policial para um endereço.",
        ],
      },
    ],
    faq: [
      {
        id: "jardins-recorte",
        pergunta: "Jardins é usado aqui como divisão administrativa oficial?",
        resposta:
          "Não. É o agrupamento editorial registrado para a página regional e não representa, por si só, limites administrativos ou policiais.",
      },
      {
        id: "jardins-dp",
        pergunta: "O guia do 78º DP confirma a competência sobre todo o agrupamento?",
        resposta:
          "Não. O vínculo é editorial. Consulte os canais oficiais para identificar a unidade competente conforme o endereço e a demanda.",
      },
    ],
    seo: {
      title: "Jardins: imóveis e contexto territorial | Banca Paulista",
      description:
        "Informações editoriais sobre o agrupamento Jardins, imóveis, patrimônio e guia policial relacionado na Zona Oeste.",
      canonicalPath: "/bairros/jardins",
    },
  },
  {
    id: "bairro-lapa-vila-romana",
    slug: "lapa",
    nome: "Lapa e Vila Romana",
    zona: "zona-oeste",
    status: "publicado",
    descricao:
      "Página conjunta de Lapa e Vila Romana, preservando a identidade editorial do registro territorial existente.",
    introducao:
      "Este guia mantém Lapa e Vila Romana como um único registro editorial, conforme o agrupamento territorial já usado no portal. O texto regional associa a Lapa a imóveis comerciais, galpões, terrenos e atividades produtivas em contexto de transformação urbana, sem desmembrar o agrupamento nem atribuir essas características a cada endereço.",
    referenciasUrbanas: ["Lapa", "Vila Romana", "Vila Ipojuca"],
    bairrosVizinhos: [],
    instituicoes: [
      {
        id: "lapa-vila-romana-7-dp",
        category: "delegacias",
        institutionSlug: "advogado-criminal-7-dp-vila-romana",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel:
          "Guia do 7º DP relacionado ao agrupamento Lapa e Vila Romana no cadastro territorial",
      },
    ],
    secoes: [
      {
        titulo: "Imóveis e transformação urbana",
        paragrafos: [
          "O conteúdo regional menciona na Lapa e na Vila Leopoldina imóveis industriais e comerciais, galpões e terrenos sujeitos a transformação. Para este registro conjunto, o contexto é apresentado em escala editorial, sem afirmar que toda a área de Lapa e Vila Romana compartilhe o mesmo uso.",
          "Documentação registral, características da edificação, uso permitido e obrigações de utilização são temas a considerar em situações imobiliárias concretas. A página não determina zoneamento nem regularidade de propriedades específicas.",
        ],
      },
      {
        titulo: "Atividade econômica e guia relacionado",
        paragrafos: [
          "Comércio, serviços e atividades produtivas aparecem no texto da Zona Oeste como temas de interesse jurídico e econômico. O guia do 7º DP relacionado a Vila Romana permanece disponível em sua página própria; essa relação não define circunscrição ou atendimento.",
        ],
      },
    ],
    faq: [
      {
        id: "lapa-registro-conjunto",
        pergunta: "Lapa e Vila Romana são apresentadas como duas páginas separadas?",
        resposta:
          "Não. Este conteúdo preserva o registro conjunto existente no cadastro editorial do portal.",
      },
      {
        id: "lapa-dp",
        pergunta: "O guia relacionado ao território define a unidade policial competente?",
        resposta:
          "Não. A relação editorial não define circunscrição ou atendimento. Consulte os canais oficiais da Polícia Civil.",
      },
    ],
    seo: {
      title: "Lapa e Vila Romana: imóveis e referências territoriais | Banca Paulista",
      description:
        "Página territorial conjunta de Lapa e Vila Romana, com contexto imobiliário e acesso ao guia policial relacionado na Zona Oeste.",
      canonicalPath: "/bairros/lapa",
    },
  },
  {
    id: "bairro-vila-leopoldina",
    slug: "vila-leopoldina",
    nome: "Vila Leopoldina e CEAGESP",
    zona: "zona-oeste",
    status: "publicado",
    descricao:
      "Referência territorial da Vila Leopoldina e CEAGESP, com contexto de imóveis comerciais e transformação urbana.",
    introducao:
      "O cadastro regional apresenta Vila Leopoldina e CEAGESP como um agrupamento territorial. O texto da Zona Oeste menciona imóveis industriais e comerciais, galpões e terrenos sujeitos à transformação urbana na Lapa e na Vila Leopoldina. Esta página mantém a referência conjunta sem inferir limites ou localização de cada equipamento.",
    referenciasUrbanas: ["Vila Leopoldina", "CEAGESP"],
    bairrosVizinhos: [],
    instituicoes: [
      {
        id: "vila-leopoldina-91-dp",
        category: "delegacias",
        institutionSlug: "advogado-criminal-91-dp-ceagesp-vila-leopoldina",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel:
          "Guia do 91º DP relacionado a CEAGESP e Vila Leopoldina no cadastro territorial",
      },
    ],
    secoes: [
      {
        titulo: "Imóveis comerciais e atividades produtivas",
        paragrafos: [
          "Galpões, terrenos e imóveis comerciais ou industriais integram o contexto urbano descrito para a Vila Leopoldina no texto regional. Questões de documentação registral, características da edificação e uso permitido podem ser pertinentes a negócios e patrimônio imobiliário.",
          "A análise de um imóvel depende de sua localização e de suas condições próprias. Esta página não informa zoneamento aplicável nem presume regularidade de uma edificação.",
        ],
      },
      {
        titulo: "Guia policial relacionado",
        paragrafos: [
          "O portal mantém o guia do 91º DP relacionado à referência CEAGESP e Vila Leopoldina. O destino é um guia informativo de delegacia e não uma indicação de circunscrição ou atendimento para todo o agrupamento.",
        ],
      },
    ],
    faq: [
      {
        id: "vila-leopoldina-zoneamento",
        pergunta: "Esta página informa o zoneamento de um imóvel na Vila Leopoldina?",
        resposta:
          "Não. O zoneamento depende da localização exata do lote e deve ser consultado nas fontes municipais aplicáveis.",
      },
      {
        id: "vila-leopoldina-guia",
        pergunta: "O guia do 91º DP representa uma página da CEAGESP?",
        resposta:
          "Não. É uma página informativa sobre delegacia relacionada editorialmente ao agrupamento Vila Leopoldina e CEAGESP.",
      },
    ],
    seo: {
      title: "Vila Leopoldina e CEAGESP: contexto territorial | Banca Paulista",
      description:
        "Informações territoriais sobre Vila Leopoldina e CEAGESP, temas imobiliários e acesso ao guia policial relacionado.",
      canonicalPath: "/bairros/vila-leopoldina",
    },
  },
  {
    id: "bairro-jaguare",
    slug: "jaguare",
    nome: "Jaguaré",
    zona: "zona-oeste",
    status: "publicado",
    descricao:
      "Contexto territorial do Jaguaré e acesso aos conteúdos jurídicos relacionados no cadastro local.",
    introducao:
      "O Jaguaré está entre as referências territoriais do conteúdo regional da Zona Oeste, que aborda atividades comerciais, serviços, logística e produção em escala regional. Esta página contextualiza esses assuntos sem atribuir um perfil uniforme a todos os imóveis ou atividades do bairro.",
    referenciasUrbanas: ["Jaguaré", "Vila Lageado", "Rio Pequeno"],
    bairrosVizinhos: [],
    instituicoes: [
      {
        id: "jaguare-93-dp",
        category: "delegacias",
        institutionSlug: "advogado-criminal-93-dp-jaguare",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel: "Guia do 93º DP relacionado ao Jaguaré no cadastro territorial",
      },
    ],
    secoes: [
      {
        titulo: "Atividades econômicas e imóveis",
        paragrafos: [
          "O texto editorial regional menciona o Jaguaré entre as localidades com combinações próprias de comércio, logística, serviços e atividades produtivas. Esses temas podem envolver contratos comerciais, locação de imóveis, relações de trabalho e responsabilidade civil, conforme cada situação.",
          "Para imóveis, a documentação registral, o cadastro municipal e a regularidade urbanística são informações diferentes. A página não determina o uso permitido ou a situação de um lote específico.",
        ],
      },
      {
        titulo: "Guia relacionado ao território",
        paragrafos: [
          "O guia do 93º DP está associado ao Jaguaré no cadastro local e pode ser consultado em página própria. Essa associação editorial não define circunscrição policial nem responsabilidade sobre determinado endereço.",
        ],
      },
    ],
    faq: [
      {
        id: "jaguare-imoveis",
        pergunta: "Esta página determina o uso permitido para um imóvel?",
        resposta:
          "Não. A consulta depende da localização exata do lote, das regras vigentes e das fontes municipais aplicáveis.",
      },
      {
        id: "jaguare-dp",
        pergunta: "O guia do 93º DP confirma circunscrição sobre o Jaguaré?",
        resposta: "Não. O vínculo é editorial e não determina atendimento ou competência policial.",
      },
    ],
    seo: {
      title: "Jaguaré: contexto territorial e guia relacionado | Banca Paulista",
      description:
        "Informações editoriais sobre o Jaguaré, atividades econômicas e acesso ao guia policial relacionado na Zona Oeste.",
      canonicalPath: "/bairros/jaguare",
    },
  },
  {
    id: "bairro-raposo-tavares-jardim-arpoador",
    slug: "raposo-tavares",
    nome: "Raposo Tavares e Jardim Arpoador",
    zona: "zona-oeste",
    status: "publicado",
    descricao:
      "Registro territorial conjunto para Raposo Tavares e Jardim Arpoador, mantido conforme o cadastro local.",
    introducao:
      "A página mantém o agrupamento Raposo Tavares e Jardim Arpoador do cadastro regional. O registro identifica localidades residenciais no eixo da Rodovia Raposo Tavares, sem afirmar limites administrativos ou características idênticas para cada parte do território.",
    referenciasUrbanas: ["Raposo Tavares", "Jardim Arpoador", "Jardim Educandário"],
    bairrosVizinhos: [],
    instituicoes: [
      {
        id: "raposo-tavares-75-dp",
        category: "delegacias",
        institutionSlug: "advogado-criminal-75-dp-jardim-arpoador",
        institutionType: "delegacia",
        relation: "relacionada",
        relationLabel: "Guia do 75º DP relacionado a Jardim Arpoador no cadastro territorial",
      },
    ],
    secoes: [
      {
        titulo: "Território e questões imobiliárias",
        paragrafos: [
          "O cadastro regional descreve este agrupamento como referências residenciais no eixo da Rodovia Raposo Tavares. Em imóveis residenciais, podem surgir questões documentais, contratuais, de locação, condomínio e convivência entre vizinhos.",
          "A análise de qualquer propriedade depende de seus documentos e localização exata. Esta página não estabelece parâmetros de zoneamento, limites de bairro ou condições de regularidade para um endereço.",
        ],
      },
      {
        titulo: "Guia policial relacionado",
        paragrafos: [
          "O guia do 75º DP, cuja referência territorial no cadastro é Jardim Arpoador, permanece disponível em sua URL própria. A relação não define a circunscrição da unidade nem indica atendimento para todas as localidades deste registro conjunto.",
        ],
      },
    ],
    faq: [
      {
        id: "raposo-recorte",
        pergunta: "Raposo Tavares e Jardim Arpoador são tratados como uma única divisão oficial?",
        resposta:
          "Não. O nome conjunto preserva o registro editorial territorial do portal, sem declarar uma divisão administrativa oficial.",
      },
      {
        id: "raposo-dp",
        pergunta: "O guia do 75º DP informa qual unidade atende meu endereço?",
        resposta:
          "Não. Consulte os canais oficiais da Polícia Civil para confirmar a unidade competente conforme endereço e situação.",
      },
    ],
    seo: {
      title: "Raposo Tavares e Jardim Arpoador: guia territorial | Banca Paulista",
      description:
        "Página conjunta de Raposo Tavares e Jardim Arpoador, com contexto imobiliário e acesso ao guia policial relacionado.",
      canonicalPath: "/bairros/raposo-tavares",
    },
  },
  ...bairrosLeste,
  ...bairrosNorteSul,
];
