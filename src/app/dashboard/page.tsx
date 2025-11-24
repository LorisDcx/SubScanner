"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { AnalysisResult } from "@/types/analysis";
import { SiteHeader } from "@/components/SiteHeader";

type StoredAnalysis = {
  id: string;
  createdAt: string;
  source?: string;
  dedupeKey?: string;
  analysis: AnalysisResult;
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [analyses, setAnalyses] = useState<StoredAnalysis[]>([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || loading) {
      return;
    }

    let isCancelled = false;

    const fetchAnalyses = async () => {
      setLoadingAnalyses(true);
      setError(null);
      try {
        const token = await auth?.currentUser?.getIdToken();
        if (!token) {
          throw new Error("Token manquant");
        }

        const res = await fetch("/api/analyses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Impossible de récupérer les analyses");
        }

        const data = (await res.json()) as { analyses?: StoredAnalysis[] };
        if (!isCancelled) {
          const list = data.analyses ?? [];
          setAnalyses(list);
          setSelectedIndex(0);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : "Erreur inconnue");
        }
      } finally {
        if (!isCancelled) {
          setLoadingAnalyses(false);
        }
      }
    };

    fetchAnalyses();

    return () => {
      isCancelled = true;
    };
  }, [user, loading]);

  useEffect(() => {
    setShowAllSubscriptions(false);
  }, [selectedIndex]);

  const selectedAnalysisEntry = analyses[selectedIndex];
  const selectedAnalysis = selectedAnalysisEntry?.analysis;
  const subscriptions = selectedAnalysis?.subscriptions ?? [];

  const aggregates = analyses.reduce(
    (acc, entry) => {
      acc.totalMonthly += entry.analysis.totalMonthly;
      acc.totalYearly += entry.analysis.totalYearly;
      acc.subscriptions += entry.analysis.subscriptions.length;
      return acc;
    },
    { totalMonthly: 0, totalYearly: 0, subscriptions: 0 }
  );

  const totalMonthly = aggregates.totalMonthly;
  const totalYearly = aggregates.totalYearly;
  const subscriptionsCount = aggregates.subscriptions;

  const displayedSubscriptions = showAllSubscriptions ? subscriptions : subscriptions.slice(0, 5);
  const remainingSubscriptions = Math.max(0, subscriptions.length - displayedSubscriptions.length);

  const handleDeleteAnalysis = async () => {
    if (!selectedAnalysisEntry) {
      return;
    }

    try {
      setIsDeleting(true);
      setDeleteError(null);
      const token = await auth?.currentUser?.getIdToken();
      if (!token) {
        throw new Error("Token manquant");
      }

      const res = await fetch(`/api/analyses?id=${selectedAnalysisEntry.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => null);
        throw new Error(payload?.error ?? "Suppression impossible");
      }

      setAnalyses((prev) => {
        const updated = prev.filter((entry) => entry.id !== selectedAnalysisEntry.id);
        return updated;
      });

      setSelectedIndex((prevIdx) => {
        if (analyses.length <= 1) {
          return 0;
        }
        if (prevIdx >= analyses.length - 1) {
          return Math.max(0, prevIdx - 1);
        }
        return prevIdx;
      });
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Suppression impossible");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
          <p className="text-slate-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto max-w-6xl px-6 py-12 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Bienvenue, <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{user.email.split('@')[0]}</span>
          </h1>
          <p className="text-slate-400">Gérez vos comptes et suivez vos abonnements</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{analyses.length}</p>
            <p className="text-sm text-slate-400">Comptes analysés</p>
          </div>

          <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{subscriptionsCount}</p>
            <p className="text-sm text-slate-400">Abonnements détectés</p>
          </div>

          <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-6">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{totalMonthly.toFixed(2)}€</p>
            <p className="text-sm text-slate-400">Total mensuel</p>
            <p className="text-xs text-slate-500">Soit {totalYearly.toFixed(2)}€ / an</p>
          </div>
        </div>

        {deleteError && (
          <div className="mb-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {deleteError}
          </div>
        )}

        {analyses.length === 0 ? (
          <div className="relative rounded-3xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-3xl" />
            <div className="relative space-y-6">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Aucun compte analysé</h2>
                <p className="text-slate-400 mb-6">
                  Commencez par analyser un relevé bancaire pour voir vos abonnements
                </p>
              </div>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-bold text-white hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Analyser un relevé CSV
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">{analyses.length > 1 ? "Analyse sélectionnée" : "Analyse sauvegardée"}</h2>
                <p className="text-slate-400">
                  {selectedAnalysisEntry?.createdAt
                    ? new Date(selectedAnalysisEntry.createdAt).toLocaleString("fr-FR")
                    : "Date inconnue"}
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <Link
                  href="/analyze"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
                >
                  Relancer une analyse
                </Link>
                <button
                  type="button"
                  onClick={handleDeleteAnalysis}
                  disabled={isDeleting}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-600/60 px-4 py-2 text-sm text-rose-200 hover:bg-rose-600/20 disabled:opacity-50"
                >
                  {isDeleting ? "Suppression..." : "Supprimer cette analyse"}
                </button>
              </div>
            </div>

            {analyses.length > 1 && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-slate-200">Historique des analyses</p>
                  <span className="text-xs text-slate-500">{analyses.length} sauvegardées</span>
                </div>
                <div className="space-y-2">
                  {analyses.map((entry, idx) => {
                    const isActive = idx === selectedIndex;
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors ${
                          isActive
                            ? "border-emerald-500/60 bg-emerald-500/10 text-white"
                            : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {entry.createdAt ? new Date(entry.createdAt).toLocaleString("fr-FR") : "Date inconnue"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {entry.analysis.subscriptions.length} abo • {entry.analysis.totalMonthly.toFixed(2)}€ / mois
                          </p>
                        </div>
                        {isActive && (
                          <span className="text-xs font-semibold text-emerald-300">Sélectionné</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              {loadingAnalyses ? (
                <div className="flex flex-col items-center gap-4 py-12">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
                  <p className="text-sm text-slate-400">Chargement des analyses...</p>
                </div>
              ) : error ? (
                <p className="text-sm text-rose-400">{error}</p>
              ) : (
                <div className="space-y-4">
                  {displayedSubscriptions.map((sub) => (
                    <div key={sub.id} className="flex items-center justify-between border-b border-slate-800/60 pb-3 last:border-none last:pb-0">
                      <div>
                        <p className="font-semibold text-white">{sub.displayName || sub.labelNormalized}</p>
                        <p className="text-xs text-slate-500">Dernière opération : {sub.lastOperationDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-emerald-300">{sub.amountMonthly.toFixed(2)}€ / mois</p>
                        <p className="text-xs text-slate-400">{sub.amountYearly.toFixed(2)}€ / an</p>
                      </div>
                    </div>
                  ))}

                  {remainingSubscriptions > 0 && !showAllSubscriptions && (
                    <button
                      type="button"
                      onClick={() => setShowAllSubscriptions(true)}
                      className="text-xs font-semibold text-emerald-300 hover:text-emerald-200"
                    >
                      + {remainingSubscriptions} abonnements supplémentaires
                    </button>
                  )}

                  {showAllSubscriptions && subscriptions.length > 5 && (
                    <button
                      type="button"
                      onClick={() => setShowAllSubscriptions(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-300"
                    >
                      Afficher moins
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
