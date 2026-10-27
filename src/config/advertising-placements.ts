export type AdvertisingMode = "adsense" | "hybrid" | "direct" | "off";
export type AdvertisingProvider = "adsense" | "direct" | "house" | "off";
export type AdvertisingStatus = "active" | "inactive" | "reserved";
export type AdvertisingFormat = "display" | "inArticle" | "multiplex" | "inFeed";

export type AdvertisingPlacementId =
  | "ATLAS-01"
  | "ATLAS-02"
  | "ATLAS-03"
  | "ATLAS-04"
  | "HOME-01"
  | "HOME-02"
  | "NEWS-01"
  | "NEWS-02"
  | "ARTICLE-01"
  | "ARTICLE-02"
  | "ARTICLE-03"
  | "REGION-01"
  | "TERRITORY-01";

export type AdvertisingPlacement = {
  id: AdvertisingPlacementId;
  name: string;
  pages: string;
  location: string;
  implementation: string;
  format: AdvertisingFormat;
  acceptedSizes: readonly string[];
  mobile: string;
  allowedProviders: readonly Exclude<AdvertisingProvider, "off">[];
  provider: AdvertisingProvider;
  adsenseSlot?: string;
  status: AdvertisingStatus;
  editorialRestrictions: string;
  consent: string;
  notes: string;
};

/** Global switch. AdSense still has its independent consent and hostname gates. */
export const ADVERTISING_MODE: AdvertisingMode = "adsense";

const DISPLAY_SLOT = "1053881070";

export const ADVERTISING_PLACEMENTS = {
  "ATLAS-01": {
    id: "ATLAS-01",
    name: "Banner horizontal do cabeçalho do Atlas",
    pages: "/atlas-brasil",
    location: "Coluna direita do hero azul-marinho",
    implementation: "src/routes/atlas-brasil.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "728x90", "até 970x90"],
    mobile: "Empilhado após a apresentação e antes do submenu territorial",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "adsense",
    adsenseSlot: DISPLAY_SLOT,
    status: "active",
    editorialRestrictions: "Não pode invadir o submenu nem o mapa",
    consent: "AdSense somente após consentimento; campanhas próprias seguem sua base aplicável",
    notes: "Prévia discreta em homologação; sem largura mínima fixa",
  },
  "ATLAS-02": {
    id: "ATLAS-02",
    name: "Banner após o mapa do Atlas",
    pages: "/atlas-brasil",
    location: "Após mapa e controles, antes da área editorial",
    implementation: "src/routes/atlas-brasil.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "horizontal"],
    mobile: "Largura do contêiner",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "adsense",
    adsenseSlot: DISPLAY_SLOT,
    status: "active",
    editorialRestrictions: "Nunca dentro de BrazilEditorialAtlas ou próximo aos controles",
    consent: "AdSense somente após consentimento",
    notes: "Posição aprovada na transição para a área editorial",
  },
  "ATLAS-03": {
    id: "ATLAS-03",
    name: "Banner entre editorias do Atlas",
    pages: "/atlas-brasil",
    location: "Entre duas seções editoriais completas",
    implementation: "src/routes/atlas-brasil.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "horizontal"],
    mobile: "Largura do contêiner",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "off",
    adsenseSlot: DISPLAY_SLOT,
    status: "inactive",
    editorialRestrictions: "Exige conteúdo suficiente; nunca entre título e primeira reportagem",
    consent: "AdSense somente após consentimento",
    notes: "Inventariado para ativação futura",
  },
  "ATLAS-04": {
    id: "ATLAS-04",
    name: "Banner ao final editorial do Atlas",
    pages: "/atlas-brasil",
    location: "Após a última editoria e antes das fontes",
    implementation: "src/routes/atlas-brasil.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "horizontal"],
    mobile: "Largura do contêiner",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "off",
    adsenseSlot: DISPLAY_SLOT,
    status: "inactive",
    editorialRestrictions: "Não confundir com fontes ou recomendações editoriais",
    consent: "AdSense somente após consentimento",
    notes: "Inventariado para ativação futura",
  },
  "HOME-01": {
    id: "HOME-01",
    name: "Banner após os primeiros destaques da homepage",
    pages: "/",
    location: "Entre as primeiras seções editoriais",
    implementation: "src/routes/index.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "horizontal"],
    mobile: "Largura do contêiner",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "adsense",
    adsenseSlot: DISPLAY_SLOT,
    status: "active",
    editorialRestrictions: "Só aparece com inventário editorial mínimo",
    consent: "AdSense somente após consentimento",
    notes: "Não integra schemas ou contagens editoriais",
  },
  "HOME-02": {
    id: "HOME-02",
    name: "Banner após o Atlas da homepage",
    pages: "/",
    location: "Após o Atlas e antes da seção seguinte",
    implementation: "src/routes/index.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "horizontal"],
    mobile: "Largura do contêiner",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "off",
    adsenseSlot: DISPLAY_SLOT,
    status: "inactive",
    editorialRestrictions: "Não interromper controles do Atlas",
    consent: "AdSense somente após consentimento",
    notes: "Disponível para ativação futura",
  },
  "NEWS-01": {
    id: "NEWS-01",
    name: "Anúncio In-feed da listagem de notícias",
    pages: "/noticias",
    location: "Após aproximadamente cinco cards",
    implementation: "src/routes/noticias.tsx",
    format: "inFeed",
    acceptedSizes: ["fluid", "layout key oficial"],
    mobile: "Item independente em largura total",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "adsense",
    adsenseSlot: "4913447061",
    status: "active",
    editorialRestrictions: "Não imitar reportagem nem entrar na contagem de notícias",
    consent: "AdSense somente após consentimento",
    notes: "Exige ao menos seis notícias",
  },
  "NEWS-02": {
    id: "NEWS-02",
    name: "Display lateral da página de notícias",
    pages: "/noticias",
    location: "Coluna lateral quando houver largura segura",
    implementation: "src/routes/noticias.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "retangular"],
    mobile: "Oculto",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "off",
    adsenseSlot: DISPLAY_SLOT,
    status: "reserved",
    editorialRestrictions: "Não competir com navegação ou destaques",
    consent: "AdSense somente após consentimento",
    notes: "Sem componente montado nesta etapa",
  },
  "ARTICLE-01": {
    id: "ARTICLE-01",
    name: "Anúncio no corpo da reportagem",
    pages: "/noticias/:slug",
    location: "Após os primeiros parágrafos elegíveis",
    implementation: "src/components/site/news-article-page.tsx",
    format: "inArticle",
    acceptedSizes: ["fluid", "in-article"],
    mobile: "Fluido entre blocos completos",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "adsense",
    adsenseSlot: "8409626914",
    status: "active",
    editorialRestrictions:
      "Somente matéria longa e não sensível; nunca dentro de estruturas semânticas",
    consent: "AdSense somente após consentimento",
    notes: "No máximo um por reportagem",
  },
  "ARTICLE-02": {
    id: "ARTICLE-02",
    name: "Multiplex ao final da reportagem",
    pages: "/noticias/:slug",
    location: "Após texto, fontes e informações essenciais",
    implementation: "src/components/site/news-article-page.tsx",
    format: "multiplex",
    acceptedSizes: ["autorelaxed"],
    mobile: "Responsivo em largura total",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "adsense",
    adsenseSlot: "3157300237",
    status: "active",
    editorialRestrictions: "Separado das recomendações próprias; apenas reportagem elegível",
    consent: "AdSense somente após consentimento",
    notes: "No máximo um por reportagem",
  },
  "ARTICLE-03": {
    id: "ARTICLE-03",
    name: "Display lateral da reportagem",
    pages: "/noticias/:slug",
    location: "Sidebar editorial em desktop",
    implementation: "src/components/site/news-article-page.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "retangular"],
    mobile: "Oculto abaixo de 900 px",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "adsense",
    adsenseSlot: DISPLAY_SLOT,
    status: "active",
    editorialRestrictions: "Somente reportagem elegível e longe de controles",
    consent: "AdSense somente após consentimento",
    notes: "Usa media query no componente",
  },
  "REGION-01": {
    id: "REGION-01",
    name: "Banner entre seções regionais",
    pages: "/noticias/regioes/:slug",
    location: "Entre blocos informativos e últimas notícias",
    implementation: "src/components/site/news-geography-portal.tsx",
    format: "display",
    acceptedSizes: ["responsivo", "horizontal"],
    mobile: "Largura do contêiner",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "adsense",
    adsenseSlot: DISPLAY_SLOT,
    status: "active",
    editorialRestrictions: "Não interferir na navegação territorial",
    consent: "AdSense somente após consentimento",
    notes: "Ativo somente no nível Região com conteúdo principal",
  },
  "TERRITORY-01": {
    id: "TERRITORY-01",
    name: "Display territorial informativo",
    pages: "Páginas territoriais elegíveis",
    location: "Entre seções informativas completas",
    implementation: "A definir na ativação",
    format: "display",
    acceptedSizes: ["responsivo", "horizontal"],
    mobile: "Largura do contêiner",
    allowedProviders: ["adsense", "direct", "house"],
    provider: "off",
    adsenseSlot: DISPLAY_SLOT,
    status: "reserved",
    editorialRestrictions:
      "Nunca perto de telefones, formulários, endereços ou botões de atendimento",
    consent: "AdSense somente após consentimento",
    notes: "Nenhum componente montado nesta etapa",
  },
} as const satisfies Record<AdvertisingPlacementId, AdvertisingPlacement>;

export type DirectCampaign = {
  id: string;
  placementIds: readonly AdvertisingPlacementId[];
  provider: "direct" | "house";
  label: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  active: boolean;
};

/** Campaign creatives are added here after commercial and editorial approval. */
export const DIRECT_CAMPAIGNS: readonly DirectCampaign[] = [];

export function directCampaignFor(placementId: AdvertisingPlacementId) {
  return DIRECT_CAMPAIGNS.find(
    (campaign) => campaign.active && campaign.placementIds.includes(placementId),
  );
}

export function resolvePlacementProvider(
  placementId: AdvertisingPlacementId,
  mode: AdvertisingMode = ADVERTISING_MODE,
): AdvertisingProvider {
  const placement: AdvertisingPlacement = ADVERTISING_PLACEMENTS[placementId];
  if (mode === "off" || placement.status !== "active" || placement.provider === "off") return "off";

  const campaign = directCampaignFor(placementId);
  if (mode === "adsense") {
    return placement.allowedProviders.includes("adsense") ? "adsense" : "off";
  }
  if (mode === "direct") {
    return campaign && placement.allowedProviders.includes(campaign.provider)
      ? campaign.provider
      : "off";
  }
  if (
    campaign &&
    placement.provider === campaign.provider &&
    placement.allowedProviders.includes(campaign.provider)
  ) {
    return campaign.provider;
  }
  return placement.allowedProviders.includes("adsense") ? "adsense" : "off";
}
