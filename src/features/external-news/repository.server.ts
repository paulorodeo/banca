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
    const byUrl = new Map(current.map((item) => [item.originalUrl, item]));
    const byGuid = new Map(current.map((item) => [item.originalGuid, item]));
    let inserted = 0;
    let duplicates = 0;
    let changed = false;
    for (const item of items) {
      if (item.sourceId !== sourceId) {
        duplicates++;
        continue;
      }
      const existing = byUrl.get(item.originalUrl) ?? byGuid.get(item.originalGuid);
      if (existing) {
        duplicates++;
        const manualDecision = existing.approvalMethod === "manual";
        const merged: ExternalNewsItem = {
          ...item,
          id: existing.id,
          collectedAt: existing.collectedAt,
          ...(manualDecision
            ? {
                publicationStatus: existing.publicationStatus,
                rightsStatus: existing.rightsStatus,
                approvalMethod: existing.approvalMethod,
              }
            : {}),
        };
        if (JSON.stringify(existing) !== JSON.stringify(merged)) {
          current[current.indexOf(existing)] = merged;
          changed = true;
        }
        continue;
      }
      current.push(item);
      byUrl.set(item.originalUrl, item);
      byGuid.set(item.originalGuid, item);
      inserted++;
      changed = true;
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
    const existingSerialized = JSON.stringify(current);
    if (changed || existingSerialized !== serialized)
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
    const previous = await this.getReport(report.sourceId);
    const sameOutcome =
      previous &&
      previous.error === report.error &&
      previous.received === report.received &&
      previous.rejected === report.rejected &&
      previous.duplicates === report.duplicates &&
      previous.approved === report.approved;
    if (
      sameOutcome &&
      report.error &&
      Date.parse(report.completedAt) - Date.parse(previous.completedAt) < 6 * 60 * 60_000
    )
      return;
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
      const existing = current.find(
        (old) => old.originalUrl === item.originalUrl || old.originalGuid === item.originalGuid,
      );
      if (item.sourceId !== sourceId) {
        duplicates++;
        continue;
      }
      if (existing) {
        duplicates++;
        this.items.set(existing.id, {
          ...item,
          id: existing.id,
          collectedAt: existing.collectedAt,
          ...(existing.approvalMethod === "manual"
            ? {
                publicationStatus: existing.publicationStatus,
                rightsStatus: existing.rightsStatus,
                approvalMethod: existing.approvalMethod,
              }
            : {}),
        });
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
