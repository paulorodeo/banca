# Radar Paulista 0.1 — arquitetura editorial e técnica

Status: fundação local, sem coleta automática ou integração de produção.

## Limites do produto

O Radar Paulista publica informações institucionais, normativas, empresariais e territoriais depois de revisão. Não oferece consulta de CPF, RG, antecedentes, dossiês pessoais ou monitoramento judicial individualizado. Um documento ser público não torna adequada a indexação de todos os dados que contém.

São Paulo é o município inicial, não um limite arquitetural. Toda referência geográfica admite país, UF, município, código oficial e subdivisões locais. Uma cidade só recebe página pública quando houver conteúdo editorial aprovado.

## Pipeline

```text
Agendador
    ↓ dispara trabalho, sem decidir publicação
Adaptador de fonte → Coleta → Registro imutável de execução
    ↓
Normalização → Deduplicação → Classificação por regras/metadados
    ↓
Triagem de privacidade → Revisão humana → Aprovação editorial
    ↓
Publicação (card | página documental | artigo editorial)
```

### 1. Agendamento

Cron ou outro orquestrador cria uma solicitação de execução idempotente. Ele não contém credenciais editoriais, não interpreta documentos e não publica conteúdo.

### 2. Aquisição

Cada fornecedor implementa um adaptador com limites explícitos de tempo, tamanho, paginação e taxa. REST, RSS, Atom, HTTP documental e importação manual convergem para o mesmo `RadarIngestEnvelope`. Credenciais ficam exclusivamente no servidor.

O envelope registra referência ao material obtido, mas `rawContentStored` é `false` no contrato inicial. Armazenamento de documento bruto exige finalidade, retenção, licença e análise específica.

### 3. Processamento

- Validação estrutural e de URL.
- Normalização sem inventar campos ausentes.
- Chave idempotente por fornecedor + ID externo; na ausência, URL + título original.
- Classificação inicial por metadados ou regras versionadas.
- IA futura é opcional; qualquer sugestão registra método e confiança e não substitui revisão.
- Triagem de privacidade sinaliza padrões óbvios, mas resultado negativo não comprova anonimização.

### 4. Revisão e publicação

Somente `_status=published` no Payload e decisão editorial aprovada autorizam leitura pública futura. O adapter público também exige privacidade liberada, data original e data de verificação. Itens duplicados ou sinalizados não são expostos.

Formatos possíveis:

- `card`: informação breve, contextualizada e ligada à fonte.
- `document-page`: página própria apenas quando o documento sustenta valor editorial distinto.
- `editorial-article`: interpretação ou explicação assinada e revisada.

Recebimento não gera URL pública. O Radar 0.1 vazio usa `noindex, follow`.

## Contrato de entrada

Implementado em `src/content/radar.ts` com Zod:

- `providerKey`, `sourceType`, `externalId?`;
- `sourceName`, `sourceUrl`, `originalTitle`;
- `originalPublishedAt?`, `collectedAt`;
- `payloadReference?`, `licenseNote?`;
- `rawContentStored: false`.

O contrato normalizado acrescenta título editorial, resumo, categoria, órgão, geografia, relações territoriais, datas, status, apresentação, referências, restrições, privacidade e proveniência da classificação.

## Payload CMS — entidades conceituais

Implantar somente quando o primeiro fluxo real exigir:

- `radarSources`: configuração editorial da fonte, licença, limites e estado.
- `radarCollectionRuns`: execução, cursor, horários, contagens e erro sanitizado.
- `radarCollectedItems`: envelope e fingerprint, com retenção restrita.
- `radarInformation`: registro normalizado e relações.
- `radarReviews`: decisões, responsável, justificativa e versão.
- `radarPublications`: formato público e vínculo canônico.
- `radarCategories`: taxonomia controlada.
- `territories` e `institutionRelations`: reutilização dos contratos territoriais.

Processos agendados usam identidade técnica separada do painel editorial. O frontend nunca importa Payload core nem acessa credenciais.

## Segurança e privacidade

- Allowlist de protocolos e validação de redirecionamentos para reduzir SSRF.
- Limites de bytes, páginas, tempo, concorrência e frequência por fonte.
- Idempotência por execução e item; retry com backoff e circuit breaker.
- Logs com IDs internos, sem conteúdo documental ou dados pessoais.
- Quarentena para suspeita de CPF, RG, biometria, contato particular ou sigilo.
- Revisão humana obrigatória para dúvida de identidade, sensibilidade ou finalidade.
- Política de retenção por fonte e exclusão verificável.
- Histórico de origem, transformações, decisão e última verificação.
- Links originais validados; conteúdo externo nunca vira HTML confiável.

## Primeiro teste de coleta proposto — não executado

**Fonte:** API pública do Querido Diário. **Recorte:** um município identificado por código IBGE, período curto e termo institucional não pessoal. **Objetivo:** validar envelope, paginação, limites, deduplicação e proveniência sem publicar resultados.

Etapas de aprovação futura:

1. Revisar termos, licença, atribuição e limite recomendado vigente.
2. Definir consulta estreita e orçamento máximo de requisições/bytes.
3. Rodar em fixture ou ambiente isolado sem persistir PDFs integrais.
4. Normalizar metadados e excertos mínimos, mantendo URL original.
5. Testar duplicidade, falha parcial e retomada idempotente.
6. Submeter todos os itens à privacidade e revisão humana.
7. Não publicar nem agendar recorrência sem nova autorização.

Documentação: <https://docs.queridodiario.ok.org.br/pt-br/latest/utilizando/api-publica.html>.

## Produtos futuros — sem implementação

Radar Municipal, Licitações, Relatórios, GeoLegal, Pro e Verify são hipóteses comerciais. O Radar 0.1 não contém contas, pagamentos, assinaturas, planos ou gates de acesso.
