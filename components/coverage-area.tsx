'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export function CoverageArea() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center"
        >
          <div className="mb-4 inline-block rounded-lg bg-red-50 p-3">
            <MapPin className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Oakland County Focus
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            The primary focus is <span className="font-semibold text-gray-900">Oakland County</span>, including cities like Novi, Troy, Birmingham, Rochester, Royal Oak, and Bloomfield Hills. Additional service includes parts of <span className="font-semibold text-gray-900">Livingston County</span>, bringing deep local knowledge to every transaction.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
