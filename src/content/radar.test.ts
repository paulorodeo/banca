import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  privacyReviewSignals,
  publicRadarRecords,
  radarDedupeKey,
  radarIngestEnvelopeSchema,
  type RadarNormalizedRecord,
} from "./radar";
import { radarRecords } from "./local/radar";

const approved = (overrides: Partial<RadarNormalizedRecord> = {}): RadarNormalizedRecord => ({
  id: "d2bd91ba-b460-4c8f-8ca2-bf71193acdc1",
  providerKey: "fonte-oficial",
  sourceType: "rest",
  externalId: "ato-123",
  sourceName: "Fonte oficial de teste",
  sourceUrl: "https://example.gov.br/documentos/ato-123",
  originalTitle: "Ato institucional de teste",
  editorialTitle: "Ato institucional verificado",
  summary: "Fixture de contrato sem dados pessoais e não publicada no portal.",
  category: "legislacao-normas",
  countryCode: "BR",
  stateCode: "SP",
  municipalityName: "São Paulo",
  municipalityCode: "3550308",
  neighborhoodSlugs: [],
  territorySlugs: [],
  originalPublishedAt: "2026-10-01T12:00:00-03:00",
  collectedAt: "2026-10-02T12:00:00-03:00",
  lastVerifiedAt: "2026-10-03T12:00:00-03:00",
  editorialStatus: "approved",
  presentationType: "card",
  documentReferences: [],
  privacyStatus: "cleared",
  classificationMethod: "human",
  rawContentStored: false,
  ...overrides,
});

describe("Radar Paulista", () => {
  test("aceita fontes heterogêneas no mesmo envelope sem guardar conteúdo bruto", () => {
    for (const sourceType of ["rest", "rss", "atom", "http", "document", "manual"] as const) {
      const parsed = radarIngestEnvelopeSchema.parse({
        providerKey: `provider-${sourceType}`,
        sourceType,
        sourceName: "Fonte",
        sourceUrl: "https://example.gov.br/original",
        originalTitle: "Título original",
        collectedAt: "2026-10-15T12:00:00-03:00",
        rawContentStored: false,
      });
      assert.equal(parsed.sourceType, sourceType);
      assert.equal(parsed.rawContentStored, false);
    }
  });

  test("deduplica por fornecedor e identificador externo", () => {
    const first = approved();
    const duplicate = approved({ id: "53d58c4a-fbe1-4cfa-af8d-fc5d5da728e6" });
    assert.equal(radarDedupeKey(first), radarDedupeKey(duplicate));
    assert.equal(publicRadarRecords([first, duplicate]).length, 1);
  });

  test("bloqueia rascunho, privacidade pendente, dado pessoal e registro sem verificação", () => {
    assert.equal(publicRadarRecords([approved({ editorialStatus: "review" })]).length, 0);
    assert.equal(publicRadarRecords([approved({ privacyStatus: "pending" })]).length, 0);
    assert.equal(publicRadarRecords([approved({ summary: "CPF 123.456.789-00" })]).length, 0);
    assert.equal(publicRadarRecords([approved({ lastVerifiedAt: undefined })]).length, 0);
    assert.ok(privacyReviewSignals("RG nº 1234567").length > 0);
  });

  test("a coleção pública inicial permanece vazia e sem exemplos fictícios", () => {
    assert.deepEqual(radarRecords, []);
    assert.deepEqual(publicRadarRecords(radarRecords), []);
  });
});
