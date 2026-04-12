'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

const HERO_IMAGES = [
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1600',
  'https://images.pexels.com/photos/17205886/pexels-photo-17205886.jpeg?auto=compress&cs=tinysrgb&w=1600',
];

interface HomeValueHeroProps {
  onGetValueClick: (address?: string) => void;
  onAskQuestionClick: () => void;
}

export function HomeValueHero({ onGetValueClick, onAskQuestionClick }: HomeValueHeroProps) {
  const [address, setAddress] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

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
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          willChange: 'transform',
          top: '-15%',
          bottom: '-15%',
          height: '130%',
        }}
      >
        {HERO_IMAGES.map((src, index) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${src}")`,
              backgroundColor: '#1a1a1a',
              opacity: index === currentImage ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 z-1 animate-dot-drift"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.07,
        }}
      />

      <div className="absolute inset-0 z-2 bg-black/65" />

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
            className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl drop-shadow-lg"
          >
            Get Your True Market Value in Oakland County
          </motion.h1>

          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 text-lg text-white/90 sm:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            Real pricing insight based on local comps, demand, and competition. Not an algorithm. Delivered within 24 hours.
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

            <p className="text-sm text-white/75 mt-1">
              Free. No obligation. Delivered within 24 hours.
            </p>

            <div className="mt-4">
              <button
                type="button"
                onClick={onAskQuestionClick}
                className="text-sm text-gray-200 hover:text-white underline underline-offset-2 transition-colors duration-200"
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
