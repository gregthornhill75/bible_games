'use client';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { SaveStatus } from '@/lib/useGameState';

interface SaveIndicatorProps {
  status: SaveStatus;
  className?: string;
  /** Copy shown when idle. Set to null to hide when idle. */
  idleLabel?: string | null;
}

export function SaveIndicator({
  status,
  className,
  idleLabel = 'Progress saves automatically',
}: SaveIndicatorProps) {
  const label =
    status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved' : idleLabel;

  if (label === null) return null;

  return (
    <div
      aria-live="polite"
      className={cn(
        'inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-opacity',
        className
      )}
    >
      {status === 'saved' ? (
        <Check aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
      ) : null}
      <span>{label}</span>
    </div>
  );
}
