import { siteConfig } from '@/lib/siteConfig';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Container, Hero, Section } from '@/components/layout';

export function PageHeading() {
  return (
    <Hero
      eyebrow="Daily"
      title={siteConfig.content.hero.title}
      subtitle={siteConfig.content.hero.description}
      primaryCta={{ label: 'Play', href: '#game' }}
      secondaryCta={{ label: 'How to play', href: '#how-to-play' }}
    />
  );
}

export function KeySEOContent() {
  return (
    <Section id="about-game">
      <Container>
        <h2 className="mb-8 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          <span className="italic">{siteConfig.content.seoContent.title}</span>
        </h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="border-border bg-card p-8">
            <div className="space-y-6">
              {siteConfig.content.seoContent.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed text-foreground/85">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </Card>

          <Card className="border-border bg-card p-8">
            <h3 className="mb-6 text-xl font-semibold text-foreground">Features</h3>
            <ul className="space-y-3">
              {siteConfig.game.features.map((feature, index) => (
                <li key={index} className="text-foreground/85">
                  {feature}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export function FAQSection() {
  return (
    <Section tone="muted" id="faq">
      <Container className="max-w-3xl">
        <h2 className="mb-8 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          <span className="italic">{siteConfig.faq.title}</span>
        </h2>

        <Card className="border-border bg-card p-2 sm:p-6">
          <Accordion
            type="single"
            collapsible
            defaultValue="faq-0"
            className="w-full"
          >
            {siteConfig.faq.items.map((item, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="px-2 sm:px-4"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </Container>
    </Section>
  );
}
