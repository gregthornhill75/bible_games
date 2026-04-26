"use client";

import { useState, useEffect, useCallback } from "react";
import {
  type ConnectionsPuzzle,
  type Difficulty,
  type ConnectionsCategory,
  DIFFICULTY_ORDER,
  getAllWords,
  shuffleWithSeed,
} from "@/lib/puzzles/connections";

// ─── Colour tokens (CSS variables from globals.css) ──────────────────────────
const DIFFICULTY_STYLES: Record<
  Difficulty,
  { bg: string; text: string; label: string; emoji: string }
> = {
  yellow: { bg: "bg-connections-yellow", text: "text-connections-yellow-fg", label: "Straightforward", emoji: "🟡" },
  green:  { bg: "bg-connections-green",  text: "text-connections-green-fg",  label: "Moderate",        emoji: "🟢" },
  blue:   { bg: "bg-connections-blue",   text: "text-connections-blue-fg",   label: "Tricky",          emoji: "🔵" },
  purple: { bg: "bg-connections-purple", text: "text-connections-purple-fg", label: "Scholar",         emoji: "🟣" },
};

const MAX_MISTAKES = 4;

interface GuessRecord {
  words: string[];
  correct: boolean;
}

interface SolvedCategory extends ConnectionsCategory {
  guessIndex: number;
}

// ─── Share helpers ─────────────────────────────────────────────────────────────
function buildShareText(
  puzzle: ConnectionsPuzzle,
  guesses: GuessRecord[]
): string {
  const header = `Bible Connections #${puzzle.id} — ${puzzle.date}`;
  const rows = guesses.map((g) => {
    const correct = puzzle.categories.find((c) =>
      c.words.every((w) => g.words.includes(w))
    );
    const diff: Difficulty = correct ? correct.difficulty : "purple";
    return g.words.map(() => DIFFICULTY_STYLES[diff].emoji).join("");
  });
  return [header, ...rows].join("\n");
}

// ─── Main component ────────────────────────────────────────────────────────────
export function BibleConnections({ puzzle }: { puzzle: ConnectionsPuzzle }) {
  const [words, setWords] = useState<string[]>(() =>
    shuffleWithSeed(getAllWords(puzzle), puzzle.date)
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [solved, setSolved] = useState<SolvedCategory[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);
  const [shake, setShake] = useState(false);
  const [oneAway, setOneAway] = useState(false);
  const [alreadyGuessed, setAlreadyGuessed] = useState(false);
  const [gameOver, setGameOver] = useState<"won" | "lost" | null>(null);
  const [copied, setCopied] = useState(false);

  // ── Load / save progress ──────────────────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`bc-${puzzle.id}`);
      if (!raw) return;
      const saved = JSON.parse(raw) as {
        solved: SolvedCategory[];
        mistakes: number;
        guesses: GuessRecord[];
        gameOver: "won" | "lost" | null;
        words: string[];
      };
      setSolved(saved.solved ?? []);
      setMistakes(saved.mistakes ?? 0);
      setGuesses(saved.guesses ?? []);
      setGameOver(saved.gameOver ?? null);
      setWords(saved.words ?? words);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle.id]);

  const persist = useCallback(
    (
      nextSolved: SolvedCategory[],
      nextMistakes: number,
      nextGuesses: GuessRecord[],
      nextGameOver: "won" | "lost" | null,
      nextWords: string[]
    ) => {
      try {
        localStorage.setItem(
          `bc-${puzzle.id}`,
          JSON.stringify({
            solved: nextSolved,
            mistakes: nextMistakes,
            guesses: nextGuesses,
            gameOver: nextGameOver,
            words: nextWords,
          })
        );
      } catch {
        // ignore
      }
    },
    [puzzle.id]
  );

  // ── Toggle word selection ─────────────────────────────────────────────────
  const toggle = (word: string) => {
    if (gameOver) return;
    setOneAway(false);
    setAlreadyGuessed(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(word)) {
        next.delete(word);
      } else if (next.size < 4) {
        next.add(word);
      }
      return next;
    });
  };

  // ── Shuffle remaining words ───────────────────────────────────────────────
  const shuffleWords = () => {
    const remaining = words.filter((w) => !solved.flatMap((s) => s.words).includes(w));
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    setWords(shuffled);
  };

  // ── Submit guess ──────────────────────────────────────────────────────────
  const submit = () => {
    if (selected.size !== 4 || gameOver) return;

    const selectedArr = Array.from(selected);

    // Duplicate check
    const already = guesses.some(
      (g) => g.correct && selectedArr.every((w) => g.words.includes(w))
    );
    if (already) {
      setAlreadyGuessed(true);
      return;
    }

    const matchedCategory = puzzle.categories.find((cat) =>
      cat.words.every((w) => selectedArr.includes(w)) &&
      selectedArr.every((w) => cat.words.includes(w))
    );

    const newGuess: GuessRecord = { words: selectedArr, correct: !!matchedCategory };
    const nextGuesses = [...guesses, newGuess];

    if (matchedCategory) {
      // Correct!
      const newSolved: SolvedCategory = {
        ...matchedCategory,
        guessIndex: solved.length,
      };
      const nextSolved = [...solved, newSolved];
      const nextWords = words.filter((w) => !matchedCategory.words.includes(w));
      const isWon = nextSolved.length === 4;
      const nextGameOver: "won" | "lost" | null = isWon ? "won" : null;

      setSolved(nextSolved);
      setWords(nextWords);
      setGuesses(nextGuesses);
      setSelected(new Set());
      if (isWon) setGameOver("won");
      persist(nextSolved, mistakes, nextGuesses, nextGameOver, nextWords);
    } else {
      // Wrong guess
      const oneOffCategory = puzzle.categories
        .filter((c) => !solved.find((s) => s.title === c.title))
        .find((c) => {
          const overlap = c.words.filter((w) => selectedArr.includes(w)).length;
          return overlap === 3;
        });

      setShake(true);
      setTimeout(() => setShake(false), 600);
      if (oneOffCategory) setOneAway(true);

      const nextMistakes = mistakes + 1;
      const nextGameOver: "won" | "lost" | null =
        nextMistakes >= MAX_MISTAKES ? "lost" : null;

      setMistakes(nextMistakes);
      setGuesses(nextGuesses);
      setSelected(new Set());
      if (nextMistakes >= MAX_MISTAKES) {
        setGameOver("lost");
      }
      persist(solved, nextMistakes, nextGuesses, nextGameOver, words);
    }
  };

  // ── Share ─────────────────────────────────────────────────────────────────
  const share = async () => {
    const text = buildShareText(puzzle, guesses);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const solvedTitles = new Set(solved.map((s) => s.title));
  const remaining = words.filter(
    (w) => !solved.flatMap((s) => s.words).includes(w)
  );
  const mistakeDots = Array.from({ length: MAX_MISTAKES });

  return (
    <div className="mx-auto w-full max-w-lg select-none">
      {/* ── Solved categories ─────────────────────────────────────────── */}
      {DIFFICULTY_ORDER.filter((d) => solved.find((s) => s.difficulty === d)).map((diff) => {
        const cat = solved.find((s) => s.difficulty === diff)!;
        const style = DIFFICULTY_STYLES[diff];
        return (
          <div
            key={cat.title}
            className={`mb-2 rounded-xl px-4 py-3 text-center animate-scale-in ${style.bg} ${style.text}`}
          >
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
              {style.label}
            </p>
            <p className="mt-0.5 font-display text-sm font-bold">{cat.title}</p>
            <p className="mt-1 text-xs font-medium opacity-90">
              {cat.words.join(" · ")}
            </p>
          </div>
        );
      })}

      {/* ── Word grid ─────────────────────────────────────────────────── */}
      {remaining.length > 0 && (
        <div
          className={`grid grid-cols-4 gap-2 ${shake ? "animate-shake" : ""}`}
        >
          {remaining.map((word) => {
            const isSelected = selected.has(word);
            return (
              <button
                key={word}
                onClick={() => toggle(word)}
                disabled={!!gameOver}
                aria-pressed={isSelected}
                className={`
                  min-h-14 rounded-xl border-2 px-1 py-2 text-center text-xs font-bold
                  uppercase tracking-wide transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  ${
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground scale-95 shadow-glow"
                      : "border-border bg-card text-card-foreground hover:border-primary/50 hover:bg-accent"
                  }
                  ${gameOver ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
                `}
              >
                {word}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Status messages ───────────────────────────────────────────── */}
      <div className="mt-3 h-6 text-center text-sm font-medium">
        {oneAway && !gameOver && (
          <span className="text-warning animate-fade-in">
            One away…
          </span>
        )}
        {alreadyGuessed && (
          <span className="text-muted-foreground animate-fade-in">
            Already guessed that one.
          </span>
        )}
        {gameOver === "won" && (
          <span className="text-primary font-bold animate-fade-in">
            Excellent! 🎉
          </span>
        )}
        {gameOver === "lost" && (
          <span className="text-destructive font-bold animate-fade-in">
            Better luck tomorrow!
          </span>
        )}
      </div>

      {/* ── Mistake dots ──────────────────────────────────────────────── */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="text-xs text-muted-foreground mr-1">Mistakes:</span>
        {mistakeDots.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full transition-colors ${
              i < mistakes ? "bg-destructive" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* ── Controls ──────────────────────────────────────────────────── */}
      {!gameOver && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={shuffleWords}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Shuffle
          </button>
          <button
            onClick={() => setSelected(new Set())}
            disabled={selected.size === 0}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Deselect All
          </button>
          <button
            onClick={submit}
            disabled={selected.size !== 4}
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      )}

      {/* ── Share button (after game ends) ────────────────────────────── */}
      {gameOver && (
        <div className="mt-5 flex flex-col items-center gap-3">
          {/* Reveal unsolved categories if lost */}
          {gameOver === "lost" && (
            <div className="w-full space-y-2">
              {puzzle.categories
                .filter((c) => !solvedTitles.has(c.title))
                .sort(
                  (a, b) =>
                    DIFFICULTY_ORDER.indexOf(a.difficulty) -
                    DIFFICULTY_ORDER.indexOf(b.difficulty)
                )
                .map((cat) => {
                  const style = DIFFICULTY_STYLES[cat.difficulty];
                  return (
                    <div
                      key={cat.title}
                      className={`rounded-xl px-4 py-3 text-center opacity-80 ${style.bg} ${style.text}`}
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-80">
                        {style.label}
                      </p>
                      <p className="mt-0.5 font-display text-sm font-bold">{cat.title}</p>
                      <p className="mt-1 text-xs font-medium opacity-90">
                        {cat.words.join(" · ")}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}

          <button
            onClick={share}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {copied ? "Copied! ✓" : "Share Results"}
          </button>
          <a
            href="/archive"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View past puzzles →
          </a>
        </div>
      )}
    </div>
  );
}
