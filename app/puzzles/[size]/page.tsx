import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Container, Section, Breadcrumbs, Hero } from '@/components/layout';
import { BlankGameArea } from '@/components/game/BlankGameArea';
import { StructuredData } from '@/components/seo';
import { ProseLinks } from '@/components/ProseLinks';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { siteConfig } from '@/lib/siteConfig';
import { GRIDS, findGrid } from '@/lib/puzzles';
import { todayUTC } from '@/lib/daily';

export const dynamic = 'error';
export const dynamicParams = false;

export function generateStaticParams() {
  return GRIDS.map((g) => ({ size: g.slug }));
}

type PageParams = { size: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { size } = await params;
  const grid = findGrid(size);
  if (!grid) return { title: 'Not found' };
  return buildMetadata({
    title: grid.title,
    description: grid.description,
    path: `/puzzles/${grid.slug}`,
  });
}

/**
 * Body copy in `lib/puzzles.ts` uses the literal `TODAY_ISO` token as a
 * placeholder so the module stays build-time pure (no `Date.now()` calls at
 * import time). We substitute the real date here, on the server, before
 * handing the text to the markdown-link renderer.
 */
function hydrateBodyLinks(paragraph: string, today: string): string {
  return paragraph.replace(/TODAY_ISO/g, today);
}

export default async function PuzzleSizePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { size } = await params;
  const grid = findGrid(size);
  if (!grid) notFound();

  const today = todayUTC();
  const siteUrl = siteConfig.site.url.replace(/\/+$/, '');
  const others = GRIDS.filter((g) => g.slug !== grid.slug);

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: grid.title,
          description: grid.description,
          path: `/puzzles/${grid.slug}`,
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Puzzles', path: '/puzzles' },
            { name: grid.label, path: `/puzzles/${grid.slug}` },
          ],
          isGamePage: true,
          gameOverrides: {
            id: `${siteUrl}/puzzles/${grid.slug}#game`,
            name: `${grid.label} Puzzle`,
            additionalProperty: [
              { name: 'GridSize', value: grid.size },
              { name: 'Difficulty', value: grid.difficulty },
            ],
          },
        })}
      />
      <Navigation />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Puzzles', href: '/puzzles' },
              { label: grid.label },
            ]}
            className="mb-6"
          />
        </Container>
        <Hero eyebrow={grid.eyebrow} title={grid.title} subtitle={grid.description} />
        <Container>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            {grid.difficulty} · ~ {grid.estimatedTime} · {grid.size * grid.size} cells
          </p>
          <BlankGameArea />
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
            {grid.body.map((paragraph, i) => (
              <p key={i}>
                <ProseLinks text={hydrateBodyLinks(paragraph, today)} />
              </p>
            ))}
          </article>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 font-display text-2xl italic text-foreground">Try another size</h2>
            <div className="flex flex-wrap gap-3">
              {others.map((other) => (
                <Button asChild key={other.slug} variant="outline">
                  <Link href={`/puzzles/${other.slug}`}>
                    {other.label}
                    <span className="ml-2 text-xs text-muted-foreground">· {other.difficulty}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
