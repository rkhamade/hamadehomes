'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { BuyHero } from '@/components/buy-hero';
import { BuyerHelp } from '@/components/buyer-help';
import { BuyerProcess } from '@/components/buyer-process';
import { CoverageArea } from '@/components/coverage-area';
import { BuyFAQ } from '@/components/buy-faq';
import { FinalCTA } from '@/components/final-cta';
import { Footer } from '@/components/footer';
import { FAB } from '@/components/fab';
import { ConsultationModal } from '@/components/consultation-modal';
import Script from 'next/script';
import { trackEvent } from '@/lib/gtag';

export default function BuyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    trackEvent('consult_modal_open');
    setIsModalOpen(true);
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

  const buyFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://hamadehomes.com/buy/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What's the first step to start buying?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The first step is a brief consultation to discuss goals, timeline, and budget. From there, Hamade Homes connects buyers with trusted lenders if needed and begins curating properties that match their priorities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need pre-approval before touring homes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While not required for touring, pre-approval is essential before making offers. It shows sellers buyers are serious and allows for quick action when the right home is found. Hamade Homes can connect buyers with reliable local lenders.',
        },
      },
      {
        '@type': 'Question',
        name: 'How competitive is Oakland County right now?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Market conditions vary by city and price point. During the consultation, current data for target areas is provided along with strategies to position buyers competitively without overpaying.',
        },
      },
      {
        '@type': 'Question',
        name: "What does it cost to work with a buyer's agent?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "In most cases, the seller pays the buyer's agent commission. The specifics are explained during the consultation so buyers understand exactly how compensation works in their transaction.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I ask questions without booking a call?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Use the "Ask a Quick Question" button to reach Hamade Homes through chat. Support is available whether buyers are ready to start touring homes or just exploring their options.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="buy-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buyFaqSchema) }}
      />
      <Script
        id="business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema),
        }}
      />
      <main className="min-h-screen">
        <Header onBookConsultClick={handleOpenModal} onAskQuestionClick={handleOpenChatbot} />
        <BuyHero onBookConsultClick={handleOpenModal} onAskQuestionClick={handleOpenChatbot} />
        <BuyerHelp />
        <BuyerProcess />
        <CoverageArea />
        <BuyFAQ />
        <FinalCTA onBookConsultClick={handleOpenModal} />
        <Footer />
        <FAB onBookConsultClick={handleOpenModal} />
        <ConsultationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </main>
    </>
  );
}
