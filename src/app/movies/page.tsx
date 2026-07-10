"use client";

import { useEffect, useMemo, useState } from "react";
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

type MovieCard = {
  id: string;
  title: string;
  posterUrl: string | null;
  language: string;
  genre: string;
  status: string;
  yearOrRelease: string;
  isUpcoming: boolean;
  panIndia: boolean;
  description: string;
};

const filters = [
  { value: "all", label: "All movies" },
  { value: "trending", label: "Trending" },
  { value: "upcoming", label: "Upcoming" },
  { value: "telugu", label: "Telugu" },
  { value: "hindi", label: "Hindi" },
  { value: "tamil", label: "Tamil" },
  { value: "pan-india", label: "Pan-India" },
] as const;

type Filter = (typeof filters)[number]["value"];

function getLiveStatus(movie: LiveMovie) {
  const override = movieStatusOverrides[movie.imdbId];

  if (override?.status) return override.status;
  if (movie.verifiedStatus === "Upcoming") return "Upcoming";
  if (movie.verifiedStatus === "Released") return "Released";

  const releaseDate = new Date(movie.released);

  if (
    !Number.isNaN(releaseDate.getTime()) &&
    releaseDate.getTime() > Date.now()
  ) {
    return "Upcoming";
  }

  return "Released";
}

function isUpcomingLiveMovie(movie: LiveMovie) {
  const status = getLiveStatus(movie).toLowerCase();

  return (
    status.includes("confirmed") ||
    status.includes("announced") ||
    status.includes("production") ||
    status.includes("development") ||
    status.includes("expected") ||
    status.includes("upcoming") ||
    status.includes("tba")
  );
}

function MovieCardItem({ movie }: { movie: MovieCard }) {
  return (
    <a
      href={`/movies/${movie.id}`}
      className="group overflow-hidden rounded-2xl border border-[#dce8f4] bg-white shadow-[0_10px_30px_rgba(15,35,65,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(15,35,65,0.14)]"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[#dce8f4]">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-end bg-[radial-gradient(circle_at_top_right,#8ec9ef,transparent_38%),linear-gradient(145deg,#17385f,#5e9ac6)] p-5">
            <p className="text-2xl font-black leading-none text-white">
              {movie.title}
            </p>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071d36]/80 to-transparent" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {movie.panIndia && (
            <span className="rounded-full bg-[#0aaee7] px-2.5 py-1 text-[9px] font-black text-white shadow-sm">
              PAN-INDIA
            </span>
          )}

          {movie.isUpcoming && (
            <span className="rounded-full bg-amber-200 px-2.5 py-1 text-[9px] font-black text-amber-900 shadow-sm">
              UPCOMING
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="truncate text-base font-black text-[#10243e]">
          {movie.title}
        </h3>

        <p className="mt-1 truncate text-xs font-bold text-[#087ba8]">
          {movie.language} · {movie.yearOrRelease}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-[#edf3f8] pt-3">
          <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">
            {movie.genre}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
              movie.isUpcoming
                ? "bg-amber-50 text-amber-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {movie.status}
          </span>
        </div>
      </div>
    </a>
  );
}

function MovieSection({
  eyebrow,
  title,
  subtitle,
  movies,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  movies: MovieCard[];
}) {
  if (movies.length === 0) return null;

  return (
    <section className="mt-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0aaee7]">
            {eyebrow}
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-[#10243e]">
            {title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
        </div>

        <span className="rounded-full bg-[#e9f5fc] px-4 py-2 text-xs font-black text-[#087ba8]">
          {movies.length} titles
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCardItem key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
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
          throw new Error(failed.error || "Unable to load movie catalogue.");
        }

        setData(await response.json());
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Unable to load movie catalogue.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadMovies();
  }, []);

  const allMovies = useMemo<MovieCard[]>(() => {
    const liveMovies = (data?.liveMovies ?? [])
      .filter((movie) => movie.title.trim().toLowerCase() !== "the paradise")
      .map((movie) => {
        const override = movieStatusOverrides[movie.imdbId];
        const languages = override?.languages ?? movie.language;

        return {
          id: movie.imdbId,
          title: movie.title,
          posterUrl: movie.posterUrl,
          language: languages.split(",")[0]?.trim() || "Indian cinema",
          genre: movie.genre || "Indian cinema",
          status: getLiveStatus(movie),
          yearOrRelease: override?.releaseDate ?? movie.year,
          isUpcoming: isUpcomingLiveMovie(movie),
          panIndia: languages.split(",").length > 1,
          description:
            movie.plot === "N/A"
              ? "Source-backed movie record."
              : movie.plot,
        };
      });

    const upcomingMovies = (data?.verifiedUpcomingMovies ?? []).map((movie) => {
      const override = movieStatusOverrides[movie.id];
      const languages = override?.languages ?? movie.language;

      return {
        id: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
        language: languages.split(",")[0]?.trim() || "Indian cinema",
        genre: "Upcoming cinema",
        status: override?.status ?? movie.status,
        yearOrRelease: override?.releaseDate ?? movie.releaseNote,
        isUpcoming: true,
        panIndia: movie.panIndia || languages.split(",").length > 1,
        description: `${movie.lead}${movie.director ? ` · ${movie.director}` : ""}`,
      };
    });

    const seenTitles = new Set<string>();

    return [...upcomingMovies, ...liveMovies].filter((movie) => {
      const key = movie.title.trim().toLowerCase();

      if (seenTitles.has(key)) return false;

      seenTitles.add(key);
      return true;
    });
  }, [data]);

  const filteredMovies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allMovies.filter((movie) => {
      const matchesSearch =
        !normalizedQuery ||
        `${movie.title} ${movie.language} ${movie.genre} ${movie.description}`
          .toLowerCase()
          .includes(normalizedQuery);

      if (!matchesSearch) return false;
      if (filter === "all" || filter === "trending") return true;
      if (filter === "upcoming") return movie.isUpcoming;
      if (filter === "pan-india") return movie.panIndia;

      return movie.language.toLowerCase() === filter;
    });
  }, [allMovies, filter, query]);

  const trendingMovies = filteredMovies.filter((movie) => !movie.isUpcoming);
  const upcomingMovies = filteredMovies.filter((movie) => movie.isUpcoming);
  const panIndiaMovies = filteredMovies.filter((movie) => movie.panIndia);
  const teluguMovies = filteredMovies.filter(
    (movie) => movie.language.toLowerCase() === "telugu",
  );

  return (
    <main className="min-h-screen bg-[#f6f9fc] pb-16 text-[#10243e]">
      <header className="border-b border-[#dce8f4] bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <a href="/dashboard" className="text-xl font-black tracking-tight">
            FILM<span className="text-[#0aaee7]">TRADE</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-bold text-slate-500 lg:flex">
            <a href="/dashboard" className="transition hover:text-[#087ba8]">
              Dashboard
            </a>
            <a href="/discover" className="transition hover:text-[#087ba8]">
              Discover
            </a>
            <a href="/movies" className="text-[#087ba8]">
              Movies
            </a>
            <a href="/watchlist" className="transition hover:text-[#087ba8]">
              Watchlist
            </a>
          </nav>

          <a
            href="/watchlist"
            className="rounded-xl bg-[#0aaee7] px-4 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-[#078fc1]"
          >
            MY WATCHLIST
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <section className="mt-8 overflow-hidden rounded-3xl border border-[#d6e8f5] bg-[linear-gradient(120deg,#eaf5ff_0%,#f8fcff_48%,#d8efff_100%)] p-7 shadow-[0_12px_35px_rgba(15,50,85,0.07)] sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
            FilmTrade catalogue
          </p>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-[#10243e] sm:text-5xl">
                Explore cinema with context.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Browse source-backed movie records, upcoming projects, language
                categories, and FilmTrade research information.
              </p>
            </div>

            <div className="rounded-2xl border border-white/80 bg-white/75 px-5 py-4 shadow-sm backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                Catalogue status
              </p>
              <p className="mt-1 text-lg font-black text-[#087ba8]">
                Live movie records
              </p>
            </div>
          </div>
        </section>

        <section className="mt-7 rounded-3xl border border-[#dce8f4] bg-white p-5 shadow-[0_10px_30px_rgba(15,35,65,0.06)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-3 rounded-2xl border border-[#dce8f4] bg-[#f8fbfe] px-4 py-4">
              <span className="text-lg text-[#0aaee7]">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search movies, actors, directors..."
                className="w-full bg-transparent text-sm font-medium text-[#10243e] outline-none placeholder:text-slate-400"
              />
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[720px]">
              {filters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={`shrink-0 rounded-xl px-4 py-3 text-xs font-black transition ${
                    filter === item.value
                      ? "bg-[#0aaee7] text-white shadow-sm"
                      : "bg-[#eaf4fc] text-[#087ba8] hover:bg-[#d9effc]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {loading && (
          <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="aspect-[2/3] animate-pulse rounded-2xl bg-[#dce8f4]"
              />
            ))}
          </section>
        )}

        {error && (
          <section className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-7">
            <p className="font-black text-red-700">
              Movie catalogue could not load.
            </p>
            <p className="mt-2 text-sm text-red-600">{error}</p>
          </section>
        )}

        {!loading && !error && (
          <>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-500">
                {filteredMovies.length} movie records shown
              </p>
              <p className="text-xs font-black text-[#087ba8]">
                Information is based on available catalogue sources
              </p>
            </div>

            <MovieSection
              eyebrow="Now showing"
              title="Trending now"
              subtitle="Released titles and active catalogue records."
              movies={trendingMovies}
            />

            <MovieSection
              eyebrow="Upcoming cinema"
              title="Coming soon"
              subtitle="Publicly announced and source-backed upcoming titles."
              movies={upcomingMovies}
            />

            <MovieSection
              eyebrow="Multi-language projects"
              title="Pan-India spotlight"
              subtitle="Projects listed across multiple Indian languages."
              movies={panIndiaMovies}
            />

            <MovieSection
              eyebrow="Regional catalogue"
              title="Telugu cinema"
              subtitle="A focused row for Telugu movie records."
              movies={teluguMovies}
            />

            {filteredMovies.length === 0 && (
              <section className="mt-12 rounded-3xl border border-dashed border-[#b9d5e8] bg-white p-12 text-center">
                <p className="text-xl font-black text-[#10243e]">
                  No movies found.
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  This title is not currently available in the FilmTrade movie
                  catalogue. Please check again after future catalogue updates.
                </p>
              </section>
            )}

            <section className="mt-14 rounded-3xl border border-[#cfe7f7] bg-[#eaf6ff] p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Catalogue boundary
              </p>
              <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">
                FilmTrade presents movie research records and publicly available
                project information. It does not offer investments, funding,
                revenue sharing, or financial advice.
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}