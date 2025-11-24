import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const steps = [
  {
    title: "Choisis la bonne période",
    detail: "Export minimum 3 mois (idéalement 6) pour capter les prélèvements trimestriels.",
  },
  {
    title: "Télécharge en CSV brut",
    detail: "Préférence pour les colonnes Date, Libellé, Montant. Pas de PDF ou XLSX.",
  },
  {
    title: "Ne modifie pas le fichier",
    detail: "Laisse les séparateurs d'origine (souvent point-virgule). N'ouvre pas dans Excel qui ajoute des formules.",
  },
  {
    title: "Anonymise si besoin",
    detail: "Supprime les colonnes sensibles (IBAN, solde) avant upload, SubScanner n&apos;en a pas besoin.",
  },
];

const banks = [
  {
    name: "Boursorama",
    path: "Comptes > Mes opérations > Exporter",
    hint: "Format CSV, séparateur ; , inclure les colonnes Montant & Libellé.",
  },
  {
    name: "Crédit Agricole",
    path: "Mes comptes > Relevés > Télécharger",
    hint: "Choisis \"Détails des opérations\" puis CSV. Sur mobile, passe en mode desktop.",
  },
  {
    name: "BNP Paribas",
    path: "Mes comptes > Historique > Export",
    hint: "Coche \"Toutes les opérations\" et décoche Excel.",
  },
  {
    name: "Société Générale",
    path: "Accès Comptes > Opérations > Exporter",
    hint: "Prends la période personnalisée et génère le fichier CSV.",
  },
  {
    name: "Revolut / N26",
    path: "Profil > Statements > Export",
    hint: "Choisis CSV + compte principal. Télécharge depuis l&apos;app desktop si possible.",
  },
];

const checklist = [
  "Colonnes indispensables : date, libellé, montant",
  "Montants en positif pour les entrées, négatif pour les sorties",
  "Pas de totaux ni lignes vides",
  "Un fichier par compte bancaire (tu peux ensuite les cumuler)",
];

export default function TutoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 left-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto max-w-5xl px-6 py-16 space-y-16">
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 ring-1 ring-emerald-500/30">
            CSV propre = analyse fiable
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Le guide pour exporter
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                un CSV de qualité
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto">
              Quelques minutes suffisent pour récupérer un fichier impeccable depuis ta banque. Suis les étapes ci-dessous et ton analyse SubScanner sera ultra précise.
            </p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-emerald-500/40 transition-colors"
            >
              <p className="text-sm font-semibold text-emerald-300">
                {step.title}
              </p>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-800/60 bg-slate-900/70 p-8 space-y-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold text-white">Checklist express</h2>
            <p className="text-sm text-slate-400">Avant d&apos;uploader ton fichier, vérifie ces points :</p>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 text-sm">
                  ✓
                </span>
                <p className="text-sm text-slate-200 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Banque par banque</h2>
            <p className="text-sm text-slate-400">La majorité des banques utilisent un export similaire. Voici les chemins les plus fréquents :</p>
          </div>
          <div className="space-y-4">
            {banks.map((bank) => (
              <div key={bank.name} className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-white">{bank.name}</p>
                  <span className="rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-400">CSV</span>
                </div>
                <p className="mt-3 text-sm text-emerald-300">{bank.path}</p>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{bank.hint}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-500/30 bg-cyan-500/5 p-8 space-y-5">
          <h2 className="text-2xl font-bold text-white">Besoin d&apos;encore plus d&apos;aide ?</h2>
          <p className="text-sm text-slate-200">
            Ping moi sur Twitter/X (@killmysubs) avec la mention de ta banque, je t&apos;envoie un screen-by-screen.
          </p>
          <div className="inline-flex flex-wrap gap-3">
            <Link
              href="/analyze"
              className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:scale-105 transition"
            >
              J&apos;ai mon CSV, on scanne !
            </Link>
            <a
              href="https://x.com/killmysubs"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 hover:border-slate-500 hover:bg-slate-900/50 transition"
            >
              Voir un exemple en DM
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
