'use client';

import { useState } from 'react';
import { Check, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Minimal "copy share link" client component for /p/[seed].
 * Reads window.location at click-time (never at render-time) so the
 * surrounding page can stay a Server Component.
 */
export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers / non-HTTPS dev contexts.
        const el = document.createElement('textarea');
        el.value = url;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button type="button" onClick={handleClick} variant="outline">
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <LinkIcon className="mr-2 h-4 w-4" aria-hidden="true" />
          Copy share link
        </>
      )}
    </Button>
  );
}
