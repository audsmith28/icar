'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { ICARButton } from './ICARButton';
import clsx from 'clsx';

export interface ICARModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  variant?: 'default' | 'confirm' | 'delete';
  onConfirm?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ICARModal({
  isOpen,
  onClose,
  title,
  children,
  variant = 'default',
  onConfirm,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  size = 'md',
}: ICARModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  };

  const confirmVariants = {
    default: 'primary',
    confirm: 'primary',
    delete: 'destructive',
  } as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={clsx(
          'bg-white rounded-icar-lg shadow-icar-lg w-full',
          sizes[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-heading font-semibold text-sea-green-darkest">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        {(variant === 'confirm' || variant === 'delete' || onConfirm) && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <ICARButton variant="outline" onClick={onClose}>
              {cancelLabel}
            </ICARButton>
            <ICARButton
              variant={confirmVariants[variant]}
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
            >
              {confirmLabel}
            </ICARButton>
          </div>
        )}
      </div>
    </div>
  );
}
