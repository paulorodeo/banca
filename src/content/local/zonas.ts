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
      "Explore os bairros, as instituições públicas e as informações jurídicas da região central da capital.",
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
    artigoEditorial: {
      titulo: "Centro de São Paulo: informações jurídicas, órgãos públicos e serviços por bairro",
      secoes: [
        {
          paragrafos: [
            "A região central de São Paulo pode ser explorada por seus bairros, localidades e referências institucionais. Para quem procura informações sobre serviços públicos ou questões jurídicas, essa organização ajuda a distinguir o território apresentado das atribuições de cada órgão.",
            "A Banca Paulista reúne páginas de bairros, guias de delegacias e conteúdos relacionados à moradia, ao trabalho, ao comércio e ao acesso à informação pública no centro da capital.",
          ],
        },
        {
          titulo: "Bairros e localidades da região central",
          paragrafos: [
            "Os registros territoriais publicados neste hub incluem Liberdade, Bom Retiro, Campos Elíseos, Santa Ifigênia, Consolação, Cambuci, Santa Cecília e Brás. As páginas próprias apresentam os recortes editoriais usados pelo portal; eles não constituem limites administrativos oficiais.",
            "Liberdade aparece em um único card territorial, com acesso aos guias do 1º e do 5º DP identificados separadamente. Campos Elíseos e Santa Ifigênia permanecem como localidades distintas no cadastro, sem conversão de uma denominação policial em nome territorial.",
          ],
        },
        {
          titulo: "Órgãos públicos e serviços de Justiça",
          paragrafos: [
            "A região central reúne referências a serviços públicos e instituições judiciais nos materiais editoriais fornecidos. A Banca Paulista mantém guias policiais identificados por unidade e páginas territoriais separadas, sem afirmar que uma instituição atende toda pessoa que mora ou trabalha nas proximidades.",
            "Localização física, relação editorial com um território e competência institucional são informações diferentes. A identificação da unidade responsável depende das regras do procedimento e deve ser confirmada pelos canais oficiais do órgão.",
          ],
        },
        {
          titulo: "Moradia, imóveis e convivência",
          paragrafos: [
            "Locação, compra e venda, documentação imobiliária, condomínios, reformas e relações de vizinhança são temas que podem surgir em edifícios residenciais e comerciais. Imóveis de épocas diferentes também podem ter documentos, usos e necessidades de manutenção distintos.",
            "A página reúne informação editorial geral. Ela não determina a regularidade de uma edificação, não confirma restrições específicas e não avalia contratos ou casos individuais.",
          ],
        },
        {
          titulo: "Comércio, trabalho e serviços",
          paragrafos: [
            "Contratos, relações de consumo, locação comercial e relações de trabalho são assuntos relevantes para moradores, trabalhadores, comerciantes e empresas que consultam conteúdos sobre o Centro. A organização territorial ajuda a localizar páginas publicadas, sem atribuir um perfil econômico idêntico a cada bairro.",
            "As exigências aplicáveis a um estabelecimento ou atividade dependem do imóvel, do uso pretendido e dos órgãos responsáveis. A consulta aos serviços oficiais continua necessária para informações de atendimento e procedimentos.",
          ],
        },
        {
          titulo: "Patrimônio e utilização dos imóveis",
          paragrafos: [
            "O texto editorial fornecido para esta região destaca conservação, reformas e diferentes formas de utilização de edificações como temas de interesse. Uma construção antiga, por si só, não comprova tombamento ou outra restrição patrimonial.",
            "Antes de uma intervenção ou mudança de uso, a situação específica deve ser consultada nos registros oficiais e nos órgãos de preservação e urbanismo competentes. Este portal não declara que um imóvel determinado esteja protegido ou sujeito a autorização especial.",
          ],
        },
        {
          titulo: "Acesso aos bairros e às instituições",
          paragrafos: [
            "Use os cards para visitar as páginas territoriais e a seção própria de delegacias para consultar os guias policiais publicados. A página da Liberdade reúne as duas opções do 1º e do 5º DP sem escolher silenciosamente uma delas; os demais guias preservam suas URLs canônicas.",
            "A Banca Paulista é um portal editorial independente de informação jurídica e territorial. Os conteúdos não substituem os canais oficiais de atendimento nem a orientação profissional para situações individuais.",
          ],
        },
      ],
    },
  },
  {
    id: "zona-norte",
    slug: "zona-norte",
    nome: "Zona Norte",
    descricao:
      "Guias de delegacias nos eixos Santana, Casa Verde, Vila Maria, Tremembé, Brasilândia, Pirituba e Perus.",
    introducao:
      "Explore os bairros, as instituições públicas e as informações jurídicas da Zona Norte.",
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
    artigoEditorial: {
      titulo:
        "Zona Norte de São Paulo: informações jurídicas, órgãos públicos e serviços por bairro",
      secoes: [
        {
          paragrafos: [
            "A vida cotidiana nos bairros da Zona Norte envolve questões relacionadas à moradia, ao trabalho, ao comércio e ao acesso aos serviços públicos. Encontrar informações organizadas por território ajuda o visitante a conhecer as instituições e os conteúdos disponíveis para sua região.",
            "A Banca Paulista reúne páginas de bairros, guias de delegacias e referências institucionais da Zona Norte. Cada conteúdo identifica seu contexto territorial e oferece caminhos para aprofundar a consulta.",
          ],
        },
        {
          titulo: "Bairros e referências territoriais",
          paragrafos: [
            "A página reúne referências publicadas como Carandiru, Casa Verde, Vila Maria, Jardim França, Freguesia do Ó, Pirituba, Perus, Jaçanã, Jaraguá, Vila Brasilândia e outras localidades cadastradas. Os cards acima levam às páginas próprias, que descrevem o recorte editorial e os guias relacionados sem tratar esses nomes como limites administrativos.",
            "As páginas individuais preservam a identificação de cada localidade e distinguem a organização editorial do portal dos distritos administrativos e das áreas de atuação de instituições públicas.",
          ],
        },
        {
          titulo: "Órgãos públicos e serviços de Justiça",
          paragrafos: [
            "Os registros locais incluem guias informativos de Distritos Policiais associados a referências da Zona Norte. Cada guia identifica sua unidade e mantém seu próprio endereço editorial. Uma relação no portal não comprova localização física dentro de todo bairro citado nem define competência ou atendimento.",
            "Demandas administrativas, policiais e judiciais podem seguir critérios institucionais próprios. Consulte o órgão competente por seus canais oficiais, considerando o endereço e a natureza do serviço procurado.",
          ],
        },
        {
          titulo: "Moradia, imóveis e convivência",
          paragrafos: [
            "Compra e venda, locação, documentação de imóveis, administração de condomínios e relações de vizinhança são temas que podem surgir em diferentes localidades. A consulta de informações deve considerar os documentos do imóvel e as circunstâncias concretas, sem presumir que o nome de um bairro determine sua situação jurídica.",
            "O portal apresenta conteúdo editorial geral. Ele não examina contratos, registros ou situações individuais e não substitui os canais públicos ou a orientação profissional adequada.",
          ],
        },
        {
          titulo: "Comércio, trabalho e serviços",
          paragrafos: [
            "Comerciantes, trabalhadores e prestadores de serviços podem buscar referências sobre contratos, relações de consumo, locação comercial e relações de trabalho. As páginas organizam conteúdos e guias disponíveis, sem atribuir um perfil econômico uniforme a cada bairro.",
            "Regras e procedimentos variam conforme a atividade e o caso. A página regional serve como caminho de navegação para conteúdos publicados e fontes institucionais.",
          ],
        },
        {
          titulo: "Acesso aos guias da Zona Norte",
          paragrafos: [
            "Explore os cards territoriais para acessar as páginas próprias dos bairros e use a seção de delegacias para abrir os guias policiais publicados. Os dois tipos de página têm destinos e propósitos distintos; as relações editoriais não indicam circunscrição ou atendimento.",
            "A Banca Paulista é um portal editorial independente de informação jurídica e territorial. Os conteúdos não substituem os canais oficiais de atendimento nem a orientação profissional para situações individuais.",
          ],
        },
      ],
    },
  },
  {
    id: "zona-leste",
    slug: "zona-leste",
    nome: "Zona Leste",
    descricao:
      "Guias de delegacias nos eixos Brás, Mooca, Penha, Tatuapé, Itaquera, São Miguel, São Mateus e extremo leste.",
    introducao:
      "Explore os bairros, as instituições públicas e as informações jurídicas da Zona Leste.",
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
    artigoEditorial: {
      titulo:
        "Zona Leste de São Paulo: informações jurídicas, instituições públicas e serviços por região",
      secoes: [
        {
          paragrafos: [
            "A Zona Leste de São Paulo reúne bairros residenciais, centros comerciais, polos empresariais, áreas industriais e importantes corredores de transporte da capital paulista. Sua extensão territorial e diversidade urbana fazem com que questões relacionadas a imóveis, atividades econômicas, serviços públicos, relações de trabalho e procedimentos jurídicos assumam características distintas conforme o bairro e a localidade.",
            "Regiões como Mooca, Tatuapé, Penha, Vila Formosa, Vila Prudente, Itaquera, São Miguel Paulista, São Mateus, Itaim Paulista, Guaianases e Cidade Tiradentes apresentam diferentes perfis de ocupação, infraestrutura e desenvolvimento urbano. Enquanto alguns setores concentram edifícios residenciais, estabelecimentos comerciais e novos empreendimentos imobiliários, outros possuem ocupações mais antigas, áreas em transformação, conjuntos habitacionais e demandas relacionadas à regularização fundiária e ao acesso a equipamentos públicos.",
            "A Banca Paulista organiza informações jurídicas e territoriais da Zona Leste, facilitando a consulta a guias de delegacias, referências institucionais, temas jurídicos e conteúdos relacionados à realidade dos bairros. O objetivo é reunir informações úteis para moradores, proprietários de imóveis, comerciantes, empresários e demais interessados nos serviços e instituições da região.",
          ],
        },
        {
          titulo: "Órgãos públicos, delegacias e serviços de Justiça na Zona Leste",
          paragrafos: [
            "A organização dos serviços públicos na Zona Leste envolve diferentes esferas administrativas. Delegacias da Polícia Civil, unidades do Poder Judiciário, serviços de assistência jurídica, subprefeituras e órgãos municipais exercem atribuições distintas, conforme a natureza da demanda e a competência territorial de cada instituição.",
            "Entre os temas que levam cidadãos a buscar informações sobre esses órgãos estão registros de ocorrências, intimações policiais, investigações, processos judiciais, conflitos de vizinhança, documentação imobiliária, questões familiares, relações de consumo e demandas envolvendo empresas.",
            "O portal mantém guias territoriais de Distritos Policiais de diferentes localidades da Zona Leste, incluindo referências na Mooca, Penha, Tatuapé, Itaquera, São Mateus e São Miguel Paulista. Esses conteúdos ajudam a localizar informações sobre as unidades e a compreender procedimentos jurídicos relacionados à atividade policial.",
            "É importante distinguir a localização física de uma delegacia de sua circunscrição oficial. A proximidade de uma unidade não significa necessariamente que ela seja responsável por determinada ocorrência ou endereço. A identificação da autoridade competente deve considerar as informações oficiais da Polícia Civil e dos órgãos responsáveis.",
          ],
        },
        {
          titulo: "Imóveis, regularização fundiária e questões jurídicas urbanas",
          paragrafos: [
            "O mercado imobiliário da Zona Leste apresenta situações bastante diferentes entre seus bairros. Em localidades como Tatuapé, Mooca e Anália Franco, a verticalização e a presença de empreendimentos residenciais e comerciais tornam relevantes questões relacionadas a condomínios, incorporação imobiliária, contratos de compra e venda, locações, obras e documentação patrimonial.",
            "Em outras partes da região, também merecem atenção a regularização de construções, a titularidade de terrenos, a documentação de imóveis antigos, os procedimentos de usucapião quando cabíveis e a regularização fundiária urbana.",
            "Antes de adquirir, vender, reformar ou desenvolver um imóvel, é importante compreender a diferença entre documentação registral, cadastro municipal e regularidade urbanística. A inscrição imobiliária utilizada para fins de IPTU, por exemplo, não substitui a matrícula do imóvel no Cartório de Registro de Imóveis.",
            "Também podem surgir questões relacionadas a inventários, partilhas, direitos de herdeiros, contratos de locação, inadimplência condominial, disputas de posse e responsabilidade por obras ou intervenções em imóveis vizinhos.",
          ],
        },
        {
          titulo: "Plano Diretor, zoneamento e desenvolvimento urbano da Zona Leste",
          paragrafos: [
            "O desenvolvimento da Zona Leste está relacionado às diretrizes do Plano Diretor Estratégico do Município de São Paulo, instituído pela Lei Municipal nº 16.050/2014 e objeto de revisão intermediária pela Lei nº 17.975/2023.",
            "O planejamento urbano municipal estabelece diretrizes para o crescimento da cidade, o uso do solo, a mobilidade, a habitação, a preservação ambiental e a distribuição de infraestrutura e atividades econômicas.",
            "A Lei de Parcelamento, Uso e Ocupação do Solo, conhecida como Lei de Zoneamento, também influencia a utilização dos imóveis e as possibilidades de instalação de atividades comerciais, industriais e de serviços, observadas suas alterações posteriores.",
            "Na Zona Leste, essas regras são particularmente relevantes para áreas próximas a corredores de transporte, como a Radial Leste, a região do Metrô Tatuapé e outros eixos de mobilidade, além de bairros que passam por transformações residenciais e comerciais.",
            "O enquadramento urbanístico de um imóvel pode interferir nas atividades permitidas, no potencial construtivo, nas exigências de licenciamento e nas condições de regularização. A existência de Zonas Especiais de Interesse Social (ZEIS), áreas de proteção ambiental ou outras restrições legais também pode modificar as possibilidades de utilização de determinado terreno.",
            "Para uma análise específica, é necessário consultar a legislação vigente e os mapas oficiais disponibilizados pelo Município, incluindo o sistema GeoSampa, considerando a identificação exata do lote.",
          ],
        },
        {
          titulo: "Empresas, comércio e atividades econômicas",
          paragrafos: [
            "A Zona Leste possui uma atividade econômica diversificada, abrangendo comércio varejista e atacadista, prestação de serviços, logística, alimentação, construção civil, atividades industriais e pequenos negócios.",
            "A instalação e o funcionamento de empresas podem envolver exigências relacionadas ao zoneamento, licenciamento, regularidade cadastral, segurança da edificação, acessibilidade, vigilância sanitária e normas ambientais, conforme o tipo de atividade.",
            "Entre as questões jurídicas pertinentes à rotina empresarial estão contratos comerciais, relações de consumo, obrigações trabalhistas, locação de imóveis comerciais, cobrança de dívidas, conflitos societários e responsabilidade civil.",
            "Para estabelecimentos que pretendem mudar de endereço, ampliar instalações ou modificar sua atividade, é especialmente importante verificar a compatibilidade do uso pretendido com o zoneamento e as exigências administrativas aplicáveis.",
          ],
        },
        {
          titulo: "Bairros, mobilidade e acesso aos serviços públicos",
          paragrafos: [
            "A extensão da Zona Leste torna a mobilidade um fator importante na relação entre a população e os serviços públicos.",
            "A Linha 3-Vermelha do Metrô, os serviços ferroviários metropolitanos, os terminais de ônibus e os principais corredores viários conectam diferentes localidades da região aos centros administrativos e econômicos da capital.",
            "Entretanto, a distribuição das instituições não acompanha necessariamente os limites informais dos bairros ou os percursos mais utilizados pela população. Dependendo da demanda, o atendimento pode estar vinculado a uma unidade regional, à competência de determinado órgão ou ao serviço disponível em canal eletrônico.",
            "Por esse motivo, os guias territoriais da Banca Paulista procuram organizar as referências por localidade, preservando a identificação oficial das instituições e seus respectivos serviços.",
          ],
        },
        {
          titulo: "Consulte os guias jurídicos e territoriais da Zona Leste",
          paragrafos: [
            "Nesta página, você encontra acesso aos conteúdos publicados sobre a Zona Leste de São Paulo, incluindo guias de Distritos Policiais, referências de bairros, informações institucionais e temas jurídicos relacionados ao território.",
            "A navegação permite explorar diferentes localidades e consultar conteúdos sobre procedimentos policiais, documentação imobiliária, legislação urbanística, direitos dos cidadãos e atividades empresariais.",
            "A Banca Paulista é um portal editorial independente de informação jurídica e territorial. Não possui vínculo institucional com a Polícia Civil, o Poder Judiciário ou os demais órgãos apresentados, nem substitui os canais oficiais de atendimento ou a orientação jurídica individualizada de profissionais habilitados.",
          ],
        },
      ],
    },
  },
  {
    id: "zona-sul",
    slug: "zona-sul",
    nome: "Zona Sul",
    descricao:
      "Páginas territoriais nos eixos Santo Amaro, Jabaquara, M'Boi Mirim, Grajaú e Cidade Dutra.",
    introducao:
      "Explore os bairros, as instituições públicas e as informações jurídicas da Zona Sul.",
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
    artigoEditorial: {
      titulo: "Zona Sul de São Paulo: informações jurídicas, órgãos públicos e serviços por bairro",
      secoes: [
        {
          paragrafos: [
            "Encontrar informações sobre serviços públicos e instituições exige compreender o território e a natureza de cada atendimento. Na Zona Sul, a Banca Paulista organiza essa consulta por bairros, referências institucionais e guias publicados.",
            "Esta página reúne caminhos para conhecer as localidades, acessar informações sobre delegacias e explorar temas relacionados à moradia, ao trabalho, ao comércio e à vida urbana.",
          ],
        },
        {
          titulo: "Bairros e referências territoriais",
          paragrafos: [
            "A Zona Sul reúne localidades com páginas próprias, como Santo Amaro, Jabaquara, Brooklin, Campo Belo, Morumbi, Ipiranga, Sacomã, Campo Limpo, Cidade Ademar, Cidade Dutra, Capão Redondo, Socorro, Parelheiros e outras referências publicadas no índice. Cada card leva à página territorial correspondente; os agrupamentos seguem o cadastro editorial e não constituem classificação administrativa oficial.",
            "Santo Amaro mantém um recorte editorial próprio em torno do Largo Treze. A página distingue esse recorte do distrito administrativo, da subprefeitura e das demais áreas que usam o mesmo nome.",
          ],
        },
        {
          titulo: "Órgãos públicos e serviços de Justiça",
          paragrafos: [
            "Os registros locais oferecem guias informativos de Distritos Policiais associados às referências da Zona Sul. Localização física, relação editorial e competência institucional são informações diferentes; a presença de um guia não determina atendimento ou circunscrição.",
            "A natureza do procedimento e as regras do órgão responsável influenciam a identificação do serviço adequado. Consulte os canais oficiais para confirmar a unidade competente para cada situação.",
          ],
        },
        {
          titulo: "Moradia, imóveis e convivência",
          paragrafos: [
            "Compra e venda, locação, documentação imobiliária, administração de condomínios e relações de vizinhança fazem parte dos temas que podem afetar moradores e proprietários. As condições variam conforme os documentos, o imóvel e o contexto de cada demanda.",
            "O portal organiza informações gerais e não analisa contratos, registros ou casos individuais. A consulta aos serviços oficiais e a profissionais habilitados continua necessária quando a situação exigir avaliação específica.",
          ],
        },
        {
          titulo: "Comércio, trabalho e atividades econômicas",
          paragrafos: [
            "Comerciantes, empresas, trabalhadores e prestadores de serviços podem encontrar questões relacionadas a contratos, relações de consumo, locação comercial e trabalho. A página regional apresenta esses assuntos sem atribuir o mesmo perfil econômico a todos os bairros.",
            "As referências publicadas permitem navegar por conteúdos territoriais e guias relacionados, sem substituir a análise das regras aplicáveis a uma atividade ou relação concreta.",
          ],
        },
        {
          titulo: "Mobilidade e acesso aos serviços",
          paragrafos: [
            "A extensão da Zona Sul torna útil organizar informações por localidade. As páginas do portal oferecem caminhos entre bairros, referências institucionais e guias publicados, sem estimar trajetos, tempos de deslocamento ou atendimento por proximidade.",
            "A divisão editorial por zonas e bairros facilita a navegação, mas não corresponde necessariamente aos limites administrativos ou às áreas de competência de órgãos públicos.",
          ],
        },
        {
          titulo: "Explore os bairros e os guias da Zona Sul",
          paragrafos: [
            "Use os cards para conhecer as páginas próprias dos bairros e a seção de delegacias para abrir os guias policiais. O guia canônico do 11º DP permanece acessível e relacionado editorialmente a Santo Amaro; essa relação não afirma circunscrição ou atendimento exclusivo.",
            "A Banca Paulista é um portal editorial independente de informação jurídica e territorial. Os conteúdos não substituem os canais oficiais de atendimento nem a orientação profissional para situações individuais.",
          ],
        },
      ],
    },
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
