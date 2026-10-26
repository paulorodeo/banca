import { normalizeFeed } from "./normalizer";
import type { ExternalNewsRepository } from "./repository.server";
import type { FeedSource, FeedSyncReport } from "./types";
import type { Fetcher } from "@/lib/fetcher";

const MAX_BYTES = 1_200_000;
const REDIRECTS = new Set([301, 302, 303, 307, 308]);

function safeFeedUrl(value: string, source: FeedSource) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("feed_url_invalid");
  }
  const hostAllowed = source.allowedHosts.includes(url.hostname);
  if (
    !hostAllowed ||
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    url.hostname.endsWith(".local") ||
    url.hostname === "localhost"
  )
    throw new Error("feed_host_not_allowed");
  if (/^(?:127\.|10\.|192\.168\.|169\.254\.|0\.|::1$|fc|fd|fe80)/i.test(url.hostname))
    throw new Error("feed_private_host_forbidden");
  return url;
}

async function boundedBody(response: Response) {
  const declared = Number(response.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BYTES) throw new Error("feed_too_large");
  if (!response.body) throw new Error("feed_empty");
  const reader = response.body.getReader();
  const contentType = response.headers.get("content-type") ?? "";
  const declaredCharset = /charset\s*=\s*["']?([^;"'\s]+)/i.exec(contentType)?.[1]?.toLowerCase();
  const charset = ["utf-8", "utf8", "iso-8859-1", "latin1", "windows-1252", "us-ascii"].includes(
    declaredCharset ?? "",
  )
    ? declaredCharset!
    : "utf-8";
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BYTES) throw new Error("feed_too_large");
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return new TextDecoder(charset, { fatal: false }).decode(bytes).replace(/^\uFEFF/, "");
  } finally {
    reader.releaseLock();
  }
}

async function fetchFeed(source: FeedSource, fetcher: Fetcher) {
  let url = safeFeedUrl(source.feedUrl, source);
  for (let redirects = 0; redirects <= 2; redirects++) {
    const response = await fetcher(url, {
      headers: {
        Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9",
      },
      credentials: "omit",
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(8_000),
    });
    if (REDIRECTS.has(response.status)) {
      if (redirects === 2) throw new Error("feed_redirect_limit");
      const location = response.headers.get("location");
      if (!location) throw new Error("feed_redirect_without_location");
      url = safeFeedUrl(new URL(location, url).toString(), source);
      continue;
    }
    if (!response.ok) throw new Error(`feed_http_${response.status}`);
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    if (!/(?:xml|rss|atom)/.test(contentType)) throw new Error("feed_content_type_invalid");
    return boundedBody(response);
  }
  throw new Error("feed_redirect_limit");
}

export async function syncExternalFeed(
  source: FeedSource,
  repository: ExternalNewsRepository,
  fetcher: Fetcher = fetch,
): Promise<FeedSyncReport> {
  const startedAt = new Date().toISOString();
  const base: FeedSyncReport = {
    sourceId: source.id,
    startedAt,
    completedAt: startedAt,
    received: 0,
    rejected: 0,
    duplicates: 0,
    approved: 0,
    error: null,
  };
  if (source.status !== "enabled") {
    const report = {
      ...base,
      completedAt: new Date().toISOString(),
      error: "feed_source_not_enabled",
    };
    await repository.writeReport(report);
    return report;
  }
  const previous = await repository.getReport?.(source.id);
  if (
    previous &&
    !previous.error &&
    Date.now() - Date.parse(previous.completedAt) < source.frequencyMinutes * 60_000
  )
    return previous;
  try {
    const xml = await fetchFeed(source, fetcher);
    const normalized = normalizeFeed(xml, source);
    const stored = await repository.writeItems(source.id, normalized.items);
    const report = {
      ...base,
      completedAt: new Date().toISOString(),
      received: normalized.received,
      rejected: normalized.rejected,
      duplicates: stored.duplicates,
      approved: 0,
    };
    await repository.writeReport(report);
    return report;
  } catch (error) {
    const report = {
      ...base,
      completedAt: new Date().toISOString(),
      error: error instanceof Error ? error.message.slice(0, 100) : "feed_unknown_error",
    };
    await repository.writeReport(report);
    return report;
  }
}

/** Scheduler entry point; bounded parallelism, not called from public page requests. */
export async function syncEnabledExternalFeeds(
  sources: readonly FeedSource[],
  repository: ExternalNewsRepository,
  fetcher: Fetcher = fetch,
) {
  const enabled = sources.filter((source) => source.status === "enabled");
  const reports: FeedSyncReport[] = [];
  for (let i = 0; i < enabled.length; i += 3) {
    reports.push(
      ...(await Promise.all(
        enabled.slice(i, i + 3).map((source) => syncExternalFeed(source, repository, fetcher)),
      )),
    );
  }
  return reports;
}
