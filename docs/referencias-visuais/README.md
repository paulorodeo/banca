# Referências visuais — Banca Paulista

Este diretório reúne documentos de composição e fotografias de apoio. Os arquivos são referências de design e não entram automaticamente na distribuição pública.

## Referências de layout

- `banca-master.png`: referência principal de identidade, proporções, hierarquia e composição.
- `banca-ponte.png`: referência complementar para o hero metropolitano e a apresentação territorial de São Paulo.
- `delegacias.png`: referência futura do diretório `/delegacias` e das famílias de órgãos públicos. É uma composição visual, não uma fonte de dados.

### Diretório de órgãos públicos

**Referência:** `delegacias.png` (935 × 1683)

- Escopo futuro: `/delegacias` e diretórios reutilizáveis de fóruns, defensorias públicas, conselhos tutelares, cartórios e outros órgãos aprovados.
- Composição desktop: navegação institucional primária; navegação secundária por tipo de órgão; hero metropolitano; busca e filtros por zona; conteúdo em duas colunas; grade institucional à esquerda e profissionais independentes à direita.
- Componentes previstos: `PublicBodiesNav`, `InstitutionDirectoryHero`, `InstitutionSearch`, `ZoneFilters`, `InstitutionCard`, `ProfessionalDirectoryAside`, `ProfessionalCard`, `ProfessionalSort` e estados vazio/erro/carregamento.
- Responsividade prevista: a coluna profissional desce após a listagem principal em telas estreitas; busca, filtros e navegação secundária permanecem utilizáveis por teclado e não causam overflow horizontal.
- Fonte dos órgãos: Payload CMS após contrato validado. As 91 páginas territoriais atuais, seus slugs e o grafo local devem permanecer preservados durante a migração incremental.
- Fonte dos profissionais: somente registros reais, consentidos, validados e publicados pelo Payload. WordPress permanece restrito a recursos auxiliares de WhatsApp quando aprovados.
- Estado inicial obrigatório: sem profissionais publicados, renderizar estado vazio editorial; não criar cards, fotos, OABs, especialidades, disponibilidade ou contatos fictícios.
- Ordenação futura: “Rotativa” determinística e auditável como padrão e alternativa “A–Z” estável em `pt-BR`, com SSR e hidratação consistentes. Não constitui ranking de qualidade nem posição paga.
- Dados operacionais: endereço, telefone, horário, área de atuação/circunscrição e fotografia de fachada só aparecem quando vinculados à unidade correta e validados por fonte oficial. A referência não comprova nenhum desses campos.
- Busca: deve ser funcional por número, nome ou bairro e consumir dados validados; não reproduzir um campo meramente decorativo.
- SEO e acessibilidade: preservar URLs e metadata existentes, headings semânticos, labels, foco visível, navegação por teclado, estados anunciados e conteúdo indexável somente quando publicado.
- Fora do escopo da referência: nomes, números de OAB, retratos, telefones, endereços, fachadas, áreas de atuação e o botão “Entrar” mostrados na composição não autorizam dados, autenticação ou funcionalidades reais.
- Status: documentado para etapa futura; nenhuma implementação de `/delegacias` ou do diretório profissional está autorizada nesta entrega.

## Catálogo de imagens de apoio

### Participação profissional

**Asset reservado:** `imagens-sp/advogado-assinando-documento-jurídico`

- Formato preferencial: AVIF (`.avif`, 24 KB).
- Fallback: WebP (`.webp`, 40 KB, 2172 × 724).
- Uso aprovado para etapa futura: banner horizontal da seção “Participação Profissional” da homepage, com o CTA “Conhecer a iniciativa”. A seção está integrada à homepage nesta finalização visual.
- Composição: texto na área negativa azul-marinho à esquerda; figura e documento preservados à direita.
- Tratamento previsto: `<picture>` com AVIF como `source` e WebP como fallback, sem baixar ou renderizar os dois arquivos simultaneamente.
- Carregamento previsto: `loading="lazy"`, sem prioridade de LCP, por estar abaixo da dobra.
- Limites editoriais: imagem decorativa, sem identificar um profissional, sugerir vínculo com a Banca Paulista, atendimento disponível, recomendação ou prestação de serviço jurídico pelo portal.
- Alt previsto: vazio (`alt=""`) se o texto da seção transmitir integralmente a mensagem; não descrever a pessoa como integrante do portal.
- Integração local: `public/images/sp/participacao-profissional.avif` e `.webp`, com AVIF prioritário, imagem decorativa e carregamento abaixo da dobra. Nenhum deploy realizado.

### São Paulo

- `public/images/sp/ponte`: hero metropolitano publicado em AVIF com fallback WebP. Usado na homepage, no diretório `/delegacias`, em `/regioes` e `/regioes/zona-sul`. Pinheiros utiliza composição gráfica institucional até haver fotografia específica.
- `public/images/sp/masp`: hero publicado em AVIF com fallback WebP. Usado em `/regioes/centro`.
- Os JPG de Ponte e MASP permanecem neste diretório apenas como reserva documental e não entram na distribuição pública.

## Regras de integração

1. Não importar referências PNG de layout no frontend.
2. Priorizar AVIF e declarar somente os fallbacks necessários em `<picture>`.
3. Assets efetivamente publicados vivem somente em `public/images/sp`; não manter cópias equivalentes em `src/assets` ou `docs`.
4. Confirmar fonte, licença, crédito, dimensões e ponto focal antes da publicação.
5. Não usar imagens como evidência de vínculo institucional, cobertura territorial ou disponibilidade profissional.

## Fotografias territoriais integradas em 15/10/2026

O manifesto `src/content/local/visual-media.ts` registra as imagens da homepage e suas atribuições. Os arquivos em `public/images/sp/` são derivados AVIF/WebP, com redimensionamento e recorte de exibição:

- `carandiru`: Lukaaz, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bairro_do_Carandiru,_SP_-_by_Lucas.JPG), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- `parque-do-carmo`: Lukaaz, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Panorama_do_lago_do_Pq._do_Carmo_-_by_Lucas.jpg), [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- `pinheiros`: Ronit Bhattacharjee (Slyronit), [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Pinheiros,_Sao_Paulo_2.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Os derivados desta fotografia mantêm CC BY-SA 4.0; isso não altera a licença do código do portal.

Os créditos com links de fonte/licença são acessíveis no fechamento da homepage. Essas imagens ilustram os territórios reais; não representam fachadas, competência ou área atendida por uma unidade policial. As miniaturas editoriais sem capa própria são ilustrações decorativas, não fotografias dos fatos narrados.

### Acabamento fotográfico e reutilização — 15/10/2026

Homepage e `/regioes` compartilham `ZoneCardLight`, `zonePhotography` e a contagem de guias canônicos de `zonas.ts`. Os cinco derivados de card têm 800 × 450 pixels, AVIF com fallback WebP; pontos focais ficam somente no manifesto. Centro (MASP) e Sul (Ponte Estaiada) preservam as fotografias fornecidas.

- Norte: Avenida Braz Leme 2024, Pedu0303, [fonte](https://commons.wikimedia.org/wiki/File:Avenida_Braz_Leme_2024.jpg), [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Comparada à Avenida Luiz Dumont Villares; escolhida pela composição urbana e identificação territorial.
- Leste: skyline do Tatuapé junto à Radial Leste, Larry LaRose, [fonte](https://commons.wikimedia.org/wiki/File:Skyline_of_Tatuape_near_Shopping_Tatuape_and_Radial_Leste_-_panoramio.jpg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/). Comparada à fotografia Terminal Metrô Tatuapé e Radial Leste; a imagem selecionada preserva melhor avenida, corredor ferroviário e edifícios. Derivados mantêm a licença.
- Oeste: vista aérea de Pinheiros/Largo da Batata, **Marcos Santos/USP Imagens**, [fonte e condições](https://imagens.usp.br/editorias/lugares-categorias/vista-aerea-de-pinheiros/). Reprodução livre mediante crédito ao fotógrafo e à USP Imagens; não se atribui licença Creative Commons à imagem. Comparada a outro enquadramento da Faria Lima e ao panorama do Butantã.

As dez miniaturas circulares usam derivados de 128 × 128 pixels, com autores, fontes e licenças em `photoCredits`. Os recortes e redimensionamentos são adaptações de apresentação; as licenças das fotografias permanecem aplicáveis. A faixa contém Pinheiros, Santo Amaro, Carandiru, Tatuapé, Lapa, Butantã, Itaquera, Liberdade, Parque do Carmo e Brooklin, com destinos publicados. As imagens antigas continuam preservadas. Créditos acessíveis na homepage.
