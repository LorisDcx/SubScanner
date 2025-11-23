#!/usr/bin/env node
/**
 * Script de téléchargement automatique des logos de marques
 * 
 * Utilise plusieurs sources :
 * 1. Clearbit Logo API (gratuit, haute qualité)
 * 2. Google Favicon API (fallback)
 * 3. Favicon du site directement
 * 
 * Usage: node scripts/fetch-logos.mjs
 */

import fs from 'fs';
import path from 'path';
import https from 'https';

// Liste des marques avec leurs domaines
// Format: { key: "NETFLIX", domain: "netflix.com", filename: "netflix.png" }
const BRANDS = [
  // Streaming vidéo
  { key: "NETFLIX", domain: "netflix.com", filename: "netflix.png" },
  { key: "DISNEY", domain: "disneyplus.com", filename: "disney.png" },
  { key: "PRIME VIDEO", domain: "primevideo.com", filename: "prime-video.png" },
  { key: "AMAZON PRIME", domain: "amazon.fr", filename: "amazon-prime.png" },
  { key: "CANAL", domain: "canalplus.com", filename: "canal.png" },
  { key: "OCS", domain: "ocs.fr", filename: "ocs.png" },
  { key: "MOLOTOV", domain: "molotov.tv", filename: "molotov.png" },
  { key: "SALTO", domain: "salto.fr", filename: "salto.png" },
  { key: "YOUTUBE", domain: "youtube.com", filename: "youtube.png" },
  { key: "APPLE TV", domain: "tv.apple.com", filename: "apple-tv.png" },
  
  // Streaming audio
  { key: "SPOTIFY", domain: "spotify.com", filename: "spotify.png" },
  { key: "DEEZER", domain: "deezer.com", filename: "deezer.png" },
  { key: "APPLE MUSIC", domain: "music.apple.com", filename: "apple-music.png" },
  { key: "AUDIBLE", domain: "audible.fr", filename: "audible.png" },
  { key: "TIDAL", domain: "tidal.com", filename: "tidal.png" },
  { key: "QOBUZ", domain: "qobuz.com", filename: "qobuz.png" },
  
  // E-commerce
  { key: "AMAZON", domain: "amazon.fr", filename: "amazon.png" },
  { key: "CDISCOUNT", domain: "cdiscount.com", filename: "cdiscount.png" },
  { key: "FNAC PLUS", domain: "fnac.com", filename: "fnac-plus.png" },
  { key: "DARTY MAX", domain: "darty.com", filename: "darty-max.png" },
  { key: "LA REDOUTE", domain: "laredoute.fr", filename: "la-redoute-plus.png" },
  { key: "UBER EATS", domain: "ubereats.com", filename: "uber-pass.png" },
  { key: "DELIVEROO", domain: "deliveroo.fr", filename: "deliveroo-plus.png" },
  { key: "JUST EAT", domain: "just-eat.fr", filename: "justeat.png" },
  { key: "HELLOFRESH", domain: "hellofresh.fr", filename: "hellofresh.png" },
  
  // Télécoms
  { key: "ORANGE", domain: "orange.fr", filename: "orange.png" },
  { key: "SFR", domain: "sfr.fr", filename: "sfr.png" },
  { key: "FREE", domain: "free.fr", filename: "free.png" },
  { key: "FREE MOBILE", domain: "mobile.free.fr", filename: "free-mobile.png" },
  { key: "FREEBOX", domain: "free.fr", filename: "freebox.png" },
  { key: "BOUYGUES", domain: "bouyguestelecom.fr", filename: "bouygues.png" },
  { key: "BBOX", domain: "bouyguestelecom.fr", filename: "bbox.png" },
  { key: "SOSH", domain: "sosh.fr", filename: "sosh.png" },
  { key: "RED", domain: "red-by-sfr.fr", filename: "red.png" },
  { key: "NRJ MOBILE", domain: "nrjmobile.fr", filename: "nrj-mobile.png" },
  { key: "LA POSTE MOBILE", domain: "lapostemobile.fr", filename: "laposte-mobile.png" },
  { key: "CDISCOUNT MOBILE", domain: "cdiscountmobile.com", filename: "cdiscount-mobile.png" },
  
  // Banques / Fintech
  { key: "REVOLUT", domain: "revolut.com", filename: "revolut.png" },
  { key: "N26", domain: "n26.com", filename: "n26.png" },
  { key: "HELLO BANK", domain: "hellobank.fr", filename: "hello-bank.png" },
  { key: "BOURSORAMA", domain: "boursorama-banque.com", filename: "boursorama.png" },
  { key: "FORTUNEO", domain: "fortuneo.fr", filename: "fortuneo.png" },
  { key: "ORANGE BANK", domain: "orangebank.fr", filename: "orange-bank.png" },
  { key: "PAYPAL", domain: "paypal.com", filename: "paypal.png" },
  { key: "LYDIA", domain: "lydia-app.com", filename: "lydia.png" },
  
  // Logiciels / Cloud
  { key: "APPLE", domain: "apple.com", filename: "apple.png" },
  { key: "ICLOUD", domain: "icloud.com", filename: "icloud.png" },
  { key: "GOOGLE", domain: "google.com", filename: "google.png" },
  { key: "GOOGLE ONE", domain: "one.google.com", filename: "google-one.png" },
  { key: "MICROSOFT", domain: "microsoft.com", filename: "microsoft.png" },
  { key: "ONEDRIVE", domain: "onedrive.live.com", filename: "onedrive.png" },
  { key: "ADOBE", domain: "adobe.com", filename: "adobe.png" },
  { key: "DROPBOX", domain: "dropbox.com", filename: "dropbox.png" },
  { key: "NOTION", domain: "notion.so", filename: "notion.png" },
  { key: "FIGMA", domain: "figma.com", filename: "figma.png" },
  { key: "GITHUB", domain: "github.com", filename: "github.png" },
  { key: "ZOOM", domain: "zoom.us", filename: "zoom.png" },
  { key: "CANVA", domain: "canva.com", filename: "canva.png" },
  { key: "EVERNOTE", domain: "evernote.com", filename: "evernote.png" },
  { key: "LASTPASS", domain: "lastpass.com", filename: "lastpass.png" },
  { key: "1PASSWORD", domain: "1password.com", filename: "1password.png" },
  { key: "NORDVPN", domain: "nordvpn.com", filename: "nordvpn.png" },
  { key: "EXPRESSVPN", domain: "expressvpn.com", filename: "expressvpn.png" },
  { key: "SURFSHARK", domain: "surfshark.com", filename: "surfshark.png" },
  { key: "MALWAREBYTES", domain: "malwarebytes.com", filename: "malwarebytes.png" },
  { key: "CHATGPT", domain: "openai.com", filename: "chatgpt.png" },
  { key: "OPENAI", domain: "openai.com", filename: "openai.png" },
  { key: "MIDJOURNEY", domain: "midjourney.com", filename: "midjourney.png" },
  { key: "LINKEDIN", domain: "linkedin.com", filename: "linkedin.png" },
  
  // Sport
  { key: "BASIC FIT", domain: "basic-fit.com", filename: "basicfit.png" },
  { key: "FITNESS PARK", domain: "fitnesspark.fr", filename: "fitnesspark.png" },
  { key: "KEEP COOL", domain: "keepcool.fr", filename: "keepcool.png" },
  { key: "NEONESS", domain: "neoness.fr", filename: "neoness.png" },
  { key: "L ORANGE BLEUE", domain: "lorangebleue.fr", filename: "lorangebleue.png" },
  
  // Assurances
  { key: "DIRECT ASSURANCE", domain: "direct-assurance.fr", filename: "direct-assurance.png" },
  { key: "AVANSSUR", domain: "direct-assurance.fr", filename: "avanssur.png" },
  { key: "MAIF", domain: "maif.fr", filename: "maif.png" },
  { key: "MACIF", domain: "macif.fr", filename: "macif.png" },
  { key: "MATMUT", domain: "matmut.fr", filename: "matmut.png" },
  { key: "GMF", domain: "gmf.fr", filename: "gmf.png" },
  { key: "GROUPAMA", domain: "groupama.fr", filename: "groupama.png" },
  { key: "ALLIANZ", domain: "allianz.fr", filename: "allianz.png" },
  
  // Transport
  { key: "SNCF", domain: "sncf-connect.com", filename: "sncf.png" },
  { key: "UBER", domain: "uber.com", filename: "uber.png" },
  { key: "BOLT", domain: "bolt.eu", filename: "bolt.png" },
  
  // Médias
  { key: "MEDIAPART", domain: "mediapart.fr", filename: "mediapart.png" },
  { key: "LE MONDE", domain: "lemonde.fr", filename: "lemonde.png" },
  { key: "LE FIGARO", domain: "lefigaro.fr", filename: "lefigaro.png" },
  { key: "LES ECHOS", domain: "lesechos.fr", filename: "lesechos.png" },
  
  // Gaming
  { key: "PLAYSTATION", domain: "playstation.com", filename: "playstation-plus.png" },
  { key: "XBOX", domain: "xbox.com", filename: "xbox-game-pass.png" },
  { key: "NINTENDO", domain: "nintendo.fr", filename: "nintendo-online.png" },
  
  // Autres
  { key: "PATREON", domain: "patreon.com", filename: "patreon.png" },
  { key: "PLEX", domain: "plex.tv", filename: "plex.png" },
];

/**
 * Télécharge un fichier via HTTPS
 */
function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Suivre la redirection
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (res.statusCode >= 400) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', err => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
    }).on('error', err => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

/**
 * Tente de télécharger un logo depuis plusieurs sources
 */
async function fetchLogo(brand, dest) {
  const sources = [
    // 1. Clearbit (meilleure qualité, gratuit)
    `https://logo.clearbit.com/${brand.domain}`,
    
    // 2. Google Favicon API (128x128)
    `https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`,
    
    // 3. Favicon du site directement
    `https://${brand.domain}/favicon.ico`,
    `https://www.${brand.domain}/favicon.ico`,
  ];

  for (const url of sources) {
    try {
      console.log(`  Tentative: ${url}`);
      await download(url, dest);
      
      // Vérifier que le fichier n'est pas vide
      const stats = fs.statSync(dest);
      if (stats.size < 100) {
        fs.unlinkSync(dest);
        throw new Error('Fichier trop petit (probablement vide)');
      }
      
      console.log(`  ✓ Succès depuis ${url.split('/')[2]}`);
      return true;
    } catch {
      // Continuer avec la source suivante
    }
  }
  
  return false;
}

/**
 * Main
 */
async function main() {
  const logosDir = path.join(process.cwd(), 'public', 'logos');
  
  // Créer le dossier si nécessaire
  if (!fs.existsSync(logosDir)) {
    fs.mkdirSync(logosDir, { recursive: true });
    console.log('✓ Dossier public/logos créé\n');
  }

  console.log(`🎨 Téléchargement de ${BRANDS.length} logos...\n`);
  
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const brand of BRANDS) {
    const dest = path.join(logosDir, brand.filename);
    
    // Skip si déjà existant
    if (fs.existsSync(dest)) {
      console.log(`⏭️  ${brand.key}: déjà présent (${brand.filename})`);
      skipped++;
      continue;
    }

    console.log(`📥 ${brand.key} (${brand.domain})`);
    
    const success = await fetchLogo(brand, dest);
    
    if (success) {
      downloaded++;
    } else {
      console.log(`  ✗ Échec - aucune source n'a fonctionné`);
      failed++;
    }
    
    // Pause pour éviter le rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✓ Téléchargés: ${downloaded}`);
  console.log(`⏭️  Déjà présents: ${skipped}`);
  console.log(`✗ Échecs: ${failed}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  if (failed > 0) {
    console.log('💡 Pour les logos manquants, tu peux:');
    console.log('   1. Les télécharger manuellement depuis le site officiel');
    console.log('   2. Utiliser le générateur: scripts/generate-placeholder-logos.html');
    console.log('   3. Les ajouter plus tard\n');
  }
}

main().catch(err => {
  console.error('Erreur:', err);
  process.exit(1);
});
