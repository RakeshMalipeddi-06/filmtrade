import { NextRequest, NextResponse } from "next/server";
import { movieMedia } from "@/data/movieMedia";

type YouTubeVideo = {
  id: string;
  snippet?: {
    title?: string;
    channelTitle?: string;
    publishedAt?: string;
    thumbnails?: {
      high?: { url?: string };
      medium?: { url?: string };
      default?: { url?: string };
    };
  };
  statistics?: {
    viewCount?: string;
  };
};

export async function GET(request: NextRequest) {
  const movieId = request.nextUrl.searchParams.get("movieId");

  if (!movieId) {
    return NextResponse.json(
      { error: "movieId is required." },
      { status: 400 },
    );
  }

  const configuredMedia = movieMedia[movieId] ?? [];

  if (configuredMedia.length === 0) {
    return NextResponse.json({
      movieId,
      source: "FilmTrade official media catalogue",
      live: false,
      media: [],
    });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      movieId,
      source: "FilmTrade official media catalogue",
      live: false,
      warning: "YOUTUBE_API_KEY is missing.",
      media: configuredMedia.map((item) => ({
        ...item,
        title: item.label,
        channelTitle: "Official YouTube link",
        publishedAt: null,
        viewCount: null,
        thumbnailUrl: `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
      })),
    });
  }

  try {
    const videoIds = configuredMedia.map((item) => item.videoId).join(",");

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${apiKey}`,
      { next: { revalidate: 900 } },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          movieId,
          source: "FilmTrade official media catalogue",
          live: false,
          warning: `YouTube request failed with status ${response.status}.`,
          media: configuredMedia.map((item) => ({
            ...item,
            title: item.label,
            channelTitle: "Official YouTube link",
            publishedAt: null,
            viewCount: null,
            thumbnailUrl: `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
          })),
        },
        { status: 200 },
      );
    }

    const payload = (await response.json()) as { items?: YouTubeVideo[] };
    const videosById = new Map(
      (payload.items ?? []).map((video) => [video.id, video]),
    );

    const media = configuredMedia.map((item) => {
      const video = videosById.get(item.videoId);
      const thumbnails = video?.snippet?.thumbnails;

      return {
        ...item,
        title: video?.snippet?.title ?? item.label,
        channelTitle: video?.snippet?.channelTitle ?? "Official YouTube link",
        publishedAt: video?.snippet?.publishedAt ?? null,
        viewCount: video?.statistics?.viewCount ?? null,
        thumbnailUrl:
          thumbnails?.high?.url ??
          thumbnails?.medium?.url ??
          thumbnails?.default?.url ??
          `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
      };
    });

    return NextResponse.json({
      movieId,
      source: "YouTube Data API v3",
      live: true,
      media,
    });
  } catch {
    return NextResponse.json({
      movieId,
      source: "FilmTrade official media catalogue",
      live: false,
      warning: "Could not load live YouTube data.",
      media: configuredMedia.map((item) => ({
        ...item,
        title: item.label,
        channelTitle: "Official YouTube link",
        publishedAt: null,
        viewCount: null,
        thumbnailUrl: `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
      })),
    });
  }
}