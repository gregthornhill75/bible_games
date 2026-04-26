import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PageHeading, KeySEOContent, FAQSection } from "@/components/SEOContent";
import { HowToPlay } from "@/components/HowToPlay";
import { RelatedGames } from "@/components/RelatedGames";
import { BibleConnections } from "@/components/game/BibleConnections";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { siteConfig } from "@/lib/siteConfig";
import { Container, Section } from "@/components/layout";
import {
  getPuzzleByDate,
  getLatestPuzzle,
  getTodayDateString,
} from "@/lib/puzzles/connections";

export const metadata = buildMetadata({
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  path: "/",
});

export default function HomePage() {
  const today = getTodayDateString();
  const puzzle = getPuzzleByDate(today) ?? getLatestPuzzle();

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: siteConfig.meta.title,
          description: siteConfig.meta.description,
          path: "/",
          breadcrumb: [{ name: "Home", path: "/" }],
          isGamePage: true,
        })}
      />
      <Navigation />
      <PageHeading />

      {/* ── Daily puzzle header ── */}
      <Section id="game">
        <Container>
          <div className="mb-4 text-center">
            <p className="text-sm text-muted-foreground">
              Puzzle #{puzzle.id} &nbsp;·&nbsp;{" "}
              {new Date(puzzle.date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Select four words that share a hidden biblical connection, then tap{" "}
              <strong>Submit</strong>.
            </p>
          </div>
          <BibleConnections puzzle={puzzle} />
        </Container>
      </Section>

      <HowToPlay />
      <KeySEOContent />
      <Section tone="muted">
        <Container>
          <RelatedGames />
        </Container>
      </Section>
      <FAQSection />
      <Footer />
    </>
  );
}
