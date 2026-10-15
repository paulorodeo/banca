import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { AreaAtuacao, SituacaoJuridica } from "@/content/types";
import { Container, Hairline, Section } from "@/components/site/primitives";
import { CtaReservado, PageHero, SituacaoItem } from "@/components/site/blocks";
import { canonicalLink, organizationSchema, pageMeta } from "@/lib/seo";

const PATH = "/areas-de-atuacao";
interface Data {
  areas: AreaAtuacao[];
  situacoes: SituacaoJuridica[];
}

export const Route = createFileRoute("/areas-de-atuacao")({
  loader: async (): Promise<Data> => ({
    areas: await content.listAreas(),
    situacoes: await content.listSituacoes(),
  }),
  head: () => ({
    meta: pageMeta({
      title: "Temas Jurídicos | Banca Paulista",
      description:
        "Defesa criminal estratégica, crimes empresariais e patrimoniais, medidas urgentes, responsabilidade civil, contratos e sucessões em São Paulo.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(organizationSchema(PATH)) }],
  }),
  component: AreasPage,
});

function AreasPage() {
  const { areas, situacoes } = Route.useLoaderData() as Data;
  return (
    <div className="home-light editorial-page">
      <PageHero
        eyebrow="Informação jurídica"
        title="Temas jurídicos"
        lead="Temas abordados pelo portal em caráter informativo, sem oferta de serviços ou orientação individual."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Temas jurídicos", path: PATH },
        ]}
      />
      <Section>
        <Container>
          <div className="space-y-16">
            {areas.map((area) => (
              <article key={area.id} className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <h2 className="text-2xl text-ivory md:text-3xl">{area.titulo}</h2>
                  <Hairline className="my-5 max-w-16" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{area.resumo}</p>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {area.descricao}
                  </p>
                  <ul className="mt-6 grid gap-2 text-sm text-ivory/75 sm:grid-cols-2">
                    {area.topicos.map((topico) => (
                      <li key={topico} className="flex gap-2">
                        <span aria-hidden className="text-gold">
                          —
                        </span>
                        {topico}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="raised">
        <Container>
          <h2 className="text-3xl md:text-[2.5rem]">Situações que exigem estratégia e discrição</h2>
          <div className="mt-10 grid gap-x-14 md:grid-cols-2">
            {situacoes.map((situacao) => (
              <SituacaoItem key={situacao.id} situacao={situacao} />
            ))}
          </div>
        </Container>
      </Section>
      <CtaReservado />
    </div>
  );
}
