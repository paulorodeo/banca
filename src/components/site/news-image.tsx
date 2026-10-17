import { useState } from "react";
import { noticiaFallback } from "@/content/local/settings";
import type { Media } from "@/content/types";

export function NewsImage({ image, className }: { image?: Media; className?: string }) {
  const [originalFailed, setOriginalFailed] = useState(false);

  if (image && !originalFailed) {
    return (
      <img
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className={className}
        onError={() => setOriginalFailed(true)}
      />
    );
  }

  return (
    <picture>
      <source srcSet={noticiaFallback.avif} type="image/avif" />
      <img
        src={noticiaFallback.webp}
        alt={noticiaFallback.alt}
        loading="lazy"
        decoding="async"
        className={className}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.hidden = true;
        }}
      />
    </picture>
  );
}
