"use client";

import { useState } from "react";

const preferences = [
  {
    title: "FilmPulse updates",
    detail: "Receive illustrative score changes for saved demo projects.",
    enabled: true,
  },
  {
    title: "Milestone updates",
    detail: "Receive mock production-stage and timeline updates.",
    enabled: true,
  },
  {
    title: "Weekly discovery digest",
    detail: "Receive a UI-only weekly summary of fictional projects.",
    enabled: false,
  },
];

export default function ProfilePage() {
  const [settings, setSettings] = useState(preferences);

  function togglePreference(index: number) {
    setSettings((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <a href="/dashboard" className="text-sm font-black text-[#00ABE4]">
          ← Back to dashboard
        </a>

        <section className="mt-5 overflow-hidden rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-[#0f2742] text-2xl font-black text-white shadow-sm">
                DU
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                  Demo investor profile
                </p>
                <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  Demo User
                </h1>
                <p className="mt-2 text-sm font-semibold text-slate-600">
                  FilmTrade student portfolio workspace
                </p>
              </div>
            </div>

            <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
              UI-only demo profile
            </span>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                    Account details
                  </p>
                  <h2 className="mt-3 text-2xl font-black">Demo profile information</h2>
                </div>
                <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-black transition hover:border-[#00ABE4] hover:bg-[#e9f1fa] hover:text-[#087ba8]">
                  Edit demo profile
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Display name", "Demo User"],
                  ["Workspace role", "Investor demo"],
                  ["Account type", "Student portfolio simulation"],
                  ["Project region", "Not set in demo"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-[#f8fafc] p-5">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                      {label}
                    </p>
                    <p className="mt-3 text-sm font-black text-[#0f2742]">{value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Notification preferences
              </p>
              <h2 className="mt-3 text-2xl font-black">Demo workspace alerts</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                These switches work only in the current browser session. They do not send emails or notifications.
              </p>

              <div className="mt-6 space-y-4">
                {settings.map((setting, index) => (
                  <div
                    key={setting.title}
                    className="flex items-center justify-between gap-5 rounded-2xl border border-slate-200 p-5"
                  >
                    <div>
                      <h3 className="font-black">{setting.title}</h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                        {setting.detail}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePreference(index)}
                      aria-pressed={setting.enabled}
                      aria-label={`Toggle ${setting.title}`}
                      className={`relative h-8 w-14 shrink-0 rounded-full transition ${
                        setting.enabled ? "bg-[#00ABE4]" : "bg-slate-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow-sm transition ${
                          setting.enabled ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Mock KYC status
              </p>
              <div className="mt-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-xl">
                  ✓
                </span>
                <div>
                  <p className="text-lg font-black">Demo verified</p>
                  <p className="mt-1 text-sm text-slate-300">Illustrative status only</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">
                No identity documents, personal data, verification checks, or compliance workflows are collected or processed.
              </p>
              <button className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-black text-[#0f2742]">
                View mock KYC flow
              </button>
            </section>

            <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Portfolio preferences
              </p>
              <h2 className="mt-3 text-xl font-black">Demo discovery settings</h2>

              <div className="mt-5 space-y-3">
                {[
                  ["Preferred genres", "Drama, Mystery"],
                  ["Signal focus", "FilmPulse and milestones"],
                  ["Risk display", "Illustrative labels enabled"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white p-4">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-black text-[#0f2742]">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ABE4]">
                Demo notice
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This profile does not represent a real account, investor, identity check, portfolio, or financial preference.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}