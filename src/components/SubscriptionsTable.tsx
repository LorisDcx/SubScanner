"use client";

import Image from "next/image";
import { Subscription, SubscriptionTag } from "@/types/analysis";

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

export function SubscriptionsTable({ subscriptions, tags, onTagChange }: Props) {
  if (!subscriptions.length) {
    return (
      <p className="text-sm text-slate-400">
        Aucun abonnement recurrent detecte sur la periode fournie.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
      <table className="min-w-full text-left text-xs text-slate-200">
        <thead className="border-b border-slate-800 bg-slate-950/80 text-[11px] uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3 font-medium">Abonnement</th>
            <th className="px-4 py-3 font-medium">Mensuel</th>
            <th className="px-4 py-3 font-medium">Annuel</th>
            <th className="px-4 py-3 font-medium">Derniere operation</th>
            <th className="px-4 py-3 font-medium">Tag</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub) => {
            const currentTag = tags[sub.id] ?? "GARDER";

            return (
              <tr key={sub.id} className="border-t border-slate-900/60">
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
                <td className="px-4 py-3 text-xs text-slate-400">
                  {sub.lastOperationDate}
                </td>
                <td className="px-4 py-3 text-xs">
                  <div className="inline-flex gap-1 rounded-full bg-slate-900/80 p-1.5">
                    {(Object.keys(TAG_LABELS) as SubscriptionTag[]).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => onTagChange(sub.id, tag)}
                        className={`rounded-full px-3 py-1 text-[12px] font-semibold transition-colors ${
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
}
