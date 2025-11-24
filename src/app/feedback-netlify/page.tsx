"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";

type MessageType = "idea" | "support" | "complaint";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "idea" as MessageType,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Netlify Forms nécessite un attribut "form-name" qui correspond au nom du formulaire
      const formElement = e.target as HTMLFormElement;
      const formDataToSend = new FormData(formElement);

      const entries: [string, string][] = [];
      formDataToSend.forEach((value, key) => {
        entries.push([key, value.toString()]);
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(entries).toString(),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", type: "idea", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  const messageTypes = [
    {
      value: "idea" as MessageType,
      label: "💡 Idée",
      description: "Partagez vos suggestions pour améliorer SubScanner",
      emoji: "💡",
    },
    {
      value: "support" as MessageType,
      label: "🤝 Support",
      description: "Besoin d'aide avec le service ?",
      emoji: "🤝",
    },
    {
      value: "complaint" as MessageType,
      label: "⚠️ Réclamation",
      description: "Signalez un problème",
      emoji: "⚠️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <SiteHeader />

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Hero Section */}
        <div className="mb-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 px-4 py-2 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/20 backdrop-blur-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Faites-vous entendre
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Boîte à Idées
            <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              & Support
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Votre avis compte ! Partagez vos idées, demandez de l&apos;aide ou signalez un problème. 
            Chaque message est lu avec attention.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl border border-slate-800/50 bg-slate-900/50 backdrop-blur-xl p-8 md:p-12">
          <form 
            onSubmit={handleSubmit} 
            className="space-y-8"
            name="feedback"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            {/* Netlify Forms required fields */}
            <input type="hidden" name="form-name" value="feedback" />
            <input type="hidden" name="bot-field" />

            {/* Message Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-4">
                Type de message
              </label>
              <input type="hidden" name="type" value={formData.type} />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {messageTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                      formData.type === type.value
                        ? "border-emerald-400 bg-emerald-500/10"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                    }`}
                  >
                    <div className="text-2xl mb-2">{type.emoji}</div>
                    <div className="font-semibold text-white mb-1">
                      {type.label.replace(type.emoji, "").trim()}
                    </div>
                    <div className="text-xs text-slate-400">{type.description}</div>
                    {formData.type === type.value && (
                      <div className="absolute top-3 right-3">
                        <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="Votre nom"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="votre@email.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                placeholder="Décrivez votre idée, votre problème ou votre question en détail..."
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-emerald-400 font-semibold">Message envoyé !</p>
                  <p className="text-emerald-300/80 text-sm mt-1">
                    Merci pour votre retour. Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/20 p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-rose-400 font-semibold">Erreur d&apos;envoi</p>
                  <p className="text-rose-300/80 text-sm mt-1">
                    Une erreur est survenue. Veuillez réessayer.
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {status === "sending" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Envoyer le message
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 rounded-2xl border border-slate-800/50 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-slate-300 text-sm leading-relaxed">
              <p className="font-semibold text-white mb-2">💬 Temps de réponse habituel</p>
              <p>
                Nous nous efforçons de répondre à tous les messages dans un délai de <span className="text-emerald-400 font-semibold">48 heures</span>. 
                Les idées sont analysées et prises en compte pour les futures mises à jour !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
