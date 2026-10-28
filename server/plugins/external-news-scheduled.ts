import { definePlugin } from "nitro";
import { syncEnabledExternalFeeds } from "../../src/features/external-news/ingestion.server";
import {
  KvExternalNewsRepository,
  type ExternalNewsKv,
} from "../../src/features/external-news/repository.server";
import { feedSources } from "../../src/features/external-news/sources";

type ExternalNewsEnvironment = {
  EXTERNAL_NEWS_ENABLED?: string;
  EXTERNAL_NEWS_KV?: ExternalNewsKv;
};

export default definePlugin((nitroApp) => {
  nitroApp.hooks.hook("cloudflare:scheduled", async ({ controller, env }) => {
    const bindings = env as ExternalNewsEnvironment;
    if (bindings.EXTERNAL_NEWS_ENABLED !== "true" || !bindings.EXTERNAL_NEWS_KV) {
      console.log(JSON.stringify({ event: "external_news_sync_skipped", cron: controller.cron }));
      return;
    }
    const reports = await syncEnabledExternalFeeds(
      feedSources,
      new KvExternalNewsRepository(bindings.EXTERNAL_NEWS_KV),
    );
    console.log(
      JSON.stringify({
        event: "external_news_sync_completed",
        cron: controller.cron,
        sources: reports.length,
        failed: reports.filter((report) => report.error).length,
        received: reports.reduce((sum, report) => sum + report.received, 0),
        approved: reports.reduce((sum, report) => sum + report.approved, 0),
      }),
    );
  });
});
