import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BibleHigherLower } from "@/components/game/BibleHigherLower";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { Container, Section } from "@/components/layout";
import { getRandomRound, getTodaySeed } from "@/lib/puzzles/higherLower";

export const metadata = buildMetadata({
  title: "Bible Higher or Lower — Put the Books in Order",
  description:
    "Drag and drop books of the Bible into canonical order. A fun daily challenge — can you order all 66 books?",
  path: "/higher-lower",
});

export default function HigherLowerPage() {
  const books = getRandomRound(6, getTodaySeed());

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Bible Higher or Lower — Books in Order",
          description: "Drag and drop books of the Bible into canonical order.",
          path: "/higher-lower",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Higher or Lower", path: "/higher-lower" },
          ],
          isGamePage: true,
        })}
      />
      <Navigation />

      <Section id="game" className="pt-6 pb-8">
        <Container>
          <div className="mb-6 text-center">
            <h1 className="font-display text-3xl font-semibold italic text-foreground sm:text-4xl">
              Bible Higher or Lower
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              6 books · drag to reorder · canonical Bible order
            </p>
          </div>
          <BibleHigherLower books={books} />
        </Container>
      </Section>

      {/* ── How to Play ── */}
      <Section tone="muted" id="how-to-play">
        <Container className="max-w-2xl">
          <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
            How to Play
          </h2>
          <ol className="space-y-2 text-muted-foreground">
            {[
              "You'll see 6 books of the Bible in a random order.",
              "Drag and drop them to arrange from first to last in canonical Bible order.",
              "Tap Check Order when you're happy with your arrangement.",
              "Green means correct position, red means out of order.",
              "Hit New Books for a fresh set of 6 to try again.",
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
