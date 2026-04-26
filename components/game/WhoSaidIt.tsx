"use client";

import { useState, useMemo } from "react";
import { type Quote, buildChoices } from "@/lib/puzzles/whoSaidIt";

interface Props {
  quotes: Quote[];
}

type AnswerState = "unanswered" | "correct" | "wrong";

interface RoundResult {
  quoteId: number;
  correct: boolean;
  chosen: string;
}

export function WhoSaidIt({ quotes }: Props) {
  const [index, setIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [chosen, setChosen] = useState<string | null>(null);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const quote = quotes[index];

  // Stable choices per question (useMemo so choices don't reshuffle on re-render)
  const choices = useMemo(() => buildChoices(quote), [quote]);

  const score = results.filter((r) => r.correct).length;

  const handleAnswer = (pick: string) => {
    if (answerState !== "unanswered") return;
    const correct = pick === quote.speaker;
    setChosen(pick);
    setAnswerState(correct ? "correct" : "wrong");
    setResults((prev) => [
      ...prev,
      { quoteId: quote.id, correct, chosen: pick },
    ]);
  };

  const next = () => {
    if (index + 1 >= quotes.length) {
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
    setResults([]);
    setGameOver(false);
  };

  if (gameOver) {
    const pct = Math.round((score / quotes.length) * 100);
    const medal =
      pct === 100 ? "🏆" : pct >= 80 ? "🥇" : pct >= 60 ? "🥈" : pct >= 40 ? "🥉" : "📖";
    return (
      <div className="mx-auto w-full max-w-lg text-center animate-scale-in">
        <div className="text-6xl mb-4">{medal}</div>
        <h2 className="font-display text-3xl font-semibold text-foreground">
          {score}/{quotes.length} correct
        </h2>
        <p className="mt-2 text-muted-foreground">
          {pct === 100
            ? "Perfect! You know your Bible inside out."
            : pct >= 80
            ? "Excellent work — you really know your Scripture!"
            : pct >= 60
            ? "Good effort! Keep reading your Bible."
            : pct >= 40
            ? "Not bad — there's always more to learn!"
            : "Keep studying — the Bible is full of wisdom!"}
        </p>

        {/* Results breakdown */}
        <div className="mt-6 space-y-2 text-left">
          {results.map((r, i) => {
            const q = quotes.find((qq) => qq.id === r.quoteId)!;
            return (
              <div
                key={r.quoteId}
                className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm
                  ${r.correct
                    ? "border-connections-green/40 bg-connections-green/10"
                    : "border-destructive/40 bg-destructive/10"
                  }`}
              >
                <span className="text-base mt-0.5">{r.correct ? "✓" : "✗"}</span>
                <div>
                  <p className="italic text-foreground/80">&ldquo;{q.text}&rdquo;</p>
                  <p className="mt-0.5 font-semibold text-foreground">
                    {q.speaker}{" "}
                    <span className="font-normal text-muted-foreground">— {q.reference}</span>
                  </p>
                  {!r.correct && (
                    <p className="text-destructive text-xs mt-0.5">
                      You said: {r.chosen}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={restart}
          className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Progress */}
      <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Question{" "}
          <strong className="text-foreground">
            {index + 1}/{quotes.length}
          </strong>
        </span>
        <span>
          Score:{" "}
          <strong className="text-foreground">{score}</strong>
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${((index) / quotes.length) * 100}%` }}
        />
      </div>

      {/* Quote card */}
      <div className="mb-6 rounded-2xl border border-border bg-card p-6 shadow-cell">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Who said it?
        </p>
        <blockquote className="font-display text-xl italic leading-relaxed text-foreground sm:text-2xl">
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <p className="mt-3 text-sm text-muted-foreground">— {quote.reference}</p>
      </div>

      {/* Answer choices */}
      <div className="space-y-3">
        {choices.map((choice) => {
          const isChosen = chosen === choice;
          const isCorrect = choice === quote.speaker;
          const revealed = answerState !== "unanswered";

          let style =
            "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent";
          if (revealed && isCorrect) {
            style =
              "border-connections-green bg-connections-green/15 text-connections-green font-semibold";
          } else if (revealed && isChosen && !isCorrect) {
            style = "border-destructive bg-destructive/10 text-destructive font-semibold";
          } else if (revealed) {
            style = "border-border bg-card text-muted-foreground opacity-60";
          }

          return (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              disabled={revealed}
              className={`w-full rounded-xl border-2 px-5 py-3.5 text-left text-sm transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                ${style}
                ${!revealed ? "cursor-pointer" : "cursor-default"}
              `}
            >
              <span className="flex items-center justify-between">
                <span>{choice}</span>
                {revealed && isCorrect && <span>✓</span>}
                {revealed && isChosen && !isCorrect && <span>✗</span>}
              </span>
            </button>
          );
        })}
      </div>

      {/* Context + Next */}
      {answerState !== "unanswered" && (
        <div className="mt-5 animate-slide-up">
          <div
            className={`rounded-xl px-4 py-3 text-sm mb-4
              ${answerState === "correct"
                ? "bg-connections-green/10 border border-connections-green/30 text-foreground"
                : "bg-destructive/10 border border-destructive/30 text-foreground"
              }`}
          >
            <p className="font-semibold mb-1">
              {answerState === "correct" ? "🎉 Correct!" : `✗ It was ${quote.speaker}`}
            </p>
            <p className="text-muted-foreground">{quote.context}</p>
          </div>
          <button
            onClick={next}
            className="w-full rounded-full bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {index + 1 >= quotes.length ? "See Results" : "Next Quote →"}
          </button>
        </div>
      )}
    </div>
  );
}
