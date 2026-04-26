# Game SEO Template

A Next.js 15 starter for puzzle game sites. Ships the SEO scaffolding (metadata, JSON-LD, sitemap, OG images, programmatic routes); you drop in the game.

## What you get out of the box

- Per-page metadata + canonical URLs (`buildMetadata` helper in `lib/seo/`)
- JSON-LD `@graph` bundles (Website, Organization, VideoGame, BreadcrumbList, FAQPage)
- Dynamic OG image generation at `/opengraph-image`
- Dynamic sitemap (`app/sitemap.ts`) + robots (`app/robots.ts`)
- Branded `404` + error boundaries (`app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`)
- Dark mode via `next-themes`, semantic color tokens, design system primitives (`Container`, `Section`, `Hero`, `Breadcrumbs`)
- Mobile-first layout. Accessible: skip link, focus-visible ring, `prefers-reduced-motion`, 44×44 hit targets
- `useGameState` hook + `SaveIndicator` — persistent, resumable progress out of the box
- Programmatic SEO scaffolding ready for `/daily/[date]`, `/puzzles/[size]`, `/p/[seed]`
- Interactive rebrand CLI — `npm run rebrand`
- Validated env (`lib/env.ts`) — build fails loudly if `NEXT_PUBLIC_SITE_URL` is missing
- `npm run seo-check` — crawls every route, asserts title/description/canonical/JSON-LD
- GitHub Actions CI (`.github/workflows/ci.yml`) — typecheck, lint, build, SEO check on every PR
- Vercel Analytics + Speed Insights wired (zero-config on Vercel, free on hobby)

## Quick start (5 minutes)

1. `git clone` this repo and `cd` in.
2. `npm install`
3. `npm run rebrand` — answer the prompts (domain, brand, tagline, color hue).
4. Open `components/game/BlankGameArea.tsx` and drop in your game component.
5. `npm run dev` → visit `http://localhost:3000`.

The rebrand CLI writes `.env.local`, updates `lib/siteConfig.ts` (with a `.bak` backup), rewrites `public/site.webmanifest`, and retints `app/globals.css` with your brand hue. Run it again anytime you want to change copy.

## Deploying

1. Push to GitHub, import to Vercel.
2. Add these env vars in Vercel (Production + Preview):
   - `NEXT_PUBLIC_SITE_URL` — your canonical domain (no trailing slash)
   - `NEXT_PUBLIC_GA_ID` — optional, for Google Analytics
   - `INDEXNOW_KEY` — optional, for IndexNow submissions
   - `CRON_SECRET` — optional, for scheduled route handlers
3. First deploy → check Google Search Console and submit `https://yourdomain.com/sitemap.xml`.

## Extending

- **Add a static route:** create `app/<route>/page.tsx`, then register the route in `lib/routes.ts` so it appears in the sitemap.
- **Add a schema:** build a schema factory in `lib/seo/schemas/`, include it in `buildPageGraph` in `lib/seo/buildGraph.ts`.
- **Change fonts:** edit the `Outfit` / `Fraunces` imports at the top of `app/layout.tsx`.
- **Retune palette:** re-run `npm run rebrand` with a new hue, or edit `--brand-hue` directly in `app/globals.css`.
- **Change navigation / footer:** edit `siteConfig.navigation` and `siteConfig.footer` in `lib/siteConfig.ts`.

## Project structure

```
app/
  layout.tsx            # Root layout (fonts, metadata, theme provider)
  page.tsx              # Home page (hero + game area + SEO content)
  opengraph-image.tsx   # Dynamic OG image
  twitter-image.tsx     # Dynamic Twitter card
  robots.ts / sitemap.ts
  about/ contact/ faq/ how-to-play/ privacy/ terms/
components/
  game/                 # Game placeholder — replace with your game
  layout/               # Container, Section, Hero, Breadcrumbs
  seo/                  # StructuredData renderer
  ui/                   # shadcn/ui primitives
lib/
  siteConfig.ts         # Single source of brand/SEO config
  routes.ts             # Route registry for sitemap
  seo/                  # buildMetadata + schema builders
scripts/
  rebrand.mjs           # Interactive rebrand CLI
```

## Commands

- `npm run dev` — local dev server
- `npm run build` / `npm run start` — production build + serve
- `npm run type-check` — TypeScript check (no emit)
- `npm run lint` — ESLint with Next + `jsx-a11y` rules
- `npm run seo-check` — crawl routes against a running server (defaults to `http://localhost:3000`, override with `SEO_CHECK_BASE_URL` or a CLI arg)
- `npm run rebrand` — interactive rebrand CLI (also supports `--dry-run`)
- `npm run setup` — `npm install` followed by `npm run rebrand`
- `npm run analyze` — bundle analyzer (`ANALYZE=true next build`)

## Gotchas

- **`public/og-image.svg`** is a placeholder. Either replace it with your own 1200×630 artwork or rely on the dynamic `app/opengraph-image.tsx` route.
- **`public/logo.svg`** is a placeholder. Replace it with your brand mark.
- **Rebrand backups.** The CLI writes `lib/siteConfig.ts.bak` on first run. `*.bak` is gitignored. To re-run from scratch, delete the `.bak` first — the script refuses to overwrite an existing backup.
- **Template is game-agnostic.** Drop your game logic into `components/game/` and import it from `app/page.tsx`. See `GAME_INTEGRATION.md`.

## Credits

Built on Next.js 15, React 19, Tailwind CSS 3.4, shadcn/ui primitives, and lucide-react. MIT licensed.
