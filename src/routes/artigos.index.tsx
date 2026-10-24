import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articleSearchSchema, type ArticleSearch } from "@/content/payload";
import { readArticles } from "@/content/articles.functions";
import { Container, Section } from "@/components/site/primitives";
import { BancaEditorialBanner } from "@/components/site/banca-editorial-banner";
import { BANCA_EDITORIAL_HERO_IMAGE } from "@/components/site/banca-editorial-image";
import { ConteudoCard, CtaReservado, PageHero } from "@/components/site/blocks";
import { ArticleState, ArticlesPending } from "@/components/site/article-state";
import { articleListPath } from "@/lib/public-url";
import { canonicalLink, pageMeta } from "@/lib/seo";

const PATH = "/artigos";
export const Route = createFileRoute("/artigos/")({
  validateSearch: (search): Partial<ArticleSearch> => articleSearchSchema.parse(search),
  loaderDeps: ({ search }) => articleSearchSchema.parse(search),
  loader: async ({ deps }) => {
    const result = await readArticles({ data: deps });
    if (result.ok && deps.page > Math.max(1, result.page.totalPages)) throw notFound();
    return result;
  },
  head: ({ loaderData, match }) =>
    !loaderData
      ? {
          meta: [
            { title: "Página não encontrada | Banca Paulista" },
            { name: "robots", content: "noindex" },
          ],
        }
      : {
          meta: [
            ...pageMeta({
              title: "Artigos Jurídicos | Banca Paulista",
              description:
                "Publicações informativas sobre Direito Criminal, delegacias e regiões de São Paulo.",
              path: articleListPath(articleSearchSchema.parse(match.search)),
            }),
            ...(!loaderData?.ok || articleSearchSchema.parse(match.search).sort !== "-publishedAt"
              ? [{ name: "robots", content: "noindex" }]
              : []),
          ],
          links: canonicalLink(articleListPath(articleSearchSchema.parse(match.search))),
        },
  pendingComponent: ArticlesPending,
  errorComponent: () => <ArticleState />,
  notFoundComponent: () => <ArticleState missing />,
  component: ConteudosPage,
});
function ConteudosPage() {
  const search = articleSearchSchema.parse(Route.useSearch());
  const navigate = Route.useNavigate();
  const data = Route.useLoaderData();
  if (!data.ok) return <ArticleState />;
  const { docs, categories, page, totalPages } = data.page;
  return (
    <div className="home-light editorial-page">
      <PageHero
        eyebrow="Artigos"
        title="Artigos jurídicos"
        lead="Material de caráter informativo. Não substitui análise individualizada de cada situação."
        image={BANCA_EDITORIAL_HERO_IMAGE}
        crumbs={[
          { name: "Início", path: "/" },
          { name: "Artigos", path: PATH },
        ]}
      />
      <Section>
        <Container>
          <div className="mb-10 flex flex-wrap gap-5">
            <label className="flex flex-col gap-2 text-sm text-muted-foreground">
              Categoria
              <select
                aria-label="Categoria"
                value={search.category}
                onChange={(event) =>
                  void navigate({ search: { ...search, page: 1, category: event.target.value } })
                }
                className="h-10 max-w-full rounded-md border border-input bg-background px-3 text-foreground"
              >
                <option value="">Todas as categorias</option>
                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-muted-foreground">
              Ordenação
              <select
                aria-label="Ordenação"
                value={search.sort}
                onChange={(event) =>
                  void navigate({
                    search: {
                      ...search,
                      page: 1,
                      sort: event.target.value === "publishedAt" ? "publishedAt" : "-publishedAt",
                    },
                  })
                }
                className="h-10 rounded-md border border-input bg-background px-3 text-foreground"
              >
                <option value="-publishedAt">Mais recentes</option>
                <option value="publishedAt">Mais antigos</option>
              </select>
            </label>
          </div>
          {docs.length === 0 && <p className="text-muted-foreground">Nenhum artigo encontrado.</p>}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {docs.map((item) => (
              <ConteudoCard key={item.id} conteudo={item} />
            ))}
          </div>
          {totalPages > 1 && (
            <nav
              aria-label="Paginação de artigos"
              className="mt-10 flex flex-wrap items-center justify-between gap-4"
            >
              {page > 1 ? (
                <Button asChild variant="outline">
                  <Link to="/artigos" search={{ ...search, page: page - 1 }}>
                    <ArrowLeft />
                    Anterior
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <ArrowLeft />
                  Anterior
                </Button>
              )}
              <span className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </span>
              {page < totalPages ? (
                <Button asChild variant="outline">
                  <Link to="/artigos" search={{ ...search, page: page + 1 }}>
                    Próxima
                    <ArrowRight />
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  Próxima
                  <ArrowRight />
                </Button>
              )}
            </nav>
          )}
        </Container>
      </Section>
      <CtaReservado />
    </div>
  );
}
