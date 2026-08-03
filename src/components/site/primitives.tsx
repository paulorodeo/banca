import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-10", className)}>{children}</div>;
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
        "py-20 md:py-28",
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
      <As className="text-balance text-3xl leading-[1.15] md:text-[2.75rem]">{title}</As>
      {lead ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">{lead}</p>
      ) : null}
    </div>
  );
}

const actionBase =
  "inline-flex items-center justify-center gap-2 rounded-xs px-6 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-all duration-300";

const actionVariants = {
  solid: "bg-gold text-primary-foreground hover:bg-gold-light",
  outline: "border border-gold/45 text-gold hover:border-gold hover:bg-gold/8",
  ghost: "text-ivory/80 hover:text-gold",
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