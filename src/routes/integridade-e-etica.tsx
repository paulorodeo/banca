import { createFileRoute, notFound } from "@tanstack/react-router";
import { editorialIdentity } from "@/content/local/settings";
import { content } from "@/content/repository";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { breadcrumbSchema, canonical, canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/integridade-e-etica";

export const Route = createFileRoute("/integridade-e-etica")({
  loader: async () => {
    const pagina = await content.getPagina("integridade-e-etica");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => {
    const crumbs = [
      { name: "Início", path: "/" },
      { name: "Integridade e Ética", path: PATH },
    ];
    return {
      meta: pageMeta({
        title: "Integridade, Ética e Independência Editorial | Banca Paulista",
        description:
          "Conheça os princípios de integridade e independência da Banca Paulista, seus critérios editoriais, transparência, publicidade e respeito às normas da OAB.",
        path: PATH,
      }),
      links: canonicalLink(PATH),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Política de Integridade, Ética e Independência Editorial",
            description:
              "Independência na informação, transparência nas relações e responsabilidade com o público.",
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
        { name: "Integridade e Ética", path: PATH },
      ]}
      showReservedCta={false}
    />
  );
}
