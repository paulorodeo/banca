import { Link } from "@tanstack/react-router";
import { noticias } from "@/content/local/noticias";
import { NewsImage } from "./news-image";
import { Container, Section } from "./primitives";

type HeadlineContext = "zona" | "bairro" | "instituicao";

const normalized = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

function formatDate(value: string) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("pt-BR", { dateStyle: "long", timeZone: "UTC" });
}

export function ContextualNewsSection({
  contexts,
  headlineContext,
}: {
  contexts: string[];
  headlineContext: HeadlineContext;
}) {
  const names = new Set(contexts.map(normalized));
  const items = noticias
    .filter(
      (noticia) =>
        Array.isArray(noticia.relacionamentos) &&
        noticia.relacionamentos.some((relation) => names.has(normalized(relation.nome))),
    )
    .sort((a, b) => b.publicadoEm.localeCompare(a.publicadoEm))
    .slice(0, 12);

  if (!items.length) return null;
  const [featured, ...remaining] = items;
  const secondary = remaining.slice(0, 2);
  const compact = remaining.slice(2);
  const title = (item: (typeof noticias)[number]) => item.manchetesContextuais?.[headlineContext] ?? item.titulo;

  return (
    <Section className="border-b border-border bg-card">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Cobertura relacionada</p>
        <h2 className="mt-3 font-serif text-4xl text-brand-navy">Notícias no contexto desta página</h2>
        <article className="mt-8 overflow-hidden rounded-xl border border-border bg-background md:grid md:grid-cols-[1.1fr_0.9fr]">
          <NewsImage image={featured.imagem} className="aspect-[16/9] size-full object-cover" />
          <div className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{featured.categoria}</p>
            <h3 className="mt-3 font-serif text-3xl text-brand-navy">{title(featured)}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{featured.resumo}</p>
            <p className="mt-5 text-xs text-muted-foreground">{formatDate(featured.publicadoEm)}</p>
            <Link to="/noticias/$slug" params={{ slug: featured.slug }} className="mt-5 inline-flex text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4">Ler reportagem completa</Link>
          </div>
        </article>
        {secondary.length ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {secondary.map((item) => <NewsCard key={item.id} item={item} title={title(item)} />)}
          </div>
        ) : null}
        {compact.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {compact.map((item) => <NewsCard key={item.id} item={item} title={title(item)} compact />)}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

function NewsCard({ item, title, compact = false }: { item: (typeof noticias)[number]; title: string; compact?: boolean }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-background">
      <NewsImage image={item.imagem} className={compact ? "aspect-[16/9] w-full object-cover" : "aspect-[16/9] w-full object-cover"} />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{item.categoria}</p>
        <h3 className="mt-3 font-serif text-2xl text-brand-navy">{title}</h3>
        <p className="mt-4 text-xs text-muted-foreground">{formatDate(item.publicadoEm)}</p>
        <Link to="/noticias/$slug" params={{ slug: item.slug }} className="mt-4 inline-flex text-sm font-semibold text-brand-navy underline decoration-gold underline-offset-4">Ler reportagem completa</Link>
      </div>
    </article>
  );
}
