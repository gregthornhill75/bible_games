/**
 * IndexNow submission endpoint. Submits every canonical URL (static + dynamic)
 * to IndexNow (Bing + Yandex + friends) on a cron schedule.
 *
 * Setup (one-time per deployment):
 *   1. Pick a random hex string (32–64 chars). This is your INDEXNOW_KEY.
 *      Example: `openssl rand -hex 16`
 *   2. Set INDEXNOW_KEY as an environment variable on Vercel.
 *   3. Create a file in `public/` named `<INDEXNOW_KEY>.txt` whose contents
 *      are the same key value. IndexNow validates the submitter by fetching
 *      `<site>/<INDEXNOW_KEY>.txt` and checking the contents match.
 *   4. Set CRON_SECRET on Vercel so this endpoint is authenticated.
 *
 * Schedule: see `vercel.json` — defaults to 04:00 UTC daily.
 *
 * If INDEXNOW_KEY is unset, the route short-circuits with `skipped: true`
 * so the cron is a no-op on forks that have not opted in.
 *
 * Auth policy (fail-closed):
 *   - INDEXNOW_KEY set + CRON_SECRET unset → 500. Configure CRON_SECRET before
 *     the endpoint will do real work. This prevents a deploy where an operator
 *     sets the key but forgets the secret from exposing an unauthenticated
 *     submit-to-IndexNow endpoint to the public internet.
 *   - INDEXNOW_KEY set + CRON_SECRET set → bearer auth required.
 *   - INDEXNOW_KEY unset → skipped (no secret required for the no-op path).
 */

import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/siteConfig';
import { staticRoutes, getDynamicRoutes } from '@/lib/routes';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const key = process.env.INDEXNOW_KEY;

  // No-op path is safe to expose without auth — returns a constant payload.
  if (!key) {
    return NextResponse.json({
      skipped: true,
      reason: 'INDEXNOW_KEY not set',
    });
  }

  // Live path requires a configured secret AND a matching bearer. This closes
  // the "key set but secret forgotten" bypass where anyone could trigger a
  // submission flood from your origin.
  if (!cronSecret) {
    return NextResponse.json(
      { error: 'CRON_SECRET must be configured when INDEXNOW_KEY is set' },
      { status: 500 },
    );
  }
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const siteUrl = siteConfig.site.url.replace(/\/+$/, '');
  const host = new URL(siteUrl).host;
  const urls = [...staticRoutes, ...getDynamicRoutes()].map(
    (r) => `${siteUrl}${r.path === '/' ? '' : r.path}`,
  );

  const payload = {
    host,
    key,
    keyLocation: `${siteUrl}/${key}.txt`,
    urlList: urls,
  };

  let indexnowStatus: number | null = null;
  let errorMessage: string | undefined;
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    indexnowStatus = res.status;
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    submitted: urls.length,
    host,
    indexnowStatus,
    ...(errorMessage ? { error: errorMessage } : {}),
  });
}
