const https = require("https");
const fs = require("fs");
const path = require("path");

const PARTNERS_DIR = path.join(__dirname, "../public/logos/partners");

// Nouveaux logos à télécharger
const NEW_LOGOS = [
  { name: "disney-plus.png", domain: "disneyplus.com" },
  { name: "tidal.png", domain: "tidal.com" },
  { name: "classpass.png", domain: "classpass.com" },
  { name: "skillshare.png", domain: "skillshare.com" },
  { name: "coursera.png", domain: "coursera.org" },
  { name: "masterclass.png", domain: "masterclass.com" },
  { name: "backblaze.png", domain: "backblaze.com" },
  { name: "sync.png", domain: "sync.com" },
  { name: "expressvpn.png", domain: "expressvpn.com" },
  { name: "surfshark.png", domain: "surfshark.com" },
  { name: "cyberghost.png", domain: "cyberghostvpn.com" },
  { name: "bitdefender.png", domain: "bitdefender.com" },
  { name: "notion.png", domain: "notion.so" },
  { name: "adobe.png", domain: "adobe.com" },
  { name: "evernote.png", domain: "evernote.com" },
  { name: "1password.png", domain: "1password.com" },
  { name: "dashlane.png", domain: "dashlane.com" },
  { name: "lastpass.png", domain: "lastpass.com" },
  { name: "lemonade.png", domain: "lemonade.com" },
];

function downloadLogo(filename, domain) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(PARTNERS_DIR, filename);
    
    // Skip if exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  ${filename} (existe déjà)`);
      return resolve(true);
    }

    const url = `https://logo.clearbit.com/${domain}`;
    
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        https.get(response.headers.location, { headers: { "User-Agent": "Mozilla/5.0" } }, (redirectResponse) => {
          if (redirectResponse.statusCode === 200) {
            const file = fs.createWriteStream(filepath);
            redirectResponse.pipe(file);
            file.on("finish", () => {
              file.close();
              console.log(`✅ ${filename}`);
              resolve(true);
            });
          } else {
            console.log(`❌ ${filename} (HTTP ${redirectResponse.statusCode})`);
            resolve(false);
          }
        });
        return;
      }

      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`✅ ${filename}`);
          resolve(true);
        });
      } else {
        console.log(`❌ ${filename} (HTTP ${response.statusCode})`);
        resolve(false);
      }
    }).on("error", (err) => {
      console.log(`❌ ${filename} (${err.message})`);
      resolve(false);
    });
  });
}

async function main() {
  console.log("🎨 Téléchargement des nouveaux logos partenaires\n");

  let success = 0;
  let failed = 0;

  for (const logo of NEW_LOGOS) {
    const result = await downloadLogo(logo.name, logo.domain);
    if (result) success++;
    else failed++;
    
    // Small delay
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n📊 Résultat: ${success} réussis, ${failed} échoués`);
}

main();
