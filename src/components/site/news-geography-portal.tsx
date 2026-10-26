import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, MapPinned, Newspaper } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { BrazilEditorialAtlas } from "@/components/site/brazil-editorial-atlas";
import { NewsImage } from "@/components/site/news-image";
import { BRASIL_UFS, BRASIL_VIEWBOX } from "@/content/local/brasil-ufs";
import type { AtlasEditorialItem } from "@/content/atlas.functions";
import { ExternalNewsSection } from "./external-news-section";

const REGION_CODE: Record<string, string> = {
  Norte: "N",
  Nordeste: "NE",
  "Centro-Oeste": "CO",
  Sudeste: "SE",
  Sul: "S",
};

export type NewsGeographyPortalProps = {
  title: string;
  description: string;
  level: "Brasil" | "Região" | "Estado";
  selectedStates: string[];
  availableRegions: { slug: string; nome: string }[];
  availableStates: { uf: string; nome: string; region: string }[];
  stories: AtlasEditorialItem[];
  isDemo: boolean;
  capital?: string;
};

export function NewsGeographyPortal(props: NewsGeographyPortalProps) {
  const [editoria, setEditoria] = useState<string | null>(null);
  const categorizedStories = useMemo(() => {
    const inCategory = props.stories.filter(
      (item) => !editoria || item.categoria === editoria,
    );
    return [...inCategory].sort((a, b) => (b.publicadoEm ?? "").localeCompare(a.publicadoEm ?? ""));
  }, [editoria, props.stories]);
  const [lead, ...secondary] = categorizedStories;
  const latest = categorizedStories.slice(4);
  const categories = Array.from(new Set(props.stories.map((item) => item.categoria))).sort(
    (a, b) => a.localeCompare(b, "pt-BR"),
  );
  const mapStates = BRASIL_UFS;
  const selectedSet = new Set(props.selectedStates);
  const availableStateSet = new Set(props.availableStates.map((item) => item.uf));

  return (
    <main className="news-geography-page">
      <Container>
        <nav className="news-geography-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Início</Link><ChevronRight aria-hidden />
          <Link to="/noticias/brasil">Brasil</Link>
          {props.level !== "Brasil" ? <><ChevronRight aria-hidden /><span>{props.level === "Região" ? props.title : props.availableStates.find((item) => item.uf === props.selectedStates[0])?.region}</span></> : null}
          {props.level === "Estado" ? <><ChevronRight aria-hidden /><span>{props.title}</span></> : null}
        </nav>

        {props.isDemo ? (
          <div className="news-geography-demo-notice" role="status">
            Conteúdo demonstrativo — manchetes e resumos fictícios para validação da navegação; não descrevem fatos reais nem reportagens publicadas.
          </div>
        ) : null}

        <header className="news-geography-header">
          <div>
            <p className="news-geography-eyebrow">Banca Paulista · Edição {props.level.toLowerCase()}</p>
            <h1>{props.level === "Brasil" ? "Notícias do Brasil" : props.level === "Região" ? `Notícias do ${props.title}` : `Notícias de ${props.title}`}</h1>
            <p>{props.description}</p>
            {props.capital ? <span className="news-geography-capital">Capital: {props.capital}</span> : null}
          </div>
          <Link to="/noticias" className="news-geography-backlink">Capa de Notícias <ArrowRight aria-hidden /></Link>
        </header>

      </Container>

      {props.level === "Brasil" ? (
        <BrazilEditorialAtlas stories={props.stories} variant="portal" />
      ) : null}

      <ExternalNewsSection
        title={
          props.level === "Brasil"
            ? "Fontes nacionais"
            : props.level === "Região"
              ? `Fontes do ${props.title}`
              : `Fontes sobre ${props.title}`
        }
        query={{
          ...(props.level === "Estado" ? { stateCode: props.selectedStates[0] } : {}),
          ...(props.level === "Região" ? { regionCode: REGION_CODE[props.title] } : {}),
          limit: 6,
        }}
      />

      <Container>

        {props.level !== "Brasil" ? <div className="news-geography-map-row">
          <div className="news-geography-map-card">
            <div className="news-geography-map-head">
              <div><p>Brasil em foco</p><h2>{props.title}</h2></div>
              <MapPinned aria-hidden />
            </div>
            <svg className="news-geography-map" viewBox={BRASIL_VIEWBOX} role="group" aria-label={`Mapa do Brasil com destaque para ${props.title}`}>
              {mapStates.map((item) => {
                const available = availableStateSet.has(item.uf);
                const selected = selectedSet.has(item.uf);
                return (
                  <g key={item.uf}>
                    {available ? (
                      <Link
                        to="/noticias/estados/$uf"
                        params={{ uf: item.uf.toLowerCase() }}
                        aria-label={`Abrir portal de notícias de ${item.nome}`}
                        className={`news-geography-map-link ${selected ? "is-selected" : ""}`}
                      >
                        <path d={item.d} className="news-geography-map-state" />
                      </Link>
                    ) : (
                      <path d={item.d} className={`news-geography-map-state ${selected ? "is-selected" : ""}`} />
                    )}
                    {item.label ? (
                      <text x={item.label[0]} y={item.label[1]} aria-hidden="true">
                        {item.uf}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>
            <p className="news-geography-map-help">Estados com cobertura disponível podem ser abertos diretamente pelo mapa.</p>
          </div>

          <div className="news-geography-headlines">
            {lead ? (
              <article className="news-geography-lead">
                <div className="news-geography-lead-copy">
                  {lead.isDemo ? <span className="news-geography-demo-tag">Conteúdo demonstrativo</span> : null}
                  <p className="news-geography-category">{lead.categoria}</p>
                  <h2>{lead.titulo}</h2>
                  <p>{lead.resumo}</p>
                  {lead.slug ? <Link to="/noticias/$slug" params={{ slug: lead.slug }}>Ler reportagem <ArrowRight aria-hidden /></Link> : null}
                </div>
                <div className="news-geography-lead-image"><NewsImage {...(lead.imagem ? { image: lead.imagem } : {})} loading="eager" fetchPriority="high" /></div>
              </article>
            ) : (
              <div className="news-geography-empty"><Newspaper aria-hidden /><h2>Sem reportagens disponíveis</h2><p>Este recorte ainda não possui cobertura publicada.</p></div>
            )}
            {secondary.length ? (
              <div className="news-geography-secondary">
                {secondary.slice(0, 3).map((item) => (
                  <article key={item.id}>
                    <div className="news-geography-secondary-image"><NewsImage {...(item.imagem ? { image: item.imagem } : {})} /></div>
                    <div>
                      {item.isDemo ? <span className="news-geography-demo-tag">Demonstrativa</span> : null}
                      <p>{item.categoria}</p>
                      <h3>{item.slug ? <Link to="/noticias/$slug" params={{ slug: item.slug }}>{item.titulo}</Link> : item.titulo}</h3>
                      <span>{item.resumo}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </div> : null}

        <section className="news-geography-latest" aria-labelledby="news-geography-latest-title">
          <div className="news-geography-section-heading">
            <div><p className="news-geography-eyebrow">Acompanhe a cobertura</p><h2 id="news-geography-latest-title">Últimas notícias {props.level === "Brasil" ? "do Brasil" : `de ${props.title}`}</h2></div>
          </div>
          <nav className="news-geography-categories" aria-label="Filtrar notícias por editoria">
            <button type="button" aria-pressed={editoria === null} className={editoria === null ? "is-active" : ""} onClick={() => setEditoria(null)}>Todas</button>
            {categories.map((category) => (
              <button key={category} type="button" aria-pressed={editoria === category} className={editoria === category ? "is-active" : ""} onClick={() => setEditoria(category)}>
                {category}
              </button>
            ))}
          </nav>
          {latest.length ? (
            <div className="news-geography-list">
              {latest.map((item) => (
                <article key={item.id}>
                  <div className="news-geography-list-image"><NewsImage {...(item.imagem ? { image: item.imagem } : {})} /></div>
                  <div>
                    {item.isDemo ? <span className="news-geography-demo-tag">Conteúdo demonstrativo</span> : null}
                    <p className="news-geography-category">{item.categoria}</p>
                    <h3>{item.slug ? <Link to="/noticias/$slug" params={{ slug: item.slug }}>{item.titulo}</Link> : item.titulo}</h3>
                    <p>{item.resumo}</p>
                    {item.publicadoEm && !item.isDemo ? <time dateTime={item.publicadoEm}>{new Date(`${item.publicadoEm}T00:00:00Z`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time> : null}
                  </div>
                </article>
              ))}
            </div>
          ) : <p className="news-geography-empty-category">{categorizedStories.length ? "As notícias deste recorte estão apresentadas nos destaques acima." : "Nenhuma notícia desta editoria neste recorte."}</p>}
        </section>

        <nav className="news-geography-navigation" aria-label="Navegação geográfica">
          <div>
            <h2>{props.level === "Brasil" ? "Portais regionais" : props.level === "Região" ? "Estados da região" : "Outros estados da região"}</h2>
            <ul>
              {props.level === "Brasil" ? props.availableRegions.map((item) => (
                <li key={item.slug}><Link to="/noticias/regioes/$slug" params={{ slug: item.slug }}>{item.nome} <ArrowRight aria-hidden /></Link></li>
              )) : null}
              {props.level === "Região" ? props.availableStates.filter((item) => item.region === props.title).map((item) => (
                <li key={item.uf}><Link to="/noticias/estados/$uf" params={{ uf: item.uf.toLowerCase() }}>{item.nome} <ArrowRight aria-hidden /></Link></li>
              )) : null}
              {props.level === "Estado" ? props.availableStates.filter((item) => item.region === (props.availableStates.find((entry) => entry.uf === props.selectedStates[0])?.region ?? "") && !selectedSet.has(item.uf)).map((item) => (
                <li key={item.uf}><Link to="/noticias/estados/$uf" params={{ uf: item.uf.toLowerCase() }}>{item.nome} <ArrowRight aria-hidden /></Link></li>
              )) : null}
            </ul>
          </div>
          {props.level === "Estado" ? <p>As edições municipais serão abertas quando houver cobertura editorial própria; não há páginas de cidades vazias.</p> : null}
        </nav>
      </Container>
    </main>
  );
}
