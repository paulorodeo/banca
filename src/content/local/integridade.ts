import type { PaginaInstitucional } from "../types";

export const politicaIntegridade: PaginaInstitucional = {
  id: "pagina-integridade-e-etica",
  slug: "integridade-e-etica",
  titulo: "Política de Integridade, Ética e Independência Editorial",
  subtitulo:
    "Independência na informação. Transparência nas relações. Responsabilidade com o público.",
  seo: {
    title: "Integridade, Ética e Independência Editorial | Banca Paulista",
    description:
      "Conheça os princípios de integridade e independência da Banca Paulista, seus critérios editoriais, transparência, publicidade e respeito às normas da OAB.",
    canonicalPath: "/integridade-e-etica",
  },
  introducao: [
    "A Banca Paulista é um portal editorial independente dedicado à organização, produção e divulgação de informações jurídicas, institucionais e territoriais, com atenção especial à cidade de São Paulo, seus bairros, regiões e serviços públicos.",
    "A credibilidade de um projeto editorial depende da qualidade das informações e da transparência sobre sua natureza, seus interesses, suas relações institucionais e os critérios usados na produção e apresentação dos conteúdos.",
    "Esta Política de Integridade, Ética e Independência Editorial reúne os princípios que orientam a atuação da Banca Paulista e os compromissos relacionados à responsabilidade editorial, à identificação de profissionais, à publicidade, à prevenção de conflitos de interesses e ao respeito às normas aplicáveis.",
    "O objetivo é explicar ao visitante o funcionamento do portal e os limites de suas relações com instituições públicas, profissionais independentes, empresas, anunciantes e colaboradores.",
  ],
  indice: [
    ["identidade", "1. Identidade e natureza institucional"],
    ["orgao-publico", "2. Independência de órgãos públicos"],
    ["editorial", "3. Independência editorial"],
    ["fontes", "4. Compromisso com informações verificáveis"],
    ["territorios", "5. Integridade dos guias territoriais e institucionais"],
    ["profissoes", "6. Respeito às profissões regulamentadas"],
    ["publicidade-oab", "7. Conformidade com as normas de publicidade da OAB"],
    ["advogados", "8. Critérios para apresentação de advogados independentes"],
    ["autonomia", "9. Autonomia e responsabilidade dos profissionais"],
    ["intermediacao", "10. Vedação à intermediação indevida de causas e clientela"],
    ["comercial", "11. Publicidade e participação comercial"],
    ["diretorios", "12. Neutralidade dos diretórios e critérios de apresentação"],
    ["conflitos", "13. Conflitos de interesses"],
    ["patrocinios", "14. Patrocínios, apoiadores e publicidade institucional"],
    ["autoria", "15. Transparência sobre autoria e colaboração"],
    ["privacidade", "16. Proteção de dados e respeito aos direitos individuais"],
    ["manifestacoes", "17. Correções, esclarecimentos e manifestações"],
    ["etica", "18. Relatos de irregularidades e questões éticas"],
    ["evolucao", "19. Compromisso com a evolução responsável"],
    ["referencias", "20. Referências normativas e institucionais"],
    ["documentos", "21. Relação com os demais documentos institucionais"],
    ["contato", "22. Contato institucional e atualização da política"],
  ].map(([id, rotulo]) => ({ id: id!, rotulo: rotulo! })),
  blocos: [
    {
      titulo: "1. Identidade e natureza institucional",
      paragrafos: [
        "A Banca Paulista é uma iniciativa editorial independente de informação jurídica, institucional e territorial. O portal não integra a administração pública, não é órgão do Poder Judiciário, não constitui sociedade de advocacia e não se apresenta como escritório de advocacia.",
        "A Banca Paulista não exerce a advocacia, não representa judicialmente visitantes, não emite pareceres jurídicos individualizados e não presta atendimento jurídico direto. A denominação identifica o projeto editorial e sua proposta de organização da informação.",
        "O nome, o domínio eletrônico, a identidade visual e a linguagem institucional não devem ser interpretados como declaração de credenciamento, reconhecimento oficial ou vinculação a entidade pública ou profissional. A utilização do domínio .org não significa, por si só, que o projeto possua natureza associativa, beneficente, pública ou sem fins lucrativos.",
        "A identificação do responsável pela operação do portal deverá corresponder à sua organização jurídica e administrativa efetiva.",
      ],
    },
    {
      titulo: "2. Independência de órgãos públicos",
      paragrafos: [
        "A Banca Paulista reúne informações sobre delegacias, fóruns, tribunais, cartórios, serviços municipais e outras instituições de interesse público. A apresentação desses conteúdos tem finalidade editorial e informativa.",
        "O portal não mantém vínculo oficial com a Polícia Civil do Estado de São Paulo, o Tribunal de Justiça, a Defensoria Pública, a Prefeitura ou outras instituições apenas por publicar informações relacionadas a elas. A inclusão de uma instituição em um guia não representa autorização para atuar em seu nome, parceria, credenciamento ou reconhecimento oficial.",
        "Nomes, números, siglas e denominações de órgãos públicos são utilizados para identificação e contextualização. A Banca Paulista não deve empregar símbolos oficiais, brasões, uniformes, insígnias ou outros elementos de maneira que produza falsa impressão de autoridade pública.",
        "Quando houver referência a endereço, competência, horário ou serviço institucional, o visitante deverá considerar as informações oficiais disponibilizadas pelo órgão responsável. Eventuais vínculos formalmente existentes somente poderão ser divulgados quando forem verdadeiros, documentados e descritos com precisão.",
      ],
    },
    {
      titulo: "3. Independência editorial",
      paragrafos: [
        "A orientação editorial busca preservar a autonomia na escolha, organização, contextualização e atualização dos assuntos publicados. A produção de conteúdo considera relevância informativa, qualidade das fontes e utilidade para o visitante.",
        "A existência de interesse econômico, proposta comercial ou relacionamento com terceiro não justifica falsificar informações, ocultar conflitos relevantes ou apresentar publicidade como publicação editorial independente.",
        "A Banca Paulista poderá publicar análises, entrevistas, comentários e artigos de opinião. Quando houver interpretação pessoal, posição opinativa ou controvérsia jurídica, o conteúdo deverá permitir que o leitor identifique essa característica e a distinga de informações documentais e fatos comprovados.",
        "Independência editorial não significa ausência de responsabilidade por publicações. Correções, contextualizações e revisões deverão ser consideradas quando houver fundamento suficiente, observados a legislação, os direitos envolvidos e o interesse público.",
      ],
    },
    {
      titulo: "4. Compromisso com informações verificáveis",
      paragrafos: [
        "A credibilidade editorial depende da utilização responsável das fontes. A produção de conteúdo procura identificar legislação, documentos públicos, informações institucionais, publicações oficiais e outras referências pertinentes.",
        "Informações sujeitas a alterações, como competências administrativas, endereços, serviços, procedimentos e normas jurídicas, poderão exigir atualização ou confirmação na fonte original. O portal não deverá inventar dados para completar cadastros, diretórios ou artigos.",
        "Também não deverá atribuir declarações, títulos profissionais, cargos, qualificações ou relações institucionais a pessoas sem fundamento verificável.",
        "Informações de terceiros poderão ser reproduzidas, citadas ou contextualizadas observando direitos autorais, condições de licença, proteção de dados pessoais e demais restrições aplicáveis. Quando necessário, informações históricas devem receber contexto temporal apropriado.",
      ],
    },
    {
      titulo: "5. Integridade dos guias territoriais e institucionais",
      paragrafos: [
        "A Banca Paulista organiza páginas por regiões, bairros e instituições para facilitar a localização de informações. Na cidade de São Paulo, os conteúdos são distribuídos editorialmente entre Centro, Zona Norte, Zona Leste, Zona Sul e Zona Oeste.",
        "Essa estrutura não substitui as divisões administrativas oficiais, circunscrições policiais, competências jurisdicionais ou critérios de atendimento dos órgãos públicos. A presença de uma delegacia em página de bairro não significa que ela seja responsável por todas as ocorrências daquela localidade. A proximidade entre fórum e endereço também não define, isoladamente, competência judicial.",
        "Os guias devem distinguir referências geográficas de atribuições oficialmente estabelecidas. Quando dados operacionais não estiverem suficientemente confirmados, poderão ser omitidos ou contextualizados, evitando apresentá-los como fatos verificados.",
      ],
    },
    {
      titulo: "6. Respeito às profissões regulamentadas",
      paragrafos: [
        "Atividades profissionais regulamentadas estão sujeitas a normas próprias de exercício, publicidade, responsabilidade e ética. Divulgar informações sobre uma profissão não autoriza o portal a prestar serviços privativos de seus integrantes.",
        "A advocacia é atividade profissional regulamentada, sujeita ao Estatuto da Advocacia e da OAB, ao Código de Ética e Disciplina e às disposições pertinentes editadas pelo Conselho Federal da Ordem dos Advogados do Brasil.",
        "A Banca Paulista não substitui a atuação de advogados habilitados. O portal pode divulgar informações gerais sobre direitos, procedimentos e instituições, mas não deve apresentar recursos tecnológicos como substitutos de avaliação jurídica individualizada por profissional competente.",
        "A publicação de conteúdo jurídico não caracteriza, por si só, vínculo profissional entre o leitor e eventual advogado autor ou participante.",
      ],
    },
    {
      titulo: "7. Conformidade com as normas de publicidade da OAB",
      paragrafos: [
        "A Banca Paulista considera os princípios do Código de Ética e Disciplina da OAB e do Provimento nº 205/2021, ou das normas que vierem a alterá-lo ou substituí-lo. A publicidade profissional deve observar as regras aplicáveis, incluindo caráter informativo, discrição, sobriedade e prevenção de captação indevida de clientela ou mercantilização.",
        "A condição de portal editorial independente não dispensa a análise dessas regras quando houver divulgação de profissionais da advocacia, conteúdo publicitário ou mecanismos de contato ligados à contratação de serviços jurídicos.",
        "A Banca Paulista não se apresenta como entidade certificada, fiscalizada ou aprovada pela OAB. Esta política não constitui parecer de conformidade regulatória sobre funcionalidades comerciais ainda não implantadas.",
        "A apresentação de advogados, publicidade profissional e formas de participação comercial devem ser avaliadas conforme as normas vigentes e sua aplicação concreta. As regras podem mudar; referências normativas e procedimentos de participação devem ser reexaminados periodicamente.",
      ],
    },
    {
      titulo: "8. Critérios para apresentação de advogados independentes",
      paragrafos: [
        "A Banca Paulista poderá desenvolver um diretório informativo de profissionais independentes se seu funcionamento for compatível com as normas jurídicas e éticas aplicáveis. Na fase atual, essa previsão não significa que exista cadastro público de advogados participantes, contratação aberta ou serviço ativo de indicação profissional.",
        "Uma eventual publicação de perfil deverá considerar:",
      ],
      lista: [
        "Identificação verdadeira do profissional, nome e número de inscrição na OAB com a respectiva seccional, verificados em fonte oficial apropriada.",
        "Apresentação fiel das informações curriculares e profissionais e das áreas de atuação declaradas, sem atribuir especialização formal sem fundamento.",
        "Autorização ou outra hipótese jurídica adequada para utilizar dados e fotografia, identificação correta dos canais próprios de contato e transparência sobre eventual natureza comercial.",
        "Possibilidade de corrigir e atualizar informações e compatibilidade do formato de apresentação com a regulamentação profissional.",
      ],
      complemento: [
        "Confirmar uma inscrição na OAB não representa avaliação de qualidade, recomendação pessoal, reconhecimento de especialidade ou garantia de disponibilidade. O portal não deverá usar expressões como advogado oficial, advogado credenciado pelo portal ou representante exclusivo de delegacia sem fundamento jurídico e factual adequado, nem atribuir vínculo inexistente com órgão público.",
      ],
    },
    {
      titulo: "9. Autonomia e responsabilidade dos profissionais",
      paragrafos: [
        "Profissionais eventualmente apresentados no portal exercerão suas atividades de maneira independente. A inclusão de perfil não cria vínculo empregatício, associação profissional, sociedade de advocacia ou representação institucional entre a Banca Paulista e o profissional.",
        "Informações sobre serviços profissionais são de responsabilidade dos respectivos prestadores, sem prejuízo das responsabilidades legais que possam caber ao portal pelas atividades efetivamente realizadas.",
        "A Banca Paulista não deverá prometer resultados processuais, disponibilidade de atendimento, êxito em demandas ou condições que dependam da atuação de profissional independente. Eventual relação entre visitante e advogado deve ser estabelecida diretamente entre as partes, conforme as exigências legais e profissionais aplicáveis.",
        "O portal não pretende substituir a liberdade de escolha do profissional pelo interessado.",
      ],
    },
    {
      titulo: "10. Vedação à intermediação indevida de causas e clientela",
      paragrafos: [
        "A Banca Paulista não se apresenta como central de distribuição de causas, agência de indicação de advogados ou serviço de contratação de representação jurídica. O projeto não inclui a venda de contatos de pessoas envolvidas em processos, ocorrências policiais ou outras situações jurídicas.",
        "Também não constitui finalidade do projeto receber relatos identificáveis de casos para distribuí-los comercialmente a escritórios ou advogados. A Banca Paulista não adota como modelo autorizado comissões por causas encaminhadas, remuneração proporcional a honorários ou venda de oportunidades de contratação jurídica.",
        "Mecanismos digitais que aproximem visitantes de profissionais devem ser avaliados considerando o risco de captação indevida, intermediação irregular e mercantilização dos serviços advocatícios. Usar tecnologia ou plataforma independente não afasta as regras profissionais.",
        "Funcionalidades que possam caracterizar intermediação de clientes ou escritório virtual não devem ser ativadas sem análise jurídica específica e fundamento de compatibilidade normativa. O Conselho Federal da OAB examinou uma proposta concreta de plataforma de intermediação em 2025; essa referência não constitui avaliação do portal ou de funcionalidades ainda inexistentes.",
      ],
    },
    {
      titulo: "11. Publicidade e participação comercial",
      paragrafos: [
        "A manutenção de um portal editorial pode envolver publicidade institucional, patrocínios e outras fontes legítimas de receita. Atividades comerciais futuras deverão ser compatíveis com a natureza do projeto e com as exigências legais pertinentes.",
        "Conteúdo comercial não deve ser disfarçado de informação pública oficial ou recomendação editorial independente. A identificação de publicidade, patrocínio ou conteúdo pago deve permitir ao visitante compreender sua natureza.",
        "Para profissionais regulamentados, a viabilidade de anúncios, perfis patrocinados, taxas de participação, assinaturas ou outros mecanismos depende de avaliação específica. Cobrar por exposição não torna automaticamente legítimo um formato de publicidade profissional, e domínio institucional ou separação formal não afastam, por si sós, eventual captação indevida.",
        "Nenhuma modalidade comercial futura é considerada aprovada apenas por estar descrita nesta política.",
      ],
    },
    {
      titulo: "12. Neutralidade dos diretórios e critérios de apresentação",
      paragrafos: [
        "Os diretórios deverão priorizar organização clara e informações relevantes para a navegação. Órgãos públicos poderão ser apresentados conforme critérios territoriais, categorias institucionais, denominação, localização ou outras informações verificáveis.",
        "A eventual apresentação de profissionais independentes deverá usar critérios transparentes e compatíveis com as normas aplicáveis. Ordem alfabética ou apresentação rotativa podem servir à organização visual, desde que não impliquem falsa recomendação ou prática incompatível com a regulamentação.",
        "Mecanismos automáticos não garantem, isoladamente, neutralidade, imparcialidade ou conformidade jurídica. A Banca Paulista não deverá apresentar profissionais como melhores, mais eficientes ou oficialmente recomendados sem fundamento legítimo, objetivo e compatível com as regras profissionais.",
        "Relações comerciais não poderão produzir classificações falsas, rankings enganosos ou alegações de superioridade sem sustentação.",
      ],
    },
    {
      titulo: "13. Conflitos de interesses",
      paragrafos: [
        "Conflitos de interesses podem surgir quando relações comerciais, pessoais, profissionais ou institucionais têm potencial para comprometer a independência de uma publicação. Essas situações devem ser identificadas e tratadas de maneira proporcional à sua natureza.",
        "Quando houver relação relevante entre uma publicação e pessoa ou entidade diretamente interessada em seu conteúdo, essa condição deverá ser avaliada para fins de transparência. Anunciantes ou colaboradores não devem determinar a ocultação de informações relevantes, manipulação de fatos ou atribuição indevida de autoridade institucional.",
        "A participação de profissional em conteúdo técnico não deve ser apresentada como avaliação independente quando existir conflito relevante não informado. As providências poderão incluir esclarecimento da relação, identificação de conteúdo patrocinado, revisão editorial ou decisão de não publicar quando necessário.",
      ],
    },
    {
      titulo: "14. Patrocínios, apoiadores e publicidade institucional",
      paragrafos: [
        "A Banca Paulista poderá receber propostas de apoio institucional, divulgação de serviços, patrocínio de iniciativas editoriais ou campanhas de interesse público. A aceitação deverá considerar legalidade, compatibilidade temática e impacto potencial sobre a independência editorial.",
        "Patrocínios não devem ser apresentados como parcerias com autoridades públicas quando tais relações não existirem. O apoio financeiro não confere ao patrocinador o direito de modificar informações públicas, suprimir críticas fundamentadas ou determinar conclusões jurídicas de conteúdo editorial independente.",
        "Conteúdos comerciais devem ser identificados de acordo com sua natureza e com a legislação aplicável. A divulgação de serviços de advocacia está sujeita a regras específicas e não pode ser equiparada automaticamente à publicidade de atividades empresariais comuns.",
      ],
    },
    {
      titulo: "15. Transparência sobre autoria e colaboração",
      paragrafos: [
        "A Banca Paulista poderá publicar conteúdo produzido por integrantes da operação editorial, pesquisadores, jornalistas, profissionais convidados ou outros colaboradores. A identificação de autoria deverá corresponder às informações verdadeiras e disponíveis.",
        "Atribuir um texto a advogado, professor, pesquisador ou especialista exige fundamento suficiente para essa qualificação. Participação eventual não representa vínculo permanente com o portal.",
        "Entrevistas, depoimentos e declarações devem aparecer em contexto apropriado, sem atribuir frases ou posições que não tenham sido manifestadas. O uso de ferramentas de inteligência artificial como apoio não autoriza fabricar fontes, decisões, citações, credenciais ou declarações.",
        "A responsabilidade editorial deve contemplar revisão humana adequada à natureza e aos riscos da publicação.",
      ],
    },
    {
      titulo: "16. Proteção de dados e respeito aos direitos individuais",
      paragrafos: [
        "A atuação editorial deve considerar o direito à informação em conjunto com a proteção de dados pessoais, privacidade, honra, imagem e outros direitos assegurados em lei.",
        "A presença de informação em documento ou cadastro público não constitui autorização irrestrita para divulgá-la, agregá-la ou explorá-la comercialmente. Conteúdos que envolvam pessoas identificadas ou identificáveis devem considerar finalidade, contexto, necessidade e possíveis impactos.",
        "Dados sensíveis, informações de crianças e adolescentes, documentos sigilosos e conteúdos sujeitos a restrições judiciais exigem avaliação especialmente cuidadosa. Diretórios institucionais não justificam criar cadastros públicos excessivos ou desnecessários.",
        "As condições de tratamento de dados pessoais estão na Política de Privacidade e Cookies da Banca Paulista.",
      ],
      links: [{ rotulo: "Política de Privacidade e Cookies", href: "/privacidade" }],
    },
    {
      titulo: "17. Correções, esclarecimentos e manifestações",
      paragrafos: [
        "A Banca Paulista reconhece a importância de avaliar inexatidões, desatualizações e questionamentos relativos às publicações. Pessoas, instituições ou profissionais poderão apresentar solicitações fundamentadas pelos canais institucionais que estiverem efetivamente disponíveis.",
        "A análise poderá considerar documentos, origem das informações, legislação, direitos envolvidos e relevância pública. Conforme as circunstâncias, poderão ser adotadas correção, complementação, contextualização, identificação de divergência ou retirada da publicação.",
        "Solicitações de revisão não produzem automaticamente censura ou exclusão de conteúdo cuja divulgação seja juridicamente legítima. Da mesma forma, a existência de conteúdo público não impede corrigir informações comprovadamente inexatas.",
        "Direitos de resposta, retificação e demais garantias serão observados nos termos da legislação brasileira. No momento, a página de contato informa que não há formulário ou canal ativo; não se afirma que o portal receba manifestações por um meio ainda não operacional.",
      ],
      links: [{ rotulo: "Informações de contato", href: "/contato" }],
    },
    {
      titulo: "18. Relatos de irregularidades e questões éticas",
      paragrafos: [
        "Questões sobre conflitos de interesses, atribuições profissionais incorretas, uso não autorizado de imagens, publicidade enganosa ou outras irregularidades editoriais poderão ser encaminhadas pelos canais institucionais disponíveis, quando estiverem operacionais. As manifestações devem ser avaliadas conforme sua natureza e os elementos apresentados.",
        "A Banca Paulista não é órgão disciplinar, corregedoria, tribunal de ética ou autoridade fiscalizadora da advocacia. Eventuais denúncias sobre condutas profissionais sujeitas à OAB devem seguir os canais oficiais da instituição. Questões relativas a órgãos públicos também devem ser levadas às autoridades competentes quando necessário.",
        "O canal editorial não substitui instrumentos oficiais de denúncia, investigação, fiscalização ou exercício de direitos. Como não há canal operacional confirmado no projeto, esta página não cria nem anuncia um canal de denúncias.",
      ],
    },
    {
      titulo: "19. Compromisso com a evolução responsável",
      paragrafos: [
        "A Banca Paulista poderá ampliar suas atividades para novos conteúdos, instituições, municípios, diretórios profissionais e serviços informativos, incluindo plataformas territoriais, oportunidades de emprego, bases documentais e outras formas de organização da informação.",
        "A expansão deverá considerar responsabilidades jurídicas, editoriais, tecnológicas e comerciais próprias de cada atividade. Funcionalidades futuras relacionadas à publicidade profissional, dados pessoais, intermediação comercial ou serviços de terceiros dependerão das verificações necessárias antes de serem ativadas.",
        "A decisão de implementar uma tecnologia não deverá basear-se apenas em viabilidade técnica ou potencial econômico. O crescimento deve ser conciliado com transparência, respeito aos direitos dos usuários e observância das normas aplicáveis.",
      ],
    },
    {
      titulo: "20. Referências normativas e institucionais",
      paragrafos: [
        "Esta política considera, entre outros referenciais, a Constituição Federal de 1988, quanto à liberdade de expressão, informação, privacidade, honra e direitos fundamentais; a Lei nº 8.906/1994, Estatuto da Advocacia e da OAB; o Código de Ética e Disciplina da OAB; o Provimento nº 205/2021 do Conselho Federal da OAB; a Lei nº 13.709/2018, LGPD; a Lei nº 9.610/1998, Lei de Direitos Autorais; e a Lei nº 12.965/2014, Marco Civil da Internet.",
        "Na consulta realizada em 15 de outubro de 2026, o repositório normativo oficial da OAB continuava apresentando o Provimento nº 205/2021. A OAB havia divulgado a criação de grupo de trabalho para revisar as regras; isso não foi tratado como alteração normativa já publicada. A aplicação de qualquer norma a um modelo comercial concreto requer análise própria.",
        "A referência a normas da OAB não representa homologação do portal pela instituição.",
      ],
      links: [
        {
          rotulo: "Estatuto da Advocacia e da OAB, Lei nº 8.906/1994",
          href: "https://www.planalto.gov.br/ccivil_03/leis/l8906.htm",
        },
        { rotulo: "Conselho Federal da OAB", href: "https://www.oab.org.br/" },
        {
          rotulo: "Provimento nº 205/2021",
          href: "https://www.oab.org.br/leisnormas/legislacao/provimentos/205-2021",
        },
        {
          rotulo: "Código de Ética e Disciplina, Resolução nº 02/2015",
          href: "https://www.oab.org.br/leisnormas/legislacao/resolucoes/02-2015",
        },
        { rotulo: "Cadastro Nacional dos Advogados", href: "https://cna.oab.org.br/" },
        {
          rotulo: "Consulta OAB nº 49.0000.2025.001346-3/OEP",
          href: "https://www.oab.org.br/jurisprudencia/detementa/22176?search=consulta+advogado+federal&title=49-0000-2025-001346-3",
        },
        {
          rotulo: "OAB: grupo de trabalho sobre publicidade na advocacia",
          href: "https://www.oab.org.br/noticia/63140/grupo-de-trabalho-da-oab-atualizara-normas-sobre-publicidade-na-advocacia",
        },
        {
          rotulo: "Lei Geral de Proteção de Dados",
          href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
        },
      ],
    },
    {
      titulo: "21. Relação com os demais documentos institucionais",
      paragrafos: [
        "Esta Política de Integridade, Ética e Independência Editorial integra os documentos institucionais da Banca Paulista. Seus princípios são complementados pelos Termos de Uso, Aviso Legal e Política Editorial, que estabelecem condições gerais de utilização, e pela Política de Privacidade, Proteção de Dados Pessoais e Cookies, dedicada ao tratamento de informações pessoais.",
        "Os documentos devem ser interpretados de forma coerente, observando a legislação brasileira e as características efetivas dos serviços oferecidos. Novas funcionalidades poderão exigir regras operacionais específicas, sem multiplicar desnecessariamente as páginas institucionais.",
      ],
      links: [
        { rotulo: "Termos de Uso", href: "/termos-de-uso" },
        { rotulo: "Política de Privacidade e Cookies", href: "/privacidade" },
      ],
    },
    {
      titulo: "22. Contato institucional e atualização da política",
      paragrafos: [
        "Dúvidas, solicitações de esclarecimento, questionamentos editoriais e manifestações sobre os compromissos desta política poderão ser encaminhados por canais institucionais oficialmente disponibilizados pela Banca Paulista, quando houver meios efetivamente confirmados e operacionais. Não serão publicados e-mails, telefones, responsáveis ou formas de atendimento não confirmados.",
        "A página de contato atual informa que não há formulário ou canal de atendimento ativo. Por isso, esta política não promete recebimento de manifestações neste momento. A rota `/contato` contém a informação disponível sobre o estado do canal.",
        "Esta política poderá ser revista para acompanhar mudanças na estrutura do projeto, na legislação, nos serviços e nas práticas editoriais. A data exibida deve corresponder à revisão efetivamente realizada.",
        "A Banca Paulista reafirma seu compromisso com atuação editorial independente, apresentação responsável de informações e respeito aos limites jurídicos e éticos das atividades divulgadas.",
      ],
      links: [{ rotulo: "Situação do canal de contato", href: "/contato" }],
    },
  ],
  linksRelacionados: [
    { rotulo: "Termos de Uso", href: "/termos-de-uso" },
    { rotulo: "Privacidade e Cookies", href: "/privacidade" },
    { rotulo: "Sobre a Banca Paulista", href: "/sobre" },
    { rotulo: "Profissionais", href: "/profissionais" },
    { rotulo: "Contato Editorial", href: "/contato" },
  ],
  atualizadoEm: "15 de outubro de 2026",
  notaFinal: [
    "Banca Paulista. Informação jurídica, institucional e territorial.",
    "Independência na informação. Transparência nas relações. Responsabilidade com o público.",
  ],
};
