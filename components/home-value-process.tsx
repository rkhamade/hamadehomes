'use client';

import { motion } from 'framer-motion';

export function HomeValueProcess() {
  const steps = [
    {
      number: '01',
      title: 'Market Analysis',
      description: 'Recent comparable sales reviewed.',
    },
    {
      number: '02',
      title: 'Competitive Positioning',
      description: 'Current active listings evaluated.',
    },
    {
      number: '03',
      title: 'Demand Assessment',
      description: 'Buyer activity and pricing behavior analyzed.',
    },
    {
      number: '04',
      title: 'Strategic Recommendation',
      description: 'Clear pricing range and positioning guidance provided.',
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
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Structured Valuation Process
          </h2>
        </motion.div>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.6 }}
              className="flex gap-6 rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-red-200 hover:shadow-md"
            >
              <div className="flex-shrink-0">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                  {step.number}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="mb-1 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
