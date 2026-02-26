'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Award, Scale } from 'lucide-react';

export function SellingAdvantage() {
  const advantages = [
    {
      icon: TrendingUp,
      title: 'Strategic Pricing',
      description: 'Pricing based on real-time market analysis and comparable sales.',
    },
    {
      icon: Award,
      title: 'Professional Listing Position',
      description: 'Strong presentation and listing optimization attract qualified buyers.',
    },
    {
      icon: Scale,
      title: 'Structured Negotiation',
      description: 'Offers reviewed and negotiated to protect seller position and outcome.',
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
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Selling Advantage
          </h2>
          <p className="text-lg text-gray-600">
            Core elements that protect seller interests and maximize results
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-red-200 hover:shadow-lg hover:shadow-red-100"
              >
                <div className="mb-4 inline-block rounded-lg bg-red-50 p-4 transition-transform duration-300 group-hover:bg-red-600">
                  <Icon className="h-8 w-8 text-red-600 transition-colors duration-300 group-hover:text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {advantage.title}
                </h3>
                <p className="text-gray-600">{advantage.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
