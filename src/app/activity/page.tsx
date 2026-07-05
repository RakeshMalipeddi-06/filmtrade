import { demoProjects } from "@/data/demoProjects";

const activityItems = [
  {
    type: "FilmPulse update",
    title: "After the Monsoon signal refreshed",
    detail: "Its illustrative FilmPulse value remains the highest in the local demo ranking.",
    time: "Today · 10:24 AM",
    projectSlug: "after-the-monsoon",
    icon: "✦",
  },
  {
    type: "Milestone update",
    title: "Orbit 47 moved to production planning",
    detail: "A fictional milestone status was updated in the demo project timeline.",
    time: "Today · 9:10 AM",
    projectSlug: "orbit-47",
    icon: "✓",
  },
  {
    type: "Watchlist action",
    title: "The Last Frame was added to the demo watchlist",
    detail: "This is a UI-only local watchlist event for the FilmTrade portfolio concept.",
    time: "Yesterday · 6:42 PM",
    projectSlug: "the-last-frame",
    icon: "＋",
  },
  {
    type: "Information label",
    title: "Paper Skies trust label reviewed",
    detail: "The illustrative information-quality label was refreshed using local mock data.",
    time: "Yesterday · 2:18 PM",
    projectSlug: "paper-skies",
    icon: "i",
  },
  {
    type: "FilmPulse update",
    title: "Night Shift entered the discovery view",
    detail: "The fictional project is now included in the local FilmPulse ranking list.",
    time: "Monday · 4:05 PM",
    projectSlug: "night-shift",
    icon: "✦",
  },
  {
    type: "Project update",
    title: "Golden Hour production status updated",
    detail: "The demo project remains an illustrative production-stage concept.",
    time: "Monday · 11:30 AM",
    projectSlug: "golden-hour",
    icon: "◌",
  },
];

const filters = ["All updates", "FilmPulse", "Milestones", "Watchlist", "Project info"];

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <a href="/dashboard" className="text-sm font-black text-[#00ABE4]">
          ← Back to dashboard
        </a>

        <section className="mt-5 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                Activity feed
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Demo project updates.
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                A chronological view of fictional FilmPulse changes, mock milestones, and local watchlist actions.
              </p>
            </div>
            <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
              Demo simulation only
            </span>
          </div>
        </section>

        <section className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`rounded-full px-4 py-2 text-xs font-black transition ${
                index === 0
                  ? "bg-[#00ABE4] text-white"
                  : "bg-white text-[#087ba8] border border-[#d6e6f5] hover:bg-[#e9f1fa]"
              }`}
            >
              {filter}
            </button>
          ))}
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <p className="text-sm font-black">Latest demo activity</p>
            <p className="mt-1 text-sm text-slate-500">
              Static local events for the FilmTrade portfolio project.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {activityItems.map((item) => {
              const project = demoProjects.find((entry) => entry.slug === item.projectSlug);

              return (
                <article key={`${item.title}-${item.time}`} className="p-5 sm:p-6">
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#e9f1fa] text-lg font-black text-[#087ba8]">
                      {item.icon}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <span className="rounded-full bg-[#f8fafc] px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-[#087ba8]">
                            {item.type}
                          </span>
                          <h2 className="mt-3 text-lg font-black">{item.title}</h2>
                        </div>
                        <p className="shrink-0 text-xs font-bold text-slate-400">{item.time}</p>
                      </div>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{item.detail}</p>

                      {project && (
                        <a
                          href={`/projects/${project.slug}`}
                          className="mt-4 inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] px-3 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                        >
                          <span className={`grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br ${project.poster} text-[10px] text-white`}>
                            {project.artwork.slice(0, 1)}
                          </span>
                          View {project.title}
                          <span className="text-[#00ABE4]">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-[#0f2742] p-7 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-sky-200">Demo notice</p>
          <h2 className="mt-3 text-2xl font-black">This feed does not track real activity.</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Every update shown here is fictional local content for the student portfolio. In Phase 2, this layout can connect to database-backed mock project events.
          </p>
        </section>
      </div>
    </main>
  );
}