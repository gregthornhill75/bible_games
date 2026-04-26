/**
 * Validated environment variables.
 *
 * This module throws at import time if required env vars are missing or
 * malformed. Import it from anywhere in the build path (layout, siteConfig,
 * sitemap) so `next build` fails loudly instead of shipping `localhost:3000`
 * into prod canonical URLs or the sitemap.
 *
 * Zero runtime deps — keeps the template dependency surface minimal.
 */

type EnvSchema = {
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_GA_ID: string | undefined;
  INDEXNOW_KEY: string | undefined;
  CRON_SECRET: string | undefined;
};

function requireUrl(name: string, raw: string | undefined): string {
  if (!raw || raw.trim() === '') {
    throw new Error(
      `[env] ${name} is required. Add it to .env.local (dev) or your hosting env (prod). Example: ${name}=https://yourdomain.com`
    );
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(`[env] ${name} is not a valid URL: "${raw}"`);
  }
  if (!/^https?:$/.test(url.protocol)) {
    throw new Error(`[env] ${name} must use http or https, got: "${url.protocol}"`);
  }
  // Normalize: drop trailing slash so downstream string concat stays clean.
  return raw.replace(/\/+$/, '');
}

function optional(raw: string | undefined): string | undefined {
  if (!raw || raw.trim() === '') return undefined;
  return raw;
}

// Development convenience: if NEXT_PUBLIC_SITE_URL is unset during `next dev`,
// fall back to localhost so contributors can run the template without a .env
// file. Build/prod still hard-fails via requireUrl below.
const isDev = process.env.NODE_ENV !== 'production';
const siteUrlRaw =
  process.env.NEXT_PUBLIC_SITE_URL ?? (isDev ? 'http://localhost:3000' : undefined);

export const env: EnvSchema = {
  NEXT_PUBLIC_SITE_URL: requireUrl('NEXT_PUBLIC_SITE_URL', siteUrlRaw),
  NEXT_PUBLIC_GA_ID: optional(process.env.NEXT_PUBLIC_GA_ID),
  INDEXNOW_KEY: optional(process.env.INDEXNOW_KEY),
  CRON_SECRET: optional(process.env.CRON_SECRET),
};
