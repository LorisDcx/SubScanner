import { PartnerOffer, SubscriptionCategoryId } from "@/types/category";

/**
 * Base de données des offres partenaires
 * 
 * TRANSPARENCE LÉGALE (DGCCRF) :
 * - isAffiliate: true = lien affilié/rémunéré
 * - isAffiliate: false = lien non affilié (simple recommandation)
 * 
 * Pour ajouter un nouveau partenaire :
 * 1. Ajouter l'offre dans le tableau PARTNER_OFFERS
 * 2. Mettre isAffiliate: true SI le lien est affilié
 * 3. Remplacer affiliateUrl par votre lien d'affiliation réel
 * 4. Ajouter le logo dans /public/logos/partners/
 */
export const PARTNER_OFFERS: PartnerOffer[] = [
  // ═══════════════════════════════════════════════════════════════
  // STREAMING VIDÉO
  // ═══════════════════════════════════════════════════════════════
  {
    id: "paramount-plus",
    name: "Paramount+",
    category: "streaming",
    monthlyPrice: 7.99,
    affiliateUrl: "https://www.paramountplus.com/fr/",
    tagline: "7 jours d'essai gratuit",
    logo: "/logos/partners/paramount.png",
    description: "Films, séries et sports exclusifs",
    features: ["Contenus exclusifs", "Champions League", "Films Paramount"],
    isAffiliate: false, // Pas de programme affilié actif
  },
  {
    id: "disney-plus",
    name: "Disney+",
    category: "streaming",
    monthlyPrice: 5.99,
    affiliateUrl: "https://www.disneyplus.com/fr-fr",
    tagline: "Disney, Marvel, Star Wars",
    logo: "/logos/partners/disney-plus.png",
    description: "Le meilleur de Disney en streaming",
    features: ["Disney, Pixar, Marvel", "Star Wars", "National Geographic"],
    isAffiliate: true, // Programme via Impact
  },
  {
    id: "molotov-extra",
    name: "Molotov Extra",
    category: "streaming",
    monthlyPrice: 6.99,
    affiliateUrl: "https://www.molotov.tv/",
    tagline: "100+ chaînes TV en direct",
    logo: "/logos/partners/molotov.png",
    description: "TV en direct et replay",
    features: ["100+ chaînes HD", "Replay 7 jours", "4 écrans"],
    isAffiliate: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // MUSIQUE & AUDIO
  // ═══════════════════════════════════════════════════════════════
  {
    id: "deezer-premium",
    name: "Deezer Premium",
    category: "music",
    monthlyPrice: 11.99,
    affiliateUrl: "https://www.deezer.com/fr/",
    tagline: "1 mois d'essai gratuit",
    logo: "/logos/partners/deezer.png",
    description: "Musique illimitée sans pub",
    features: ["120M+ titres", "Écoute hors ligne", "Audio HiFi"],
    isAffiliate: true, // Programme via Admitad
  },
  {
    id: "amazon-music",
    name: "Amazon Music Unlimited",
    category: "music",
    monthlyPrice: 11.99,
    affiliateUrl: "https://www.amazon.fr/music/unlimited?tag=subscanner-21",
    tagline: "3 mois offerts (Prime)",
    logo: "/logos/partners/amazon-music.png",
    description: "100 millions de titres HD",
    features: ["100M+ titres", "Audio HD/Ultra HD", "Podcasts inclus"],
    isAffiliate: true, // Programme Amazon Partenaires
  },
  {
    id: "tidal",
    name: "TIDAL",
    category: "music",
    monthlyPrice: 10.99,
    affiliateUrl: "https://tidal.com/",
    tagline: "Audio Master Quality",
    logo: "/logos/partners/tidal.png",
    description: "Streaming audio haute fidélité",
    features: ["Audio Master (MQA)", "Dolby Atmos", "360 Reality Audio"],
    isAffiliate: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // SPORT & FITNESS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "basic-fit",
    name: "Basic-Fit",
    category: "sport",
    monthlyPrice: 22.99,
    originalPrice: 29.99,
    affiliateUrl: "https://www.basic-fit.com/fr-fr/",
    tagline: "1000+ salles en Europe",
    logo: "/logos/partners/basicfit.png",
    isAffiliate: false,
    description: "La salle de sport accessible",
    features: ["Accès 24h/24", "Application incluse", "Cours collectifs"],
  },
  {
    id: "classpass",
    name: "ClassPass",
    category: "sport",
    monthlyPrice: 29,
    affiliateUrl: "https://classpass.com/",
    tagline: "Multi-activités flexibles",
    logo: "/logos/partners/classpass.png",
    description: "Accès à des milliers de studios",
    features: ["Fitness, yoga, pilates", "Spas & wellness", "Sans engagement"],
    isAffiliate: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // FORMATION & COURS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "skillshare",
    name: "Skillshare",
    category: "learning",
    monthlyPrice: 13.99,
    affiliateUrl: "https://www.skillshare.com/",
    tagline: "7 jours d'essai gratuit",
    logo: "/logos/partners/skillshare.png",
    description: "Cours créatifs illimités",
    features: ["Design, photo, vidéo", "Business, marketing", "30 000+ cours"],
    isAffiliate: true, // 40% commission via Impact
  },
  {
    id: "coursera",
    name: "Coursera Plus",
    category: "learning",
    monthlyPrice: 49,
    originalPrice: 59,
    affiliateUrl: "https://www.coursera.org/",
    tagline: "7 jours d'essai gratuit",
    logo: "/logos/partners/coursera.png",
    description: "Cours des meilleures universités",
    features: ["Stanford, Yale, Google", "Certificats reconnus", "7000+ cours"],
    isAffiliate: true, // Jusqu'à 45% via Impact
  },
  {
    id: "masterclass",
    name: "MasterClass",
    category: "learning",
    monthlyPrice: 10,
    affiliateUrl: "https://www.masterclass.com/",
    tagline: "Apprenez des meilleurs",
    logo: "/logos/partners/masterclass.png",
    description: "Cours par des célébrités mondiales",
    features: ["200+ instructeurs", "Cuisine, écriture, musique", "Qualité cinéma"],
    isAffiliate: true, // Programme Skimlinks
  },
  {
    id: "udemy",
    name: "Udemy",
    category: "learning",
    monthlyPrice: 0,
    affiliateUrl: "https://www.udemy.com/",
    tagline: "Cours dès 9,99€ en promo",
    logo: "/logos/partners/udemy.png",
    description: "200 000+ cours à l'achat",
    features: ["Dev, business, design", "Accès à vie", "Certificats"],
    isAffiliate: true, // Programme Awin
  },

  // ═══════════════════════════════════════════════════════════════
  // STOCKAGE CLOUD
  // ═══════════════════════════════════════════════════════════════
  {
    id: "pcloud",
    name: "pCloud",
    category: "storage",
    monthlyPrice: 4.99,
    affiliateUrl: "https://www.pcloud.com/",
    tagline: "Offre à vie 199€/500Go",
    logo: "/logos/partners/pcloud.png",
    description: "Stockage cloud suisse sécurisé",
    features: ["Chiffrement côté client", "Sync automatique", "Partage facile"],
    isAffiliate: true, // Programme propre
  },
  {
    id: "backblaze",
    name: "Backblaze",
    category: "storage",
    monthlyPrice: 7,
    affiliateUrl: "https://www.backblaze.com/",
    tagline: "Sauvegarde illimitée",
    logo: "/logos/partners/backblaze.png",
    description: "Backup cloud illimité simple",
    features: ["Stockage illimité", "Restauration facile", "Chiffrement AES"],
    isAffiliate: true, // Programme propre
  },
  {
    id: "sync",
    name: "Sync.com",
    category: "storage",
    monthlyPrice: 6,
    affiliateUrl: "https://www.sync.com/",
    tagline: "Zero-knowledge encryption",
    logo: "/logos/partners/sync.png",
    description: "Cloud sécurisé et privé",
    features: ["Chiffrement E2E", "2 To stockage", "Conforme RGPD"],
    isAffiliate: true, // Programme propre
  },

  // ═══════════════════════════════════════════════════════════════
  // VPN & SÉCURITÉ (40-100% commission)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "nordvpn",
    name: "NordVPN",
    category: "vpn",
    monthlyPrice: 3.09,
    originalPrice: 12.99,
    affiliateUrl: "https://nordvpn.com/",
    tagline: "-77% + 3 mois offerts",
    logo: "/logos/partners/nordvpn.png",
    description: "VPN #1 mondial",
    features: ["10 appareils", "111 pays", "Threat Protection"],
    isAffiliate: true, // 40% via Awin
  },
  {
    id: "expressvpn",
    name: "ExpressVPN",
    category: "vpn",
    monthlyPrice: 6.25,
    originalPrice: 12.95,
    affiliateUrl: "https://www.expressvpn.com/",
    tagline: "-49% (1 an)",
    logo: "/logos/partners/expressvpn.png",
    description: "VPN ultra-rapide premium",
    features: ["8 appareils", "105 pays", "Serveurs RAM"],
    isAffiliate: true, // $13-36 CPA via Impact
  },
  {
    id: "surfshark",
    name: "Surfshark",
    category: "vpn",
    monthlyPrice: 2.19,
    originalPrice: 12.95,
    affiliateUrl: "https://surfshark.com/",
    tagline: "-83% + 3 mois offerts",
    logo: "/logos/partners/surfshark.png",
    description: "VPN illimité pas cher",
    features: ["Appareils illimités", "100 pays", "CleanWeb (bloque pubs)"],
    isAffiliate: true, // 40% via Tune
  },
  {
    id: "cyberghost",
    name: "CyberGhost",
    category: "vpn",
    monthlyPrice: 2.03,
    originalPrice: 12.99,
    affiliateUrl: "https://www.cyberghostvpn.com/",
    tagline: "-84% (2 ans + 4 mois)",
    logo: "/logos/partners/cyberghost.png",
    description: "VPN simple et efficace",
    features: ["7 appareils", "100 pays", "Serveurs streaming"],
    isAffiliate: true, // 100% commission via HasOffers
  },
  {
    id: "bitdefender",
    name: "Bitdefender Total Security",
    category: "vpn",
    monthlyPrice: 3.33,
    originalPrice: 7.49,
    affiliateUrl: "https://www.bitdefender.com/",
    tagline: "-56% première année",
    logo: "/logos/partners/bitdefender.png",
    description: "Antivirus + VPN complet",
    features: ["5 appareils", "Antivirus #1", "VPN inclus 200Mo/j"],
    isAffiliate: true, // Jusqu'à 100% revenue share
  },

  // ═══════════════════════════════════════════════════════════════
  // PRODUCTIVITÉ
  // ═══════════════════════════════════════════════════════════════
  {
    id: "notion",
    name: "Notion Plus",
    category: "productivity",
    monthlyPrice: 8,
    affiliateUrl: "https://www.notion.so/",
    tagline: "Espace de travail tout-en-un",
    logo: "/logos/partners/notion.png",
    description: "Espace de travail tout-en-un",
    features: ["Notes, docs, wikis", "Bases de données", "Collaboration"],
    isAffiliate: true, // Jusqu'à $50 via PartnerStack
  },
  {
    id: "adobe-cc",
    name: "Adobe Creative Cloud",
    category: "productivity",
    monthlyPrice: 26.21,
    originalPrice: 62.47,
    affiliateUrl: "https://www.adobe.com/fr/creativecloud.html",
    tagline: "-58% pour étudiants/enseignants",
    logo: "/logos/partners/adobe.png",
    description: "Suite créative complète",
    features: ["Photoshop, Illustrator", "Premiere Pro", "20+ apps"],
    isAffiliate: true, // 85% 1er mois via Adobe Affiliates
  },
  {
    id: "evernote",
    name: "Evernote Personal",
    category: "productivity",
    monthlyPrice: 8.33,
    affiliateUrl: "https://evernote.com/",
    tagline: "Organisez votre vie",
    logo: "/logos/partners/evernote.png",
    description: "Prise de notes avancée",
    features: ["Sync illimité", "Recherche dans docs", "Web clipper"],
    isAffiliate: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // GESTIONNAIRES DE MOTS DE PASSE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "1password",
    name: "1Password",
    category: "productivity",
    monthlyPrice: 2.99,
    affiliateUrl: "https://1password.com/",
    tagline: "Le plus sécurisé",
    logo: "/logos/partners/1password.png",
    description: "Gestionnaire de mots de passe premium",
    features: ["Coffre-fort sécurisé", "Watchtower alerts", "Travel Mode"],
    isAffiliate: true, // Programme CJ Affiliate
  },
  {
    id: "dashlane",
    name: "Dashlane Premium",
    category: "productivity",
    monthlyPrice: 3.33,
    affiliateUrl: "https://www.dashlane.com/",
    tagline: "VPN inclus",
    logo: "/logos/partners/dashlane.png",
    description: "Mots de passe + VPN",
    features: ["Dark web monitoring", "VPN illimité", "Remplissage auto"],
    isAffiliate: true, // 10-25% commission
  },
  {
    id: "lastpass",
    name: "LastPass Premium",
    category: "productivity",
    monthlyPrice: 2.90,
    affiliateUrl: "https://www.lastpass.com/",
    tagline: "Sync multi-appareils",
    logo: "/logos/partners/lastpass.png",
    description: "Gestionnaire populaire",
    features: ["Sync multi-appareils", "Partage sécurisé", "Authentificateur"],
    isAffiliate: true, // 25% via Impact Radius
  },

  // ═══════════════════════════════════════════════════════════════
  // TÉLÉPHONIE & INTERNET
  // ═══════════════════════════════════════════════════════════════
  {
    id: "red-by-sfr",
    name: "RED by SFR",
    category: "telecom",
    monthlyPrice: 7.99,
    affiliateUrl: "https://www.red-by-sfr.fr/",
    tagline: "120 Go 5G sans engagement",
    logo: "/logos/partners/red.png",
    description: "Forfait mobile low-cost",
    features: ["120 Go 5G", "Appels illimités", "Sans engagement"],
    isAffiliate: false,
  },
  {
    id: "sosh",
    name: "Sosh",
    category: "telecom",
    monthlyPrice: 9.99,
    affiliateUrl: "https://www.sosh.fr/",
    tagline: "Réseau Orange à petit prix",
    logo: "/logos/partners/sosh.png",
    description: "L'offre sans engagement d'Orange",
    features: ["Réseau Orange", "80 Go", "Sans engagement"],
    isAffiliate: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // ASSURANCE & MUTUELLE
  // ═══════════════════════════════════════════════════════════════
  {
    id: "luko",
    name: "Luko",
    category: "insurance",
    monthlyPrice: 3.99,
    affiliateUrl: "https://www.luko.eu/",
    tagline: "2 mois offerts",
    logo: "/logos/partners/luko.png",
    description: "Assurance habitation nouvelle génération",
    features: ["100% en ligne", "Remboursement 2h", "Sans engagement"],
    isAffiliate: false,
  },
  {
    id: "alan",
    name: "Alan",
    category: "insurance",
    monthlyPrice: 50,
    affiliateUrl: "https://alan.com/",
    tagline: "1er mois offert",
    logo: "/logos/partners/alan.png",
    description: "Mutuelle santé 100% digitale",
    features: ["Téléconsultation illimitée", "App intuitive", "Remboursement 48h"],
    isAffiliate: false,
  },
  {
    id: "lemonade",
    name: "Lemonade",
    category: "insurance",
    monthlyPrice: 5,
    affiliateUrl: "https://www.lemonade.com/fr",
    tagline: "Assurance en 90 secondes",
    logo: "/logos/partners/lemonade.png",
    description: "Assurance habitation par IA",
    features: ["Souscription instantanée", "Remboursement rapide", "App moderne"],
    isAffiliate: true, // Programme partenaires
  },

  // ═══════════════════════════════════════════════════════════════
  // E-COMMERCE PREMIUM
  // ═══════════════════════════════════════════════════════════════
  {
    id: "amazon-prime",
    name: "Amazon Prime",
    category: "ecommerce",
    monthlyPrice: 6.99,
    affiliateUrl: "https://www.amazon.fr/prime?tag=subscanner-21",
    tagline: "30 jours d'essai gratuit",
    logo: "/logos/partners/amazon-prime.png",
    description: "Livraison gratuite + Prime Video",
    features: ["Livraison 1 jour", "Prime Video", "Prime Gaming"],
    isAffiliate: true, // Amazon Partenaires
  },

  // ═══════════════════════════════════════════════════════════════
  // PRESSE & MÉDIAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "cafeyn",
    name: "Cafeyn",
    category: "news",
    monthlyPrice: 9.99,
    affiliateUrl: "https://www.cafeyn.co/fr",
    tagline: "1 mois d'essai gratuit",
    logo: "/logos/partners/cafeyn.png",
    description: "2000+ magazines et journaux",
    features: ["Le Monde, L'Équipe...", "Lecture hors ligne", "5 appareils"],
    isAffiliate: false,
  },
];

/**
 * Récupère les offres partenaires pour une catégorie donnée
 */
export function getPartnersByCategory(categoryId: SubscriptionCategoryId): PartnerOffer[] {
  return PARTNER_OFFERS.filter((offer) => offer.category === categoryId);
}

/**
 * Récupère les meilleures offres (toutes catégories confondues)
 */
export function getTopOffers(limit = 5): PartnerOffer[] {
  // Prioriser celles avec des réductions
  return [...PARTNER_OFFERS]
    .sort((a, b) => {
      const aDiscount = a.originalPrice ? (a.originalPrice - a.monthlyPrice) / a.originalPrice : 0;
      const bDiscount = b.originalPrice ? (b.originalPrice - b.monthlyPrice) / b.originalPrice : 0;
      return bDiscount - aDiscount;
    })
    .slice(0, limit);
}

/**
 * Récupère une offre par son ID
 */
export function getPartnerById(id: string): PartnerOffer | undefined {
  return PARTNER_OFFERS.find((offer) => offer.id === id);
}
