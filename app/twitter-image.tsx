import { siteConfig } from '@/lib/siteConfig';
import { OG_SIZE, OG_CONTENT_TYPE, renderOgImage } from '@/lib/seo/og';

export const alt = siteConfig.twitter.title;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    eyebrow: siteConfig.site.name.split(' - ')[0],
    title: siteConfig.twitter.title,
  });
}
