"use client";

import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";

const faqs = [
  {
    question: "Est-ce que tu vois mon nom / IBAN ?",
    answer: "Non. SubScanner lit uniquement les colonnes Date, Libellé et Montant. Les infos perso ne sont jamais demandées ni affichées.",
  },
  {
    question: "Puis-je supprimer les colonnes sensibles avant ?",
    answer: (
      <>
        Oui. Tu peux enlever les colonnes IBAN, solde ou adresse avant d&apos;uploader.
        {" "}
        <Link href="/tuto" className="text-emerald-300 underline-offset-2 hover:text-emerald-200 hover:underline">
          On te montre la marche à suivre banque par banque.
        </Link>
      </>
    ),
  },
  {
    question: "Est-ce que tu sauvegardes mon fichier ?",
    answer: "Non. Le CSV est traité en mémoire, rien n&apos;est stocké côté serveur et tu pouvais fermer l&apos;onglet après l&apos;analyse.",
  },
  {
    question: "Pourquoi tu ne demandes pas de connexion bancaire ?",
    answer: "Parce qu&apos;on veut t&apos;éviter la paperasse et garder un mode anonymisé. Tu restes totalement en contrôle du fichier que tu partages.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <SiteHeader />

      <main className="relative mx-auto max-w-7xl px-6 py-16 pb-36 space-y-32">
        {/* Hero Section - Centered */}
        <section className="text-center space-y-10 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 px-4 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              100% gratuit · Aucune connexion bancaire
            </div>
            
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
              Scanne 6 mois de relevés,
              <span className="block mt-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                trouve tous tes abonnements et vois combien tu peux économiser par an.
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Upload ton CSV bancaire, notre IA détecte automatiquement tous tes prélèvements récurrents, regroupe les montants et calcule tes économies potentielles.
            </p>

            <p className="text-base text-emerald-200">
              En moyenne, les premiers utilisateurs récupèrent 48 € par mois d&apos;abonnements inutiles.
            </p>
          </div>
          
          {/* CTA Section */}
          <div className="space-y-14">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/analyze"
                className="group relative rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-10 py-5 text-lg font-bold text-white hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Scanner mon relevé
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity blur" />
              </Link>
              <Link
                href="/exemple-subscanner.csv"
                download
                className="rounded-full border border-slate-700/70 px-10 py-5 text-sm font-semibold text-slate-100 hover:border-slate-500 hover:bg-slate-900/40 transition-all"
              >
                Voir un exemple
              </Link>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sans inscription · Résultats instantanés
              </div>
            </div>
            
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              2 minutes pour exporter ton CSV depuis ta banque —
              {" "}
              <Link href="/tuto" className="text-emerald-300 underline-offset-2 hover:text-emerald-200 hover:underline">
                on te montre comment, banque par banque.
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>100% sécurisé</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Analyse instantanée</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Données anonymes</span>
            </div>
          </div>

          {/* Transparency callout */}
          <div className="pt-8">
            <div className="relative max-w-3xl mx-auto rounded-2xl border border-slate-800/60 bg-slate-950/50 backdrop-blur-sm p-6">
              <div className="flex flex-col gap-4 text-left">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    ✨
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Transparence totale</p>
                    <p className="text-xs text-slate-400">SubScanner est en beta publique : on publiera des stats réelles, pas de vanity metrics.</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Ce qui compte aujourd&apos;hui : te guider pour obtenir un CSV propre. Plus ton fichier est net, plus l&apos;analyse est fiable.
                </p>
                <div>
                  <Link
                    href="/tuto"
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 px-5 py-2 text-sm font-semibold text-emerald-200 hover:border-emerald-400 hover:bg-emerald-500/10 transition-all"
                  >
                    Lire le tuto CSV complet
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard preview */}
        <section className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 blur-3xl opacity-50" />
          <div className="relative rounded-[32px] border border-slate-800/60 bg-slate-950/70 backdrop-blur-xl p-8 md:p-10 space-y-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 ring-1 ring-emerald-500/30">
                Aperçu réel
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-white">À quoi ressemble le dashboard ?</h2>
                <p className="text-base text-slate-400 max-w-2xl">
                  Chaque abonnement détecté apparaît avec logo, libellé, montant mensuel/annuel et un tag &quot;À garder / À vérifier / À résilier&quot;.
                  Tu vois immédiatement tes totaux mensuels/annuels et le plan d&apos;économies potentiel.
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-900/80 shadow-2xl">
              <Image
                src="/example.png"
                alt="Aperçu SubScanner montrant la liste d&apos;abonnements détectés et les totaux mensuels/annuels"
                width={1024}
                height={531}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <p className="inline-flex items-center gap-2 rounded-full bg-slate-900/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 border border-slate-800/60">
              Sécurité & vie privée
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white">On rassure tout de suite</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Avant même d&apos;uploader ton fichier, tu sais exactement ce que SubScanner voit (et surtout ce qu&apos;il ne voit pas).
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-800/60 bg-slate-900/70 p-6 space-y-3">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-violet-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50 group-hover:opacity-75" />
            <div className="relative space-y-6 rounded-3xl border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-10 shadow-2xl">
              <div className="text-center space-y-2">
                <div className="inline-flex h-14 w-14 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 items-center justify-center ring-1 ring-emerald-500/20">
                  <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Comment ça marche ?</h3>
                <p className="text-slate-400">3 étapes simples pour reprendre le contrôle</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                <div className="text-center space-y-3">
                  <div className="inline-flex w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 items-center justify-center text-emerald-400 font-bold text-lg ring-1 ring-emerald-500/20">
                    1
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Télécharge ton CSV</p>
                    <p className="text-sm text-slate-400 mt-2">3-6 mois de transactions depuis ton espace bancaire</p>
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="inline-flex w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 items-center justify-center text-cyan-400 font-bold text-lg ring-1 ring-cyan-500/20">
                    2
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Upload & Analyse</p>
                    <p className="text-sm text-slate-400 mt-2">Notre IA détecte automatiquement tous tes abonnements</p>
                  </div>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="inline-flex w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/10 items-center justify-center text-violet-400 font-bold text-lg ring-1 ring-violet-500/20">
                    3
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Découvre & Économise</p>
                    <p className="text-sm text-slate-400 mt-2">Vois tes totaux et calcule tes économies potentielles</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 rounded-xl bg-slate-950/60 p-4 text-sm text-slate-400 border border-slate-800/50">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="leading-relaxed">
                    Aucune connexion bancaire requise. Tu gardes le contrôle total de tes données et tu restes 100% anonyme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Reprends le contrôle de
              <span className="block mt-1 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                tes finances
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Des outils simples et puissants pour traquer et optimiser tes abonnements
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-6 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Visibilité totale</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Total mensuel et annuel de tous tes abonnements, classés du plus cher au moins cher.
                </p>
              </div>
            </div>
            
            <div className="group relative rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-transparent transition-all duration-300" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Tri intelligent</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Tag chaque abonnement : &quot;À garder&quot;, &quot;À vérifier&quot; ou &quot;À résilier&quot; en un clic.
                </p>
              </div>
            </div>
            
            <div className="group relative rounded-2xl border border-emerald-500/50 bg-gradient-to-br from-emerald-900/30 to-slate-900/40 backdrop-blur-sm p-6 hover:border-emerald-400/70 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 group-hover:bg-emerald-500/30 transition-colors">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">Plan d&apos;économies</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Calcul en temps réel de combien tu récupères par an en coupant les abos inutiles.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Account Benefits Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              100% gratuit,
              <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                encore mieux avec un compte
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Analyse sans compte, ou crée un compte gratuit pour garder un historique de tes analyses
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-3xl" />
              
              <div className="relative space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">SubScanner est 100% gratuit</h3>
                  <p className="text-slate-400">Pas de paiement, pas d&apos;abonnement caché, pas de piège</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center">
                        <span className="text-lg">🚀</span>
                      </div>
                      <h4 className="font-semibold text-white">Sans compte</h4>
                    </div>
                    <div className="space-y-2 pl-10">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-slate-300">Analyse instantanée</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-slate-300">Détection abonnements</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-slate-300">Calcul économies</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        <p className="text-sm text-slate-500">Aucune sauvegarde</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                        <span className="text-lg">📊</span>
                      </div>
                      <h4 className="font-semibold text-white">Avec compte (gratuit)</h4>
                    </div>
                    <div className="space-y-2 pl-10">
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-slate-300">Tout ce qui est à gauche +</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-slate-300">Sauvegarde multi-comptes</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-slate-300">Historique des analyses</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <p className="text-sm text-slate-300">Suivi dans le temps</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                  <Link
                    href="/analyze"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-white hover:border-slate-600 hover:bg-slate-800/50 transition-all"
                  >
                    Scanner mon relevé
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="/signup"
                    className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
                  >
                    <span className="relative z-10">Créer un compte gratuit</span>
                    <svg className="relative z-10 w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity blur" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Link
        href="/analyze"
        className="md:hidden fixed bottom-4 left-1/2 z-40 w-[calc(100%-2.5rem)] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 text-center text-base font-semibold text-white shadow-2xl shadow-emerald-500/30"
      >
        Scanner mon relevé
      </Link>
    </div>
  );
}
