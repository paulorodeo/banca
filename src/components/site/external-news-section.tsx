import { useEffect, useState } from "react";
import { readExternalNews } from "@/features/external-news/external-news.functions";
import type {
  ExternalNewsQuery,
  ExternalNewsCardItem,
} from "@/features/external-news/query.server";
import { Container, Section } from "./primitives";
import { ExternalNewsCard } from "./external-news-card";

/** Only approved, rights-cleared references are rendered; excerpts and third-party images are omitted. */
export function ExternalNewsSection({
  query,
  title = "Fontes externas",
}: {
  query: ExternalNewsQuery;
  title?: string;
}) {
  const [items, setItems] = useState<ExternalNewsCardItem[]>([]);
  const { layer, regionCode, stateCode, limit } = query;
  useEffect(() => {
    let active = true;
    setItems([]);
    void readExternalNews({
      data: { layer, regionCode, stateCode, limit },
    }).then((result) => {
      if (active) setItems(result);
    });
    return () => {
      active = false;
    };
  }, [layer, regionCode, stateCode, limit]);
  if (!items.length) return null;
  return (
    <Section className="border-b border-border bg-card">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          Referências editoriais
        </p>
        <h2 className="mt-3 font-serif text-3xl text-brand-navy">{title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <ExternalNewsCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
