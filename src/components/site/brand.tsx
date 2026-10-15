import { Landmark } from "lucide-react";
import { marca } from "@/content/local/settings";
import { cn } from "@/lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-gold", className)}>
      <Landmark className="size-8 shrink-0 stroke-[1.65]" aria-hidden />
      <span className="h-8 w-px bg-gold/55" aria-hidden />
      <span className="flex min-w-0 flex-col">
        <span className="whitespace-nowrap font-serif text-[1.08rem] uppercase leading-none tracking-[0.02em] text-ivory sm:text-[1.18rem]">
          {marca.curto}
        </span>
        {!compact ? (
          <span className="mt-1.5 whitespace-nowrap text-[0.43rem] font-semibold uppercase leading-none tracking-[0.15em] text-ivory/58 sm:text-[0.48rem]">
            Informação jurídica e territorial
          </span>
        ) : null}
      </span>
    </span>
  );
}
