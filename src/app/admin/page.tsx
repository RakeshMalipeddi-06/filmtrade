"use client";

import { useState } from "react";
import { demoProjects } from "@/data/demoProjects";

type ReviewStatus = "Pending review" | "Approved demo" | "Needs update";

const initialReviews: Array<{
  slug: string;
  status: ReviewStatus;
  submitted: string;
  checks: string[];
}> = [
  {
    slug: "after-the-monsoon",
    status: "Pending review",
    submitted: "Today · 10:24 AM",
    checks: ["Project summary present", "Demo poster style selected", "Milestone draft available"],
  },
  {
    slug: "orbit-47",
    status: "Needs update",
    submitted: "Yesterday · 4:18 PM",
    checks: ["Project summary present", "Stage label needs review", "Demo disclosure visible"],
  },
  {
    slug: "the-last-frame",
    status: "Approved demo",
    submitted: "Monday · 11:05 AM",
    checks: ["Project summary present", "Demo labels visible", "Public card ready"],
  },
];

const statusStyles: Record<ReviewStatus, string> = {
  "Pending review": "bg-[#e9f1fa] text-[#087ba8]",
  "Approved demo": "bg-emerald-50 text-emerald-700",
  "Needs update": "bg-amber-50 text-amber-700",
};

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [notice, setNotice] = useState("");

  function updateStatus(slug: string, status: ReviewStatus) {
    setReviews((current) =>
      current.map((review) =>
        review.slug === slug ? { ...review, status } : review,
      ),
    );

    setNotice(`Demo review status updated to "${status}". Nothing was saved.`);
  }

  const pendingCount = reviews.filter((review) => review.status === "Pending review").length;
  const approvedCount = reviews.filter((review) => review.status === "Approved demo").length;
  const updateCount = reviews.filter((review) => review.status === "Needs update").length;

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-xl font-black tracking-tight">
            FILM<span className="text-[#00ABE4]">TRADE</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Investor demo
            </a>
            <a
              href="/producer"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Producer demo
            </a>
            <span className="rounded-xl bg-[#0f2742] px-4 py-2 text-sm font-black text-white">
              Admin demo
            </span>
          </div>
        </div>

        <section className="relative mt-7 overflow-hidden rounded-[30px] border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#b9e6ff] blur-3xl" />
          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087ba8]">
                Admin review workspace
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Review fictional project submissions.
              </h1>
              <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                A pitch-ready admin concept for reviewing demo project information, visible disclosures, and illustrative workflow readiness.
              </p>
            </div>

            <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
              UI-only review simulation
            </span>
          </div>
        </section>

        <section className="relative z-10 -mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["Pending review", pendingCount, "Fictional submissions awaiting a demo decision", "bg-[#0f2742] text-white"],
            ["Approved demo", approvedCount, "Ready for public prototype display", "bg-[#2f789e] text-white"],
            ["Needs update", updateCount, "Mock information or label changes requested", "bg-white text-[#0f2742] border border-slate-200"],
          ].map(([label, value, detail, style]) => (
            <article key={label} className={`rounded-2xl p-5 shadow-sm ${style}`}>
              <p className="text-xs font-black">{label}</p>
              <p className="mt-3 text-3xl font-black">{value}</p>
              <p className="mt-2 text-xs leading-5 opacity-75">{detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                  Review queue
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Project submission review
                </h2>
              </div>
              <span className="text-sm font-bold text-slate-500">
                Local fictional data only
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {reviews.map((review) => {
                const project = demoProjects.find((item) => item.slug === review.slug);

                if (!project) return null;

                return (
                  <article
                    key={review.slug}
                    className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="grid md:grid-cols-[180px_minmax(0,1fr)]">
                      <div className={`relative min-h-[190px] overflow-hidden bg-gradient-to-br ${project.poster} p-5 text-white`}>
                        <div className={`absolute -right-8 -top-8 h-36 w-36 ${project.glow} blur-2xl`} />
                        <div className={`absolute -bottom-10 -left-10 h-32 w-32 ${project.shape}`} />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(4,14,31,0.78)_100%)]" />
                        <div className="relative flex h-full flex-col justify-between">
                          <span className="w-fit rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[9px] font-black tracking-[0.12em] backdrop-blur-sm">
                            DEMO PROJECT
                          </span>
                          <p className="text-3xl font-black leading-none">{project.artwork}</p>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#087ba8]">
                              {project.genre}
                            </p>
                            <h3 className="mt-2 text-2xl font-black">{project.title}</h3>
                            <p className="mt-2 text-sm text-slate-500">
                              Submitted {review.submitted}
                            </p>
                          </div>

                          <span className={`w-fit rounded-full px-3 py-1.5 text-xs font-black ${statusStyles[review.status]}`}>
                            {review.status}
                          </span>
                        </div>

                        <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
                          {project.description}
                        </p>

                        <div className="mt-5 grid gap-2 sm:grid-cols-3">
                          {review.checks.map((check) => (
                            <div key={check} className="rounded-xl bg-[#f8fafc] px-3 py-3 text-xs font-bold text-slate-600">
                              <span className="mr-2 text-[#00ABE4]">✓</span>
                              {check}
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <a
                            href={`/projects/${project.slug}`}
                            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                          >
                            View public page
                          </a>
                          <button
                            type="button"
                            onClick={() => updateStatus(project.slug, "Approved demo")}
                            className="rounded-xl bg-[#00ABE4] px-4 py-2.5 text-sm font-black text-white transition hover:bg-[#008fbe]"
                          >
                            Approve demo
                          </button>
                          <button
                            type="button"
                            onClick={() => updateStatus(project.slug, "Needs update")}
                            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-black text-amber-700 transition hover:bg-amber-100"
                          >
                            Request update
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Mock verification checks
              </p>
              <h2 className="mt-3 text-2xl font-black">Visible demo boundaries</h2>

              <div className="mt-5 space-y-3">
                {[
                  "Fictional project disclosure",
                  "No real payment language",
                  "No return or revenue promise",
                  "No KYC document collection",
                  "No real compliance decision",
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl bg-white/10 p-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#00ABE4] text-xs font-black text-[#0f2742]">
                      ✓
                    </span>
                    <p className="text-sm font-bold leading-6 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ABE4]">
                Audit-style activity
              </p>

              <div className="mt-5 space-y-4">
                {[
                  ["Project submitted", "After the Monsoon entered the demo queue", "10:24 AM"],
                  ["Label checked", "Orbit 47 disclosure requires an update", "Yesterday"],
                  ["Demo approved", "The Last Frame is ready for public display", "Monday"],
                ].map(([title, detail, time]) => (
                  <div key={title} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#00ABE4]" />
                    <div>
                      <p className="text-sm font-black">{title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{detail}</p>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-400">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Demo notice
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This admin page is a visual prototype only. It does not approve real projects, verify people, perform KYC or AML checks, store review decisions, or provide compliance services.
              </p>
            </section>
          </aside>
        </section>

        {notice && (
          <div className="fixed bottom-5 right-5 max-w-sm rounded-xl bg-[#0f2742] px-4 py-3 text-sm font-bold text-white shadow-xl">
            {notice}
          </div>
        )}
      </div>
    </main>
  );
}