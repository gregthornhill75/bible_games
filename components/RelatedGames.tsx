import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function RelatedGames() {
  return (
    <div id="more-games">
      <h2 className="mb-8 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        <span className="italic">{siteConfig.relatedGames.title}</span>
      </h2>

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {siteConfig.relatedGames.games.map((game, index) => (
          <Card
            key={index}
            className="border-border bg-card p-6 transition-shadow hover:shadow-cell-hover"
          >
            <h3 className="mb-2 text-xl font-semibold text-foreground">{game.name}</h3>
            <p className="mb-4 text-sm leading-relaxed text-foreground/80">{game.description}</p>
            <Link
              href={game.url}
              className="inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Play
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
