import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/blocks";
import { Container, Hairline, Section } from "@/components/site/primitives";
import { noticias } from "@/content/local/noticias";
import type { NoticiaBloco } from "@/content/types";
import { breadcrumbSchema, canonicalLink, newsArticleSchema, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/noticias/$slug")({
  loader: ({ params }) => {
    const noticia = noticias.find((item) => item.slug === params.slug);
    if (!noticia) throw notFound();
    return noticia;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return {
        meta: [
          { title: "Notícia indisponível | Banca Paulista" },
          { name: "robots", content: "noindex" },
        ],
      };
    const noticia = loaderData;
    return {
      meta: [
        ...pageMeta({
          title: noticia.seo.title,
          description: noticia.seo.description,
          path: noticia.seo.canonicalPath,
          type: "article",
        }).map((meta) =>
          noticia.seo.ogTitle && (meta["property"] === "og:title" || meta["name"] === "twitter:title")
            ? { ...meta, content: noticia.seo.ogTitle }
            : meta,
        ),
        ...(noticia.seo.keywords
          ? [{ name: "keywords", content: noticia.seo.keywords.join(", ") }]
          : []),
        { name: "robots", content: "noindex, follow" },
      ],
      links: canonicalLink(noticia.seo.canonicalPath),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            newsArticleSchema({
              titulo: noticia.titulo,
              resumo: noticia.resumo,
              path: noticia.seo.canonicalPath,
              publicadoEm: noticia.publicadoEm,
              autoria: noticia.autoria,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Notícias", path: "/noticias" },
              { name: noticia.titulo, path: noticia.seo.canonicalPath },
            ]),
          ),
        },
      ],
    };
  },
  component: NoticiaPage,
});

function date(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("pt-BR", {
    dateStyle: "long",
    timeZone: "UTC",
  });
}

function NoticiaBlocoView({ bloco }: { bloco: NoticiaBloco }) {
  if (bloco.tipo === "titulo")
    return <h2 className="pt-4 font-serif text-3xl text-brand-navy">{bloco.texto}</h2>;
  if (bloco.tipo === "lista")
    return (
      <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
        {bloco.itens.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  if (bloco.tipo === "tabela")
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          <thead className="border-b border-border text-brand-navy">
            <tr>
              {bloco.cabecalho.map((cell) => (
                <th key={cell} className="px-3 py-2 font-semibold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloco.linhas.map((row) => (
              <tr key={row[0]} className="border-b border-border/70">
                {row.map((cell) => (
                  <td key={cell} className="px-3 py-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (bloco.tipo === "markdown")
    return (
      <div className="space-y-5">
        {bloco.texto.split("\n\n").map((part, index) => {
          const lines = part.split("\n");
          if (part.startsWith("## "))
            return <h2 key={index} className="pt-4 font-serif text-3xl text-brand-navy">{part.slice(3)}</h2>;
          if (lines.every((line) => line.startsWith("- ")))
            return <ul key={index} className="list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">{lines.map((line) => <li key={line}>{line.slice(2)}</li>)}</ul>;
          return <p key={index} className="whitespace-pre-line text-base leading-relaxed text-muted-foreground">{part}</p>;
        })}
      </div>
    );
  return <p className="text-base leading-relaxed text-muted-foreground">{bloco.texto}</p>;
}

function NoticiaPage() {
  const noticia = Route.useLoaderData();
  return (
    <div className="home-light editorial-page">
      <PageHero
        eyebrow={noticia.categoria}
        title={noticia.titulo}
        lead={noticia.resumo}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Notícias", path: "/noticias" },
          { name: noticia.titulo, path: noticia.seo.canonicalPath },
        ]}
      />
      <Section>
        <Container>
          <article className="min-w-0 max-w-3xl">
            <p className="text-xs uppercase text-muted-foreground">
              {noticia.autoria} · Publicado em {date(noticia.publicadoEm)}
            </p>
            <Hairline className="my-8 max-w-24" />
            <div className="space-y-5">
              {noticia.blocos.map((bloco, index) => (
                <NoticiaBlocoView key={index} bloco={bloco} />
              ))}
            </div>
            <footer className="mt-12 space-y-3 border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
              {noticia.notas.map((nota) => (
                <p key={nota}>{nota}</p>
              ))}
              {noticia.fontes?.length ? (
                <div className="space-y-2 pt-3">
                  <p className="font-semibold text-brand-navy">Fontes e referências</p>
                  <ul className="list-disc space-y-1 pl-5">
                    {noticia.fontes.map((fonte) => (
                      <li key={fonte.url}><a className="underline underline-offset-4" href={fonte.url} rel="noreferrer" target="_blank">{fonte.titulo}</a></li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </footer>
          </article>
        </Container>
      </Section>
    </div>
  );
}
