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
import { attorneySchema, canonicalLink, pageMeta } from "@/lib/seo";
import type { AreaAtuacao, ConteudoJuridico, SituacaoJuridica, Zona } from "@/content/types";

interface HomeData {
  areas: AreaAtuacao[];
  situacoes: SituacaoJuridica[];
  zonas: (Zona & { quantidade: number })[];
  conteudos: ConteudoJuridico[];
}
import retratoAsset from "@/assets/retrato.avif.asset.json";
import escritorioAsset from "@/assets/escritorio.avif.asset.json";

const TITLE = "Paulo Sinigalia | Advocacia Estratégica em São Paulo — OAB/SP 411.502";
const DESCRIPTION =
  "Advocacia criminal e cível estratégica em São Paulo. Análise individualizada, discrição e acompanhamento próximo em situações de alta responsabilidade.";

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
    conteudos: (await content.listConteudos()).slice(0, 3),
  }),
  head: () => ({
    meta: pageMeta({ title: TITLE, description: DESCRIPTION, path: "/" }),
    links: canonicalLink("/"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(attorneySchema("/")) }],
  }),
  component: Index,
});

const posicionamento = [
  {
    titulo: "Atuação técnica",
    texto:
      "Cada situação é examinada a partir dos elementos disponíveis, do momento processual e das alternativas efetivamente cabíveis.",
  },
  {
    titulo: "Discrição",
    texto:
      "A condução observa reserva quanto à identidade das partes e ao conteúdo das informações compartilhadas.",
  },
  {
    titulo: "Análise individualizada",
    texto:
      "Não há solução padronizada. A estratégia é definida caso a caso, com clareza sobre limites e riscos.",
  },
  {
    titulo: "Acompanhamento próximo",
    texto:
      "Contato direto com o advogado responsável ao longo das etapas do procedimento.",
  },
  {
    titulo: "Alta responsabilidade",
    texto:
      "Atuação em cenários que envolvem liberdade, patrimônio, atividade empresarial e exposição reputacional.",
  },
  {
    titulo: "Presença territorial",
    texto:
      "Conhecimento das dinâmicas de cada região de São Paulo e das rotinas dos procedimentos que nelas tramitam.",
  },
];

const processo = [
  { passo: "01", titulo: "Informações iniciais", texto: "Compreensão da natureza geral da situação e verificação de urgência." },
  { passo: "02", titulo: "Análise de viabilidade", texto: "Exame preliminar dos elementos informados, sem parecer automático." },
  { passo: "03", titulo: "Contato do escritório", texto: "Retorno reservado para conversa detalhada sobre o escopo do trabalho." },
  { passo: "04", titulo: "Orientação individualizada", texto: "Definição de estratégia e acompanhamento das etapas seguintes." },
];

function Index() {
  const { areas, situacoes, zonas, conteudos } = Route.useLoaderData() as HomeData;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={escritorioAsset.url}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/92 to-background" />
        <Container className="relative py-24 md:py-36">
          <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="reveal">
              <p className="eyebrow mb-6">Advocacia criminal e cível · São Paulo</p>
              <h1 className="max-w-3xl text-balance text-4xl leading-[1.1] md:text-6xl">
                Advocacia estratégica para situações jurídicas complexas
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Escritório dedicado a casos que exigem técnica, reserva e acompanhamento próximo.
                A análise é individualizada e conduzida diretamente pelo advogado responsável,
                Paulo José Sinigalia — OAB/SP 411.502.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <ActionLink to="/contato">Informações para contato</ActionLink>
                <ActionLink to="/areas-de-atuacao" variant="outline">
                  Conhecer áreas de atuação
                </ActionLink>
              </div>
            </div>
            <figure className="reveal mx-auto w-full max-w-xs">
              <img
                src={retratoAsset.url}
                alt="Paulo José Sinigalia, advogado responsável pelo escritório"
                width={480}
                height={480}
                className="w-full rounded-full border border-gold/25"
              />
              <figcaption className="mt-5 text-center text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Paulo José Sinigalia · OAB/SP 411.502
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Posicionamento"
            title="Trabalho conduzido com precisão e reserva"
            lead="A atuação é orientada por método, documentação e comunicação clara sobre alternativas e limites."
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
            eyebrow="Áreas de atuação"
            title="Frentes de trabalho do escritório"
            lead="Concentração em matérias que exigem leitura técnica apurada e coordenação entre esferas."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <AreaCard key={area.id} area={area} />
            ))}
          </div>
          <div className="mt-12">
            <ActionLink to="/areas-de-atuacao" variant="outline">
              Conhecer áreas de atuação
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
            title="Atuação organizada por região de São Paulo"
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
                  Índice completo das regiões atendidas e das páginas territoriais publicadas.
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
          <SectionHeading eyebrow="Processo" title="Como funciona o atendimento" />
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
