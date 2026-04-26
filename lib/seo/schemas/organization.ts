import { siteConfig } from '@/lib/siteConfig';

const SITE_URL = siteConfig.site.url.replace(/\/+$/, '');

export type OrganizationOverrides = {
  name?: string;
  logo?: string;
  sameAs?: string[];
};

/** Absolute URL helper; accepts absolute URLs or site-relative paths. */
function abs(urlOrPath: string): string {
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  const leading = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
  return `${SITE_URL}${leading}`;
}

/**
 * JSON-LD Organization schema. Referenced as the publisher from WebSite and WebPage nodes.
 */
export function organization(overrides: OrganizationOverrides = {}): Record<string, unknown> {
  const {
    name = siteConfig.footer.company,
    logo = siteConfig.site.logo,
    sameAs = siteConfig.footer.social.map((s) => s.href),
  } = overrides;

  // Drop empty/whitespace-only URLs; schema.org validators warn on "" in sameAs.
  const cleanSameAs = sameAs.filter((u) => typeof u === 'string' && u.trim().length > 0);

  const schema: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: abs(logo),
    },
  };
  if (cleanSameAs.length) schema.sameAs = cleanSameAs;
  return schema;
}
