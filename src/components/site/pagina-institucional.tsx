import type { PaginaInstitucional } from "@/content/types";
import { Container, Hairline, Section } from "./primitives";
import { PageHero, CtaReservado } from "./blocks";
import type { Crumb } from "./breadcrumbs";

export function PaginaInstitucionalView({
  pagina,
  eyebrow,
  crumbs,
  aside,
}: {
  pagina: PaginaInstitucional;
  eyebrow: string;
  crumbs: Crumb[];
  aside?: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={pagina.titulo} lead={pagina.subtitulo} crumbs={crumbs} />
      <Section>
        <Container>
          <div className={aside ? "grid gap-16 lg:grid-cols-[1.5fr_0.9fr]" : "max-w-3xl"}>
            <div className="space-y-14">
              {pagina.blocos.map((bloco) => (
                <article key={bloco.titulo}>
                  <h2 className="text-2xl text-ivory md:text-3xl">{bloco.titulo}</h2>
                  <Hairline className="my-6 max-w-16" />
                  <div className="space-y-4">
                    {bloco.paragrafos.map((paragrafo) => (
                      <p key={paragrafo} className="text-base leading-relaxed text-muted-foreground">
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            {aside ? <aside className="lg:pt-2">{aside}</aside> : null}
          </div>
        </Container>
      </Section>
      <CtaReservado />
    </>
  );
}