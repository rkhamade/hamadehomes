'use client';

import { motion } from 'framer-motion';
import { MapPin, Lightbulb, MessageCircle } from 'lucide-react';

export function TrustBar() {
  const trustSignals = [
    {
      icon: MapPin,
      title: 'Local Market Expertise',
      description: 'Deep knowledge of Brighton, Howell, and Livingston County markets',
    },
    {
      icon: Lightbulb,
      title: 'Strategy-First Process',
      description: 'Data-driven approach tailored to your specific goals and timeline',
    },
    {
      icon: MessageCircle,
      title: 'Clear, Responsive Communication',
      description: 'Transparent updates and accessible guidance every step of the way',
    },
  ];

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {trustSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 rounded-lg bg-red-50 p-3">
                  <Icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {signal.title}
                </h3>
                <p className="text-gray-600">{signal.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
