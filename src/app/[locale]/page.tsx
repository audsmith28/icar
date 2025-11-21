import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { DashboardStats } from '@/components/dashboard/DashboardStats';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="container">
      <section className="text-center py-16 px-4 bg-gradient-to-b from-[var(--color-off-white-sea-green)] to-white rounded-[var(--radius-lg)] mb-12">
        <h1 className="text-5xl md:text-6xl text-[var(--color-sea-green-darkest)] mb-6 max-w-4xl mx-auto">
          {t.rich('title', {
            highlight: (chunks) => <span className="text-[var(--color-orange)]">{chunks}</span>
          })}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('subtitle')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/organizations">
            <Button size="lg">Explore the Directory</Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">Learn More</Button>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-center mb-8 text-2xl font-bold text-[var(--color-sea-green-darker)]">
          Platform Overview
        </h2>
        <DashboardStats />
      </section>
    </div>
  );
}
