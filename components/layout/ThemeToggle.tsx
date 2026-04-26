'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: only render theme-aware UI after mount.
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === 'dark';

  const toggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn('relative', className)}
    >
      {/* Render both icons stacked so SSR output is stable. */}
      <Sun
        className={cn(
          'h-5 w-5 transition-all',
          mounted && isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all',
          mounted && isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
