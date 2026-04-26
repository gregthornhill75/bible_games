import Link from 'next/link';
import { siteConfig } from '@/lib/siteConfig';
import { Container, Section } from '@/components/layout';
import { Separator } from '@/components/ui/separator';
import { Twitter, Facebook, Instagram, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'Facebook':
        return <Facebook className="h-5 w-5" />;
      case 'Instagram':
        return <Instagram className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  const isAnchorLink = (href: string) => href.startsWith('#') || href.startsWith('/#');

  return (
    <footer>
      <Section tone="accent" className="py-12 md:py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <span className="font-display text-xl italic font-medium">
                  {siteConfig.site.name.split(' - ')[0]}
                </span>
              </div>
              <p className="mb-6 max-w-md leading-relaxed text-primary-foreground/85">
                {siteConfig.site.description}
              </p>
              <div className="flex space-x-2">
                {siteConfig.footer.social
                  .filter((social) => social.href && social.href.trim().length > 0)
                  .map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="rounded-lg p-2 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      aria-label={`Follow us on ${social.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getSocialIcon(social.icon)}
                    </Link>
                  ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {siteConfig.navigation.main.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                      scroll={isAnchorLink(item.href)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                {siteConfig.footer.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-primary-foreground/20" />

          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-primary-foreground/80">
              © {currentYear} {siteConfig.footer.company}. All rights reserved.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
