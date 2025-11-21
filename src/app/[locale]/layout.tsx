import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: "ICAR Platform Prototype",
  description: "Israel's Collective Action for Resilience Ecosystem Map",
};

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}>
      <body>
        <ToastProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main style={{ minHeight: 'calc(100vh - 300px)' }}>
              {children}
            </main>
            <Footer />
          </NextIntlClientProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
