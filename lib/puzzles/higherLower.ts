export interface BibleBook {
  name: string;
  order: number; // canonical order 1–66
  testament: "OT" | "NT";
  emoji: string;
}

export const BIBLE_BOOKS: BibleBook[] = [
  { name: "Genesis", order: 1, testament: "OT", emoji: "🌱" },
  { name: "Exodus", order: 2, testament: "OT", emoji: "🔥" },
  { name: "Leviticus", order: 3, testament: "OT", emoji: "📜" },
  { name: "Numbers", order: 4, testament: "OT", emoji: "🔢" },
  { name: "Deuteronomy", order: 5, testament: "OT", emoji: "⚖️" },
  { name: "Joshua", order: 6, testament: "OT", emoji: "🗡️" },
  { name: "Judges", order: 7, testament: "OT", emoji: "⚔️" },
  { name: "Ruth", order: 8, testament: "OT", emoji: "🌾" },
  { name: "1 Samuel", order: 9, testament: "OT", emoji: "👑" },
  { name: "2 Samuel", order: 10, testament: "OT", emoji: "👑" },
  { name: "1 Kings", order: 11, testament: "OT", emoji: "🏛️" },
  { name: "2 Kings", order: 12, testament: "OT", emoji: "🏛️" },
  { name: "1 Chronicles", order: 13, testament: "OT", emoji: "📖" },
  { name: "2 Chronicles", order: 14, testament: "OT", emoji: "📖" },
  { name: "Ezra", order: 15, testament: "OT", emoji: "🏗️" },
  { name: "Nehemiah", order: 16, testament: "OT", emoji: "🧱" },
  { name: "Esther", order: 17, testament: "OT", emoji: "👸" },
  { name: "Job", order: 18, testament: "OT", emoji: "😔" },
  { name: "Psalms", order: 19, testament: "OT", emoji: "🎵" },
  { name: "Proverbs", order: 20, testament: "OT", emoji: "💡" },
  { name: "Ecclesiastes", order: 21, testament: "OT", emoji: "🌀" },
  { name: "Song of Solomon", order: 22, testament: "OT", emoji: "🌹" },
  { name: "Isaiah", order: 23, testament: "OT", emoji: "🕊️" },
  { name: "Jeremiah", order: 24, testament: "OT", emoji: "😢" },
  { name: "Lamentations", order: 25, testament: "OT", emoji: "💔" },
  { name: "Ezekiel", order: 26, testament: "OT", emoji: "👁️" },
  { name: "Daniel", order: 27, testament: "OT", emoji: "🦁" },
  { name: "Hosea", order: 28, testament: "OT", emoji: "💔" },
  { name: "Joel", order: 29, testament: "OT", emoji: "🌾" },
  { name: "Amos", order: 30, testament: "OT", emoji: "⚖️" },
  { name: "Obadiah", order: 31, testament: "OT", emoji: "📜" },
  { name: "Jonah", order: 32, testament: "OT", emoji: "🐋" },
  { name: "Micah", order: 33, testament: "OT", emoji: "⚖️" },
  { name: "Nahum", order: 34, testament: "OT", emoji: "💥" },
  { name: "Habakkuk", order: 35, testament: "OT", emoji: "🤔" },
  { name: "Zephaniah", order: 36, testament: "OT", emoji: "🔥" },
  { name: "Haggai", order: 37, testament: "OT", emoji: "🏗️" },
  { name: "Zechariah", order: 38, testament: "OT", emoji: "🐴" },
  { name: "Malachi", order: 39, testament: "OT", emoji: "✉️" },
  { name: "Matthew", order: 40, testament: "NT", emoji: "✝️" },
  { name: "Mark", order: 41, testament: "NT", emoji: "⚡" },
  { name: "Luke", order: 42, testament: "NT", emoji: "👨‍⚕️" },
  { name: "John", order: 43, testament: "NT", emoji: "💛" },
  { name: "Acts", order: 44, testament: "NT", emoji: "🔥" },
  { name: "Romans", order: 45, testament: "NT", emoji: "📜" },
  { name: "1 Corinthians", order: 46, testament: "NT", emoji: "💌" },
  { name: "2 Corinthians", order: 47, testament: "NT", emoji: "💌" },
  { name: "Galatians", order: 48, testament: "NT", emoji: "🕊️" },
  { name: "Ephesians", order: 49, testament: "NT", emoji: "🛡️" },
  { name: "Philippians", order: 50, testament: "NT", emoji: "😊" },
  { name: "Colossians", order: 51, testament: "NT", emoji: "👑" },
  { name: "1 Thessalonians", order: 52, testament: "NT", emoji: "☁️" },
  { name: "2 Thessalonians", order: 53, testament: "NT", emoji: "☁️" },
  { name: "1 Timothy", order: 54, testament: "NT", emoji: "📋" },
  { name: "2 Timothy", order: 55, testament: "NT", emoji: "📋" },
  { name: "Titus", order: 56, testament: "NT", emoji: "📝" },
  { name: "Philemon", order: 57, testament: "NT", emoji: "🤝" },
  { name: "Hebrews", order: 58, testament: "NT", emoji: "⚓" },
  { name: "James", order: 59, testament: "NT", emoji: "💪" },
  { name: "1 Peter", order: 60, testament: "NT", emoji: "🪨" },
  { name: "2 Peter", order: 61, testament: "NT", emoji: "🪨" },
  { name: "1 John", order: 62, testament: "NT", emoji: "❤️" },
  { name: "2 John", order: 63, testament: "NT", emoji: "❤️" },
  { name: "3 John", order: 64, testament: "NT", emoji: "❤️" },
  { name: "Jude", order: 65, testament: "NT", emoji: "⚔️" },
  { name: "Revelation", order: 66, testament: "NT", emoji: "🌟" },
];

// Pick N random books for a round, returned shuffled
export function getRandomRound(count = 6, seed?: number): BibleBook[] {
  const rng = seed ?? Date.now();
  let h = rng;
  const rand = () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    return (h ^ (h >>> 16)) >>> 0;
  };

  const pool = [...BIBLE_BOOKS];
  const picked: BibleBook[] = [];
  while (picked.length < count && pool.length > 0) {
    const idx = rand() % pool.length;
    picked.push(pool.splice(idx, 1)[0]);
  }
  // Shuffle
  for (let i = picked.length - 1; i > 0; i--) {
    const j = rand() % (i + 1);
    [picked[i], picked[j]] = [picked[j], picked[i]];
  }
  return picked;
}

export function getTodaySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}
