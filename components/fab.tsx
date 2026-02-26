'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

interface FABProps {
  onBookConsultClick: () => void;
}

export function FAB({ onBookConsultClick }: FABProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-6 right-6 z-40 md:hidden"
    >
      <Button
        onClick={onBookConsultClick}
        size="lg"
        className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl"
      >
        <Phone className="h-6 w-6" />
      </Button>
    </motion.div>
  );
}
