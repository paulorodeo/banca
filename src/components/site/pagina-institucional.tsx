import type { PaginaInstitucional } from "@/content/types";
import { Container, Hairline, Section } from "./primitives";
import { PageHero, CtaReservado } from "./blocks";
import type { Crumb } from "./breadcrumbs";

export function PaginaInstitucionalView({
  pagina,
  eyebrow,
  crumbs,
  aside,
  showReservedCta = true,
}: {
  pagina: PaginaInstitucional;
  eyebrow: string;
  crumbs: Crumb[];
  aside?: React.ReactNode;
  showReservedCta?: boolean;
}) {
  return (
    <div className="home-light editorial-page">
      <PageHero eyebrow={eyebrow} title={pagina.titulo} lead={pagina.subtitulo} crumbs={crumbs} />
      <Section>
        <Container>
          <div className={aside ? "mx-auto max-w-6xl" : "mx-auto max-w-4xl"}>
            {pagina.indice?.length ? (
              <nav
                aria-label="Nesta página"
                className="surface-panel mb-12 rounded-lg border border-border p-6 md:p-8"
              >
                <h2 className="font-serif text-xl text-brand-navy">Nesta página</h2>
                <ol className="mt-4 max-h-72 overflow-y-auto pr-2 text-sm sm:grid sm:max-h-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2 sm:overflow-visible">
                  {pagina.indice.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="rounded-sm text-brand-navy underline decoration-brand-gold/70 underline-offset-4 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                      >
                        {item.rotulo}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
            <div
              className={
                aside ? "grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.9fr)]" : ""
              }
            >
              <div className="max-w-[53rem]">
                {pagina.introducao?.length ? (
                  <div className="mb-14 space-y-4">
                    {pagina.introducao.map((paragrafo) => (
                      <p
                        key={paragrafo}
                        className="text-base leading-relaxed text-muted-foreground"
                      >
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                ) : null}
                <div className="space-y-14">
                  {pagina.blocos.map((bloco, index) => (
                    <article key={bloco.titulo}>
                      <h2
                        id={pagina.indice?.[index]?.id}
                        className="scroll-mt-28 text-2xl text-ivory md:text-3xl"
                      >
                        {bloco.titulo}
                      </h2>
                      <Hairline className="my-6 max-w-16" />
                      <div className="space-y-4">
                        {bloco.paragrafos.map((paragrafo) => (
                          <p
                            key={paragrafo}
                            className="text-base leading-relaxed text-muted-foreground"
                          >
                            {paragrafo}
                          </p>
                        ))}
                        {bloco.lista?.length ? (
                          <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
                            {bloco.lista.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        {bloco.complemento?.map((paragrafo) => (
                          <p
                            key={paragrafo}
                            className="text-base leading-relaxed text-muted-foreground"
                          >
                            {paragrafo}
                          </p>
                        ))}
                        {bloco.subsecoes?.map((subsecao, subIndex) => (
                          <section key={subsecao.titulo} className="mt-7 space-y-3">
                            <h3
                              id={`${pagina.indice?.[index]?.id}-${subIndex + 1}`}
                              className="scroll-mt-28 text-lg font-semibold text-brand-navy md:text-xl"
                            >
                              {subsecao.titulo}
                            </h3>
                            {subsecao.paragrafos.map((paragrafo) => (
                              <p
                                key={paragrafo}
                                className="text-base leading-relaxed text-muted-foreground"
                              >
                                {paragrafo}
                              </p>
                            ))}
                            {subsecao.lista?.length ? (
                              <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground">
                                {subsecao.lista.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            ) : null}
                            {subsecao.complemento?.map((paragrafo) => (
                              <p
                                key={paragrafo}
                                className="text-base leading-relaxed text-muted-foreground"
                              >
                                {paragrafo}
                              </p>
                            ))}
                          </section>
                        ))}
                      </div>
                      {bloco.links?.length ? (
                        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                          {bloco.links.map((link) => (
                            <li key={link.href}>
                              <a
                                href={link.href}
                                className="rounded-sm font-medium text-brand-navy underline decoration-brand-gold underline-offset-4 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                              >
                                {link.rotulo}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  ))}
                  {pagina.linksRelacionados?.length ? (
                    <nav aria-label="Páginas institucionais relacionadas">
                      <h2 className="text-xl text-brand-navy">
                        Documentos institucionais relacionados
                      </h2>
                      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                        {pagina.linksRelacionados.map((link) => (
                          <li key={link.href}>
                            <a
                              href={link.href}
                              className="rounded-sm font-medium text-brand-navy underline decoration-brand-gold underline-offset-4 hover:text-brand-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-navy"
                            >
                              {link.rotulo}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  ) : null}
                  {pagina.notaFinal?.length ? (
                    <div className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">
                      {pagina.notaFinal.map((paragrafo) => (
                        <p key={paragrafo}>{paragrafo}</p>
                      ))}
                    </div>
                  ) : null}
                  {pagina.atualizadoEm ? (
                    <p className="border-t border-border pt-5 text-sm text-muted-foreground">
                      Última atualização: {pagina.atualizadoEm}
                    </p>
                  ) : null}
                </div>
              </div>
              {aside ? <aside className="lg:pt-2">{aside}</aside> : null}
            </div>
          </div>
        </Container>
      </Section>
      {showReservedCta ? <CtaReservado /> : null}
    </div>
  );
}
