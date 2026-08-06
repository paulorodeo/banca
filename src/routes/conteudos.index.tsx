import { createFileRoute, redirect } from "@tanstack/react-router";

/** Rota legada: /conteudos foi renomeada para /artigos. */
export const Route = createFileRoute("/conteudos/")({
  beforeLoad: () => {
    throw redirect({ to: "/artigos", replace: true });
  },
});
