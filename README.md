# PRO Advogado SP

Projeto: Paulo Sinigalia — Plataforma Jurídica Estratégica

Crie uma plataforma digital premium para Paulo José Sinigalia — OAB/SP 411.502, advogado com atuação criminal e cível estratégica em São Paulo.

Isto não deve ser tratado como um site institucional comum. O projeto é uma plataforma de autoridade, SEO local, triagem e qualificação de contatos jurídicos, com front-end sofisticado e arquitetura preparada para Payload CMS, Cloudflare Workers, automações e painel privado de leads.

Direção de marca e design

A estética deve transmitir:

discrição;

autoridade;

precisão;

proteção patrimonial;

sofisticação;

atendimento estratégico;

sobriedade institucional.

Não criar aparência de escritório popular, site genérico de advocacia, empresa de segurança privada, cassino, banco ou consultoria financeira.

Paleta

Preto profundo: #090909

Grafite: #151515

Cinza mineral: #242424

Dourado champanhe discreto: #B79A5A

Dourado claro para detalhes: #D9C38B

Marfim para leitura: #F2EFE8

Usar dourado com moderação. Evitar gradientes dourados exagerados, brilhos excessivos e efeitos visuais chamativos.

Tipografia

Títulos: serifada editorial sofisticada, preferencialmente Cormorant Garamond ou equivalente.

Textos e interface: Manrope, Inter ou equivalente.

Muito espaço negativo, boa hierarquia, leitura confortável e contraste acessível.

Imagens fornecidas

Usar os arquivos enviados pelo usuário como referência e ativos visuais:

logotipo dourado e preto;

retrato profissional do advogado;

imagem do ambiente do escritório;

posteriormente serão enviadas fotos de fachadas de delegacias.

Não usar imagens genéricas de martelo, balança da justiça, algemas, dinheiro, tribunal, policial ou carros de polícia como decoração principal.

Objetivo de conversão

A plataforma deve converter visitantes em contatos qualificados, sem comunicação agressiva.

Os CTAs devem usar linguagem sóbria:

“Informações para contato”

“Enviar informações iniciais”

“Solicitar contato do escritório”

“Atendimento reservado”

“Conhecer áreas de atuação”

Não utilizar frases como:

“Contrate agora”

“Ganhe sua causa”

“Especialista número um”

“Garantia de resultado”

“Recupere seus direitos”

“Fale com advogado urgente” como chamada comercial

Estrutura inicial de rotas

Crie as seguintes páginas e rotas:

/
/o-escritorio
/paulo-sinigalia
/areas-de-atuacao
/atendimento-reservado
/contato
/conteudos
/delegacias
/delegacias/[slug]


Criar também páginas-modelo locais, alimentadas inicialmente por dados estruturados locais:

/delegacias/advogado-14-dp-pinheiros
/delegacias/advogado-15-dp-itaim-bibi
/delegacias/advogado-27-dp-campo-belo
/delegacias/advogado-34-dp-morumbi
/delegacias/advogado-51-dp-butanta
/delegacias/advogado-89-dp-portal-do-morumbi
/delegacias/advogado-96-dp-brooklin


Essas páginas precisam usar um único template premium e escalável. Não duplicar componentes ou criar páginas estáticas isoladas.

Home page

Criar uma home premium com as seguintes seções:

Header minimalista com logo, menu, botão de contato e menu mobile.

Hero elegante:

título: “Advocacia estratégica para situações jurídicas complexas”

subtítulo institucional e reservado;

retrato do advogado ou ambiente do escritório;

CTA neutro para informações de contato.

Bloco de posicionamento:

atuação técnica;

discrição;

análise individualizada;

acompanhamento próximo;

situações de alta responsabilidade.

Áreas de atuação:

Defesa criminal estratégica;

Crimes empresariais e patrimoniais;

Medidas urgentes e investigações;

Responsabilidade civil e indenizações;

Contratos, patrimônio e negócios;

Família, sucessões e proteção patrimonial.

Bloco “Situações que exigem estratégia e discrição”:

intimação;

inquérito;

busca e apreensão;

prisão em flagrante;

investigação empresarial;

conflito societário;

bloqueio patrimonial;

sucessão e patrimônio.

Bloco de SEO local:

título: “Atuação em regiões estratégicas de São Paulo”

cards elegantes para Pinheiros, Itaim Bibi, Brooklin, Campo Belo, Morumbi, Butantã, Perdizes, Jardins e Santo Amaro;

cada card aponta para uma página de DP ou região.

Processo de atendimento:

informações iniciais;

análise de viabilidade;

contato do escritório;

orientação individualizada.

Conteúdos jurídicos em destaque.

CTA final de contato reservado.

Footer completo com nome, OAB/SP 411.502, links institucionais, política de privacidade, contato e aviso de caráter informativo.

Página de Delegacia

Cada página de DP deve ser uma landing page editorial e informativa, pensada para buscas como:

advogado perto do 27º DP;

advogado criminal 27º DP Campo Belo;

advogado próximo ao 96º DP Brooklin;

advogado criminal 15º DP Itaim Bibi.

Exemplo de SEO:

Title:
Advogado Criminal Próximo ao 27º DP Campo Belo | Paulo Sinigalia

H1:
Advogado criminal próximo ao 27º DP Campo Belo


Cada página deve ter:

H1 específico;

introdução institucional;

identificação da unidade;

contexto territorial;

bairros e regiões relacionadas;

situações jurídicas relacionadas;

FAQ;

conteúdos relacionados;

CTA neutro de contato;

chatbot de triagem;

aviso claro de que o escritório não representa a Polícia Civil nem possui vínculo institucional com delegacias.

Não inventar endereço, telefone, horário, área de competência ou dados de delegacias. Criar os campos estruturados e usar dados de exemplo claramente marcados como conteúdo de desenvolvimento.

Arquitetura de conteúdo preparada para Payload CMS

Não usar Supabase, Firebase ou outro CMS.

Preparar uma camada de conteúdo desacoplada para futura integração com Payload CMS + PostgreSQL hospedados na VPS.

Criar tipos, dados locais de desenvolvimento e interfaces para:

Delegacia
Região
Área de atuação
Situação jurídica
Conteúdo jurídico
FAQ
Autor
Mídia
Página institucional
Configuração SEO


Criar uma interface ContentRepository ou equivalente, para que o front consuma conteúdo por uma camada de serviço. Hoje ela pode usar dados locais; posteriormente será conectada à API REST do Payload CMS.

Usar variável de ambiente futura:

CMS_API_URL=


Não acoplar a interface diretamente a dados mockados dentro dos componentes.

Triagem e contatos

Criar uma interface de chatbot elegante, discreta e conversacional.

Objetivo: coletar informações iniciais, sem fornecer parecer jurídico automático e sem solicitar documentos sensíveis.

Etapas iniciais:

Qual a natureza geral da situação?

Criminal

Cível

Empresarial

Patrimonial

Situação urgente

Não sei informar

Existe urgência?

Prisão

Intimação

Busca e apreensão

Prazo em andamento

Não há urgência imediata

Coletar:

nome;

telefone;

e-mail;

cidade;

melhor horário para contato;

breve descrição opcional.

Exibir consentimento de privacidade.

Mensagem final:
“As informações foram recebidas para análise inicial. Este canal não constitui consulta jurídica, contratação ou garantia de atendimento.”

Preparar endpoint compatível com Cloudflare Workers para envio futuro da triagem.

Criar eventos analíticos estruturados:

lead_started
lead_completed
whatsapp_clicked
contact_form_submitted
local_page_viewed
dp_page_viewed


Registrar no payload do evento, quando aplicável:

landingPage
dpNumber
dpName
region
legalArea
urgency


Não integrar e-mail real, WhatsApp API real ou banco de dados nesta primeira fase. Apenas preparar as interfaces, rotas e contratos de dados de maneira limpa.

SEO técnico

Implementar:

metadata por rota;

canonical configurável;

Open Graph;

sitemap;

robots;

Schema.org para LegalService, Attorney, FAQPage e Article;

URLs legíveis;

breadcrumbs;

páginas 404;

estrutura preparada para redirects;

imagens otimizadas;

excelente desempenho mobile;

acessibilidade básica real.

Não criar depoimentos falsos, avaliações falsas, números fictícios de processos, resultados de casos ou promessas de êxito.

Requisitos técnicos

TypeScript estrito;

componentes reutilizáveis;

design system consistente;

responsividade impecável;

animações discretas;

código organizado;

rotas escaláveis;

dados separados da apresentação;

preparado para Cloudflare Workers;

não remover recursos da stack padrão do Lovable sem necessidade;

não adicionar dependências pesadas sem justificativa.

Ao finalizar, apresente:

estrutura de rotas criada;

componentes reutilizáveis;

modelo de dados local;

pontos preparados para Payload CMS;

pontos preparados para Cloudflare Workers;

próximos passos necessários para integrar o CMS, banco, e-mail e painel privado.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://lawsp.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/85f97f24-4605-41af-93d2-95287c8053c8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
