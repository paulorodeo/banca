# Agregador editorial externo

Este módulo mantém RSS/Atom de terceiros separado do acervo `noticias` da Banca.
O fluxo é `FeedSource` → `syncExternalFeed` → normalização limitada a metadados →
`ExternalNewsRepository` → `queryExternalNews` → `ExternalNewsCard`.

## Segurança e publicação

- A ingestão só usa URLs versionadas no registro e hosts exatos, HTTPS, redirect manual limitado, timeout e corpo limitado a 1,2 MB.
- DTD e declarações ENTITY são recusadas; não há leitura de description, conteúdo integral, autores ou imagens.
- Os itens iniciam como `pending`; a ingestão registra `approved: 0` e não publica automaticamente.
- Consulta pública exige `EXTERNAL_NEWS_ENABLED=true`, KV `EXTERNAL_NEWS_KV`, fonte aprovada, item aprovado, direitos aprovados, data válida e menos de sete dias.
- Cards levam ao original, mostram a fonte e não criam página individual, NewsArticle, canonical, feed ou sitemap.
- `noopener noreferrer` é usado porque o editor não precisa repassar a URL de origem do leitor.
- `MemoryExternalNewsRepository` é apenas para testes; não representa persistência local ou durável.

## Operação pendente

Não foi provisionado KV, agenda de sincronização, painel editorial nem adaptador Payload nesta tarefa. A função `syncEnabledExternalFeeds` é a entrada interna para uma futura agenda, com concorrência máxima de três fontes e intervalo mínimo baseado no relatório anterior. Ela não é chamada por requisições públicas. Até configurar binding, flag, curadoria e política de direitos, a interface permanece vazia.

Agência Brasil/EBC, Câmara, STJ, TSE, Agência SP, Gazeta do Povo e demais feeds são tratados como fontes jornalísticas. APIs de IBGE, Banco Central, Conab, WeatherAPI, CPTEC/INMET, ANA, Infra S.A., DNIT, ANTT e PRF são dados institucionais estruturados, não itens RSS; continuam nos módulos próprios de dados do Atlas e não são convertidos em notícias por este agregador. DataJud também permanece separado de notícias judiciais.
