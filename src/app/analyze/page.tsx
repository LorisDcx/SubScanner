"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { CsvUploadZone } from "@/components/CsvUploadZone";
import { AnalysisSummary } from "@/components/AnalysisSummary";
import { SubscriptionsTable } from "@/components/SubscriptionsTable";
import { PlanSavingsBar } from "@/components/PlanSavingsBar";
import { SupportUsCard } from "@/components/SupportUsCard";
import { AnalysisResult, SubscriptionTag } from "@/types/analysis";
import { SUPPORT_URL } from "@/config/support";

const MIN_LOADING_DURATION_MS = 5000;

export default function AnalyzePage() {
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<Record<string, SubscriptionTag | undefined>>({});
  const [syncWarning, setSyncWarning] = useState<string | null>(null);

  const saveAnalysisToLocal = (analysisToSave: AnalysisResult) => {
    if (typeof window === "undefined" || !user?.email) {
      return;
    }

    try {
      localStorage.setItem(
        `subscanner:analysis:${user.email}`,
        JSON.stringify({
          savedAt: new Date().toISOString(),
          analysis: analysisToSave,
        })
      );
    } catch (err) {
      console.warn("[ANALYZE] Unable to persist analysis", err);
    }
  };

  const saveAnalysisToBackend = async (analysisToSave: AnalysisResult) => {
    if (!user) {
      return;
    }

    try {
      const token = await auth?.currentUser?.getIdToken();
      if (!token) {
        console.warn("[ANALYZE] Unable to fetch auth token for backend save");
        setSyncWarning("Impossible de sauvegarder l'analyse sur ton compte (token manquant).");
        return;
      }

      const response = await fetch("/api/analyses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ source: "analyze", analysis: analysisToSave }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message = payload?.error ?? "Erreur lors de la sauvegarde dans ton compte.";
        setSyncWarning(message);
        console.warn("[ANALYZE] Failed to persist analysis", message);
      } else {
        setSyncWarning(null);
      }
    } catch (backendError) {
      console.error("[ANALYZE] Backend save error", backendError);
      setSyncWarning("Impossible de sauvegarder l'analyse dans le compte (voir console).");
    }
  };

  const handleFileSelected = async (file: File, shouldCumulate = false) => {
    setError(null);
    setSyncWarning(null);
    setIsLoading(true);
    const minimumLoadingDelay = new Promise<void>((resolve) => setTimeout(resolve, MIN_LOADING_DURATION_MS));
    
    // Si on ne cumule pas, on reset l'analyse
    if (!shouldCumulate) {
      setAnalysis(null);
    }
    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message = data?.error ?? "Impossible d'analyser ce fichier";
        setError(message);
        return;
      }

      const data = (await res.json()) as AnalysisResult;
      
      // Si cumul, on merge les abonnements
      let nextAnalysis: AnalysisResult;

      if (shouldCumulate && analysis) {
        const mergedSubscriptions = [...analysis.subscriptions];
        const existingIds = new Set(mergedSubscriptions.map(sub => sub.labelNormalized));

        for (const newSub of data.subscriptions) {
          if (!existingIds.has(newSub.labelNormalized)) {
            mergedSubscriptions.push(newSub);
          }
        }

        const totalMonthly = mergedSubscriptions.reduce((sum, sub) => sum + sub.amountMonthly, 0);
        const totalYearly = totalMonthly * 12;

        nextAnalysis = {
          totalMonthly,
          totalYearly,
          subscriptions: mergedSubscriptions,
        };
      } else {
        nextAnalysis = data;
        setTags({});
      }

      setAnalysis(nextAnalysis);
      saveAnalysisToLocal(nextAnalysis);
      saveAnalysisToBackend(nextAnalysis);
    } catch {
      setError("Une erreur est survenue pendant l'analyse.");
    } finally {
      await minimumLoadingDelay;
      setIsLoading(false);
    }
  };

  const handleTagChange = (id: string, tag: SubscriptionTag) => {
    setTags((prev) => ({ ...prev, [id]: tag }));
  };

  const { selectedCount, yearlySavings } = useMemo(() => {
    if (!analysis) {
      return { selectedCount: 0, yearlySavings: 0 };
    }

    const selected = analysis.subscriptions.filter((sub) => tags[sub.id] === "RESILIER");
    const yearly = selected.reduce((sum, sub) => sum + sub.amountYearly, 0);

    return { selectedCount: selected.length, yearlySavings: yearly };
  }, [analysis, tags]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Navigation Header */}
      <header className="relative border-b border-slate-800/50 backdrop-blur-sm z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-sm group-hover:scale-110 transition-transform">
                S
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                SubScanner
              </span>
            </Link>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Retour</span>
            </Link>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            {user ? (
              <>
                <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors font-medium">
                  Dashboard
                </Link>
                <Link
                  href="/dashboard"
                  className="relative rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                >
                  Mon compte
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-400 hover:text-white transition-colors">
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="relative rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                >
                  Créer un compte
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      
      <main className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 py-12 pb-24">
        {/* Hero Header */}
        <header className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 px-4 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Analyse instantanée • 100% gratuit
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Découvre
            <span className="block mt-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              tes abonnements cachés
            </span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Upload ton relevé bancaire CSV. Notre IA détecte automatiquement tous tes prélèvements récurrents.
          </p>
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>100% sécurisé</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Résultats instantanés</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Aucune connexion bancaire</span>
            </div>
          </div>
        </header>

        {isLoading && (
          <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-slate-900/80 backdrop-blur-xl p-8 shadow-lg shadow-emerald-500/10 -mt-4">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15),_transparent_60%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
              <div className="flex-1 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Analyse en cours</p>
                <h2 className="text-3xl font-bold text-white">On scrute tes relevés ✨</h2>
                <p className="text-sm text-slate-400">Patiente 5 petites secondes, on détecte chaque prélèvement récurrent.</p>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full w-full origin-left animate-[pulse_1.4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">5 secondes chrono</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-slate-800/60 bg-slate-900/70 p-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 text-2xl flex items-center justify-center">☕</div>
                  <div>
                    <p className="text-sm font-semibold text-white">Un p&rsquo;tit café pendant qu&rsquo;on bosse ?</p>
                    <p className="text-xs text-slate-400">Merci à toi, ça soutient SubScanner.</p>
                  </div>
                </div>
                <a
                  href={SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
                >
                  Offrir un café (2 €)
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="grid gap-12 lg:grid-cols-[1.4fr,1fr] items-start">
          {/* Upload or Results Section */}
          <div className="space-y-8">
            {!analysis ? (
              /* Upload Card - Visible only when no analysis */
              <>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50 group-hover:opacity-75" />
                  <div className="relative rounded-3xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5" />
                    <div className="relative p-8 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center ring-1 ring-emerald-500/20">
                          <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">Upload ton relevé CSV</h2>
                          <p className="text-sm text-slate-400 mt-0.5">
                            Minimum 3 mois pour une détection précise
                          </p>
                        </div>
                      </div>
                      <CsvUploadZone
                        onFileSelected={(file) => handleFileSelected(file, false)}
                        isLoading={isLoading}
                        error={error}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Results Display - Visible when analysis exists */
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Subscriptions first */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-white">
                        Abonnements détectés
                      </h2>
                      <p className="text-sm text-slate-400 mt-1">
                        Tag chaque abonnement pour calculer tes économies potentielles
                      </p>
                    </div>
                    {analysis.subscriptions.length > 0 && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm">
                        <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm font-medium text-white">{analysis.subscriptions.length} détecté{analysis.subscriptions.length > 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>
                  {isLoading ? (
                    <div className="relative rounded-2xl border border-slate-800/50 bg-slate-900/60 backdrop-blur-sm p-8 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
                        <p className="text-sm text-slate-400">
                          Analyse en cours... Détection des abonnements récurrents
                        </p>
                      </div>
                    </div>
                  ) : (
                    <SubscriptionsTable
                      subscriptions={analysis.subscriptions}
                      tags={tags}
                      onTagChange={handleTagChange}
                    />
                  )}
                </div>

                {/* Summary cards between table and buttons */}
                <div className="space-y-6">
                  <AnalysisSummary analysis={analysis} />
                  <PlanSavingsBar selectedCount={selectedCount} yearlySavings={yearlySavings} />
                  <SupportUsCard estimatedSavingsYearly={analysis.totalYearly} location="result_page" />
                </div>

                {/* CSV Action Buttons now at the end */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-500/20">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Ajouter d&apos;autres relevés</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Cumule plusieurs comptes ou remplace l&apos;analyse actuelle
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="relative group/btn cursor-pointer">
                        <input
                          type="file"
                          accept=".csv,text/csv"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelected(file, true);
                            e.target.value = '';
                          }}
                          disabled={isLoading}
                        />
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all group-hover/btn:scale-[1.02]">
                          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-sm font-semibold text-emerald-300">Ajouter un CSV</span>
                        </div>
                      </label>
                      <label className="relative group/btn cursor-pointer">
                        <input
                          type="file"
                          accept=".csv,text/csv"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelected(file, false);
                            e.target.value = '';
                          }}
                          disabled={isLoading}
                        />
                        <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50 hover:border-slate-600/70 transition-all group-hover/btn:scale-[1.02]">
                          <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span className="text-sm font-semibold text-slate-300">Autre CSV</span>
                        </div>
                      </label>
                    </div>
                    <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                      <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p>
                        <strong className="text-emerald-400">Ajouter</strong> cumule les abonnements de plusieurs comptes.
                        <strong className="text-slate-400 ml-1">Autre</strong> remplace l&apos;analyse actuelle.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions Card - Only visible when no analysis */}
            {error && (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </div>
            )}
            {syncWarning && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                {syncWarning}
              </div>
            )}
            {!analysis && (
              <div className="rounded-2xl border border-slate-800/50 bg-slate-900/60 backdrop-blur-sm p-8 hover:border-slate-700/50 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center ring-1 ring-cyan-500/20">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-white">
                  Comment récupérer ton CSV ?
                </h3>
              </div>
              <ol className="space-y-4">
                <li className="flex gap-4 group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-bold ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform">1</span>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium text-slate-200">Connecte-toi à ton espace bancaire</p>
                    <p className="text-xs text-slate-500 mt-0.5">En ligne ou via l&apos;app mobile</p>
                  </div>
                </li>
                <li className="flex gap-4 group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-bold ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform">2</span>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium text-slate-200">Va dans Mes relevés / Historique</p>
                    <p className="text-xs text-slate-500 mt-0.5">Section historique des transactions</p>
                  </div>
                </li>
                <li className="flex gap-4 group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-bold ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform">3</span>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium text-slate-200">Choisis une période</p>
                    <p className="text-xs text-slate-500 mt-0.5">Minimum 3 mois, idéal 6 mois</p>
                  </div>
                </li>
                <li className="flex gap-4 group">
                  <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center text-cyan-400 text-sm font-bold ring-1 ring-cyan-500/20 group-hover:scale-110 transition-transform">4</span>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium text-slate-200">Télécharge en CSV</p>
                    <p className="text-xs text-slate-500 mt-0.5">Bouton &quot;Exporter&quot; ou &quot;Télécharger&quot;</p>
                  </div>
                </li>
              </ol>
            </div>
            )}

          </div>

          {/* Instructions Section - Only visible when no analysis */}
          {!analysis && (
            <div className="space-y-6 lg:sticky lg:top-6">
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-40 animate-pulse rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 backdrop-blur-sm" />
                  <div className="h-32 animate-pulse rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/60 backdrop-blur-sm" />
                </div>
              ) : (
                <div className="relative rounded-2xl border border-dashed border-slate-700/50 bg-slate-900/40 backdrop-blur-sm p-12 text-center group hover:border-slate-600/50 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-800/30 flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-500 group-hover:text-slate-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <p className="text-base font-medium text-slate-300 mb-2">
                      Tes résultats ici
                    </p>
                    <p className="text-sm text-slate-500">
                      Upload un CSV pour voir tes totaux,<br />abonnements et économies potentielles
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
