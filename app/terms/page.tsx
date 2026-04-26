import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/seo';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { siteConfig } from '@/lib/siteConfig';

const TERMS_BRAND = siteConfig.site.name.split(' - ')[0];
const TERMS_DESCRIPTION = `Terms of service governing your use of ${TERMS_BRAND}. Read the rules, disclaimers, and intellectual property notices.`;

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: TERMS_DESCRIPTION,
  path: '/terms',
});

export default function TermsPage() {
  const lastUpdated = new Date().getFullYear();

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: 'Terms of Service',
          description: TERMS_DESCRIPTION,
          path: '/terms',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Terms of Service', path: '/terms' },
          ],
        })}
      />
      <Navigation />
      <section className="bg-background py-16">
        <article className="mx-auto max-w-3xl px-4 prose prose-neutral dark:prose-invert">
          <h1 className="font-display italic">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

          <h2>Acceptance</h2>
          <p>
            By accessing or playing {siteConfig.game.name} (the &ldquo;Service&rdquo;), you agree to these
            terms. If you do not agree, please do not use the Service. These terms apply to all visitors
            and users, whether casual or returning.
          </p>

          <h2>Service provided as-is</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
            of any kind, express or implied. We do not guarantee uninterrupted access, error-free play,
            or that the Service will meet every expectation. Gameplay is free and no account is required.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You agree not to reverse-engineer, automate, scrape, or disrupt the Service, and not to use it
            in a way that violates applicable law or interferes with other players. We may suspend access
            for anyone who engages in abusive or fraudulent behavior.
          </p>

          <h2>Intellectual property</h2>
          <p>
            The game design, artwork, text, and code are owned by {siteConfig.footer.company} or its
            licensors and are protected by copyright and other laws. You may play the game for personal,
            non-commercial enjoyment. Redistribution or commercial reuse requires prior written consent.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, {siteConfig.footer.company} is not liable for any
            indirect, incidental, or consequential damages arising from use of the Service. Your sole
            remedy for dissatisfaction is to stop using the Service.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms from time to time. Material changes will be noted by updating the
            &ldquo;last updated&rdquo; date above. Continued use of the Service after changes constitutes
            acceptance of the revised terms.
          </p>
        </article>
      </section>
      <Footer />
    </>
  );
}
