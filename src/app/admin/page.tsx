"use client";

import { useEffect, useMemo, useState } from "react";

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

type ActivityItem = {
  id: string;
  message: string;
  createdAt: string;
};

const SUBMISSIONS_KEY = "filmtrade-producer-submissions";
const ACTIVITY_KEY = "filmtrade-demo-activity";

const statusOptions: SubmissionStatus[] = [
  "Draft",
  "Submitted",
  "Under review",
  "Verified",
  "Needs changes",
];

function readSubmissions() {
  try {
    return JSON.parse(
      window.localStorage.getItem(SUBMISSIONS_KEY) || "[]",
    ) as ProducerSubmission[];
  } catch {
    return [];
  }
}

function saveSubmissions(submissions: ProducerSubmission[]) {
  window.localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
}

function addActivity(message: string) {
  try {
    const existing = JSON.parse(
      window.localStorage.getItem(ACTIVITY_KEY) || "[]",
    ) as ActivityItem[];

    const next: ActivityItem[] = [
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        message,
        createdAt: new Intl.DateTimeFormat("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date()),
      },
      ...existing,
    ];

    window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(next));
  } catch {
    // Keep the local admin flow usable even if storage is unavailable.
  }
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
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

function statusDescription(status: SubmissionStatus) {
  if (status === "Verified") {
    return "Demo review is complete. This is not a real verification.";
  }

  if (status === "Needs changes") {
    return "Mock reviewer requested changes to the project record.";
  }

  if (status === "Under review") {
    return "The local demo record is waiting for a review decision.";
  }

  if (status === "Submitted") {
    return "The producer submitted this record to the local demo queue.";
  }

  return "This project is still a local draft.";
}

export default function AdminReviewPage() {
  const [submissions, setSubmissions] = useState<ProducerSubmission[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setSubmissions(readSubmissions());
    setReady(true);
  }, []);

  const counts = useMemo(
    () => ({
      draft: submissions.filter((item) => item.status === "Draft").length,
      submitted: submissions.filter((item) => item.status === "Submitted").length,
      reviewing: submissions.filter((item) => item.status === "Under review")
        .length,
      verified: submissions.filter((item) => item.status === "Verified").length,
      changes: submissions.filter((item) => item.status === "Needs changes")
        .length,
    }),
    [submissions],
  );

  function updateStatus(id: string, nextStatus: SubmissionStatus) {
    const current = readSubmissions();
    const project = current.find((item) => item.id === id);

    if (!project) {
      setNotice("This local project record could not be found.");
      return;
    }

    const updated = current.map((item) =>
      item.id === id
        ? {
            ...item,
            status: nextStatus,
            updatedAt: new Date().toISOString(),
          }
        : item,
    );

    saveSubmissions(updated);
    setSubmissions(updated);

    addActivity(
      `Admin changed "${project.title}" from ${project.status} to ${nextStatus}.`,
    );

    setNotice(`"${project.title}" is now marked as ${nextStatus}.`);
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-xl font-black tracking-tight">
            FILM<span className="text-[#00ABE4]">TRADE</span>
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/producer"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Producer demo
            </a>

            <a
              href="/activity"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Activity
            </a>

            <span className="rounded-xl bg-[#0f2742] px-4 py-2 text-sm font-black text-white">
              Admin demo
            </span>
          </div>
        </header>

        <section className="relative mt-7 overflow-hidden rounded-[30px] border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#b9e6ff] blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087ba8]">
                Admin review workspace
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Review local demo submissions.
              </h1>

              <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                Change the workflow status of projects created in the Producer
                workspace. These changes are stored only in this browser.
              </p>
            </div>

            <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
              Local storage only
            </span>
          </div>
        </section>

        <section className="relative z-10 -mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Drafts", counts.draft, "Not submitted yet", "bg-white text-[#0f2742] border border-slate-200"],
            ["Submitted", counts.submitted, "Ready for review", "bg-[#0f2742] text-white"],
            ["Under review", counts.reviewing, "Mock review in progress", "bg-amber-100 text-amber-900"],
            ["Verified", counts.verified, "Demo workflow complete", "bg-emerald-100 text-emerald-900"],
            ["Needs changes", counts.changes, "Mock changes requested", "bg-red-100 text-red-900"],
          ].map(([label, value, detail, style]) => (
            <article key={label} className={`rounded-2xl p-5 shadow-sm ${style}`}>
              <p className="text-xs font-black">{label}</p>
              <p className="mt-3 text-3xl font-black">{value}</p>
              <p className="mt-2 text-xs leading-5 opacity-75">{detail}</p>
            </article>
          ))}
        </section>

        {!ready && (
          <section className="mt-10 space-y-5">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </section>
        )}

        {ready && submissions.length === 0 && (
          <section className="mt-10 rounded-3xl border border-dashed border-[#9fcce6] bg-[#e9f1fa] p-8">
            <p className="text-xl font-black">No producer submissions found.</p>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
              Create a demo project in the Producer workspace first. It will
              appear here for local status changes.
            </p>

            <a
              href="/producer/create"
              className="mt-6 inline-block rounded-xl bg-[#0f2742] px-5 py-3 text-sm font-black text-white"
            >
              Create demo project
            </a>
          </section>
        )}

        {ready && submissions.length > 0 && (
          <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                    Review queue
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight">
                    Producer project records
                  </h2>
                </div>

                <span className="text-sm font-bold text-slate-500">
                  {submissions.length} local record{submissions.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {submissions.map((project) => (
                  <article
                    key={project.id}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="grid md:grid-cols-[210px_minmax(0,1fr)]">
                      <div className="relative min-h-[210px] overflow-hidden bg-[radial-gradient(circle_at_top_right,#9ddcff,transparent_35%),linear-gradient(145deg,#0f2742,#275f93)] p-5 text-white">
                        {project.posterUrl && (
                          <img
                            src={project.posterUrl}
                            alt={`${project.title} poster`}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        )}

                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,31,0.1),rgba(4,14,31,0.84))]" />

                        <div className="relative flex h-full flex-col justify-between">
                          <span className="w-fit rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[9px] font-black tracking-[0.12em] backdrop-blur-sm">
                            PRODUCER SUBMISSION
                          </span>

                          <div>
                            <p className="text-xs font-black tracking-[0.16em] text-white/70">
                              {project.language.toUpperCase()} · {project.stage.toUpperCase()}
                            </p>

                            <p className="mt-2 text-3xl font-black leading-none">
                              {project.title}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#087ba8]">
                              {project.genre}
                            </p>

                            <h3 className="mt-2 text-2xl font-black">
                              {project.title}
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                              Created {formatDate(project.createdAt)} · Updated{" "}
                              {formatDate(project.updatedAt)}
                            </p>
                          </div>

                          <span
                            className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${statusStyle(project.status)}`}
                          >
                            {project.status}
                          </span>
                        </div>

                        <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
                          {project.synopsis}
                        </p>

                        <div className="mt-5 grid gap-3 rounded-2xl bg-[#f8fafc] p-4 text-sm sm:grid-cols-2">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                              Director
                            </p>
                            <p className="mt-1 font-black">{project.director}</p>
                          </div>

                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                              Lead cast
                            </p>
                            <p className="mt-1 font-black">{project.leadCast}</p>
                          </div>

                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                              Budget range
                            </p>
                            <p className="mt-1 font-black">{project.budgetRange}</p>
                          </div>

                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                              Release plan
                            </p>
                            <p className="mt-1 font-black">{project.releasePlan}</p>
                          </div>
                        </div>

                        <div className="mt-5 rounded-2xl border border-[#d6e6f5] bg-[#e9f1fa] p-4">
                          <p className="text-xs font-black uppercase tracking-[0.12em] text-[#087ba8]">
                            Current workflow meaning
                          </p>
                          <p className="mt-2 text-sm leading-6 text-slate-600">
                            {statusDescription(project.status)}
                          </p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <a
                            href={`/producer/projects/${encodeURIComponent(project.id)}`}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                          >
                            Open submission
                          </a>

                          <select
                            value={project.status}
                            onChange={(event) =>
                              updateStatus(
                                project.id,
                                event.target.value as SubmissionStatus,
                              )
                            }
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black outline-none transition focus:border-[#00ABE4]"
                          >
                            {statusOptions.map((status) => (
                              <option key={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <section className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                  Demo review rules
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  What this page does
                </h2>

                <div className="mt-5 space-y-3">
                  {[
                    "Updates local workflow labels",
                    "Writes a local activity item",
                    "Keeps the Producer dashboard in sync",
                    "Does not verify people or ownership",
                    "Does not approve investments or payments",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl bg-white/10 p-3"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#00ABE4] text-xs font-black text-[#0f2742]">
                        ✓
                      </span>

                      <p className="text-sm font-bold leading-6 text-slate-200">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                  Demo boundary
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  “Verified” is only a UI status in this student project. It is
                  not identity verification, legal approval, due diligence,
                  compliance, funding approval, or an investment recommendation.
                </p>
              </section>
            </aside>
          </section>
        )}

        {notice && (
          <div className="fixed bottom-5 right-5 max-w-sm rounded-xl bg-[#0f2742] px-4 py-3 text-sm font-bold text-white shadow-xl">
            {notice}
          </div>
        )}
      </div>
    </main>
  );
}