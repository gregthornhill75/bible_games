"use client";

import { useState, useRef } from "react";
import type { BibleBook } from "@/lib/puzzles/higherLower";

interface Props {
  books: BibleBook[];
}

type State = "playing" | "checking" | "won" | "lost";

export function BibleHigherLower({ books: initialBooks }: Props) {
  const [items, setItems] = useState<BibleBook[]>(initialBooks);
  const [state, setState] = useState<State>("playing");
  const [wrongIds, setWrongIds] = useState<Set<number>>(new Set());
  const [correctIds, setCorrectIds] = useState<Set<number>>(new Set());

  // Drag state
  const dragIndex = useRef<number | null>(null);
  const dragOverIndex = useRef<number | null>(null);

  const onDragStart = (i: number) => {
    dragIndex.current = i;
  };

  const onDragEnter = (i: number) => {
    dragOverIndex.current = i;
    if (dragIndex.current === null || dragIndex.current === i) return;
    setItems((prev) => {
      const next = [...prev];
      const dragged = next.splice(dragIndex.current!, 1)[0];
      next.splice(i, 0, dragged);
      dragIndex.current = i;
      return next;
    });
  };

  const onDragEnd = () => {
    dragIndex.current = null;
    dragOverIndex.current = null;
  };

  // Touch drag state
  const touchStartY = useRef<number>(0);
  const touchIndex = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent, i: number) => {
    touchStartY.current = e.touches[0].clientY;
    touchIndex.current = i;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (touchIndex.current === null) return;
    const el = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    const targetAttr = el?.closest("[data-idx]")?.getAttribute("data-idx");
    if (targetAttr === null || targetAttr === undefined) return;
    const targetIdx = parseInt(targetAttr, 10);
    if (isNaN(targetIdx) || targetIdx === touchIndex.current) return;
    setItems((prev) => {
      const next = [...prev];
      const dragged = next.splice(touchIndex.current!, 1)[0];
      next.splice(targetIdx, 0, dragged);
      touchIndex.current = targetIdx;
      return next;
    });
  };

  const onTouchEnd = () => {
    touchIndex.current = null;
  };

  const checkOrder = () => {
    setState("checking");
    const wrong = new Set<number>();
    const correct = new Set<number>();
    let allCorrect = true;
    for (let i = 0; i < items.length - 1; i++) {
      if (items[i].order < items[i + 1].order) {
        correct.add(items[i].order);
        correct.add(items[i + 1].order);
      } else {
        wrong.add(items[i].order);
        wrong.add(items[i + 1].order);
        allCorrect = false;
      }
    }
    setWrongIds(wrong);
    setCorrectIds(correct);
    setTimeout(() => {
      setState(allCorrect ? "won" : "lost");
    }, 800);
  };

  const reset = () => {
    setItems([...initialBooks].sort(() => Math.random() - 0.5));
    setState("playing");
    setWrongIds(new Set());
    setCorrectIds(new Set());
  };

  const isPlaying = state === "playing" || state === "checking";

  return (
    <div className="mx-auto w-full max-w-md select-none">
      <p className="mb-4 text-center text-sm text-muted-foreground">
        Drag the books into{" "}
        <strong className="text-foreground">canonical Bible order</strong>{" "}
        (first → last), then tap <strong className="text-foreground">Check</strong>.
      </p>

      {/* ── Book list ── */}
      <div className="space-y-2" onDragOver={(e) => e.preventDefault()}>
        {items.map((book, i) => {
          const isWrong = wrongIds.has(book.order);
          const isCorrect = correctIds.has(book.order);
          return (
            <div
              key={book.order}
              data-idx={i}
              draggable={isPlaying}
              onDragStart={() => onDragStart(i)}
              onDragEnter={() => onDragEnter(i)}
              onDragEnd={onDragEnd}
              onTouchStart={(e) => onTouchStart(e, i)}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className={`
                flex items-center gap-3 rounded-xl border-2 px-4 py-3 transition-all duration-150
                ${isPlaying ? "cursor-grab active:cursor-grabbing" : "cursor-default"}
                ${
                  isWrong
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : isCorrect
                    ? "border-connections-green bg-connections-green/10 text-connections-green"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }
              `}
            >
              <span className="text-xl">{book.emoji}</span>
              <span className="flex-1 font-semibold text-sm">{book.name}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  book.testament === "OT"
                    ? "bg-connections-yellow/30 text-foreground"
                    : "bg-primary/20 text-primary"
                }`}
              >
                {book.testament}
              </span>
              {isPlaying && (
                <span className="text-muted-foreground text-sm">⠿</span>
              )}
              {isWrong && <span className="text-base">✗</span>}
              {isCorrect && <span className="text-base">✓</span>}
            </div>
          );
        })}
      </div>

      {/* ── Result message ── */}
      <div className="mt-4 h-8 text-center text-sm font-semibold">
        {state === "won" && (
          <span className="text-connections-green animate-fade-in">
            Perfect order! Well done! 🎉
          </span>
        )}
        {state === "lost" && (
          <span className="text-destructive animate-fade-in">
            Some books are out of order. Try again!
          </span>
        )}
      </div>

      {/* ── Controls ── */}
      <div className="mt-4 flex justify-center gap-3">
        {isPlaying && (
          <button
            onClick={checkOrder}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Check Order
          </button>
        )}
        {(state === "won" || state === "lost") && (
          <>
            <button
              onClick={reset}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                // New random round
                window.location.reload();
              }}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              New Books
            </button>
          </>
        )}
      </div>

      {/* ── Answer reveal on loss ── */}
      {state === "lost" && (
        <div className="mt-6 rounded-xl border border-border bg-muted p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Correct Order
          </p>
          <div className="space-y-1">
            {[...items]
              .sort((a, b) => a.order - b.order)
              .map((b, i) => (
                <p key={b.order} className="text-sm text-foreground">
                  {i + 1}. {b.emoji} {b.name}{" "}
                  <span className="text-muted-foreground">(#{b.order})</span>
                </p>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
