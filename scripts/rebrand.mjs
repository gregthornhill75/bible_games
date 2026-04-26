#!/usr/bin/env node
// Interactive rebrand CLI for game-seo-template.
// Zero external deps — uses node core readline + fs/promises.
//
// Usage:
//   node scripts/rebrand.mjs            # interactive
//   node scripts/rebrand.mjs --dry-run  # show what would change, write nothing
//
// Idempotent: running twice with the same answers produces the same result
// (uses String.prototype.replaceAll and refuses to overwrite existing .bak).

import { readFile, writeFile, access, copyFile } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { stdout, argv, exit } from "node:process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import {
  createPrompter,
  ask,
  normalizeDomain,
  validateDomain,
  validateHue,
  validateEmail,
  validateHandle,
} from "./rebrand/prompt.mjs";
import {
  hslToHex,
  rewriteSiteConfig,
  rewriteManifest,
  retintGlobalsCss,
} from "./rebrand/rewriters.mjs";

// --- paths ------------------------------------------------------------------

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const P = {
  envLocal: resolve(ROOT, ".env.local"),
  siteConfig: resolve(ROOT, "lib/siteConfig.ts"),
  siteConfigBak: resolve(ROOT, "lib/siteConfig.ts.bak"),
  globalsCss: resolve(ROOT, "app/globals.css"),
  webmanifest: resolve(ROOT, "public/site.webmanifest"),
};

// --- color output -----------------------------------------------------------

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
const info = (s) => log(paint(C.cyan, s));
const ok = (s) => log(paint(C.green, "✓ ") + s);
const warn = (s) => log(paint(C.yellow, "⚠ ") + s);
const err = (s) => log(paint(C.red, "✗ ") + s);

// --- args -------------------------------------------------------------------

const DRY = argv.includes("--dry-run");
const FORCE = argv.includes("--force");

// --- file ops (with dry-run support) ----------------------------------------

const pendingWrites = [];
const pendingCopies = [];

function queueWrite(path, content, label) {
  pendingWrites.push({ path, content, label });
}
function queueCopy(from, to, label) {
  pendingCopies.push({ from, to, label });
}

async function exists(p) {
  try {
    await access(p, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function commitWrites() {
  for (const { from, to, label } of pendingCopies) {
    if (DRY) {
      info(`[dry-run] would copy ${from} -> ${to} (${label})`);
    } else {
      await copyFile(from, to);
      ok(`${label} (${to.replace(ROOT + "/", "")})`);
    }
  }
  for (const { path, content, label } of pendingWrites) {
    const rel = path.replace(ROOT + "/", "");
    if (DRY) {
      info(`[dry-run] would write ${rel} (${label})`);
      const preview = content.split("\n").slice(0, 30).join("\n");
      stdout.write(paint(C.dim, preview + (content.split("\n").length > 30 ? "\n…" : "") + "\n"));
    } else {
      await writeFile(path, content, "utf8");
      ok(`${label} (${rel})`);
    }
  }
}

// --- main -------------------------------------------------------------------

async function main() {
  log("");
  log(paint(C.bold + C.cyan, "Game SEO Template — Rebrand CLI"));
  log(paint(C.dim, "Answers configure your fork in place. Ctrl+C to abort."));
  if (DRY) log(paint(C.yellow, "  (--dry-run: no files will be written)"));
  log("");

  if (!(await exists(P.siteConfig))) {
    err(`Cannot find ${P.siteConfig.replace(ROOT + "/", "")}. Are you in the template root?`);
    exit(1);
  }

  // Idempotency guard: if a .bak already exists, the template strings in
  // siteConfig.ts have already been replaced once. Running again with new
  // answers would overwrite .env.local / manifest / globals.css with the new
  // values but leave siteConfig.ts pointing at the old brand — a split-brain
  // state where titles/og/JSON-LD say one thing and the domain/palette say
  // another. Refuse the run unless the user explicitly passes --force.
  if (!DRY && !FORCE && (await exists(P.siteConfigBak))) {
    err("lib/siteConfig.ts.bak already exists — this fork has been rebranded before.");
    log("");
    log("  To rebrand again from scratch, restore the backup first:");
    log(paint(C.dim, "    cp lib/siteConfig.ts.bak lib/siteConfig.ts && rm lib/siteConfig.ts.bak"));
    log("");
    log("  To update .env.local / manifest / globals.css only (leaving siteConfig.ts");
    log("  as-is), re-run with " + paint(C.bold, "--force") + ". You'll end up with inconsistent");
    log("  brand values across files — fine for partial tweaks, risky for a real rebrand.");
    log("");
    exit(1);
  }

  const prompter = createPrompter();

  let answers;
  try {
    const domainRaw = await ask(prompter, "Domain (e.g. myawesomegame.com)", {
      validate: validateDomain,
    });
    const domain = normalizeDomain(domainRaw);

    const brandName = await ask(prompter, "Brand name (e.g. My Awesome Game)");
    const tagline = await ask(prompter, "Tagline / short description (for <title> suffix)");
    const longDescription = await ask(prompter, "Long description (2-3 sentence SEO pitch)");
    const author = await ask(prompter, "Author / studio (e.g. Awesome Games Studio)");
    const email = await ask(prompter, "Author email (for contact page + mailto)", {
      validate: validateEmail,
    });
    const twitterHandle = await ask(prompter, "X/Twitter handle (without @, empty to skip)", {
      allowEmpty: true,
      validate: validateHandle,
    });
    const hueStr = await ask(prompter, "Primary brand hue 0-360 (coral~14, blue~220, green~140, purple~270)", {
      defaultValue: "14",
      validate: validateHue,
    });
    const gameType = await ask(prompter, "Game type (e.g. Word Puzzle, Number Puzzle, Logic Puzzle)", {
      defaultValue: "Word Puzzle",
    });

    const hue = Number(hueStr);
    const themeColor = hslToHex(hue);

    const keywords = [
      gameType.toLowerCase(),
      `${gameType.toLowerCase()} game`,
      "online puzzle",
      "daily puzzle",
      "browser puzzle",
      brandName.toLowerCase(),
    ].join(", ");

    answers = {
      domain,
      siteUrl: `https://${domain}`,
      brandName,
      siteName: `${brandName} - ${tagline}`,
      tagline,
      longDescription,
      author,
      email,
      twitterHandle,
      twitterSiteTag: twitterHandle ? `@${twitterHandle}` : "",
      twitterCreatorTag: twitterHandle ? `@${twitterHandle}` : "",
      hue,
      themeColor,
      gameType,
      keywords,
    };

    prompter.close();
  } catch (e) {
    if (e && e.message === "__ABORTED__") {
      log("");
      warn("Aborted — no files written.");
      exit(130);
    }
    throw e;
  }

  log("");
  info("Applying changes…");
  log("");

  // 1. .env.local
  {
    const existed = await exists(P.envLocal);
    if (existed && !DRY) {
      warn(".env.local exists — it will be overwritten (no backup; it's gitignored).");
    }
    const content =
      `NEXT_PUBLIC_SITE_URL=${answers.siteUrl}\n` +
      `NEXT_PUBLIC_GA_ID=\n` +
      `# Generated by scripts/rebrand.mjs on ${new Date().toISOString()}\n`;
    queueWrite(P.envLocal, content, ".env.local");
  }

  // 2. lib/siteConfig.ts — backup first (only if no existing .bak to avoid
  // clobbering the true original on a second run), then rewrite.
  {
    const src = await readFile(P.siteConfig, "utf8");
    const { out, missed } = rewriteSiteConfig(src, answers);
    const bakExists = await exists(P.siteConfigBak);
    if (!bakExists) {
      queueCopy(P.siteConfig, P.siteConfigBak, "backup of siteConfig.ts");
    } else {
      warn("lib/siteConfig.ts.bak already exists — leaving it alone (original preserved).");
    }
    queueWrite(P.siteConfig, out, "lib/siteConfig.ts updated");
    if (missed.length > 0) {
      warn(
        `${missed.length} expected strings in siteConfig.ts were not found — likely already rebranded. Re-running this CLI replaces only remaining template strings.`
      );
    }
  }

  // 3. public/site.webmanifest
  {
    if (await exists(P.webmanifest)) {
      const src = await readFile(P.webmanifest, "utf8");
      const out = rewriteManifest(src, answers);
      if (out) {
        queueWrite(P.webmanifest, out, "public/site.webmanifest updated");
      } else {
        warn("public/site.webmanifest is not valid JSON; skipping.");
      }
    } else {
      warn("public/site.webmanifest not found; skipping.");
    }
  }

  // 4. app/globals.css — retint brand hue if Pack D is present
  let paletteUpdated = false;
  {
    if (await exists(P.globalsCss)) {
      const src = await readFile(P.globalsCss, "utf8");
      const { out, replaced } = retintGlobalsCss(src, answers.hue);
      if (replaced) {
        queueWrite(P.globalsCss, out, `app/globals.css brand hue -> ${answers.hue}`);
        paletteUpdated = true;
      } else {
        warn("--brand-hue variable not found in app/globals.css; Pack D not yet applied. Skipping palette retint.");
      }
    }
  }

  log("");
  await commitWrites();
  log("");

  log(paint(C.bold, "Summary"));
  ok(".env.local created (NEXT_PUBLIC_SITE_URL)");
  ok("lib/siteConfig.ts updated (.bak saved alongside)");
  ok("public/site.webmanifest updated");
  if (paletteUpdated) {
    ok(`app/globals.css brand hue set to ${answers.hue}`);
  } else {
    warn("app/globals.css brand hue — skipped (Pack D palette not present)");
  }
  log("");
  log(paint(C.bold + C.cyan, "Next steps"));
  log("  1. (optional) Replace public/logo.svg and public/og-image.svg with your brand assets");
  log("  2. Add NEXT_PUBLIC_GA_ID to .env.local when ready");
  log("  3. Drop your game component into components/game/ (see README.md)");
  log("  4. " + paint(C.bold, "npm run dev"));
  log("");
  if (DRY) {
    log(paint(C.yellow, "Dry run complete — nothing was written."));
  }
}

main().catch((e) => {
  err(e?.stack || String(e));
  exit(1);
});
