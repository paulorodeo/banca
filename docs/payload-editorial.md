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
| PUBLIC_SITE_URL | Origem HTTPS pública definitiva para canonical | origem da requisição |

Não há domínio de produção preenchido. `VITE_CMS_API_URL` do adaptador antigo não é mais utilizada. Migrar sua configuração para `PAYLOAD_API_URL` se ela existir. Development permite CMS HTTP apenas em localhost/127.0.0.1 e funciona sem Cache API; staging deve usar CMS separado e seu domínio público; production requer URL real, permissões revisadas e backups. Sem `PAYLOAD_API_URL`, artigos locais aprovados permanecem. Com ela, **nenhuma falha retorna conteúdo local como sucesso**.

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

Links com protocolo inseguro são removidos, preservando seu texto. HTML/arbitrary CSS não é inserido. React escapa o conteúdo. Links internos Lexical por relação e blocos customizados exigem conversores futuros: não habilitá-los no editor antes dessa implementação. Nós não suportados falham explicitamente, evitando publicar conteúdo truncado sem aviso. Limites de profundidade/número de nós reduzem risco de quebrar o layout. Configurar o editor do VPS para o conjunto suportado. Não há pacote Payload no frontend.

## Cache, revalidação e retirada
`caches.default` da Cloudflare é compartilhado entre visitantes **do mesmo ponto de presença**, não um cache global replicado nem Map de processo. Ambiente local sem Cache API consulta o CMS diretamente.

Chaves incluem URL de consulta completa e namespace. TTL padrão 60 segundos (configurável 1–300). Revalidação ocorre na primeira requisição após expiração; não há stale-while-revalidate/stale-if-error. Erros HTTP/conexão não viram resposta de sucesso ou fallback local. Dados de uma resposta CMS já cacheada continuam passando pela validação antes de chegar ao navegador.

Publicação, atualização e retirada ficam visíveis na próxima consulta após expiração, no máximo TTL de cache de servidor (não atualiza abas abertas automaticamente). Para retirada urgente/global, alterar `ARTICLES_CACHE_NAMESPACE` e fazer deploy de todos os consumidores, ou reduzir TTL/desabilitar o uso da Cache API no deploy. Não há webhook de purge implementado nesta etapa e não alegamos invalidação global instantânea. Webhook autenticado/purge dependem das capacidades reais da conta Cloudflare/VPS e são Etapa 2 se necessários. Revogação com exigência imediata requer política mais forte antes de produção.

## SEO e erros
Artigos completos aparecem no SSR, com title, description, canonical absoluto no domínio público, OG, Twitter, breadcrumbs e Article schema. Capa HTTPS exibida também é a imagem social. Autoria só quando real. Em preview, configure `PUBLIC_SITE_URL` se desejar canonical apontando ao domínio público definitivo; sem ele, usa origem da requisição.

Slug inexistente/não publicado: `notFound()` e página informativa, robots noindex. Falha CMS: mensagem explícita, ação de tentar novamente, resposta server fn 503/no-store. Home preserva as seções territoriais e mostra indisponibilidade só no destaque editorial. Lista vazia: estado próprio. Filtros e paginação ficam na URL; carregamento tem estado acessível.

Admin: autenticação obrigatória, HTTPS, senhas fortes/papéis mínimos, nenhuma página pública de artigos no subdomínio. Configurar `X-Robots-Tag: noindex, nofollow` para painel e API (no proxy/repostas do VPS); robots.txt pode complementar mas **não autentica** e não garante remoção de URLs já indexadas. Publicação de imagens no CMS não altera canonical dos artigos. Backups de PostgreSQL e mídia devem ficar fora do VPS.

## Testes e Etapa 2
Fixtures só em `payload.test.tsx`. Testes cobrem contrato inglês, drafts recusados, publicação/update/withdrawal por TTL, namespace, erro/timeout, cache compartilhado simulado, paginação, categorias, slug inexistente, rich text seguro e referências inválidas. Estes testes não substituem validação na instância real.

Para concluir Etapa 2: fornecer origem CMS e domínio público; inspecionar versões Payload/Lexical/Next e dependências; criar/revisar coleções; validar permissões anônimas, editor e imagens; configurar env de cada deploy; verificar Cache API real na Cloudflare e ciclo completo publicar/atualizar/retirar no VPS; confirmar estratégia de retirada urgente. Nenhuma dessas configurações foi aplicada ao VPS pelo portal.
