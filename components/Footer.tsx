"use client";

import { useEffect, useState } from "react";

// The address is never written out in full, in the DOM or in this source.
// It is assembled from parts only at the moment the visitor clicks to copy,
// so neither an HTML scraper nor a headless browser reading the page finds it.
const EMAIL_PARTS = ["sarahrj", "zhang"];
const DOMAIN_PARTS = ["gmail", "com"];

export const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayed = `${EMAIL_PARTS.join("")} [at] ${DOMAIN_PARTS[0]} [dot] ${DOMAIN_PARTS[1]}`;

  const copy = async () => {
    const address = `${EMAIL_PARTS.join("")}@${DOMAIN_PARTS.join(".")}`;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${address}`;
    }
  };

  return (
    <footer className="mt-6">
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        {mounted ? (
          <button
            type="button"
            onClick={copy}
            title="Click to copy"
            className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {copied ? "copied" : displayed}
          </button>
        ) : (
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            email
          </span>
        )}
        <span>·</span>
        <a
          href="https://x.com/wyrdshow"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          DM on X
        </a>
        <span>·</span>
        <a
          href="https://sracha.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Read my overly personal <span className="underline">Substack</span>
        </a>
      </div>
    </footer>
  );
};
