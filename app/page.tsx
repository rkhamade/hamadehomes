'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { TrustBar } from '@/components/trust-bar';
import { Services } from '@/components/services';
import { Differentiation } from '@/components/differentiation';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { FinalCTA } from '@/components/final-cta';
import { Footer } from '@/components/footer';
import { FAB } from '@/components/fab';
import { CoverageArea } from '@/components/coverage-area';
import { ConsultationModal } from '@/components/consultation-modal';
import Script from 'next/script';
import { trackEvent } from '@/lib/gtag';

const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://hamadehomes.com/#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is this a high-pressure sales call?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. We believe in building trust through clarity and expertise. Our consultations are designed to understand your goals, provide honest insights, and only work together if it's the right fit. There's zero pressure—just strategic guidance.",
      },
    },
    {
      '@type': 'Question',
      name: "Is it too early if I'm selling later this year?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Not at all. In fact, the earlier you reach out, the better. We can help you prepare, understand your market position, plan pricing strategy, and make informed decisions on your timeline. Early planning leads to better outcomes.",
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after I reach out?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "We'll contact you within 24 hours to schedule your 15-minute consultation. During this call, we'll listen to your goals, answer your questions, and provide tailored insights for your specific situation. No commitment needed—just a conversation.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I ask questions without booking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. We\'re here to help. You can reach out with quick questions using the "Ask a Quick Question" link, and we\'ll get back to you with clear, straightforward answers. Many of our best clients started with a simple question.',
      },
    },
  ],
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    trackEvent('consult_modal_open');
    setIsModalOpen(true);
  };

  const handleOpenChatbot = () => {
    trackEvent('ai_chat_open');
    if (typeof window !== 'undefined') {
      // Try various VG API methods to open the chatbot
      const win = window as any;
      if (win.VG_OPEN) {
        win.VG_OPEN();
      } else if (win.vg?.open) {
        win.vg.open();
      } else if (win.voiceglow?.open) {
        win.voiceglow.open();
      } else {
        // Fallback: simulate click on the launcher button
        const launcher = document.querySelector('#VG_OVERLAY_CONTAINER button, [class*="vg-launcher"], [class*="voiceglow-launcher"]');
        if (launcher instanceof HTMLElement) {
          launcher.click();
        }
      }
    }
  };

  return (
    <>
      <Script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <main className="min-h-screen">
        <Header onBookConsultClick={handleOpenModal} onAskQuestionClick={handleOpenChatbot} />
      <Hero onBookConsultClick={handleOpenModal} onAskQuestionClick={handleOpenChatbot} />
      <TrustBar />
      <Services />
      <Differentiation />
      <CoverageArea />
      <Testimonials />
      <FAQ />
      <FinalCTA onBookConsultClick={handleOpenModal} />
      <Footer />
      <FAB onBookConsultClick={handleOpenModal} />
      <ConsultationModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </main>
    </>
  );
}
