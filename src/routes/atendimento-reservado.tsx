import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
export const Route = createFileRoute("/atendimento-reservado")({
  head: () => ({ meta: [...pageMeta({ title: "Página movida | Banca Paulista", description: "Este conteúdo foi substituído pela apresentação editorial da Banca Paulista.", path: "/plantao-criminal" }), { name: "robots", content: "noindex" }] }),
  beforeLoad: () => { throw redirect({ to: "/plantao-criminal", statusCode: 301, replace: true }); },
});
