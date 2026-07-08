"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { verifiedUpcomingMovies } from "@/data/verifiedUpcomingMovies";
import { movieEvidence } from "@/data/movieEvidence";

type LiveMovie = {
  imdbId: string;
  title: string;
  year: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  actors: string;
  plot: string;
  posterUrl: string | null;
  imdbRating: string;
  imdbVotes: string;
  language: string;
  source: string;
  verifiedStatus?: "Upcoming" | "Released" | null;
  releaseSourceName?: string | null;
  releaseSourceUrl?: string | null;
};

type MovieApiResponse = {
  liveMovies: LiveMovie[];
};

type MovieMediaItem = {
  videoId: string;
  type: "Glimpse" | "Announcement" | "Trailer" | "Song";
  label: string;
  officialUrl: string;
  title: string;
  channelTitle: string;
  publishedAt: string | null;
  viewCount: string | null;
  thumbnailUrl: string;
};

type MovieMediaResponse = {
  movieId: string;
  source: string;
  live: boolean;
  warning?: string;
  media: MovieMediaItem[];
};

type IntelligenceMovie = {
  id: string;
  title: string;
  language: string;
  posterUrl: string | null;
  status: string;
  releaseText: string;
  genre: string;
  director: string;
  cast: string;
  description: string;
  sourceName: string;
  sourceUrl: string;
  sourceType: "Live record" | "Verified upcoming";
};

type ActivityItem = {
  id: string;
  message: string;
  createdAt: string;
};

type DemoPortfolio = {
  investmentCount: number;
  value: number;
};

const STORAGE_KEYS = {
  watchlist: "filmtrade-demo-watchlist",
  activity: "filmtrade-demo-activity",
  portfolio: "filmtrade-demo-portfolio",
};

function scoreFor(id: string, minimum: number, range: number) {
  const total = id
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);

  return minimum + (total % range);
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function formatDate(value: string | null) {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatViews(value: string | null) {
  if (!value) return "Views unavailable";

  const views = Number(value);

  if (!Number.isFinite(views)) return "Views unavailable";
  if (views >= 10_000_000) return `${(views / 10_000_000).toFixed(1)}Cr views`;
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K views`;

  return `${views.toLocaleString("en-IN")} views`;
}

function getStoredValue<T>(key: string, fallback: T): T {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function posterFallbackStyle() {
  return "bg-[radial-gradient(circle_at_top_right,#8ed8ff,transparent_34%),radial-gradient(circle_at_bottom_left,#f6d28d,transparent_28%),linear-gradient(145deg,#0f2742,#245e85)]";
}

function evidenceIcon(type: string) {
  if (type === "Announcement") return "A";
  if (type === "Poster") return "P";
  if (type === "Glimpse") return "G";
  if (type === "Trailer") return "T";
  if (type === "Song") return "S";
  return "N";
}

export default function MovieIntelligencePage() {
  const params = useParams<{ id: string }>();
  const movieId = decodeURIComponent(params.id);

  const [data, setData] = useState<MovieApiResponse | null>(null);
  const [mediaData, setMediaData] = useState<MovieMediaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [portfolio, setPortfolio] = useState<DemoPortfolio>({
    investmentCount: 0,
    value: 0,
  });

  useEffect(() => {
    setWatchlist(getStoredValue<string[]>(STORAGE_KEYS.watchlist, []));
    setPortfolio(
      getStoredValue<DemoPortfolio>(STORAGE_KEYS.portfolio, {
        investmentCount: 0,
        value: 0,
      }),
    );

    async function loadCatalogue() {
      try {
        const response = await fetch("/api/telugu-movies");

        if (!response.ok) {
          throw new Error("Catalogue unavailable");
        }

        setData(await response.json());
      } catch {
        setData({ liveMovies: [] });
      } finally {
        setLoading(false);
      }
    }

    loadCatalogue();
  }, []);

  useEffect(() => {
    async function loadMedia() {
      setMediaLoading(true);

      try {
        const response = await fetch(
          `/api/movie-media?movieId=${encodeURIComponent(movieId)}`,
        );

        if (!response.ok) {
          throw new Error("Media unavailable");
        }

        setMediaData(await response.json());
      } catch {
        setMediaData({
          movieId,
          source: "FilmTrade official media catalogue",
          live: false,
          warning: "Official media could not be loaded.",
          media: [],
        });
      } finally {
        setMediaLoading(false);
      }
    }

    loadMedia();
  }, [movieId]);

  const movie = useMemo<IntelligenceMovie | null>(() => {
    const liveMovie = (data?.liveMovies ?? []).find(
      (item) => item.imdbId === movieId,
    );

    const upcomingMovie = verifiedUpcomingMovies.find(
      (item) => item.id === movieId,
    );

    if (liveMovie) {
      return {
        id: liveMovie.imdbId,
        title: liveMovie.title,
        language: liveMovie.language,
        posterUrl: liveMovie.posterUrl,
        status: liveMovie.verifiedStatus || "Released",
        releaseText:
          liveMovie.released || liveMovie.year || "Release date unavailable",
        genre: liveMovie.genre || "Genre unavailable",
        director: liveMovie.director || "Director unavailable",
        cast: liveMovie.actors || "Cast unavailable",
        description: liveMovie.plot || "Movie description unavailable.",
        sourceName: liveMovie.releaseSourceName || liveMovie.source || "OMDb / IMDb",
        sourceUrl:
          liveMovie.releaseSourceUrl ||
          `https://www.imdb.com/title/${liveMovie.imdbId}/`,
        sourceType: "Live record",
      };
    }

    if (upcomingMovie) {
      return {
        id: upcomingMovie.id,
        title: upcomingMovie.title,
        language: upcomingMovie.language,
        posterUrl: upcomingMovie.posterUrl,
        status: upcomingMovie.status,
        releaseText: upcomingMovie.releaseNote,
        genre: upcomingMovie.panIndia
          ? "Pan-India project"
          : "Indian cinema project",
        director: upcomingMovie.director || "Director not publicly confirmed",
        cast: upcomingMovie.lead,
        description:
          "This project is listed in FilmTrade using publicly available announcement and catalogue information.",
        sourceName: upcomingMovie.sourceName,
        sourceUrl: upcomingMovie.sourceUrl,
        sourceType: "Verified upcoming",
      };
    }

    return null;
  }, [data, movieId]);

  const evidence = useMemo(() => {
    return [...(movieEvidence[movieId] || [])].sort(
      (first, second) =>
        new Date(second.publishedAt).getTime() -
        new Date(first.publishedAt).getTime(),
    );
  }, [movieId]);

  const scores = useMemo(() => {
    if (!movie) return null;

    return {
      filmPulse: scoreFor(movie.id, 76, 21),
      trust: scoreFor(`${movie.id}-trust`, 80, 17),
      audience: scoreFor(`${movie.id}-audience`, 72, 25),
      momentum: scoreFor(`${movie.id}-momentum`, 70, 28),
      interest: scoreFor(`${movie.id}-interest`, 68, 29),
      outlook: scoreFor(`${movie.id}-outlook`, 64, 25),
      risk: scoreFor(`${movie.id}-risk`, 0, 10) > 6 ? "Medium" : "Low",
    };
  }, [movie]);

  const buzz = useMemo(() => {
    const media = mediaData?.media || [];
    const totalViews = media.reduce(
      (total, item) => total + Number(item.viewCount || 0),
      0,
    );

    const latestDate = media
      .map((item) => item.publishedAt)
      .filter((item): item is string => Boolean(item))
      .sort(
        (first, second) =>
          new Date(second).getTime() - new Date(first).getTime(),
      )[0];

    const viewScore = Math.min(55, Math.round(Math.log10(totalViews + 1) * 8));
    const mediaScore = Math.min(25, media.length * 10);

    const recencyScore = latestDate
      ? Math.max(
          0,
          20 -
            Math.floor(
              (Date.now() - new Date(latestDate).getTime()) /
                (1000 * 60 * 60 * 24),
            ) /
              2,
        )
      : 0;

    const interestIndex = Math.min(
      100,
      Math.round(viewScore + mediaScore + recencyScore),
    );

    return {
      totalViews,
      latestDate,
      mediaCount: media.length,
      interestIndex,
      label:
        interestIndex >= 75
          ? "High attention"
          : interestIndex >= 50
            ? "Rising attention"
            : "Early attention",
    };
  }, [mediaData]);

  function addActivity(message: string) {
    const current = getStoredValue<ActivityItem[]>(STORAGE_KEYS.activity, []);

    const next = [
      {
        id: `${Date.now()}-${Math.random()}`,
        message,
        createdAt: "Just now",
      },
      ...current,
    ].slice(0, 6);

    window.localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(next));
  }

  function toggleWatchlist() {
    if (!movie) return;

    const exists = watchlist.includes(movie.title);

    const next = exists
      ? watchlist.filter((title) => title !== movie.title)
      : [...watchlist, movie.title];

    setWatchlist(next);
    window.localStorage.setItem(STORAGE_KEYS.watchlist, JSON.stringify(next));

    addActivity(
      exists
        ? `Removed ${movie.title} from your demo watchlist.`
        : `Added ${movie.title} to your demo watchlist.`,
    );
  }

  function investDemo() {
    if (!movie) return;

    const amount = 10000;

    const next = {
      investmentCount: portfolio.investmentCount + 1,
      value: portfolio.value + amount,
    };

    setPortfolio(next);
    window.localStorage.setItem(STORAGE_KEYS.portfolio, JSON.stringify(next));

    addActivity(
      `Added a ${formatCurrency(amount)} simulated investment for ${movie.title}.`,
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8fafc] px-5 py-8 sm:px-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-10 w-44 rounded-xl bg-slate-200" />
          <div className="h-[430px] rounded-3xl bg-slate-200" />
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="h-56 rounded-3xl bg-slate-200 lg:col-span-2" />
            <div className="h-56 rounded-3xl bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  if (!movie || !scores) {
    return (
      <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#087ba8]">
            Movie not found
          </p>
          <h1 className="mt-3 text-3xl font-black">
            This intelligence record is unavailable.
          </h1>
          <a
            href="/movies"
            className="mt-6 inline-flex rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-[#0f2742]"
          >
            Back to movies
          </a>
        </div>
      </main>
    );
  }

  const isWatching = watchlist.includes(movie.title);

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-28 text-[#0f172a] sm:px-8 sm:py-8">
      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-0 sm:pt-0">
        <a href="/movies" className="text-sm font-black text-[#087ba8]">
          ← Back to movies
        </a>

        <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[330px_minmax(0,1fr)]">
            <div
              className={`relative min-h-[390px] overflow-hidden ${
                movie.posterUrl ? "bg-[#0f2742]" : posterFallbackStyle()
              }`}
            >
              {movie.posterUrl && (
                <img
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(4,14,31,0.82)_100%)]" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/75">
                  {movie.sourceType}
                </p>
                <p className="mt-2 text-sm font-bold">{movie.language}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                    Movie command center
                  </p>
                  <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                    {movie.title}
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                    {movie.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#cbe8f7] bg-[#e9f1fa] px-5 py-4 text-center">
                  <p className="text-xs font-black uppercase tracking-[0.13em] text-[#087ba8]">
                    FilmPulse
                  </p>
                  <p className="mt-1 text-4xl font-black">{scores.filmPulse}</p>
                  <p className="mt-1 text-xs font-bold text-slate-500">
                    Demo intelligence
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Status", movie.status],
                  ["Release", movie.releaseText],
                  ["Trust", `${scores.trust} / 100 · demo`],
                  ["Risk", `${scores.risk} · demo`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#f8fafc] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-black leading-6">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    Director
                  </p>
                  <p className="mt-2 text-sm font-black">{movie.director}</p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    Cast / lead
                  </p>
                  <p className="mt-2 text-sm font-black">{movie.cast}</p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    Genre
                  </p>
                  <p className="mt-2 text-sm font-black">{movie.genre}</p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    Data source
                  </p>
                  <a
                    href={movie.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm font-black text-[#087ba8]"
                  >
                    {movie.sourceName} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <section className="rounded-3xl border border-[#cbe8f7] bg-[#e9f1fa] p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                    Buzz & interest
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    FilmTrade Audience Interest
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Built from official YouTube media reach, number of releases,
                    and media recency. This is a transparent FilmTrade demo model.
                  </p>
                </div>

                <div className="rounded-2xl bg-white px-5 py-4 text-center shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-[#087ba8]">
                    Interest index
                  </p>
                  <p className="mt-1 text-4xl font-black">{buzz.interestIndex}</p>
                  <p className="mt-1 text-xs font-black text-slate-500">
                    {buzz.label}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  ["Official media reach", formatViews(String(buzz.totalViews))],
                  [
                    "Official releases",
                    `${buzz.mediaCount} item${buzz.mediaCount === 1 ? "" : "s"}`,
                  ],
                  [
                    "Latest official signal",
                    buzz.latestDate ? formatDate(buzz.latestDate) : "Not announced",
                  ],
                  [
                    "Data status",
                    mediaData?.live ? "YouTube data live" : "Catalogue fallback",
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-black leading-6">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-[#00ABE4]"
                  style={{ width: `${buzz.interestIndex}%` }}
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                    Evidence timeline
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Official signals and verified sources
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Each item links to its original public source. This supports
                    discovery and research only.
                  </p>
                </div>

                <span className="rounded-full bg-[#e9f1fa] px-3 py-2 text-xs font-black text-[#087ba8]">
                  {evidence.length} item{evidence.length === 1 ? "" : "s"}
                </span>
              </div>

              {evidence.length === 0 ? (
                <div className="mt-6 rounded-2xl bg-[#f8fafc] p-6">
                  <p className="font-black">No evidence has been added yet.</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Official announcements, posters, media releases, and verified
                    articles will appear here when added to the FilmTrade registry.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {evidence.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00ABE4] text-xs font-black text-[#0f2742]">
                          {evidenceIcon(item.type)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="flex flex-wrap gap-2">
                                <span className="rounded-full bg-[#0f2742] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                                  {item.type}
                                </span>

                                <span
                                  className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
                                    item.verification === "Official"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : "bg-sky-100 text-sky-800"
                                  }`}
                                >
                                  {item.verification}
                                </span>
                              </div>

                              <p className="mt-3 text-base font-black">
                                {item.title}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {item.publisher} · {formatDate(item.publishedAt)}
                              </p>
                            </div>

                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="shrink-0 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-black text-[#087ba8]"
                            >
                              Open source ↗
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                    Official media
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Glimpses, trailers, announcements and songs
                  </h2>
                </div>

                <p className="text-xs font-black text-slate-500">
                  {mediaData?.live
                    ? "Live YouTube metadata"
                    : "Official media catalogue"}
                </p>
              </div>

              {mediaLoading && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[1, 2].map((item) => (
                    <div
                      key={item}
                      className="h-56 animate-pulse rounded-2xl bg-slate-200"
                    />
                  ))}
                </div>
              )}

              {!mediaLoading && (mediaData?.media.length ?? 0) === 0 && (
                <div className="mt-6 rounded-2xl bg-[#f8fafc] p-6">
                  <p className="font-black">No official media added yet.</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    This record will show official videos when they are added to
                    the FilmTrade media catalogue.
                  </p>
                </div>
              )}

              {!mediaLoading && (mediaData?.media.length ?? 0) > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {mediaData?.media.map((item) => (
                    <article
                      key={item.videoId}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                    >
                      <div className="relative aspect-video overflow-hidden bg-slate-900">
                        <img
                          src={item.thumbnailUrl}
                          alt={`${item.title} thumbnail`}
                          className="h-full w-full object-cover"
                        />

                        <span className="absolute left-3 top-3 rounded-full bg-[#0f2742]/90 px-3 py-1 text-xs font-black text-white">
                          {item.type}
                        </span>
                      </div>

                      <div className="p-4">
                        <p className="line-clamp-2 text-sm font-black leading-6">
                          {item.title}
                        </p>

                        <p className="mt-2 text-xs font-bold text-slate-500">
                          {item.channelTitle}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3 text-xs font-black">
                          <span className="text-[#087ba8]">
                            {formatViews(item.viewCount)}
                          </span>

                          <span className="text-slate-500">
                            {formatDate(item.publishedAt)}
                          </span>
                        </div>

                        <a
                          href={item.officialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 block rounded-xl bg-[#0f2742] px-4 py-3 text-center text-sm font-black text-white"
                        >
                          Watch on YouTube
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {mediaData?.warning && (
                <p className="mt-4 text-xs font-bold text-amber-700">
                  {mediaData.warning}
                </p>
              )}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                FilmPulse intelligence
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Audience interest", scores.audience, "Catalogue attention signal"],
                  ["Momentum", scores.momentum, "Recent project visibility"],
                  ["Market interest", scores.interest, "Demo demand indicator"],
                  ["Market outlook", scores.outlook, "Simulated confidence range"],
                ].map(([label, value, note]) => (
                  <div key={label} className="rounded-2xl bg-[#f8fafc] p-5">
                    <div className="flex items-end justify-between gap-3">
                      <p className="text-sm font-black">{label}</p>
                      <p className="text-2xl font-black text-[#087ba8]">{value}</p>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[#00ABE4]"
                        style={{ width: `${value}%` }}
                      />
                    </div>

                    <p className="mt-3 text-xs font-bold text-slate-500">
                      {note} · demo
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-3xl border border-[#cbe8f7] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Trust & verification
              </p>

              <h2 className="mt-3 text-2xl font-black">Source-led project view</h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="rounded-2xl bg-white p-4">
                  <p className="font-black">Record type</p>
                  <p className="mt-1 text-slate-600">{movie.sourceType}</p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="font-black">Trust score</p>
                  <p className="mt-1 text-slate-600">
                    {scores.trust} / 100 · simulated demo score
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="font-black">Evidence records</p>
                  <p className="mt-1 text-slate-600">
                    {evidence.length} official or verified public source
                    {evidence.length === 1 ? "" : "s"} linked.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="font-black">Financial boundary</p>
                  <p className="mt-1 text-slate-600">
                    No KYC, escrow, payments, ownership, or real investments are processed.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Your demo portfolio
              </p>

              <p className="mt-3 text-3xl font-black">
                {formatCurrency(portfolio.value)}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {portfolio.investmentCount} simulated investment
                {portfolio.investmentCount === 1 ? "" : "s"} in this browser.
              </p>
            </section>
          </aside>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:static sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <div className="mx-auto flex max-w-7xl gap-3 px-2 sm:px-0">
          <a
            href={mediaData?.media[0]?.officialUrl || movie.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-black text-slate-700 sm:flex-none"
          >
            Watch official media
          </a>

          <button
            type="button"
            onClick={toggleWatchlist}
            className="flex-1 rounded-xl bg-[#0f2742] px-4 py-3 text-sm font-black text-white sm:flex-none"
          >
            {isWatching ? "Watching" : "Add watchlist"}
          </button>

          <button
            type="button"
            onClick={investDemo}
            className="flex-1 rounded-xl bg-[#00ABE4] px-4 py-3 text-sm font-black text-[#0f2742] sm:flex-none"
          >
            Invest demo
          </button>
        </div>
      </div>
    </main>
  );
}