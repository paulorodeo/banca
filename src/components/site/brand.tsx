import { marca } from "@/content/local/settings";
import { cn } from "@/lib/utils";

type BrandVariant = "horizontal" | "stacked" | "symbol-only";
type BrandScheme = "light" | "dark" | "monochrome";
type BrandSize = "compact" | "default" | "large";

const sizes = {
  compact: {
    symbol: "size-9",
    name: "text-[1.2rem]",
    tagline: "text-[0.52rem]",
  },
  default: {
    symbol: "size-9 sm:size-[42px]",
    name: "text-[1.12rem] sm:text-[23px]",
    tagline: "text-[0.56rem] sm:text-[9px]",
  },
  large: {
    symbol: "size-14",
    name: "text-3xl",
    tagline: "text-[0.62rem]",
  },
} as const;

export function Brand({
  variant = "horizontal",
  scheme = "dark",
  size = "default",
  className,
}: {
  variant?: BrandVariant;
  scheme?: BrandScheme;
  size?: BrandSize;
  className?: string;
}) {
  const currentSize = sizes[size];
  const inverse = scheme === "dark";
  const symbol =
    scheme === "monochrome"
      ? "/brand/simbolo-banca-paulista-monocromatico.svg"
      : inverse
        ? "/brand/simbolo-banca-paulista-inverso.svg"
        : "/brand/simbolo-banca-paulista.svg";
  const textColor = inverse ? "text-ivory" : "text-brand-navy";
  const taglineColor = inverse ? "text-ivory/75" : "text-brand-navy/70";

  if (variant === "symbol-only") {
    return (
      <img
        src={symbol}
        width="100"
        height="100"
        alt=""
        className={cn("shrink-0", currentSize.symbol, className)}
      />
    );
  }

  const typography = (
    <span
      className={cn("flex min-w-0 flex-col", variant === "stacked" && "items-center text-center")}
    >
      <span
        className={cn(
          "whitespace-nowrap uppercase leading-[1.05] tracking-[-0.015em]",
          currentSize.name,
          textColor,
        )}
        style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', fontWeight: 700 }}
      >
        {marca.completo}
      </span>
      <span
        className={cn(
          "mt-[4px] whitespace-nowrap font-semibold uppercase leading-none tracking-[0.1em]",
          currentSize.tagline,
          taglineColor,
          variant === "horizontal" && size === "default" && "max-[359px]:sr-only",
        )}
      >
        Informação jurídica e territorial
      </span>
    </span>
  );

  return (
    <span
      className={cn(
        variant === "stacked"
          ? "inline-flex flex-col items-center gap-3"
          : "inline-flex items-center gap-3",
        className,
      )}
    >
      <img
        src={symbol}
        width="100"
        height="100"
        alt=""
        className={cn("shrink-0", currentSize.symbol)}
      />
      {typography}
    </span>
  );
}
