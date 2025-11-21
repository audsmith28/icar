import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/Button';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { HowCanWeHelp } from '@/components/homepage/HowCanWeHelp';
import { WavyLines } from '@/components/ui/WavyLines';
import { ColorBlock } from '@/components/ui/ColorBlock';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <div className="w-full">
      {/* Hero Section - Full Teal Background */}
      <section 
        className="w-full text-center py-24 px-4 relative" 
        style={{ 
          backgroundColor: '#004d57'
        }}
      >
        {/* Wavy Lines at Top */}
        <WavyLines 
          colors={['#02808b', '#d95222', '#ffb4a0']} 
          position="top"
          className="opacity-20"
        />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <h1 className="text-5xl md:text-6xl text-white mb-6 max-w-4xl mx-auto">
            {t.rich('title', {
              highlight: (chunks) => <span className="text-[#d95222]">{chunks}</span>
            })}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/organizations">
              <Button variant="primary" size="lg">Explore Organizations</Button>
            </Link>
            <Link href="/projects?tab=seeking-collaboration">
              <Button variant="primary" size="lg">Find Projects</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How Can We Help Section - White Background */}
      <HowCanWeHelp />

      {/* Platform Overview - Color Block Section */}
      <section 
        className="w-full py-16 relative overflow-hidden" 
        style={{ backgroundColor: '#f0f9fa' }}
      >
        {/* Wavy Lines at Top */}
        <WavyLines 
            colors={['#02808b', '#d95222', '#ffb4a0']} 
            position="top"
            className="opacity-25"
        />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <h2 className="text-center mb-8 text-2xl font-bold text-[#004d57]">
            Platform Overview
          </h2>
          <DashboardStats />
        </div>
      </section>
    </div>
  );
}
