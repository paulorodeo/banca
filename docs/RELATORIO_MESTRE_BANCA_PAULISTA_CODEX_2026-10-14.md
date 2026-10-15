# BANCA PAULISTA — RELATÓRIO-MESTRE DE TRANSIÇÃO PARA CODEX

**Versão:** 1.0\
**Data:** 14 de outubro de 2026\
**Finalidade:** referência executiva e técnica para programação, auditoria, refatoração, reconstrução visual, integração editorial e expansão territorial da Banca Paulista.\
**Destino:** Codex para Windows, trabalhando com o repositório privado `paulorodeo/lawsp`.

> **Regra-mestra:** reconstruir a experiência visual, **não** recomeçar o sistema. Preservar URLs, conteúdo territorial, SEO e contratos de dados. Executar mudanças pequenas, auditáveis, testadas e reversíveis.

---

## 0. LEIA PRIMEIRO — ESTADO, EVIDÊNCIA E LIMITES

Este documento distingue:

- **[CONFIRMADO NO REPOSITÓRIO]**: informação constatada por leitura direta de arquivos da branch padrão `main`, via conector GitHub nesta data.
- **[DECISÃO DO PRODUTO]**: instrução já estabelecida pelo responsável pelo projeto; pode ainda não existir no código.
- **[A VALIDAR]**: hipótese, discrepância ou integração pendente; exige inspeção local, fontes oficiais, testes ou aprovação.
- **[PROPOSTA]**: arquitetura e critérios recomendados para implementação futura, sujeitos à validação técnica e regulatória.

**Escopo efetivamente inspecionado:** `AGENTS.md`, `README.md`, `roadmap.md`, `package.json`, `vite.config.ts`, `src/server.ts`, `src/routes/__root.tsx`, `src/routes/index.tsx`, `src/routes/delegacias.$slug.tsx`, `src/routes/regioes.$slug.tsx`, `src/routes/profissionais.tsx`, `src/routes/plantao-criminal.tsx`, `src/styles.css`, `src/components/site/{header,footer,brand,blocks,primitives}.tsx`, `src/content/{types,repository,articles.functions,payload-transport}.ts`, `src/content/local/{settings,zonas,regioes,delegacias,paginas}.ts`, `src/lib/{seo,public-url,public-url.functions}.ts`. **Não houve clone local, build, teste automatizado nem inspeção completa de todos os arquivos.** As constatações são estáticas, não comprovam o estado do deploy.

**Fonte privada:** https://github.com/paulorodeo/lawsp. Os nomes de arquivos foram confirmados no repositório; a arquitetura proposta deve ser confrontada com todo o código clonado antes da implementação.

---

## 1. VISÃO DO PRODUTO E LIMITES EDITORIAIS

**[DECISÃO DO PRODUTO]** A Banca Paulista é um **portal editorial e tecnológico independente** com foco inicial em informação jurídica, delegacias, regiões, bairros e serviços/instituições da cidade de São Paulo. **Não é uma sociedade de advogados, escritório de advocacia, serviço jurídico ou repartição pública.**

Missão de produto:

1. Dar acesso a guias verificáveis, legíveis e territorialmente contextualizados sobre instituições e procedimentos em São Paulo.
2. Organizar a descoberta por **cinco macrozonas** — Centro, Norte, Leste, Sul e Oeste —, bairros e páginas institucionais.
3. Publicar artigos assinados/autorizados com metadados e ligações contextuais.
4. **Futuramente, sujeito a validação jurídica**, exibir perfis factuais de advogados independentes, com contato direto do visitante com o próprio profissional.
5. Escalar por componentes e dados estruturados, sem criar centenas de páginas copiadas manualmente.

**Não implementar:** formulário de consulta jurídica para a Banca Paulista, coleta de relato de causa, classificação de leads para encaminhamento, redistribuição de potenciais clientes, comissão sobre honorários, atendimento jurídico central, promessa de êxito, avaliações inventadas, disponibilidade de plantão presumida ou publicidade que se confunda com recomendação editorial.

O portal pode receber contatos **editoriais/institucionais** separados, com dados mínimos e política de privacidade própria.

### Identidade pública e marca

- **Marca principal pretendida:** `Banca Paulista`.
- **[CONFIRMADO NO REPOSITÓRIO]** Persistem `Banca Paulista de Advogados — Plantão e Defesa Criminal` em `src/content/local/settings.ts`, `Banca Paulista de Advogados` em `src/lib/seo.ts` e `Advogados · Plantão e Defesa Criminal` no componente `Brand`.
- **[A VALIDAR / REVISÃO JURÍDICA PRIORITÁRIA]** Essas expressões podem induzir a percepção de sociedade de advocacia, embora o projeto se apresente como portal independente. Propor padronização editorial de marca e metadados após avaliação jurídica e aprovação do proprietário; **não substituir cegamente em slugs históricos, URLs ou conteúdo com implicações de SEO**.
- Incluir indicação discreta e inequívoca de **portal editorial independente, sem vínculo com órgãos públicos**.

---

## 2. AMBIENTES, REPOSITÓRIO E REGRA DE MIGRAÇÃO

| Elemento | Valor/estado | Observação |
|---|---|---|
| Repositório privado GitHub | `paulorodeo/lawsp` | **[CONFIRMADO]**, branch padrão `main` |
| Lovable legado | `https://bancapaulista.lovable.app/` | **[DECISÃO/INFORMAÇÃO DO PROPRIETÁRIO]**. Não será o ambiente primário de desenvolvimento. |
| Ambiente Cloudflare de desenvolvimento/homologação | `https://banca.pjdigital-me.workers.dev/` | **[DECISÃO DO PRODUTO]**. Deploy anterior declarado funcional, mas não testado nesta auditoria. |
| Domínio público definitivo | A definir/ativar posteriormente | Não impor `bancapaulista.org` como canonical definitivo até aprovação e configuração. |
| Backend editorial | **Pauload**, baseado em **Payload CMS** | Integração real com VPS pendente; preservar contrato existente. |
| WordPress auxiliar | Previsto para plugin/widget de WhatsApp | **Não** é CMS editorial nem banco-mestre de perfis. |
| Ambiente de implementação | Codex para Windows + pasta Git local | Trabalhar com Git, diff e validação contínua. |
| Branch de trabalho sugerida | `codex/banca-redesign` | Criar a partir do commit-base atual; preservar `main`. |

**[CONFIRMADO]** `AGENTS.md` alerta que o repositório está sincronizado com Lovable; commits na branch sincronizada aparecem no editor e histórico publicado não deve ser reescrito. **Não fazer force-push, amend ou rebase de commits já publicados**. Usar branch e PR; validar sincronização e estratégia de deploy antes do merge.

**[CONFIRMADO]** `src/lib/public-url.ts` ainda usa `https://lawsp.lovable.app` como `DEFAULT_SITE_ORIGIN`. `PUBLIC_SITE_URL` é lido por `src/lib/public-url.functions.ts`. É **P0** auditar canonical, Open Graph, JSON-LD e sitemap/robots por ambiente antes de indexar ou trocar domínio. Não assumir que o fallback corresponde ao endereço atual.

**Regra SEO sugerida:** ambientes de homologação devem ser tratados explicitamente como não indexáveis quando não destinados ao público/SEO, sem depender apenas de `robots.txt`; configurar canonical/`noindex` segundo o plano de lançamento. Não publicar canonical apontando acidentalmente ao Lovable legado. Na migração para o domínio final, revisar redirects 301, canonicals absolutos, sitemap, OG URLs e Search Console.

---

## 3. STACK E FUNCIONAMENTO ATUAL

**[CONFIRMADO NO `package.json`]**

- TanStack Start `@tanstack/react-start` **1.168.60**, React **19.2.0**, TanStack Router **1.170.41**.
- TypeScript **5.8.3**, Vite **8.1.5**, Tailwind CSS **4.2.1**.
- Radix UI, Lucide React, TanStack Query, Zod, ferramentas de lint/Prettier.
- Nitro `3.0.260603-beta` e `@lovable.dev/vite-tanstack-config` **2.25.3** em dependências de desenvolvimento.
- Scripts: `npm run dev`, `npm run build`, `npm run build:dev`, `npm run preview`, `npm run lint`, `npm run format`.
- **Não há script `test` nem `typecheck` declarado nesse arquivo.** Pesquisar testes reais antes de escolher runner; adicionar verificações de forma deliberada, sem inventar comando existente.

**[CONFIRMADO NO `vite.config.ts`]** Configuração Vite usa `defineConfig` de `@lovable.dev/vite-tanstack-config` e server entry personalizado em `src/server.ts`. Esse pacote injeta configurações da stack (inclusive alvo Cloudflare por padrão, segundo comentários do próprio arquivo). **Não removê-lo como “limpeza do Lovable” sem antes reproduzir build, SSR e deploy em alternativa equivalente.**

**[CONFIRMADO NO `src/server.ts`]** Há tratamento próprio de respostas catastróficas SSR e wrapper de erros; preservar até testes que demonstrem equivalência.

### Fonte dos dados

**[CONFIRMADO]** `src/content/repository.ts` implementa `ContentRepository` e `LocalContentRepository`:

- zonas, regiões, delegacias e várias páginas institucionais são obtidas de dados **locais tipados**;
- artigos usam `readArticles`/`readArticle`, com **funções de servidor** e transporte REST preparado para Payload;
- o frontend não deve importar runtime do Payload/Next.js.

**[CONFIRMADO NO `src/content/payload-transport.ts`]** Variáveis de integração existentes incluem `PAYLOAD_API_URL`, `PAYLOAD_PUBLIC_API_PATH`, `PAYLOAD_REVISION_PATH`, `ARTICLES_CACHE_NAMESPACE`, `ARTICLES_CACHE_TTL`, `PAYLOAD_TIMEOUT_MS`; também há `PUBLIC_SITE_URL`. O código valida URL, paginação e condições de publicação. **Não colocar segredos no cliente, repositório nem relatório.**

**[A VALIDAR]** VPS Pauload, esquema PostgreSQL, permissões de API, mídia, endpoint público, cache/invalidação distribuída, autenticação editorial e processos de publicação real. O `roadmap.md` marca expressamente **Payload CMS etapa 2 como pendente**.

---

## 4. INVENTÁRIO TERRITORIAL E REGRAS DE DADOS

### Estrutura comprovada

- `src/content/local/zonas.ts`: cinco macrozonas, introduções e seções editoriais.
- `src/content/local/regioes.ts`: registros de localidades, nomes, bairros, `href` de destino e `zona`.
- `src/content/local/delegacias.ts` e módulos importados `delegacias-extra*`, `delegacias-leste`, `delegacias-norte-centro`: dados de distritos policiais e relações.
- `src/content/types.ts`: tipos `Zona`, `Regiao`, `Delegacia`, `DelegaciaUnidade`, `ConteudoJuridico`, `Media`, `Autor`, `FAQ` etc.
- `src/routes/regioes.$slug.tsx`: página-pilar de macrozona com regiões filtradas por `zona`.
- `src/routes/delegacias.$slug.tsx`: **template único** para guias de delegacias.

### Regra de integridade territorial

1. **Nunca alterar os slugs existentes indiscriminadamente.** Alguns incluem prefixos `advogado-` e `advogado-criminal-`, legado de SEO. Planejar melhorias editoriais separadas de migração de URL; redirects apenas se aprovados.
2. Novas unidades devem ingressar **na coleção tipada**, na ordem central, no grafo de relações, nas regiões e na navegação; não criar página React duplicada por delegacia.
3. Diferenciar **número da unidade**, **denominação oficial verificada**, **referência territorial editorial** e **circunscrição oficial**.
4. Não inferir competência, jurisdição, endereço, telefone ou horário a partir de bairros. Campos sem evidência devem permanecer vazios e não renderizados.
5. `AGENTS.md` orienta preservação do grafo territorial e da ordenação central das DPs.
6. **[A VALIDAR]** números totais de unidades e páginas: o plano Lovable falava em 91, depois apresentou Centro 8 + Norte 16 + Leste 33 + Sul 26 + Oeste 9 = **92**. Esses números podem contar grandezas diferentes. Produzir relatório automatizado a partir dos dados locais, contar **DPs únicos**, **guias**, **regiões** e **links**, sem misturar métricas.
7. **[CONFIRMADO]** O `src/routes/index.tsx` calcula o campo `quantidade` dos cards de zona como `regioes.filter(r => r.zona === zona.slug).length`; o texto, contudo, diz **“guias publicados”**. É um defeito semântico: essa contagem é de **regiões registradas**, não necessariamente de delegacias ou guias únicos. Corrigir rótulo ou fonte da métrica.
8. **[CONFIRMADO]** Itaim Bibi está marcado `zona: "zona-sul"` em `regioes.ts`, apesar de aparecer em discussões editoriais da Oeste. **Não alterar automaticamente:** decidir a regra territorial única para o projeto e verificar impacto em hubs e breadcrumbs.
9. **[CONFIRMADO]** `roadmap.md` registra pendência de confirmação das denominações oficiais de unidades, porque algumas fontes oficiais não responderam adequadamente. Não remover esse status pendente apenas porque existem páginas publicadas.

### Critérios de aceite da integridade territorial

- Todos os IDs e slugs de delegacia são únicos.
- Todas as referências `regiaoSlug`, `zona`, `href` e `delegaciasRelacionadas` resolvem para registros reais.
- Números oficiais e seus nomes são marcados com fonte/data/status de verificação quando necessário.
- Cinco hubs de zona acessíveis e sem links mortos.
- Páginas existentes preservam H1, SEO, conteúdo e navegação funcional, salvo revisão editorial aprovada.
- Inventário gerado automaticamente acompanha cada lote de expansão.

---

## 5. AUDITORIA VISUAL — PROBLEMAS CONCRETOS

### Homepage `src/routes/index.tsx`

**[CONFIRMADO]** Implementada com cerca de 199 linhas, incluindo os blocos: hero Ponte Estaiada, cards de cinco zonas, bairros em destaque, quatro guias, artigos, participação profissional e pilares. O layout não corresponde integralmente à proposta artística aprovada; o código mostra que parte da implementação foi simplificada.

**Problemas demonstráveis:**

1. **Busca aparente, sem campo de busca:** a cápsula do hero é um componente `<Link to="/delegacias">` que **parece** uma barra de pesquisa, mas **não recebe consulta**. Decidir entre transformá-la em pesquisa funcional acessível ou reescrever texto/estética como navegação explícita, evitando affordance enganosa.
2. **Mesma fotografia nas cinco zonas:** todos os cards usam `ponteAsset.url` e só mudam `objectPosition`. Diferenciar imagens por zona, com direitos de uso, alt, tamanho e fallback.
3. **Bairros destacados por comparação exata:** `BAIRROS` é lista de strings e `regioes.find(r => r.nome === n)`. Nomes como `Lapa` podem não encontrar `Lapa e Vila Romana`; itens simplesmente desaparecem. Substituir por IDs/slugs curados e validados.
4. **Guias destacados também por comparação exata:** `GUIAS = ["Vila Romana", "Pinheiros", "Perdizes", "Jardins"]`, embora em `regioes.ts` apareça `Lapa e Vila Romana`. A seleção não deve depender de nomes editáveis.
5. **Números/rótulos do card regional:** contagem de regiões apresentada como quantidade de guias; corrigir fonte e nomenclatura.
6. **Seção editorial depende do Payload:** quando artigos não estiverem conectados, o bloco pode mostrar erro ou grid vazio. Definir estado vazio editorial elegante e não inventar três artigos.
7. **Seção “Explore instituições jurídicas” planejada pelo Lovable:** não aparece na versão do arquivo lida nesta auditoria. **Não presumir que foi implementada**; criar componente conforme o design aprovado, com páginas reais ou cartões não clicáveis de “em preparação”.
8. **Textos e tokens de contraste:** `.home-light` define superfícies claras apenas dentro da home, enquanto cabeçalho, rodapé, `PageHero` e cards compartilhados permanecem no tema escuro. Planejar transição visual sistêmica, sem alternâncias acidentais.

### Design system `src/styles.css`

**[CONFIRMADO]** O tema global original usa preto/grafite/marfim/dourado, tipografia Cormorant Garamond + Manrope. A homepage introduziu `.home-light` com navy/creme/dourado, porém a mudança não permeou templates internos.

**[PROPOSTA]** Consolidar tokens semânticos por superfície/contexto (`--surface-canvas`, `--surface-elevated`, `--text-primary`, `--brand-navy`, `--accent-gold`, `--border-subtle`), mantendo compatibilidade com Tailwind 4. Definir variantes visualmente consistentes de header, footer, hero, cards, botões, badges, breadcrumbs e estados vazios. Migrar gradualmente; evitar `find-replace` de cores em todo código.

### Componentes existentes que devem ser reaproveitados

- `SiteHeader`: navegação desktop/mobile, atualmente estilizada para tema escuro.
- `SiteFooter`: institucional, avisos de independência, links.
- `Brand`: logotipo textual e assinatura de marca — requer ajuste de identidade.
- `Container`, `Section`, `SectionHeading`, `ActionLink`: primitivas de layout.
- `PageHero`: template genérico **sem imagem de fundo**, excelente ponto de extensão para heros territoriais.
- `RegiaoCard`, `ZonaCard`, `ConteudoCard`: componentes reutilizáveis cuja aparência pode ser refatorada.
- `Breadcrumbs`, `PaginaInstitucionalView`: manter estrutura, adicionar variantes se necessário.

---

## 6. DIREÇÃO DE DESIGN APROVADA

### Conceito

**“São Paulo, território por território.”** Um portal metropolitano, editorial, moderno, elegante, legível e claramente independente. Design institucional, não um site de escritório particular; não usar imagens clichês de martelo, balança, grades policiais, notas de dinheiro ou retrato do antigo advogado como elemento institucional da marca.

### Paleta de referência [DECISÃO DO PRODUTO]

- Azul-marinho profundo — referência `#101B2B`.
- Superfície creme/marfim — referência `#F4F1EB`.
- Dourado discreto — referência `#C8A66A`.
- Neutros claros, cinzas frios e texto de leitura com contraste adequado.

Os valores acima são **direção estética**, não substituição automática dos tokens atuais. Mapear à escala semântica de Tailwind e testar contraste WCAG. Evitar excesso de dourado, gradientes artificiais e estética de escritório genérico.

### Tipografia

- Títulos: serifada editorial sofisticada; o projeto já carrega **Cormorant Garamond**.
- Interface e corpo: sans-serif de alta legibilidade; já usa **Manrope**.
- Escala tipográfica fluida, linhas confortáveis, margens generosas, headings semanticamente ordenados.

### Homepage desejada — ordem de implementação

**P0 — valor acima de tudo**

1. **Header metropolitano:** assinatura editorial consistente, navegação clara, menu mobile testado.
2. **Hero cinematográfico:** imagem real/licenciada da Ponte Estaiada (pode combinar com MASP/Paulista no acervo), overlay para legibilidade, título “São Paulo, território por território.”, texto editorial e navegação/busca com comportamento verdadeiro.
3. **Cinco zonas:** cartões com imagens territoriais apropriadas, nome, descrição, quantidade corretamente denominada, link para hub.
4. **Bairros em destaque:** links por ID/slug, não por comparação textual.

**P1 — completar home**

5. **Explore instituições:** categorias Delegacias, Fóruns, Cartórios, INSS, Órgãos Fiscais, Outras Instituições; somente com link onde a rota existir.
6. **Guias de delegacias destacados:** quatro cards de destinos existentes, seleção por slug, sem promessa de assistência.
7. **Artigos e orientações:** loader Payload existente, estados loading/empty/error dignos, autoria verificável.
8. **Participação profissional:** institucional, levando para `/profissionais`, sem captação de causas.
9. **Pilares:** informação jurídica, transparência, privacidade, projeto independente.

### Requisitos de interface

- Responsivo desde 320 px; testar 375, 768, 1024, 1440 e 1920 px.
- Sem overflow horizontal, clipping no hero, contraste ilegível ou botões falsos.
- Navegação por teclado, foco visível, labels, alt descritivo e suporte a `prefers-reduced-motion`.
- Boas métricas Core Web Vitals; otimizar imagem hero (LCP), dimensões, tamanhos responsivos e carregamento das imagens abaixo da dobra.
- Usar animação discreta somente após layout estável.
- Reunir imagens e créditos em um catálogo; não replicar uma única foto nas cinco regiões.

---

## 7. SISTEMA DE HEROS TERRITORIAIS E BANCO DE IMAGENS

**[DECISÃO DO PRODUTO]** Em páginas internas, reutilizar imagens quando houver pertinência e usar acervo real de São Paulo. Exemplos desejados: Parque Ibirapuera, monumento Borba Gato, Vale do Anhangabaú, shoppings, Terminal Rodoviário Tietê, aeroportos Guarulhos e Congonhas, Mercado Municipal, Pinacoteca, Faria Lima, Museu do Ipiranga, Praça da Sé, Estação da Luz, Liberdade, Edifício Altino Arantes/Banespa, Theatro Municipal, Avenida Paulista/MASP, Metrô, Pátio do Colégio, Shopping Aricanduva, USP Butantã, terminais João Dias e Cidade Tiradentes.

### Contrato sugerido `TerritorialHero`

**[PROPOSTA]** Um componente reutilizável suporta `variant = 'metropolitan' | 'zone' | 'district' | 'institution' | 'editorial'`, com `eyebrow`, `title`, `description`, `breadcrumbs`, `media`, `overlay`, `focalPoint`, `credits`, `action?`. Não atrelar seu design ao número de DP ou ao nome da página.

### Registro de imagem no Pauload (futuro) ou manifesto tipado local (agora)

Campos: `id`, `title`, `src`, `alt`, `credit`, `license`, `sourceUrl`, `zoneSlugs[]`, `neighborhoodSlugs[]`, `institutionSlugs[]`, `landmarkType`, `focalPointDesktop`, `focalPointMobile`, `width`, `height`, `reviewStatus`.

**Regra de fallback:** mídia específica da página → mídia do bairro → mídia da zona → mídia genérica da capital. **Não** escolher imagem geograficamente enganosa só por ser atraente. Créditos e licenças devem ser rastreáveis; não baixar fotos protegidas indiscriminadamente. Fotos de fachadas de DPs necessitam confirmação de correspondência com a unidade.

**Metas técnicas:** responsividade `<picture>`/`srcset` ou recurso equivalente compatível, formatos otimizados onde possível, dimensões explícitas para evitar CLS, tratamento de erro/fallback, prioridade apenas para hero inicial, lazy loading nas demais.

---

## 8. PERFIS DE ADVOGADOS — PROPOSTA FUTURA, NÃO PUBLICAR ANTES DE VALIDAÇÃO

**[DECISÃO DO PRODUTO]** Perfis factuais de profissionais independentes poderão aparecer em páginas territoriais e institucionais, após confirmação de inscrição, consentimento, políticas e análise regulatória. A **Banca Paulista não coleta demandas nem intermedeia contato**, e não funciona como escritório.

### Separação de responsabilidades

- **Pauload/Payload CMS:** backend editorial; pode futuramente gerenciar registros aprovados dos perfis e vínculos territoriais, com publicação moderada.
- **Portal TanStack:** exibe diretório/cards, filtros e páginas/perfis conforme dados aprovados.
- **WordPress auxiliar:** apenas plugin/widget de WhatsApp e sua administração. **Não criar `Custom Post Type advogados` nem um segundo cadastro-mestre no WP por padrão.**
- **WhatsApp:** link final leva **diretamente ao número profissional próprio**; nunca a atendimento central do portal.

### Modelagem sugerida para futuro cadastro, sujeita a validação

`ProfessionalProfile`: `id`, `slug`, `publicName`, `oabUf`, `oabNumber`, `verifiedAt`, `photo`, `declaredPracticeAreas[]`, `serviceZones[]`, `serviceNeighborhoods[]?`, `contactUrl`, `whatsappWidgetId?`, `status`, `consentVersion`, `updatedAt`, `publishedAt`.

`CoverageSubscription` ou entidade comercial **separada do ranking**: `professionalId`, `planId`, `coverageZoneSlugs[]`, `startAt`, `endAt`, `status`. Política de publicação não deve ser deduzida apenas de cobrança; precisa de verificação e consentimento.

`InstitutionalAssociation`: `professionalId`, `pageId`, `associationBasis`, `approvedAt`, `active`. **Associação editorial/territorial não afirma parceria ou vínculo oficial com a delegacia.**

`WhatsAppWidgetMap`: `professionalId`, `provider`, `widgetId`, `publicEmbedUrl?`, `fallbackWaMeUrl`, `verifiedAt`, `status`.

Nunca gravar conteúdo das conversas do WhatsApp no portal.

### Ordenação [DECISÃO DO PRODUTO]

1. Filtros de elegibilidade primeiro: publicação ativa, identidade validada, região coberta, categoria/área declarada.
2. Visão padrão **rotativa**, com distribuição equilibrada e verificável. Random puro não é garantia de equidade; preferir embaralhamento determinístico por janela ou rodízio auditável.
3. Aba alternativa **A–Z**, ordenação `pt-BR` estável, sem preço ou suposta qualidade como critério.
4. **Preço do plano não aumenta peso, classificação ou posição.**
5. SSR e hidratação: retornar ordem consistente por resposta (evitar `Math.random()` divergente entre servidor e cliente); especificar seed/janela e testes para equidade.
6. Labels transparentes: “Ordem rotativa” e “Ordem alfabética”; não chamar a lista de “melhores”, “mais recomendados” ou “ranking de qualidade”.

### Planos comerciais em estudo [NÃO ATIVAR COMO APROVAÇÃO OAB]

- Cobertura **de uma zona:** referência proposta de **R$ 250**.
- Cobertura **das cinco zonas:** referência proposta de **R$ 1.000**.
- Expansão para tipos adicionais de página (bairros, delegacias, outras instituições): preço/contrato a definir.
- Valor remunera disponibilidade de publicação, infraestrutura, atualização e abrangência territorial, **não posição, contratação, contato capturado, encaminhamento ou êxito**.
- **[A VALIDAR JURIDICAMENTE]** Política de cobrança por perfis publicados em páginas de delegacias/plantão e linguagem das chamadas, à luz das normas e entendimentos OAB aplicáveis. A rotação ajuda na transparência, mas não constitui autorização regulatória.

### Cards de WhatsApp e páginas sensíveis

- Bloco discreto após a informação institucional; dados do profissional claramente identificados, OAB visível, especialidade/atuação declarada.
- Botão **“WhatsApp direto do advogado”** e link **“Ver perfil”**; ambos com destino explícito.
- A página de plantão **não pode indicar atendimento 24 h, disponibilidade agora ou proximidade física** sem comprovação atual e consentida.
- O portal não exibe botão único que sugira que seleciona ou distribui advogados por conta própria.
- **[A VALIDAR]** Identidade e versão do plugin de WhatsApp no WordPress, capacidade de incorporar widget por ID em site externo, URL de script/embed, termos de licença, CORS/CSP, performance, consentimento de cookies e fallback direto. A menção anterior a “Elfsight WhatsApp Chat — versão local 1.2.0” não foi auditada neste repositório e precisa ser confirmada na instalação real.

### Topologia de domínio — definir antes de implementar

A ideia de hospedagem auxiliar `advogados.bancapaulista.org` para WP **pode conflitar** com a estratégia de perfis em subdomínios individuais; diferenciar DNS/hostnames de widgets, perfis e frontend. Duas abordagens possíveis para discussão técnica:

- **Preferência pela simplicidade:** WordPress auxiliar em `widgets.bancapaulista.org` (ou subdomínio administrativo reservado), perfis em `/advogados/:slug` no portal.
- **Se o produto exigir subdomínios pessoais:** definir wildcard DNS/Cloudflare e roteamento de host (`:slug.advogados.bancapaulista.org` ou outra convenção) como projeto próprio, com SEO/canonicals/SSL e isolamento de conteúdo.

**Não criar DNS, subdomínios ou redirects sem aprovar a convenção final.**

---

## 9. CMS PAULOAD E ARTIGOS

**[CONFIRMADO]** A camada de artigos já existe com fluxo de leitura via servidor, filtros Zod, contrato com Payload, checagem `_status=published`, opções de cache condicionado a revisão e validação de URL.

### Próxima etapa real de integração

1. Validar instância e rota pública de API no VPS (autenticação anônima estritamente para conteúdo publicado).
2. Validar esquema e rich text Lexical utilizado; imagens, autoria, SEO, paginação e filtros.
3. Configurar variáveis no ambiente do Workers e no `.env` local **sem commitar segredos**.
4. Criar fixtures/testes de contrato servidor↔Payload e estratégia de indisponibilidade sem vazar rascunhos.
5. Usar rastreio de status da publicação; cache em edge só com mecanismos de revisão coerentes, conforme `AGENTS.md`.
6. Migrar outros tipos editoriais gradualmente **sem eliminar registros territoriais tipados antes de garantir equivalência**.
7. Construir fluxos de publicação: rascunho → revisão → aprovado → publicado → revisão periódica/arquivamento, com autoria e fontes.

### Editorial planejado

- Hub de delegacias e guias sobre intimação, direitos fundamentais em procedimentos policiais, delegacias e plantões.
- Expansão para cartórios, fóruns, INSS e outros órgãos **por etapas**, cada qual com esquema de dados próprio e disponibilidade editorial verificada.
- Núcleo de artigos sobre conflitos online, injúria, calúnia, difamação, ameaças, coação e jurisprudência, com fontes e prudência jurídica. Casos pessoais devem preservar privacidade, dados processuais protegidos, distinção entre alegação e decisão judicial e direitos de resposta. Não inventar jurisprudência.
- Criação de páginas de bairro deve responder a uma intenção editorial diferenciada, evitando thin content e páginas apenas com troca de nome de local.

---

## 10. SEO TÉCNICO, DADOS ESTRUTURADOS E CUIDADOS DE MIGRAÇÃO

**[CONFIRMADO]** `src/lib/seo.ts` gera `pageMeta`, canonical, JSON-LD para Organization/WebSite/Article/FAQPage/BreadcrumbList e metadados das delegacias. `src/routes/__root.tsx` inclui metadata geral e JSON-LD.

### Auditorias P0

- Revisar nomes em `src/content/local/settings.ts`, `src/lib/seo.ts`, `<title>`, OG `site_name`, JSON-LD, marca do header/footer.
- Revisar origem `DEFAULT_SITE_ORIGIN` e política `PUBLIC_SITE_URL` para evitar URLs absolutas antigas do Lovable.
- Verificar `canonical` real no HTML renderizado (não apenas no fonte), previews sociais e URLs de artigo/DP.
- Verificar que o schema de **Organization/WebSite**, e não um `LegalService` incorreto da própria Banca Paulista, representa o operador editorial. `Attorney`/`LegalService` só para perfis individuais verificados e conforme uso correto.
- Validar sitemap, robots, páginas 404/410, redirecionamentos e política de indexação da homologação.
- Manter URLs históricas em mudanças de design; mudança de slug deve ser decisão SEO separada com 301 mapeado.
- Não publicar conteúdo operacional de delegacias sem fonte oficial verificável; dados não confirmados ficam ausentes ou explicitamente pendentes.
- Evitar `FAQPage` com perguntas falsas, testemunhos artificiais, números inventados, duplicações programáticas e promessas comerciais.

### SEO geográfico escalável

- Hub de zona → páginas institucionais relevantes → unidades correlatas → artigos técnicos → páginas de bairros quando houver conteúdo distintivo.
- Cada entidade terá ID imutável, slug, título, descrição única, status editorial, localização e relações.
- Separar intenção de **informação sobre a delegacia** da busca por **profissionais na região**; não assumir vínculo entre advogado e unidade policial.
- Sitemap indexa apenas páginas publicadas e destinadas à indexação; previews/drafts/homologação ficam fora.
- Acessibilidade e performance são parte do SEO e da qualidade de produto.

---

## 11. ARQUITETURA DE FRONTEND SUGERIDA (SEM MIGRAÇÃO MASSIVA)

### Estado atual observado

```
src/
  routes/
    __root.tsx
    index.tsx
    regioes.$slug.tsx
    delegacias.$slug.tsx
    profissionais.tsx
    plantao-criminal.tsx
    ...
  components/site/
    header.tsx
    footer.tsx
    brand.tsx
    blocks.tsx
    primitives.tsx
    ...
  content/
    repository.ts
    types.ts
    articles.functions.ts
    payload-transport.ts
    local/
      zonas.ts
      regioes.ts
      delegacias.ts
      settings.ts
      paginas.ts
      ...
  lib/
    seo.ts
    public-url.ts
    ...
  styles.css
  server.ts
```

### Proposta evolutiva

Não reorganizar tudo antes de ter testes. Implementar por extração incremental:

```
src/components/
  layout/           # shell, cabeçalho, rodapé, navegação (futuro)
  ui/               # primitives/tokens reutilizáveis (futuro)
  territory/        # zone cards, territorial hero, breadcrumb, relações (futuro)
  editorial/        # article cards, author/citation, estados vazios (futuro)
  professionals/    # futuro: cards, ordenação, filtros, contact widget
src/content/
  ...               # manter repositório existente como contrato
src/lib/
  ...               # preservar SEO/origin e transporte
```

**Preferência:** componentizar por comportamento/contrato validado, **não** multiplicar diretórios vazios nem reescrever código só para parecer organizado. Arquivos atuais podem continuar onde estão enquanto versões extraídas são testadas.

### Interfaces com APIs

- Dados de zona/DP: `ContentRepository`, sem JSX com conjuntos paralelos de slugs.
- Artigos: servidor TanStack Start, read-only, Payload REST validado.
- Perfis futuros: contrato formal separado, evitando criar end-point de casos.
- WordPress: somente integração de widget/ID ou link direto, sem login do WP no frontend.
- Infra Cloudflare: tratar SSR, cookies, cache e variáveis segundo runtime real; não importar `fs` ou pacotes Node na execução edge.

---

## 12. SEGURANÇA, PRIVACIDADE E CONFORMIDADE

1. **Não coletar casos jurídicos no portal.** `AGENTS.md` prevê HTTP 410 para intake legado sem leitura ou log do conteúdo submetido; preservar e testar.
2. Secrets de Payload/Cloudflare/GitHub/WordPress fora do Git, logs e payloads de analytics.
3. Restringir CMS a artigos publicados; validar qualquer resposta externa antes de renderização/cache.
4. Monitorar CSP/headers, links externos seguros, XSS em Lexical, upload de imagens, SSR errors e dependências.
5. LGPD: dados profissionais têm proteção de dados, consentimento/expectativa de publicação e canal de atualização/retirada; não armazenar conversas do WhatsApp.
6. Não usar cookies ou scripts de widget de terceiros sem avaliar finalidade, consentimento quando aplicável, impacto de desempenho e política de privacidade.
7. OAB: submeter telas, copy, localização dos cards, contrato de assinatura, algoritmos de exibição, perfis e WhatsApp para análise específica; não apresentar solução técnica como parecer jurídico definitivo.
8. Não afirmar vínculo entre portal, delegacias e advogados; separar operador editorial, instituição e profissional.

---

## 13. QUALIDADE: TESTES QUE O CODEX DEVE CONSTRUIR

**[CONFIRMADO]** `package.json` não possui `npm test` nem `typecheck` configurados. **[PROPOSTA]** Após inspeção do repositório, implementar uma base de testes alinhada à stack, com ferramentas compatíveis, apenas se necessário. Preferir uma estrutura mínima eficaz a adicionar frameworks redundantes.

### Matriz recomendada

| Camada | Cenário | Falha que evita |
|---|---|---|
| Build | `npm run build` | Incompatibilidade TanStack/Nitro/Workers |
| Lint | `npm run lint` | Regressões de código e hooks |
| Tipagem | `npx tsc --noEmit` (confirmar tsconfig) | Contratos e refs inválidos |
| Território | Slugs, IDs, zones, `href`, duplicações, grafo | Links e hubs quebrados |
| Homepage | cinco zonas, navegação e contagem correta | Informação enganosa |
| SEO | canonical, OG, meta, schema por rota | Canonical para domínio antigo |
| SSR | renderização de `/`, zonas, DP, artigos | Erros 500/hidratação |
| Responsivo | 320–1920 px; captura desktop/mobile | Corte, overflow e layout quebrado |
| A11y | teclado, foco, alt, semântica, contraste | Falhas de navegação |
| CMS | publicado/rascunho, cache, indisponibilidade | Vazamento de rascunho e erro no edge |
| Diretório futuro | rotação estável, A–Z, elegibilidade | Posição paga disfarçada |
| WordPress futuro | embed/id/fallback/sem cookie inesperado | Contato quebrado e scripts invasivos |
| Smoke Cloudflare | páginas públicas, headers, 404/410, redirects | Deploy aparentemente verde e app quebrado |

Para comparação visual: usar screenshots de referência aprovados pelo responsável. Nenhuma alteração visual é considerada final sem capturas comparativas em desktop e mobile.

---

## 14. BACKLOG PRIORIZADO PARA CODEX

### P0 — antes do primeiro redesign

- [ ] Clonar repo; verificar `git status`, commit SHA, branch e remote; executar install/build/lint.
- [ ] Registrar baseline visual atual em capturas desktop/mobile e anotar páginas críticas.
- [ ] Criar branch `codex/banca-redesign` sem tocar no histórico de `main`.
- [ ] Inventariar rotas, scripts reais, assets, tokens e páginas conectadas ao backend.
- [ ] Auditar `README.md` legado, marca institucional e origem URL; elaborar proposta de correção segura.
- [ ] Validar `PUBLIC_SITE_URL` e `DEFAULT_SITE_ORIGIN`; evitar canonical antigo em homologação.
- [ ] Identificar inconsistências de contadores e referências de zona; produzir relatório antes de alterar conteúdo.

### P1 — home com fidelidade à referência

- [ ] Consolidar tokens e tema metropolitano, mantendo header/footer funcionais.
- [ ] Hero aprovado: imagem, enquadramento, overlay, H1, CTA **honesto/funcional**.
- [ ] Cinco cards de zona com fotos próprias, contagens semanticamente corretas e links.
- [ ] Bairros e guias por IDs/slugs confiáveis, não por nome de exibição.
- [ ] Seções de instituições/artigos/pilares/participação, com estados reais.
- [ ] Responsividade, acessibilidade, screenshots, lint/build.
- [ ] Abrir PR da homepage; aprovar antes de alterar layouts internos.

### P2 — redesign de páginas internas

- [ ] Estender `PageHero` com imagens territoriais/fallback sem destruir o template existente.
- [ ] Converter header/footer para identidade da home preservando links.
- [ ] Aprimorar template de delegacia com informações verificadas, leitura, FAQ, interlinks.
- [ ] Uniformizar hubs das cinco zonas e institucionais, mantendo URL/metadata.
- [ ] Biblioteca de imagens licenciadas: São Paulo por regiões, bairros, instituições.
- [ ] Verificação visual mobile, tablet e desktop para todas as famílias de página.

### P3 — integração editorial e expansão

- [ ] Validar Pauload e contratos já implementados; integrar artigos reais com publicação segura.
- [ ] Fluxo editorial, mídia, autoria, SEO e revisão de publicações.
- [ ] Estruturar novas famílias (cartórios, fóruns, INSS etc.) apenas com conteúdo e dados verificados.
- [ ] Incrementar delegacias por lote com inventário e testes de grafo.
- [ ] Adicionar rastreamento de qualidade e analytics não invasivos.

### P4 — diretório profissional condicionado à liberação

- [ ] Validar modelo jurídico/comercial e textos contratuais.
- [ ] Definir cadastro mestre, campos públicos e política de verificação OAB.
- [ ] Prototipar cards, ordem rotativa e A–Z com SSR consistente.
- [ ] Validar plugin WordPress/widget por ID e link direto de WhatsApp.
- [ ] Definir URLs de perfil/subdomínios e SEO conforme decisão de produto.
- [ ] Publicar módulo somente com aprovação jurídica, testes e perfis consentidos.

---

## 15. PLANO DE ENTREGA EM MARCOS (COMMITS/PRS)

**Marco 0 — Baseline:** nenhum redesign. `docs/audit-2026-10.md`, inventário de URLs/assets, resultados dos comandos e capturas. **Aceite:** o responsável sabe exatamente o que está preservado e o que está quebrado.

**Marco 1 — Design system + shell:** tokens, cabeçalho, rodapé, tema, componentes base. **Aceite:** home e páginas internas não sofrem regressão; mobile funcional.

**Marco 2 — Homepage:** hero + cinco regiões + bairros/guias + editoriais. **Aceite:** fidelidade visual, comportamento real, sem links mortos, build/lint/tipagem.

**Marco 3 — Heros internos:** imagem contextual e fallback por zona/instituição. **Aceite:** no mínimo um hub por zona e três páginas de DP inspecionadas nos três breakpoints; restantes verificadas por template.

**Marco 4 — SEO e nomenclatura:** marca pública, origens, canonical, OG, JSON-LD e redirects conforme aprovação. **Aceite:** URLs corretas e nenhuma referência indevida ao site legado.

**Marco 5 — Pauload real:** endpoint de artigos e publicação controlada. **Aceite:** conteúdo publicado aparece, rascunhos não, falha CMS é tratada.

**Marco 6 — Expansão institucional:** schema genérico e primeiro lote com conteúdo verificado. **Aceite:** páginas distintas, índices atualizados, sitemap e grafo válidos.

**Marco 7 — Profissionais e WhatsApp:** protótipo condicionado; implementação pública posterior. **Aceite:** requisitos regulatórios, privacidade e teste de widgets satisfeitos.

### Estratégia Git

- Branch a partir de `main` atual: `codex/banca-redesign` (ou branches de escopo menores quando conveniente).
- Commits pequenos, mensagens descritivas; PR por marco; revisão de diff antes de merge.
- Proibido reescrever histórico sincronizado ao Lovable; não usar force-push.
- Deploy de homologação somente após aprovar diff e testes, sem trocar domínio definitivo ou alterar infraestrutura de produção automaticamente.
- Antes de mudanças de deploy, identificar o pipeline real (GitHub Actions/Cloudflare/etc.); **não pressupor** automação apenas porque o deploy anterior funcionou.

---

## 16. PRIMEIRO PROMPT A SER ENVIADO AO CODEX WINDOWS

Copiar/colar após abrir a pasta clonada do repositório e disponibilizar a imagem de referência:

> **Projeto:** Banca Paulista. Repositório local proveniente de `paulorodeo/lawsp`. Leia primeiro o arquivo `RELATORIO_MESTRE_BANCA_PAULISTA_CODEX_2026-10-14.md`, o `AGENTS.md`, `roadmap.md`, `package.json`, `README.md`, `src/routes/index.tsx`, `src/styles.css` e os componentes compartilhados. **Não recomece a aplicação.** O objetivo é reconstruir o design metropolitano preservando rotas, conteúdo territorial, metadados SEO, ContentRepository, contrato Payload e compatibilidade com Cloudflare Workers. Verifique o estado do Git e trabalhe em `codex/banca-redesign`, sem reescrever histórico. Na primeira execução, **não edite código**: faça inventário de rotas e arquivos, rode os comandos existentes, documente problemas comprovados, identifique discrepâncias deste relatório e proponha um primeiro PR pequeno para homepage/design system. Não crie cadastro de advogados, captação de causas, novo CMS WordPress ou integração de pagamento. Aguarde aprovação para implementar.

**Segundo prompt (após aprovar a auditoria):**

> Implemente somente o Marco 1 — tokens/design system e shell — de acordo com a imagem de referência. Preserve todas as rotas e os dados. Execute lint/build e teste responsividade. Mostre diff dos arquivos modificados, riscos e capturas antes de continuar à homepage. Não faça deploy sem autorização.

**Terceiro prompt (após aprovar o shell):**

> Implemente somente o Marco 2 — homepage. Corrija a falsa busca, seletores por nome frágil, contagem de guias/regiões e fotos duplicadas, obedecendo ao visual aprovado. Reutilize ContentRepository, nada de conteúdo fictício. Teste desktop e mobile e apresente capturas para aprovação.

---

## 17. QUESTÕES QUE EXIGEM DECISÃO EXPLÍCITA DO RESPONSÁVEL

| Questão | Opções/impacto | Status |
|---|---|---|
| Marca pública | “Banca Paulista” vs “Banca Paulista de Advogados”/“Plantão e Defesa Criminal” | Aprovação editorial + análise jurídica |
| Domínio final | momento de ativação e estrutura de subdomínios | Adiado |
| Canonical em homologação | `noindex`/origem, após verificar configuração atual | Auditoria P0 |
| Busca do hero | busca real por zona/bairro/DP ou CTA de navegação claramente identificado | Decidir no redesign |
| Imagens | assets próprios/licenciados por região, focal point e crédito | Montar acervo |
| Contadores | regiões cadastradas vs guias vs DPs únicos | Definir métrica e testar |
| Localidade Itaim Bibi | regra editorial de zona e links associados | Validar dados atuais |
| Conteúdo artigo | Payload real, autoria, fontes, licenças | Integração pendente |
| Plugin WordPress | fornecedor real, ID, embed externo e licenciamento | Teste obrigatório |
| Perfis de advogados | cadastro, URL, contratos, OAB, políticas | Não publicar até validação |
| Pricing | uma zona R$ 250, cinco zonas R$ 1.000 | Hipótese comercial, não permissão regulatória |
| Conexão Git-Lovable | quando desativar ou manter sincronização | Confirmar fluxo antes de merge |

---

## 18. DEFINITION OF DONE — CRITÉRIOS GERAIS

Uma tarefa só está “concluída” quando:

1. O diff foi revisado e está estritamente dentro do escopo aprovado.
2. `npm run build` e `npm run lint` (ou problemas preexistentes documentados) foram executados; tipagem e testes adicionais conforme disponíveis.
3. Rotas existentes, links, H1, metadata, SSR, 404/410 e relações territoriais não regrediram.
4. O layout foi comparado com referência desktop e mobile; não há overflow ou elementos enganosamente interativos.
5. Dados não verificados não foram inventados nem apresentados como institucionais.
6. O CMS e Cloudflare permanecem compatíveis; não houve novos segredos expostos.
7. A documentação foi atualizada, inclusive decisões e pendências, sem reintroduzir especificações do antigo escritório.
8. Commit/PR é reversível, sem reescrever histórico nem publicar automaticamente em produção.
9. Recursos envolvendo advogados/WhatsApp estão atrás de validação jurídica e testes de consentimento/integração.
10. O responsável aprovou a entrega antes de iniciar o próximo marco.

---

## 19. RESUMO OPERACIONAL PARA O CODEX

**Preservar:** stack TanStack/React/TS/Tailwind; ContentRepository; zonas; todos os slugs e dados dos DPs; relações de território; artigos via funções de servidor; política de segurança da publicação; compatibilidade Cloudflare; histórico Git.

**Reconstruir:** homepage metropolitana; identidade visual uniforme; design system; header/footer; heros internos contextualizados; componentes de navegação e cards; UX e responsividade.

**Corrigir:** documentação `README.md` do antigo projeto; marca/metadados inconsistentes; `DEFAULT_SITE_ORIGIN` legado; cápsula de busca não funcional; fotos repetidas; seletores frágeis por nome; contadores com nomenclatura errada; estados vazios; inventário SEO e territorial.

**Expandir depois:** Pauload real; biblioteca de mídia territorial; hubs institucionais e bairros de qualidade; artigos; páginas de DP em lotes; diretório de profissionais independentes com ordenação rotativa/A–Z e WhatsApp direto, se juridicamente validado.

**Nunca fazer por inferência:** criar vínculo com delegacias, atribuir status de especialista/plantonista, inventar dados operacionais, distribuir casos, instituir ranking pago, transformar WordPress em segundo backend editorial, renomear slugs ou mudar domínio de produção sem autorização.

**Conclusão:** o melhor projeto futuro não é um “novo site” separado do legado; é a **Banca Paulista redesenhada sobre os contratos, rotas e dados que já existem**, com execução por marcos verificáveis no Codex.
