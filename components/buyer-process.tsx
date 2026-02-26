'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function BuyerProcess() {
  const steps = [
    {
      number: '01',
      title: 'Consult',
      description: 'Goals, timeline, and priorities are discussed in a brief, no-pressure conversation.',
    },
    {
      number: '02',
      title: 'Search & Showings',
      description: 'Buyers receive a tailored list of homes. Properties are toured and the search is refined based on feedback.',
    },
    {
      number: '03',
      title: 'Offer & Negotiation',
      description: 'Competitive offers are crafted with strategic terms and negotiated on behalf of clients.',
    },
    {
      number: '04',
      title: 'Closing',
      description: 'Hamade Homes coordinates with lenders, title companies, and inspectors to ensure a smooth, on-time close.',
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
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            The Process
          </h2>
          <p className="text-lg text-gray-600">
            Four clear steps from first conversation to closing day
          </p>
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
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 text-center text-gray-600"
        >
          <p>
            Ready to sell your current home?{' '}
            <Link href="/" className="font-semibold text-red-600 hover:text-red-700 transition-colors">
              Learn about selling services
            </Link>
            {' '}or{' '}
            <Link href="/" className="font-semibold text-red-600 hover:text-red-700 transition-colors">
              request an instant home value estimate
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
