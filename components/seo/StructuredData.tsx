type Props = {
  /** JSON-LD payload. Either a single object (typically an @graph wrapper) or an array of schema objects. */
  data: Record<string, unknown> | Record<string, unknown>[];
};

/**
 * Pure emitter for application/ld+json. No siteConfig coupling — callers build the
 * payload with schema builders and pass it in. Safe to render inside <head> (or body)
 * because Next.js hoists script tags with type="application/ld+json".
 */
export function StructuredData({ data }: Props) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((blob, i) => (
        <script
          // eslint-disable-next-line react/no-array-index-key -- stable position-based key is fine for a render-once JSON-LD block
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blob) }}
        />
      ))}
    </>
  );
}
