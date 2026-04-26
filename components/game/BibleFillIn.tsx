"use client";

import { useState } from "react";
import type { FillinQuestion } from "@/lib/puzzles/bibleFillin";

interface Props {
  questions: FillinQuestion[];
}

type AnswerState = "unanswered" | "correct" | "wrong";

export function BibleFillIn({ questions }: Props) {
  const [index, setIndex] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const q = questions[index];

  const handleAnswer = (pick: string) => {
    if (answerState !== "unanswered") return;
    const correct = pick === q.answer;
    setChosen(pick);
    setAnswerState(correct ? "correct" : "wrong");
    if (correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
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

  if (gameOver) {
    const stars = score >= questions.length ? 3 : score >= Math.ceil(questions.length * 0.6) ? 2 : 1;
    return (
      <div className="mx-auto w-full max-w-md text-center animate-scale-in">
        <div className="text-5xl mb-3">
          {"⭐".repeat(stars)}{"☆".repeat(3 - stars)}
        </div>
        <p className="font-display text-3xl font-bold text-foreground">
          {score}/{questions.length}
        </p>
        <p className="mt-2 text-muted-foreground">
          {stars === 3
            ? "Amazing! You know all the stories! 🎉"
            : stars === 2
            ? "Great job! Keep reading your Bible! 📖"
            : "Good try! You'll do even better next time! 💪"}
        </p>
        <button
          onClick={restart}
          className="mt-5 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Play Again! 🌟
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Progress stars */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex gap-0.5">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`text-lg transition-all ${
                i < index
                  ? "grayscale-0"
                  : i === index
                  ? "animate-pulse-glow"
                  : "grayscale opacity-20"
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          {score} right!
        </span>
      </div>

      {/* Question card */}
      <div className="mb-5 rounded-2xl border-2 border-border bg-card p-5 shadow-cell text-center">
        <p className="text-lg leading-relaxed text-foreground">
          <span>{q.before}</span>
          <span className="mx-1 inline-block min-w-16 border-b-2 border-primary px-2 font-bold text-primary">
            {answerState !== "unanswered" ? q.answer : "______"}
          </span>
          <span>{q.after}</span>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">{q.reference}</p>
      </div>

      {/* Choices — big colourful buttons for kids */}
      <div className="grid grid-cols-2 gap-3">
        {q.choices.map((choice) => {
          const isChosen = chosen === choice;
          const isCorrect = choice === q.answer;
          const revealed = answerState !== "unanswered";

          let style = "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent";
          if (revealed && isCorrect) {
            style = "border-connections-green bg-connections-green/20 text-connections-green font-bold";
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
                rounded-2xl border-4 px-4 py-4 text-base font-semibold
                transition-all duration-150 focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-ring
                ${style}
                ${!revealed ? "cursor-pointer hover:scale-105 active:scale-95" : "cursor-default"}
              `}
            >
              {choice}
              {revealed && isCorrect && " ✓"}
              {revealed && isChosen && !isCorrect && " ✗"}
            </button>
          );
        })}
      </div>

      {/* Fun fact + Next */}
      {answerState !== "unanswered" && (
        <div className="mt-4 animate-slide-up">
          <div
            className={`rounded-2xl border-2 p-4 mb-4 text-sm
              ${answerState === "correct"
                ? "border-connections-green/40 bg-connections-green/10"
                : "border-destructive/30 bg-destructive/5"
              }`}
          >
            <p className="font-bold text-foreground mb-1">
              {answerState === "correct" ? "🎉 That's right!" : `✗ The answer was "${q.answer}"`}
            </p>
            <p className="text-muted-foreground">{q.funFact}</p>
          </div>
          <button
            onClick={next}
            className="w-full rounded-full bg-primary py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            {index + 1 >= questions.length ? "See my score! ⭐" : "Next question →"}
          </button>
        </div>
      )}
    </div>
  );
}
