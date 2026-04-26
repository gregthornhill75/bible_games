/**
 * ISO date helpers for the /daily/[date] archive.
 *
 * All functions treat dates as UTC and return YYYY-MM-DD strings.
 * The archive window is intentionally bounded — we never prerender or emit
 * sitemap entries for dates outside the window, which keeps build times
 * predictable and prevents dead-link sprawl.
 */

/** How many past days (including today) are prerendered and sitemapped. */
export const DAILY_WINDOW_DAYS = 90;

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Zero-pad to two digits. */
function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/** Today's date in UTC as YYYY-MM-DD. */
export function todayUTC(): string {
  return isoDate(new Date());
}

/** Convert a Date to YYYY-MM-DD using UTC components. */
export function isoDate(d: Date): string {
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

/**
 * Parse a YYYY-MM-DD string into a UTC-midnight Date. Returns null for any
 * malformed or logically invalid input (e.g. "2026-02-31").
 */
export function parseISODate(s: string): Date | null {
  if (!ISO_RE.test(s)) return null;
  const [y, m, d] = s.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  // Reject rollovers like "2026-02-31" → Mar 3 — the components won't round-trip.
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  ) {
    return null;
  }
  return date;
}

/**
 * A date is a valid daily puzzle slug when:
 *   - it matches YYYY-MM-DD
 *   - it parses to a real calendar date
 *   - it is within the last DAILY_WINDOW_DAYS (inclusive of today)
 *   - it is not in the future
 */
export function isValidDailyDate(s: string): boolean {
  const date = parseISODate(s);
  if (!date) return false;
  const today = parseISODate(todayUTC());
  if (!today) return false;
  if (date.getTime() > today.getTime()) return false;
  const diffDays = Math.round((today.getTime() - date.getTime()) / MS_PER_DAY);
  return diffDays >= 0 && diffDays < DAILY_WINDOW_DAYS;
}

/** Last N days of ISO dates, most-recent first. N defaults to DAILY_WINDOW_DAYS. */
export function getArchiveDates(n: number = DAILY_WINDOW_DAYS): string[] {
  const today = new Date();
  // Normalize to UTC midnight so arithmetic is stable across DST / local tz.
  const base = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const out: string[] = [];
  for (let i = 0; i < n; i++) {
    out.push(isoDate(new Date(base - i * MS_PER_DAY)));
  }
  return out;
}

/**
 * Adjacent dates for prev/next navigation. Each side returns null when the
 * neighbour falls outside the window (prev) or is in the future (next).
 */
export function getAdjacentDates(iso: string): { prev: string | null; next: string | null } {
  const date = parseISODate(iso);
  if (!date) return { prev: null, next: null };
  const prev = isoDate(new Date(date.getTime() - MS_PER_DAY));
  const next = isoDate(new Date(date.getTime() + MS_PER_DAY));
  return {
    prev: isValidDailyDate(prev) ? prev : null,
    next: isValidDailyDate(next) ? next : null,
  };
}

/** Format YYYY-MM-DD as e.g. "April 16, 2026" (UTC, en-US). */
export function formatPrettyDate(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Per-day eyebrow + body copy for /daily/[date].
 *
 * Copy is intentionally short and game-agnostic. Replace after forking so
 * each day's page has prose specific to your game. Seven variants exist so
 * the content differs by day of the week even before per-game customization.
 */
export function getDailyContent(iso: string): { eyebrow: string; intro: string; body: string[] } {
  const pretty = formatPrettyDate(iso);
  const date = parseISODate(iso) ?? new Date();
  const dow = date.getUTCDay();

  const eyebrows = [
    'Sunday puzzle',
    'Monday puzzle',
    'Tuesday puzzle',
    'Wednesday puzzle',
    'Thursday puzzle',
    'Friday puzzle',
    'Saturday puzzle',
  ];

  return {
    eyebrow: eyebrows[dow],
    intro: `Today's puzzle for ${pretty}.`,
    body: [
      `Each day has a unique board with a permanent URL.`,
      `New to the rules? See the [how-to-play guide](/how-to-play). Missed a day? Browse the [archive](/archive).`,
    ],
  };
}
