import type { NoticiaRascunhoEditorial } from "../types";
import imagemComplementarUrl from "./preview-assets/dfir-dhenis-martins-dos-santos-deboche.avif?url";
import imagemInformacoesFiscaisUrl from "./preview-assets/dfir-dhenis-martins-dos-santos-informacoes-fiscais.avif?url";
import imagemPrincipalUrl from "./preview-assets/dhenis-martins-dos-santos.avif?url";

/**
 * Rascunho nominal isolado: não importar em `noticias.ts` nem em outra coleção pública.
 * O material de origem contém capturas e documentos, mas nenhum dado pessoal sensível
 * foi incorporado ao repositório. As artes abaixo são exclusivas da prévia em DEV.
 */
export const rascunhoExposicaoDadosLinkedin = {
  id: "rascunho-exposicao-dados-linkedin-2026",
  slug: "dhenis-martins-dos-santos-linkedin-dados-pessoais-nota-fiscal",
  titulo:
    "Perfil associado a Dhenis Martins dos Santos divulga nota fiscal com dados pessoais em discussão no LinkedIn",
  resumo:
    "Perfil associado a Dhenis Martins dos Santos publicou uma nota fiscal contendo CPF e endereço de Paulo Helfstein durante uma discussão no LinkedIn. A reportagem examina a cronologia documentada e as questões de privacidade decorrentes da exposição.",
  linhaFina:
    "Perfil associado a Dhenis Martins dos Santos publicou uma nota fiscal contendo CPF e endereço de Paulo Helfstein durante uma discussão no LinkedIn. A origem do documento e as circunstâncias de sua obtenção ainda dependem de verificação independente.",
  manchetesAlternativas: [
    "Dhenis Martins dos Santos: publicação de nota fiscal com CPF e endereço levanta debate sobre privacidade no LinkedIn",
    "Discussão sobre perícia digital termina com exposição de documento fiscal por perfil associado a Dhenis Martins dos Santos",
    "Após divergência técnica, perfil associado a Dhenis Martins dos Santos publica documento com dados pessoais no LinkedIn",
  ],
  categoria: "Justiça e Direitos Digitais",
  subeditoria: "Privacidade e Segurança da Informação",
  tipoEditorial: "Reportagem de apuração",
  localidade: "São Paulo – SP",
  publicadoEm: "2026-10-25",
  elaboradoEm: "2026-10-25",
  autoria: "Vana Lopes",
  identificacaoProfissional: "Plantão Eleitoral",
  assinaturaDefinitiva: false,
  condicaoAssinatura:
    "A assinatura definitiva depende da participação efetiva da autora na apuração e revisão.",
  statusEditorial: "rascunho",
  identificacao: {
    perfilPublico: "D. Santos",
    nomeAssociado: "Dhenis Martins dos Santos",
    participante: "Paulo Helfstein",
    confirmacaoIndependente: "pendente",
  },
  seo: {
    title: "Dhenis Martins dos Santos: nota fiscal exposta no LinkedIn",
    description:
      "Perfil associado a Dhenis Martins dos Santos publica nota fiscal com CPF e endereço durante discussão no LinkedIn. Entenda o contexto e as questões de privacidade.",
    canonicalPath: "/noticias/dhenis-martins-dos-santos-linkedin-dados-pessoais-nota-fiscal",
    ogTitle:
      "Perfil associado a Dhenis Martins dos Santos publica documento fiscal com dados pessoais no LinkedIn",
    noindex: true,
  },
  imagem: {
    id: "rascunho-linkedin-imagem-principal",
    url: imagemPrincipalUrl,
    alt: "Arte editorial sobre privacidade digital e discussão no LinkedIn envolvendo publicação de documento fiscal com dados pessoais.",
    caption:
      "Arte editorial ilustrativa sobre a discussão no LinkedIn e os questionamentos relacionados à exposição de dados pessoais. Reprodução gráfica adaptada.",
    width: 1672,
    height: 941,
    preserveAspectRatio: true,
  },
  blocos: [
    {
      tipo: "markdown",
      texto: `Uma discussão pública sobre perícia digital e recuperação de dados de computadores terminou com a divulgação de uma nota fiscal eletrônica contendo informações pessoais de um dos participantes no LinkedIn.

O episódio ocorreu em uma publicação do portal jurídico Migalhas sobre operações do Grupo de Atuação Especial de Combate ao Crime Organizado (Gaeco), do Ministério Público de São Paulo, realizadas em 20 de outubro de 2026.

Capturas da conversa fornecidas à Banca Paulista mostram que a conta utiliza publicamente **D. Santos** e apresenta certificados em nome de **Dhenis Martins dos Santos**. O perfil associado a esse nome publicou uma imagem de nota fiscal eletrônica de 2020 contendo dados identificáveis de **Paulo Helfstein**, destinatário do documento fiscal divulgado. A identidade civil do responsável pela conta ainda não foi confirmada de forma independente.

O documento exibia nome completo, CPF e endereço do destinatário. Esses dados não serão reproduzidos nesta reportagem.

A origem do documento, as circunstâncias de sua obtenção e a finalidade de sua divulgação são questões ainda não esclarecidas. O episódio chama a atenção para os limites entre divergência profissional, exposição de informações pessoais e responsabilidade nas redes sociais.

## Uma notícia sobre o Gaeco deu início à discussão

Em 21 de outubro, o portal Migalhas publicou uma reportagem sobre duas operações do Gaeco destinadas a investigar suspeitas de fraudes em ações judiciais envolvendo aposentados e pensionistas.

Segundo a reportagem original, as operações Libelo e Garatéia resultaram no cumprimento de 11 mandados de busca e apreensão em Ribeirão Preto, Altinópolis e Franca, além do bloqueio judicial de aproximadamente R$ 6,1 milhões em bens e valores.

Um dos episódios relatados envolveu um advogado preso em flagrante por suspeita de obstrução da Justiça depois que, segundo a Polícia Militar, teria arremessado um notebook e um celular pela janela durante a chegada dos agentes. A defesa contestou as acusações, conforme a reportagem original.

Foi o episódio envolvendo o equipamento eletrônico que deu origem à discussão posteriormente registrada no LinkedIn. Paulo Helfstein publicou um comentário irônico sobre a possibilidade de recuperação de informações armazenadas em unidades SSD e sobre a inutilidade de danificar determinados componentes de um computador.

A publicação atraiu respostas de outros usuários, incluindo o perfil associado a Dhenis Martins dos Santos, que se apresenta profissionalmente como analista júnior de perícia forense digital e resposta a incidentes. Inicialmente, a conversa abordou questões técnicas relacionadas à recuperação de dados, criptografia, sistemas operacionais e investigação digital.

## O debate passou a envolver qualificações profissionais

Ao longo da troca de comentários, os participantes passaram a discutir conhecimentos técnicos e experiência profissional. Entre os assuntos mencionados estavam ferramentas de criptografia, sistemas Linux, Windows, identificação por endereços IP e limitações práticas da investigação forense.

A discussão também envolveu referências à formação acadêmica e às competências profissionais dos interlocutores. Em determinado momento, Dhenis utilizou a expressão **“gênio do oitavo”**, enquanto Paulo Helfstein questionou a experiência e os argumentos técnicos apresentados pelo interlocutor.

A discussão, inicialmente concentrada em questões técnicas de perícia digital, passou a envolver referências à experiência profissional dos participantes e, posteriormente, informações pessoais e fiscais de Paulo Helfstein. O perfil associado a Dhenis Martins dos Santos passou a comentar aspectos da trajetória profissional de Helfstein e a fazer referências a informações fiscais que afirmou ter localizado.

A mudança de assunto colocou em discussão não apenas a qualidade dos argumentos apresentados, mas também o uso de informações pessoais para questionar a credibilidade de um interlocutor.

## Documento fiscal com CPF e endereço foi publicado em comentário aberto

O acontecimento central ocorreu quando o perfil associado a Dhenis Martins dos Santos publicou informações de uma nota fiscal eletrônica emitida em 29 de junho de 2020. Na sequência, apresentou uma imagem do documento em comentário público acompanhada da expressão **“Envia como prova!”**

A imagem continha informações fiscais e cadastrais, incluindo nome completo, CPF e endereço do destinatário. O documento referia-se a uma operação comercial registrada por uma empresa identificada como emitente da nota fiscal.

É importante distinguir a condição de emitente da condição de destinatário: figurar como destinatário de uma nota fiscal não significa ser proprietário da empresa responsável pela emissão. Paulo Helfstein, pessoa cujos dados foram expostos, questionou a associação feita pelo interlocutor entre o documento e seu histórico empresarial.

A exposição pública de uma nota fiscal não demonstra, por si só, que o documento foi obtido ilegalmente. Entretanto, a publicação de informações identificáveis de uma pessoa durante uma divergência profissional suscita questionamentos sobre necessidade, finalidade e proporcionalidade da divulgação.

## Dhenis afirmou ter pesquisado informações fiscais

Em outro comentário, Dhenis declarou ter levantado informações sobre o histórico fiscal de Paulo Helfstein. Também afirmou conhecer sistemas nos quais teria identificado falhas de segurança entre 2020 e 2023.

As declarações foram apresentadas no contexto de uma discussão sobre conhecimentos técnicos e capacidade de investigação. Contudo, as capturas não permitem verificar quais sistemas teriam sido utilizados, se houve acesso a bases públicas ou privadas, quais mecanismos de consulta foram empregados ou se ocorreu alguma irregularidade.

Também não há, no material analisado, comprovação de invasão de sistemas, obtenção clandestina de informações ou acesso não autorizado a bancos de dados. Essas possibilidades não podem ser tratadas como fatos comprovados.

O que as imagens documentam, sujeito à validação independente do material, é a publicação de um documento fiscal contendo informações pessoais durante uma discussão pública.

## Dhenis relata episódio anterior envolvendo documentos de terceiros e faz declarações depreciativas sobre a Justiça

A discussão ganhou novos contornos quando Dhenis passou a comentar experiências anteriores envolvendo informações de identificação de outras pessoas.`,
    },
    {
      tipo: "imagem",
      imagem: {
        id: "rascunho-linkedin-comentario-adaptado",
        url: imagemComplementarUrl,
        alt: "Reprodução editorial adaptada de comentário do perfil associado a Dhenis Martins dos Santos sobre informações fiscais e profissionais durante discussão no LinkedIn.",
        caption:
          "Comentário apresentado em reprodução editorial adaptada. A mensagem faz referências a dados fiscais, à atuação profissional e a informações pessoais do interlocutor. Fonte: LinkedIn.",
        width: 1672,
        height: 941,
        preserveAspectRatio: true,
      },
    },
    {
      tipo: "markdown",
      texto: `Em resposta a Paulo Helfstein, o usuário afirmou que tentativas anteriores de responsabilizá-lo não teriam produzido consequências. Para sustentar sua afirmação, relatou ter imprimido documentos ou informações de identificação de uma pessoa e de seus familiares.

Segundo a própria declaração, o episódio teria envolvido informações da pessoa mencionada, de sua mãe e de seu pai.

O usuário afirmou ainda que a situação não teria resultado em consequências, sem apresentar documentação que permitisse verificar o episódio, suas circunstâncias ou eventuais providências adotadas pelas autoridades.

Em outra passagem, o usuário relatou o comparecimento à residência de uma pessoa após um conflito. Não há confirmação independente desse relato, tampouco elementos suficientes para concluir que o episódio ocorreu nas circunstâncias descritas.

### Críticas depreciativas à Justiça brasileira

Na mesma manifestação, Dhenis utilizou expressões depreciativas sobre o funcionamento da Justiça no Brasil.

Entre as expressões registradas estão **“A Justiça desse país é tão desprezível”** e **“Se a justiça não fosse uma piada”.**

O comentário foi acompanhado de risadas direcionadas ao interlocutor e de questionamentos sobre a eficácia de eventuais medidas legais.

A manifestação ocorreu depois que Helfstein informou sua intenção de procurar as autoridades em razão da divulgação pública de uma nota fiscal contendo dados pessoais.

A sequência dos comentários chama a atenção porque o próprio usuário relacionou sua experiência anterior envolvendo informações de terceiros à possibilidade de responsabilização no episódio atual.

Criticar instituições judiciais é um exercício legítimo da liberdade de expressão. Entretanto, a combinação dessas declarações com a divulgação de informações pessoais durante um conflito público merece análise contextual.

### Mensagem interpretada como intimidatória

Ao encerrar a resposta, o perfil utilizou uma expressão que Paulo Helfstein interpretou como potencialmente intimidatória.

A declaração ocorreu após a divulgação de um documento fiscal contendo informações identificáveis de Paulo Helfstein, em uma discussão que havia ultrapassado o debate técnico inicial.

O conteúdo não permite concluir, isoladamente, que tenha ocorrido ameaça criminal ou que o episódio anterior relatado pelo usuário tenha envolvido qualquer ilícito.

Da mesma forma, não há confirmação independente de que autoridades tenham analisado anteriormente o caso mencionado ou de que tenha existido algum procedimento oficial.

O episódio reforça a importância de documentar integralmente as manifestações e preservar o contexto antes de atribuir responsabilidades.

## Perfil associa dados fiscais a supostas falhas de segurança e introduz críticas políticas e profissionais na discussão

A discussão sobre perícia digital no LinkedIn ganhou um novo elemento quando Dhenis passou a mencionar informações fiscais de Paulo Helfstein e a relacioná-las a sistemas nos quais afirmou ter identificado falhas de segurança.`,
    },
    {
      tipo: "imagem",
      imagem: {
        id: "rascunho-linkedin-informacoes-fiscais",
        url: imagemInformacoesFiscaisUrl,
        alt: "Reprodução editorial adaptada de comentário atribuído ao perfil associado a Dhenis Martins dos Santos, no qual são mencionadas informações fiscais, supostas falhas de segurança, críticas profissionais e referências políticas durante discussão no LinkedIn.",
        caption:
          "Comentário apresentado em reprodução editorial adaptada. A mensagem menciona informações fiscais, supostas falhas de segurança, críticas à trajetória profissional de Paulo Helfstein e referências políticas no contexto da discussão no LinkedIn. Fonte: LinkedIn.",
        width: 1672,
        height: 941,
        preserveAspectRatio: true,
      },
    },
    {
      tipo: "markdown",
      texto: `Em comentário público, o usuário declarou que o documento fiscal mencionado correspondia a uma compra vinculada ao CPF de Helfstein, esclarecendo que não estava afirmando existir vínculo empregatício ou societário com a empresa emissora.

Na mesma mensagem, fez referência a um sistema no qual teria encontrado vulnerabilidades, sem identificar a plataforma utilizada ou explicar os procedimentos empregados para localizar as informações.

A declaração merece atenção porque aproxima dois assuntos diferentes: a existência de informações fiscais associadas a uma pessoa e a alegação de conhecimento sobre falhas de segurança em sistemas.

**Não há, contudo, elementos suficientes para afirmar que o documento tenha sido obtido mediante exploração de vulnerabilidades, invasão de sistema ou acesso não autorizado.**

A origem das informações e os meios utilizados para sua obtenção permanecem sem confirmação independente.

### Questionamentos profissionais substituem argumentos técnicos

O comentário também passou a abordar a atuação profissional de Paulo Helfstein fora do campo da tecnologia.

Dhenis questionou o desempenho de um projeto relacionado à corretagem imobiliária e sugeriu que determinadas atividades profissionais teriam sido abandonadas.

As afirmações foram apresentadas sem documentação que permitisse verificar o encerramento dos projetos mencionados ou avaliar seu desempenho.

A mudança de assunto ocorreu durante uma discussão que originalmente tratava de recuperação de dados e investigação forense.

Questionamentos sobre a experiência profissional de participantes podem ser legítimos em determinados contextos. Entretanto, alegações sobre projetos pessoais precisam ser diferenciadas de fatos efetivamente comprovados.

### Posição política também entrou na discussão

Na mesma publicação, o perfil atribuiu a Helfstein uma orientação política favorável ao ex-presidente Jair Bolsonaro, mencionando uma imagem na qual o profissional apareceria ao lado de Flávio Bolsonaro.

A manifestação foi acompanhada de uma crítica depreciativa e surgiu sem relação técnica demonstrada com os argumentos discutidos anteriormente.

O conteúdo não permite comprovar filiação partidária nem estabelecer que a divergência tenha sido motivada por discriminação política.

Entretanto, registra que o debate passou a incorporar referências à orientação política presumida de um dos participantes, além de críticas à sua trajetória profissional.

### Referência ao CPF antecedeu a publicação do documento

Ao encerrar o comentário, Dhenis voltou a mencionar a nota fiscal e afirmou que a consulta ao número do documento permitiria visualizar um CPF associado à transação.

Posteriormente, conforme outras capturas apresentadas para apuração, o mesmo perfil publicou uma imagem da nota fiscal contendo informações identificáveis do destinatário.

A sequência das manifestações demonstra que a discussão passou da referência verbal a informações fiscais para a reprodução pública de um documento com dados pessoais.

O episódio suscita questionamentos sobre a pertinência de utilizar informações cadastrais e fiscais como argumento em um conflito profissional.

A legalidade da obtenção dos dados, a existência de eventual violação das regras da plataforma e as circunstâncias de sua divulgação dependem de exame específico.

A reportagem não atribui, com base nas informações disponíveis, a prática de crime ou irregularidade administrativa ao responsável pelo perfil.

## O que diz o LinkedIn sobre exposição de dados pessoais

O LinkedIn estabelece regras destinadas a preservar um ambiente profissional seguro e respeitoso. A redação e a vigência das políticas aplicáveis ao caso ainda precisam ser verificadas diretamente nos canais oficiais da plataforma.

As políticas da plataforma tratam de comportamentos como assédio, intimidação, ataques pessoais direcionados e divulgação abusiva de informações pessoais ou confidenciais de terceiros. O termo *doxxing* é usado para práticas de exposição de dados pessoais capazes de atingir a privacidade de usuários.

Isso não significa que toda publicação de um dado disponível na internet represente automaticamente uma violação. É necessário considerar o tipo de informação, o contexto, a finalidade e as circunstâncias da divulgação.

No caso analisado, o documento fiscal apareceu em meio a uma divergência pessoal e profissional, e não em uma discussão especificamente destinada ao exame de transações fiscais. A decisão sobre eventual violação às políticas da plataforma compete ao LinkedIn, conforme seus procedimentos de análise e moderação.

## LGPD: dados acessíveis não podem ser avaliados fora do contexto

A Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018, estabelece conceitos e princípios relativos ao tratamento de informações capazes de identificar pessoas naturais. Nome, CPF e endereço podem constituir dados pessoais para os efeitos da legislação.

A LGPD também estabelece princípios como finalidade, adequação e necessidade para as atividades sujeitas ao seu regime. O fato de determinadas informações estarem acessíveis publicamente não elimina automaticamente todas as considerações relacionadas à sua utilização.

Por outro lado, a aplicação concreta da LGPD envolve exceções, hipóteses legais e diferenças entre atividades pessoais, profissionais e jornalísticas. O artigo 4º estabelece regras específicas de não aplicação para determinadas finalidades exclusivamente jornalísticas e artísticas.

Assim, não seria tecnicamente correto concluir, apenas a partir de uma captura de tela, que a divulgação da nota fiscal constitui necessariamente uma infração à LGPD. O enquadramento jurídico exige exame das circunstâncias concretas. O mesmo cuidado deve ser observado quanto a eventuais hipóteses criminais, que não podem ser presumidas com base exclusivamente na existência de uma discussão hostil.

## Participante informou ter procurado a Delegacia Eletrônica

Paulo Helfstein informou ter comunicado os acontecimentos à Delegacia Eletrônica do Estado de São Paulo e recebido um protocolo de solicitação de ocorrência.

A existência de um protocolo de atendimento não comprova, isoladamente, a instauração de inquérito policial, a prática de qualquer ilícito ou o reconhecimento de responsabilidade por parte das autoridades.

Também não foi apresentada, até a elaboração desta minuta, decisão administrativa ou judicial relacionada à publicação do documento. Por esse motivo, o episódio deve ser tratado como uma controvérsia documentada, cujos eventuais desdobramentos jurídicos dependem de apuração.

## Perfil associado a Dhenis Martins dos Santos: formação declarada, experiência profissional e atuação em segurança digital

O perfil associado em certificados ao nome Dhenis Martins dos Santos apresenta-se no LinkedIn como analista júnior de perícia forense digital e resposta a incidentes, área conhecida pela sigla DFIR (*Digital Forensics and Incident Response*).

Na descrição profissional, o usuário informa possuir formação em Gestão Financeira e estar realizando estudos de pós-graduação em Informática Forense, Gestão da Cibersegurança Empresarial e Direito Notarial e Registral.

### Formação acadêmica e experiência profissional

Segundo as informações exibidas no perfil associado a Dhenis Martins dos Santos, consta formação de tecnólogo em Gestão Financeira pelo Centro Universitário UniFatecie.

O perfil também relaciona uma especialização em Direito Notarial e Registral na Faculdade Líbano, iniciada em setembro de 2026.

Entre as experiências profissionais declaradas, consta uma atuação temporária como auxiliar administrativo na empresa Bonfrigo, entre dezembro de 2024 e dezembro de 2025.

A conta apresenta ainda certificados de instituições de educação e capacitação profissional, incluindo Cisco Networking Academy, Instituto Brasileiro de Cibersegurança (IBSEC) e Escola Nacional de Administração Pública (Enap).

As informações foram extraídas de capturas do perfil fornecidas para apuração. A reportagem não confirmou independentemente todos os certificados, vínculos profissionais ou atividades mencionadas.

A referência às instituições tem finalidade exclusivamente descritiva e não implica conhecimento, participação ou responsabilidade delas pelos comentários publicados na rede social.

### Conhecimentos em investigação digital declarados pelo usuário

Na seção de apresentação, o perfil destaca interesse por perícia forense digital, inteligência de fontes abertas (OSINT), identificação de relações patrimoniais e análise de informações.

Durante a discussão com Paulo Helfstein, o usuário também afirmou possuir cinco anos de experiência na identificação e análise de vulnerabilidades de sistemas.

Em outra manifestação, declarou ter levantado informações fiscais de Paulo Helfstein em sistemas nos quais alegou ter encontrado falhas de segurança.

As declarações não demonstram, por si só, que tenha ocorrido exploração de vulnerabilidades, acesso não autorizado ou utilização irregular de sistemas.

A reportagem não dispõe de documentação independente que permita verificar os métodos empregados na obtenção das informações mencionadas.

### Segurança da informação e responsabilidade no tratamento de dados

A atuação em segurança digital envolve conhecimentos sobre identificação de vulnerabilidades, análise de incidentes e proteção de informações.

O episódio analisado levanta uma questão pertinente a esse campo profissional: a distinção entre possuir acesso a uma informação e ter justificativa para divulgá-la publicamente.

Na discussão documentada, o perfil associado a Dhenis Martins dos Santos publicou uma imagem de nota fiscal contendo CPF e endereço de Paulo Helfstein.

A publicação ocorreu durante uma troca de comentários que já envolvia questionamentos profissionais e referências pessoais.

O LinkedIn proíbe a divulgação abusiva de informações pessoais de terceiros, prática frequentemente denominada *doxxing*.

A eventual aplicação dessa classificação ao comentário específico depende da análise contextual e dos procedimentos de moderação da plataforma.

### Declarações públicas e limites da apuração

A documentação disponível permite examinar o conteúdo das mensagens publicadas, mas não autoriza concluir que o titular da conta pratique habitualmente exposição de dados pessoais ou perseguição de outros usuários.

Também não há elementos suficientes para atribuir responsabilidade às instituições de ensino e empresas mencionadas em seu histórico profissional.

A formação acadêmica, a experiência declarada e os certificados apresentados não substituem a análise objetiva das publicações.

O ponto central da controvérsia permanece sendo a divulgação de um documento fiscal contendo dados pessoais durante uma discussão pública, suas circunstâncias e a eventual adequação dessa conduta às regras da plataforma.

Antes de qualquer conclusão definitiva, são necessárias a verificação independente da documentação e a oportunidade de manifestação do titular do perfil.

## A diferença entre pesquisa legítima e exposição indevida

Pesquisar informações disponíveis publicamente é uma atividade comum em diversas áreas profissionais. Jornalistas, advogados, pesquisadores, profissionais de segurança e analistas de inteligência frequentemente consultam documentos públicos, perfis profissionais e registros eletrônicos.

Entretanto, localizar informações e divulgá-las são atividades diferentes. Uma informação pode ser relevante para determinada finalidade e, ao mesmo tempo, desnecessária para outra.

O uso de dados identificáveis para sustentar argumentos sobre a competência de alguém exige atenção especial quando ocorre em um ambiente aberto, acessível a pessoas que não participam diretamente da discussão.

Também é importante distinguir a utilização legítima de registros públicos da exposição abusiva de informações particulares. Essas diferenças estão no centro do debate provocado pelo episódio.

## O que permanece sem esclarecimento

Embora as capturas fornecidas aparentem documentar a divulgação da nota fiscal, existem questões que não foram respondidas e a integridade do material ainda precisa ser verificada independentemente.

A primeira diz respeito à origem do documento: não há confirmação independente dos meios pelos quais o perfil obteve a imagem publicada.

A segunda envolve a finalidade de sua divulgação: é necessário compreender por que informações fiscais e cadastrais foram consideradas relevantes para uma discussão originalmente dedicada à perícia de computadores.

A terceira questão envolve as políticas de moderação do LinkedIn e a avaliação específica do conteúdo pela plataforma.

Finalmente, permanece necessária a confirmação independente da identidade civil associada ao perfil e a manifestação do usuário sobre os acontecimentos. Essas questões precisam ser examinadas antes de qualquer conclusão sobre eventual responsabilidade jurídica.

## Privacidade e responsabilidade nas redes profissionais

O episódio demonstra como uma discussão técnica pode perder seu objeto inicial e passar a envolver elementos particulares dos participantes.

Divergências sobre criptografia, investigação forense e segurança da informação podem ser discutidas com rigor sem recorrer à divulgação de documentos fiscais ou dados cadastrais. O mesmo princípio se aplica às críticas sobre formação acadêmica, experiência profissional e capacidade técnica.

O direito de questionar argumentos não deve ser confundido com uma autorização irrestrita para expor informações pessoais. Em ambientes digitais, a responsabilidade sobre dados exige atenção não apenas à forma como são obtidos, mas também às circunstâncias de sua utilização.

O caso também evidencia a importância de preservar o contexto integral de discussões públicas antes de atribuir responsabilidades a qualquer participante. A análise de documentos, capturas e comentários deve considerar as manifestações de todas as partes envolvidas.

Mais do que definir vencedores em uma discussão profissional, a controvérsia coloca em pauta uma questão de interesse coletivo: **até que ponto informações pessoais devem ser utilizadas como instrumento de argumentação em redes sociais?**`,
    },
  ],
  notas: [
    "Rascunho nominal: não publicar antes da conclusão das pendências editoriais e jurídicas.",
    "Dados pessoais presentes no material de origem foram descritos apenas por categoria e não reproduzidos.",
    "Declarações dos participantes, alegações de terceiros e fatos ainda não verificados foram atribuídos e qualificados no texto.",
    "Três reproduções gráficas adaptadas integram apenas a prévia local; capturas documentais e documentos originais permanecem fora do repositório.",
    "Registro interno de origem: as capturas usadas na preparação do rascunho foram fornecidas por Paulo Helfstein, participante diretamente envolvido nos acontecimentos.",
    "Registro interno de integridade editorial: a origem do material e o vínculo de Paulo Helfstein com o projeto Banca Paulista devem ser considerados na conferência independente, na revisão jurídica e na aprovação editorial.",
  ],
  tags: [
    "LinkedIn",
    "Privacidade Digital",
    "LGPD",
    "Dados Pessoais",
    "Perícia Digital",
    "Segurança Cibernética",
    "Justiça",
    "Direitos Digitais",
    "Nota Fiscal Eletrônica",
    "Assédio Digital",
  ],
  fontes: [
    {
      titulo: "Migalhas — Gaeco investiga advogados por fraudes em ações de aposentados",
      url: "https://www.migalhas.com.br/amp/quentes/466922/gaeco-investiga-advogados-por-fraudes-em-acoes-de-aposentados",
    },
    {
      titulo: "Publicação original no LinkedIn",
      url: "https://www.linkedin.com/posts/migalhas-gaeco-advocacia-ugcPost-7518645707994775552-tmOs/",
    },
    {
      titulo: "Perfil apresentado como D. Santos",
      url: "https://www.linkedin.com/in/d-santos-b56373370/",
    },
    {
      titulo: "LinkedIn — Políticas para Comunidades Profissionais",
      url: "https://br.linkedin.com/legal/professional-community-policies",
    },
    {
      titulo: "LinkedIn — Assédio e conteúdo abusivo",
      url: "https://www.linkedin.com/help/linkedin/answer/a1342756?lang=pt-BR",
    },
    {
      titulo: "Lei Geral de Proteção de Dados Pessoais",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm",
    },
  ],
  distribuicao: {
    rotaPublica: false,
    homepage: false,
    listagemNoticias: false,
    carrosseis: false,
    noticiasRelacionadas: false,
    paginasTerritoriais: false,
    paginasInstitucionais: false,
    buscaInterna: false,
    feeds: false,
    sitemap: false,
  },
  pendenciasEditoriais: [
    "Verificar independentemente a autenticidade, integridade, cronologia e contexto completo das capturas fornecidas.",
    "Confirmar de modo independente a identidade civil associada ao perfil público D. Santos e aos certificados apresentados.",
    "Confirmar as declarações citadas na reportagem a partir dos registros originais integrais.",
    "Obter contraditório do responsável pelo perfil e registrar prazo, canal, perguntas e eventual resposta de forma auditável.",
    "Obter contraditório do LinkedIn sobre moderação, preservação do conteúdo e políticas aplicáveis na data dos fatos.",
    "Confirmar a reportagem do Migalhas e os dados oficiais das operações Libelo e Garatéia em fontes primárias.",
    "Confirmar documentalmente, sem armazenar dados sensíveis, a alegada comunicação de Paulo Helfstein à Delegacia Eletrônica.",
    "Revisar em fonte oficial a versão das políticas do LinkedIn vigente na data da publicação.",
    "Submeter a versão nominal a revisão jurídica e editorial específica antes de qualquer publicação ou indexação.",
    "Confirmar a participação efetiva de Vana Lopes na conferência das evidências, revisão e aprovação editorial antes de tornar definitiva a assinatura.",
    "Reavaliar separadamente a indexação por mecanismos de busca somente após eventual aprovação para publicação.",
  ],
} satisfies NoticiaRascunhoEditorial;
