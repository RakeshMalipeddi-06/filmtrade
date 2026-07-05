"use client";

import { useMemo, useState } from "react";
import { demoProjects } from "@/data/demoProjects";

const genres = ["All", "Drama", "Science fiction", "Mystery", "Thriller", "Romance"];
const stages = ["All stages", "Development", "Pre-production", "Production"];

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [stage, setStage] = useState("All stages");

  const filteredProjects = useMemo(() => {
    return demoProjects.filter((project) => {
      const matchesQuery = `${project.title} ${project.genre} ${project.description}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesGenre = genre === "All" || project.genre === genre;
      const matchesStage = stage === "All stages" || project.stage === stage;

      return matchesQuery && matchesGenre && matchesStage;
    });
  }, [query, genre, stage]);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <a href="/dashboard" className="text-sm font-black text-[#00ABE4]">
          ← Back to dashboard
        </a>

        <section className="mt-5 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
            Discover projects
          </p>
          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
            Explore fictional film intelligence.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Browse local mock projects, illustrative FilmPulse signals, and demo information labels.
          </p>
          <span className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
            Demo simulation only
          </span>
        </section>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3">
              <span className="text-slate-400">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search fictional projects"
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                placeholder="Search fictional projects..."
              />
            </label>

            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none"
            >
              {genres.map((item) => <option key={item}>{item}</option>)}
            </select>

            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none"
            >
              {stages.map((item) => <option key={item}>{item}</option>)}
            </select>
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

        <div className="mt-8 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-500">
            {filteredProjects.length} fictional projects shown
          </p>
          <p className="text-xs font-black text-[#087ba8]">All signals are illustrative</p>
        </div>

        <section className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article key={project.slug} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.poster} p-6 text-white`}>
                <div className={`absolute -right-8 -top-8 h-40 w-40 ${project.glow} blur-2xl`} />
                <div className={`absolute -bottom-10 -left-10 h-36 w-36 ${project.shape}`} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(4,14,31,0.72)_100%)]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.15em] backdrop-blur-sm">
                      FICTIONAL FILM
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black backdrop-blur-sm">
                      {project.stage}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.24em] text-white/75">FILMTRADE DEMO</p>
                    <p className="mt-2 text-4xl font-black leading-none">{project.artwork}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black">{project.title}</h2>
                    <p className="mt-1 text-sm font-bold text-[#087ba8]">{project.genre}</p>
                  </div>
                  <span className="rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
                    {project.momentum}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{project.description}</p>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">FilmPulse</p>
                    <p className="mt-1 text-xl font-black">{project.pulse}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Trust</p>
                    <p className="mt-1 text-xs font-black text-slate-700">{project.trust.replace("Illustrative: ", "")}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Risk</p>
                    <p className="mt-1 text-xs font-black text-slate-700">{project.risk.replace("Illustrative: ", "")}</p>
                  </div>
                </div>

                <a
                  href={`/projects/${project.slug}`}
                  className="mt-6 block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                >
                  View demo project
                </a>
              </div>
            </article>
          ))}
        </section>

        {filteredProjects.length === 0 && (
          <section className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-xl font-black">No fictional projects found.</h2>
            <p className="mt-3 text-slate-600">Try another search term or clear the filters.</p>
          </section>
        )}
      </div>
    </main>
  );
}