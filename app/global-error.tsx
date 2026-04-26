'use client';

// Fallback when the root layout itself throws. Must define its own <html> + <body>
// because the normal layout is unavailable here. Keep zero imports from the design
// system — this page has to render even when the theme/font pipeline is broken.

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          margin: 0,
          background: '#fafaf9',
          color: '#1c1917',
        }}
      >
        <div style={{ maxWidth: '32rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            Something broke
          </h1>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
            A fatal error prevented the page from rendering.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '0.625rem 1.25rem',
              borderRadius: '0.5rem',
              border: '1px solid #d6d3d1',
              background: '#1c1917',
              color: '#fafaf9',
              cursor: 'pointer',
              fontSize: '0.9375rem',
            }}
          >
            Try again
          </button>
          {error.digest ? (
            <p
              style={{
                marginTop: '2rem',
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.75rem',
                opacity: 0.6,
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
