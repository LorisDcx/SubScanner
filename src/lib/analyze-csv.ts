import { AnalysisResult, Subscription } from "@/types/analysis";
import { SubscriptionCategoryId } from "@/types/category";
import { getDisplayName, getLogoPath, getWebsite, getCategory } from "./brand-mapping";

type RawOperation = {
  [key: string]: string;
};

const HTML_NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  quot: '"',
  apos: "'",
  nbsp: " ",
  eacute: "é",
  egrave: "è",
  ecirc: "ê",
  euml: "ë",
  aacute: "á",
  agrave: "à",
  acirc: "â",
  auml: "ä",
  ugrave: "ù",
  ucirc: "û",
  uuml: "ü",
  icirc: "î",
  iacute: "í",
  igrave: "ì",
  ccedil: "ç",
};

function decodeHtmlEntities(text: string): string {
  if (!text || !text.includes("&")) {
    return text;
  }

  return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z0-9]+);/g, (match, entity) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      const codePoint = Number.parseInt(entity.slice(2), 16);
      if (!Number.isNaN(codePoint)) {
        return String.fromCodePoint(codePoint);
      }
      return match;
    }

    if (entity.startsWith("#")) {
      const codePoint = Number.parseInt(entity.slice(1), 10);
      if (!Number.isNaN(codePoint)) {
        return String.fromCodePoint(codePoint);
      }
      return match;
    }

    return HTML_NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

function normalizeHeader(header: string): string {
  return decodeHtmlEntities(header)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();
}

function pickColumn(columns: string[], candidates: string[]): string | undefined {
  const normalized = columns.map((c) => normalizeHeader(c));
  for (const cand of candidates) {
    const candNorm = normalizeHeader(cand);
    const idx = normalized.findIndex((c) => c.includes(candNorm));
    if (idx !== -1) {
      return columns[idx];
    }
  }
  return undefined;
}

function extractMerchantName(label: string): string {
  let cleaned = label.toUpperCase().trim();
  
  // Pour les FACTURE CARTE : extraire UNIQUEMENT le nom du marchand
  if (cleaned.includes("FACTURE CARTE")) {
    // Format: "FACTURE CARTE DU 010725 NETFLIX.COM AMSTERDAM CARTE 4609..."
    const match = cleaned.match(/FACTURE CARTE DU \d{6}\s+([A-Z0-9.\-\/]+)/);
    if (match && match[1]) {
      cleaned = match[1].trim();
    }
  }
  
  // Pour les PRLV SEPA : extraire UNIQUEMENT le bénéficiaire principal
  else if (cleaned.includes("PRLV SEPA") || cleaned.includes("PRELEVEMENT")) {
    // Format: "PRLV SEPA NETFLIX.COM ECH/..." ou "PRLV SEPA SARL CORTI73 ECH/..."
    const match = cleaned.match(/(?:PRLV SEPA|PRELEVEMENT)\s+([A-Z0-9.\-\s]+?)(?:\s+ECH|\s+ID\s+EMETTEUR|\s+REF)/i);
    if (match && match[1]) {
      cleaned = match[1].trim();
    }
  }
  
  // Supprimer tous les codes/identifiants (numéros longs, codes hexadécimaux)
  cleaned = cleaned
    .replace(/\b[0-9A-F]{8,}\b/gi, "")        // codes hexa longs (8+ chars)
    .replace(/\b\d{6,}\b/g, "")                // numéros longs (6+ digits)
    .replace(/\bGB\d+[A-Z0-9]+\b/gi, "")      // codes IBAN/BIC (GB62ZZZ...)
    .replace(/\bNL\d+[A-Z0-9]+\b/gi, "")      // codes IBAN/BIC (NL48ZZZ...)
    .replace(/\bFR\d+[A-Z0-9]+\b/gi, "")      // codes IBAN/BIC français
    .replace(/\b[A-Z]{2}\d{2}[A-Z0-9]{4,}\b/gi, "") // autres codes IBAN-like
    .replace(/\bMDT[\/\s][A-Z0-9\-]+/gi, "")  // codes MDT
    .replace(/\bREF[\/\s][A-Z0-9\-]+/gi, "")  // codes REF
    .replace(/\bLIB[\/\s][A-Z0-9\-]+/gi, "")  // codes LIB
    .replace(/\bID\s+EMETTEUR[\/\s][A-Z0-9\-]+/gi, "") // ID EMETTEUR
    .replace(/\b\d{4}X+\d{4}\b/g, "")         // numéros carte masqués
    .replace(/CARTE\s+\d+/g, "")              // numéros carte
    .replace(/\*+\d+/g, "")                    // numéros compte masqués
    .replace(/[0-9]/g, "")                     // tous les chiffres restants
    .replace(/[-_.,;:\/\\]+/g, " ")           // caractères spéciaux → espaces
    .replace(/\s+/g, " ")                      // espaces multiples
    .trim();
  
  return cleaned;
}

function normalizeLabel(label: string): string {
  return extractMerchantName(label);
}

function parseAmount(raw: string): number | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  
  // Format français : -36,00 ou 5,33 ou 1 234,56 ou -3,99
  let normalized = trimmed
    .replace(/\s+/g, "")           // espaces
    .replace(/\u00A0/g, "")        // espaces insécables
    .replace(/EUR?/gi, "")         // symbole euro
    .replace(/€/g, "");            // symbole €
  
  // Déterminer si c'est un format avec point comme séparateur de milliers ou décimal
  // Format FR : 1.234,56 (point = milliers, virgule = décimales)
  // Format US : 1,234.56 (virgule = milliers, point = décimales)
  
  const hasComma = normalized.includes(",");
  const hasDot = normalized.includes(".");
  
  if (hasComma && hasDot) {
    // Les deux présents : déterminer lequel est le séparateur décimal
    const lastCommaPos = normalized.lastIndexOf(",");
    const lastDotPos = normalized.lastIndexOf(".");
    
    if (lastCommaPos > lastDotPos) {
      // Format français : 1.234,56
      normalized = normalized.replace(/\./g, "").replace(/,/g, ".");
    } else {
      // Format US : 1,234.56
      normalized = normalized.replace(/,/g, "");
    }
  } else if (hasComma) {
    // Seulement virgule : c'est le séparateur décimal français
    normalized = normalized.replace(/,/g, ".");
  }
  // Si seulement point, on le garde tel quel
  
  const value = Number.parseFloat(normalized);
  if (Number.isNaN(value)) {
    console.log(`[PARSE AMOUNT DEBUG] Failed to parse '${raw}' → '${normalized}' → NaN`);
    return null;
  }
  return value;
}

function parseDate(raw: string): Date | null {
  if (!raw) {
    return null;
  }

  const trimmed = raw.trim();

  // Format français courant : dd/mm/yyyy
  const frMatch = trimmed.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (frMatch) {
    const day = Number.parseInt(frMatch[1], 10);
    const month = Number.parseInt(frMatch[2], 10) - 1;
    const year = Number.parseInt(frMatch[3], 10);
    const d = new Date(year, month, day);
    if (!Number.isNaN(d.getTime())) {
      return d;
    }
  }

  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) {
    return null;
  }
  return d;
}

function parseFrenchBankCsv(content: string): RawOperation[] {
  const decodedContent = decodeHtmlEntities(content);
  const lines = decodedContent
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const records: RawOperation[] = [];
  let validCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const cols = parseCsvLine(line, ";").map(c => c.replace(/^"|"$/g, "").trim());

    if (cols.length < 3) {
      skippedCount++;
      continue;
    }

    const firstCol = cols[0];
    
    // Skip lines that don't start with a date
    if (!isFrenchDate(firstCol)) {
      if (i < 10) {
        console.log(`[CSV DEBUG FR] Line ${i}: Skipping (not a date) - '${firstCol.substring(0, 30)}'`);
      }
      skippedCount++;
      continue;
    }

    // Parse date: dd/mm/yyyy -> yyyy-mm-dd
    const [d, m, y] = firstCol.split("/");
    const dateStr = `${y}-${m}-${d}`;

    // Amount is last column
    const rawAmount = cols[cols.length - 1];
    const amount = parseAmount(rawAmount);
    
    if (amount === null) {
      if (i < 10) {
        console.log(`[CSV DEBUG FR] Line ${i}: Skipping (invalid amount) - '${rawAmount}'`);
      }
      skippedCount++;
      continue;
    }

    // Label: concatenate all middle columns
    const middleCols = cols.slice(1, cols.length - 1);
    const labelRaw = middleCols.filter(Boolean).join(" ").trim();

    if (validCount < 3) {
      console.log(`[CSV DEBUG FR] Line ${i}: ✓ date=${dateStr}, amount=${amount}, label='${labelRaw.substring(0, 50)}...'`);
    }

    records.push({
      date: dateStr,
      amount: amount.toString(),
      label: labelRaw,
    });
    
    validCount++;
  }

  console.log(`[CSV DEBUG FR] Parsed ${validCount} valid operations, skipped ${skippedCount} lines`);
  return records;
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === "\"") {
      if (inQuotes && line[i + 1] === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  cells.push(current.trim());
  return cells;
}

function inferHeaderFromDataLine(cells: string[]): string[] {
  const defaults = [
    "date",
    "type",
    "category",
    "label",
    "details",
    "details_2",
    "details_3",
  ];

  const headers = cells.map((_, idx) => defaults[idx] ?? `col_${idx + 1}`);

  if (headers.length) {
    headers[headers.length - 1] = "amount";
  }

  return headers;
}

function isFrenchDate(value: string): boolean {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(value.trim());
}

function parseCsv(content: string): RawOperation[] {
  const normalizedContent = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalizedContent.split("\n");

  let headerIndex = -1;
  let headerColumns: string[] = [];
  let delimiter = ";";
  let dataStartIndex = -1;

  const delimiters: string[] = [";", ",", "\t"];
  const maxScan = Math.min(lines.length, 200);
  
  // Try French bank format first (date-based detection)
  let frenchBankFormatDetected = false;
  for (let i = 0; i < Math.min(lines.length, 20); i += 1) {
    const rawLine = lines[i];
    if (!rawLine || !rawLine.trim()) continue;
    
    const cells = parseCsvLine(rawLine, ";");
    if (cells.length >= 3 && isFrenchDate(cells[0])) {
      frenchBankFormatDetected = true;
      console.log(`[CSV DEBUG] French bank format detected at line ${i}`);
      break;
    }
  }
  
  if (frenchBankFormatDetected) {
    console.log("[CSV DEBUG] Using French bank parser (date-first format)");
    return parseFrenchBankCsv(content);
  }

  const normalizeCell = (cell: string) =>
    cell
      .replace(/^"|"$/g, "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");

  console.log("[CSV DEBUG] Scanning first", maxScan, "lines for header...");

  for (let i = 0; i < maxScan; i += 1) {
    const rawLine = lines[i];
    if (!rawLine || !rawLine.trim()) continue;

    for (const candidateDelimiter of delimiters) {
      const cells = parseCsvLine(rawLine, candidateDelimiter).map((col) => normalizeCell(col));
      if (cells.length < 2) continue;

      const hasDate = cells.some((cell) => cell.includes("date"));
      const hasLabel = cells.some((cell) =>
        cell.includes("libelle") || cell.includes("libell") || cell.includes("label") || cell.includes("description") || cell.includes("intitule")
      );
      const hasAmount = cells.some((cell) => cell.includes("montant") || cell.includes("amount"));

      const matchCount = [hasDate, hasLabel, hasAmount].filter(Boolean).length;

      if (i < 10) {
        console.log(`[CSV DEBUG] Line ${i} (delim '${candidateDelimiter}'): cells=${cells.join('|')} | date=${hasDate} label=${hasLabel} amount=${hasAmount}`);
      }

      if (matchCount >= 2) {
        console.log(`[CSV DEBUG] HEADER FOUND at line ${i} with delimiter '${candidateDelimiter}'`);
        headerIndex = i;
        dataStartIndex = i + 1;
        delimiter = candidateDelimiter as ";" | ",";
        headerColumns = parseCsvLine(rawLine, delimiter).map((col) => col.replace(/^"|"$/g, "").trim());
        console.log(`[CSV DEBUG] Header columns:`, headerColumns);
        break;
      }
    }
    if (headerIndex !== -1) break;
  }

  if (headerIndex === -1) {
    console.error("[CSV DEBUG] No header found in first", maxScan, "lines. Trying fallback: first line with >=3 columns...");
    for (let i = 0; i < Math.min(lines.length, 50); i += 1) {
      const rawLine = lines[i];
      if (!rawLine || !rawLine.trim()) continue;
      for (const candidateDelimiter of delimiters) {
        const cells = parseCsvLine(rawLine, candidateDelimiter);
        if (cells.length >= 3) {
          console.log(`[CSV DEBUG] FALLBACK: Using line ${i} with ${cells.length} columns as header`);
          headerIndex = i;
          dataStartIndex = i + 1;
          delimiter = candidateDelimiter as ";" | ",";
          headerColumns = cells.map((col) => col.replace(/^"|"$/g, "").trim());
          break;
        }
      }
      if (headerIndex !== -1) break;
    }
  }

  if (headerIndex === -1) {
    console.log("[CSV DEBUG] Trying to synthesize header from data rows...");
    outer: for (let i = 0; i < lines.length; i += 1) {
      const rawLine = lines[i];
      if (!rawLine || !rawLine.trim()) continue;

      for (const candidateDelimiter of delimiters) {
        const cells = parseCsvLine(rawLine, candidateDelimiter);
        if (i < 5) {
          console.log(`[CSV DEBUG SYNTHESIS] Line ${i}, delim '${candidateDelimiter}': ${cells.length} cells, first='${cells[0]?.trim().substring(0, 30)}', last='${cells[cells.length - 1]?.trim()}'`);
        }
        if (cells.length < 4) continue;

        const firstCell = cells[0]?.trim();
        const dateMatch = /^\d{2}\/\d{2}\/\d{4}$/.test(firstCell);
        if (i < 5) {
          console.log(`[CSV DEBUG SYNTHESIS] Line ${i}: firstCell='${firstCell}', dateMatch=${dateMatch}`);
        }
        if (!firstCell || !dateMatch) continue;

        const amountCandidate = cells[cells.length - 1];
        const parsedAmount = parseAmount(amountCandidate);
        if (i < 5) {
          console.log(`[CSV DEBUG SYNTHESIS] Line ${i}: amountCandidate='${amountCandidate}', parsed=${parsedAmount}`);
        }
        if (parsedAmount === null) continue;

        headerIndex = i;
        dataStartIndex = i;
        delimiter = candidateDelimiter as ";" | ",";
        headerColumns = inferHeaderFromDataLine(cells);
        console.log(`[CSV DEBUG] ✓ Synthesized header for data-like row at line ${i}:`, headerColumns);
        break outer;
      }
    }
  }

  if (headerIndex === -1) {
    console.error("[CSV DEBUG] FATAL: No header found even with fallback. Returning empty.");
    return [];
  }

  const records: RawOperation[] = [];
  const startIndex = dataStartIndex !== -1 ? dataStartIndex : headerIndex + 1;

  for (let i = Math.max(startIndex, 0); i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim()) continue;

    const cells = parseCsvLine(line, delimiter);
    if (cells.length < 2) continue;

    const row: RawOperation = {};
    for (let j = 0; j < headerColumns.length; j += 1) {
      const key = headerColumns[j];
      if (!key) continue;
      const value = cells[j] ?? "";
      row[key] = decodeHtmlEntities(value.replace(/^"|"$/g, "").trim());
    }
    records.push(row);
  }

  console.log(`[CSV DEBUG] Parsed ${records.length} records`);
  return records;
}

export function analyzeCsv(content: string): AnalysisResult {
  console.log("[ANALYZE DEBUG] Starting CSV analysis...");
  const records = parseCsv(content);

  if (!records.length) {
    console.log("[ANALYZE DEBUG] No records parsed, returning empty result");
    return {
      totalMonthly: 0,
      totalYearly: 0,
      subscriptions: [],
    };
  }

  console.log(`[ANALYZE DEBUG] Got ${records.length} records`);
  const columns = Object.keys(records[0]);
  console.log("[ANALYZE DEBUG] Available columns:", columns);

  const dateCol = pickColumn(columns, [
    "date",
    "date operation",
    "date d'operation",
    "date doperation",
    "booking date",
    "transaction date",
  ]) || "date";
  
  const labelCol = pickColumn(columns, [
    "libelle",
    "libell",
    "libelle operation",
    "libelle doperation",
    "libelle d'operation",
    "label",
    "description",
    "motif",
    "intitule",
    "intitule operation",
    "detail",
    "details",
  ]) || "label";
  
  const amountCol = pickColumn(columns, [
    "montant",
    "montant(euros)",
    "montant euros",
    "amount",
    "valeur",
    "debit",
    "credit",
  ]) || "amount";

  console.log(`[ANALYZE DEBUG] Detected columns: date='${dateCol}' label='${labelCol}' amount='${amountCol}'`);

  if (!dateCol || !labelCol || !amountCol) {
    console.error(`[ANALYZE DEBUG] Missing required columns! date=${!!dateCol} label=${!!labelCol} amount=${!!amountCol}`);
    return {
      totalMonthly: 0,
      totalYearly: 0,
      subscriptions: [],
    };
  }

  const operations = records
    .map((row, idx) => {
      const date = parseDate(row[dateCol]);
      const amount = parseAmount(row[amountCol]);
      const labelRaw = row[labelCol] ?? "";

      if (idx < 5) {
        console.log(`[ANALYZE DEBUG] Row ${idx}: date='${row[dateCol]}' → ${date}, amount='${row[amountCol]}' → ${amount}, label='${labelRaw.substring(0, 50)}'`);
      }

      if (!date || amount === null) {
        return null;
      }

      const normalized = normalizeLabel(labelRaw);

      return {
        date,
        amount,
        labelRaw,
        labelNormalized: normalized,
      };
    })
    .filter((op): op is { date: Date; amount: number; labelRaw: string; labelNormalized: string } => op !== null);

  console.log(`[ANALYZE DEBUG] Parsed ${operations.length} valid operations`);

  const debitsCount = operations.filter(op => op.amount < 0).length;
  const creditsCount = operations.filter(op => op.amount >= 0).length;
  console.log(`[ANALYZE DEBUG] Debits: ${debitsCount}, Credits: ${creditsCount}`);

  const groups = new Map<string, typeof operations>();

  // Services d'abonnement connus (pour les paiements CB)
  const knownSubscriptionServices = [
    "NETFLIX", "SPOTIFY", "DISNEY", "AMAZON PRIME", "APPLE.COM/BILL", "APPLE COM",
    "YOUTUBE", "DEEZER", "HBO", "CANAL", "OCS", "SALTO",
    "ADOBE", "MICROSOFT", "GOOGLE", "DROPBOX", "ICLOUD",
    "CHATGPT", "OPENAI", "MIDJOURNEY",
    "PLAYSTATION", "NINTENDO", "XBOX", "STEAM",
    "UBER ONE", "DELIVEROO PLUS", "TOOGOODTOGO",
    "PATHE CINEPASS", "UGC ILLIMITE", "GAUMONT PASS",
    "SALLE DE SPORT", "FITNESS", "BASIC FIT", "KEEP COOL", "NEONESS",
  ];
  
  // Marchands à toujours exclure
  const alwaysExcluded = [
    "RETRAIT DAB", "RETRAIT DISTRIBUTEUR",
    "CARREFOUR", "AUCHAN", "LECLERC", "LIDL", "SUPER U",
  ];

  for (const op of operations) {
    if (op.amount >= 0) {
      continue;
    }

    const labelUpper = op.labelRaw.toUpperCase();
    
    // Skip toujours les exclusions (DAB, courses, etc.)
    if (alwaysExcluded.some(excluded => labelUpper.includes(excluded))) {
      continue;
    }
    
    const isVirement = labelUpper.includes("VIREMENT");
    const isPrelevement = labelUpper.includes("PRELEVEMENT") || labelUpper.includes("PRLV SEPA") || labelUpper.includes("PRÉLÈVEMENT");
    const isPaiementCB = labelUpper.includes("PAIEMENT CB") || labelUpper.includes("FACTURE CARTE");

    // Skip virements (sauf si c'est un prélèvement)
    if (isVirement && !isPrelevement) {
      continue;
    }

    // Pour les paiements CB : ne garder QUE les services d'abonnement connus
    if (isPaiementCB) {
      const isKnownSubscription = knownSubscriptionServices.some(service => 
        labelUpper.includes(service)
      );
      
      if (!isKnownSubscription) {
        // Pas un service d'abonnement connu → skip
        continue;
      }
    }
    
    // Si on arrive ici : c'est soit un PRELEVEMENT, soit un paiement CB vers un service d'abonnement connu

    const key = op.labelNormalized || op.labelRaw || "AUTRE";
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(op);
  }

  console.log(`[ANALYZE DEBUG] Grouped into ${groups.size} unique labels (debits only, excluding virements)`);

  const subscriptions: Subscription[] = [];

  for (const [labelNormalized, ops] of groups.entries()) {
    if (ops.length < 2) {
      continue;
    }

    ops.sort((a, b) => a.date.getTime() - b.date.getTime());

    // Calcul du montant moyen par occurrence
    const avgAmount = ops.reduce((sum, op) => sum + Math.abs(op.amount), 0) / ops.length;

    // Calcul de la fréquence (intervalle moyen entre occurrences en jours)
    let totalDaysBetween = 0;
    for (let i = 1; i < ops.length; i++) {
      const daysDiff = (ops[i].date.getTime() - ops[i - 1].date.getTime()) / (1000 * 60 * 60 * 24);
      totalDaysBetween += daysDiff;
    }
    const avgDaysBetween = totalDaysBetween / (ops.length - 1);
    
    // Déterminer la période de l'abonnement
    let occurrencesPerMonth;
    if (avgDaysBetween >= 320) {
      // Abonnement annuel (une fois/an)
      occurrencesPerMonth = 1 / 12;
    } else if (avgDaysBetween >= 80) {
      // Abonnement trimestriel
      occurrencesPerMonth = 1 / 3;
    } else if (avgDaysBetween >= 25) {
      // Abonnement mensuel (le plus courant)
      occurrencesPerMonth = 1;
    } else if (avgDaysBetween >= 5) {
      // Abonnement hebdomadaire ou bimensuel - PROBABLEMENT UNE ERREUR DE DETECTION
      // Forcer mensuel par sécurité
      occurrencesPerMonth = 1;
    } else {
      // Intervalle < 5 jours = clairement une erreur (doublons, erreurs de parsing)
      // Ignorer cet abonnement
      console.log(`[ANALYZE DEBUG] SKIP ${labelNormalized}: interval too short (${avgDaysBetween.toFixed(1)} days)`);
      continue;
    }
    
    const amountMonthly = avgAmount * occurrencesPerMonth;
    const amountYearly = amountMonthly * 12;

    const lastOperation = ops[ops.length - 1];
    
    // Debug détaillé pour tous les abonnements
    console.log(`[SUBSCRIPTION] "${labelNormalized}": ${ops.length} occ, amounts=[${ops.slice(0, 3).map(o => o.amount.toFixed(2)).join(', ')}${ops.length > 3 ? '...' : ''}], avg=${avgAmount.toFixed(2)}€, interval=${avgDaysBetween.toFixed(1)}d → ${amountMonthly.toFixed(2)}€/month`);

    const displayName = getDisplayName(lastOperation.labelRaw, labelNormalized);
    const logo = getLogoPath(lastOperation.labelRaw, labelNormalized);
    const website = getWebsite(lastOperation.labelRaw, labelNormalized);
    const category = getCategory(lastOperation.labelRaw, labelNormalized);

    const sub: Subscription = {
      id: `${labelNormalized}-${lastOperation.date.getTime()}`,
      labelRaw: lastOperation.labelRaw,
      labelNormalized,
      amountMonthly,
      amountYearly,
      lastOperationDate: lastOperation.date.toISOString().slice(0, 10),
      displayName,
      logo: logo ?? undefined,
      website: website ?? undefined,
      category: (category as SubscriptionCategoryId) ?? undefined,
    };

    subscriptions.push(sub);
  }

  if (subscriptions.length === 0) {
    console.log("[ANALYZE DEBUG] No recurring subscriptions (>=2 occurrences), using fallback (single occurrence)");
    for (const [labelNormalized, ops] of groups.entries()) {
      if (!ops.length) continue;

      const avgAmount =
        ops.reduce((sum, op) => sum + Math.abs(op.amount), 0) / ops.length;

      const lastOperation = ops[ops.length - 1];

      const amountMonthly = avgAmount;
      const amountYearly = amountMonthly * 12;

      const displayName = getDisplayName(lastOperation.labelRaw, labelNormalized);
      const logo = getLogoPath(lastOperation.labelRaw, labelNormalized);
      const website = getWebsite(lastOperation.labelRaw, labelNormalized);
      const category = getCategory(lastOperation.labelRaw, labelNormalized);

      const fallbackSub: Subscription = {
        id: `${labelNormalized}-${lastOperation.date.getTime()}-fallback`,
        labelRaw: lastOperation.labelRaw,
        labelNormalized,
        amountMonthly,
        amountYearly,
        lastOperationDate: lastOperation.date.toISOString().slice(0, 10),
        displayName,
        logo: logo ?? undefined,
        website: website ?? undefined,
        category: (category as SubscriptionCategoryId) ?? undefined,
      };

      subscriptions.push(fallbackSub);
    }
  }

  const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.amountMonthly, 0);
  const totalYearly = totalMonthly * 12;

  console.log(`[ANALYZE DEBUG] Final result: ${subscriptions.length} subscriptions, total monthly: ${totalMonthly.toFixed(2)}€`);

  return {
    totalMonthly,
    totalYearly,
    subscriptions,
  };
}
