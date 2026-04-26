export interface Quote {
  id: number;
  text: string;
  speaker: string;
  reference: string;
  context: string; // short hint shown after answer
  wrongSpeakers: string[]; // exactly 4 plausible wrong answers
}

export const QUOTES: Quote[] = [
  {
    id: 1,
    text: "Am I my brother's keeper?",
    speaker: "Cain",
    reference: "Genesis 4:9",
    context: "Said to God after killing his brother Abel.",
    wrongSpeakers: ["Abel", "Adam", "Noah", "Jacob"],
  },
  {
    id: 2,
    text: "Here I am.",
    speaker: "Abraham",
    reference: "Genesis 22:1",
    context: "His response when God called him to sacrifice Isaac.",
    wrongSpeakers: ["Moses", "Samuel", "Isaiah", "Elijah"],
  },
  {
    id: 3,
    text: "Where you go I will go, and where you stay I will stay.",
    speaker: "Ruth",
    reference: "Ruth 1:16",
    context: "Said to her mother-in-law Naomi when urged to return home.",
    wrongSpeakers: ["Naomi", "Esther", "Miriam", "Deborah"],
  },
  {
    id: 4,
    text: "Speak, for your servant is listening.",
    speaker: "Samuel",
    reference: "1 Samuel 3:10",
    context: "Said after hearing God call his name three times in the night.",
    wrongSpeakers: ["Elijah", "Moses", "David", "Solomon"],
  },
  {
    id: 5,
    text: "The Lord is my shepherd; I shall not want.",
    speaker: "David",
    reference: "Psalm 23:1",
    context: "Opening line of the most beloved psalm in Scripture.",
    wrongSpeakers: ["Solomon", "Moses", "Asaph", "Isaiah"],
  },
  {
    id: 6,
    text: "I have sinned against the Lord.",
    speaker: "David",
    reference: "2 Samuel 12:13",
    context: "Said to the prophet Nathan after being confronted about Bathsheba.",
    wrongSpeakers: ["Saul", "Solomon", "Manasseh", "Ahab"],
  },
  {
    id: 7,
    text: "How long will you waver between two opinions? If the Lord is God, follow him.",
    speaker: "Elijah",
    reference: "1 Kings 18:21",
    context: "Said to Israel on Mount Carmel before the showdown with the prophets of Baal.",
    wrongSpeakers: ["Elisha", "Isaiah", "Jeremiah", "Moses"],
  },
  {
    id: 8,
    text: "I am only a child.",
    speaker: "Jeremiah",
    reference: "Jeremiah 1:6",
    context: "His response when God called him to be a prophet.",
    wrongSpeakers: ["Samuel", "Ezekiel", "Isaiah", "Daniel"],
  },
  {
    id: 9,
    text: "Here am I. Send me!",
    speaker: "Isaiah",
    reference: "Isaiah 6:8",
    context: "Said after seeing the Lord high and lifted up in the temple.",
    wrongSpeakers: ["Jeremiah", "Moses", "Ezekiel", "Amos"],
  },
  {
    id: 10,
    text: "For I know the plans I have for you, plans to prosper you and not to harm you.",
    speaker: "God (through Jeremiah)",
    reference: "Jeremiah 29:11",
    context: "God's words to the Israelites in Babylonian exile.",
    wrongSpeakers: ["Elijah", "Isaiah", "Moses", "Solomon"],
  },
  {
    id: 11,
    text: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
    speaker: "Jesus",
    reference: "Matthew 5:3",
    context: "The first beatitude from the Sermon on the Mount.",
    wrongSpeakers: ["Paul", "John the Baptist", "Peter", "James"],
  },
  {
    id: 12,
    text: "You are the Christ, the Son of the living God.",
    speaker: "Peter",
    reference: "Matthew 16:16",
    context: "His confession when Jesus asked 'Who do you say I am?'",
    wrongSpeakers: ["John", "Andrew", "Thomas", "Nathanael"],
  },
  {
    id: 13,
    text: "My Lord and my God!",
    speaker: "Thomas",
    reference: "John 20:28",
    context: "Said upon seeing the risen Jesus and touching His wounds.",
    wrongSpeakers: ["Peter", "John", "Andrew", "Philip"],
  },
  {
    id: 14,
    text: "What must I do to be saved?",
    speaker: "The Philippian Jailer",
    reference: "Acts 16:30",
    context: "Asked Paul and Silas after an earthquake broke open the prison.",
    wrongSpeakers: ["Cornelius", "Nicodemus", "The Rich Young Ruler", "Zacchaeus"],
  },
  {
    id: 15,
    text: "I can do all this through him who gives me strength.",
    speaker: "Paul",
    reference: "Philippians 4:13",
    context: "Written from prison about contentment in all circumstances.",
    wrongSpeakers: ["Peter", "James", "John", "Barnabas"],
  },
  {
    id: 16,
    text: "Lord, if you are willing, you can make me clean.",
    speaker: "A man with leprosy",
    reference: "Matthew 8:2",
    context: "Said while kneeling before Jesus.",
    wrongSpeakers: ["Blind Bartimaeus", "The centurion", "Nicodemus", "Jairus"],
  },
  {
    id: 17,
    text: "Woman, why are you crying? Who is it you are looking for?",
    speaker: "Jesus",
    reference: "John 20:15",
    context: "Said to Mary Magdalene at the empty tomb on resurrection morning.",
    wrongSpeakers: ["The angel", "Peter", "John", "The gardener"],
  },
  {
    id: 18,
    text: "It is finished.",
    speaker: "Jesus",
    reference: "John 19:30",
    context: "His final words before dying on the cross.",
    wrongSpeakers: ["Stephen", "Paul", "John", "Peter"],
  },
  {
    id: 19,
    text: "Silver and gold I do not have, but what I do have I give you.",
    speaker: "Peter",
    reference: "Acts 3:6",
    context: "Said to a lame beggar at the temple gate, before healing him.",
    wrongSpeakers: ["Paul", "John", "Stephen", "Barnabas"],
  },
  {
    id: 20,
    text: "For to me, to live is Christ and to die is gain.",
    speaker: "Paul",
    reference: "Philippians 1:21",
    context: "Written while imprisoned, reflecting on life and death.",
    wrongSpeakers: ["Peter", "James", "John", "Stephen"],
  },
  {
    id: 21,
    text: "Do not be afraid. I bring you good news that will cause great joy for all the people.",
    speaker: "The Angel",
    reference: "Luke 2:10",
    context: "Said to the shepherds on the night of Jesus's birth.",
    wrongSpeakers: ["Gabriel", "Jesus", "John the Baptist", "Mary"],
  },
  {
    id: 22,
    text: "Surely this man was the Son of God.",
    speaker: "The Roman Centurion",
    reference: "Mark 15:39",
    context: "Said at the moment Jesus died on the cross.",
    wrongSpeakers: ["Pilate", "Joseph of Arimathea", "Simon of Cyrene", "Barabbas"],
  },
  {
    id: 23,
    text: "Teacher, which is the greatest commandment in the Law?",
    speaker: "A Pharisee",
    reference: "Matthew 22:36",
    context: "A test question posed to Jesus to trap him.",
    wrongSpeakers: ["A scribe", "A Sadducee", "Nicodemus", "The rich young ruler"],
  },
  {
    id: 24,
    text: "Even if he does not, we will not serve your gods.",
    speaker: "Shadrach, Meshach and Abednego",
    reference: "Daniel 3:18",
    context: "Said to King Nebuchadnezzar before being thrown into the fiery furnace.",
    wrongSpeakers: ["Daniel", "Esther", "Ezekiel", "Nehemiah"],
  },
  {
    id: 25,
    text: "You intended to harm me, but God intended it for good.",
    speaker: "Joseph",
    reference: "Genesis 50:20",
    context: "Said to his brothers who had sold him into slavery years earlier.",
    wrongSpeakers: ["Moses", "Jacob", "David", "Solomon"],
  },
];

// Get a shuffled set of N quotes for a session
export function getSessionQuotes(count = 10): Quote[] {
  const shuffled = [...QUOTES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, QUOTES.length));
}

// Build 5 answer choices: correct + 4 wrong (shuffled)
export function buildChoices(quote: Quote): string[] {
  const choices = [quote.speaker, ...quote.wrongSpeakers];
  return choices.sort(() => Math.random() - 0.5);
}
