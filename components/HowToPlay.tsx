import { siteConfig } from '@/lib/siteConfig';
import { Container, Section } from '@/components/layout';
import { Card } from '@/components/ui/card';

export function HowToPlay() {
  return (
    <Section tone="muted" id="how-to-play">
      <Container>
        <h2 className="mb-8 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
          <span className="italic">{siteConfig.content.gameRules.title}</span>
        </h2>

        <Card className="max-w-2xl border-border bg-card p-6">
          <ol className="space-y-4">
            {siteConfig.content.gameRules.rules.map((rule, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 text-sm font-semibold text-muted-foreground">
                  {index + 1}.
                </span>
                <p className="leading-relaxed text-foreground/85">{rule}</p>
              </li>
            ))}
          </ol>
        </Card>
      </Container>
    </Section>
  );
}
