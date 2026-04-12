'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onBookConsultClick: () => void;
  onAskQuestionClick: () => void;
}

export function Hero({ onBookConsultClick, onAskQuestionClick }: HeroProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dotX = useTransform(mouseX, [-1, 1], [-18, 18]);
  const dotY = useTransform(mouseY, [-1, 1], [-18, 18]);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        }
        setScrolled(window.scrollY > 80);
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx);
      mouseY.set((e.clientY - cy) / cy);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)', letterSpacing: '0.06em' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      letterSpacing: '-0.01em',
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 320, damping: 22 },
    },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1600")',
          backgroundColor: '#1a1a1a',
          willChange: 'transform',
          top: '-15%',
          bottom: '-15%',
          height: '130%',
        }}
      />

      <motion.div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.07,
          x: dotX,
          y: dotY,
        }}
      />

      <div className="absolute inset-0 z-[2] bg-black/50" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={headlineVariants}
            className="mb-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Move Smarter. Buy or Sell With Clarity.
          </motion.h1>

          <motion.div
            variants={lineVariants}
            className="h-[2px] w-20 bg-red-500 mx-auto mb-6 rounded-full origin-left"
          />

          <motion.p
            variants={textVariants}
            className="mb-8 text-lg text-gray-100 sm:text-xl max-w-2xl mx-auto"
          >
            Local insight, clear strategy, and strong negotiation for buyers, sellers, and investors.
          </motion.p>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
            }}
          >
            <motion.div variants={buttonVariants}>
              <Button
                onClick={onBookConsultClick}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-lg h-auto py-3 px-8"
              >
                Book a 15-Min Consult
              </Button>
            </motion.div>
            <motion.div variants={buttonVariants}>
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
        </motion.div>
      </div>

      <AnimatePresence>
        {!scrolled && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.4, duration: 0.6 } }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.4 } }}
          >
            <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="text-white/40 w-5 h-5" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
