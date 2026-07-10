"use client";

import { useEffect, useMemo, useState } from "react";
import { verifiedUpcomingMovies } from "@/data/verifiedUpcomingMovies";
import { movieEvidence } from "@/data/movieEvidence";
import { manualMovieScores } from "@/data/movieScores";
import { movieStatusOverrides } from "@/data/movieStatus";

type LiveMovie = {
  imdbId: string;
  title: string;
  language: string;
  posterUrl: string | null;
  verifiedStatus?: "Upcoming" | "Released" | null;
  director: string;
  actors: string;
  genre: string;
};

type MovieApiResponse = {
  liveMovies: LiveMovie[];
};

type MovieMediaItem = {
  videoId: string;
  type: "Glimpse" | "Announcement" | "Trailer" | "Song";
  viewCount: string | null;
  publishedAt: string | null;
};

type MovieMediaResponse = {
  media: MovieMediaItem[];
};

type PulseMovie = {
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
  if (value === 0) return "No official views";
  if (value >= 10_000_000) return `${(value / 10_000_000).toFixed(1)}Cr`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;

  return value.toLocaleString("en-IN");
}

function formatDate(value: string | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function fallbackStyle(index: number) {
  const styles = [
    "bg-[radial-gradient(circle_at_top_right,#8ed8ff,transparent_34%),linear-gradient(145deg,#0f2742,#245e85)]",
    "bg-[radial-gradient(circle_at_bottom_left,#f6d28d,transparent_30%),linear-gradient(145deg,#172554,#334155)]",
    "bg-[radial-gradient(circle_at_top_left,#a7f3d0,transparent_28%),linear-gradient(145deg,#0f172a,#155e75)]",
    "bg-[radial-gradient(circle_at_bottom_right,#c4b5fd,transparent_30%),linear-gradient(145deg,#1e1b4b,#334155)]",
  ];

  return styles[index % styles.length];
}

export default function FilmPulsePage() {
  const [data, setData] = useState<MovieApiResponse | null>(null);
  const [mediaByMovie, setMediaByMovie] = useState<
    Record<string, MovieMediaResponse>
  >({});
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  useEffect(() => {
    async function loadMovies() {
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

    loadMovies();
  }, []);

  const movies = useMemo<PulseMovie[]>(() => {
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

    const seenTitles = new Set<string>();

    return [...upcoming, ...live].filter((movie) => {
      const key = movie.title.trim().toLowerCase();

      if (seenTitles.has(key)) return false;

      seenTitles.add(key);
      return true;
    });
  }, [data]);

  useEffect(() => {
    async function loadMedia(movieId: string) {
      if (mediaByMovie[movieId]) return;

      try {
        const response = await fetch(
          `/api/movie-media?movieId=${encodeURIComponent(movieId)}`,
        );

        if (!response.ok) {
          throw new Error("Media unavailable");
        }

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

    movies.forEach((movie) => loadMedia(movie.id));
  }, [movies, mediaByMovie]);

  const rankedMovies = useMemo(() => {
    return movies
      .map((movie) => {
        const media = mediaByMovie[movie.id]?.media ?? [];
        const views = media.reduce(
          (sum, item) => sum + Number(item.viewCount || 0),
          0,
        );
        const evidenceCount = movieEvidence[movie.id]?.length ?? 0;

        const manualScore = manualMovieScores[movie.id];

const calculatedInterest = Math.min(
  100,
  Math.round(
    Math.min(55, Math.log10(views + 1) * 8) +
      Math.min(25, media.length * 10) +
      Math.min(20, evidenceCount * 5),
  ),
);

const interest = manualScore?.interest ?? calculatedInterest;

const calculatedFilmPulse = Math.min(
  100,
  Math.round(
    scoreFor(movie.id, 60, 20) * 0.45 +
      interest * 0.35 +
      Math.min(20, evidenceCount * 5),
  ),
);

const filmPulse = manualScore?.filmPulse ?? calculatedFilmPulse;

        const trust = Math.min(
          100,
          scoreFor(`${movie.id}-trust`, 80, 17) + Math.min(3, evidenceCount),
        );

        const latestMedia = [...media]
          .filter((item) => item.publishedAt)
          .sort(
            (first, second) =>
              new Date(second.publishedAt || "").getTime() -
              new Date(first.publishedAt || "").getTime(),
          )[0];

        return {
  ...movie,
  filmPulse,
  interest,
  trust,
  risk: evidenceCount >= 2 ? "Low" : "Medium",
  priority: manualScore?.priority ?? "Moderate",
  views,
  mediaCount: media.length,
  evidenceCount,
  latestMedia,
};
      })
      .sort((first, second) => second.filmPulse - first.filmPulse);
  }, [movies, mediaByMovie]);

  const languages = useMemo(
    () => ["All", ...Array.from(new Set(movies.map((movie) => movie.language)))],
    [movies],
  );

  const filteredMovies =
    selectedLanguage === "All"
      ? rankedMovies
      : rankedMovies.filter((movie) => movie.language === selectedLanguage);

  const topMovie = rankedMovies[0];
  const totalEvidence = rankedMovies.reduce(
    (sum, movie) => sum + movie.evidenceCount,
    0,
  );
  const totalMedia = rankedMovies.reduce(
    (sum, movie) => sum + movie.mediaCount,
    0,
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a href="/dashboard" className="text-sm font-black text-[#087ba8]">
            ← Back to dashboard
          </a>

          <div className="flex gap-2">
            <a
              href="/watchlist"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Watchlist
            </a>

            <a
              href="/compare"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Compare
            </a>
          </div>
        </header>

        <section className="mt-7 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                FilmTrade intelligence
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                FilmPulse rankings
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                A transparent movie research view built from official media reach,
                evidence coverage, and FilmTrade demo indicators.
              </p>

              <span className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
                Research signals only · not investment advice
              </span>
            </div>

            <div className="rounded-3xl bg-[#0f2742] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                How FilmPulse works
              </p>

              <p className="mt-4 text-3xl font-black text-[#7edfff]">0–100</p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                A demo score combining official media visibility, evidence count,
                and simple catalogue signals.
              </p>
            </div>
          </div>
        </section>

        {loading && (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-44 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {!loading && (
          <>
            <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  "Highest FilmPulse",
                  topMovie ? String(topMovie.filmPulse) : "—",
                  topMovie?.title || "No movie data",
                ],
                [
                  "Movies ranked",
                  String(rankedMovies.length),
                  "Live and verified upcoming records",
                ],
                [
                  "Official media items",
                  String(totalMedia),
                  "Glimpses, trailers, songs, announcements",
                ],
                [
                  "Evidence records",
                  String(totalEvidence),
                  "Official and verified public sources",
                ],
              ].map(([label, value, detail]) => (
                <article
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                    {label}
                  </p>

                  <p className="mt-3 text-3xl font-black">{value}</p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {detail}
                  </p>
                </article>
              ))}
            </section>

            <section className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                    Movie ranking
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight">
                    Research signals across the catalogue
                  </h2>
                </div>

                <select
                  value={selectedLanguage}
                  onChange={(event) => setSelectedLanguage(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black outline-none focus:border-[#00ABE4]"
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="hidden grid-cols-[56px_minmax(180px,1.4fr)_110px_110px_120px_120px] gap-4 border-b border-slate-200 bg-[#f8fafc] px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500 lg:grid">
                  <span>Rank</span>
                  <span>Movie</span>
                  <span>FilmPulse</span>
                  <span>Interest</span>
                  <span>Media reach</span>
                  <span>Evidence</span>
                </div>

                {filteredMovies.map((movie, index) => (
                  <a
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="grid gap-4 border-b border-slate-100 px-5 py-5 transition hover:bg-[#f8fcff] last:border-0 lg:grid-cols-[56px_minmax(180px,1.4fr)_110px_110px_120px_120px] lg:items-center lg:px-6"
                  >
                    <span className="text-xl font-black text-[#00ABE4]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex min-w-0 items-center gap-4">
                      <div
                        className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ${
                          movie.posterUrl ? "bg-[#0f2742]" : fallbackStyle(index)
                        }`}
                      >
                        {movie.posterUrl && (
                          <img
                            src={movie.posterUrl}
                            alt={`${movie.title} poster`}
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-black">{movie.title}</p>

                        <p className="mt-1 text-sm text-slate-500">
                          {movie.language} · {movie.status}
                        </p>

                        <p className="mt-1 text-xs font-bold text-[#087ba8]">
                          {movie.sourceType}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400 lg:hidden">
                        FilmPulse
                      </p>
                      <p className="text-2xl font-black">{movie.filmPulse}</p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400 lg:hidden">
                        Interest
                      </p>
                      <p className="text-lg font-black text-[#087ba8]">
                        {movie.interest}
                      </p>
                      <p className="text-xs font-bold text-slate-500">
                        {movie.priority} research priority
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400 lg:hidden">
                        Media reach
                      </p>
                      <p className="font-black">{formatViews(movie.views)}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {movie.mediaCount} official item
                        {movie.mediaCount === 1 ? "" : "s"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-400 lg:hidden">
                        Evidence
                      </p>
                      <p className="font-black">{movie.evidenceCount} source{movie.evidenceCount === 1 ? "" : "s"}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">
                        {movie.latestMedia
                          ? `Latest: ${formatDate(movie.latestMedia.publishedAt)}`
                          : "No media date"}
                      </p>
                    </div>
                  </a>
                ))}

                {filteredMovies.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="font-black">No movies found for this language.</p>
                  </div>
                )}
              </div>
            </section>

            <section className="mt-10 grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                  Signal glossary
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    [
                      "FilmPulse",
                      "A demo composite based on visibility, evidence, and catalogue signals.",
                    ],
                    [
                      "Interest",
                      "Calculated from official media reach, media count, and evidence count.",
                    ],
                    [
                      "Trust",
                      "A transparent demo indicator, not legal or financial verification.",
                    ],
                    [
                      "Risk",
                      "A simple demo label based on evidence coverage, not financial advice.",
                    ],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl bg-[#f8fafc] p-5">
                      <h3 className="font-black">{title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-3xl bg-[#0f2742] p-7 text-white shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">
                  Research boundary
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  Built for movie discovery.
                </h2>

                <p className="mt-4 leading-7 text-slate-300">
                  FilmPulse is a student-project research interface. It does not
                  process investments, payments, ownership, returns, KYC, or escrow.
                </p>

                <a
                  href="/movies"
                  className="mt-7 inline-block rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-[#0f2742]"
                >
                  Explore movies
                </a>
              </article>
            </section>
          </>
        )}
      </div>
    </main>
  );
}