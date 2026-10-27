import { describe, expect, it } from "bun:test";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { startAtlasRoadDatasetLoad, type AtlasRoadFetch } from "./atlas-roads-loader";
import type { AtlasRoadDataset } from "./atlas-roads.types";

const dataDir = resolve(import.meta.dirname, "../../../public/data");
const componentPath = resolve(
  import.meta.dirname,
  "../../components/site/brazil-editorial-atlas.tsx",
);

async function publicDatasets() {
  return await Promise.all(
    ["atlas-roads-snv-202201b.json", "atlas-roads-artesp-sp.json"].map(async (file) =>
      JSON.parse(await readFile(resolve(dataDir, file), "utf8")),
    ),
  );
}

describe("carregamento da camada Rodovias", () => {
  it("selecionar Rodovias percorre idle → loading → ready ao receber os dois JSON", async () => {
    const datasets = await publicDatasets();
    const statuses = ["idle"];
    const loaded: AtlasRoadDataset[][] = [];
    const errors: Array<string | null> = [];
    const requested: string[] = [];
    const fetcher: AtlasRoadFetch = async (input) => {
      const path = String(input);
      requested.push(path);
      const index = path.includes("snv-202201b") ? 0 : 1;
      return new Response(JSON.stringify(datasets[index]), { status: 200 });
    };

    const request = startAtlasRoadDatasetLoad(fetcher, {
      setDatasets: (items) => loaded.push(items),
      setError: (message) => errors.push(message),
      setStatus: (status) => statuses.push(status),
    });
    expect(statuses).toEqual(["idle", "loading"]);
    await request.completion;

    expect(statuses).toEqual(["idle", "loading", "ready"]);
    expect(errors).toEqual([null]);
    expect(requested).toHaveLength(2);
    expect(loaded[0]?.map((item) => item.id)).toEqual([
      "dnit-snv-202201b",
      "artesp-sp-concession-roads",
    ]);
    expect(loaded[0]?.flatMap((item) => item.roads).length).toBeGreaterThan(0);
  });

  it("mostra erro e permite uma nova tentativa após falha de um dos arquivos", async () => {
    const datasets = await publicDatasets();
    const statuses: string[] = [];
    const errors: Array<string | null> = [];
    let artespAttempts = 0;
    const fetcher: AtlasRoadFetch = async (input) => {
      const path = String(input);
      if (path.includes("artesp")) {
        artespAttempts += 1;
        if (artespAttempts === 1) return new Response("", { status: 503 });
        return new Response(JSON.stringify(datasets[1]), { status: 200 });
      }
      return new Response(JSON.stringify(datasets[0]), { status: 200 });
    };
    const handlers = {
      setDatasets: (_items: AtlasRoadDataset[]) => {},
      setError: (message: string | null) => errors.push(message),
      setStatus: (status: string) => statuses.push(status),
    };

    await startAtlasRoadDatasetLoad(fetcher, handlers).completion;
    await startAtlasRoadDatasetLoad(fetcher, handlers).completion;

    expect(statuses).toEqual(["loading", "error", "loading", "ready"]);
    expect(errors).toEqual([null, "/data/atlas-roads-artesp-sp.json: HTTP 503", null]);
  });

  it("ignora a resposta quando a camada é abandonada e cancela as requisições", async () => {
    const datasets = await publicDatasets();
    const statuses: string[] = [];
    const loaded: AtlasRoadDataset[][] = [];
    const fetcher: AtlasRoadFetch = async (input, init) => {
      await new Promise<void>((resolvePromise) => setTimeout(resolvePromise, 20));
      if (init?.signal?.aborted) throw new DOMException("Aborted", "AbortError");
      const index = String(input).includes("snv-202201b") ? 0 : 1;
      return new Response(JSON.stringify(datasets[index]), { status: 200 });
    };

    const request = startAtlasRoadDatasetLoad(fetcher, {
      setDatasets: (items) => loaded.push(items),
      setError: () => {},
      setStatus: (status) => statuses.push(status),
    });
    request.cancel();
    await request.completion;

    expect(statuses).toEqual(["loading"]);
    expect(loaded).toHaveLength(0);
  });

  it("mantém o status fora das dependências do efeito React", async () => {
    const component = await readFile(componentPath, "utf8");
    expect(component).toMatch(/Loading status is intentionally excluded/);
    expect(component).toMatch(/\}, \[layer, roadRetryKey\]\);/);
    expect(component).not.toMatch(/\}, \[layer, roadDatasetStatus\]\);/);
  });
});
