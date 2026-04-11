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
import Link from 'next/link';
import Script from 'next/script';
import { trackEvent } from '@/lib/gtag';

export default function SellPage() {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isHomeValueModalOpen, setIsHomeValueModalOpen] = useState(false);

  const handleOpenConsultModal = () => {
    trackEvent('consult_modal_open');
    setIsConsultModalOpen(true);
  };

  const handleOpenHomeValueModal = () => {
    trackEvent('home_value_modal_open');
    setIsHomeValueModalOpen(true);
  };

  const handleOpenChatbot = () => {
    trackEvent('ai_chat_open');
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

  const sellFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://hamadehomes.com/sell/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How is home value determined?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Home value is determined through analysis of recent comparable sales, current market conditions, property condition and features, and positioning relative to active competition. Hamade Homes uses local market data specific to Oakland County submarkets to provide accurate valuation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to sell a home?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Time on market varies based on pricing strategy, property condition, and current market conditions. Properties priced accurately based on comparable sales typically attract qualified buyers within the first few weeks. Market timeline expectations are discussed during the initial property evaluation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is preparation required before listing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Preparation is not required but can impact final sale price and time on market. Recommendations for presentation improvements are provided during property evaluation. Sellers decide which preparation steps align with their goals and timeline.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there any obligation to request a home value?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No obligation exists. Home value requests provide sellers with market data and pricing analysis to inform their decisions. This information is useful whether selling immediately or planning for the future.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can questions be asked through chat?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The chat assistant provides immediate answers to questions about the selling process, market conditions, or next steps. This option is available for sellers who prefer quick answers before scheduling a consultation.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="sell-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sellFaqSchema) }}
      />
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
        <div className="bg-white py-6 text-center">
          <p className="text-sm text-gray-400">
            Prefer a full valuation breakdown?{' '}
            <Link href="/home-value" className="text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors duration-200">
              View the Home Value page
            </Link>
            .
          </p>
        </div>
        <FinalCTA onBookConsultClick={handleOpenConsultModal} />
        <Footer />
        <FAB onBookConsultClick={handleOpenConsultModal} />
        <ConsultationModal open={isConsultModalOpen} onOpenChange={setIsConsultModalOpen} />
        <HomeValueModal open={isHomeValueModalOpen} onOpenChange={setIsHomeValueModalOpen} />
      </main>
    </>
  );
}
