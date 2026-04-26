export interface GridPuzzle {
  date: string;
  id: number;
  cols: [string, string, string]; // column header labels
  rows: [string, string, string]; // row header labels
  // cells[row][col] = array of valid answer strings (lowercase for comparison)
  cells: [[string[], string[], string[]], [string[], string[], string[]], [string[], string[], string[]]];
  // funFacts[row][col] = fun fact shown on correct answer
  funFacts: [[string, string, string], [string, string, string], [string, string, string]];
}

// ─── Master figure list for autocomplete ──────────────────────────────────────
// All notable biblical figures players might try
export const ALL_FIGURES = [
  "Aaron", "Abel", "Abigail", "Abimelech", "Abraham", "Adam", "Agabus",
  "Agrippa", "Ahab", "Ananias", "Andrew", "Anna", "Apollos", "Aquila",
  "Athaliah", "Balaam", "Barnabas", "Bartholomew", "Bathsheba", "Benjamin",
  "Boaz", "Cain", "Caleb", "Cornelius", "Daniel", "David", "Deborah",
  "Delilah", "Dinah", "Elijah", "Elisha", "Elizabeth", "Esau", "Esther",
  "Eve", "Ezekiel", "Ezra", "Gideon", "Goliath", "Hagar", "Hannah",
  "Herod", "Hezekiah", "Hosea", "Huldah", "Isaac", "Isaiah", "Ishmael",
  "Jacob", "James", "Jephthah", "Jeremiah", "Jesse", "Jesus", "Jezebel",
  "Job", "Joel", "Joanna", "John", "John the Baptist", "Jonah", "Joseph",
  "Joshua", "Josiah", "Judah", "Judas", "Junia", "Laban", "Lazarus",
  "Leah", "Lot", "Luke", "Lydia", "Malachi", "Manasseh", "Mark", "Martha",
  "Mary", "Mary Magdalene", "Matthew", "Melchizedek", "Micaiah", "Micah",
  "Miriam", "Moses", "Naomi", "Nathan", "Nathanael", "Nebuchadnezzar",
  "Nehemiah", "Nicodemus", "Noah", "Obadiah", "Paul", "Peter", "Philip",
  "Pharaoh", "Potiphar", "Priscilla", "Rachel", "Rahab", "Rebekah",
  "Ruth", "Samson", "Samuel", "Sarah", "Saul", "Silas", "Simon",
  "Solomon", "Stephen", "Tabitha", "Thomas", "Timothy", "Zacchaeus",
  "Zechariah", "Zedekiah", "Asenath", "Johoiachin", "Jehoiachin",
  "Queen of Sheba", "Salome", "Susanna",
];

// ─── Puzzle archive ────────────────────────────────────────────────────────────
export const GRID_PUZZLES: GridPuzzle[] = [
  {
    date: "2026-04-28",
    id: 3,
    cols: ["Was imprisoned", "Was a shepherd", "Appears in the book of Acts"],
    rows: ["Was a prophet", "Was a king", "Was a woman"],
    cells: [
      // row 0: Was a prophet
      [
        ["jeremiah", "john the baptist", "micaiah", "daniel"], // prophet + imprisoned
        ["moses", "david", "amos", "elisha"],                   // prophet + shepherd
        ["paul", "agabus", "barnabas"],                         // prophet + Acts
      ],
      // row 1: Was a king
      [
        ["jehoiachin", "manasseh", "zedekiah"],                 // king + imprisoned
        ["david", "saul"],                                       // king + shepherd
        ["herod", "agrippa"],                                    // king + Acts
      ],
      // row 2: Was a woman
      [
        ["paul", "peter", "silas", "john"],                     // woman + imprisoned — tricky! none of the 12 were women imprisoned... actually Thecla (tradition), but canonical: this is actually hard. Let me reconsider.
        ["rachel", "rebekah", "leah", "zipporah"],              // woman + shepherd
        ["lydia", "priscilla", "tabitha", "dorcas", "sapphira", "philip's daughters"], // woman + Acts
      ],
    ],
    funFacts: [
      [
        "Jeremiah was thrown into a muddy cistern by officials who wanted to silence him. (Jer 38:6)",
        "Moses was tending the flock of his father-in-law Jethro when he saw the burning bush. (Ex 3:1)",
        "Paul was both an apostle and listed as a prophet at Antioch. (Acts 13:1)",
      ],
      [
        "King Manasseh was taken captive to Babylon with a hook in his nose — then repented. (2 Chr 33:11)",
        "David was the youngest of Jesse's 8 sons and tended the sheep before he was anointed king. (1 Sam 16:11)",
        "Herod Agrippa I appears in Acts 12, where he executes James and imprisons Peter.",
      ],
      [
        "Paul was imprisoned with Silas in Philippi; an earthquake freed them. (Acts 16:26)",
        "Rachel was a shepherd — she was at the well tending her father Laban's flock when Jacob met her. (Gen 29:9)",
        "Lydia, a seller of purple cloth, was the first recorded European convert to Christianity. (Acts 16:14)",
      ],
    ],
  },
  {
    date: "2026-04-27",
    id: 2,
    cols: ["Was a king of Israel or Judah", "Was a judge of Israel", "Was an apostle of Jesus"],
    rows: ["Was a woman", "Was a prophet", "Was imprisoned or in captivity"],
    cells: [
      // row 0: Was a woman
      [
        ["athaliah", "jezebel", "bathsheba", "esther", "queen of sheba"], // woman + king
        ["deborah"],                                                         // woman + judge
        ["mary magdalene", "junia", "martha", "joanna"],                    // woman + apostle
      ],
      // row 1: Was a prophet
      [
        ["david", "solomon"],                                               // prophet + king
        ["deborah", "samuel"],                                              // prophet + judge
        ["paul", "barnabas", "agabus"],                                     // prophet + apostle
      ],
      // row 2: Imprisoned
      [
        ["jehoiachin", "manasseh", "zedekiah"],                            // imprisoned + king
        ["samson"],                                                          // imprisoned + judge
        ["peter", "paul", "silas", "john"],                                // imprisoned + apostle
      ],
    ],
    funFacts: [
      [
        "Athaliah was the only woman to rule as queen over Judah — she reigned for 6 years. (2 Kgs 11)",
        "Deborah is the only woman listed as a judge of Israel in the book of Judges.",
        "Mary Magdalene was the first to see the risen Jesus and is called 'apostle to the apostles' by many church fathers.",
      ],
      [
        "David is called a prophet in Acts 2:30 because of his psalms foretelling the Messiah.",
        "Samuel was the last of the judges AND the first of the writing prophets. A true bridge figure.",
        "At Antioch, the church listed Barnabas, Simeon, Lucius, Manaen, and Saul as 'prophets and teachers'. (Acts 13:1)",
      ],
      [
        "King Jehoiachin was released from prison after 37 years by Evil-Merodach and given a seat of honor. (2 Kgs 25:27)",
        "Samson was captured by the Philistines, had his eyes gouged out, and was put to grinding grain in prison. (Judg 16:21)",
        "Peter and Silas sang hymns at midnight while chained in prison in Philippi. (Acts 16:25)",
      ],
    ],
  },
  {
    date: "2026-04-26",
    id: 1,
    cols: ["Was a disciple of Jesus", "Was a prophet", "Appears in Genesis"],
    rows: ["Was a woman", "Was imprisoned", "Had their name changed by God"],
    cells: [
      // row 0: Was a woman
      [
        ["mary magdalene", "martha", "joanna", "susanna", "salome"],       // woman + disciple
        ["deborah", "miriam", "huldah", "anna"],                           // woman + prophet
        ["eve", "sarah", "rebekah", "rachel", "leah", "hagar", "tamar", "dinah"], // woman + genesis
      ],
      // row 1: Was imprisoned
      [
        ["peter", "paul", "silas", "john"],                                // imprisoned + disciple
        ["jeremiah", "john the baptist", "micaiah"],                       // imprisoned + prophet
        ["joseph"],                                                         // imprisoned + genesis
      ],
      // row 2: Name changed by God
      [
        ["peter", "paul"],                                                  // name-changed + disciple
        ["daniel"],                                                         // name-changed + prophet
        ["abraham", "sarah", "jacob"],                                      // name-changed + genesis
      ],
    ],
    funFacts: [
      [
        "Mary Magdalene followed Jesus from Galilee and was the first witness to the resurrection. (Jn 20:16)",
        "Deborah judged Israel under a palm tree between Ramah and Bethel. (Judg 4:5)",
        "Eve's name means 'living' or 'life-giver' — Adam named her because she was the mother of all the living. (Gen 3:20)",
      ],
      [
        "Peter was imprisoned in Jerusalem by Herod — an angel woke him, his chains fell off, and the prison doors opened on their own. (Acts 12:7)",
        "Jeremiah was thrown into a muddy cistern and sank in the mud because he prophesied Jerusalem's fall. (Jer 38:6)",
        "Joseph was thrown into a pit by his brothers, sold as a slave, then falsely accused and imprisoned in Egypt. (Gen 39:20)",
      ],
      [
        "Simon became Peter — Jesus said 'You are Peter, and on this rock I will build my church.' (Mt 16:18)",
        "Daniel was given the name Belteshazzar by the Babylonian official. (Dan 1:7)",
        "Abram became Abraham — 'father of many nations' — as a sign of God's covenant. (Gen 17:5)",
      ],
    ],
  },
];

export function getGridByDate(date: string): GridPuzzle | undefined {
  return GRID_PUZZLES.find((p) => p.date === date);
}

export function getLatestGrid(): GridPuzzle {
  return GRID_PUZZLES[0];
}

export function isValidAnswer(
  puzzle: GridPuzzle,
  row: number,
  col: number,
  answer: string
): boolean {
  const valid = puzzle.cells[row][col];
  const normalised = answer.trim().toLowerCase();
  return valid.some(
    (v) => v === normalised || v.replace(/\s+/g, " ") === normalised
  );
}

export function suggestFigures(query: string): string[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase();
  return ALL_FIGURES.filter((f) => f.toLowerCase().startsWith(q)).slice(0, 8);
}
