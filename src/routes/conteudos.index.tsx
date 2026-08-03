import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { ConteudoJuridico } from "@/content/types";
import { Container, Section } from "@/components/site/primitives";
import { ConteudoCard, CtaReservado, PageHero } from "@/components/site/blocks";
import { canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/conteudos";

export const Route = createFileRoute("/conteudos/")({
  loader: async (): Promise<{ conteudos: ConteudoJuridico[] }> => ({
    conteudos: await content.listConteudos(),
  }),
  head: () => ({
    meta: pageMeta({
      title: "Conteúdos Jurídicos | Paulo Sinigalia — Advocacia em São Paulo",
      description:
        "Materiais informativos sobre defesa criminal, medidas urgentes, conflitos societários e proteção patrimonial.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
  }),
  component: ConteudosPage,
});

function ConteudosPage() {
  const { conteudos } = Route.useLoaderData() as { conteudos: ConteudoJuridico[] };
  return (
    <>
      <PageHero
        eyebrow="Conteúdos"
        title="Conteúdos jurídicos"
        lead="Material de caráter informativo. Não substitui análise individualizada de cada situação."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Conteúdos", path: PATH },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {conteudos.map((item) => (
              <ConteudoCard key={item.id} conteudo={item} />
            ))}
          </div>
        </Container>
      </Section>
      <CtaReservado />
    </>
  );
}