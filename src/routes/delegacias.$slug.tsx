import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { Delegacia } from "@/content/types";
import { Container, Hairline, Section } from "@/components/site/primitives";
import { BancaEditorialBanner } from "@/components/site/banca-editorial-banner";
import { CtaReservado, PageHero } from "@/components/site/blocks";
import { DelegaciaTelefone } from "@/components/site/delegacia-telefone";
import { ProfessionalSidebar } from "@/components/site/territory";
import { AdPlaceholder } from "@/components/site/ad-placeholder";
import { ContextualNewsSection } from "@/components/site/contextual-news-section";
import { canonical, delegaciaJsonLd, pageMeta } from "@/lib/seo";

interface Data {
  dp: Delegacia;
}

export const Route = createFileRoute("/delegacias/$slug")({
  loader: async ({ params }): Promise<Data> => {
    const dp = await content.getDelegacia(params.slug);
    if (!dp) throw notFound();
    return { dp };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          ...pageMeta({
            title: "Guia indisponível | Banca Paulista",
            description: "Consulte o índice de delegacias da Banca Paulista.",
            path: "/delegacias",
          }),
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { dp } = loaderData as Data;
    return {
      meta: pageMeta({
        title: dp.seo.title,
        description: dp.seo.description,
        path: dp.seo.canonicalPath,
      }),
      links: [{ rel: "canonical", href: canonical(dp.seo.canonicalPath) }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(delegaciaJsonLd(dp)) }],
    };
  },
  component: DelegaciaPage,
});

function DelegaciaPage() {
  const { dp } = Route.useLoaderData() as Data;
  const u = dp.unidade;
  const dados = [
    ["Unidade", u.nomeOficial],
    ["Endereço", u.endereco],
    ["Horário", u.horario],
    ["Competência", u.competencia],
  ].filter(([, v]) => Boolean(v)) as [string, string][];

  return (
    <div className="home-light editorial-page">
      <PageHero
        eyebrow="Guia informativo"
        title={dp.h1}
        lead={dp.introducao}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Delegacias", path: "/delegacias" },
          { name: dp.h1, path: dp.seo.canonicalPath },
        ]}
      />
      <ContextualNewsSection
        contexts={[dp.unidade.nomeOficial, dp.h1]}
        headlineContext="instituicao"
      />
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_0.9fr]">
            <div className="space-y-12">
              <article>
                <h2 className="text-2xl text-ivory md:text-3xl">Contexto territorial</h2>
                <Hairline className="my-6 max-w-16" />
                <p className="text-base leading-relaxed text-muted-foreground">
                  {dp.contextoTerritorial}
                </p>
                {dp.bairros.length > 0 && (
                  <p className="mt-5 text-sm text-muted-foreground">
                    Bairros de referência: {dp.bairros.join(", ")}.
                  </p>
                )}
                {dp.observacaoBairros && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {dp.observacaoBairros}
                  </p>
                )}
              </article>
              {dp.secoes?.map((secao) => (
                <article key={secao.titulo}>
                  <h2 className="text-2xl text-ivory md:text-3xl">{secao.titulo}</h2>
                  <Hairline className="my-6 max-w-16" />
                  {secao.paragrafos?.map((p) => (
                    <p key={p} className="mb-4 text-base leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                  {secao.lista && (
                    <ul className="mt-4 space-y-2 text-sm text-ivory/70">
                      {secao.lista.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden className="text-gold">
                            —
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
              {dp.faq.length > 0 && (
                <article>
                  <h2 className="text-2xl text-ivory md:text-3xl">Perguntas frequentes</h2>
                  <Hairline className="my-6 max-w-16" />
                  <dl className="space-y-6">
                    {dp.faq.map((item) => (
                      <div key={item.id}>
                        <dt className="text-base text-ivory">{item.pergunta}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {item.resposta}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              )}
              {dp.delegaciasRelacionadas && dp.delegaciasRelacionadas.length > 0 && (
                <article>
                  <h2 className="text-2xl text-ivory md:text-3xl">Delegacias e regiões próximas</h2>
                  <Hairline className="my-6 max-w-16" />
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Dependendo do endereço em que os fatos ocorreram, o procedimento pode estar
                    relacionado a outra unidade policial da região.
                  </p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {dp.delegaciasRelacionadas.map((rel) => (
                      <li key={rel.slug} className="flex gap-2">
                        <span aria-hidden className="text-gold">
                          —
                        </span>
                        <Link
                          to="/delegacias/$slug"
                          params={{ slug: rel.slug }}
                          className="text-ivory/80 underline-offset-4 transition-colors hover:text-gold hover:underline"
                        >
                          {rel.titulo}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              )}
            </div>
            <div className="space-y-6">
              <aside className="surface-panel h-fit rounded-xs p-8">
                <h2 className="text-lg text-ivory">Dados da unidade</h2>
                <Hairline className="my-5 max-w-12" />
                <DelegaciaTelefone unidade={u} />
                <dl className="space-y-4 text-sm">
                  {dados.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        {label}
                      </dt>
                      <dd className="mt-1 text-ivory/80">{value}</dd>
                    </div>
                  ))}
                </dl>
                {u.dadosDeDesenvolvimento && (
                  <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                    As demais informações institucionais estão em processo de verificação. Confirme
                    os dados junto aos canais oficiais antes de se deslocar.
                  </p>
                )}
              </aside>
              <ProfessionalSidebar neighborhoodName={dp.bairros[0] ?? dp.unidade.nomeOficial} />
              <AdPlaceholder />
            </div>
          </div>
          {dp.avisoRodape && (
            <p className="mt-14 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
              {dp.avisoRodape}
            </p>
          )}
        </Container>
      </Section>
      <CtaReservado />
      <BancaEditorialBanner />
    </div>
  );
}
