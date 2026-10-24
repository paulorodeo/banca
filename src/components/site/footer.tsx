import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Container } from "./primitives";
import { Brand } from "./brand";

const footerLinks = [
  { to: "/", label: "Início" },
  { to: "/regioes", label: "Regiões e Bairros" },
  { to: "/delegacias", label: "Delegacias" },
  { to: "/noticias", label: "Notícias" },
  { to: "/artigos", label: "Artigos" },
  { to: "/profissionais", label: "Profissionais" },
  { to: "/radio", label: "Rádio" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/25 bg-brand-navy text-ivory">
      <Container>
        <div className="grid gap-7 py-5 md:grid-cols-[auto_1fr_auto] md:items-center">
          <Link
            to="/"
            className="inline-flex justify-self-start rounded-sm"
            aria-label="Banca Paulista — início"
          >
            <Brand size="compact" />
          </Link>

          <nav aria-label="Navegação do rodapé" className="md:justify-self-center">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[0.68rem] text-ivory/65">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="rounded-sm transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="flex items-center gap-2 text-[0.62rem] leading-4 text-ivory/55 md:max-w-32">
            <MapPin className="size-3.5 shrink-0 text-gold" aria-hidden />
            São Paulo · Capital
            <br />
            Conteúdo Jurídico
          </p>
        </div>

        <div className="grid min-w-0 gap-4 border-t border-white/10 py-4 text-xs leading-5 text-ivory/65 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-6 md:py-3 md:text-[0.64rem] md:leading-4 md:text-ivory/50">
          <p className="order-3 min-w-0 text-center md:order-1 md:text-left">
            © {new Date().getFullYear()} Banca Paulista · Portal editorial independente de
            informação jurídica e territorial. Conteúdo informativo não substitui orientação
            profissional.
          </p>
          <a
            href="https://www.topleo.workers.dev/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Site desenvolvido pela TopLeo Workers (abre em nova aba)"
            className="order-2 mx-auto inline-flex rounded-sm opacity-85 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:order-2"
          >
            <img
              src="/brand/topleo-workers.webp"
              alt="TopLeo Workers"
              width="120"
              height="56"
              loading="lazy"
              className="h-auto w-[112px]"
            />
          </a>
          <div className="order-1 flex min-w-0 flex-wrap items-center justify-center gap-x-5 gap-y-2 md:order-3 md:justify-end">
            <Link to="/privacidade" className="rounded-sm transition-colors hover:text-gold">
              Privacidade e Cookies
            </Link>
            <Link to="/termos-de-uso" className="rounded-sm transition-colors hover:text-gold">
              Termos de Uso
            </Link>
            <Link
              to="/integridade-e-etica"
              className="rounded-sm transition-colors hover:text-gold"
            >
              Integridade e Ética
            </Link>
            <Link to="/contato" className="rounded-sm transition-colors hover:text-gold">
              Contato Editorial
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
