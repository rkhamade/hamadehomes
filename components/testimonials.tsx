'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Jackson S',
      role: 'Home Buyer',
      content:
        'Rob made the entire buying process clear and stress-free. His market insights helped us avoid overpaying and secure a stronger offer. Highly recommended.',
      rating: 5,
    },
    {
      name: 'Jim H',
      role: 'Home Seller',
      content:
        'The pricing strategy and marketing plan were spot-on. We sold our home above asking price in just 3 weeks. Rob\'s professionalism and communication were exceptional.',
      rating: 5,
    },
    {
      name: 'Reagan D',
      role: 'Real Estate Investor',
      content:
        'Rob provided data-driven analysis that saved us thousands on a multi-property portfolio decision. His strategic guidance and attention to detail are unmatched.',
      rating: 5,
    },
    {
      name: 'Tyler M',
      role: 'First-Time Home Buyer',
      content:
        'As a first-time buyer, I had many questions and concerns. Rob was patient, knowledgeable, and walked me through every step. He made what seemed overwhelming feel manageable and exciting.',
      rating: 5,
    },
  ];

  const [current, setCurrent] = useState(0);

  const goToPrevious = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
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
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from buyers, sellers, and investors
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg border border-gray-200 bg-white p-8 sm:p-10"
            >
              <div className="mb-6 flex gap-1">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 text-lg text-gray-700">
                &quot;{testimonials[current].content}&quot;
              </p>

              <div className="mb-4 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-400 to-red-600" />
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>

              <div className="inline-block rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700">
                Verified Client
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-4">
            <Button
              onClick={goToPrevious}
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === current ? 'w-8 bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={goToNext}
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-full border-gray-300 hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
