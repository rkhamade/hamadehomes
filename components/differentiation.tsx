'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export function Differentiation() {
  const comparison = [
    {
      category: 'Preparation',
      typical: 'Limited market analysis',
      strategy: 'Comprehensive data-driven analysis and positioning',
    },
    {
      category: 'Communication',
      typical: 'Periodic updates',
      strategy: 'Proactive, transparent updates at every stage',
    },
    {
      category: 'Negotiation',
      typical: 'Standard approach',
      strategy: 'Strategic negotiation tailored to your goals',
    },
    {
      category: 'Timeline',
      typical: 'One-size-fits-all process',
      strategy: 'Flexible strategy aligned with your timeline',
    },
  ];

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
            Strategy-First Approach
          </h2>
          <p className="text-lg text-gray-600">
            How we deliver better results for our clients
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {[
            { title: 'Typical Approach', type: 'typical' },
            { title: 'Our Strategy-First Approach', type: 'strategy' },
          ].map((approach, columnIndex) => (
            <motion.div
              key={approach.type}
              initial={{ opacity: 0, x: columnIndex === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <h3 className="mb-6 text-xl font-bold text-gray-900">
                {approach.title}
              </h3>
              <div className="space-y-4">
                {comparison.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`rounded-lg p-4 ${
                      approach.type === 'strategy'
                        ? 'border border-green-100 bg-green-50'
                        : 'border border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {approach.type === 'strategy' ? (
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                      ) : (
                        <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900">
                          {item.category}
                        </p>
                        <p className="mt-1 text-sm text-gray-600">
                          {approach.type === 'typical'
                            ? item.typical
                            : item.strategy}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
