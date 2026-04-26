import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BibleConnections } from "@/components/game/BibleConnections";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { Container, Section } from "@/components/layout";
import { FAQSection, KeySEOContent } from "@/components/SEOContent";
import { HowToPlay } from "@/components/HowToPlay";
import {
  getPuzzleByDate,
  getLatestPuzzle,
  getTodayDateString,
} from "@/lib/puzzles/connections";

export const metadata = buildMetadata({
  title: "Bible Connections — Daily Bible Word Puzzle",
  description:
    "Group 16 Bible words into 4 hidden categories. A new scripture-based connections puzzle every day. Free to play, no sign-up needed.",
  path: "/connections",
});

export default function ConnectionsPage() {
  const today = getTodayDateString();
  const puzzle = getPuzzleByDate(today) ?? getLatestPuzzle();

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Bible Connections — Daily Bible Word Puzzle",
          description:
            "Group 16 Bible words into 4 hidden categories. A new scripture-based puzzle every day.",
          path: "/connections",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Bible Connections", path: "/connections" },
          ],
          isGamePage: true,
        })}
      />
      <Navigation />

      {/* ── Game header — compact, above the fold ── */}
      <Section id="game" className="pt-6 pb-4">
        <Container>
          <div className="mb-5 text-center">
            <h1 className="font-display text-3xl font-semibold italic text-foreground sm:text-4xl">
              Bible Connections
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Puzzle #{puzzle.id} &nbsp;·&nbsp;{" "}
              {new Date(puzzle.date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Find four groups of four words that share a biblical connection.
            </p>
          </div>
          <BibleConnections puzzle={puzzle} />
        </Container>
      </Section>

      <HowToPlay />
      <KeySEOContent />
      <FAQSection />
      <Footer />
    </>
  );
}
