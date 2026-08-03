import { createFileRoute, Link } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { Delegacia } from "@/content/types";
import { Container, Section } from "@/components/site/primitives";
import { CtaReservado, PageHero } from "@/components/site/blocks";
import { canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/delegacias";

export const Route = createFileRoute("/delegacias/")({
  loader: async (): Promise<{ delegacias: Delegacia[] }> => ({
    delegacias: await content.listDelegacias(),
  }),
  head: () => ({
    meta: pageMeta({
      title: "Delegacias em São Paulo | Guia Informativo — Paulo Sinigalia",
      description:
        "Páginas informativas sobre delegacias de polícia em São Paulo, com contexto territorial e orientação jurídica preliminar.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
  }),
  component: DelegaciasPage,
});

function DelegaciasPage() {
  const { delegacias } = Route.useLoaderData() as { delegacias: Delegacia[] };
  return (
    <>
      <PageHero
        eyebrow="Guia informativo"
        title="Delegacias em São Paulo"
        lead="Conteúdo de caráter informativo sobre unidades policiais e situações jurídicas frequentes em cada região."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Delegacias", path: PATH },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {delegacias.map((dp) => (
              <Link
                key={dp.id}
                to="/delegacias/$slug"
                params={{ slug: dp.slug }}
                className="surface-panel group rounded-xs p-7 transition-colors hover:border-gold/40"
              >
                <h2 className="text-lg text-ivory group-hover:text-gold">{dp.h1}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {dp.introducao}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaReservado />
    </>
  );
}