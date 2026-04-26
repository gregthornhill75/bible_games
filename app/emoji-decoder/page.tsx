import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EmojiDecoder } from "@/components/game/EmojiDecoder";
import { StructuredData } from "@/components/seo";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { buildPageGraph } from "@/lib/seo/buildGraph";
import { Container, Section } from "@/components/layout";
import { getEmojiRound } from "@/lib/puzzles/emojiDecoder";

export const metadata = buildMetadata({
  title: "Bible Emoji Decoder — Guess the Bible Story",
  description:
    "Can you decode the Bible story from the emojis? 10 rounds of emoji puzzles covering famous stories from Genesis to Revelation. Free to play!",
  path: "/emoji-decoder",
});

export default function EmojiDecoderPage() {
  const puzzles = getEmojiRound(10);

  return (
    <>
      <StructuredData
        data={buildPageGraph({
          title: "Bible Emoji Decoder",
          description: "Decode the Bible story from the emoji clues.",
          path: "/emoji-decoder",
          breadcrumb: [
            { name: "Home", path: "/" },
            { name: "Emoji Decoder", path: "/emoji-decoder" },
          ],
          isGamePage: true,
        })}
      />
      <Navigation />

      <Section id="game" className="pt-6 pb-8">
        <Container>
          <div className="mb-6 text-center">
            <div className="mb-2 text-4xl">🔍</div>
            <h1 className="font-display text-3xl font-semibold italic text-foreground sm:text-4xl">
              Bible Emoji Decoder
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              3 emojis · 4 choices · guess the Bible story
            </p>
          </div>
          <EmojiDecoder puzzles={puzzles} />
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
              "Three emojis appear on the screen — they represent a famous Bible story.",
              "Read the four answer choices and pick the one you think the emojis are describing.",
              "You get one chance per question — choose carefully!",
              "After each answer, a fun fact about that story is revealed.",
              "See how many you can get right out of 10. Share your score when you finish!",
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
