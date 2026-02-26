'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  onBookConsultClick: () => void;
  onAskQuestionClick: () => void;
}

export function Header({ onBookConsultClick, onAskQuestionClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-6">
            <Link href="/">
              <Image
                src="/KellerWilliams_Realty_Living_Logo_RGB.jpg"
                alt="Keller Williams Realty Living"
                width={200}
                height={60}
                className="h-12 w-auto cursor-pointer"
                priority
              />
            </Link>
            <div className="hidden sm:block h-12 w-px bg-gray-300"></div>
            <Link href="/" className="hidden sm:block text-2xl font-light tracking-wide text-gray-800 hover:text-red-600 transition-colors">
              Hamade Homes
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Home
              </Link>
              <Link
                href="/buy"
                className={`text-sm font-medium transition-colors ${
                  pathname === '/buy' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                }`}
              >
                Buy
              </Link>
            </nav>
            <button
              onClick={onAskQuestionClick}
              className="hidden text-sm font-medium text-gray-700 hover:text-red-600 transition-colors lg:block"
            >
              Ask a Quick Question
            </button>
            <Button
              onClick={onBookConsultClick}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Book a Consult
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
