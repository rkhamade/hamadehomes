'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface PricingPositioningProps {
  onRequestValueClick: () => void;
}

export function PricingPositioning({ onRequestValueClick }: PricingPositioningProps) {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
            Accurate Pricing Determines Outcome
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-6 text-lg text-gray-600"
        >
          <p>
            Automated estimates rely on incomplete data and fail to account for property condition, local competition, or current buyer behavior. Strategic pricing requires analysis of recent comparable sales, active market conditions, and positioning relative to similar properties.
          </p>

          <p>
            Pricing strategy directly impacts both final sale price and time on market. Properties positioned accurately attract qualified buyers and generate competitive offers. Overpricing leads to extended market time and reduced negotiating power. Underpricing leaves value on the table.
          </p>

          <p>
            Hamade Homes provides data-driven pricing analysis specific to Oakland County submarkets, where property values and buyer expectations vary significantly by city and neighborhood. This focused approach delivers more reliable valuation and stronger positioning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-10 text-center"
        >
          <Button
            onClick={onRequestValueClick}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
          >
            Get Accurate Home Value
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
