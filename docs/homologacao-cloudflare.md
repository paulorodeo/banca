# Homologação Banca Paulista — Cloudflare Workers

Destino autorizado: `https://banca.pjdigital-me.workers.dev/`. Worker: **banca**. Branch: `codex/banca-redesign`. Este endereço é temporário e não define o domínio final.

## Configuração

O projeto já utiliza TanStack Start + Nitro, preset Cloudflare module, entry `src/server.ts`, binding `ASSETS` e `nodejs_compat`. Não foi criado outro runtime. `wrangler.jsonc` fixa o nome correto (o nome automático anterior era `paulorodeo-lawsp`), a data de compatibilidade existente e somente duas variáveis públicas:

- `PUBLIC_SITE_URL=https://banca.pjdigital-me.workers.dev`
- `DEPLOYMENT_ENV=staging`

O build injeta também `BUILD_COMMIT`, sem dados sigilosos. Em HTML de homologação, o header `X-Banca-Commit` identifica a revisão. O Nitro gera `.output/server/wrangler.json`, entry e diretório de assets; esses arquivos gerados não devem entrar no Git. `keep_vars` preserva variáveis remotas existentes e o Wrangler mantém secrets. A conta e os bindings remotos precisam ser conferidos antes de publicar: somente o Worker banca na conta com subdomínio pjdigital-me está autorizado. Nenhuma rota DNS, domínio personalizado, Cron ou serviço de dados foi incluído.

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

Autenticar o Wrangler localmente na conta correta, conferir a conta/subdomínio e o Worker existente antes de usar `bun run deploy:staging`. Não criar conta temporária nem publicar com o nome automático do repositório. A execução final deve verificar respostas HTTPS reais e o header do commit; sucesso do CLI sozinho não conclui a entrega.

## Liberação futura de produção

Somente após autorização específica: escolher/configurar o domínio real e a configuração explícita de produção; definir `PUBLIC_SITE_URL` para ele e `DEPLOYMENT_ENV=production`; gerar novo build sem a flag de homologação; conferir a ausência de headers globais de noindex nos HTML/erros/assets e a ativação do sitemap com a origem definitiva. O domínio workers.dev deve continuar em noindex. Não basta mudar o robots nem reutilizar este perfil de homologação como perfil de produção.

## Pré-deploy desta sessão

Os commits 3379e6e e 93b5940 foram confirmados. A árvore estava limpa antes desta preparação. O Wrangler 4.151.0 confirmou ausência de autenticação. A URL existente respondeu 200 antes de qualquer publicação; isso não comprova que este novo código esteja publicado. A preparação local e os resultados do runtime devem ser distinguidos da validação remota pós-deploy.
