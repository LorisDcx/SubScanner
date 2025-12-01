import { Brand, BrandMapping } from "@/types/brand";

// Mots parasites à supprimer des libellés
const NOISE_PATTERNS = [
  // Préfixes bancaires
  "PRLV",
  "PRLV SEPA",
  "PRELEVEMENT",
  "PRÉLÈVEMENT",
  "PRELEVEMENT SEPA",
  "PRÉLÈVEMENT SEPA",
  "PAIEMENT CB",
  "PAIEMENT PAR CARTE",
  "CARTE",
  "CB",
  "VIR",
  "VIREMENT",
  "VIR SEPA",
  "VIREMENT SEPA",
  "TIP",
  "TIP SEPA",
  
  // Patterns de dates et numéros de carte
  "\\d{2}/\\d{2}",  // XX/XX (dates)
  "\\*{4}\\d{4}",   // ****1234 (numéros de carte)
  
  // Mots génériques d'entreprise
  "FRANCE",
  "FRENCH",
  "PARIS",
  "SARL",
  "SA",
  "SAS",
  "SASU",
  "EU",
  "ASSURANCES",
  "ASSURANCE",
  "BANQUE",
  "SERVICES",
  "SERVICE",
  "COMPANY",
  "CORP",
  "CORPORATION",
  "INC",
  "LTD",
  "LIMITED",
  "GROUP",
  "GROUPE",
  
  // Prépositions et mots courts
  "DE",
  "DU",
  "LE",
  "LA",
  "LES",
  "AU",
  "AUX",
  
  // Références et codes
  "REF",
  "REFERENCE",
  "CODE",
  "NUM",
  "NUMERO",
  "NO",
];

// Mapping des labels normalisés vers les marques connues
const BRAND_DATABASE: BrandMapping = {
  // --- Streaming vidéo ---
  "NETFLIX": {
    displayName: "Netflix",
    website: "https://www.netflix.com",
    logo: "/logos/netflix.png",
    category: "streaming",
  },
  "DISNEY": {
    displayName: "Disney+",
    website: "https://www.disneyplus.com",
    logo: "/logos/disney.png",
    category: "streaming",
  },
  "PRIME VIDEO": {
    displayName: "Prime Video",
    website: "https://www.primevideo.com",
    logo: "/logos/prime-video.png",
    category: "streaming",
  },
  "AMAZON PRIME": {
    displayName: "Amazon Prime",
    website: "https://www.amazon.fr/amazonprime",
    logo: "/logos/amazon-prime.png",
    category: "ecommerce",
  },
  "CANAL": {
    displayName: "Canal+",
    website: "https://www.canalplus.com",
    logo: "/logos/canal.png",
    category: "streaming",
  },
  "OCS": {
    displayName: "OCS",
    website: "https://www.ocs.fr",
    logo: "/logos/ocs.png",
    category: "streaming",
  },
  "MOLOTOV": {
    displayName: "Molotov",
    website: "https://www.molotov.tv",
    logo: "/logos/molotov.png",
    category: "streaming",
  },
  "SALTO": {
    displayName: "Salto",
    website: "https://www.salto.fr",
    logo: "/logos/salto.png",
    category: "streaming",
  },
  "YOUTUBE": {
    displayName: "YouTube Premium",
    website: "https://www.youtube.com/premium",
    logo: "/logos/youtube.png",
    category: "streaming",
  },
  "APPLE TV": {
    displayName: "Apple TV+",
    website: "https://tv.apple.com",
    logo: "/logos/apple-tv.png",
    category: "streaming",
  },

  // --- Cinéma & divertissement ---
  "PATHE CINEPASS": {
    displayName: "Pathé Cinepass",
    website: "https://www.pathe.fr/cinepass",
    logo: "/logos/pathe-cinepass.png",
    domain: "pathe.fr",
    category: "streaming",
  },

  // --- Streaming musical / audio ---
  "SPOTIFY": {
    displayName: "Spotify",
    website: "https://www.spotify.com",
    logo: "/logos/spotify.png",
    category: "music",
  },
  "DEEZER": {
    displayName: "Deezer",
    website: "https://www.deezer.com",
    logo: "/logos/deezer.png",
    category: "music",
  },
  "APPLE MUSIC": {
    displayName: "Apple Music",
    website: "https://music.apple.com",
    logo: "/logos/apple-music.png",
    category: "music",
  },
  "AUDIBLE": {
    displayName: "Audible",
    website: "https://www.audible.fr",
    logo: "/logos/audible.png",
    category: "music",
  },
  "TIDAL": {
    displayName: "Tidal",
    website: "https://tidal.com",
    logo: "/logos/tidal.png",
    category: "music",
  },
  "QOBUZ": {
    displayName: "Qobuz",
    website: "https://www.qobuz.com",
    logo: "/logos/qobuz.png",
    category: "music",
  },

  // --- E-commerce Premium (livraison gratuite, avantages) ---
  "AMAZON": {
    displayName: "Amazon",
    website: "https://www.amazon.fr",
    logo: "/logos/amazon.png",
    category: "ecommerce",
  },
  "CDISCOUNT A VOLONTE": {
    displayName: "Cdiscount à volonté",
    website: "https://www.cdiscount.com",
    logo: "/logos/cdiscount.png",
    category: "ecommerce",
  },
  "CDAV": {
    displayName: "Cdiscount à volonté",
    website: "https://www.cdiscount.com",
    logo: "/logos/cdiscount.png",
    category: "ecommerce",
  },
  "FNAC PLUS": {
    displayName: "FNAC+",
    website: "https://www.fnac.com",
    logo: "/logos/fnac-plus.png",
    category: "ecommerce",
  },
  "FNAC+": {
    displayName: "FNAC+",
    website: "https://www.fnac.com",
    logo: "/logos/fnac-plus.png",
    category: "ecommerce",
  },
  "DARTY MAX": {
    displayName: "Darty Max",
    website: "https://www.darty.com",
    logo: "/logos/darty-max.png",
    category: "ecommerce",
  },
  "LA REDOUTE PLUS": {
    displayName: "La Redoute+",
    website: "https://www.laredoute.fr",
    logo: "/logos/la-redoute-plus.png",
    category: "ecommerce",
  },

  // --- Livraison Repas ---
  "UBER PASS": {
    displayName: "Uber Pass",
    website: "https://www.uber.com",
    logo: "/logos/uber-pass.png",
    category: "food",
  },
  "UBER ONE": {
    displayName: "Uber One",
    website: "https://www.uber.com",
    logo: "/logos/uber-one.png",
    category: "food",
  },
  "DELIVEROO PLUS": {
    displayName: "Deliveroo Plus",
    website: "https://deliveroo.fr",
    logo: "/logos/deliveroo-plus.png",
    category: "food",
  },
  "JUST EAT": {
    displayName: "Just Eat",
    website: "https://www.just-eat.fr",
    logo: "/logos/justeat.png",
    category: "food",
  },
  "HELLOFRESH": {
    displayName: "HelloFresh",
    website: "https://www.hellofresh.fr",
    logo: "/logos/hellofresh.png",
    category: "food",
  },

  // --- Téléphonie / Internet ---
  "ORANGE": {
    displayName: "Orange",
    website: "https://www.orange.fr",
    logo: "/logos/orange.png",
    category: "telecom",
  },
  "SFR": {
    displayName: "SFR",
    website: "https://www.sfr.fr",
    logo: "/logos/sfr.png",
    category: "telecom",
  },
  "FREE": {
    displayName: "Free",
    website: "https://www.free.fr",
    logo: "/logos/free.png",
    category: "telecom",
  },
  "FREE MOBILE": {
    displayName: "Free Mobile",
    website: "https://mobile.free.fr",
    logo: "/logos/free-mobile.png",
    category: "telecom",
  },
  "FREEBOX": {
    displayName: "Freebox",
    website: "https://www.free.fr/freebox",
    logo: "/logos/freebox.png",
    category: "telecom",
  },
  "BOUYGUES": {
    displayName: "Bouygues Telecom",
    website: "https://www.bouyguestelecom.fr",
    logo: "/logos/bouygues.png",
    category: "telecom",
  },
  "BBOX": {
    displayName: "Bouygues Telecom (BBox)",
    website: "https://www.bouyguestelecom.fr",
    logo: "/logos/bbox.png",
    category: "telecom",
  },
  "SOSH": {
    displayName: "Sosh",
    website: "https://www.sosh.fr",
    logo: "/logos/sosh.png",
    category: "telecom",
  },
  "RED": {
    displayName: "RED by SFR",
    website: "https://www.red-by-sfr.fr",
    logo: "/logos/red.png",
    category: "telecom",
  },
  "NRJ MOBILE": {
    displayName: "NRJ Mobile",
    website: "https://www.nrjmobile.fr",
    logo: "/logos/nrj-mobile.png",
    category: "telecom",
  },
  "LA POSTE MOBILE": {
    displayName: "La Poste Mobile",
    website: "https://www.lapostemobile.fr",
    logo: "/logos/laposte-mobile.png",
    category: "telecom",
  },
  "CDISCOUNT MOBILE": {
    displayName: "Cdiscount Mobile",
    website: "https://www.cdiscountmobile.com",
    logo: "/logos/cdiscount-mobile.png",
    category: "telecom",
  },

  // --- Banques en ligne / fintech ---
  "REVOLUT": {
    displayName: "Revolut",
    website: "https://www.revolut.com",
    logo: "/logos/revolut.png",
    category: "finance",
  },
  "N26": {
    displayName: "N26",
    website: "https://n26.com",
    logo: "/logos/n26.png",
    category: "finance",
  },
  "HELLO BANK": {
    displayName: "Hello bank!",
    website: "https://www.hellobank.fr",
    logo: "/logos/hello-bank.png",
    category: "finance",
  },
  "BOURSORAMA": {
    displayName: "Boursorama Banque",
    website: "https://www.boursorama-banque.com",
    logo: "/logos/boursorama.png",
    category: "finance",
  },
  "FORTUNEO": {
    displayName: "Fortuneo",
    website: "https://www.fortuneo.fr",
    logo: "/logos/fortuneo.png",
    category: "finance",
  },
  "ORANGE BANK": {
    displayName: "Orange Bank",
    website: "https://www.orangebank.fr",
    logo: "/logos/orange-bank.png",
    category: "finance",
  },
  "PAYPAL": {
    displayName: "PayPal",
    website: "https://www.paypal.com",
    logo: "/logos/paypal.png",
    category: "finance",
  },
  "LYDIA": {
    displayName: "Lydia",
    website: "https://lydia-app.com",
    logo: "/logos/lydia.png",
    category: "finance",
  },

  // --- Stockage Cloud ---
  "ICLOUD": {
    displayName: "iCloud",
    website: "https://www.icloud.com",
    logo: "/logos/icloud.png",
    category: "storage",
  },
  "GOOGLE ONE": {
    displayName: "Google One",
    website: "https://one.google.com",
    logo: "/logos/google-one.png",
    category: "storage",
  },
  "ONEDRIVE": {
    displayName: "OneDrive",
    website: "https://onedrive.live.com",
    logo: "/logos/onedrive.png",
    category: "storage",
  },
  "DROPBOX": {
    displayName: "Dropbox",
    website: "https://www.dropbox.com",
    logo: "/logos/dropbox.png",
    category: "storage",
  },

  // --- Productivité & Création ---
  "APPLE": {
    displayName: "Apple",
    website: "https://www.apple.com",
    logo: "/logos/apple.png",
    category: "productivity",
  },
  "GOOGLE": {
    displayName: "Google",
    website: "https://www.google.com",
    logo: "/logos/google.png",
    category: "productivity",
  },
  "GOOGLE PLAY": {
    displayName: "Google Play",
    website: "https://play.google.com",
    logo: "/logos/google-play.png",
    category: "productivity",
  },
  "MICROSOFT": {
    displayName: "Microsoft 365",
    website: "https://www.microsoft.com",
    logo: "/logos/microsoft.png",
    category: "productivity",
  },
  "ADOBE": {
    displayName: "Adobe",
    website: "https://www.adobe.com",
    logo: "/logos/adobe.png",
    category: "productivity",
  },
  "NOTION": {
    displayName: "Notion",
    website: "https://www.notion.so",
    logo: "/logos/notion.png",
    category: "productivity",
  },
  "FIGMA": {
    displayName: "Figma",
    website: "https://www.figma.com",
    logo: "/logos/figma.png",
    category: "productivity",
  },
  "GITHUB": {
    displayName: "GitHub",
    website: "https://github.com",
    logo: "/logos/github.png",
    category: "productivity",
  },
  "ZOOM": {
    displayName: "Zoom",
    website: "https://zoom.us",
    logo: "/logos/zoom.png",
    category: "productivity",
  },
  "CANVA": {
    displayName: "Canva",
    website: "https://www.canva.com",
    logo: "/logos/canva.png",
    category: "productivity",
  },
  "EVERNOTE": {
    displayName: "Evernote",
    website: "https://evernote.com",
    logo: "/logos/evernote.png",
    category: "productivity",
  },
  "LASTPASS": {
    displayName: "LastPass",
    website: "https://www.lastpass.com",
    logo: "/logos/lastpass.png",
    category: "productivity",
  },
  "1PASSWORD": {
    displayName: "1Password",
    website: "https://1password.com",
    logo: "/logos/1password.png",
    category: "productivity",
  },

  // --- VPN & Sécurité ---
  "NORDVPN": {
    displayName: "NordVPN",
    website: "https://nordvpn.com",
    logo: "/logos/nordvpn.png",
    category: "vpn",
  },
  "EXPRESSVPN": {
    displayName: "ExpressVPN",
    website: "https://www.expressvpn.com",
    logo: "/logos/expressvpn.png",
    category: "vpn",
  },
  "SURFSHARK": {
    displayName: "Surfshark",
    website: "https://surfshark.com",
    logo: "/logos/surfshark.png",
    category: "vpn",
  },
  "MALWAREBYTES": {
    displayName: "Malwarebytes",
    website: "https://www.malwarebytes.com",
    logo: "/logos/malwarebytes.png",
    category: "vpn",
  },

  // --- Intelligence Artificielle ---
  "CHATGPT": {
    displayName: "ChatGPT Plus",
    website: "https://chat.openai.com",
    logo: "/logos/chatgpt.png",
    category: "ai",
  },
  "OPENAI": {
    displayName: "OpenAI",
    website: "https://openai.com",
    logo: "/logos/openai.png",
    category: "ai",
  },
  "MIDJOURNEY": {
    displayName: "Midjourney",
    website: "https://www.midjourney.com",
    logo: "/logos/midjourney.png",
    category: "ai",
  },

  // --- Sport / salles ---
  "BASIC FIT": {
    displayName: "Basic-Fit",
    website: "https://www.basic-fit.com",
    logo: "/logos/basicfit.png",
    category: "sport",
  },
  "FITNESS PARK": {
    displayName: "Fitness Park",
    website: "https://www.fitnesspark.fr",
    logo: "/logos/fitnesspark.png",
    category: "sport",
  },
  "KEEP COOL": {
    displayName: "Keep Cool",
    website: "https://www.keepcool.fr",
    logo: "/logos/keepcool.png",
    category: "sport",
  },
  "VG CLUB": {
    displayName: "Keep Cool (VG Club)",
    website: "https://www.keepcool.fr",
    logo: "/logos/keepcool.png",
    category: "sport",
  },
  "NEONESS": {
    displayName: "Neoness",
    website: "https://www.neoness.fr",
    logo: "/logos/neoness.png",
    category: "sport",
  },
  "L ORANGE BLEUE": {
    displayName: "L'Orange Bleue",
    website: "https://www.lorangebleue.fr",
    logo: "/logos/lorangebleue.png",
    category: "sport",
  },
  "BASIC-FIT FRANCE": {
    displayName: "Basic-Fit",
    website: "https://www.basic-fit.com",
    logo: "/logos/basicfit.png",
    category: "sport",
  },

  // --- Assurance auto / habitation / santé / mutuelles ---
  "AVANSSUR": {
    displayName: "Direct Assurance (Avanssur)",
    website: "https://www.direct-assurance.fr",
    logo: "/logos/avanssur.png",
    category: "insurance",
  },
  "DIRECT ASSURANCE": {
    displayName: "Direct Assurance",
    website: "https://www.direct-assurance.fr",
    logo: "/logos/direct-assurance.png",
    category: "insurance",
  },
  "MAIF": {
    displayName: "MAIF",
    website: "https://www.maif.fr",
    logo: "/logos/maif.png",
    category: "insurance",
  },
  "MACIF": {
    displayName: "MACIF",
    website: "https://www.macif.fr",
    logo: "/logos/macif.png",
    category: "insurance",
  },
  "MATMUT": {
    displayName: "Matmut",
    website: "https://www.matmut.fr",
    logo: "/logos/matmut.png",
    category: "insurance",
  },
  "GMF": {
    displayName: "GMF",
    website: "https://www.gmf.fr",
    logo: "/logos/gmf.png",
    category: "insurance",
  },
  "GROUPAMA": {
    displayName: "Groupama",
    website: "https://www.groupama.fr",
    logo: "/logos/groupama.png",
    category: "insurance",
  },
  "ALLIANZ": {
    displayName: "Allianz",
    website: "https://www.allianz.fr",
    logo: "/logos/allianz.png",
    category: "insurance",
  },
  "APRIL": {
    displayName: "April",
    website: "https://www.april.fr",
    logo: "/logos/april.png",
    category: "insurance",
  },
  "L OLIVIER": {
    displayName: "L'Olivier Assurance",
    website: "https://www.lolivier.fr",
    logo: "/logos/lolivier.png",
    category: "insurance",
  },
  "EUROFIL": {
    displayName: "Eurofil",
    website: "https://www.eurofil.com",
    logo: "/logos/eurofil.png",
    category: "insurance",
  },
  "HARMONIE": {
    displayName: "Harmonie Mutuelle",
    website: "https://www.harmonie-mutuelle.fr",
    logo: "/logos/harmonie-mutuelle.png",
    category: "insurance",
  },
  "MGEN": {
    displayName: "MGEN",
    website: "https://www.mgen.fr",
    logo: "/logos/mgen.png",
    category: "insurance",
  },
  "MUTUELLE GENERALE": {
    displayName: "La Mutuelle Générale",
    website: "https://www.lamutuellegenerale.fr",
    logo: "/logos/mutuelle-generale.png",
    category: "insurance",
  },
  "SWISSLIFE": {
    displayName: "Swiss Life",
    website: "https://www.swisslife.fr",
    logo: "/logos/swisslife.png",
    category: "insurance",
  },
  "MALAKOFF": {
    displayName: "Malakoff Humanis",
    website: "https://www.malakoffhumanis.com",
    logo: "/logos/malakoff.png",
    category: "insurance",
  },
  "AG2R": {
    displayName: "AG2R La Mondiale",
    website: "https://www.ag2rlamondiale.fr",
    logo: "/logos/ag2r.png",
    category: "insurance",
  },
  "CNP": {
    displayName: "CNP Assurances",
    website: "https://www.cnp.fr",
    logo: "/logos/cnp.png",
    category: "insurance",
  },
  "SPB": {
    displayName: "SPB (assurance appareils / CB)",
    website: "https://www.spb.eu",
    logo: "/logos/spb.png",
    category: "insurance",
  },

  // --- Transport / mobilité / abonnements ---
  "SNCF": {
    displayName: "SNCF",
    website: "https://www.sncf-connect.com",
    logo: "/logos/sncf.png",
    category: "transport",
  },
  "NAVIGO": {
    displayName: "Navigo",
    website: "https://www.iledefrance-mobilites.fr",
    logo: "/logos/navigo.png",
    category: "transport",
  },
  "VELIB": {
    displayName: "Vélib'",
    website: "https://www.velib-metropole.fr",
    logo: "/logos/velib.png",
    category: "transport",
  },
  "UBER": {
    displayName: "Uber",
    website: "https://www.uber.com",
    logo: "/logos/uber.png",
    category: "transport",
  },
  "BOLT": {
    displayName: "Bolt",
    website: "https://bolt.eu",
    logo: "/logos/bolt.png",
    category: "transport",
  },
  "FREE2MOVE": {
    displayName: "Free2Move",
    website: "https://www.free2move.com",
    logo: "/logos/free2move.png",
    category: "transport",
  },
  "CITYSCOOT": {
    displayName: "Cityscoot",
    website: "https://www.cityscoot.eu",
    logo: "/logos/cityscoot.png",
    category: "transport",
  },
  "TIER": {
    displayName: "TIER",
    website: "https://www.tier.app",
    logo: "/logos/tier.png",
    category: "transport",
  },

  // --- Médias / journaux / infos ---
  "MEDIAPART": {
    displayName: "Mediapart",
    website: "https://www.mediapart.fr",
    logo: "/logos/mediapart.png",
    category: "news",
  },
  "LE MONDE": {
    displayName: "Le Monde",
    website: "https://www.lemonde.fr",
    logo: "/logos/lemonde.png",
    category: "news",
  },
  "LE FIGARO": {
    displayName: "Le Figaro",
    website: "https://www.lefigaro.fr",
    logo: "/logos/lefigaro.png",
    category: "news",
  },
  "LES ECHOS": {
    displayName: "Les Échos",
    website: "https://www.lesechos.fr",
    logo: "/logos/lesechos.png",
    category: "news",
  },

  // --- Jeux vidéo / consoles ---
  "PLAYSTATION PLUS": {
    displayName: "PlayStation Plus",
    website: "https://www.playstation.com",
    logo: "/logos/playstation-plus.png",
    category: "gaming",
  },
  "XBOX GAME PASS": {
    displayName: "Xbox Game Pass",
    website: "https://www.xbox.com",
    logo: "/logos/xbox-game-pass.png",
    category: "gaming",
  },
  "NINTENDO ONLINE": {
    displayName: "Nintendo Switch Online",
    website: "https://www.nintendo.fr",
    logo: "/logos/nintendo-online.png",
    category: "gaming",
  },

  // --- Divers / plateformes / créateurs ---
  "PATREON": {
    displayName: "Patreon",
    website: "https://www.patreon.com",
    logo: "/logos/patreon.png",
    category: "other",
  },
  "Plex": {
    displayName: "Plex",
    website: "https://www.plex.tv",
    logo: "/logos/plex.png",
    category: "streaming",
  },
};

/**
 * Nettoie un libellé bancaire en supprimant les mots parasites
 */
export function cleanLabel(label: string): string {
  let cleaned = label.toUpperCase().trim();
  
  // 1. Supprimer les chiffres isolés ou patterns de type "-2-", "-12-"
  cleaned = cleaned.replace(/[-_]\d+[-_]/g, " ");
  
  // 2. Supprimer les répétitions (ex: "VG-CLUB-2-VG" → garder juste la première occurrence)
  // Pattern: mot-chiffres-même_mot
  cleaned = cleaned.replace(/(\b\w+)\b[-_\s]\d+[-_\s]\1\b/gi, "$1");
  
  // 3. Supprimer les mots parasites
  for (const noise of NOISE_PATTERNS) {
    // Si c'est une regex (contient des backslashes ou caractères spéciaux)
    if (noise.includes("\\")) {
      const regex = new RegExp(noise, "g");
      cleaned = cleaned.replace(regex, " ");
    } else {
      // Remplacement simple de mots entiers
      const regex = new RegExp(`\\b${noise}\\b`, "g");
      cleaned = cleaned.replace(regex, " ");
    }
  }
  
  // 4. Supprimer les chiffres isolés en fin de mot (ex: "CLUB2" → "CLUB")
  cleaned = cleaned.replace(/\b(\w+)\d+\b/g, "$1");
  
  // 5. Supprimer les caractères spéciaux sauf espaces
  cleaned = cleaned.replace(/[-_.,;:!?\/\\]+/g, " ");
  
  // 6. Nettoyer les espaces multiples et trim
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  
  // 7. Supprimer les mots d'une seule lettre (sauf si c'est tout ce qui reste)
  const words = cleaned.split(" ");
  if (words.length > 1) {
    cleaned = words.filter(word => word.length > 1).join(" ");
  }
  
  return cleaned;
}

/**
 * Normalise un libellé pour le matching avec la base de marques
 */
export function normalizeForMatching(label: string): string {
  const cleaned = cleanLabel(label);
  
  // Patterns spéciaux pour certains services
  const specialPatterns: Record<string, RegExp> = {
    "NETFLIX": /NETFLIX/i,
    "SPOTIFY": /SPOTIFY/i,
    "AMAZON PRIME": /AMAZON.*PRIME|PRIME.*VIDEO/i,
    "AMAZON": /AMAZON/i,
    "DISNEY": /DISNEY/i,
    "YOUTUBE": /YOUTUBE/i,
    "CANAL": /CANAL/i,
    "AVANSSUR": /AVVANSSUR|AVANSSUR/i,
    "ORANGE": /\bORANGE\b/i,
    "SFR": /\bSFR\b/i,
    "FREE MOBILE": /FREE\s+MOBILE/i,
    "FREE": /\bFREE\b/i,
    "BOUYGUES": /BOUYGUES/i,
    "BBOX": /\bBBOX\b/i,
    "VG CLUB": /VG\s*CLUB/i,
    "KEEP COOL": /KEEP\s*COOL/i,
    "BASIC FIT": /BASIC[\s-]*FIT/i,
    "NEONESS": /NEONESS/i,
    "NRJ MOBILE": /NRJ\s*MOBILE/i,
    "LA POSTE MOBILE": /LA\s*POSTE\s*MOBILE/i,
    "CDISCOUNT A VOLONTE": /CDISCOUNT.*VOLONTE|CDAV/i,
    "FNAC PLUS": /FNAC\s*\+|FNAC\s*PLUS/i,
    "DARTY MAX": /DARTY\s*MAX/i,
    "HELLOFRESH": /HELLOFRESH/i,
  };
  
  // Tester les patterns spéciaux
  for (const [key, pattern] of Object.entries(specialPatterns)) {
    if (pattern.test(cleaned)) {
      return key;
    }
  }
  
  return cleaned;
}

/**
 * Récupère les informations de marque pour un libellé donné
 */
export function getBrandInfo(labelRaw: string, labelNormalized: string): Brand | null {
  // Essayer d'abord avec le matching spécial
  const matchKey = normalizeForMatching(labelRaw);
  
  if (BRAND_DATABASE[matchKey]) {
    return BRAND_DATABASE[matchKey];
  }
  
  // Essayer avec le label normalisé
  if (BRAND_DATABASE[labelNormalized]) {
    return BRAND_DATABASE[labelNormalized];
  }
  
  // Chercher une correspondance partielle
  for (const [key, brand] of Object.entries(BRAND_DATABASE)) {
    if (labelNormalized.includes(key) || key.includes(labelNormalized)) {
      return brand;
    }
  }
  
  return null;
}

/**
 * Retourne le nom d'affichage pour un abonnement
 */
export function getDisplayName(labelRaw: string, labelNormalized: string): string {
  const brand = getBrandInfo(labelRaw, labelNormalized);
  
  if (brand) {
    return brand.displayName;
  }
  
  // Si pas de marque connue, retourner une version humanisée du libellé
  const cleaned = cleanLabel(labelRaw);
  
  // Capitaliser proprement (première lettre en maj, reste en min)
  return cleaned
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Retourne le chemin du logo pour un abonnement
 */
export function getLogoPath(labelRaw: string, labelNormalized: string): string | null {
  const brand = getBrandInfo(labelRaw, labelNormalized);
  return brand?.logo ?? null;
}

/**
 * Retourne le site web pour un abonnement
 */
export function getWebsite(labelRaw: string, labelNormalized: string): string | null {
  const brand = getBrandInfo(labelRaw, labelNormalized);
  return brand?.website ?? null;
}

/**
 * Retourne la catégorie pour un abonnement
 */
export function getCategory(labelRaw: string, labelNormalized: string): string | null {
  const brand = getBrandInfo(labelRaw, labelNormalized);
  return brand?.category ?? null;
}
