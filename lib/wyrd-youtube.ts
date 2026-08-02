import { readFile } from "node:fs/promises";

export type WyrdEpisode = {
  title: string;
  description: string;
  youtubeUrl: string;
  publishedAt?: string;
};

// Shown only when the YouTube API is unavailable (bad key, quota exhausted, outage).
//
// This is deliberately NOT a hardcoded episode list. It used to be, and it silently rotted:
// by August 2026 all eight hardcoded episodes had aged off the channel's recent uploads, so any
// API failure would have served visitors a roster that no longer reflected the show, with no
// visible sign anything was wrong. A single pointer to the channel cannot go stale.
export const fallbackEpisodes: WyrdEpisode[] = [
  {
    title: "Watch the latest episodes on YouTube",
    description:
      "Episodes are loading from YouTube right now. Head to the channel for every WYRD conversation.",
    youtubeUrl: "https://www.youtube.com/@WYRDshow/videos",
  },
];

type YouTubeListResponse<T> = {
  items?: T[];
  nextPageToken?: string;
};

type YouTubeChannel = {
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
};

type YouTubePlaylistItem = {
  contentDetails?: {
    videoId?: string;
  };
};

type YouTubeVideo = {
  id: string;
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    liveBroadcastContent?: string;
  };
  contentDetails?: {
    duration?: string;
  };
  liveStreamingDetails?: Record<string, unknown>;
  status?: {
    privacyStatus?: "private" | "public" | "unlisted";
  };
};

type YouTubeRequestOptions = {
  accessToken?: string;
  apiKey?: string;
};

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3";
const TOKEN_API = "https://oauth2.googleapis.com/token";
const DEFAULT_CHANNEL_HANDLE = "@WYRDshow";
const DEFAULT_LIMIT = 8;
const MAX_UPLOADS_TO_SCAN = 200;
const YOUTUBE_PAGE_SIZE = 50;
const SHORTS_DURATION_SECONDS = 180;
const DURATION_PATTERN = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;

const apiKey = process.env.YOUTUBE_API_KEY || process.env.YT_API_KEY;
const channelId = process.env.YOUTUBE_CHANNEL_ID || process.env.YT_CHANNEL_ID;
const channelHandle =
  process.env.YOUTUBE_CHANNEL_HANDLE ||
  process.env.YT_CHANNEL_HANDLE ||
  DEFAULT_CHANNEL_HANDLE;

function requestUrl(path: string, params: Record<string, string | number | undefined>) {
  const url = new URL(`${YOUTUBE_API}/${path}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  return url;
}

async function youtubeFetch<T>(
  path: string,
  params: Record<string, string | number | undefined>,
  options: YouTubeRequestOptions,
): Promise<T> {
  const url = requestUrl(path, {
    ...params,
    key: options.apiKey,
  });

  const response = await fetch(url, {
    cache: "no-store",
    headers: options.accessToken
      ? { Authorization: `Bearer ${options.accessToken}` }
      : undefined,
  });

  if (!response.ok) {
    throw new Error(`YouTube ${path} request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

async function readJsonFile<T>(filePath?: string): Promise<T | null> {
  if (!filePath) {
    return null;
  }

  try {
    const contents = await readFile(filePath, "utf8");
    return JSON.parse(contents) as T;
  } catch {
    return null;
  }
}

async function getOAuthAccessToken() {
  if (process.env.YOUTUBE_OAUTH_ACCESS_TOKEN) {
    return process.env.YOUTUBE_OAUTH_ACCESS_TOKEN;
  }

  const refreshToken =
    process.env.YOUTUBE_OAUTH_REFRESH_TOKEN ||
    process.env.YT_REFRESH_TOKEN ||
    (
      await readJsonFile<{ refresh_token?: string }>(
        process.env.YT_TOKEN_FILE || process.env.YOUTUBE_TOKEN_FILE,
      )
    )?.refresh_token;

  const clientSecretFile = await readJsonFile<{
    installed?: { client_id?: string; client_secret?: string };
    web?: { client_id?: string; client_secret?: string };
  }>(process.env.YT_CLIENT_SECRET || process.env.YOUTUBE_CLIENT_SECRET_FILE);

  const clientId =
    process.env.YOUTUBE_OAUTH_CLIENT_ID ||
    process.env.YT_CLIENT_ID ||
    clientSecretFile?.installed?.client_id ||
    clientSecretFile?.web?.client_id;

  const clientSecret =
    process.env.YOUTUBE_OAUTH_CLIENT_SECRET ||
    process.env.YT_CLIENT_SECRET_VALUE ||
    clientSecretFile?.installed?.client_secret ||
    clientSecretFile?.web?.client_secret;

  if (!refreshToken || !clientId || !clientSecret) {
    return undefined;
  }

  const response = await fetch(TOKEN_API, {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error(`YouTube OAuth refresh failed: ${response.status}`);
  }

  const token = (await response.json()) as { access_token?: string };
  return token.access_token;
}

async function getUploadsPlaylistId(options: YouTubeRequestOptions) {
  const channels = await youtubeFetch<YouTubeListResponse<YouTubeChannel>>(
    "channels",
    {
      part: "contentDetails",
      id: channelId,
      forHandle: channelId || !apiKey ? undefined : channelHandle,
      mine: !apiKey && !channelId ? "true" : undefined,
    },
    options,
  );

  return channels.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
}

function cleanDescription(description?: string) {
  const firstBlock = (description || "")
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .find(Boolean);

  if (!firstBlock) {
    return "Watch the latest WYRD episode.";
  }

  return firstBlock.length > 420 ? `${firstBlock.slice(0, 417).trim()}...` : firstBlock;
}

function parseDurationSeconds(duration?: string) {
  const match = DURATION_PATTERN.exec(duration || "");

  if (!match) {
    return undefined;
  }

  const [, hours, minutes, seconds] = match;
  return (
    Number(hours || 0) * 3600 +
    Number(minutes || 0) * 60 +
    Number(seconds || 0)
  );
}

function isLongFormVideo(video: YouTubeVideo) {
  const duration = parseDurationSeconds(video.contentDetails?.duration);
  const broadcastContent = video.snippet?.liveBroadcastContent;

  if (video.liveStreamingDetails || broadcastContent === "live" || broadcastContent === "upcoming") {
    return false;
  }

  return duration !== undefined && duration > SHORTS_DURATION_SECONDS;
}

function isPublicVideo(video: YouTubeVideo) {
  return video.status?.privacyStatus === "public";
}

async function listRecentUploadIds(
  uploadsPlaylistId: string,
  options: YouTubeRequestOptions,
) {
  const videoIds: string[] = [];
  let pageToken: string | undefined;

  while (videoIds.length < MAX_UPLOADS_TO_SCAN) {
    const playlist = await youtubeFetch<YouTubeListResponse<YouTubePlaylistItem>>(
      "playlistItems",
      {
        part: "contentDetails",
        playlistId: uploadsPlaylistId,
        maxResults: YOUTUBE_PAGE_SIZE,
        pageToken,
      },
      options,
    );

    videoIds.push(
      ...(playlist.items
        ?.map((item) => item.contentDetails?.videoId)
        .filter((id): id is string => Boolean(id)) || []),
    );

    pageToken = playlist.nextPageToken;

    if (!pageToken) {
      break;
    }
  }

  return Array.from(new Set(videoIds)).slice(0, MAX_UPLOADS_TO_SCAN);
}

async function getVideosByIds(videoIds: string[], options: YouTubeRequestOptions) {
  const videos: YouTubeVideo[] = [];

  for (let start = 0; start < videoIds.length; start += YOUTUBE_PAGE_SIZE) {
    const chunk = videoIds.slice(start, start + YOUTUBE_PAGE_SIZE);
    const response = await youtubeFetch<YouTubeListResponse<YouTubeVideo>>(
      "videos",
      {
        part: "snippet,contentDetails,liveStreamingDetails,status",
        id: chunk.join(","),
        maxResults: chunk.length,
      },
      options,
    );

    videos.push(...(response.items || []));
  }

  return videos;
}

async function getLatestEpisodesFromYouTube(limit: number) {
  const accessToken = apiKey ? undefined : await getOAuthAccessToken();

  if (!apiKey && !accessToken) {
    return [];
  }

  const options = { apiKey, accessToken };
  const uploadsPlaylistId = await getUploadsPlaylistId(options);

  if (!uploadsPlaylistId) {
    return [];
  }

  const videoIds = await listRecentUploadIds(uploadsPlaylistId, options);

  if (!videoIds?.length) {
    return [];
  }

  const videos = await getVideosByIds(videoIds, options);

  const byId = new Map(videos.map((video) => [video.id, video]));

  return videoIds
    .map((id) => byId.get(id))
    .filter((video): video is YouTubeVideo => Boolean(video?.snippet?.title))
    .filter(isPublicVideo)
    .filter(isLongFormVideo)
    .slice(0, limit)
    .map((video) => ({
      title: video.snippet?.title || "WYRD episode",
      description: cleanDescription(video.snippet?.description),
      youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
      publishedAt: video.snippet?.publishedAt,
    }));
}

export async function getLatestWyrdEpisodes(limit = DEFAULT_LIMIT) {
  try {
    const episodes = await getLatestEpisodesFromYouTube(limit);
    return episodes.length ? episodes : fallbackEpisodes.slice(0, limit);
  } catch (error) {
    console.warn(error);
    return fallbackEpisodes.slice(0, limit);
  }
}
