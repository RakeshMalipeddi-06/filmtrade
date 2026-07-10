"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

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
    return "The demo review is marked complete. This is only a UI status, not real verification.";
  }

  if (status === "Needs changes") {
    return "The demo reviewer has requested changes to this project record.";
  }

  if (status === "Under review") {
    return "This local project record is currently waiting for a demo review decision.";
  }

  if (status === "Submitted") {
    return "This project has been submitted into the local demo review queue.";
  }

  return "This project is saved as a local draft and has not been submitted yet.";
}

function getSourceLinks(value: string) {
  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter((item) => item.startsWith("http://") || item.startsWith("https://"));
}

export default function ProducerProjectDetailsPage() {
  const params = useParams();
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [project, setProject] = useState<ProducerSubmission | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const found = readSubmissions().find((item) => item.id === projectId) ?? null;

    setProject(found);
    setReady(true);
  }, [projectId]);

  const sourceLinks = useMemo(
    () => (project ? getSourceLinks(project.sourceLinks) : []),
    [project],
  );

  if (!ready) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8fafc] px-5">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8fafc] px-5 py-8 text-[#0f172a]">
        <section className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
            Project not found
          </p>

          <h1 className="mt-4 text-3xl font-black">
            This local project record is unavailable.
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            It may have been removed from browser storage, or this link belongs
            to a different browser session.
          </p>

          <a
            href="/producer"
            className="mt-7 inline-block rounded-xl bg-[#0f2742] px-5 py-3 text-sm font-black text-white"
          >
            Back to producer dashboard
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <a href="/producer" className="text-sm font-black text-[#087ba8]">
            ← Back to producer dashboard
          </a>

          <div className="flex flex-wrap gap-3">
            <a
              href={`/producer/create?edit=${encodeURIComponent(project.id)}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Edit project
            </a>

            <a
              href="/admin"
              className="rounded-xl bg-[#0f2742] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#1c4267]"
            >
              Open admin review
            </a>
          </div>
        </header>

        <section className="mt-7 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[380px_minmax(0,1fr)]">
            <div className="relative min-h-[390px] overflow-hidden bg-[radial-gradient(circle_at_top_right,#9ddcff,transparent_35%),linear-gradient(145deg,#0f2742,#275f93)] p-7 text-white">
              {project.posterUrl && (
                <img
                  src={project.posterUrl}
                  alt={`${project.title} poster`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,31,0.1),rgba(4,14,31,0.88))]" />

              <div className="relative flex h-full min-h-[330px] flex-col justify-between">
                <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-black tracking-[0.14em] backdrop-blur-sm">
                  PRODUCER SUBMISSION
                </span>

                <div>
                  <p className="text-xs font-black tracking-[0.18em] text-white/70">
                    {project.language.toUpperCase()} · {project.stage.toUpperCase()}
                  </p>

                  <h1 className="mt-3 text-4xl font-black leading-none">
                    {project.title}
                  </h1>

                  <p className="mt-4 text-sm font-bold text-white/80">
                    {project.genre}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-7 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                    Project review record
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-tight">
                    {project.title}
                  </h2>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-xs font-black ${statusStyle(project.status)}`}
                >
                  {project.status}
                </span>
              </div>

              <p className="mt-6 leading-7 text-slate-600">{project.synopsis}</p>

              <div className="mt-7 rounded-2xl border border-[#d6e6f5] bg-[#e9f1fa] p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#087ba8]">
                  Current workflow status
                </p>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {statusDescription(project.status)}
                </p>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  ["Director", project.director],
                  ["Lead cast", project.leadCast],
                  ["Budget range", project.budgetRange],
                  ["Release plan", project.releasePlan],
                  ["Created", formatDate(project.createdAt)],
                  ["Last updated", formatDate(project.updatedAt)],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-4"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                      {label}
                    </p>

                    <p className="mt-2 text-sm font-black leading-6">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
              Official source links
            </p>

            {sourceLinks.length === 0 ? (
              <div className="mt-5 rounded-2xl bg-[#f8fafc] p-5">
                <p className="font-black">No source links added.</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Add official announcement or production links through Edit project.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {sourceLinks.map((link, index) => (
                  <a
                    key={`${link}-${index}`}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-2xl border border-slate-200 bg-[#f8fafc] p-4 transition hover:border-[#00ABE4] hover:bg-[#e9f1fa]"
                  >
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-[#087ba8]">
                      Source {index + 1}
                    </p>

                    <p className="mt-2 break-all text-sm font-bold text-slate-700">
                      {link}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </article>

          <aside className="rounded-3xl bg-[#0f2742] p-7 text-white shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">
              Demo boundary
            </p>

            <h2 className="mt-3 text-2xl font-black">
              Local project record only
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              This page is a student-project demo. It does not publish a real
              film listing, verify ownership, collect money, approve funding,
              or process investments.
            </p>

            <a
              href={`/producer/create?edit=${encodeURIComponent(project.id)}`}
              className="mt-7 block rounded-xl bg-[#00ABE4] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-[#008fbe]"
            >
              Edit this project
            </a>
          </aside>
        </section>
      </div>
    </main>
  );
}