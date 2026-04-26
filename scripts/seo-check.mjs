#!/usr/bin/env node
// SEO smoke check: crawl the template's key routes and assert the basics.
//
// Usage:
//   npm run seo-check                         # checks http://localhost:3000
//   SEO_CHECK_BASE_URL=https://... npm run seo-check
//   node scripts/seo-check.mjs https://stage.example.com
//
// Requires a running server (next dev OR next start).
// Exits non-zero if any check fails. Zero external deps.
//
// Checks per route:
//   - 200 status
//   - <title> present and non-empty
//   - titles unique across the crawl
//   - <meta name="description"> present and non-empty
//   - <link rel="canonical"> present and points at the provided base URL
//   - at least one <script type="application/ld+json"> with valid JSON
//
// Plus:
//   - /sitemap.xml and /robots.txt return 200
//   - Every internal <a href> on the homepage returns < 400

import { argv, env, exit, stdout } from "node:process";

const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  bold: "\x1b[1m",
};
const paint = (c, s) => `${c}${s}${C.reset}`;
const log = (...a) => stdout.write(a.join(" ") + "\n");
const pass = (s) => log(paint(C.green, "✓ ") + s);
const fail = (s) => log(paint(C.red, "✗ ") + s);
const warn = (s) => log(paint(C.yellow, "⚠ ") + s);
const info = (s) => log(paint(C.cyan, s));

// --- base URL resolution ----------------------------------------------------

const argUrl = argv.find((a) => /^https?:\/\//.test(a));
const BASE = (argUrl || env.SEO_CHECK_BASE_URL || "http://localhost:3000")
  .replace(/\/+$/, "");

// --- route plan -------------------------------------------------------------
// Mirrors lib/routes.ts + a representative dynamic sample. /p/[seed] is
// deliberately skipped — it's noindex and not in the sitemap.

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

const ROUTES = [
  "/",
  "/how-to-play",
  "/faq",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/archive",
  "/daily",
  "/puzzles",
  `/daily/${todayISO()}`,
  "/puzzles/8x8",
];

// --- result tracking --------------------------------------------------------

const failures = [];
const titlesSeen = new Map(); // title -> first path where seen

function recordFail(path, message) {
  failures.push({ path, message });
}

// --- HTML extraction --------------------------------------------------------
// Regex on Next's own output. Not robust against arbitrary HTML — we don't
// need it to be. We emit this markup ourselves.

function extractTitle(html) {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeEntities(m[1].trim()) : null;
}

function extractMeta(html, name) {
  const re = new RegExp(
    `<meta[^>]+name=["']${name}["'][^>]*content=["']([^"']*)["']`,
    "i"
  );
  const mForward = html.match(re);
  if (mForward) return decodeEntities(mForward[1]);
  // content may appear before name=
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]*name=["']${name}["']`,
    "i"
  );
  const mReverse = html.match(re2);
  return mReverse ? decodeEntities(mReverse[1]) : null;
}

function extractCanonical(html) {
  const m = html.match(
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i
  );
  if (m) return m[1];
  const m2 = html.match(
    /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["']/i
  );
  return m2 ? m2[1] : null;
}

function extractJsonLd(html) {
  const scripts = [
    ...html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
  ];
  return scripts.map((m) => m[1]);
}

function extractInternalLinks(html, base) {
  const hrefs = [
    ...html.matchAll(/<a[^>]+href=["']([^"'#]+)["']/gi),
  ].map((m) => m[1]);
  const unique = new Set();
  for (const h of hrefs) {
    if (h.startsWith("/") && !h.startsWith("//")) {
      unique.add(h.split("?")[0].split("#")[0]);
    } else if (h.startsWith(base)) {
      unique.add(h.slice(base.length).split("?")[0].split("#")[0] || "/");
    }
  }
  return [...unique];
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'");
}

// --- per-route check --------------------------------------------------------

async function checkRoute(path) {
  const url = BASE + path;
  let res;
  try {
    res = await fetch(url, { redirect: "manual" });
  } catch (e) {
    recordFail(path, `fetch failed: ${e.message}`);
    return null;
  }
  if (res.status !== 200) {
    recordFail(path, `expected 200, got ${res.status}`);
    return null;
  }
  const html = await res.text();

  const title = extractTitle(html);
  if (!title) recordFail(path, "missing <title>");
  else {
    const prev = titlesSeen.get(title);
    if (prev) recordFail(path, `duplicate <title> (also on ${prev}): "${title}"`);
    else titlesSeen.set(title, path);
  }

  const desc = extractMeta(html, "description");
  if (!desc) recordFail(path, "missing <meta name=description>");
  else if (desc.length < 20) recordFail(path, `meta description too short (${desc.length} chars)`);

  const canonical = extractCanonical(html);
  if (!canonical) {
    recordFail(path, "missing <link rel=canonical>");
  } else if (!canonical.startsWith(BASE)) {
    recordFail(
      path,
      `canonical not under base URL (got "${canonical}", expected prefix "${BASE}")`
    );
  }

  const jsonLd = extractJsonLd(html);
  if (jsonLd.length === 0) {
    recordFail(path, "no JSON-LD script tags");
  } else {
    for (const raw of jsonLd) {
      try {
        JSON.parse(raw);
      } catch (e) {
        recordFail(path, `JSON-LD parse error: ${e.message}`);
      }
    }
  }

  return html;
}

async function checkStatus(path, expectedMax = 399) {
  const url = BASE + path;
  try {
    const res = await fetch(url, { redirect: "manual" });
    if (res.status > expectedMax) {
      recordFail(path, `status ${res.status}`);
    }
  } catch (e) {
    recordFail(path, `fetch failed: ${e.message}`);
  }
}

// --- main -------------------------------------------------------------------

async function main() {
  log("");
  log(paint(C.bold + C.cyan, "SEO check"));
  log(paint(C.dim, `Base URL: ${BASE}`));
  log("");

  info(`Crawling ${ROUTES.length} routes…`);
  const homepageHtml = await checkRoute("/");
  for (const path of ROUTES.slice(1)) {
    await checkRoute(path);
  }

  info("Checking /sitemap.xml and /robots.txt…");
  await checkStatus("/sitemap.xml");
  await checkStatus("/robots.txt");

  if (homepageHtml) {
    info("Checking homepage internal links for 404s…");
    const links = extractInternalLinks(homepageHtml, BASE);
    // Ignore the routes we already crawled above.
    const alreadyChecked = new Set(ROUTES);
    const toProbe = links.filter((l) => !alreadyChecked.has(l));
    for (const l of toProbe) {
      await checkStatus(l, 399);
    }
  }

  log("");
  if (failures.length === 0) {
    pass(`All checks passed (${ROUTES.length} routes).`);
    log("");
    exit(0);
  }

  fail(`${failures.length} failure${failures.length === 1 ? "" : "s"}:`);
  for (const { path, message } of failures) {
    log(`  ${paint(C.red, path)}  ${message}`);
  }
  log("");
  exit(1);
}

main().catch((e) => {
  fail(e?.stack || String(e));
  exit(1);
});
