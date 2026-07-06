"use client";

import { useEffect, useMemo, useState } from "react";

type LiveMovie = {
  imdbId: string;
  title: string;
  language: string;
  posterUrl: string | null;
};

type UpcomingMovie = {
  id: string;
  title: string;
  language: string;
  posterUrl: string | null;
};

type MovieApiResponse = {
  liveMovies: LiveMovie[];
  verifiedUpcomingMovies: UpcomingMovie[];
};

type DashboardMovie = {
  id: string;
  title: string;
  language: string;
  posterUrl: string | null;
  status: "Live record" | "Verified upcoming";
  filmPulse: number;
  trust: number;
  risk: "Low" | "Medium";
};

type ActivityItem = {
  id: string;
  message: string;
  createdAt: string;
};

type DemoPortfolio = {
  investmentCount: number;
  value: number;
};

const STORAGE_KEYS = {
  watchlist: "filmtrade-demo-watchlist",
  activity: "filmtrade-demo-activity",
  portfolio: "filmtrade-demo-portfolio",
};

const initialWatchlist = ["Dragon", "Spirit", "Raaka"];

const initialActivity: ActivityItem[] = [
  {
    id: "catalogue-ready",
    message: "Catalogue refreshed. Live and verified records loaded.",
    createdAt: "This session",
  },
  {
    id: "demo-boundary",
    message: "Demo boundary active. No real investment or payment activity.",
    createdAt: "This session",
  },
];

function scoreFor(id: string, minimum: number, range: number) {
  const value = id
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);

  return minimum + (value % range);
}

function fallbackStyle(index: number) {
  const styles = [
    "bg-[radial-gradient(circle_at_top_right,#8ed8ff,transparent_34%),linear-gradient(145deg,#0f2742,#245e85)]",
    "bg-[radial-gradient(circle_at_bottom_left,#f6d28d,transparent_30%),linear-gradient(145deg,#172554,#334155)]",
    "bg-[radial-gradient(circle_at_top_left,#a7f3d0,transparent_28%),linear-gradient(145deg,#0f172a,#155e75)]",
    "bg-[radial-gradient(circle_at_bottom_right,#c4b5fd,transparent_30%),linear-gradient(145deg,#1e1b4b,#334155)]",
  ];

  return styles[index % styles.length];
}

function formatDemoValue(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function getStoredValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const savedValue = window.localStorage.getItem(key);
    return savedValue ? (JSON.parse(savedValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function DashboardPage() {
  const [data, setData] = useState<MovieApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [storageReady, setStorageReady] = useState(false);
  const [query, setQuery] = useState("");
  const [watchlist, setWatchlist] = useState<string[]>(initialWatchlist);
  const [activity, setActivity] = useState<ActivityItem[]>(initialActivity);
  const [portfolio, setPortfolio] = useState<DemoPortfolio>({
    investmentCount: 0,
    value: 0,
  });

  useEffect(() => {
    setWatchlist(getStoredValue(STORAGE_KEYS.watchlist, initialWatchlist));
    setActivity(getStoredValue(STORAGE_KEYS.activity, initialActivity));
    setPortfolio(
      getStoredValue(STORAGE_KEYS.portfolio, {
        investmentCount: 0,
        value: 0,
      }),
    );
    setStorageReady(true);
  }, []);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const response = await fetch("/api/telugu-movies");

        if (!response.ok) {
          throw new Error("Catalogue unavailable");
        }

        setData(await response.json());
      } catch {
        setData({ liveMovies: [], verifiedUpcomingMovies: [] });
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(STORAGE_KEYS.watchlist, JSON.stringify(watchlist));
    }
  }, [storageReady, watchlist]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(activity));
    }
  }, [activity, storageReady]);

  useEffect(() => {
    if (storageReady) {
      window.localStorage.setItem(STORAGE_KEYS.portfolio, JSON.stringify(portfolio));
    }
  }, [portfolio, storageReady]);

  const opportunities = useMemo<DashboardMovie[]>(() => {
    const live = (data?.liveMovies || []).map((movie) => ({
      id: movie.imdbId,
      title: movie.title,
      language: movie.language.split(",")[0]?.trim() || "Indian cinema",
      posterUrl: movie.posterUrl,
      status: "Live record" as const,
      filmPulse: scoreFor(movie.imdbId, 78, 18),
      trust: scoreFor(`${movie.imdbId}-trust`, 82, 14),
      risk:
        scoreFor(movie.imdbId, 0, 10) > 6
          ? ("Medium" as const)
          : ("Low" as const),
    }));

    const upcoming = (data?.verifiedUpcomingMovies || []).map((movie) => ({
      id: movie.id,
      title: movie.title,
      language: movie.language,
      posterUrl: movie.posterUrl,
      status: "Verified upcoming" as const,
      filmPulse: scoreFor(movie.id, 74, 20),
      trust: scoreFor(`${movie.id}-trust`, 80, 16),
      risk:
        scoreFor(movie.id, 0, 10) > 6
          ? ("Medium" as const)
          : ("Low" as const),
    }));

    return [...live, ...upcoming]
      .sort((first, second) => second.filmPulse - first.filmPulse)
      .slice(0, 4);
  }, [data]);

  const filteredOpportunities = opportunities.filter((movie) =>
    movie.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const watchlistMovies = opportunities
    .filter((movie) => watchlist.includes(movie.title))
    .slice(0, 3);

  const featuredMovie = opportunities[0];

  function addActivity(message: string) {
    setActivity((current) =>
      [
        {
          id: `${Date.now()}-${Math.random()}`,
          message,
          createdAt: "Just now",
        },
        ...current,
      ].slice(0, 6),
    );
  }

  function toggleWatchlist(title: string) {
    const isWatching = watchlist.includes(title);

    setWatchlist((current) =>
      isWatching
        ? current.filter((item) => item !== title)
        : [...current, title],
    );

    addActivity(
      isWatching
        ? `Removed ${title} from your demo watchlist.`
        : `Added ${title} to your demo watchlist.`,
    );
  }

  function investDemo(movie: DashboardMovie) {
    const demoAmount = 10000;

    setPortfolio((current) => ({
      investmentCount: current.investmentCount + 1,
      value: current.value + demoAmount,
    }));

    addActivity(
      `Added a ${formatDemoValue(demoAmount)} simulated investment for ${movie.title}.`,
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
              Investor dashboard · demo mode
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
              Your film intelligence overview
            </h1>
          </div>

          <label className="w-full sm:w-auto sm:min-w-[340px]">
            <span className="sr-only">Search opportunities</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search today’s opportunities"
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#00ABE4]"
            />
          </label>
        </header>

        <section className="mt-6 overflow-hidden rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                Market pulse
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Good morning, Rakesh.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                Market attention is concentrated around upcoming pan-India
                projects. Review momentum and trust signals before using the
                demo investment flow.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#087ba8]">
                Today
              </p>
              <p className="mt-3 text-3xl font-black">Positive</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {opportunities.length || "No"} curated opportunities are available for review.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Portfolio", formatDemoValue(portfolio.value), "Simulated value only"],
            [
              "Active investments",
              portfolio.investmentCount.toString(),
              "Demo investments in this browser",
            ],
            ["Market FilmPulse", "78", "Simulated platform average"],
            ["Trust status", "Verified", "Demo profile · no real KYC"],
          ].map(([label, value, note]) => (
            <article
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.13em] text-slate-500">
                {label}
              </p>
              <p className="mt-3 text-3xl font-black">{value}</p>
              <p className="mt-2 text-sm text-slate-500">{note}</p>
            </article>
          ))}
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                  Today’s opportunities
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Review with confidence
                </h2>
              </div>

              <a href="/movies" className="text-sm font-black text-[#087ba8]">
                View all movies -&gt;
              </a>
            </div>

            {loading && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-72 animate-pulse rounded-3xl bg-slate-200"
                  />
                ))}
              </div>
            )}

            {!loading && filteredOpportunities.length === 0 && (
              <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <p className="font-black">No matching opportunity found.</p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a different movie title.
                </p>
              </div>
            )}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {filteredOpportunities.map((movie, index) => (
                <article
                  key={movie.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
                >
                  <div
                    className={`relative h-52 overflow-hidden ${
                      !movie.posterUrl
                        ? fallbackStyle(index)
                        : "bg-[#0f2742]"
                    }`}
                  >
                    {movie.posterUrl && (
                      <img
                        src={movie.posterUrl}
                        alt={`${movie.title} poster`}
                        className="h-full w-full object-cover"
                      />
                    )}

                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(4,14,31,0.82)_100%)]" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-black tracking-[0.13em] text-white/75">
                        {movie.language.toUpperCase()}
                      </p>
                      <h3 className="mt-1 text-2xl font-black">{movie.title}</h3>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.12em] text-[#087ba8]">
                          FilmPulse · demo
                        </p>
                        <p className="mt-1 text-3xl font-black">{movie.filmPulse}</p>
                      </div>

                      <div className="text-right text-sm">
                        <p className="font-black">Trust {movie.trust}</p>
                        <p
                          className={
                            movie.risk === "Low"
                              ? "mt-1 font-bold text-emerald-600"
                              : "mt-1 font-bold text-amber-600"
                          }
                        >
                          Risk: {movie.risk}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <a
                        href={`/movies/${movie.id}`}
                        className="rounded-xl border border-slate-200 px-2 py-3 text-center text-xs font-black text-slate-700"
                      >
                        Intelligence
                      </a>

                      <button
                        type="button"
                        onClick={() => toggleWatchlist(movie.title)}
                        className="rounded-xl bg-[#0f2742] px-2 py-3 text-xs font-black text-white"
                      >
                        {watchlist.includes(movie.title) ? "Watching" : "Watchlist"}
                      </button>

                      <button
                        type="button"
                        onClick={() => investDemo(movie)}
                        className="rounded-xl bg-[#00ABE4] px-2 py-3 text-xs font-black text-[#0f2742]"
                      >
                        Invest demo
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <section
              id="portfolio"
              className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Portfolio overview · demo
              </p>
              <h2 className="mt-2 text-2xl font-black">
                {portfolio.investmentCount > 0
                  ? `${portfolio.investmentCount} simulated investment${portfolio.investmentCount === 1 ? "" : "s"} recorded.`
                  : "Your demo portfolio is ready when you are."}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Portfolio value: {formatDemoValue(portfolio.value)}. This data is stored only in this browser for the FilmTrade project demo. No money is processed and no real ownership is created.
              </p>
              <a
                href="/movies"
                className="mt-5 inline-flex rounded-xl bg-[#00ABE4] px-4 py-3 text-sm font-black text-[#0f2742]"
              >
                Explore movie intelligence
              </a>
            </section>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                AI Copilot · demo
              </p>
              <h2 className="mt-3 text-2xl font-black">Today’s guidance</h2>

              <div className="mt-5 space-y-4 text-sm leading-6">
                <div>
                  <p className="font-black">Summary</p>
                  <p className="mt-1 text-slate-600">
                    Upcoming projects currently lead the demo catalogue by FilmPulse score.
                  </p>
                </div>

                <div>
                  <p className="font-black">Reasoning</p>
                  <p className="mt-1 text-slate-600">
                    This is simulated intelligence based on catalogue metadata and transparent demo scoring.
                  </p>
                </div>

                <div>
                  <p className="font-black">Suggested action</p>
                  <p className="mt-1 text-slate-600">
                    Compare trust and risk labels before opening a movie intelligence page.
                  </p>
                </div>
              </div>

              {featuredMovie && (
                <a
                  href={`/movies/${featuredMovie.id}`}
                  className="mt-6 block rounded-xl bg-[#0f2742] px-4 py-3 text-center text-sm font-black text-white"
                >
                  Review {featuredMovie.title}
                </a>
              )}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                    Your watchlist
                  </p>
                  <h2 className="mt-2 text-xl font-black">Following</h2>
                </div>

                <a href="/watchlist" className="text-xs font-black text-[#00ABE4]">
                  View all
                </a>
              </div>

              <div className="mt-5 space-y-3">
                {watchlistMovies.length > 0 ? (
                  watchlistMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-[#f8fafc] p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-black">{movie.title}</p>
                        <p className="mt-1 text-xs font-bold text-slate-500">
                          FilmPulse demo {movie.filmPulse}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleWatchlist(movie.title)}
                        className="text-xs font-black text-[#087ba8]"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl bg-[#f8fafc] p-4 text-sm text-slate-500">
                    Add a title from today’s opportunities.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Recent activity
              </p>

              <div className="mt-5 space-y-4 text-sm">
                {activity.map((item) => (
                  <div key={item.id}>
                    <p className="font-semibold">{item.message}</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">
                      {item.createdAt}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
                Trust & protection
              </p>
              <p className="mt-3 text-lg font-black text-emerald-950">
                Transparent demo experience
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-800">
                FilmTrade demonstrates decision support only. It does not verify identity, hold funds, process payments, or create real investments.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}