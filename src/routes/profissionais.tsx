import { createFileRoute, notFound } from "@tanstack/react-router";
import { content } from "@/content/repository";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/profissionais")({
  loader: async () => {
    const pagina = await content.getPagina("profissionais");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => ({ meta: pageMeta({ title: "Profissionais | Banca Paulista", description: "Participação profissional por região, com identificação real e contato direto.", path: "/profissionais" }), links: canonicalLink("/profissionais") }),
  component: Page,
});
function Page() {
  const { pagina } = Route.useLoaderData();
  return <PaginaInstitucionalView pagina={pagina} eyebrow="Banca Paulista" crumbs={[{ name: "Início", path: "/" }, { name: pagina.titulo, path: "/profissionais" }]} />;
}
