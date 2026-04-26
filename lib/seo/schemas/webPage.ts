import { siteConfig } from '@/lib/siteConfig';

const SITE_URL = siteConfig.site.url.replace(/\/+$/, '');

export type WebPageInput = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/faq" or "/". */
  path: string;
  /** If a BreadcrumbList schema is emitted alongside, pass its @id to link via breadcrumb field. */
  breadcrumbId?: string;
  /** Main entity @id (e.g. the VideoGame or FAQPage node). */
  mainEntityId?: string;
};

/**
 * JSON-LD WebPage node. Designed to be emitted as part of an @graph alongside
 * WebSite/Organization/BreadcrumbList so references resolve via @id.
 */
export function webPage({
  title,
  description,
  path,
  breadcrumbId,
  mainEntityId,
}: WebPageInput): Record<string, unknown> {
  // Home URL keeps the trailing slash so its @id ("${SITE_URL}/#webpage") matches the
  // convention used by WebSite ("${SITE_URL}/#website") and Organization.
  const normalizedPath = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  const url = `${SITE_URL}${normalizedPath}`;

  const schema: Record<string, unknown> = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: siteConfig.site.language,
  };

  if (breadcrumbId) {
    schema.breadcrumb = { '@id': breadcrumbId };
  }
  if (mainEntityId) {
    schema.mainEntity = { '@id': mainEntityId };
  }

  return schema;
}
