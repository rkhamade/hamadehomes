'use client';

import { motion } from 'framer-motion';
import { Search, FileCheck, Handshake } from 'lucide-react';

export function BuyerHelp() {
  const helps = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Tailored property lists matched to your priorities and neighborhood fit.',
    },
    {
      icon: FileCheck,
      title: 'Strong Offers',
      description: 'Terms strategy and guidance to position you competitively.',
    },
    {
      icon: Handshake,
      title: 'Smooth Closing',
      description: 'Lender and title coordination with clear, consistent communication.',
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
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Strategic Buyer Representation
          </h2>
          <p className="text-lg text-gray-600">
            Clear strategy for every step of the home purchase
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {helps.map((help, index) => {
            const Icon = help.icon;
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
                  {help.title}
                </h3>
                <p className="text-gray-600">{help.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
