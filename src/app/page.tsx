export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#10233f]">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            FILM<span className="text-[#00ABE4]">TRADE</span>
          </div>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#how-it-works">How it works</a>
            <a href="#explore">Explore</a>
            <a href="#demo">Demo notice</a>
          </div>

          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:border-[#00ABE4] hover:text-[#00ABE4]">
            Sign in
          </button>
        </nav>

        <div className="flex flex-1 flex-col justify-center py-20">
          <p className="mb-6 inline-flex w-fit rounded-full bg-[#E9F1FA] px-4 py-2 text-sm font-semibold text-[#087ba8]">
            Student portfolio demo
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            Discover the stories
            <span className="block text-[#00ABE4]">behind the screen.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
            FilmTrade is a premium concept platform for exploring film projects,
            simulated investment journeys, and transparent revenue-sharing workflows.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-full bg-[#00ABE4] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#008fbe]">
              Explore projects
            </button>
            <button className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold transition hover:border-[#00ABE4] hover:text-[#00ABE4]">
              See how it works
            </button>
          </div>

          <div id="demo" className="mt-16 max-w-3xl rounded-2xl border border-[#cfe7f2] bg-[#f7fcff] p-5 text-sm leading-6 text-slate-600">
            <strong className="text-[#10233f]">Demo simulation notice:</strong> FilmTrade is a student portfolio project. It does not process real money, sell securities, promise returns, or provide legal, financial, KYC, AML, escrow, revenue, or payout services.
          </div>
        </div>

        <footer className="flex flex-col gap-3 border-t border-slate-100 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Lights. Camera. Invest.</p>
          <p>FilmTrade © 2026 · Portfolio demo</p>
        </footer>
      </section>
    </main>
  );
}