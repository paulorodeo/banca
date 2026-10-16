import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { BookOpen, FileText, Landmark, Search, Shield, Users } from "lucide-react";
import { content } from "@/content/repository";
import type { Delegacia, Regiao, Zona } from "@/content/types";
import { Container } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { ProfessionalSidebar } from "@/components/site/territory";
import { DistrictDirectory } from "@/components/site/district-directory";
import { canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/delegacias";

export const Route = createFileRoute("/delegacias/")({
  validateSearch: (search): { q?: string } =>
    typeof search["q"] === "string" && search["q"].trim()
      ? { q: search["q"].trim().slice(0, 100) }
      : {},
  loader: async (): Promise<{ delegacias: Delegacia[]; regioes: Regiao[]; zonas: Zona[] }> => ({
    delegacias: await content.listDelegacias(),
    regioes: await content.listRegioes(),
    zonas: await content.listZonas(),
  }),
  head: () => ({
    meta: pageMeta({
      title: "Delegacias em São Paulo | Guia Informativo — Banca Paulista",
      description:
        "Páginas informativas sobre delegacias de polícia em São Paulo, com contexto territorial e informação sobre procedimentos policiais.",
      path: PATH,
    }),
    links: canonicalLink(PATH),
  }),
  component: DelegaciasPage,
});

function DelegaciasPage() {
  const { delegacias, regioes, zonas } = Route.useLoaderData();
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/delegacias/" });
  const [query, setQuery] = useState(q ?? "");
  const [zone, setZone] = useState("todas");

  useEffect(() => setQuery(q ?? ""), [q]);

  const applySearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigate({ search: query.trim() ? { q: query.trim() } : {}, replace: true }).then(() => {
      document.getElementById("district-results")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const clearFilters = () => {
    setQuery("");
    setZone("todas");
    void navigate({ search: {}, replace: true });
  };

  const filters = [
    { slug: "todas", nome: "Todas as zonas" },
    ...["centro", "zona-norte", "zona-sul", "zona-leste", "zona-oeste"]
      .map((slug) => zonas.find((item) => item.slug === slug))
      .filter((item): item is Zona => Boolean(item))
      .map((item) => ({ slug: item.slug, nome: item.nome })),
  ];

  return (
    <div className="home-light">
      <nav
        aria-label="Navegação institucional"
        className="border-b border-[#101B2B]/10 bg-[#F4F1EB]"
      >
        <Container className="flex snap-x gap-7 overflow-x-auto">
          <a
            href="#district-results"
            aria-current="page"
            className="flex min-h-14 shrink-0 items-center gap-2 border-b-2 border-[#C8A66A] px-1 text-sm font-semibold text-[#101B2B]"
          >
            <Shield className="size-4" aria-hidden />
            Delegacias
          </a>
          {[
            { icon: Landmark, name: "Fóruns" },
            { icon: Users, name: "Defensorias" },
            { icon: Users, name: "Conselhos Tutelares" },
            { icon: FileText, name: "Cartórios" },
          ].map(({ icon: Icon, name }) => (
            <span
              key={name}
              className="flex min-h-14 shrink-0 items-center gap-2 px-1 text-sm text-[#101B2B]/60"
            >
              <Icon className="size-4" aria-hidden />
              {name}
              <span className="text-[0.62rem] text-[#101B2B]/45">Em preparação</span>
            </span>
          ))}
        </Container>
      </nav>

      <section className="relative isolate overflow-hidden bg-[#101B2B] text-[#F4F1EB]">
        <picture className="absolute inset-0 -z-20 block size-full">
          <source srcSet="/images/sp/ponte.avif" type="image/avif" />
          <img
            src="/images/sp/ponte.webp"
            alt="Ponte Estaiada em São Paulo"
            width="2048"
            height="768"
            sizes="100vw"
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover opacity-85"
            style={{ objectPosition: "65% center" }}
          />
        </picture>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,27,43,0.98)_0%,rgba(16,27,43,0.92)_35%,rgba(16,27,43,0.72)_62%,rgba(16,27,43,0.28)_100%)]"
        />
        <Container className="py-8 sm:py-10 md:py-14">
          <Breadcrumbs
            items={[
              { name: "Início", path: "/" },
              { name: "Delegacias", path: PATH },
            ]}
          />
          <div className="mt-7 max-w-[48rem]">
            <p className="text-[0.66rem] font-semibold tracking-[0.2em] text-[#C8A66A]">
              GUIA DE DELEGACIAS · SÃO PAULO
            </p>
            <h1 className="mt-3 text-balance font-serif text-4xl font-medium leading-[1.04] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              Delegacias de Polícia
              <br className="hidden sm:block" /> em São Paulo
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-[#F4F1EB]/90 sm:text-base sm:leading-7">
              Consulte os Distritos Policiais da capital paulista. Pesquise por número, nome ou
              bairro e encontre informações sobre localização, regiões atendidas e procedimentos
              policiais.
            </p>
          </div>

          <form
            onSubmit={applySearch}
            role="search"
            className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-[minmax(0,1fr)_auto]"
          >
            <label className="relative block min-w-0">
              <span className="sr-only">Buscar por número do DP, nome ou bairro</span>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-[#101B2B]/65"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Digite o número do DP, nome ou bairro..."
                className="h-12 w-full rounded-md border border-white/70 bg-white pl-12 pr-4 text-sm font-medium text-[#101B2B] placeholder:text-[#101B2B]/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A66A]"
              />
            </label>
            <button
              type="submit"
              className="h-12 rounded-md bg-[#C8A66A] px-7 text-sm font-semibold text-[#101B2B] transition-colors hover:bg-[#d7b77f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
            >
              Buscar
            </button>
          </form>

          <div
            className="mt-4 flex max-w-4xl flex-wrap gap-2"
            role="group"
            aria-label="Filtrar delegacias por zona"
          >
            {filters.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setZone(item.slug)}
                aria-pressed={zone === item.slug}
                className={`min-h-10 rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${zone === item.slug ? "border-[#C8A66A] bg-[#C8A66A] text-[#101B2B]" : "border-[#F4F1EB]/55 bg-[#101B2B]/45 text-[#F4F1EB] hover:border-[#C8A66A] hover:bg-[#101B2B]/70"}`}
              >
                {item.nome}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-10">
        <Container className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div className="min-w-0">
            <DistrictDirectory
              delegacias={delegacias}
              regioes={regioes}
              zonas={zonas}
              query={query}
              zone={zone}
              onClear={clearFilters}
            />
            <aside className="mt-10 rounded-xl border border-[#101B2B]/10 bg-white/60 p-5 sm:p-6">
              <div className="flex gap-4">
                <BookOpen className="mt-1 size-5 shrink-0 text-[#9B7940]" aria-hidden />
                <div>
                  <h2 className="font-serif text-xl text-[#101B2B]">
                    Como usar o guia de delegacias
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#101B2B]/70">
                    Pesquise pelo nome, bairro ou número do DP e combine a busca com o filtro por
                    zona. As relações territoriais são editoriais; confirme a unidade competente e
                    os dados de atendimento nos canais oficiais.
                  </p>
                </div>
              </div>
            </aside>
          </div>
          <ProfessionalSidebar neighborhoodName="São Paulo" />
        </Container>
      </section>
    </div>
  );
}
