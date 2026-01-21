"use client";

import { useEffect } from "react";

interface EpisodeCardProps {
  title: string;
  description: string;
  youtubeUrl?: string;
  tweetUrl?: string;
  guest?: string;
}

const getYouTubeEmbedUrl = (url: string) => {
  const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
  return `https://www.youtube.com/embed/${videoId}`;
};

const getTweetId = (url: string) => {
  return url.split("/status/")[1]?.split("?")[0];
};

export const EpisodeCard = ({
  title,
  description,
  youtubeUrl,
  tweetUrl,
  guest,
}: EpisodeCardProps) => {
  useEffect(() => {
    // Load Twitter widgets after component mounts
    const loadTwitterWidget = () => {
      if ((window as any).twttr?.widgets) {
        (window as any).twttr.widgets.load();
      }
    };

    if (tweetUrl) {
      // Try loading immediately
      loadTwitterWidget();

      // Also try after a short delay if script is still loading
      const timer = setTimeout(loadTwitterWidget, 1000);
      return () => clearTimeout(timer);
    }
  }, [tweetUrl]);

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        {guest && (
          <p className="text-sm text-muted-foreground mt-1">Guest: {guest}</p>
        )}
      </div>

      {youtubeUrl && (
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={getYouTubeEmbedUrl(youtubeUrl)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {tweetUrl && (
        <div className="w-full">
          <iframe
            src={`https://platform.twitter.com/embed/Tweet.html?id=${getTweetId(tweetUrl)}`}
            className="w-full border-0"
            style={{ height: "700px" }}
            title={title}
          />
        </div>
      )}
    </div>
  );
};
