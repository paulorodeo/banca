export type AtlasRoadSegment = {
  id: string;
  uf: string;
  segmentType: string;
  path: string;
  sourceVertices: number;
  renderedVertices: number;
};

export type AtlasRoad = {
  code: `BR-${string}`;
  ufs: string[];
  segments: AtlasRoadSegment[];
};

export type AtlasRoadDataset = {
  source: string;
  distributor: string;
  version: string;
  sourceUrl: string;
  extractedAt: string;
  crs: string;
  attribution: string;
  rightsStatus: "pending" | "approved";
  productionEligible: boolean;
  projection: {
    name: string;
    description: string;
    xScale: number;
    xOffset: number;
    yScale: number;
    yOffset: number;
    maxUfBoundsResidualPx: number;
  };
  roads: AtlasRoad[];
  counts: {
    segments: number;
    sourceVertices: number;
    renderedVertices: number;
  };
};
