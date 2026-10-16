import { absoluteUrl } from "./public-url";
import type { Delegacia, FAQ } from "@/content/types";

import { editorialIdentity } from "@/content/local/settings";
import { zonePhotography } from "@/content/local/visual-media";

export const canonical = (path: string): string => absoluteUrl(path);
export const ORG_NAME = editorialIdentity.name;

export function socialImageFor(path: string): string {
  const slug = path.startsWith("/regioes/")
    ? path.split("/")[2]
    : path === "/bairros/pinheiros"
      ? "zona-oeste"
      : undefined;
  return slug && zonePhotography[slug]
    ? `/images/sp/${zonePhotography[slug].asset}.webp`
    : editorialIdentity.socialImage;
}

interface MetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  image?: string;
  imageMetadata?: { width?: number; height?: number; alt?: string };
}

export function pageMeta({
  title,
  description,
  path,
  type = "website",
  image,
  imageMetadata,
}: MetaInput) {
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
  const social = image || socialImageFor(path);
  if (social) {
    meta.push({ property: "og:image", content: social });
    meta.push({ name: "twitter:image", content: social });
    const institutional = social === editorialIdentity.socialImage;
    if (institutional || social.startsWith("/images/sp/")) {
      meta.push({ property: "og:image:width", content: institutional ? "1200" : "800" });
      meta.push({ property: "og:image:height", content: institutional ? "630" : "450" });
      meta.push({ property: "og:image:type", content: institutional ? "image/png" : "image/webp" });
    }
    if (
      !institutional &&
      !social.startsWith("/images/sp/") &&
      imageMetadata?.width &&
      imageMetadata?.height
    ) {
      meta.push({ property: "og:image:width", content: String(imageMetadata.width) });
      meta.push({ property: "og:image:height", content: String(imageMetadata.height) });
    }
    meta.push({
      property: "og:image:alt",
      content: institutional ? editorialIdentity.name : imageMetadata?.alt || title,
    });
    meta.push({
      name: "twitter:image:alt",
      content: institutional ? editorialIdentity.name : imageMetadata?.alt || title,
    });
  }
  return meta;
}

export const canonicalLink = (path: string) => [{ rel: "canonical", href: canonical(path) }];

export function organizationSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    description: editorialIdentity.description,
    disambiguatingDescription: editorialIdentity.disclaimer,
    url: canonical("/"),
    logo: canonical("/brand/simbolo-banca-paulista-fundo-azul.svg"),
  };
}

export function websiteSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORG_NAME,
    url: canonical(path),
    inLanguage: "pt-BR",
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

export function newsArticleSchema(input: {
  titulo: string;
  resumo: string;
  path: string;
  publicadoEm: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.titulo,
    description: input.resumo,
    url: canonical(input.path),
    datePublished: input.publicadoEm,
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
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: dp.h1,
      description: dp.seo.description,
      url: canonical(dp.seo.canonicalPath),
    },
    faqSchema(dp.faq),
    breadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Delegacias", path: "/delegacias" },
      { name: dp.h1, path: dp.seo.canonicalPath },
    ]),
  ];
}
