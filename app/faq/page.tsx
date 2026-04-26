import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/SEOContent';
import { StructuredData } from '@/components/seo';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { siteConfig } from '@/lib/siteConfig';

const FAQ_DESCRIPTION = `Frequently asked questions about ${siteConfig.game.name}.`;

export const metadata = buildMetadata({
  title: 'Frequently Asked Questions',
  description: FAQ_DESCRIPTION,
  path: '/faq',
});

export default function FAQPage() {
  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: 'Frequently Asked Questions',
          description: FAQ_DESCRIPTION,
          path: '/faq',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ],
          faq: siteConfig.faq.items,
        })}
      />
      <Navigation />
      <FAQSection />
      <Footer />
    </>
  );
}
