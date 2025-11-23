# Scripts utiles

## 1. Téléchargement automatique des logos

**Fichier :** `fetch-logos.mjs`

### Utilisation

```bash
npm run fetch-logos
```

Ce script télécharge automatiquement les logos de toutes les marques configurées en utilisant plusieurs sources :

1. **Clearbit Logo API** (meilleure qualité, gratuit)
2. **Google Favicon API** (fallback, 128x128px)
3. **Favicon du site** (dernier recours)

### Fonctionnalités

- ✅ Skip automatique des logos déjà téléchargés
- ✅ Retry automatique avec plusieurs sources
- ✅ Validation de la taille du fichier (évite les fichiers vides)
- ✅ Pause entre les requêtes (évite le rate limiting)
- ✅ Rapport détaillé à la fin

### Exemple de sortie

```
🎨 Téléchargement de 150 logos...

📥 NETFLIX (netflix.com)
  Tentative: https://logo.clearbit.com/netflix.com
  ✓ Succès depuis logo.clearbit.com

⏭️  SPOTIFY: déjà présent (spotify.png)

📥 KEEP COOL (keepcool.fr)
  Tentative: https://logo.clearbit.com/keepcool.fr
  ✗ Échec - aucune source n'a fonctionné

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Téléchargés: 120
⏭️  Déjà présents: 25
✗ Échecs: 5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Ajouter une nouvelle marque

1. Ouvrir `scripts/fetch-logos.mjs`
2. Ajouter l'entrée dans `BRANDS` :

```javascript
{ key: "MA_MARQUE", domain: "monsite.com", filename: "ma-marque.png" },
```

3. Lancer le script :

```bash
npm run fetch-logos
```

### Logos manquants

Si certains logos échouent, tu peux :

1. **Télécharger manuellement** depuis le site officiel (section Brand Assets/Press Kit)
2. **Utiliser le générateur de placeholder** (voir ci-dessous)
3. **Essayer un autre service** :
   - [Brandfetch](https://brandfetch.com/)
   - [Simple Icons](https://simpleicons.org/)

---

## 2. Générateur de logos placeholder

**Fichier :** `generate-placeholder-logos.html`

### Utilisation

1. Ouvrir le fichier dans un navigateur :
   ```bash
   # Windows
   start scripts/generate-placeholder-logos.html
   
   # Mac
   open scripts/generate-placeholder-logos.html
   
   # Linux
   xdg-open scripts/generate-placeholder-logos.html
   ```

2. Entrer le nom de la marque
3. Choisir une couleur (détection automatique pour les marques connues)
4. Cliquer sur "Télécharger le logo"
5. Placer le fichier téléchargé dans `/public/logos/`

### Marques avec couleurs pré-configurées

Le générateur détecte automatiquement les couleurs de ces marques :

- **Netflix** : Rouge (#E50914)
- **Spotify** : Vert (#1DB954)
- **Amazon** : Orange (#FF9900)
- **Disney+** : Bleu (#113CCF)
- **YouTube** : Rouge (#FF0000)
- **Canal+** : Noir (#000000)
- **Orange** : Orange (#FF7900)
- **SFR** : Rouge (#E4032E)
- **Free** : Rouge (#CC0001)
- **Bouygues** : Cyan (#009FC5)
- **Apple** : Noir (#000000)
- **Google** : Bleu (#4285F4)
- **Microsoft** : Bleu (#00A4EF)
- **LinkedIn** : Bleu (#0077B5)
- **Adobe** : Rouge (#FF0000)
- **Uber** : Noir (#000000)

### Exemple de workflow

Pour créer un logo pour "Deezer" :

1. Ouvrir `generate-placeholder-logos.html`
2. Taper "Deezer" dans le champ
3. Choisir la couleur violette/orange de Deezer
4. Télécharger → `deezer.png`
5. Déplacer dans `/public/logos/deezer.png`

### Alternatives pour les vrais logos

Au lieu d'utiliser des placeholders, vous pouvez :

1. **Site officiel de la marque**
   - Chercher "brand assets" ou "press kit"
   - Télécharger le logo officiel

2. **Brandfetch** (https://brandfetch.com/)
   - Rechercher la marque
   - Télécharger le logo en PNG

3. **Clearbit Logo API**
   - URL : `https://logo.clearbit.com/[domain]`
   - Exemple : `https://logo.clearbit.com/netflix.com`

4. **Simple Icons** (https://simpleicons.org/)
   - Logos SVG de marques tech
   - Convertir en PNG si nécessaire
