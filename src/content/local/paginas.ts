import type { PaginaInstitucional } from "../types";
import { editorialIdentity } from "./settings";
import { politicaPrivacidade } from "./privacidade";

export const paginas: PaginaInstitucional[] = [
  {
    id: "pagina-termos-de-uso",
    slug: "termos-de-uso",
    titulo: "Termos de Uso, Aviso Legal e Política Editorial",
    subtitulo: "Transparência, responsabilidade e compromisso com a informação.",
    seo: {
      title: "Termos de Uso e Política Editorial | Banca Paulista",
      description:
        "Conheça os Termos de Uso, o Aviso Legal e a Política Editorial da Banca Paulista. Transparência, fontes, direitos autorais e responsabilidade informativa.",
      canonicalPath: "/termos-de-uso",
    },
    introducao: [
      "A Banca Paulista é um portal editorial independente dedicado à organização e divulgação de informações jurídicas, institucionais e territoriais, com atenção especial à cidade de São Paulo, seus bairros, regiões e serviços públicos.",
      "Esta página reúne os Termos de Uso, o Aviso Legal e os princípios da Política Editorial da Banca Paulista. Seu objetivo é esclarecer a natureza do projeto, as condições de utilização do conteúdo, os limites das informações publicadas, os critérios editoriais e os direitos e responsabilidades relacionados ao acesso ao portal.",
      "Ao utilizar os conteúdos da Banca Paulista, o visitante deve considerar as condições e orientações apresentadas nesta página, observados os direitos e as garantias previstos na legislação brasileira.",
    ],
    indice: [
      ["natureza", "Natureza institucional"],
      ["finalidade", "Finalidade informativa"],
      ["orgaos", "Órgãos públicos e instituições"],
      ["territorios", "Regiões e bairros"],
      ["politica-editorial", "Política editorial"],
      ["fontes", "Fontes e referências"],
      ["atualizacao", "Atualização do conteúdo"],
      ["correcoes", "Correções e direito de resposta"],
      ["autoria", "Autoria e responsabilidade"],
      ["profissionais", "Profissionais independentes"],
      ["publicidade", "Publicidade e conteúdo comercial"],
      ["direitos-autorais", "Direitos autorais"],
      ["uso-adequado", "Uso adequado do portal"],
      ["disponibilidade", "Disponibilidade e limitações"],
      ["privacidade", "Privacidade e dados pessoais"],
      ["alteracoes", "Alterações destes Termos"],
      ["legislacao", "Legislação aplicável"],
      ["contato", "Contato editorial e institucional"],
    ].map(([id, rotulo]) => ({ id: id!, rotulo: rotulo! })),
    blocos: [
      {
        titulo: "1. Natureza institucional da Banca Paulista",
        paragrafos: [
          "A Banca Paulista é uma iniciativa editorial independente voltada à produção, organização e apresentação de informações de interesse público.",
          "O portal reúne conteúdos sobre legislação, instituições públicas, procedimentos jurídicos, serviços, bairros, regiões, atividades econômicas e questões territoriais, permitindo que cidadãos, profissionais, empresas e pesquisadores encontrem referências relevantes de maneira organizada.",
          "A Banca Paulista não é órgão público, entidade integrante do Poder Judiciário, sociedade de advocacia ou escritório de advocacia.",
          "Também não possui vínculo institucional com a Polícia Civil, tribunais, fóruns, cartórios, subprefeituras, Defensoria Pública ou demais instituições mencionadas em suas páginas, salvo quando algum vínculo específico for expressamente identificado e comprovado.",
          "As referências a instituições públicas têm finalidade exclusivamente informativa e não representam endosso, parceria, representação oficial ou autorização para atuar em nome dessas entidades.",
          "A utilização do domínio .org integra a identidade digital do portal, mas não implica, por si só, reconhecimento como órgão público, associação, fundação ou organização sem fins lucrativos.",
        ],
        links: [{ rotulo: "Sobre a Banca Paulista", href: "/sobre" }],
      },
      {
        titulo: "2. Finalidade informativa e limites do conteúdo jurídico",
        paragrafos: [
          "Os conteúdos disponibilizados pela Banca Paulista possuem finalidade informativa, educativa, documental e editorial.",
          "Informações sobre direitos, deveres, legislação, procedimentos policiais, processos judiciais, contratos, imóveis, empresas e serviços públicos são apresentadas em caráter geral, considerando as fontes e os contextos disponíveis no momento de sua elaboração.",
          "Esses materiais não constituem consulta jurídica individualizada, parecer jurídico, representação processual, assistência advocatícia ou promessa de solução para situações concretas.",
          "A interpretação e a aplicação da legislação dependem das circunstâncias de cada caso, da documentação pertinente, das normas vigentes e da análise realizada por profissional legalmente habilitado, quando necessária.",
          "A leitura de um artigo ou guia jurídico não estabelece relação profissional entre o visitante e a Banca Paulista, seus responsáveis editoriais ou eventuais colaboradores.",
          "Para orientação jurídica individualizada, o interessado deverá procurar diretamente advogado habilitado ou serviço público competente, como a Defensoria Pública, conforme a situação.",
          "A Banca Paulista não disponibiliza, por meio de seus conteúdos editoriais, serviço próprio de assistência criminal, atendimento jurídico de urgência ou plantão advocatício de 24 horas.",
          "Em situações urgentes, o visitante não deve aguardar resposta de canais editoriais, devendo procurar diretamente os serviços e profissionais adequados.",
        ],
      },
      {
        titulo: "3. Informações sobre órgãos públicos e instituições",
        paragrafos: [
          "A Banca Paulista publica guias e referências relacionados a delegacias, órgãos administrativos, instituições judiciárias e outros serviços de interesse público.",
          "Essas páginas podem conter informações sobre denominação de unidades, localização territorial, competências institucionais, procedimentos, legislação e conteúdos relacionados.",
          "As informações apresentadas não substituem os canais oficiais das respectivas instituições.",
          "Endereços, telefones, horários de funcionamento, competências, serviços disponíveis e outras informações operacionais podem ser modificados pelos órgãos responsáveis.",
          "Sempre que uma informação depender de atualização oficial, recomenda-se confirmá-la diretamente no canal institucional competente.",
          "A inclusão de uma delegacia, fórum ou outra entidade no portal não significa que a Banca Paulista possua autorização para representá-la, prestar serviços em seu nome ou intermediar procedimentos administrativos ou judiciais.",
          "A presença de uma instituição em determinada página territorial também não estabelece, por si só, sua circunscrição policial, jurisdição, competência administrativa ou área oficial de atendimento.",
        ],
        links: [{ rotulo: "Guias de delegacias", href: "/delegacias" }],
      },
      {
        titulo: "4. Organização territorial, regiões e bairros",
        paragrafos: [
          "A Banca Paulista utiliza uma organização editorial baseada em regiões, zonas, bairros e localidades para facilitar a consulta aos conteúdos.",
          "Na cidade de São Paulo, os guias são agrupados em Centro, Zona Norte, Zona Leste, Zona Sul e Zona Oeste.",
          "Essa classificação tem finalidade de navegação e contextualização geográfica.",
          "Os agrupamentos editoriais não substituem as divisões administrativas oficiais da Prefeitura, os distritos municipais, as circunscrições policiais, as competências jurisdicionais ou os limites estabelecidos por legislação específica.",
          "Um bairro pode possuir relações históricas, econômicas ou geográficas com diferentes localidades, sem que isso determine automaticamente o órgão responsável por determinado serviço.",
          "Quando houver necessidade de identificar a competência territorial de uma instituição, deverão ser consideradas as informações oficiais e as regras aplicáveis ao caso.",
        ],
        links: [{ rotulo: "Explorar regiões e bairros", href: "/regioes" }],
      },
      {
        titulo: "5. Política editorial e compromisso com a informação",
        paragrafos: [
          "A Banca Paulista busca desenvolver uma linha editorial baseada na utilidade pública da informação, na identificação de fontes, na clareza da linguagem e na contextualização dos fatos.",
          "O compromisso editorial envolve a apresentação responsável de informações jurídicas e institucionais, evitando a confusão entre conteúdo informativo, opinião, publicidade e prestação de serviços profissionais.",
        ],
        lista: [
          "Guias de órgãos públicos, instituições e serviços.",
          "Informações jurídicas de caráter geral.",
          "Conteúdos sobre bairros, regiões e organização territorial.",
          "Legislação, planejamento urbano e serviços municipais.",
          "Questões relacionadas a imóveis, empresas e atividades econômicas.",
          "Artigos, análises, entrevistas e materiais assinados.",
          "Conteúdos documentais e outras publicações de interesse público.",
        ],
        complemento: [
          "A publicação de determinado assunto não significa que a Banca Paulista apoie todas as posições apresentadas pelas pessoas, entidades ou instituições mencionadas.",
          "Quando um conteúdo envolver diferentes interpretações jurídicas ou informações sujeitas a controvérsia, a apresentação editorial deverá procurar distinguir fatos documentados, alegações atribuídas, opiniões e interpretações.",
          "O portal poderá publicar análises e comentários editoriais, desde que sua natureza opinativa seja identificável e que não sejam apresentados como fatos comprovados acontecimentos ainda não demonstrados.",
        ],
      },
      {
        titulo: "6. Fontes, documentos públicos e referências externas",
        paragrafos: [
          "A Banca Paulista poderá utilizar legislação, publicações oficiais, decisões judiciais, documentos públicos, dados institucionais, estudos, relatórios e outras fontes relacionadas aos temas abordados.",
          "Sempre que pertinente e tecnicamente possível, os conteúdos deverão identificar a origem das informações e disponibilizar referências que permitam sua verificação.",
          "A utilização de fontes públicas não significa que todos os documentos possam ser reproduzidos integralmente ou utilizados sem restrições.",
          "Direitos autorais, condições de licenciamento, proteção de dados pessoais, sigilo legal e demais limitações aplicáveis devem ser observados.",
          "A indicação de uma fonte não representa necessariamente concordância editorial com todas as posições ou publicações da instituição de origem.",
          "Links para páginas externas são oferecidos como referências complementares. A Banca Paulista não controla integralmente o conteúdo, a disponibilidade, as alterações ou as políticas de funcionamento dos sites de terceiros.",
          "A existência de um link externo não caracteriza automaticamente parceria comercial, vínculo institucional ou recomendação de contratação de produtos e serviços.",
        ],
      },
      {
        titulo: "7. Atualização e conservação do conteúdo",
        paragrafos: [
          "Informações jurídicas, administrativas e institucionais podem sofrer alterações ao longo do tempo.",
          "Leis podem ser modificadas ou revogadas, decisões judiciais podem ser revistas e órgãos públicos podem alterar suas atribuições ou formas de atendimento.",
          "A Banca Paulista poderá revisar, corrigir, complementar, atualizar, reorganizar ou retirar conteúdos quando identificar necessidade editorial, informação desatualizada ou outro motivo legítimo.",
          "A existência de uma página publicada não constitui garantia de atualização permanente ou monitoramento em tempo real.",
          "Datas de publicação e atualização poderão ser apresentadas quando disponíveis e deverão corresponder a registros efetivos.",
          "Em temas sujeitos a alterações frequentes, recomenda-se consultar a versão vigente da legislação e as informações oficiais disponíveis.",
          "A manutenção de conteúdos históricos poderá ocorrer quando houver relevância documental, desde que o contexto temporal seja esclarecido sempre que necessário para evitar interpretações equivocadas.",
        ],
      },
      {
        titulo: "8. Correções, esclarecimentos e direito de resposta",
        paragrafos: [
          "A Banca Paulista reconhece a importância da correção de informações inexatas e do tratamento responsável de solicitações relacionadas ao conteúdo editorial.",
          "Pessoas físicas, empresas, profissionais e instituições que identifiquem informações incorretas, desatualizadas ou potencialmente lesivas a direitos poderão solicitar análise editorial pelos canais institucionais disponibilizados pelo portal.",
          "Uma solicitação de correção deverá, preferencialmente, identificar a página, o trecho questionado, o motivo da contestação e os documentos ou referências necessários à sua avaliação.",
          "O recebimento de uma solicitação não implica remoção automática do conteúdo, assim como sua publicação original não impede posterior correção ou revisão.",
          "Cada manifestação deverá ser apreciada conforme os elementos apresentados, a legislação aplicável, a relevância pública da informação e os direitos envolvidos.",
          "Quando cabível, poderão ser adotadas medidas como correção, atualização, contextualização adicional, identificação de divergência, publicação de esclarecimento ou retirada do conteúdo.",
          "Os direitos de resposta, retificação, privacidade e proteção da honra serão observados nos termos da legislação brasileira.",
          "A Banca Paulista não exige decisão judicial como condição universal para examinar solicitações fundamentadas de correção editorial.",
        ],
      },
      {
        titulo: "9. Autoria, colaboração e responsabilidade editorial",
        paragrafos: [
          "Os conteúdos publicados poderão ser produzidos pela equipe editorial ou por colaboradores devidamente identificados, conforme a natureza de cada publicação.",
          "Artigos assinados deverão apresentar autoria atribuída de maneira verdadeira e compatível com as informações disponíveis.",
          "A participação de um profissional em determinado conteúdo não significa, por si só, que ele integre a administração do portal, represente outros colaboradores ou mantenha vínculo profissional com a Banca Paulista.",
          "A publicação de entrevistas e declarações deverá preservar a identificação adequada de seu contexto e de suas fontes.",
          "A Banca Paulista não deverá atribuir autoria, inscrição profissional, cargo ou vínculo institucional a pessoas sem fundamento documental apropriado.",
          "Materiais cuja autoria, autorização de uso ou procedência não possam ser suficientemente estabelecidas poderão permanecer fora de publicação até a conclusão das verificações necessárias.",
          "O uso de recursos tecnológicos e ferramentas de inteligência artificial como apoio à pesquisa, organização, redação ou revisão não afasta a responsabilidade editorial pela avaliação do conteúdo divulgado.",
          "Informações, referências e declarações atribuídas a pessoas ou instituições não deverão ser inventadas para completar publicações.",
        ],
      },
      {
        titulo: "10. Profissionais independentes e prestação de serviços",
        paragrafos: [
          "A Banca Paulista poderá apresentar informações sobre profissionais independentes, desde que sejam observados os critérios editoriais, jurídicos e de transparência aplicáveis.",
          "A eventual publicação de um perfil profissional não significa que o profissional integre a Banca Paulista, atue em nome do portal ou esteja disponível para atendimento imediato.",
          "A apresentação de informações profissionais também não representa garantia de resultado, qualidade do serviço, especialização oficialmente reconhecida ou disponibilidade de agenda.",
          "Quando existirem perfis publicados, informações como nome, inscrição profissional, áreas de atuação declaradas e canais de contato deverão ser apresentadas de maneira adequada à sua natureza e origem.",
          "A contratação de serviços jurídicos, quando houver interesse do visitante, deverá ocorrer diretamente com o profissional escolhido, de acordo com as normas aplicáveis à atividade.",
          "A Banca Paulista não se apresenta como intermediadora de causas, não oferece distribuição de processos a advogados e não comercializa encaminhamento de clientes ou demandas jurídicas.",
          "As regras específicas de participação profissional, independência, transparência e publicidade serão disciplinadas na Política de Integridade e Ética do portal.",
        ],
        links: [{ rotulo: "Página de profissionais", href: "/profissionais" }],
      },
      {
        titulo: "11. Publicidade, patrocínios e conteúdo comercial",
        paragrafos: [
          "A existência de conteúdo editorial não impede que a Banca Paulista venha a desenvolver atividades publicitárias ou serviços comerciais compatíveis com sua natureza e com a legislação aplicável.",
          "Entretanto, publicidade, patrocínio, colaboração comercial e conteúdo editorial deverão ser apresentados de forma que o visitante possa compreender sua natureza.",
          "Eventuais anúncios pagos não poderão ser apresentados falsamente como recomendações independentes, decisões de autoridades públicas ou resultados oficiais de instituições.",
          "A participação comercial não deverá determinar a falsificação de dados, a criação de vínculos institucionais inexistentes ou a apresentação enganosa de informações.",
          "A implantação de serviços comerciais relacionados a profissões regulamentadas dependerá da avaliação das regras específicas de publicidade, ética e exercício profissional.",
          "A Banca Paulista não garante a implantação futura de qualquer serviço anunciado apenas como projeto ou possibilidade de desenvolvimento.",
        ],
      },
      {
        titulo: "12. Direitos autorais e utilização dos materiais",
        paragrafos: [
          "A organização editorial, os textos originais, os elementos gráficos, as composições visuais, a identidade do portal e outros materiais próprios da Banca Paulista podem estar protegidos pela legislação brasileira de direitos autorais e por outros direitos aplicáveis.",
          "A consulta aos conteúdos públicos do portal é permitida para fins legítimos de informação, estudo, pesquisa e utilização pessoal.",
          "A reprodução, distribuição, adaptação ou exploração de materiais deverá observar os limites legais, as licenças aplicáveis e os direitos de seus respectivos titulares.",
          "A disponibilização de um conteúdo para leitura não implica cessão geral de direitos autorais ou autorização irrestrita para republicação comercial.",
          "Citações de trechos poderão ocorrer nas hipóteses permitidas pela legislação, observadas as condições legais pertinentes, incluindo indicação de autoria e fonte quando exigível.",
          "Fotografias, documentos, imagens e outros materiais pertencentes a terceiros permanecem sujeitos aos direitos e às condições de utilização de seus respectivos titulares.",
          "A Banca Paulista procurará identificar os créditos e as licenças aplicáveis aos materiais utilizados, especialmente quando sua reprodução exigir atribuição.",
          "Pedidos relacionados à titularidade ou à utilização de materiais poderão ser encaminhados ao canal editorial indicado pelo portal, quando disponibilizado.",
        ],
      },
      {
        titulo: "13. Uso adequado do portal",
        paragrafos: [
          "O visitante deverá utilizar o site de maneira compatível com a legislação brasileira, os direitos de terceiros e o funcionamento regular da plataforma.",
          "Não é permitido utilizar os serviços do portal para tentar comprometer sua segurança, explorar vulnerabilidades sem autorização, transmitir códigos maliciosos, interferir indevidamente em sua infraestrutura ou realizar outras condutas ilícitas.",
          "A utilização automatizada de conteúdo deverá respeitar as condições de acesso, os direitos aplicáveis e as limitações técnicas legitimamente estabelecidas, sem prejuízo das atividades lícitas de indexação, pesquisa e acesso à informação.",
          "A Banca Paulista poderá adotar medidas técnicas proporcionais para proteger a disponibilidade, a integridade e a segurança de seus serviços.",
          "Nenhuma disposição destes Termos deverá ser interpretada como proibição genérica de direitos legalmente assegurados, incluindo acesso legítimo à informação, citação e outras utilizações permitidas em lei.",
        ],
      },
      {
        titulo: "14. Disponibilidade, funcionamento e limitações técnicas",
        paragrafos: [
          "A Banca Paulista procura manter seus conteúdos acessíveis, mas a disponibilidade do site pode ser afetada por manutenção, atualizações, falhas de infraestrutura, incidentes de segurança ou fatores externos.",
          "O portal poderá modificar sua arquitetura, reorganizar páginas, substituir tecnologias ou descontinuar funcionalidades, respeitados os direitos aplicáveis.",
          "Não há garantia de funcionamento ininterrupto, disponibilidade permanente de conteúdos de terceiros ou ausência absoluta de erros técnicos.",
          "A responsabilidade por eventuais danos decorrentes da utilização do portal será apreciada conforme a legislação aplicável, as circunstâncias concretas e os direitos das partes envolvidas.",
          "As disposições destes Termos não excluem nem limitam responsabilidades que não possam ser afastadas legalmente.",
        ],
      },
      {
        titulo: "15. Privacidade e proteção de dados pessoais",
        paragrafos: [
          "A utilização do portal pode envolver operações técnicas necessárias ao funcionamento e à segurança do site, além de outras atividades de tratamento de dados que venham a ser devidamente identificadas.",
          "As informações sobre tratamento de dados pessoais, direitos dos titulares, cookies, fornecedores tecnológicos e medidas de proteção estão reunidas na Política de Privacidade da Banca Paulista.",
          "Essa política constitui documento próprio, complementar aos presentes Termos de Uso.",
          "A consulta a informações jurídicas ou institucionais não exige que o visitante envie relatos de casos, documentos processuais ou dados pessoais sensíveis.",
          "O canal editorial não deve ser utilizado como meio de encaminhamento de situações jurídicas urgentes ou documentação confidencial sem orientação específica e adequada.",
        ],
        links: [{ rotulo: "Política de Privacidade e Cookies", href: "/privacidade" }],
      },
      {
        titulo: "16. Alterações destes Termos",
        paragrafos: [
          "Os presentes Termos de Uso, Aviso Legal e Política Editorial poderão ser atualizados para refletir mudanças na legislação, na estrutura institucional do portal, em suas funcionalidades ou nos procedimentos editoriais adotados.",
          "A versão disponibilizada nesta página deverá identificar sua data efetiva de atualização.",
          "Alterações relevantes poderão ser acompanhadas de comunicação apropriada quando a natureza das mudanças e as circunstâncias exigirem.",
          "O acesso ao portal permanece sujeito à legislação aplicável, inclusive às garantias que não possam ser afastadas por condições unilateralmente estabelecidas.",
        ],
      },
      {
        titulo: "17. Legislação aplicável",
        paragrafos: [
          "A atuação editorial e digital da Banca Paulista observa o ordenamento jurídico brasileiro, conforme as normas pertinentes a cada atividade.",
          "Entre os principais referenciais legais relacionados à natureza do portal encontram-se:",
        ],
        lista: [
          "Constituição Federal de 1988, especialmente quanto à liberdade de expressão, ao acesso à informação e à proteção de direitos fundamentais.",
          "Lei nº 9.610/1998, relativa aos direitos autorais.",
          "Lei nº 12.965/2014, conhecida como Marco Civil da Internet.",
          "Lei nº 13.709/2018, Lei Geral de Proteção de Dados Pessoais (LGPD).",
          "Legislação civil, consumerista e demais normas aplicáveis conforme a natureza das relações estabelecidas.",
        ],
        complemento: [
          "A referência a esses diplomas não significa que todas as suas disposições sejam aplicáveis indistintamente a qualquer utilização do portal.",
          "Eventuais controvérsias serão examinadas conforme as regras legais de competência e jurisdição, preservados os direitos assegurados pela legislação brasileira.",
        ],
      },
      {
        titulo: "18. Contato editorial e institucional",
        paragrafos: [
          "Questões relacionadas à correção de conteúdo, autoria, utilização de materiais, esclarecimentos institucionais e demais assuntos editoriais poderão ser dirigidas à Banca Paulista pelos canais de contato oficialmente disponibilizados no site.",
          "O canal de contato editorial não constitui serviço de atendimento jurídico, representação profissional ou encaminhamento de causas.",
          "Solicitações relacionadas a dados pessoais deverão observar também as informações e os canais previstos na Política de Privacidade.",
          "Enquanto um canal de contato específico não estiver operacional, o portal não deverá apresentar endereços eletrônicos, formulários ou meios de atendimento fictícios.",
        ],
        links: [{ rotulo: "Contato editorial", href: "/contato" }],
      },
    ],
    atualizadoEm: "15 de outubro de 2026",
    notaFinal: [
      "Banca Paulista",
      "Informação jurídica, institucional e territorial.",
      "Portal editorial independente, sem vínculo institucional com os órgãos públicos apresentados.",
    ],
  },
  {
    id: "pagina-sobre",
    slug: "sobre",
    titulo: "Sobre a Banca Paulista",
    subtitulo: "Informação editorial e contexto territorial sobre defesa criminal em São Paulo.",
    seo: {
      title: "Sobre a Banca Paulista | Banca Paulista",
      description:
        "Informação editorial e contexto territorial sobre defesa criminal em São Paulo.",
      canonicalPath: "/sobre",
    },
    blocos: [
      {
        titulo: "Nossa proposta",
        paragrafos: [
          editorialIdentity.description,
          editorialIdentity.disclaimer,
          "O projeto é administrado por um profissional de tecnologia e SEO, não advogado. Na fase atual, não constitui escritório ou sociedade de advogados e não oferece representação jurídica.",
        ],
      },
      {
        titulo: "São Paulo como referência",
        paragrafos: [
          "As páginas são organizadas em Centro, Zona Norte, Zona Leste, Zona Sul e Zona Oeste. A cobertura editorial cresce de forma gradual, preservando contexto local e links entre unidades próximas.",
          "Bairros e zonas ajudam a navegar pelo conteúdo; não definem circunscrição policial, sede física ou disponibilidade de profissional.",
        ],
      },
      {
        titulo: "Independência e responsabilidade editorial",
        paragrafos: [
          "O portal não possui vínculo com delegacias, Polícia Civil, tribunais ou órgãos públicos. Informações operacionais devem ser confirmadas em fontes oficiais.",
          "Publicações informativas não são pareceres nem orientação individual. Textos assinados serão atribuídos somente a colaboradores identificados, com autorização. Materiais herdados cuja autoria ou autorização ainda não foi confirmada permanecem fora de publicação.",
        ],
      },
      {
        titulo: "Participação profissional futura",
        paragrafos: [
          "Profissionais poderão ser apresentados após confirmação de identidade, inscrição profissional, consentimento e avaliação do modelo de participação. Não há profissionais participantes publicados no momento.",
          "Eventual assistência e contratação deverão ocorrer diretamente com o profissional identificado, sem confundir contato editorial com consulta jurídica.",
        ],
      },
    ],
  },
  {
    id: "pagina-profissionais",
    slug: "profissionais",
    titulo: "Pessoas e profissionais",
    subtitulo:
      "Diretório editorial de representantes institucionais e espaço para profissionais independentes verificados.",
    seo: {
      title: "Pessoas e profissionais | Banca Paulista",
      description:
        "Diretório editorial de pessoas ligadas às instituições de Justiça e espaço separado para profissionais independentes verificados.",
      canonicalPath: "/profissionais",
    },
    blocos: [
      {
        titulo: "Nenhum profissional publicado no momento",
        paragrafos: [
          "A Banca Paulista está em fase editorial. Ainda não há advogados participantes publicados em nenhuma das cinco zonas de São Paulo.",
          "Não há agenda de consultas, encaminhamento de casos ou disponibilidade de plantão oferecida pelo portal.",
        ],
      },
      {
        titulo: "Identificação e transparência",
        paragrafos: [
          "Quando houver participantes, seus perfis apresentarão nome, inscrição na OAB, regiões declaradas e canais próprios de contato, com consentimento.",
          "A presença em uma região não significará filial, exclusividade territorial ou garantia de disponibilidade. A contratação e a orientação individual serão tratadas diretamente com cada profissional.",
        ],
      },
      {
        titulo: "Participação no projeto",
        paragrafos: [
          "O canal de contato institucional será divulgado após sua confirmação. Condições de participação e qualquer modelo comercial dependem de avaliação jurídica e ética antes de implantação. Não há filiação, anúncio pago ou plano de assinatura aberto nesta fase.",
        ],
      },
    ],
  },
  {
    id: "pagina-plantao-criminal",
    slug: "plantao-criminal",
    titulo: "Plantão criminal: informação e contexto",
    subtitulo: "Entenda a diferença entre assistência jurídica urgente e plantão judiciário.",
    seo: {
      title: "Plantão criminal: informação e contexto | Banca Paulista",
      description: "Entenda a diferença entre assistência jurídica urgente e plantão judiciário.",
      canonicalPath: "/plantao-criminal",
    },
    blocos: [
      {
        titulo: "O portal não oferece atendimento 24h",
        paragrafos: [
          "Esta é uma página informativa. Não há profissionais participantes publicados nem serviço de plantão jurídico disponível pela Banca Paulista. Não envie relatos de casos, documentos ou pedidos urgentes ao contato editorial.",
        ],
      },
      {
        titulo: "Assistência criminal em situações urgentes",
        paragrafos: [
          "Expressões como “plantão criminal 24h” descrevem, quando efetivamente oferecida, a disponibilidade de assistência de profissional habilitado. O atendimento depende de contato direto, confirmação de disponibilidade e análise da situação.",
          "Prisão em flagrante, intimação, busca e apreensão e medidas judiciais são situações distintas. A leitura de conteúdo público não substitui orientação individual de advogado ou da Defensoria Pública.",
        ],
      },
      {
        titulo: "Plantão judiciário criminal",
        paragrafos: [
          "O plantão judiciário pertence ao Poder Judiciário e aprecia determinadas demandas urgentes conforme as regras aplicáveis. Não é sinônimo de serviço privado de advocacia ou de atendimento do portal.",
          "Consulte o Tribunal de Justiça de São Paulo em seu canal oficial para informações atuais sobre funcionamento e competência do plantão.",
        ],
      },
      {
        titulo: "Em uma urgência real",
        paragrafos: [
          "Não aguarde retorno de um canal editorial. Procure advogado habilitado ou a Defensoria Pública pelos seus canais oficiais. Se houver risco imediato à integridade física, utilize os serviços públicos de emergência adequados à situação.",
        ],
      },
    ],
  },
  {
    id: "pagina-contato",
    slug: "contato",
    titulo: "Contato editorial e institucional",
    subtitulo: "Publicações, correções de conteúdo e participação no projeto.",
    seo: {
      title: "Contato editorial e institucional | Banca Paulista",
      description: "Publicações, correções de conteúdo e participação no projeto.",
      canonicalPath: "/contato",
    },
    blocos: [
      {
        titulo: "Canal editorial em preparação",
        paragrafos: [
          "O e-mail e o telefone institucionais serão publicados após confirmação pelo responsável do portal. Neste momento, não há formulário de envio nem canal de atendimento ativo.",
        ],
      },
      {
        titulo: "Publicações e correções",
        paragrafos: [
          "O contato editorial será destinado a sugestões de pauta, correções de informações territoriais, propostas de artigos e questões sobre autoria ou autorização de publicação.",
          "Não envie documentos de processos, relatos identificáveis de ocorrências, dados sensíveis, senhas ou informações de terceiros.",
        ],
      },
      {
        titulo: "Participação profissional e propostas comerciais",
        paragrafos: [
          "Interesse em participação profissional será tratado separadamente de pedidos de assistência jurídica. Propostas comerciais ou de terceiros estarão sujeitas à análise de compatibilidade editorial e jurídica; não há anúncios ou filiação pagos disponíveis nesta fase.",
        ],
      },
      {
        titulo: "Não é um canal jurídico",
        paragrafos: [
          "A Banca Paulista não recebe casos, não realiza consultas e não oferece atendimento urgente ou 24 horas. A futura contratação de um advogado deverá ocorrer diretamente com o profissional identificado.",
        ],
      },
    ],
  },
  politicaPrivacidade,
  {
    id: "pagina-politica-de-privacidade",
    slug: "politica-de-privacidade",
    titulo: "Política de privacidade",
    subtitulo: "Informações sobre navegação e tratamento de dados na fase editorial.",
    seo: {
      title: "Política de privacidade | Banca Paulista",
      description: "Informações sobre navegação e tratamento de dados na fase editorial.",
      canonicalPath: "/politica-de-privacidade",
    },
    blocos: [
      {
        titulo: "Escopo desta política",
        paragrafos: [
          "Esta política descreve a fase editorial atual da Banca Paulista. O portal publica informações territoriais e artigos e não possui cadastro de usuários, formulário de casos ou serviço de consulta jurídica.",
        ],
      },
      {
        titulo: "Dados de navegação",
        paragrafos: [
          "O acesso ao site envolve requisições à infraestrutura de hospedagem, que podem conter endereço IP, data, navegador e página solicitada, conforme as práticas do provedor. Esses dados técnicos podem ser utilizados para entrega, segurança e diagnóstico do serviço.",
          "O carregamento das fontes tipográficas utiliza o serviço Google Fonts e pode transmitir dados técnicos de conexão a esse provedor. Não há envio de formulário jurídico ou armazenamento de relatos de casos pelo portal.",
        ],
      },
      {
        titulo: "Contato e informações sensíveis",
        paragrafos: [
          "Ainda não há canal editorial ativo para recebimento de mensagens. Não envie dados sensíveis, documentos processuais ou informações de terceiros por canais não confirmados. O antigo canal de triagem foi desativado.",
        ],
      },
      {
        titulo: "Responsável e direitos",
        paragrafos: [
          "A identificação completa do operador e o canal para solicitações de acesso, correção ou exclusão de dados serão publicados após confirmação. Esta informação permanece pendente e deverá estar completa antes de abrir canais de coleta de dados pessoais.",
          "Quando novas ferramentas, contatos ou perfis forem incorporados, esta política deverá ser atualizada para refletir finalidades, responsabilidades e tratamento de dados.",
        ],
      },
    ],
  },
];
