import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { KvExternalNewsRepository, type ExternalNewsKv } from "./repository.server";
import { queryExternalNews } from "./query.server";
import type { ExternalNewsQuery } from "./query.server";

async function configuredRepository() {
  try {
    const runtime = await import("cloudflare:workers");
    const bindings = runtime.env as unknown as {
      EXTERNAL_NEWS_ENABLED?: string;
      EXTERNAL_NEWS_KV?: ExternalNewsKv;
    };
    return bindings.EXTERNAL_NEWS_ENABLED === "true" && bindings.EXTERNAL_NEWS_KV
      ? new KvExternalNewsRepository(bindings.EXTERNAL_NEWS_KV)
      : null;
  } catch {
    return null;
  }
}

export const readExternalNews = createServerFn({ method: "GET" })
  .validator((value: unknown) =>
    z
      .object({
        layer: z
          .enum([
            "noticias",
            "justica",
            "politica",
            "economia",
            "agronegocio",
            "clima",
            "infraestrutura",
            "rodovias",
            "populacao",
          ])
          .optional(),
        regionCode: z
          .string()
          .regex(/^[A-Z-]{1,12}$/)
          .optional(),
        stateCode: z
          .string()
          .regex(/^[A-Z]{2}$/)
          .optional(),
        limit: z.number().int().min(1).max(12).optional(),
      })
      .parse(value),
  )
  .handler(async ({ data }) => {
    setResponseHeader("Cache-Control", "no-store");
    try {
      const query: ExternalNewsQuery = {
        ...(data.layer ? { layer: data.layer } : {}),
        ...(data.regionCode ? { regionCode: data.regionCode } : {}),
        ...(data.stateCode ? { stateCode: data.stateCode } : {}),
        ...(data.limit ? { limit: data.limit } : {}),
      };
      return await queryExternalNews(await configuredRepository(), query);
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "external_news_query_failed",
          name: error instanceof Error ? error.name : "UnknownError",
        }),
      );
      return [];
    }
  });
