import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, Shield } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Container, Section } from "@/components/site/primitives";
import { categoriasComInstituicoes } from "@/content/local/orgaos";
import { content } from "@/content/repository";
import type { PublicInstitution } from "@/content/types";
import { canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/orgaos";

export const Route = createFileRoute("/orgaos/")({
  loader: async (): Promise<{ institutions: PublicInstitution[] }> => ({
    institutions: await content.listInstitutions(),
  }),
  head: () => ({
    meta: pageMeta({
      title: "Órgãos e Serviços | Banca Paulista",
      description:
        "Índice editorial de órgãos, serviços públicos e instituições com fichas publicadas na Banca Paulista.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
  }),
  component: OrgaosPage,
});

function OrgaosPage() {
  const { institutions } = Route.useLoaderData();
  const categorias = categoriasComInstituicoes(institutions);
  const publicadas = categorias.filter((categoria) => categoria.instituicoes.length > 0);

  return (
    <div className="home-light">
      <section className="bg-brand-navy py-12 text-ivory md:py-18">
        <Container>
          <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Órgãos e Serviços", path: PATH }]} />
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            Diretório institucional
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-none md:text-7xl">
            Órgãos e Serviços
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ivory/82 md:text-lg">
            Fichas editoriais de órgãos e serviços públicos, organizadas por categorias de navegação.
            Consulte sempre as fontes oficiais para confirmar atribuições e atendimento.
          </p>
        </Container>
      </section>

      <Section>
        <Container>
          <Link
            to="/delegacias"
            className="group flex items-center justify-between gap-5 rounded-xl border border-brand-navy/15 bg-card p-5 text-brand-navy transition-colors hover:border-gold/70"
          >
            <span className="flex items-center gap-3">
              <Shield className="size-5 text-gold" aria-hidden />
              <span>
                <span className="block font-serif text-xl">Delegacias</span>
                <span className="mt-1 block text-sm text-brand-navy/70">
                  Consulte separadamente o guia territorial de Distritos Policiais.
                </span>
              </span>
            </span>
            <ArrowUpRight className="size-5 text-gold" aria-hidden />
          </Link>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {publicadas.map((categoria) => (
              <section key={categoria.id} className="rounded-xl border border-brand-navy/15 bg-card p-6">
                <div className="flex items-center gap-3">
                  <Building2 className="size-5 text-gold" aria-hidden />
                  <h2 className="font-serif text-2xl text-brand-navy">{categoria.nome}</h2>
                </div>
                <ul className="mt-5 space-y-3">
                  {categoria.instituicoes.map((institution) => (
                    <li key={institution.id}>
                      <Link
                        to="/instituicoes/$slug"
                        params={{ slug: institution.slug }}
                        className="group flex items-center justify-between gap-3 text-sm text-brand-navy underline decoration-gold underline-offset-4"
                      >
                        <span>{institution.nomeOficial}</span>
                        <ArrowUpRight className="size-4 shrink-0 text-gold" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm leading-6 text-brand-navy/65">
            Outras categorias editoriais serão exibidas quando houver fichas aprovadas para publicação.
          </p>
        </Container>
      </Section>
    </div>
  );
}
