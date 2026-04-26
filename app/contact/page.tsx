import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { StructuredData } from '@/components/seo';
import { buildMetadata } from '@/lib/seo/buildMetadata';
import { buildPageGraph } from '@/lib/seo/buildGraph';
import { siteConfig } from '@/lib/siteConfig';

const CONTACT_DESCRIPTION = `Contact ${siteConfig.footer.company}.`;

export const metadata = buildMetadata({
  title: 'Contact Us',
  description: CONTACT_DESCRIPTION,
  path: '/contact',
});

// Set via `npm run rebrand` (writes to siteConfig.site.email).
const CONTACT_EMAIL = siteConfig.site.email;

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: 'Contact Us',
          description: CONTACT_DESCRIPTION,
          path: '/contact',
          breadcrumb: [
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ],
        })}
      />
      <Navigation />
      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-6 font-display text-3xl italic font-medium tracking-tight text-foreground sm:text-4xl">
            Contact
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-foreground/85">
            Questions, feedback, or bug reports — get in touch.
          </p>

          <div className="mb-8 rounded-lg border border-border bg-surface-muted p-6">
            <h2 className="mb-2 text-xl font-semibold text-foreground">Email</h2>
            <p className="text-foreground/85">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-primary underline"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          {(() => {
            const socials = siteConfig.footer.social.filter(
              (s) => s.href && s.href.trim().length > 0,
            );
            if (socials.length === 0) return null;
            return (
              <>
                <h2 className="mb-4 text-xl font-semibold text-foreground">Social</h2>
                <ul className="mb-8 space-y-2">
                  {socials.map((social) => (
                    <li key={social.name}>
                      <Link
                        href={social.href}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            );
          })()}

        </div>
      </section>
      <Footer />
    </>
  );
}
