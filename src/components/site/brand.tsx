import { Landmark } from "lucide-react";
import { marca } from "@/content/local/settings";

export function Brand() {
  return <span className="flex items-center gap-3 text-gold">
    <Landmark className="size-8 shrink-0" aria-hidden />
    <span className="flex flex-col">
      <span className="font-serif text-xl leading-tight text-ivory">{marca.curto}</span>
      <span className="mt-1 text-[0.6rem] leading-tight text-muted-foreground">Advogados · Plantão e Defesa Criminal</span>
    </span>
  </span>;
}
