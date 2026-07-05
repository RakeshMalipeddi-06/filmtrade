import { demoProjects } from "@/data/demoProjects";

const trendBars = [42, 56, 48, 71, 65, 84, 78];

function getTrend(projectPulse: number) {
  const offset = Math.max(0, Math.min(5, Math.floor((projectPulse - 70) / 4)));
  return trendBars.map((bar, index) => Math.min(92, bar + offset * (index % 3 === 0 ? 2 : 1)));
}

export default function FilmPulsePage() {
  const rankedProjects = [...demoProjects].sort((a, b) => b.pulse - a.pulse);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <a href="/dashboard" className="text-sm font-black text-[#00ABE4]">
          ← Back to dashboard
        </a>

        <section className="mt-5 overflow-hidden rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                FilmTrade intelligence
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                FilmPulse rankings.
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                A fictional project-health view that combines local demo signals into one simple score for product exploration.
              </p>
              <span className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
                All scores are illustrative demo simulations
              </span>
            </div>

            <div className="rounded-3xl bg-[#0f2742] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">How to read FilmPulse</p>
              <p className="mt-4 text-3xl font-black text-[#7edfff]">0–100</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                A UI-only composite indicator. It is not a prediction, recommendation, or real-world performance measure.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Highest signal", `${rankedProjects[0].pulse}`, rankedProjects[0].title],
            ["Projects ranked", `${rankedProjects.length}`, "Fictional local projects"],
            ["Rising signals", "02", "Illustrative momentum labels"],
            ["Data source", "Local", "No external API used"],
          ].map(([label, value, detail]) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-black">{label}</p>
              <p className="mt-4 text-3xl font-black text-[#0f2742]">{value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
              <span className="mt-4 inline-block rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
                Demo simulation
              </span>
            </article>
          ))}
        </section>

        <section className="mt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Project ranking</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Fictional projects, ranked by FilmPulse.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Trend visuals are decorative representations of local mock data.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[64px_minmax(180px,1.5fr)_120px_130px_130px] gap-4 border-b border-slate-200 bg-[#f8fafc] px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500 lg:grid">
              <span>Rank</span>
              <span>Project</span>
              <span>FilmPulse</span>
              <span>Momentum</span>
              <span>Trend</span>
            </div>

            {rankedProjects.map((project, index) => (
              <a
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="grid gap-4 border-b border-slate-100 px-5 py-5 transition hover:bg-[#f8fcff] last:border-0 lg:grid-cols-[64px_minmax(180px,1.5fr)_120px_130px_130px] lg:items-center lg:px-6"
              >
                <span className="text-xl font-black text-[#00ABE4]">0{index + 1}</span>

                <div className="flex min-w-0 items-center gap-4">
                  <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${project.poster} text-xs font-black text-white`}>
                    {project.artwork.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-black">{project.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {project.genre} · {project.stage} · Demo simulation
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400 lg:hidden">FilmPulse</p>
                  <p className="text-2xl font-black text-[#0f2742]">{project.pulse}</p>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400 lg:hidden">Momentum</p>
                  <span className="inline-block rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
                    {project.momentum}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-400 lg:hidden">Illustrative trend</p>
                  <div className="mt-2 flex h-9 items-end gap-1 lg:mt-0">
                    {getTrend(project.pulse).map((height, barIndex) => (
                      <span
                        key={`${project.slug}-${barIndex}`}
                        className="w-2 rounded-t bg-[#00ABE4]/70"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Signal glossary</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["FilmPulse", "A fictional composite score for this portfolio UI."],
                ["Momentum", "A mock label showing illustrative movement."],
                ["Trust", "A demo information-quality label, not verification."],
                ["Risk", "A mock category, not financial or legal advice."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-[#f8fafc] p-5">
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl bg-[#0f2742] p-7 text-white shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">Demo notice</p>
            <h2 className="mt-3 text-2xl font-black">Designed for product exploration.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              FilmPulse is a student-project interface concept. It does not use real audience data, market data, financial data, forecasts, or investment recommendations.
            </p>
            <a href="/discover" className="mt-7 inline-block rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white">
              Explore demo projects
            </a>
          </article>
        </section>
      </div>
    </main>
  );
}