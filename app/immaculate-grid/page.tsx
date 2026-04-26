import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BibleImmaculateGrid } from "@/components/game/BibleImmaculateGrid";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { Container, Section } from "@/components/layout";
import { getGridByDate, getLatestGrid } from "@/lib/puzzles/immaculateGrid";
import { getTodayDateString } from "@/lib/puzzles/connections";

export const metadata = buildMetadata({
  title: "Bible Immaculate Grid — Daily Bible Knowledge Puzzle",
  description:
    "Fill a 3×3 grid by naming a biblical figure that fits both the row and column category. A new grid every day — how much do you know?",
  path: "/immaculate-grid",
});

export default function ImmaculateGridPage() {
  const today = getTodayDateString();
  const puzzle = getGridByDate(today) ?? getLatestGrid();

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Bible Immaculate Grid",
          description: "Fill the 3×3 grid by naming a biblical figure that fits both categories.",
          path: "/immaculate-grid",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Immaculate Grid", path: "/immaculate-grid" },
          ],
          isGamePage: true,
        })}
      />
      <Navigation />

      <Section id="game" className="pt-6 pb-8">
        <Container>
          <div className="mb-6 text-center">
            <div className="mb-2 text-4xl">⚔️</div>
            <h1 className="font-display text-3xl font-semibold italic text-foreground sm:text-4xl">
              Bible Immaculate Grid
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Puzzle #{puzzle.id} &nbsp;·&nbsp;{" "}
              {new Date(puzzle.date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Name a biblical figure that fits <strong>both</strong> the row and column. 9 guesses total.
            </p>
          </div>
          <BibleImmaculateGrid puzzle={puzzle} />
        </Container>
      </Section>

      {/* How to Play */}
      <Section tone="muted" id="how-to-play">
        <Container className="max-w-2xl">
          <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
            How to Play
          </h2>
          <ol className="space-y-3 text-muted-foreground">
            {[
              "You see a 3×3 grid with 3 row categories and 3 column categories.",
              "Click any empty cell to enter a biblical figure who fits BOTH that row and that column.",
              "Type the name and select from the suggestion list, or press Enter.",
              "Correct answers turn green and show a fun fact about that figure.",
              "Wrong answers use up one of your 9 guesses. Use them wisely!",
              "Each biblical figure can only be used once across the whole grid.",
              "A new grid is published every day. Come back and build your streak!",
            ].map((rule, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 font-bold text-primary">{i + 1}.</span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Footer />
    </>
  );
}
