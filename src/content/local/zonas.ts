import type { Delegacia, Regiao, Zona } from "../types";

/**
 * Arquitetura regional da cidade: cinco macro-zonas que organizam as páginas
 * territoriais. Cada região da home (`regioes.ts`) declara a zona a que
 * pertence, permitindo sinalização geográfica ("Bairro • Zona Sul •
 * São Paulo — SP") e páginas-pilar por zona em /regioes/$slug.
 */
export const zonas: Zona[] = [
  {
    id: "zona-centro",
    slug: "centro",
    nome: "Centro",
    descricao:
      "Guias de delegacias nas referências Liberdade, Bom Retiro, Campos Elíseos, Santa Ifigênia, Consolação, Cambuci, Brás e Santa Cecília.",
    introducao:
      "O Centro de São Paulo concentra equipamentos públicos, comércio intenso e uma trama urbana densa, em que procedimentos variados tramitam nas unidades policiais da região central.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "Os cards reúnem guias de oito distritos policiais. Os dois guias de Liberdade distinguem o 1º e o 5º DP pelo número da unidade; o 12º DP, com referência Brás, é distinto do 8º DP, listado na Zona Leste.",
          "Este agrupamento organiza a navegação do portal e não corresponde a uma divisão administrativa da Polícia Civil. Bairros e zonas não definem a unidade responsável por um endereço.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
  {
    id: "zona-norte",
    slug: "zona-norte",
    nome: "Zona Norte",
    descricao:
      "Guias de delegacias nos eixos Santana, Casa Verde, Vila Maria, Tremembé, Brasilândia, Pirituba e Perus.",
    introducao:
      "A Zona Norte reúne bairros residenciais consolidados e eixos comerciais ao longo das linhas de transporte da região, com demandas variadas distribuídas entre as unidades policiais locais.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "Os cards reúnem guias de 16 distritos policiais, com referências como Carandiru, Casa Verde, Vila Maria, Freguesia do Ó, Pirituba, Jaçanã, Jaraguá, Perus e Parque Novo Mundo.",
          "Este agrupamento organiza a navegação do portal e não corresponde a uma divisão administrativa da Polícia Civil. Bairros e zonas não definem a unidade responsável por um endereço.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
  {
    id: "zona-leste",
    slug: "zona-leste",
    nome: "Zona Leste",
    descricao:
      "Guias de delegacias nos eixos Brás, Mooca, Penha, Tatuapé, Itaquera, São Miguel, São Mateus e extremo leste.",
    introducao:
      "A Zona Leste reúne referências territoriais de Brás e Mooca até Itaquera, Guaianases, Cidade Tiradentes e Itaim Paulista. Os guias identificam unidades e explicam documentos e procedimentos, sem delimitar circunscrição policial.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "Os cards reúnem guias de 34 distritos policiais, com referências como Penha, Ponte Rasa, Vila Carrão, Vila Formosa, Parque São Lucas, Ermelino Matarazzo, Vila Jacuí, São Mateus, Parque São Rafael e Sapopemba. Os dois guias de Itaquera distinguem o 32º e o 103º DP pelo número da unidade.",
          "Brás é incluído como referência editorial de transição entre Centro e Zona Leste. Este agrupamento organiza a navegação do portal e não corresponde a uma divisão administrativa da Polícia Civil. Bairros e zonas não definem a unidade responsável por um endereço.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
  {
    id: "zona-sul",
    slug: "zona-sul",
    nome: "Zona Sul",
    descricao:
      "Páginas territoriais nos eixos Santo Amaro, Jabaquara, M'Boi Mirim, Grajaú e Cidade Dutra.",
    introducao:
      "A Zona Sul reúne bairros com diferentes perfis urbanos. O guia editorial acompanha os eixos Santo Amaro, Jabaquara, Cidade Ademar, M'Boi Mirim, Interlagos e Grajaú.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "A região reúne páginas de referência nos eixos Santo Amaro, Brooklin, Campo Belo, Morumbi, Jabaquara, Ipiranga, Sacomã, Parque Bristol, Cidade Ademar, Capão Redondo, Campo Limpo, Socorro, Cidade Dutra, Parque Santo Antônio, Jardim Herculano, Vila Joaniza, Americanópolis, Jardim Miriam, Jardim Imbuias, Jardim Mirna, Heliópolis e Parelheiros, no extremo sul da cidade.",
          "Os bairros citados são referências geográficas. A confirmação da unidade responsável depende do endereço exato dos fatos e dos canais oficiais da Polícia Civil.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
  },
  {
    id: "zona-oeste",
    slug: "zona-oeste",
    nome: "Zona Oeste",
    descricao:
      "Cobertura publicada em Pinheiros, Butantã, Lapa, Perdizes, Vila Leopoldina, Jaguaré, Raposo Tavares e Jardins.",
    introducao:
      "Explore os bairros, as instituições públicas e as informações jurídicas da Zona Oeste.",
    secoes: [
      {
        titulo: "Cobertura territorial",
        paragrafos: [
          "A região reúne páginas de referência em Pinheiros, Butantã, Perdizes, Lapa e Vila Romana, Vila Leopoldina e CEAGESP, Jaguaré, Raposo Tavares e Jardim Arpoador e Jardins, com atenção às particularidades de cada distrito e às unidades policiais responsáveis.",
          "Novas unidades da região continuam sendo incorporadas lote a lote, mantendo o mesmo padrão editorial e a mesma observação sobre circunscrição.",
        ],
      },
      {
        titulo: "Informação editorial e orientação profissional",
        paragrafos: [
          "O conteúdo tem finalidade informativa e não substitui orientação de advogado ou da Defensoria Pública. Não há profissionais participantes publicados nem atendimento jurídico oferecido pelo portal.",
        ],
      },
    ],
    artigoEditorial: {
      titulo:
        "Zona Oeste de São Paulo: informações jurídicas, órgãos públicos e serviços por bairro",
      secoes: [
        {
          paragrafos: [
            "A Zona Oeste de São Paulo reúne importantes centros empresariais, bairros residenciais, áreas comerciais, instituições de ensino e regiões em constante transformação urbana. Sua diversidade territorial abrange desde os corredores econômicos de Pinheiros e da Avenida Brigadeiro Faria Lima até os bairros tradicionais da Lapa, Perdizes e Butantã, além das áreas de ocupação residencial, serviços e atividades produtivas do Jaguaré, Vila Leopoldina e Raposo Tavares.",
            "Essa variedade faz com que a região apresente diferentes questões relacionadas ao direito imobiliário, contratos empresariais, relações de trabalho, planejamento urbano, patrimônio, serviços públicos e procedimentos policiais ou judiciais.",
            "Bairros como Pinheiros, Alto de Pinheiros, Vila Madalena, Butantã, Lapa, Perdizes, Vila Leopoldina, Jaguaré, Rio Pequeno e Vila Sônia possuem características próprias de ocupação e desenvolvimento. Enquanto algumas localidades concentram edifícios corporativos, empreendimentos imobiliários e estabelecimentos comerciais, outras preservam áreas residenciais consolidadas, imóveis antigos, atividades industriais e espaços vinculados à infraestrutura metropolitana.",
            "A Banca Paulista organiza informações jurídicas e territoriais da Zona Oeste, reunindo guias de delegacias, referências institucionais, conteúdos sobre legislação e orientações gerais relacionadas aos serviços disponíveis em diferentes bairros da capital.",
            "O objetivo é facilitar o acesso à informação para moradores, proprietários, empresários, comerciantes, estudantes e demais pessoas que procuram compreender a organização institucional e as questões jurídicas relacionadas à região.",
          ],
        },
        {
          titulo: "Órgãos públicos, delegacias e serviços jurídicos na Zona Oeste",
          paragrafos: [
            "A Zona Oeste possui uma rede de serviços públicos distribuída entre diferentes unidades administrativas, policiais e judiciais. Delegacias da Polícia Civil, fóruns regionais, subprefeituras, serviços de assistência jurídica e órgãos municipais desempenham funções específicas conforme suas competências legais.",
            "Entre as situações que podem exigir informações sobre essas instituições estão intimações, registros de ocorrências, investigações policiais, conflitos patrimoniais, questões familiares, demandas cíveis, relações de consumo e procedimentos administrativos.",
            "Os guias da Banca Paulista apresentam referências territoriais de Distritos Policiais relacionados a localidades como Pinheiros, Vila Romana, Perdizes, Butantã e outras áreas da Zona Oeste, permitindo que o visitante encontre conteúdos sobre instituições e procedimentos associados ao seu território.",
            "A localização de uma unidade policial, entretanto, não define automaticamente sua circunscrição de atendimento. Da mesma forma, o bairro onde uma pessoa reside ou trabalha não determina, por si só, a competência de determinado órgão judicial. A identificação da unidade competente depende das regras aplicáveis e das informações oficiais das instituições.",
          ],
        },
        {
          titulo: "Mercado imobiliário, condomínios e patrimônio",
          paragrafos: [
            "O mercado imobiliário representa um dos principais aspectos jurídicos e econômicos da Zona Oeste. A região reúne edifícios residenciais de diferentes épocas, condomínios de alto padrão, imóveis comerciais, casas tradicionais, terrenos e antigas instalações industriais submetidas a processos de transformação.",
            "Em Pinheiros, Perdizes, Vila Madalena e Alto de Pinheiros, por exemplo, questões envolvendo compra e venda, locações, administração condominial, reformas, direito de vizinhança e contratos imobiliários podem assumir especial importância.",
            "Na Lapa e na Vila Leopoldina, a presença de imóveis industriais e comerciais, galpões e terrenos sujeitos à renovação urbana também exige atenção à documentação registral, às características da edificação, ao uso permitido e às obrigações decorrentes de sua utilização.",
            "Entre as matérias jurídicas relacionadas aos imóveis da Zona Oeste estão a regularidade da matrícula imobiliária, inventários e partilhas, usucapião quando juridicamente cabível, conflitos de posse, inadimplência condominial, responsabilidade por obras e divergências entre proprietários, locadores e locatários.",
            "A análise documental deve distinguir o registro de propriedade, o cadastro fiscal municipal e as condições de regularidade urbanística. A existência de inscrição no IPTU, isoladamente, não comprova a titularidade registral de um imóvel.",
          ],
        },
        {
          titulo: "Plano Diretor, zoneamento e transformação urbana",
          paragrafos: [
            "O desenvolvimento da Zona Oeste está diretamente relacionado às diretrizes do Plano Diretor Estratégico de São Paulo e da legislação municipal de parcelamento, uso e ocupação do solo.",
            "Essas normas influenciam a construção de edifícios, a instalação de atividades econômicas, a preservação de áreas residenciais, as exigências ambientais e o aproveitamento de terrenos.",
            "Um dos exemplos mais relevantes é a Operação Urbana Consorciada Faria Lima, que estabelece instrumentos e regras urbanísticas específicos para imóveis compreendidos em seu perímetro legal. As condições aplicáveis dependem da localização exata do terreno e da legislação vigente.",
            "Outro exemplo é a Área de Intervenção Urbana Vila Leopoldina–Villa Lobos, instituída pela Lei Municipal nº 17.968/2023. A legislação prevê mecanismos de reestruturação urbana e intervenções relacionadas à mobilidade, habitação, infraestrutura e desenvolvimento territorial em área delimitada da Vila Leopoldina.",
            "Esses instrumentos demonstram que a análise jurídica de um imóvel não deve considerar apenas sua localização comercial ou o potencial aparente de valorização.",
            "Antes de adquirir, reformar, ampliar ou desenvolver um empreendimento, é necessário verificar o zoneamento, os parâmetros construtivos, as restrições incidentes e os procedimentos de licenciamento exigidos.",
            "A plataforma municipal GeoSampa permite consultar informações urbanísticas e territoriais que auxiliam na identificação das regras aplicáveis a determinado lote.",
          ],
        },
        {
          titulo: "Empresas, contratos e atividades econômicas",
          paragrafos: [
            "A Zona Oeste concentra atividades econômicas de diferentes portes, desde escritórios e empresas de tecnologia até comércio de bairro, restaurantes, serviços profissionais, centros de distribuição e estabelecimentos industriais.",
            "A região de Pinheiros e o eixo da Avenida Faria Lima destacam-se pela concentração de escritórios, atividades financeiras, tecnologia, consultorias e serviços empresariais. Já a Lapa, o Jaguaré e a Vila Leopoldina apresentam combinações próprias de comércio, logística, serviços e atividades produtivas.",
            "Esse ambiente econômico envolve questões jurídicas relacionadas à constituição e administração de empresas, contratos comerciais, locação de imóveis corporativos, relações trabalhistas, conflitos societários, proteção de dados e responsabilidade civil.",
            "A abertura de um estabelecimento também pode depender de verificações relacionadas ao uso permitido do imóvel, ao licenciamento municipal, à segurança da edificação, à acessibilidade e às exigências próprias da atividade exercida.",
            "Em bairros com intensa atividade gastronômica e de entretenimento, como Pinheiros e Vila Madalena, também são relevantes as normas de funcionamento dos estabelecimentos, os limites de emissão sonora, as regras de uso do espaço público e os direitos dos moradores e consumidores.",
            "A Banca Paulista reúne informações sobre essas matérias em perspectiva editorial, relacionando aspectos jurídicos à realidade econômica e territorial da cidade.",
          ],
        },
        {
          titulo: "Universidade, pesquisa e instituições na região do Butantã",
          paragrafos: [
            "A presença da Universidade de São Paulo (USP), cuja Cidade Universitária Armando de Salles Oliveira está localizada na região do Butantã, constitui uma característica institucional importante da Zona Oeste.",
            "O entorno universitário reúne atividades educacionais, científicas, tecnológicas, culturais e de prestação de serviços. A circulação de estudantes, pesquisadores, trabalhadores e empresas cria relações jurídicas relacionadas a contratos, propriedade intelectual, locações residenciais, estágios, vínculos de trabalho e atividades de inovação.",
            "Também fazem parte da realidade territorial do Butantã e dos bairros próximos questões ligadas ao transporte, à infraestrutura urbana, ao uso dos imóveis e à convivência entre áreas residenciais e atividades econômicas.",
            "A presença de instituições de pesquisa e ensino reforça a importância de informações públicas acessíveis, especialmente quando envolvem procedimentos administrativos, direitos dos cidadãos e regras aplicáveis à utilização dos espaços urbanos.",
          ],
        },
        {
          titulo: "Mobilidade, infraestrutura e questões urbanas",
          paragrafos: [
            "A Zona Oeste possui conexões relevantes com outras partes da capital e da Região Metropolitana, incluindo a Linha 4-Amarela do Metrô, serviços ferroviários metropolitanos, a Marginal Pinheiros, a Rodovia Raposo Tavares e os principais corredores viários da região.",
            "Essas conexões influenciam o deslocamento da população, a localização de empresas, o funcionamento dos serviços públicos e as características dos empreendimentos imobiliários.",
            "Em determinadas localidades, questões relacionadas à drenagem urbana, obras de infraestrutura, desapropriações, intervenções viárias e impactos de novos empreendimentos também podem produzir consequências jurídicas para proprietários, comerciantes e moradores.",
            "As restrições urbanísticas e ambientais devem ser verificadas individualmente, especialmente em terrenos próximos a cursos d'água, áreas sujeitas a condicionantes específicas ou perímetros de intervenção previstos na legislação municipal.",
            "A localização de um imóvel em bairro valorizado ou próximo a uma importante avenida não afasta a necessidade de observar regras de licenciamento, uso do solo e regularidade documental.",
          ],
        },
        {
          titulo: "Consulte os guias e instituições da Zona Oeste",
          paragrafos: [
            "Nesta página, a Banca Paulista disponibiliza acesso aos guias jurídicos e territoriais publicados sobre a Zona Oeste de São Paulo.",
            "O visitante pode navegar pelas localidades, identificar referências de Distritos Policiais e consultar informações relacionadas a procedimentos jurídicos, serviços públicos, imóveis, empresas e legislação urbana.",
            "Os conteúdos são organizados para facilitar a compreensão do território e aproximar o cidadão das fontes oficiais de informação, sem substituir os serviços prestados pelos órgãos responsáveis.",
            "A Banca Paulista é um portal editorial independente de informação jurídica e territorial. Não representa órgãos públicos, não possui vínculo institucional com as delegacias ou tribunais apresentados e não presta consulta jurídica individualizada.",
            "Para questões concretas, a identificação do órgão competente e a análise profissional das circunstâncias específicas continuam sendo necessárias.",
          ],
        },
      ],
    },
  },
];

const NOME_POR_SLUG = new Map(zonas.map((zona) => [zona.slug, zona.nome]));

/** Nome de exibição da zona a partir do slug (fallback neutro). */
export function nomeDaZona(slug: string): string {
  return NOME_POR_SLUG.get(slug) ?? "São Paulo";
}

/** Artigo correto antes do nome da zona ("no Centro", "na Zona Sul"). */
export function artigoDaZona(slug: string): "no" | "na" {
  return slug === "centro" ? "no" : "na";
}

/** Contagem de páginas canônicas reais; região/bairro não é unidade de contagem. */
export function withPublishedGuideCounts(
  zones: Zona[],
  regions: Regiao[],
  guides: Delegacia[],
): (Zona & { quantidade: number })[] {
  const zoneByRegion = new Map(regions.map((region) => [region.slug, region.zona]));
  return zones.map((zone) => ({
    ...zone,
    quantidade: new Set(
      guides
        .filter((guide) => zoneByRegion.get(guide.regiaoSlug) === zone.slug)
        .map((guide) => guide.slug),
    ).size,
  }));
}
