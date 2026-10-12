import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.avif.asset.json";
import { Container } from "./primitives";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/o-escritorio", label: "O escritório" },
  { to: "/paulo-sinigalia", label: "Paulo Sinigalia" },
  { to: "/areas-de-atuacao", label: "Áreas de atuação" },
  { to: "/regioes", label: "Regiões" },
  { to: "/artigos", label: "Artigos" },
  { to: "/atendimento-reservado", label: "Atendimento" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center" aria-label="Paulo Sinigalia — página inicial">
          <img
            src={logoAsset.url}
            alt="Paulo Sinigalia — Advocacia e Consultoria Jurídica"
            width={768}
            height={472}
            className="h-11 w-auto md:h-12"
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.78rem] uppercase tracking-[0.14em] text-ivory/70 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contato"
            className="hidden rounded-xs border border-gold/45 px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-gold transition-colors hover:border-gold hover:bg-gold/8 md:inline-flex"
          >
            Informações para contato
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="text-ivory/80 transition-colors hover:text-gold lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </Container>

      <div
        id="menu-mobile"
        className={cn(
          "overflow-hidden border-t border-border/70 bg-graphite transition-[max-height] duration-500 lg:hidden",
          open ? "max-h-[32rem]" : "max-h-0 border-t-0",
        )}
      >
        <Container className="flex flex-col py-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 py-4 text-sm uppercase tracking-[0.14em] text-ivory/75"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contato"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex justify-center rounded-xs bg-gold px-5 py-3 text-[0.75rem] uppercase tracking-[0.16em] text-primary-foreground"
          >
            Informações para contato
          </Link>
        </Container>
      </div>
    </header>
  );
}