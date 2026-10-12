import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contato")({
  loader: async () => {
    const pagina = await content.getPagina("contato");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => ({ meta: pageMeta({ title: "Contato editorial e institucional | Banca Paulista", description: "Publicações, correções de conteúdo e participação no projeto.", path: "/contato" }), links: canonicalLink("/contato") }),
  component: Page,
});
function Page() {
  const { pagina } = Route.useLoaderData();
  return <PaginaInstitucionalView pagina={pagina} eyebrow="Banca Paulista" crumbs={[{ name: "Início", path: "/" }, { name: pagina.titulo, path: "/contato" }]} />;
}
