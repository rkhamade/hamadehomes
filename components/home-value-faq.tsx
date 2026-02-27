'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function HomeValueFAQ() {
  const faqs = [
    {
      question: 'How accurate is the valuation?',
      answer:
        'Valuation accuracy depends on the depth of comparable sales data and local market knowledge. Hamade Homes analyzes current active listings, recent closed sales, and submarket demand patterns specific to Oakland County to produce a structured pricing range rather than a single automated estimate.',
    },
    {
      question: 'Is there any obligation?',
      answer:
        'No obligation exists. Requesting a home value analysis provides market data and pricing insight to inform your decisions. The information is useful whether considering selling immediately or planning for the future.',
    },
    {
      question: 'How quickly is the report delivered?',
      answer:
        'A detailed home value analysis is typically prepared and delivered within 24 hours of submission. The timeline allows for thorough review of comparable sales and current competition rather than an instant automated result.',
    },
    {
      question: 'Does this apply to Livingston County?',
      answer:
        'Yes. While Oakland County is the primary service area, Hamade Homes also covers parts of Livingston County. Properties in Livingston County are evaluated using the same structured process, with analysis tailored to local submarket conditions.',
    },
    {
      question: 'Can questions be asked before listing?',
      answer:
        'Yes. Questions can be submitted through the chat assistant or by requesting a valuation and noting specific concerns in the process. Answers on pricing strategy, market timing, and preparation are available before any commitment to list.',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
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
            Clear answers before requesting a home value analysis
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
