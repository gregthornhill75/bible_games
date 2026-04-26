import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Container, Section, Breadcrumbs, Hero } from '@/components/layout';
import { StructuredData } from '@/components/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { getArchiveDates, formatPrettyDate } from '@/lib/daily';

const DAILY_DESCRIPTION =
  'Daily puzzles from the last two weeks. Pick a date, or browse the full archive.';

// Revalidate hourly so "today's puzzle" rolls over without a full rebuild.
// Without this, the hero CTA + card list stay frozen on the build date.
export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Daily Puzzles',
  description: DAILY_DESCRIPTION,
  path: '/daily',
});

export default function DailyIndexPage() {
  const recent = getArchiveDates(14);
  const today = recent[0];

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: 'Daily Puzzles',
          description: DAILY_DESCRIPTION,
          path: '/daily',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Daily', path: '/daily' },
          ],
        })}
      />
      <Navigation />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Daily' },
            ]}
            className="mb-6"
          />
        </Container>
        <Hero
          eyebrow="Daily"
          title="Daily Puzzles"
          subtitle="One puzzle per day. Browse the last two weeks below, or open the full archive."
          primaryCta={{ label: "Today's puzzle", href: `/daily/${today}` }}
          secondaryCta={{ label: 'Archive', href: '/archive' }}
        />
      </Section>

      <Section tone="muted">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl italic text-foreground">Recent</h2>
            <Link
              href="/archive"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Full archive
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recent.map((date, i) => {
              const pretty = formatPrettyDate(date);
              const isToday = i === 0;
              return (
                <li key={date}>
                  <Card className="h-full border-border bg-card transition-shadow hover:shadow-cell-hover">
                    <CardHeader className="pb-3">
                      <p className="text-xs text-muted-foreground">
                        {isToday ? 'Today' : `${i} day${i === 1 ? '' : 's'} ago`}
                      </p>
                      <CardTitle className="mt-1 text-lg">{pretty}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href={`/daily/${date}`}>Play</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
