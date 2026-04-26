export interface EmojiPuzzle {
  id: number;
  emojis: string; // e.g. "🐋 😱 🙏"
  answer: string;
  choices: [string, string, string, string];
  funFact: string;
  difficulty: "easy" | "medium" | "hard";
}

export const EMOJI_PUZZLES: EmojiPuzzle[] = [
  // ── Easy ──────────────────────────────────────────────────────────────────
  {
    id: 1,
    emojis: "🍎 🐍 😔",
    answer: "Adam & Eve",
    choices: ["Adam & Eve", "Noah's Ark", "Moses", "David & Goliath"],
    funFact: "The serpent tricked Eve into eating the forbidden fruit, then she gave some to Adam. That's how sin entered the world. (Genesis 3)",
    difficulty: "easy",
  },
  {
    id: 2,
    emojis: "🌊 ⛵ 🌈",
    answer: "Noah's Ark",
    choices: ["Noah's Ark", "Moses & the Red Sea", "Jonah", "Jesus calms the storm"],
    funFact: "After the flood, God put a rainbow in the sky as a promise never to flood the whole earth again. (Genesis 9:13)",
    difficulty: "easy",
  },
  {
    id: 3,
    emojis: "🐋 😱 🙏",
    answer: "Jonah",
    choices: ["Jonah", "Noah", "Peter", "Elijah"],
    funFact: "Jonah tried to run from God by sailing to Tarshish. After 3 days inside the big fish, he prayed — and was spat out onto dry land! (Jonah 1–2)",
    difficulty: "easy",
  },
  {
    id: 4,
    emojis: "⭐ 👶 🎁",
    answer: "Birth of Jesus",
    choices: ["Birth of Jesus", "Moses in Egypt", "Baby Samuel", "Joseph & his brothers"],
    funFact: "Wise men from the East followed a star to find baby Jesus and brought gifts of gold, frankincense, and myrrh. (Matthew 2:11)",
    difficulty: "easy",
  },
  {
    id: 5,
    emojis: "🗡️ 🪨 💪",
    answer: "David & Goliath",
    choices: ["David & Goliath", "Samson", "Joshua & Jericho", "Gideon"],
    funFact: "David was just a teenager when he defeated the giant Goliath with one stone from his sling. He didn't even use a sword! (1 Samuel 17)",
    difficulty: "easy",
  },
  {
    id: 6,
    emojis: "🦁 😮 🙏",
    answer: "Daniel in the Lions' Den",
    choices: ["Daniel in the Lions' Den", "Samson & the lion", "David the shepherd", "Elijah & the animals"],
    funFact: "God sent an angel to shut the lions' mouths all night. In the morning, Daniel walked out without a scratch. (Daniel 6:22)",
    difficulty: "easy",
  },
  {
    id: 7,
    emojis: "🌳 💰 👀",
    answer: "Zacchaeus",
    choices: ["Zacchaeus", "Nicodemus", "The Rich Young Ruler", "Bartimaeus"],
    funFact: "Zacchaeus was a tax collector who climbed a sycamore tree to see Jesus. Jesus called him down and had dinner at his house! (Luke 19)",
    difficulty: "easy",
  },
  {
    id: 8,
    emojis: "🔥 🌿 👟",
    answer: "Moses & the Burning Bush",
    choices: ["Moses & the Burning Bush", "Elijah & the fire", "Shadrach in the furnace", "The pillar of fire"],
    funFact: "The bush was on fire but didn't burn up! God told Moses to remove his sandals because he was standing on holy ground. (Exodus 3:5)",
    difficulty: "easy",
  },
  {
    id: 9,
    emojis: "🧺 👶 🌊",
    answer: "Baby Moses",
    choices: ["Baby Moses", "Baby Jesus", "Baby Samuel", "Baby John the Baptist"],
    funFact: "Moses' mother put him in a basket among the reeds of the Nile to save him. Pharaoh's daughter found him and raised him as her own son. (Exodus 2:5)",
    difficulty: "easy",
  },
  {
    id: 10,
    emojis: "🐟 🍞 👥",
    answer: "Feeding the 5,000",
    choices: ["Feeding the 5,000", "The Last Supper", "Elisha & the widow's oil", "Manna in the desert"],
    funFact: "A boy shared his 5 loaves and 2 fish. Jesus blessed them and fed over 5,000 people — with 12 basketfuls left over! (John 6:9)",
    difficulty: "easy",
  },
  // ── Medium ────────────────────────────────────────────────────────────────
  {
    id: 11,
    emojis: "🌊 🚶 😨",
    answer: "Jesus Walks on Water",
    choices: ["Jesus Walks on Water", "Moses Parts the Red Sea", "Crossing the Jordan", "Elijah parts the Jordan"],
    funFact: "Peter also walked on water — until he looked at the waves and got scared. Jesus caught him and said 'You of little faith, why did you doubt?' (Matthew 14:31)",
    difficulty: "medium",
  },
  {
    id: 12,
    emojis: "🏰 📯 🧱",
    answer: "Battle of Jericho",
    choices: ["Battle of Jericho", "Tower of Babel", "David captures Jerusalem", "Nehemiah rebuilds the wall"],
    funFact: "The Israelites marched around the city once a day for 6 days, and 7 times on the 7th day. They shouted — and the walls collapsed! (Joshua 6)",
    difficulty: "medium",
  },
  {
    id: 13,
    emojis: "🔥 👨‍👨‍👦 👑",
    answer: "Shadrach, Meshach & Abednego",
    choices: ["Shadrach, Meshach & Abednego", "Elijah & the prophets of Baal", "Moses & the burning bush", "Paul & Silas in prison"],
    funFact: "King Nebuchadnezzar saw a FOURTH person walking in the fire with them — and said he looked like 'a son of the gods.' (Daniel 3:25)",
    difficulty: "medium",
  },
  {
    id: 14,
    emojis: "🌊 ✌️ 🏃",
    answer: "Crossing the Red Sea",
    choices: ["Crossing the Red Sea", "Crossing the Jordan River", "Noah's Flood", "Jesus walks on water"],
    funFact: "The water stood up like walls on both sides as the Israelites walked through on dry ground. When the Egyptians followed, the water crashed back down. (Exodus 14:22)",
    difficulty: "medium",
  },
  {
    id: 15,
    emojis: "🎨 🌈 💒",
    answer: "Joseph's Coat of Many Colors",
    choices: ["Joseph's Coat of Many Colors", "Noah's Rainbow", "The Tabernacle", "Solomon's Temple"],
    funFact: "Jacob gave Joseph a special robe as a sign of favour. His brothers were so jealous, they sold him to slave traders heading to Egypt. (Genesis 37:3)",
    difficulty: "medium",
  },
  {
    id: 16,
    emojis: "💤 🌾 🐄",
    answer: "Pharaoh's Dream",
    choices: ["Pharaoh's Dream", "Joseph's Dream", "Daniel's Vision", "Nebuchadnezzar's Dream"],
    funFact: "Pharaoh dreamed of 7 fat cows eaten by 7 skinny cows. Joseph said this meant 7 years of plenty followed by 7 years of famine — and he was right! (Genesis 41)",
    difficulty: "medium",
  },
  {
    id: 17,
    emojis: "⛓️ 🎵 🌍",
    answer: "Paul & Silas in Prison",
    choices: ["Paul & Silas in Prison", "Samson in chains", "John on Patmos", "Peter in prison"],
    funFact: "Paul and Silas sang hymns and prayed at midnight. Suddenly an earthquake shook the prison, all the doors opened, and their chains fell off! (Acts 16:26)",
    difficulty: "medium",
  },
  {
    id: 18,
    emojis: "💪 🏛️ 🙈",
    answer: "Samson",
    choices: ["Samson", "Goliath", "King Saul", "Gideon"],
    funFact: "Samson's strength came from his long hair. When Delilah cut it while he slept, his strength left — but it grew back, and he defeated the Philistines one last time. (Judges 16)",
    difficulty: "medium",
  },
  {
    id: 19,
    emojis: "🐑 🌙 ⭐",
    answer: "Shepherds at the Nativity",
    choices: ["Shepherds at the Nativity", "David as a shepherd", "The Parable of the Lost Sheep", "Jacob tending Laban's flocks"],
    funFact: "Angels appeared to shepherds in the fields at night and said 'Do not be afraid — I bring you good news of great joy!' They were the first to visit baby Jesus. (Luke 2:8)",
    difficulty: "medium",
  },
  {
    id: 20,
    emojis: "🦋 🌸 ☀️",
    answer: "Creation",
    choices: ["Creation", "Garden of Eden", "The New Jerusalem", "Noah after the flood"],
    funFact: "God created the heavens and the earth in 6 days and rested on the 7th. That's why we have a week! (Genesis 1–2:3)",
    difficulty: "medium",
  },
  // ── Hard ──────────────────────────────────────────────────────────────────
  {
    id: 21,
    emojis: "🔥 🌧️ ⚡",
    answer: "Elijah vs. Prophets of Baal",
    choices: ["Elijah vs. Prophets of Baal", "The 10 Plagues", "Ezekiel's Vision", "Elijah & the still small voice"],
    funFact: "450 prophets of Baal prayed all day — nothing happened. Elijah prayed once, and fire fell from heaven and consumed the offering, the stones, and even the water! (1 Kings 18:38)",
    difficulty: "hard",
  },
  {
    id: 22,
    emojis: "🌾 👩 💍",
    answer: "Ruth & Boaz",
    choices: ["Ruth & Boaz", "Rebekah & Isaac", "Esther & Xerxes", "Rachel & Jacob"],
    funFact: "Ruth was a Moabite widow who stayed loyal to her mother-in-law Naomi. Boaz noticed her kindness and became her 'kinsman redeemer' — and she became the great-grandmother of King David! (Ruth 4:17)",
    difficulty: "hard",
  },
  {
    id: 23,
    emojis: "👁️ 🌀 🦴",
    answer: "Ezekiel's Valley of Dry Bones",
    choices: ["Ezekiel's Valley of Dry Bones", "Daniel's Vision", "John's Revelation", "Isaiah's Throne Room"],
    funFact: "God showed Ezekiel a valley full of dry bones and asked 'Can these bones live?' Ezekiel prophesied — and the bones rattled together, grew flesh, and became an army! (Ezekiel 37:10)",
    difficulty: "hard",
  },
  {
    id: 24,
    emojis: "👑 💌 ⚔️",
    answer: "David & Bathsheba",
    choices: ["David & Bathsheba", "Solomon's Wisdom", "Esther & the King", "Saul & David"],
    funFact: "The prophet Nathan confronted David with a story about a stolen lamb — making David judge himself before revealing 'You are the man!' (2 Samuel 12:7)",
    difficulty: "hard",
  },
  {
    id: 25,
    emojis: "🏃 🌵 ☁️",
    answer: "Elijah in the Wilderness",
    choices: ["Elijah in the Wilderness", "Moses in the desert", "Israel's 40 years wandering", "John the Baptist"],
    funFact: "After his great victory, Elijah was so exhausted and scared he wanted to die. An angel woke him twice and gave him food — 'the journey is too much for you.' (1 Kings 19:7)",
    difficulty: "hard",
  },
  {
    id: 26,
    emojis: "🕊️ 🌊 🔓",
    answer: "Baptism of Jesus",
    choices: ["Baptism of Jesus", "John the Baptist", "Crossing the Jordan", "Noah's Dove"],
    funFact: "When Jesus was baptized, the heavens opened, the Spirit descended like a dove, and a voice said 'This is my Son, whom I love; with him I am well pleased.' (Matthew 3:17)",
    difficulty: "hard",
  },
  {
    id: 27,
    emojis: "🌑 ⏰ 🏠",
    answer: "Passover",
    choices: ["Passover", "The 10 Plagues", "Crossing the Red Sea", "The Day of Atonement"],
    funFact: "The Israelites painted lamb's blood over their doorposts. The angel of death 'passed over' those houses. Jews still celebrate Passover every year to remember this night. (Exodus 12:13)",
    difficulty: "hard",
  },
  {
    id: 28,
    emojis: "📜 🔨 💡",
    answer: "Ten Commandments",
    choices: ["Ten Commandments", "Moses & the Burning Bush", "Joshua's covenant", "The Sermon on the Mount"],
    funFact: "Moses smashed the first set of stone tablets when he saw the Israelites worshipping a golden calf. God told him to carve a second set. (Exodus 34:1)",
    difficulty: "hard",
  },
  {
    id: 29,
    emojis: "🌙 🤼 🆕",
    answer: "Jacob Wrestles with God",
    choices: ["Jacob Wrestles with God", "Samson & the Philistines", "David & Goliath", "Jacob & Esau"],
    funFact: "Jacob wrestled with a mysterious man all night and refused to let go until he received a blessing. His name was changed to Israel — meaning 'one who struggles with God.' (Genesis 32:28)",
    difficulty: "hard",
  },
  {
    id: 30,
    emojis: "🎣 🐟 🤝",
    answer: "Jesus Calls the Fishermen",
    choices: ["Jesus Calls the Fishermen", "Feeding the 5,000", "Peter walks on water", "The miraculous catch"],
    funFact: "Peter, Andrew, James, and John left their fishing nets immediately and followed Jesus. No hesitation — they just left everything behind. (Matthew 4:20)",
    difficulty: "hard",
  },
];

export function getEmojiRound(count = 10): EmojiPuzzle[] {
  // Give a mix of difficulties
  const easy   = EMOJI_PUZZLES.filter(p => p.difficulty === "easy").sort(() => Math.random() - 0.5);
  const medium = EMOJI_PUZZLES.filter(p => p.difficulty === "medium").sort(() => Math.random() - 0.5);
  const hard   = EMOJI_PUZZLES.filter(p => p.difficulty === "hard").sort(() => Math.random() - 0.5);
  const mixed  = [...easy.slice(0, 4), ...medium.slice(0, 4), ...hard.slice(0, 2)];
  return mixed.sort(() => Math.random() - 0.5).slice(0, count);
}
