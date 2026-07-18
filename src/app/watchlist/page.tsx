"use client";

import { useEffect, useMemo, useState } from "react";
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
};

type MovieApiResponse = {
  liveMovies: LiveMovie[];
};

type MovieMediaItem = {
  videoId: string;
  type: "Glimpse" | "Announcement" | "Trailer" | "Song";
  title: string;
  publishedAt: string | null;
  viewCount: string | null;
  thumbnailUrl: string;
  officialUrl: string;
};

type MovieMediaResponse = {
  media: MovieMediaItem[];
};

type WatchlistMovie = {
  id: string;
  title: string;
  language: string;
  status: string;
  posterUrl: string | null;
  director: string;
  sourceType: "Live record" | "Verified upcoming";
};

const WATCHLIST_KEY = "filmtrade-demo-watchlist";


function formatViews(value: number) {
  if (value === 0) return "No official views yet";
  if (value >= 10_000_000) return `${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString("en-IN");
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

function getStoredWatchlist() {
  try {
    return JSON.parse(
      window.localStorage.getItem(WATCHLIST_KEY) || "[]",
    ) as string[];
  } catch {
    return [];
  }
}

export default function WatchlistPage() {
  const [data, setData] = useState<MovieApiResponse | null>(null);
  const [savedTitles, setSavedTitles] = useState<string[]>([]);
  const [mediaByMovie, setMediaByMovie] = useState<
    Record<string, MovieMediaResponse>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSavedTitles(getStoredWatchlist());

    async function loadCatalogue() {
      try {
        const response = await fetch("/api/telugu-movies");

        if (!response.ok) {
          throw new Error("Catalogue unavailable");
        }

        setData(await response.json());
      } finally {
        setLoading(false);
      }
    }

    loadCatalogue();
  }, []);

  const savedMovies = useMemo<WatchlistMovie[]>(() => {
    const upcoming = verifiedUpcomingMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      language: movie.language,
      status: movie.status,
      posterUrl: movie.posterUrl,
      director: movie.director || "Not publicly confirmed",
      sourceType: "Verified upcoming" as const,
    }));

    const live = (data?.liveMovies ?? []).map((movie) => ({
      id: movie.imdbId,
      title: movie.title,
      language: movie.language,
      status: movie.verifiedStatus || "Released",
      posterUrl: movie.posterUrl,
      director: movie.director || "Not available",
      sourceType: "Live record" as const,
    }));

    return [...upcoming, ...live].filter((movie) =>
      savedTitles.includes(movie.title),
    );
  }, [data, savedTitles]);

  useEffect(() => {
    async function loadMedia(movieId: string) {
      if (mediaByMovie[movieId]) return;

      try {
        const response = await fetch(
          `/api/movie-media?movieId=${encodeURIComponent(movieId)}`,
        );

        if (!response.ok) return;

        const result = (await response.json()) as MovieMediaResponse;

        setMediaByMovie((current) => ({
          ...current,
          [movieId]: result,
        }));
      } catch {
        setMediaByMovie((current) => ({
          ...current,
          [movieId]: { media: [] },
        }));
      }
    }

    savedMovies.forEach((movie) => {
      loadMedia(movie.id);
    });
  }, [savedMovies, mediaByMovie]);

  function removeMovie(title: string) {
    const next = savedTitles.filter((item) => item !== title);

    setSavedTitles(next);
    window.localStorage.setItem(WATCHLIST_KEY, JSON.stringify(next));
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/movies" className="text-sm font-black text-[#087ba8]">
            ← Back to movies
          </a>

          <a href="/" className="text-xl font-black tracking-tight">
            FILM<span className="text-[#00ABE4]">TRADE</span>
          </a>
        </div>

        <section className="mt-7 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
            Your research shortlist
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            FilmTrade Watchlist
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Saved movies, their official media signals, and evidence coverage in
            one place. This is stored only in this browser for the demo.
          </p>
        </section>

        {loading && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {!loading && savedMovies.length === 0 && (
          <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-2xl font-black">Your watchlist is empty.</p>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600">
              Open any movie intelligence page and use “Add watchlist” to save
              it here.
            </p>

            <a
              href="/movies"
              className="mt-6 inline-flex rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-[#0f2742]"
            >
              Explore movies
            </a>
          </section>
        )}

        {!loading && savedMovies.length > 0 && (
          <>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                  Saved intelligence
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  {savedMovies.length} saved movie
                  {savedMovies.length === 1 ? "" : "s"}
                </h2>
              </div>

              <a
                href="/compare"
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
              >
                Compare movies →
              </a>
            </div>

            <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {savedMovies.map((movie) => {
                const media = mediaByMovie[movie.id]?.media ?? [];
                const totalViews = media.reduce(
                  (sum, item) => sum + Number(item.viewCount || 0),
                  0,
                );

                const latestMedia = [...media]
                  .filter((item) => item.publishedAt)
                  .sort(
                    (first, second) =>
                      new Date(second.publishedAt || "").getTime() -
                      new Date(first.publishedAt || "").getTime(),
                  )[0];

                const evidenceCount = movieEvidence[movie.id]?.length ?? 0;
                const interestIndex = Math.min(
                  100,
                  Math.round(
                    Math.min(55, Math.log10(totalViews + 1) * 8) +
                      Math.min(25, media.length * 10) +
                      Math.min(20, evidenceCount * 5),
                  ),
                );

                return (
                  <article
  key={movie.id}
  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
>
  <a href={`/movies/${movie.id}`} className="block">
    <div className="relative h-64 overflow-hidden bg-[#0f2742]">
      {movie.posterUrl ? (
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full items-end bg-[radial-gradient(circle_at_top_right,#8ed8ff,transparent_34%),linear-gradient(145deg,#0f2742,#245e85)] p-6 text-white">
          <p className="text-3xl font-black">{movie.title}</p>
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(4,14,31,0.82)_100%)]" />

      <div className="absolute bottom-5 left-5 right-5 text-white">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-white/70">
          {movie.sourceType}
        </p>

        <p className="mt-2 text-2xl font-black">{movie.title}</p>
      </div>
    </div>

    <div className="p-6">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#e9f1fa] p-4">
          <p className="text-xs font-black uppercase tracking-[0.1em] text-[#087ba8]">
            Interest
          </p>
          <p className="mt-2 text-2xl font-black">{interestIndex}</p>
        </div>

        <div className="rounded-2xl bg-[#f8fafc] p-4">
          <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">
            Evidence
          </p>
          <p className="mt-2 text-2xl font-black">{evidenceCount}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">
          Official media reach
        </p>

        <p className="mt-2 text-lg font-black">{formatViews(totalViews)}</p>

        <p className="mt-2 text-xs font-bold text-slate-500">
          {latestMedia
            ? `Latest: ${latestMedia.type} · ${formatDate(latestMedia.publishedAt)}`
            : "No official media added yet"}
        </p>
      </div>

      <p className="mt-5 text-sm font-black text-[#087ba8]">
        Open intelligence →
      </p>
    </div>
  </a>

  <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
    <span className="text-xs font-bold text-slate-500">{movie.status}</span>

    <button
      type="button"
      onClick={() => removeMovie(movie.title)}
      className="text-xs font-black text-red-600"
    >
      Remove
    </button>
  </div>
</article>
                );
              })}
            </section>
          </>
        )}

        <section className="mt-12 rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            Demo boundary
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-7 text-amber-800">
            Watchlist data is stored locally in this browser. It supports movie
            discovery and research only. It does not represent investments,
            ownership, returns, or financial advice.
          </p>
        </section>
      </div>
    </main>
  );
}