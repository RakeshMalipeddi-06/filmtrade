import { demoProjects } from "@/data/demoProjects";

const metrics = [
  { label: "Projects tracked", value: "06", detail: "Fictional projects", tone: "navy" },
  { label: "FilmPulse average", value: "78", detail: "Illustrative signal", tone: "blue" },
  { label: "Watchlist signals", value: "03", detail: "Demo watchlist", tone: "cream" },
  { label: "Milestones shown", value: "04", detail: "Mock workflow steps", tone: "soft" },
  { label: "Trust overview", value: "Clear", detail: "Demo information labels", tone: "white" },
];

const activity = [
  "Illustrative signal updated for After the Monsoon",
  "Mock milestone review completed for Orbit 47",
  "The Last Frame added to your demo watchlist",
  "Demo trust label refreshed for Paper Skies",
];

const metricStyles: Record<string, string> = {
  navy: "bg-[#0f2742] text-white border-[#0f2742]",
  blue: "bg-[#2f789e] text-white border-[#2f789e]",
  cream: "bg-[#fff4e6] text-[#0f2742] border-[#f5e3cc]",
  soft: "bg-[#e9f1fa] text-[#0f2742] border-[#d6e6f5]",
  white: "bg-white text-[#0f2742] border-slate-200",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] p-5 text-[#0f172a] sm:p-8">
      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <section className="relative overflow-hidden rounded-[28px] border border-[#d6e6f5] bg-[#e9f1fa] px-7 py-8 sm:px-10 sm:py-9">
            <div className="absolute inset-0 bg-[linear-gradient(115deg,#edf7ff_0%,#e9f1fa_43%,#c9e7ff_100%)]" />
            <div className="absolute right-0 top-0 h-full w-[52%] opacity-90">
              <div className="absolute right-[-5%] top-[26%] h-44 w-[125%] rotate-[-9deg] rounded-[55%] bg-[#b8daf3]" />
              <div className="absolute right-[-12%] top-[40%] h-40 w-[115%] rotate-[8deg] rounded-[55%] bg-[#8fc3e8]" />
              <div className="absolute right-[-7%] bottom-[-18%] h-48 w-[105%] rounded-[50%] bg-[#5a97c2]" />
              <div className="absolute right-[21%] top-[18%] h-4 w-28 rounded-full bg-white/70 blur-sm" />
              <div className="absolute right-[10%] top-[28%] h-3 w-20 rounded-full bg-white/60 blur-sm" />
            </div>

            <div className="absolute bottom-[13%] right-[16%] h-24 w-2 rotate-[17deg] rounded-full bg-[#5f4029] shadow-lg" />
            <div className="absolute bottom-[14%] right-[25%] h-24 w-2 rotate-[-17deg] rounded-full bg-[#5f4029] shadow-lg" />
            <div className="absolute bottom-[31%] right-[18%] h-2 w-16 rounded-full bg-[#d7a354] shadow-md" />
            <div className="absolute bottom-[36%] right-[18%] h-2 w-16 rounded-full bg-[#d7a354] shadow-md" />
            <div className="absolute bottom-[27%] right-[19%] h-10 w-14 rounded-md border-4 border-[#c89243] bg-[#182235] shadow-lg" />
            <div className="absolute bottom-[18%] right-[22%] h-3 w-8 rounded-full bg-[#c89243]" />

            <div className="relative max-w-xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087ba8]">
                Investor demo dashboard
              </p>
              <h1 className="mt-4 font-serif text-4xl font-black leading-[0.98] tracking-tight text-[#0f2742] sm:text-5xl">
                Good morning,
                <span className="block mt-1">Demo User <span className="font-sans text-3xl">👋</span></span>
              </h1>
              <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-[#385572] sm:text-base">
                Discover fictional projects, explore illustrative signals, and review mock FilmTrade workflows.
              </p>
              <span className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
                Demo simulation only
              </span>
            </div>
          </section>

          <section className="relative z-10 -mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className={`min-h-[148px] rounded-2xl border p-4 shadow-sm ${metricStyles[metric.tone]}`}
              >
                <p className="text-xs font-black">{metric.label}</p>
                <p className="mt-4 text-3xl font-black tracking-tight">{metric.value}</p>
                <p className="mt-2 text-xs font-semibold opacity-75">{metric.detail}</p>
                <div className="mt-4 flex items-center gap-1">
                  <span className="h-1.5 w-7 rounded-full bg-current opacity-40" />
                  <span className="h-1.5 w-4 rounded-full bg-current opacity-60" />
                  <span className="h-1.5 w-9 rounded-full bg-current opacity-30" />
                </div>
              </article>
            ))}
          </section>

          <section className="mt-9">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Trending now</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Fictional project signals</h2>
              </div>
              <a href="/discover" className="text-sm font-black text-[#00ABE4]">View all</a>
            </div>

            <div className="mt-5 flex gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
              {demoProjects.map((project) => (
                <a
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group w-[180px] shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`relative h-[150px] overflow-hidden bg-gradient-to-br ${project.poster} p-4 text-white`}>
                    <div className={`absolute -right-7 -top-7 h-28 w-28 ${project.glow} blur-2xl`} />
                    <div className={`absolute -bottom-8 -left-8 h-28 w-28 ${project.shape}`} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(4,14,31,0.72)_100%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[9px] font-black tracking-[0.12em] backdrop-blur-sm">
                          DEMO
                        </span>
                        <span className="rounded-full bg-white/15 px-2 py-1 text-[9px] font-black backdrop-blur-sm">
                          {project.genre}
                        </span>
                      </div>
                      <div>
                        <p className="text-[9px] font-black tracking-[0.2em] text-white/75">FICTIONAL FILM</p>
                        <p className="mt-1 text-2xl font-black leading-[0.88] tracking-tight">{project.artwork}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="truncate text-sm font-black text-[#0f172a]">{project.title}</p>
                    <div className="mt-3 flex items-end justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">FilmPulse</p>
                        <p className="mt-1 text-2xl font-black text-[#0f2742]">{project.pulse}</p>
                      </div>
                      <span className="mb-1 rounded-full bg-[#e9f1fa] px-2 py-1 text-[10px] font-black text-[#087ba8]">
                        {project.momentum}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">AI Copilot insights</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Illustrative discovery notes.</h2>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#087ba8]">Demo only</span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                "After the Monsoon has the strongest illustrative FilmPulse signal.",
                "Orbit 47 is marked as rising in the fictional momentum view.",
                "Your demo watchlist contains three projects to review.",
              ].map((insight, index) => (
                <div key={insight} className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-xs font-black text-[#00ABE4]">0{index + 1}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">{insight}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="overflow-hidden rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-lg text-[#087ba8]">✦</span>
                <h2 className="font-serif text-xl font-black text-[#0f2742]">AI Copilot</h2>
              </div>
              <span className="rounded-full bg-[#0f2742] px-3 py-1 text-[10px] font-black text-white">DEMO</span>
            </div>

            <div className="mt-5 rounded-2xl bg-[#d9ecfb] p-5">
              <p className="font-serif text-lg font-black leading-6 text-[#0f2742]">
                Here is your illustrative summary for today.
              </p>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-5 text-[#284764]">
                <li>● Two fictional projects show rising momentum</li>
                <li>● One mock milestone is in progress</li>
                <li>● FilmPulse changed for three demo projects</li>
                <li>● Suggested: review After the Monsoon</li>
              </ul>
              <button className="mt-6 rounded-full bg-[#0f2742] px-5 py-3 text-sm font-black text-white">
                View demo insights →
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Your watchlist</p>
                <h2 className="mt-2 text-xl font-black">Demo projects</h2>
              </div>
              <a href="/discover" className="text-sm font-black text-[#00ABE4]">View all</a>
            </div>

            <div className="mt-5 space-y-3">
              {demoProjects.slice(0, 3).map((project) => (
                <a key={project.slug} href={`/projects/${project.slug}`} className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] p-3 transition hover:bg-[#e9f1fa]">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${project.poster} text-xs font-black text-white`}>
                    {project.artwork.slice(0, 1)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black">{project.title}</p>
                    <p className="mt-1 text-xs text-slate-500">FilmPulse {project.pulse} · demo</p>
                  </div>
                  <span className="text-xs font-black text-[#087ba8]">{project.momentum}</span>
                </a>
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