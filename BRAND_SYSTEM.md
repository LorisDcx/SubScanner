# Système de normalisation et mapping des marques

## Vue d'ensemble

Ce système transforme les libellés bancaires bruts en noms de marques reconnaissables avec logos.

**Exemple de transformation :**
```
PRLV SEPA AVVANSSUR FRANCE
↓
"Direct Assurance (Avanssur)"
```

## Architecture

### 1. Normalisation des libellés (`lib/brand-mapping.ts`)

**Fonction `cleanLabel()`**
- Supprime les préfixes bancaires : `PRLV SEPA`, `PAIEMENT CB`, `CARTE`, etc.
- Supprime les mots génériques : `FRANCE`, `SARL`, `EU`, `ASSURANCES`, etc.
- Nettoie les espaces et caractères superflus

**Fonction `normalizeForMatching()`**
- Applique `cleanLabel()` + patterns spéciaux
- Détecte les variations (ex: `AVVANSSUR` → `AVANSSUR`)

### 2. Base de données des marques

Fichier : `lib/brand-mapping.ts` → Constante `BRAND_DATABASE`

Structure :
```typescript
const BRAND_DATABASE: BrandMapping = {
  "NETFLIX": {
    displayName: "Netflix",
    website: "https://www.netflix.com",
    logo: "/logos/netflix.png",
  },
  // ...
}
```

**Marques actuellement supportées :**
- **Streaming vidéo** : Netflix, Disney+, Amazon Prime, Canal+, OCS, Molotov, Salto
- **Streaming audio** : Spotify, Deezer, YouTube Premium, Apple Music
- **E-commerce** : Amazon
- **Assurances** : Avanssur/Direct Assurance, MAIF, MACIF
- **Télécoms** : Orange, SFR, Free, Bouygues, Sosh, RED, B&YOU
- **Transport** : SNCF, Navigo, Vélib', Uber
- **Productivité** : LinkedIn, Adobe, Dropbox, Microsoft 365, Google, Notion, ChatGPT, OpenAI, Midjourney
- **Sport** : Basic-Fit, Keep Cool, Neoness, Fitness Park

### 3. Enrichissement des abonnements

Fichier : `lib/analyze-csv.ts`

Lors de la détection des abonnements, le système enrichit automatiquement chaque `Subscription` avec :
- `displayName` : Nom de marque propre
- `logo` : Chemin vers le logo (`/logos/xxx.png`)
- `website` : URL du site web

### 4. Affichage dans l'UI

Fichier : `components/SubscriptionsTable.tsx`

**Affichage :**
- Logo de la marque (ou initiales si pas de logo)
- Nom de marque nettoyé
- Lien cliquable vers le site web

## Comment ajouter une nouvelle marque

### Étape 1 : Identifier le pattern du libellé

Exemple de libellé bancaire :
```
PRLV SEPA DEEZER SA 12345
```

### Étape 2 : Ajouter la marque dans `BRAND_DATABASE`

```typescript
"DEEZER": {
  displayName: "Deezer",
  website: "https://www.deezer.com",
  logo: "/logos/deezer.png",
},
```

### Étape 3 : (Optionnel) Ajouter un pattern spécial

Si le libellé a des variations complexes :

```typescript
const specialPatterns: Record<string, RegExp> = {
  // ...
  "DEEZER": /DEEZER/i,
};
```

### Étape 4 : Ajouter le logo

1. Télécharger le logo (format PNG, 128x128px recommandé)
2. Le placer dans `/public/logos/deezer.png`
3. Le logo doit avoir un fond transparent

**Sources pour les logos :**
- Site officiel (section Press Kit / Brand Assets)
- [Brandfetch](https://brandfetch.com/)
- [Clearbit Logo API](https://clearbit.com/logo)

### Étape 5 : (Optionnel) Ajouter des patterns de nettoyage

Si la marque a des suffixes spécifiques à supprimer :

```typescript
const NOISE_PATTERNS = [
  // ...
  "SPECIFIC_SUFFIX",
];
```

## Système de fallback

### Logo manquant
Si aucun logo n'est disponible, le système affiche automatiquement les **initiales** de la marque dans un cercle coloré.

Exemple : "Direct Assurance" → "DA"

### Marque inconnue
Si aucune marque n'est reconnue, le système :
1. Nettoie le libellé (supprime `PRLV SEPA`, etc.)
2. Capitalise proprement (première lettre en majuscule)
3. Affiche ce libellé humanisé

Exemple :
```
PRLV SEPA UNKNOWN SERVICE
↓
"Unknown Service"
```

## Tests et debugging

### Tester la normalisation

```typescript
import { cleanLabel, normalizeForMatching, getBrandInfo } from "@/lib/brand-mapping";

const label = "PRLV SEPA NETFLIX.COM";
console.log(cleanLabel(label)); // "NETFLIX.COM"
console.log(normalizeForMatching(label)); // "NETFLIX"

const brand = getBrandInfo(label, normalizeForMatching(label));
console.log(brand); // { displayName: "Netflix", ... }
```

### Vérifier les logs

Les logs de l'analyse CSV affichent les libellés détectés :
- Dans la console du navigateur (mode développement)
- Dans les logs serveur (API route `/api/analyze`)

## Bonnes pratiques

### Nommage des fichiers de logos
- ✅ `netflix.png` (minuscules, sans espaces)
- ✅ `amazon-prime.png` (tirets pour les espaces)
- ❌ `Netflix.png` (majuscules)
- ❌ `amazon prime.png` (espaces)

### Qualité des logos
- Format : PNG avec fond transparent
- Taille : 128x128px minimum
- Poids : < 50 KB par logo

### Organisation du code
- ✅ Ajouter les marques par catégorie dans `BRAND_DATABASE`
- ✅ Commenter les patterns complexes
- ✅ Garder les noms de clés en MAJUSCULES

## Performance

### Optimisation des images
Le composant utilise `next/image` pour :
- Lazy loading automatique
- Optimisation de la taille
- Format WebP si supporté

### Cache
Les logos sont statiques et cachés par le navigateur (cache long terme).

## Évolutions futures

### Version 1.1
- [ ] API pour récupérer automatiquement les logos (Clearbit, Brandfetch)
- [ ] Système de scoring de confiance pour le matching
- [ ] Interface d'administration pour gérer les mappings
- [ ] Export/import de la base de marques

### Version 1.2
- [ ] Détection multi-langues
- [ ] Support des variations régionales
- [ ] Machine Learning pour améliorer le matching

## Support

Pour toute question ou ajout de marque :
1. Consulter les exemples existants dans `BRAND_DATABASE`
2. Tester avec des libellés réels de relevés bancaires
3. Vérifier les logs de normalisation
