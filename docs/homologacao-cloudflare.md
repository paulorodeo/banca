# Homologação Banca Paulista — Cloudflare Workers

Destino autorizado: `https://banca.paulista.workers.dev/`. Worker: **banca**. Branch: `codex/banca-redesign`. Este endereço é temporário e não define o domínio final.

## Configuração

O projeto utiliza configuração nativa de Vite, React, TanStack Start e Nitro, preset Cloudflare module, entry `src/server.ts`, binding `ASSETS` e `nodejs_compat`. `wrangler.jsonc` fixa o Worker `banca`, a conta Cloudflare de homologação e somente duas variáveis públicas:

- `PUBLIC_SITE_URL=https://banca.paulista.workers.dev`
- `DEPLOYMENT_ENV=staging`

O build injeta também `BUILD_COMMIT`, sem dados sigilosos. Em HTML de homologação, o header `X-Banca-Commit` identifica a revisão. O Nitro gera `.output/server/wrangler.json`, entry e diretório `.output/public`; esses arquivos gerados não entram no Git. O artefato fixa a conta `7b2dfe1e7fa69edb06d7bf74d7ebc942`, o binding `ASSETS` para `../public` e o binding `WEATHER_CACHE` para o namespace `BANCA_WEATHER_STAGING`. `keep_vars` preserva variáveis remotas existentes e o Wrangler mantém secrets. Antes de publicar, a conta deve ter subdomínio `paulista`. Nenhuma rota DNS, domínio personalizado, Cron ou serviço de dados adicional foi incluído.

## Política SEO

HTML recebe `X-Robots-Tag: noindex, nofollow` e `Cache-Control: no-store`, inclusive erros. O arquivo `public/_headers`, interpretado diretamente pelo Workers Static Assets, mantém `noindex, nofollow` nos arquivos da homologação e define cache de navegador sem adicionar execução do Worker: um ano e `immutable` para assets com hash e fontes estáveis; 30 dias, com revalidação em segundo plano, para imagens e arquivos de marca com URLs sem hash. O middleware continua aplicando `no-store` ao HTML e aos endpoints sujeitos a essa política. O endereço workers.dev é reconhecido como homologação mesmo sem a flag explícita.

`/robots.txt` não anuncia sitemap e permite o rastreamento necessário para os buscadores lerem o header noindex. Isso não é autorização de indexação. Bloquear todo o rastreamento impediria a leitura do noindex: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

`/sitemap.xml` retorna 404 com noindex e no-store em homologação. O gerador de produção foi preservado. Canonical, Open Graph, imagens sociais e JSON-LD usam a origem temporária configurada, sem Lovable e sem inventar o domínio definitivo. Não submeter esta origem ao Search Console como produção.

## Verificação e publicação

```sh
bunx tsc --noEmit
bun test
bun run build:staging
npx --yes wrangler@4.151.0 deploy --dry-run --config .output/server/wrangler.json
```

Depois de revisar e commitar os ajustes locais, repetir o build. `bun scripts/check-staging-deploy.ts` exige branch correta, working tree limpo, artefato do HEAD atual, nome/origem/flag exatos, ausência de rotas de domínio e Cron, assets presentes e headers de homologação. É uma checagem local, não uma confirmação de conta autenticada.

Autenticar o Wrangler localmente na conta correta, conferir a conta/subdomínio e o Worker existente antes de usar `bun run deploy:staging`. Não publicar pelas contas antigas nem com o nome automático do repositório. A execução final deve verificar respostas HTTPS reais e o header do commit; sucesso do CLI sozinho não conclui a entrega.

## Liberação futura de produção

A produção usa o Worker independente `banca-prod`, `PUBLIC_SITE_URL=https://bancapaulista.org`, `DEPLOYMENT_ENV=production`, artefato `.output-production` e o namespace KV `BANCA_WEATHER_PRODUCTION`. O Worker não publica uma URL workers.dev permanente; Version URLs permitem validar cada revisão antes de transferir o custom domain existente. A transferência de `bancapaulista.org` ocorre separadamente, após a validação, sem recriar DNS nem regras de redirecionamento de `www`.

O build de produção não herda `noindex`, ativa o sitemap e emite canonical, Open Graph, Twitter Cards e JSON-LD na origem definitiva. Páginas explicitamente privadas, incompletas ou em revisão continuam fora do sitemap e preservam seus bloqueios individuais. Homologação permanece no Worker `banca`, com `noindex, nofollow` e sitemap desativado.
