import type { AtlasRoadDataset } from "./atlas-roads.types";

export const ATLAS_ROAD_DATA_SOURCES = [
  { path: "/data/atlas-roads-snv-202201b.json", id: "dnit-snv-202201b" },
  { path: "/data/atlas-roads-artesp-sp.json", id: "artesp-sp-concession-roads" },
] as const;

export type AtlasRoadDatasetLoadStatus = "idle" | "loading" | "ready" | "error";

export type AtlasRoadDatasetLoadHandlers = {
  setDatasets: (datasets: AtlasRoadDataset[]) => void;
  setError: (message: string | null) => void;
  setStatus: (status: AtlasRoadDatasetLoadStatus) => void;
};

export type AtlasRoadFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export function startAtlasRoadDatasetLoad(
  fetcher: AtlasRoadFetch,
  handlers: AtlasRoadDatasetLoadHandlers,
) {
  const controller = new AbortController();
  let active = true;

  handlers.setError(null);
  handlers.setStatus("loading");

  const completion = Promise.all(
    ATLAS_ROAD_DATA_SOURCES.map(async ({ path, id }) => {
      const response = await fetcher(path, {
        headers: { accept: "application/json" },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);

      const data: unknown = await response.json();
      if (!isApprovedRoadDataset(data, id))
        throw new Error(`${path}: dados ausentes, inválidos ou sem aprovação de publicação`);
      return data;
    }),
  )
    .then((datasets) => {
      if (!active) return;
      handlers.setDatasets(datasets);
      handlers.setStatus("ready");
    })
    .catch((error: unknown) => {
      if (!active) return;
      const message = error instanceof Error ? error.message : "falha desconhecida";
      handlers.setError(message);
      handlers.setStatus("error");
    });

  return {
    completion,
    cancel() {
      active = false;
      controller.abort();
    },
  };
}

function isApprovedRoadDataset(value: unknown, expectedId: string): value is AtlasRoadDataset {
  if (!isRecord(value)) return false;
  if (
    value["id"] !== expectedId ||
    value["productionEligible"] !== true ||
    value["rightsStatus"] !== "approved" ||
    typeof value["attribution"] !== "string" ||
    !value["attribution"].trim() ||
    !Array.isArray(value["roads"]) ||
    value["roads"].length === 0
  )
    return false;

  return value["roads"].every((road) => {
    if (!isRecord(road) || typeof road["code"] !== "string" || !Array.isArray(road["segments"]))
      return false;
    if (road["segments"].length === 0) return false;
    return road["segments"].every(
      (segment) =>
        isRecord(segment) &&
        typeof segment["uf"] === "string" &&
        typeof segment["path"] === "string" &&
        /^M-?\d+(?:\.\d+)? -?\d+(?:\.\d+)?L/.test(segment["path"]),
    );
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
