import { notFound } from "next/navigation";
import { demoProjects } from "@/data/demoProjects";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

const milestones = [
  { title: "Project concept", detail: "Fictional concept summary available", status: "Complete" },
  { title: "Development review", detail: "Demo information labels prepared", status: "Complete" },
  { title: "Production planning", detail: "Illustrative milestone currently shown", status: "In progress" },
  { title: "Release preparation", detail: "Future demo milestone", status: "Upcoming" },
];

export function generateStaticParams() {
  return demoProjects.map((project) => ({ slug: project.slug }));
}

export default function ProjectDetailsPage({ params }: ProjectPageProps) {
  const project = demoProjects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <a href="/discover" className="text-sm font-black text-[#00ABE4]">
          ← Back to Discover
        </a>

        <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className={`relative min-h-[360px] overflow-hidden bg-gradient-to-br ${project.poster} p-7 text-white sm:p-10`}>
            <div className={`absolute -right-16 -top-16 h-72 w-72 ${project.glow} blur-3xl`} />
            <div className={`absolute -bottom-20 -left-16 h-64 w-64 ${project.shape}`} />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,14,31,0.2)_0%,rgba(4,14,31,0.72)_100%)]" />

            <div className="relative flex min-h-[290px] max-w-2xl flex-col justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-black tracking-[0.12em] backdrop-blur-sm">
                  FICTIONAL FILM
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur-sm">
                  {project.stage}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur-sm">
                  Demo simulation
                </span>
              </div>

              <div>
                <p className="text-xs font-black tracking-[0.24em] text-white/75">FILMTRADE PROJECT INTELLIGENCE</p>
                <p className="mt-3 text-5xl font-black leading-none tracking-tight sm:text-6xl">{project.artwork}</p>
                <h1 className="mt-4 text-2xl font-black sm:text-3xl">{project.title}</h1>
                <p className="mt-2 text-sm font-bold text-white/80">{project.genre} · Fictional project</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_330px]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Project overview</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Story and project context</h2>
              <p className="mt-5 max-w-3xl leading-8 text-slate-600">{project.description}</p>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                <article className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Production stage</p>
                  <p className="mt-3 text-xl font-black">{project.stage}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Illustrative project stage for this local demo.</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Information source</p>
                  <p className="mt-3 text-xl font-black">Local mock data</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">No external movie API or real-world project data is used.</p>
                </article>
              </div>

              <section className="mt-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">Milestone tracker</p>
                <h2 className="mt-3 text-2xl font-black tracking-tight">Illustrative project timeline</h2>

                <div className="mt-6 space-y-4">
                  {milestones.map((milestone, index) => (
                    <article key={milestone.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e9f1fa] text-sm font-black text-[#087ba8]">
                        {index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-black">{milestone.title}</h3>
                          <span className="rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">
                            {milestone.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{milestone.detail}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-5">
              <section className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">FilmPulse</p>
                <p className="mt-3 text-6xl font-black text-[#7edfff]">{project.pulse}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Illustrative project-health signal generated from local demo data.
                </p>
                <span className="mt-5 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-black text-sky-100">
                  Demo simulation
                </span>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ABE4]">Project signals</p>
                <div className="mt-5 space-y-4">
                  {[
                    ["Momentum", project.momentum],
                    ["Trust label", project.trust],
                    ["Risk label", project.risk],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                      <p className="text-sm font-bold text-slate-500">{label}</p>
                      <p className="text-sm font-black text-[#0f2742]">{value}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">Simulated workflow</p>
                <h2 className="mt-3 text-xl font-black">Explore the demo flow</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  This is a UI-only portfolio simulation. It does not process money, investments, KYC, escrow, revenue, or payouts.
                </p>
                <button className="mt-5 w-full rounded-xl bg-[#00ABE4] px-4 py-3 text-sm font-black text-white transition hover:bg-[#008fbe]">
                  Explore simulated flow
                </button>
              </section>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}