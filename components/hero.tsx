'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onBookConsultClick: () => void;
  onAskQuestionClick: () => void;
}

export function Hero({ onBookConsultClick, onAskQuestionClick }: HeroProps) {
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

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat animate-ken-burns"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundColor: '#1a1a1a',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            transition={{ duration: 0.8 }}
            className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Move Smarter. Buy or Sell With Clarity.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-lg text-gray-100 sm:text-xl max-w-2xl mx-auto"
          >
            Local insight, clear strategy, and strong negotiation for buyers, sellers, and investors.
          </motion.p>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6"
          >
            <Button
              onClick={onBookConsultClick}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
            >
              Book a 15-Min Consult
            </Button>
            <Button
              onClick={onAskQuestionClick}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold text-lg h-auto py-3 px-8"
            >
              Get a Quick Answer
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
