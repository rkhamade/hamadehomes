'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HomeValueFinalCTAProps {
  onGetValueClick: () => void;
  onAskQuestionClick: () => void;
}

export function HomeValueFinalCTA({ onGetValueClick, onAskQuestionClick }: HomeValueFinalCTAProps) {
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
            Understand Your Property's True Market Position
          </h2>
          <p className="mb-8 text-lg text-gray-300">
            Accurate pricing is the foundation of a successful sale.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Button
              onClick={onGetValueClick}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
            >
              Request Home Value
            </Button>
            <Button
              onClick={onAskQuestionClick}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold text-lg h-auto py-3 px-8"
            >
              Schedule Strategy Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
