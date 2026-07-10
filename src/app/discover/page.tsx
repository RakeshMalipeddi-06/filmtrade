"use client";

import { useEffect, useMemo, useState } from "react";
import { demoProjects } from "@/data/demoProjects";

type SubmissionStatus =
  | "Draft"
  | "Submitted"
  | "Under review"
  | "Verified"
  | "Needs changes";

type ProducerSubmission = {
  id: string;
  title: string;
  language: string;
  genre: string;
  stage: string;
  director: string;
  leadCast: string;
  budgetRange: string;
  releasePlan: string;
  synopsis: string;
  posterUrl: string;
  sourceLinks: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
};

const SUBMISSIONS_KEY = "filmtrade-producer-submissions";

const genres = [
  "All",
  "Drama",
  "Science fiction",
  "Mystery",
  "Thriller",
  "Romance",
];

const stages = ["All stages", "Development", "Pre-production", "Production"];

function getProducerProjects() {
  try {
    return JSON.parse(
      window.localStorage.getItem(SUBMISSIONS_KEY) || "[]",
    ) as ProducerSubmission[];
  } catch {
    return [];
  }
}

function statusStyle(status: SubmissionStatus) {
  if (status === "Verified") {
    return "bg-emerald-100 text-emerald-800";
  }

  if (status === "Needs changes") {
    return "bg-red-100 text-red-700";
  }

  if (status === "Under review") {
    return "bg-amber-100 text-amber-800";
  }

  if (status === "Submitted") {
    return "bg-[#e9f1fa] text-[#087ba8]";
  }

  return "bg-slate-100 text-slate-700";
}

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");
  const [stage, setStage] = useState("All stages");
  const [producerProjects, setProducerProjects] = useState<ProducerSubmission[]>(
    [],
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProducerProjects(getProducerProjects());
    setReady(true);
  }, []);

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

  const filteredProducerProjects = useMemo(() => {
    return producerProjects.filter((project) => {
      const matchesQuery =
        `${project.title} ${project.genre} ${project.synopsis} ${project.language}`
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchesGenre = genre === "All" || project.genre === genre;

      const matchesStage =
        stage === "All stages" ||
        project.stage.toLowerCase().includes(stage.toLowerCase());

      return matchesQuery && matchesGenre && matchesStage;
    });
  }, [producerProjects, query, genre, stage]);

  const totalShown = filteredProjects.length + filteredProducerProjects.length;

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
            Explore FilmTrade demo projects.
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Browse fictional film intelligence projects and locally created
            producer submissions from this browser.
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
                aria-label="Search demo projects"
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
                placeholder="Search demo projects..."
              />
            </label>

            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none"
            >
              {genres.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={stage}
              onChange={(event) => setStage(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none"
            >
              {stages.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {genres.map((item) => (
              <button
                type="button"
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-slate-500">
            {totalShown} demo project{totalShown === 1 ? "" : "s"} shown
          </p>

          <p className="text-xs font-black text-[#087ba8]">
            All signals and review labels are illustrative
          </p>
        </div>

        <section className="mt-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                FilmTrade fictional projects
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Curated demo intelligence
              </h2>
            </div>

            <span className="rounded-full bg-[#e9f1fa] px-4 py-2 text-xs font-black text-[#087ba8]">
              {filteredProjects.length} shown
            </span>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.slug}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.poster} p-6 text-white`}
                >
                  <div
                    className={`absolute -right-8 -top-8 h-40 w-40 ${project.glow} blur-2xl`}
                  />
                  <div
                    className={`absolute -bottom-10 -left-10 h-36 w-36 ${project.shape}`}
                  />
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
                      <p className="text-[10px] font-black tracking-[0.24em] text-white/75">
                        FILMTRADE DEMO
                      </p>

                      <p className="mt-2 text-4xl font-black leading-none">
                        {project.artwork}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-black">{project.title}</h2>

                      <p className="mt-1 text-sm font-bold text-[#087ba8]">
                        {project.genre}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
                      {project.momentum}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {project.description}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-5">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                        FilmPulse
                      </p>
                      <p className="mt-1 text-xl font-black">{project.pulse}</p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                        Trust
                      </p>
                      <p className="mt-1 text-xs font-black text-slate-700">
                        {project.trust.replace("Illustrative: ", "")}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                        Risk
                      </p>
                      <p className="mt-1 text-xs font-black text-slate-700">
                        {project.risk.replace("Illustrative: ", "")}
                      </p>
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
          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-black">No fictional projects match these filters.</p>
            </div>
          )}
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Community demo projects
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Producer-created local submissions
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                These projects were created through the Producer workspace and
                are stored only in this browser.
              </p>
            </div>

            <a
              href="/producer/create"
              className="rounded-xl bg-[#0f2742] px-4 py-3 text-sm font-black text-white transition hover:bg-[#1c4267]"
            >
              Create demo project
            </a>
          </div>

          {!ready && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[390px] animate-pulse rounded-3xl bg-slate-200"
                />
              ))}
            </div>
          )}

          {ready && filteredProducerProjects.length > 0 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducerProjects.map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-[radial-gradient(circle_at_top_right,#9ddcff,transparent_35%),linear-gradient(145deg,#0f2742,#275f93)] p-6 text-white">
                    {project.posterUrl && (
                      <img
                        src={project.posterUrl}
                        alt={`${project.title} poster`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,31,0.1),rgba(4,14,31,0.84))]" />

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.15em] backdrop-blur-sm">
                          PRODUCER SUBMISSION
                        </span>

                        <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black backdrop-blur-sm">
                          {project.stage}
                        </span>
                      </div>

                      <div>
                        <p className="text-[10px] font-black tracking-[0.2em] text-white/75">
                          {project.language.toUpperCase()}
                        </p>

                        <p className="mt-2 text-3xl font-black leading-none">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-[#087ba8]">
                          {project.genre}
                        </p>

                        <p className="mt-2 text-sm font-bold text-slate-500">
                          {project.director}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${statusStyle(
                          project.status,
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
                      {project.synopsis}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                          Lead cast
                        </p>

                        <p className="mt-1 text-xs font-black leading-5 text-slate-700">
                          {project.leadCast}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                          Release plan
                        </p>

                        <p className="mt-1 text-xs font-black leading-5 text-slate-700">
                          {project.releasePlan}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`/producer/projects/${encodeURIComponent(project.id)}`}
                      className="mt-6 block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                    >
                      View project record
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {ready && filteredProducerProjects.length === 0 && (
            <section className="mt-5 rounded-3xl border border-dashed border-[#9fcce6] bg-[#e9f1fa] p-8">
              <p className="text-xl font-black">
                No producer submissions match these filters.
              </p>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                Create a project in the Producer workspace, or clear the search
                and filters to see saved local submissions.
              </p>

              <a
                href="/producer/create"
                className="mt-6 inline-block rounded-xl bg-[#0f2742] px-5 py-3 text-sm font-black text-white"
              >
                Create demo project
              </a>
            </section>
          )}
        </section>

        {totalShown === 0 && ready && (
          <section className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-xl font-black">No projects found.</h2>

            <p className="mt-3 text-slate-600">
              Try another search term or clear the filters.
            </p>
          </section>
        )}

        <section className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            Demo boundary
          </p>

          <p className="mt-3 text-sm leading-7 text-amber-800">
            Community demo projects are local browser records. They are not
            public film listings, verified productions, investment offers, or
            funding opportunities.
          </p>
        </section>
      </div>
    </main>
  );
}