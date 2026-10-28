import type { ExternalNewsCardItem } from "@/features/external-news/query.server";

function formatDate(value: string | null) {
  if (!value) return "Data não informada";
  return new Date(value).toLocaleDateString("pt-BR", { dateStyle: "long", timeZone: "UTC" });
}

export function ExternalNewsCard({
  item,
  compact = false,
}: {
  item: ExternalNewsCardItem;
  compact?: boolean;
}) {
  return (
    <article className={`external-news-card${compact ? " is-compact" : ""}`}>
      <p>Fonte externa · {item.sourceName}</p>
      <h3>{item.title}</h3>
      <time dateTime={item.publishedAt ?? undefined}>{formatDate(item.publishedAt)}</time>
      {/* noreferrer is intentional: the publisher link does not need the reader's origin URL. */}
      <a href={item.originalUrl} target="_blank" rel="noopener noreferrer">
        Abrir no veículo de origem
      </a>
    </article>
  );
}
