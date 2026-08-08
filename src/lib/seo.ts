import type { Delegacia, FAQ } from "@/content/types";

/**
 * Canonical configurável. Enquanto não houver domínio definitivo, usamos
 * caminhos relativos — resolvidos pelo crawler contra o host em uso.
 */
export const SITE_ORIGIN = "";

export const canonical = (path: string): string => `${SITE_ORIGIN}${path}`;

export const ORG_NAME = "Paulo Sinigalia — Advocacia e Consultoria Jurídica";
export const ATTORNEY_NAME = "Paulo José Sinigalia";
export const OAB = "OAB/SP 411.502";

/** Endereço real e único do escritório. Não criar variações por página. */
export const OFFICE_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Rua Antônio Raposo Barreto, 31",
  addressLocality: "São Paulo",
  addressRegion: "SP",
  postalCode: "04904-170",
  addressCountry: "BR",
  // Bairro postal do escritório
  name: "Jardim das Flores",
} as const;

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

export function legalServiceSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: ORG_NAME,
    url: canonical(path),
    areaServed: { "@type": "City", name: "São Paulo" },
    address: OFFICE_ADDRESS,
    provider: {
      "@type": "Attorney",
      name: ATTORNEY_NAME,
      identifier: OAB,
      knowsLanguage: "pt-BR",
    },
  };
}

export function attorneySchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: ATTORNEY_NAME,
    identifier: OAB,
    url: canonical(path),
    areaServed: { "@type": "City", name: "São Paulo" },
    worksFor: { "@type": "LegalService", name: ORG_NAME },
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
    author: { "@type": "Person", name: ATTORNEY_NAME, identifier: OAB },
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
    legalServiceSchema(dp.seo.canonicalPath),
    faqSchema(dp.faq),
    breadcrumbSchema([
      { name: "Início", path: "/" },
      { name: "Delegacias", path: "/delegacias" },
      { name: dp.h1, path: dp.seo.canonicalPath },
    ]),
  ];
}