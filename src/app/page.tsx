"use client";

import LoadingScreen from "@/components/LoadingScreen";

const rankings = [
  { rank: "01", title: "After the Monsoon", genre: "Drama", pulse: "91", momentum: "Strong", trust: "Demo: High", risk: "Demo: Low" },
  { rank: "02", title: "Orbit 47", genre: "Science fiction", pulse: "86", momentum: "Rising", trust: "Demo: Strong", risk: "Demo: Medium" },
  { rank: "03", title: "The Last Frame", genre: "Mystery", pulse: "82", momentum: "Steady", trust: "Demo: High", risk: "Demo: Low" },
];

const updates = [
  "Demo update: audience-interest signal added for After the Monsoon",
  "Demo update: Orbit 47 moved into the momentum watchlist",
  "Demo update: milestone review marked complete for The Last Frame",
];

export default function Home() {
  return (
    <>
      <LoadingScreen />

      <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
        <div className="border-b border-[#d6e6f5] bg-[#e9f1fa]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 text-xs font-semibold text-slate-600 sm:px-10 lg:px-16">
            <span className="font-black text-[#0f172a]">FILMPULSE MARKET INDEX</span>
            <span>Demo simulation</span>
            <span>Market sentiment: illustrative</span>
            <span>Projects monitored: fictional</span>
          </div>
        </div>

        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5 sm:px-10 lg:px-16">
            <a href="#" className="text-xl font-black tracking-tight">
              FILM<span className="text-[#00ABE4]">TRADE</span>
            </a>

            <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
              <a href="#command-center" className="hover:text-[#00ABE4]">Home</a>
              <a href="#rankings" className="hover:text-[#00ABE4]">FilmPulse</a>
              <a href="#activity" className="hover:text-[#00ABE4]">Activity</a>
              <a href="#trust" className="hover:text-[#00ABE4]">Trust</a>
            </nav>

            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-black shadow-sm transition hover:border-[#00ABE4] hover:text-[#00ABE4]">
              Demo access
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-10 lg:px-16">
          <section id="command-center" className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
            <article className="overflow-hidden rounded-3xl border border-[#d6e6f5] bg-white shadow-sm">
              <div className="grid min-h-[340px] gap-8 p-7 sm:p-10 md:grid-cols-[1fr_220px]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Market command center</p>
                  <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">What matters in film today.</h1>
                  <p className="mt-5 max-w-xl leading-7 text-slate-600">
                    Explore fictional project signals, transparent mock indicators, and a demo view of how FilmTrade could organize film intelligence.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button className="rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]">
                      View intelligence
                    </button>
                    <button className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#00ABE4]">
                      Create demo watchlist
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#0f172a] p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">Featured demo project</p>
                  <div className="mt-10">
                    <p className="text-3xl font-black">AFTER</p>
                    <p className="text-3xl font-black">THE MONSOON</p>
                  </div>
                  <div className="mt-10 border-t border-white/15 pt-4">
                    <p className="text-xs text-slate-300">FilmPulse</p>
                    <p className="mt-1 text-4xl font-black text-[#7edfff]">91</p>
                    <p className="mt-2 text-xs text-slate-300">Demo simulation · illustrative signal</p>
                  </div>
                </div>
              </div>
            </article>

            <aside className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">What matters today</p>
              <div className="mt-7 space-y-4">
                {[
                  ["Trending", "Fictional projects gaining attention"],
                  ["Momentum", "Illustrative signals moving upward"],
                  ["Trust", "Demo project information labels"],
                  ["Next step", "Explore FilmPulse rankings"],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl bg-white p-4">
                    <p className="font-black">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["FilmPulse", "A demo project-health indicator"],
              ["Momentum", "Illustrative audience-interest movement"],
              ["Trust", "Transparent demo information labels"],
              ["Risk", "Mock low, medium, and high categories"],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black text-[#0f172a]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                <span className="mt-4 inline-block rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">Demo simulation</span>
              </article>
            ))}
          </section>

          <section id="rankings" className="mt-16">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">FilmPulse rankings</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Fictional project intelligence.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-500">All scores and labels below are local mock data for this portfolio demo.</p>
            </div>

            <div className="mt-7 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[70px_1.5fr_repeat(4,1fr)] gap-4 border-b border-slate-200 bg-[#f8fafc] px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500 md:grid">
                <span>Rank</span><span>Project</span><span>FilmPulse</span><span>Momentum</span><span>Trust</span><span>Risk</span>
              </div>

              {rankings.map((project) => (
                <div key={project.title} className="grid gap-3 border-b border-slate-100 px-6 py-5 last:border-0 md:grid-cols-[70px_1.5fr_repeat(4,1fr)] md:items-center md:gap-4">
                  <span className="text-lg font-black text-[#00ABE4]">{project.rank}</span>
                  <div>
                    <p className="font-black">{project.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{project.genre} · Demo simulation</p>
                  </div>
                  <p><span className="font-black">{project.pulse}</span><span className="ml-2 text-sm text-slate-500">demo</span></p>
                  <p className="text-sm font-bold text-[#087ba8]">{project.momentum}</p>
                  <p className="text-sm font-bold text-slate-700">{project.trust}</p>
                  <p className="text-sm font-bold text-slate-700">{project.risk}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="activity" className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Live intelligence feed</p>
              <h2 className="mt-3 text-2xl font-black">Demo activity, clearly labelled.</h2>
              <div className="mt-7 space-y-4">
                {updates.map((update, index) => (
                  <div key={update} className="flex gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9f1fa] text-xs font-black text-[#087ba8]">0{index + 1}</span>
                    <p className="text-sm leading-6 text-slate-600">{update}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="trust" className="rounded-3xl bg-[#0f172a] p-7 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#7edfff]">Trust and transparency</p>
              <h2 className="mt-3 text-2xl font-black">Information before action.</h2>
              <p className="mt-4 leading-7 text-slate-300">
                FilmTrade demonstrates a product approach where users can inspect project context, milestones, and mock indicators before entering a simulated workflow.
              </p>
              <div className="mt-7 space-y-3">
                {[
                  "Project information includes demo source and confidence labels",
                  "Milestone tracking is shown as a mock workflow",
                  "Revenue sharing and payouts are demo simulations only",
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-slate-100">{item}</div>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-16 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] px-7 py-12 text-center sm:px-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">Portfolio project</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight">Discover how Film Intelligence could guide a better product experience.</h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">No real payments, investment activity, KYC, AML, escrow, revenue, or payouts are processed by this demo.</p>
            <button className="mt-8 rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]">Explore demo projects</button>
          </section>
        </div>
      </main>
    </>
  );
}