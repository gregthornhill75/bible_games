"use client";

import { useState } from "react";
import type { EmojiPuzzle } from "@/lib/puzzles/emojiDecoder";

interface Props {
  puzzles: EmojiPuzzle[];
}

type AnswerState = "unanswered" | "correct" | "wrong";

const DIFFICULTY_STYLE = {
  easy:   { label: "Easy",   className: "bg-connections-yellow/30 text-connections-yellow-fg border-connections-yellow" },
  medium: { label: "Medium", className: "bg-connections-blue/20 text-connections-blue border-connections-blue/40" },
  hard:   { label: "Hard",   className: "bg-connections-purple/20 text-connections-purple border-connections-purple/40" },
};

export function EmojiDecoder({ puzzles }: Props) {
  const [index, setIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const puzzle = puzzles[index];
  const diff = DIFFICULTY_STYLE[puzzle.difficulty];

  const handleAnswer = (pick: string) => {
    if (answerState !== "unanswered") return;
    const correct = pick === puzzle.answer;
    setChosen(pick);
    setAnswerState(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= puzzles.length) {
      setGameOver(true);
    } else {
      setIndex((i) => i + 1);
      setAnswerState("unanswered");
      setChosen(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setAnswerState("unanswered");
    setChosen(null);
    setScore(0);
    setGameOver(false);
  };

  // ── Share text ─────────────────────────────────────────────────────────────
  const buildShareText = () => {
    const pct = Math.round((score / puzzles.length) * 100);
    const medal = pct === 100 ? "🏆" : pct >= 80 ? "🥇" : pct >= 60 ? "🥈" : "🥉";
    return `Bible Emoji Decoder ${medal}\nI scored ${score}/${puzzles.length} (${pct}%)\nPlay free at bible-games.vercel.app/emoji-decoder`;
  };

  // ── Game over screen ───────────────────────────────────────────────────────
  if (gameOver) {
    const pct = Math.round((score / puzzles.length) * 100);
    const medal = pct === 100 ? "🏆" : pct >= 80 ? "🥇" : pct >= 60 ? "🥈" : pct >= 40 ? "🥉" : "📖";
    const [copied, setCopied] = useState(false);

    return (
      <div className="mx-auto w-full max-w-md text-center animate-scale-in">
        <div className="text-6xl mb-3">{medal}</div>
        <p className="font-display text-4xl font-bold text-foreground">
          {score}/{puzzles.length}
        </p>
        <p className="mt-2 text-muted-foreground">
          {pct === 100
            ? "Perfect! You decoded every emoji! 🎉"
            : pct >= 80
            ? "Excellent Bible knowledge!"
            : pct >= 60
            ? "Good work! Keep reading your Bible."
            : "Nice try — play again to improve!"}
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(buildShareText());
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
          >
            {copied ? "Copied! ✓" : "Share 📤"}
          </button>
          <button
            onClick={restart}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // ── Active question ────────────────────────────────────────────────────────
  return (
    <div className="mx-auto w-full max-w-md">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="flex gap-1">
          {puzzles.map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i < index
                  ? "w-4 bg-primary"
                  : i === index
                  ? "w-4 bg-primary/50"
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-muted-foreground">
          {index + 1}/{puzzles.length} &nbsp;·&nbsp;{" "}
          <strong className="text-foreground">{score} right</strong>
        </span>
      </div>

      {/* Emoji display card */}
      <div className="mb-6 rounded-2xl border-2 border-border bg-card p-6 text-center shadow-cell">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            What Bible story is this?
          </p>
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${diff.className}`}
          >
            {diff.label}
          </span>
        </div>
        <p className="text-6xl tracking-widest leading-none">{puzzle.emojis}</p>
      </div>

      {/* Answer choices */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {puzzle.choices.map((choice) => {
          const isChosen = chosen === choice;
          const isCorrect = choice === puzzle.answer;
          const revealed = answerState !== "unanswered";

          let style = "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent";
          if (revealed && isCorrect) {
            style = "border-connections-green bg-connections-green/15 text-connections-green font-bold";
          } else if (revealed && isChosen && !isCorrect) {
            style = "border-destructive bg-destructive/10 text-destructive font-bold";
          } else if (revealed) {
            style = "border-border bg-card text-muted-foreground opacity-50";
          }

          return (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              disabled={revealed}
              className={`
                rounded-2xl border-2 px-4 py-3.5 text-sm font-semibold text-left
                transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                ${style}
                ${!revealed ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]" : "cursor-default"}
              `}
            >
              <span className="flex items-center justify-between">
                <span>{choice}</span>
                {revealed && isCorrect && <span className="text-base">✓</span>}
                {revealed && isChosen && !isCorrect && <span className="text-base">✗</span>}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fun fact + Next */}
      {answerState !== "unanswered" && (
        <div className="mt-4 animate-slide-up">
          <div
            className={`rounded-2xl border px-4 py-3.5 text-sm mb-4
              ${answerState === "correct"
                ? "border-connections-green/40 bg-connections-green/10"
                : "border-destructive/30 bg-destructive/5"
              }`}
          >
            <p className="font-bold text-foreground mb-1">
              {answerState === "correct"
                ? `🎉 Correct — ${puzzle.answer}!`
                : `✗ It was: ${puzzle.answer}`}
            </p>
            <p className="text-muted-foreground leading-relaxed">{puzzle.funFact}</p>
          </div>
          <button
            onClick={next}
            className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {index + 1 >= puzzles.length ? "See my score →" : "Next emoji →"}
          </button>
        </div>
      )}
    </div>
  );
}
