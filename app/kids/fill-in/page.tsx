import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BibleFillIn } from "@/components/game/BibleFillIn";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { Container, Section } from "@/components/layout";
import { getFillinRound } from "@/lib/puzzles/bibleFillin";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Bible Fill-In — Kids Bible Story Game",
  description:
    "Complete the Bible sentence with the missing word! A fun fill-in-the-blank game for kids ages 6–12. Free to play in your browser.",
  path: "/kids/fill-in",
});

export default function KidsFillInPage() {
  const questions = getFillinRound(8);

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Bible Fill-In — Kids Bible Story Game",
          description: "Fill in the missing word from famous Bible stories.",
          path: "/kids/fill-in",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Kids Games", path: "/kids" },
            { name: "Bible Fill-In", path: "/kids/fill-in" },
          ],
          isGamePage: true,
        })}
      />
      <Navigation />

      <Section id="game" className="pt-6 pb-8">
        <Container>
          <p className="mb-4 text-center text-xs text-muted-foreground">
            <Link href="/kids" className="hover:text-foreground transition-colors">
              ← Kids Games
            </Link>
          </p>

          <div className="mb-6 text-center">
            <div className="mb-2 text-4xl">✏️</div>
            <h1 className="font-display text-3xl font-semibold italic text-foreground sm:text-4xl">
              Bible Fill-In
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick the missing word from the Bible story!
            </p>
          </div>

          <BibleFillIn questions={questions} />
        </Container>
      </Section>

      <Footer />
    </>
  );
}
