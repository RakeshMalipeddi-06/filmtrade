"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Movie = {
  id: string;
  title: string;
  posterUrl: string | null;
  language: string;
  status: string;
  pulse: number;
};

type LoggedInUser = {
  name?: string;
  email?: string;
  role?: string;
};

type MovieApiResponse = {
  liveMovies?: Array<{
    imdbId: string;
    title: string;
    posterUrl: string | null;
    language: string;
    verifiedStatus?: string | null;
  }>;
  verifiedUpcomingMovies?: Array<{
    id: string;
    title: string;
    posterUrl: string | null;
    language: string;
    status?: string;
  }>;
};

const USER_KEY = "filmtrade-demo-user";

const fallbackMovies: Movie[] = [
  {
    id: "dragon",
    title: "Dragon",
    posterUrl: null,
    language: "Telugu",
    status: "Upcoming",
    pulse: 91,
  },
  {
    id: "the-paradise",
    title: "The Paradise",
    posterUrl: null,
    language: "Telugu",
    status: "In production",
    pulse: 93,
  },
  {
    id: "spirit",
    title: "Spirit",
    posterUrl: null,
    language: "Telugu",
    status: "Announced",
    pulse: 89,
  },
  {
    id: "ramayana",
    title: "Ramayana",
    posterUrl: null,
    language: "Hindi",
    status: "Announced",
    pulse: 87,
  },
  {
    id: "they-call-him-og-2",
    title: "They Call Him OG 2",
    posterUrl: null,
    language: "Telugu",
    status: "Upcoming",
    pulse: 85,
  },
  {
    id: "god-of-war",
    title: "God of War",
    posterUrl: null,
    language: "Telugu",
    status: "TBA",
    pulse: 84,
  },
  {
    id: "pushpa-3",
    title: "Pushpa 3: The Rampage",
    posterUrl: null,
    language: "Telugu",
    status: "TBA",
    pulse: 82,
  },
  {
    id: "kalki-2898-ad-part-2",
    title: "Kalki 2898 AD Part 2",
    posterUrl: null,
    language: "Telugu",
    status: "Reported",
    pulse: 86,
  },
];

function scoreFor(id: string, base: number) {
  let hash = 0;

  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) % 100;
  }

  return Math.min(96, base + (hash % 13));
}

function TinyChart({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 120 35" className="mt-2 h-7 w-full">
      <path
        d="M0 29 C12 25, 14 18, 25 22 S39 13, 50 18 S63 25, 75 13 S91 22, 101 10 S112 13, 120 4"
        fill="none"
        stroke={light ? "#A7C7E7" : "#10B981"}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatCard({
  title,
  value,
  detail,
  dark = false,
  icon,
}: {
  title: string;
  value: string;
  detail: string;
  dark?: boolean;
  icon?: string;
}) {
  return (
    <article
      className={`h-[126px] min-w-0 rounded-[20px] p-4 shadow-[0_10px_30px_rgba(20,40,80,0.08)] ${
        dark
          ? "bg-[linear-gradient(145deg,#1C2B48,#10223D)] text-white"
          : "bg-white text-[#1C2B48]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className={`text-xs font-bold ${dark ? "text-[#E8ECEF]" : "text-slate-500"}`}>
          {title}
        </p>

        {icon && (
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#E8ECEF] text-sm text-[#2563EB]">
            {icon}
          </span>
        )}
      </div>

      <p className="mt-3 text-3xl font-black tracking-tight">{value}</p>

      {title !== "Active Investments" && <TinyChart light={dark} />}

      <p className={`mt-1 text-[11px] font-bold ${dark ? "text-[#C4D8E5]" : "text-slate-500"}`}>
        <span className="mr-1 text-[#10B981]">↑</span>
        {detail}
      </p>
    </article>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeMovie, setActiveMovie] = useState(0);
  const [userName, setUserName] = useState("User");
  const [portfolio, setPortfolio] = useState({
  investmentCount: 0,
  value: 0,
});
  const [userRole, setUserRole] = useState("Investor");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    try {
      const savedUser = window.localStorage.getItem(USER_KEY);

      if (!savedUser) return;

      const user = JSON.parse(savedUser) as LoggedInUser;
      const email =
  (user.email || "guest")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");

const portfolioKey = `filmtrade-portfolio-${email}`;

const savedPortfolio = localStorage.getItem(portfolioKey);

if (savedPortfolio) {
  setPortfolio(JSON.parse(savedPortfolio));
}

      if (user.name?.trim()) {
        setUserName(user.name.trim());
      }

      if (user.role?.trim()) {
        setUserRole(user.role.trim());
      }
    } catch {
      setUserName("User");
      setUserRole("Investor");
    }
  }, []);

  useEffect(() => {
    async function loadMovies() {
      try {
        const response = await fetch("/api/telugu-movies");

        if (!response.ok) {
          throw new Error("Unable to load movie catalogue.");
        }

        const data = (await response.json()) as MovieApiResponse;

        const upcomingMovies = (data.verifiedUpcomingMovies ?? []).map((movie) => ({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
          language: movie.language,
          status: movie.status || "Upcoming",
          pulse: scoreFor(movie.id, 82),
        }));

        const liveMovies = (data.liveMovies ?? []).map((movie) => ({
          id: movie.imdbId,
          title: movie.title,
          posterUrl: movie.posterUrl,
          language: movie.language.split(",")[0]?.trim() || "Indian cinema",
          status: movie.verifiedStatus || "Released",
          pulse: scoreFor(movie.imdbId, 78),
        }));

        const uniqueMovies = [...upcomingMovies, ...liveMovies].filter(
          (movie, index, array) =>
            array.findIndex(
              (item) => item.title.toLowerCase() === movie.title.toLowerCase(),
            ) === index,
        );

        setMovies(uniqueMovies.slice(0, 14));
      } catch {
        setMovies([]);
      }
    }

    loadMovies();
  }, []);

  const carouselMovies = movies.length > 0 ? movies : fallbackMovies;

  const featuredMovie = carouselMovies[activeMovie] ?? fallbackMovies[0];

  const watchlistMovies = useMemo(
    () => carouselMovies.slice(0, 3),
    [carouselMovies],
  );

  const searchResults = carouselMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  const hasSearchText = searchQuery.trim().length > 0;
  const profileInitial = userName.charAt(0).toUpperCase() || "U";

  function openMovie(movie: Movie, index?: number) {
    if (typeof index === "number") {
      setActiveMovie(index);
    }

    setSearchQuery("");
    setShowSearchResults(false);
    router.push(`/movies/${movie.id}`);
  }

  return (
    <main className="h-[calc(100vh-88px)] overflow-hidden bg-[#F8FAFC] p-4 text-[#1C2B48] lg:p-5">
      <div className="mx-auto h-full max-w-[1600px]">
        <header className="flex h-[58px] items-center justify-between gap-4 rounded-[20px] bg-white px-5 shadow-[0_8px_25px_rgba(20,40,80,0.07)]">
          <div className="relative hidden max-w-[560px] flex-1 md:block">
            <label className="flex items-center gap-3 rounded-full bg-[#F8FAFC] px-5 py-2.5">
              <span className="text-lg text-slate-400">⌕</span>

              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Search movies, producers, projects..."
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </label>

            {showSearchResults && hasSearchText && (
              <div className="absolute left-0 top-[52px] z-50 w-full overflow-hidden rounded-2xl border border-[#C4D8E5] bg-white p-2 shadow-[0_18px_40px_rgba(20,40,80,0.18)]">
                {searchResults.length > 0 ? (
                  searchResults.slice(0, 5).map((movie) => (
                    <button
                      key={movie.id}
                      type="button"
                      onClick={() => openMovie(movie)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#E8ECEF]"
                    >
                      <div className="h-10 w-8 overflow-hidden rounded-md bg-[#1C2B48]">
                        {movie.posterUrl ? (
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black text-[#1C2B48]">
                          {movie.title}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {movie.language} · {movie.status}
                        </p>
                      </div>

                      <span className="text-xs font-black text-[#10B981]">
                        {movie.pulse}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-4">
                    <p className="text-sm font-black text-[#1C2B48]">
                      Movie record unavailable
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      “{searchQuery}” is not available in the current FilmTrade
                      movie database. This title has not yet been indexed in the
                      verified catalogue. Please check again after future
                      catalogue updates.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <a href="/movies" className="text-sm font-black text-[#2563EB] md:hidden">
            Browse movies
          </a>

          <div className="ml-auto flex items-center gap-4">
            <a href="/activity" className="relative text-xl">
              ♧
              <span className="absolute -right-2 -top-2 grid h-4 w-4 place-items-center rounded-full bg-[#8EB1D1] text-[9px] font-black text-[#1C2B48]">
                8
              </span>
            </a>

            <a href="/profile" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(145deg,#8EB1D1,#1C2B48)] text-sm font-black text-white">
                {profileInitial}
              </div>

              <div className="hidden sm:block">
                <p className="font-serif text-base font-black">{userName}</p>
                <p className="text-[11px] text-slate-500">{userRole}</p>
              </div>
            </a>
          </div>
        </header>

        <div className="mt-4 grid h-[calc(100%-74px)] gap-4 xl:grid-cols-[minmax(0,1fr)_350px]">
          <div className="min-w-0 overflow-hidden">
            <section className="relative col-span-1 overflow-hidden rounded-[28px] border border-[#d9e8f3] bg-[linear-gradient(105deg,#f8fbff_0%,#e8f3ff_50%,#a7cdf0_100%)] px-8 py-7 shadow-[0_12px_30px_rgba(27,67,110,0.08)] lg:col-span-2">
  <div className="absolute inset-y-0 right-0 w-[48%] bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.9),transparent_22%),linear-gradient(135deg,rgba(135,187,229,0.22),rgba(51,125,192,0.38))]" />
<div className="relative z-10 flex min-h-[180px] items-center justify-between gap-6">
  
    <div className="max-w-[58%]">
      <p className="font-serif text-[27px] leading-tight text-[#183a62] sm:text-[32px]">
        Good Morning 👋
      </p>

      <h1 className="mt-1 font-serif text-[42px] font-bold leading-none text-[#102d50] sm:text-[54px]">
        {userName}
      </h1>

      <p className="mt-4 text-sm font-semibold text-[#3d6388] sm:text-[15px]">
        Discover. Analyze. Invest. Grow with FilmTrade.
      </p>
    </div>

    <div className="relative flex h-[128px] w-[180px] shrink-0 items-center justify-center sm:h-[145px] sm:w-[210px]">
      <div className="absolute h-24 w-24 rounded-full bg-white/60 blur-2xl" />

      <div className="film-clapper relative z-10 text-[82px] leading-none sm:text-[98px]">
        🎬
      </div>
    </div>
  </div>
</section>

            <section className="mt-4 grid grid-cols-5 gap-3">
              <StatCard title="Total Portfolio" value={`₹${portfolio.value.toLocaleString("en-IN")}`} detail="12.4% this month" dark />
              <StatCard title="FilmPulse Avg." value="78" detail="6.4% from yesterday" dark />
              <StatCard title="Active Investments" value={portfolio.investmentCount.toString()} detail="2 new this week" icon="▣" />
              <StatCard title="Total Returns" value={`₹${Math.round(portfolio.value * 0.18).toLocaleString("en-IN")}`} detail="18.7% overall" />
              <StatCard title="Trust Score" value="92" detail="Verified Investor" icon="♢" />
            </section>
            

            <section className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-black">🔥 Trending Now</h2>

                <a href="/movies" className="text-sm font-black text-[#2563EB]">
                  View All
                </a>
              </div>

              <div className="flex gap-3 overflow-hidden">
                {carouselMovies.slice(0, 5).map((movie, index) => {
  const estimatedROI = Math.max(8, Math.round(movie.pulse / 3));

  return (
    <button
                    key={movie.id}
                    type="button"
                    onClick={() => openMovie(movie, index)}
                    className="group relative w-[calc(20%-10px)] min-w-[130px] overflow-hidden rounded-[20px] bg-white text-left border border-transparent shadow-[0_10px_30px_rgba(20,40,80,0.12)] transition-all duration-300 hover:-translate-y-2 hover:border-sky-300 hover:shadow-[0_25px_60px_rgba(37,99,235,0.28)]"
                  >
                    <div className="relative h-[118px] overflow-hidden bg-[#1C2B48]">
                      {movie.posterUrl ? (
  <img
    src={movie.posterUrl}
    alt={movie.title}
    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
  />
) : (
  <div className="relative flex h-full items-end overflow-hidden bg-[linear-gradient(145deg,#0B1F3A,#2563EB_58%,#8EB1D1)] p-3">
    <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full border-[14px] border-white/15" />
    <div className="absolute -bottom-8 -left-7 h-24 w-24 rounded-full bg-cyan-200/20 blur-xl" />
    <div className="absolute right-3 top-3 text-2xl opacity-80">🎬</div>

    <div className="relative">
      <p className="text-[9px] font-black tracking-[0.18em] text-cyan-100/80">
        FILMTRADE
      </p>
      <p className="mt-1 text-xl font-black leading-none text-white">
        {movie.title}
      </p>
    </div>
  </div>
)}

                      <div className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[9px] font-black text-white">
  AI PICK
</div>

<div className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-[9px] font-black text-white">
  ↗ HOT
</div>
                        
                    </div>

                    <div className="p-3">

  <div className="flex items-center justify-between">

    <p className="truncate text-sm font-black">
      {movie.title}
    </p>

    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] font-black text-green-700">
      Strong Buy
    </span>

  </div>

  <div className="mt-2 flex items-center justify-between">

    <span className="text-xs font-bold text-slate-500">
      FilmPulse
    </span>

    <span className="text-lg font-black text-[#1C2B48]">
      {movie.pulse}
    </span>

  </div>

  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">

    <div
      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-green-500"
      style={{ width: `${movie.pulse}%` }}
    />

  </div>

  <div className="mt-3 flex items-center justify-between text-[11px]">

    <span className="rounded-full bg-blue-50 px-2 py-1 font-bold text-blue-700">
  ROI {estimatedROI}%
</span>

    <span className="font-bold text-green-600">
      ↗ Trending
    </span>

  </div>

</div>
                  </button>
  );
})}
              </div>
            </section>

            <section className="mt-4 rounded-[22px] bg-[linear-gradient(110deg,#E8ECEF,#C4D8E5)] p-4 shadow-[0_8px_25px_rgba(20,40,80,0.06)]">
              <p className="text-sm font-black text-[#1C2B48]">✦ AI Copilot Insights</p>

              <div className="mt-3 grid grid-cols-4 gap-3">
                {[
                  "Dragon is gaining strong momentum in youth audience.",
                  "Action & Fantasy demand increased by 32%.",
                  "3 watchlist projects are trending right now.",
                  "Ramayana has highest FilmPulse.",
                ].map((insight, index) => (
                  <article key={insight} className="rounded-[15px] bg-white/80 p-3">
                    <p className="text-xs font-semibold leading-5">{insight}</p>

                    <span className="mt-2 inline-grid h-7 w-7 place-items-center rounded-full bg-[#C4D8E5] text-xs text-[#1C2B48]">
                      {["↗", "◫", "♡", "✦"][index]}
                    </span>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4 overflow-hidden">
            <section className="rounded-[24px] bg-[linear-gradient(145deg,#E8ECEF,#C4D8E5)] p-5 shadow-[0_10px_30px_rgba(20,40,80,0.08)]">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-black">✦ AI Copilot</h2>

                <span className="rounded-full bg-[#1C2B48] px-3 py-1 text-[10px] font-black text-white">
                  NEW
                </span>
              </div>

              <div className="mt-4 rounded-[18px] bg-white/55 p-4">
                <p className="font-serif text-lg font-black">
                  Here’s your smart summary for today.
                </p>

                <ul className="mt-4 space-y-2 text-xs font-medium">
                  {[
                    "2 projects gained high momentum",
                    "1 milestone approved",
                    "FilmPulse increased for 3 projects",
                    `Recommended: Review ${featuredMovie.title}`,
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#2563EB]">●</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="/activity"
                  className="mt-5 inline-flex items-center gap-3 rounded-xl bg-[#1C2B48] px-4 py-2.5 text-xs font-black text-white"
                >
                  View Full Insights <span>→</span>
                </a>
              </div>
            </section>

            <section className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(20,40,80,0.08)]">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-black">Your Watchlist</h2>

                <a href="/watchlist" className="text-xs font-black text-[#2563EB]">
                  View All
                </a>
              </div>

              <div className="mt-3 divide-y divide-slate-100">
                {watchlistMovies.map((movie) => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => openMovie(movie)}
                    className="flex w-full items-center gap-3 py-2.5 text-left"
                  >
                    <div className="h-10 w-8 overflow-hidden rounded-md bg-[#1C2B48]">
                      {movie.posterUrl ? (
                        <img src={movie.posterUrl} alt={movie.title} className="h-full w-full object-cover" />
                      ) : null}
                    </div>

                    <p className="min-w-0 flex-1 truncate text-xs font-black">{movie.title}</p>
                    <p className="text-[10px] font-black text-[#10B981]">FilmPulse {movie.pulse}</p>
                    <span className="text-[#2563EB]">▯</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] bg-white p-5 shadow-[0_10px_30px_rgba(20,40,80,0.08)]">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-black">Recent Notifications</h2>

                <a href="/activity" className="text-xs font-black text-[#2563EB]">
                  View All
                </a>
              </div>

              <div className="mt-3 space-y-3">
                {[
                  [`FilmPulse increased for ${featuredMovie.title}`, "2h ago"],
                  ["Milestone approved for Coolie", "4h ago"],
                  ["New project added: Lokesh 67", "6h ago"],
                ].map(([message, time], index) => (
                  <div key={message} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#E8ECEF] text-xs text-[#2563EB]">
                      {["⌂", "✉", "▯"][index]}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold">{message}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
                </div>
      </div>

      <style jsx global>{`
        @keyframes filmClap {
          0%,
          100% {
            transform: rotate(0deg) translateY(0);
          }

          20% {
            transform: rotate(-8deg) translateY(-5px);
          }

          40% {
            transform: rotate(5deg) translateY(1px);
          }

          60% {
            transform: rotate(-3deg) translateY(-2px);
          }
        }

        .film-clapper {
          display: inline-block;
          transform-origin: center bottom;
          animation: filmClap 2.8s ease-in-out infinite;
          filter: drop-shadow(0 14px 12px rgba(34, 74, 115, 0.22));
        }
      `}</style>
    </main>
  );
}