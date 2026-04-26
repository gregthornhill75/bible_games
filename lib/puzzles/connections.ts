export type Difficulty = "yellow" | "green" | "blue" | "purple";

export interface ConnectionsCategory {
  title: string;
  words: string[];
  difficulty: Difficulty;
  emoji: string;
}

export interface ConnectionsPuzzle {
  date: string; // YYYY-MM-DD
  id: number;
  categories: [ConnectionsCategory, ConnectionsCategory, ConnectionsCategory, ConnectionsCategory];
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  yellow: "Straightforward",
  green: "Moderate",
  blue: "Tricky",
  purple: "Biblical Scholar",
};

export const DIFFICULTY_ORDER: Difficulty[] = ["yellow", "green", "blue", "purple"];

// Puzzle archive — add new puzzles to the top
export const PUZZLES: ConnectionsPuzzle[] = [
  {
    date: "2026-04-27",
    id: 2,
    categories: [
      {
        title: "Animals on Noah's Ark",
        words: ["DOVE", "RAVEN", "ELEPHANT", "LION"],
        difficulty: "yellow",
        emoji: "🌊",
      },
      {
        title: "Books of Moses",
        words: ["GENESIS", "EXODUS", "LEVITICUS", "NUMBERS"],
        difficulty: "green",
        emoji: "📜",
      },
      {
        title: "Women of the New Testament",
        words: ["MARY", "MARTHA", "LYDIA", "PRISCILLA"],
        difficulty: "blue",
        emoji: "✝️",
      },
      {
        title: "Things Jesus said \"I Am the ___\"",
        words: ["LIGHT", "VINE", "BREAD", "DOOR"],
        difficulty: "purple",
        emoji: "👑",
      },
    ],
  },
  {
    date: "2026-04-26",
    id: 1,
    categories: [
      {
        title: "Disciples of Jesus",
        words: ["PETER", "ANDREW", "JAMES", "JOHN"],
        difficulty: "yellow",
        emoji: "⚓",
      },
      {
        title: "Cities in the Book of Acts",
        words: ["ANTIOCH", "CORINTH", "EPHESUS", "PHILIPPI"],
        difficulty: "green",
        emoji: "🏛️",
      },
      {
        title: "Judges of Israel",
        words: ["GIDEON", "SAMSON", "DEBORAH", "JEPHTHAH"],
        difficulty: "blue",
        emoji: "⚔️",
      },
      {
        title: "Gifts of the Holy Spirit (1 Corinthians 12)",
        words: ["WISDOM", "HEALING", "PROPHECY", "TONGUES"],
        difficulty: "purple",
        emoji: "🕊️",
      },
    ],
  },
];

export function getPuzzleByDate(date: string): ConnectionsPuzzle | undefined {
  return PUZZLES.find((p) => p.date === date);
}

export function getLatestPuzzle(): ConnectionsPuzzle {
  return PUZZLES[0];
}

export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export function getAllWords(puzzle: ConnectionsPuzzle): string[] {
  return puzzle.categories.flatMap((c) => c.words);
}

// Shuffle an array with a seeded random (date-based so everyone gets same order)
export function shuffleWithSeed<T>(arr: T[], seed: string): T[] {
  const copy = [...arr];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  for (let i = copy.length - 1; i > 0; i--) {
    hash = Math.abs((hash * 1664525 + 1013904223) & 0x7fffffff);
    const j = hash % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
