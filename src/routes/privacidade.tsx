import { createFileRoute, notFound } from "@tanstack/react-router";
import { editorialIdentity } from "@/content/local/settings";
import { content } from "@/content/repository";
import { PaginaInstitucionalView } from "@/components/site/pagina-institucional";
import { breadcrumbSchema, canonical, canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/privacidade";

export const Route = createFileRoute("/privacidade")({
  loader: async () => {
    const pagina = await content.getPagina("privacidade");
    if (!pagina) throw notFound();
    return { pagina };
  },
  head: () => {
    const crumbs = [
      { name: "Início", path: "/" },
      { name: "Privacidade e Cookies", path: PATH },
    ];
    return {
      meta: [
        ...pageMeta({
          title: "Política de Privacidade e Cookies | Banca Paulista",
          description:
            "Conheça a Política de Privacidade da Banca Paulista: proteção de dados pessoais, LGPD, cookies, segurança, transparência e direitos dos titulares.",
          path: PATH,
        }),
        { name: "robots", content: "noindex, nofollow" },
      ],
      links: canonicalLink(PATH),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Política de Privacidade, Proteção de Dados Pessoais e Cookies",
            description: "Transparência, segurança e respeito à privacidade dos visitantes.",
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
        { name: "Privacidade e Cookies", path: PATH },
      ]}
      showReservedCta={false}
    />
  );
}
