import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import type { PaginaInstitucional } from "@/content/types";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { TriagemChat } from "@/components/site/triagem-chat";
import { canonicalLink, legalServiceSchema, pageMeta } from "@/lib/seo";

const PATH = "/atendimento-reservado";

export const Route = createFileRoute("/atendimento-reservado")({
  loader: async (): Promise<{ pagina: PaginaInstitucional }> => {
    const pagina = await content.getPagina("atendimento-reservado");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => ({
    meta: pageMeta({
      title: "Atendimento Reservado | Paulo Sinigalia — Advocacia em São Paulo",
      description:
        "Como funciona o atendimento reservado: envio de informações iniciais, análise de viabilidade e orientação individualizada.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(legalServiceSchema(PATH)) }],
  }),
  component: AtendimentoPage,
});

function AtendimentoPage() {
  const { pagina } = Route.useLoaderData() as { pagina: PaginaInstitucional };
  return (
    <PaginaInstitucionalView
      pagina={pagina}
      eyebrow="Atendimento"
      crumbs={[
        { name: "Início", path: "/" },
        { name: "Atendimento reservado", path: PATH },
      ]}
      aside={<TriagemChat />}
    />
  );
}