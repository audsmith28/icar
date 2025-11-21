'use client';

import { useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-sea-green-off-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="p-4 bg-red-50 rounded-full">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-sea-green-darkest mb-4">
            Something went wrong
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed mb-2">
            We encountered an unexpected error. Don't worry, our team has been notified.
          </p>
          {process.env.NODE_ENV === 'development' && error.message && (
            <p className="text-sm text-gray-500 mt-4 font-mono bg-gray-100 p-3 rounded">
              {error.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={reset}
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg" className="inline-flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If this problem persists, please{' '}
            <Link href="/contact" className="text-sea-green-darker hover:text-sea-green-darkest hover:underline font-medium">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

