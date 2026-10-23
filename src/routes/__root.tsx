import type { ErrorComponentProps } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouterState,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/header";
import { WeatherTicker } from "@/components/site/weather-ticker";
import { Container } from "@/components/site/primitives";
import { SiteFooter } from "@/components/site/footer";
import { readPublicOrigin } from "@/lib/public-url.functions";
import { editorialIdentity } from "@/content/local/settings";
import { content } from "@/content/repository";
import type { PublicInstitution } from "@/content/types";
import { organizationSchema } from "@/lib/seo";
import { MiniRadioPlayer } from "@/features/radio/components/MiniRadioPlayer";
import { RadioProvider } from "@/features/radio/components/RadioProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">Esta página não existe ou foi movida.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Não foi possível carregar esta página
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Tente novamente ou volte ao início.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  siteOrigin?: string;
  institutions?: PublicInstitution[];
}>()({
  beforeLoad: async () => ({
    siteOrigin: await readPublicOrigin(),
    institutions: await content.listInstitutions(),
  }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: editorialIdentity.name },
      {
        name: "description",
        content: editorialIdentity.description,
      },
      { name: "author", content: editorialIdentity.name },
      { property: "og:site_name", content: editorialIdentity.name },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/brand/icon-16.png", sizes: "16x16", type: "image/png" },
      { rel: "icon", href: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { rel: "icon", href: "/brand/icon-48.png", sizes: "48x48", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema("/")),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient, institutions = [] } = Route.useRouteContext();
  const isJournalismRoute = useRouterState({
    select: (state) => {
      const pathname = state.location.pathname.replace(/\/+$/, "");
      return pathname === "/noticias" || pathname.startsWith("/noticias/");
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RadioProvider>
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xs focus:bg-gold focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Ir para o conteúdo
        </a>
        <div className="flex min-h-screen flex-col">
          {!isJournalismRoute ? (
            <>
              <div className="bg-brand-navy text-ivory">
                <Container className="flex min-h-8 items-center justify-end">
                  <WeatherTicker />
                </Container>
              </div>
              <SiteHeader institutions={institutions} />
            </>
          ) : null}
          <main id="conteudo-principal" className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <MiniRadioPlayer />
      </RadioProvider>
    </QueryClientProvider>
  );
}
