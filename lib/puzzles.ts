/**
 * Grid-size landing metadata. Powers /puzzles and /puzzles/[size].
 *
 * Copy here is deliberately short and generic — this is a template. Replace
 * the body paragraphs with prose specific to your game after rebranding.
 */

export type GridDef = {
  /** Grid edge length (rows = cols). */
  size: number;
  /** URL slug, e.g. "6x6". Kept lowercase with an "x" separator for SEO legibility. */
  slug: string;
  /** Display label, e.g. "6 × 6". Unicode × is intentional (thin, centered). */
  label: string;
  /** Difficulty bucket for the primary VideoGame.additionalProperty hint. */
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  /** Human-readable solving time range. */
  estimatedTime: string;
  /** Small label above the hero title. */
  eyebrow: string;
  /** Hero <h1> title. */
  title: string;
  /** Meta description (keep near 155–160 chars for optimal SERP rendering). */
  description: string;
  /** Body paragraphs, rendered in order. Keep short; rewrite per game. */
  body: string[];
};

/**
 * Canonical list of grid sizes. Order matters for generateStaticParams and
 * for the "cross-links" row at the bottom of each landing page.
 */
export const GRIDS: GridDef[] = [
  {
    size: 6,
    slug: '6x6',
    label: '6 × 6',
    difficulty: 'Beginner',
    estimatedTime: '2–4 minutes',
    eyebrow: 'Beginner grid',
    title: '6 × 6 Puzzles',
    description:
      '6 × 6 puzzles. A small grid for quick sessions, typically solved in 2–4 minutes.',
    body: [
      `6 × 6 is the smallest size. Sessions are short and the rules are easy to pick up.`,
      `See the [how-to-play guide](/how-to-play) for the basics, or try today's [daily puzzle](/daily/TODAY_ISO).`,
    ],
  },
  {
    size: 8,
    slug: '8x8',
    label: '8 × 8',
    difficulty: 'Intermediate',
    estimatedTime: '5–8 minutes',
    eyebrow: 'Intermediate grid',
    title: '8 × 8 Puzzles',
    description:
      '8 × 8 puzzles. A mid-size grid, typically solved in 5–8 minutes.',
    body: [
      `8 × 8 is a step up from 6 × 6. Longer sessions, a few more moves to work through.`,
      `New to the format? The [how-to-play guide](/how-to-play) covers the rules.`,
    ],
  },
  {
    size: 10,
    slug: '10x10',
    label: '10 × 10',
    difficulty: 'Advanced',
    estimatedTime: '10–15 minutes',
    eyebrow: 'Advanced grid',
    title: '10 × 10 Puzzles',
    description:
      '10 × 10 puzzles. A larger grid, typically solved in 10–15 minutes.',
    body: [
      `10 × 10 grids take longer to work through and tend to require multi-step deductions.`,
      `For rules, see the [how-to-play guide](/how-to-play). For a shorter session, try the [daily puzzle](/daily/TODAY_ISO).`,
    ],
  },
  {
    size: 12,
    slug: '12x12',
    label: '12 × 12',
    difficulty: 'Expert',
    estimatedTime: '20–30 minutes',
    eyebrow: 'Expert grid',
    title: '12 × 12 Puzzles',
    description:
      '12 × 12 puzzles. The largest grid, typically solved in 20–30 minutes.',
    body: [
      `12 × 12 is the largest size. Expect longer sessions and deeper deduction chains.`,
      `See the [how-to-play guide](/how-to-play) for a refresher, or browse the [archive](/archive) for past puzzles.`,
    ],
  },
];

const BY_SLUG: Record<string, GridDef> = Object.fromEntries(GRIDS.map((g) => [g.slug, g]));

/** Find a grid by slug ("6x6", "8x8", ...). Returns undefined for unknown slugs. */
export function findGrid(slug: string): GridDef | undefined {
  return BY_SLUG[slug];
}

/** Validate a grid slug against the canonical registry. */
export function isValidGridSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(BY_SLUG, slug);
}
