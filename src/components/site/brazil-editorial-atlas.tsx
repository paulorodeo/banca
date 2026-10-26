import { useMemo, useState, type KeyboardEvent, type ReactNode } from "react";
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
import { useWeather, WeatherIcon } from "@/components/site/weather-ticker";
import { BRASIL_REGIONS, BRASIL_UFS, BRASIL_VIEWBOX, SAO_PAULO_CAPITAL_PONTO, UFS_BY_REGION } from "@/content/local/brasil-ufs";
import { filterAtlasStories } from "@/content/local/brasil-atlas-model";
import type { AtlasEditorialItem, AtlasLayer } from "@/content/atlas.functions";

const REGION_SLUG: Record<(typeof BRASIL_REGIONS)[number], string> = {
  Norte: "norte",
  Nordeste: "nordeste",
  "Centro-Oeste": "centro-oeste",
  Sudeste: "sudeste",
  Sul: "sul",
};

const LAYERS: {
  id: AtlasLayer;
  label: string;
  icon: typeof Newspaper;
  availableForEditorial: (item: AtlasEditorialItem) => boolean;
  note?: string;
}[] = [
  { id: "noticias", label: "Notícias", icon: Newspaper, availableForEditorial: () => true },
  { id: "justica", label: "Justiça", icon: Scale, availableForEditorial: (item) => item.editorias.includes("justica") },
  { id: "politica", label: "Política", icon: Landmark, availableForEditorial: (item) => item.editorias.includes("politica") },
  { id: "economia", label: "Economia", icon: Wallet, availableForEditorial: (item) => item.editorias.includes("economia") },
  { id: "agronegocio", label: "Agronegócio", icon: Wheat, availableForEditorial: (item) => item.editorias.includes("agronegocio") },
  { id: "clima", label: "Clima", icon: CloudSun, availableForEditorial: () => true, note: "Integração atual cobre a capital paulista." },
  { id: "infraestrutura", label: "Infraestrutura", icon: Building2, availableForEditorial: (item) => item.editorias.includes("infraestrutura") },
  { id: "rodovias", label: "Rodovias", icon: RouteIcon, availableForEditorial: (item) => item.editorias.includes("rodovias") },
  { id: "populacao", label: "População", icon: UsersRound, availableForEditorial: (item) => item.editorias.includes("populacao") },
];

function StoryLink({ item, children, className }: { item: AtlasEditorialItem; children: ReactNode; className: string }) {
  if (item.slug) {
    return (
      <Link to="/noticias/$slug" params={{ slug: item.slug }} className={className}>
        {children}
      </Link>
    );
  }
  return <div className={className}>{children}</div>;
}

export function BrazilEditorialAtlas({ stories }: { stories: AtlasEditorialItem[] }) {
  const [region, setRegion] = useState<string | null>("Sudeste");
  const [state, setState] = useState<string | null>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [layer, setLayer] = useState<AtlasLayer>("noticias");
  const [focusedStoryId, setFocusedStoryId] = useState<string | null>(null);
  const { data: weather, isPending: weatherPending, error: weatherError } = useWeather();

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
      : region ?? "Brasil";
  const layerHasStories = layer === "clima" || stories.some(activeLayer.availableForEditorial);
  const weatherInScope =
    (!state || state === "SP") && (!region || region === "Sudeste");
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
    <section id="brasil-em-foco" className="brazil-atlas-section" aria-labelledby="brazil-atlas-title">
      <div className="brazil-atlas-shell">
        <header className="brazil-atlas-heading">
          <p className="brazil-atlas-eyebrow"><span aria-hidden /> Brasil em foco</p>
          <h2 id="brazil-atlas-title">O Brasil, em múltiplas camadas</h2>
          <p className="brazil-atlas-intro">
            Panorama nacional com informação territorial, jurídica e institucional. Explore os dados por região, estado e tema.
          </p>
        </header>

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

        <div className="brazil-atlas-grid">
          <aside className="brazil-atlas-layers" aria-label="Camadas editoriais">
            <p className="brazil-atlas-side-label">Camadas</p>
            {LAYERS.map(({ id, label, icon: Icon, availableForEditorial: hasData, note }) => {
              const available = id === "clima" || stories.some(hasData);
              return (
                <button
                  key={id}
                  type="button"
                  className={`brazil-atlas-layer ${layer === id ? "is-active" : ""}`}
                  aria-pressed={layer === id}
                  disabled={!available}
                  title={available ? note : "Camada identificada; conteúdo editorial ainda indisponível."}
                  onClick={() => {
                    setLayer(id);
                    setFocusedStoryId(null);
                  }}
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  <span>{label}</span>
                  {!available ? <small>Em breve</small> : <ArrowRight className="brazil-atlas-layer-arrow size-3.5" aria-hidden />}
                </button>
              );
            })}
            <p className="brazil-atlas-layer-note">
              Camadas sem cobertura publicada permanecem identificadas, sem simular dados.
            </p>
          </aside>

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
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {BRASIL_UFS.map((item) => {
                const selected = state === item.uf;
                const inRegion = !state && region === item.regiao;
                const climateFocus = layer === "clima" && item.uf === "SP";
                return (
                  <g key={item.uf}>
                    <path
                      d={item.d}
                      className={`brazil-atlas-state ${selected ? "is-selected" : ""} ${inRegion ? "is-in-region" : ""} ${hoveredState === item.uf ? "is-hovered" : ""} ${climateFocus ? "is-climate-focus" : ""}`}
                      tabIndex={0}
                      role="button"
                      aria-label={`${item.nome}, ${item.uf}, região ${item.regiao}`}
                      aria-pressed={selected}
                      onClick={() => selectState(item.uf)}
                      onKeyDown={(event) => handleStateKey(event, item.uf)}
                      onPointerEnter={() => setHoveredState(item.uf)}
                      onFocus={() => setHoveredState(item.uf)}
                      onBlur={() => setHoveredState(null)}
                    >
                      <title>{`${item.nome} (${item.uf}) — ${item.regiao}`}</title>
                    </path>
                    <text
                      x={item.label[0]}
                      y={item.label[1]}
                      className={`brazil-atlas-state-label ${selected || inRegion ? "is-in-region" : ""}`}
                      aria-hidden="true"
                    >
                      {item.uf}
                    </text>
                  </g>
                );
              })}
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
              <span>Selecione um estado para filtrar o painel editorial. O mapa representa limites estaduais.</span>
            </div>
            <p className="brazil-atlas-source">Geometria: Malha Territorial 2025 · IBGE</p>
          </div>

          <aside className="brazil-atlas-news" aria-label="Destaques editoriais">
            {import.meta.env["VITE_ATLAS_DEMO"] === "true" && (import.meta.env.DEV || import.meta.env.MODE === "staging") ? (
              <p className="brazil-atlas-demo-banner">Conteúdo demonstrativo · itens fictícios identificados</p>
            ) : null}
            <div className="brazil-atlas-news-topline">
              <span>{layer === "clima" ? "Camada em foco" : state ? "Destaque estadual" : region ? "Destaque regional" : "Destaque nacional"}</span>
              <span>{layer === "clima" ? "Clima" : activeLayer.label}</span>
            </div>
            {layer === "clima" ? (
              <WeatherPanel
                inScope={weatherInScope}
                pending={weatherPending}
                error={weatherError}
                weather={weather}
              />
            ) : lead ? (
              <>
                <StoryLink item={lead} className={`brazil-atlas-lead ${lead.isDemo ? "is-demo" : ""}`}>
                  <div className="brazil-atlas-lead-copy">
                    {lead.isDemo ? <span className="brazil-atlas-demo-label">Conteúdo demonstrativo</span> : null}
                    <p className="brazil-atlas-category">{lead.categoria}</p>
                    <h3>{lead.titulo}</h3>
                    <p className="brazil-atlas-summary">{lead.resumo}</p>
                    {lead.slug ? <span className="brazil-atlas-read-link">Ler reportagem <ArrowRight className="size-4" aria-hidden /></span> : null}
                  </div>
                  <div className="brazil-atlas-lead-image">
                  <NewsImage {...(lead.imagem ? { image: lead.imagem } : {})} className="size-full object-cover" />
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
                  <p className="brazil-atlas-demo-disclaimer">As manchetes exibidas são fictícias e servem apenas à demonstração dos filtros. Não correspondem a reportagens publicadas.</p>
                ) : null}
                <div className="brazil-atlas-news-footer">
                  <Link to="/noticias" className="brazil-atlas-all-news">Ver editoria de Notícias <ArrowRight className="size-4" aria-hidden /></Link>
                  {state && hasSelectedStatePortal ? (
                    <Link to="/noticias/estados/$uf" params={{ uf: state.toLowerCase() }} className="brazil-atlas-all-news">Portal de {BRASIL_UFS.find((item) => item.uf === state)?.nome} <ArrowRight className="size-4" aria-hidden /></Link>
                  ) : region && hasSelectedRegionPortal ? (
                    <Link to="/noticias/regioes/$slug" params={{ slug: REGION_SLUG[region as keyof typeof REGION_SLUG] }} className="brazil-atlas-all-news">Portal do {region} <ArrowRight className="size-4" aria-hidden /></Link>
                  ) : state ? <span>Portal estadual ainda não disponível</span> : null}
                </div>
              </>
            ) : (
              <div className="brazil-atlas-empty">
                <Newspaper className="size-7 text-gold" aria-hidden />
                <h3>Nenhuma reportagem nesta seleção</h3>
                <p>A Banca Paulista ainda não tem cobertura publicada para {state ? BRASIL_UFS.find((item) => item.uf === state)?.nome : region ?? "este recorte"} nesta camada.</p>
                <Link to="/noticias">Ver todas as notícias <ArrowRight className="size-4" aria-hidden /></Link>
              </div>
            )}
            {layerHasStories && layer !== "clima" && displayedStories.length > 0 ? (
              <p className="brazil-atlas-count">{displayedStories.length} {displayedStories.length === 1 ? "conteúdo" : "conteúdos"} neste recorte</p>
            ) : null}
          </aside>
        </div>
        <p className="brazil-atlas-credit">
          Limites estaduais generalizados do IBGE, licenciados em termos compatíveis com CC BY 4.0. A representação não tem finalidade cadastral.
        </p>
      </div>
    </section>
  );
}

function WeatherPanel({
  inScope,
  pending,
  error,
  weather,
}: {
  inScope: boolean;
  pending: boolean;
  error: Error | null;
  weather: ReturnType<typeof useWeather>["data"];
}) {
  if (!inScope) {
    return <div className="brazil-atlas-empty"><CloudSun className="size-7 text-gold" aria-hidden /><h3>Sem observação nesta área</h3><p>A integração meteorológica disponível no portal informa condições para a capital paulista.</p></div>;
  }
  if (pending) return <div className="brazil-atlas-weather-card">Carregando observação meteorológica de São Paulo…</div>;
  if (error || !weather) {
    return <div className="brazil-atlas-empty"><CloudSun className="size-7 text-gold" aria-hidden /><h3>Clima temporariamente indisponível</h3><p>Não foi possível carregar o serviço meteorológico configurado para São Paulo.</p></div>;
  }
  return (
    <div className="brazil-atlas-weather-card">
      <p className="brazil-atlas-weather-location"><MapPinned className="size-4" aria-hidden /> São Paulo · capital</p>
      <div className="brazil-atlas-weather-now"><WeatherIcon kind={weather.kind} className="size-9 text-cyan-200" /><strong>{Math.round(weather.tempC)}°</strong></div>
      <p className="brazil-atlas-weather-condition">{weather.label}</p>
      <p className="brazil-atlas-weather-note">Observação pontual da capital; não representa condições de todo o estado ou do país.</p>
      <a href="/previsao-do-tempo" className="brazil-atlas-read-link">Ver previsão completa <ArrowRight className="size-4" aria-hidden /></a>
      <span className="brazil-atlas-updated">Atualizado: {weather.updatedAt}</span>
    </div>
  );
}
