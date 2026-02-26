'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SellerCoverageAreaProps {
  onRequestValueClick: () => void;
}

export function SellerCoverageArea({ onRequestValueClick }: SellerCoverageAreaProps) {
  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="rounded-lg border border-gray-200 bg-white p-8 text-center"
        >
          <div className="mb-4 inline-block rounded-lg bg-red-50 p-3">
            <MapPin className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Primary Focus: Oakland County
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Hamade Homes operates primarily within <span className="font-semibold text-gray-900">Oakland County</span>, including Novi, Troy, Birmingham, Rochester, Royal Oak, and Bloomfield Hills. Additional service is provided in parts of <span className="font-semibold text-gray-900">Livingston County</span>. This geographic focus enables stronger pricing accuracy, deeper market insight, and more reliable valuation specific to local submarket conditions.
          </p>
          <Button
            onClick={onRequestValueClick}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
          >
            Check Property Value
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
