'use client';

import { siteConfig } from '@/lib/siteConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SaveIndicator } from '@/components/ui/save-indicator';
import { useGameState } from '@/lib/useGameState';

export function BlankGameArea() {
  const [cells, setCells, status] = useGameState<boolean[]>(
    'template:demo:cells',
    Array.from({ length: 16 }, () => false)
  );

  const toggle = (i: number) =>
    setCells((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div className="game-area mx-auto max-w-3xl">
      <Card className="mb-8 border-border bg-card">
        <CardContent className="p-12 text-center">
          <h3 className="mb-3 text-xl font-semibold text-foreground">
            {siteConfig.content.hero.title}
          </h3>
          <p className="mx-auto max-w-lg text-foreground/70">
            Drop your game component into{' '}
            <code className="rounded bg-surface-muted px-1.5 py-0.5 text-sm">
              components/game/
            </code>{' '}
            and import it from{' '}
            <code className="rounded bg-surface-muted px-1.5 py-0.5 text-sm">
              app/page.tsx
            </code>
            .
          </p>

          <div className="mt-8 inline-block rounded-lg border border-dashed border-border p-6">
            <div className="grid grid-cols-4 gap-2">
              {cells.map((filled, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={filled}
                  aria-label={`Cell ${i + 1}`}
                  className={
                    'flex h-11 w-11 items-center justify-center rounded border border-border text-sm transition-colors ' +
                    (filled
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-surface-muted text-foreground/40 hover:bg-surface-muted/70')
                  }
                >
                  {filled ? '●' : '?'}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <SaveIndicator status={status} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base">Integration</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-foreground/80">
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Create your game component at{' '}
              <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">
                components/game/YourGame.tsx
              </code>
              .
            </li>
            <li>
              Replace the <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">BlankGameArea</code> import in{' '}
              <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">app/page.tsx</code>.
            </li>
            <li>
              Persist progress with{' '}
              <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">useGameState</code>{' '}
              and surface a{' '}
              <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">SaveIndicator</code>.
            </li>
            <li>
              See <code className="rounded bg-surface-muted px-1 py-0.5 text-xs">GAME_INTEGRATION.md</code> for details.
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
