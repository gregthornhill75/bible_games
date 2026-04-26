"use client";

import { useState, useEffect, useCallback } from "react";

interface Card {
  id: number;
  pairId: number;
  emoji: string;
  label: string;
  flipped: boolean;
  matched: boolean;
}

const CARD_PAIRS = [
  { emoji: "🦁", label: "Lion" },
  { emoji: "🐋", label: "Whale" },
  { emoji: "🕊️", label: "Dove" },
  { emoji: "🐑", label: "Lamb" },
  { emoji: "🐍", label: "Serpent" },
  { emoji: "🌊", label: "Flood" },
  { emoji: "⭐", label: "Star" },
  { emoji: "🔥", label: "Fire" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeCards(): Card[] {
  const pairs = shuffle(CARD_PAIRS).slice(0, 6);
  const cards: Card[] = [];
  pairs.forEach((pair, pairId) => {
    cards.push({ id: pairId * 2,     pairId, ...pair, flipped: false, matched: false });
    cards.push({ id: pairId * 2 + 1, pairId, ...pair, flipped: false, matched: false });
  });
  return shuffle(cards);
}

export function KidsBibleMatch() {
  const [cards, setCards] = useState<Card[]>(() => makeCards());
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const matchedCount = cards.filter((c) => c.matched).length / 2;
  const totalPairs = cards.length / 2;

  // Check win
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) {
      setWon(true);
    }
  }, [cards]);

  const flip = useCallback(
    (id: number) => {
      if (locked || won) return;
      const card = cards.find((c) => c.id === id);
      if (!card || card.flipped || card.matched) return;
      if (selected.includes(id)) return;

      const newSelected = [...selected, id];
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
      );

      if (newSelected.length === 2) {
        setMoves((m) => m + 1);
        setLocked(true);
        const [a, b] = newSelected.map((sid) => cards.find((c) => c.id === sid)!);
        if (a.pairId === b.pairId) {
          // Match!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.pairId === a.pairId ? { ...c, matched: true } : c
              )
            );
            setSelected([]);
            setLocked(false);
          }, 600);
        } else {
          // No match — flip back
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                newSelected.includes(c.id) ? { ...c, flipped: false } : c
              )
            );
            setSelected([]);
            setLocked(false);
          }, 1000);
        }
      } else {
        setSelected(newSelected);
      }
    },
    [cards, selected, locked, won]
  );

  const reset = () => {
    setCards(makeCards());
    setSelected([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      {/* Stats */}
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Pairs found:{" "}
          <strong className="text-foreground">
            {matchedCount}/{totalPairs}
          </strong>
        </span>
        <span>
          Moves: <strong className="text-foreground">{moves}</strong>
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => flip(card.id)}
            disabled={card.matched || locked}
            aria-label={card.flipped || card.matched ? card.label : "Hidden card"}
            className={`
              aspect-square rounded-xl border-2 text-3xl transition-all duration-300
              flex items-center justify-center
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              ${
                card.matched
                  ? "border-connections-green bg-connections-green/20 cursor-default scale-95"
                  : card.flipped
                  ? "border-primary bg-primary/10 scale-105 shadow-glow"
                  : "border-border bg-card hover:border-primary/50 hover:bg-accent cursor-pointer"
              }
            `}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>

      {/* Win message */}
      {won && (
        <div className="mt-6 rounded-2xl bg-connections-green/20 border border-connections-green p-4 text-center animate-scale-in">
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-bold text-foreground">Amazing! You matched them all!</p>
          <p className="text-sm text-muted-foreground mt-1">
            Finished in <strong>{moves}</strong> moves
          </p>
          <button
            onClick={reset}
            className="mt-3 rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Play Again
          </button>
        </div>
      )}

      {!won && (
        <div className="mt-4 text-center">
          <button
            onClick={reset}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
