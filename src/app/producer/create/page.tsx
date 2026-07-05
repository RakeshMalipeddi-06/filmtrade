"use client";

import { FormEvent, useState } from "react";

const genres = ["Drama", "Mystery", "Science fiction", "Thriller", "Romance", "Documentary concept"];
const stages = ["Concept", "Development", "Production planning", "Production", "Release preparation"];
const artDirections = [
  { value: "blue", label: "Blue horizon", detail: "Cool cinematic blue composition" },
  { value: "violet", label: "Violet orbit", detail: "Futuristic purple composition" },
  { value: "gold", label: "Golden frame", detail: "Warm editorial composition" },
];

export default function CreateProducerProjectPage() {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState(genres[0]);
  const [stage, setStage] = useState(stages[0]);
  const [artDirection, setArtDirection] = useState(artDirections[0].value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f8fafc] px-5 py-8 text-[#0f172a]">
        <section className="w-full max-w-2xl rounded-3xl border border-[#d6e6f5] bg-white p-8 text-center shadow-sm sm:p-12">
          <span className="grid mx-auto h-16 w-16 place-items-center rounded-3xl bg-[#e9f1fa] text-3xl font-black text-[#087ba8]">
            ✓
          </span>
          <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
            Demo project created
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight">
            Your fictional project draft is ready.
          </h1>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
            This success state is a UI-only simulation. No project was saved, no data was submitted, and no financial or production workflow was created.
          </p>

          <div className="mt-8 rounded-2xl bg-[#f8fafc] p-5 text-left">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">Draft summary</p>
            <p className="mt-3 text-lg font-black">{title || "Untitled fictional project"}</p>
            <p className="mt-2 text-sm text-slate-600">{genre} · {stage} · {artDirections.find((item) => item.value === artDirection)?.label}</p>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => setSubmitted(false)}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
            >
              Create another demo
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
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/producer" className="text-sm font-black text-[#00ABE4]">
            ← Back to producer dashboard
          </a>
          <span className="rounded-full bg-[#e9f1fa] px-4 py-2 text-xs font-black text-[#087ba8]">
            UI-only demo form
          </span>
        </div>

        <section className="mt-6 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
            Producer workspace
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
            Create a fictional project.
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            Use this form to explore the producer workflow. It creates a local visual draft only and does not save project data.
          </p>
        </section>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Project basics
              </p>

              <div className="mt-6 grid gap-5">
                <label>
                  <span className="text-sm font-black">Project title</span>
                  <input
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Example: The Silent Harbour"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>

                <label>
                  <span className="text-sm font-black">Short logline</span>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write a short fictional story summary for this demo project..."
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#00ABE4] focus:bg-white"
                  />
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label>
                    <span className="text-sm font-black">Genre</span>
                    <select
                      value={genre}
                      onChange={(event) => setGenre(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition focus:border-[#00ABE4] focus:bg-white"
                    >
                      {genres.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>

                  <label>
                    <span className="text-sm font-black">Production stage</span>
                    <select
                      value={stage}
                      onChange={(event) => setStage(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f8fafc] px-4 py-3 text-sm font-medium outline-none transition focus:border-[#00ABE4] focus:bg-white"
                    >
                      {stages.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Poster-art direction
              </p>
              <h2 className="mt-3 text-2xl font-black">Choose a CSS-only visual mood.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This does not upload or generate an image. It only selects a future fictional card style.
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
                    <span className={`block h-20 rounded-xl ${
                      option.value === "blue"
                        ? "bg-gradient-to-br from-[#142b50] via-[#275f93] to-[#9ddcff]"
                        : option.value === "violet"
                          ? "bg-gradient-to-br from-[#2b174c] via-[#8c4a88] to-[#ffbd8e]"
                          : "bg-gradient-to-br from-[#26311f] via-[#91723f] to-[#f4d78a]"
                    }`} />
                    <p className="mt-4 text-sm font-black">{option.label}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-500">{option.detail}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Demo project preview
              </p>
              <div className={`mt-5 rounded-2xl p-5 text-white ${
                artDirection === "blue"
                  ? "bg-gradient-to-br from-[#142b50] via-[#275f93] to-[#9ddcff]"
                  : artDirection === "violet"
                    ? "bg-gradient-to-br from-[#2b174c] via-[#8c4a88] to-[#ffbd8e]"
                    : "bg-gradient-to-br from-[#26311f] via-[#91723f] to-[#f4d78a]"
              }`}>
                <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.14em]">
                  FICTIONAL PROJECT
                </span>
                <p className="mt-12 text-3xl font-black leading-none">
                  {title || "UNTITLED"}
                </p>
                <p className="mt-3 text-xs font-bold text-white/80">{genre} · {stage}</p>
              </div>
            </section>

            <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Submission boundary
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This form does not create a real project, save a record, collect funding information, upload files, or initiate any investment workflow.
              </p>
            </section>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#00ABE4] px-5 py-3.5 text-sm font-black text-white transition hover:bg-[#008fbe]"
            >
              Create demo project
            </button>
          </aside>
        </form>
      </div>
    </main>
  );
}