'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Home, TrendingUp } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: ShoppingCart,
      title: 'Buying',
      description: 'Guided search, stronger offers, and smooth closing.',
      details: [
        'Strategic market analysis',
        'Offer optimization',
        'Negotiation expertise',
        'Smooth transaction management',
      ],
    },
    {
      icon: Home,
      title: 'Selling',
      description: 'Pricing strategy, standout presentation, and targeted exposure.',
      details: [
        'Market-based pricing strategy',
        'Staging recommendations',
        'Professional marketing',
        'Maximized buyer exposure',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Investing',
      description: 'ROI-driven analysis and long-term strategy.',
      details: [
        'Property analysis',
        'Investment potential assessment',
        'Cash flow evaluation',
        'Strategic portfolio guidance',
      ],
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
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive real estate solutions tailored to your goals
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
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
                  {service.title}
                </h3>
                <p className="mb-4 text-gray-600">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-600" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
