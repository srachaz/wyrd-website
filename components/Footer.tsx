export const Footer = () => {
  return (
    <footer className="mt-6">
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <a
          href="mailto:sarahrjzhang@gmail.com"
          className="flex items-center gap-2 hover:text-foreground transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          sarahrjzhang@gmail.com
        </a>
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
