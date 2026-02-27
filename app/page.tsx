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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenChatbot = () => {
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
  );
}
