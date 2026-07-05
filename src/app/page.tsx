import { demoProjects } from "@/data/demoProjects";

const steps = [
  {
    number: "01",
    title: "Discover projects",
    text: "Browse fictional film concepts with clear demo labels and local project information.",
  },
  {
    number: "02",
    title: "Read the signals",
    text: "Explore illustrative FilmPulse, momentum, trust, and milestone views.",
  },
  {
    number: "03",
    title: "Try the workflow",
    text: "Experience a UI-only portfolio journey with no real money or financial activity.",
  },
];

export default function Home() {
  const featuredProjects = demoProjects.slice(0, 3);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#0f2742]">
      <section className="relative min-h-screen">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-[#f5fbff]" />
        <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#e9f1fa] blur-3xl" />
        <div className="absolute right-[-180px] top-24 h-[520px] w-[520px] rounded-full bg-[#d9f3ff] blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-xl font-black tracking-tight">
              FILM<span className="text-[#00ABE4]">TRADE</span>
            </a>

            <div className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
              <a href="#how-it-works" className="transition hover:text-[#00ABE4]">How it works</a>
              <a href="#featured" className="transition hover:text-[#00ABE4]">Featured projects</a>
              <a href="#transparency" className="transition hover:text-[#00ABE4]">Transparency</a>
            </div>

            <a
              href="/dashboard"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#00ABE4]"
            >
              Open demo
            </a>
          </nav>

          <div className="mt-4 h-px overflow-hidden bg-slate-200">
            <div className="h-full w-1/2 animate-[loading_2.6s_ease-in-out_infinite] bg-[#00ABE4]" />
          </div>

          <div className="grid flex-1 items-center gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_460px] lg:py-20">
            <div className="relative z-10">
              <div className="mb-7 flex items-center gap-3">
                <div className="relative h-10 w-14 overflow-hidden rounded-md bg-[#0f2742] shadow-lg">
                  <span className="absolute left-0 top-0 h-3 w-full bg-white/90" />
                  <span className="absolute left-1 top-5 h-1 w-12 bg-[#00ABE4]" />
                  <span className="absolute left-2 top-7 h-1 w-9 bg-white/70" />
                  <span className="absolute left-2 top-9 h-1 w-11 bg-white/40" />
                </div>
                <span className="rounded-full bg-[#e9f1fa] px-4 py-2 text-xs font-black text-[#087ba8]">
                  Student portfolio demo
                </span>
              </div>

              <p className="text-center text-xs font-black tracking-[0.35em] text-[#087ba8] lg:text-left">
                FILMTRADE
              </p>

              <h1 className="mt-5 max-w-3xl text-center text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-left lg:text-7xl">
                Stories deserve
                <span className="block text-[#00ABE4]">a clearer stage.</span>
              </h1>

              <p className="mx-auto mt-7 max-w-xl text-center text-lg leading-8 text-slate-600 lg:mx-0 lg:text-left">
                A premium concept platform for discovering fictional film projects, exploring illustrative signals, and understanding simulated film workflows.
              </p>

              <p className="mt-5 text-center font-serif text-2xl font-black text-[#0f2742] lg:text-left">
                Lights. Camera. Invest.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="/discover"
                  className="rounded-full bg-[#00ABE4] px-7 py-3.5 text-center text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:bg-[#008fbe]"
                >
                  Explore Projects
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-full border border-slate-200 bg-white px-7 py-3.5 text-center text-sm font-black transition hover:border-[#00ABE4] hover:text-[#00ABE4]"
                >
                  How It Works
                </a>
              </div>

              <p className="mt-8 max-w-2xl text-center text-xs leading-6 text-slate-500 lg:text-left">
                Demo simulation only. FilmTrade does not process real money, sell securities, promise returns, or provide KYC, AML, escrow, revenue, or payout services.
              </p>
            </div>

            <div className="relative mx-auto h-[430px] w-full max-w-[460px] sm:h-[500px]">
              <div className="absolute left-4 top-16 h-[330px] w-[220px] rotate-[-10deg] overflow-hidden rounded-[28px] border-8 border-white bg-gradient-to-br from-[#142b50] via-[#275f93] to-[#9ddcff] p-6 shadow-2xl">
                <div className="absolute -right-10 top-12 h-40 w-40 rounded-full bg-[#00ABE4]/60 blur-2xl" />
                <div className="absolute bottom-0 left-0 h-40 w-full bg-[linear-gradient(160deg,transparent_0%,rgba(5,18,39,0.78)_70%)]" />
                <div className="relative flex h-full flex-col justify-between text-white">
                  <span className="w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.16em] backdrop-blur-sm">DEMO FILM</span>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.25em] text-white/70">FILMTRADE</p>
                    <p className="mt-2 text-4xl font-black leading-none">MONSOON</p>
                    <p className="mt-2 text-xs font-bold text-white/75">A fictional drama</p>
                  </div>
                </div>
              </div>

              <div className="absolute right-1 top-2 h-[360px] w-[240px] rotate-[9deg] overflow-hidden rounded-[28px] border-8 border-white bg-gradient-to-br from-[#2b174c] via-[#8c4a88] to-[#ffbd8e] p-6 shadow-2xl">
                <div className="absolute -left-12 top-8 h-44 w-44 rounded-full bg-[#f7d3ff]/70 blur-2xl" />
                <div className="absolute bottom-0 left-0 h-44 w-full bg-[linear-gradient(160deg,transparent_0%,rgba(24,8,40,0.78)_70%)]" />
                <div className="relative flex h-full flex-col justify-between text-white">
                  <span className="w-fit rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.16em] backdrop-blur-sm">FICTIONAL</span>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.25em] text-white/70">FILMTRADE</p>
                    <p className="mt-2 text-4xl font-black leading-none">ORBIT 47</p>
                    <p className="mt-2 text-xs font-bold text-white/75">A fictional science-fiction film</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 left-[26%] z-10 h-[250px] w-[205px] rotate-[-1deg] overflow-hidden rounded-[28px] border-8 border-white bg-gradient-to-br from-[#26311f] via-[#617c3e] to-[#d8c47b] p-6 shadow-2xl">
                <div className="absolute -right-10 top-8 h-36 w-36 rounded-full bg-[#fff5af]/60 blur-2xl" />
                <div className="absolute bottom-0 left-0 h-40 w-full bg-[linear-gradient(160deg,transparent_0%,rgba(17,29,12,0.78)_70%)]" />
                <div className="relative flex h-full flex-col justify-end text-white">
                  <p className="text-[10px] font-black tracking-[0.25em] text-white/70">FILMTRADE</p>
                  <p className="mt-2 text-3xl font-black leading-none">LAST FRAME</p>
                </div>
              </div>

              <div className="absolute right-8 top-[52%] z-20 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#087ba8]">FilmPulse</p>
                <p className="mt-1 text-2xl font-black text-[#0f2742]">78</p>
                <p className="text-[10px] font-bold text-slate-500">Illustrative signal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-8 bg-[#f8fbfd] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00ABE4]">How FilmTrade works</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">A simple demo journey.</h2>
            <p className="mt-4 leading-7 text-slate-600">Built to explain the product idea clearly without pretending to be a real investment platform.</p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <p className="text-sm font-black text-[#00ABE4]">{step.number}</p>
                <h3 className="mt-7 text-2xl font-black">{step.title}</h3>
                <p className="mt-4 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="scroll-mt-8 px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#00ABE4]">Featured demo projects</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight">Explore fictional stories.</h2>
            </div>
            <a href="/discover" className="text-sm font-black text-[#00ABE4]">View all projects →</a>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <a key={project.slug} href={`/projects/${project.slug}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className={`relative h-64 bg-gradient-to-br ${project.poster} p-6 text-white`}>
                  <div className={`absolute -right-10 -top-10 h-40 w-40 ${project.glow} blur-2xl`} />
                  <div className={`absolute -bottom-10 -left-10 h-36 w-36 ${project.shape}`} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_22%,rgba(4,14,31,0.78)_100%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <span className="w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-black tracking-[0.14em] backdrop-blur-sm">DEMO SIMULATION</span>
                    <div>
                      <p className="text-[10px] font-black tracking-[0.24em] text-white/70">FICTIONAL FILM</p>
                      <p className="mt-2 text-4xl font-black leading-none">{project.artwork}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black">{project.title}</h3>
                      <p className="mt-1 text-sm font-bold text-[#087ba8]">{project.genre}</p>
                    </div>
                    <span className="rounded-full bg-[#e9f1fa] px-3 py-1 text-xs font-black text-[#087ba8]">{project.pulse}</span>
                  </div>
                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">{project.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="transparency" className="scroll-mt-8 bg-[#e9f1fa] px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#087ba8]">Trust and transparency</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">Clear labels over false certainty.</h2>
            <p className="mt-5 max-w-2xl leading-8 text-slate-600">
              FilmTrade is designed around understandable project information, visible milestone tracking, and clearly labelled simulated revenue-sharing concepts.
            </p>
          </div>

          <div className="space-y-4">
            {[
              ["Project information", "Local fictional data is labelled clearly in Phase 1."],
              ["Milestone tracking", "Project timelines are illustrative workflow examples."],
              ["Simulated revenue sharing", "No real money, returns, revenue, or payouts are shown or processed."],
            ].map(([title, text], index) => (
              <article key={title} className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0f2742] text-sm font-black text-white">{index + 1}</span>
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-[#0f2742] px-7 py-12 text-center text-white sm:px-12">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">FilmTrade demo</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-black tracking-tight">Explore the full fictional workspace.</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">Browse projects, review FilmPulse, and test the dashboard experience.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="/discover" className="rounded-full bg-[#00ABE4] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#008fbe]">Explore Projects</a>
            <a href="/dashboard" className="rounded-full border border-white/20 px-7 py-3.5 text-sm font-black transition hover:bg-white/10">Open Dashboard</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>FILMTRADE · Student portfolio demo</p>
          <p>Lights. Camera. Invest.</p>
        </div>
      </footer>
    </main>
  );
}