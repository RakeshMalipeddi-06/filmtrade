const navigation = [
  { label: "Home", href: "/dashboard" },
  { label: "Discover", href: "/discover" },
  { label: "Movies", href: "/movies" },
  { label: "FilmPulse", href: "/filmpulse" },
  { label: "Watchlist", href: "/watchlist" },
  { label: "Activity", href: "/activity" },
  { label: "Profile", href: "#" },
  { label: "Settings", href: "#" },
];

export default function DashboardSidebar() {
  return (
    <aside className="hidden min-h-screen w-[280px] shrink-0 flex-col bg-[#0f2742] p-5 text-white lg:flex">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#00ABE4] text-lg font-black text-[#0f172a]">
            FT
          </div>
          <div>
            <p className="text-lg font-black tracking-tight">FILMTRADE</p>
            <p className="mt-1 text-xs text-sky-200">Film intelligence · Demo</p>
          </div>
        </div>
      </div>

      <nav className="mt-8 space-y-2">
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center rounded-xl px-4 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <span className="mr-3 grid h-6 w-6 place-items-center rounded-md bg-current/10 text-xs">
              {item.label.slice(0, 1)}
            </span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-white/10 bg-white/10 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Demo workspace</p>
        <p className="mt-3 text-sm leading-6 text-slate-200">
          All project signals, workflows, and portfolio concepts are simulations for this student project.
        </p>
      </div>
    </aside>
  );
}