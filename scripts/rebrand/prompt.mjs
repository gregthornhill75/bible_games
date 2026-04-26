// Interactive prompt helpers + validators for the rebrand CLI.
// Zero external deps — uses node core readline.

import { createInterface } from "node:readline";
import { stdin, stdout } from "node:process";

// ANSI colors — duplicated (trivially) here so this module is self-contained.
const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
};
const paint = (c, s) => `${c}${s}${C.reset}`;

// --- prompter ---------------------------------------------------------------
// We roll our own line-queue on top of event-based readline because
// readline/promises has a known issue consuming piped stdin — the second
// `question()` after the first resolution never fires. Event API works fine.

export function createPrompter() {
  const rl = createInterface({ input: stdin, output: stdout, terminal: false });
  const queue = [];
  const waiters = [];
  let closed = false;
  rl.on("line", (line) => {
    if (waiters.length > 0) {
      waiters.shift()(line);
    } else {
      queue.push(line);
    }
  });
  rl.on("close", () => {
    closed = true;
    while (waiters.length > 0) {
      waiters.shift()(null);
    }
  });
  const readLine = () =>
    new Promise((resolve, reject) => {
      if (queue.length > 0) return resolve(queue.shift());
      if (closed) return reject(new Error("__ABORTED__"));
      waiters.push((line) => {
        if (line === null) reject(new Error("__ABORTED__"));
        else resolve(line);
      });
    });
  const close = () => {
    rl.removeAllListeners("close");
    rl.close();
  };
  return { readLine, close };
}

export async function ask(prompter, label, { defaultValue, validate, allowEmpty = false } = {}) {
  const suffix = defaultValue !== undefined ? paint(C.dim, ` [${defaultValue}]`) : "";
  while (true) {
    stdout.write(paint(C.cyan, `? ${label}`) + suffix + " ");
    const raw = (await prompter.readLine()).trim();
    const value = raw === "" ? defaultValue ?? "" : raw;
    if (!allowEmpty && value === "") {
      stdout.write(paint(C.red, "✗ ") + "Value required.\n");
      continue;
    }
    if (validate) {
      const errMsg = validate(value);
      if (errMsg) {
        stdout.write(paint(C.red, "✗ ") + errMsg + "\n");
        continue;
      }
    }
    return value;
  }
}

// --- validators -------------------------------------------------------------

export function normalizeDomain(raw) {
  return raw
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "")
    .toLowerCase();
}

export function validateDomain(raw) {
  const d = normalizeDomain(raw);
  if (!/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(d)) {
    return "That doesn't look like a valid domain (e.g. example.com).";
  }
  return null;
}

export function validateHue(raw) {
  const n = Number(raw);
  if (!Number.isInteger(n) || n < 0 || n > 360) {
    return "Hue must be an integer between 0 and 360.";
  }
  return null;
}

export function validateEmail(raw) {
  if (raw === "") return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
    return "That doesn't look like a valid email.";
  }
  return null;
}

export function validateHandle(raw) {
  if (raw === "") return null;
  if (/^@/.test(raw)) return "Leave off the leading @.";
  if (!/^[A-Za-z0-9_]{1,15}$/.test(raw)) {
    return "Twitter/X handle: letters, numbers, underscore, max 15.";
  }
  return null;
}
