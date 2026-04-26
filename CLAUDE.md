# CLAUDE.md — game-seo-template

## Purpose

This is a game-agnostic Next.js 15 starter for launching puzzle game sites that rank on search. Users clone it, run `npm run rebrand`, and drop in their game component. Keep it that way: the template ships scaffolding, not game logic.

## Where to extend

- **New static route** → `app/<route>/page.tsx`, then register in `lib/routes.ts` so the sitemap picks it up.
- **New programmatic route** → `app/daily/[date]/page.tsx` (or similar). Populate `getDynamicRoutes()` in `lib/routes.ts` so the sitemap grows automatically.
- **New schema type** → add a factory in `lib/seo/schemas/`, then include it in `buildPageGraph` (`lib/seo/buildGraph.ts`). Never emit schema directly from a page.
- **New UI primitive** → `components/layout/` for layout-level (`Container`, `Section`, `Hero`), `components/ui/` for shadcn-style atoms (`Button`, `Card`).
- **New page metadata** → use `buildMetadata({ title, description, path, ... })` from `lib/seo/buildMetadata.ts`. Don't hand-roll `<head>` tags.
- **Brand/copy edits** → `lib/siteConfig.ts` is the single source of truth. Re-run `npm run rebrand` for bulk changes.

## Where NOT to extend

- **Don't put game logic in the template.** It lives in the fork, in `components/game/<YourGame>.tsx`. The template's `BlankGameArea` is a placeholder.
- **Don't hardcode colors.** Use semantic tokens: `bg-background`, `text-foreground`, `bg-primary`, etc. The `--brand-hue` in `app/globals.css` retints the whole palette.
- **Don't inline structured data in page components.** Always go through `buildPageGraph` → `<StructuredData>`.
- **Don't bypass `lib/siteConfig.ts`.** No hardcoded site names, URLs, or copy in components.
- **Don't add game-specific SEO keywords to the template.** Keywords belong in the fork's `siteConfig.ts` after `npm run rebrand`.

## Key helpers

- `lib/siteConfig.ts` — central brand/SEO config. Read everywhere.
- `lib/seo/buildMetadata.ts` — `buildMetadata()` for per-page `<head>`.
- `lib/seo/buildGraph.ts` — `buildPageGraph()` returns a JSON-LD `@graph` array.
- `lib/seo/og.tsx` — `renderOgImage()` shared helper for `opengraph-image.tsx` routes.
- `lib/seo/schemas/` — individual schema factories (website, organization, videoGame, breadcrumb, faq).
- `lib/routes.ts` — route registry. The sitemap + breadcrumbs read from here.
- `components/seo/StructuredData.tsx` — single renderer; pass the graph as a prop.
- `components/layout/*` — `Container`, `Section`, `Hero`, `Breadcrumbs`.
- `scripts/rebrand.mjs` — interactive CLI that rewrites siteConfig, webmanifest, and globals.css brand hue.

## Commands

- `npm run dev` — dev server
- `npm run build` / `npm run start` — prod build + serve
- `npm run type-check` — `tsc --noEmit`
- `npm run lint` — `next lint` (first run prompts to install eslint)
- `npm run rebrand` — interactive rebrand (supports `--dry-run`)
- `npm run analyze` — bundle analyzer

## Constraints to respect

- Keep new features game-agnostic. Game-specific logic goes in the fork, not here.
- Don't add heavy dependencies. The scripts (rebrand) deliberately use only node core.
- Mobile-first. Every new component should work at 375px wide.
- Accessibility: focus-visible, skip link, `prefers-reduced-motion` honored everywhere.
- Do not touch `app/globals.css` design tokens without coordination — they're the palette seed.
