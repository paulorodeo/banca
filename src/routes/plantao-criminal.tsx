import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/plantao-criminal")({
  loader: async () => {
    const pagina = await content.getPagina("plantao-criminal");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => ({ meta: pageMeta({ title: "Plantão criminal: informação e contexto | Banca Paulista", description: "Entenda a diferença entre assistência jurídica urgente e plantão judiciário.", path: "/plantao-criminal" }), links: canonicalLink("/plantao-criminal") }),
  component: Page,
});
function Page() {
  const { pagina } = Route.useLoaderData();
  return <PaginaInstitucionalView pagina={pagina} eyebrow="Banca Paulista" crumbs={[{ name: "Início", path: "/" }, { name: pagina.titulo, path: "/plantao-criminal" }]} />;
}
