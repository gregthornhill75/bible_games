export interface FillinQuestion {
  id: number;
  before: string;    // text before the blank
  after: string;     // text after the blank
  answer: string;    // correct word
  choices: [string, string, string, string]; // 4 choices, answer is one of them
  reference: string;
  funFact: string;
}

export const FILLIN_QUESTIONS: FillinQuestion[] = [
  {
    id: 1,
    before: "For God so loved the world that he gave his one and only",
    after: ", that whoever believes in him shall not perish but have eternal life.",
    answer: "Son",
    choices: ["Son", "Prophet", "Angel", "Servant"],
    reference: "John 3:16",
    funFact: "This is the most memorized verse in the Bible!",
  },
  {
    id: 2,
    before: "In the beginning,",
    after: "created the heavens and the earth.",
    answer: "God",
    choices: ["God", "Moses", "Adam", "Noah"],
    reference: "Genesis 1:1",
    funFact: "These are the very first words of the Bible.",
  },
  {
    id: 3,
    before: "The Lord is my shepherd; I shall not",
    after: ".",
    answer: "want",
    choices: ["want", "fear", "fall", "cry"],
    reference: "Psalm 23:1",
    funFact: "David wrote this psalm. He really was a shepherd before becoming king!",
  },
  {
    id: 4,
    before: "Jesus wept. This is the",
    after: "verse in the Bible.",
    answer: "shortest",
    choices: ["shortest", "longest", "oldest", "hardest"],
    reference: "John 11:35",
    funFact: "Jesus cried when he saw Mary weeping over her brother Lazarus — then raised him from the dead!",
  },
  {
    id: 5,
    before: "Noah built a big",
    after: "to save the animals from the flood.",
    answer: "ark",
    choices: ["ark", "boat", "raft", "ship"],
    reference: "Genesis 6:14",
    funFact: "The ark was about as long as 1.5 football fields!",
  },
  {
    id: 6,
    before: "David used a",
    after: "and a stone to defeat the giant Goliath.",
    answer: "sling",
    choices: ["sling", "bow", "sword", "spear"],
    reference: "1 Samuel 17:50",
    funFact: "David picked up exactly 5 smooth stones from the stream before the battle.",
  },
  {
    id: 7,
    before: "Jesus fed",
    after: "people with just five loaves of bread and two fish.",
    answer: "5,000",
    choices: ["5,000", "500", "50,000", "1,000"],
    reference: "Matthew 14:21",
    funFact: "After everyone ate, there were 12 baskets of leftover pieces collected!",
  },
  {
    id: 8,
    before: "Jonah was swallowed by a",
    after: "and was inside for three days and three nights.",
    answer: "big fish",
    choices: ["big fish", "whale shark", "dolphin", "sea monster"],
    reference: "Jonah 1:17",
    funFact: "The Bible says 'big fish' — not whale! Jonah prayed inside the fish and was spat out onto dry land.",
  },
  {
    id: 9,
    before: "Moses parted the",
    after: "Sea so the Israelites could escape from Egypt.",
    answer: "Red",
    choices: ["Red", "Blue", "Dead", "Great"],
    reference: "Exodus 14:21",
    funFact: "God told Moses to stretch out his staff over the water — the sea split into two walls!",
  },
  {
    id: 10,
    before: "The first man God created was named",
    after: ".",
    answer: "Adam",
    choices: ["Adam", "Noah", "Abel", "Seth"],
    reference: "Genesis 2:7",
    funFact: "God made Adam from the dust of the ground and breathed life into him.",
  },
  {
    id: 11,
    before: "Zacchaeus climbed a",
    after: "tree to see Jesus because he was too short to see over the crowd.",
    answer: "sycamore",
    choices: ["sycamore", "olive", "fig", "cedar"],
    reference: "Luke 19:4",
    funFact: "Jesus looked up and said 'Zacchaeus, come down — I'm coming to your house today!' Zacchaeus was so happy he promised to give half his money to the poor.",
  },
  {
    id: 12,
    before: "Baby Jesus was placed in a",
    after: "because there was no room in the inn.",
    answer: "manger",
    choices: ["manger", "basket", "cradle", "cave"],
    reference: "Luke 2:7",
    funFact: "A manger is a feeding trough for animals — Jesus was born in a stable!",
  },
  {
    id: 13,
    before: "Daniel was thrown into a",
    after: "because he refused to stop praying to God.",
    answer: "lions' den",
    choices: ["lions' den", "fiery furnace", "prison", "dungeon"],
    reference: "Daniel 6:16",
    funFact: "God sent an angel to shut the lions' mouths, and Daniel wasn't hurt at all!",
  },
  {
    id: 14,
    before: "Shadrach, Meshach, and Abednego were thrown into a",
    after: "because they would not bow to a golden statue.",
    answer: "fiery furnace",
    choices: ["fiery furnace", "lions' den", "river", "pit"],
    reference: "Daniel 3:21",
    funFact: "The king saw a fourth person walking in the fire with them — they walked out without even the smell of smoke!",
  },
  {
    id: 15,
    before: "Jesus walked on",
    after: "to reach his disciples in the boat.",
    answer: "water",
    choices: ["water", "air", "ice", "sand"],
    reference: "Matthew 14:25",
    funFact: "Peter also walked on water for a moment — until he looked at the waves and got scared!",
  },
];

export function getFillinRound(count = 8): FillinQuestion[] {
  return [...FILLIN_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, count);
}
