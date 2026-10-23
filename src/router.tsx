import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { absoluteHead } from './lib/public-url';

type HeadRoute = {
  options: { head?: (args: { matches: { context?: { siteOrigin?: string } }[] }) => unknown };
  children?: HeadRoute[] | Record<string, HeadRoute>;
};
const prepared = new WeakSet<object>();
function prepareHeads(route: HeadRoute) {
  if (prepared.has(route)) return;
  prepared.add(route);
  const head = route.options.head;
  if (head) route.options.head = args => absoluteHead(args.matches.find(match => match.context?.siteOrigin)?.context?.siteOrigin, () => head(args));
  for (const child of Object.values(route.children ?? {})) prepareHeads(child);
}

export const getRouter = () => {
  prepareHeads(routeTree as unknown as HeadRoute);
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
