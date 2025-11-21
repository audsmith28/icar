import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sea-green-off-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-sea-green-darkest opacity-20">404</h1>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-sea-green-darkest mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
              <Home className="w-5 h-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/organizations">
            <Button variant="outline" size="lg" className="inline-flex items-center gap-2">
              <Search className="w-5 h-5" />
              Browse Organizations
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/projects" className="text-sea-green-darker hover:text-sea-green-darkest hover:underline">
              Projects
            </Link>
            <Link href="/ecosystem" className="text-sea-green-darker hover:text-sea-green-darkest hover:underline">
              Ecosystem
            </Link>
            <Link href="/about" className="text-sea-green-darker hover:text-sea-green-darkest hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sea-green-darker hover:text-sea-green-darkest hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

