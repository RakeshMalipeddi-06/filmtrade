"use client";

import { useEffect, useMemo, useState } from "react";

type ActivityItem = {
  id: string;
  message: string;
  createdAt: string;
};

const ACTIVITY_KEY = "filmtrade-demo-activity";

const defaultActivity: ActivityItem[] = [
  {
    id: "catalogue-ready",
    message: "Catalogue refreshed. Live and verified movie records loaded.",
    createdAt: "This session",
  },
  {
    id: "demo-boundary",
    message:
      "FilmTrade is running in demo mode. No payments or real investments are processed.",
    createdAt: "This session",
  },
];

function getStoredActivity() {
  try {
    return JSON.parse(
      window.localStorage.getItem(ACTIVITY_KEY) || "[]",
    ) as ActivityItem[];
  } catch {
    return [];
  }
}

function activityType(message: string) {
  const text = message.toLowerCase();

  if (text.includes("producer submitted")) {
    return {
      label: "Producer submission",
      badge: "bg-[#e9f1fa] text-[#087ba8]",
      icon: "↗",
    };
  }

  if (text.includes("saved") && text.includes("draft")) {
    return {
      label: "Producer draft",
      badge: "bg-slate-100 text-slate-700",
      icon: "□",
    };
  }

  if (text.includes("admin changed")) {
    return {
      label: "Admin review",
      badge: "bg-amber-100 text-amber-800",
      icon: "✓",
    };
  }

  if (text.includes("investment")) {
    return {
      label: "Demo portfolio",
      badge: "bg-[#e9f1fa] text-[#087ba8]",
      icon: "₹",
    };
  }

  if (text.includes("watchlist") || text.includes("watching")) {
    return {
      label: "Watchlist",
      badge: "bg-violet-50 text-violet-700",
      icon: "★",
    };
  }

  if (text.includes("catalogue")) {
    return {
      label: "Catalogue",
      badge: "bg-emerald-50 text-emerald-700",
      icon: "✓",
    };
  }

  if (text.includes("demo mode") || text.includes("no payments")) {
    return {
      label: "Demo notice",
      badge: "bg-slate-100 text-slate-700",
      icon: "i",
    };
  }

  return {
    label: "Platform",
    badge: "bg-slate-100 text-slate-700",
    icon: "•",
  };
}

function formatTimestamp(value: string) {
  if (!value || value === "This session") {
    return "This session";
  }

  return value;
}

export default function ActivityPage() {
  const [storedActivity, setStoredActivity] = useState<ActivityItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStoredActivity(getStoredActivity());
    setReady(true);
  }, []);

  const activity = useMemo(() => {
    return [...storedActivity, ...defaultActivity];
  }, [storedActivity]);

  const summary = useMemo(() => {
    const producerEvents = storedActivity.filter((item) => {
      const text = item.message.toLowerCase();

      return text.includes("producer submitted") || text.includes("draft");
    }).length;

    const adminEvents = storedActivity.filter((item) =>
      item.message.toLowerCase().includes("admin changed"),
    ).length;

    return {
      total: activity.length,
      producerEvents,
      adminEvents,
    };
  }, [activity.length, storedActivity]);

  function clearActivity() {
    window.localStorage.removeItem(ACTIVITY_KEY);
    setStoredActivity([]);
  }

  function refreshActivity() {
    setStoredActivity(getStoredActivity());
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <a href="/dashboard" className="text-sm font-black text-[#087ba8]">
              ← Back to dashboard
            </a>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
              Demo activity log
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight">
              FilmTrade activity
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              A local record of watchlist actions, producer submissions, and
              admin review updates made in this browser.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="/producer"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Producer
            </a>

            <a
              href="/admin"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Admin
            </a>

            <a
              href="/watchlist"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Watchlist
            </a>

            <button
              type="button"
              onClick={refreshActivity}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black transition hover:border-[#00ABE4] hover:text-[#087ba8]"
            >
              Refresh
            </button>

            <button
              type="button"
              onClick={clearActivity}
              className="rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-black text-red-600 transition hover:bg-red-50"
            >
              Reset log
            </button>
          </div>
        </header>

        <section className="mt-8 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
            Activity summary
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Recorded actions
              </p>
              <p className="mt-2 text-3xl font-black">{summary.total}</p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Producer events
              </p>
              <p className="mt-2 text-3xl font-black">
                {summary.producerEvents}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Admin reviews
              </p>
              <p className="mt-2 text-3xl font-black">{summary.adminEvents}</p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">
                Storage
              </p>
              <p className="mt-2 text-xl font-black">This browser</p>
            </div>
          </div>
        </section>

        {!ready && (
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {ready && (
          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Timeline
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Producer, admin, and viewer activity
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              {activity.map((item) => {
                const type = activityType(item.message);

                return (
                  <article
                    key={item.id}
                    className="flex gap-4 px-6 py-5 transition hover:bg-[#f8fafc]"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0f2742] text-lg font-black text-white">
                      {type.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${type.badge}`}
                        >
                          {type.label}
                        </span>

                        <span className="text-xs font-bold text-slate-400">
                          {formatTimestamp(item.createdAt)}
                        </span>
                      </div>

                      <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                        {item.message}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <section className="mt-8 rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-700">
            Important
          </p>

          <p className="mt-3 text-sm leading-7 text-amber-800">
            This activity log is stored only in your current browser using local
            storage. Resetting browser data removes saved project drafts,
            submissions, review updates, and this activity history. It does not
            represent real investments, transactions, legal verification, or
            financial records.
          </p>
        </section>
      </div>
    </main>
  );
}