import { siteConfig } from '@/lib/siteConfig';

const SITE_URL = siteConfig.site.url.replace(/\/+$/, '');

export type VideoGameOverrides = {
  name?: string;
  description?: string;
  genre?: string | string[];
  applicationCategory?: string;
  gamePlatform?: string | string[];
  playMode?: string;
  operatingSystem?: string;
  id?: string;
  url?: string;
  image?: string;
  /** Optional per-instance extras (e.g. difficulty level, grid size). */
  additionalProperty?: Array<{ name: string; value: string | number }>;
};

/**
 * JSON-LD VideoGame schema. Pack C can pass overrides per difficulty/grid size.
 * Publisher is linked by @id so the graph stays connected.
 */
export function videoGame(overrides: VideoGameOverrides = {}): Record<string, unknown> {
  const {
    name = siteConfig.game.name,
    description = siteConfig.site.description,
    genre = siteConfig.game.category,
    applicationCategory = 'Game',
    gamePlatform = 'Web Browser',
    playMode = 'SinglePlayer',
    operatingSystem = 'Any',
    id = `${SITE_URL}/#game`,
    url = `${SITE_URL}/`,
    image,
    additionalProperty,
  } = overrides;

  const schema: Record<string, unknown> = {
    '@type': 'VideoGame',
    '@id': id,
    name,
    description,
    url,
    genre,
    applicationCategory,
    gamePlatform,
    playMode,
    operatingSystem,
    publisher: { '@id': `${SITE_URL}/#organization` },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  if (image) {
    schema.image = /^https?:\/\//i.test(image) ? image : `${SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`;
  }
  if (additionalProperty && additionalProperty.length) {
    schema.additionalProperty = additionalProperty.map((p) => ({
      '@type': 'PropertyValue',
      name: p.name,
      value: p.value,
    }));
  }

  return schema;
}
