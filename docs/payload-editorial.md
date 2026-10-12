# Payload editorial — Etapa 1

## Estado e limites
O portal TanStack Start está preparado para consultar Payload 3.x via REST na camada de servidor da Cloudflare. Nenhuma instância do Payload está conectada ou validada. Payload, seu runtime Next.js e PostgreSQL pertencem ao VPS; não instalar Payload core neste frontend. A versão exata será fixada após inspeção do projeto/dependências do VPS. Lexical é a direção técnica aprovada.

O design, as cinco zonas, 34 delegacias, regiões, slugs e interlinks continuam locais. Autores e profissionais não foram inventados. Fixtures de testes não são publicadas.

## Configuração central por ambiente
Configure variáveis **server-side**, nunca com prefixo `VITE_`:

| Variável | Função | Padrão |
|---|---|---|
| PAYLOAD_API_URL | Origem HTTPS real do CMS (sem `/api/articles`) | ausente: conteúdo local legítimo |
| PAYLOAD_PUBLIC_API_PATH | Coleção REST de artigos | `/api/articles` |
| ARTICLES_CACHE_TTL | TTL em segundos, de 1 a 300 | 60 |
| PAYLOAD_TIMEOUT_MS | Timeout, de 1 a 15000 ms | 5000 |
| ARTICLES_CACHE_NAMESPACE | Versão da chave de cache para invalidar todas as variantes | `v1` |
| PUBLIC_SITE_URL | Origem HTTPS pública definitiva para canonical | origem publicada existente: `https://lawsp.lovable.app` |
| PAYLOAD_REVISION_PATH | Endpoint autoritativo de revisão editorial no VPS | ausente: Cache API desativada no portal |

O fallback público é o endereço publicado existente; nenhuma origem do CMS foi inventada. `VITE_CMS_API_URL` do adaptador antigo não é mais utilizada. Migrar sua configuração para `PAYLOAD_API_URL` se ela existir. Development permite CMS HTTP apenas em localhost/127.0.0.1 e funciona sem Cache API; staging deve usar CMS separado e seu domínio público; production requer URL real, permissões revisadas e backups. Sem `PAYLOAD_API_URL`, artigos locais aprovados permanecem. Com ela, **nenhuma falha retorna conteúdo local como sucesso**.

Não pré-renderizar páginas editoriais em HTML permanente sem uma estratégia de atualização/retirada. O portal atual usa SSR. Respostas RPC são `no-store`; o cache público dos dados é controlado internamente.

## Contrato REST de artigos
Collection slug padrão `articles`. Resposta de listagem: `{docs, page, totalPages, totalDocs}`. Payload 3 com `versions: { drafts: true }`. `_status` nativo é a única autoridade (`draft` / `published`); não criar outro campo `status` paralelo.

Campos obrigatórios de documento público:
- `id`: string/número; `title`: texto; `slug`: slug único minúsculo, hífens, até 160 caracteres.
- `excerpt`: texto; `publishedAt`: data ISO com horário/fuso, preenchida legitimamente ao publicar.
- `_status`: `published`.
- `content`: JSON Lexical `{root: {type: "root", children: [...]}}`.

Campos opcionais:
- `updatedAt`: data ISO do Payload.
- `cover`: upload populado `{id,url,alt,width?,height?,caption?}`.
- `category`: relação populada `{slug,title}`.
- `author`: relação populada `{name,bio?,photo?,oab?}`. Só autores reais autorizados; sem autor, a página/schema não atribui autoria fictícia. Expor somente perfil público, não relacionamento direto com usuários administrativos.
- `seo`: `{title?,description?,canonical?,socialImage?}`. `socialImage` tem formato de upload. Canonical recebido não é usado: o portal o gera no domínio público. O compartilhamento usa a mesma capa HTTPS exibida no artigo; imagem social diferente permanece no contrato, mas não substitui a capa nas tags.
- `regions`, `delegacias`, `bairros`, `themes`: arrays de `{slug}`. Referências são validadas contra o registro local. Regions = slugs de `regioes.ts`, delegacias = slugs existentes, themes = slugs de áreas locais, bairros = nomes locais normalizados sem acentos, minúsculos e com hífens. Não migrar o território para o CMS nesta etapa. Estas referências podem ser arrays de grupos com campo slug, sem criar cópias territoriais no banco.

`/api/categories` retorna `{docs: [{slug,title}]}` (máximo inicial 100 categorias; expansão exige paginação desta coleção). API pública de categorias NÃO depende de drafts. O editor deve criar a coleção correspondente; títulos/categorias não são inventados no frontend.

O adaptador `payload.ts` converte inglês para `ConteudoJuridico` e valida dados com Zod. Campos extras administrativos são descartados. Media relativa é resolvida contra a origem CMS. Imagens precisam de alt; tamanhos e legenda são opcionais. Uploads Lexical devem vir populados (`depth=2`).

## Consulta e segurança no VPS
Artigos: `GET /api/articles?page=1&limit=12&sort=-publishedAt&depth=2&draft=false&where[_status][equals]=published`. Filtro por categoria: `where[category.slug][equals]`. Detalhe: filtro de `slug`, `limit=1`. Limite por página no portal: 1–24. Só duas ordenações permitidas.

A consulta também é validada no portal, mas **não substitui access control do Payload**. Na coleção, configurar conceito equivalente a:

```ts
versions: { drafts: true },
access: {
  read: ({ req: { user } }) => user
    ? true // limitar também conforme papéis editoriais reais
    : { _status: { equals: 'published' } },
  create: ({ req: { user } }) => Boolean(user),
  update: ({ req: { user } }) => Boolean(user),
  delete: ({ req: { user } }) => Boolean(user),
},
```

Esse trecho é orientação para a instância VPS, não configuração aplicada. Definir papéis editoriais conforme a instância real. Confirmar testes anônimos também com `draft=true`, consultas sem filtro e acesso por ID. Revisar acesso à coleção versions, autores e mídia. Não armazenar uploads privados/dados de casos na coleção pública de mídia; um URL de arquivo pode permanecer acessível independentemente do status do artigo. Separar storage privado se necessário.

Portal consulta sem cookies, tokens ou autorização, não aceita URL de origem enviada pelo visitante e não segue redirects. Credenciais administrativas/VPS/PostgreSQL jamais entram no bundle. URLs públicas de artigos permanecem `/artigos` e `/artigos/$slug`.

## Rich text
Suportado: heading H1/H2/H3 (H1 editorial é apresentado como H2, pois o título da página já é H1), paragraph, text (bold/italic/strike/underline/code), list/listitem (ordenadas e não ordenadas), link/autolink custom HTTP(S), upload de imagem populado, quote, linebreak, horizontalrule.

Links com protocolo inseguro são removidos, preservando seu texto. HTML/arbitrary CSS não é inserido. React escapa o conteúdo. Links internos Lexical suportam somente `doc: {relationTo: "articles", value: {slug}}`; outras relações preservam o texto sem link. Links relativos usam a origem pública, nunca o CMS. URLs vazias e URLs externas HTTP são removidas; HTTP é permitido somente em localhost/127.0.0.1 para desenvolvimento. Blocos customizados não são suportados. Nós não suportados falham explicitamente, evitando publicar conteúdo truncado sem aviso. Limites de profundidade/número de nós reduzem risco de quebrar o layout. Configurar o editor do VPS para o conjunto suportado. Não há pacote Payload no frontend.

## Cache, revalidação e retirada
`caches.default` da Cloudflare é compartilhado entre visitantes **do mesmo ponto de presença**, não um cache global replicado nem Map de processo. Ambiente local sem Cache API consulta o CMS diretamente.

Chaves incluem URL de consulta completa e namespace. TTL padrão 60 segundos (configurável 1–300). Revalidação ocorre na primeira requisição após expiração; não há stale-while-revalidate/stale-if-error. Erros HTTP/conexão não viram resposta de sucesso ou fallback local. Dados de uma resposta CMS já cacheada continuam passando pela validação antes de chegar ao navegador.

### Política corrigida após auditoria
Sem `PAYLOAD_REVISION_PATH`, handlers do portal **não utilizam Cache API**: consultam o CMS a cada leitura, com `cache: no-store`. Isso é uma escolha segura até disponibilizar a autoridade de revisão; caches do proxy VPS também precisam ser desativados para estes endpoints. TTL zero não é aceito pela configuração.

Com o endpoint configurado, ele deve responder `{"revision":"identificador-unico"}` (até 100 caracteres alfanuméricos, `_` e `-`), sem cache intermediário, a partir de estado durável autoritativo. A mesma revisão cobre artigos, categorias, listagens, filtros, home e slugs antigos/novos. Cada publicação, atualização, retirada, exclusão, mudança de slug ou categoria deve alterar essa revisão de forma coordenada com a mutação. Não basta um webhook assíncrono eventual para garantir retirada imediata.

O portal consulta a revisão antes da leitura, inclui-a na chave e confirma-a antes de retornar hits, antes de armazenar misses e após o armazenamento. Mudança durante a consulta gera indisponibilidade explícita; não retorna o conteúdo antigo. Uma resposta gravada na chave antiga após retirada fica inacessível às novas leituras. Essa proteção depende da consistência do endpoint e dos reads do Payload: mudanças editoriais/revisão precisam ser transacionais ou seguir protocolo documentado de bloqueio e revisão, a definir no VPS. Não há garantia de revogar bytes já enviados ou abas abertas, nem da janela após a última confirmação. Sem autoridade real, não afirmar retirada instantânea.

`editorial-events.ts` prepara schema de eventos, escopo de invalidação e verificação HMAC-SHA256 de timestamp + corpo. **Não há endpoint de webhook ativo**. Antes de habilitar: segredo server-side, armazenamento durável de IDs contra replay, assinatura, tamanho limitado, confirmação/retries e autoridade de revisão. Timestamp sozinho não impede replay dentro da janela.

Não implementamos purge global fictício: `caches.default` é local ao ponto de presença e `cache.delete()` não resolve os demais. O token de purge, zona administrável, hostname/keys de cache e capacidades reais da conta não estão disponíveis/verificados neste projeto hospedado. As chaves atuais são URLs da origem CMS: não presumir que purge da zona do portal as alcance. Se a infraestrutura permitir purge global, será complementar à revisão, não substituto do controle de consultas em andamento. Referência: https://developers.cloudflare.com/workers/runtime-apis/cache/ e https://developers.cloudflare.com/api/resources/cache/methods/purge/.

Deduplicação: TanStack Query compartilha consultas idênticas no mesmo QueryClient. Não foi criada promessa global entre visitantes/PoPs: isso exigiria coordenação externa e poderia compartilhar contexto indevidamente. Reavaliar single-flight por chave/revisão apenas com métricas da instância real. Sem stale-on-error nem fallback local com CMS configurado.

Respostas JSON são lidas por stream limitado a 5 MB de bytes; revisão a 4 KB. Content-Length acima do limite cancela a leitura antecipadamente. Validação Zod, Lexical e relações ocorre antes de armazenar cada resposta editorial; também é reaplicada a hits.

## SEO e erros
Artigos completos aparecem no SSR, com title, description, canonical absoluto no domínio público, OG, Twitter, breadcrumbs e Article schema. Capa HTTPS exibida também é a imagem social. Autoria só quando real. URLs públicas passam pela política central `public-url.ts`. `PUBLIC_SITE_URL` aceita somente origem HTTPS sem caminho/credenciais/query, exceto HTTP local de desenvolvimento; sem configuração usa o domínio publicado existente. Heads são normalizados por contexto do roteador, sem alterar conteúdo territorial. Breadcrumbs, canonical e OG usam a mesma origem. Paginação, categoria e limite não padrão possuem canonical próprio normalizado; ordenação alternativa usa canonical da mesma coleção e `noindex`.

Slug inexistente/não publicado: `notFound()` e página informativa, robots noindex. Falha CMS: mensagem explícita, ação de tentar novamente, resposta server fn 503/no-store. Home preserva as seções territoriais e mostra indisponibilidade só no destaque editorial. Lista vazia: estado próprio. Filtros e paginação ficam na URL; carregamento tem estado acessível.

Admin: autenticação obrigatória, HTTPS, senhas fortes/papéis mínimos, nenhuma página pública de artigos no subdomínio. Configurar `X-Robots-Tag: noindex, nofollow` para painel e API (no proxy/repostas do VPS); robots.txt pode complementar mas **não autentica** e não garante remoção de URLs já indexadas. Publicação de imagens no CMS não altera canonical dos artigos. Backups de PostgreSQL e mídia devem ficar fora do VPS.

## Testes e Etapa 2
Fixtures só em `payload.test.tsx`. Testes cobrem contrato inglês, drafts recusados, publicação/update/withdrawal por TTL, namespace, erro/timeout, cache compartilhado simulado, paginação, categorias, slug inexistente, rich text seguro e referências inválidas. Estes testes não substituem validação na instância real.

Para concluir Etapa 2: fornecer origem CMS e domínio público; inspecionar versões Payload/Lexical/Next e dependências; criar/revisar coleções; validar permissões anônimas, editor e imagens; configurar env de cada deploy; verificar Cache API real na Cloudflare e ciclo completo publicar/atualizar/retirar no VPS; confirmar estratégia de retirada urgente. Nenhuma dessas configurações foi aplicada ao VPS pelo portal.

## Evidências da correção e checklist de conexão
Testes locais: `bun test src/content/payload.test.tsx src/content/editorial-audit.test.ts src/content/local/delegacias.test.ts`. Os testes anteriores eram 11 editoriais + 12 territoriais; novos testes ficam separados em `editorial-audit.test.ts`. Cache, revisão e eventos são simulados, não validados em produção. Preview foi verificado com HTML inicial, canonical absoluto, 404/noindex e HTTP 200 nas 34 delegacias/cinco zonas; rotas geradas comparadas sem mudanças.

Antes de conectar:
- [ ] Fornecer URL HTTPS CMS e confirmar domínio público; fixar versões Payload/Lexical/Next.
- [ ] Revisar collections articles, categories, authors e media com exemplos populados reais.
- [ ] Testar access anônimo sem filtro, draft=true, por ID e versões; proteger painel e aplicar noindex.
- [ ] Configurar PUBLIC_SITE_URL, PAYLOAD_API_URL, collection path, timeout e TTL por ambiente.
- [ ] Implementar/validar autoridade de revisão e coordenação com mutações no VPS antes de habilitar PAYLOAD_REVISION_PATH/Cache API.
- [ ] Decidir se webhook/purge complementar é disponível; revisar zona, host das chaves, escopo/token e replay durável.
- [ ] Testar publicação, alteração, retirada, exclusão, rename e categorias sob concorrência e em múltiplos PoPs reais.
- [ ] Verificar proxies, HTTP 503 SSR, canonical, uploads, painel, backups e abas abertas em produção.

Parelheiros: apenas contexto da página existente foi revisado, sem endereço/telefone/horário inventado e sem nova rota. Referência administrativa pública SEADE: https://produtos.seade.gov.br/produtos/msp/jsg/jsg4_002.htm; é referência histórica, não prova de circunscrição atual por endereço. Confirmar organização atual com a Polícia Civil antes de usar o vínculo como informação operacional.
