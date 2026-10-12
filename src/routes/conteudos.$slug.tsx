import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

/** Rota legada: /conteudos/:slug foi renomeada para /artigos/:slug. */
export const Route = createFileRoute("/conteudos/$slug")({
  head: ({ params }) => ({ meta: pageMeta({ title: "Publicação movida | Banca Paulista", description: "Consulte esta publicação na seção Artigos da Banca Paulista.", path: `/artigos/${params.slug}` }) }),
  beforeLoad: ({ params }) => {
    throw redirect({ to: "/artigos/$slug", params: { slug: params.slug }, statusCode: 301, replace: true });
  },
});
