'use client';

import { useState } from 'react';
import { Facebook, Linkedin, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ConsultationModal } from '@/components/consultation-modal';

const MAP_SRC =
  'https://maps.google.com/maps?q=39555+Orchard+Hill+Place+Suite+600+Novi+MI+48375&t=&z=16&ie=UTF8&iwloc=&output=embed';

export function Footer() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <footer className="bg-white">
      <ConsultationModal open={consultOpen} onOpenChange={setConsultOpen} />
      {/* White section — strict 3-column grid on desktop, stacked on mobile */}
      <div
        className="flex flex-col lg:grid lg:items-stretch overflow-hidden"
        style={{ gridTemplateColumns: '1fr 1.1fr auto' }}
      >

        {/* ── COLUMN 1: identity + contact ── */}
        <div className="py-12 sm:py-16 lg:py-20 pl-8 sm:pl-12 lg:pl-16 pr-8 sm:pr-12 lg:pr-10">
          <div className="flex flex-col max-w-xs">
            <Image
              src="/eXp_Realty_-_Black-01 copy.png"
              alt="eXp Realty"
              width={160}
              height={65}
              className="mb-7"
            />

            <div className="space-y-1 mb-5">
              <p className="text-gray-900 text-lg font-medium">39555 Orchard Hill Place, Suite 600</p>
              <p className="text-gray-900 text-lg">Novi, MI 48375</p>
            </div>

            <p className="text-gray-900 text-lg mb-7">
              Office{' '}
              <a href="tel:2696004397" className="hover:text-red-600 transition-colors">
                (269) 600-4397
              </a>
            </p>

            <div className="border-t border-gray-300 mb-6" />

            <div className="space-y-2 mb-5">
              <p className="text-gray-900 text-xl font-semibold">Robert Hamade</p>
              <p className="text-gray-900">REALTOR®</p>
              <p className="text-gray-600">6501466891</p>
            </div>

            <p className="text-gray-900 mb-3">
              Mobile{' '}
              <a href="tel:2482479014" className="hover:text-red-600 transition-colors">
                (248) 247-9014
              </a>
            </p>
            <p className="text-gray-900 mb-6">
              <a href="mailto:rob@hamadehomes.com" className="hover:text-red-600 transition-colors">
                rob@hamadehomes.com
              </a>
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61586679495293"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-red-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/robhamadehomes/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-red-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/robert-hamade-7a6289391/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-red-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:rob@hamadehomes.com"
                className="text-gray-900 hover:text-red-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* ── COLUMN 2: 2-column mini-grid (Pages + CTA) ── */}
        <div className="py-12 sm:py-16 lg:py-20 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 content-center pr-8 lg:pr-12">

          {/* Pages nav */}
          <div>
            <h3 className="text-gray-500 font-medium text-xs uppercase tracking-widest mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/buy" className="text-gray-700 hover:text-red-600 transition-colors text-base">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/sell" className="text-gray-700 hover:text-red-600 transition-colors text-base">
                  Sell
                </Link>
              </li>
              <li>
                <Link href="/home-value" className="text-gray-700 hover:text-red-600 transition-colors text-base">
                  Home Value
                </Link>
              </li>
              <li>
                <Link href="/start-your-search" className="text-gray-700 hover:text-red-600 transition-colors text-base">
                  Start Your Search
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA block */}
          <div className="flex flex-col justify-start">
            <h3 className="text-gray-500 font-medium text-xs uppercase tracking-widest mb-4">Get Started</h3>
            <p className="text-gray-900 font-semibold text-base leading-snug mb-2">
              Thinking about buying or selling?
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Book a consultation or ask a quick question.
            </p>
            <button
              onClick={() => setConsultOpen(true)}
              className="w-full text-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium tracking-wide py-2.5 px-5 transition-colors mb-3"
            >
              Book a Consult
            </button>
            <a
              href="mailto:rob@hamadehomes.com"
              className="text-center text-gray-500 hover:text-red-600 text-sm transition-colors underline underline-offset-4"
            >
              Ask a Quick Question
            </a>
          </div>

        </div>

        {/* ── COLUMN 3: square map — desktop only, full row height ── */}
        <div
          className="hidden lg:block self-stretch"
          style={{ aspectRatio: '1 / 1' }}
        >
          <iframe
            src={MAP_SRC}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          />
        </div>

        {/* ── Mobile map (square, full width, stacked below) ── */}
        <div className="aspect-square w-full lg:hidden">
          <iframe
            src={MAP_SRC}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location Map"
          />
        </div>
      </div>

      {/* ── Dark legal / compliance strip ── */}
      <div className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-sm text-gray-400">
            <div>
              <p>&copy; 2026 Hamade Homes. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <p className="flex items-center gap-2">
                <span className="text-red-600 font-bold">®</span>
                REALTOR® is a trademark of the National Association of REALTORS®
              </p>
              <a href="#" className="hover:text-white transition-colors">
                Fair Housing
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
