declare module "cloudflare:workers" {
  export const env: import("./weather-service.server").WeatherEnv &
    import("../features/radio/podcast-feed.server").PodcastFeedEnv & {
      EXTERNAL_NEWS_ENABLED?: string;
      EXTERNAL_NEWS_KV?: import("../features/external-news/repository.server").ExternalNewsKv;
    };
}
