# Autorizações dos feeds externos

## Decisão editorial

Em 28/10/2026, o proprietário da Banca Paulista aprovou expressamente o uso editorial dos 18 feeds cadastrados em `src/features/external-news/sources.ts`. A autorização declarada abrange a incorporação ao agregador e o escopo inicial de metadados: manchete, nome da fonte, data e URL da publicação original. Um resumo editorial próprio e curto poderá ser acrescentado futuramente quando houver apuração efetiva; descrições RSS, textos integrais e imagens de terceiros não são importados nesta fase.

O proprietário declarou parceria com a Revista Oeste e com a Brasil Paralelo, autorização da Jovem Pan recebida por e-mail e aprovação editorial dos quatro feeds que aguardavam validação. O Codex não recebeu nem inspecionou contratos, mensagens de e-mail, nomes de licenciadores ou números de instrumentos. Este documento registra a decisão declarada pelo proprietário, sem certificar documentos que não foram apresentados.

A aprovação geral não elimina a revisão por item. Uma referência pode ser rejeitada manualmente, e essa decisão tem precedência sobre sincronizações posteriores. Itens novos tecnicamente válidos recebem aprovação automática identificada como `authorization-policy`; decisões editoriais específicas usam `manual`.

## Autorização editorial e disponibilidade técnica

`editorialAuthorization: approved` registra a decisão do proprietário. `technicalStatus` registra apenas o resultado operacional do RSS e pode mudar sem revogar a autorização. Um HTTP 403, timeout, XML vazio ou outro erro técnico não converte uma fonte aprovada em fonte proibida.

Validação direta realizada em 28/10/2026, com HTTPS, até dois redirecionamentos, inspeção de Content-Type e passagem pelo parser do projeto:

|   # | Fonte / registro                                             | Situação técnica                  | Resultado da amostra                                                                                |
| --: | ------------------------------------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------- |
|   1 | Agência Brasil — Últimas Notícias (`agencia-brasil-ultimas`) | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|   2 | Agência Brasil — Justiça (`agencia-brasil-justica`)          | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|   3 | Agência Brasil — Política (`agencia-brasil-politica`)        | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|   4 | Agência Brasil — Economia (`agencia-brasil-economia`)        | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|   5 | Câmara — Últimas Notícias (`camara-ultimas`)                 | Operacional                       | 20 recebidas, 0 rejeitadas, 20 aprovadas                                                            |
|   6 | Câmara — Direito e Justiça (`camara-justica`)                | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|   7 | Câmara — Política (`camara-politica`)                        | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|   8 | Câmara — Economia (`camara-economia`)                        | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|   9 | Câmara — Agropecuária (`camara-agro`)                        | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|  10 | Câmara — Transporte e Trânsito (`camara-transporte`)         | Operacional, sem itens na amostra | XML válido; 0 itens                                                                                 |
|  11 | TSE — Notícias (`tse-noticias`)                              | Indisponível no teste             | Endpoint oficial `/rss` respondeu HTTP 403; autorização preservada                                  |
|  12 | STJ — Notícias (`stj-noticias`)                              | Operacional                       | 100 recebidas, 0 rejeitadas, 100 aprovadas; data em português suportada pelo adaptador              |
|  13 | Agência SP (`agencia-sp`)                                    | Indisponível no teste local       | Timeout de conexão; autorização preservada                                                          |
|  14 | Gazeta do Povo (`gazeta-do-povo`)                            | Operacional                       | 100 recebidas, 0 rejeitadas, 100 aprovadas                                                          |
|  15 | Repórter Brasil (`reporter-brasil`)                          | Operacional                       | Endpoint XML próprio corrigido para `/category/noticias/feed/`; 10 recebidas                        |
|  16 | Revista Oeste (`revista-oeste`)                              | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |
|  17 | Brasil Paralelo (`brasil-paralelo`)                          | Operacional                       | `/noticias/rss.xml` redirecionou para o host próprio e URL final `/noticias/feed.xml`; 10 recebidas |
|  18 | Jovem Pan (`jovem-pan`)                                      | Operacional                       | 10 recebidas, 0 rejeitadas, 10 aprovadas                                                            |

As contagens são uma fotografia do teste e não uma promessa de volume. Falhas temporárias preservam snapshots existentes e ficam restritas aos relatórios operacionais; não são exibidas ao visitante.

## Limites de publicação

- Toda referência é identificada como fonte externa e aponta diretamente para o veículo.
- Não há página artificial, espelho integral, imagem importada, `NewsArticle`, sitemap ou RSS próprio para esses itens.
- Geografia e editoria só são atribuídas por categoria RSS ou menção textual verificável. Geografia desconhecida aparece apenas no recorte geral do Brasil.
- A autorização pode ser revista globalmente no catálogo ou individualmente no item.
