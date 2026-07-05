"use client";

import { useState } from "react";
import { demoProjects } from "@/data/demoProjects";

const defaultWatchlist = [
  "after-the-monsoon",
  "orbit-47",
  "the-last-frame",
];

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(defaultWatchlist);

  const projects = demoProjects.filter((project) => watchlist.includes(project.slug));

  function removeProject(slug: string) {
    setWatchlist((current) => current.filter((item) => item !== slug));
  }

  function restoreWatchlist() {
    setWatchlist(defaultWatchlist);
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <a href="/dashboard" className="text-sm font-black text-[#00ABE4]">
          ← Back to dashboard
        </a>

        <section className="mt-5 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                Your watchlist
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Projects to revisit.
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                A local demo watchlist for fictional projects and illustrative FilmPulse signals.
              </p>
            </div>
            <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
              Demo simulation only
            </span>
          </div>
        </section>

        <section className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black text-[#0f172a]">
              {projects.length} fictional project{projects.length === 1 ? "" : "s"} saved
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Changes reset when you refresh this page.
            </p>
          </div>

          <button
            onClick={restoreWatchlist}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
          >
            Restore demo watchlist
          </button>
        </section>

        {projects.length > 0 ? (
          <section className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${project.poster} p-6 text-white`}>
                  <div className={`absolute -right-8 -top-8 h-40 w-40 ${project.glow} blur-2xl`} />
                  <div className={`absolute -bottom-10 -left-10 h-36 w-36 ${project.shape}`} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(4,14,31,0.72)_100%)]" />

                  <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.15em] backdrop-blur-sm">
                        WATCHLIST
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black backdrop-blur-sm">
                        {project.stage}
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] font-black tracking-[0.24em] text-white/75">FICTIONAL FILM</p>
                      <p className="mt-2 text-4xl font-black leading-none">{project.artwork}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-black">{project.title}</h2>
                      <p className="mt-1 text-sm font-bold text-[#087ba8]">{project.genre}</p>
                    </div>
                    <span className="rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
                      {project.momentum}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">FilmPulse</p>
                      <p className="mt-1 text-2xl font-black text-[#0f2742]">{project.pulse}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Status</p>
                      <p className="mt-1 text-sm font-black text-slate-700">Illustrative</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <a
                      href={`/projects/${project.slug}`}
                      className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                    >
                      View project
                    </a>
                    <button
                      onClick={() => removeProject(project.slug)}
                      className="rounded-xl bg-[#0f2742] px-4 py-3 text-sm font-black text-white transition hover:bg-[#1a3c61]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
              Watchlist empty
            </p>
            <h2 className="mt-4 text-3xl font-black">No fictional projects saved.</h2>
            <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
              This is a local UI simulation. Restore the default watchlist or browse Discover to explore projects.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                onClick={restoreWatchlist}
                className="rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]"
              >
                Restore demo watchlist
              </button>
              <a
                href="/discover"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
              >
                Browse projects
              </a>
            </div>
          </section>
        )}

        <section className="mt-10 rounded-3xl bg-[#0f2742] p-7 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">Demo notice</p>
          <h2 className="mt-3 text-2xl font-black">This watchlist is local and illustrative.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            It does not represent investments, holdings, financial advice, real projects, or real user data. In Phase 2, this UI can connect to a database-backed mock user role.
          </p>
        </section>
      </div>
    </main>
  );
}