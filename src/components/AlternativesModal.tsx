"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { PartnerOffer, SubscriptionCategoryId, getCategoryInfo, getCategoryColorClasses } from "@/types/category";
import { getPartnersByCategory } from "@/data/partners";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  categoryId: SubscriptionCategoryId;
  currentSubscriptionName?: string;
  currentPrice?: number;
};

export function AlternativesModal({ isOpen, onClose, categoryId, currentSubscriptionName, currentPrice }: Props) {
  const category = getCategoryInfo(categoryId);
  const colors = getCategoryColorClasses(categoryId);
  const alternatives = getPartnersByCategory(categoryId);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl ${colors.bgLight} flex items-center justify-center text-lg sm:text-xl flex-shrink-0`}>
                {category.icon}
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">
                  Alternatives {category.label}
                </h2>
                {currentSubscriptionName && (
                  <p className="text-xs sm:text-sm text-slate-400 truncate">
                    Pour remplacer <span className="text-white font-medium">{currentSubscriptionName}</span>
                    {currentPrice && <span className="text-rose-400 ml-1">({currentPrice.toFixed(2)}€/mois)</span>}
                  </p>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-4 sm:p-6 max-h-[calc(90vh-120px)] sm:max-h-[calc(85vh-80px)]">
          {alternatives.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-400">
                Aucune alternative partenaire disponible pour cette catégorie.
              </p>
              <p className="text-sm text-slate-500 mt-2">
                De nouveaux partenaires arrivent bientôt !
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {alternatives.map((offer) => (
                <PartnerCard 
                  key={offer.id} 
                  offer={offer} 
                  currentPrice={currentPrice}
                  colors={colors}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer - Transparence légale */}
        <div className="sticky bottom-0 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4">
          <p className="text-[10px] sm:text-xs text-slate-500 text-center leading-relaxed">
            📊 Certains liens peuvent être affiliés. S&apos;ils sont utilisés, cela peut soutenir SubScanner sans coût supplémentaire pour vous.
          </p>
        </div>
      </div>
    </div>
  );
}

function PartnerCard({ offer, currentPrice, colors }: { 
  offer: PartnerOffer; 
  currentPrice?: number;
  colors: ReturnType<typeof getCategoryColorClasses>;
}) {
  const savings = currentPrice && currentPrice > offer.monthlyPrice 
    ? currentPrice - offer.monthlyPrice 
    : null;
  const savingsPercent = savings && currentPrice 
    ? Math.round((savings / currentPrice) * 100) 
    : null;

  return (
    <div className="group relative rounded-xl border border-slate-800/60 bg-slate-800/30 p-3 sm:p-4 hover:border-slate-700 hover:bg-slate-800/50 transition-all">
      {/* Mobile: Stack layout, Desktop: Flex layout */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        {/* Logo + Name row on mobile */}
        <div className="flex items-center gap-3 sm:block">
          <div className="flex-shrink-0">
            {offer.logo ? (
              <Image
                src={offer.logo}
                alt={offer.name}
                width={48}
                height={48}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl object-contain bg-white/5 p-1"
              />
            ) : (
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-slate-700 flex items-center justify-center text-base sm:text-lg font-bold text-white">
                {offer.name.charAt(0)}
              </div>
            )}
          </div>
          
          {/* Name visible on mobile next to logo */}
          <div className="sm:hidden min-w-0 flex-1">
            <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
              {offer.name}
            </h3>
            {/* Price on mobile - inline */}
            <div className="flex items-baseline gap-1.5 mt-0.5">
              {offer.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {offer.originalPrice.toFixed(2)}€
                </span>
              )}
              <span className="text-base font-bold text-white">
                {offer.monthlyPrice.toFixed(2)}€
              </span>
              <span className="text-xs text-slate-400">/mois</span>
              {savings && savingsPercent && (
                <span className="text-xs font-medium text-emerald-400">
                  -{savingsPercent}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Desktop: Name and Price row */}
          <div className="hidden sm:flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                {offer.name}
              </h3>
              {offer.description && (
                <p className="text-sm text-slate-400 mt-0.5">{offer.description}</p>
              )}
            </div>
            
            {/* Price - Desktop */}
            <div className="text-right flex-shrink-0">
              <div className="flex items-baseline gap-1.5">
                {offer.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {offer.originalPrice.toFixed(2)}€
                  </span>
                )}
                <span className="text-lg font-bold text-white">
                  {offer.monthlyPrice.toFixed(2)}€
                </span>
                <span className="text-xs text-slate-400">/mois</span>
              </div>
              {savings && savingsPercent && (
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  -{savingsPercent}% ({savings.toFixed(2)}€/mois)
                </div>
              )}
            </div>
          </div>
          
          {/* Description on mobile */}
          {offer.description && (
            <p className="text-xs text-slate-400 sm:hidden">{offer.description}</p>
          )}

          {/* Tagline & Features */}
          <div className="mt-2 sm:mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className={`inline-flex items-center rounded-full ${colors.bgLight} ${colors.text} px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium`}>
              {offer.tagline}
            </span>
            {offer.features?.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400">
                <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
            <a
              href={offer.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/20 transition-all hover:scale-[1.02] flex-1 sm:flex-none"
            >
              Voir l&apos;offre
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {offer.isAffiliate && (
              <span className="text-[10px] sm:text-xs text-slate-500 italic whitespace-nowrap">
                (affilié)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
