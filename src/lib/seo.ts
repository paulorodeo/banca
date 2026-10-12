import type { Delegacia, FAQ } from "@/content/types";

/**
 * Canonical configurável. Enquanto não houver domínio definitivo, usamos
 * caminhos relativos — resolvidos pelo crawler contra o host em uso.
 */
export const SITE_ORIGIN = "";

export const canonical = (path: string): string => `${SITE_ORIGIN}${path}`;

export const ORG_NAME = "Banca Paulista de Advogados";

interface MetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  image?: string;
}

export function pageMeta({ title, description, path, type = "website", image }: MetaInput) {
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: canonical(path) },
    { property: "og:locale", content: "pt_BR" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  return meta;
}

export const canonicalLink = (path: string) => [{ rel: "canonical", href: canonical(path) }];

export function organizationSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    description: "Portal editorial e territorial sobre defesa criminal e delegacias de São Paulo.",
    url: canonical(path),
  };
}

export function websiteSchema(path: string) {
  return {
    "@context": "https://schema.org", "@type": "WebSite",
    name: ORG_NAME, url: canonical(path), inLanguage: "pt-BR",
    publisher: { "@type": "Organization", name: ORG_NAME },
  };
}

export function faqSchema(faq: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: { "@type": "Answer", text: item.resposta },
    })),
  };
}

export function articleSchema(input: {
  titulo: string;
  resumo: string;
  path: string;
  publicadoEm: string;
  atualizadoEm?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.titulo,
    description: input.resumo,
    url: canonical(input.path),
    datePublished: input.publicadoEm,
    ...(input.atualizadoEm ? { dateModified: input.atualizadoEm } : {}),
    // No author is asserted unless a real verified contributor is supplied.
    publisher: { "@type": "Organization", name: ORG_NAME },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function delegaciaJsonLd(dp: Delegacia) {
  return [
    { "@context": "https://schema.org", "@type": "WebPage", name: dp.h1, description: dp.seo.description, url: canonical(dp.seo.canonicalPath) },
    faqSchema(dp.faq),
    breadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Delegacias", path: "/delegacias" },
      { name: dp.h1, path: dp.seo.canonicalPath },
    ]),
  ];
}