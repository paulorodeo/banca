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

export const Route = createFileRoute("/noticias/estados/$uf")({
  loader: async ({ params }) => {
    const state = BRASIL_UFS.find((item) => item.uf.toLowerCase() === params.uf.toLowerCase());
    if (!state) throw notFound();
    const allStories = await readAtlasEditorial();
    const stories = allStories.filter((item) => item.ufs.includes(state.uf));
    if (stories.length === 0) throw notFound();
    const availableUfs = new Set(allStories.flatMap((item) => item.ufs));
    const availableStates = BRASIL_UFS.filter((item) => availableUfs.has(item.uf)).map((item) => ({
      uf: item.uf,
      nome: item.nome,
      region: item.regiao,
    }));
    const availableRegions = BRASIL_REGIONS.filter((region) =>
      UFS_BY_REGION[region].some((uf) => availableUfs.has(uf)),
    ).map((nome) => ({ nome, slug: slugByRegion[nome] }));
    return {
      state,
      stories,
      availableStates,
      availableRegions,
      isDemo: stories.some((item) => item.isDemo),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex" }] };
    const path = `/noticias/estados/${loaderData.state.uf.toLowerCase()}`;
    const demo = loaderData.isDemo;
    const breadcrumb = [
      { name: "Início", path: "/" },
      { name: "Brasil", path: "/noticias/brasil" },
      { name: loaderData.state.regiao, path: `/noticias/regioes/${slugByRegion[loaderData.state.regiao as keyof typeof slugByRegion]}` },
      { name: loaderData.state.nome, path },
    ];
    return {
      meta: [
        ...pageMeta({
          title: `Notícias de ${loaderData.state.nome} | Banca Paulista`,
          description: `Acompanhe notícias e reportagens sobre ${loaderData.state.nome}, organizadas por editoria e relacionadas à cobertura regional.`,
          path,
        }),
        ...(demo ? [{ name: "robots", content: "noindex,nofollow,noarchive" }] : []),
      ],
      links: demo ? [] : canonicalLink(path),
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema(breadcrumb)) },
      ],
    };
  },
  component: StatePage,
});

function StatePage() {
  const data = Route.useLoaderData();
  return (
    <NewsGeographyPortal
      title={data.state.nome}
      description={`Edição estadual da Banca Paulista para ${data.state.nome}, integrada à cobertura da região ${data.state.regiao}.`}
      level="Estado"
      selectedStates={[data.state.uf]}
      availableRegions={data.availableRegions}
      availableStates={data.availableStates}
      stories={data.stories}
      isDemo={data.isDemo}
      {...(data.state.uf === "MG" ? { capital: "Belo Horizonte" } : {})}
    />
  );
}
