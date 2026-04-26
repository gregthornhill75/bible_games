import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HowToPlay } from '@/components/HowToPlay';
import { StructuredData } from '@/components/seo';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { siteConfig } from '@/lib/siteConfig';

const HOW_TO_DESCRIPTION = `How to play ${siteConfig.game.name}.`;

export const metadata = buildMetadata({
  title: 'How to Play',
  description: HOW_TO_DESCRIPTION,
  path: '/how-to-play',
});

export default function HowToPlayPage() {
  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: 'How to Play',
          description: HOW_TO_DESCRIPTION,
          path: '/how-to-play',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'How to Play', path: '/how-to-play' },
          ],
        })}
      />
      <Navigation />
      <HowToPlay />
      <Footer />
    </>
  );
}
