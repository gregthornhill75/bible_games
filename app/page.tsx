import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { siteConfig } from "@/lib/siteConfig";
import { Container, Section } from "@/components/layout";
import { FAQSection } from "@/components/SEOContent";

export const metadata = buildMetadata({
  title: "Bible Games — Free Daily Bible Puzzles & Kids Games",
  description:
    "Free Bible games for all ages. Daily Bible Connections puzzle, Higher or Lower, Kids Bible Match and more. Play in your browser, no sign-up needed.",
  path: "/",
});

const ADULT_GAMES = [
  {
    href: "/connections",
    emoji: "🔗",
    title: "Bible Connections",
    description: "Group 16 Bible words into 4 hidden categories. A new puzzle every day.",
    badge: "Daily",
    badgeColor: "bg-primary text-primary-foreground",
    age: "All ages",
  },
  {
    href: "/immaculate-grid",
    emoji: "⚔️",
    title: "Bible Immaculate Grid",
    description: "Fill a 3×3 grid: name a biblical figure who fits both the row and column category.",
    badge: "Daily",
    badgeColor: "bg-connections-purple text-connections-purple-fg",
    age: "Adults",
  },
  {
    href: "/who-said-it",
    emoji: "🗣️",
    title: "Who Said It?",
    description: "A Bible quote appears. Pick the right speaker from 5 options — one chance only.",
    badge: "New",
    badgeColor: "bg-connections-blue text-connections-blue-fg",
    age: "All ages",
  },
  {
    href: "/higher-lower",
    emoji: "📖",
    title: "Bible Higher or Lower",
    description: "Drag the books of the Bible into the right canonical order. Can you get them all?",
    badge: "New",
    badgeColor: "bg-connections-green text-connections-green-fg",
    age: "All ages",
  },
];

const KIDS_GAMES = [
  {
    href: "/emoji-decoder",
    emoji: "🔍",
    title: "Bible Emoji Decoder",
    description: "Three emojis, one Bible story. Decode all 10 — easy to hard, fun for all ages.",
    badge: "New",
    badgeColor: "bg-connections-yellow text-connections-yellow-fg",
    age: "All ages",
  },
  {
    href: "/kids/match",
    emoji: "🃏",
    title: "Bible Match",
    description: "Flip cards to find matching pairs of Bible figures and animals. Ages 6–12.",
    badge: "Ages 6–12",
    badgeColor: "bg-connections-yellow text-connections-yellow-fg",
    age: "6–12",
  },
  {
    href: "/kids/fill-in",
    emoji: "✏️",
    title: "Bible Fill-In",
    description: "Pick the missing word from famous Bible stories. Eight fun questions!",
    badge: "New",
    badgeColor: "bg-connections-green text-connections-green-fg",
    age: "6–12",
  },
  {
    href: "/kids/miracle-match",
    emoji: "✨",
    title: "Name That Miracle",
    description: "Look at the picture clue and guess the miracle — coming soon.",
    badge: "Coming Soon",
    badgeColor: "bg-muted text-muted-foreground",
    age: "6–12",
    disabled: true,
  },
];

function GameCard({
  href,
  emoji,
  title,
  description,
  badge,
  badgeColor,
  disabled,
}: {
  href: string;
  emoji: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: string;
  disabled?: boolean;
}) {
  const inner = (
    <div
      className={`group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-cell transition-all duration-200
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:shadow-cell-hover hover:-translate-y-0.5 cursor-pointer"}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-4xl">{emoji}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}>
          {badge}
        </span>
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      {!disabled && (
        <div className="mt-4 flex items-center text-sm font-semibold text-primary">
          Play now <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </div>
      )}
    </div>
  );

  if (disabled) return <div>{inner}</div>;
  return <Link href={href} className="flex">{inner}</Link>;
}

export default function HomePage() {
  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Bible Games — Free Daily Bible Puzzles & Kids Games",
          description: siteConfig.meta.description,
          path: "/",
          breadcrumb: [{ name: "Home", path: "/" }],
          isGamePage: false,
        })}
      />
      <Navigation />

      {/* ── Hero ── */}
      <Section id="hero" tone="muted">
        <Container>
          <div className="py-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Free · No sign-up · New puzzles daily
            </p>
            <h1 className="font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              <span className="italic">Bible Games</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Daily puzzles and kids games rooted in Scripture. Play in your browser — no app needed.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Adult Games ── */}
      <Section id="games">
        <Container>
          <h2 className="mb-2 font-display text-3xl font-semibold tracking-tight text-foreground">
            Daily Puzzles
          </h2>
          <p className="mb-8 text-muted-foreground">For teens and adults. New puzzles every day.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ADULT_GAMES.map((g) => (
              <GameCard key={g.href} {...g} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Kids Games ── */}
      <Section id="kids-games" tone="muted">
        <Container>
          <div className="mb-8 flex items-center gap-4">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                Kids Games
              </h2>
              <p className="mt-1 text-muted-foreground">
                Designed for ages 6–12. Bright, simple, and scripture-based.
              </p>
            </div>
            <Link
              href="/kids"
              className="ml-auto shrink-0 text-sm font-semibold text-primary hover:underline"
            >
              See all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {KIDS_GAMES.map((g) => (
              <GameCard key={g.href} {...g} />
            ))}
          </div>
        </Container>
      </Section>

      <FAQSection />
      <Footer />
    </>
  );
}
