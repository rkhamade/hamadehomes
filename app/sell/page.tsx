'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { SellHero } from '@/components/sell-hero';
import { PricingPositioning } from '@/components/pricing-positioning';
import { SellingAdvantage } from '@/components/selling-advantage';
import { SellingProcess } from '@/components/selling-process';
import { SellerCoverageArea } from '@/components/seller-coverage-area';
import { SellFAQ } from '@/components/sell-faq';
import { FinalCTA } from '@/components/final-cta';
import { Footer } from '@/components/footer';
import { FAB } from '@/components/fab';
import { ConsultationModal } from '@/components/consultation-modal';
import { HomeValueModal } from '@/components/home-value-modal';
import Script from 'next/script';

export default function SellPage() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isHomeValueModalOpen, setIsHomeValueModalOpen] = useState(false);

  const handleOpenConsultModal = () => {
    setIsConsultModalOpen(true);
  };

  const handleOpenHomeValueModal = () => {
    setIsHomeValueModalOpen(true);
  };

  const handleOpenChatbot = () => {
    if (typeof window !== 'undefined') {
      const win = window as any;
      if (win.VG_OPEN) {
        win.VG_OPEN();
      } else if (win.vg?.open) {
        win.vg.open();
      } else if (win.voiceglow?.open) {
        win.voiceglow.open();
      } else {
        const launcher = document.querySelector('#VG_OVERLAY_CONTAINER button, [class*="vg-launcher"], [class*="voiceglow-launcher"]');
        if (launcher instanceof HTMLElement) {
          launcher.click();
        }
      }
    }
  };

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Robert Hamade - Hamade Homes',
    image: 'https://hamadehomes.com/logo.jpg',
    '@id': 'https://hamadehomes.com',
    url: 'https://hamadehomes.com',
    telephone: '(248) 247-9014',
    email: 'robhamade@kw.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '130 W Grand River Ave',
      addressLocality: 'Brighton',
      addressRegion: 'MI',
      postalCode: '48178',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Oakland County',
        '@id': 'https://en.wikipedia.org/wiki/Oakland_County,_Michigan',
      },
      {
        '@type': 'City',
        name: 'Livingston County',
        '@id': 'https://en.wikipedia.org/wiki/Livingston_County,_Michigan',
      },
    ],
    priceRange: '$$',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.52941,
      longitude: -83.78391,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
  };

  return (
    <>
      <Script
        id="business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema),
        }}
      />
      <main className="min-h-screen">
        <Header onBookConsultClick={handleOpenConsultModal} onAskQuestionClick={handleOpenChatbot} />
        <SellHero onRequestValueClick={handleOpenHomeValueModal} onAskQuestionClick={handleOpenChatbot} />
        <PricingPositioning onRequestValueClick={handleOpenHomeValueModal} />
        <SellingAdvantage />
        <SellingProcess />
        <SellerCoverageArea onRequestValueClick={handleOpenHomeValueModal} />
        <SellFAQ />
        <FinalCTA onBookConsultClick={handleOpenConsultModal} />
        <Footer />
        <FAB onBookConsultClick={handleOpenConsultModal} />
        <ConsultationModal open={isConsultModalOpen} onOpenChange={setIsConsultModalOpen} />
        <HomeValueModal open={isHomeValueModalOpen} onOpenChange={setIsHomeValueModalOpen} />
      </main>
    </>
  );
}
