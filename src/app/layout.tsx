import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SubScanner - Analyse tes abonnements et reprends le contrôle",
  description: "Upload ton relevé bancaire CSV, découvre tes abonnements récurrents et calcule combien tu peux économiser par an.",
  keywords: "abonnements, finances, économies, budget, CSV, analyse bancaire",
  authors: [{ name: "SubScanner" }],
  openGraph: {
    title: "SubScanner - Analyse tes abonnements",
    description: "Reprends le contrôle de tes finances en analysant tes abonnements récurrents",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
