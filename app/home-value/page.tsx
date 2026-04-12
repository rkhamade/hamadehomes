'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { HomeValueHero } from '@/components/home-value-hero';
import { HomeValueEstimates } from '@/components/home-value-estimates';
import { HomeValueProcess } from '@/components/home-value-process';
import { HomeValueCoverage } from '@/components/home-value-coverage';
import { HomeValueFAQ } from '@/components/home-value-faq';
import { HomeValueFinalCTA } from '@/components/home-value-final-cta';
import { Footer } from '@/components/footer';
import { FAB } from '@/components/fab';
import { HomeValueModal } from '@/components/home-value-modal';
import Script from 'next/script';
import { trackEvent } from '@/lib/gtag';

export default function HomeValuePage() {
  const [isHomeValueModalOpen, setIsHomeValueModalOpen] = useState(false);
  const [heroAddress, setHeroAddress] = useState('');

  const handleOpenHomeValueModal = (address?: string) => {
    trackEvent('home_value_modal_open');
    if (address !== undefined) setHeroAddress(address);
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://hamadehomes.com/home-value/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How accurate is the valuation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Valuation accuracy depends on the depth of comparable sales data and local market knowledge. Hamade Homes analyzes current active listings, recent closed sales, and submarket demand patterns specific to Oakland County to produce a structured pricing range rather than a single automated estimate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there any obligation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No obligation exists. Requesting a home value analysis provides market data and pricing insight to inform your decisions. The information is useful whether considering selling immediately or planning for the future.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly is the report delivered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A detailed home value analysis is typically prepared and delivered within 24 hours of submission. The timeline allows for thorough review of comparable sales and current competition rather than an instant automated result.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this apply to Livingston County?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. While Oakland County is the primary service area, Hamade Homes also covers parts of Livingston County. Properties in Livingston County are evaluated using the same structured process, with analysis tailored to local submarket conditions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can questions be asked before listing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Questions can be submitted through the chat assistant or by requesting a valuation and noting specific concerns in the process. Answers on pricing strategy, market timing, and preparation are available before any commitment to list.',
        },
      },
    ],
  };

  const agentSchema = {
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
        '@type': 'AdministrativeArea',
        name: 'Oakland County, MI',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Livingston County, MI',
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
        id="home-value-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <Script
        id="home-value-agent-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(agentSchema),
        }}
      />
      <main className="min-h-screen">
        <Header onBookConsultClick={handleOpenHomeValueModal} onAskQuestionClick={handleOpenChatbot} />
        <HomeValueHero onGetValueClick={handleOpenHomeValueModal} onAskQuestionClick={handleOpenChatbot} />
        <HomeValueEstimates onGetValueClick={handleOpenHomeValueModal} />
        <HomeValueProcess />
        <HomeValueCoverage onGetValueClick={handleOpenHomeValueModal} />
        <HomeValueFAQ />
        <HomeValueFinalCTA onGetValueClick={handleOpenHomeValueModal} onAskQuestionClick={handleOpenChatbot} />
        <Footer />
        <FAB onBookConsultClick={handleOpenHomeValueModal} />
        <HomeValueModal open={isHomeValueModalOpen} onOpenChange={setIsHomeValueModalOpen} initialAddress={heroAddress} />
      </main>
    </>
  );
}
