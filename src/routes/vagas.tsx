import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, ExternalLink } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { BancaEditorialBanner } from "@/components/site/banca-editorial-banner";
import { TerritoryHero } from "@/components/site/territory";
import { vagasPublicadas } from "@/content/local/vagas";
import { canonicalLink, pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/vagas")({
  head: () => ({
    meta: [
      ...pageMeta({
        title: "Vagas | Banca Paulista",
        description: "Oportunidades verificadas publicadas pela Banca Paulista.",
        path: "/vagas",
      }),
      ...(vagasPublicadas.length === 0 ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: canonicalLink("/vagas"),
  }),
  component: VagasPage,
});

function VagasPage() {
  return (
    <main className="home-light">
      <TerritoryHero
        eyebrow="Oportunidades"
        title="Vagas"
        lead="Vagas profissionais e estágios jurídicos com candidatura na plataforma original."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Vagas", path: "/vagas" },
        ]}
      >
        <a
          href="mailto:vagas@bancapaulista.org"
          className="mt-8 inline-flex rounded-sm bg-gold px-5 py-3 text-base font-bold text-brand-navy transition-colors hover:bg-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:text-lg"
        >
          Envie seu currículo: vagas@bancapaulista.org
        </a>
      </TerritoryHero>
      <section className="py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm leading-7 text-brand-navy/75">
              A Banca Paulista divulga editorialmente estas oportunidades; não é empregadora,
              intermediadora nem recebe currículos. Candidate-se somente pela plataforma indicada em
              cada anúncio.
            </p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {vagasPublicadas.map((vaga) => (
              <article
                key={vaga.id}
                className="flex h-full flex-col rounded-xl border border-brand-navy/20 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                        {vaga.organizacao}
                      </p>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-navy/60">
                        {vaga.tipo === "estagio" ? "Estágio" : "Vaga profissional"}
                      </span>
                    </div>
                    <h2 className="mt-2 font-serif text-2xl leading-tight text-brand-navy">
                      {vaga.cargo}
                    </h2>
                  </div>
                  <BriefcaseBusiness className="size-6 shrink-0 text-gold" aria-hidden />
                </div>
                <p className="mt-4 rounded-lg bg-gold/15 px-4 py-3 text-lg font-semibold text-brand-navy">
                  {vaga.remuneracao?.destaque ?? "Remuneração não informada"}
                </p>
                {vaga.remuneracao?.observacao ? (
                  <p className="mt-2 text-xs leading-5 text-brand-navy/70">
                    {vaga.remuneracao.observacao}
                  </p>
                ) : null}
                <dl className="mt-5 grid gap-x-5 gap-y-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-brand-navy">Local</dt>
                    <dd className="mt-1 text-brand-navy/75">{vaga.localizacao}</dd>
                  </div>
                  {vaga.modalidade ? (
                    <div>
                      <dt className="font-semibold text-brand-navy">Modalidade</dt>
                      <dd className="mt-1 text-brand-navy/75">{vaga.modalidade}</dd>
                    </div>
                  ) : null}
                  {vaga.contratacao ? (
                    <div>
                      <dt className="font-semibold text-brand-navy">Contratação</dt>
                      <dd className="mt-1 text-brand-navy/75">{vaga.contratacao}</dd>
                    </div>
                  ) : null}
                  {vaga.exigeOabAtiva ? (
                    <div>
                      <dt className="font-semibold text-brand-navy">Requisito</dt>
                      <dd className="mt-1 text-brand-navy/75">OAB ativa</dd>
                    </div>
                  ) : null}
                </dl>
                <p className="mt-5 text-sm leading-6 text-brand-navy/75">{vaga.resumo}</p>
                <div className="mt-5 border-t border-brand-navy/10 pt-4 text-xs leading-5 text-brand-navy/70">
                  {vaga.inclusivaPcd ? (
                    <p>Vaga também destinada a pessoas com deficiência.</p>
                  ) : null}
                  {vaga.prazoAnunciado ? <p>Prazo anunciado: {vaga.prazoAnunciado}.</p> : null}
                  <p>
                    Fonte: {vaga.fonte.nome} · verificada em {vaga.fonte.consultadaEm}.
                  </p>
                </div>
                <a
                  href={vaga.fonte.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4"
                >
                  Candidatar-se na plataforma original{" "}
                  <ExternalLink className="size-4" aria-hidden />
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <BancaEditorialBanner />
    </main>
  );
}
