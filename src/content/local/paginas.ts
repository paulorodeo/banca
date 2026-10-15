import type { PaginaInstitucional } from "../types";
import { editorialIdentity } from "./settings";

export const paginas: PaginaInstitucional[] = [
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
    subtitulo: "Diretório editorial de representantes institucionais e espaço para profissionais independentes verificados.",
    seo: {
      title: "Pessoas e profissionais | Banca Paulista",
      description: "Diretório editorial de pessoas ligadas às instituições de Justiça e espaço separado para profissionais independentes verificados.",
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
