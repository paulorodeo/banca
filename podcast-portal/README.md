# Podcast Banca Digital — portal independente

**Site em produção:** https://podcast.bancapaulista.org/  
**Worker:** `banca-podcast`  
**Conta Cloudflare:** `7b2dfe1e7fa69edb06d7bf74d7ebc942`  
**RSS:** `feed-banca`, disponível em https://feed-banca.paulista.workers.dev/rss.xml

## Arquitetura

- `worker.js`: portal SSR (homepage, catálogo, páginas individuais de episódios, player de áudio, RSS, robots.txt, sitemap.xml, CSS e JS).
- `wrangler.jsonc`: configuração isolada do Worker.
- Service Binding `PODCAST_FEED` → `feed-banca`. Áudios continuam hospedados no AzuraCast, sem proxy de mídia.
- Cache de metadados em memória (TTL de aproximadamente 3 minutos). Não modifica o acervo ou o feed original.
- Domínio personalizado `podcast.bancapaulista.org` já vinculado ao Worker diretamente no Cloudflare. Não mexer no DNS de `bancapaulista.org` nem nos Workers `banca`, `banca-prod` ou `feed-banca`.

## Desenvolvimento local

Extrair esta pasta como projeto autônomo (sem mudar o working tree do portal jurídico), instalar/usar Wrangler e testar:

```bash
npx wrangler dev --config wrangler.jsonc
npx wrangler deploy --config wrangler.jsonc
```

Executar os comandos no diretório `podcast-portal/` usando a conta Cloudflare **Banca Paulista**, nunca a `pjdigital-me`.

## Rotas

- `/`: homepage e catálogo de episódios.
- `/episodio-<numero>-<slug>`: página individual gerada com base nos dados do RSS.
- `/rss.xml`: cópia pública do RSS via Service Binding, com self-link local; `/rss` redireciona.
- `/sitemap.xml`: lista de episódios; `/robots.txt` permite indexação do domínio canônico.
- `/healthz`: rota de diagnóstico.
- `/assets/styles.css` e `/assets/app.js`: recursos embutidos no Worker, sem build adicional.

## Cuidados editoriais e evoluções futuras

- O slug é derivado do título; **alterar o título de um episódio no RSS pode alterar a URL**. Para garantias de permalinks imutáveis após correções editoriais, adicionar KV/D1 como catálogo de slugs persistentes antes de promover amplamente as páginas individuais.
- Não inventar episódios, transcrições, títulos ou datas. Os dados vêm do AzuraCast/RSS.
- A reprodução é iniciada pelo usuário, usando um único `audio` HTML por página.
- Manter a identidade azul-marinho e dourada, o header/footer e a navegação de retorno ao portal principal.
- Validar responsividade e Core Web Vitals reais em navegador; foram feitos testes HTTP/HTML, ainda não houve auditoria Lighthouse desta versão.
