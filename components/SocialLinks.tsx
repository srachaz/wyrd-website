export const SocialLinks = () => {
  return (
    <div className="text-base">
      <p className="mb-3 text-muted-foreground">Available on:</p>
      <div className="flex flex-wrap items-center gap-2">
        <a
          href="https://x.com/wyrdshow"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-foreground hover:opacity-70 transition-opacity"
        >
          X
        </a>
        <span className="text-muted-foreground">ฅ</span>
        <a
          href="https://www.youtube.com/@WYRDshow"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-foreground hover:opacity-70 transition-opacity"
        >
          Youtube
        </a>
        <span className="text-muted-foreground">ฅ</span>
        <a
          href="https://open.spotify.com/show/3R1CazIaPwa6Jp9SWvj7c9?si=e7fa3b2ee4da45b9"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-foreground hover:opacity-70 transition-opacity"
        >
          Spotify
        </a>
        <span className="text-muted-foreground">ฅ</span>
        <a
          href="https://podcasts.apple.com/us/podcast/wyrd/id1832753373"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-foreground hover:opacity-70 transition-opacity"
        >
          Apple Podcast
        </a>
        <span className="text-muted-foreground">ฅ</span>
        <a
          href="https://www.instagram.com/wyrdshow/"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b border-foreground hover:opacity-70 transition-opacity"
        >
          Instagram
        </a>
      </div>
    </div>
  );
};
