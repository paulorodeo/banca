export type AtlasRoadSegment = {
  id: string;
  uf: string;
  segmentType: string;
  path: string;
  sourceVertices: number;
  renderedVertices: number;
  operator?: string;
};

export type AtlasRoad = {
  code: string;
  ufs: string[];
  segments: AtlasRoadSegment[];
  operators?: string[];
};

export type AtlasRoadDataset = {
  id?: string;
  title?: string;
  scope?: string;
  source: string;
  distributor?: string;
  version: string;
  sourceUrl: string;
  extractedAt?: string;
  accessedAt?: string;
  crs: string;
  attribution: string;
  license?: string;
  termsUrl?: string;
  ownerAuthorization?: string;
  relationshipNote?: string;
  rightsStatus: "pending" | "approved";
  productionEligible: boolean;
  projection?: {
    name: string;
    description?: string;
    xScale: number;
    xOffset: number;
    yScale: number;
    yOffset: number;
    maxUfBoundsResidualPx?: number;
  };
  sources?: Array<{
    name: string;
    resourceId: string;
    url: string;
    updatedAt?: string;
    sha256: string;
    license: string;
  }>;
  tabularSummary?: {
    worksheet: string;
    recordCount: number;
    distinctRoadLabels: number;
    jurisdictionCounts: Record<string, number>;
    administrationCounts: Record<string, number>;
    concessionCounts: Record<string, number>;
    coordinateNote: string;
  };
  roads: AtlasRoad[];
  counts: {
    routes?: number;
    segments: number;
    sourceVertices: number;
    renderedVertices: number;
    operators?: number;
  };
};
