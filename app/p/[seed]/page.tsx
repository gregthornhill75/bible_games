import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Container, Section, Breadcrumbs, Hero } from '@/components/layout';
import { BlankGameArea } from '@/components/game/BlankGameArea';
import { Button } from '@/components/ui/button';
import { CopyLinkButton } from './CopyLinkButton';
import { buildMetadata } from '@/lib/seo/buildMetadata';

// Seeds are unbounded user-input — we never prerender them and they
// must not be indexed. This is a view-only share target.
export const dynamic = 'force-dynamic';

// Accept alphanumeric + dash/underscore; reject anything suspicious to keep
// 404s cheap and logs clean. Max length is a defensive cap.
const SEED_RE = /^[A-Za-z0-9_-]{4,64}$/;

type PageParams = { seed: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { seed } = await params;
  if (!SEED_RE.test(seed)) return { title: 'Not found' };
  // Shareable pages should NOT rank — they are thin-content "view a board"
  // landings. noindex keeps them useful for humans and invisible to crawlers.
  return buildMetadata({
    title: `Puzzle #${seed.slice(0, 6)}`,
    description: 'Shared puzzle instance.',
    path: `/p/${seed}`,
    noindex: true,
  });
}

export default async function SharedPuzzlePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { seed } = await params;
  if (!SEED_RE.test(seed)) notFound();

  return (
    <>
      <Navigation />

      <Section>
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Shared' },
            ]}
            className="mb-6"
          />
        </Container>
        <Hero
          eyebrow="Shared"
          title={`Puzzle #${seed.slice(0, 6)}`}
          subtitle="Shared puzzle. Play it, or copy the link."
        />
        <Container>
          <BlankGameArea />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-border pt-6">
            <CopyLinkButton />
            <Button asChild variant="ghost">
              <Link href="/daily">Today&apos;s puzzle</Link>
            </Button>
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
