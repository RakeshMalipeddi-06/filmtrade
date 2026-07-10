"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Clapperboard,
  Eye,
  EyeOff,
  Film,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

type Role = "Investor" | "Producer" | "Analyst";

const USER_KEY = "filmtrade-demo-user";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Investor");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function continueToWorkspace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Enter your full name to continue.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.trim().length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    window.localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        role,
        rememberMe,
      }),
    );

    router.push("/dashboard");
  }

  function adminAccess() {
    const password = window.prompt("Enter administrator password:");

    if (password !== "Rakesh@2026") {
      setError("Incorrect administrator password.");
      return;
    }

    window.localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        name: "Mr. Rakesh",
        email: "admin@filmtrade.in",
        role: "Administrator",
        rememberMe: true,
      }),
    );

    router.push("/dashboard");
  }

  return (
    <main className="h-screen overflow-hidden bg-[#C4D8E5] p-3 text-[#1C2B48] sm:p-5">
      <section className="mx-auto grid h-full max-w-[1600px] overflow-hidden rounded-[30px] bg-[#E8ECEF] shadow-[0_25px_70px_rgba(28,43,72,0.22)] lg:grid-cols-[1.15fr_0.85fr]">
        <aside className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_78%_20%,rgba(167,199,231,0.45),transparent_24%),radial-gradient(circle_at_18%_78%,rgba(142,177,209,0.4),transparent_26%),linear-gradient(145deg,#1C2B48_0%,#29496d_45%,#8EB1D1_140%)] p-9 text-white lg:flex lg:flex-col">
          <CinematicBackground />

          <div className="relative z-10 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#E8ECEF] text-[#1C2B48] shadow-lg">
              <Clapperboard size={23} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-xl font-black tracking-tight">
                FILM<span className="text-[#A7C7E7]">TRADE</span>
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-[#C4D8E5]">
                Cinema Intelligence Platform
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-[clamp(34px,7vh,76px)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#E8ECEF] backdrop-blur-md">
              <Sparkles size={13} />
              AI Powered Cinema Intelligence
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-[clamp(38px,4vw,64px)] font-black leading-[1.04] tracking-tight">
              Where India&apos;s stories
              <br />
              meet{" "}
              <span className="bg-gradient-to-r from-[#E8ECEF] via-[#A7C7E7] to-[#8EB1D1] bg-clip-text text-transparent">
                smarter investments.
              </span>
            </h1>

            <div className="mt-6 space-y-1.5 text-sm leading-6 text-[#E8ECEF]/90">
              <p>Discover emerging films.</p>
              <p>Analyze market momentum.</p>
              <p>Invest with confidence.</p>
              <p className="font-black text-[#A7C7E7]">Powered by AI.</p>
            </div>
          </div>

          <div className="relative z-10 mt-auto grid grid-cols-3 gap-3">
            <MetricCard icon={<Film size={16} />} value="120+" label="Verified Projects" />
            <MetricCard icon={<CircleDollarSign size={16} />} value="₹850Cr+" label="Opportunities" />
            <MetricCard icon={<ShieldCheck size={16} />} value="95%" label="Trust Score" />
          </div>
        </aside>

        <section className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_100%_0%,#dceaf5_0%,transparent_30%),linear-gradient(145deg,#ffffff,#E8ECEF)] p-5 sm:p-8 lg:p-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[35px] border-[#A7C7E7]/20" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border-[35px] border-[#8EB1D1]/15" />

          <div className="relative z-10 w-full max-w-[440px]">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#C4D8E5]/55 px-3 py-1.5 text-[10px] font-black tracking-[0.14em] text-[#1C2B48]">
                <BarChart3 size={13} />
                SECURE WORKSPACE ACCESS
              </div>

              <h1 className="mt-4 font-serif text-4xl font-black tracking-tight text-[#1C2B48]">
                Welcome to FilmTrade
              </h1>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Enter your details to personalize your FilmTrade workspace.
              </p>
            </div>

            <form onSubmit={continueToWorkspace} className="space-y-3.5">
              <Field label="Full Name" icon={<UserRound size={16} />}>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  className="h-[50px] w-full bg-transparent pr-3 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-slate-400"
                />
              </Field>

              <Field label="Email Address" icon={<Mail size={16} />}>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-[50px] w-full bg-transparent pr-3 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-slate-400"
                />
              </Field>

              <Field label="Password" icon={<LockKeyhole size={16} />}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a secure password"
                  className="h-[50px] w-full bg-transparent pr-10 text-sm font-semibold outline-none placeholder:font-medium placeholder:text-slate-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#1C2B48]"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </Field>

              <label className="block">
                <span className="mb-1.5 block text-xs font-black text-[#1C2B48]">
                  Workspace role
                </span>

                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value as Role)}
                  className="h-[50px] w-full rounded-2xl border border-[#C4D8E5] bg-white px-4 text-sm font-bold text-[#1C2B48] outline-none transition focus:border-[#8EB1D1] focus:ring-4 focus:ring-[#A7C7E7]/30"
                >
                  <option value="Investor">Investor</option>
                  <option value="Producer">Producer</option>
                  <option value="Analyst">Analyst</option>
                </select>
              </label>

              <div className="flex items-center justify-between text-xs">
                <label className="flex cursor-pointer items-center gap-2 font-semibold text-slate-500">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded accent-[#1C2B48]"
                  />
                  Remember me
                </label>

                <button type="button" className="font-black text-[#1C2B48] hover:text-[#2563EB]">
                  Forgot Password?
                </button>
              </div>

              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="group flex h-[52px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#1C2B48] via-[#2563EB] to-[#8EB1D1] text-sm font-black text-white shadow-[0_14px_28px_rgba(28,43,72,0.28)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_35px_rgba(28,43,72,0.38)]"
              >
                Continue to Workspace
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={adminAccess}
                className="flex h-[46px] w-full items-center justify-center gap-2 rounded-2xl border border-[#8EB1D1] bg-white text-xs font-black text-[#1C2B48] transition hover:bg-[#E8ECEF]"
              >
                <ShieldCheck size={16} />
                Administrator Access
              </button>
            </form>

            <p className="mt-5 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <button type="button" className="font-black text-[#2563EB]">
                Sign In
              </button>
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-black text-[#1C2B48]">{label}</span>

      <span className="relative flex h-[50px] items-center rounded-2xl border border-[#C4D8E5] bg-white pl-4 transition focus-within:border-[#8EB1D1] focus-within:ring-4 focus-within:ring-[#A7C7E7]/30">
        <span className="mr-3 text-[#1C2B48]">{icon}</span>
        {children}
      </span>
    </label>
  );
}

function MetricCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <article className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/15">
      <div className="text-[#A7C7E7]">{icon}</div>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
      <p className="mt-1 text-[10px] font-medium leading-4 text-[#E8ECEF]">{label}</p>
    </article>
  );
}

function CinematicBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-16 top-[18%] h-64 w-64 rounded-full border-[18px] border-white/[0.08]" />
      <div className="absolute -left-6 top-[25%] h-44 w-44 rounded-full border-[12px] border-white/[0.08]" />
      <div className="absolute left-[8%] top-[35%] h-12 w-12 rounded-full border-[7px] border-white/[0.08]" />

      <div className="absolute -right-10 top-[9%] h-72 w-72 rounded-full border-[22px] border-[#A7C7E7]/10" />
      <div className="absolute right-[13%] top-[17%] h-36 w-36 rounded-full border-[10px] border-white/[0.08]" />

      <div className="absolute bottom-[12%] right-[6%] h-44 w-56 rotate-[-14deg] rounded-xl border-y-[10px] border-white/[0.08]">
        <div className="flex h-full items-center justify-around">
          {[1, 2, 3, 4].map((item) => (
            <span key={item} className="h-7 w-7 rounded-sm border border-white/[0.08]" />
          ))}
        </div>
      </div>

      <div className="absolute bottom-[8%] left-[45%]">
        <div className="mx-auto h-10 w-24 rounded-t-[100%] border-[9px] border-white/[0.08] border-b-0" />
        <div className="mx-auto h-24 w-2 bg-white/[0.08]" />
        <div className="h-2 w-24 rounded-full bg-white/[0.08]" />
      </div>

      <div className="absolute left-[45%] top-[10%] h-[540px] w-20 rotate-[28deg] bg-gradient-to-b from-transparent via-[#E8ECEF]/15 to-transparent blur-xl" />
      <div className="absolute left-[65%] top-[15%] h-[480px] w-14 rotate-[38deg] bg-gradient-to-b from-transparent via-[#A7C7E7]/20 to-transparent blur-xl" />

      {[...Array(25)].map((_, index) => (
        <span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            left: `${(index * 23 + 7) % 96}%`,
            top: `${(index * 31 + 9) % 92}%`,
            opacity: 0.08 + (index % 5) * 0.04,
          }}
        />
      ))}
    </div>
  );
}