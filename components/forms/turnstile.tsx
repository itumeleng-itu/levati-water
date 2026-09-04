"use client";

import * as React from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

// Cloudflare Turnstile, not reCAPTCHA — CLAUDE.md. The token this produces
// is only half the check: the route handler verifies it server-side against
// Cloudflare's siteverify endpoint before doing anything else (spec §8).
function Turnstile({ siteKey, onVerify, onExpire }: TurnstileProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const widgetId = React.useRef<string | undefined>(undefined);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (!ready || !containerRef.current || !window.turnstile) return;
    const el = containerRef.current;
    widgetId.current = window.turnstile.render(el, {
      sitekey: siteKey,
      callback: onVerify,
      "expired-callback": onExpire,
    });
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
    };
    // onVerify/onExpire are expected to be stable (useCallback) at call sites.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, siteKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div ref={containerRef} />
    </>
  );
}

export { Turnstile };
