# Agregador editorial externo

Este módulo mantém RSS/Atom de terceiros separado do acervo `noticias` da Banca.
O fluxo é `FeedSource` → `syncExternalFeed` → normalização limitada a metadados →
`ExternalNewsRepository` → `queryExternalNews` → `ExternalNewsCard`.

## Segurança e publicação

- A ingestão só usa URLs versionadas no registro e hosts exatos, HTTPS, redirect manual limitado, timeout e corpo limitado a 1,2 MB.
- DTD e declarações ENTITY são recusadas; não há leitura de description, conteúdo integral, autores ou imagens.
- Itens válidos de fontes autorizadas recebem aprovação inicial `authorization-policy`; decisões manuais, inclusive rejeições, não são sobrescritas pela sincronização.
- Consulta pública exige `EXTERNAL_NEWS_ENABLED=true` no runtime Cloudflare, KV `EXTERNAL_NEWS_KV`, fonte editorialmente aprovada e tecnicamente operacional, item aprovado, data válida e menos de sete dias.
- Cards levam ao original, mostram a fonte e não criam página individual, NewsArticle, canonical, feed ou sitemap.
- `noopener noreferrer` é usado porque o editor não precisa repassar a URL de origem do leitor.
- `MemoryExternalNewsRepository` é apenas para testes; não representa persistência local ou durável.

## Operação em homologação

O Worker `banca` usa o binding `EXTERNAL_NEWS_KV` e um único Cron Trigger `0 */2 * * *`. O hook nativo do Nitro chama `syncEnabledExternalFeeds` com concorrência máxima de três fontes; nenhuma requisição de visitante dispara RSS. Snapshots só são regravados quando o conteúdo muda, e erros idênticos são limitados para evitar escritas repetitivas. Produção não recebe o binding, a flag nem o cron por esta configuração.

Itens sem geografia verificável podem aparecer no painel geral do Brasil, mas nunca em uma UF ou região. A documentação permanente da autorização e da validação técnica está em `docs/editorial/autorizacoes-feeds-externos.md`.

Agência Brasil/EBC, Câmara, STJ, TSE, Agência SP, Gazeta do Povo e demais feeds são tratados como fontes jornalísticas. APIs de IBGE, Banco Central, Conab, WeatherAPI, CPTEC/INMET, ANA, Infra S.A., DNIT, ANTT e PRF são dados institucionais estruturados, não itens RSS; continuam nos módulos próprios de dados do Atlas e não são convertidos em notícias por este agregador. DataJud também permanece separado de notícias judiciais.
