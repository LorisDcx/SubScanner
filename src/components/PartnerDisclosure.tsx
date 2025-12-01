"use client";

import { useState } from "react";

type Props = {
  variant?: "banner" | "inline" | "modal";
  className?: string;
};

/**
 * Composant de transparence légale (DGCCRF)
 * Affiche les informations sur le fonctionnement du comparateur
 */
export function PartnerDisclosure({ variant = "banner", className = "" }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (variant === "inline") {
    return (
      <p className={`text-xs text-slate-500 ${className}`}>
        📊 Certains liens peuvent être affiliés. S&apos;ils sont utilisés, cela peut soutenir SubScanner sans coût supplémentaire pour vous.
      </p>
    );
  }

  if (variant === "modal") {
    return (
      <div className={`rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-white text-sm">Comment fonctionne ce comparateur ?</h4>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-400">
              <li>• Les résultats sont classés par prix mensuel croissant</li>
              <li>• Certains liens sont affiliés : nous pouvons percevoir une commission</li>
              <li>• Cela n&apos;influence pas le classement des offres</li>
              <li>• Aucun surcoût pour vous</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Default: banner
  return (
    <div className={`rounded-lg border border-slate-700/50 bg-slate-800/20 ${className}`}>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-slate-300">Transparence : comment fonctionne ce comparateur ?</span>
        </div>
        <svg 
          className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="rounded-lg bg-slate-900/50 p-4">
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-slate-200">Classement objectif :</strong> les offres sont triées par prix mensuel croissant par défaut.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-slate-200">Liens affiliés :</strong> certaines offres contiennent des liens affiliés. Si vous vous abonnez via ces liens, nous pouvons percevoir une commission.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-slate-200">Sans surcoût :</strong> le prix est identique que vous passiez par notre lien ou directement sur le site.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span><strong className="text-slate-200">Non exhaustif :</strong> nous ne comparons qu&apos;une partie du marché. Toutes les offres ne sont pas référencées.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Badge "lien affilié" à afficher à côté des boutons
 */
export function AffiliateBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`text-xs text-slate-500 italic ${className}`}>
      (lien affilié)
    </span>
  );
}
