import { createFileRoute, redirect } from "@tanstack/react-router";
import { pageMeta } from "@/lib/seo";

/** Rota legada: /conteudos foi renomeada para /artigos. */
export const Route = createFileRoute("/conteudos/")({
  head: () => ({ meta: pageMeta({ title: "Conteúdos: novo endereço | Banca Paulista", description: "As publicações editoriais da Banca Paulista estão na seção Artigos.", path: "/artigos" }) }),
  beforeLoad: () => {
    throw redirect({ to: "/artigos", statusCode: 301, replace: true });
  },
});
