// Centralized site configuration for Bible Connections
import { env } from "./env";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

export const siteConfig = {
  site: {
    name: "Bible Connections",
    title: "Bible Connections",
    description: "A daily Bible word-grouping puzzle. Find the four hidden categories among 16 words from Scripture — a new puzzle every day.",
    keywords: "bible connections, bible puzzle, bible trivia, bible word game, daily bible game, scripture puzzle, christian games, bible games",
    url: SITE_URL,
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    author: "Bible Games",
    email: "hello@biblegames.com",
    language: "en-US"
  },

  game: {
    name: "Bible Connections",
    type: "Game",
    category: "Puzzle",
    difficulty: "All Levels",
    gridSize: {
      rows: 4,
      cols: 4,
      minSize: 4,
      maxSize: 4
    },
    features: [
      "A new puzzle every day",
      "Four color-coded categories",
      "Four difficulty levels per puzzle",
      "Shareable results",
      "90-day archive"
    ]
  },

  meta: {
    title: "Bible Connections — Daily Bible Word Puzzle",
    description: "Group 16 Bible words into 4 hidden categories. A new scripture-based connections puzzle every day. Free to play, no sign-up needed.",
    keywords: "bible connections, bible puzzle, bible trivia, daily bible game, christian word game, scripture connections, bible word grouping",
    robots: "index, follow",
    canonical: SITE_URL,
    viewport: "width=device-width, initial-scale=1",
    themeColor: "#7c3aed"
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Bible Connections",
    title: "Bible Connections — Daily Bible Word Puzzle",
    description: "Group 16 Bible words into 4 hidden categories. A new scripture-based connections puzzle every day.",
    image: {
      url: "/og-image.svg",
      width: 1200,
      height: 630,
      alt: "Bible Connections — Daily Bible Word Puzzle"
    }
  },

  twitter: {
    card: "summary_large_image",
    site: "@biblegamescom",
    creator: "@biblegamescom",
    title: "Bible Connections — Daily Bible Word Puzzle",
    description: "Group 16 Bible words into 4 hidden categories. A new scripture-based puzzle every day.",
    image: "/og-image.svg"
  },

  navigation: {
    main: [
      { name: "Play", href: "/#game", current: true },
      { name: "How to Play", href: "/#how-to-play", current: false },
      { name: "Archive", href: "/archive", current: false },
      { name: "FAQ", href: "/#faq", current: false }
    ]
  },

  content: {
    hero: {
      title: "Bible Connections",
      subtitle: "Find the four groups hidden in 16 Bible words.",
      description: "Each puzzle has four color-coded categories. Select four words that share a biblical theme and reveal the connection. A new puzzle every day."
    },

    seoContent: {
      title: "About Bible Connections",
      content: `
        Bible Connections is a daily word-grouping puzzle inspired by Scripture. Each day, sixteen
        words drawn from the Bible are arranged on a 4×4 grid. Your task is to find the four hidden
        categories — each containing exactly four words — before you run out of attempts.

        The categories span the full range of biblical knowledge: people, places, books, parables,
        miracles, events, and more. One category might group four disciples of Jesus, while another
        groups four cities in the Book of Acts. The challenge is that some words seem to fit multiple
        categories — that's by design.

        Each category is color-coded by difficulty. Yellow is the most straightforward, followed by
        green, blue, and finally purple — the trickiest grouping, often requiring deeper familiarity
        with Scripture. You get four mistakes before the puzzle ends, so choose wisely.

        Bible Connections is completely free to play with no account required. It's designed for all
        ages — from Sunday school students to lifelong Bible scholars. Share your results with family
        and friends after each puzzle to spark a conversation about Scripture.
      `
    },

    gameRules: {
      title: "How to Play",
      rules: [
        "You'll see 16 words from the Bible arranged in a 4×4 grid.",
        "Find four groups of four words that share a hidden biblical connection.",
        "Select four words, then tap 'Submit' to check your guess.",
        "Correct groups are revealed with a color: yellow (easiest) through purple (hardest).",
        "You have four attempts — use them carefully. One Away means just one word is wrong.",
        "A new puzzle drops every day at midnight. Check the archive for past puzzles."
      ]
    }
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How often is a new Bible Connections puzzle published?",
        answer: "A new puzzle is released every day at midnight UTC. The previous 90 days of puzzles are available in the archive."
      },
      {
        question: "How hard is Bible Connections?",
        answer: "Each puzzle has four difficulty levels. Yellow is the most accessible — often straightforward Bible facts. Purple is the trickiest and may require deeper biblical knowledge. Everyone starts with yellow and works their way up."
      },
      {
        question: "Do I need to create an account to play?",
        answer: "No account required. Bible Connections is completely free to play directly in your browser. Your streak and progress are saved locally on your device."
      },
      {
        question: "Can I share my results?",
        answer: "Yes! After completing a puzzle you'll get a shareable emoji grid showing your category guesses — no spoilers included. Perfect for church groups and family chats."
      },
      {
        question: "What Bible translation do the puzzles use?",
        answer: "The puzzles are translation-neutral — they use proper names, places, and concepts that are consistent across all major translations (KJV, NIV, ESV, NKJV, etc.)."
      },
      {
        question: "Is Bible Connections suitable for kids?",
        answer: "Yes, especially the yellow and green categories. We also have dedicated kids games at /kids designed for ages 6–12 with simpler formats and bright visuals."
      }
    ]
  },

  relatedGames: {
    title: "More Bible Games",
    games: [
      {
        name: "Bible Higher or Lower",
        description: "Which book comes first? Which figure is mentioned more?",
        url: "/higher-lower",
        image: "/games/higher-lower.jpg"
      },
      {
        name: "Who Said It?",
        description: "Match the quote to the Biblical speaker.",
        url: "/who-said-it",
        image: "/games/who-said-it.jpg"
      },
      {
        name: "Kids Bible Match",
        description: "Fun memory card game for ages 6–12.",
        url: "/kids/match",
        image: "/games/kids-match.jpg"
      }
    ]
  },

  footer: {
    company: "Bible Games",
    copyright: "© 2026 Bible Games.",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Contact", href: "/contact" },
      { name: "About", href: "/about" }
    ],
    social: [
      { name: "Twitter", href: "https://twitter.com/biblegamescom", icon: "Twitter" },
      { name: "Facebook", href: "", icon: "Facebook" },
      { name: "Instagram", href: "", icon: "Instagram" }
    ]
  },

  performance: {
    preloadImages: [] as string[],
    lazyLoadThreshold: "100px",
    analyticsId: env.NEXT_PUBLIC_GA_ID || null
  }
};
