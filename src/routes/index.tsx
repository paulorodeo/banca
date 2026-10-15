import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Search, Shield, Landmark, BookOpen, Info } from "lucide-react";
import { content } from "@/content/repository";
import { Container } from "@/components/site/primitives";
import { ConteudoCard } from "@/components/site/blocks";
import { websiteSchema, canonicalLink, pageMeta } from "@/lib/seo";
import type { ConteudoJuridico, Regiao, Zona } from "@/content/types";

interface HomeData {
  regioes: Regiao[];
  zonas: (Zona & { quantidade: number })[];
  conteudos: ConteudoJuridico[];
  artigosErro?: string;
}
import { readArticles } from "@/content/articles.functions";
import ponteAsset from "@/assets/ponte-estaiada.png.asset.json";

const TITLE = "Banca Paulista de Advogados — Portal editorial e defesa criminal";
const DESCRIPTION =
  "Portal editorial sobre defesa criminal, delegacias e regiões de São Paulo. Guias territoriais, artigos informativos e contexto sobre plantão criminal.";

export const Route = createFileRoute("/")({
  loader: async (): Promise<HomeData> => ({
    regioes: await content.listRegioes(),
    // Cards de zona na home, com contagem de regiões publicadas por zona.
    zonas: await content.listZonas().then(async (zonas) => {
      const regioes = await content.listRegioes();
      return zonas.map((zona) => ({
        ...zona,
        quantidade: regioes.filter((regiao) => regiao.zona === zona.slug).length,
      }));
    }),
    ...await readArticles({ data: { page: 1, limit: 3, sort: '-publishedAt', category: '' } }).then(result => result.ok ? { conteudos: result.page.docs } : { conteudos: [], artigosErro: result.error }),
  }),
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/" }),
    links: canonicalLink("/"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(websiteSchema("/")) }],
  }),
  component: Index,
});

const ZONA_ORDEM = ["centro", "zona-norte", "zona-leste", "zona-sul", "zona-oeste"];
const ZONA_FOCO: Record<string, string> = {
  centro: "50% 40%", "zona-norte": "10% 30%", "zona-leste": "30% 60%", "zona-sul": "75% 45%", "zona-oeste": "95% 35%",
};
const BAIRROS = ["Santo Amaro", "Pinheiros", "Mooca", "Santana", "Tatuapé", "Butantã", "Lapa", "Itaquera"];
const GUIAS = ["Vila Romana", "Pinheiros", "Perdizes", "Jardins"];

function Eyebrow({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-gold-accent">
      <span className="h-px w-8 bg-gold-accent" aria-hidden />
      {children}
    </p>
  );
}

function Header({ eyebrow, title, lead, to, cta }: { eyebrow: string; title: string; lead: string; to: "/regioes" | "/delegacias" | "/artigos"; cta: string }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 font-serif text-3xl text-navy md:text-4xl">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{lead}</p>
      </div>
      <Link to={to} className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-gold-accent">
        {cta} <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

function Index() {
  const { regioes, zonas, conteudos, artigosErro } = Route.useLoaderData() as HomeData;
  const zonasOrdenadas = ZONA_ORDEM.map((s) => zonas.find((z) => z.slug === s)).filter((z): z is HomeData["zonas"][number] => !!z);
  const bairros = BAIRROS.map((n) => regioes.find((r) => r.nome === n)).filter((r): r is Regiao => !!r && !!r.href);
  const guias = GUIAS.map((n) => regioes.find((r) => r.nome === n)).filter((r): r is Regiao => !!r && !!r.href);
  const nomeZona = (slug: string) => zonas.find((z) => z.slug === slug)?.nome ?? "";

  return (
    <div className="home-light">
      <section className="relative overflow-hidden bg-navy">
        <img src={ponteAsset.url} alt="Ponte Estaiada e a Marginal Pinheiros ao entardecer, em São Paulo" width={1920} height={641} fetchPriority="high" className="absolute inset-0 size-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)] via-[color-mix(in_oklab,var(--navy)_75%,transparent)] to-transparent md:via-[color-mix(in_oklab,var(--navy)_55%,transparent)]" />
        <Container className="relative py-16 md:py-24">
          <Eyebrow>São Paulo · Guias e informação</Eyebrow>
          <h1 className="mt-5 max-w-xl font-serif text-4xl leading-[1.08] text-on-navy md:text-6xl">São Paulo, território por território.</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-on-navy/90">
            Explore São Paulo por regiões, bairros e delegacias. Encontre guias territoriais, informações jurídicas e referências para compreender os serviços da capital paulista.
          </p>
          <Link to="/delegacias" className="mt-8 flex max-w-xl items-center gap-3 rounded-full bg-card py-2 pl-5 pr-2 text-sm text-muted-foreground shadow-lg">
            <Search className="size-5 text-navy" aria-hidden />
            <span className="flex-1 truncate">Consulte por região, bairro ou delegacia…</span>
            <span className="grid size-9 place-items-center rounded-full bg-gold-accent text-on-navy"><ArrowRight className="size-4" aria-hidden /></span>
          </Link>
          <p className="mt-5 flex items-center gap-2 text-xs text-on-navy/85"><MapPin className="size-4" aria-hidden /> Capital paulista · Conteúdo informativo</p>
        </Container>
      </section>

      <section className="py-14">
        <Container>
          <Header eyebrow="Explore por região" title="Cinco regiões, um só portal" lead="Acesse os guias territoriais e encontre a informação da sua região." to="/regioes" cta="Ver todas as regiões" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {zonasOrdenadas.map((zona) => (
              <Link key={zona.id} to="/regioes/$slug" params={{ slug: zona.slug }} className="group flex flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <img src={ponteAsset.url} alt="" loading="lazy" className="h-28 w-full object-cover" style={{ objectPosition: ZONA_FOCO[zona.slug] }} />
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-serif text-xl text-navy">{zona.nome}</h3>
                  <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{zona.descricao}</p>
                  <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MapPin className="size-3.5" aria-hidden />{zona.quantidade} {zona.quantidade === 1 ? "guia publicado" : "guias publicados"}</span>
                    <span className="grid size-7 place-items-center rounded-full bg-navy text-on-navy"><ArrowRight className="size-3.5" aria-hidden /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {bairros.length > 0 && (
        <section className="border-t border-border py-12">
          <Container>
            <Header eyebrow="Explore por bairro" title="Bairros em destaque" lead="Acesse diretamente os guias de bairros já publicados." to="/regioes" cta="Ver todos os bairros" />
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {bairros.map((b) => (
                <a key={b.id} href={b.href} className="flex shrink-0 items-center gap-3 rounded-full border border-border bg-card py-1.5 pl-1.5 pr-5 text-sm font-medium text-navy hover:border-gold-accent">
                  <span className="grid size-8 place-items-center rounded-full bg-navy text-on-navy"><MapPin className="size-4" aria-hidden /></span>
                  {b.nome}
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      {guias.length > 0 && (
        <section className="border-t border-border py-12">
          <Container>
            <Header eyebrow="Guias em destaque" title="Acesso direto aos guias de delegacias" lead="Alguns guias territoriais já publicados no portal." to="/delegacias" cta="Ver todos os guias" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {guias.map((g) => (
                <a key={g.id} href={g.href} className="group flex items-center gap-4 rounded-md border border-border bg-card p-4 hover:border-gold-accent">
                  <span className="grid size-12 shrink-0 place-items-center rounded-md bg-navy text-on-navy"><Shield className="size-5" aria-hidden /></span>
                  <span className="flex-1">
                    <span className="block font-serif text-base text-navy">{g.nome}</span>
                    <span className="block text-xs text-muted-foreground">{nomeZona(g.zona)}</span>
                  </span>
                  <ArrowRight className="size-4 text-navy" aria-hidden />
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border py-12">
        <Container>
          <Header eyebrow="Informação jurídica e cidadania" title="Artigos e orientações" lead="Conteúdos informativos sobre temas jurídicos do dia a dia." to="/artigos" cta="Ver todos os artigos" />
          {artigosErro && <p role="status" className="mt-6 text-muted-foreground">{artigosErro}</p>}
          <div className="dark-cards mt-6 grid gap-5 md:grid-cols-3">
            {conteudos.map((c) => <ConteudoCard key={c.id} conteudo={c} />)}
          </div>
        </Container>
      </section>

      <section className="bg-navy py-12">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Eyebrow>Participação profissional</Eyebrow>
            <h2 className="mt-3 font-serif text-3xl text-on-navy">É advogado e deseja conhecer a Banca Paulista?</h2>
            <p className="mt-2 text-sm text-on-navy/85">Conheça a proposta editorial do projeto em sua fase inaugural.</p>
          </div>
          <Link to="/sobre" className="inline-flex items-center gap-2 self-start rounded-full bg-gold-accent px-6 py-3 text-sm font-medium text-navy">Conhecer a iniciativa <ArrowRight className="size-4" aria-hidden /></Link>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, t: "Informação jurídica", d: "Artigos sobre temas do direito, com linguagem clara.", to: "/areas-de-atuacao" as const, c: "Temas jurídicos" },
            { icon: Landmark, t: "Transparência", d: "O portal não oferece consulta jurídica nem recebe relatos de casos.", to: "/sobre" as const, c: "Saiba mais" },
            { icon: Shield, t: "Privacidade", d: "Sem vínculo com a Polícia Civil ou órgãos públicos citados.", to: "/politica-de-privacidade" as const, c: "Ver política" },
            { icon: Info, t: "Sobre o projeto", d: "Portal editorial em fase inicial, sem profissionais publicados.", to: "/sobre" as const, c: "Saiba mais" },
          ].map(({ icon: Icon, t, d, to, c }) => (
            <div key={t}>
              <Icon className="size-6 text-navy" aria-hidden />
              <h3 className="mt-3 font-serif text-lg text-navy">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              <Link to={to} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold-accent">{c} <ArrowRight className="size-3.5" aria-hidden /></Link>
            </div>
          ))}
        </Container>
      </section>
    </div>
  );
}
