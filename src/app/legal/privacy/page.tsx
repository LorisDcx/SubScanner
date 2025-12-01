import Link from "next/link";

const LAST_UPDATED = "1er décembre 2025";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative border-b border-slate-800/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-sm group-hover:scale-110 transition-transform">
              S
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              SubScanner
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Retour</span>
          </Link>
        </div>
      </header>

      <div className="relative mx-auto max-w-4xl px-6 py-16">

        {/* Hero Section */}
        <div className="mb-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 px-4 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/20 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Protection des données
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Politique de
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Confidentialité
            </span>
          </h1>
          <p className="text-slate-400 text-sm">
            Dernière mise à jour : <span className="text-emerald-300">{LAST_UPDATED}</span>
          </p>
        </div>

        {/* Intro Card */}
        <div className="mb-12 rounded-3xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-xl p-8">
          <p className="text-lg text-slate-300 leading-relaxed">
            SubScanner s&apos;engage à protéger votre vie privée. Cette politique explique comment nous 
            collectons, utilisons et protégeons vos données personnelles conformément au <span className="text-white font-semibold">Règlement Général 
            sur la Protection des Données (RGPD)</span>.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 text-lg font-bold">1</span>
              Introduction
            </h2>
            <p className="text-slate-300 leading-relaxed">
              SubScanner s&apos;engage à protéger votre vie privée. Cette politique explique comment nous 
              collectons, utilisons et protégeons vos données personnelles conformément au Règlement Général 
              sur la Protection des Données (RGPD).
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 text-lg font-bold">2</span>
              Données collectées
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-emerald-400 font-semibold mb-3">📧 Données d&apos;inscription :</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>Adresse email</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>Mot de passe (crypté)</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>Date de création du compte</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="text-cyan-400 font-semibold mb-3">📊 Données d&apos;utilisation :</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Fichiers CSV uploadés (analysés puis supprimés si non connecté)</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Résultats d&apos;analyse (uniquement si compte connecté)</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>Logs de connexion (adresse IP, navigateur, date/heure)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <p className="text-violet-400 font-semibold mb-3">💳 Données de paiement :</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-violet-400 font-bold">•</span>
                    <span>Informations de paiement traitées par Stripe (nous ne stockons jamais vos coordonnées bancaires)</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-300">
                    <span className="text-violet-400 font-bold">•</span>
                    <span>Historique des transactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 text-lg font-bold">3</span>
              Utilisation des données
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">Nous utilisons vos données pour :</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fournir et améliorer nos services</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Gérer votre compte et votre abonnement</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Traiter les paiements</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Vous envoyer des notifications importantes</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Assurer la sécurité de la plateforme</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Analyser l&apos;utilisation du service (statistiques anonymisées)</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 text-lg font-bold">4</span>
              Sécurité des données bancaires
            </h2>
            <div className="space-y-4">
              <p className="text-slate-200 leading-relaxed font-semibold">
                <span className="text-emerald-400">🔒 Important :</span> SubScanner ne se connecte JAMAIS directement 
                à vos comptes bancaires.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Vous uploadez manuellement vos relevés CSV</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Les fichiers sont analysés côté serveur de manière sécurisée</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Sans compte : les fichiers sont supprimés immédiatement après analyse</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Avec compte : seuls les résultats agrégés (abonnements détectés) sont sauvegardés, jamais les données bancaires brutes</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Toutes les communications sont chiffrées (HTTPS/TLS)</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 text-lg font-bold">5</span>
              Partage des données
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Nous ne vendons ni ne louons jamais vos données personnelles. Vos données peuvent être partagées 
              uniquement avec :
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-violet-400 font-bold">→</span>
                <span><span className="text-white font-semibold">Stripe :</span> pour le traitement des paiements</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-violet-400 font-bold">→</span>
                <span><span className="text-white font-semibold">Firebase/Google Cloud :</span> pour l&apos;hébergement et l&apos;authentification</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-violet-400 font-bold">→</span>
                <span><span className="text-white font-semibold">Partenaires affiliés :</span> uniquement si vous cliquez sur un lien affilié (tracking de conversion, sans données personnelles)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-violet-400 font-bold">→</span>
                <span><span className="text-white font-semibold">Autorités légales :</span> si requis par la loi</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 text-lg font-bold">5b</span>
              Liens affiliés et comparateur
            </h2>
            <div className="space-y-4">
              <p className="text-slate-200 leading-relaxed">
                SubScanner propose un comparateur d&apos;offres partenaires. Certains liens sont des <span className="text-white font-semibold">liens affiliés</span> :
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Si vous souscrivez via ces liens, SubScanner peut percevoir une commission du partenaire.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Le prix est identique pour vous (aucun surcoût).</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Les liens affiliés sont clairement identifiés dans l&apos;interface.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Les partenaires peuvent collecter des données de tracking (cookie affilié) uniquement lors du clic.</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-slate-800/50">
                <p className="text-slate-400 text-sm">
                  L&apos;existence d&apos;un partenariat n&apos;influence ni le classement ni la sélection des offres.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 text-lg font-bold">6</span>
              Vos droits (RGPD)
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><span className="text-white font-semibold">Droit d&apos;accès :</span> consulter vos données personnelles</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><span className="text-white font-semibold">Droit de rectification :</span> corriger vos données</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><span className="text-white font-semibold">Droit à l&apos;effacement :</span> supprimer votre compte et vos données</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><span className="text-white font-semibold">Droit à la portabilité :</span> exporter vos données</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><span className="text-white font-semibold">Droit d&apos;opposition :</span> refuser le traitement de vos données</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><span className="text-white font-semibold">Droit de limitation :</span> limiter l&apos;utilisation de vos données</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-slate-300">
                Pour exercer ces droits, contactez-nous à{" "}
                <a href="mailto:privacy@subscanner.fr" className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-400/30 hover:decoration-emerald-400">
                  privacy@subscanner.fr
                </a>
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 text-lg font-bold">7</span>
              Cookies
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">SubScanner utilise les cookies suivants :</p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">🍪</span>
                <span><span className="text-white font-semibold">Cookies essentiels :</span> pour le fonctionnement de base du site (session, authentification)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-cyan-400 font-bold">🍪</span>
                <span><span className="text-white font-semibold">Cookies de performance :</span> pour améliorer l&apos;expérience utilisateur (optionnels)</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-slate-300 text-sm">
                Vous pouvez désactiver les cookies non essentiels dans les paramètres de votre navigateur.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 text-lg font-bold">8</span>
              Conservation des données
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><span className="text-white font-semibold">Comptes actifs :</span> données conservées tant que le compte est actif</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><span className="text-white font-semibold">Comptes supprimés :</span> données effacées dans les 30 jours</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><span className="text-white font-semibold">Données de facturation :</span> conservées 10 ans (obligation légale)</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><span className="text-white font-semibold">Fichiers CSV :</span> supprimés immédiatement après analyse (si non connecté)</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 text-lg font-bold">9</span>
              Transferts internationaux
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Vos données sont hébergées sur des serveurs Firebase situés dans l&apos;Union Européenne. 
              Stripe peut traiter des données aux États-Unis selon les clauses contractuelles types approuvées 
              par la Commission européenne.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 text-lg font-bold">10</span>
              Modifications de la politique
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Nous pouvons modifier cette politique de confidentialité. Les modifications importantes seront 
              notifiées par email. La date de dernière mise à jour est indiquée en haut de cette page.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 text-lg font-bold">11</span>
              Contact
            </h2>
            <div className="space-y-3 text-slate-300">
              <p className="leading-relaxed">Pour toute question concernant cette politique ou vos données personnelles :</p>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:privacy@subscanner.fr" className="text-emerald-400 hover:text-emerald-300 font-semibold">privacy@subscanner.fr</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
