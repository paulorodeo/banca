<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep new police-district editorial entries in typed local content modules and register each in the central district order, territorial graph, and home region collection so the existing shared page template remains authoritative.
- Keep the zone (zona) architecture centralized in `src/content/local/zonas.ts`: every region in `regioes.ts` must declare a valid zona slug, and the home renders zone cards plus a closing "Todas as regiões" card instead of neighborhood cards.

- Keep brand settings and publisher metadata centralized; the portal must not imply a law firm or individual attorney through shared schemas. This separates the editorial operator from future verified professionals.
- Publish only approved editorial articles; inherited drafts remain separate until authorship and permission are verified. This prevents false reassignment of authorship.
- Preserve district URLs and the centralized territorial graph while revising typed local content. This protects geographic navigation during identity changes.
- Retired legal intake returns HTTP 410 without reading or logging submitted case data. This prevents editorial contact from becoming a legal-case collection channel.
- Keep the English Payload contract and Lexical validation in one adapter; article reads cross public server functions while territory stays local. This preserves the existing UI and prevents CMS credentials or drafts from reaching it.
- Use native Payload `_status` as publication authority; validate responses before bounded edge caching and enable cache only with a durable CMS revision authority checked around reads. This prevents obsolete generation reuse without assuming global purge.
- Never load Payload core or its Next.js runtime into the Cloudflare frontend; use the public REST contract. This keeps the published runtime compatible with the hosting target.

- Resolve public URLs through a pure policy and runtime root context; normalize shared route heads without changing territorial templates. This keeps canonical, Open Graph and breadcrumbs consistent.
- Keep editorial event/signature contracts inactive until durable revision coordination and replay protection exist. This avoids pretending a local purge or async webhook guarantees immediate global withdrawal.
