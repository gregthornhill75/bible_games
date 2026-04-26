import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';

/**
 * Tiny renderer for plain text that contains Markdown-style links.
 * Supports `[label](/path)` inline links only — no nested markdown.
 * Used by /daily and /puzzles landing pages to keep SEO copy as
 * plain strings in `lib/*` without pulling in a full markdown parser.
 *
 * Relative hrefs (starting with `/`) render as Next.js <Link>; anything
 * else renders as a plain <a> with rel="noopener noreferrer".
 */
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

export function ProseLinks({ text }: { text: string }): ReactNode {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  // Reset state for each call — RegExp is stateful with the /g flag.
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    const [full, label, href] = match;
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={`t-${key++}`}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    if (href.startsWith('/')) {
      nodes.push(
        <Link key={`l-${key++}`} href={href}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a key={`a-${key++}`} href={href} rel="noopener noreferrer">
          {label}
        </a>,
      );
    }
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={`t-${key++}`}>{text.slice(lastIndex)}</Fragment>);
  }
  return <>{nodes}</>;
}
