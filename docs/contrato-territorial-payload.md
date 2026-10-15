# Contrato territorial futuro — Payload CMS

Status: planejamento. A leitura pública ainda usa zonas, regiões, bairros e delegacias locais tipados. Este documento não declara coleções já implantadas.

## Princípios

- O frontend TanStack Start consome somente REST público validado por funções de servidor.
- Payload é a autoridade editorial futura; WordPress não armazena territórios, instituições ou profissionais.
- `_status=published` é obrigatório em toda leitura pública.
- Uma instituição e um profissional possuem um único registro e uma única URL canônica. Páginas territoriais guardam relações, não cópias.
- Slugs das 91 delegacias existentes permanecem imutáveis durante a migração.
- Cache de edge só pode ser habilitado com autoridade durável de revisão verificada antes e depois das leituras.

## Coleções previstas

### `zones`

`id`, `slug`, `name`, `description`, `introduction`, `editorialSections`, `media`, `_status`, `updatedAt`.

### `neighborhoods`

`id`, `slug`, `name`, `zone`, `description`, `introduction`, `urbanReferences`, `neighboringNeighborhoods`, `editorialSections`, `faq`, `seo`, `media`, `_status`, `updatedAt`.

### `institutionCategories`

`id`, `slug`, `name`, `description`, `displayOrder`, `_status`.

### `institutions`

`id`, `slug`, `category`, `officialName`, `identifier`, `verifiedOperationalData`, `media`, `seo`, `_status`, `updatedAt`.

Campos operacionais são opcionais e precisam carregar fonte, data e estado de verificação. A ausência não impede a publicação do contexto editorial e não deve produzir placeholders factuais.

### `territorialInstitutionRelations`

`id`, `institution`, `neighborhood`, `relationType` (`located` ou `related`), `publicLabel`, `evidence`, `verifiedAt`, `_status`.

A relação `related` nunca equivale, por si só, a competência policial, judicial ou administrativa.

### `professionals`

`id`, `slug`, `publicName`, `oabUf`, `oabNumber`, `verifiedAt`, `photo`, `declaredPracticeAreas`, `serviceZones`, `serviceNeighborhoods`, `contactUrl`, `whatsappWidgetId`, `consentVersion`, `_status`, `updatedAt`.

Somente perfis publicados, verificados, consentidos e territorialmente elegíveis entram na resposta pública. Preço ou plano não altera ordenação.

### `articles`

O contrato editorial existente permanece autoritativo. Relações opcionais `zones` e `neighborhoods` permitem módulos contextuais sem duplicar artigos.

## Leituras públicas previstas

- Lista de zonas publicadas.
- Detalhe de zona por slug com bairros publicados.
- Detalhe de bairro por slug com relações institucionais expandidas de forma limitada.
- Profissionais elegíveis por território, com ordenação rotativa determinística ou A–Z `pt-BR`.
- Artigos publicados relacionados ao território.

Todas as respostas devem ser validadas pelo adapter central antes de renderização ou cache. Rascunhos, campos administrativos, evidências internas e dados de contato não públicos nunca chegam ao cliente.

## Migração incremental

1. Manter `ContentRepository` como fronteira do frontend.
2. Adicionar adapters REST validados por coleção, sem importar Payload core.
3. Comparar IDs, slugs e relações remotos com o inventário local.
4. Migrar leituras uma família por vez, mantendo fallback local somente quando explicitamente previsto e sem misturar autoridade de publicação.
5. Remover o registro local apenas depois de equivalência verificada, testes de contrato e aprovação editorial.
