import { marca } from "@/content/local/settings";
import { cn } from "@/lib/utils";

type BrandVariant = "horizontal" | "stacked" | "symbol-only";
type BrandScheme = "light" | "dark" | "monochrome";
type BrandSize = "compact" | "default" | "large";
type BrandPresentation = "default" | "header";

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
  presentation = "default",
  className,
}: {
  variant?: BrandVariant;
  scheme?: BrandScheme;
  size?: BrandSize;
  presentation?: BrandPresentation;
  className?: string;
}) {
  const currentSize = sizes[size];
  const refinedHeader = presentation === "header" && variant === "horizontal";
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
      className={cn(
        "flex min-w-0 flex-col",
        variant === "stacked" && "items-center text-center",
        refinedHeader && "lg:items-center lg:text-center",
      )}
    >
      <span
        className={cn(
          "whitespace-nowrap uppercase leading-[1.05] tracking-[-0.015em]",
          currentSize.name,
          textColor,
          refinedHeader && "lg:text-[20px]",
        )}
        style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif', fontWeight: 700 }}
      >
        {marca.completo}
      </span>
      {refinedHeader ? (
        <span
          className="mt-[5px] hidden h-[2px] w-[60%] shrink-0 bg-gold lg:mt-[3px] lg:h-[1.5px] lg:block"
          aria-hidden="true"
        />
      ) : null}
      <span
        className={cn(
          "mt-[4px] whitespace-nowrap font-semibold uppercase leading-none tracking-[0.1em]",
          currentSize.tagline,
          taglineColor,
          variant === "horizontal" && size === "default" && "max-[359px]:sr-only",
          refinedHeader && "lg:mt-[3px] lg:text-[8.5px] lg:tracking-[0.11em]",
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
        refinedHeader && "lg:gap-3",
        className,
      )}
    >
      <img
        src={symbol}
        width="100"
        height="100"
        alt=""
        className={cn("shrink-0", currentSize.symbol, refinedHeader && "lg:size-10")}
      />
      {typography}
    </span>
  );
}
