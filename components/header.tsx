'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onBookConsultClick: () => void;
  onAskQuestionClick: () => void;
}

export function Header({ onBookConsultClick, onAskQuestionClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
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

            <div className="flex items-center gap-3">
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
                <Link
                  href="/sell"
                  className={`text-sm font-medium transition-colors ${
                    pathname === '/sell' ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                  }`}
                >
                  Sell
                </Link>
              </nav>
              <button
                onClick={onAskQuestionClick}
                className="hidden text-sm font-medium text-gray-700 hover:text-red-600 transition-colors lg:block"
              >
                Ask the AI
              </button>
              <Button
                onClick={onBookConsultClick}
                className="hidden md:inline-flex bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Book a Consult
              </Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
              <Link
                href="/"
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === '/'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                }`}
              >
                Home
              </Link>
              <Link
                href="/buy"
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === '/buy'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                }`}
              >
                Buy
              </Link>
              <Link
                href="/sell"
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === '/sell'
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
                }`}
              >
                Sell
              </Link>
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 px-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onAskQuestionClick();
                  }}
                  className="w-full text-left text-base font-medium text-gray-700 hover:text-red-600 transition-colors py-2"
                >
                  Ask the AI
                </button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookConsultClick();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  Book a Consult
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
