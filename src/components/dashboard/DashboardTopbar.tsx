export default function DashboardTopbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
      <a href="/" className="text-lg font-black tracking-tight lg:hidden">
        FILM<span className="text-[#00ABE4]">TRADE</span>
      </a>

      <div className="order-3 w-full lg:order-none lg:max-w-xl">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-[#f8fafc] px-4 py-3">
          <span className="text-slate-400">⌕</span>
          <input
            aria-label="Search demo projects"
            className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search demo projects, signals, and updates..."
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button aria-label="Demo notifications" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-sm font-black text-[#0f2742]">
          N
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-[#e9f1fa] text-xs font-black text-[#087ba8]">
            D
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black text-[#0f172a]">Demo User</p>
            <p className="text-xs text-slate-500">Portfolio mode</p>
          </div>
        </div>
      </div>
    </header>
  );
}