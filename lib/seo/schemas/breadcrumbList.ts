import { siteConfig } from '@/lib/siteConfig';

const SITE_URL = siteConfig.site.url.replace(/\/+$/, '');

export type BreadcrumbTrailItem = { name: string; path: string };

export type BreadcrumbListInput = {
  trail: BreadcrumbTrailItem[];
};

/**
 * JSON-LD BreadcrumbList. Positions are 1-indexed per schema.org.
 * Each item URL is the absolute URL so crawlers can resolve without a <base>.
 */
export function breadcrumbList({ trail }: BreadcrumbListInput): Record<string, unknown> {
  // Keep the trailing slash for root so @id matches buildPageGraph's `${pageUrl}#breadcrumb`
  // reference (which uses "/" for home). Without this, the graph link is broken on /.
  const normalize = (p: string) => (p === '/' ? '/' : p.startsWith('/') ? p : `/${p}`);

  const itemListElement = trail.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${SITE_URL}${normalize(crumb.path)}`,
  }));

  // Use the last crumb's path for a stable @id.
  const last = trail[trail.length - 1];
  const id = `${SITE_URL}${last ? normalize(last.path) : ''}#breadcrumb`;

  return {
    '@type': 'BreadcrumbList',
    '@id': id,
    itemListElement,
  };
}
