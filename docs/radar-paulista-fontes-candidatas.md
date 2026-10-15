# Radar Paulista — fontes candidatas

Levantamento preliminar em 15 de outubro de 2026. “Candidato” não significa aprovação jurídica, editorial, técnica ou comercial. Autenticação, preços, limites e licenças devem ser reconfirmados antes de cada prova de conceito.

## Institucional e regulatória

| Serviço                                                                                         | Finalidade e cobertura                                     | Acesso conhecido                                            | Riscos e validações pendentes                                                   | Substituível por                                        |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Querido Diário](https://docs.queridodiario.ok.org.br/pt-br/latest/utilizando/api-publica.html) | Diários oficiais municipais; cobertura varia por município | API pública; documentação menciona referência de 60 req/min | Confirmar cobertura, licença/atribuição, retenção e uso comercial por documento | Diário municipal oficial, feed ou importação autorizada |
| [PNCP](https://www.gov.br/pncp/pt-br/pncp/manuais)                                              | Licitações, contratos, atas e planos nacionais             | Consulta pública REST; manutenção exige credenciais         | Versionamento, paginação, atualização, licença documental e volume              | Portais oficiais de compras e transparência             |
| [IBGE](https://www.ibge.gov.br/geociencias/organizacao-do-territorio/27385-localidades)         | País, UF, municípios, códigos e localidades nacionais      | Bases, arquivos vetoriais e serviços oficiais               | Escolher base/código autoritativo e registrar versão                            | Fontes territoriais oficiais estaduais/municipais       |
| [TCE-SP](https://www.tce.sp.gov.br/transparencia/dados-abertos)                                 | Controle externo e dados de entes paulistas                | Portal de dados abertos; APIs específicas a validar         | Catálogo, licença, estabilidade e dados pessoais incidentais                    | Portais oficiais dos entes e tribunais de contas        |
| Diários municipais e fontes legislativas                                                        | Atos locais do respectivo município                        | RSS, busca, PDF ou API quando oficialmente oferecidos       | Robôs, licença, autenticidade, assinatura, OCR e retenção                       | Querido Diário ou importação editorial manual           |

## Territorial, ambiental e imobiliária

| Serviço                                                                                                                          | Finalidade e cobertura                               | Acesso conhecido                                                  | Riscos e validações pendentes                                        | Substituível por                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ |
| [GeoSampa](https://geosampa.prefeitura.sp.gov.br/)                                                                               | Camadas geográficas do município de São Paulo        | WFS/WMS e catálogo de metadados                                   | Restrito à capital; revisar metadado e licença por camada            | Geoportais municipais/estaduais e IBGE                       |
| [MapBiomas Alerta](https://plataforma.alerta.mapbiomas.org/api/docs/index.html)                                                  | Alertas ambientais no Brasil                         | GraphQL v2 com conta/token; dados indicados como CC-BY nos termos | Atribuição, dados de propriedade/pessoas e limites de API            | INPE e órgãos ambientais oficiais                            |
| [INPE Programa Queimadas](https://www.terrabrasilis.dpi.inpe.br/queimadas/portal/pages/secao_downloads/dados-abertos/index.html) | Focos, eventos, área e risco de fogo no Brasil       | Downloads CSV/KML/GPKG/TIFF e geosserviços                        | Produtos provisórios, frequência, atribuição e escala adequada       | MapBiomas, órgãos ambientais estaduais                       |
| [CETESB](https://cetesb.sp.gov.br/)                                                                                              | Informação ambiental no estado de São Paulo          | Portais e conjuntos específicos; API geral não confirmada         | Identificar catálogo oficial, licença, formato e estabilidade        | DataGEO/órgãos ambientais oficiais                           |
| Serviços registrais autorizados                                                                                                  | Dados imobiliários e registrais conforme competência | Contratual e autenticado                                          | Finalidade, base legal, sigilo, cobrança e proibição de republicação | Documento fornecido pelo titular ou fonte oficial autorizada |

## Comercial, documental e cadastral

| Serviço                                           | Finalidade potencial                        | Estado da documentação                                                | Risco principal para o Radar                                                         |
| ------------------------------------------------- | ------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| SERPRO                                            | Serviços oficiais cadastrais e empresariais | Portfólio e contrato a avaliar                                        | Dados pessoais, finalidade, autenticação e custo                                     |
| [InfoSimples](https://infosimples.com/consultas/) | Consultas documentais e cadastrais          | Catálogo e preços públicos por consulta                               | Licença de republicação, origem secundária e dados pessoais                          |
| [BrasilAPI](https://brasilapi.com.br/docs)        | Agregador comunitário de dados públicos     | OpenAPI; serviço experimental pede uso responsável e proíbe varredura | Não é autoridade primária para vários endpoints; sem coleta massiva                  |
| API Brasil / Mundo API                            | Agregadores comerciais                      | Documentação, empresa e termos ainda a validar                        | Proveniência, licença, estabilidade e dados pessoais                                 |
| [Escavador](https://api.escavador.com/v2/docs/)   | Dados de tribunais e diários                | API comercial documentada                                             | Não usar busca pessoal, CPF ou monitoramento individualizado; avaliar licença e LGPD |
| JUDIT                                             | Dados judiciais                             | Documentação e contrato a validar                                     | Processos em sigilo, dados pessoais, finalidade e indexação                          |
| idwall                                            | Verificação de identidade autorizada        | Documentação e contrato a validar                                     | Biometria e documentos pessoais; não é fonte de publicação editorial                 |

## Critérios obrigatórios antes de integração

1. Fonte e documentação oficial identificadas.
2. Cobertura territorial e temporal mensuradas.
3. Autenticação, preço, rate limit, SLA e suporte registrados.
4. Licença e permissão de uso comercial/republicação revisadas.
5. Categorias de dados pessoais e base legal mapeadas.
6. Qualidade, atraso, correções e autoridade da fonte avaliados.
7. Estratégia de substituição e exportação definida.
8. Prova de conceito estreita, reversível e sem publicação automática.
