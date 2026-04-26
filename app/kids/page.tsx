import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { Container, Section } from "@/components/layout";

export const metadata = buildMetadata({
  title: "Kids Bible Games — Ages 6–12",
  description:
    "Free Bible games designed for kids ages 6–12. Bible Match, Fill-In stories, and more. Bright, simple, and scripture-based.",
  path: "/kids",
});

const KIDS_GAMES = [
  {
    href: "/kids/match",
    emoji: "🃏",
    title: "Bible Match",
    description:
      "Flip cards to find matching pairs of Bible animals and figures. Great for ages 6 and up!",
    badge: "Play Now",
    available: true,
  },
  {
    href: "/kids/fill-in",
    emoji: "✏️",
    title: "Bible Fill-In",
    description: "Complete famous Bible stories with the missing word. Eight fun questions!",
    badge: "Play Now",
    available: true,
  },
  {
    href: "/emoji-decoder",
    emoji: "🔍",
    title: "Bible Emoji Decoder",
    description: "Three emojis, one Bible story. Easy to hard — can you decode them all?",
    badge: "Play Now",
    available: true,
  },
  {
    href: "/kids/miracle-match",
    emoji: "✨",
    title: "Name That Miracle",
    description: "Look at the picture clue and guess the miracle.",
    badge: "Coming Soon",
    available: false,
  },
  {
    href: "/kids/books-order",
    emoji: "📚",
    title: "Books in Order",
    description: "Put the books of the Bible in the right order. Learn OT and NT!",
    badge: "Coming Soon",
    available: false,
  },
];

export default function KidsPage() {
  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Kids Bible Games — Ages 6–12",
          description: "Free Bible games for kids ages 6–12.",
          path: "/kids",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Kids Games", path: "/kids" },
          ],
          isGamePage: false,
        })}
      />
      <Navigation />

      {/* ── Hero ── */}
      <Section tone="muted" id="hero">
        <Container>
          <div className="py-8 text-center">
            <div className="mb-3 text-5xl">🌟</div>
            <h1 className="font-display text-4xl font-semibold italic text-foreground sm:text-5xl">
              Kids Bible Games
            </h1>
            <p className="mx-auto mt-3 max-w-md text-lg text-muted-foreground">
              Fun Bible games designed for ages 6–12. Bright, simple, and rooted in Scripture.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Games grid ── */}
      <Section id="games">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {KIDS_GAMES.map((game) => (
              <div key={game.href}>
                {game.available ? (
                  <Link href={game.href} className="block group">
                    <div className="relative h-full rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-cell transition-all duration-200 hover:shadow-cell-hover hover:-translate-y-0.5">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-5xl">{game.emoji}</span>
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                          {game.badge}
                        </span>
                      </div>
                      <h2 className="font-display text-2xl font-semibold text-foreground">
                        {game.title}
                      </h2>
                      <p className="mt-2 text-muted-foreground">{game.description}</p>
                      <div className="mt-4 flex items-center text-sm font-bold text-primary">
                        Let&apos;s play!{" "}
                        <span className="ml-1 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="relative h-full rounded-2xl border-2 border-dashed border-border bg-card/50 p-6 opacity-60">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-5xl">{game.emoji}</span>
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                        {game.badge}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      {game.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">{game.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
