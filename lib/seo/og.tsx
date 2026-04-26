import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

export type OgImageOptions = {
  /** Small label above the main title (e.g. brand or category). */
  eyebrow: string;
  /** Main title text. */
  title: string;
  /** Optional secondary line below the title. */
  subtitle?: string;
  /** Accent color used for the background gradient endpoints. */
  accentColor?: string;
  /** Size override for the image. Defaults to 1200x630 (OpenGraph). */
  size?: { width: number; height: number };
};

/**
 * Generate a branded OG image via next/og.
 * Shared by the root opengraph-image and twitter-image and reused by
 * future dynamic routes (e.g. /daily/[date]/opengraph-image).
 */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  accentColor = '#8b5cf6',
  size = OG_SIZE,
}: OgImageOptions): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, #3b82f6, ${accentColor})`,
          color: 'white',
          width: '100%',
          height: '100%',
          fontSize: 72,
          fontWeight: 800,
          padding: 80,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 40,
            opacity: 0.9,
            marginBottom: 20,
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          {eyebrow}
        </div>
        <div style={{ fontSize: 88, lineHeight: 1.1 }}>{title}</div>
        {subtitle && (
          <div style={{ fontSize: 36, opacity: 0.85, marginTop: 24, fontWeight: 500 }}>{subtitle}</div>
        )}
      </div>
    ),
    { ...size },
  );
}
