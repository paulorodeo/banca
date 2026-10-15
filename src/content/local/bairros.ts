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
];
