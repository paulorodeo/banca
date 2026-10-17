import { useState } from "react";
import { noticiaFallback } from "@/content/local/settings";
import type { Media } from "@/content/types";

export function NewsImage({
  image,
  className,
  fallbackClassName,
  loading = "lazy",
  fetchPriority,
}: {
  image?: Media;
  className?: string;
  fallbackClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}) {
  const [originalFailed, setOriginalFailed] = useState(false);

  if (image && !originalFailed) {
    return (
      <img
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={loading}
        fetchPriority={fetchPriority}
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
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={[className, fallbackClassName].filter(Boolean).join(" ")}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.hidden = true;
        }}
      />
    </picture>
  );
}
