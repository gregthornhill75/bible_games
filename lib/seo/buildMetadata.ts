import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';

export type BuildMetadataInput = {
  /** Page-specific title; will be suffixed with brand unless already present. */
  title: string;
  /** Page description. */
  description: string;
  /** Leading-slash path, e.g. "/how-to-play". No trailing slash. */
  path: string;
  /** Absolute URL or site-root-relative path for OG/Twitter image. Defaults to dynamic OG generator at <path>/opengraph-image. */
  image?: string;
  /** Alt text for the OG/Twitter image. */
  imageAlt?: string;
  /** If true, the page is excluded from indexing/following. */
  noindex?: boolean;
  /** Page-specific keywords merged with site defaults. */
  keywords?: string[];
  /** OpenGraph type. Defaults to "website". */
  type?: 'website' | 'article';
};

/** Strip trailing slashes from a URL (defensive; SITE_URL already strips, but belt-and-suspenders). */
const stripTrailing = (s: string) => s.replace(/\/+$/, '');

/** Brand portion of the site name — everything before the first " - " (after rebrand it's "Brand - Tagline"). */
const BRAND = siteConfig.site.name.split(' - ')[0];

/** Site defaults */
const SITE_BASE = stripTrailing(siteConfig.site.url);
const DEFAULT_KEYWORDS =
  typeof siteConfig.meta.keywords === 'string'
    ? siteConfig.meta.keywords.split(',').map((k) => k.trim()).filter(Boolean)
    : [];

/** Convert an image value (absolute URL or site-relative path) into an absolute URL. */
function absoluteImage(imageOrPath: string): string {
  if (/^https?:\/\//i.test(imageOrPath)) return imageOrPath;
  const leading = imageOrPath.startsWith('/') ? imageOrPath : `/${imageOrPath}`;
  return `${SITE_BASE}${leading}`;
}

/** Append brand to title if it's not already present. */
function decorateTitle(title: string): string {
  if (!title) return BRAND;
  if (title.toLowerCase().includes(BRAND.toLowerCase())) return title;
  return `${title} | ${BRAND}`;
}

/**
 * Build a Next.js Metadata object from a per-page input.
 * Centralizes OG/Twitter/canonical/robots to keep page files small.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    image,
    imageAlt,
    noindex = false,
    keywords = [],
    type = 'website',
  } = input;

  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const canonical = `${SITE_BASE}${normalizedPath}`;

  // Default to dynamic OG image at this route (root OG image lives at /opengraph-image).
  const resolvedImage = image
    ? absoluteImage(image)
    : normalizedPath === ''
      ? `${SITE_BASE}/opengraph-image`
      : `${SITE_BASE}${normalizedPath}/opengraph-image`;

  const resolvedImageAlt = imageAlt ?? siteConfig.openGraph.image.alt;
  const mergedKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])).filter(Boolean);
  const decoratedTitle = decorateTitle(title);

  return {
    title: decoratedTitle,
    description,
    keywords: mergedKeywords.length ? mergedKeywords : undefined,
    alternates: {
      canonical,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    openGraph: {
      type,
      locale: siteConfig.openGraph.locale,
      url: canonical,
      siteName: siteConfig.openGraph.siteName,
      title: decoratedTitle,
      description,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.creator,
      title: decoratedTitle,
      description,
      images: [resolvedImage],
    },
  };
}
