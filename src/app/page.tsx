"use client";

import { demoProjects } from "@/data/demoProjects";
import LoadingScreen from "@/components/LoadingScreen";

const steps = [
  {
    number: "01",
    title: "Discover projects",
    text: "Browse fictional film concepts, production context, and clearly marked demo information.",
  },
  {
    number: "02",
    title: "Explore the workflow",
    text: "See how a simulated project review, milestone flow, and portfolio experience could work.",
  },
  {
    number: "03",
    title: "Track the story",
    text: "Follow demo updates in one transparent workspace built for learning and product exploration.",
  },
];

export default function Home() {
  return (
    <>
      <LoadingScreen />

      <main className="overflow-hidden bg-white text-[#10233f]">
        <section className="relative">
          <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_80%_18%,#dff4ff_0%,transparent_30%),linear-gradient(180deg,#f8fcff_0%,#ffffff_88%)]" />

          <div className="mx-auto max-w-7xl px-6 py-6 sm:px-10 lg:px-16">
            <nav className="flex items-center justify-between">
              <a href="#" className="text-xl font-black tracking-tight">
                FILM<span className="text-[#00ABE4]">TRADE</span>
              </a>

              <div className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
                <a className="transition hover:text-[#00ABE4]" href="#how-it-works">How it works</a>
                <a className="transition hover:text-[#00ABE4]" href="#projects">Projects</a>
                <a className="transition hover:text-[#00ABE4]" href="#transparency">Transparency</a>
              </div>

              <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:border-[#00ABE4] hover:text-[#00ABE4]">
                Sign in
              </button>
            </nav>

            <div className="grid min-h-[620px] items-center gap-14 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20">
              <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
                <p className="mb-6 inline-flex rounded-full border border-[#cfe7f2] bg-white px-4 py-2 text-sm font-bold text-[#087ba8] shadow-sm">
                  Student portfolio demo
                </p>

                <h1 className="text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                  FILM<span className="text-[#00ABE4]">TRADE</span>
                </h1>

                <p className="mt-5 text-xl font-semibold tracking-wide text-[#35516f] sm:text-2xl">
                  Lights. Camera. Invest.
                </p>

                <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg lg:mx-0">
                  A cinematic product concept for discovering film projects, understanding transparent workflows, and exploring a simulated investment experience.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <a href="#projects" className="rounded-full bg-[#00ABE4] px-6 py-3 text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:bg-[#008fbe]">
                    Explore Projects
                  </a>
                  <a href="#how-it-works" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-black text-[#10233f] shadow-sm transition hover:border-[#00ABE4] hover:text-[#00ABE4]">
                    How It Works
                  </a>
                </div>

                <p className="mt-8 text-xs leading-5 text-slate-500">
                  FilmTrade is a portfolio demo. All projects, workflows, money-related concepts, KYC, escrow, revenue, and payouts are simulated.
                </p>
              </div>

              <div className="relative mx-auto h-[410px] w-full max-w-[460px] sm:h-[470px]">
                <div className="absolute right-2 top-4 h-72 w-48 rotate-[12deg] rounded-[2rem] bg-[#10233f] p-4 text-white shadow-2xl shadow-slate-300 animate-[float_6s_ease-in-out_infinite] sm:h-80 sm:w-56">
                  <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/20 bg-[radial-gradient(circle_at_65%_25%,#3d8bb8_0%,#173653_35%,#0c1d33_72%)] p-5">
                    <span className="text-xs font-bold tracking-[0.24em] text-sky-200">DEMO FILM</span>
                    <div>
                      <p className="text-3xl font-black leading-none">ORBIT</p>
                      <p className="mt-1 text-sm tracking-[0.32em] text-sky-200">47</p>
                    </div>
                    <span className="text-xs text-slate-300">A fictional project</span>
                  </div>
                </div>

                <div className="absolute left-2 top-20 h-72 w-48 -rotate-[10deg] rounded-[2rem] bg-[#f2b76b] p-4 text-[#3f2513] shadow-2xl shadow-slate-300 animate-[float_7s_ease-in-out_infinite] sm:h-80 sm:w-56">
                  <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/40 bg-[radial-gradient(circle_at_50%_15%,#ffe4ad_0%,#e39a4f_38%,#8c3f2a_100%)] p-5">
                    <span className="text-xs font-bold tracking-[0.24em]">DEMO FILM</span>
                    <div>
                      <p className="text-2xl font-black leading-none">THE LAST</p>
                      <p className="mt-1 text-3xl font-black leading-none">FRAME</p>
                    </div>
                    <span className="text-xs font-semibold">A fictional project</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-1/2 z-10 h-80 w-52 -translate-x-1/2 rounded-[2rem] bg-[#00ABE4] p-4 text-white shadow-2xl shadow-sky-200 animate-[float_5s_ease-in-out_infinite] sm:h-96 sm:w-64">
                  <div className="flex h-full flex-col justify-between rounded-[1.5rem] border border-white/30 bg-[radial-gradient(circle_at_65%_20%,#c8f3ff_0%,#00abe4_35%,#07588b_100%)] p-6">
                    <span className="text-xs font-bold tracking-[0.24em]">DEMO FILM</span>
                    <div>
                      <p className="text-3xl font-black leading-none sm:text-4xl">AFTER</p>
                      <p className="mt-1 text-3xl font-black leading-none sm:text-4xl">THE</p>
                      <p className="mt-1 text-3xl font-black leading-none sm:text-4xl">MONSOON</p>
                    </div>
                    <span className="text-xs text-sky-100">A fictional project</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#00ABE4]">How FilmTrade Works</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">A simple product journey, built as a transparent demo.</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="rounded-3xl border border-slate-100 bg-[#f8fcff] p-7 shadow-sm">
                <p className="text-sm font-black text-[#00ABE4]">{step.number}</p>
                <h3 className="mt-8 text-xl font-black">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="bg-[#f6fbff] py-24">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#00ABE4]">Featured projects</p>
                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Fictional stories. Clear demo labels.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-slate-500">These concepts exist only to demonstrate product design, information architecture, and user flows.</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {demoProjects.map((project) => (
                <article key={project.title} className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div className={`flex h-56 items-end bg-gradient-to-br ${project.accent} p-6 text-white`}>
                    <div>
                      <p className="text-xs font-black tracking-[0.2em] text-white/80">FICTIONAL FILM</p>
                      <h3 className="mt-2 text-3xl font-black leading-none">{project.artwork}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="rounded-full bg-[#E9F1FA] px-3 py-1 text-xs font-black text-[#087ba8]">{project.status}</span>
                    <h3 className="mt-5 text-xl font-black">{project.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-[#087ba8]">{project.genre}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{project.description}</p>
                    <button className="mt-6 text-sm font-black text-[#00ABE4]">View demo project →</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="transparency" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
          <div className="grid gap-10 rounded-[2rem] bg-[#10233f] p-8 text-white shadow-2xl sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#7edfff]">Trust and transparency</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Designed to make each step easier to understand.</h2>
              <p className="mt-6 max-w-xl leading-8 text-slate-300">
                FilmTrade demonstrates how project information, production milestones, and revenue-sharing records could be organized in one product experience. It does not verify projects or process financial activity.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {["Project information with source and confidence labels", "Milestone tracking shown as a demo workflow", "Revenue sharing history marked as demo simulation"].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-5 text-sm font-semibold leading-6 text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#cfe7f2] bg-[#eaf7ff] px-8 py-16 text-center sm:px-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#00ABE4]">Explore the concept</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">See how a modern film discovery platform could feel.</h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">Start with fictional projects and explore the FilmTrade portfolio demo experience.</p>
            <a href="#projects" className="mt-8 inline-block rounded-full bg-[#00ABE4] px-6 py-3 text-sm font-black text-white shadow-lg shadow-sky-200 transition hover:bg-[#008fbe]">
              Explore Demo Projects
            </a>
          </div>
        </section>

        <footer className="border-t border-slate-100 px-6 py-8 sm:px-10 lg:px-16">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-bold text-[#10233f]">FILM<span className="text-[#00ABE4]">TRADE</span> · Lights. Camera. Invest.</p>
            <p>Student portfolio demo · No real financial activity</p>
          </div>
        </footer>
      </main>
    </>
  );
}