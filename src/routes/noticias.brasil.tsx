import { createFileRoute, notFound } from "@tanstack/react-router";
import { NewsGeographyPortal } from "@/components/site/news-geography-portal";
import { BRASIL_REGIONS, BRASIL_UFS, UFS_BY_REGION } from "@/content/local/brasil-ufs";
import { readAtlasEditorial } from "@/content/atlas.functions";
import { breadcrumbSchema, canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/noticias/brasil")({
  loader: async () => {
    const stories = await readAtlasEditorial();
    if (stories.length === 0) throw notFound();
    const availableUfs = new Set(stories.flatMap((item) => item.ufs));
    const availableRegions = BRASIL_REGIONS.filter((region) =>
      UFS_BY_REGION[region].some((uf) => availableUfs.has(uf)),
    ).map((nome) => ({
      nome,
      slug: { Norte: "norte", Nordeste: "nordeste", "Centro-Oeste": "centro-oeste", Sudeste: "sudeste", Sul: "sul" }[nome],
    }));
    const availableStates = BRASIL_UFS.filter((state) => availableUfs.has(state.uf)).map((state) => ({
      uf: state.uf,
      nome: state.nome,
      region: state.regiao,
    }));
    return {
      stories,
      availableRegions,
      availableStates,
      isDemo: stories.some((item) => item.isDemo),
    };
  },
  head: ({ loaderData }) => {
    const path = "/noticias/brasil";
    const demo = loaderData?.isDemo ?? false;
    return {
      meta: [
        ...pageMeta({
          title: "Notícias do Brasil | Banca Paulista",
          description: "Cobertura jornalística nacional da Banca Paulista, organizada por região e estado.",
          path,
        }),
        ...(demo ? [{ name: "robots", content: "noindex,nofollow,noarchive" }] : []),
      ],
      links: demo ? [] : canonicalLink(path),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([{ name: "Início", path: "/" }, { name: "Notícias", path: "/noticias" }, { name: "Brasil", path }]),
          ),
        },
      ],
    };
  },
  component: BrasilPage,
});

function BrasilPage() {
  const data = Route.useLoaderData();
  return (
    <NewsGeographyPortal
      title="Brasil"
      description="Acompanhe reportagens nacionais e explore a cobertura organizada pelas cinco macrorregiões e unidades federativas."
      level="Brasil"
      selectedStates={[]}
      availableRegions={data.availableRegions}
      availableStates={data.availableStates}
      stories={data.stories}
      isDemo={data.isDemo}
    />
  );
}
