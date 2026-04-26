import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

const sectionStyles = cva('py-12 md:py-16', {
  variants: {
    tone: {
      default: 'bg-background text-foreground',
      muted: 'bg-surface-muted text-foreground',
      accent: 'bg-primary text-primary-foreground',
      card: 'bg-card text-card-foreground',
    },
  },
  defaultVariants: { tone: 'default' },
});

type Props = HTMLAttributes<HTMLElement> & VariantProps<typeof sectionStyles>;

export const Section = forwardRef<HTMLElement, Props>(
  ({ className, tone, ...props }, ref) => (
    <section ref={ref} className={cn(sectionStyles({ tone }), className)} {...props} />
  )
);
Section.displayName = 'Section';
