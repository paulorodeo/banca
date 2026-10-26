import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, House, Rss, Search } from "lucide-react";
import { Brand } from "@/components/site/brand";
import { Container } from "@/components/site/primitives";
import { WeatherTicker } from "@/components/site/weather-ticker";

const portalLinks = [
  { to: "/", label: "Início" },
  { to: "/profissionais", label: "Profissionais" },
  { to: "/vagas", label: "Vagas" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
] as const;

const regionLinks = [
  { to: "/regioes/centro", label: "Centro" },
  { to: "/regioes/zona-sul", label: "Zona Sul" },
  { to: "/regioes/zona-oeste", label: "Zona Oeste" },
  { to: "/regioes/zona-leste", label: "Zona Leste" },
  { to: "/regioes/zona-norte", label: "Zona Norte" },
] as const;

/** Masthead compartilhado entre o índice jornalístico e as reportagens. */
export function NewsEditorialHeader() {
  const isRegionActive = useRouterState({
    select: (state) =>
      state.location.pathname.startsWith("/regioes/") ||
      state.location.pathname.startsWith("/noticias/regioes/"),
  });
  const navBaseClass =
    "inline-flex min-h-12 items-center border-b-2 border-transparent px-2 py-2 text-[0.8rem] font-semibold text-ivory/90 transition-colors hover:border-gold/70 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold";
  const navActiveClass =
    "inline-flex min-h-12 items-center border-b-2 border-gold px-2 py-2 text-[0.8rem] font-semibold text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold";

  return (
    <header className="w-full">
      <div className="border-b border-white/10 bg-brand-navy text-ivory">
        <Container className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1 py-1.5">
          <nav aria-label="Navegação do portal">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-ivory/85 sm:gap-x-5">
              {portalLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="rounded-sm transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <WeatherTicker />
        </Container>
      </div>
      <div className="border-b border-brand-navy/10 bg-white">
        <Container className="flex min-h-28 flex-wrap items-center justify-between gap-4 py-4 md:min-h-32 md:gap-6">
          <Link to="/noticias" aria-label="Banca Paulista — Notícias" className="rounded-sm">
            <Brand scheme="light" size="large" />
          </Link>
          <Link
            to="/orgaos"
            aria-label="Consultar órgãos e serviços"
            className="inline-flex min-h-11 items-center gap-2 border border-brand-navy/20 bg-white px-3 text-xs font-bold text-brand-navy transition-colors hover:border-gold hover:bg-[#f8f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-4"
          >
            <Search className="size-4 text-gold" aria-hidden />
            <span>Consultar órgãos e serviços</span>
          </Link>
        </Container>
      </div>
      <nav
        className="relative z-20 border-b-2 border-gold/70 bg-brand-navy text-ivory shadow-[0_8px_18px_-16px_rgba(6,30,48,0.8)]"
        aria-label="Navegação de Notícias"
      >
        <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 py-1 sm:justify-start sm:gap-x-4 xl:min-h-12 xl:flex-nowrap xl:justify-between xl:gap-x-3 xl:py-0">
          <Link
            to="/"
            aria-label="Página inicial"
            className="rounded-sm text-ivory/90 hover:text-gold"
          >
            <House className="size-[1.05rem]" aria-hidden />
          </Link>
          <Link to="/noticias" className={navBaseClass} activeProps={{ className: navActiveClass }}>
            Notícias
          </Link>
          <Link to="/noticias/brasil" className="inline-flex min-h-12 items-center border-b-2 border-transparent px-2 py-2 text-[0.8rem] font-semibold text-ivory/90 hover:border-gold/70 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold">
            Brasil
          </Link>
          <Link to="/artigos" className={navBaseClass} activeProps={{ className: navActiveClass }}>
            Artigos
          </Link>
          <Link to="/previsao-do-tempo" className={navBaseClass} activeProps={{ className: navActiveClass }}>
            Previsão do Tempo
          </Link>
          <Link to="/radio" className={navBaseClass} activeProps={{ className: navActiveClass }}>
            Rádio
          </Link>
          <Link to="/delegacias" className={navBaseClass} activeProps={{ className: navActiveClass }}>
            Delegacias
          </Link>
          <Link to="/orgaos" className={navBaseClass} activeProps={{ className: navActiveClass }}>
            Órgãos e Serviços
          </Link>
          <details
            className="group relative"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.preventDefault();
                event.currentTarget.open = false;
                event.currentTarget.querySelector("summary")?.focus();
              }
            }}
          >
            <summary
              className={`flex min-h-12 cursor-pointer list-none items-center gap-1 border-b-2 px-2 py-2 text-[0.8rem] font-semibold transition-colors hover:border-gold/70 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold ${isRegionActive ? "border-gold text-gold" : "border-transparent text-ivory/90"}`}
            >
              Regiões
              <ChevronDown
                className="size-3 transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="absolute right-0 top-full z-30 mt-0.5 grid min-w-48 gap-1 border border-gold/30 bg-brand-navy p-2 shadow-xl">
              {regionLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-sm px-3 py-2.5 text-sm font-semibold text-ivory/90 transition-colors hover:bg-white/5 hover:text-gold focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
          <a
            href="/rss.xml"
            aria-label="Assinar feed RSS das notícias da Banca Paulista"
            title="Feed RSS das notícias"
            className="ml-auto inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-sm border-l border-white/20 px-3 text-gold transition-colors hover:bg-white/5 hover:text-[#cca260] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold xl:ml-0"
          >
            <Rss className="size-[1.05rem]" aria-hidden />
            <span className="hidden text-xs font-bold tracking-wide xl:inline">RSS</span>
          </a>
        </Container>
      </nav>
    </header>
  );
}
