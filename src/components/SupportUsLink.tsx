"use client";

import { SUPPORT_URL } from "@/config/support";
import { track } from "@/lib/analytics";

export function SupportUsLink() {
  const handleClick = () => {
    track("support_click", { 
      location: "footer", 
      button_label: "Footer link" 
    });
  };

  return (
    <a
      href={SUPPORT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="text-xs text-slate-400 hover:text-purple-400 transition-colors inline-flex items-center gap-1.5 group"
    >
      <span className="group-hover:scale-110 transition-transform">💙</span>
      <span>Soutenir SubScanner</span>
    </a>
  );
}
