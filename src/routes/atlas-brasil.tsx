import { useState, type MouseEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ExternalLink, MapPinned, Newspaper } from "lucide-react";
import { BrazilEditorialAtlas } from "@/components/site/brazil-editorial-atlas";
import { Container } from "@/components/site/primitives";
import { NewsImage } from "@/components/site/news-image";
import {
  readAtlasEditorial,
  type AtlasEditorialItem,
  type AtlasLayer,
} from "@/content/atlas.functions";
import { GRAIN_SOURCE, GRAIN_SOURCE_URL } from "@/content/local/conab-graos-2025-26";
import { BRASIL_REGIONS, BRASIL_UFS, UFS_BY_REGION } from "@/content/local/brasil-ufs";
import { zonas } from "@/content/local/zonas";
import { POPULATION_SOURCE, POPULATION_SOURCE_URL } from "@/content/local/populacao-ibge-2026";
import { breadcrumbSchema, canonical, canonicalLink, pageMeta, websiteSchema } from "@/lib/seo";

const regionSlug: Record<(typeof BRASIL_REGIONS)[number], string> = {
  Norte: "norte",
  Nordeste: "nordeste",
  "Centro-Oeste": "centro-oeste",
  Sudeste: "sudeste",
  Sul: "sul",
};

const editoriaItems: Array<{ layer: AtlasLayer; label: string }> = [
  { layer: "justica", label: "Justiça" },
  { layer: "politica", label: "Política" },
  { layer: "economia", label: "Economia" },
  { layer: "agronegocio", label: "Agronegócio" },
  { layer: "infraestrutura", label: "Infraestrutura" },
  { layer: "rodovias", label: "Rodovias" },
  { layer: "populacao", label: "População" },
  { layer: "clima", label: "Clima" },
  { layer: "noticias", label: "Notícias" },
];

const topicDefinitions: Array<{
  id: string;
  layer: AtlasLayer;
  title: string;
  intro: string;
}> = [
  {
    id: "justica-instituicoes",
    layer: "justica",
    title: "Justiça e instituições",
    intro:
      "Decisões judiciais, tribunais, Ministério Público, Defensoria, legislação e assuntos jurídicos.",
  },
  {
    id: "politica-sociedade",
    layer: "politica",
    title: "Política e sociedade",
    intro:
      "Atuação dos poderes públicos, medidas governamentais, propostas legislativas e impactos regionais.",
  },
  {
    id: "economia-negocios",
    layer: "economia",
    title: "Economia e negócios",
    intro:
      "Indicadores econômicos, investimentos, mercado imobiliário, inflação, juros e atividade econômica.",
  },
  {
    id: "agronegocio-rural",
    layer: "agronegocio",
    title: "Agronegócio e rural",
    intro:
      "Produção rural, crédito, agricultura, pecuária, safras, mercado de terras e infraestrutura do campo.",
  },
  {
    id: "infraestrutura-noticias",
    layer: "infraestrutura",
    title: "Infraestrutura",
    intro: "Obras, mobilidade e serviços com cobertura editorial publicada.",
  },
  {
    id: "rodovias-noticias",
    layer: "rodovias",
    title: "Rodovias",
    intro:
      "Reportagens relacionadas a rodovias, exibidas quando identificadas no acervo editorial.",
  },
  {
    id: "clima-noticias",
    layer: "clima",
    title: "Clima",
    intro: "Cobertura jornalística sobre clima e condições que impactam os territórios.",
  },
  {
    id: "populacao-noticias",
    layer: "populacao",
    title: "População",
    intro: "Reportagens sobre população e dinâmicas territoriais.",
  },
];

const roadSourceUrl = "https://dadosabertos.artesp.sp.gov.br/dataset/malha-rodoviaria";
const snvSourceUrl =
  "https://pamgia.ibama.gov.br/server/rest/services/01_Publicacoes_Bases/tra_trecho_rodoviario_principal_l/MapServer/23";
const weatherSourceUrl = "https://www.weatherapi.com/";

export const Route = createFileRoute("/atlas-brasil")({
  loader: async () => {
    const stories = await readAtlasEditorial();
    const publishedStories = stories.filter((item) => !item.isDemo);
    const availableUfs = new Set(publishedStories.flatMap((item) => item.ufs));
    const availableRegions = BRASIL_REGIONS.filter((region) =>
      UFS_BY_REGION[region].some((uf) => availableUfs.has(uf)),
    ).map((region) => regionSlug[region]);

    return {
      stories,
      availableRegions,
      availableUfs: [...availableUfs],
      isDemo: stories.some((item) => item.isDemo),
    };
  },
  head: ({ loaderData }) => {
    const path = "/atlas-brasil";
    const isDemo = loaderData?.isDemo ?? false;
    const title = "Atlas Brasil | Mapas, indicadores e notícias | Banca Paulista";
    const description =
      "Explore o Atlas Brasil da Banca Paulista: mapas interativos, indicadores territoriais e reportagens publicadas por região e estado.";
    return {
      meta: [
        ...pageMeta({ title, description, path }),
        ...(isDemo ? [{ name: "robots", content: "noindex,nofollow,noarchive" }] : []),
      ],
      links: isDemo ? [] : canonicalLink(path),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { name: "Início", path: "/" },
              { name: "Atlas Brasil", path },
            ]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            ...websiteSchema(path),
            "@type": "CollectionPage",
            name: title,
            description,
            url: canonical(path),
            about: { "@type": "Country", name: "Brasil" },
          }),
        },
      ],
    };
  },
  component: AtlasBrasilPage,
});

function AtlasBrasilPage() {
  const { stories, availableRegions, availableUfs } = Route.useLoaderData();
  const [activeLayer, setActiveLayer] = useState<AtlasLayer>("noticias");
  const availableRegionSet = new Set(availableRegions);
  const availableUfSet = new Set(availableUfs);
  const editorialSections = topicDefinitions
    .map((topic) => ({
      ...topic,
      stories: publishedStoriesForLayer(stories, topic.layer),
    }))
    .filter((topic) => topic.stories.length > 0);

  const goToLayer = (layer: AtlasLayer, event: MouseEvent<HTMLAnchorElement>) => {
    setActiveLayer(layer);
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  return (
    <div className="atlas-portal-page">
      <section className="atlas-portal-hero">
        <Container>
          <nav className="atlas-portal-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Início</Link>
            <ChevronRight aria-hidden />
            <span aria-current="page">Atlas Brasil</span>
          </nav>
          <p className="atlas-portal-eyebrow">Banca Paulista · Informação territorial</p>
          <h1>Atlas Brasil</h1>
          <p className="atlas-portal-lede">
            Mapas, indicadores e notícias para explorar o Brasil por região, estado e tema.
          </p>
        </Container>
      </section>

      <nav className="atlas-portal-navigation" aria-label="Navegação do Atlas Brasil">
        <Container className="atlas-portal-navigation-inner">
          <details className="atlas-portal-menu">
            <summary>Regiões do Brasil</summary>
            <ul className="atlas-portal-menu-list">
              {BRASIL_REGIONS.map((region) => {
                const slug = regionSlug[region];
                return (
                  <li key={region}>
                    {availableRegionSet.has(slug) ? (
                      <Link to="/noticias/regioes/$slug" params={{ slug }}>
                        {region} <ArrowRight aria-hidden />
                      </Link>
                    ) : (
                      <span className="is-unavailable" aria-disabled="true">
                        {region} · sem cobertura publicada
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </details>

          <details className="atlas-portal-menu atlas-portal-states-menu">
            <summary>Estados</summary>
            <div className="atlas-portal-state-groups">
              {BRASIL_REGIONS.map((region) => (
                <section key={region} aria-label={`Estados da região ${region}`}>
                  <h3>{region}</h3>
                  <ul>
                    {BRASIL_UFS.filter((state) => state.regiao === region).map((state) => (
                      <li key={state.uf}>
                        {availableUfSet.has(state.uf) ? (
                          <Link to="/noticias/estados/$uf" params={{ uf: state.uf.toLowerCase() }}>
                            {state.nome} <b>{state.uf}</b>
                          </Link>
                        ) : (
                          <span className="is-unavailable" aria-disabled="true">
                            {state.nome} <b>{state.uf}</b> · sem cobertura
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </details>

          <details className="atlas-portal-menu">
            <summary>São Paulo capital</summary>
            <ul className="atlas-portal-menu-list">
              {zonas.map((zone) => (
                <li key={zone.slug}>
                  <Link to="/regioes/$slug" params={{ slug: zone.slug }}>
                    {zone.nome} <ArrowRight aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </details>

          <details className="atlas-portal-menu atlas-portal-editorias-menu">
            <summary>Editorias</summary>
            <ul className="atlas-portal-menu-list">
              {editoriaItems.map((item) => (
                <li key={item.layer}>
                  <a
                    href="#atlas-camadas"
                    aria-current={activeLayer === item.layer ? "true" : undefined}
                    onClick={(event) => goToLayer(item.layer, event)}
                  >
                    {item.label} <MapPinned aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </Container>
      </nav>

      <BrazilEditorialAtlas
        stories={stories}
        variant="standalone"
        selectedLayer={activeLayer}
        onLayerChange={setActiveLayer}
      />

      <Container className="atlas-portal-content">
        <section className="atlas-editorial-intro" aria-labelledby="atlas-editorial-title">
          <p className="atlas-portal-eyebrow">Cobertura publicada</p>
          <h2 id="atlas-editorial-title">Notícias por tema</h2>
          <p>
            Reportagens do acervo editorial, organizadas pelas editorias relacionadas em cada
            matéria. As seções aparecem quando há conteúdo publicado para exibir.
          </p>
        </section>

        {editorialSections.length ? (
          <div className="atlas-editorial-sections">
            {editorialSections.map((section) => (
              <AtlasEditorialSection key={section.id} {...section} />
            ))}
          </div>
        ) : (
          <div className="atlas-editorial-empty" role="status">
            <Newspaper aria-hidden />
            <div>
              <h3>Novas reportagens em preparação</h3>
              <p>As editorias serão apresentadas aqui conforme novas matérias forem publicadas.</p>
            </div>
          </div>
        )}

        <section className="atlas-portal-sources" aria-labelledby="atlas-sources-title">
          <div>
            <p className="atlas-portal-eyebrow">Transparência dos dados</p>
            <h2 id="atlas-sources-title">Fontes de informação</h2>
            <p>Consulte as fontes e os serviços identificados nos painéis de dados do Atlas.</p>
          </div>
          <ul>
            <li>
              <a href={POPULATION_SOURCE_URL} target="_blank" rel="noopener noreferrer">
                {POPULATION_SOURCE} <ExternalLink aria-hidden />
              </a>
            </li>
            <li>
              <a href={GRAIN_SOURCE_URL} target="_blank" rel="noopener noreferrer">
                {GRAIN_SOURCE} <ExternalLink aria-hidden />
              </a>
            </li>
            <li>
              <a href={roadSourceUrl} target="_blank" rel="noopener noreferrer">
                ARTESP · Malha Rodoviária de São Paulo <ExternalLink aria-hidden />
              </a>
            </li>
            <li>
              <a href={snvSourceUrl} target="_blank" rel="noopener noreferrer">
                DNIT · SNV histórico distribuído pelo Ibama/PAMGIA <ExternalLink aria-hidden />
              </a>
            </li>
            <li>
              <a href={weatherSourceUrl} target="_blank" rel="noopener noreferrer">
                WeatherAPI · serviço de dados meteorológicos <ExternalLink aria-hidden />
              </a>
            </li>
          </ul>
        </section>

        <nav className="atlas-portal-more" aria-label="Mais informações">
          <Link to="/noticias/brasil">
            Portal de notícias do Brasil <ArrowRight aria-hidden />
          </Link>
          <Link to="/noticias">
            Todas as notícias <ArrowRight aria-hidden />
          </Link>
        </nav>
      </Container>
    </div>
  );
}

function publishedStoriesForLayer(stories: AtlasEditorialItem[], layer: AtlasLayer) {
  return stories
    .filter((item) => !item.isDemo && item.slug && item.editorias.includes(layer))
    .sort((a, b) => (b.publicadoEm ?? "").localeCompare(a.publicadoEm ?? ""));
}

function AtlasEditorialSection({
  id,
  layer,
  title,
  intro,
  stories,
}: {
  id: string;
  layer: AtlasLayer;
  title: string;
  intro: string;
  stories: AtlasEditorialItem[];
}) {
  const [lead, ...secondary] = stories;
  if (!lead?.slug) return null;
  return (
    <section className="atlas-editorial-section" id={id} aria-labelledby={`${id}-title`}>
      <header className="atlas-editorial-section-heading">
        <div>
          <p className="atlas-portal-eyebrow">{layerLabel(layer)}</p>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{intro}</p>
        </div>
        <a href="#atlas-camadas">
          Explorar no Atlas <ArrowRight aria-hidden />
        </a>
      </header>
      <div className="atlas-editorial-grid">
        <article className="atlas-editorial-lead">
          <Link
            to="/noticias/$slug"
            params={{ slug: lead.slug }}
            className="atlas-editorial-lead-image"
          >
            <NewsImage {...(lead.imagem ? { image: lead.imagem } : {})} loading="eager" />
          </Link>
          <div className="atlas-editorial-lead-copy">
            <p>
              {lead.categoria}
              {lead.publicadoEm ? ` · ${formatDate(lead.publicadoEm)}` : ""}
            </p>
            <h3>
              <Link to="/noticias/$slug" params={{ slug: lead.slug }}>
                {lead.titulo}
              </Link>
            </h3>
            <p>{lead.resumo}</p>
            <Link
              to="/noticias/$slug"
              params={{ slug: lead.slug }}
              className="atlas-editorial-read"
            >
              Ler reportagem <ArrowRight aria-hidden />
            </Link>
          </div>
        </article>
        {secondary.length ? (
          <div className="atlas-editorial-secondary">
            {secondary.slice(0, 3).map((item) => (
              <article key={item.id}>
                <Link
                  to="/noticias/$slug"
                  params={{ slug: item.slug! }}
                  className="atlas-editorial-secondary-image"
                >
                  <NewsImage {...(item.imagem ? { image: item.imagem } : {})} />
                </Link>
                <div>
                  <p>
                    {item.categoria}
                    {item.publicadoEm ? ` · ${formatDate(item.publicadoEm)}` : ""}
                  </p>
                  <h3>
                    <Link to="/noticias/$slug" params={{ slug: item.slug! }}>
                      {item.titulo}
                    </Link>
                  </h3>
                  <p>{item.resumo}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function layerLabel(layer: AtlasLayer) {
  return editoriaItems.find((item) => item.layer === layer)?.label ?? "Notícias";
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.valueOf())
    ? value
    : date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}
