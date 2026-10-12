import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/politica-de-privacidade")({
  loader: async () => {
    const pagina = await content.getPagina("politica-de-privacidade");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => ({ meta: pageMeta({ title: "Política de privacidade | Banca Paulista", description: "Informações sobre navegação e tratamento de dados na fase editorial.", path: "/politica-de-privacidade" }), links: canonicalLink("/politica-de-privacidade") }),
  component: Page,
});
function Page() {
  const { pagina } = Route.useLoaderData();
  return <PaginaInstitucionalView pagina={pagina} eyebrow="Banca Paulista" crumbs={[{ name: "Início", path: "/" }, { name: pagina.titulo, path: "/politica-de-privacidade" }]} />;
}
