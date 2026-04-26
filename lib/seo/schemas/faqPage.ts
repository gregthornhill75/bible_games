import { siteConfig } from '@/lib/siteConfig';

const SITE_URL = siteConfig.site.url.replace(/\/+$/, '');

export type FAQItem = { question: string; answer: string };

export type FAQPageInput = {
  items: FAQItem[];
  /** Path (with leading slash) that hosts the FAQ content; used to build @id. */
  path?: string;
};

/**
 * JSON-LD FAQPage schema. @id is derived from the host path so consumers can link
 * the FAQ to its WebPage node via @id.
 */
export function faqPage({ items, path = '/faq' }: FAQPageInput): Record<string, unknown> {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    inLanguage: siteConfig.site.language,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
