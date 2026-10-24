import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  ChevronRight,
  Landmark,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { content } from "@/content/repository";
import {
  buscarRegistrosInstitucionais,
  listarRegistrosInstitucionais,
  type CategoriaPessoa,
  type RegistroInstitucional,
} from "@/content/local/pessoas";
import { Container } from "@/components/site/primitives";
import { BancaEditorialBanner } from "@/components/site/banca-editorial-banner";
import { TerritoryHero } from "@/components/site/territory";
import { canonicalLink, pageMeta } from "@/lib/seo";

const description =
  "Diretório editorial de pessoas ligadas às instituições de Justiça e espaço separado para profissionais independentes verificados.";

export const Route = createFileRoute("/profissionais")({
  loader: async () => {
    const pagina = await content.getPagina("profissionais");
    if (!pagina) throw notFound();
    return { registros: listarRegistrosInstitucionais() };
  },
  head: () => ({
    meta: pageMeta({
      title: "Pessoas e profissionais | Banca Paulista",
      description,
      path: "/profissionais",
    }),
    links: canonicalLink("/profissionais"),
  }),
  component: ProfissionaisPage,
});

const categorias: { id: CategoriaPessoa; nome: string }[] = [
  { id: "policia-civil", nome: "Polícia Civil" },
  { id: "ministerio-publico", nome: "Ministério Público" },
  { id: "judiciario", nome: "Judiciário" },
  { id: "oab-conselhos", nome: "OAB e Conselhos" },
  { id: "defensoria-direitos", nome: "Defensoria e direitos" },
  { id: "ensino-pesquisa", nome: "Ensino e pesquisa" },
];

function IconePessoa({ categoria }: { categoria: CategoriaPessoa }) {
  const Icon =
    categoria === "judiciario"
      ? Landmark
      : categoria === "oab-conselhos"
        ? BookOpen
        : categoria === "defensoria-direitos"
          ? ShieldCheck
          : Building2;
  return (
    <span className="people-person-icon" aria-hidden="true">
      <Icon size={27} strokeWidth={1.5} />
    </span>
  );
}

function CardInstitucional({ registro }: { registro: RegistroInstitucional }) {
  const { pessoa, vinculo, instituicao, evidencia } = registro;
  const categoria =
    categorias.find((item) => item.id === pessoa.categoria)?.nome ?? "Institucional";
  return (
    <article className="people-card">
      <div className="people-card-heading">
        <IconePessoa categoria={pessoa.categoria} />
        <div className="min-w-0">
          <p className="people-category">{categoria}</p>
          <h3>{pessoa.nome}</h3>
        </div>
      </div>
      <p className="people-role">{vinculo.cargo}</p>
      <p className="people-institution">{instituicao.nome}</p>
      <p className="people-period">
        {vinculo.periodo}
        {vinculo.referenciaTerritorial ? ` · ${vinculo.referenciaTerritorial}` : ""}
      </p>
      <div className="people-card-footer">
        <p>
          Fonte:{" "}
          <a href={evidencia.url} target="_blank" rel="noopener noreferrer">
            {evidencia.titulo}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
          <br />
          Consulta editorial: {evidencia.consultadaEm.slice(8, 10)}/
          {evidencia.consultadaEm.slice(5, 7)}/{evidencia.consultadaEm.slice(0, 4)}
        </p>
        <a
          className="people-card-link"
          href={instituicao.urlOficial}
          target="_blank"
          rel="noopener noreferrer"
        >
          Site oficial do órgão <ChevronRight size={17} aria-hidden="true" />
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      </div>
    </article>
  );
}

function ProfissionaisPage() {
  const { registros } = Route.useLoaderData();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const categoriasAtivas = categorias.filter((item) =>
    registros.some((registro) => registro.pessoa.categoria === item.id),
  );
  const visiveis = useMemo(
    () => buscarRegistrosInstitucionais(registros, busca, categoria),
    [registros, busca, categoria],
  );
  const mostrarInstitucionais = categoria !== "independentes";
  const mostrarIndependentes = categoria === "todas" || categoria === "independentes";
  return (
    <main className="home-light editorial-page people-page">
      <TerritoryHero
        eyebrow="Diretório editorial"
        title="Pessoas e profissionais"
        lead="Informações verificadas sobre representantes institucionais e um espaço separado para profissionais independentes. A presença no diretório não indica vínculo nem endosso da Banca Paulista."
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Pessoas e profissionais", path: "/profissionais" },
        ]}
      />
      <section className="people-directory" aria-labelledby="people-directory-title">
        <Container>
          <div className="people-intro">
            <div>
              <p className="people-eyebrow">Consulta pública</p>
              <h2 id="people-directory-title">Quem aparece neste diretório</h2>
              <p>
                Os registros institucionais descrevem funções públicas documentadas. Profissionais
                independentes seguem critérios próprios de identidade, habilitação e participação.
              </p>
            </div>
            <span className="people-count" aria-live="polite">
              {visiveis.length} {visiveis.length === 1 ? "pessoa exibida" : "pessoas exibidas"}
            </span>
          </div>
          <div className="people-controls">
            <label className="people-search">
              <Search size={19} aria-hidden="true" />
              <span className="sr-only">Buscar por nome, cargo, instituição ou atuação</span>
              <input
                type="search"
                value={busca}
                onChange={(event) => setBusca(event.target.value)}
                placeholder="Buscar nome, cargo ou instituição"
              />
            </label>
            <div className="people-filter" role="group" aria-label="Filtrar categoria">
              <button
                type="button"
                aria-pressed={categoria === "todas"}
                onClick={() => setCategoria("todas")}
              >
                Todas
              </button>
              {categoriasAtivas.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={categoria === item.id}
                  onClick={() => setCategoria(item.id)}
                >
                  {item.nome}
                </button>
              ))}
              <button
                type="button"
                aria-pressed={categoria === "independentes"}
                onClick={() => setCategoria("independentes")}
              >
                Independentes
              </button>
            </div>
          </div>
          <div className="people-layout">
            <div className="people-results">
              {mostrarInstitucionais && (
                <section aria-labelledby="people-authorities-title">
                  <div className="people-section-heading">
                    <div>
                      <p className="people-eyebrow">Registros editoriais</p>
                      <h2 id="people-authorities-title">
                        Autoridades e representantes institucionais
                      </h2>
                    </div>
                    <span>Ordem alfabética</span>
                  </div>
                  {visiveis.length ? (
                    <div className="people-grid">
                      {visiveis.map((registro) => (
                        <CardInstitucional key={registro.pessoa.id} registro={registro} />
                      ))}
                    </div>
                  ) : (
                    <p className="people-empty">
                      Nenhum registro publicado corresponde à busca e à categoria selecionadas.
                    </p>
                  )}
                </section>
              )}
              {mostrarIndependentes && (
                <section className="people-independent" aria-labelledby="people-independent-title">
                  <div className="people-section-heading">
                    <div>
                      <p className="people-eyebrow">Participação independente</p>
                      <h2 id="people-independent-title">Profissionais independentes</h2>
                    </div>
                  </div>
                  <div className="people-empty people-empty-independent">
                    <Users size={30} aria-hidden="true" />
                    <div>
                      <strong>Nenhum perfil participante publicado</strong>
                      <p>
                        Perfis independentes só aparecem após verificação e publicação próprias. A
                        Banca Paulista não seleciona advogados, recebe casos ou oferece atendimento
                        jurídico.
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
            <aside className="people-about" aria-labelledby="people-about-title">
              <p className="people-eyebrow">Transparência editorial</p>
              <h2 id="people-about-title">Sobre os perfis</h2>
              <p>
                As funções institucionais exibidas têm fonte oficial e data de consulta em cada
                card. São registros editoriais, sem parceria ou recomendação presumida.
              </p>
              <p>
                Profissionais independentes seguem regras de participação separadas. Nenhum perfil
                dessa modalidade está publicado neste momento.
              </p>
              <p>
                Revisão deste lote: 15/10/2026. Informações podem mudar; consulte também a fonte
                oficial.
              </p>
              <Link to="/contato" className="people-about-link">
                Informações sobre correções <ChevronRight size={17} aria-hidden="true" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>
      <BancaEditorialBanner />
    </main>
  );
}
