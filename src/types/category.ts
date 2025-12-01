// Catégories d'abonnements (plus granulaires pour de meilleures recommandations)
export const SUBSCRIPTION_CATEGORIES = {
  streaming: {
    id: "streaming",
    label: "Streaming vidéo",
    icon: "🎬",
    color: "violet",
  },
  music: {
    id: "music",
    label: "Musique & Audio",
    icon: "🎵",
    color: "pink",
  },
  gaming: {
    id: "gaming",
    label: "Jeux vidéo",
    icon: "🎮",
    color: "indigo",
  },
  sport: {
    id: "sport",
    label: "Sport & Fitness",
    icon: "💪",
    color: "orange",
  },
  learning: {
    id: "learning",
    label: "Formation & Cours",
    icon: "📚",
    color: "blue",
  },
  // Anciennes catégories "software" et "shopping" subdivisées
  productivity: {
    id: "productivity",
    label: "Productivité & Création",
    icon: "🎨",
    color: "cyan",
  },
  storage: {
    id: "storage",
    label: "Stockage Cloud",
    icon: "☁️",
    color: "sky",
  },
  vpn: {
    id: "vpn",
    label: "VPN & Sécurité",
    icon: "🔒",
    color: "teal",
  },
  ai: {
    id: "ai",
    label: "Intelligence Artificielle",
    icon: "🤖",
    color: "purple",
  },
  telecom: {
    id: "telecom",
    label: "Téléphonie & Internet",
    icon: "📱",
    color: "emerald",
  },
  insurance: {
    id: "insurance",
    label: "Assurance & Mutuelle",
    icon: "🛡️",
    color: "amber",
  },
  transport: {
    id: "transport",
    label: "Transport & Mobilité",
    icon: "🚗",
    color: "lime",
  },
  ecommerce: {
    id: "ecommerce",
    label: "E-commerce Premium",
    icon: "📦",
    color: "rose",
  },
  food: {
    id: "food",
    label: "Livraison Repas",
    icon: "🍔",
    color: "red",
  },
  news: {
    id: "news",
    label: "Presse & Médias",
    icon: "📰",
    color: "slate",
  },
  finance: {
    id: "finance",
    label: "Banque & Finance",
    icon: "💳",
    color: "green",
  },
  other: {
    id: "other",
    label: "Autres",
    icon: "📦",
    color: "gray",
  },
} as const;

export type SubscriptionCategoryId = keyof typeof SUBSCRIPTION_CATEGORIES;

export type SubscriptionCategory = {
  id: SubscriptionCategoryId;
  label: string;
  icon: string;
  color: string;
};

// Offres partenaires
export type PartnerOffer = {
  id: string;
  name: string;
  category: SubscriptionCategoryId;
  monthlyPrice: number;
  originalPrice?: number; // Prix barré (avant réduction)
  affiliateUrl: string;
  tagline: string; // "2 mois offerts", "-30% la 1ère année"
  logo?: string;
  description?: string;
  features?: string[];
  // Transparence légale (DGCCRF)
  isAffiliate?: boolean; // true si lien affilié/rémunéré
  highlightReason?: string; // "Moins cher que votre offre", "Promo limitée", etc.
};

// Helper pour obtenir une catégorie
export function getCategoryInfo(categoryId: SubscriptionCategoryId): SubscriptionCategory {
  return SUBSCRIPTION_CATEGORIES[categoryId];
}

// Helper pour obtenir la couleur Tailwind d'une catégorie
export function getCategoryColorClasses(categoryId: SubscriptionCategoryId): {
  bg: string;
  text: string;
  border: string;
  bgLight: string;
} {
  const colorMap: Record<string, { bg: string; text: string; border: string; bgLight: string }> = {
    violet: { bg: "bg-violet-500", text: "text-violet-400", border: "border-violet-500/30", bgLight: "bg-violet-500/10" },
    pink: { bg: "bg-pink-500", text: "text-pink-400", border: "border-pink-500/30", bgLight: "bg-pink-500/10" },
    indigo: { bg: "bg-indigo-500", text: "text-indigo-400", border: "border-indigo-500/30", bgLight: "bg-indigo-500/10" },
    orange: { bg: "bg-orange-500", text: "text-orange-400", border: "border-orange-500/30", bgLight: "bg-orange-500/10" },
    blue: { bg: "bg-blue-500", text: "text-blue-400", border: "border-blue-500/30", bgLight: "bg-blue-500/10" },
    cyan: { bg: "bg-cyan-500", text: "text-cyan-400", border: "border-cyan-500/30", bgLight: "bg-cyan-500/10" },
    emerald: { bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", bgLight: "bg-emerald-500/10" },
    amber: { bg: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30", bgLight: "bg-amber-500/10" },
    lime: { bg: "bg-lime-500", text: "text-lime-400", border: "border-lime-500/30", bgLight: "bg-lime-500/10" },
    rose: { bg: "bg-rose-500", text: "text-rose-400", border: "border-rose-500/30", bgLight: "bg-rose-500/10" },
    slate: { bg: "bg-slate-500", text: "text-slate-400", border: "border-slate-500/30", bgLight: "bg-slate-500/10" },
    green: { bg: "bg-green-500", text: "text-green-400", border: "border-green-500/30", bgLight: "bg-green-500/10" },
    gray: { bg: "bg-gray-500", text: "text-gray-400", border: "border-gray-500/30", bgLight: "bg-gray-500/10" },
    // Nouvelles couleurs pour les catégories ajoutées
    sky: { bg: "bg-sky-500", text: "text-sky-400", border: "border-sky-500/30", bgLight: "bg-sky-500/10" },
    teal: { bg: "bg-teal-500", text: "text-teal-400", border: "border-teal-500/30", bgLight: "bg-teal-500/10" },
    purple: { bg: "bg-purple-500", text: "text-purple-400", border: "border-purple-500/30", bgLight: "bg-purple-500/10" },
    red: { bg: "bg-red-500", text: "text-red-400", border: "border-red-500/30", bgLight: "bg-red-500/10" },
  };

  const category = SUBSCRIPTION_CATEGORIES[categoryId];
  return colorMap[category.color] || colorMap.gray;
}
