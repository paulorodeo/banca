import type { AreaAtuacao, SituacaoJuridica } from "../types";

export const areas: AreaAtuacao[] = [
  {
    id: "area-defesa-criminal",
    slug: "defesa-criminal-estrategica",
    titulo: "Defesa criminal estratégica",
    resumo:
      "Informações sobre investigações, inquéritos e ações penais e sobre o papel da defesa profissional.",
    descricao:
      "A defesa criminal exige leitura precisa do momento processual. A assistência profissional pode envolver análise dos elementos disponíveis, definição de estratégia e acompanhamento das etapas do procedimento, com comunicação clara sobre alternativas e riscos.",
    topicos: [
      "Acompanhamento em inquéritos policiais",
      "Defesa em ações penais",
      "Orientação em depoimentos e interrogatórios",
      "Análise de medidas cautelares",
    ],
    destaque: true,
  },
  {
    id: "area-crimes-empresariais",
    slug: "crimes-empresariais-e-patrimoniais",
    titulo: "Crimes empresariais e patrimoniais",
    resumo:
      "Situações que envolvem atividade empresarial, gestão, sócios e patrimônio, com exposição reputacional relevante.",
    descricao:
      "Investigações relacionadas à atividade empresarial demandam coordenação entre a esfera penal, cível e societária. A análise profissional considera a continuidade da operação, a proteção patrimonial e a preservação da imagem das pessoas envolvidas.",
    topicos: [
      "Apurações internas e responsabilidade de gestores",
      "Crimes contra o patrimônio e a ordem econômica",
      "Interface entre esfera penal e societária",
      "Coordenação com áreas contábil e financeira",
    ],
    destaque: true,
  },
  {
    id: "area-medidas-urgentes",
    slug: "medidas-urgentes-e-investigacoes",
    titulo: "Medidas urgentes e investigações",
    resumo:
      "Conteúdo sobre prisões em flagrante, buscas e apreensões e prazos em andamento.",
    descricao:
      "Momentos de urgência exigem resposta ordenada. A avaliação profissional começa pela verificação do que efetivamente ocorreu, pelo levantamento de documentos e pela adoção das medidas processuais cabíveis dentro dos prazos aplicáveis.",
    topicos: [
      "Prisão em flagrante e audiência de custódia",
      "Busca e apreensão",
      "Medidas cautelares e habeas corpus",
      "Acompanhamento de diligências",
    ],
    destaque: true,
  },
  {
    id: "area-responsabilidade-civil",
    slug: "responsabilidade-civil-e-indenizacoes",
    titulo: "Responsabilidade civil e indenizações",
    resumo:
      "Discussões sobre danos materiais, morais e reparação, na condição de autor ou de defesa.",
    descricao:
      "A análise de responsabilidade civil parte da documentação disponível e da avaliação técnica de nexo, extensão do dano e viabilidade da pretensão, sem promessa de resultado.",
    topicos: [
      "Danos materiais e morais",
      "Responsabilidade contratual e extracontratual",
      "Defesa em ações indenizatórias",
      "Avaliação prévia de viabilidade",
    ],
  },
  {
    id: "area-contratos",
    slug: "contratos-patrimonio-e-negocios",
    titulo: "Contratos, patrimônio e negócios",
    resumo:
      "Estruturação, revisão e discussão de contratos, com atenção a risco jurídico e proteção patrimonial.",
    descricao:
      "Contratos bem estruturados reduzem litígio futuro. A assistência profissional pode abranger elaboração, revisão e discussão de instrumentos, além da análise de garantias e de riscos associados a operações patrimoniais.",
    topicos: [
      "Elaboração e revisão contratual",
      "Conflitos societários",
      "Operações patrimoniais e garantias",
      "Prevenção de litígios",
    ],
  },
  {
    id: "area-familia-sucessoes",
    slug: "familia-sucessoes-e-protecao-patrimonial",
    titulo: "Família, sucessões e proteção patrimonial",
    resumo:
      "Informações sobre planejamento sucessório, inventários e questões familiares.",
    descricao:
      "Questões familiares e sucessórias envolvem patrimônio e relações pessoais. A condução privilegia soluções ordenadas, com atenção à privacidade das partes e à preservação do patrimônio familiar.",
    topicos: [
      "Inventários e partilhas",
      "Planejamento sucessório",
      "Regimes de bens e acordos familiares",
      "Proteção patrimonial",
    ],
  },
];

export const situacoes: SituacaoJuridica[] = [
  {
    id: "sit-intimacao",
    slug: "intimacao",
    titulo: "Intimação",
    descricao:
      "Comunicação oficial para comparecimento ou manifestação, com prazos que exigem leitura técnica antes de qualquer resposta.",
  },
  {
    id: "sit-inquerito",
    slug: "inquerito",
    titulo: "Inquérito",
    descricao:
      "Fase de apuração em que a definição da estratégia e o acompanhamento das diligências têm impacto direto no desfecho.",
  },
  {
    id: "sit-busca-apreensao",
    slug: "busca-e-apreensao",
    titulo: "Busca e apreensão",
    descricao:
      "Medida que atinge documentos, dispositivos e patrimônio, exigindo verificação imediata dos limites da decisão judicial.",
  },
  {
    id: "sit-flagrante",
    slug: "prisao-em-flagrante",
    titulo: "Prisão em flagrante",
    descricao:
      "Cenário de urgência com etapas próprias, incluindo a audiência de custódia e a análise de medidas cabíveis.",
  },
  {
    id: "sit-investigacao-empresarial",
    slug: "investigacao-empresarial",
    titulo: "Investigação empresarial",
    descricao:
      "Apuração que envolve a atividade da empresa, seus gestores e a coordenação entre esferas penal, cível e societária.",
  },
  {
    id: "sit-conflito-societario",
    slug: "conflito-societario",
    titulo: "Conflito societário",
    descricao:
      "Divergências entre sócios que afetam governança, participação e continuidade dos negócios.",
  },
  {
    id: "sit-bloqueio-patrimonial",
    slug: "bloqueio-patrimonial",
    titulo: "Bloqueio patrimonial",
    descricao:
      "Constrição de bens e valores, com necessidade de análise da origem da medida e das providências cabíveis.",
  },
  {
    id: "sit-sucessao",
    slug: "sucessao-e-patrimonio",
    titulo: "Sucessão e patrimônio",
    descricao:
      "Organização patrimonial e sucessória, com atenção à privacidade e à redução de litígio entre familiares.",
  },
];