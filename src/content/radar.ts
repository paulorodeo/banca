import { z } from "zod";

export const radarCategorySchema = z.enum([
  "legislacao-normas",
  "diarios-oficiais",
  "licitacoes-contratos",
  "gestao-publica",
  "justica-instituicoes",
  "territorio-urbanismo",
  "meio-ambiente",
  "imobiliario-registros",
  "entidades-conselhos",
]);
export type RadarCategory = z.infer<typeof radarCategorySchema>;

export const radarCategoryLabels: Record<RadarCategory, string> = {
  "legislacao-normas": "Legislação e Normas",
  "diarios-oficiais": "Diários Oficiais",
  "licitacoes-contratos": "Licitações e Contratos",
  "gestao-publica": "Gestão Pública",
  "justica-instituicoes": "Justiça e Instituições",
  "territorio-urbanismo": "Território e Urbanismo",
  "meio-ambiente": "Meio Ambiente",
  "imobiliario-registros": "Imobiliário e Registros",
  "entidades-conselhos": "Entidades e Conselhos",
};

const slug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(160);
const isoDate = z.string().datetime({ offset: true });
const officialUrl = z
  .string()
  .url()
  .max(2048)
  .refine((value) => new URL(value).protocol === "https:", "Source URL must use HTTPS");

export const radarIngestEnvelopeSchema = z.object({
  providerKey: slug,
  sourceType: z.enum(["rest", "rss", "atom", "http", "document", "manual"]),
  externalId: z.string().trim().min(1).max(500).optional(),
  sourceName: z.string().trim().min(1).max(200),
  sourceUrl: officialUrl,
  originalTitle: z.string().trim().min(1).max(500),
  originalPublishedAt: isoDate.optional(),
  collectedAt: isoDate,
  payloadReference: z.string().trim().max(2048).optional(),
  licenseNote: z.string().trim().max(1000).optional(),
  rawContentStored: z.literal(false),
});
export type RadarIngestEnvelope = z.infer<typeof radarIngestEnvelopeSchema>;

export const radarNormalizedRecordSchema = radarIngestEnvelopeSchema.extend({
  id: z.string().uuid(),
  editorialTitle: z.string().trim().min(1).max(500),
  summary: z.string().trim().min(1).max(3000),
  category: radarCategorySchema,
  subcategory: z.string().trim().max(160).optional(),
  relatedAgency: z.string().trim().max(300).optional(),
  countryCode: z.string().length(2).default("BR"),
  stateCode: z.string().length(2).optional(),
  municipalityName: z.string().trim().max(200).optional(),
  municipalityCode: z
    .string()
    .regex(/^\d{7}$/)
    .optional(),
  neighborhoodSlugs: z.array(slug).max(100).default([]),
  territorySlugs: z.array(slug).max(100).default([]),
  lastVerifiedAt: isoDate.optional(),
  editorialStatus: z.enum(["received", "normalized", "review", "approved", "rejected"]),
  presentationType: z.enum(["card", "document-page", "editorial-article"]),
  documentReferences: z.array(officialUrl).max(50).default([]),
  reuseRestriction: z.string().trim().max(1000).optional(),
  privacyStatus: z.enum(["pending", "cleared", "blocked"]),
  classificationMethod: z.enum(["source-metadata", "rule", "human", "ai-assisted"]),
  classificationConfidence: z.number().min(0).max(1).optional(),
});
export type RadarNormalizedRecord = z.infer<typeof radarNormalizedRecordSchema>;

export interface RadarPublicRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: RadarCategory;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  lastVerifiedAt?: string;
  municipalityName?: string;
  municipalityCode?: string;
  relatedAgency?: string;
  territorySlugs: string[];
  neighborhoodSlugs: string[];
  relatedArticleSlugs: string[];
}

const sensitivePatterns = [
  /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/,
  /\bCPF\b/i,
  /\bRG\s*(?:n[º°o]\.?\s*)?\d/i,
  /\b(?:biometria|dado biométrico)\b/i,
  /\b(?:segredo de justiça|processo sob sigilo)\b/i,
];

/** Triage only: a negative result never proves anonymization or authorizes publication. */
export function privacyReviewSignals(input: string): string[] {
  return sensitivePatterns.flatMap((pattern) =>
    pattern.test(input) ? [`review:${pattern.source}`] : [],
  );
}

export function radarDedupeKey(
  record: Pick<RadarIngestEnvelope, "providerKey" | "externalId" | "sourceUrl" | "originalTitle">,
): string {
  const identity = record.externalId ?? `${record.sourceUrl}|${record.originalTitle}`;
  return `${record.providerKey}:${identity}`.normalize("NFKC").toLocaleLowerCase("pt-BR");
}

export function publicRadarRecords(records: unknown[]): RadarPublicRecord[] {
  const seen = new Set<string>();
  return records.flatMap((input) => {
    const record = radarNormalizedRecordSchema.parse(input);
    if (record.editorialStatus !== "approved" || record.privacyStatus !== "cleared") return [];
    if (!record.originalPublishedAt || !record.lastVerifiedAt) return [];
    if (
      privacyReviewSignals(`${record.originalTitle}\n${record.editorialTitle}\n${record.summary}`)
        .length
    )
      return [];
    const key = radarDedupeKey(record);
    if (seen.has(key)) return [];
    seen.add(key);
    return [
      {
        id: record.id,
        slug: record.id,
        title: record.editorialTitle,
        summary: record.summary,
        category: record.category,
        sourceName: record.sourceName,
        sourceUrl: record.sourceUrl,
        publishedAt: record.originalPublishedAt,
        lastVerifiedAt: record.lastVerifiedAt,
        ...(record.municipalityName ? { municipalityName: record.municipalityName } : {}),
        ...(record.municipalityCode ? { municipalityCode: record.municipalityCode } : {}),
        ...(record.relatedAgency ? { relatedAgency: record.relatedAgency } : {}),
        territorySlugs: record.territorySlugs,
        neighborhoodSlugs: record.neighborhoodSlugs,
        relatedArticleSlugs: [],
      },
    ];
  });
}
