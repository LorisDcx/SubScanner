# Guide d'utilisation : Logos automatiques

## 🚀 Quick Start

### 1. Télécharger tous les logos en une commande

```bash
npm run fetch-logos
```

C'est tout ! Le script va :
- Télécharger les logos de 150+ marques
- Utiliser Clearbit (meilleure qualité) en priorité
- Fallback sur Google Favicon si nécessaire
- Skip les logos déjà présents
- Te donner un rapport détaillé

### 2. Résultat attendu

```
public/logos/
  ├── netflix.png
  ├── spotify.png
  ├── amazon.png
  ├── disney.png
  ├── keepcool.png
  └── ... (150+ logos)
```

## 📋 Workflow complet

### Étape 1 : Ajouter une nouvelle marque

**Fichier :** `src/lib/brand-mapping.ts`

```typescript
// Dans BRAND_DATABASE
"MA_MARQUE": {
  displayName: "Ma Marque",
  website: "https://www.mamarque.com",
  logo: "/logos/ma-marque.png",
},
```

### Étape 2 : Ajouter le domaine dans le script

**Fichier :** `scripts/fetch-logos.mjs`

```javascript
// Dans le tableau BRANDS
{ key: "MA_MARQUE", domain: "mamarque.com", filename: "ma-marque.png" },
```

### Étape 3 : Télécharger le logo

```bash
npm run fetch-logos
```

Le script va automatiquement télécharger uniquement les logos manquants.

### Étape 4 : Vérifier le résultat

```bash
# Windows
start public\logos\ma-marque.png

# Mac/Linux
open public/logos/ma-marque.png
```

## 🎯 Sources de logos

Le script essaie dans cet ordre :

### 1. Clearbit Logo API ⭐ (Recommandé)
- **URL :** `https://logo.clearbit.com/{domain}`
- **Qualité :** Excellente (SVG converti en haute résolution)
- **Gratuit :** Oui
- **Exemple :** `https://logo.clearbit.com/netflix.com`

### 2. Google Favicon API
- **URL :** `https://www.google.com/s2/favicons?domain={domain}&sz=128`
- **Qualité :** Bonne (128x128px)
- **Gratuit :** Oui
- **Exemple :** `https://www.google.com/s2/favicons?domain=netflix.com&sz=128`

### 3. Favicon du site
- **URL :** `https://{domain}/favicon.ico`
- **Qualité :** Variable
- **Gratuit :** Oui

## 🔧 Options avancées

### Forcer le re-téléchargement d'un logo

```bash
# Supprimer le logo existant
rm public/logos/netflix.png

# Re-télécharger
npm run fetch-logos
```

### Télécharger un logo manuellement

Si le script échoue pour une marque spécifique :

#### Option 1 : Site officiel
1. Aller sur le site de la marque
2. Chercher "Press Kit" ou "Brand Assets"
3. Télécharger le logo (PNG, 128x128px minimum)
4. Le placer dans `public/logos/`

#### Option 2 : Brandfetch
1. Aller sur [brandfetch.com](https://brandfetch.com/)
2. Rechercher la marque
3. Télécharger le logo en PNG
4. Le placer dans `public/logos/`

#### Option 3 : Générateur de placeholder
```bash
# Windows
start scripts/generate-placeholder-logos.html

# Mac/Linux
open scripts/generate-placeholder-logos.html
```

Créer un logo avec les initiales de la marque.

## 📊 Format des logos

### Spécifications recommandées

- **Format :** PNG avec fond transparent
- **Taille :** 128x128px minimum (512x512px idéal)
- **Poids :** < 50 KB par logo
- **Nommage :** minuscules, tirets pour les espaces
  - ✅ `netflix.png`
  - ✅ `amazon-prime.png`
  - ❌ `Netflix.png`
  - ❌ `amazon prime.png`

### Optimisation automatique

Next.js optimise automatiquement les images grâce au composant `<Image>` :
- Conversion WebP/AVIF
- Lazy loading
- Responsive sizing
- Cache long terme

## 🐛 Dépannage

### Le script échoue pour tous les logos

**Problème :** Pas de connexion internet ou firewall

**Solution :**
```bash
# Tester la connexion
curl https://logo.clearbit.com/netflix.com -o test.png

# Si ça fonctionne, relancer le script
npm run fetch-logos
```

### Un logo spécifique ne se télécharge pas

**Problème :** Le domaine n'a pas de logo sur Clearbit/Google

**Solutions :**
1. Télécharger manuellement (voir ci-dessus)
2. Utiliser le générateur de placeholder
3. Laisser vide (les initiales s'afficheront automatiquement)

### Les logos sont de mauvaise qualité

**Problème :** Clearbit n'a pas ce logo en haute résolution

**Solution :**
1. Chercher le logo officiel sur le site de la marque
2. Télécharger en haute résolution (512x512px)
3. Remplacer dans `public/logos/`

### Le script est bloqué par un rate limit

**Problème :** Trop de requêtes rapides

**Solution :** Le script a déjà une pause de 100ms entre chaque requête. Si le problème persiste :

```javascript
// Dans scripts/fetch-logos.mjs, ligne ~260
await new Promise(resolve => setTimeout(resolve, 500)); // 100 → 500ms
```

## 📈 Statistiques

### Marques actuellement supportées

- **Streaming vidéo :** 10 marques (Netflix, Disney+, Canal+, etc.)
- **Streaming audio :** 6 marques (Spotify, Deezer, Apple Music, etc.)
- **E-commerce :** 9 marques (Amazon, Fnac+, Cdiscount, etc.)
- **Télécoms :** 12 marques (Orange, SFR, Free, Bouygues, etc.)
- **Banques/Fintech :** 8 marques (Revolut, N26, PayPal, etc.)
- **Logiciels/Cloud :** 25+ marques (Adobe, Microsoft, Google, etc.)
- **Sport :** 5 marques (Basic-Fit, Keep Cool, etc.)
- **Assurances :** 8+ marques (MAIF, MACIF, Allianz, etc.)
- **Transport :** 8 marques (SNCF, Uber, Bolt, etc.)
- **Médias :** 4 marques (Le Monde, Mediapart, etc.)
- **Gaming :** 3 marques (PlayStation, Xbox, Nintendo)
- **Autres :** Patreon, Plex, etc.

**Total :** 150+ marques supportées

## 🚦 Best Practices

### ✅ À faire

- Lancer `npm run fetch-logos` après avoir ajouté des marques
- Vérifier visuellement les logos téléchargés
- Garder les logos en PNG (transparent)
- Utiliser des noms de fichiers cohérents

### ❌ À éviter

- Ne pas commit des logos de mauvaise qualité
- Ne pas utiliser de JPG (pas de transparence)
- Ne pas renommer les fichiers manuellement (suivre la convention)
- Ne pas télécharger des logos avec watermark

## 💡 Tips

### Trouver le bon domaine

Parfois le domaine n'est pas évident :

```javascript
// ❌ Mauvais
{ domain: "www.netflix.com" }  // Pas de www

// ✅ Bon
{ domain: "netflix.com" }

// ✅ Sous-domaine OK si c'est le service principal
{ domain: "music.apple.com" }  // Apple Music
{ domain: "tv.apple.com" }      // Apple TV+
```

### Batch download pour les nouvelles marques

```bash
# 1. Ajouter toutes les marques dans brand-mapping.ts
# 2. Ajouter tous les domaines dans fetch-logos.mjs
# 3. Une seule commande pour tout télécharger
npm run fetch-logos
```

### Vérifier l'intégration

```bash
# Démarrer le serveur de dev
npm run dev

# Uploader un CSV avec les marques configurées
# Vérifier que les logos s'affichent dans le tableau
```

## 📝 Maintenance

### Ajouter un batch de marques

1. Éditer `src/lib/brand-mapping.ts` → Ajouter dans `BRAND_DATABASE`
2. Éditer `scripts/fetch-logos.mjs` → Ajouter dans `BRANDS`
3. Lancer `npm run fetch-logos`
4. Commit les nouveaux logos :

```bash
git add public/logos/*.png
git add src/lib/brand-mapping.ts
git add scripts/fetch-logos.mjs
git commit -m "feat: ajout de 10 nouvelles marques avec logos"
```

### Mettre à jour un logo

```bash
# Supprimer l'ancien
rm public/logos/netflix.png

# Re-télécharger
npm run fetch-logos

# Ou remplacer manuellement avec un meilleur logo
```
