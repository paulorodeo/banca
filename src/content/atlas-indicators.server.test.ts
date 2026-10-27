import { afterEach, describe, expect, it, mock } from "bun:test";
import { readIndicators } from "./atlas-indicators.server";

const originalNow = Date.now;
class MemoryCache {
  values = new Map<string, Response>();
  async match(request: Request) {
    return this.values.get(request.url)?.clone();
  }
  async put(request: Request, response: Response) {
    this.values.set(request.url, response.clone());
  }
}
afterEach(() => {
  Date.now = originalNow;
});

describe("Atlas indicators: official sources and stale fallback", () => {
  it("normalizes BCB and IBGE national observations with source and observation times", async () => {
    const fetcher = mock(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("CotacaoDolarPeriodo"))
        return Response.json({
          value: [
            { cotacaoCompra: 5.1, cotacaoVenda: 5.2, dataHoraCotacao: "2026-10-27 13:00:00.000" },
          ],
        });
      if (url.includes("bcdata.sgs.432"))
        return Response.json([{ data: "27/10/2026", valor: "15.00" }]);
      if (url.includes("apisidra.ibge.gov.br"))
        return Response.json([{ D3C: "202609", D3N: "setembro 2026", V: "0,48" }]);
      throw new Error("Unexpected provider URL");
    }) as unknown as typeof fetch;
    const result = await readIndicators(
      { layer: "economia", uf: "AC" },
      fetcher,
      new MemoryCache(),
    );
    expect(result.status).toBe("ready");
    expect(result.indicators).toHaveLength(4);
    expect(
      result.indicators.every((item) => item.scopeType === "BR" && item.scopeCode === "BR"),
    ).toBe(true);
    expect(
      result.indicators.every(
        (item) => item.sourceUrl.startsWith("https://") && item.observedAt && item.fetchedAt,
      ),
    ).toBe(true);
    expect(result.indicators.find((item) => item.metric === "ipca-monthly")?.value).toBe(0.48);
    expect(result.indicators.find((item) => item.metric === "selic-meta")?.value).toBe(15);
    expect(result.indicators.find((item) => item.metric === "usd-buy")?.observedAt).toBe(
      "2026-10-27T16:00:00.000Z",
    );
  });

  it("uses an explicitly stale last reading after a temporary provider failure", async () => {
    const firstNow = 1_798_000_000_000;
    Date.now = () => firstNow;
    const good = mock(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("CotacaoDolarPeriodo"))
        return Response.json({
          value: [
            { cotacaoCompra: 5.1, cotacaoVenda: 5.2, dataHoraCotacao: "2026-10-27 13:00:00.000" },
          ],
        });
      if (url.includes("bcdata.sgs.432"))
        return Response.json([{ data: "27/10/2026", valor: "15.00" }]);
      if (url.includes("apisidra.ibge.gov.br"))
        return Response.json([{ D3C: "202609", D3N: "setembro 2026", V: "0,48" }]);
      throw new Error("Unexpected provider URL");
    }) as unknown as typeof fetch;
    const store = new MemoryCache();
    await readIndicators({ layer: "economia" }, good, store);
    Date.now = () => firstNow + 6 * 60_000;
    const stale = await readIndicators(
      { layer: "economia" },
      mock(async () => {
        throw new Error("offline");
      }) as unknown as typeof fetch,
      store,
    );
    expect(stale.indicators.length).toBeGreaterThan(0);
    expect(stale.indicators.every((item) => item.freshness === "stale")).toBe(true);
    expect(stale.message).toContain("última leitura");
  });

  it("returns only aggregate current legislature deputy counts for the selected state", async () => {
    const fetcher = mock(async (input: RequestInfo | URL) => {
      if (String(input).includes("dadosabertos.camara")) {
        return Response.json({
          dados: [
            { siglaUf: "SP", idLegislatura: 57, nome: "Nome privado não propagado" },
            { siglaUf: "MG", idLegislatura: 57, nome: "Outro nome não propagado" },
            { siglaUf: "SP", idLegislatura: 57, nome: "Terceiro nome não propagado" },
          ],
        });
      }
      return Response.json({
        ListaParlamentarEmExercicio: {
          Metadados: { Versao: "26/10/2026 23:14:03" },
          Parlamentares: {
            Parlamentar: [
              {
                IdentificacaoParlamentar: {
                  CodigoParlamentar: "1",
                  UfParlamentar: "SP",
                  NomeParlamentar: "Nome não propagado",
                },
              },
              {
                IdentificacaoParlamentar: {
                  CodigoParlamentar: "2",
                  UfParlamentar: "SP",
                  NomeParlamentar: "Outro nome não propagado",
                },
              },
              {
                IdentificacaoParlamentar: {
                  CodigoParlamentar: "3",
                  UfParlamentar: "MG",
                  NomeParlamentar: "Outro UF",
                },
              },
            ],
          },
        },
      });
    }) as unknown as typeof fetch;
    const result = await readIndicators(
      { layer: "politica", uf: "SP" },
      fetcher,
      new MemoryCache(),
    );
    expect(result.status).toBe("ready");
    expect(result.indicators).toHaveLength(2);
    expect(result.indicators).toContainEqual(
      expect.objectContaining({
        metric: "deputies-sp",
        value: 2,
        scopeType: "UF",
        scopeCode: "SP",
        unit: "parlamentares",
      }),
    );
    expect(result.indicators).toContainEqual(
      expect.objectContaining({
        metric: "senators-sp",
        value: 2,
        scopeType: "UF",
        scopeCode: "SP",
        unit: "parlamentares",
      }),
    );
    expect(JSON.stringify(result)).not.toContain("Nome privado");
  });

  it("keeps Justice pending without making a DataJud request", async () => {
    const fetcher = mock(async () => {
      throw new Error("must not fetch");
    }) as unknown as typeof fetch;
    const result = await readIndicators({ layer: "justica" }, fetcher);
    expect(result.status).toBe("pending");
    expect(fetcher).not.toHaveBeenCalled();
  });
});
