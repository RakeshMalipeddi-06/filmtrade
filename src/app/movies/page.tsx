"use client";

import { useEffect, useMemo, useState } from "react";

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
  source: "OMDb / IMDb";
  verifiedStatus: "Upcoming" | "Released" | null;
  releaseSourceName: string | null;
  releaseSourceUrl: string | null;
};

type UpcomingMovie = {
  id: string;
  title: string;
  language: "Telugu" | "Hindi" | "Tamil" | "Malayalam" | "Kannada";
  status: "Officially announced" | "In development" | "In production";
  lead: string;
  director: string | null;
  releaseNote: string;
  posterUrl: string | null;
  posterSourceUrl: string | null;
  trailerUrl: null;
  sourceName: string;
  sourceUrl: string;
  lastVerified: string;
  panIndia: boolean;
};

type MovieApiResponse = {
  source: string;
  catalogType: string;
  fetchedAt: string;
  liveMovies: LiveMovie[];
  verifiedUpcomingMovies: UpcomingMovie[];
  error?: string;
};

type Filter =
  | "all"
  | "upcoming"
  | "released"
  | "telugu"
  | "hindi"
  | "tamil"
  | "malayalam"
  | "kannada"
  | "pan-india";

const filters: Array<{ value: Filter; label: string }> = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "released", label: "Released" },
  { value: "telugu", label: "Telugu" },
  { value: "hindi", label: "Hindi" },
  { value: "tamil", label: "Tamil" },
  { value: "malayalam", label: "Malayalam" },
  { value: "kannada", label: "Kannada" },
  { value: "pan-india", label: "Pan-India" },
];

function isUpcomingLiveMovie(movie: LiveMovie) {
  if (movie.verifiedStatus) {
    return movie.verifiedStatus === "Upcoming";
  }

  const date = new Date(movie.released);

  if (Number.isNaN(date.getTime())) {
    return movie.imdbRating === "N/A";
  }

  return date.getTime() > Date.now();
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value === "N/A" ? "Release date not confirmed" : value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function hasLanguage(value: string, language: string) {
  return value
    .toLowerCase()
    .split(",")
    .map((item) => item.trim())
    .includes(language);
}

function languageLabel(movie: LiveMovie) {
  const knownLanguages = ["Telugu", "Hindi", "Tamil", "Malayalam", "Kannada"];

  const match = knownLanguages.find((language) =>
    hasLanguage(movie.language, language.toLowerCase()),
  );

  return match || movie.language.split(",")[0]?.trim() || "Indian cinema";
}

export default function MoviesPage() {
  const [data, setData] = useState<MovieApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch("/api/telugu-movies");

        if (!response.ok) {
          const failed = await response.json();
          throw new Error(failed.error || "Unable to load the movie catalogue.");
        }

        setData(await response.json());
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load the movie catalogue.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const liveMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return (data?.liveMovies || [])
      .filter((movie) => movie.title.trim().toLowerCase() !== "the paradise")
      .filter((movie) => {
        const upcoming = isUpcomingLiveMovie(movie);

        const matchesSearch =
          !normalizedQuery ||
          movie.title.toLowerCase().includes(normalizedQuery) ||
          movie.actors.toLowerCase().includes(normalizedQuery) ||
          movie.director.toLowerCase().includes(normalizedQuery);

        if (!matchesSearch) return false;
        if (filter === "all") return true;
        if (filter === "upcoming") return upcoming;
        if (filter === "released") return !upcoming;
        if (filter === "pan-india") return movie.language.split(",").length > 1;

        return hasLanguage(movie.language, filter);
      });
  }, [data, filter, query]);

  const upcomingMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return (data?.verifiedUpcomingMovies || []).filter((movie) => {
      const matchesSearch =
        !normalizedQuery ||
        movie.title.toLowerCase().includes(normalizedQuery) ||
        movie.lead.toLowerCase().includes(normalizedQuery) ||
        (movie.director || "").toLowerCase().includes(normalizedQuery);

      if (!matchesSearch) return false;
      if (filter === "released") return false;
      if (filter === "all" || filter === "upcoming") return true;
      if (filter === "pan-india") return movie.panIndia;

      return movie.language.toLowerCase() === filter;
    });
  }, [data, filter, query]);

  const totalShown = liveMovies.length + upcomingMovies.length;

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-xl font-black tracking-tight">
            FILM<span className="text-[#00ABE4]">TRADE</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/discover"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Demo projects
            </a>

            <a
              href="/demo"
              className="rounded-xl bg-[#0f2742] px-4 py-2 text-sm font-black text-white transition hover:bg-[#183c63]"
            >
              Pitch journey
            </a>
          </div>
        </div>

        <section className="relative mt-7 overflow-hidden rounded-[30px] border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#b9e6ff] blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087ba8]">
                Pan-India movie catalogue
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Real movie data. Verified upcoming cinema.
              </h1>

              <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                Explore curated Telugu, Hindi, Tamil, Malayalam, and Kannada films.
                Live records use OMDb and IMDb data. Announced titles use clearly
                labelled verified records.
              </p>
            </div>

            <div className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Catalogue rule
              </p>

              <p className="mt-3 text-2xl font-black">No guessed data.</p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Ratings, votes, posters, trailers, and release dates appear only
                when a reliable source provides them.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <label className="block">
            <span className="sr-only">Search movies</span>

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, actor, or director"
              className="w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
            />
          </label>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFilter(item.value)}
                className={`shrink-0 rounded-xl px-4 py-3 text-sm font-black transition ${
                  filter === item.value
                    ? "bg-[#0f2742] text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#00ABE4] hover:text-[#087ba8]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {loading && (
          <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-72 bg-slate-200" />

                <div className="space-y-3 p-6">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </section>
        )}

        {error && (
          <section className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-7">
            <p className="text-sm font-black text-red-700">
              Movie catalogue could not load.
            </p>

            <p className="mt-3 text-sm leading-6 text-red-600">{error}</p>
          </section>
        )}

        {!loading && !error && (
          <>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                  Curated catalogue
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  {totalShown} title{totalShown === 1 ? "" : "s"} shown
                </h2>
              </div>

              <p className="text-xs font-bold text-slate-500">
                Fetched at{" "}
                {data?.fetchedAt
                  ? new Date(data.fetchedAt).toLocaleString("en-IN")
                  : "Not available"}
              </p>
            </div>

            {liveMovies.length > 0 && (
              <section className="mt-8">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00ABE4]" />

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                      Live OMDb records
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Real metadata, poster links, ratings, and votes where available.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {liveMovies.map((movie) => {
                    const upcoming = isUpcomingLiveMovie(movie);

                    return (
                      <article
                        key={movie.imdbId}
                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <a
                          href={`/movies/${movie.imdbId}`}
                          className="block focus:outline-none focus:ring-4 focus:ring-[#00ABE4]/30"
                        >
                          <div className="relative h-72 overflow-hidden bg-[#0f2742]">
                            {movie.posterUrl ? (
                              <img
                                src={movie.posterUrl}
                                alt={`${movie.title} poster`}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-end bg-[radial-gradient(circle_at_top_right,#3d8bb8,transparent_38%),linear-gradient(145deg,#0f2742,#1d5277)] p-6 text-white">
                                <p className="text-4xl font-black leading-none">
                                  {movie.title}
                                </p>
                              </div>
                            )}

                            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(4,14,31,0.78)_100%)]" />

                            <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
                              <span className="rounded-full border border-white/25 bg-[#0f2742]/75 px-3 py-1.5 text-[10px] font-black tracking-[0.13em] text-white backdrop-blur">
                                LIVE DATA
                              </span>

                              <span
                                className={`rounded-full px-3 py-1.5 text-[10px] font-black ${
                                  upcoming
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {upcoming ? "UPCOMING" : "RELEASED"}
                              </span>
                            </div>

                            <div className="absolute bottom-5 left-5 right-5 text-white">
                              <p className="text-xs font-black tracking-[0.16em] text-white/70">
                                {languageLabel(movie)} · {movie.year}
                              </p>

                              <p className="mt-2 text-3xl font-black leading-none">
                                {movie.title}
                              </p>
                            </div>
                          </div>

                          <div className="p-6">
                            <p className="text-sm font-black text-[#087ba8]">
                              {movie.genre}
                            </p>

                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                              {movie.plot === "N/A"
                                ? "Plot information is not available from the source."
                                : movie.plot}
                            </p>

                            <div className="mt-5 grid gap-3 rounded-2xl bg-[#f8fafc] p-4">
                              <div className="flex justify-between gap-4 text-sm">
                                <span className="font-bold text-slate-500">Release</span>
                                <span className="text-right font-black">
                                  {formatDate(movie.released)}
                                </span>
                              </div>

                              <div className="flex justify-between gap-4 text-sm">
                                <span className="font-bold text-slate-500">Director</span>
                                <span className="text-right font-black">
                                  {movie.director}
                                </span>
                              </div>

                              <div className="flex justify-between gap-4 text-sm">
                                <span className="font-bold text-slate-500">Cast</span>
                                <span className="text-right font-black">
                                  {movie.actors}
                                </span>
                              </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#d6e6f5] bg-[#e9f1fa] p-4">
                              <div>
                                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#087ba8]">
                                  IMDb rating
                                </p>

                                <p className="mt-1 text-2xl font-black text-[#0f2742]">
                                  {movie.imdbRating === "N/A"
                                    ? "Not available"
                                    : `${movie.imdbRating} / 10`}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#087ba8]">
                                  Votes
                                </p>

                                <p className="mt-1 text-sm font-black text-[#0f2742]">
                                  {movie.imdbVotes === "N/A"
                                    ? "Not available"
                                    : movie.imdbVotes}
                                </p>
                              </div>
                            </div>

                            <p className="mt-5 text-sm font-black text-[#087ba8]">
                              View intelligence →
                            </p>
                          </div>
                        </a>

                        <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 text-xs">
                          <span className="font-bold text-slate-500">
                            Source: {movie.source}
                          </span>

                          <a
                            href={`https://www.imdb.com/title/${movie.imdbId}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="font-black text-[#00ABE4]"
                          >
                            View source ↗
                          </a>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {upcomingMovies.length > 0 && (
              <section className="mt-12">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
                      Verified upcoming titles
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Publicly confirmed project information only.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {upcomingMovies.map((movie) => (
                    <article
                      key={movie.id}
                      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <a
                        href={`/movies/${movie.id}`}
                        className="block focus:outline-none focus:ring-4 focus:ring-[#00ABE4]/30"
                      >
                        <div className="relative flex h-72 flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_top_right,#a8dff7,transparent_30%),radial-gradient(circle_at_bottom_left,#f7d99d,transparent_28%),linear-gradient(145deg,#0f2742,#245e85)] p-6 text-white">
                          {movie.posterUrl && (
                            <img
                              src={movie.posterUrl}
                              alt={`${movie.title} announcement poster`}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          )}

                          {movie.posterUrl && (
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,31,0.15),rgba(4,14,31,0.86))]" />
                          )}

                          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border border-white/10 bg-white/5" />
                          <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full border border-white/10 bg-white/5" />

                          <div className="relative flex items-start justify-between gap-3">
                            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-black tracking-[0.13em] backdrop-blur">
                              VERIFIED UPCOMING
                            </span>

                            {movie.panIndia && (
                              <span className="rounded-full bg-amber-100 px-3 py-1.5 text-[10px] font-black text-amber-800">
                                PAN-INDIA
                              </span>
                            )}
                          </div>

                          <div className="relative">
                            <p className="text-xs font-black tracking-[0.16em] text-sky-100">
                              {movie.language.toUpperCase()} CINEMA
                            </p>

                            <p className="mt-3 text-4xl font-black leading-[0.92]">
                              {movie.title}
                            </p>

                            <p className="mt-4 text-sm font-bold text-white/75">
                              {movie.status}
                            </p>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="rounded-2xl bg-[#f8fafc] p-4">
                            <div className="flex justify-between gap-4 text-sm">
                              <span className="font-bold text-slate-500">Lead</span>
                              <span className="text-right font-black">{movie.lead}</span>
                            </div>

                            <div className="mt-3 flex justify-between gap-4 text-sm">
                              <span className="font-bold text-slate-500">Director</span>
                              <span className="text-right font-black">
                                {movie.director || "Not publicly confirmed"}
                              </span>
                            </div>

                            <div className="mt-3 flex justify-between gap-4 text-sm">
                              <span className="font-bold text-slate-500">Release</span>
                              <span className="text-right font-black">
                                {movie.releaseNote}
                              </span>
                            </div>
                          </div>

                          <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-amber-700">
                              Data availability
                            </p>

                            <p className="mt-2 text-sm leading-6 text-amber-800">
                              Official media, verified sources, and project information
                              are shown on the intelligence page.
                            </p>
                          </div>

                          <p className="mt-5 text-sm font-black text-[#087ba8]">
                            View intelligence →
                          </p>
                        </div>
                      </a>

                      <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4 text-xs">
                        <span className="font-bold text-slate-500">
                          Verified {formatDate(movie.lastVerified)}
                        </span>

                        <a
                          href={movie.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-black text-[#00ABE4]"
                        >
                          {movie.sourceName} ↗
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {totalShown === 0 && (
              <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <p className="text-xl font-black">No titles match this filter.</p>

                <p className="mt-3 text-sm text-slate-600">
                  Try another title, actor, director, language, or category.
                </p>
              </section>
            )}

            <section className="mt-12 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                FilmTrade boundary
              </p>

              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
                This catalogue supports movie discovery and research. A title
                appearing here does not mean it is available for investment,
                funding, revenue sharing, or any financial activity on FilmTrade.
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}