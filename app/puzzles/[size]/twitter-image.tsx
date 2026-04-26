import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';
import { siteConfig } from '@/lib/siteConfig';
import { GRIDS, findGrid } from '@/lib/puzzles';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Grid-size puzzle';

export function generateStaticParams() {
  return GRIDS.map((g) => ({ size: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ size: string }> }) {
  const { size: slug } = await params;
  const grid = findGrid(slug);
  return renderOgImage({
    eyebrow: siteConfig.site.name.split(' - ')[0].toUpperCase(),
    title: grid ? `${grid.label} Puzzles` : 'Puzzles',
    subtitle: grid ? grid.difficulty : undefined,
  });
}
