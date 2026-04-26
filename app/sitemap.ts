import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { staticRoutes, getDynamicRoutes, type RouteEntry } from '@/lib/routes';

// Revalidate hourly so new /daily/<today> slugs appear in the sitemap without
// requiring a rebuild. Paired with ISR on the daily routes.
export const revalidate = 3600;

/** Build a single sitemap entry from a route registry entry. Exported so Pack C can reuse. */
export function buildSitemapEntry(
  route: RouteEntry,
  opts: { baseUrl?: string; lastModified?: Date } = {},
): MetadataRoute.Sitemap[number] {
  const baseUrl = (opts.baseUrl ?? siteConfig.site.url).replace(/\/+$/, '');
  return {
    url: `${baseUrl}${route.path === '/' ? '' : route.path}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.site.url.replace(/\/+$/, '');
  const currentDate = new Date();
  const all: RouteEntry[] = [...staticRoutes, ...getDynamicRoutes()];

  return all.map((route) => buildSitemapEntry(route, { baseUrl, lastModified: currentDate }));
}
