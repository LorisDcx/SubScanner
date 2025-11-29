"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = user
    ? [
        { href: "/analyze", label: "Scanner mon relevé" },
        { href: "/tuto", label: "Tuto CSV" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/feedback-netlify", label: "Contact" },
      ]
    : [
        { href: "/analyze", label: "Scanner mon relevé" },
        { href: "/tuto", label: "Tuto CSV" },
        { href: "/login", label: "Connexion" },
      ];

  const isActive = (href: string) => {
    const [base] = href.split("#");
    if (!pathname) return false;
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold text-sm">
            S
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            SubScanner
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  active ? "text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex items-center gap-4">


            {user ? (
              <>
                <Link
                  href="/analyze"
                  className="relative rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                >
                  Scanner mon relevé
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-sm text-slate-500 hover:text-rose-300 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/analyze"
                className="relative rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
              >
                Scanner mon relevé
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
