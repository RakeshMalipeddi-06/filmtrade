"use client";

import { useEffect, useMemo, useState } from "react";
import { demoProjects } from "@/data/demoProjects";

type ProducerSubmission = {
  id: string;
  title: string;
  language: string;
  genre: string;
  stage: string;
  director: string;
  leadCast: string;
  releasePlan: string;
  status: "Draft" | "Submitted" | "Under review" | "Verified" | "Needs changes";
  createdAt: string;
};

const SUBMISSIONS_KEY = "filmtrade-producer-submissions";

const milestones = [
  {
    title: "After the Monsoon",
    stage: "Production planning",
    progress: "In progress",
    percent: 68,
  },
  {
    title: "Orbit 47",
    stage: "Development review",
    progress: "Complete",
    percent: 100,
  },
  {
    title: "The Last Frame",
    stage: "Release preparation",
    progress: "Upcoming",
    percent: 24,
  },
];

const reports = [
  {
    title: "After the Monsoon",
    label: "Mock production update",
    status: "Ready",
  },
  {
    title: "Orbit 47",
    label: "Illustrative milestone report",
    status: "Draft",
  },
  {
    title: "The Last Frame",
    label: "Demo revenue summary",
    status: "Planned",
  },
];

const metricStyles: Record<string, string> = {
  navy: "border-[#0f2742] bg-[#0f2742] text-white",
  blue: "border-[#2f789e] bg-[#2f789e] text-white",
  soft: "border-[#d6e6f5] bg-[#e9f1fa] text-[#0f2742]",
  white: "border-slate-200 bg-white text-[#0f2742]",
};

function readSubmissions() {
  try {
    return JSON.parse(
      window.localStorage.getItem(SUBMISSIONS_KEY) || "[]",
    ) as ProducerSubmission[];
  } catch {
    return [];
  }
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function statusStyle(status: ProducerSubmission["status"]) {
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

export default function ProducerDashboardPage() {
  const [submissions, setSubmissions] = useState<ProducerSubmission[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSubmissions(readSubmissions());
    setReady(true);
  }, []);

  const metrics = useMemo(
    () => [
      {
        label: "Demo projects",
        value: String(demoProjects.slice(0, 3).length).padStart(2, "0"),
        detail: "Fictional portfolio projects",
        tone: "navy",
      },
      {
        label: "Your submissions",
        value: String(submissions.length).padStart(2, "0"),
        detail: "Saved in this browser",
        tone: "blue",
      },
      {
        label: "Under review",
        value: String(
          submissions.filter((project) => project.status === "Under review")
            .length,
        ).padStart(2, "0"),
        detail: "Demo review workflow",
        tone: "soft",
      },
      {
        label: "Workspace mode",
        value: "Demo",
        detail: "No real funding or payments",
        tone: "white",
      },
    ],
    [submissions],
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-xl font-black tracking-tight">
            FILM<span className="text-[#00ABE4]">TRADE</span>
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Investor demo
            </a>

            <a
              href="/activity"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Activity
            </a>

            <span className="rounded-xl bg-[#0f2742] px-4 py-2 text-sm font-black text-white">
              Producer demo
            </span>
          </div>
        </header>

        <section className="relative mt-7 overflow-hidden rounded-[30px] border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#b9e6ff] blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087ba8]">
                Producer workspace
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Submit a project for demo review.
              </h1>

              <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                Create a project record, preview it, and submit it into a local
                demo review workflow. Submissions stay only in this browser.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/producer/create"
                  className="rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]"
                >
                  Create demo project
                </a>

                <a
                  href="/discover"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
                >
                  View public projects
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Demo workspace status
              </p>

              <p className="mt-4 text-3xl font-black">Active</p>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Project submissions, verification progress, and reporting are
                interface simulations only.
              </p>

              <span className="mt-5 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-black text-sky-100">
                No real money or reporting
              </span>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className={`min-h-[145px] rounded-2xl border p-5 shadow-sm ${metricStyles[metric.tone]}`}
            >
              <p className="text-xs font-black">{metric.label}</p>
              <p className="mt-4 text-3xl font-black tracking-tight">
                {metric.value}
              </p>
              <p className="mt-2 text-xs font-semibold opacity-75">
                {metric.detail}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                  Your submissions
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Local project review queue
                </h2>
              </div>

              <a
                href="/producer/create"
                className="text-sm font-black text-[#087ba8]"
              >
                Create project →
              </a>
            </div>

            {!ready && (
              <div className="mt-6 space-y-4">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="h-32 animate-pulse rounded-3xl bg-slate-200"
                  />
                ))}
              </div>
            )}

            {ready && submissions.length === 0 && (
              <div className="mt-6 rounded-3xl border border-dashed border-[#9fcce6] bg-[#e9f1fa] p-8">
                <p className="text-xl font-black">No project submissions yet.</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                  Create one demo project to see it appear here with a draft,
                  submitted, or review status.
                </p>

                <a
                  href="/producer/create"
                  className="mt-6 inline-block rounded-xl bg-[#0f2742] px-5 py-3 text-sm font-black text-white"
                >
                  Create first project
                </a>
              </div>
            )}

            {ready && submissions.length > 0 && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {submissions.map((project) => (
                  <article
                    key={project.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#087ba8]">
                          {project.language} · {project.stage}
                        </p>
                        <h3 className="mt-2 text-2xl font-black">
                          {project.title}
                        </h3>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${statusStyle(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-bold text-slate-600">
                      {project.genre} · {project.director}
                    </p>

                    <div className="mt-5 rounded-2xl bg-[#f8fafc] p-4 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="font-bold text-slate-500">Lead cast</span>
                        <span className="text-right font-black">
                          {project.leadCast}
                        </span>
                      </div>

                      <div className="mt-3 flex justify-between gap-4">
                        <span className="font-bold text-slate-500">
                          Release plan
                        </span>
                        <span className="text-right font-black">
                          {project.releasePlan}
                        </span>
                      </div>

                      <div className="mt-3 flex justify-between gap-4">
                        <span className="font-bold text-slate-500">Created</span>
                        <span className="text-right font-black">
                          {formatDate(project.createdAt)}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`/producer/projects/${encodeURIComponent(project.id)}`}
                      className="mt-5 block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                    >
                      Open submission
                    </a>
                  </article>
                ))}
              </div>
            )}

            <section className="mt-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Demo portfolio
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Fictional project workspace
              </h2>

              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {demoProjects.slice(0, 3).map((project) => (
                  <article
                    key={project.slug}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div
                      className={`relative h-40 overflow-hidden bg-gradient-to-br ${project.poster} p-5 text-white`}
                    >
                      <div
                        className={`absolute -right-8 -top-8 h-36 w-36 ${project.glow} blur-2xl`}
                      />

                      <div className="relative flex h-full flex-col justify-between">
                        <span className="w-fit rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[9px] font-black tracking-[0.12em] backdrop-blur-sm">
                          FICTIONAL DEMO
                        </span>

                        <div>
                          <p className="text-[9px] font-black tracking-[0.2em] text-white/70">
                            PROJECT
                          </p>
                          <p className="mt-1 text-3xl font-black leading-none">
                            {project.artwork}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-black">{project.title}</h3>
                      <p className="mt-1 text-sm font-bold text-[#087ba8]">
                        {project.genre}
                      </p>

                      <a
                        href={`/projects/${project.slug}`}
                        className="mt-5 block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                      >
                        Open project
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Milestone tracker
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight">
                Illustrative production progress
              </h2>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {milestones.map((milestone) => (
                  <article
                    key={milestone.title}
                    className="border-b border-slate-100 p-5 last:border-0 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-black">{milestone.title}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {milestone.stage}
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
                        {milestone.progress}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <span
                          className="block h-full rounded-full bg-[#00ABE4]"
                          style={{ width: `${milestone.percent}%` }}
                        />
                      </div>

                      <span className="text-sm font-black text-[#0f2742]">
                        {milestone.percent}%
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ABE4]">
                Submission flow
              </p>

              <div className="mt-5 space-y-3">
                {[
                  ["1", "Create project", "Enter public project information."],
                  ["2", "Preview record", "Review the demo project card."],
                  ["3", "Submit", "Save it into the local review queue."],
                  ["4", "Admin review", "Use the demo admin page to change status."],
                ].map(([number, title, detail]) => (
                  <div
                    key={number}
                    className="flex gap-3 rounded-2xl bg-[#f8fafc] p-4"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-sm font-black text-[#087ba8] shadow-sm">
                      {number}
                    </span>

                    <div>
                      <p className="text-sm font-black">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Mock reporting
              </p>

              <h2 className="mt-3 text-2xl font-black">Project report queue</h2>

              <div className="mt-5 space-y-3">
                {reports.map((report) => (
                  <div key={report.title} className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black">{report.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-300">
                          {report.label}
                        </p>
                      </div>

                      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-sky-100">
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="/activity"
                className="mt-6 block rounded-xl bg-[#00ABE4] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#008fbe]"
              >
                View activity log
              </a>
            </section>

            <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Demo notice
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                This workspace does not process funding, investments, revenue,
                legal verification, payments, or personal identity documents.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}