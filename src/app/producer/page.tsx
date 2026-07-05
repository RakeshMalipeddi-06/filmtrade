import { demoProjects } from "@/data/demoProjects";

const producerMetrics = [
  { label: "Projects managed", value: "03", detail: "Fictional demo projects", tone: "navy" },
  { label: "Active milestones", value: "04", detail: "Illustrative workflow items", tone: "blue" },
  { label: "Reports prepared", value: "02", detail: "Mock reporting views", tone: "soft" },
  { label: "Project status", value: "On track", detail: "Demo workspace label", tone: "white" },
];

const milestones = [
  { title: "After the Monsoon", stage: "Production planning", progress: "In progress", percent: 68 },
  { title: "Orbit 47", stage: "Development review", progress: "Complete", percent: 100 },
  { title: "The Last Frame", stage: "Release preparation", progress: "Upcoming", percent: 24 },
];

const reports = [
  { title: "After the Monsoon", label: "Mock production update", status: "Ready" },
  { title: "Orbit 47", label: "Illustrative milestone report", status: "Draft" },
  { title: "The Last Frame", label: "Demo revenue summary", status: "Planned" },
];

const quickActions = [
  { title: "Create project", detail: "Add a fictional project form", href: "/producer/create" },
  { title: "Update milestone", detail: "Coming in the next producer step", href: "#" },
  { title: "Prepare report", detail: "Coming in the next producer step", href: "#" },
  { title: "View public page", detail: "See the investor-facing project view", href: "/discover" },
];

const metricStyles: Record<string, string> = {
  navy: "border-[#0f2742] bg-[#0f2742] text-white",
  blue: "border-[#2f789e] bg-[#2f789e] text-white",
  soft: "border-[#d6e6f5] bg-[#e9f1fa] text-[#0f2742]",
  white: "border-slate-200 bg-white text-[#0f2742]",
};

export default function ProducerDashboardPage() {
  const projects = demoProjects.slice(0, 3);

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
            <span className="rounded-xl bg-[#0f2742] px-4 py-2 text-sm font-black text-white">
              Producer demo
            </span>
          </div>
        </div>

        <section className="relative mt-7 overflow-hidden rounded-[30px] border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#b9e6ff] blur-3xl" />
          <div className="absolute bottom-[-110px] right-[18%] h-64 w-64 rounded-full bg-[#9fd3f2] blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087ba8]">
                Producer workspace
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Manage fictional projects with clarity.
              </h1>
              <p className="mt-5 max-w-2xl leading-7 text-slate-600">
                Review demo project progress, mock milestone activity, and illustrative reporting views in one producer workspace.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="/producer/create"
                  className="rounded-xl bg-[#00ABE4] px-5 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]"
                >
                  Create demo project
                </a>
                <a
                  href="/discover"
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
                >
                  View public projects
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Demo workspace status
              </p>
              <p className="mt-4 text-3xl font-black">Active</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                All projects, milestones, funding progress, reports, and revenue concepts are fictional UI simulations.
              </p>
              <span className="mt-5 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-black text-sky-100">
                No real money or reporting
              </span>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {producerMetrics.map((metric) => (
            <article
              key={metric.label}
              className={`min-h-[145px] rounded-2xl border p-5 shadow-sm ${metricStyles[metric.tone]}`}
            >
              <p className="text-xs font-black">{metric.label}</p>
              <p className="mt-4 text-3xl font-black tracking-tight">{metric.value}</p>
              <p className="mt-2 text-xs font-semibold opacity-75">{metric.detail}</p>
              <div className="mt-4 flex gap-1">
                <span className="h-1.5 w-8 rounded-full bg-current opacity-35" />
                <span className="h-1.5 w-5 rounded-full bg-current opacity-55" />
                <span className="h-1.5 w-10 rounded-full bg-current opacity-25" />
              </div>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                  Your demo projects
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Project workspace</h2>
              </div>
              <a href="/producer/create" className="text-sm font-black text-[#00ABE4]">
                Create project →
              </a>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${project.poster} p-5 text-white`}>
                    <div className={`absolute -right-8 -top-8 h-36 w-36 ${project.glow} blur-2xl`} />
                    <div className={`absolute -bottom-10 -left-10 h-32 w-32 ${project.shape}`} />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(4,14,31,0.75)_100%)]" />

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <span className="rounded-full border border-white/25 bg-white/10 px-2 py-1 text-[9px] font-black tracking-[0.12em] backdrop-blur-sm">
                          PRODUCER DEMO
                        </span>
                        <span className="rounded-full bg-white/15 px-2 py-1 text-[9px] font-black backdrop-blur-sm">
                          {project.stage}
                        </span>
                      </div>

                      <div>
                        <p className="text-[9px] font-black tracking-[0.2em] text-white/70">FICTIONAL FILM</p>
                        <p className="mt-1 text-3xl font-black leading-none">{project.artwork}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-black">{project.title}</h3>
                    <p className="mt-1 text-sm font-bold text-[#087ba8]">{project.genre}</p>

                    <div className="mt-5 rounded-2xl bg-[#f8fafc] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-black text-slate-500">Mock funding progress</p>
                        <p className="text-sm font-black text-[#0f2742]">Demo</p>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                        <span
                          className="block h-full rounded-full bg-[#00ABE4]"
                          style={{ width: `${Math.max(32, project.pulse - 18)}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-slate-500">Illustrative progress only</p>
                    </div>

                    <a
                      href={`/projects/${project.slug}`}
                      className="mt-5 block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]"
                    >
                      Open project
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <section className="mt-9">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Milestone tracker
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Illustrative production progress</h2>

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {milestones.map((milestone) => (
                  <article
                    key={milestone.title}
                    className="border-b border-slate-100 p-5 last:border-0 sm:p-6"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-black">{milestone.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{milestone.stage}</p>
                      </div>
                      <span className="w-fit rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
                        {milestone.progress}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <span
                          className="block h-full rounded-full bg-[#00ABE4]"
                          style={{ width: `${milestone.percent}%` }}
                        />
                      </div>
                      <span className="text-sm font-black text-[#0f2742]">{milestone.percent}%</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ABE4]">
                Quick actions
              </p>

              <div className="mt-5 space-y-3">
                {quickActions.map((action, index) => (
                  <a
                    key={action.title}
                    href={action.href}
                    className="flex w-full items-center gap-3 rounded-2xl bg-[#f8fafc] p-4 text-left transition hover:bg-[#e9f1fa]"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-sm font-black text-[#087ba8] shadow-sm">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-black">{action.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{action.detail}</span>
                    </span>
                  </a>
                ))}
              </div>
            </section>

            <section className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Mock reporting
              </p>
              <h2 className="mt-3 text-2xl font-black">Project report queue</h2>

              <div className="mt-5 space-y-3">
                {reports.map((report) => (
                  <div key={report.title} className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-black">{report.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-300">{report.label}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-sky-100">
                        {report.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-xl bg-[#00ABE4] px-4 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]"
              >
                View demo reports
              </button>
            </section>

            <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Demo notice
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Funding, milestones, reports, revenue, and project status shown here are fictional UI examples. This page does not process money, collect investor data, or provide legal or financial services.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}