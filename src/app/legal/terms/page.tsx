import Link from "next/link";

const LAST_UPDATED = "1er décembre 2025";

export default function TermsPage() {
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Document légal
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Conditions Générales
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              d&apos;Utilisation
            </span>
          </h1>
          <p className="text-slate-400 text-sm">
            Dernière mise à jour : <span className="text-emerald-300">{LAST_UPDATED}</span>
          </p>
        </div>

        {/* Intro Card */}
        <div className="mb-12 rounded-3xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-xl p-8">
          <p className="text-lg text-slate-300 leading-relaxed">
            SubScanner est édité par <span className="text-white font-semibold">Loris D.</span> (auto-entrepreneur immatriculé en France). 
            Le service vous aide à identifier vos abonnements récurrents à partir de relevés bancaires au format CSV. 
            En accédant au site, à l&apos;application ou aux API SubScanner, vous acceptez les présentes conditions.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 text-lg font-bold">1</span>
              Objet et champ d&apos;application
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Les CGU définissent les règles applicables à l&apos;utilisation des services SubScanner, qu&apos;ils soient gratuits
              ou payants. Elles s&apos;imposent à tout visiteur ou utilisateur. Si vous refusez ces conditions, vous devez cesser
              d&apos;utiliser SubScanner.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 text-lg font-bold">2</span>
              Fonctionnalités proposées
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Upload manuel d&apos;un fichier CSV contenant l&apos;historique de vos transactions.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Analyse automatique (côté serveur) pour détecter les prélèvements récurrents et calculer les totaux mensuels/annuels.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Sauvegarde facultative des résultats dans votre espace personnel via Firebase Auth.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Dashboard listant vos analyses, statistiques agrégées et options de suppression.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Recommandations pour catégoriser ou marquer les abonnements à résilier.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Comparateur d&apos;offres alternatives pour trouver des services moins chers ou mieux adaptés.</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-slate-300 leading-relaxed">
                <span className="text-emerald-400 font-semibold">Important :</span> SubScanner n&apos;est pas un service de gestion bancaire. 
                Aucune connexion directe à vos banques n&apos;est réalisée. Vous restez responsable de l&apos;exactitude des fichiers fournis 
                et des décisions prises à partir des résultats.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 text-lg font-bold">3</span>
              Création de compte et sécurité
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Vous pouvez analyser un CSV sans compte. La création d&apos;un espace personnel (email + mot de passe ou Google OAuth)
              est toutefois nécessaire pour sauvegarder l&apos;historique de vos analyses. Vous vous engagez à :
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Fournir des informations exactes lors de l&apos;inscription.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Conserver vos identifiants confidentiels et sécurisés.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-emerald-400 font-bold">•</span>
                <span>Notifier SubScanner en cas d&apos;utilisation frauduleuse de votre compte.</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 text-lg font-bold">4</span>
              Utilisation autorisée
            </h2>
            <p className="text-slate-300 leading-relaxed mb-4">Vous vous interdisez notamment de :</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Uploader des fichiers contenant des données illégales ou infectées (virus, malwares).</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Contourner ou tester les mesures de sécurité mises en place.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Revendre ou redistribuer les résultats générés par SubScanner sans autorisation écrite.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <span className="text-rose-400 font-bold">✕</span>
                <span>Automatiser les appels vers les API en dehors des capacités documentées.</span>
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 text-lg font-bold">5</span>
              Traitement des données et conservation
            </h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Les fichiers CSV sont traités en mémoire puis supprimés lorsque vous n&apos;êtes pas connecté(e).</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Connecté(e), seul le résultat d&apos;analyse (libellé des abonnements, montants, dates) est stocké dans Firestore (UE).</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Une copie locale peut être conservée via <code className="text-emerald-400 bg-slate-800/50 px-2 py-0.5 rounded">localStorage</code> pour recharger votre dernière analyse.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Vous pouvez supprimer vos analyses depuis le dashboard ou solliciter la suppression complète de votre compte.</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-slate-300 leading-relaxed">
                Les modalités complètes de traitement (bases légales, durée, droits RGPD) sont détaillées dans notre{" "}
                <Link href="/legal/privacy" className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-400/30 hover:decoration-emerald-400">
                  Politique de confidentialité
                </Link>.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 text-lg font-bold">6</span>
              Comparateur et liens affiliés
            </h2>
            <div className="space-y-4">
              <p className="text-slate-200 leading-relaxed font-semibold">
                <span className="text-sky-400">📊 Transparence :</span> SubScanner propose un comparateur d&apos;offres partenaires.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><span className="text-white font-semibold">Classement objectif :</span> les offres sont triées par prix mensuel croissant par défaut.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><span className="text-white font-semibold">Liens affiliés :</span> certaines offres contiennent des liens affiliés. Si vous souscrivez via ces liens, SubScanner peut percevoir une commission de la part du partenaire.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><span className="text-white font-semibold">Sans surcoût :</span> le prix affiché est identique que vous passiez par notre lien ou directement sur le site du partenaire.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><span className="text-white font-semibold">Indépendance :</span> l&apos;existence d&apos;un partenariat n&apos;influence pas le classement ni la sélection des offres.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span><span className="text-white font-semibold">Non exhaustif :</span> le comparateur ne référence qu&apos;une partie des offres du marché.</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-slate-800/50">
                <p className="text-slate-400 text-sm">
                  Les liens affiliés sont clairement identifiés par la mention « lien affilié » à proximité du bouton.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 text-lg font-bold">7</span>
              Responsabilité
            </h2>
            <p className="text-slate-300 leading-relaxed">
              SubScanner fournit un outil d&apos;analyse automatisé. Malgré les efforts pour garantir la fiabilité des résultats,
              il peut subsister des approximations. L&apos;utilisateur reste responsable de la vérification finale des abonnements
              détectés et des démarches de résiliation. SubScanner ne saurait être tenu responsable des conséquences
              financières liées à des décisions prises sur la base des résultats.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 text-lg font-bold">7</span>
              Suspension et résiliation
            </h2>
            <p className="text-slate-300 leading-relaxed">
              En cas d&apos;utilisation abusive ou de non-respect des présentes CGU, SubScanner se réserve le droit de suspendre ou
              résilier l&apos;accès au service, sans indemnité. Vous pouvez supprimer votre compte à tout moment en nous écrivant
              à <a href="mailto:support@subscanner.fr" className="text-emerald-400 hover:text-emerald-300 font-semibold">support@subscanner.fr</a> ; vos données seront effacées sous 30 jours.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 text-lg font-bold">9</span>
              Évolution du service
            </h2>
            <p className="text-slate-300 leading-relaxed">
              SubScanner peut faire évoluer ses fonctionnalités (ajout de tableau de bord, intégration d&apos;API tierces, etc.).
              Dans ce cas, les présentes CGU pourront être mises à jour. Vous serez notifié(e) des modifications importantes
              via email ou bannière sur le site. L&apos;utilisation continue du service vaut acceptation des nouvelles conditions.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 text-lg font-bold">10</span>
              Droit applicable
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Les CGU sont régies par le droit français. En cas de litige et après une tentative de résolution amiable,
              les tribunaux compétents seront ceux du ressort de Paris.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 text-lg font-bold">11</span>
              Contact
            </h2>
            <div className="space-y-3 text-slate-300">
              <p className="leading-relaxed">Pour toute question sur ces CGU ou pour exercer vos droits :</p>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@subscanner.fr" className="text-emerald-400 hover:text-emerald-300 font-semibold">contact@subscanner.fr</a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <a href="mailto:support@subscanner.fr" className="text-cyan-400 hover:text-cyan-300 font-semibold">support@subscanner.fr</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
