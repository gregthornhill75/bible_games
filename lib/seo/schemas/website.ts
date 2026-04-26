import { siteConfig } from '@/lib/siteConfig';

const SITE_URL = siteConfig.site.url.replace(/\/+$/, '');

export type WebsiteOverrides = {
  /** Optional search URL template (must contain {search_term_string}). Opt-in; no default.
   *  Only pass this if your fork actually implements a /search route — Google's Sitelinks
   *  Searchbox feature will expose this URL in SERPs. */
  searchUrl?: string;
  /** Override the site name. */
  name?: string;
  /** Override the description. */
  description?: string;
};

/**
 * JSON-LD WebSite schema. Links to the Organization publisher via @id.
 * Stable @id enables other schemas (WebPage, Breadcrumb) to reference it.
 */
export function website(overrides: WebsiteOverrides = {}): Record<string, unknown> {
  const {
    searchUrl,
    name = siteConfig.openGraph.siteName,
    description = siteConfig.site.description,
  } = overrides;

  const schema: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name,
    description,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: siteConfig.site.language,
  };

  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    };
  }

  return schema;
}
