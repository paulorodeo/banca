import { queryOptions } from '@tanstack/react-query';
import { readArticle, readArticles } from './articles.functions';
import type { ArticleSearch } from './payload';
export const articlesQuery = (search: ArticleSearch) => queryOptions({
  queryKey: ['editorial', 'articles', search], queryFn: () => readArticles({ data: search }), staleTime: 0,
});
export const articleQuery = (slug: string) => queryOptions({
  queryKey: ['editorial', 'article', slug], queryFn: () => readArticle({ data: { slug } }), staleTime: 0,
});
