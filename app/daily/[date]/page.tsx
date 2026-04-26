import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Container, Section, Breadcrumbs, Hero } from '@/components/layout';
import { BlankGameArea } from '@/components/game/BlankGameArea';
import { StructuredData } from '@/components/seo';
import { ProseLinks } from '@/components/ProseLinks';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { siteConfig } from '@/lib/siteConfig';
import {
  isValidDailyDate,
  getAdjacentDates,
  getArchiveDates,
  getDailyContent,
  formatPrettyDate,
} from '@/lib/daily';

// Prerender the in-window dates known at build time. For the first visit on a
// day that wasn't built (e.g. the day after deploy), generate on-demand and
// then cache. `isValidDailyDate` inside the page rejects future/out-of-window
// slugs with notFound(), so unknown slugs still 404 — just without requiring
// a rebuild to roll the window forward.
export const dynamicParams = true;
export const revalidate = 3600; // 1 hour — cheap safety net against stale "today"

export function generateStaticParams() {
  return getArchiveDates().map((date) => ({ date }));
}

type PageParams = { date: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { date } = await params;
  if (!isValidDailyDate(date)) return { title: 'Not found' };
  const pretty = formatPrettyDate(date);
  return buildMetadata({
    title: `Daily Puzzle — ${pretty}`,
    description: `The daily puzzle for ${pretty}.`,
    path: `/daily/${date}`,
  });
}

function DailyPagination({ prev, next }: { prev: string | null; next: string | null }) {
  return (
    <nav
      aria-label="Daily puzzle pagination"
      className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-sm"
    >
      <div className="min-w-[6rem]">
        {prev ? (
          <Link
            href={`/daily/${prev}`}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Yesterday</span>
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 text-muted-foreground/50">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Yesterday</span>
          </span>
        )}
      </div>

      <Link
        href="/archive"
        className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <Calendar className="h-4 w-4" aria-hidden="true" />
        <span>Calendar</span>
      </Link>

      <div className="min-w-[6rem] text-right">
        {next ? (
          <Link
            href={`/daily/${next}`}
            className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Tomorrow</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 text-muted-foreground/50">
            <span>Tomorrow</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </nav>
  );
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { date } = await params;
  if (!isValidDailyDate(date)) notFound();

  const pretty = formatPrettyDate(date);
  const { prev, next } = getAdjacentDates(date);
  const content = getDailyContent(date);
  const description = `The daily puzzle for ${pretty}.`;

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: `Daily Puzzle — ${pretty}`,
          description,
          path: `/daily/${date}`,
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Daily', path: '/daily' },
            { name: pretty, path: `/daily/${date}` },
          ],
          isGamePage: true,
          gameOverrides: {
            id: `${siteConfig.site.url.replace(/\/+$/, '')}/daily/${date}#game`,
            name: `Daily Puzzle ${date}`,
            additionalProperty: [{ name: 'Date', value: date }],
          },
        })}
      />
      <Navigation />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Daily', href: '/daily' },
              { label: pretty },
            ]}
            className="mb-6"
          />
        </Container>
        <Hero eyebrow={content.eyebrow} title={`Daily Puzzle · ${pretty}`} />
        <Container>
          <BlankGameArea />
          <DailyPagination prev={prev} next={next} />
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
            <p className="lead">{content.intro}</p>
            {content.body.map((paragraph, i) => (
              <p key={i}>
                <ProseLinks text={paragraph} />
              </p>
            ))}
          </article>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
