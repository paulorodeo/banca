# Configuração obrigatória antes da publicação

`PUBLIC_SITE_URL` é obrigatória no runtime de produção. Deve conter somente a origem HTTPS do domínio escolhido para o portal, sem caminho, credenciais, query ou fragmento. A variável não é segredo. Não usar a URL do CMS.

Não há fallback de produção para Lovable, localhost ou subdomínio temporário de hospedagem. Sem uma origem pública válida, a publicação deve permanecer bloqueada: a renderização não emite canonicals presumidos, sitemap/robots retornam 503 e o robots indisponível proíbe rastreamento. Em desenvolvimento, sem variável, a revisão permanece em `http://localhost:8080`.

Antes de qualquer deploy, executar no ambiente configurado:

```sh
bun scripts/check-publication.ts
```

A configuração real do domínio definitivo ainda precisa ser fornecida pelo responsável pela publicação. `portal.example.test` aparece somente nas verificações automatizadas, como fixture, e não é uma escolha de domínio.

Canonical, `og:url`, imagens sociais, schemas, sitemap e robots utilizam a mesma política de URLs. Imagens externas autorizadas de artigos preservam sua própria origem. O sitemap consulta a fonte editorial pública existente (Payload quando configurado; artigos locais aprovados caso contrário), percorre as páginas e falha com 503 se não puder obter uma coleção completa. Não publica lista parcial nem rascunhos. Nenhuma integração futura foi ativada.

`/sitemap.xml` inclui os destinos publicados e elegíveis, sem filtros, APIs, perfis inexistentes ou Radar. `/robots.txt` mantém a política de permitir rastreamento e referencia o sitemap na origem configurada. O sitemap não utiliza datas de alteração inventadas. A imagem social institucional é uma composição gráfica original de 1200 × 630 px, sem retratos ou alegações factuais. As fotos territoriais aprovadas mantêm seus créditos e licenças; seus derivados WebP são usados somente nas páginas correspondentes.

A marca pública e a descrição institucional vivem em `src/content/local/settings.ts`. Referências históricas em documentos e conteúdos legítimos não são substituídas em massa.

## Validação local da estabilização — 15/10/2026

- TypeScript, lint do escopo, 57 testes, build completo e `git diff --check` aprovados.
- Auditoria Chromium: 15 páginas em cinco larguras (320, 375, 768, 1024 e 1440 px), sem overflow horizontal da página ou erros JavaScript capturados; 108 destinos internos válidos.
- Menu: 375 → 1440 → 375 px, rolagem restaurada, foco em elemento visível, Escape, Tab, Shift+Tab, navegação e aberturas repetidas aprovados. Efeitos removem listeners e timeout no cleanup.
- Origem configurável: servidor local separado com origem HTTPS de teste; canonical, og:url, imagens sociais, schemas, robots e sitemap coerentes. A fixture não altera o domínio real do projeto.
- Sitemap XML válido com 110 URLs: 91 delegacias, cinco zonas, Pinheiros, três artigos aprovados e dez destinos gerais/institucionais. Todos os destinos retornaram 200. Módulos futuros, perfis inexistentes e APIs excluídos.
- `/artigos?page=2` e `?page=999`: 404, noindex e sem canonical autorreferente. Paginação real (`?page=2&limit=1` e `?page=3&limit=1`) continua retornando 200.
- Busca com fonte de 16 px e botão de 44 × 44 px nas cinco larguras. Ações de seção com altura de 44 px; links institucionais da homepage e breadcrumbs com mínimo de 24 px. Foco da busca com contorno navy.
- Imagem social institucional carregada como PNG 1200 × 630; imagens territoriais WebP 800 × 450. Nenhuma fotografia aprovada foi substituída.
- `/radar` e `/radar/`: 404. POST `/api/public/triagem`: 410.
- Preflight sem `PUBLIC_SITE_URL`: reprovação esperada. Publicação bloqueada até configurar uma origem pública real. Não houve deploy, push, merge ou alteração da main.

Essas verificações são locais; não representam aprovação de Core Web Vitals em produção ou medição de tráfego/indexação real no Google.
