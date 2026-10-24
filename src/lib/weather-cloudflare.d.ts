declare module "cloudflare:workers" {
  export const env: import("./weather-service.server").WeatherEnv &
    import("../features/radio/podcast-feed.server").PodcastFeedEnv;
}
