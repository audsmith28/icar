import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { HowCanWeHelp } from '@/components/homepage/HowCanWeHelp';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="text-center py-16 px-4 bg-gradient-to-b from-[#f0f9fa] to-white rounded-xl mb-12">
        <h1 className="text-5xl md:text-6xl text-[#004d55] mb-6 max-w-4xl mx-auto">
          {t.rich('title', {
            highlight: (chunks) => <span className="text-[#e29578]">{chunks}</span>
          })}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('subtitle')}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/organizations">
            <Button size="lg">Explore Organizations</Button>
          </Link>
          <Link href="/projects?tab=seeking-collaboration">
            <Button size="lg" className="bg-[#e29578] hover:bg-[#d17f63] text-white">
              Find Projects
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">Learn More</Button>
          </Link>
        </div>
      </section>

      {/* How Can We Help Section */}
      <HowCanWeHelp />

      {/* Platform Overview */}
      <section className="mb-16">
        <h2 className="text-center mb-8 text-2xl font-bold text-[#006d77]">
          Platform Overview
        </h2>
        <DashboardStats />
      </section>
    </div>
  );
}
