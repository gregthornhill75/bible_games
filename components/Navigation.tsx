'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/siteConfig';
import { Button } from '@/components/ui/button';
import { Container, ThemeToggle } from '@/components/layout';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // A local anchor (e.g. `/#game`) should scroll when already on the homepage.
  const isAnchorLink = (href: string) => href.startsWith('#') || href.startsWith('/#');

  // The default nav items are all home-page anchors (/#game, /#faq, etc.),
  // so "current" only means anything on the homepage. Off the home route we
  // render everything as ghost so pages don't show a stale "Play Game" highlight.
  // `item.current` in siteConfig marks the primary item (Play Game); we honor
  // it only when we're actually on the page it points at.
  const isCurrent = (item: { href: string; current?: boolean }) => {
    if (item.href.startsWith('/#') || item.href.startsWith('#')) {
      return pathname === '/' && Boolean(item.current);
    }
    return pathname === item.href;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="font-display text-xl italic font-medium text-foreground transition-colors hover:text-primary"
            >
              {siteConfig.site.name.split(' - ')[0]}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {siteConfig.navigation.main.map((item) => (
                <Button
                  key={item.name}
                  asChild
                  variant={isCurrent(item) ? 'default' : 'ghost'}
                  size="sm"
                  className="font-medium"
                >
                  <Link
                    href={item.href}
                    scroll={isAnchorLink(item.href)}
                  >
                    {item.name}
                  </Link>
                </Button>
              ))}
              <ThemeToggle className="ml-1" />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="space-y-2 border-t border-border bg-background px-2 pb-3 pt-2">
              {siteConfig.navigation.main.map((item) => (
                <Button
                  key={item.name}
                  asChild
                  variant={isCurrent(item) ? 'default' : 'ghost'}
                  className="w-full justify-start font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    scroll={isAnchorLink(item.href)}
                  >
                    {item.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
