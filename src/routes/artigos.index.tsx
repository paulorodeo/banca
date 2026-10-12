import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { ConteudoJuridico } from "@/content/types";
import { Container, Section } from "@/components/site/primitives";
import { ConteudoCard, CtaReservado, PageHero } from "@/components/site/blocks";
import { canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/artigos";

export const Route = createFileRoute("/artigos/")({
  loader: async (): Promise<{ conteudos: ConteudoJuridico[] }> => ({
    conteudos: await content.listConteudos(),
  }),
  head: () => ({
    meta: pageMeta({
      title: "Artigos Jurídicos | Banca Paulista",
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
        eyebrow="Artigos"
        title="Artigos jurídicos"
        lead="Material de caráter informativo. Não substitui análise individualizada de cada situação."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Artigos", path: PATH },
        ]}
      />
      <Section>
        <Container>
          {conteudos.length === 0 && <p className="text-muted-foreground">Novas publicações estão em preparação.</p>}
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