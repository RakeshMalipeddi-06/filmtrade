export default function DashboardPage() {
  return (
    <main className="p-5 sm:p-8">
      <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-8 sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
          Investor demo dashboard
        </p>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          Your FilmTrade workspace is ready.
        </h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600">
          This is the shared dashboard shell. The next milestone adds fictional project signals, watchlist cards, AI-style demo insights, and activity panels.
        </p>
        <span className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
          Demo simulation only
        </span>
      </section>
    </main>
  );
}