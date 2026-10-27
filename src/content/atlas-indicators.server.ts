import { BRASIL_UFS } from "@/content/local/brasil-ufs";
import type {
  AtlasIndicator,
  AtlasIndicatorQuery,
  AtlasIndicatorResult,
} from "./atlas-indicators.types";
import { boundedText, type SharedCache } from "./payload-transport";

type Fetcher = typeof fetch;
const FRESH_MS = 5 * 60_000;
const STALE_MS = 24 * 60 * 60_000;
const headers = { accept: "application/json" };
const sources = {
  bcb: {
    sourceId: "bcb",
    sourceName: "Banco Central do Brasil",
    sourceUrl: "https://dadosabertos.bcb.gov.br/",
  },
  sidra: {
    sourceId: "ibge-sidra",
    sourceName: "IBGE · SIDRA",
    sourceUrl: "https://sidra.ibge.gov.br/tabela/1737",
  },
  camara: {
    sourceId: "camara",
    sourceName: "Câmara dos Deputados",
    sourceUrl: "https://dadosabertos.camara.leg.br/",
  },
  senado: {
    sourceId: "senado",
    sourceName: "Senado Federal · Dados Abertos",
    sourceUrl: "https://www12.senado.leg.br/dados-abertos/",
  },
};

function dateParam(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  }).formatToParts(date);
  const month = parts.find((part) => part.type === "month")?.value ?? "01";
  const day = parts.find((part) => part.type === "day")?.value ?? "01";
  const year = parts.find((part) => part.type === "year")?.value ?? "1970";
  return month + "-" + day + "-" + year;
}
function finite(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string" || !/^-?\d+(?:[.,]\d+)?$/.test(value.trim())) return null;
  const result = Number(value.replace(",", "."));
  return Number.isFinite(result) ? result : null;
}
function ptDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[3]), Number(match[2]) - 1, Number(match[1])));
  return Number.isNaN(date.valueOf()) ? null : date.toISOString();
}
function ptaxDateTime(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.includes("T") ? value : value.replace(" ", "T");
  const withZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized) ? normalized : normalized + "-03:00";
  const date = new Date(withZone);
  return Number.isNaN(date.valueOf()) ? null : date.toISOString();
}
function makeMetric(
  input: Omit<AtlasIndicator, "fetchedAt" | "freshness">,
  fetchedAt: string,
): AtlasIndicator {
  return { ...input, fetchedAt, freshness: "fresh" };
}
async function readJson(url: string, fetcher: Fetcher): Promise<unknown> {
  const response = await fetcher(url, { headers, signal: AbortSignal.timeout(8_000) });
  if (!response.ok) throw new Error("Indicator provider HTTP failure");
  return JSON.parse(await boundedText(response, 1_000_000)) as unknown;
}
type CacheEnvelope = { value: AtlasIndicator[]; freshUntil: number; staleUntil: number };
function runtimeCache(): SharedCache | undefined {
  const storage = globalThis.caches as (CacheStorage & { default?: SharedCache }) | undefined;
  return storage?.default;
}
function cacheRequest(key: string) {
  return new Request("https://bancapaulista.org/__internal-cache/atlas-indicators/" + key);
}
async function cached(
  key: string,
  load: () => Promise<AtlasIndicator[]>,
  store: SharedCache | undefined,
  now = Date.now(),
): Promise<AtlasIndicator[]> {
  const request = cacheRequest(key);
  let previous: CacheEnvelope | undefined;
  try {
    const response = await store?.match(request);
    if (response) {
      const candidate = (await response.json()) as CacheEnvelope;
      if (
        Array.isArray(candidate.value) &&
        typeof candidate.freshUntil === "number" &&
        typeof candidate.staleUntil === "number"
      )
        previous = candidate;
    }
  } catch {
    // A cache miss or corrupt cache entry falls through to the source.
  }
  if (previous && now < previous.freshUntil) return previous.value;
  try {
    const value = await load();
    const fetchedAt = new Date(now).toISOString();
    const stamped = value.map((item) => ({ ...item, fetchedAt, freshness: "fresh" as const }));
    if (store) {
      try {
        await store.put(
          request,
          new Response(
            JSON.stringify({
              value: stamped,
              freshUntil: now + FRESH_MS,
              staleUntil: now + STALE_MS,
            }),
            {
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=86400",
              },
            },
          ),
        );
      } catch {
        // The source response is still usable when Cache API writes fail.
      }
    }
    return stamped;
  } catch {
    if (previous && now < previous.staleUntil)
      return previous.value.map((item) => ({ ...item, freshness: "stale" }));
    throw new Error("Official indicator provider unavailable");
  }
}
const nationalScope = { scopeType: "BR" as const, scopeCode: "BR" };

async function economy(
  fetcher: Fetcher,
  store: SharedCache | undefined,
): Promise<AtlasIndicator[]> {
  const results = await Promise.allSettled([
    cached(
      "bcb-ptax-usd",
      async () => {
        const end = new Date();
        const start = new Date(end.valueOf() - 7 * 86_400_000);
        const params = new URLSearchParams({
          "@dataInicial": "'" + dateParam(start) + "'",
          "@dataFinalCotacao": "'" + dateParam(end) + "'",
          $format: "json",
        });
        const url =
          "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(" +
          params.toString() +
          ")";
        const payload = (await readJson(url, fetcher)) as {
          value?: Array<{
            cotacaoCompra?: unknown;
            cotacaoVenda?: unknown;
            dataHoraCotacao?: unknown;
          }>;
        };
        const rows = Array.isArray(payload.value) ? payload.value : [];
        const row = [...rows]
          .reverse()
          .find(
            (item) =>
              finite(item.cotacaoCompra) !== null &&
              finite(item.cotacaoVenda) !== null &&
              typeof item.dataHoraCotacao === "string",
          );
        const observedAt = ptaxDateTime(row?.dataHoraCotacao);
        if (!row || !observedAt) throw new Error("PTAX observation invalid");
        const base = {
          ...sources.bcb,
          ...nationalScope,
          observedAt,
          referencePeriod: observedAt.slice(0, 10),
          unit: "R$/US$",
          decimals: 4,
        };
        return [
          makeMetric(
            {
              ...base,
              metric: "usd-buy",
              label: "Dólar · compra",
              value: finite(row.cotacaoCompra)!,
            },
            observedAt,
          ),
          makeMetric(
            {
              ...base,
              metric: "usd-sell",
              label: "Dólar · venda",
              value: finite(row.cotacaoVenda)!,
            },
            observedAt,
          ),
        ];
      },
      store,
    ),
    cached(
      "bcb-selic-meta",
      async () => {
        const payload = (await readJson(
          "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json",
          fetcher,
        )) as Array<{ data?: unknown; valor?: unknown }>;
        const row = Array.isArray(payload) ? payload.at(-1) : undefined;
        const value = finite(row?.valor);
        const observedAt = ptDate(row?.data);
        if (value === null || !observedAt) throw new Error("SGS observation invalid");
        return [
          makeMetric(
            {
              ...sources.bcb,
              ...nationalScope,
              metric: "selic-meta",
              label: "Meta Selic",
              value,
              unit: "% a.a.",
              observedAt,
              referencePeriod: observedAt.slice(0, 10),
              decimals: 2,
            },
            observedAt,
          ),
        ];
      },
      store,
    ),
    cached(
      "ibge-ipca-monthly",
      async () => {
        const payload = (await readJson(
          "https://apisidra.ibge.gov.br/values/t/1737/n1/1/v/63/p/last%201?formato=json",
          fetcher,
        )) as Array<{ V?: unknown; D3N?: unknown; D3C?: unknown }>;
        const row = Array.isArray(payload) ? payload.at(-1) : undefined;
        const value = finite(row?.["V"]);
        const period = typeof row?.["D3N"] === "string" ? row["D3N"] : "";
        const match = typeof row?.["D3C"] === "string" ? /^(\d{4})(\d{2})$/.exec(row["D3C"]) : null;
        const observedAt = match
          ? new Date(Date.UTC(Number(match[1]), Number(match[2]), 0)).toISOString()
          : null;
        if (value === null || !period || !observedAt) throw new Error("SIDRA observation invalid");
        return [
          makeMetric(
            {
              ...sources.sidra,
              ...nationalScope,
              metric: "ipca-monthly",
              label: "IPCA · variação mensal",
              value,
              unit: "%",
              observedAt,
              referencePeriod: period,
              decimals: 2,
            },
            observedAt,
          ),
        ];
      },
      store,
    ),
  ]);
  return results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
}

type Deputy = { siglaUf: string; idLegislatura: number };
async function chamber(
  fetcher: Fetcher,
  store: SharedCache | undefined,
): Promise<AtlasIndicator[]> {
  return cached(
    "camara-deputies-by-uf",
    async () => {
      const counts = new Map<string, number>();
      let legislature = 0;
      for (let page = 1; page <= 10; page += 1) {
        const params = new URLSearchParams({
          ordem: "ASC",
          ordenarPor: "nome",
          itens: "100",
          pagina: String(page),
        });
        const payload = (await readJson(
          "https://dadosabertos.camara.leg.br/api/v2/deputados?" + params.toString(),
          fetcher,
        )) as { dados?: unknown };
        if (!Array.isArray(payload.dados)) throw new Error("Chamber response invalid");
        const rows = payload.dados.filter((entry): entry is Deputy => {
          if (!entry || typeof entry !== "object") return false;
          const row = entry as Record<string, unknown>;
          return (
            typeof row["siglaUf"] === "string" &&
            BRASIL_UFS.some((uf) => uf.uf === row["siglaUf"]) &&
            typeof row["idLegislatura"] === "number" &&
            Number.isInteger(row["idLegislatura"])
          );
        });
        if (rows.length !== payload.dados.length) throw new Error("Chamber records invalid");
        for (const row of rows) legislature = Math.max(legislature, row.idLegislatura);
        for (const row of rows) counts.set(row.siglaUf, (counts.get(row.siglaUf) ?? 0) + 1);
        if (rows.length < 100) break;
        if (page === 10) throw new Error("Chamber pagination bound reached");
      }
      const observedAt = new Date().toISOString();
      return [...counts.entries()].map(([uf, value]) =>
        makeMetric(
          {
            ...sources.camara,
            metric: "deputies-" + uf.toLowerCase(),
            label: "Deputados federais em exercício · " + uf,
            value,
            unit: "parlamentares",
            scopeType: "UF",
            scopeCode: uf,
            observedAt,
            referencePeriod: "Legislatura " + legislature,
            decimals: 0,
          },
          observedAt,
        ),
      );
    },
    store,
  );
}

function senateRecords(payload: unknown): { uf: string; id: string }[] {
  const root = payload as {
    ListaParlamentarEmExercicio?: {
      Parlamentares?: { Parlamentar?: unknown | unknown[] };
    };
  };
  const raw = root?.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar;
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const records: { uf: string; id: string }[] = [];
  for (const value of list) {
    if (!value || typeof value !== "object") continue;
    const record = value as Record<string, unknown>;
    const identity = record["IdentificacaoParlamentar"];
    if (!identity || typeof identity !== "object") continue;
    const fields = identity as Record<string, unknown>;
    const uf = fields["UfParlamentar"] ?? fields["SiglaUfParlamentar"];
    const id = fields["CodigoParlamentar"];
    if (
      typeof uf === "string" &&
      BRASIL_UFS.some((state) => state.uf === uf) &&
      typeof id === "string"
    ) {
      records.push({ uf, id });
    }
  }
  return records;
}

async function senate(fetcher: Fetcher, store: SharedCache | undefined): Promise<AtlasIndicator[]> {
  return cached(
    "senado-em-exercicio-by-uf",
    async () => {
      const payload = (await readJson(
        "https://legis.senado.leg.br/dadosabertos/senador/lista/atual.json",
        fetcher,
      )) as {
        ListaParlamentarEmExercicio?: { Metadados?: { Versao?: unknown } };
      };
      const records = senateRecords(payload);
      if (!records.length || new Set(records.map((item) => item.id)).size !== records.length) {
        throw new Error("Senate records invalid");
      }
      const counts = new Map<string, number>();
      for (const record of records) counts.set(record.uf, (counts.get(record.uf) ?? 0) + 1);
      const version = payload.ListaParlamentarEmExercicio?.Metadados?.Versao;
      const parsedVersion = typeof version === "string" ? ptDate(version.slice(0, 10)) : null;
      const observedAt = parsedVersion ?? new Date().toISOString();
      return [...counts.entries()].map(([uf, value]) =>
        makeMetric(
          {
            ...sources.senado,
            metric: "senators-" + uf.toLowerCase(),
            label: "Senadores em exercício · " + uf,
            value,
            unit: "parlamentares",
            scopeType: "UF",
            scopeCode: uf,
            observedAt,
            referencePeriod: "Lista atual de senadores em exercício",
            decimals: 0,
          },
          observedAt,
        ),
      );
    },
    store,
  );
}

function inScope(item: AtlasIndicator, query: AtlasIndicatorQuery) {
  if (query.uf) return item.scopeCode === query.uf;
  if (!query.region) return true;
  const ufs = BRASIL_UFS.filter((uf) => uf.regiao === query.region).map((uf) => uf.uf);
  return item.scopeType === "UF" && ufs.includes(item.scopeCode);
}

export async function readIndicators(
  query: AtlasIndicatorQuery,
  fetcher: Fetcher = fetch,
  store: SharedCache | undefined = runtimeCache(),
): Promise<AtlasIndicatorResult> {
  if (query.layer === "justica")
    return {
      status: "pending",
      indicators: [],
      message:
        "Indicadores judiciais aguardam configuração e validação do acesso agregado ao DataJud.",
    };
  if (query.layer === "infraestrutura")
    return {
      status: "pending",
      indicators: [],
      message: "Ainda não há uma base aprovada para indicadores desta camada.",
    };
  try {
    let all: AtlasIndicator[];
    let partial = false;
    if (query.layer === "economia") {
      all = await economy(fetcher, store);
    } else {
      const results = await Promise.allSettled([chamber(fetcher, store), senate(fetcher, store)]);
      all = results.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
      partial = results.some((result) => result.status === "rejected");
    }
    const selected = query.layer === "politica" ? all.filter((item) => inScope(item, query)) : all;
    if (!selected.length)
      return {
        status: "unavailable",
        indicators: [],
        message: "A fonte oficial não retornou observações válidas para este recorte.",
      };
    const stale = selected.some((item) => item.freshness === "stale");
    const threshold = query.layer === "economia" ? 4 : 2;
    return {
      status: partial || selected.length < threshold ? "partial" : "ready",
      indicators: selected,
      ...(stale
        ? { message: "Exibindo a última leitura disponível; a atualização da fonte falhou." }
        : {}),
    };
  } catch {
    return {
      status: "unavailable",
      indicators: [],
      message: "Indicadores temporariamente indisponíveis. Tente novamente mais tarde.",
    };
  }
}
