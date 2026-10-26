import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsGeographyPortal } from "@/components/site/news-geography-portal";
import { BRASIL_REGIONS, BRASIL_UFS, UFS_BY_REGION } from "@/content/local/brasil-ufs";
import { readAtlasEditorial } from "@/content/atlas.functions";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

const slugByRegion: Record<(typeof BRASIL_REGIONS)[number], string> = {
  Norte: "norte",
  Nordeste: "nordeste",
  "Centro-Oeste": "centro-oeste",
  Sudeste: "sudeste",
  Sul: "sul",
};

export const Route = createFileRoute("/noticias/regioes/$slug")({
  loader: async ({ params }) => {
    const region = BRASIL_REGIONS.find((item) => slugByRegion[item] === params.slug);
    if (!region) throw notFound();
    const allStories = await readAtlasEditorial();
    const states = UFS_BY_REGION[region];
    const stories = allStories.filter((item) => item.ufs.some((uf) => states.includes(uf)));
    if (stories.length === 0) throw notFound();
    const availableUfs = new Set(allStories.flatMap((item) => item.ufs));
    const availableStates = BRASIL_UFS.filter((state) => availableUfs.has(state.uf)).map((state) => ({
      uf: state.uf,
      nome: state.nome,
      region: state.regiao,
    }));
    const availableRegions = BRASIL_REGIONS.filter((item) =>
      UFS_BY_REGION[item].some((uf) => availableUfs.has(uf)),
    ).map((nome) => ({ nome, slug: slugByRegion[nome] }));
    return {
      region,
      stories,
      availableStates,
      availableRegions,
      isDemo: stories.some((item) => item.isDemo),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const path = `/noticias/regioes/${slugByRegion[loaderData.region]}`;
    const demo = loaderData.isDemo;
    return {
      meta: [
        ...pageMeta({
          title: `Notícias do ${loaderData.region} | Banca Paulista`,
          description: `Acompanhe a cobertura jornalística da região ${loaderData.region}, com notícias organizadas por estado e editoria.`,
          path,
        }),
        ...(demo ? [{ name: "robots", content: "noindex,nofollow,noarchive" }] : []),
      ],
      links: demo ? [] : canonicalLink(path),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Brasil", path: "/noticias/brasil" },
              { name: loaderData.region, path },
            ]),
          ),
        },
      ],
    };
  },
  component: RegionPage,
});

function RegionPage() {
  const data = Route.useLoaderData();
  return (
    <NewsGeographyPortal
      title={data.region}
      description={`Edição regional da Banca Paulista para ${data.region}, com acesso às notícias publicadas nos estados que compõem a macrorregião.`}
      level="Região"
      selectedStates={UFS_BY_REGION[data.region]}
      availableRegions={data.availableRegions}
      availableStates={data.availableStates}
      stories={data.stories}
      isDemo={data.isDemo}
    />
  );
}
