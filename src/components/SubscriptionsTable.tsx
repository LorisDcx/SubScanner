"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Subscription, SubscriptionTag } from "@/types/analysis";
import { getCategoryInfo, getCategoryColorClasses, SubscriptionCategoryId } from "@/types/category";
import { getPartnersByCategory } from "@/data/partners";
import { AlternativesModal } from "./AlternativesModal";

type Props = {
  subscriptions: Subscription[];
  tags: Record<string, SubscriptionTag | undefined>;
  onTagChange: (id: string, tag: SubscriptionTag) => void;
};

const TAG_LABELS: Record<SubscriptionTag, string> = {
  GARDER: "Garder",
  A_VERIFIER: "A verifier",
  RESILIER: "A resilier",
};

// Ordre des catégories pour l'affichage
const CATEGORY_ORDER: SubscriptionCategoryId[] = [
  "streaming", "music", "gaming", "sport", "learning",
  "productivity", "storage", "vpn", "ai", "telecom",
  "insurance", "transport", "ecommerce", "food", "news", "finance", "other"
];

type GroupedSubscriptions = {
  categoryId: SubscriptionCategoryId | "uncategorized";
  subscriptions: Subscription[];
  totalMonthly: number;
  totalYearly: number;
};

export function SubscriptionsTable({ subscriptions, tags, onTagChange }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  // Grouper les abonnements par catégorie
  const groupedSubscriptions = useMemo(() => {
    const groups: Record<string, Subscription[]> = {};
    
    subscriptions.forEach((sub) => {
      const key = sub.category || "uncategorized";
      if (!groups[key]) groups[key] = [];
      groups[key].push(sub);
    });

    // Convertir en tableau et trier selon l'ordre défini
    const result: GroupedSubscriptions[] = [];
    
    CATEGORY_ORDER.forEach((catId) => {
      if (groups[catId]) {
        result.push({
          categoryId: catId,
          subscriptions: groups[catId],
          totalMonthly: groups[catId].reduce((sum, s) => sum + s.amountMonthly, 0),
          totalYearly: groups[catId].reduce((sum, s) => sum + s.amountYearly, 0),
        });
      }
    });

    // Ajouter les non catégorisés à la fin
    if (groups["uncategorized"]) {
      result.push({
        categoryId: "uncategorized",
        subscriptions: groups["uncategorized"],
        totalMonthly: groups["uncategorized"].reduce((sum, s) => sum + s.amountMonthly, 0),
        totalYearly: groups["uncategorized"].reduce((sum, s) => sum + s.amountYearly, 0),
      });
    }

    return result;
  }, [subscriptions]);

  const handleShowAlternatives = (sub: Subscription) => {
    setSelectedSub(sub);
    setModalOpen(true);
  };

  if (!subscriptions.length) {
    return (
      <p className="text-sm text-slate-400">
        Aucun abonnement recurrent detecte sur la periode fournie.
      </p>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {groupedSubscriptions.map((group) => {
          const category = group.categoryId !== "uncategorized" 
            ? getCategoryInfo(group.categoryId) 
            : { icon: "📦", label: "Non catégorisé", id: "other", color: "gray" };
          const colors = group.categoryId !== "uncategorized"
            ? getCategoryColorClasses(group.categoryId)
            : getCategoryColorClasses("other");
          const hasAlternatives = group.categoryId !== "uncategorized" 
            ? getPartnersByCategory(group.categoryId).length > 0 
            : false;

          return (
            <div key={group.categoryId} className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden">
              {/* En-tête de catégorie */}
              <div className={`flex items-center justify-between px-4 py-3 ${colors.bgLight} border-b ${colors.border}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">{category.icon}</span>
                  <div>
                    <h3 className={`font-semibold ${colors.text}`}>{category.label}</h3>
                    <p className="text-xs text-slate-400">
                      {group.subscriptions.length} abonnement{group.subscriptions.length > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Total mensuel</p>
                    <p className="font-bold text-white">{group.totalMonthly.toFixed(2)} €</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Total annuel</p>
                    <p className="font-bold text-white">{group.totalYearly.toFixed(2)} €</p>
                  </div>
                  {hasAlternatives && (
                    <button
                      type="button"
                      onClick={() => {
                        if (group.subscriptions[0]) handleShowAlternatives(group.subscriptions[0]);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-[11px] font-medium text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                      Voir alternatives
                    </button>
                  )}
                </div>
              </div>

              {/* Table des abonnements de cette catégorie */}
              <table className="min-w-full text-left text-xs text-slate-200">
                <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-2 font-medium">Abonnement</th>
                    <th className="px-4 py-2 font-medium">Mensuel</th>
                    <th className="px-4 py-2 font-medium">Annuel</th>
                    <th className="px-4 py-2 font-medium">Tag</th>
                  </tr>
                </thead>
                <tbody>
                  {group.subscriptions.map((sub) => {
                    const currentTag = tags[sub.id] ?? "GARDER";

                    return (
                      <tr key={sub.id} className="border-t border-slate-900/60 hover:bg-slate-900/30">
                        <td className="px-4 py-3 text-xs font-medium text-slate-50">
                          <div className="flex items-center gap-3">
                            {sub.logo ? (
                              <Image 
                                src={sub.logo} 
                                alt={sub.displayName || sub.labelNormalized}
                                width={24}
                                height={24}
                                className="h-6 w-6 rounded object-contain"
                              />
                            ) : (
                              <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-700 text-[10px] font-bold text-slate-200">
                                {(sub.displayName || sub.labelNormalized)
                                  .split(" ")
                                  .slice(0, 2)
                                  .map(word => word[0])
                                  .join("")
                                  .toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="font-medium">
                                {sub.displayName || sub.labelNormalized || sub.labelRaw}
                              </div>
                              {sub.website && (
                                <a 
                                  href={sub.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-slate-400 hover:text-sky-400"
                                >
                                  {sub.website.replace(/https?:\/\/(www\.)?/, "")}
                                </a>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold text-white">
                          {sub.amountMonthly.toFixed(2)} €
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold text-white">
                          {sub.amountYearly.toFixed(2)} €
                        </td>
                        <td className="px-4 py-3 text-xs">
                          <div className="inline-flex gap-1 rounded-full bg-slate-900/80 p-1">
                            {(Object.keys(TAG_LABELS) as SubscriptionTag[]).map((tag) => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => onTagChange(sub.id, tag)}
                                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-colors ${
                                  currentTag === tag
                                    ? tag === "RESILIER"
                                      ? "bg-rose-500 text-slate-950"
                                      : "bg-slate-50 text-slate-950"
                                    : "bg-transparent text-slate-300 hover:bg-slate-800"
                                }`}
                              >
                                {TAG_LABELS[tag]}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      {/* Modal des alternatives */}
      {selectedSub?.category && (
        <AlternativesModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          categoryId={selectedSub.category}
          currentSubscriptionName={selectedSub.displayName || selectedSub.labelNormalized}
          currentPrice={selectedSub.amountMonthly}
        />
      )}
    </>
  );
}
