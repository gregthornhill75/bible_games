import { getArchiveDates } from '@/lib/daily';
import { GRIDS } from '@/lib/puzzles';

export type RouteEntry = {
  path: string;
  priority: number;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'never';
};

export const staticRoutes: RouteEntry[] = [
  { path: '/',             priority: 1.0, changeFrequency: 'daily' },
  { path: '/how-to-play',  priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq',          priority: 0.6, changeFrequency: 'monthly' },
  { path: '/about',        priority: 0.5, changeFrequency: 'yearly' },
  { path: '/contact',      priority: 0.4, changeFrequency: 'yearly' },
  { path: '/privacy',      priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms',        priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * Dynamic routes computed at build/request time. Pack C populates this with
 * the /daily index + archive, the grid-size landing pages, and the three
 * registry-style indexes (/daily, /archive, /puzzles). The sitemap and
 * IndexNow cron both consume this list.
 *
 * Keep this synchronous — it is imported from both `app/sitemap.ts` and
 * `app/api/cron/indexnow`, neither of which should await anything.
 *
 * Notes:
 *   - Today's daily puzzle gets priority 0.9; historical days drop to 0.6.
 *   - /p/[seed] is deliberately NOT included: seeds are unbounded and those
 *     pages are noindex on purpose.
 */
export function getDynamicRoutes(): RouteEntry[] {
  const daily: RouteEntry[] = getArchiveDates().map((date, i) => ({
    path: `/daily/${date}`,
    priority: i === 0 ? 0.9 : 0.6,
    changeFrequency: i === 0 ? 'daily' : 'never',
  }));

  const grids: RouteEntry[] = GRIDS.map((g) => ({
    path: `/puzzles/${g.slug}`,
    priority: 0.7,
    changeFrequency: 'weekly',
  }));

  const archiveAndIndex: RouteEntry[] = [
    { path: '/daily',   priority: 0.8, changeFrequency: 'daily' },
    { path: '/archive', priority: 0.7, changeFrequency: 'daily' },
    { path: '/puzzles', priority: 0.7, changeFrequency: 'weekly' },
  ];

  return [...archiveAndIndex, ...daily, ...grids];
}
