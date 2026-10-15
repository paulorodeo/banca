import { createFileRoute, notFound } from "@tanstack/react-router";
import { editorialIdentity } from "@/content/local/settings";
import { content } from "@/content/repository";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { breadcrumbSchema, canonical, canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/termos-de-uso";

export const Route = createFileRoute("/termos-de-uso")({
  loader: async () => {
    const pagina = await content.getPagina("termos-de-uso");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => {
    const crumbs = [
      { name: "Início", path: "/" },
      { name: "Termos de Uso", path: PATH },
    ];
    return {
      meta: pageMeta({
        title: "Termos de Uso e Política Editorial | Banca Paulista",
        description:
          "Conheça os Termos de Uso, o Aviso Legal e a Política Editorial da Banca Paulista. Transparência, fontes, direitos autorais e responsabilidade informativa.",
        path: PATH,
      }),
      links: canonicalLink(PATH),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Termos de Uso, Aviso Legal e Política Editorial",
            description:
              "Transparência, responsabilidade e compromisso com a informação da Banca Paulista.",
            url: canonical(PATH),
            publisher: {
              "@type": "Organization",
              name: editorialIdentity.name,
              url: canonical("/"),
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema(crumbs)),
        },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { pagina } = Route.useLoaderData();
  return (
    <PaginaInstitucionalView
      pagina={pagina}
      eyebrow="Banca Paulista"
      crumbs={[
        { name: "Início", path: "/" },
        { name: "Termos de Uso", path: PATH },
      ]}
      showReservedCta={false}
    />
  );
}
