const projectCards = [
  {
    title: "After the Monsoon",
    genre: "Drama",
    pulse: "91",
    momentum: "Strong",
    trust: "High",
    risk: "Low",
    artwork: "MONSOON",
    poster: "from-[#4cc7f5] via-[#1679c9] to-[#12345b]",
    glow: "bg-white/20",
    shape: "rounded-full border-[18px] border-white/20",
  },
  {
    title: "Orbit 47",
    genre: "Science fiction",
    pulse: "86",
    momentum: "Rising",
    trust: "Strong",
    risk: "Medium",
    artwork: "ORBIT",
    poster: "from-[#7469ee] via-[#33398f] to-[#101735]",
    glow: "bg-indigo-200/25",
    shape: "rounded-full border-[14px] border-indigo-100/25",
  },
  {
    title: "The Last Frame",
    genre: "Mystery",
    pulse: "82",
    momentum: "Steady",
    trust: "High",
    risk: "Low",
    artwork: "FRAME",
    poster: "from-[#ffc73d] via-[#e55e2f] to-[#7b2038]",
    glow: "bg-amber-100/25",
    shape: "rotate-12 border-[16px] border-amber-100/25",
  },
  {
    title: "Paper Skies",
    genre: "Drama",
    pulse: "79",
    momentum: "Watching",
    trust: "Clear",
    risk: "Medium",
    artwork: "SKIES",
    poster: "from-[#31d3dc] via-[#129ca8] to-[#07546e]",
    glow: "bg-cyan-100/25",
    shape: "rounded-t-full border-[15px] border-cyan-100/25",
  },
];

const activity = [
  "Demo signal updated for After the Monsoon",
  "Mock milestone review completed for Orbit 47",
  "The Last Frame added to your demo watchlist",
  "Illustrative trust label refreshed for Paper Skies",
];

export default function DashboardPage() {
  return (
    <main className="p-5 sm:p-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0">
          <section className="relative overflow-hidden rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 sm:p-9">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_70%_20%,#ffffff_0%,transparent_55%)]" />
            <div className="relative">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">Investor demo dashboard</p>
              <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                Good morning, Demo User.
              </h1>
              <p className="mt-3 max-w-xl leading-7 text-slate-600">
                Explore fictional project signals and see how a FilmTrade intelligence workspace could guide discovery.
              </p>
              <span className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
                Demo simulation only
              </span>
            </div>
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["FilmPulse average", "78", "Illustrative project-health view"],
              ["Projects tracked", "04", "Fictional local projects"],
              ["Watchlist signals", "03", "Demo watchlist activity"],
              ["Trust overview", "Clear", "Mock information labels"],
            ].map(([title, value, detail]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-black text-[#0f172a]">{title}</p>
                <p className="mt-4 text-3xl font-black text-[#0f2742]">{value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
                <span className="mt-4 inline-block rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">Demo simulation</span>
              </article>
            ))}
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Trending now</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Fictional project signals</h2>
              </div>
              <button className="text-sm font-black text-[#00ABE4]">View all</button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {projectCards.map((project) => (
                <article
                  key={project.title}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${project.poster} p-5 text-white`}>
                    <div className={`absolute -right-8 -top-8 h-40 w-40 ${project.glow} blur-2xl`} />
                    <div className={`absolute -bottom-10 -left-10 h-36 w-36 ${project.shape}`} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(4,14,31,0.72)_100%)]" />

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-black tracking-[0.15em] backdrop-blur-sm">
                          DEMO FILM
                        </span>
                        <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-black backdrop-blur-sm">
                          {project.genre}
                        </span>
                      </div>

                      <div>
                        <p className="text-[10px] font-black tracking-[0.24em] text-white/75">FILMTRADE ORIGINAL CONCEPT</p>
                        <p className="mt-2 text-3xl font-black leading-[0.88] tracking-tight">{project.artwork}</p>
                        <p className="mt-2 text-xs font-semibold text-white/80">{project.title}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-black text-[#0f172a]">{project.title}</p>
                        <p className="mt-1 text-xs text-slate-500">Fictional project · Demo simulation</p>
                      </div>
                      <span className="rounded-full bg-[#e9f1fa] px-2.5 py-1 text-xs font-black text-[#087ba8]">
                        {project.momentum}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Pulse</p>
                        <p className="mt-1 text-lg font-black text-[#0f2742]">{project.pulse}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Trust</p>
                        <p className="mt-1 text-sm font-black text-slate-700">{project.trust}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">Risk</p>
                        <p className="mt-1 text-sm font-black text-slate-700">{project.risk}</p>
                      </div>
                    </div>

                    <button className="mt-4 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-[#0f2742] transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]">
                      View demo project
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">AI Copilot insights</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Demo summaries for exploration.</h2>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#087ba8]">Illustrative</span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                "After the Monsoon has the strongest illustrative FilmPulse signal.",
                "Orbit 47 is marked as rising in the fictional momentum view.",
                "Your demo watchlist contains three projects to review.",
              ].map((insight, index) => (
                <div key={insight} className="rounded-2xl bg-white p-5">
                  <p className="text-xs font-black text-[#00ABE4]">0{index + 1}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Your watchlist</p>
                <h2 className="mt-2 text-xl font-black">Demo projects</h2>
              </div>
              <button className="text-sm font-black text-[#00ABE4]">View all</button>
            </div>

            <div className="mt-5 space-y-4">
              {projectCards.slice(0, 3).map((project) => (
                <div key={project.title} className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-3">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${project.poster} text-xs font-black text-white`}>
                    {project.artwork.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black">{project.title}</p>
                    <p className="mt-1 text-xs text-slate-500">FilmPulse {project.pulse} · demo</p>
                  </div>
                  <span className="text-xs font-black text-[#087ba8]">{project.momentum}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Recent activity</p>
                <h2 className="mt-2 text-xl font-black">Demo updates</h2>
              </div>
              <span className="rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">Mock</span>
            </div>

            <div className="mt-5 space-y-4">
              {activity.map((item, index) => (
                <div key={item} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#e9f1fa] text-xs font-black text-[#087ba8]">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}