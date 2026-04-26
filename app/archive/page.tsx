import Link from 'next/link';
import type { Metadata } from 'next';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Container, Section, Breadcrumbs, Hero } from '@/components/layout';
import { StructuredData } from '@/components/seo';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import {
  DAILY_WINDOW_DAYS,
  getArchiveDates,
  parseISODate,
  todayUTC,
} from '@/lib/daily';

const ARCHIVE_DESCRIPTION = `Daily puzzles from the last ${DAILY_WINDOW_DAYS} days, grouped by month.`;

// Revalidate hourly so the calendar window rolls forward without a full rebuild.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Daily Puzzle Archive',
  description: ARCHIVE_DESCRIPTION,
  path: '/archive',
});

type MonthBucket = {
  key: string;             // "2026-04"
  label: string;           // "April 2026"
  dates: string[];         // ISO dates in ascending order (1 → 31)
  monthStart: Date;        // used for the day-of-week offset in the grid
  daysInMonth: number;     // used to cap the grid
};

function buildMonthBuckets(dates: string[]): MonthBucket[] {
  const buckets = new Map<string, MonthBucket>();
  for (const iso of dates) {
    const d = parseISODate(iso);
    if (!d) continue;
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const key = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthStart = new Date(Date.UTC(year, month, 1));
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = {
        key,
        label: monthStart.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          timeZone: 'UTC',
        }),
        dates: [],
        monthStart,
        daysInMonth,
      };
      buckets.set(key, bucket);
    }
    bucket.dates.push(iso);
  }
  // Most-recent month first; days within a month ascending.
  for (const bucket of buckets.values()) {
    bucket.dates.sort();
  }
  return Array.from(buckets.values()).sort((a, b) => b.key.localeCompare(a.key));
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ArchivePage() {
  const dates = getArchiveDates();                 // most recent first
  const buckets = buildMonthBuckets(dates);
  const activeDates = new Set(dates);
  const today = todayUTC();

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: 'Daily Puzzle Archive',
          description: ARCHIVE_DESCRIPTION,
          path: '/archive',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Archive', path: '/archive' },
          ],
        })}
      />
      <Navigation />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Archive' },
            ]}
            className="mb-6"
          />
        </Container>
        <Hero
          eyebrow="Archive"
          title="Daily Puzzle Archive"
          subtitle={`Puzzles from the last ${DAILY_WINDOW_DAYS} days.`}
        />
      </Section>

      <Section tone="muted">
        <Container>
          <div className="space-y-12">
            {buckets.map((bucket) => {
              const { label, monthStart, daysInMonth, key } = bucket;
              const leadingBlanks = monthStart.getUTCDay(); // 0..6
              const cells = Array.from({ length: leadingBlanks + daysInMonth }, (_, i) => {
                if (i < leadingBlanks) return null;
                return i - leadingBlanks + 1;
              });

              return (
                <section key={key} aria-labelledby={`month-${key}`}>
                  <h2
                    id={`month-${key}`}
                    className="mb-4 font-display text-2xl italic text-foreground"
                  >
                    {label}
                  </h2>

                  <div
                    className="grid grid-cols-7 gap-1 text-xs text-muted-foreground"
                    aria-hidden="true"
                  >
                    {WEEKDAY_LABELS.map((w) => (
                      <div key={w} className="p-1 text-center font-medium">
                        {w}
                      </div>
                    ))}
                  </div>

                  <ul className="mt-1 grid grid-cols-7 gap-1">
                    {cells.map((day, idx) => {
                      if (day === null) {
                        return <li key={`blank-${idx}`} aria-hidden="true" className="aspect-square" />;
                      }
                      const year = monthStart.getUTCFullYear();
                      const month = monthStart.getUTCMonth() + 1;
                      const iso = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const isActive = activeDates.has(iso);
                      const isToday = iso === today;

                      const base =
                        'flex aspect-square items-center justify-center rounded-md border text-sm transition-all';
                      if (!isActive) {
                        return (
                          <li key={iso}>
                            <span
                              className={`${base} border-dashed border-border/40 bg-transparent text-muted-foreground/40`}
                              aria-label={`${iso} — outside archive window`}
                            >
                              {day}
                            </span>
                          </li>
                        );
                      }
                      return (
                        <li key={iso}>
                          <Link
                            href={`/daily/${iso}`}
                            aria-label={`Play the ${iso} daily puzzle`}
                            aria-current={isToday ? 'date' : undefined}
                            className={`${base} border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-cell-hover ${
                              isToday ? 'border-primary bg-primary/10 font-semibold text-primary' : ''
                            }`}
                          >
                            {day}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
