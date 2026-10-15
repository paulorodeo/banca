import type { PaginaInstitucional } from "../types";

/**
 * Minuta local de revisão. A publicação permanece bloqueada até que o
 * controlador efetivo e um canal operacional de privacidade sejam confirmados.
 */
export const politicaPrivacidade: PaginaInstitucional = {
  id: "pagina-privacidade",
  slug: "privacidade",
  titulo: "Política de Privacidade, Proteção de Dados Pessoais e Cookies",
  subtitulo: "Transparência, segurança e respeito à privacidade dos visitantes.",
  seo: {
    title: "Política de Privacidade e Cookies | Banca Paulista",
    description:
      "Conheça a Política de Privacidade da Banca Paulista: proteção de dados pessoais, LGPD, cookies, segurança, transparência e direitos dos titulares.",
    canonicalPath: "/privacidade",
  },
  introducao: [
    "A Banca Paulista é um portal editorial independente dedicado à organização e divulgação de informações jurídicas, institucionais e territoriais, com atenção especial à cidade de São Paulo, seus bairros, regiões e serviços públicos.",
    "O respeito à privacidade e à proteção dos dados pessoais integra os princípios de funcionamento do projeto.",
    "Esta Política de Privacidade apresenta informações sobre as categorias de dados que podem ser tratadas durante a utilização do portal, suas finalidades, os fundamentos jurídicos aplicáveis, a utilização de cookies e tecnologias semelhantes, o relacionamento com fornecedores tecnológicos e os direitos assegurados aos titulares de dados pessoais.",
    "A política considera a Lei nº 13.709/2018, Lei Geral de Proteção de Dados Pessoais (LGPD), o Marco Civil da Internet e as orientações da Autoridade Nacional de Proteção de Dados (ANPD). As operações descritas como possíveis não devem ser entendidas como confirmação de que ferramentas futuras estejam ativas.",
  ],
  indice: [
    ["compromisso", "1. Compromisso com a proteção de dados pessoais"],
    ["responsavel", "2. Identificação do responsável pelo tratamento"],
    ["dados", "3. Quais dados pessoais podem ser tratados"],
    ["finalidades", "4. Finalidades do tratamento de dados"],
    ["fundamentos", "5. Fundamentos legais para o tratamento"],
    ["cookies", "6. Cookies e tecnologias semelhantes"],
    ["categorias", "7. Categorias de cookies"],
    ["preferencias", "8. Gerenciamento de cookies e preferências"],
    ["infraestrutura", "9. Hospedagem, infraestrutura e serviços tecnológicos"],
    ["servicos-externos", "10. Ferramentas de análise e serviços externos"],
    ["compartilhamento", "11. Compartilhamento de dados pessoais"],
    ["transferencia", "12. Transferência internacional de dados"],
    ["retencao", "13. Armazenamento, conservação e eliminação de dados"],
    ["seguranca", "14. Segurança da informação e prevenção de incidentes"],
    ["direitos", "15. Direitos dos titulares de dados pessoais"],
    ["solicitacoes", "16. Como solicitar informações sobre dados pessoais"],
    ["editorial", "17. Dados pessoais em conteúdos editoriais e documentos públicos"],
    ["menores", "18. Crianças e adolescentes"],
    ["servicos-futuros", "19. Serviços futuros e evolução da plataforma"],
    ["atualizacoes", "20. Atualizações desta política"],
    ["legislacao", "21. Legislação e referências de proteção de dados"],
    ["contato", "22. Contato e informações institucionais"],
  ].map(([id, rotulo]) => ({ id: id!, rotulo: rotulo! })),
  blocos: [
    {
      titulo: "1. Compromisso com a proteção de dados pessoais",
      paragrafos: [
        "A Banca Paulista adota como orientação o tratamento responsável de informações pessoais, observando os princípios de finalidade, adequação, necessidade, transparência, segurança, prevenção e não discriminação previstos na LGPD.",
        "O tratamento deve estar relacionado a finalidades legítimas e identificáveis, evitando a coleta de informações desnecessárias ao funcionamento do portal. A consulta pública aos conteúdos editoriais não exige, como regra, a criação de uma conta ou o fornecimento de dados cadastrais.",
        "O funcionamento técnico envolve requisições processadas pela infraestrutura do site. Isso é distinto de informações fornecidas voluntariamente em contatos, inscrições ou serviços, que só poderão existir depois de sua efetiva disponibilização e comunicação de finalidade.",
      ],
    },
    {
      titulo: "2. Identificação do responsável pelo tratamento",
      paragrafos: [
        "Para fins da LGPD, controlador é quem toma as decisões referentes ao tratamento de dados pessoais. A identidade e o contato do controlador devem corresponder ao responsável efetivo pela operação da Banca Paulista; fornecedores tecnológicos não se tornam controladores apenas por fornecerem hospedagem ou infraestrutura.",
        "A identificação efetiva do controlador e um canal operacional para solicitações de privacidade ainda não estão confirmados nos registros deste projeto. Por esse motivo, esta minuta não está liberada para publicação definitiva. A identificação e o canal deverão ser inseridos e validados antes da ativação pública desta política.",
        "A Banca Paulista não se apresenta como órgão público nem como entidade integrante da administração pública. A necessidade de designação formal de encarregado deve ser avaliada conforme a legislação e a regulamentação aplicáveis, sem presumir uma designação inexistente.",
      ],
    },
    {
      titulo: "3. Quais dados pessoais podem ser tratados",
      paragrafos: [
        "As categorias envolvidas variam conforme os recursos efetivamente disponíveis e utilizados.",
      ],
      subsecoes: [
        {
          titulo: "3.1. Dados técnicos de navegação",
          paragrafos: [
            "As requisições podem incluir endereço IP, data e horário, recurso solicitado, navegador, sistema operacional, dispositivo e informações de conexão. A infraestrutura também pode processar identificadores técnicos de segurança, quando existentes, e registros de erros necessários à entrega, proteção, diagnóstico e manutenção. A extensão e a retenção desses dados dependem dos serviços tecnológicos efetivamente utilizados.",
          ],
        },
        {
          titulo: "3.2. Dados fornecidos voluntariamente",
          paragrafos: [
            "Se o portal disponibilizar canais de contato ou outras funcionalidades, o titular poderá fornecer nome, e-mail, organização, assunto e conteúdo da mensagem conforme a finalidade comunicada. A existência da página Contato não significa que haja formulário ou mecanismo automático ativo. No estado verificado neste projeto, não há formulário de contato ou envio de arquivos ativo.",
          ],
        },
        {
          titulo: "3.3. Informações de profissionais e colaboradores",
          paragrafos: [
            "Uma futura publicação de perfis poderá envolver nome profissional, fotografia, inscrição em conselho, apresentação curricular, áreas declaradas e canais autorizados. A publicação dependerá de critérios de verificação, transparência, fundamento jurídico e respeito aos direitos dos titulares. Essa previsão não confirma um cadastro público ativo de profissionais participantes.",
          ],
        },
      ],
    },
    {
      titulo: "4. Finalidades do tratamento de dados",
      paragrafos: [
        "Os dados eventualmente tratados devem estar associados a finalidades determinadas, legítimas e informadas. Conforme a operação efetivamente existente, as finalidades podem incluir:",
      ],
      lista: [
        "Funcionamento do portal: entregar páginas, imagens e recursos solicitados.",
        "Segurança e prevenção de abusos: proteger sistemas e preservar a integridade da infraestrutura.",
        "Manutenção técnica: diagnosticar falhas e solucionar problemas de funcionamento.",
        "Atendimento institucional e gestão editorial: examinar solicitações quando houver canal operacional.",
        "Medição de audiência: avaliar a utilização somente se uma ferramenta compatível estiver efetivamente ativa.",
        "Cumprimento de obrigações legais e exercício regular de direitos, nos casos aplicáveis.",
      ],
      complemento: [
        "Os dados não devem ser utilizados para finalidades incompatíveis com aquelas informadas, salvo fundamento jurídico adequado e cumprimento das exigências legais. Funcionalidades futuras, como perfis ou oportunidades profissionais, dependem de definição própria antes de sua ativação.",
      ],
    },
    {
      titulo: "5. Fundamentos legais para o tratamento",
      paragrafos: [
        "A LGPD prevê hipóteses legais diferentes. A hipótese aplicável deve ser identificada para cada operação concreta, considerando finalidade, necessidade e características do tratamento.",
      ],
      lista: [
        "Legítimo interesse, quando permitido e após ponderação dos direitos e expectativas do titular.",
        "Cumprimento de obrigação legal ou regulatória.",
        "Execução de contrato ou procedimentos preliminares relacionados a contrato, quando necessários.",
        "Consentimento, quando a operação depender de manifestação livre, informada e inequívoca.",
        "Exercício regular de direitos nas hipóteses legalmente previstas.",
      ],
      complemento: [
        "A escolha da hipótese legal não deve decorrer apenas de conveniência operacional. O acesso à página ou a continuidade da navegação não constituem consentimento quando a lei exigir manifestação específica. Dados pessoais sensíveis, se excepcionalmente envolvidos, exigem avaliação própria e salvaguardas previstas na LGPD.",
      ],
    },
    {
      titulo: "6. Cookies e tecnologias semelhantes",
      paragrafos: [
        "Cookies são arquivos ou identificadores que podem ser armazenados ou consultados pelo navegador. Armazenamento local, identificadores técnicos e mecanismos de medição também podem desempenhar funções semelhantes. A finalidade e as características de cada recurso determinam sua classificação.",
        "No código atualmente verificado, o carregamento das fontes tipográficas consulta Google Fonts e transmite dados técnicos de conexão ao provedor. Não foi identificado uso ativo de cookies de análise, publicidade ou marketing no código da aplicação. A existência de código inativo não é tratada como operação ativa.",
      ],
    },
    {
      titulo: "7. Categorias de cookies",
      paragrafos: [
        "A Banca Paulista deverá manter transparência sobre as tecnologias realmente utilizadas. As categorias abaixo descrevem funções possíveis, não uma afirmação de que estejam todas ativas.",
      ],
      subsecoes: [
        {
          titulo: "7.1. Cookies estritamente necessários",
          paragrafos: [
            "Podem apoiar segurança, integridade de sessão e funcionamento técnico. Sua necessidade não afasta o dever de transparência. No código da interface consultado, o componente de sidebar contém gravação de um cookie de estado, mas não é importado nem utilizado pelas páginas atuais; não foi observado como cookie ativo da aplicação.",
          ],
        },
        {
          titulo: "7.2. Cookies de preferências",
          paragrafos: [
            "Podem recordar escolhas de apresentação, idioma ou privacidade quando funcionalidades dessa natureza existirem. A necessidade de consentimento ou outro fundamento depende da finalidade concreta.",
          ],
        },
        {
          titulo: "7.3. Desempenho e análise de audiência",
          paragrafos: [
            "Ferramentas de análise podem medir visitas e interações. Não foram identificados scripts ativos de Google Analytics, Google Tag Manager, Cloudflare Web Analytics ou chamadas de análise no código verificado. Um módulo de eventos sem chamadas encontrado no repositório não foi considerado ferramenta ativa.",
          ],
        },
        {
          titulo: "7.4. Publicidade e rastreamento",
          paragrafos: [
            "O texto desta política não autoriza ativar publicidade comportamental ou rastreamento. Uma futura implementação exige avaliação técnica e jurídica, transparência e mecanismo de escolha quando legalmente necessário. Não foram identificados pixels ou scripts publicitários ativos no código consultado.",
          ],
        },
      ],
    },
    {
      titulo: "8. Gerenciamento de cookies e preferências",
      paragrafos: [
        "O visitante pode consultar, bloquear ou excluir cookies nas configurações do navegador, observadas as funcionalidades que dependam legitimamente deles. Não foi identificado, no código verificado, uso ativo de cookies não essenciais que demande um banner de consentimento; por isso, esta página não afirma que exista um gerenciador de preferências.",
        "Se o portal vier a utilizar tecnologias não necessárias cujo tratamento dependa de consentimento, deverá oferecer meios acessíveis para aceitar, recusar, revisar e revogar escolhas quando aplicável, sem impedir injustificadamente a leitura do conteúdo público. Continuidade da navegação e opções pré-marcadas não substituem consentimento válido.",
      ],
    },
    {
      titulo: "9. Hospedagem, infraestrutura e serviços tecnológicos",
      paragrafos: [
        "A homologação está configurada como aplicação em Cloudflare Workers, com endereço workers.dev. As requisições necessárias à entrega das páginas são processadas pela infraestrutura do provedor. A configuração versionada consultada não declara retenção de logs, duração de armazenamento ou configuração específica de análise de tráfego; esses pontos não puderam ser confirmados apenas pelo repositório.",
        "O código do servidor envia erros e pilhas de execução para console.error para diagnóstico. O destino, o acesso e a retenção dos logs no ambiente gerenciado não estão especificados na configuração local consultada.",
        "A configuração local não define URL de Payload. O adaptador de artigos só usa o CMS se receber essa variável no runtime; a configuração remota do ambiente não foi inspecionada. Não se afirma que exista processamento remoto ativo ou que todo recurso do fornecedor esteja ativado.",
      ],
    },
    {
      titulo: "10. Ferramentas de análise e serviços externos",
      paragrafos: [
        "Não foram encontrados scripts ativos de analytics, publicidade, mapas, vídeo, autenticação ou rastreamento na aplicação. As fontes tipográficas carregadas de Google Fonts constituem recurso externo efetivamente referenciado pelo HTML, de modo que o navegador estabelece conexão com os domínios do serviço para obter os arquivos de fonte.",
        "O formulário de busca da página inicial envia a consulta digitada como parâmetro GET para os guias de delegacias. O visitante não deve inserir dados pessoais ou relatos de casos nessa busca; a consulta passa pela requisição do site, e eventual retenção em logs do provedor não foi confirmada.",
        "A presença de uma biblioteca ou de código sem chamadas não prova que um serviço esteja ativo. Novos recursos externos deverão ser avaliados antes da ativação para reduzir exposição desnecessária de informações.",
      ],
    },
    {
      titulo: "11. Compartilhamento de dados pessoais",
      paragrafos: [
        "Fornecedores tecnológicos podem processar dados técnicos quando isso for necessário à prestação dos serviços utilizados. Compartilhamentos devem observar finalidades específicas, segurança e requisitos jurídicos aplicáveis.",
        "Comunicações também podem ocorrer por obrigação legal, determinação válida de autoridade ou exercício regular de direitos. A disponibilidade pública de uma informação não autoriza sua comercialização irrestrita. Operações comerciais futuras exigem avaliação e informação prévias.",
      ],
    },
    {
      titulo: "12. Transferência internacional de dados",
      paragrafos: [
        "Infraestrutura distribuída ou fornecedores com processamento fora do Brasil podem envolver transferência internacional. A localização ou presença internacional de um fornecedor, isoladamente, não permite concluir quais dados são transferidos nem qual mecanismo jurídico se aplica. As operações efetivas e salvaguardas deverão ser verificadas e documentadas conforme a LGPD e a regulamentação da ANPD.",
      ],
    },
    {
      titulo: "13. Armazenamento, conservação e eliminação de dados",
      paragrafos: [
        "A conservação deve considerar finalidade, exigências legais, necessidade operacional e direitos dos titulares. Registros técnicos de segurança e mensagens de canais institucionais, quando existirem, podem ter critérios próprios.",
        "Não foram confirmados neste repositório prazos operacionais de retenção de logs do provedor. Prazos específicos devem ser definidos e documentados para operações efetivamente realizadas, sem períodos arbitrários ou indeterminados. Quando cabível, o encerramento pode envolver exclusão, anonimização ou outra medida prevista em lei, ressalvadas hipóteses legais de conservação.",
      ],
    },
    {
      titulo: "14. Segurança da informação e prevenção de incidentes",
      paragrafos: [
        "A proteção de dados envolve medidas técnicas e administrativas proporcionais aos dados e às operações, para reduzir riscos de acesso não autorizado, perda, alteração ou divulgação irregular. A configuração local identifica hospedagem em Worker e tratamento de erros para diagnóstico, mas não comprova certificações, auditorias ou controles adicionais específicos.",
        "Nenhum ambiente digital é absolutamente imune a falhas. Um incidente deve ser avaliado quanto às circunstâncias, aos riscos e às obrigações de comunicação previstas na legislação e nas regras da ANPD. Esta política não declara medidas que não tenham sido efetivamente verificadas.",
      ],
    },
    {
      titulo: "15. Direitos dos titulares de dados pessoais",
      paragrafos: [
        "Nos termos da LGPD, os titulares podem exercer os direitos previstos na lei, conforme os requisitos aplicáveis a cada solicitação.",
      ],
      lista: [
        "Confirmação da existência de tratamento e acesso aos dados.",
        "Correção de dados incompletos, inexatos ou desatualizados.",
        "Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade.",
        "Portabilidade, quando aplicável e conforme as condições legais e regulamentares.",
        "Eliminação de dados tratados com consentimento, ressalvadas as hipóteses de conservação.",
        "Informação sobre compartilhamentos, possibilidade de não consentir e consequências da negativa.",
        "Revogação do consentimento e oposição nas hipóteses previstas.",
        "Revisão de decisões tomadas unicamente com base em tratamento automatizado, observados os critérios legais.",
      ],
      complemento: [
        "O exercício dos direitos não depende de contratação de serviços. As solicitações devem ser analisadas segundo os requisitos e prazos legais, com fundamentação quando não puderem ser atendidas imediatamente.",
      ],
    },
    {
      titulo: "16. Como solicitar informações sobre dados pessoais",
      paragrafos: [
        "O titular deve poder encaminhar solicitações ao canal de privacidade indicado pela Banca Paulista. No estado atual do projeto, não foi confirmado um canal operacional específico para essa finalidade, nem a identidade do controlador; essa lacuna impede a publicação definitiva desta política.",
        "Quando houver canal, uma confirmação proporcional de identidade poderá ser necessária para evitar divulgação a pessoas não autorizadas, sem exigir informações excessivas. O canal não substitui atendimento de órgãos públicos, consulta jurídica ou meios de emergência. O titular também pode recorrer à ANPD conforme a legislação.",
      ],
    },
    {
      titulo: "17. Dados pessoais em conteúdos editoriais e documentos públicos",
      paragrafos: [
        "Informações sobre pessoas, empresas, representantes e profissionais podem aparecer quando pertinentes a conteúdo de interesse público. A origem em documento público não elimina a necessidade de considerar proteção de dados, direitos da personalidade, sigilo e restrições de reprodução.",
        "A publicação deve considerar finalidade, contexto, necessidade e fundamento jurídico. O portal não usa conteúdo editorial como justificativa automática para divulgação indiscriminada. Documentos sigilosos, dados sensíveis e informações de crianças e adolescentes exigem cuidados adicionais. Pedidos de correção ou avaliação de exposição indevida serão analisados à luz dos direitos envolvidos e da legislação.",
      ],
    },
    {
      titulo: "18. Crianças e adolescentes",
      paragrafos: [
        "Os conteúdos destinam-se ao público em geral e não constituem serviço dirigido especificamente a crianças ou adolescentes. Eventual tratamento de dados desse público deverá observar a legislação e a prevalência de seu melhor interesse.",
        "O acesso público a conteúdo não autoriza coletar dados de menores. Funcionalidades futuras que possam envolvê-los exigem avaliação específica de finalidade, segurança, transparência e requisitos legais.",
      ],
    },
    {
      titulo: "19. Serviços futuros e evolução da plataforma",
      paragrafos: [
        "A Banca Paulista pode ampliar suas atividades editoriais e digitais, inclusive com diretórios, páginas territoriais, perfis profissionais e oportunidades. Essa possibilidade não significa que tais serviços estejam ativos.",
        "Antes de uma nova funcionalidade que envolva dados pessoais, deverão ser identificados dados necessários, finalidades, fundamentos, fornecedores, retenção e meios para exercício de direitos. A publicação desta política não autoriza antecipadamente rastreamento, publicidade comportamental, recebimento de currículos ou formação de bancos de dados.",
      ],
    },
    {
      titulo: "20. Atualizações desta política",
      paragrafos: [
        "Esta política pode ser atualizada diante de mudanças legais, regulatórias, tecnológicas ou nas atividades do portal. As alterações devem refletir práticas efetivas e informações verificáveis, e a data da última revisão deve corresponder à revisão editorial real.",
        "Quando uma mudança relevante exigir comunicação ou nova manifestação do titular, a providência será avaliada conforme a legislação. A versão publicada deve permitir compreender as características do tratamento relacionado ao portal.",
      ],
    },
    {
      titulo: "21. Legislação e referências de proteção de dados",
      paragrafos: [
        "Esta política considera especialmente a Lei nº 13.709/2018 (LGPD), a Lei nº 12.965/2014 (Marco Civil da Internet) e as regulamentações e orientações da Autoridade Nacional de Proteção de Dados sobre direitos, cookies, legítimo interesse, segurança e incidentes, conforme sua pertinência.",
      ],
      links: [
        {
          rotulo: "Lei Geral de Proteção de Dados Pessoais",
          href: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm",
        },
        {
          rotulo: "Marco Civil da Internet",
          href: "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
        },
        {
          rotulo: "Autoridade Nacional de Proteção de Dados",
          href: "https://www.gov.br/anpd/pt-br",
        },
        {
          rotulo: "Direitos dos titulares",
          href: "https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares",
        },
        {
          rotulo: "Guia orientativo sobre cookies",
          href: "https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais",
        },
      ],
    },
    {
      titulo: "22. Contato e informações institucionais",
      paragrafos: [
        "A Banca Paulista deverá disponibilizar informação clara sobre o responsável pelo tratamento e um canal adequado ao exercício dos direitos previstos na LGPD. O canal de privacidade deve ter finalidade específica e não se confundir com atendimento jurídico, representação ou contratação.",
        "A página Sobre apresenta a natureza do projeto. As condições gerais de uso estão nos Termos de Uso, Aviso Legal e Política Editorial. A rota de contato existente não configura, por si só, um canal operacional para pedidos de titulares; não serão apresentados endereços ou mecanismos de atendimento sem confirmação.",
      ],
      links: [
        { rotulo: "Sobre a Banca Paulista", href: "/sobre" },
        { rotulo: "Termos de Uso", href: "/termos-de-uso" },
        { rotulo: "Contato editorial", href: "/contato" },
      ],
    },
  ],
  linksRelacionados: [
    { rotulo: "Termos de Uso", href: "/termos-de-uso" },
    { rotulo: "Integridade e Ética", href: "/integridade-e-etica" },
    { rotulo: "Sobre a Banca Paulista", href: "/sobre" },
    { rotulo: "Profissionais", href: "/profissionais" },
    { rotulo: "Contato editorial", href: "/contato" },
  ],
  atualizadoEm: "15 de outubro de 2026",
  notaFinal: [
    "Banca Paulista. Informação jurídica, institucional e territorial.",
    "Minuta local de revisão. A publicação definitiva depende da confirmação do controlador efetivo e de um canal operacional de privacidade.",
  ],
};
