"use client";

import { useEffect, useMemo, useState } from "react";
import { verifiedUpcomingMovies } from "@/data/verifiedUpcomingMovies";
import { movieEvidence } from "@/data/movieEvidence";
import { manualMovieScores } from "@/data/movieScores";
import { movieStatusOverrides } from "@/data/movieStatus";

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
  viewCount: string | null;
};

type MovieMediaResponse = {
  media: MovieMediaItem[];
};

type CompareMovie = {
  id: string;
  title: string;
  language: string;
  status: string;
  director: string;
  cast: string;
  genre: string;
  posterUrl: string | null;
  sourceType: "Live record" | "Verified upcoming";
};

function scoreFor(id: string, minimum: number, range: number) {
  const total = id
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);

  return minimum + (total % range);
}

function formatViews(value: number) {
  if (value >= 10_000_000) return `${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString("en-IN");
}

function posterFallback() {
  return "bg-[radial-gradient(circle_at_top_right,#8ed8ff,transparent_34%),radial-gradient(circle_at_bottom_left,#f6d28d,transparent_28%),linear-gradient(145deg,#0f2742,#245e85)]";
}

export default function CompareMoviesPage() {
  const [data, setData] = useState<MovieApiResponse | null>(null);
  const [firstId, setFirstId] = useState("paradise");
  const [secondId, setSecondId] = useState("jailer-2");
  const [mediaByMovie, setMediaByMovie] = useState<
    Record<string, MovieMediaResponse>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch("/api/telugu-movies");
        if (!response.ok) throw new Error("Catalogue unavailable");
        setData(await response.json());
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const movies = useMemo<CompareMovie[]>(() => {
    const live = (data?.liveMovies ?? []).map((movie) => ({
      id: movie.imdbId,
      title: movie.title,
      language: movieStatusOverrides[movie.imdbId]?.languages ?? movie.language,
      status: movieStatusOverrides[movie.imdbId]?.status ?? movie.verifiedStatus ?? "Status not confirmed",
      director: movie.director || "Not available",
      cast: movie.actors || "Not available",
      genre: movie.genre || "Not available",
      posterUrl: movie.posterUrl,
      sourceType: "Live record" as const,
    }));

    const upcoming = verifiedUpcomingMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      language: movieStatusOverrides[movie.id]?.languages ?? movie.language,
      status: movieStatusOverrides[movie.id]?.status ?? movie.status,
      director: movie.director || "Not publicly confirmed",
      cast: movie.lead,
      genre: movie.panIndia ? "Pan-India project" : "Indian cinema project",
      posterUrl: movie.posterUrl,
      sourceType: "Verified upcoming" as const,
    }));

    const seen = new Set<string>();

    return [...upcoming, ...live].filter((movie) => {
      const key = movie.title.trim().toLowerCase();

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });
  }, [data]);

  const firstMovie = movies.find((movie) => movie.id === firstId) || null;
  const secondMovie = movies.find((movie) => movie.id === secondId) || null;

  useEffect(() => {
    async function loadMedia(movieId: string) {
      if (!movieId || mediaByMovie[movieId]) return;

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

    loadMedia(firstId);
    loadMedia(secondId);
  }, [firstId, secondId, mediaByMovie]);

  function getMetrics(movie: CompareMovie | null) {
    if (!movie) {
      return {
        filmPulse: 0,
        trust: 0,
        interest: 0,
        risk: "—",
        views: 0,
        mediaCount: 0,
        evidenceCount: 0,
      };
    }

    const media = mediaByMovie[movie.id]?.media ?? [];
    const views = media.reduce(
      (sum, item) => sum + Number(item.viewCount || 0),
      0,
    );
    const mediaCount = media.length;
    const evidenceCount = movieEvidence[movie.id]?.length ?? 0;

   const manualScore = manualMovieScores[movie.id];

const calculatedInterest = Math.min(
  100,
  Math.round(
    Math.min(55, Math.log10(views + 1) * 8) +
      Math.min(25, mediaCount * 10) +
      Math.min(20, evidenceCount * 5),
  ),
);

const interest = manualScore?.interest ?? calculatedInterest;

const calculatedFilmPulse = scoreFor(movie.id, 76, 21);

const filmPulse = manualScore?.filmPulse ?? calculatedFilmPulse;

return {
  filmPulse,
  trust: scoreFor(`${movie.id}-trust`, 80, 17),
  interest,
  risk: scoreFor(`${movie.id}-risk`, 0, 10) > 6 ? "Medium" : "Low",
  views,
  mediaCount,
  evidenceCount,
};
  }

  const firstMetrics = getMetrics(firstMovie);
  const secondMetrics = getMetrics(secondMovie);

  const rows = [
    ["FilmPulse score", `${firstMetrics.filmPulse} / 100`, `${secondMetrics.filmPulse} / 100`],
    ["Interest index", `${firstMetrics.interest} / 100`, `${secondMetrics.interest} / 100`],
    ["Official media reach", formatViews(firstMetrics.views), formatViews(secondMetrics.views)],
    ["Official media items", String(firstMetrics.mediaCount), String(secondMetrics.mediaCount)],
    ["Evidence sources", String(firstMetrics.evidenceCount), String(secondMetrics.evidenceCount)],
    ["Trust score", `${firstMetrics.trust} / 100`, `${secondMetrics.trust} / 100`],
    ["Demo risk level", firstMetrics.risk, secondMetrics.risk],
    ["Status", firstMovie?.status || "—", secondMovie?.status || "—"],
    ["Language", firstMovie?.language || "—", secondMovie?.language || "—"],
    ["Director", firstMovie?.director || "—", secondMovie?.director || "—"],
    ["Lead cast", firstMovie?.cast || "—", secondMovie?.cast || "—"],
    ["Genre / category", firstMovie?.genre || "—", secondMovie?.genre || "—"],
  ];

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
            FilmTrade research tool
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Compare movie intelligence
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            Compare publicly available movie signals, official media reach, and
            verified evidence. Scores are FilmTrade demo indicators, not financial advice.
          </p>
        </section>

        {loading ? (
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />
            <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />
          </div>
        ) : (
          <>
            <section className="mt-8 grid gap-5 lg:grid-cols-2">
              {[
                ["First movie", firstId, setFirstId, firstMovie],
                ["Second movie", secondId, setSecondId, secondMovie],
              ].map(([label, selectedId, setSelectedId, selectedMovie]) => {
                const movie = selectedMovie as CompareMovie | null;

                return (
                  <article
                    key={label as string}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="p-5">
                      <p className="text-xs font-black uppercase tracking-[0.15em] text-[#087ba8]">
                        {label as string}
                      </p>

                      <select
                        value={selectedId as string}
                        onChange={(event) =>
                          (setSelectedId as (value: string) => void)(
                            event.target.value,
                          )
                        }
                        className="mt-3 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-black outline-none focus:border-[#00ABE4]"
                      >
                        {movies.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {movie && (
                      <div className="grid grid-cols-[120px_minmax(0,1fr)] border-t border-slate-100">
                        <div
                          className={`relative min-h-[170px] overflow-hidden ${
                            movie.posterUrl ? "bg-[#0f2742]" : posterFallback()
                          }`}
                        >
                          {movie.posterUrl && (
                            <img
                              src={movie.posterUrl}
                              alt={`${movie.title} poster`}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          )}
                        </div>

                        <div className="p-5">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                            {movie.sourceType}
                          </p>

                          <h2 className="mt-2 text-2xl font-black">{movie.title}</h2>

                          <p className="mt-2 text-sm font-bold text-[#087ba8]">
                            {movie.status}
                          </p>

                          <a
                            href={`/movies/${movie.id}`}
                            className="mt-5 inline-block text-sm font-black text-[#087ba8]"
                          >
                            Open intelligence →
                          </a>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </section>

            <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-6 py-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                  Side-by-side analysis
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {firstMovie?.title || "First movie"} vs {secondMovie?.title || "Second movie"}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead className="bg-[#f8fafc]">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                        Metric
                      </th>
                      <th className="px-6 py-4 text-sm font-black">
                        {firstMovie?.title || "First movie"}
                      </th>
                      <th className="px-6 py-4 text-sm font-black">
                        {secondMovie?.title || "Second movie"}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map(([label, firstValue, secondValue]) => (
                      <tr key={label} className="border-t border-slate-100">
                        <td className="px-6 py-4 text-sm font-bold text-slate-500">
                          {label}
                        </td>
                        <td className="px-6 py-4 text-sm font-black">{firstValue}</td>
                        <td className="px-6 py-4 text-sm font-black">{secondValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                Research boundary
              </p>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-amber-800">
                This comparison uses public movie information and FilmTrade demo
                scoring. It does not recommend investing in a film and does not
                process payments, ownership, returns, or financial transactions.
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}