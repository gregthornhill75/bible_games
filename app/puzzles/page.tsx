import Link from 'next/link';
import type { Metadata } from 'next';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Container, Section, Breadcrumbs, Hero } from '@/components/layout';
import { StructuredData } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { GRIDS } from '@/lib/puzzles';

const PUZZLES_DESCRIPTION =
  'Puzzles by grid size, from 6 × 6 to 12 × 12.';

export const metadata: Metadata = buildMetadata({
  title: 'Puzzles by Size',
  description: PUZZLES_DESCRIPTION,
  path: '/puzzles',
});

export default function PuzzlesIndexPage() {
  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: 'Puzzles by Size',
          description: PUZZLES_DESCRIPTION,
          path: '/puzzles',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Puzzles', path: '/puzzles' },
          ],
        })}
      />
      <Navigation />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Puzzles' },
            ]}
            className="mb-6"
          />
        </Container>
        <Hero
          eyebrow="Puzzles"
          title="Puzzles by Size"
          subtitle={PUZZLES_DESCRIPTION}
        />
      </Section>

      <Section tone="muted">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GRIDS.map((grid) => (
              <li key={grid.slug}>
                <Card className="flex h-full flex-col border-border bg-card transition-shadow hover:shadow-cell-hover">
                  <CardHeader className="pb-3">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {grid.difficulty}
                    </p>
                    <CardTitle className="mt-2 font-display text-3xl italic">
                      {grid.label}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {grid.estimatedTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto flex flex-col gap-4">
                    <p className="text-sm text-foreground/80">{grid.description}</p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/puzzles/${grid.slug}`}>Play</Link>
                    </Button>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
