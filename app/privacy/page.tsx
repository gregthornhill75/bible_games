import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/seo';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { siteConfig } from '@/lib/siteConfig';

const PRIVACY_BRAND = siteConfig.site.name.split(' - ')[0];
const PRIVACY_DESCRIPTION = `Privacy policy for ${PRIVACY_BRAND}. Learn how we handle data, cookies, and your rights as a player.`;

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: PRIVACY_DESCRIPTION,
  path: '/privacy',
});

export default function PrivacyPage() {
  const lastUpdated = new Date().getFullYear();

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: 'Privacy Policy',
          description: PRIVACY_DESCRIPTION,
          path: '/privacy',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/privacy' },
          ],
        })}
      />
      <Navigation />
      <section className="bg-background py-16">
        <article className="mx-auto max-w-3xl px-4 prose prose-neutral dark:prose-invert">
          <h1 className="font-display italic">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

          <h2>Overview</h2>
          <p>
            {siteConfig.footer.company} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This policy
            describes what information is collected when you play {siteConfig.game.name}, how it is used, and
            the choices you have. Playing the game does not require an account, and we keep data collection
            minimal by design.
          </p>

          <h2>Information we collect</h2>
          <p>
            We do not require registration, and we do not collect personal identifiers such as your name,
            email address, or phone number. Any gameplay progress is stored locally in your browser so that
            your preferences and best scores persist between sessions. Clearing your browser storage will
            reset that data.
          </p>

          <h2>Analytics and cookies</h2>
          <p>
            If the site operator has enabled Google Analytics (via the <code>NEXT_PUBLIC_GA_ID</code>{' '}
            environment variable), aggregated, anonymized usage data such as page views and referrer
            information may be processed by Google on our behalf. If analytics are not enabled, no cookies
            are set for tracking purposes. You can opt out of Google Analytics with the official
            browser add-on.
          </p>

          <h2>Your rights</h2>
          <p>
            Under applicable privacy laws (including GDPR and CCPA), you have the right to access, correct,
            export, or delete any personal data we hold about you. Because we do not collect personal
            identifiers for gameplay, most of these rights can be exercised by clearing your browser
            storage.
          </p>

          <h2>Third-party links</h2>
          <p>
            This site may link to third-party sites, including our social media profiles. We are not
            responsible for the privacy practices of those destinations. Please review their policies
            directly.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Reach out via our{' '}
            <a href="/contact" className="text-primary hover:underline">contact page</a>. We will respond
            within a reasonable timeframe.
          </p>
        </article>
      </section>
      <Footer />
    </>
  );
}
