/** Reservado para futura publicidade. Não carrega anúncios nem recursos externos. */
export function AdPlaceholder() {
  return (
    <aside
      aria-label="Espaço reservado para publicidade"
      className="h-fit rounded-xs border border-border bg-muted/25 p-3"
    >
      <p className="mb-2 text-center text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
        Publicidade
      </p>
      <div
        aria-hidden="true"
        className="mx-auto aspect-[6/5] w-full max-w-[300px] rounded-sm border border-dashed border-border bg-background/60"
      />
    </aside>
  );
}
