export type ExternalNewsStatus = "pending" | "approved" | "rejected" | "expired" | "disabled";
export type FeedSourceStatus = "enabled" | "validation" | "disabled";
export type FeedRightsStatus = "approved" | "pending" | "restricted";
export type GeographicScope = "national" | "regional" | "state" | "municipal" | "unknown";

export type ExternalNewsItem = {
  id: string;
  sourceId: string;
  title: string;
  originalUrl: string;
  originalGuid: string;
  publishedAt: string | null;
  updatedAt: string | null;
  collectedAt: string;
  language: string | null;
  subjectTags: string[];
  geographicScope: GeographicScope;
  regionCodes: string[];
  stateCodes: string[];
  cityIds: string[];
  neighborhoodIds: string[];
  institutionIds: string[];
  agencyIds: string[];
  highwayIds: string[];
  originalEditorialNote: string;
  publicationStatus: ExternalNewsStatus;
  rightsStatus: FeedRightsStatus;
};

export type FeedSource = {
  id: string;
  name: string;
  feedUrl: string;
  siteUrl: string;
  allowedHosts: string[];
  status: FeedSourceStatus;
  frequencyMinutes: number;
  allowedCategories: string[];
  categoryMap: Record<string, string>;
  defaultCategory?: string;
  rightsStatus: FeedRightsStatus;
  rightsPolicy: string;
  publicationNote: string;
  lastSync: string | null;
  lastError: string | null;
};

export type FeedSyncReport = {
  sourceId: string;
  startedAt: string;
  completedAt: string;
  received: number;
  rejected: number;
  duplicates: number;
  approved: number;
  error: string | null;
};
