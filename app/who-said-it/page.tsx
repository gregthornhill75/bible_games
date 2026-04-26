import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhoSaidIt } from "@/components/game/WhoSaidIt";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { Container, Section } from "@/components/layout";
import { getSessionQuotes } from "@/lib/puzzles/whoSaidIt";

export const metadata = buildMetadata({
  title: "Who Said It? — Bible Quote Game",
  description:
    "Match the Bible quote to the speaker. 10 rounds, one chance each. How well do you know your Scripture?",
  path: "/who-said-it",
});

export default function WhoSaidItPage() {
  const quotes = getSessionQuotes(10);

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Who Said It? — Bible Quote Game",
          description: "Match the Bible quote to the speaker. 10 rounds, one chance each.",
          path: "/who-said-it",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Who Said It?", path: "/who-said-it" },
          ],
          isGamePage: true,
        })}
      />
      <Navigation />

      <Section id="game" className="pt-6 pb-8">
        <Container>
          <div className="mb-6 text-center">
            <div className="mb-2 text-4xl">🗣️</div>
            <h1 className="font-display text-3xl font-semibold italic text-foreground sm:text-4xl">
              Who Said It?
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              10 Bible quotes · 5 choices · one chance each
            </p>
          </div>
          <WhoSaidIt quotes={quotes} />
        </Container>
      </Section>

      {/* How to Play */}
      <Section tone="muted" id="how-to-play">
        <Container className="max-w-2xl">
          <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
            How to Play
          </h2>
          <ol className="space-y-2 text-muted-foreground">
            {[
              "A famous Bible quote is shown on the screen.",
              "Five possible speakers are listed below.",
              "You have one chance — pick the right speaker.",
              "After each answer, the correct speaker and context are revealed.",
              "Complete all 10 rounds and see your final score.",
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
