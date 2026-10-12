import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { AreaAtuacao, ConteudoJuridico, Regiao, SituacaoJuridica, Zona } from "@/content/types";
import { nomeDaZona } from "@/content/local/zonas";
import { ActionLink, Container, Hairline, Section, SectionHeading } from "./primitives";
import { Breadcrumbs, type Crumb } from "./breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: Crumb[];
}) {
  return (
    <div className="border-b border-border bg-graphite/50">
      <Container className="py-14 md:py-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 reveal">
          <SectionHeading as="h1" eyebrow={eyebrow} title={title} {...(lead ? { lead } : {})} />
        </div>
      </Container>
    </div>
  );
}

export function AreaCard({ area }: { area: AreaAtuacao }) {
  return (
    <article className="surface-panel group rounded-xs p-7 hover:border-gold/40">
      <h3 className="text-xl text-ivory">{area.titulo}</h3>
      <Hairline className="my-5 max-w-16" />
      <p className="text-sm leading-relaxed text-muted-foreground">{area.resumo}</p>
      <ul className="mt-5 space-y-2 text-sm text-ivory/70">
        {area.topicos.slice(0, 3).map((topico) => (
          <li key={topico} className="flex gap-2">
            <span aria-hidden className="text-gold">
              —
            </span>
            {topico}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function SituacaoItem({ situacao }: { situacao: SituacaoJuridica }) {
  return (
    <div className="border-t border-border py-6">
      <h3 className="text-lg text-ivory">{situacao.titulo}</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {situacao.descricao}
      </p>
    </div>
  );
}

export function RegiaoCard({ regiao }: { regiao: Regiao }) {
  return (
    <Link
      to={regiao.href}
      className="surface-panel group flex flex-col justify-between rounded-xs p-6 hover:border-gold/40"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg text-ivory">{regiao.nome}</h3>
          <ArrowUpRight
            className="size-4 shrink-0 text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{regiao.descricao}</p>
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.14em] text-gold/80">
        {nomeDaZona(regiao.zona)} · São Paulo — SP
      </p>
    </Link>
  );
}

/** Card de macro-zona (página-pilar em /regioes/$slug). */
export function ZonaCard({ zona, quantidade }: { zona: Zona; quantidade: number }) {
  return (
    <Link
      to="/regioes/$slug"
      params={{ slug: zona.slug }}
      className="surface-panel group flex flex-col justify-between rounded-xs p-7 hover:border-gold/40"
    >
      <div>
        <h3 className="text-xl text-ivory">{zona.nome}</h3>
        <Hairline className="my-5 max-w-16" />
        <p className="text-sm leading-relaxed text-muted-foreground">{zona.descricao}</p>
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.14em] text-gold/80">
        {quantidade > 0
          ? `${quantidade} ${quantidade === 1 ? "região publicada" : "regiões publicadas"} · São Paulo — SP`
          : "Cobertura em expansão · São Paulo — SP"}
      </p>
    </Link>
  );
}

export function ConteudoCard({ conteudo }: { conteudo: ConteudoJuridico }) {
  return (
    <Link
      to="/artigos/$slug"
      params={{ slug: conteudo.slug }}
      className="surface-panel group flex flex-col rounded-xs p-7 hover:border-gold/40"
    >
      <p className="eyebrow">{conteudo.categoria}</p>
      <h3 className="mt-4 text-xl leading-snug text-ivory">{conteudo.titulo}</h3>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{conteudo.resumo}</p>
      <span className="mt-6 text-xs uppercase tracking-[0.14em] text-gold">Ler conteúdo</span>
    </Link>
  );
}

export function CtaReservado({
  titulo = "Atendimento reservado",
  descricao = "O contato inicial serve para compreender a situação e verificar a compatibilidade com a atuação do escritório. Nenhum documento sensível é necessário nesta etapa.",
}: {
  titulo?: string;
  descricao?: string;
}) {
  return (
    <Section tone="raised">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5">Contato</p>
          <h2 className="text-3xl leading-tight md:text-[2.5rem]">{titulo}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {descricao}
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ActionLink to="/contato">Informações para contato</ActionLink>
            <ActionLink to="/atendimento-reservado" variant="outline">
              Atendimento reservado
            </ActionLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}