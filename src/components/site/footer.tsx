import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.avif.asset.json";
import { Container, Hairline } from "./primitives";

const institucional = [
  { to: "/o-escritorio", label: "O escritório" },
  { to: "/paulo-sinigalia", label: "Paulo Sinigalia" },
  { to: "/areas-de-atuacao", label: "Áreas de atuação" },
  { to: "/atendimento-reservado", label: "Atendimento reservado" },
];

const conteudoLinks = [
  { to: "/artigos", label: "Artigos jurídicos" },
  { to: "/delegacias", label: "Regiões de atuação" },
  { to: "/contato", label: "Informações para contato" },
  { to: "/politica-de-privacidade", label: "Política de privacidade" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-graphite">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src={logoAsset.url}
              alt="Paulo Sinigalia — Advocacia e Consultoria Jurídica"
              width={768}
              height={472}
              loading="lazy"
              className="h-14 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Paulo José Sinigalia — advogado inscrito na OAB/SP sob o nº 411.502. Atuação criminal
              e cível estratégica na cidade de São Paulo.
            </p>
          </div>

          <nav aria-label="Institucional">
            <h2 className="eyebrow mb-5">Institucional</h2>
            <ul className="space-y-3 text-sm text-ivory/70">
              {institucional.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Conteúdo e contato">
            <h2 className="eyebrow mb-5">Conteúdo e contato</h2>
            <ul className="space-y-3 text-sm text-ivory/70">
              {conteudoLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Hairline className="my-12" />

        <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
          <p>
            Este site tem caráter meramente informativo, em conformidade com o Código de Ética e
            Disciplina da OAB e com o Provimento nº 205/2021. Não constitui oferta de serviços,
            captação de clientela, consulta jurídica ou promessa de resultado.
          </p>
          <p>
            O escritório não possui vínculo institucional com a Polícia Civil, com o Estado de São
            Paulo, com distritos policiais ou com quaisquer órgãos públicos mencionados neste site.
          </p>
          <p>
            © {new Date().getFullYear()} Paulo José Sinigalia — OAB/SP 411.502. São Paulo, SP.
          </p>
        </div>
      </Container>
    </footer>
  );
}