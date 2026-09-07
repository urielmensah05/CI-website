'use client';
// ============================================================
// lib/context/ToastContext.tsx
// Système de notification global (succès, erreur, info, warning)
// ============================================================
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

// Types
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (title: string, type?: ToastType, message?: string) => void;
}

// Création du contexte
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ── Provider ─────────────────────────────────────────────────
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((title: string, type: ToastType = 'success', message?: string) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Disparaît automatiquement après 4 secondes
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Styles selon le type
  const styles: Record<ToastType, { border: string; icon: React.ReactNode; text: string }> = {
    success: {
      border: 'border-amber-400/40',
      icon: <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />,
      text: 'text-amber-300',
    },
    error: {
      border: 'border-red-500/40',
      icon: <XCircle className="w-5 h-5 text-red-400 shrink-0" />,
      text: 'text-red-300',
    },
    warning: {
      border: 'border-yellow-500/40',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0" />,
      text: 'text-yellow-300',
    },
    info: {
      border: 'border-blue-500/40',
      icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
      text: 'text-blue-300',
    },
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Zone des notifications */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          const s = styles[toast.type];
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 bg-[#1a1a1e]/95 backdrop-blur-md border ${s.border} rounded-2xl p-4 shadow-2xl shadow-black/50 animate-in slide-in-from-right-5 duration-300`}
            >
              {s.icon}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${s.text}`}>{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-zinc-400 mt-0.5 truncate">{toast.message}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-zinc-500 hover:text-zinc-200 transition shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast doit être dans <ToastProvider>');
  return ctx;
}
