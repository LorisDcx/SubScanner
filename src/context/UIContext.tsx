"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Toast = {
  id: string;
  message: string;
  variant?: "default" | "error";
};

type UIContextValue = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast: UIContextValue["addToast"] = (toast) => {
    setToasts((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, ...toast },
    ]);
  };

  const removeToast: UIContextValue["removeToast"] = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <UIContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
          <div className="flex w-full max-w-sm flex-col gap-2">
            {toasts.map((toast) => (
              <button
                key={toast.id}
                type="button"
                onClick={() => removeToast(toast.id)}
                className={`rounded-lg px-3 py-2 text-xs text-left shadow-lg transition-colors ${
                  toast.variant === "error"
                    ? "bg-rose-600 text-slate-50"
                    : "bg-slate-900 text-slate-50"
                }`}
              >
                {toast.message}
              </button>
            ))}
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUI must be used within UIProvider");
  }
  return ctx;
}
