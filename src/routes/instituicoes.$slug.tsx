import { createFileRoute, notFound } from "@tanstack/react-router";
import { PublicInstitutionPage } from "@/components/site/public-institution-page";
import { content } from "@/content/repository";
import type { PublicInstitution } from "@/content/types";
import { canonicalLink, pageMeta } from "@/lib/seo";

interface Data {
  institution: PublicInstitution;
}

export const Route = createFileRoute("/instituicoes/$slug")({
  loader: async ({ params }): Promise<Data> => {
    const institution = await content.getInstitution(params.slug);
    if (!institution) throw notFound();
    return { institution };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          ...pageMeta({
            title: "Instituição indisponível | Banca Paulista",
            description: "Consulte os canais oficiais da instituição pública.",
            path: "/",
          }),
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const { institution } = loaderData as Data;
    return {
      meta: pageMeta({
        title: institution.seo.title,
        description: institution.seo.description,
        path: institution.seo.canonicalPath,
      }),
      links: canonicalLink(institution.seo.canonicalPath),
    };
  },
  component: InstitutionPage,
});

function InstitutionPage() {
  const { institution } = Route.useLoaderData() as Data;

  return (
    <div className="home-light editorial-page">
      <PublicInstitutionPage
        institution={institution}
        crumbs={[
          { name: "Início", path: "/" },
          { name: institution.sigla ?? institution.nomeOficial, path: institution.seo.canonicalPath },
        ]}
      />
    </div>
  );
}
