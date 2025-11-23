"use client";

import { useEffect } from "react";
import { SUPPORT_URL } from "@/config/support";
import { track } from "@/lib/analytics";

type Props = {
  estimatedSavingsYearly?: number;
  location?: string;
};

export function SupportUsCard({ estimatedSavingsYearly, location = "result_page" }: Props) {
  const yearly = estimatedSavingsYearly ? Math.round(estimatedSavingsYearly) : null;

  // Track when the component is viewed
  useEffect(() => {
    track("support_seen", { location });
  }, [location]);

  const handleClick = () => {
    // Track the click event
    track("support_click", { 
      location, 
      button_label: "Offrir un café (2 €)" 
    });
    
    // Open in new tab
    window.open(SUPPORT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative group rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all duration-300">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/5 group-hover:to-indigo-500/5 transition-all duration-300" />
      
      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400/20 to-indigo-400/20 flex items-center justify-center">
            <span className="text-2xl">☕</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">
              {yearly
                ? `Tu viens de trouver environ ${yearly} €/an d'économies 💸`
                : "Tu viens de trouver des économies potentielles 💸"}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed">
          SubScanner est 100 % gratuit. Si tu veux soutenir le projet, tu peux m'offrir un café ☕{" "}
          <span className="text-slate-400">(optionnel, mais ça aide beaucoup).</span>
        </p>

        {/* CTA Button */}
        <button
          onClick={handleClick}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-400 text-white shadow-lg
                     hover:shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98]
                     transition-all duration-200"
        >
          <span>Offrir un café (2 €)</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        {/* Secondary text */}
        <p className="text-xs text-center text-slate-400">
          Merci d'avance, même 2 € font une vraie différence 🙏
        </p>
      </div>
    </div>
  );
}
