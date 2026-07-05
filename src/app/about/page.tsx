const userAreas = [
  {
    label: "Investor demo",
    title: "Discover and understand projects",
    text: "Browse fictional projects, compare illustrative FilmPulse signals, save a local watchlist, and explore simulated workflows.",
    link: "/dashboard",
    action: "Open investor dashboard",
  },
  {
    label: "Producer demo",
    title: "Present a project journey",
    text: "A future demo area for creating fictional projects, showing mock funding progress, and tracking illustrative milestones.",
    link: "/discover",
    action: "Explore projects",
  },
  {
    label: "Admin demo",
    title: "Review demo workflows",
    text: "A future demo area for project review, mock KYC queues, and illustrative risk labels without real compliance processing.",
    link: "/dashboard",
    action: "View demo workspace",
  },
];

const workflow = [
  {
    number: "01",
    title: "Explore",
    text: "Find fictional films and projects through a clean discovery experience.",
  },
  {
    number: "02",
    title: "Understand",
    text: "Review local project information, illustrative FilmPulse, labels, and milestone timelines.",
  },
  {
    number: "03",
    title: "Simulate",
    text: "Experience UI-only portfolio and workflow concepts with clear demo boundaries.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#0f2742]">
      <section className="border-b border-slate-100 bg-[#f5fbff] px-6 py-6 sm:px-10 lg:px-16">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tight">
            FILM<span className="text-[#00ABE4]">TRADE</span>
          </a>

          <div className="flex items-center gap-4">
            <a href="/discover" className="hidden text-sm font-black text-slate-600 transition hover:text-[#00ABE4] sm:block">
              Explore
            </a>
            <a href="/dashboard" className="rounded-full bg-[#00ABE4] px-4 py-2 text-sm font-black text-white transition hover:bg-[#008fbe]">
              Open demo
            </a>
          </div>
        </nav>
      </section>

      <section className="bg-[#f5fbff] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#087ba8]">
              About FilmTrade
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl">
              A clearer way to explore the film business concept.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              FilmTrade is a student portfolio project that imagines a premium platform for discovering film projects, understanding project information, and exploring simulated film investment workflows.
            </p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500">
              It is not a crowdfunding platform, broker, payment service, investment platform, legal service, or compliance provider.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0f2742] p-7 text-white shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">Product principle</p>
            <p className="mt-5 font-serif text-3xl font-black leading-tight">
              Clear labels over false certainty.
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Every score, project, workflow, and account state in this phase is fictional or illustrative.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00ABE4]">How it works</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">One product idea, three simple steps.</h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {workflow.map((step) => (
              <article key={step.number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-black text-[#00ABE4]">{step.number}</p>
                <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e9f1fa] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087ba8]">Platform areas</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Designed around three perspectives.</h2>
            <p className="mt-4 leading-7 text-slate-600">
              The current build focuses on the investor demo. Producer and admin experiences are planned as later portfolio features.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {userAreas.map((area, index) => (
              <article key={area.label} className="flex flex-col rounded-3xl bg-white p-7 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0f2742] text-sm font-black text-white">
                  {index + 1}
                </span>
                <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#00ABE4]">{area.label}</p>
                <h3 className="mt-3 text-2xl font-black">{area.title}</h3>
                <p className="mt-4 flex-1 leading-7 text-slate-600">{area.text}</p>
                <a href={area.link} className="mt-7 text-sm font-black text-[#00ABE4]">
                  {area.action} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_430px]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00ABE4]">Demo boundaries</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">What this project does not do.</h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-600">
              FilmTrade is intentionally built as a safe product-design demonstration. It focuses on interface design, information architecture, and fictional workflows.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Does not process real money or payments",
              "Does not sell securities or promise returns",
              "Does not collect KYC documents or identity data",
              "Does not perform AML, escrow, legal, or compliance checks",
              "Does not use real revenue, payout, or investment data",
              "Uses local fictional project data in Phase 1",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] p-4">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e9f1fa] text-xs font-black text-[#087ba8]">✓</span>
                <p className="text-sm font-bold leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-[#0f2742] px-7 py-12 text-center text-white sm:px-12">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">FilmTrade demo</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight">
            Explore the product concept in action.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">
            Browse fictional projects or open the investor dashboard to see the current Phase 1 experience.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/discover" className="rounded-full bg-[#00ABE4] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#008fbe]">
              Explore projects
            </a>
            <a href="/dashboard" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-black transition hover:bg-white/10">
              Open dashboard
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}