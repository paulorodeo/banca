import { Link } from "@tanstack/react-router";
import { Container, Hairline } from "./primitives";
import { Brand } from "./brand";
import { marca } from "@/content/local/settings";

export function SiteFooter() {
  return <footer className="border-t border-border bg-graphite">
    <Container className="py-16">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div><Link to="/" aria-label="Banca Paulista — início"><Brand /></Link>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">{marca.completo}. Portal editorial e territorial independente sobre defesa criminal e delegacias de São Paulo.</p>
        </div>
        <nav aria-label="Portal"><h2 className="eyebrow mb-5">Portal</h2><ul className="space-y-3 text-sm text-muted-foreground">
          <li><Link to="/sobre">Sobre a Banca Paulista</Link></li>
          <li><Link to="/profissionais">Profissionais</Link></li>
          <li><Link to="/plantao-criminal">Plantão criminal: informação</Link></li>
          <li><Link to="/areas-de-atuacao">Temas jurídicos</Link></li>
        </ul></nav>
        <nav aria-label="Conteúdo e contato"><h2 className="eyebrow mb-5">Conteúdo e contato</h2><ul className="space-y-3 text-sm text-muted-foreground">
          <li><Link to="/delegacias">Guia de delegacias</Link></li>
          <li><Link to="/regioes">Regiões de São Paulo</Link></li>
          <li><Link to="/artigos">Artigos</Link></li>
          <li><Link to="/contato">Contato editorial</Link></li>
          <li><Link to="/politica-de-privacidade">Política de privacidade</Link></li>
        </ul></nav>
      </div>
      <Hairline className="my-10" />
      <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
        <p>O portal está em fase editorial. Ainda não há profissionais participantes publicados. Não constitui escritório de advocacia ou sociedade de advogados e não presta consulta jurídica, recebe casos ou oferece atendimento 24 horas.</p>
        <p>Não há vínculo com a Polícia Civil, distritos policiais, tribunais ou órgãos públicos. Conteúdo informativo não substitui orientação profissional. A cobertura territorial não representa presença física ou disponibilidade de advogado.</p>
        <p>© {new Date().getFullYear()} {marca.curto} · São Paulo, SP.</p>
      </div>
    </Container>
  </footer>;
}
