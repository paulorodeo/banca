# Homologação Banca Paulista — Cloudflare Workers

Destino autorizado: `https://banca.paulista.workers.dev/`. Worker: **banca**. Branch: `codex/banca-redesign`. Este endereço é temporário e não define o domínio final.

## Configuração

O projeto utiliza configuração nativa de Vite, React, TanStack Start e Nitro, preset Cloudflare module, entry `src/server.ts`, binding `ASSETS` e `nodejs_compat`. `wrangler.jsonc` fixa o Worker `banca`, a conta Cloudflare de homologação e somente duas variáveis públicas:

- `PUBLIC_SITE_URL=https://banca.paulista.workers.dev`
- `DEPLOYMENT_ENV=staging`

O build injeta também `BUILD_COMMIT`, sem dados sigilosos. Em HTML de homologação, o header `X-Banca-Commit` identifica a revisão. O Nitro gera `.output/server/wrangler.json`, entry e diretório `.output/public`; esses arquivos gerados não entram no Git. O artefato fixa a conta `7b2dfe1e7fa69edb06d7bf74d7ebc942`, o binding `ASSETS` para `../public` e o binding `WEATHER_CACHE` para o namespace `BANCA_WEATHER_STAGING`. `keep_vars` preserva variáveis remotas existentes e o Wrangler mantém secrets. Antes de publicar, a conta deve ter subdomínio `paulista`. Nenhuma rota DNS, domínio personalizado, Cron ou serviço de dados adicional foi incluído.

## Política SEO

HTML recebe `X-Robots-Tag: noindex, nofollow` e `Cache-Control: no-store`, inclusive erros. O Nitro aplica um ano e `immutable` aos assets com hash. O arquivo `public/_headers`, interpretado diretamente pelo Workers Static Assets, mantém `noindex, nofollow` nos arquivos da homologação e define cache de navegador sem adicionar execução do Worker: um ano e `immutable` para fontes estáveis; 30 dias, com revalidação em segundo plano, para imagens e arquivos de marca com URLs sem hash. O middleware continua aplicando `no-store` ao HTML e aos endpoints sujeitos a essa política. O endereço workers.dev é reconhecido como homologação mesmo sem a flag explícita.

`/robots.txt` não anuncia sitemap e permite o rastreamento necessário para os buscadores lerem o header noindex. Isso não é autorização de indexação. Bloquear todo o rastreamento impediria a leitura do noindex: [Google Search Central](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

`/sitemap.xml` retorna 404 com noindex e no-store em homologação. O gerador de produção foi preservado. Canonical, Open Graph, imagens sociais e JSON-LD usam a origem temporária configurada, sem Lovable e sem inventar o domínio definitivo. Não submeter esta origem ao Search Console como produção.

## Build e publicação canônicos

`bun run deploy:staging` é o único comando recomendado para publicar no Worker `banca`. Ele exige branch `codex/banca-redesign`, working tree limpo, commit válido e autenticação na conta Cloudflare autorizada. Depois adquire um lock exclusivo por host, cria um identificador de build e compila em um diretório temporário novo. Não reutiliza `.output` nem aceita um artefato de produção.

O preflight examina o artefato produzido: Worker e conta, `DEPLOYMENT_ENV`, origem pública, `BUILD_COMMIT`, binding `ASSETS`, KV esperado, ausência do dataset histórico de Rodovias, fixtures presentes nos bundles de servidor e cliente e configuração global `noindex`. Em seguida, Wrangler executa o Worker localmente sem bindings remotos. O pipeline solicita `/noticias/brasil`, `/noticias/regioes/norte` e `/noticias/estados/ac`, confirma HTTP 200, cabeçalho global `noindex`, metadados de página e identificação fictícia; Acre deve conter `Pauta demonstrativa: justiça em Acre`. Também confirma que `/sitemap.xml` retorna 404. Uma falha em qualquer verificação anterior ao upload interrompe a execução.

O lock usa `flock` em um arquivo persistente sob `/tmp`, e abrange build, verificações, upload e confirmação pública. Uma segunda execução canônica no mesmo host encerra antes de começar outro build. O lock é local: não impede Wrangler executado diretamente nem publicações iniciadas em outro computador, painel ou sistema externo. Para investigar uma possível substituição, compare `wrangler deployments list --name banca --json`, `wrangler versions view <VERSION_ID> --name banca --json`, horários, autor, `BUILD_COMMIT`, ETag do script e tráfego percentual; confira também a configuração de Workers Builds/deploy hooks e os logs da origem suspeita.

Após o upload, o comando registra build ID, commit, digest SHA-256 do artefato, Version ID, Deployment ID e percentual de tráfego. Testa as rotas públicas e lê novamente os deployments; se outra versão assumir o tráfego durante a validação, sinaliza a divergência. Esse registro é uma fotografia do momento: não garante que uma ferramenta externa deixe de publicar depois.

Build, upload, deployment e versão recebendo tráfego são etapas distintas. O build cria o artefato local; o upload envia script e assets e cria uma versão; o deployment associa uma ou mais versões a uma estratégia; o percentual indica qual versão atende tráfego. O sucesso do CLI sozinho não confirma que a versão enviada continua ativa nem que as respostas públicas correspondem ao commit esperado.

Para verificações locais antes da próxima publicação:

```sh
bunx tsc --noEmit
bun run test:staging-pipeline
bun test src/lib/deployment-profile.test.ts
bun run build:staging
```

O build manual serve para desenvolvimento e inspeção. Para publicar, use somente `bun run deploy:staging`, que sempre gera e verifica outro artefato isolado antes do upload. Não execute Wrangler deploy diretamente para homologação.

## Liberação futura de produção

A produção usa o Worker independente `banca-prod`, `PUBLIC_SITE_URL=https://bancapaulista.org`, `DEPLOYMENT_ENV=production`, artefato `.output-production` e o namespace KV `BANCA_WEATHER_PRODUCTION`. O Worker não publica uma URL workers.dev permanente; Version URLs permitem validar cada revisão antes de transferir o custom domain existente. A transferência de `bancapaulista.org` ocorre separadamente, após a validação, sem recriar DNS nem regras de redirecionamento de `www`.

O build de produção não herda `noindex`, ativa o sitemap e emite canonical, Open Graph, Twitter Cards e JSON-LD na origem definitiva. Páginas explicitamente privadas, incompletas ou em revisão continuam fora do sitemap e preservam seus bloqueios individuais. Homologação permanece no Worker `banca`, com `noindex, nofollow` e sitemap desativado.
