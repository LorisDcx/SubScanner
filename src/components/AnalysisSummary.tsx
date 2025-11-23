import { AnalysisResult } from "@/types/analysis";

type Props = {
  analysis: AnalysisResult;
};

export function AnalysisSummary({ analysis }: Props) {
  const { totalMonthly, totalYearly } = analysis;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="relative group rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-6 hover:border-emerald-500/50 transition-all duration-300">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-300" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Par mois
            </p>
          </div>
          <p className="text-3xl font-bold text-white">
            {totalMonthly.toFixed(2)} €
          </p>
        </div>
      </div>
      
      <div className="relative group rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-all duration-300">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-300" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Par an
            </p>
          </div>
          <p className="text-3xl font-bold text-white">
            {totalYearly.toFixed(2)} €
          </p>
        </div>
      </div>
    </div>
  );
}
