const journeySteps = [
  {
    number: "01",
    eyebrow: "Public discovery",
    title: "Discover a fictional film project",
    text: "Start with the public catalog. Show how a visitor can browse fictional projects with clear demo labels, genre information, and visual project cards.",
    action: "Open Discover",
    href: "/discover",
    accent: "bg-[#0f2742] text-white",
  },
  {
    number: "02",
    eyebrow: "Investor intelligence",
    title: "Review FilmPulse and project context",
    text: "Open a project detail page, then explain how FilmPulse is an illustrative signal view, not a prediction, investment score, or return promise.",
    action: "Open FilmPulse",
    href: "/filmpulse",
    accent: "bg-[#2f789e] text-white",
  },
  {
    number: "03",
    eyebrow: "Investor workflow",
    title: "Save a project to the demo watchlist",
    text: "Show the investor workspace, local watchlist concept, activity feed, and transparent UI-only portfolio journey.",
    action: "Open Watchlist",
    href: "/watchlist",
    accent: "bg-[#e9f1fa] text-[#0f2742]",
  },
  {
    number: "04",
    eyebrow: "Producer workflow",
    title: "Track a fictional project journey",
    text: "Show the producer dashboard with mock milestones, illustrative funding progress, and reporting placeholders for a project team.",
    action: "Open Producer Demo",
    href: "/producer",
    accent: "bg-[#0f2742] text-white",
  },
  {
    number: "05",
    eyebrow: "Admin review",
    title: "Review demo boundaries before public display",
    text: "Show the admin review layer that checks fictional project labels, visible disclosures, and prototype readiness without claiming real compliance.",
    action: "Open Admin Demo",
    href: "/admin",
    accent: "bg-[#2f789e] text-white",
  },
];

const script = [
  {
    time: "0:00–0:20",
    title: "The problem",
    text: "Film projects are difficult to understand from scattered information. FilmTrade proposes one clear place to explore project context, momentum signals, milestones, and transparent workflow concepts.",
  },
  {
    time: "0:20–0:45",
    title: "Public discovery",
    text: "I start with fictional project discovery. Every card is clearly marked as a demo, so the platform communicates the idea without pretending to use real investment or film data.",
  },
  {
    time: "0:45–1:10",
    title: "Investor experience",
    text: "The investor dashboard brings together project discovery, FilmPulse, a watchlist, and activity. FilmPulse is an illustrative intelligence concept, not financial advice or a return prediction.",
  },
  {
    time: "1:10–1:35",
    title: "Producer experience",
    text: "The producer workspace shows how a film team could manage a project journey using milestones, updates, and reporting views. In this prototype, every workflow is simulated.",
  },
  {
    time: "1:35–2:00",
    title: "Admin and future scope",
    text: "The admin review page shows how visible disclosures and project readiness could be reviewed. The next phase would add a real database, authentication, and approved data sources.",
  },
];

export default function DemoJourneyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <section className="border-b border-slate-100 bg-white px-6 py-6 sm:px-10 lg:px-16">
        <nav className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tight">
            FILM<span className="text-[#00ABE4]">TRADE</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/about"
              className="hidden text-sm font-black text-slate-600 transition hover:text-[#00ABE4] sm:block"
            >
              About
            </a>
            <a
              href="/discover"
              className="rounded-full bg-[#00ABE4] px-4 py-2 text-sm font-black text-white transition hover:bg-[#008fbe]"
            >
              Start demo
            </a>
          </div>
        </nav>
      </section>

      <section className="relative overflow-hidden bg-[#e9f1fa] px-6 py-20 sm:px-10 lg:px-16">
        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[#b9e6ff] blur-3xl" />
        <div className="absolute -bottom-40 left-[20%] h-80 w-80 rounded-full bg-white/80 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#087ba8]">
              Presentation mode
            </p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.96] tracking-tight sm:text-6xl">
              The FilmTrade demo journey.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              A focused walkthrough for your final-year project review or hackathon pitch. Follow the five steps to explain the product concept from discovery to review.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#journey"
                className="rounded-full bg-[#00ABE4] px-7 py-3.5 text-center text-sm font-black text-white transition hover:bg-[#008fbe]"
              >
                Start the 5-step journey
              </a>
              <a
                href="#script"
                className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-center text-sm font-black transition hover:border-[#00ABE4] hover:text-[#00ABE4]"
              >
                View 2-minute script
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-[#0f2742] p-7 text-white shadow-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
              Pitch structure
            </p>
            <div className="mt-6 space-y-4">
              {[
                ["01", "Problem and concept"],
                ["02", "Public discovery"],
                ["03", "Investor workspace"],
                ["04", "Producer workflow"],
                ["05", "Admin review and roadmap"],
              ].map(([number, label]) => (
                <div key={number} className="flex items-center gap-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-black text-sky-100">
                    {number}
                  </span>
                  <p className="text-sm font-black">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="journey" className="scroll-mt-8 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00ABE4]">
              Five-step walkthrough
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">
              Show the product as one connected story.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Open each step in order during your presentation. Every screen is designed around fictional data and UI-only simulation.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {journeySteps.map((step) => (
              <article
                key={step.number}
                className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[170px_minmax(0,1fr)_190px]"
              >
                <div className={`flex min-h-[150px] flex-col justify-between p-7 ${step.accent}`}>
                  <p className="text-sm font-black opacity-75">{step.eyebrow}</p>
                  <p className="text-5xl font-black tracking-tight">{step.number}</p>
                </div>

                <div className="p-7">
                  <h3 className="text-2xl font-black">{step.title}</h3>
                  <p className="mt-4 max-w-2xl leading-7 text-slate-600">{step.text}</p>
                </div>

                <div className="flex items-center border-t border-slate-100 p-7 lg:border-l lg:border-t-0">
                  <a
                    href={step.href}
                    className="w-full rounded-xl bg-[#00ABE4] px-4 py-3 text-center text-sm font-black text-white transition hover:bg-[#008fbe]"
                  >
                    {step.action} →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="script" className="scroll-mt-8 bg-white px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00ABE4]">
                Two-minute pitch script
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">
                A simple presentation structure.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Do not read this word-for-word. Use it as a structure so you can explain the platform confidently and clearly.
              </p>
            </div>

            <a href="/about" className="text-sm font-black text-[#00ABE4]">
              Read full concept →
            </a>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-5">
            {script.map((part) => (
              <article key={part.time} className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#087ba8]">
                  {part.time}
                </p>
                <h3 className="mt-4 text-xl font-black">{part.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{part.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-[#0f2742] px-7 py-12 text-center text-white sm:px-12">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">
            Final project boundary
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight">
            A product prototype, not a financial service.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
            FilmTrade uses fictional projects and illustrative signals. It does not process payments, sell securities, promise returns, collect KYC documents, or perform real compliance checks.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/discover"
              className="rounded-full bg-[#00ABE4] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#008fbe]"
            >
              Start from discovery
            </a>
            <a
              href="/"
              className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-black transition hover:bg-white/10"
            >
              Back to landing page
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}