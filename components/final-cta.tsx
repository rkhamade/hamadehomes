'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface FinalCTAProps {
  onBookConsultClick: () => void;
}

export function FinalCTA({ onBookConsultClick }: FinalCTAProps) {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to make a smart move?
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Get clarity and a local strategy built for your goals.
          </p>
          <Button
            onClick={onBookConsultClick}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
          >
            Book a 15-Min Consult
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
