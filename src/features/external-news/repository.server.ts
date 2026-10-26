import type { ExternalNewsItem, FeedSyncReport } from "./types";

export type ExternalNewsRepository = {
  listItems(sourceIds?: readonly string[]): Promise<ExternalNewsItem[]>;
  writeItems(
    sourceId: string,
    items: ExternalNewsItem[],
  ): Promise<{ inserted: number; duplicates: number }>;
  updateItem(item: ExternalNewsItem): Promise<void>;
  removeItem(sourceId: string, id: string): Promise<void>;
  writeReport(report: FeedSyncReport): Promise<void>;
  getReport?(sourceId: string): Promise<FeedSyncReport | null>;
};

export type ExternalNewsKv = {
  get<T = string>(key: string, type?: "text" | "json"): Promise<T | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete?(key: string): Promise<void>;
  list(options?: {
    prefix?: string;
    limit?: number;
    cursor?: string;
  }): Promise<{ keys: { name: string }[]; list_complete: boolean; cursor?: string }>;
};

const SOURCE_PREFIX = "external-news:source:v1:";
const REPORT_PREFIX = "external-news:report:v1:";

export class KvExternalNewsRepository implements ExternalNewsRepository {
  constructor(private readonly kv: ExternalNewsKv) {}
  async listItems(sourceIds?: readonly string[]) {
    const ids = sourceIds ?? [];
    const groups = await Promise.all(
      ids.map((sourceId) => this.kv.get<ExternalNewsItem[]>(`${SOURCE_PREFIX}${sourceId}`, "json")),
    );
    return groups.flatMap((items) => (Array.isArray(items) ? items.slice(0, 500) : []));
  }
  async writeItems(sourceId: string, items: ExternalNewsItem[]) {
    const current = await this.listItems([sourceId]);
    const urls = new Set(current.map((item) => item.originalUrl));
    const guids = new Set(current.map((item) => item.originalGuid));
    let inserted = 0;
    let duplicates = 0;
    for (const item of items) {
      if (
        item.sourceId !== sourceId ||
        urls.has(item.originalUrl) ||
        guids.has(item.originalGuid)
      ) {
        duplicates++;
        continue;
      }
      current.push(item);
      urls.add(item.originalUrl);
      guids.add(item.originalGuid);
      inserted++;
    }
    const cutoff = Date.now() - 14 * 86_400_000;
    const recent = current.filter(
      (item) => item.publishedAt && Date.parse(item.publishedAt) >= cutoff,
    );
    recent.sort((a, b) => {
      const approvedA = a.publicationStatus === "approved" && a.rightsStatus === "approved";
      const approvedB = b.publicationStatus === "approved" && b.rightsStatus === "approved";
      return (
        Number(approvedB) - Number(approvedA) ||
        (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
      );
    });
    const serialized = JSON.stringify(recent.slice(0, 500));
    if (serialized.length > 2_000_000) throw new Error("external_news_source_snapshot_too_large");
    await this.kv.put(`${SOURCE_PREFIX}${sourceId}`, serialized);
    return { inserted, duplicates };
  }
  async updateItem(item: ExternalNewsItem) {
    const items = await this.listItems([item.sourceId]);
    const index = items.findIndex((entry) => entry.id === item.id);
    if (index < 0) return;
    items[index] = item;
    await this.kv.put(`${SOURCE_PREFIX}${item.sourceId}`, JSON.stringify(items));
  }
  async removeItem(sourceId: string, id: string) {
    const items = await this.listItems([sourceId]);
    await this.kv.put(
      `${SOURCE_PREFIX}${sourceId}`,
      JSON.stringify(items.filter((item) => item.id !== id)),
    );
  }
  async writeReport(report: FeedSyncReport) {
    await this.kv.put(`${REPORT_PREFIX}${report.sourceId}`, JSON.stringify(report));
  }
  async getReport(sourceId: string) {
    return this.kv.get<FeedSyncReport>(`${REPORT_PREFIX}${sourceId}`, "json");
  }
}

/** Test/local repository; process memory only and never a production persistence claim. */
export class MemoryExternalNewsRepository implements ExternalNewsRepository {
  readonly items = new Map<string, ExternalNewsItem>();
  readonly reports = new Map<string, FeedSyncReport>();
  async listItems(sourceIds?: readonly string[]) {
    return [...this.items.values()].filter(
      (item) => !sourceIds || sourceIds.includes(item.sourceId),
    );
  }
  async writeItems(sourceId: string, items: ExternalNewsItem[]) {
    let inserted = 0;
    let duplicates = 0;
    const current = await this.listItems([sourceId]);
    for (const item of items) {
      if (
        item.sourceId !== sourceId ||
        current.some(
          (old) => old.originalUrl === item.originalUrl || old.originalGuid === item.originalGuid,
        )
      ) {
        duplicates++;
        continue;
      }
      this.items.set(item.id, item);
      current.push(item);
      inserted++;
    }
    return { inserted, duplicates };
  }
  async updateItem(item: ExternalNewsItem) {
    this.items.set(item.id, item);
  }
  async removeItem(_sourceId: string, id: string) {
    this.items.delete(id);
  }
  async writeReport(report: FeedSyncReport) {
    this.reports.set(report.sourceId, report);
  }
  async getReport(sourceId: string) {
    return this.reports.get(sourceId) ?? null;
  }
}
