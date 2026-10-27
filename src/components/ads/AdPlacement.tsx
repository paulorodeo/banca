import { useEffect, useRef, useState } from "react";
import {
  ADSENSE_FORMATS,
  ADSENSE_PUBLISHER_ID,
  pushAdSenseSlotOnce,
  type AdSenseFormat,
} from "@/lib/adsense";
import {
  ADVERTISING_PLACEMENTS,
  directCampaignFor,
  resolvePlacementProvider,
  type AdvertisingPlacementId,
} from "@/config/advertising-placements";
import { useAdSense } from "./adsense-context";

export function AdPlacement({
  format,
  placement,
  className,
}: {
  format: AdSenseFormat;
  placement: AdvertisingPlacementId;
  className?: string | undefined;
}) {
  const { mode, scriptReady } = useAdSense();
  const elementRef = useRef<HTMLModElement>(null);
  const config = ADSENSE_FORMATS[format];
  const placementConfig = ADVERTISING_PLACEMENTS[placement];
  const provider = resolvePlacementProvider(placement);
  const campaign = directCampaignFor(placement);

  useEffect(() => {
    const element = elementRef.current;
    if (provider !== "adsense" || mode !== "live" || !scriptReady || !element) return;
    window.adsbygoogle = window.adsbygoogle || [];
    pushAdSenseSlotOnce(element, window.adsbygoogle);
  }, [mode, provider, scriptReady]);

  if (placementConfig.format !== format || provider === "off") return null;

  if ((provider === "direct" || provider === "house") && campaign) {
    return (
      <aside
        className={`advertising-direct ${className ?? ""}`.trim()}
        aria-label={`Publicidade · ${campaign.label}`}
        data-ad-placement={placement}
        data-ad-provider={provider}
      >
        <span className="adsense-live-label">Publicidade</span>
        <a href={campaign.href} rel="sponsored">
          <img src={campaign.imageSrc} alt={campaign.imageAlt} />
        </a>
      </aside>
    );
  }

  if (mode === "preview") {
    return (
      <aside
        className={`adsense-preview ${className ?? ""}`.trim()}
        aria-label={`Anúncio — posição de prévia: ${placementConfig.name}`}
        data-ad-placement={placement}
        data-ad-preview={placement}
      >
        {placement === "ATLAS-01" ? (
          <span>Publicidade · Display responsivo</span>
        ) : (
          <>
            <span>Anúncios</span>
            <small>Prévia de posição · anúncios reais desativados</small>
          </>
        )}
      </aside>
    );
  }
  if (mode !== "live" || !scriptReady) return null;

  return (
    <div className={`adsense-live ${className ?? ""}`.trim()} data-ad-placement={placement}>
      <span className="adsense-live-label">
        {placement === "ATLAS-01" ? "Publicidade" : "Anúncios"}
      </span>
      <ins
        ref={elementRef}
        className="adsbygoogle"
        style={config.style}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={config.slot}
        {...config.attributes}
        aria-label={`Anúncio · ${placementConfig.name}`}
      />
    </div>
  );
}

export function DisplayAd({
  placement,
  className,
}: Omit<Parameters<typeof AdPlacement>[0], "format">) {
  return <AdPlacement format="display" placement={placement} className={className} />;
}

export function InArticleAd({
  placement,
  className,
}: Omit<Parameters<typeof AdPlacement>[0], "format">) {
  return <AdPlacement format="inArticle" placement={placement} className={className} />;
}

export function MultiplexAd({
  placement,
  className,
}: Omit<Parameters<typeof AdPlacement>[0], "format">) {
  return <AdPlacement format="multiplex" placement={placement} className={className} />;
}

export function InFeedAd({
  placement,
  className,
}: Omit<Parameters<typeof AdPlacement>[0], "format">) {
  return <AdPlacement format="inFeed" placement={placement} className={className} />;
}

export function DesktopDisplayAd({
  placement,
  className,
}: Omit<Parameters<typeof AdPlacement>[0], "format">) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const update = () => setWide(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return wide ? <DisplayAd placement={placement} className={className} /> : null;
}
