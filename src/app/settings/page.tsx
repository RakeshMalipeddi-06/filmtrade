"use client";

import { useState } from "react";

type ToggleSetting = {
  title: string;
  detail: string;
  enabled: boolean;
};

const initialToggles: ToggleSetting[] = [
  {
    title: "Reduced motion",
    detail: "Reduce decorative transitions in this browser session.",
    enabled: false,
  },
  {
    title: "Compact dashboard",
    detail: "Use a denser demo dashboard layout in a future UI update.",
    enabled: false,
  },
  {
    title: "Show demo notices",
    detail: "Keep simulation labels visible across the FilmTrade interface.",
    enabled: true,
  },
];

export default function SettingsPage() {
  const [toggles, setToggles] = useState(initialToggles);
  const [density, setDensity] = useState("Comfortable");
  const [message, setMessage] = useState("");

  function toggleSetting(index: number) {
    setToggles((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, enabled: !item.enabled } : item,
      ),
    );
    setMessage("Demo preference updated for this browser session.");
  }

  function resetDemoSettings() {
    setToggles(initialToggles);
    setDensity("Comfortable");
    setMessage("Demo settings restored.");
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] px-5 py-8 text-[#0f172a] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <a href="/dashboard" className="text-sm font-black text-[#00ABE4]">
          ← Back to dashboard
        </a>

        <section className="mt-5 rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-7 shadow-sm sm:p-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087ba8]">
                Workspace settings
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                Customize the demo workspace.
              </h1>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                These controls demonstrate a settings interface. They do not change a real account or save data permanently.
              </p>
            </div>

            <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-black text-[#087ba8] shadow-sm">
              UI-only demo settings
            </span>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Interface preferences
              </p>
              <h2 className="mt-3 text-2xl font-black">Demo display controls</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Changes apply only while this page is open. Refreshing restores the default state.
              </p>

              <div className="mt-6 space-y-4">
                {toggles.map((setting, index) => (
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
                      onClick={() => toggleSetting(index)}
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

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#00ABE4]">
                Dashboard layout
              </p>
              <h2 className="mt-3 text-2xl font-black">Choose demo density</h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Comfortable", "Compact", "Spacious"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setDensity(option);
                      setMessage(`Demo density set to ${option}.`);
                    }}
                    className={`rounded-2xl border p-5 text-left transition ${
                      density === option
                        ? "border-[#00ABE4] bg-[#e9f1fa] text-[#087ba8]"
                        : "border-slate-200 bg-white hover:border-[#00ABE4]"
                    }`}
                  >
                    <p className="font-black">{option}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {option === "Comfortable" && "Balanced spacing for the current dashboard."}
                      {option === "Compact" && "More information in a smaller visual area."}
                      {option === "Spacious" && "More room between cards and sections."}
                    </p>
                  </button>
                ))}
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-[#0f2742] p-6 text-white shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">
                Demo data
              </p>
              <h2 className="mt-3 text-2xl font-black">Restore defaults</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Reset the visible UI preferences on this page. Local fictional project data is not changed.
              </p>
              <button
                onClick={resetDemoSettings}
                className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-sm font-black text-[#0f2742]"
              >
                Restore demo settings
              </button>
            </section>

            <section className="rounded-3xl border border-[#d6e6f5] bg-[#e9f1fa] p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087ba8]">
                Current demo state
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                    Layout density
                  </p>
                  <p className="mt-2 text-sm font-black text-[#0f2742]">{density}</p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                    Data mode
                  </p>
                  <p className="mt-2 text-sm font-black text-[#0f2742]">
                    Local fictional data
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                    Persistence
                  </p>
                  <p className="mt-2 text-sm font-black text-[#0f2742]">
                    Current session only
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#00ABE4]">
                Demo notice
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                These settings are part of a student portfolio interface. They do not modify real account preferences, data, or notifications.
              </p>
            </section>
          </aside>
        </section>

        {message && (
          <div className="fixed bottom-5 right-5 rounded-xl bg-[#0f2742] px-4 py-3 text-sm font-bold text-white shadow-xl">
            {message}
          </div>
        )}
      </div>
    </main>
  );
}