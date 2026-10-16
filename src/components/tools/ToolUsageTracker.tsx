'use client';
import { useRef, type ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Sends one `tool_use` event the first time a visitor interacts with a tool (typing, choosing or clicking).
 * Only the tool slug is sent — never the values typed into the tool.
 */
export default function ToolUsageTracker({ slug, children }: { slug: string; children: ReactNode }) {
  const sent = useRef(false);
  const once = () => {
    if (sent.current) return;
    sent.current = true;
    trackEvent('tool_use', { tool: slug });
  };
  return (
    <div onChangeCapture={once} onClickCapture={once}>
      {children}
    </div>
  );
}
