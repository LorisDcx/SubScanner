import Link from "next/link";
import Image from "next/image";
import { SUPPORT_URL } from "@/config/support";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800/30 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-sm">
                S
              </div>
              <span className="text-lg font-bold text-white">SubScanner</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Reprends le contrôle de tes finances en analysant tes abonnements récurrents.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Produit</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/analyze" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>Scanner mon relevé</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>Tarifs</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>Fonctionnalités</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Entreprise</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/feedback-netlify" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>💡 Boîte à idées</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/feedback-netlify" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>Support</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <a href={SUPPORT_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>☕ Nous soutenir</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/legal/terms" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>CGU</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy" className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <span>Confidentialité</span>
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section with QR Code */}
        <div className="mt-12 pt-8 border-t border-slate-800/30">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-slate-800/50">
            <div className="flex-1 text-center md:text-left space-y-2">
              <h3 className="text-lg font-semibold text-white flex items-center justify-center md:justify-start gap-2">
                <span>☕</span>
                <span>Soutenir SubScanner</span>
              </h3>
              <p className="text-sm text-slate-400 max-w-md">
                SubScanner est 100% gratuit. Si tu trouves l&apos;outil utile, tu peux m&apos;offrir un café !
              </p>
              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors"
              >
                <span>💙</span>
                <span>buymeacoffee.com/lorisdc</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <div className="flex-shrink-0">
              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-2xl bg-white hover:scale-105 transition-transform"
                aria-label="Scanner le QR code pour soutenir SubScanner"
              >
                <Image
                  src="/qr-code-buymeacoffee.png"
                  alt="QR Code Buy Me a Coffee"
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
              </a>
              <p className="text-xs text-center text-slate-500 mt-2">Scanne pour donner</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-800/30 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} SubScanner. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-500 text-center sm:text-right">
            Construit avec sérieux pour celles et ceux qui veulent arrêter de subir leurs prélèvements.
          </p>
        </div>
      </div>
    </footer>
  );
}
