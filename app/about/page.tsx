import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/seo';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { siteConfig } from '@/lib/siteConfig';

const ABOUT_DESCRIPTION = `About ${siteConfig.footer.company}.`;

export const metadata = buildMetadata({
  title: `About ${siteConfig.footer.company}`,
  description: ABOUT_DESCRIPTION,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: `About ${siteConfig.footer.company}`,
          description: ABOUT_DESCRIPTION,
          path: '/about',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ],
        })}
      />
      <Navigation />
      <section className="bg-background py-16">
        <article className="mx-auto max-w-3xl px-4 prose prose-neutral dark:prose-invert">
          <h1 className="font-display italic">About</h1>

          <p className="lead">{siteConfig.site.description}</p>

          <p>
            A new puzzle is published each day. The last 90 are kept in the{' '}
            <a href="/archive" className="text-primary hover:underline">archive</a>.
          </p>

          <p>
            For questions or bug reports, see the{' '}
            <a href="/contact" className="text-primary hover:underline">contact page</a>.
          </p>
        </article>
      </section>
      <Footer />
    </>
  );
}
