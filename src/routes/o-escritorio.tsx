import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";
export const Route = createFileRoute("/o-escritorio")({
  head: () => ({ meta: [...pageMeta({ title: "Página movida | Banca Paulista", description: "Este conteúdo foi substituído pela apresentação editorial da Banca Paulista.", path: "/sobre" }), { name: "robots", content: "noindex" }] }),
  beforeLoad: () => { throw redirect({ to: "/sobre", statusCode: 301, replace: true }); },
});
