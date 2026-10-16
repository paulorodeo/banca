import { Link } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Contrast, Menu, Search, X } from "lucide-react";
import { Brand } from "./brand";
import { Container } from "./primitives";
import { cn } from "@/lib/utils";
import { categoriasComInstituicoes } from "@/content/local/orgaos";
import type { PublicInstitution } from "@/content/types";

const navItems = [
  { to: "/", label: "Início" },
  { to: "/artigos", label: "Artigos" },
  { to: "/regioes", label: "Regiões" },
  { to: "/orgaos", label: "Órgãos e Serviços" },
  { to: "/profissionais", label: "Profissionais" },
  { to: "/vagas", label: "Vagas" },
  { to: "/sobre", label: "Sobre" },
] as const;

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader({ institutions }: { institutions: PublicInstitution[] }) {
  const [open, setOpen] = useState(false);
  const [reducedGlare, setReducedGlare] = useState(false);
  const menuId = useId();
  const homeRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const categorias = categoriasComInstituicoes(institutions).filter(
    (categoria) => categoria.instituicoes.length > 0,
  );

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const savedPreference = window.localStorage.getItem("banca-reduced-glare") === "true";
    setReducedGlare(savedPreference);
    document.documentElement.classList.toggle("reduced-glare", savedPreference);
    delete document.documentElement.dataset.contrast;
  }, []);

  const toggleReducedGlare = () => {
    const nextPreference = !reducedGlare;
    setReducedGlare(nextPreference);
    document.documentElement.classList.toggle("reduced-glare", nextPreference);
    window.localStorage.setItem("banca-reduced-glare", String(nextPreference));
  };

  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const panel = panelRef.current;
    const home = homeRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    }, 320);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const first = focusable.at(0);
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (!panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (trigger?.getClientRects().length) trigger.focus();
      else if (panel?.contains(document.activeElement)) home?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-navy text-ivory shadow-[0_12px_40px_-28px_rgba(0,0,0,0.9)]">
      <Container className="flex h-[4.5rem] items-center justify-between gap-5">
        <Link
          ref={homeRef}
          to="/"
          className="shrink-0 rounded-sm"
          aria-label="Banca Paulista — página inicial"
          onClick={() => setOpen(false)}
        >
          <Brand presentation="header" />
        </Link>

        <nav aria-label="Navegação principal" className="hidden h-full items-center gap-5 lg:flex">
          {navItems.map((item) =>
            item.to === "/orgaos" ? (
              <details
                key={item.to}
                className="public-bodies-menu relative"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    event.stopPropagation();
                    event.currentTarget.open = false;
                    event.currentTarget.querySelector("summary")?.focus();
                  }
                }}
              >
                <summary className="shell-link flex cursor-pointer list-none items-center gap-1 py-5 text-[0.68rem] font-medium">
                  Órgãos e Serviços <ChevronDown className="size-3" aria-hidden />
                </summary>
                <div className="absolute left-1/2 top-full w-[min(52rem,calc(100vw-3rem))] -translate-x-1/2 rounded-md border border-white/15 bg-brand-navy p-5 shadow-xl">
                  <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                      Órgãos e Serviços
                    </p>
                    <Link
                      to="/orgaos"
                      onClick={(event) =>
                        event.currentTarget.closest("details")?.removeAttribute("open")
                      }
                      className="text-xs font-semibold text-ivory underline decoration-gold underline-offset-4 hover:text-gold"
                    >
                      Ver índice geral
                    </Link>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-5">
                    {categorias.map((categoria) => (
                      <section key={categoria.id} aria-label={categoria.nome}>
                        <p className="text-xs font-semibold text-gold">{categoria.nome}</p>
                        <ul className="mt-2 space-y-1.5">
                          {categoria.instituicoes.map((institution) => (
                            <li key={institution.id}>
                              <Link
                                to="/instituicoes/$slug"
                                params={{ slug: institution.slug }}
                                onClick={(event) =>
                                  event.currentTarget.closest("details")?.removeAttribute("open")
                                }
                                className="block rounded py-1 text-sm text-ivory/80 hover:text-gold"
                              >
                                {institution.sigla ?? institution.nomeOficial}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                    <section aria-label="Delegacias">
                      <p className="text-xs font-semibold text-gold">Polícia e Investigação</p>
                      <Link
                        to="/delegacias"
                        onClick={(event) =>
                          event.currentTarget.closest("details")?.removeAttribute("open")
                        }
                        className="mt-2 block rounded py-1 text-sm text-ivory/80 hover:text-gold"
                      >
                        Delegacias
                      </Link>
                    </section>
                  </div>
                </div>
              </details>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="shell-link relative inline-flex h-full items-center rounded-sm text-[0.68rem] font-medium hover:text-gold after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-center after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100"
                activeProps={{ className: "shell-link-active after:scale-x-100" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="mailto:vagas@bancapaulista.org"
            className="hidden rounded-sm text-xs font-semibold text-gold underline decoration-gold/50 underline-offset-4 transition-colors hover:text-ivory lg:inline-flex"
          >
            vagas@bancapaulista.org
          </a>
          <button
            type="button"
            onClick={toggleReducedGlare}
            aria-pressed={reducedGlare}
            aria-label={reducedGlare ? "Usar fundo claro" : "Reduzir claridade do fundo"}
            title={reducedGlare ? "Usar fundo claro" : "Reduzir claridade do fundo"}
            className="grid size-8 place-items-center rounded-full text-ivory/55 transition-colors hover:bg-white/5 hover:text-gold"
          >
            <Contrast className="size-3.5" aria-hidden />
          </button>
          <Link
            to="/orgaos"
            aria-label="Consultar órgãos e serviços"
            className="hidden size-10 place-items-center rounded-full text-ivory/85 transition-colors hover:bg-white/5 hover:text-gold md:grid"
          >
            <Search className="size-4.5" aria-hidden />
          </Link>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-11 place-items-center rounded-md border border-white/15 text-ivory transition-colors hover:border-gold/60 hover:text-gold lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Container>

      <div
        className={cn(
          "fixed inset-0 top-[4.5rem] z-40 bg-brand-navy/60 backdrop-blur-sm transition-opacity duration-200 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <div
        ref={panelRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu principal"
        aria-hidden={!open}
        className={cn(
          "fixed inset-x-0 top-[4.5rem] z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 bg-brand-navy shadow-2xl transition-[opacity,transform,visibility] duration-300 lg:hidden",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-3 opacity-0 pointer-events-none",
        )}
      >
        <Container className="py-5">
          <nav aria-label="Navegação mobile">
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {navItems.map((item, index) => (
                <li key={item.to}>
                  {item.to === "/orgaos" ? (
                    <details className="py-4">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-base text-ivory/80 hover:text-gold">
                        <span className="flex items-center gap-4">
                          <span className="w-5 text-[0.6rem] font-semibold tracking-[0.12em] text-gold/65">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {item.label}
                        </span>
                        <ChevronDown className="size-4" aria-hidden />
                      </summary>
                      <div className="mt-4 space-y-4 pl-9">
                        {categorias.map((categoria) => (
                          <section key={categoria.id}>
                            <p className="text-xs font-semibold text-gold">{categoria.nome}</p>
                            <ul className="mt-2 space-y-2">
                              {categoria.instituicoes.map((institution) => (
                                <li key={institution.id}>
                                  <Link
                                    to="/instituicoes/$slug"
                                    params={{ slug: institution.slug }}
                                    tabIndex={open ? 0 : -1}
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-ivory/75 hover:text-gold"
                                  >
                                    {institution.sigla ?? institution.nomeOficial}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </section>
                        ))}
                        <Link
                          to="/delegacias"
                          tabIndex={open ? 0 : -1}
                          onClick={() => setOpen(false)}
                          className="block text-sm text-ivory/75 hover:text-gold"
                        >
                          Delegacias
                        </Link>
                        <Link
                          to="/orgaos"
                          tabIndex={open ? 0 : -1}
                          onClick={() => setOpen(false)}
                          className="block text-sm font-semibold text-ivory underline decoration-gold underline-offset-4 hover:text-gold"
                        >
                          Ver índice geral
                        </Link>
                      </div>
                    </details>
                  ) : (
                    <Link
                      to={item.to}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-sm py-4 text-base text-ivory/80 transition-colors hover:text-gold"
                      activeProps={{ className: "text-gold" }}
                    >
                      <span className="flex items-center gap-4">
                        <span className="w-5 text-[0.6rem] font-semibold tracking-[0.12em] text-gold/65">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </span>
                      <ArrowUpRight
                        className="size-4 opacity-55 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <Link
            to="/contato"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-gold px-5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-navy transition-colors hover:bg-gold-light"
          >
            Contato editorial
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
          <p className="mt-5 text-center text-xs leading-relaxed text-ivory/50">
            Portal editorial independente · São Paulo
          </p>
        </Container>
      </div>
    </header>
  );
}
