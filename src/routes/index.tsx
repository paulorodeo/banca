import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { content } from "@/content/repository";
import { ActionLink, Container, Hairline, Section, SectionHeading } from "@/components/site/primitives";
import {
  AreaCard,
  ConteudoCard,
  CtaReservado,
  SituacaoItem,
  ZonaCard,
} from "@/components/site/blocks";
import { websiteSchema, canonicalLink, pageMeta } from "@/lib/seo";
import type { AreaAtuacao, ConteudoJuridico, SituacaoJuridica, Zona } from "@/content/types";

interface HomeData {
  areas: AreaAtuacao[];
  situacoes: SituacaoJuridica[];
  zonas: (Zona & { quantidade: number })[];
  conteudos: ConteudoJuridico[];
  artigosErro?: string;
}
import { readArticles } from "@/content/articles.functions";
import cidadeImage from "@/assets/sao-paulo-editorial.jpg";

const TITLE = "Banca Paulista de Advogados — Portal editorial e defesa criminal";
const DESCRIPTION =
  "Portal editorial sobre defesa criminal, delegacias e regiões de São Paulo. Guias territoriais, artigos informativos e contexto sobre plantão criminal.";

export const Route = createFileRoute("/")({
  loader: async (): Promise<HomeData> => ({
    areas: await content.listAreas(),
    situacoes: await content.listSituacoes(),
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

const posicionamento = [
  { titulo: "Clareza editorial", texto: "Conteúdo acessível sobre documentos, procedimentos policiais e temas jurídicos." },
  { titulo: "Independência", texto: "Sem vínculo com delegacias, tribunais ou órgãos públicos mencionados nas páginas." },
  { titulo: "Contexto territorial", texto: "Bairros e zonas como referências de navegação, sem presumir circunscrição oficial." },
  { titulo: "Responsabilidade", texto: "Informação pública não é consulta jurídica, parecer ou promessa de resultado." },
  { titulo: "Autoria transparente", texto: "Publicações assinadas somente por colaboradores identificados e com autorização." },
  { titulo: "Respeito à privacidade", texto: "O portal não recebe documentos de processos ou relatos identificáveis de casos." },
];
const processo = [
  { passo: "01", titulo: "Território", texto: "Consulte as páginas da zona e os bairros de referência." },
  { passo: "02", titulo: "Delegacias", texto: "Conheça o contexto das unidades e confirme dados em canais oficiais." },
  { passo: "03", titulo: "Publicações", texto: "Leia os artigos sobre documentos e procedimentos." },
  { passo: "04", titulo: "Profissionais", texto: "Perfis serão publicados quando houver participantes identificados." },
];

function Index() {
  const { areas, situacoes, zonas, conteudos, artigosErro } = Route.useLoaderData() as HomeData;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img src={cidadeImage} alt="Imagem editorial ilustrativa da Praça da Sé, em São Paulo" width={1600} height={1008} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <Container className="relative py-12 md:py-20">
          <p className="eyebrow mb-6">Portal editorial · São Paulo</p>
          <h1 className="max-w-3xl text-balance text-4xl leading-tight md:text-6xl">Banca Paulista<br /><span className="text-gold-light">de Advogados</span></h1>
          <p className="mt-5 font-serif text-2xl text-ivory">Plantão e Defesa Criminal</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory">Informação jurídica e contexto territorial. Delegacias, bairros e temas de defesa criminal nas cinco zonas de São Paulo.</p>
          <div className="mt-8 flex flex-wrap gap-4"><ActionLink to="/regioes">Explorar regiões</ActionLink><ActionLink to="/delegacias" variant="outline">Guia de delegacias</ActionLink></div>
          <p className="mt-8 max-w-xl text-xs leading-relaxed text-ivory/80">Fase editorial · Ainda não há profissionais participantes publicados. O portal não oferece consultas nem atendimento 24h.</p>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Posicionamento"
            title="Informação com clareza e responsabilidade"
            lead="Princípios que orientam as publicações e os guias territoriais da Banca Paulista."
          />
          <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {posicionamento.map((item) => (
              <div key={item.titulo} className="bg-background p-8">
                <h3 className="text-lg text-ivory">{item.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container>
          <SectionHeading
            eyebrow="Temas jurídicos"
            title="Defesa criminal e temas relacionados"
            lead="Informações sobre investigações, medidas urgentes e questões jurídicas relacionadas."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
          <div className="mt-12">
            <ActionLink to="/areas-de-atuacao" variant="outline">
              Explorar temas jurídicos
            </ActionLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Contextos recorrentes"
            title="Situações que exigem estratégia e discrição"
          />
          <div className="mt-12 grid gap-x-14 md:grid-cols-2">
            {situacoes.map((situacao) => (
              <SituacaoItem key={situacao.id} situacao={situacao} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container>
          <SectionHeading
            eyebrow="Cobertura territorial"
            title="São Paulo, região por região"
            lead="Páginas territoriais por zona da cidade, com contexto local e orientação sobre situações frequentes."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {zonas.map((zona) => (
              <ZonaCard key={zona.id} zona={zona} quantidade={zona.quantidade} />
            ))}
            <Link
              to="/regioes"
              className="surface-panel group flex flex-col justify-between rounded-xs p-7 hover:border-gold/40"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl text-ivory">Todas as regiões</h3>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Índice completo das regiões publicadas e das páginas territoriais publicadas.
                </p>
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.14em] text-gold/80">
                Índice completo · São Paulo — SP
              </p>
            </Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Portal" title="Território, informação e contexto" />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {processo.map((etapa) => (
              <div key={etapa.passo}>
                <p className="font-serif text-4xl text-gold/70">{etapa.passo}</p>
                <Hairline className="my-5 max-w-12" />
                <h3 className="text-lg text-ivory">{etapa.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{etapa.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="raised">
        <Container>
          <SectionHeading eyebrow="Artigos" title="Artigos jurídicos em destaque" />
          {artigosErro && <p role="status" className="mt-8 text-muted-foreground">{artigosErro}</p>}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {conteudos.map((conteudo) => (
              <ConteudoCard key={conteudo.id} conteudo={conteudo} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaReservado />
    </>
  );
}
