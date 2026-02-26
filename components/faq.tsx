'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Script from 'next/script';

export function FAQ() {
  const faqs = [
    {
      question: 'Is this a high-pressure sales call?',
      answer:
        'No. We believe in building trust through clarity and expertise. Our consultations are designed to understand your goals, provide honest insights, and only work together if it\'s the right fit. There\'s zero pressure—just strategic guidance.',
    },
    {
      question: 'Is it too early if I\'m selling later this year?',
      answer:
        'Not at all. In fact, the earlier you reach out, the better. We can help you prepare, understand your market position, plan pricing strategy, and make informed decisions on your timeline. Early planning leads to better outcomes.',
    },
    {
      question: 'What happens after I reach out?',
      answer:
        'We\'ll contact you within 24 hours to schedule your 15-minute consultation. During this call, we\'ll listen to your goals, answer your questions, and provide tailored insights for your specific situation. No commitment needed—just a conversation.',
    },
    {
      question: 'Can I ask questions without booking?',
      answer:
        'Absolutely. We\'re here to help. You can reach out with quick questions using the "Ask a Quick Question" link, and we\'ll get back to you with clear, straightforward answers. Many of our best clients started with a simple question.',
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
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
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
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Clear answers to help you understand our process
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
