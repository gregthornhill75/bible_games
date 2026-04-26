# Game Integration Guide

Short guide for wiring your puzzle game into the template. For project-wide setup, see `README.md`.

## Where the game lives

- **Placeholder:** `components/game/BlankGameArea.tsx` — replace this, or add your component alongside and swap the import in `app/page.tsx`.

## Add a new game component

1. Create `components/game/MyGame.tsx`:

   ```tsx
   'use client';

   import { useState } from 'react';

   export function MyGame() {
     const [isPlaying, setIsPlaying] = useState(false);
     return (
       <div className="mx-auto max-w-xl rounded-xl border bg-card p-6">
         {/* Your game UI — grid, controls, etc. */}
       </div>
     );
   }
   ```

2. Wire it into the home page (`app/page.tsx`):

   ```tsx
   import { MyGame } from '@/components/game/MyGame';

   export default function HomePage() {
     return (
       <Section id="game">
         <MyGame />
       </Section>
     );
   }
   ```

3. Re-export from `components/game/index.ts` if you want a clean import path.

That's it — the layout, metadata, schema, and SEO copy already read from `lib/siteConfig.ts`.

## State management

- **Simple state:** `useState` with a single object holds most puzzle games.
- **Complex state:** `useReducer` when moves have many branching outcomes. Keep the reducer pure and serializable so you can snapshot/replay.
- **Persist progress:** use `localStorage` inside a `useEffect` (client-only). Key everything by `siteConfig.game.name + version` so updates invalidate stale saves.
- **Daily puzzle seed:** derive from the URL date (`/daily/[date]`) so the server can prerender.

## Mobile-first & touch

- Target 44×44px minimum hit area. Use `min-h-11 min-w-11` Tailwind utilities.
- Prevent scroll on drag gestures: `<div className="touch-none" onTouchStart={...}>`.
- Test at 375px width first. `npm run dev` → Chrome DevTools mobile emulation.

## Accessibility

- Keyboard: arrow keys should navigate the grid; Enter to place / submit.
- ARIA: add `role="grid"` + `role="gridcell"` for grid UIs, `aria-label` for unlabeled icon buttons.
- `prefers-reduced-motion`: the global `app/globals.css` already neutralizes our animations — if you add your own, honor it too.

## Analytics

Google Analytics is wired up through `NEXT_PUBLIC_GA_ID`. To track game events:

```ts
// anywhere in a client component
function trackEvent(name: string, value?: number) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.('event', name, { event_category: 'game', value });
}

// usage
trackEvent('puzzle_start');
trackEvent('puzzle_complete', elapsedSeconds);
```

Recommended events: `puzzle_start`, `puzzle_complete`, `hint_used`, `puzzle_reset`, `daily_visited`.

## SEO copy for your game

After running `npm run rebrand`, open `lib/siteConfig.ts` and fill in the `TODO` blocks:

- `content.seoContent.content` — 200–400 words of natural, keyword-rich prose.
- `faq.items` — rewrite the generic puzzle FAQs for your game's mechanics.
- `relatedGames.games` — swap placeholders for real links.

The template already serializes these into the right places (hero, FAQ schema, meta description, etc).

## Full examples

This template ships a blank placeholder on purpose. For real-world examples of games built on this scaffold, see:

- `tango-game` — logic puzzle, constraint satisfaction, 6×6 grid
- `zip-game` — pathfinding puzzle, draggable path

Fork either for a reference implementation. Don't copy-paste game code back into the template — keep it game-agnostic.

## Checklist

- [ ] Replaced `BlankGameArea` with your game component in `app/page.tsx`
- [ ] Rebranded `siteConfig.ts` (via `npm run rebrand`)
- [ ] Filled in FAQ + SEO copy `TODO`s
- [ ] Replaced `public/logo.svg` and `public/og-image.svg`
- [ ] Tested at 375px width and with keyboard-only nav
- [ ] Ran `npm run type-check` and `npm run build` clean
- [ ] Deployed to Vercel, added env vars, submitted sitemap
