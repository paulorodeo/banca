import { Building2, ExternalLink, MapPin } from "lucide-react";
import type { PublicInstitution } from "@/content/types";
import { AdPlaceholder } from "./ad-placeholder";
import { type Crumb } from "./breadcrumbs";
import { PageHero } from "./blocks";
import { Container, Section } from "./primitives";
import { ProfessionalSidebar } from "./territory";

const categoryLabels: Record<PublicInstitution["categoria"], string> = {
  "ministerio-publico": "Ministério Público",
  "policia-civil-especializada": "Polícia Civil e unidades especializadas",
  "defensoria-publica": "Defensoria Pública",
  "foruns-tribunais": "Fóruns e Tribunais",
  "direitos-humanos-protecao": "Direitos Humanos e proteção de direitos",
  "servicos-registrais-administrativos": "Serviços registrais e administrativos",
};

const typeLabels: Record<PublicInstitution["tipo"], string> = {
  orgao: "Órgão público",
  departamento: "Departamento",
  "unidade-atendimento": "Unidade de atendimento",
};

/** Shared page template. Render only for a repository record approved for publication. */
export function PublicInstitutionPage({
  institution,
  crumbs,
}: {
  institution: PublicInstitution;
  crumbs: Crumb[];
}) {
  const territorialContext = institution.relacoesTerritoriais
    .map((relation) => relation.descricao)
    .filter((description): description is string => Boolean(description?.trim()))
    .join(" · ");

  return (
    <>
      <PageHero
        eyebrow={categoryLabels[institution.categoria]}
        title={institution.nomeOficial}
        lead={institution.descricao}
        crumbs={crumbs}
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          <article className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
              {typeLabels[institution.tipo]}
              {institution.sigla ? ` · ${institution.sigla}` : ""}
            </p>

            {(institution.contatos?.length || institution.endereco) && (
              <section className="mt-8" aria-labelledby="institution-data-title">
                <h2 id="institution-data-title" className="font-serif text-2xl text-brand-navy">
                  Informações da instituição
                </h2>
                {institution.endereco && (
                  <p className="mt-4 flex gap-2 text-sm leading-6 text-brand-navy/80">
                    <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                    <span>{institution.endereco.texto}</span>
                  </p>
                )}
                {institution.contatos?.length ? (
                  <ul className="mt-4 space-y-3">
                    {institution.contatos.map((contact, index) => (
                      <li key={`${contact.tipo}-${contact.rotulo}-${index}`} className="text-sm">
                        <span className="font-semibold text-brand-navy">{contact.rotulo}: </span>
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="text-brand-navy underline decoration-gold underline-offset-4"
                            rel={contact.tipo === "site" ? "noreferrer" : undefined}
                          >
                            {contact.valor}
                          </a>
                        ) : (
                          <span className="text-brand-navy/80">{contact.valor}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            )}

            {institution.fontes.length > 0 && (
              <section
                className="mt-10 border-t border-brand-navy/15 pt-6"
                aria-labelledby="institution-sources-title"
              >
                <h2 id="institution-sources-title" className="font-serif text-xl text-brand-navy">
                  Fontes e referências
                </h2>
                <ul className="mt-4 space-y-3">
                  {institution.fontes.map((source) => (
                    <li key={`${source.url}-${source.titulo}`}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-brand-navy underline decoration-gold underline-offset-4"
                      >
                        {source.titulo} <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                      {source.publicadaEm ? (
                        <span className="ml-2 text-xs text-muted-foreground">
                          Publicada em {source.publicadaEm}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {institution.relacoesTerritoriais.length > 0 && (
              <section
                className="mt-10 border-t border-brand-navy/15 pt-6"
                aria-labelledby="institution-territory-title"
              >
                <h2 id="institution-territory-title" className="font-serif text-xl text-brand-navy">
                  Relações territoriais
                </h2>
                <ul className="mt-4 space-y-3">
                  {institution.relacoesTerritoriais.map((relation) => (
                    <li
                      key={`${relation.tipoTerritorio}-${relation.slugTerritorio}-${relation.relacao}`}
                      className="text-sm leading-6 text-brand-navy/80"
                    >
                      <span className="font-semibold">
                        {relation.relacao === "localizada" ? "Localizada em" : "Relacionada a"}:
                      </span>{" "}
                      {relation.descricao ?? relation.slugTerritorio}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <aside className="min-w-0 space-y-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-gold/15 text-gold">
                  <Building2 className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-serif text-lg text-brand-navy">Dados institucionais</h2>
                  <p className="text-xs text-muted-foreground">
                    {categoryLabels[institution.categoria]}
                  </p>
                </div>
              </div>
              {institution.sigla ? (
                <p className="mt-4 text-sm text-brand-navy/80">Sigla: {institution.sigla}</p>
              ) : null}
              <p className="mt-2 text-xs text-muted-foreground">
                As informações deste guia são editoriais. Consulte as fontes oficiais para confirmar
                serviços e atribuições.
              </p>
            </div>
            <ProfessionalSidebar neighborhoodName={territorialContext || institution.nomeOficial} />
            <AdPlaceholder />
          </aside>
        </Container>
      </Section>
    </>
  );
}
