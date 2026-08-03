import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { PaginaInstitucional } from "@/content/types";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { canonicalLink, legalServiceSchema, pageMeta } from "@/lib/seo";
import escritorioAsset from "@/assets/escritorio.avif.asset.json";

const PATH = "/o-escritorio";

export const Route = createFileRoute("/o-escritorio")({
  loader: async (): Promise<{ pagina: PaginaInstitucional }> => {
    const pagina = await content.getPagina("o-escritorio");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => ({
    meta: pageMeta({
      title: "O Escritório | Paulo Sinigalia — Advocacia Estratégica em São Paulo",
      description:
        "Escritório de advocacia com atuação criminal e cível estratégica em São Paulo. Análise individualizada, discrição e acompanhamento próximo.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(legalServiceSchema(PATH)) }],
  }),
  component: EscritorioPage,
});

function EscritorioPage() {
  const { pagina } = Route.useLoaderData() as { pagina: PaginaInstitucional };
  return (
    <PaginaInstitucionalView
      pagina={pagina}
      eyebrow="Institucional"
      crumbs={[
        { name: "Início", path: "/" },
        { name: "O escritório", path: PATH },
      ]}
      aside={
        <figure className="surface-panel rounded-xs p-4">
          <img
            src={escritorioAsset.url}
            alt="Ambiente de recepção do escritório Paulo Sinigalia"
            loading="lazy"
            className="w-full rounded-xs"
          />
          <figcaption className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Ambiente reservado para atendimento, em São Paulo.
          </figcaption>
        </figure>
      }
    />
  );
}