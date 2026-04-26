import { siteConfig } from '@/lib/siteConfig';
import {
  website,
  organization,
  videoGame,
  faqPage,
  breadcrumbList,
  webPage,
  type FAQItem,
  type BreadcrumbTrailItem,
  type VideoGameOverrides,
} from './schemas';

const SITE_URL = siteConfig.site.url.replace(/\/+$/, '');

/**
 * Wrap an array of schema nodes in a standard schema.org @graph envelope.
 * This is the preferred shape for emitting multiple connected entities in one JSON-LD block.
 */
export function buildGraph(schemas: Record<string, unknown>[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

export type BuildPageGraphInput = {
  title: string;
  description: string;
  /** Path with leading slash, e.g. "/faq" or "/". */
  path: string;
  /** Optional breadcrumb trail. If omitted, no BreadcrumbList is emitted. */
  breadcrumb?: BreadcrumbTrailItem[];
  /** Optional FAQ items. If provided, a FAQPage node is emitted and linked as mainEntity. */
  faq?: FAQItem[];
  /** If true, a VideoGame node is emitted and linked as mainEntity (unless FAQ is present). */
  isGamePage?: boolean;
  /** Optional overrides forwarded to the VideoGame builder. */
  gameOverrides?: VideoGameOverrides;
};

/**
 * Produce a ready-to-emit @graph for the common per-page case.
 * Emits: WebPage + optional BreadcrumbList + optional FAQPage + optional VideoGame.
 * The root WebSite + Organization are emitted by the layout (once per document).
 */
export function buildPageGraph(input: BuildPageGraphInput): Record<string, unknown> {
  const { title, description, path, breadcrumb, faq, isGamePage, gameOverrides } = input;

  // Home URL carries a trailing slash so all @id's on the homepage share the
  // `${SITE_URL}/#…` shape used by website()/organization(). Sub-routes keep their own path.
  const normalizedPath = path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  const pageUrl = `${SITE_URL}${normalizedPath}`;

  const nodes: Record<string, unknown>[] = [];

  const breadcrumbId = breadcrumb && breadcrumb.length ? `${pageUrl}#breadcrumb` : undefined;

  // Pick a main entity: FAQPage wins if present, else VideoGame if it's a game page.
  let mainEntityId: string | undefined;
  if (faq && faq.length) {
    mainEntityId = `${pageUrl}#faq`;
  } else if (isGamePage) {
    mainEntityId = gameOverrides?.id ?? `${SITE_URL}/#game`;
  }

  nodes.push(
    webPage({
      title,
      description,
      path,
      breadcrumbId,
      mainEntityId,
    }),
  );

  if (breadcrumb && breadcrumb.length) {
    nodes.push(breadcrumbList({ trail: breadcrumb }));
  }
  if (faq && faq.length) {
    nodes.push(faqPage({ items: faq, path }));
  }
  if (isGamePage) {
    nodes.push(videoGame(gameOverrides));
  }

  return buildGraph(nodes);
}

// Re-export builders for consumers that want a single import point.
export { website, organization, videoGame, faqPage, breadcrumbList, webPage };
