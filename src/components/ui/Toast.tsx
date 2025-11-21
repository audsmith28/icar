'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import clsx from 'clsx';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(7);
    const toast: Toast = { id, message, type, duration: 4000 };
    
    setToasts((prev) => [...prev, toast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div 
        className="fixed bottom-4 right-4 z-50 space-y-3 flex flex-col items-end"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={clsx(
              'flex items-start gap-3 px-5 py-4 rounded-lg shadow-xl min-w-[320px] max-w-md',
              'border-l-4 backdrop-blur-sm',
              'animate-in slide-in-from-right fade-in duration-300',
              'transform transition-all ease-out',
              toast.type === 'success' && [
                'bg-white border-sea-green-darker',
                'text-sea-green-darkest',
                'shadow-[0_4px_12px_rgba(2,128,139,0.15)]'
              ],
              toast.type === 'error' && [
                'bg-white border-red-500',
                'text-red-700',
                'shadow-[0_4px_12px_rgba(239,68,68,0.15)]'
              ],
              toast.type === 'info' && [
                'bg-white border-sea-green-darker',
                'text-sea-green-darkest',
                'shadow-[0_4px_12px_rgba(2,128,139,0.15)]'
              ]
            )}
          >
            <div className={clsx(
              'flex-shrink-0 mt-0.5',
              toast.type === 'success' && 'text-sea-green-darker',
              toast.type === 'error' && 'text-red-500',
              toast.type === 'info' && 'text-sea-green-darker'
            )}>
              {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
              {toast.type === 'info' && <Info className="w-5 h-5" />}
            </div>
            <p className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className={clsx(
                'flex-shrink-0 p-1 rounded-md transition-colors',
                'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2',
                toast.type === 'success' && 'focus:ring-sea-green-darker',
                toast.type === 'error' && 'focus:ring-red-500',
                toast.type === 'info' && 'focus:ring-sea-green-darker'
              )}
              aria-label="Close notification"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}



