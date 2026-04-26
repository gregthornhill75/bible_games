'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to console so forks can see it; production analytics (Vercel,
    // Sentry, etc.) hook their own error reporters from this boundary.
    console.error(error);
  }, [error]);

  return (
    <>
      <Navigation />
      <section className="bg-background py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Something went wrong
          </p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground">
            We hit an error
          </h1>
          <p className="mb-8 text-foreground/70">
            Your progress is safe. Try again or head home.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button onClick={reset}>Try again</Button>
            <Button asChild variant="outline">
              <Link href="/">Go home</Link>
            </Button>
          </div>
          {error.digest ? (
            <p className="mt-8 font-mono text-xs text-muted-foreground">
              Reference: {error.digest}
            </p>
          ) : null}
        </div>
      </section>
      <Footer />
    </>
  );
}
