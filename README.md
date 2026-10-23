# Banca Paulista

**Portal editorial independente de informação jurídica, institucional e territorial, com foco na cidade de São Paulo.**

A Banca Paulista reúne jornalismo, notícias, artigos e guias para orientar a navegação por bairros, regiões, delegacias, órgãos públicos e serviços. O conteúdo tem caráter informativo e não constitui atendimento jurídico.

> **Independência editorial:** a Banca Paulista não é uma sociedade de advocacia, não representa os órgãos públicos mencionados e não presta atendimento jurídico direto.

## Estrutura editorial

- **Início:** apresentação do portal e acesso aos conteúdos.
- **Notícias:** reportagens e cobertura de acontecimentos locais e institucionais.
- **Artigos:** conteúdos explicativos sobre direito e cidadania.
- **Regiões e bairros:** guias territoriais de São Paulo.
- **Delegacias e instituições:** diretório informativo de órgãos e serviços públicos.
- **Profissionais e vagas:** áreas informativas preparadas para expansão.
- **Rádio:** Rádio Banca Digital e acesso à programação de áudio.

As informações e vínculos territoriais são mantidos por uma camada de conteúdo separada da interface. A arquitetura prevê integração futura com um CMS, sem dependência de dados institucionais inventados.

## Tecnologia

- **Aplicação:** TypeScript, React e TanStack Start.
- **Interface:** Vite e Tailwind CSS.
- **Servidor e publicação:** Nitro e Cloudflare Workers.
- **Conteúdo:** repositórios locais estruturados, com preparação para integração ao Payload CMS.
- **Áudio:** player de rádio com suporte aos formatos utilizados pelas estações configuradas.
- **Busca e descoberta:** metadados por rota, canonical, Open Graph, dados estruturados e feeds de notícias.

## Repositório e branch de trabalho

**Repositório:** [paulorodeo/lawsp](https://github.com/paulorodeo/lawsp)

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
