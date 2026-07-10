"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

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

const genres = [
  "Drama",
  "Action",
  "Thriller",
  "Romance",
  "Science fiction",
  "Mystery",
  "Documentary concept",
];

const stages = [
  "Concept",
  "Development",
  "Production planning",
  "Production",
  "Release preparation",
];

const languages = [
  "Telugu",
  "Hindi",
  "Tamil",
  "Malayalam",
  "Kannada",
  "Pan-India",
];

const artDirections = [
  {
    value: "blue",
    label: "Blue horizon",
    detail: "Cool cinematic blue composition",
  },
  {
    value: "violet",
    label: "Violet orbit",
    detail: "Futuristic purple composition",
  },
  {
    value: "gold",
    label: "Golden frame",
    detail: "Warm editorial composition",
  },
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
    // The project form should still work if browser storage is unavailable.
  }
}

function createId() {
  return `producer-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function cardGradient(artDirection: string) {
  if (artDirection === "violet") {
    return "bg-gradient-to-br from-[#2b174c] via-[#8c4a88] to-[#ffbd8e]";
  }

  if (artDirection === "gold") {
    return "bg-gradient-to-br from-[#26311f] via-[#91723f] to-[#f4d78a]";
  }

  return "bg-gradient-to-br from-[#142b50] via-[#275f93] to-[#9ddcff]";
}

export default function CreateProducerProjectPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedStatus, setSavedStatus] = useState<SubmissionStatus>("Draft");

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState(languages[0]);
  const [genre, setGenre] = useState(genres[0]);
  const [stage, setStage] = useState(stages[0]);
  const [director, setDirector] = useState("");
  const [leadCast, setLeadCast] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [releasePlan, setReleasePlan] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [sourceLinks, setSourceLinks] = useState("");
  const [artDirection, setArtDirection] = useState(artDirections[0].value);

  useEffect(() => {
    if (!editId) {
      setReady(true);
      return;
    }

    const existing = readSubmissions().find((item) => item.id === editId);

    if (existing) {
      setTitle(existing.title);
      setLanguage(existing.language);
      setGenre(existing.genre);
      setStage(existing.stage);
      setDirector(existing.director);
      setLeadCast(existing.leadCast);
      setBudgetRange(existing.budgetRange);
      setReleasePlan(existing.releasePlan);
      setSynopsis(existing.synopsis);
      setPosterUrl(existing.posterUrl);
      setSourceLinks(existing.sourceLinks);
      setSavedStatus(existing.status);
    }

    setReady(true);
  }, [editId]);

  const previewTitle = title.trim() || "UNTITLED PROJECT";
  const isEditing = Boolean(editId);

  const summary = useMemo(
    () => ({
      title: previewTitle,
      language,
      genre,
      stage,
      director: director.trim() || "Not added",
      leadCast: leadCast.trim() || "Not added",
      budgetRange: budgetRange.trim() || "Not added",
      releasePlan: releasePlan.trim() || "Not added",
    }),
    [
      previewTitle,
      language,
      genre,
      stage,
      director,
      leadCast,
      budgetRange,
      releasePlan,
    ],
  );

  function saveProject(status: SubmissionStatus) {
    const now = new Date().toISOString();
    const existing = readSubmissions();
    const existingProject = editId
      ? existing.find((item) => item.id === editId)
      : undefined;

    const project: ProducerSubmission = {
      id: existingProject?.id ?? createId(),
      title: title.trim() || "Untitled project",
      language,
      genre,
      stage,
      director: director.trim() || "Not publicly confirmed",
      leadCast: leadCast.trim() || "Not publicly confirmed",
      budgetRange: budgetRange.trim() || "Not specified",
      releasePlan: releasePlan.trim() || "Not specified",
      synopsis: synopsis.trim() || "No synopsis added.",
      posterUrl: posterUrl.trim(),
      sourceLinks: sourceLinks.trim(),
      status,
      createdAt: existingProject?.createdAt ?? now,
      updatedAt: now,
    };

    const next = existingProject
      ? existing.map((item) => (item.id === existingProject.id ? project : item))
      : [project, ...existing];

    saveSubmissions(next);

    addActivity(
      status === "Submitted"
        ? `Producer submitted "${project.title}" for demo review.`
        : `Producer saved "${project.title}" as a draft.`,
    );

    setSavedStatus(status);
    setSaved(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveProject("Submitted");
  }

  if (!ready) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8fafc] px-5">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-slate-200" />
      </main>
    );
  }

  if (saved) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8fafc] px-5 py-8 text-[#0f172a]">
        <section className="w-full max-w-2xl rounded-3xl border border-[#d6e6f5] bg-white p-8 text-center shadow-sm sm:p-12">
          <span className="grid mx-auto h-16 w-16 place-items-center rounded-3xl bg-[#e9f1fa] text-3xl font-black text-[#087ba8]">
            ✓
          </span>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
            Demo project {savedStatus === "Submitted" ? "submitted" : "saved"}
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight">
            {savedStatus === "Submitted"
              ? "Your project is in the demo review queue."
              : "Your project draft is saved locally."}
          </h1>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
            This record exists only in this browser. It does not create a real
            film listing, collect funding, verify documents, or process money.
          </p>

          <div className="mt-8 rounded-2xl bg-[#f8fafc] p-5 text-left">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
              Submission summary
            </p>

            <p className="mt-3 text-lg font-black">{summary.title}</p>

            <p className="mt-2 text-sm text-slate-600">
              {summary.language} · {summary.genre} · {summary.stage}
            </p>

            <span className="mt-4 inline-block rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
              {savedStatus}
            </span>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setSaved(false)}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
            >
              Edit project
            </button>

            <a
              href="/producer"
              className="rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]"
            >
              Back to producer dashboard
            </a>
          </div>
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

          <span className="rounded-full bg-[#e9f1fa] px-4 py-2 text-xs font-black text-[#087ba8]">
            Local demo form
          </span>
        </header>

        <section className="mt-6 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
            Producer workspace
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            {isEditing ? "Update your demo project." : "Create a demo project."}
          </h1>

          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Add public project details for a local portfolio workflow. Do not add
            personal identity documents, bank details, payment information, or
            confidential production information.
          </p>
        </section>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                Project basics
              </p>

              <div className="mt-6 grid gap-5">
                <label>
                  <span className="text-sm font-black">Project title *</span>
                  <input
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Example: The Silent Harbour"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="text-sm font-black">Synopsis *</span>
                  <textarea
                    required
                    rows={5}
                    value={synopsis}
                    onChange={(event) => setSynopsis(event.target.value)}
                    placeholder="Write a short public story summary..."
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="text-sm font-black">Primary language *</span>
                    <select
                      value={language}
                      onChange={(event) => setLanguage(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition focus:border-[#00ABE4] focus:bg-white"
                    >
                      {languages.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span className="text-sm font-black">Genre *</span>
                    <select
                      value={genre}
                      onChange={(event) => setGenre(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition focus:border-[#00ABE4] focus:bg-white"
                    >
                      {genres.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  <span className="text-sm font-black">Project stage *</span>
                  <select
                    value={stage}
                    onChange={(event) => setStage(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition focus:border-[#00ABE4] focus:bg-white"
                  >
                    {stages.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                Public project information
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label>
                  <span className="text-sm font-black">Director</span>
                  <input
                    value={director}
                    onChange={(event) => setDirector(event.target.value)}
                    placeholder="Publicly announced director"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="text-sm font-black">Lead cast</span>
                  <input
                    value={leadCast}
                    onChange={(event) => setLeadCast(event.target.value)}
                    placeholder="Publicly announced lead cast"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="text-sm font-black">Estimated budget range</span>
                  <input
                    value={budgetRange}
                    onChange={(event) => setBudgetRange(event.target.value)}
                    placeholder="Example: ₹20–30 crore"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="text-sm font-black">Release plan</span>
                  <input
                    value={releasePlan}
                    onChange={(event) => setReleasePlan(event.target.value)}
                    placeholder="Example: 2027 theatrical release"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5">
                <label>
                  <span className="text-sm font-black">Poster image URL</span>
                  <input
                    type="url"
                    value={posterUrl}
                    onChange={(event) => setPosterUrl(event.target.value)}
                    placeholder="Optional public poster image URL"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="text-sm font-black">Official source links</span>
                  <textarea
                    rows={3}
                    value={sourceLinks}
                    onChange={(event) => setSourceLinks(event.target.value)}
                    placeholder="Optional official announcement, production house, or media links"
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                Card appearance
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                This changes only the local preview style. It does not generate
                or upload an image.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {artDirections.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => setArtDirection(option.value)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      artDirection === option.value
                        ? "border-[#00ABE4] bg-[#e9f1fa]"
                        : "border-slate-200 bg-white hover:border-[#00ABE4]"
                    }`}
                  >
                    <span
                      className={`block h-20 rounded-xl ${cardGradient(
                        option.value,
                      )}`}
                    />

                    <p className="mt-4 text-sm font-black">{option.label}</p>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {option.detail}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="sticky top-6 rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Live preview
              </p>

              <div
                className={`relative mt-5 min-h-[260px] overflow-hidden rounded-2xl p-5 text-white ${cardGradient(
                  artDirection,
                )}`}
              >
                {posterUrl && (
                  <img
                    src={posterUrl}
                    alt={`${previewTitle} poster preview`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,14,31,0.1),rgba(4,14,31,0.82))]" />

                <div className="relative flex min-h-[220px] flex-col justify-between">
                  <span className="w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.14em] backdrop-blur">
                    DEMO SUBMISSION
                  </span>

                  <div>
                    <p className="text-xs font-black tracking-[0.16em] text-white/70">
                      {summary.language.toUpperCase()} · {summary.stage.toUpperCase()}
                    </p>

                    <p className="mt-3 text-3xl font-black leading-none">
                      {summary.title}
                    </p>

                    <p className="mt-3 text-sm font-bold text-white/80">
                      {summary.genre}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 rounded-2xl bg-white/10 p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-300">Director</span>
                  <span className="text-right font-black">{summary.director}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-300">Lead cast</span>
                  <span className="text-right font-black">{summary.leadCast}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-300">Release</span>
                  <span className="text-right font-black">
                    {summary.releasePlan}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => saveProject("Draft")}
                className="mt-6 w-full rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-sm font-black transition hover:bg-white/20"
              >
                Save draft locally
              </button>

              <button
                type="submit"
                className="mt-3 w-full rounded-xl bg-[#00ABE4] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#008fbe]"
              >
                Submit for demo review
              </button>
            </section>

            <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Submission boundary
              </p>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                This demo stores a project record only in this browser. It does
                not create a public listing, confirm ownership, collect money,
                verify identity, or initiate investment activity.
              </p>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}