'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

interface HomeValueHeroProps {
  onGetValueClick: (address?: string) => void;
  onAskQuestionClick: () => void;
}

export function HomeValueHero({ onGetValueClick, onAskQuestionClick }: HomeValueHeroProps) {
  const [address, setAddress] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGetValueClick(address);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundColor: '#1a1a1a',
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl w-full text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            What Is Your Home Worth in Oakland County?
          </motion.h1>

          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 text-lg text-gray-200 sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Automated estimates often miss key variables. Accurate valuation requires analysis of comparable sales, current competition, and buyer demand.
          </motion.p>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row w-full max-w-2xl gap-3"
            >
              <Input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your property address"
                className="flex-1 h-14 text-base px-5 bg-white text-gray-900 border-0 rounded-lg placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-red-500"
              />
              <Button
                type="submit"
                size="lg"
                className="h-14 bg-red-600 hover:bg-red-700 text-white font-semibold text-base px-7 rounded-lg whitespace-nowrap flex items-center gap-2 sm:w-auto w-full"
              >
                Get My True Market Value
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="text-sm text-gray-400 mt-1">
              Free. No obligation. Delivered within 24 hours.
            </p>

            <div className="mt-4">
              <button
                type="button"
                onClick={onAskQuestionClick}
                className="text-sm text-gray-400 hover:text-gray-200 underline underline-offset-2 transition-colors duration-200"
              >
                Have a question first? Ask here.
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
