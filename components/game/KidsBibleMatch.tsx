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
  { emoji: "🦁", label: "Lion\n(Daniel)" },
  { emoji: "🐋", label: "Big Fish\n(Jonah)" },
  { emoji: "🕊️", label: "Dove\n(Noah)" },
  { emoji: "🐑", label: "Lamb\n(Jesus)" },
  { emoji: "⭐", label: "Star\n(Bethlehem)" },
  { emoji: "🌈", label: "Rainbow\n(Noah)" },
  { emoji: "⛵", label: "Ark\n(Noah)" },
  { emoji: "🔥", label: "Burning Bush\n(Moses)" },
  { emoji: "🗡️", label: "David\n(Goliath)" },
  { emoji: "🎺", label: "Trumpets\n(Jericho)" },
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

  const PAIR_COLORS = [
    "border-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
    "border-green-400 bg-green-100 dark:bg-green-900/30",
    "border-blue-400 bg-blue-100 dark:bg-blue-900/30",
    "border-pink-400 bg-pink-100 dark:bg-pink-900/30",
    "border-orange-400 bg-orange-100 dark:bg-orange-900/30",
    "border-purple-400 bg-purple-100 dark:bg-purple-900/30",
  ];

  return (
    <div className="mx-auto w-full max-w-sm select-none">
      {/* Stars progress */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPairs }).map((_, i) => (
            <span
              key={i}
              className={`text-xl transition-all duration-300 ${
                i < matchedCount ? "" : "grayscale opacity-30"
              }`}
            >
              ⭐
            </span>
          ))}
        </div>
        <span className="text-sm font-semibold text-muted-foreground">
          {moves} moves
        </span>
      </div>

      {/* Grid — 3 cols for bigger, kid-friendly cards */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => {
          const pairColor = PAIR_COLORS[card.pairId % PAIR_COLORS.length];
          const labelLines = card.label.split("\n");
          return (
            <button
              key={card.id}
              onClick={() => flip(card.id)}
              disabled={card.matched || locked}
              aria-label={card.flipped || card.matched ? card.label : "Hidden card"}
              className={`
                aspect-square rounded-2xl border-4 transition-all duration-300
                flex flex-col items-center justify-center gap-1
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                ${
                  card.matched
                    ? `${pairColor} cursor-default`
                    : card.flipped
                    ? "border-primary bg-primary/10 scale-105 shadow-glow cursor-pointer"
                    : "border-border bg-gradient-to-br from-primary/20 to-primary/5 hover:from-primary/30 hover:scale-105 cursor-pointer"
                }
              `}
            >
              {card.flipped || card.matched ? (
                <>
                  <span className="text-4xl leading-none">{card.emoji}</span>
                  <span className="text-center text-[10px] font-bold leading-tight px-1 text-foreground/80">
                    {labelLines[0]}
                  </span>
                </>
              ) : (
                <span className="text-4xl">❓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Win */}
      {won && (
        <div className="mt-6 rounded-2xl bg-connections-yellow/30 border-4 border-connections-yellow p-5 text-center animate-scale-in">
          <p className="text-5xl mb-2">🎉</p>
          <p className="font-display text-2xl font-bold text-foreground">You did it!</p>
          <p className="text-sm text-muted-foreground mt-1">
            All pairs matched in <strong>{moves}</strong> moves!
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Play Again! 🌟
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
