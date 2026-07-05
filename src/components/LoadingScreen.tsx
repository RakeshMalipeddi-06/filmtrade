"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-full max-w-sm px-8 text-center">
        <div className="mx-auto mb-7 w-20">
          <div className="relative h-12 rounded-md bg-[#10233f] shadow-lg">
            <div className="absolute -top-3 left-0 h-4 w-full -rotate-6 rounded-sm bg-[#00ABE4]" />
            <div className="absolute left-3 top-4 h-1 w-14 rounded-full bg-white/80" />
          </div>
        </div>

        <p className="text-lg font-bold tracking-[0.18em] text-[#10233f]">
          FILM<span className="text-[#00ABE4]">TRADE</span>
        </p>
        <p className="mt-2 text-sm text-slate-500">Lights. Camera. Invest.</p>

        <div className="mt-8 h-1 overflow-hidden rounded-full bg-[#E9F1FA]">
          <div className="h-full animate-[loading_1.6s_ease-in-out_forwards] rounded-full bg-[#00ABE4]" />
        </div>
      </div>
    </div>
  );
}