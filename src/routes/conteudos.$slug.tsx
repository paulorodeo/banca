import { createFileRoute, redirect } from "@tanstack/react-router";

/** Rota legada: /conteudos/:slug foi renomeada para /artigos/:slug. */
export const Route = createFileRoute("/conteudos/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/artigos/$slug", params: { slug: params.slug }, replace: true });
  },
});
