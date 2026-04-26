import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/seo/og';
import { siteConfig } from '@/lib/siteConfig';
import { formatPrettyDate, getArchiveDates, isValidDailyDate } from '@/lib/daily';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Daily Puzzle';

export function generateStaticParams() {
  return getArchiveDates().map((date) => ({ date }));
}

export default async function Image({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const pretty = isValidDailyDate(date) ? formatPrettyDate(date) : date;
  return renderOgImage({
    eyebrow: siteConfig.site.name.split(' - ')[0].toUpperCase(),
    title: 'Daily Puzzle',
    subtitle: pretty,
  });
}
