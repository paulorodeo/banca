import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mx-auto w-full max-w-[82.5rem] px-5 sm:px-7 md:px-10", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  className,
  children,
  tone = "base",
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tone?: "base" | "raised";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-18 md:py-24 lg:py-28",
        tone === "raised" && "bg-graphite/60 border-y border-border",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  as: As = "h2",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
      <As className="text-balance text-3xl leading-[1.08] md:text-[2.75rem]">{title}</As>
      {lead ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>
      ) : null}
    </div>
  );
}

const actionBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-6 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-[color,background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const actionVariants = {
  solid:
    "border border-gold bg-gold text-brand-navy shadow-sm hover:-translate-y-px hover:bg-gold-light",
  outline: "border border-gold/55 text-gold hover:border-gold hover:bg-gold/10",
  ghost: "text-ivory/80 hover:bg-ivory/5 hover:text-gold",
} as const;

type Variant = keyof typeof actionVariants;

export function ActionLink({
  to,
  variant = "solid",
  className,
  children,
  onClick,
}: {
  to: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
  onClick?: ComponentProps<"a">["onClick"];
}) {
  return (
    <Link to={to} onClick={onClick} className={cn(actionBase, actionVariants[variant], className)}>
      {children}
    </Link>
  );
}

export function ActionButton({
  variant = "solid",
  className,
  children,
  ...rest
}: { variant?: Variant } & ComponentProps<"button">) {
  return (
    <button className={cn(actionBase, actionVariants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden className={cn("hairline", className)} />;
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Conteúdo estático controlado pela camada de conteúdo.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
