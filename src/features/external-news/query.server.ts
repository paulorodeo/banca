import type { ExternalNewsRepository } from "./repository.server";
import { feedSourceById } from "./sources";
import type { AtlasLayer } from "@/content/atlas.functions";
import type { ExternalNewsItem } from "./types";
import { canonicalExternalUrl } from "./normalizer";

export type ExternalNewsQuery = {
  layer?: AtlasLayer;
  regionCode?: string;
  stateCode?: string;
  limit?: number;
};

export async function queryExternalNews(
  repository: ExternalNewsRepository | null,
  query: ExternalNewsQuery = {},
  sources: ReadonlyMap<string, import("./types").FeedSource> = feedSourceById,
) {
  if (!repository) return [];
  const state = query.stateCode?.toUpperCase();
  const region = query.regionCode?.toUpperCase();
  const now = Date.now();
  const eligibleSources = [...sources.values()].filter(
    (source) => source.status === "enabled" && source.rightsStatus === "approved",
  );
  if (!eligibleSources.length) return [];
  const items = await repository.listItems(eligibleSources.map((source) => source.id));
  const eligible = items
    .filter((item) => {
      const source = sources.get(item.sourceId);
      if (!source || source.status !== "enabled" || source.rightsStatus !== "approved")
        return false;
      if (item.publicationStatus !== "approved" || item.rightsStatus !== "approved") return false;
      if (
        !item.title ||
        item.title.length > 240 ||
        canonicalExternalUrl(item.originalUrl, source) !== item.originalUrl
      )
        return false;
      if (
        !item.publishedAt ||
        !Number.isFinite(Date.parse(item.publishedAt)) ||
        now - Date.parse(item.publishedAt) > 7 * 86_400_000
      )
        return false;
      if (query.layer && query.layer !== "noticias" && !item.subjectTags.includes(query.layer))
        return false;
      if (state && !item.stateCodes.includes(state)) return false;
      if (region && !item.regionCodes.includes(region)) return false;
      if (!state && !region && item.geographicScope !== "national") return false;
      return true;
    })
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  const seenUrls = new Set<string>();
  return eligible
    .filter((item) => {
      if (seenUrls.has(item.originalUrl)) return false;
      seenUrls.add(item.originalUrl);
      return true;
    })
    .slice(0, Math.min(12, Math.max(1, query.limit ?? 6)))
    .map(({ id, sourceId, title, originalUrl, publishedAt }) => ({
      id,
      sourceId,
      sourceName: sources.get(sourceId)!.name,
      title,
      originalUrl,
      publishedAt,
    }));
}

export type ExternalNewsCardItem = Awaited<ReturnType<typeof queryExternalNews>>[number];
export type ExternalNewsItemForReview = ExternalNewsItem;
