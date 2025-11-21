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
          <h1 className="text-white mb-8 max-w-5xl mx-auto" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: '120%', fontWeight: 700 }}>
            {t.rich('title', {
              highlight: (chunks) => <span className="text-[#d95222]">{chunks}</span>
            })}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
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
          <h2 className="text-center mb-12 text-[#004d57]" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', lineHeight: '120%', fontWeight: 700 }}>
            Platform Overview
          </h2>
          <DashboardStats />
        </div>
      </section>
    </div>
  );
}
