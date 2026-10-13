# Expansão territorial — lote solicitado

## Implementação

Foram acrescentados 33 guias e 33 cards da Zona Leste ao template territorial existente. O portal reúne agora 67 guias: 34 anteriores e 33 novos. `/regioes/zona-leste`, o índice de regiões, o índice de delegacias e a contagem da home usam os mesmos registros.

As páginas novas seguem `/delegacias/advogado-criminal-{numero}-dp-{lugar}`. Não foram criadas rotas autônomas de bairro ou duplicatas de unidades. Os dois cards de Itaquera distinguem 32º e 103º DP; seus destinos têm numeração diferente.

## Páginas acrescentadas

| DP | Referência editorial do escopo | Página |
| --- | --- | --- |
| 8 | Brás | `/delegacias/advogado-criminal-8-dp-bras` |
| 10 | Penha | `/delegacias/advogado-criminal-10-dp-penha` |
| 18 | Alto da Mooca | `/delegacias/advogado-criminal-18-dp-alto-da-mooca` |
| 21 | Chácara Seis de Outubro | `/delegacias/advogado-criminal-21-dp-chacara-seis-de-outubro` |
| 22 | Vila Americana | `/delegacias/advogado-criminal-22-dp-vila-americana` |
| 24 | Ponte Rasa | `/delegacias/advogado-criminal-24-dp-ponte-rasa` |
| 29 | Vila Diva | `/delegacias/advogado-criminal-29-dp-vila-diva` |
| 30 | Tatuapé | `/delegacias/advogado-criminal-30-dp-tatuape` |
| 31 | Vila Carrão | `/delegacias/advogado-criminal-31-dp-vila-carrao` |
| 32 | Itaquera | `/delegacias/advogado-criminal-32-dp-itaquera` |
| 41 | Vila Rica | `/delegacias/advogado-criminal-41-dp-vila-rica` |
| 42 | Parque São Lucas | `/delegacias/advogado-criminal-42-dp-parque-sao-lucas` |
| 44 | Guaianases | `/delegacias/advogado-criminal-44-dp-guaianases` |
| 49 | São Mateus | `/delegacias/advogado-criminal-49-dp-sao-mateus` |
| 50 | Itaim Paulista | `/delegacias/advogado-criminal-50-dp-itaim-paulista` |
| 52 | Parque São Jorge | `/delegacias/advogado-criminal-52-dp-parque-sao-jorge` |
| 53 | Parque do Carmo | `/delegacias/advogado-criminal-53-dp-parque-do-carmo` |
| 54 | Cidade Tiradentes | `/delegacias/advogado-criminal-54-dp-cidade-tiradentes` |
| 56 | Vila Alpina | `/delegacias/advogado-criminal-56-dp-vila-alpina` |
| 57 | Parque da Mooca | `/delegacias/advogado-criminal-57-dp-parque-da-mooca` |
| 58 | Vila Formosa | `/delegacias/advogado-criminal-58-dp-vila-formosa` |
| 59 | Jardim Noêmia | `/delegacias/advogado-criminal-59-dp-jardim-noemia` |
| 62 | Ermelino Matarazzo | `/delegacias/advogado-criminal-62-dp-ermelino-matarazzo` |
| 63 | Vila Jacuí | `/delegacias/advogado-criminal-63-dp-vila-jacui` |
| 64 | Cidade A. E. Carvalho | `/delegacias/advogado-criminal-64-dp-cidade-a-e-carvalho` |
| 65 | Artur Alvim | `/delegacias/advogado-criminal-65-dp-artur-alvim` |
| 66 | Jardim Aricanduva | `/delegacias/advogado-criminal-66-dp-jardim-aricanduva` |
| 67 | Jardim Robru | `/delegacias/advogado-criminal-67-dp-jardim-robru` |
| 68 | Lajeado | `/delegacias/advogado-criminal-68-dp-lajeado` |
| 69 | Teotônio Vilela | `/delegacias/advogado-criminal-69-dp-teotonio-vilela` |
| 70 | Sapopemba | `/delegacias/advogado-criminal-70-dp-sapopemba` |
| 81 | Belém | `/delegacias/advogado-criminal-81-dp-belem` |
| 103 | Itaquera | `/delegacias/advogado-criminal-103-dp-itaquera` |

## Oeste reaproveitada

Os nove DPs solicitados já possuíam páginas: 7, 14, 15, 23, 51, 75, 78, 91 e 93. Nenhuma página da Oeste precisou ser criada. Seus slugs e links foram mantidos. O 15º DP Itaim Bibi continua no agrupamento editorial preexistente da Zona Sul, sem reclassificação silenciosa; a Oeste mantém oito cards.

## Dados e fontes

As referências de lugar acima vêm do escopo entregue pelo responsável; não constituem prova de denominação oficial atual, endereço, operação ou circunscrição. Nenhum endereço, telefone, horário ou área de atendimento foi acrescentado. As informações institucionais permanecem sinalizadas em verificação.

O diretório de órgãos da SSP está acessível, mas somente a numeração não confirma os nomes dos lugares. A listagem municipal sugerida retornou HTTP 403 na consulta direta. O primeiro relatório automatizado de pesquisa citou fonte secundária e não demonstrou evidência primária por unidade; não foi aceito como confirmação factual. As possíveis diferenças entre 21º DP/Vila Matilde e Chácara Seis de Outubro, e 66º DP/Vale do Aricanduva e Jardim Aricanduva, requerem evidência oficial antes de atribuir nome institucional.

## Verificações

- 18 testes territoriais e 23 testes editoriais aprovados.
- 67 páginas de guia e cinco hubs responderam HTTP 200, com títulos e metadados presentes.
- Home → Zona Leste → 8º DP e card 103º DP → guia 103º → interlink 32º DP exercitados no navegador.
- 33 links de cards na Leste e oito na Oeste conferidos.
- Nenhum erro de execução observado no navegador; compilação automática sem erros.
- A integração Payload, cache e VPS não recebeu alterações.