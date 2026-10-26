# Banca Paulista

**Portal editorial independente de informação jurídica, institucional e territorial, com foco na cidade de São Paulo.**

A Banca Paulista reúne jornalismo, notícias, artigos e guias para orientar a navegação por bairros, regiões, delegacias, órgãos públicos e serviços. O conteúdo tem caráter informativo e não constitui atendimento jurídico.

> **Independência editorial:** a Banca Paulista não é uma sociedade de advocacia, não representa os órgãos públicos mencionados e não presta atendimento jurídico direto.

## Estrutura editorial

- **Início:** apresentação do portal e acesso aos conteúdos.
- **Notícias:** reportagens e cobertura de acontecimentos locais e institucionais.
- **Atlas Brasil em Foco:** exploração jornalística do país por região, estado e camada temática.
- **Artigos:** conteúdos explicativos sobre direito e cidadania.
- **Regiões e bairros:** guias territoriais de São Paulo.
- **Delegacias e instituições:** diretório informativo de órgãos e serviços públicos.
- **Profissionais e vagas:** áreas informativas preparadas para expansão.
- **Rádio:** Rádio Banca Digital e acesso à programação de áudio.

As informações e vínculos territoriais são mantidos por uma camada de conteúdo separada da interface. A arquitetura prevê integração futura com um CMS, sem dependência de dados institucionais inventados.

## Atlas Brasil em Foco

O **Brasil em Foco — O Brasil, em múltiplas camadas** é um Atlas editorial interativo que conecta o noticiário da Banca Paulista à geografia brasileira. Seu objetivo é permitir que o leitor descubra reportagens e contextos institucionais a partir do território e do assunto, sem confundir o mapa com um serviço de navegação ou monitoramento de trânsito em tempo real.

### Navegação e cobertura

- **Mapa interativo:** geometria SVG das 27 unidades federativas, com seleção por clique ou teclado e destaque visual dos estados.
- **Recorte regional:** filtros para Norte, Nordeste, Centro-Oeste, Sudeste e Sul; seleção de UF e retorno à visão nacional.
- **Camadas temáticas:** Notícias, Justiça, Política, Economia, Agronegócio, Clima, Infraestrutura, Rodovias e População. A exibição de notícias em cada camada depende da cobertura editorial disponível.
- **Painel contextual:** manchetes, resumos e links para reportagens publicadas, filtrados pelo recorte geográfico e temático.
- **Portais geográficos:** rotas `/noticias/brasil`, `/noticias/regioes/:slug` e `/noticias/estados/:uf`, com navegação condicionada à existência de conteúdo; áreas sem cobertura podem não disponibilizar uma página pública.
- **Geografia de referência:** limites estaduais generalizados da Malha Territorial 2025 do IBGE, identificados e creditados na interface.

O Atlas aparece na Home e dispõe de componentes reutilizáveis para os portais geográficos. Seu modelo editorial relaciona notícias a UFs, regiões e editorias, preservando a URL original de cada reportagem.

### Dados reais, demonstrações e indexação

Notícias fictícias usadas para demonstrar os filtros são separadas do acervo publicado. A flag `VITE_ATLAS_DEMO=true` permite habilitá-las **somente** nos modos de desenvolvimento ou staging previstos no código; páginas com demonstrações recebem `noindex`. Conteúdo de demonstração não deve ser incluído no sitemap, nos feeds públicos ou em páginas indexáveis de produção.

Na versão **atualmente commitada nesta branch**, a camada Clima exibe uma observação referente à capital paulista. As demais camadas funcionam como recortes temáticos das notícias existentes, conforme sua disponibilidade. Em particular, o seletor **Rodovias ainda não desenha a malha rodoviária no SVG** e não deve ser apresentado como acompanhamento em tempo real.

### Evolução planejada

As próximas entregas incluem ampliar os dados oficiais de População (IBGE), Agronegócio (Conab) e Clima por UF; sobrepor geometrias reais de rodovias federais com traçados luminosos selecionáveis; e conectar notas externas de fontes RSS/Atom ou APIs aos hubs editoriais, com atribuição, curadoria, respeito a direitos autorais e preservação do SEO. A integração futura com **Payload CMS** deverá reutilizar os modelos e componentes existentes. Essas frentes **não devem ser tratadas como funcionalidades já publicadas** apenas por existirem em estudos ou alterações locais ainda não commitadas.

### Principais pontos de implementação

- `src/components/site/brazil-editorial-atlas.tsx` — interface interativa.
- `src/content/local/brasil-ufs.ts` — estados, regiões e geometrias SVG.
- `src/content/atlas.functions.ts` — leitura e organização dos itens editoriais.
- `src/content/local/brasil-atlas-model.ts` — filtros geográficos e temáticos.
- `src/components/site/news-geography-portal.tsx` — composição dos portais geográficos.

O código presente no Git, o workspace local e os Workers publicados podem estar em versões diferentes. Verifique sempre o commit, o build e o destino da publicação antes de afirmar que uma nova camada já está disponível ao público.

## Tecnologia

- **Aplicação:** TypeScript, React e TanStack Start.
- **Interface:** Vite e Tailwind CSS.
- **Servidor e publicação:** Nitro e Cloudflare Workers.
- **Conteúdo:** repositórios locais estruturados, com preparação para integração ao Payload CMS.
- **Áudio:** player de rádio com suporte aos formatos utilizados pelas estações configuradas.
- **Busca e descoberta:** metadados por rota, canonical, Open Graph, dados estruturados e feeds de notícias.

## Repositório e branch de trabalho

**Repositório:** [paulorodeo/banca](https://github.com/paulorodeo/banca)

**Branch de desenvolvimento e homologação:** `codex/banca-redesign`

As configurações de implantação devem ser verificadas antes de cada publicação, especialmente após mudança de conta Cloudflare ou de subdomínio. O nome do Worker, o endereço `PUBLIC_SITE_URL` e as vinculações de assets e serviços devem corresponder ao ambiente de destino. Não presumir que o deploy anterior esteja configurado para a conta atual.

## Desenvolvimento local

Utilize o ambiente Node/Bun compatível com o lockfile do projeto:

```sh
bun install
bun run dev
```

Validações proporcionais às alterações:

```sh
bunx tsc --noEmit
bun test
```

O build e o deploy devem usar as configurações verificadas para o ambiente escolhido. **Não publique a partir de outra branch ou conta Cloudflare sem conferir a configuração de destino.**

### Imagens e arquivos estáticos

Os arquivos institucionais de marca estão em `public/brand/` e os recursos editoriais em `public/images/sp/`.

Na implantação Cloudflare, confirme que o build inclui o diretório de assets estáticos e a vinculação `ASSETS` gerada pelo Nitro. Os caminhos públicos das imagens devem responder com o tipo de mídia correto, não com HTML nem com erro 404.

## Responsabilidade editorial

A identificação e a descrição de pessoas, instituições, endereços e fatos devem ser verificadas antes da publicação. A existência de um guia sobre delegacia, órgão público ou profissional não implica vínculo institucional, patrocínio, credenciamento ou representação.

---

**Banca Paulista — Jornalismo, Direito e Cidadania.**
