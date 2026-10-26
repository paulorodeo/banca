import { useEffect, useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CloudSun,
  Landmark,
  MapPinned,
  Newspaper,
  Scale,
  Wheat,
  Route as RouteIcon,
  UsersRound,
  Wallet,
  Building2,
} from "lucide-react";
import { NewsImage } from "@/components/site/news-image";
import { ExternalNewsCard } from "@/components/site/external-news-card";
import { readExternalNews } from "@/features/external-news/external-news.functions";
import type { ExternalNewsCardItem } from "@/features/external-news/query.server";
import { loadWeather, useWeather, WeatherIcon } from "@/components/site/weather-ticker";
import {
  BRASIL_REGIONS,
  BRASIL_UFS,
  BRASIL_VIEWBOX,
  SAO_PAULO_CAPITAL_PONTO,
  UFS_BY_REGION,
} from "@/content/local/brasil-ufs";
import { WEATHER_CAPITALS } from "@/content/local/weather-capitals";
import { filterAtlasStories } from "@/content/local/brasil-atlas-model";
import type { AtlasEditorialItem, AtlasLayer } from "@/content/atlas.functions";
import type { AtlasRoadDataset } from "@/content/local/atlas-roads.types";
import {
  BRAZIL_POPULATION_TOTAL,
  POPULATION_BY_REGION,
  POPULATION_BY_UF,
  POPULATION_INTERVALS,
  POPULATION_REFERENCE,
  POPULATION_SOURCE,
  POPULATION_SOURCE_URL,
  POPULATION_YEAR,
  populationColor,
} from "@/content/local/populacao-ibge-2026";
import {
  BRAZIL_GRAIN_PRODUCTION,
  GRAIN_HARVEST,
  GRAIN_PRODUCTION_BY_UF,
  GRAIN_PRODUCTION_INTERVALS,
  GRAIN_REFERENCE,
  GRAIN_SOURCE,
  GRAIN_SOURCE_URL,
  GRAIN_UNIT,
  grainProductionColor,
} from "@/content/local/conab-graos-2025-26";

const REGION_SLUG: Record<(typeof BRASIL_REGIONS)[number], string> = {
  Norte: "norte",
  Nordeste: "nordeste",
  "Centro-Oeste": "centro-oeste",
  Sudeste: "sudeste",
  Sul: "sul",
};
const localRoadsEnabled = import.meta.env.DEV && import.meta.env.MODE === "development";

const LAYERS: {
  id: AtlasLayer;
  label: string;
  icon: typeof Newspaper;
  availableForEditorial: (item: AtlasEditorialItem) => boolean;
  note?: string;
}[] = [
  { id: "noticias", label: "Notícias", icon: Newspaper, availableForEditorial: () => true },
  {
    id: "justica",
    label: "Justiça",
    icon: Scale,
    availableForEditorial: (item) => item.editorias.includes("justica"),
  },
  {
    id: "politica",
    label: "Política",
    icon: Landmark,
    availableForEditorial: (item) => item.editorias.includes("politica"),
  },
  {
    id: "economia",
    label: "Economia",
    icon: Wallet,
    availableForEditorial: (item) => item.editorias.includes("economia"),
  },
  {
    id: "agronegocio",
    label: "Agronegócio",
    icon: Wheat,
    availableForEditorial: (item) => item.editorias.includes("agronegocio"),
  },
  {
    id: "clima",
    label: "Clima",
    icon: CloudSun,
    availableForEditorial: () => true,
    note: "Consulta sob demanda às capitais estaduais.",
  },
  {
    id: "infraestrutura",
    label: "Infraestrutura",
    icon: Building2,
    availableForEditorial: (item) => item.editorias.includes("infraestrutura"),
  },
  {
    id: "rodovias",
    label: "Rodovias",
    icon: RouteIcon,
    availableForEditorial: (item) => item.editorias.includes("rodovias"),
  },
  { id: "populacao", label: "População", icon: UsersRound, availableForEditorial: () => true },
];

function StoryLink({
  item,
  children,
  className,
}: {
  item: AtlasEditorialItem;
  children: ReactNode;
  className: string;
}) {
  if (item.slug) {
    return (
      <Link to="/noticias/$slug" params={{ slug: item.slug }} className={className}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

export function BrazilEditorialAtlas({
  stories,
  variant = "home",
}: {
  stories: AtlasEditorialItem[];
  variant?: "home" | "portal";
}) {
  const [region, setRegion] = useState<string | null>(variant === "portal" ? null : "Sudeste");
  const [state, setState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [layer, setLayer] = useState<AtlasLayer>("noticias");
  const [focusedStoryId, setFocusedStoryId] = useState<string | null>(null);
  const [externalItems, setExternalItems] = useState<ExternalNewsCardItem[]>([]);
  const [roadDataset, setRoadDataset] = useState<AtlasRoadDataset | null>(null);
  const [roadDatasetStatus, setRoadDatasetStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [selectedRoad, setSelectedRoad] = useState<string | null>(null);
  const [hoveredRoad, setHoveredRoad] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const regionCode =
      region === "Norte"
        ? "N"
        : region === "Nordeste"
          ? "NE"
          : region === "Centro-Oeste"
            ? "CO"
            : region === "Sudeste"
              ? "SE"
              : region === "Sul"
                ? "S"
                : undefined;
    const supportsExternalLayer = [
      "noticias",
      "justica",
      "politica",
      "economia",
      "agronegocio",
      "infraestrutura",
    ].includes(layer);
    if (!supportsExternalLayer) {
      setExternalItems([]);
      return () => {
        active = false;
      };
    }
    void readExternalNews({
      data: {
        layer,
        ...(state ? { stateCode: state } : regionCode ? { regionCode } : {}),
        limit: 3,
      },
    }).then((result) => {
      if (active) setExternalItems(result);
    });
    return () => {
      active = false;
    };
  }, [layer, region, state]);

  useEffect(() => {
    if (layer !== "rodovias" || !localRoadsEnabled || roadDataset || roadDatasetStatus === "loading") return;
    let active = true;
    setRoadDatasetStatus("loading");
    void fetch("/__local/atlas-roads", { headers: { accept: "application/json" } })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Dados locais indisponíveis (HTTP ${response.status})`);
        return (await response.json()) as AtlasRoadDataset;
      })
      .then((dataset) => {
        if (!Array.isArray(dataset.roads) || !dataset.roads.length || dataset.productionEligible !== false) {
          throw new Error("O conjunto local de rodovias não passou na validação");
        }
        if (!active) return;
        setRoadDataset(dataset);
        setRoadDatasetStatus("ready");
      })
      .catch(() => {
        if (!active) return;
        setRoadDatasetStatus("error");
      });
    return () => {
      active = false;
    };
  }, [layer, roadDataset, roadDatasetStatus]);

  const roadPathsByUf = useMemo(() => {
    const result = new Map<string, Map<string, string[]>>();
    for (const road of roadDataset?.roads ?? []) {
      const byUf = new Map<string, string[]>();
      for (const segment of road.segments) {
        const paths = byUf.get(segment.uf) ?? [];
        paths.push(segment.path);
        byUf.set(segment.uf, paths);
      }
      result.set(road.code, byUf);
    }
    return result;
  }, [roadDataset]);

  const activeLayer = LAYERS.find((item) => item.id === layer)!;
  const displayedStories = useMemo(
    () => (layer === "clima" ? stories : filterAtlasStories(stories, { uf: state, region, layer })),
    [layer, region, state, stories],
  );
  const lead = displayedStories.find((item) => item.id === focusedStoryId) ?? displayedStories[0];
  const secondary = displayedStories.filter((item) => item.id !== lead?.id).slice(0, 2);
  const mapLabel = hoveredState
    ? BRASIL_UFS.find((item) => item.uf === hoveredState)?.nome
    : state
      ? BRASIL_UFS.find((item) => item.uf === state)?.nome
      : (region ?? "Brasil");
  const layerHasStories = layer === "clima" || stories.some(activeLayer.availableForEditorial);
  const hasSelectedStatePortal = Boolean(state && stories.some((item) => item.ufs.includes(state)));
  const hasSelectedRegionPortal = Boolean(
    region && filterAtlasStories(stories, { region }).length > 0,
  );

  const selectState = (uf: string) => {
    const selected = BRASIL_UFS.find((item) => item.uf === uf);
    if (!selected) return;
    setState(uf);
    setRegion(selected.regiao);
    setHoveredState(null);
    setFocusedStoryId(null);
  };

  const handleStateKey = (event: KeyboardEvent<SVGPathElement>, uf: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectState(uf);
    }
  };

  return (
    <section
      id="brasil-em-foco"
      className={`brazil-atlas-section ${variant === "portal" ? "is-portal" : ""}`}
      aria-labelledby="brazil-atlas-title"
    >
      <div className="brazil-atlas-shell">
        <header className="brazil-atlas-heading">
          <p className="brazil-atlas-eyebrow">
            <span aria-hidden /> Brasil em foco
          </p>
          <h2 id="brazil-atlas-title">O Brasil, em múltiplas camadas</h2>
          <p className="brazil-atlas-intro">
            Panorama nacional com informação territorial, jurídica e institucional. Explore os dados
            por região, estado e tema.
          </p>
        </header>

        <div className="brazil-atlas-grid">
          <aside className="brazil-atlas-layers" aria-label="Camadas editoriais">
            <p className="brazil-atlas-side-label">Camadas</p>
            {LAYERS.map(({ id, label, icon: Icon, availableForEditorial: hasData, note }) => {
              const available =
                id === "rodovias"
                  ? localRoadsEnabled
                  : id === "clima" ||
                    id === "populacao" ||
                    id === "agronegocio" ||
                    stories.some(hasData);
              return (
                <button
                  key={id}
                  type="button"
                  className={`brazil-atlas-layer ${layer === id ? "is-active" : ""}`}
                  aria-pressed={layer === id}
                  disabled={!available}
                  title={
                    available ? note : "Camada identificada; conteúdo editorial ainda indisponível."
                  }
                  onClick={() => {
                    setLayer(id);
                    setFocusedStoryId(null);
                  }}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  <span>{label}</span>
                  {!available ? (
                    <small>Em breve</small>
                  ) : (
                    <ArrowRight className="brazil-atlas-layer-arrow size-3.5" aria-hidden />
                  )}
                </button>
              );
            })}
            <p className="brazil-atlas-layer-note">
              Camadas sem cobertura publicada permanecem identificadas, sem simular dados.
            </p>
          </aside>

          <div className="brazil-atlas-map-group">
            <nav className="brazil-atlas-regions" aria-label="Filtrar por macrorregião">
              {BRASIL_REGIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={region === item && !state}
                  className={region === item && !state ? "is-active" : ""}
                  onClick={() => {
                    setRegion(region === item && !state ? null : item);
                    setState(null);
                    setFocusedStoryId(null);
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>

            {layer === "rodovias" && roadDataset ? (
              <div className="brazil-atlas-road-controls" role="group" aria-label="Selecionar rodovia federal">
                {roadDataset.roads.map((road) => (
                  <button
                    key={road.code}
                    type="button"
                    aria-pressed={selectedRoad === road.code}
                    className={selectedRoad === road.code ? "is-active" : ""}
                    onClick={() => setSelectedRoad(road.code)}
                  >
                    {road.code}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="brazil-atlas-map-column">
              <div className="brazil-atlas-map-status">
                <span aria-live="polite">{hoveredState ? `Sobrevoando: ${mapLabel}` : `Em foco: ${mapLabel}`}</span>
                {region || state ? (
                  <button
                    type="button"
                    onClick={() => {
                      setState(null);
                      setRegion(null);
                      setHoveredState(null);
                      setFocusedStoryId(null);
                    }}
                  >
                    Ver Brasil
                  </button>
                ) : null}
              </div>
              <svg
                className={`brazil-atlas-map ${layer === "clima" ? "is-climate-layer" : ""}`}
                viewBox={BRASIL_VIEWBOX}
                role="group"
                aria-label="Mapa interativo das 27 unidades federativas do Brasil"
                onPointerLeave={() => setHoveredState(null)}
              >
                <defs>
                  <filter id="atlas-state-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {BRASIL_UFS.map((item) => {
                  const selected = state === item.uf;
                  const inRegion = !state && region === item.regiao;
                  const climateFocus = layer === "clima" && item.uf === "SP";
                  const populationValue = POPULATION_BY_UF[item.uf] ?? 0;
                  const grainProduction = GRAIN_PRODUCTION_BY_UF[item.uf] ?? 0;
                  const stateAriaLabel =
                    layer === "populacao"
                      ? `${item.nome}, ${item.uf}, ${populationValue.toLocaleString("pt-BR")} habitantes estimados em ${POPULATION_YEAR}`
                      : layer === "agronegocio"
                        ? `${item.nome}, ${item.uf}, produção de grãos estimada em ${grainProduction.toLocaleString("pt-BR")} mil toneladas na safra ${GRAIN_HARVEST}`
                        : `${item.nome}, ${item.uf}, região ${item.regiao}`;
                  return (
                    <g key={item.uf}>
                      <path
                        d={item.d}
                        className={`brazil-atlas-state ${selected ? "is-selected" : ""} ${inRegion ? "is-in-region" : ""} ${hoveredState === item.uf ? "is-hovered" : ""} ${climateFocus ? "is-climate-focus" : ""}`}
                        tabIndex={0}
                        role="button"
                        aria-label={stateAriaLabel}
                        {...(layer === "populacao"
                          ? {
                              style: { fill: populationColor(populationValue) },
                            }
                          : {})}
                        {...(layer === "agronegocio"
                          ? {
                              style: { fill: grainProductionColor(grainProduction) },
                            }
                          : {})}
                        aria-pressed={selected}
                        onClick={() => selectState(item.uf)}
                        onKeyDown={(event) => handleStateKey(event, item.uf)}
                        onPointerEnter={() => setHoveredState(item.uf)}
                        onFocus={() => setHoveredState(item.uf)}
                        onBlur={() => setHoveredState(null)}
                      >
                        <title>{`${item.nome} (${item.uf}) — ${item.regiao}`}</title>
                      </path>
                    </g>
                  );
                })}
                {layer === "rodovias" && roadDataset ? (
                  <g className="brazil-atlas-roads" aria-label="Traçados geográficos de rodovias federais">
                    {[...roadPathsByUf.entries()].map(([roadCode, byUf]) => {
                      const selected = selectedRoad === roadCode;
                      const hovered = hoveredRoad === roadCode;
                      const emphasized = !selectedRoad || selected || hovered;
                      const selectedRegionUfs = !state && region ? UFS_BY_REGION[region as keyof typeof UFS_BY_REGION] : null;
                      const completePath = [...byUf.values()].flatMap((paths) => paths).join("");
                      return (
                        <g
                          key={roadCode}
                          className={`brazil-atlas-road ${selected ? "is-selected" : ""} ${hovered ? "is-hovered" : ""} ${emphasized ? "is-emphasized" : "is-muted"}`}
                          onPointerEnter={() => setHoveredRoad(roadCode)}
                          onPointerLeave={() => setHoveredRoad(null)}
                        >
                          {[...byUf.entries()].map(([uf, paths]) => {
                            const geographyActive = state ? state === uf : selectedRegionUfs ? selectedRegionUfs.includes(uf) : true;
                            return (
                              <path
                                key={`${roadCode}-${uf}`}
                                d={paths.join("")}
                                className={`brazil-atlas-road-line ${geographyActive ? "is-geography-active" : "is-geography-muted"}`}
                                aria-hidden="true"
                              />
                            );
                          })}
                          <path
                            d={completePath}
                            className="brazil-atlas-road-hit"
                            role="button"
                            tabIndex={0}
                            aria-label={`${roadCode}, trechos federais em ${[...byUf.keys()].join(", ")}`}
                            aria-pressed={selected}
                            onClick={() => setSelectedRoad(roadCode)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                setSelectedRoad(roadCode);
                              }
                            }}
                          >
                            <title>{roadCode} · selecionar rodovia</title>
                          </path>
                        </g>
                      );
                    })}
                  </g>
                ) : null}
                {BRASIL_UFS.map((item) => item.label ? (
                  <text
                    key={`label-${item.uf}`}
                    x={item.label[0]}
                    y={item.label[1]}
                    className={`brazil-atlas-state-label ${state === item.uf || (!state && region === item.regiao) ? "is-in-region" : ""}`}
                    aria-hidden="true"
                  >
                    {item.uf}
                  </text>
                ) : null)}
                {layer === "clima" ? (
                  <circle
                    cx={SAO_PAULO_CAPITAL_PONTO[0]}
                    cy={SAO_PAULO_CAPITAL_PONTO[1]}
                    r="6"
                    className="brazil-atlas-weather-point"
                    aria-label="Observação meteorológica da cidade de São Paulo"
                  />
                ) : null}
              </svg>
              <div className="brazil-atlas-map-caption">
                <MapPinned className="size-4 text-cyan-300" aria-hidden />
                <span>
                  {layer === "rodovias"
                    ? "Traçados da malha federal sobre a geometria estadual. Selecione uma BR no mapa ou nos controles."
                    : "Selecione um estado para filtrar o painel editorial. O mapa representa limites estaduais."}
                </span>
              </div>
              <p className="brazil-atlas-source">
                Geometria estadual: Malha Territorial 2025 · IBGE
                {layer === "rodovias" && roadDataset
                  ? ` · Rodovias: SNV ${roadDataset.version} — distribuição Ibama/PAMGIA (uso local; direitos pendentes)`
                  : ""}
              </p>
            </div>
          </div>

          <aside className="brazil-atlas-news" aria-label="Destaques editoriais">
            {import.meta.env["VITE_ATLAS_DEMO"] === "true" &&
            (import.meta.env.DEV || import.meta.env.MODE === "staging") ? (
              <p className="brazil-atlas-demo-banner">
                Conteúdo demonstrativo · itens fictícios identificados
              </p>
            ) : null}
            <div className="brazil-atlas-news-topline">
              <span>
                {layer === "clima"
                  ? "Camada em foco"
                  : state
                    ? "Destaque estadual"
                    : region
                      ? "Destaque regional"
                      : "Destaque nacional"}
              </span>
              <span>{layer === "clima" ? "Clima" : activeLayer.label}</span>
            </div>
            {layer === "rodovias" ? (
              <RoadwayPanel
                dataset={roadDataset}
                status={roadDatasetStatus}
                selectedRoad={selectedRoad}
                selectedState={state}
                region={region}
                stories={displayedStories}
              />
            ) : layer === "clima" ? (
              <WeatherPanel state={state} region={region} onSelectState={selectState} />
            ) : layer === "populacao" ? (
              <PopulationPanel state={state} region={region} onSelectState={selectState} />
            ) : layer === "agronegocio" ? (
              <AgribusinessPanel
                state={state}
                region={region}
                stories={displayedStories}
                onSelectState={selectState}
              />
            ) : lead ? (
              <>
                <StoryLink
                  item={lead}
                  className={`brazil-atlas-lead ${lead.isDemo ? "is-demo" : ""}`}
                >
                  <div className="brazil-atlas-lead-copy">
                    {lead.isDemo ? (
                      <span className="brazil-atlas-demo-label">Conteúdo demonstrativo</span>
                    ) : null}
                    <p className="brazil-atlas-category">{lead.categoria}</p>
                    <h3>{lead.titulo}</h3>
                    <p className="brazil-atlas-summary">{lead.resumo}</p>
                    {lead.slug ? (
                      <span className="brazil-atlas-read-link">
                        Ler reportagem <ArrowRight className="size-4" aria-hidden />
                      </span>
                    ) : null}
                  </div>
                  <div className="brazil-atlas-lead-image">
                    <NewsImage
                      {...(lead.imagem ? { image: lead.imagem } : {})}
                      className="size-full object-cover"
                    />
                  </div>
                </StoryLink>
                <div className="brazil-atlas-secondary" aria-label="Notícias secundárias">
                  {secondary.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="brazil-atlas-secondary-item"
                      onClick={() => setFocusedStoryId(item.id)}
                    >
                      <span>
                        {item.isDemo ? <small>Demonstrativa · </small> : null}
                        {item.categoria}
                      </span>
                      <strong>{item.titulo}</strong>
                      <ArrowRight className="size-4 shrink-0" aria-hidden />
                    </button>
                  ))}
                </div>
                {displayedStories.every((item) => item.isDemo) ? (
                  <p className="brazil-atlas-demo-disclaimer">
                    As manchetes exibidas são fictícias e servem apenas à demonstração dos filtros.
                    Não correspondem a reportagens publicadas.
                  </p>
                ) : null}
                <div className="brazil-atlas-news-footer">
                  <Link to="/noticias" className="brazil-atlas-all-news">
                    Ver editoria de Notícias <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  {state && hasSelectedStatePortal ? (
                    <Link
                      to="/noticias/estados/$uf"
                      params={{ uf: state.toLowerCase() }}
                      className="brazil-atlas-all-news"
                    >
                      Portal de {BRASIL_UFS.find((item) => item.uf === state)?.nome}{" "}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  ) : region && hasSelectedRegionPortal ? (
                    <Link
                      to="/noticias/regioes/$slug"
                      params={{ slug: REGION_SLUG[region as keyof typeof REGION_SLUG] }}
                      className="brazil-atlas-all-news"
                    >
                      Portal do {region} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  ) : state ? (
                    <span>Portal estadual ainda não disponível</span>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="brazil-atlas-empty">
                <Newspaper className="size-7 text-gold" aria-hidden />
                <h3>Nenhuma reportagem nesta seleção</h3>
                <p>
                  A Banca Paulista ainda não tem cobertura publicada para{" "}
                  {state
                    ? BRASIL_UFS.find((item) => item.uf === state)?.nome
                    : (region ?? "este recorte")}{" "}
                  nesta camada.
                </p>
                <Link to="/noticias">
                  Ver todas as notícias <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            )}
            {externalItems.length ? (
              <div
                className="brazil-atlas-external-news"
                aria-label="Referências de veículos externos"
              >
                <p>Referências externas · curadoria editorial</p>
                {externalItems.map((item) => (
                  <ExternalNewsCard key={item.id} item={item} compact />
                ))}
              </div>
            ) : null}
            {layerHasStories && layer !== "clima" && displayedStories.length > 0 ? (
              <p className="brazil-atlas-count">
                {displayedStories.length} {displayedStories.length === 1 ? "conteúdo" : "conteúdos"}{" "}
                neste recorte
              </p>
            ) : null}
          </aside>
        </div>
        <p className="brazil-atlas-credit">
          Limites estaduais generalizados do IBGE, licenciados em termos compatíveis com CC BY 4.0.
          A representação não tem finalidade cadastral.
        </p>
      </div>
    </section>
  );
}

function PopulationPanel({
  state,
  region,
  onSelectState,
}: {
  state: string | null;
  region: string | null;
  onSelectState: (uf: string) => void;
}) {
  const selected = BRASIL_UFS.find((item) => item.uf === state);
  const number = (value: number) => value.toLocaleString("pt-BR");
  const regionalStates = region
    ? BRASIL_UFS.filter((item) => item.regiao === region).sort(
        (a, b) => (POPULATION_BY_UF[b.uf] ?? 0) - (POPULATION_BY_UF[a.uf] ?? 0),
      )
    : [];
  return (
    <div className="brazil-atlas-population-card">
      <p className="brazil-atlas-weather-location">
        <UsersRound className="size-4" aria-hidden /> Estimativa populacional · {POPULATION_YEAR}
      </p>
      {selected ? (
        <>
          <h3>
            {selected.nome} ({selected.uf})
          </h3>
          <strong className="brazil-atlas-population-total">
            {number(POPULATION_BY_UF[selected.uf] ?? 0)}
          </strong>
          <p className="brazil-atlas-population-unit">habitantes estimados</p>
        </>
      ) : region ? (
        <>
          <h3>Região {region}</h3>
          <strong className="brazil-atlas-population-total">
            {number(POPULATION_BY_REGION[region] ?? 0)}
          </strong>
          <p className="brazil-atlas-population-unit">habitantes estimados na região</p>
          <ul
            className="brazil-atlas-population-list"
            aria-label={`População estimada por estado da região ${region}`}
          >
            {regionalStates.map((item) => (
              <li key={item.uf}>
                <button
                  type="button"
                  onClick={() => onSelectState(item.uf)}
                  aria-label={`Selecionar ${item.nome}`}
                >
                  <span>
                    {item.nome} <b>{item.uf}</b>
                  </span>
                  <strong>{number(POPULATION_BY_UF[item.uf] ?? 0)}</strong>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3>Brasil</h3>
          <strong className="brazil-atlas-population-total">
            {number(BRAZIL_POPULATION_TOTAL)}
          </strong>
          <p className="brazil-atlas-population-unit">habitantes estimados</p>
        </>
      )}
      <p className="brazil-atlas-population-reference">
        Data de referência: {POPULATION_REFERENCE}.
      </p>
      <div
        className="brazil-atlas-population-legend"
        aria-label="Legenda de intervalos de população estimada por UF"
      >
        {POPULATION_INTERVALS.map((range) => (
          <span key={range.label}>
            <i style={{ backgroundColor: range.color }} aria-hidden />
            {range.label}
          </span>
        ))}
      </div>
      <a
        className="brazil-atlas-population-source"
        href={POPULATION_SOURCE_URL}
        target="_blank"
        rel="noreferrer"
      >
        Fonte: {POPULATION_SOURCE} ↗
      </a>
    </div>
  );
}

function RoadwayPanel({
  dataset,
  status,
  selectedRoad,
  selectedState,
  region,
  stories,
}: {
  dataset: AtlasRoadDataset | null;
  status: "idle" | "loading" | "ready" | "error";
  selectedRoad: string | null;
  selectedState: string | null;
  region: string | null;
  stories: AtlasEditorialItem[];
}) {
  const road = dataset?.roads.find((item) => item.code === selectedRoad);
  const roadStories = stories.filter((story) => story.roadCodes?.includes(selectedRoad ?? ""));
  const selectedUf = selectedState ? BRASIL_UFS.find((item) => item.uf === selectedState) : null;
  const relevantSegments = road?.segments.filter((segment) =>
    selectedState
      ? segment.uf === selectedState
      : region
        ? UFS_BY_REGION[region as keyof typeof UFS_BY_REGION].includes(segment.uf)
        : true,
  ) ?? [];

  if (status === "loading" || status === "idle") {
    return <div className="brazil-atlas-road-panel" role="status">Carregando traçados oficiais locais…</div>;
  }
  if (status === "error" || !dataset) {
    return (
      <div className="brazil-atlas-road-panel" role="status">
        <h3>Traçados indisponíveis</h3>
        <p>Gere o conjunto local de rodovias e mantenha o servidor de desenvolvimento ativo.</p>
      </div>
    );
  }

  return (
    <div className="brazil-atlas-road-panel">
      <p className="brazil-atlas-road-kicker"><RouteIcon className="size-4" aria-hidden /> Malha federal · SNV {dataset.version}</p>
      {road ? (
        <>
          <h3>{road.code}</h3>
          <p className="brazil-atlas-road-states">
            {selectedUf ? `${selectedUf.nome} (${selectedUf.uf}) · ${relevantSegments.length} trechos nesta seleção` : `${road.ufs.length} UFs · ${road.ufs.join(", ")}`}
          </p>
          <div className="brazil-atlas-road-news">
            <strong>Notícias relacionadas</strong>
            {roadStories.length ? roadStories.slice(0, 3).map((story) => (
              story.slug ? <Link key={story.id} to="/noticias/$slug" params={{ slug: story.slug }}>{story.titulo}</Link> : <p key={story.id}>{story.titulo}</p>
            )) : <p>Ainda não há reportagens relacionadas a esta rodovia.</p>}
          </div>
        </>
      ) : (
        <>
          <h3>Rodovias federais</h3>
          <p>Selecione uma linha no mapa ou uma BR nos controles para destacar todos os trechos disponíveis.</p>
        </>
      )}
      <small>{dataset.attribution}</small>
    </div>
  );
}

function AgribusinessPanel({
  state,
  region,
  stories,
  onSelectState,
}: {
  state: string | null;
  region: string | null;
  stories: AtlasEditorialItem[];
  onSelectState: (uf: string) => void;
}) {
  const selected = BRASIL_UFS.find((item) => item.uf === state);
  const format = (value: number) =>
    value.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const regionalStates = region
    ? BRASIL_UFS.filter((item) => item.regiao === region).sort(
        (a, b) => (GRAIN_PRODUCTION_BY_UF[b.uf] ?? 0) - (GRAIN_PRODUCTION_BY_UF[a.uf] ?? 0),
      )
    : [];
  const regionTotal = regionalStates.reduce(
    (sum, item) => sum + (GRAIN_PRODUCTION_BY_UF[item.uf] ?? 0),
    0,
  );
  const headlines = stories.slice(0, 3);
  return (
    <div className="brazil-atlas-population-card">
      <p className="brazil-atlas-weather-location">
        <Wheat className="size-4" aria-hidden /> Produção de grãos · Safra {GRAIN_HARVEST}
      </p>
      {selected ? (
        <>
          <h3>
            {selected.nome} ({selected.uf})
          </h3>
          <strong className="brazil-atlas-population-total">
            {format(GRAIN_PRODUCTION_BY_UF[selected.uf] ?? 0)}
          </strong>
          <p className="brazil-atlas-population-unit">{GRAIN_UNIT}</p>
        </>
      ) : region ? (
        <>
          <h3>Região {region}</h3>
          <strong className="brazil-atlas-population-total">{format(regionTotal)}</strong>
          <p className="brazil-atlas-population-unit">{GRAIN_UNIT} · soma das UFs da região</p>
          <ul
            className="brazil-atlas-population-list"
            aria-label={`Produção de grãos por UF na região ${region}`}
          >
            {regionalStates.map((item) => (
              <li key={item.uf}>
                <button type="button" onClick={() => onSelectState(item.uf)}>
                  <span>
                    {item.nome} <b>{item.uf}</b>
                  </span>
                  <strong>{format(GRAIN_PRODUCTION_BY_UF[item.uf] ?? 0)}</strong>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h3>Brasil</h3>
          <strong className="brazil-atlas-population-total">
            {format(BRAZIL_GRAIN_PRODUCTION)}
          </strong>
          <p className="brazil-atlas-population-unit">{GRAIN_UNIT} · total Conab para a safra</p>
        </>
      )}
      <p className="brazil-atlas-population-reference">
        {GRAIN_REFERENCE}. Indicador de grãos; não representa toda a agropecuária.
      </p>
      <div
        className="brazil-atlas-population-legend"
        aria-label="Legenda de produção de grãos por UF"
      >
        {GRAIN_PRODUCTION_INTERVALS.map((range) => (
          <span key={range.label}>
            <i style={{ backgroundColor: range.color }} aria-hidden />
            {range.label}
          </span>
        ))}
      </div>
      <a
        className="brazil-atlas-population-source"
        href={GRAIN_SOURCE_URL}
        target="_blank"
        rel="noreferrer"
      >
        Fonte: {GRAIN_SOURCE} ↗
      </a>
      <div className="brazil-atlas-agri-headlines" aria-label="Reportagens sobre agronegócio">
        <strong>Reportagens relacionadas</strong>
        {headlines.length ? (
          headlines.map((item) =>
            item.slug ? (
              <Link key={item.id} to="/noticias/$slug" params={{ slug: item.slug }}>
                {item.titulo}
              </Link>
            ) : (
              <span key={item.id}>
                <small>Conteúdo demonstrativo</small> {item.titulo}
              </span>
            ),
          )
        ) : (
          <p>Não há reportagem relacionada a este recorte.</p>
        )}
      </div>
    </div>
  );
}

function WeatherPanel({
  state,
  region,
  onSelectState,
}: {
  state: string | null;
  region: string | null;
  onSelectState: (uf: string) => void;
}) {
  const { data: homeWeather } = useWeather();
  const [weather, setWeather] = useState<Awaited<ReturnType<typeof loadWeather>> | undefined>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const capital = state ? WEATHER_CAPITALS[state] : undefined;
  useEffect(() => {
    let active = true;
    setWeather(undefined);
    setError(false);
    if (!state) {
      setPending(false);
      return () => {
        active = false;
      };
    }
    if (state === "SP" && homeWeather) {
      setWeather(homeWeather);
      setPending(false);
      return () => {
        active = false;
      };
    }
    setPending(true);
    void loadWeather(state)
      .then((data) => {
        if (active) setWeather(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setPending(false);
      });
    return () => {
      active = false;
    };
  }, [homeWeather, state]);
  if (!state) {
    const visibleUfs = region ? (UFS_BY_REGION[region as keyof typeof UFS_BY_REGION] ?? []) : [];
    return (
      <div className="brazil-atlas-weather-card">
        <p className="brazil-atlas-weather-location">
          <CloudSun className="size-4" aria-hidden /> Capitais brasileiras
        </p>
        <p className="brazil-atlas-weather-note">
          Selecione uma capital para consultar a condição atual. A consulta é feita sob demanda; os
          dados descrevem apenas a capital, não todo o estado.
        </p>
        {visibleUfs.length ? (
          <ul className="brazil-atlas-climate-cities" aria-label={`Capitais da região ${region}`}>
            {visibleUfs.map((uf) => {
              const item = WEATHER_CAPITALS[uf];
              if (!item) return null;
              return (
                <li key={uf}>
                  <button type="button" onClick={() => onSelectState(uf)}>
                    <span>{item.city}</span>
                    <b>{uf}</b>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="brazil-atlas-weather-note">
            Escolha uma região ou selecione uma unidade federativa no mapa.
          </p>
        )}
        <WeatherAttribution />
      </div>
    );
  }
  if (pending)
    return (
      <div className="brazil-atlas-weather-card" aria-live="polite">
        Carregando observação meteorológica de {capital?.city ?? "capital selecionada"}…
      </div>
    );
  if (error || !weather) {
    return (
      <div className="brazil-atlas-empty">
        <CloudSun className="size-7 text-gold" aria-hidden />
        <h3>Clima temporariamente indisponível</h3>
        <p>
          Não foi possível carregar a condição atual de {capital?.city ?? "esta capital"}. A seleção
          permanece disponível para nova tentativa.
        </p>
        <WeatherAttribution />
      </div>
    );
  }
  return (
    <div className="brazil-atlas-weather-card">
      <p className="brazil-atlas-weather-location">
        <MapPinned className="size-4" aria-hidden /> {capital?.city} · capital de{" "}
        {BRASIL_UFS.find((item) => item.uf === state)?.nome}
      </p>
      <div className="brazil-atlas-weather-now">
        <WeatherIcon kind={weather.kind} className="size-9 text-cyan-200" />
        <strong>{Math.round(weather.tempC)}°</strong>
      </div>
      <p className="brazil-atlas-weather-condition">{weather.label}</p>
      <p className="brazil-atlas-weather-note">
        Sensação térmica: {Math.round(weather.feelsLikeC)}°C · Umidade: {weather.humidity}%
      </p>
      <p className="brazil-atlas-weather-note">
        Observação pontual da capital; não representa condições de todo o estado.
      </p>
      <span className="brazil-atlas-updated">
        Atualizado: {weather.updatedAt} ({weather.timezone.replaceAll("_", " ")})
      </span>
      <WeatherAttribution />
    </div>
  );
}

function WeatherAttribution() {
  return (
    <p className="brazil-atlas-weather-attribution">
      <a href="https://www.weatherapi.com/" target="_blank" rel="noreferrer">
        Weather data by WeatherAPI.com
      </a>
      . Informação geral, sem finalidade de segurança ou emergência; consulte serviços
      meteorológicos oficiais.
    </p>
  );
}
