'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Script from 'next/script';

export function SellFAQ() {
  const faqs = [
    {
      question: 'How is home value determined?',
      answer:
        'Home value is determined through analysis of recent comparable sales, current market conditions, property condition and features, and positioning relative to active competition. Hamade Homes uses local market data specific to Oakland County submarkets to provide accurate valuation.',
    },
    {
      question: 'How long does it take to sell a home?',
      answer:
        'Time on market varies based on pricing strategy, property condition, and current market conditions. Properties priced accurately based on comparable sales typically attract qualified buyers within the first few weeks. Market timeline expectations are discussed during the initial property evaluation.',
    },
    {
      question: 'Is preparation required before listing?',
      answer:
        'Preparation is not required but can impact final sale price and time on market. Recommendations for presentation improvements are provided during property evaluation. Sellers decide which preparation steps align with their goals and timeline.',
    },
    {
      question: 'Is there any obligation to request a home value?',
      answer:
        'No obligation exists. Home value requests provide sellers with market data and pricing analysis to inform their decisions. This information is useful whether selling immediately or planning for the future.',
    },
    {
      question: 'Can questions be asked through chat?',
      answer:
        'Yes. The chat assistant provides immediate answers to questions about the selling process, market conditions, or next steps. This option is available for sellers who prefer quick answers before scheduling a consultation.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="sell-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Seller Questions Answered
            </h2>
            <p className="text-lg text-gray-600">
              Clear information to help sellers make informed decisions
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
    </>
  );
}
