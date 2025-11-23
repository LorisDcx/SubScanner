# Netlify Forms Setup (App Router)

## 1. Build & Deploy
```bash
npm run build
netlify deploy --prod
```

Ou via Git :
```bash
git add .
git commit -m "feat: netlify forms"
git push origin main
```

## 2. Configuration Netlify
`netlify.toml` (déjà inclus) :
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## 3. Formulaire statique obligatoire
Le plugin Next.js nécessite au moins un formulaire statique détectable. Un fallback est disponible dans `public/netlify-forms/feedback.html`. **Ne pas supprimer** tant que Netlify Forms est utilisé.

## 4. Notifications
Dans le dashboard Netlify → **Settings → Forms → Form notifications** → ajouter `lorisdcxpro@gmail.com`.
