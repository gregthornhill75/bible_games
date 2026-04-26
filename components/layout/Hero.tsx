import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Container } from './Container';

type CtaLink = { label: string; href: string };

type HeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  className?: string;
};

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}: HeroProps) {
  return (
    <section className={cn('bg-background py-20 md:py-28', className)}>
      <Container className="text-center">
        {eyebrow ? (
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground">
          <span className="italic">{title}</span>
        </h1>

        {subtitle ? (
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-ink-muted leading-relaxed">
            {subtitle}
          </p>
        ) : null}

        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {primaryCta ? (
              <Button asChild size="lg">
                <Link
                  href={primaryCta.href}
                  scroll={primaryCta.href.startsWith('#')}
                >
                  {primaryCta.label}
                </Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button asChild size="lg" variant="outline">
                <Link
                  href={secondaryCta.href}
                  scroll={secondaryCta.href.startsWith('#')}
                >
                  {secondaryCta.label}
                </Link>
              </Button>
            ) : null}
          </div>
        )}
      </Container>
    </section>
  );
}
