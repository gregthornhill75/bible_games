import Link from 'next/link';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { buildMetadata } from '@/lib/seo/buildMetadata';

export const metadata = buildMetadata({
  title: 'Page not found',
  description: 'The page you were looking for does not exist.',
  path: '/404',
  noindex: true,
});

export default function NotFound() {
  return (
    <>
      <Navigation />
      <section className="bg-background py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            404
          </p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
            Page not found
          </h1>
          <p className="mb-8 text-foreground/70">
            The page you were looking for does not exist.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link href="/">Play today&apos;s puzzle</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/archive">Browse the archive</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
