# Homologação Banca Paulista — Cloudflare Workers

Destino autorizado: `https://banca.paulista.workers.dev/`. Worker: **banca**. Branch: `codex/banca-redesign`. Este endereço é temporário e não define o domínio final.

## Configuração

O projeto utiliza configuração nativa de Vite, React, TanStack Start e Nitro, preset Cloudflare module, entry `src/server.ts`, binding `ASSETS` e `nodejs_compat`. `wrangler.jsonc` fixa o Worker `banca`, a conta Cloudflare de homologação e somente duas variáveis públicas:

- `PUBLIC_SITE_URL=https://banca.paulista.workers.dev`
- `DEPLOYMENT_ENV=staging`

O build injeta também `BUILD_COMMIT`, sem dados sigilosos. Em HTML de homologação, o header `X-Banca-Commit` identifica a revisão. O Nitro gera `.output/server/wrangler.json`, entry e diretório `.output/public`; esses arquivos gerados não entram no Git. O artefato fixa a conta `7b2dfe1e7fa69edb06d7bf74d7ebc942`, o binding `ASSETS` para `../public` e o binding `WEATHER_CACHE` para o namespace `BANCA_WEATHER_STAGING`. `keep_vars` preserva variáveis remotas existentes e o Wrangler mantém secrets. Antes de publicar, a conta deve ter subdomínio `paulista`. Nenhuma rota DNS, domínio personalizado, Cron ou serviço de dados adicional foi incluído.

## Política SEO

HTML recebe `X-Robots-Tag: noindex, nofollow` e `Cache-Control: no-store`, inclusive erros. O build aplica noindex às respostas de assets estáticos, mas preserva a política de cache imutável dos arquivos fingerprinted do Nitro; o middleware de respostas aplica `no-store` ao HTML e aos endpoints sujeitos a essa política. O endereço workers.dev é reconhecido como homologação mesmo sem a flag explícita.

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

Somente após autorização específica: escolher/configurar o domínio real e a configuração explícita de produção; definir `PUBLIC_SITE_URL` para ele e `DEPLOYMENT_ENV=production`; gerar novo build sem a flag de homologação; conferir a ausência de headers globais de noindex nos HTML/erros/assets e a ativação do sitemap com a origem definitiva. O domínio workers.dev deve continuar em noindex. Não basta mudar o robots nem reutilizar este perfil de homologação como perfil de produção.
