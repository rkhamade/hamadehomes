'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Script from 'next/script';

export function BuyFAQ() {
  const faqs = [
    {
      question: 'What\'s the first step to start buying?',
      answer:
        'The first step is a brief consultation to discuss goals, timeline, and budget. From there, Hamade Homes connects buyers with trusted lenders if needed and begins curating properties that match their priorities.',
    },
    {
      question: 'Do I need pre-approval before touring homes?',
      answer:
        'While not required for touring, pre-approval is essential before making offers. It shows sellers buyers are serious and allows for quick action when the right home is found. Hamade Homes can connect buyers with reliable local lenders.',
    },
    {
      question: 'How competitive is Oakland County right now?',
      answer:
        'Market conditions vary by city and price point. During the consultation, current data for target areas is provided along with strategies to position buyers competitively without overpaying.',
    },
    {
      question: 'What does it cost to work with a buyer\'s agent?',
      answer:
        'In most cases, the seller pays the buyer\'s agent commission. The specifics are explained during the consultation so buyers understand exactly how compensation works in their transaction.',
    },
    {
      question: 'Can I ask questions without booking a call?',
      answer:
        'Absolutely. Use the "Ask a Quick Question" button to reach Hamade Homes through chat. Support is available whether buyers are ready to start touring homes or just exploring their options.',
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
        id="buy-faq-schema"
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
              Buyer Questions Answered
            </h2>
            <p className="text-lg text-gray-600">
              Clear answers to help buyers start their home search with confidence
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
