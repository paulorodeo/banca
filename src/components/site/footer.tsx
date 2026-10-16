import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Container } from "./primitives";
import { Brand } from "./brand";

const footerLinks = [
  { to: "/", label: "Início" },
  { to: "/regioes", label: "Regiões e Bairros" },
  { to: "/delegacias", label: "Delegacias" },
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

        <div className="grid gap-4 border-t border-white/10 py-3 text-[0.58rem] leading-4 text-ivory/45 md:grid-cols-[1fr_auto] md:items-center">
          <p>
            © {new Date().getFullYear()} Banca Paulista · Portal editorial independente de
            informação jurídica e territorial. Conteúdo informativo não substitui orientação
            profissional.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
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
