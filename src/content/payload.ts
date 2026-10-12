import { absoluteUrl, DEFAULT_SITE_ORIGIN } from "../lib/public-url";
import { z } from 'zod';
import type { ConteudoJuridico, Media } from './types';

/** Payload 3 native drafts are the sole publication authority. */
export const articleSearchSchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).catch(1),
  limit: z.coerce.number().int().min(1).max(24).catch(12),
  sort: z.enum(['-publishedAt', 'publishedAt']).catch('-publishedAt'),
  category: z.string().regex(/^[a-z0-9-]{1,100}$/).catch(''),
});
export type ArticleSearch = z.infer<typeof articleSearchSchema>;
export interface RichNode {
  type: string;
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  start?: number;
  url?: string;
  media?: Media;
  children?: RichNode[];
}
export interface ArticlePage {
  docs: ConteudoJuridico[];
  page: number;
  totalPages: number;
  totalDocs: number;
  categories: { slug: string; title: string }[];
  source: 'local' | 'payload';
}
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160);
const mediaSchema = z.object({
  id: z.union([z.string(), z.number()]), url: z.string().max(2048),
  alt: z.string().max(1000), width: z.number().positive().optional(), height: z.number().positive().optional(),
  caption: z.string().max(2000).optional(),
});
const reference = z.object({ slug });
const categorySchema = reference.extend({ title: z.string().min(1).max(200) });
const authorSchema = z.object({ name: z.string().min(1).max(200), bio: z.string().max(5000).optional(), photo: mediaSchema.nullish(), oab: z.string().max(100).optional() });
export const payloadArticleSchema = z.object({
  id: z.union([z.string(), z.number()]), title: z.string().min(1).max(500), slug,
  excerpt: z.string().min(1).max(3000), _status: z.literal('published'),
  publishedAt: z.string().datetime({ offset: true }), updatedAt: z.string().datetime({ offset: true }).optional(),
  cover: mediaSchema.nullish(), category: categorySchema.nullish(), author: authorSchema.nullish(),
  content: z.object({ root: z.object({ type: z.literal('root'), children: z.array(z.unknown()).max(1000) }) }),
  seo: z.object({ title: z.string().max(500).optional(), description: z.string().max(3000).optional(), canonical: z.string().max(2048).optional(), socialImage: mediaSchema.nullish() }).nullish(),
  regions: z.array(reference).max(100).optional(), delegacias: z.array(reference).max(200).optional(),
  bairros: z.array(reference).max(200).optional(), themes: z.array(reference).max(100).optional(),
});
export type PayloadArticle = z.infer<typeof payloadArticleSchema>;

export function safeUrl(value: string, base?: string): string | undefined {
  if (!value.trim()) return undefined;
  try {
    const url = new URL(value, base);
    const local = ['localhost', '127.0.0.1'].includes(url.hostname);
    return (url.protocol === 'https:' || (local && url.protocol === 'http:')) && !url.username && !url.password ? url.href : undefined;
  } catch { return undefined; }
}
function media(value: z.infer<typeof mediaSchema> | null | undefined, base: string): Media | undefined {
  if (!value) return undefined;
  const url = safeUrl(value.url, base);
  if (!url) throw new Error('Invalid CMS media URL');
  return { id: String(value.id), url, alt: value.alt, ...(value.width ? { width: value.width } : {}), ...(value.height ? { height: value.height } : {}), ...(value.caption ? { caption: value.caption } : {}) };
}
const lexicalNodeSchema = z.object({
  type: z.string(), text: z.string().max(100000).optional(), format: z.union([z.number(), z.string()]).optional(),
  tag: z.string().optional(), listType: z.string().optional(), start: z.number().optional(),
  children: z.array(z.unknown()).max(1000).optional(),
  fields: z.object({ url: z.string().optional(), linkType: z.string().optional(), doc: z.unknown().optional() }).optional(),
  url: z.string().optional(), value: mediaSchema.nullish(),
});
/** Whitelisted Lexical nodes only; no HTML, CSS or arbitrary CMS attributes survive. */
export function parseLexical(nodes: unknown[], base: string, depth = 0, budget = { remaining: 5000 }): RichNode[] {
  if (depth > 30) throw new Error('CMS rich text is too deeply nested');
  return nodes.flatMap((input): RichNode[] => {
    if (--budget.remaining < 0) throw new Error('CMS rich text is too large');
    const node = lexicalNodeSchema.parse(input);
    const children = node.children ? parseLexical(node.children, base, depth + 1, budget) : [];
    if (node.type === 'text') return [{ type: 'text', text: node.text ?? '', format: typeof node.format === 'number' ? node.format : 0 }];
    if (node.type === 'upload') {
      const image = media(node.value, base);
      return image ? [{ type: 'image', media: image }] : [];
    }
    if (node.type === 'link' || node.type === 'autolink') {
      const raw = node.fields?.url ?? node.url ?? '';
      // Only articles relations are supported; all other relationships remain plain text.
      const relation = node.fields?.doc as { relationTo?: unknown; value?: { slug?: unknown } } | undefined;
      const relationSlug = relation?.value?.slug;
      const internal = node.fields?.linkType === 'internal';
      const url = internal
        ? relation?.relationTo === 'articles' && typeof relationSlug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(relationSlug) ? absoluteUrl(`/artigos/${relationSlug}`) : undefined
        : raw.trim() && !raw.startsWith('//') ? safeUrl(raw, DEFAULT_SITE_ORIGIN) : undefined;
      return url ? [{ type: 'link', url, children }] : children;
    }
    if (node.type === 'heading') return [{ type: 'heading', tag: ['h1', 'h2', 'h3'].includes(node.tag ?? '') ? (node.tag ?? 'h3') : 'h3', children }];
    if (node.type === 'list') return [{ type: 'list', listType: node.listType === 'number' ? 'number' : 'bullet', start: Math.max(1, node.start ?? 1), children }];
    if (['paragraph', 'listitem', 'quote', 'linebreak', 'horizontalrule'].includes(node.type)) return [{ type: node.type, children }];
    // Unknown/custom blocks are rejected rather than silently publishing incomplete content.
    throw new Error(`Unsupported Lexical node: ${node.type}`);
  });
}
export interface TerritoryRegistry { regions: Set<string>; delegacias: Set<string>; bairros: Set<string>; themes: Set<string> }
export function adaptPayloadArticle(input: unknown, base: string, territory: TerritoryRegistry): ConteudoJuridico {
  const doc = payloadArticleSchema.parse(input);
  const refs = (kind: keyof TerritoryRegistry, values: { slug: string }[] = []) => values.map(value => {
    if (!territory[kind].has(value.slug)) throw new Error(`Unknown territorial reference: ${kind}/${value.slug}`);
    return value.slug;
  });
  const capa = media(doc.cover, base);
  const social = media(doc.seo?.socialImage, base);
  const foto = media(doc.author?.photo, base);
  return {
    id: String(doc.id), slug: doc.slug, titulo: doc.title, resumo: doc.excerpt,
    categoria: doc.category?.title ?? 'Artigos', publicadoEm: doc.publishedAt, status: 'publicado',
    ...(doc.updatedAt ? { atualizadoEm: doc.updatedAt } : {}), corpo: [],
    richText: parseLexical(doc.content.root.children, base),
    ...(capa ? { capa } : {}),
    ...(doc.author ? { autor: { nome: doc.author.name, bio: doc.author.bio ?? '', ...(doc.author.oab ? { oab: doc.author.oab } : {}), ...(foto ? { foto } : {}) } } : {}),
    seoEditorial: { ...(doc.seo?.title ? { title: doc.seo.title } : {}), ...(doc.seo?.description ? { description: doc.seo.description } : {}), ...(social ? { socialImage: social } : {}) },
    // Canonicals are generated by the public site, never trusted from the CMS.
    regions: refs('regions', doc.regions), delegacias: refs('delegacias', doc.delegacias), bairros: refs('bairros', doc.bairros),
    areasRelacionadas: refs('themes', doc.themes),
  };
}
