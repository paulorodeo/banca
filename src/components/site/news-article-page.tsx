import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Facebook,
  FileText,
  Linkedin,
  Link2,
  Mail,
  MessageCircle,
  Share2,
  X as XIcon,
} from "lucide-react";
import { conteudos } from "@/content/local/artigos-editoriais";
import { bairros } from "@/content/local/bairros";
import { noticias } from "@/content/local/noticias";
import { zonas } from "@/content/local/zonas";
import type { NoticiaBloco, NoticiaEditorial } from "@/content/types";
import { NewsImage } from "@/components/site/news-image";
import { Container } from "@/components/site/primitives";

type TerritoryRelation = { nome: string; relacao?: string };
type RelatedFilter = { key: string; label: string; names: string[]; items: NoticiaEditorial[] };

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

function territoriesOf(item: NoticiaEditorial): TerritoryRelation[] {
  const relationships: unknown = item.relacionamentos;
  const candidates = Array.isArray(relationships)
    ? relationships
    : relationships && typeof relationships === "object"
      ? ((relationships as { territorios?: unknown[] }).territorios ?? [])
      : [];
  return candidates.flatMap((value) => {
    if (!value || typeof value !== "object" || !("nome" in value)) return [];
    const relation = value as { nome: unknown; tipo?: unknown; relacao?: unknown };
    if (typeof relation.nome !== "string") return [];
    if (relation.tipo && relation.tipo !== "territorio") return [];
    return [
      {
        nome: relation.nome,
        relacao: typeof relation.relacao === "string" ? relation.relacao : undefined,
      },
    ];
  });
}

function relatedItemsForNames(item: NoticiaEditorial, names: string[]) {
  const keys = new Set(names.map(normalize));
  return noticias
    .filter((candidate) => candidate.id !== item.id)
    .filter((candidate) =>
      territoriesOf(candidate).some(
        (relation) => relation.relacao !== "informativo" && keys.has(normalize(relation.nome)),
      ),
    )
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm));
}

function territoryDestination(name: string): { href: string; label: string } | undefined {
  const key = normalize(name);
  const bairro = bairros.find(
    (item) => item.status === "publicado" && normalize(item.nome) === key,
  );
  if (bairro) return { href: `/bairros/${bairro.slug}`, label: `Ver todas em ${bairro.nome}` };

  const canonicalKey = key === "centro de sao paulo" || key === "centro sp" ? "centro" : key;
  const zona = zonas.find((item) => normalize(item.nome) === canonicalKey);
  if (zona) return { href: `/regioes/${zona.slug}`, label: `Ver todas em ${zona.nome}` };
}

function relatedFilters(item: NoticiaEditorial): RelatedFilter[] {
  const current = territoriesOf(item).filter((relation) => relation.relacao !== "informativo");
  const currentNames = current.map((relation) => relation.nome);
  const bairroNames = new Set(
    bairros
      .filter((bairro) => bairro.status === "publicado")
      .map((bairro) => normalize(bairro.nome)),
  );
  const zoneNames = new Set(zonas.map((zone) => normalize(zone.nome)));
  const cityNames = new Set(["sao paulo", "sao paulo sp", "municipio de sao paulo"]);
  const canonicalTerritory = (name: string) => {
    const key = normalize(name);
    return key === "centro de sao paulo" || key === "centro sp" ? "centro" : key;
  };
  const scopes = [
    {
      key: "bairro",
      label: "Mesmo bairro",
      names: currentNames.filter((name) => bairroNames.has(normalize(name))),
    },
    {
      key: "zona",
      label: "Mesma zona",
      names: currentNames.filter((name) => zoneNames.has(canonicalTerritory(name))),
    },
    {
      key: "cidade",
      label: "Mesma cidade",
      names: currentNames.filter((name) => cityNames.has(normalize(name))),
    },
  ];
  return scopes.flatMap((scope) => {
    if (!scope.names.length) return [];
    const items = relatedItemsForNames(item, scope.names);
    return items.length ? [{ ...scope, items }] : [];
  });
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function blockText(block: NoticiaBloco): string {
  if (block.tipo === "lista") return block.itens.join(" ");
  if (block.tipo === "tabela") return [...block.cabecalho, ...block.linhas.flat()].join(" ");
  return block.texto;
}

function readingMinutes(item: NoticiaEditorial) {
  const words = item.blocos
    .flatMap((block) => blockText(block).trim().split(/\s+/))
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function inlineMarkdown(text: string) {
  const token = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\))/g;
  const result = [];
  let lastIndex = 0;
  for (const match of text.matchAll(token)) {
    const value = match[0];
    const index = match.index ?? 0;
    if (index > lastIndex) result.push(text.slice(lastIndex, index));
    if (value.startsWith("**")) {
      result.push(<strong key={index}>{value.slice(2, -2)}</strong>);
    } else if (value.startsWith("*")) {
      result.push(<em key={index}>{value.slice(1, -1)}</em>);
    } else {
      const [, label, url] = value.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/) ?? [];
      if (label && url)
        result.push(
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-[#76501f] underline decoration-[#b28341]/60 underline-offset-4"
          >
            {label}
          </a>,
        );
      else result.push(value);
    }
    lastIndex = index + value.length;
  }
  if (lastIndex < text.length) result.push(text.slice(lastIndex));
  return result;
}

function NoticiaBlocoView({ bloco }: { bloco: NoticiaBloco }) {
  if (bloco.tipo === "titulo")
    return (
      <h2 className="pt-5 font-[Georgia,serif] text-[1.65rem] font-bold leading-tight text-[#061e30] md:text-[1.9rem]">
        {bloco.texto}
      </h2>
    );
  if (bloco.tipo === "lista")
    return (
      <ul className="list-disc space-y-3 pl-6 text-[1.0625rem] leading-8 text-[#263746] marker:text-[#b28341]">
        {bloco.itens.map((item) => (
          <li key={item}>{inlineMarkdown(item)}</li>
        ))}
      </ul>
    );
  if (bloco.tipo === "tabela")
    return (
      <div className="overflow-x-auto border border-[#d9e0e5]">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm leading-6 text-[#263746] md:text-base">
          <thead className="border-b-2 border-[#b28341] bg-[#f8f8f6] text-[#061e30]">
            <tr>
              {bloco.cabecalho.map((cell) => (
                <th key={cell} scope="col" className="px-4 py-3 font-bold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bloco.linhas.map((row, index) => (
              <tr
                key={`${row[0]}-${index}`}
                className="border-b border-[#d9e0e5] odd:bg-white even:bg-[#fbfbfa]"
              >
                {row.map((cell, cellIndex) => (
                  <td key={`${cellIndex}-${cell}`} className="px-4 py-3 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (bloco.tipo === "markdown")
    return (
      <div className="space-y-5 text-[1.0625rem] leading-[1.8] text-[#263746] md:text-lg">
        {bloco.texto.split("\n\n").map((part, index) => {
          const lines = part.split("\n");
          if (part.startsWith("### "))
            return (
              <h3
                key={index}
                className="pt-3 font-[Georgia,serif] text-xl font-bold leading-tight text-[#061e30] md:text-[1.35rem]"
              >
                {part.slice(4)}
              </h3>
            );
          if (part.startsWith("## "))
            return (
              <h2
                key={index}
                className="pt-5 font-[Georgia,serif] text-[1.65rem] font-bold leading-tight text-[#061e30] md:text-[1.9rem]"
              >
                {part.slice(3)}
              </h2>
            );
          if (lines.every((line) => line.startsWith("- ") || line.startsWith("* ")))
            return (
              <ul key={index} className="list-disc space-y-3 pl-6 marker:text-[#b28341]">
                {lines.map((line) => (
                  <li key={line}>{inlineMarkdown(line.slice(2))}</li>
                ))}
              </ul>
            );
          if (lines.every((line) => line.startsWith("> ")))
            return (
              <blockquote
                key={index}
                className="relative border-l-4 border-[#b28341] py-3 pl-6 pr-4 font-[Georgia,serif] text-lg italic leading-relaxed text-[#102c43] md:text-xl"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-1 -top-4 bg-white px-1 font-serif text-5xl font-bold not-italic text-[#b28341]"
                >
                  “
                </span>
                {lines.map((line) => (
                  <span key={line} className="block">
                    {inlineMarkdown(line.replace(/^&gt; |^> /, ""))}
                  </span>
                ))}
              </blockquote>
            );
          return (
            <p key={index} className="whitespace-pre-line">
              {inlineMarkdown(part)}
            </p>
          );
        })}
      </div>
    );
  return (
    <p className="text-[1.0625rem] leading-[1.8] text-[#263746] md:text-lg">
      {inlineMarkdown(bloco.texto)}
    </p>
  );
}

function ShareActions({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const shareTo = (network: "linkedin" | "facebook" | "whatsapp" | "x") => {
    const currentUrl =
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
      window.location.href;
    const shareUrl =
      network === "linkedin"
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
        : network === "whatsapp"
          ? `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${currentUrl}`)}`
          : network === "facebook"
            ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
            : `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=640,height=520");
  };
  const copyLink = async () => {
    try {
      const canonicalUrl =
        document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ??
        window.location.href;
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div
      className="flex flex-wrap items-center gap-x-3 gap-y-2"
      aria-label="Compartilhar reportagem"
    >
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#102c43]">
        <Share2 className="size-[1.05rem] text-[#52616d]" aria-hidden /> Compartilhar:
      </span>
      <button
        type="button"
        onClick={() => shareTo("linkedin")}
        className="inline-flex size-8 items-center justify-center rounded-full text-[#0a66c2] transition hover:bg-[#f8f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b28341]"
        aria-label="Compartilhar no LinkedIn"
        title="LinkedIn"
      >
        <Linkedin className="size-[1.15rem]" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => shareTo("facebook")}
        className="inline-flex size-8 items-center justify-center rounded-full text-[#1877f2] transition hover:bg-[#f8f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b28341]"
        aria-label="Compartilhar no Facebook"
        title="Facebook"
      >
        <Facebook className="size-[1.15rem]" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => shareTo("whatsapp")}
        className="inline-flex size-8 items-center justify-center rounded-full text-[#25d366] transition hover:bg-[#f8f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b28341]"
        aria-label="Compartilhar no WhatsApp"
        title="WhatsApp"
      >
        <MessageCircle className="size-[1.15rem]" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => shareTo("x")}
        className="inline-flex size-8 items-center justify-center rounded-full text-[#061e30] transition hover:bg-[#f8f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b28341]"
        aria-label="Compartilhar no X"
        title="X"
      >
        <XIcon className="size-[1.05rem]" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => void copyLink()}
        className="inline-flex size-8 items-center justify-center rounded-full text-[#52616d] transition hover:bg-[#f8f8f6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b28341]"
        aria-label={copied ? "Link copiado" : "Copiar link canônico"}
        title={copied ? "Link copiado" : "Copiar link"}
      >
        <Link2 className="size-[1.1rem]" aria-hidden />
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Link copiado para a área de transferência." : ""}
      </span>
    </div>
  );
}

function ArticleByline({ noticia, readTime }: { noticia: NoticiaEditorial; readTime: number }) {
  const role = noticia.autoria === "Redação Banca Paulista" ? "Redação" : undefined;
  return (
    <div className="border-y border-[#d9e0e5] py-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-[#52616d]">
        <div className="flex min-w-40 items-center gap-2.5">
          <span
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#d9e0e5] bg-[#f8f8f6] text-[#91652b]"
            aria-label="Identidade editorial Banca Paulista"
          >
            <Building2 className="size-5" aria-hidden />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-bold text-[#152638]">{noticia.autoria}</span>
            {role ? <span className="mt-1 block text-xs text-[#52616d]">{role}</span> : null}
          </span>
        </div>
        <span className="hidden h-9 w-px bg-[#d9e0e5] md:block" aria-hidden="true" />
        <div className="inline-flex min-w-0 items-start gap-2">
          <CalendarDays className="mt-0.5 size-[1.1rem] shrink-0 text-[#b28341]" aria-hidden />
          <span>
            Publicado em{" "}
            <time dateTime={noticia.publicadoEm}>{formatDate(noticia.publicadoEm)}</time>
          </span>
        </div>
        <span className="hidden h-9 w-px bg-[#d9e0e5] md:block" aria-hidden="true" />
        <div className="inline-flex items-center gap-2 text-[#263746]">
          <Clock3 className="size-[1.1rem] shrink-0 text-[#b28341]" aria-hidden />
          <span>
            {readTime} min <span className="md:block">de leitura</span>
          </span>
        </div>
      </div>
      <div className="mt-3 border-t border-[#e5e9ec] pt-2.5">
        <ShareActions title={noticia.titulo} />
      </div>
    </div>
  );
}

function NewsCard({ item }: { item: NoticiaEditorial }) {
  return (
    <article className="min-w-0 border-t border-[#d9e0e5] pt-3">
      <Link
        to="/noticias/$slug"
        params={{ slug: item.slug }}
        className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-start gap-3"
      >
        <NewsImage
          image={item.imagem}
          className="aspect-[4/3] w-full object-cover"
          fallbackClassName="bg-[#f8f8f6] object-contain p-1.5"
        />
        <span className="min-w-0">
          <span className="block text-[0.62rem] font-bold uppercase leading-4 tracking-[0.06em] text-[#91652b]">
            {item.categoria}
          </span>
          <span className="mt-1 block font-[Georgia,serif] text-[0.9rem] font-bold leading-[1.22] text-[#061e30] group-hover:text-[#76501f]">
            {item.manchetesContextuais?.bairro ?? item.titulo}
          </span>
          <time
            dateTime={item.publicadoEm}
            className="mt-2 block text-[0.68rem] leading-4 text-[#52616d]"
          >
            {formatDate(item.publicadoEm)}
          </time>
        </span>
      </Link>
    </article>
  );
}

function RelatedNews({ noticia }: { noticia: NoticiaEditorial }) {
  const filters = relatedFilters(noticia);
  const generalItems = relatedItemsForNames(
    noticia,
    territoriesOf(noticia)
      .filter((relation) => relation.relacao !== "informativo")
      .map((relation) => relation.nome),
  );
  const [selectedFilter, setSelectedFilter] = useState(filters[0]?.key ?? "relacionadas");
  const active = filters.find((filter) => filter.key === selectedFilter);
  const items = active?.items ?? generalItems;
  if (!items.length) return null;
  return (
    <section
      className="border-t border-[#d8e0e5] py-7 md:py-9"
      aria-labelledby="mais-noticias-title"
    >
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#91652b]">
              Cobertura relacionada
            </p>
            <div className="mt-2 flex items-center gap-3">
              <h2
                id="mais-noticias-title"
                className="font-[Georgia,serif] text-2xl font-bold text-[#061e30] md:text-[1.75rem]"
              >
                Mais notícias da região
              </h2>
              <span className="h-px w-12 bg-[#b28341]" aria-hidden="true" />
            </div>
          </div>
          <ArrowRight className="mb-1 size-5 text-[#b28341]" aria-hidden />
        </div>
        {filters.length ? (
          <nav
            className="mt-5 flex flex-wrap gap-2 border-b border-[#d9e0e5]"
            aria-label="Filtrar notícias relacionadas"
          >
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                aria-pressed={selectedFilter === filter.key}
                onClick={() => setSelectedFilter(filter.key)}
                className={`border-b-2 px-3 py-2 text-sm font-semibold ${selectedFilter === filter.key ? "border-[#b28341] bg-[#f8f8f6] text-[#061e30]" : "border-transparent text-[#52616d] hover:text-[#061e30]"}`}
              >
                {filter.label}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={selectedFilter === "relacionadas"}
              onClick={() => setSelectedFilter("relacionadas")}
              className={`border-b-2 px-3 py-2 text-sm font-semibold ${selectedFilter === "relacionadas" ? "border-[#b28341] bg-[#f8f8f6] text-[#061e30]" : "border-transparent text-[#52616d] hover:text-[#061e30]"}`}
            >
              Relacionadas
            </button>
          </nav>
        ) : null}
        <div className="mt-5 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.slice(0, 4).map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ArticleSidebar({ noticia }: { noticia: NoticiaEditorial }) {
  const relations = territoriesOf(noticia).filter((relation) => relation.relacao !== "informativo");
  const available = relations
    .map((relation) => ({ relation, items: relatedItemsForNames(noticia, [relation.nome]) }))
    .filter(({ items }) => items.length > 0);
  const focus = available.find(({ relation }) => !/^zona\s/i.test(relation.nome)) ?? available[0];
  const focusDestination = focus ? territoryDestination(focus.relation.nome) : undefined;
  const articles = conteudos.filter((article) => article.status === "publicado").slice(0, 2);
  return (
    <aside className="space-y-8" aria-label="Conteúdo relacionado">
      <section
        className="border border-[#dfe4e8] bg-white p-2.5"
        aria-label="Espaço reservado para publicidade"
      >
        <p className="mb-2 text-[0.65rem] uppercase tracking-wide text-[#63717c]">Publicidade</p>
        <div className="flex aspect-[3/2] flex-col items-center justify-center border border-dashed border-[#c8d0d5] bg-[#f8f8f6] text-center text-sm text-[#52616d]">
          <span className="font-semibold text-[#263746]">Espaço reservado</span>
          <span className="mt-1 text-xs">Anúncios não exibidos</span>
        </div>
      </section>

      {focus ? (
        <section aria-labelledby="mais-sobre-title">
          <div className="flex items-end justify-between gap-2 border-b border-[#d9e0e5] pb-2">
            <div>
              <div className="mb-2 flex items-center gap-2" aria-hidden="true">
                <span className="h-px w-10 bg-[#b28341]" />
                <span className="h-px w-7 bg-[#061e30]" />
              </div>
              <h2
                id="mais-sobre-title"
                className="font-[Georgia,serif] text-xl font-bold leading-tight text-[#061e30]"
              >
                Mais sobre {focus.relation.nome}
              </h2>
            </div>
            {focusDestination ? (
              <a
                href={focusDestination.href}
                className="mb-1 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#102c43] hover:text-[#91652b]"
                aria-label={`Ver todas as notícias relacionadas a ${focus.relation.nome}`}
              >
                Ver todas <ArrowRight className="size-3.5 text-[#b28341]" aria-hidden />
              </a>
            ) : null}
          </div>
          <div className="divide-y divide-[#dfe4e8]">
            {focus.items.slice(0, 4).map((item) => (
              <article key={item.id} className="py-3.5 last:pb-0">
                <Link
                  to="/noticias/$slug"
                  params={{ slug: item.slug }}
                  className="group grid grid-cols-[5.25rem_minmax(0,1fr)] items-start gap-3"
                >
                  <NewsImage
                    image={item.imagem}
                    className="aspect-[4/3] w-full object-cover"
                    fallbackClassName="bg-[#f8f8f6] object-contain p-1.5"
                  />
                  <div className="min-w-0">
                    <p className="text-[0.64rem] font-bold uppercase leading-4 tracking-wide text-[#91652b]">
                      {item.categoria}
                    </p>
                    <h3 className="mt-1 font-[Georgia,serif] text-[0.9rem] font-bold leading-[1.24] text-[#102c43] group-hover:text-[#76501f]">
                      {item.manchetesContextuais?.bairro ?? item.titulo}
                    </h3>
                    <time
                      dateTime={item.publicadoEm}
                      className="mt-1.5 block text-[0.7rem] leading-4 text-[#52616d]"
                    >
                      {formatDate(item.publicadoEm)}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {articles.length ? (
        <section aria-labelledby="sidebar-articles-title">
          <div className="flex items-end justify-between border-b border-[#d9e0e5] pb-2">
            <div>
              <div className="mb-2 flex items-center gap-2" aria-hidden="true">
                <span className="h-px w-10 bg-[#b28341]" />
                <span className="h-px w-7 bg-[#061e30]" />
              </div>
              <h2
                id="sidebar-articles-title"
                className="font-[Georgia,serif] text-xl font-bold text-[#061e30]"
              >
                Artigos
              </h2>
            </div>
            <Link
              to="/artigos"
              className="text-xs font-semibold text-[#76501f] underline underline-offset-4"
            >
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-[#d9e0e5]">
            {articles.map((article) => (
              <article key={article.id} className="py-3 last:pb-0">
                <Link
                  to="/artigos/$slug"
                  params={{ slug: article.slug }}
                  className="group grid grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-3"
                >
                  <span className="flex size-12 items-center justify-center rounded-full border border-[#d9e0e5] bg-[#f8f8f6] text-[#91652b]">
                    <FileText className="size-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.62rem] font-bold uppercase tracking-wide text-[#91652b]">
                      {article.categoria}
                    </span>
                    <span className="mt-1 block font-[Georgia,serif] text-[0.95rem] font-bold leading-snug text-[#102c43] group-hover:text-[#76501f]">
                      {article.titulo}
                    </span>
                    <time
                      dateTime={article.publicadoEm}
                      className="mt-1.5 inline-flex items-center gap-1.5 text-[0.7rem] text-[#52616d]"
                    >
                      <CalendarDays className="size-3.5 text-[#91652b]" aria-hidden />
                      {formatDate(article.publicadoEm)}
                    </time>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="bg-[#061e30] p-5 text-white" aria-labelledby="newsletter-title">
        <div className="flex items-center gap-3">
          <Mail className="size-11 shrink-0 text-[#cca260]" strokeWidth={1.5} aria-hidden />
          <h2
            id="newsletter-title"
            className="font-[Georgia,serif] text-[1.3rem] font-bold leading-[1.12] text-white"
          >
            Acompanhe a Banca Paulista
          </h2>
        </div>
        <p className="mt-4 text-sm leading-[1.55] text-white/90">
          Novidades editoriais e informações relevantes sobre São Paulo.
        </p>
        <div className="mt-4 space-y-2.5">
          <label htmlFor="newsletter-email-unavailable" className="sr-only">
            E-mail para newsletter
          </label>
          <input
            id="newsletter-email-unavailable"
            type="email"
            placeholder="Seu melhor e-mail"
            disabled
            className="min-h-11 w-full border border-[#d9e0e5] bg-white px-3 text-sm text-[#263746] placeholder:text-[#657580] disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            className="min-h-11 w-full border border-[#b28341] bg-[#cca260] px-4 text-sm font-bold text-[#061e30] disabled:cursor-not-allowed"
          >
            Inscrições em breve
          </button>
        </div>
        <p className="mt-3 text-[0.7rem] leading-[1.45] text-white/75">
          A integração de inscrições ainda não está disponível; nenhum e-mail é coletado.
        </p>
      </section>
    </aside>
  );
}

export function NewsArticlePage({ noticia }: { noticia: NoticiaEditorial }) {
  const readTime = readingMinutes(noticia);
  const displayedRelations = territoriesOf(noticia);
  return (
    <div className="bg-white text-[#152638]">
      <Container className="pt-5 md:pt-7">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs leading-5 text-[#52616d] md:text-sm">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link to="/" className="hover:text-[#76501f]">
                Início
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link to="/noticias" className="hover:text-[#76501f]">
                Notícias
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="font-medium text-[#102c43]" aria-current="page">
              {noticia.titulo}
            </li>
          </ol>
        </nav>
        <div className="grid items-start gap-8 min-[900px]:grid-cols-[minmax(0,2fr)_minmax(17rem,0.92fr)] min-[900px]:gap-7 xl:gap-8">
          <article className="min-w-0" aria-labelledby="news-article-title">
            <p className="text-xs font-bold uppercase tracking-[0.11em] text-[#91652b] md:text-sm">
              {noticia.categoria}
            </p>
            <h1
              id="news-article-title"
              className="mt-3 max-w-4xl font-[Georgia,serif] text-[1.9rem] font-bold leading-[1.08] tracking-[-0.02em] text-[#061e30] sm:text-[2.1rem] min-[900px]:text-[2.25rem] xl:text-[2.7rem]"
            >
              {noticia.titulo}
            </h1>
            <p className="mt-4 max-w-4xl font-[Georgia,serif] text-lg leading-[1.45] text-[#263746] sm:text-xl xl:text-[1.35rem]">
              {noticia.resumo}
            </p>
            <div className="mt-5">
              <ArticleByline noticia={noticia} readTime={readTime} />
            </div>
            <figure className="mt-2">
              <NewsImage
                image={noticia.imagem}
                loading="eager"
                fetchPriority="high"
                className="aspect-[16/9] w-full object-cover"
              />
              {noticia.imagem?.caption ? (
                <figcaption className="mt-2 border-l-2 border-[#b28341] pl-3 text-xs leading-5 text-[#52616d]">
                  {noticia.imagem.caption}
                </figcaption>
              ) : null}
            </figure>
            <div className="mt-7 space-y-5">
              {noticia.blocos.map((bloco, index) => (
                <NoticiaBlocoView key={`${bloco.tipo}-${index}`} bloco={bloco} />
              ))}
            </div>
            <footer className="mt-9 border-t border-[#d9e0e5] pt-5">
              {noticia.notas.length ? (
                <div className="mb-6 space-y-2 text-sm leading-6 text-[#475569]">
                  {noticia.notas.map((nota) => (
                    <p key={nota}>{nota}</p>
                  ))}
                </div>
              ) : null}
              {noticia.fontes?.length ? (
                <section
                  className="border-l-4 border-[#b28341] bg-[#f8f8f6] p-4 md:p-5"
                  aria-labelledby="sources-title"
                >
                  <h2
                    id="sources-title"
                    className="flex items-center gap-2 font-[Georgia,serif] text-xl font-bold text-[#061e30]"
                  >
                    <FileText className="size-5 text-[#91652b]" aria-hidden /> Fontes consultadas
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[#40515f]">
                    {noticia.fontes.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-[#b28341]/60 underline-offset-4 hover:text-[#76501f]"
                        >
                          {source.titulo}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {noticia.tags?.length ? (
                <div className="mt-6">
                  <h2 className="text-xs font-bold uppercase tracking-wide text-[#102c43]">
                    Temas relacionados
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {noticia.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-[#d5dde2] bg-white px-2.5 py-1 text-xs text-[#40515f]"
                      >
                        {tag.replaceAll("-", " ")}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {displayedRelations.length ? (
                <div className="mt-6 border-t border-[#d9e0e5] pt-4">
                  <h2 className="text-xs font-bold uppercase tracking-wide text-[#102c43]">
                    Relacionamentos editoriais
                  </h2>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {displayedRelations.map((relation, index) => (
                      <li
                        key={`${relation.nome}-${index}`}
                        className="inline-flex items-center gap-1.5 border border-[#d5dde2] px-2.5 py-1 text-xs text-[#40515f]"
                      >
                        {relation.nome}
                        {relation.relacao === "regional" ? (
                          <span className="text-[#91652b]">· regional</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </footer>
          </article>
          <div className="min-w-0">
            <ArticleSidebar noticia={noticia} />
          </div>
        </div>
      </Container>
      <RelatedNews noticia={noticia} />
      <Container className="pb-10">
        <Link
          to="/noticias"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#102c43] underline decoration-[#b28341] underline-offset-4 hover:text-[#76501f]"
        >
          <Link2 className="size-4" aria-hidden /> Voltar para Notícias
        </Link>
      </Container>
    </div>
  );
}
