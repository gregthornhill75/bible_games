"use client";

import { useState, useRef, useEffect } from "react";
import {
  type GridPuzzle,
  isValidAnswer,
  suggestFigures,
} from "@/lib/puzzles/immaculateGrid";

type CellState =
  | { status: "empty" }
  | { status: "correct"; answer: string }
  | { status: "active" };

interface Props {
  puzzle: GridPuzzle;
}

const MAX_ERRORS = 9;

export function BibleImmaculateGrid({ puzzle }: Props) {
  const [cells, setCells] = useState<CellState[][]>(() =>
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => ({ status: "empty" as const }))
    )
  );
  const [activeCell, setActiveCell] = useState<[number, number] | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [wrongFlash, setWrongFlash] = useState<[number, number] | null>(null);
  const [funFact, setFunFact] = useState<{
    row: number;
    col: number;
    text: string;
    answer: string;
  } | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [usedAnswers, setUsedAnswers] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const correctCount = cells.flat().filter((c) => c.status === "correct").length;
  const isWon = correctCount === 9;

  useEffect(() => {
    if (activeCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeCell]);

  const openCell = (row: number, col: number) => {
    if (gameOver || cells[row][col].status === "correct") return;
    setActiveCell([row, col]);
    setInputValue("");
    setSuggestions([]);
    setFunFact(null);
  };

  const closeCell = () => {
    setActiveCell(null);
    setInputValue("");
    setSuggestions([]);
  };

  const handleInput = (val: string) => {
    setInputValue(val);
    setSuggestions(suggestFigures(val));
  };

  const submitAnswer = (answer: string) => {
    if (!activeCell) return;
    const [row, col] = activeCell;
    const norm = answer.trim().toLowerCase();

    if (usedAnswers.has(norm)) {
      // Already used this person
      setWrongFlash([row, col]);
      setTimeout(() => setWrongFlash(null), 600);
      setInputValue("");
      setSuggestions([]);
      return;
    }

    if (isValidAnswer(puzzle, row, col, answer)) {
      // Correct!
      const newCells = cells.map((r) => [...r]) as CellState[][];
      newCells[row][col] = { status: "correct", answer: answer.trim() };
      setCells(newCells);
      setUsedAnswers((prev) => new Set([...prev, norm]));
      setFunFact({
        row,
        col,
        text: puzzle.funFacts[row][col],
        answer: answer.trim(),
      });
      setInputValue("");
      setSuggestions([]);
      setActiveCell(null);

      const newCorrect = newCells.flat().filter((c) => c.status === "correct").length;
      if (newCorrect === 9) setGameOver(true);
    } else {
      // Wrong
      const newErrors = errors + 1;
      setErrors(newErrors);
      setWrongFlash([row, col]);
      setTimeout(() => setWrongFlash(null), 600);
      setInputValue("");
      setSuggestions([]);
      if (newErrors >= MAX_ERRORS) {
        setGameOver(true);
        setActiveCell(null);
      }
    }
  };

  const errorsLeft = MAX_ERRORS - errors;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* ── Stats bar ── */}
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          ✓ <strong className="text-foreground">{correctCount}</strong>/9 correct
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-muted-foreground text-xs">Guesses left:</span>
          {Array.from({ length: MAX_ERRORS }).map((_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i < errorsLeft ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-4 gap-2">
        {/* Top-left empty corner */}
        <div className="rounded-xl bg-muted/30" />

        {/* Column headers */}
        {puzzle.cols.map((col, ci) => (
          <div
            key={ci}
            className="rounded-xl bg-primary/10 border border-primary/20 px-2 py-3 text-center"
          >
            <p className="text-xs font-semibold leading-tight text-primary">{col}</p>
          </div>
        ))}

        {/* Rows */}
        {puzzle.rows.map((rowLabel, ri) => (
          <>
            {/* Row header */}
            <div
              key={`row-${ri}`}
              className="rounded-xl bg-primary/10 border border-primary/20 px-2 py-3 flex items-center justify-center"
            >
              <p className="text-xs font-semibold leading-tight text-primary text-center">
                {rowLabel}
              </p>
            </div>

            {/* Row cells */}
            {[0, 1, 2].map((ci) => {
              const cell = cells[ri][ci];
              const isActive =
                activeCell?.[0] === ri && activeCell?.[1] === ci;
              const isWrongFlash =
                wrongFlash?.[0] === ri && wrongFlash?.[1] === ci;

              return (
                <button
                  key={`cell-${ri}-${ci}`}
                  onClick={() => openCell(ri, ci)}
                  disabled={cell.status === "correct" || gameOver}
                  className={`
                    min-h-20 rounded-xl border-2 p-2 transition-all duration-200
                    flex flex-col items-center justify-center text-center
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                    ${
                      cell.status === "correct"
                        ? "border-connections-green bg-connections-green/15 cursor-default"
                        : isWrongFlash
                        ? "border-destructive bg-destructive/10 animate-shake"
                        : isActive
                        ? "border-primary bg-primary/10"
                        : gameOver
                        ? "border-border bg-muted/30 cursor-not-allowed opacity-50"
                        : "border-border bg-card hover:border-primary/50 hover:bg-accent cursor-pointer"
                    }
                  `}
                >
                  {cell.status === "correct" ? (
                    <>
                      <span className="text-xl mb-0.5">✓</span>
                      <span className="text-xs font-bold text-connections-green leading-tight">
                        {(cell as { status: "correct"; answer: string }).answer}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl text-muted-foreground/40">+</span>
                  )}
                </button>
              );
            })}
          </>
        ))}
      </div>

      {/* ── Fun fact toast ── */}
      {funFact && (
        <div className="mt-4 rounded-xl border border-connections-green/40 bg-connections-green/10 px-4 py-3 animate-slide-up">
          <p className="text-sm font-bold text-foreground mb-1">
            🎉 {funFact.answer} — correct!
          </p>
          <p className="text-sm text-muted-foreground">{funFact.text}</p>
          <button
            onClick={() => setFunFact(null)}
            className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Dismiss ×
          </button>
        </div>
      )}

      {/* ── Input modal ── */}
      {activeCell && !gameOver && (
        <div className="mt-4 rounded-2xl border-2 border-primary bg-card p-4 shadow-cell-hover animate-slide-up">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {puzzle.rows[activeCell[0]]} &nbsp;×&nbsp; {puzzle.cols[activeCell[1]]}
          </p>
          <p className="mb-3 text-sm text-foreground font-medium">
            Name a biblical figure who fits <em>both</em> categories:
          </p>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => handleInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputValue.trim()) {
                  submitAnswer(inputValue);
                }
                if (e.key === "Escape") closeCell();
              }}
              placeholder="Type a name (e.g. Moses, Deborah…)"
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-primary"
            />

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl border border-border bg-card shadow-cell-hover overflow-hidden">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => submitAnswer(s)}
                    className="w-full px-4 py-2.5 text-left text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => submitAnswer(inputValue)}
              disabled={!inputValue.trim()}
              className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-40 transition-opacity"
            >
              Submit
            </button>
            <button
              onClick={closeCell}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Game over ── */}
      {gameOver && (
        <div className="mt-5 rounded-2xl border border-border bg-card p-5 text-center animate-scale-in">
          {isWon ? (
            <>
              <p className="text-4xl mb-2">🏆</p>
              <p className="font-display text-2xl font-bold text-foreground">
                Perfect Grid!
              </p>
              <p className="text-muted-foreground mt-1">
                You filled all 9 cells. Incredible biblical knowledge!
              </p>
            </>
          ) : (
            <>
              <p className="text-4xl mb-2">📖</p>
              <p className="font-display text-2xl font-bold text-foreground">
                {correctCount}/9 — Keep studying!
              </p>
              <p className="text-muted-foreground mt-1">
                You used all your guesses. Come back tomorrow for a new grid.
              </p>
            </>
          )}
          <a
            href="/immaculate-grid"
            className="mt-4 inline-block text-sm text-primary hover:underline"
          >
            View tomorrow&apos;s grid preview →
          </a>
        </div>
      )}

      {/* ── Instructions (collapsed) ── */}
      {!gameOver && !activeCell && (
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Click any empty cell to enter a biblical figure that fits <em>both</em> its row and column.
          Each figure can only be used once. {errorsLeft} guesses remaining.
        </p>
      )}
    </div>
  );
}
