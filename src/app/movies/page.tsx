"use client";

import { useMemo, useState } from "react";
import { demoProjects } from "@/data/demoProjects";

const genres = ["All", "Drama", "Science fiction", "Mystery", "Thriller", "Romance"];

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");

  const movies = useMemo(() => {
    return demoProjects.filter((movie) => {
      const matchesQuery = `${movie.title} ${movie.genre} ${movie.description}`
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesGenre = genre === "All" || movie.genre === genre;

      return matchesQuery && matchesGenre;
    });
  }, [query, genre]);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <a href="/dashboard" className="text-sm font-black text-[#00ABE4]">
          ← Back to dashboard
        </a>

        <section className="mt-5 overflow-hidden rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
              Film catalog
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
              Fictional films. Built for exploration.
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              A local catalog of fictional FilmTrade demo films. These entries are not real movies and do not use external movie data.
            </p>
            <span className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
              Fictional catalog · Demo simulation
            </span>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3">
              <span className="text-slate-400">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search fictional films"
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                placeholder="Search fictional films..."
              />
            </label>

            <p className="text-sm font-bold text-slate-500">
              {movies.length} film{movies.length === 1 ? "" : "s"} shown
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {genres.map((item) => (
              <button
                key={item}
                onClick={() => setGenre(item)}
                className={`rounded-full px-4 py-2 text-xs font-black transition ${
                  genre === item
                    ? "bg-[#00ABE4] text-white"
                    : "bg-[#e9f1fa] text-[#087ba8] hover:bg-[#dff1ff]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {movies.length > 0 ? (
          <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
              <a
                key={movie.slug}
                href={`/projects/${movie.slug}`}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`relative h-72 overflow-hidden bg-gradient-to-br ${movie.poster} p-6 text-white`}>
                  <div className={`absolute -right-8 -top-8 h-40 w-40 ${movie.glow} blur-2xl`} />
                  <div className={`absolute -bottom-10 -left-10 h-36 w-36 ${movie.shape}`} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_22%,rgba(4,14,31,0.78)_100%)]" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-black tracking-[0.14em] backdrop-blur-sm">
                        DEMO FILM
                      </span>
                      <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-black backdrop-blur-sm">
                        {movie.genre}
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] font-black tracking-[0.24em] text-white/75">
                        FILMTRADE FICTION
                      </p>
                      <p className="mt-2 text-4xl font-black leading-[0.86] tracking-tight">
                        {movie.artwork}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-black">{movie.title}</h2>
                      <p className="mt-1 text-sm font-bold text-[#087ba8]">{movie.stage}</p>
                    </div>
                    <span className="rounded-full bg-[#e9f1fa] px-2.5 py-1 text-xs font-black text-[#087ba8]">
                      {movie.pulse}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">
                    {movie.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <span className="text-xs font-black text-slate-400">Demo simulation</span>
                    <span className="text-sm font-black text-[#00ABE4]">View film →</span>
                  </div>
                </div>
              </a>
            ))}
          </section>
        ) : (
          <section className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
              No results
            </p>
            <h2 className="mt-4 text-3xl font-black">No fictional films found.</h2>
            <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
              Try another search term or choose a different genre.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setGenre("All");
              }}
              className="mt-7 rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]"
            >
              Clear filters
            </button>
          </section>
        )}

        <section className="mt-10 rounded-3xl bg-[#0f2742] p-7 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">Catalog notice</p>
          <h2 className="mt-3 text-2xl font-black">No real movie data is used here.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            This catalog exists to demonstrate FilmTrade’s browsing experience. Real titles, posters, cast, release dates, and production information can be added later through approved sources after the core UI is complete.
          </p>
        </section>
      </div>
    </main>
  );
}