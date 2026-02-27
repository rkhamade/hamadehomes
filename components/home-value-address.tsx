'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HomeValueAddressProps {
  onGetValueClick: () => void;
}

export function HomeValueAddress({ onGetValueClick }: HomeValueAddressProps) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Start with Your Property Address
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Enter the property address to begin a structured market evaluation.
          </p>
          <Button
            onClick={onGetValueClick}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-4 px-12"
          >
            Check Property Value
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
