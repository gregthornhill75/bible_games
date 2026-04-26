// Pure rewriters for the rebrand CLI. No IO, no prompting.
// Each function takes source text (and answers) and returns new text.

/**
 * Escape a user-provided string for safe insertion into a JS/TS template literal.
 * Handles backticks, `${...}` interpolation markers, and backslashes. Without this,
 * a brand name containing a backtick (e.g. "`cool`-game") terminates the template
 * literal early and corrupts siteConfig.ts so the build fails.
 */
export function escapeTemplateLiteral(s) {
  return String(s)
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

// HSL (h: 0-360, s/l: 0-100) to hex "#rrggbb". Uses saturation 70, lightness 55 defaults.
export function hslToHex(h, s = 70, l = 55) {
  const sN = s / 100;
  const lN = l / 100;
  const k = (n) => (n + h / 30) % 12;
  const a = sN * Math.min(lN, 1 - lN);
  const f = (n) => lN - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (v) =>
    Math.round(v * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

// --- siteConfig.ts rewrite --------------------------------------------------
// Strategy: read the file, do a series of line-level replacements on unique
// string values. Does NOT parse TS. Does NOT reorganize structure.

export function rewriteSiteConfig(src, a) {
  let out = src;

  const replacements = [
    // site.*
    ["name: \"Puzzle Game\"", `name: ${JSON.stringify(a.siteName)}`],
    ["title: \"Puzzle Game\"", `title: ${JSON.stringify(`${a.brandName} - ${a.tagline}`)}`],
    ["description: \"A daily puzzle game in the browser. A new puzzle every day, with a 90-day archive.\"", `description: ${JSON.stringify(a.longDescription)}`],
    ["keywords: \"puzzle game, daily puzzle, browser puzzle\"", `keywords: ${JSON.stringify(a.keywords)}`],
    ["author: \"Puzzle Games Studio\"", `author: ${JSON.stringify(a.author)}`],
    ["email: \"hello@example.com\"", `email: ${JSON.stringify(a.email)}`],

    // game.*
    ["name: \"Daily Puzzle\"", `name: ${JSON.stringify(a.brandName)}`],
    ["type: \"Game\"", `type: ${JSON.stringify(a.gameType)}`],

    // meta.*
    ["description: \"A daily puzzle game in the browser.\"", `description: ${JSON.stringify(a.tagline)}`],
    ["themeColor: \"#3b82f6\"", `themeColor: ${JSON.stringify(a.themeColor)}`],

    // openGraph.*
    ["siteName: \"Puzzle Game\"", `siteName: ${JSON.stringify(a.brandName)}`],
    ["alt: \"Puzzle Game\"", `alt: ${JSON.stringify(`${a.brandName} Screenshot`)}`],

    // twitter.* — empty by default, filled in only if the user provided handles
    ...(a.twitterSiteTag ? [["site: \"\",", `site: ${JSON.stringify(a.twitterSiteTag)},`]] : []),
    ...(a.twitterCreatorTag ? [["creator: \"\",", `creator: ${JSON.stringify(a.twitterCreatorTag)},`]] : []),

    // content.hero.*
    ["title: \"Daily Puzzle\"", `title: ${JSON.stringify(a.brandName)}`],
    ["subtitle: \"A new puzzle every day.\"", `subtitle: ${JSON.stringify(a.tagline)}`],
    ["description: \"Play today's puzzle, browse the archive, or share a link to a specific board.\"", `description: ${JSON.stringify(a.longDescription)}`],

    // content.seoContent.title — header
    ["title: \"About\"", `title: ${JSON.stringify(`About ${a.brandName}`)}`],

    // footer.*
    ["company: \"Puzzle Games Studio\"", `company: ${JSON.stringify(a.author)}`],
    [
      "copyright: \"© 2026 Puzzle Games Studio.\"",
      `copyright: ${JSON.stringify(`© ${new Date().getFullYear()} ${a.author}.`)}`,
    ],

    // footer.social hrefs — filled in only when a handle is provided
    ...(a.twitterHandle
      ? [[
          "{ name: \"Twitter\", href: \"\", icon: \"Twitter\" }",
          `{ name: "Twitter", href: ${JSON.stringify(`https://twitter.com/${a.twitterHandle}`)}, icon: "Twitter" }`,
        ]]
      : []),

    // content.seoContent.content — replace body with a TODO stub; keep template literal shape.
    // User-provided values go through escapeTemplateLiteral so backticks/${…} in the brand
    // name can't break out of the template and corrupt the TS file.
    [
      `content: \`
        A new puzzle each day, playable in the browser. Past puzzles are kept in a 90-day archive.

        Every board has its own URL so you can bookmark or share a specific puzzle.
      \``,
      `content: \`
        TODO: replace with 2–4 short paragraphs about ${escapeTemplateLiteral(a.brandName)}.
        Mention ${escapeTemplateLiteral(a.gameType.toLowerCase())} mechanics, target audience, and any unique angles.
      \``,
    ],
  ];

  // Dedupe: the template has identical strings across sections (e.g.,
  // openGraph.title === twitter.title). replaceAll replaces every occurrence
  // in one shot, so we only need each unique needle once.
  const seen = new Set();
  const uniq = [];
  for (const pair of replacements) {
    if (!seen.has(pair[0])) {
      seen.add(pair[0]);
      uniq.push(pair);
    }
  }
  const missed = [];
  for (const [needle, replacement] of uniq) {
    if (out.includes(needle)) {
      out = out.replaceAll(needle, replacement);
    } else {
      missed.push(needle.slice(0, 60) + (needle.length > 60 ? "…" : ""));
    }
  }
  return { out, missed };
}

// --- site.webmanifest rewrite -----------------------------------------------

export function rewriteManifest(src, a) {
  let m;
  try {
    m = JSON.parse(src);
  } catch {
    return null;
  }
  m.name = a.siteName;
  m.short_name = a.brandName.slice(0, 12);
  m.description = a.longDescription;
  m.theme_color = a.themeColor;
  return JSON.stringify(m, null, 2) + "\n";
}

// --- globals.css retint (best-effort) ---------------------------------------

export function retintGlobalsCss(src, hue) {
  if (/--brand-hue\s*:\s*\d+/.test(src)) {
    return { out: src.replace(/--brand-hue\s*:\s*\d+/g, `--brand-hue: ${hue}`), replaced: true };
  }
  return { out: src, replaced: false };
}
