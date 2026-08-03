import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { PaginaInstitucional } from "@/content/types";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { attorneySchema, canonicalLink, pageMeta } from "@/lib/seo";
import retratoAsset from "@/assets/retrato.avif.asset.json";

const PATH = "/paulo-sinigalia";

export const Route = createFileRoute("/paulo-sinigalia")({
  loader: async (): Promise<{ pagina: PaginaInstitucional }> => {
    const pagina = await content.getPagina("paulo-sinigalia");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => ({
    meta: pageMeta({
      title: "Paulo José Sinigalia — Advogado OAB/SP 411.502 | São Paulo",
      description:
        "Paulo José Sinigalia, advogado inscrito na OAB/SP sob nº 411.502, com atuação criminal e cível estratégica na cidade de São Paulo.",
      path: PATH,
      type: "profile",
    }),
    links: canonicalLink(PATH),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(attorneySchema(PATH)) }],
  }),
  component: AdvogadoPage,
});

function AdvogadoPage() {
  const { pagina } = Route.useLoaderData() as { pagina: PaginaInstitucional };
  return (
    <PaginaInstitucionalView
      pagina={pagina}
      eyebrow="Advogado responsável"
      crumbs={[
        { name: "Início", path: "/" },
        { name: "Paulo Sinigalia", path: PATH },
      ]}
      aside={
        <figure className="mx-auto max-w-xs">
          <img
            src={retratoAsset.url}
            alt="Retrato profissional do advogado Paulo José Sinigalia"
            loading="lazy"
            className="w-full rounded-full border border-gold/25"
          />
          <figcaption className="mt-5 text-center text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Paulo José Sinigalia · OAB/SP 411.502
          </figcaption>
        </figure>
      }
    />
  );
}