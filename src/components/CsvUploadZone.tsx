"use client";

import { useCallback, useRef, useState } from "react";

type Props = {
  onFileSelected: (file: File) => void;
  isLoading?: boolean;
  error?: string | null;
};

export function CsvUploadZone({ onFileSelected, isLoading, error }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return;
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      const file = event.dataTransfer.files?.[0];
      handleFile(file ?? null);
    },
    [handleFile]
  );

  const onClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      handleFile(file);
    },
    [handleFile]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`group relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-emerald-400 bg-emerald-500/10 scale-[1.02]"
            : "border-slate-600/50 bg-slate-800/30 hover:border-emerald-500/50 hover:bg-slate-800/50"
        } ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={isLoading ? undefined : onClick}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        <div className="relative flex flex-col items-center justify-center px-8 py-12 text-center">
          {isLoading ? (
            // Loading state
            <>
              <div className="w-20 h-20 mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border-4 border-slate-700 border-b-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              </div>
              <p className="text-base font-semibold text-white mb-2">
                Analyse en cours...
              </p>
              <p className="text-sm text-slate-400">
                Détection des abonnements récurrents
              </p>
            </>
          ) : (
            // Upload state
            <>
              <div className="w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-emerald-400 group-hover:text-emerald-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              
              <div className="space-y-2 mb-6">
                <p className="text-lg font-semibold text-white">
                  {isDragging ? "Dépose ton fichier ici" : "Glisse ton fichier CSV ici"}
                </p>
                <p className="text-sm text-slate-400">
                  ou clique pour parcourir tes fichiers
                </p>
              </div>
              
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-700/30 px-4 py-2 text-xs text-slate-400 backdrop-blur-sm">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Format .csv • Max 5 Mo • 3 mois minimum
              </div>
              
              {/* Tips */}
              <div className="mt-6 pt-6 border-t border-slate-700/30 w-full">
                <div className="flex items-start gap-3 text-left">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-300 mb-1">Astuce</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Plus ta période est longue, plus la détection est précise. Recommandé : 6 mois.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4">
          <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-300">Erreur d'analyse</p>
            <p className="text-sm text-red-400 mt-1">{error}</p>
          </div>
        </div>
      )}
      
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={onChange}
        disabled={isLoading}
      />
    </div>
  );
}
