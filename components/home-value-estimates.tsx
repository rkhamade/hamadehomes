'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BarChart2, Home, TrendingUp } from 'lucide-react';

interface HomeValueEstimatesProps {
  onGetValueClick: () => void;
}

export function HomeValueEstimates({ onGetValueClick }: HomeValueEstimatesProps) {
  const reasons = [
    {
      icon: BarChart2,
      title: 'Comparable Gaps',
      description: 'Online tools may not reflect current comparable sales accurately.',
    },
    {
      icon: Home,
      title: 'Condition Variables',
      description: 'Interior updates, layout, and property condition significantly affect pricing.',
    },
    {
      icon: TrendingUp,
      title: 'Market Timing',
      description: 'Inventory levels and buyer demand shift quickly, impacting value.',
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
            Why Automated Estimates Miss the Mark
          </h2>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.6 }}
                className="rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-red-200 hover:shadow-md"
              >
                <div className="mb-4 inline-block rounded-lg bg-red-50 p-3">
                  <Icon className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10 text-center"
        >
          <Button
            onClick={onGetValueClick}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
          >
            Request Accurate Valuation
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
