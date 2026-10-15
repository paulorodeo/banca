# Checkpoint da Banca Paulista — 15 de outubro de 2026

Este documento permite retomar o projeto sem depender do histórico da sessão anterior. Ele registra o estado observado na branch de desenvolvimento, as entregas implementadas no working tree, as decisões arquiteturais aprovadas e o trabalho ainda pendente.

## Estado do repositório

- Repositório: `/home/paulo/workspace/lawsp`
- Branch ativa: `codex/banca-redesign`
- HEAD observado: `ad23437fbd4dd1c3bc550f25c85fe0552ad6a8b4`
- Mensagem do HEAD: `Corrigiu dados e rotas`
- Data do HEAD: `2026-10-15T00:54:22Z`
- Estado: working tree com alterações rastreadas e arquivos novos ainda não rastreados.
- Nenhuma modificação foi descartada neste checkpoint.
- Nenhum commit, merge, rebase, push ou deploy foi realizado neste checkpoint.
- A branch `main` não foi alterada.

As implementações descritas abaixo ainda devem ser consideradas trabalho não consolidado em commit. Antes de qualquer nova alteração, executar `git status --short --branch` e revisar o diff existente. Não usar reset, checkout destrutivo ou limpeza de arquivos.

## Entregas implementadas no working tree

### Entrega 1 — base visual, header e footer

- Design system consolidado em azul-marinho profundo, marfim, superfícies claras e dourado discreto.
- Tokens semânticos de cor, tipografia, espaçamento, bordas, foco e transições revisados.
- Marca, header, navegação e footer reconstruídos sem alterar a arquitetura geral do frontend.
- Menu móvel preparado como diálogo acessível, com foco inicial, contenção de foco, fechamento por `Escape`, bloqueio de rolagem, restauração de foco e fechamento pelo backdrop.
- Referências `banca-master.png` e `banca-ponte.png` examinadas como documentos de direção visual, sem uso automático como assets finais do site.
- Assets metropolitanos e da futura seção Participação Profissional catalogados como referências, com AVIF prioritário e WebP/JPG como alternativas.

### Navegação territorial

- `/regioes` redesenhada como entrada editorial para as cinco zonas.
- Hubs existentes preservados e modernizados:
  - `/regioes/centro`
  - `/regioes/zona-norte`
  - `/regioes/zona-leste`
  - `/regioes/zona-sul`
  - `/regioes/zona-oeste`
- Template reutilizável adicionado em `/bairros/$slug`.
- Primeira página funcional adicionada em `/bairros/pinheiros`.
- Busca e filtros territoriais, cards institucionais e estados vazios acessíveis preparados.
- Componentes reutilizáveis preparados para hero territorial, índice de bairros, cards de instituições, sidebar de profissionais e artigos relacionados.
- A página de Pinheiros utiliza apenas relação institucional sustentada pelos dados locais existentes, apontando para a página canônica da 14ª Delegacia de Polícia. Nenhum endereço, competência ou cadastro fictício foi criado.
- Os 91 guias territoriais de delegacias e seus slugs foram preservados.

### Radar Paulista 0.1

- Página `/radar` implementada com hero, apresentação editorial, pesquisa, filtros e estado vazio.
- Enquanto não houver registros reais aprovados, a página permanece sem itens simulados e usa `noindex, follow`.
- Contrato de entrada independente de fornecedor preparado para REST, RSS, Atom, HTTP, documentos e importação manual.
- Pipeline conceitual documentado: fonte, coleta, normalização, deduplicação, classificação por regras, verificação de privacidade, revisão humana e publicação.
- Tipos e validação cobrem proveniência, datas, território, licença/restrições, sinais de privacidade e projeção pública.
- Nenhum conector, cron, coleta automática, serviço pago ou ingestão em produção foi ativado.

## Decisões arquiteturais aprovadas

### Identidade e responsabilidade editorial

- A Banca Paulista é um portal editorial independente. A interface, os metadados e os schemas compartilhados não devem apresentá-la como escritório de advocacia, advogado individual ou órgão público.
- Configurações de marca e publisher devem permanecer centralizadas.
- Conteúdo jurídico e dados editoriais existentes não podem ser alterados como efeito colateral de mudanças visuais.
- O canal editorial não pode se converter em captação de casos. O endpoint aposentado de intake deve continuar respondendo HTTP 410 sem ler nem registrar dados submetidos.

### Payload CMS

- Payload CMS é o backend editorial e administrativo central aprovado.
- O frontend TanStack Start deve consumir somente o contrato REST público validado. Payload core e o runtime Next.js do Payload não podem entrar no bundle Cloudflare.
- O campo nativo `_status` é a autoridade de publicação. Rascunhos não podem chegar ao frontend público.
- Respostas devem ser validadas antes de qualquer cache. Cache durável só deve ser ativado quando existir autoridade de revisão durável, verificada ao redor das leituras.
- O adapter público em inglês e a validação Lexical devem permanecer centralizados.
- Artigos atravessam funções públicas de servidor; o território continua local durante a migração gradual.
- Coleções territoriais e do Radar devem ser criadas apenas quando houver necessidade real, sem antecipar um segundo painel administrativo.
- Contratos futuros incluem zonas, bairros, categorias e unidades institucionais, profissionais, especialidades, artigos, fontes, coletas, informações normalizadas, revisões e publicações.

### Regiões, zonas e bairros

- A arquitetura das zonas permanece centralizada em `src/content/local/zonas.ts`.
- Toda região declarada em `regioes.ts` deve apontar para um slug de zona válido.
- Permanecem cinco hubs: Centro, Zona Norte, Zona Leste, Zona Sul e Zona Oeste.
- Itaim Bibi permanece classificado na Zona Sul, conforme decisão editorial.
- A homepage territorial deve derivar cards das zonas e encerrar com “Todas as regiões”, sem voltar a gerar cards independentes de bairros.
- Páginas de bairros são hubs jurídico-territoriais e usam `/bairros/$slug`; somente bairros publicados devem receber links próprios.
- Quando um bairro ainda não estiver publicado, deve-se preservar o destino válido existente, nunca criar link quebrado.
- Instituições podem se relacionar com múltiplos bairros, mas mantêm um único registro e uma única página canônica.
- A relação territorial precisa distinguir localização física de competência, atendimento ou outra relação confirmada. Proximidade não prova competência.
- A capital paulista é o primeiro recorte editorial, mas a modelagem futura deve admitir país, UF, município, código territorial oficial e subdivisões locais.

### Órgãos públicos

- A referência `docs/referencias-visuais/delegacias.png` orienta uma futura reformulação de `/delegacias` e de diretórios reutilizáveis para fóruns, defensorias, conselhos tutelares e cartórios.
- Os 91 guias de delegacias, seus slugs e o grafo territorial centralizado devem ser preservados.
- Novas delegacias devem entrar em módulos locais tipados e ser registradas na ordem central, no grafo territorial e na coleção regional da home.
- Nomes oficiais e respectivas evidências devem ficar separados de dados operacionais. Não inferir área atendida, competência, endereço ou horário.
- Cards de bairro devem levar diretamente à página canônica da instituição, sem uma listagem intermediária por categoria.
- A referência visual não é fonte de dados. Nomes, endereços, telefones, fotografias e demais informações ilustrativas não podem ser copiados.

### Profissionais independentes

- `ProfessionalSidebar` é compartilhável entre bairros, diretórios e unidades institucionais.
- Só podem aparecer profissionais reais, publicados, com identidade e inscrição verificadas, consentimento apropriado e cobertura territorial compatível.
- Enquanto não houver cadastros aprovados, deve ser exibido um estado vazio institucional, sem perfis ilustrativos.
- A ordenação padrão é Rotativa, equilibrada e estável durante a navegação; A–Z é a alternativa explícita.
- Valor pago não pode determinar posição na rotação.
- O contato ocorre diretamente com o profissional, inclusive por WhatsApp quando autorizado. O portal não recebe relatos de casos nem intermedeia contratação.
- WordPress, quando necessário, fica limitado a recursos auxiliares de WhatsApp; não será backend editorial.

### Radar Paulista e inteligência de dados

- Agendamento, aquisição, processamento, revisão e publicação são responsabilidades separadas.
- O contrato comum deve aceitar múltiplas fontes sem depender de fornecedor único.
- A classificação inicial usa regras e metadados. IA é opcional e futura; inferências automáticas devem registrar origem e confiança.
- A publicação prioriza informação institucional, normativa, empresarial e territorial, sempre com proveniência, contexto e referência temporal.
- Não será criado serviço de consulta de CPF, RG, antecedentes ou outros dados pessoais.
- Documentos com possíveis dados pessoais, sensíveis ou sigilosos exigem retenção mínima e revisão humana. Remover identificadores isolados não garante anonimização.
- O sistema não deve copiar indiscriminadamente conteúdo integral das fontes nem criar uma página indexável para cada item coletado.
- Formatos públicos previstos: card informativo, página documental justificada e artigo editorial revisado.
- O primeiro teste sugerido usa uma fonte pública apropriada, como Querido Diário, mas ainda não foi executado.
- Fornecedores candidatos estão registrados apenas para pesquisa. Nenhum serviço comercial foi contratado ou integrado.
- Produtos futuros — Banca Radar Municipal, Banca Licitações, Banca Relatórios, Banca GeoLegal, Banca Pro e Banca Verify — estão apenas registrados como possibilidades. Pagamentos, assinaturas e contas comerciais não foram implementados.

## Arquivos com alterações rastreadas

- `src/components/site/brand.tsx`
- `src/components/site/footer.tsx`
- `src/components/site/header.tsx`
- `src/components/site/primitives.tsx`
- `src/content/repository.ts`
- `src/content/types.ts`
- `src/routeTree.gen.ts`
- `src/routes/regioes.$slug.tsx`
- `src/routes/regioes.index.tsx`
- `src/styles.css`

O diff rastreado observado totaliza 589 inserções e 188 remoções. Esse total não inclui os arquivos ainda não rastreados.

## Arquivos novos ainda não rastreados

### Documentação e referências

- `docs/RELATORIO_MESTRE_BANCA_PAULISTA_CODEX_2026-10-14.md`
- `docs/contrato-territorial-payload.md`
- `docs/radar-paulista-arquitetura.md`
- `docs/radar-paulista-fontes-candidatas.md`
- `docs/referencias-visuais/README.md`
- `docs/referencias-visuais/bairo-pinheiros.png`
- `docs/referencias-visuais/banca-master.png`
- `docs/referencias-visuais/banca-ponte.png`
- `docs/referencias-visuais/delegacias.png`
- `docs/referencias-visuais/imagens-sp/advogado-assinando-documento-jurídico.avif`
- `docs/referencias-visuais/imagens-sp/advogado-assinando-documento-jurídico.webp`
- `docs/referencias-visuais/imagens-sp/masp.avif`
- `docs/referencias-visuais/imagens-sp/masp.jpg`
- `docs/referencias-visuais/imagens-sp/masp.webp`
- `docs/referencias-visuais/imagens-sp/ponte-estaiada.avif`
- `docs/referencias-visuais/imagens-sp/ponte-estaiada.jpg`
- `docs/referencias-visuais/imagens-sp/ponte-estaiada.webp`

### Código e testes

- `src/components/site/radar-directory.tsx`
- `src/components/site/territory.tsx`
- `src/content/local/bairros.test.ts`
- `src/content/local/bairros.ts`
- `src/content/local/radar.ts`
- `src/content/radar.test.ts`
- `src/content/radar.ts`
- `src/routes/bairros.$slug.tsx`
- `src/routes/radar.tsx`

Este próprio checkpoint também é um arquivo novo até ser adicionado ao Git.

## Verificações já executadas

- `bun run build`: aprovado.
- Verificação TypeScript: aprovada.
- Testes: 51 aprovados, 0 falhas.
- ESLint aplicado aos arquivos do escopo: aprovado.
- `git diff --check`: aprovado antes da criação deste documento.
- Smoke test HTTP:
  - `/radar`: 200
  - `/regioes`: 200
  - `/bairros/pinheiros`: 200
  - `/delegacias/advogado-14-dp-pinheiros`: 200
  - endpoint aposentado de intake via POST: 410
  - estado vazio do Radar: `noindex` confirmado

O lint global ainda encontra aproximadamente 2.472 ocorrências de Prettier preexistentes e fora do escopo alterado. Não foi feita uma reformatação global, para evitar um diff amplo e sem relação com as entregas.

## Pendências e limites conhecidos

- As entregas implementadas aguardam revisão e aprovação visual do responsável pelo projeto.
- A reconstrução completa da homepage não foi feita.
- Os heros internos fora do novo fluxo territorial não foram redesenhados integralmente.
- `/delegacias` ainda não foi reconstruída conforme `delegacias.png`; a imagem está registrada para entrega futura.
- Pinheiros ainda não possui fotografia geograficamente específica e autorizada. A composição atual usa uma imagem metropolitana genérica como fallback; substituir apenas quando houver asset licenciado de Largo da Batata, Faria Lima ou outro marco real do bairro.
- A seção Participação Profissional ainda não foi implementada; os assets de advogado estão apenas catalogados.
- Não existem profissionais reais aprovados para a sidebar; o estado vazio deve ser preservado.
- As coleções futuras do Payload para territórios, profissionais e Radar não foram implantadas.
- O primeiro teste de coleta do Radar não foi executado.
- Não há cron, ingestão automática em produção ou conector comercial ativo.
- Há referências antigas de marca/origem que precisam de auditoria dedicada, especialmente em `src/content/local/settings.ts`, `src/lib/seo.ts` e `src/lib/public-url.ts`. Não alterar automaticamente: confirmar política de marca, domínio público e impacto em canonical/metadata antes da correção.
- Confirmar se o servidor local continua ativo; processos de desenvolvimento não devem ser presumidos entre sessões.

## Retomada segura na próxima sessão

1. Ler `AGENTS.md`, este checkpoint e o Relatório-Mestre completo.
2. Confirmar `codex/banca-redesign` e executar `git status --short --branch`.
3. Revisar alterações rastreadas e não rastreadas sem descartá-las.
4. Reiniciar o servidor local em `http://localhost:8080/`, se necessário, e revisar visualmente desktop, tablet, celular, teclado e foco.
5. Revalidar build, TypeScript, testes, lint de escopo e `git diff --check` depois de qualquer ajuste aprovado.
6. Obter aprovação visual antes de avançar a homepage, heros internos, diretório de órgãos ou outras novas etapas.
7. Definir com o responsável o agrupamento de commits antes de adicionar ou publicar as mudanças. Não reescrever histórico publicado e não tocar na `main`.
8. Após a aprovação, escolher explicitamente a próxima entrega. As candidatas registradas são homepage/heros, diretório de órgãos públicos, integração gradual com Payload ou evolução controlada do Radar.

Não houve deploy para Cloudflare nem qualquer outro ambiente.


## Consolidação local autorizada — acabamento das zonas

A autorização posterior permite o commit local de consolidação, sem push, merge ou deploy. O histórico deste checkpoint permanece preservado.

- Homepage e `/regioes`: mesmo componente `ZoneCardLight`, manifesto fotográfico e contagem canônica compartilhada (Centro 8, Norte 16, Leste 33, Sul 26, Oeste 8). Cards completos em `/regioes`, imagens 16:9 e CTAs alinhados.
- Fotografias definitivas: MASP, Avenida Braz Leme, Tatuapé/Radial Leste, Ponte Estaiada e vista aérea de Pinheiros (Marcos Santos/USP Imagens). Créditos e condições no manifesto e no catálogo visual.
- Bairros em destaque: dez destinos reais em faixa horizontal com setas, toque e navegação por teclado.
- Radar, Banca Territorial e inteligência continuam desativados; documentos e contratos futuros são preservados. Intake aposentado permanece HTTP 410.
- Validação desta consolidação: TypeScript, lint dos arquivos alterados, 53 testes e build completo aprovados; revisão de `/regioes` em cinco larguras, de 320 a 1440 px, com fotos carregadas, alturas iguais, descrições completas e destinos das cinco zonas válidos.
- O acabamento permanece sujeito à avaliação visual do responsável pelo projeto. Nenhuma publicação remota foi autorizada.
