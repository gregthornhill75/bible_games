import type { Metadata } from 'next';
import { Outfit, Fraunces } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { siteConfig } from '@/lib/siteConfig';
import { StructuredData } from '@/components/seo';
import { buildGraph } from '@/lib/seo/buildGraph';
import { website, organization } from '@/lib/seo/schemas';
import { ThemeProvider } from '@/components/layout';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  keywords: siteConfig.meta.keywords,
  authors: [{ name: siteConfig.site.author }],
  creator: siteConfig.site.author,
  publisher: siteConfig.site.author,
  robots: siteConfig.meta.robots,

  // Open Graph
  openGraph: {
    type: 'website',
    locale: siteConfig.openGraph.locale,
    url: siteConfig.openGraph.url,
    siteName: siteConfig.openGraph.siteName,
    title: siteConfig.openGraph.title,
    description: siteConfig.openGraph.description,
    images: [
      {
        url: siteConfig.openGraph.image.url,
        width: siteConfig.openGraph.image.width,
        height: siteConfig.openGraph.image.height,
        alt: siteConfig.openGraph.image.alt,
      },
    ],
  },

  // Twitter
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitter.site,
    creator: siteConfig.twitter.creator,
    title: siteConfig.twitter.title,
    description: siteConfig.twitter.description,
    images: [siteConfig.twitter.image],
  },

  // Additional metadata
  applicationName: siteConfig.game.name,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Icons
  icons: {
    icon: siteConfig.site.favicon,
  },

  // Manifest
  manifest: '/site.webmanifest',

  // Alternate languages (if supporting multiple languages in the future)
  alternates: {
    canonical: siteConfig.meta.canonical,
  },
};

// Separate viewport export (Next.js 14+ requirement)
export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: siteConfig.meta.themeColor,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Kill legacy service worker. If a fork of this template previously
            registered a SW, returning users may hit stale HTML that references
            chunks no longer on disk. If a SW is controlling this page, abort
            the broken render, unregister + clear caches, then reload once.
            Guarded by sessionStorage so a failed unregister cannot loop. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof navigator === 'undefined' || !navigator.serviceWorker) return;
                if (!navigator.serviceWorker.controller) return;
                try {
                  if (sessionStorage.getItem('__sw_killed')) return;
                  sessionStorage.setItem('__sw_killed', '1');
                } catch (e) {}
                try { window.stop(); } catch (e) {}
                try { document.documentElement.style.visibility = 'hidden'; } catch (e) {}
                var reload = function() { try { location.reload(); } catch (e) {} };
                navigator.serviceWorker.getRegistrations()
                  .then(function(regs) {
                    return Promise.all(regs.map(function(r) { return r.unregister(); }));
                  })
                  .then(function() {
                    if (typeof caches === 'undefined') return;
                    return caches.keys().then(function(keys) {
                      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
                    });
                  })
                  .then(reload, reload);
              })();
            `,
          }}
        />

        {/* Site-wide structured data (WebSite + Organization). Per-page schemas are emitted by each page. */}
        <StructuredData data={buildGraph([website(), organization()])} />

        {/* DNS prefetch and preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />

        {/* Resource hints for better performance */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Google Analytics (optional — set NEXT_PUBLIC_GA_ID to enable) */}
        {siteConfig.performance.analyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.performance.analyticsId}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.performance.analyticsId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
          >
            Skip to main content
          </a>

          {/* Main content container with mobile-first responsive design */}
          <div className="flex flex-col min-h-screen">
            <main id="main-content" className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
        {/* Vercel Analytics + Speed Insights. No-ops off Vercel; free on hobby.
            Remove if you prefer a different analytics vendor. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
