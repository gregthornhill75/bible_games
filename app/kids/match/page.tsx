import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { KidsBibleMatch } from "@/components/game/KidsBibleMatch";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { Container, Section } from "@/components/layout";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Bible Match — Kids Memory Card Game",
  description:
    "Flip cards to find matching pairs of Bible animals and figures. A fun memory game for kids ages 6–12. Free to play in your browser.",
  path: "/kids/match",
});

export default function KidsMatchPage() {
  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Bible Match — Kids Memory Card Game",
          description: "Flip cards to find matching pairs of Bible animals and figures.",
          path: "/kids/match",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Kids Games", path: "/kids" },
            { name: "Bible Match", path: "/kids/match" },
          ],
          isGamePage: true,
        })}
      />
      <Navigation />

      <Section id="game" className="pt-6 pb-8">
        <Container>
          {/* Breadcrumb */}
          <p className="mb-4 text-center text-xs text-muted-foreground">
            <Link href="/kids" className="hover:text-foreground transition-colors">
              ← Kids Games
            </Link>
          </p>

          <div className="mb-6 text-center">
            <div className="mb-2 text-4xl">🃏</div>
            <h1 className="font-display text-3xl font-semibold italic text-foreground sm:text-4xl">
              Bible Match
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Flip the cards and find the matching pairs!
            </p>
          </div>

          <KidsBibleMatch />
        </Container>
      </Section>

      {/* ── How to Play ── */}
      <Section tone="muted" id="how-to-play">
        <Container className="max-w-lg">
          <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">
            How to Play
          </h2>
          <ol className="space-y-2 text-muted-foreground">
            {[
              "All the cards start face down — you can't see what's on them.",
              "Tap a card to flip it over and see the Bible animal or figure.",
              "Tap a second card to try to find its matching pair.",
              "If they match, both cards stay face up. Nice work!",
              "If they don't match, both cards flip back — try to remember where they were!",
              "Keep going until all pairs are matched. Try to do it in fewer moves each time!",
            ].map((rule, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 text-xl">
                  {["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"][i]}
                </span>
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
