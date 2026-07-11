"use client";

import { useEffect, useState } from "react";
import { Clapperboard } from "lucide-react";

export default function LoadingScreen({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#07111f]">

      {/* Projector Beam */}
      <div className="absolute left-1/2 top-0 h-full w-56 -translate-x-1/2 bg-gradient-to-b from-sky-300/20 via-sky-200/10 to-transparent blur-3xl animate-pulse" />

      {/* Floating Particles */}
      {[...Array(25)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/40 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center px-6">

        <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
          <Clapperboard
            size={70}
            className="text-sky-300 animate-bounce"
          />
        </div>

        <h1 className="mt-8 text-5xl font-black tracking-[0.18em] text-white">
          FILMTRADE
        </h1>

        <p className="mt-2 text-sky-200">
          Cinema Intelligence Platform
        </p>

        <div className="mt-10 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-5 text-sm text-slate-300">
          Initializing FilmTrade Intelligence...
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Loading verified movie catalogue...
        </p>
      </div>
    </div>
  );
}