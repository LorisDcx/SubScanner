type Props = {
  selectedCount: number;
  yearlySavings: number;
};

export function PlanSavingsBar({ selectedCount, yearlySavings }: Props) {
  if (!selectedCount || !yearlySavings) {
    return null;
  }

  return (
    <div className="relative rounded-2xl border border-emerald-500/50 bg-gradient-to-br from-emerald-900/30 to-slate-900/40 backdrop-blur-sm p-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
      <div className="relative space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Plan d&apos;économies potentiel
          </p>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-white">
            {yearlySavings.toFixed(0)} €
          </span>
          <span className="text-slate-400">/an</span>
        </div>
        <p className="text-sm text-slate-300">
          En résiliant {selectedCount} abonnement{selectedCount > 1 ? 's' : ''} sélectionné{selectedCount > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
