import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/sobre")({
  loader: async () => {
    const pagina = await content.getPagina("sobre");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => ({ meta: pageMeta({ title: "Sobre a Banca Paulista | Banca Paulista", description: "Informação editorial e contexto territorial sobre defesa criminal em São Paulo.", path: "/sobre" }), links: canonicalLink("/sobre") }),
  component: Page,
});
function Page() {
  const { pagina } = Route.useLoaderData();
  return <PaginaInstitucionalView pagina={pagina} eyebrow="Banca Paulista" crumbs={[{ name: "Início", path: "/" }, { name: pagina.titulo, path: "/sobre" }]} />;
}
