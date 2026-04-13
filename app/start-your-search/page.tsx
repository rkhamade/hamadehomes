'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, FileCheck, ArrowRight, MapPin } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FAB } from '@/components/fab';
import { BuyerSearchModal } from '@/components/buyer-search-modal';
import Script from 'next/script';
import { trackEvent } from '@/lib/gtag';

export default function StartYourSearchPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    trackEvent('buyer_search_modal_open');
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
        const launcher = document.querySelector(
          '#VG_OVERLAY_CONTAINER button, [class*="vg-launcher"], [class*="voiceglow-launcher"]'
        );
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
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://hamadehomes.com/start-your-search/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: "What's the first step in buying?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start by sharing goals, budget, and preferred areas. From there, a tailored home search plan is put together based on current inventory and priorities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need pre-approval first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Pre-approval is not required to start exploring. However, it is essential before submitting offers. Hamade Homes can connect buyers with trusted local lenders.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can help be provided if not ready yet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Whether actively searching or just starting to explore, guidance is available at every stage without pressure or obligation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What areas are covered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hamade Homes serves Oakland County, including Novi, Troy, Birmingham, Rochester, Royal Oak, and Bloomfield Hills, with additional coverage in parts of Livingston County.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can questions be asked before booking a consult?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use the "Ask a Question" button to connect through chat. There is no requirement to schedule a call to get answers.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="start-search-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="start-search-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <main className="min-h-screen">
        <Header onBookConsultClick={handleOpenModal} onAskQuestionClick={handleOpenChatbot} />
        <HeroSection onStartSearch={handleOpenModal} onAskQuestion={handleOpenChatbot} />
        <WhatBuyersGetSection />
        <HowItWorksSection />
        <OaklandCountySection />
        <FAQSection />
        <FinalCTASection onStartSearch={handleOpenModal} onAskQuestion={handleOpenChatbot} />
        <Footer />
        <FAB onBookConsultClick={handleOpenModal} />
        <BuyerSearchModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </main>
    </>
  );
}

function HeroSection({
  onStartSearch,
  onAskQuestion,
}: {
  onStartSearch: () => void;
  onAskQuestion: () => void;
}) {
  const bgRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dotX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const dotY = useTransform(mouseY, [-1, 1], [-18, 18]);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        }
        setScrolled(window.scrollY > 80);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)', letterSpacing: '0.06em' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      letterSpacing: '-0.01em',
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 320, damping: 22 },
    },
  };

  const trustVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundColor: '#1a1a1a',
          willChange: 'transform',
          top: '-15%',
          bottom: '-15%',
          height: '130%',
        }}
      />

      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.07,
          x: dotX,
          y: dotY,
        }}
      />

      <div className="absolute inset-0 z-[2] bg-black/72" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={headlineVariants}
            className="mb-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.7)' }}
          >
            Start Your Home Search in Oakland County
          </motion.h1>

          <motion.div
            variants={lineVariants}
            className="h-[2px] w-20 bg-red-500 mx-auto mb-6 rounded-full origin-left"
          />

          <motion.p
            variants={textVariants}
            className="mb-8 text-lg text-white sm:text-xl max-w-2xl mx-auto"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.6)' }}
          >
            Get matched with homes based on budget, timeline, and location goals. Hamade Homes serves Oakland County, with additional coverage in parts of Livingston County.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-8"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
          >
            <motion.div variants={buttonVariants}>
              <Button
                onClick={onStartSearch}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
              >
                Start My Search
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
              <Button
                onClick={onAskQuestion}
                size="lg"
                variant="outline"
                className="border-white/60 text-white/80 hover:bg-white/10 hover:text-white font-medium text-lg h-auto py-3 px-8"
              >
                Ask a Question
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            variants={trustVariants}
            className="mt-6 text-sm text-white/85 tracking-wide"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
          >
            Free guidance. No obligation. Fast response.
          </motion.p>
        </motion.div>
      </div>

      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.6 } }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.4 } }}
          >
            <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="text-white/40 w-5 h-5" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function WhatBuyersGetSection() {
  const cards = [
    {
      icon: Search,
      title: 'Smarter Search',
      description: 'Focus on homes that match budget, location, and goals.',
    },
    {
      icon: FileCheck,
      title: 'Stronger Offers',
      description: 'Build offers with local pricing awareness and negotiation strategy.',
    },
    {
      icon: ArrowRight,
      title: 'Clear Next Steps',
      description: 'Get guidance on timing, financing, and how to move forward.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="bg-white pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 lg:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            What Buyers Get
          </h2>
          <p className="text-lg text-gray-600">
            Everything needed to move from browsing to buying with more clarity.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-red-200 hover:shadow-lg hover:shadow-red-100"
              >
                <div className="mb-4 inline-block rounded-lg bg-red-50 p-4 transition-transform duration-300 group-hover:bg-red-600">
                  <Icon className="h-8 w-8 text-red-600 transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'Define Your Criteria',
      description: 'Share preferred areas, budget, and timeline to build a focused starting point.',
    },
    {
      number: '02',
      title: 'Review Options',
      description: 'Receive a curated list of properties matched to priorities and neighborhood fit.',
    },
    {
      number: '03',
      title: 'Build a Plan',
      description: 'Align on timing, financing steps, and offer strategy before touring.',
    },
    {
      number: '04',
      title: 'Tour and Offer',
      description: 'Tour top matches and submit competitive offers with full negotiation support.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <section className="bg-gray-50 pt-10 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="text-lg text-gray-600">Four steps from first contact to a signed offer</p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex gap-6 rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-red-200 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OaklandCountySection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="rounded-lg border border-gray-200 bg-white p-8 text-center"
        >
          <div className="mb-4 inline-block rounded-lg bg-red-50 p-3">
            <MapPin className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Oakland County Focus
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Hamade Homes serves Oakland County, including{' '}
            <span className="font-semibold text-gray-900">
              Novi, Troy, Birmingham, Rochester, Royal Oak, and Bloomfield Hills
            </span>
            , with additional coverage in parts of{' '}
            <span className="font-semibold text-gray-900">Livingston County</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "What's the first step in buying?",
      answer:
        'Start by sharing goals, budget, and preferred areas. From there, a tailored home search plan is put together based on current inventory and priorities.',
    },
    {
      question: 'Do I need pre-approval first?',
      answer:
        'Pre-approval is not required to start exploring. However, it is essential before submitting offers. Hamade Homes can connect buyers with trusted local lenders.',
    },
    {
      question: 'Can help be provided if not ready yet?',
      answer:
        'Absolutely. Whether actively searching or just starting to explore, guidance is available at every stage without pressure or obligation.',
    },
    {
      question: 'What areas are covered?',
      answer:
        'Hamade Homes serves Oakland County, including Novi, Troy, Birmingham, Rochester, Royal Oak, and Bloomfield Hills, with additional coverage in parts of Livingston County.',
    },
    {
      question: 'Can questions be asked before booking a consult?',
      answer:
        'Yes. Use the "Ask a Question" button to connect through chat. There is no requirement to schedule a call to get answers.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24" id="faq">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Common Questions
          </h2>
          <p className="text-lg text-gray-600">
            Answers to help buyers start with confidence
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-gray-200"
              >
                <AccordionTrigger className="py-4 text-left text-lg font-semibold text-gray-900 hover:text-red-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTASection({
  onStartSearch,
  onAskQuestion,
}: {
  onStartSearch: () => void;
  onAskQuestion: () => void;
}) {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to See What Fits?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Share goals and get a search plan built around budget, timeline, and location.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              onClick={onStartSearch}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
            >
              Start My Search
            </Button>
            <Button
              onClick={onAskQuestion}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold text-lg h-auto py-3 px-8"
            >
              Ask a Question
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
