'use client';

import { Facebook, Linkedin, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.7658484287867!2d-83.78391!3d42.52941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ac94fff5ec99%3A0x1a8c5e4e7a8e5e5e!2s130%20W%20Grand%20River%20Ave%2C%20Brighton%2C%20MI%2048116!5e0!3m2!1sen!2sus!4v1645000000000!5m2!1sen!2sus';

export function Footer() {
  return (
    <footer className="bg-white">
      {/* White section — position:relative so the map can be absolutely anchored */}
      <div className="relative flex flex-col lg:flex-row lg:items-stretch overflow-hidden">

        {/* ── LEFT column: identity + contact ── */}
        <div className="flex-1 py-12 sm:py-16 lg:py-20 pl-8 sm:pl-12 lg:pl-16 pr-8 sm:pr-10 lg:pr-12 lg:pr-0">
          <div className="flex flex-col max-w-xs">
            <Image
              src="/KellerWilliams_Realty_Living_Logo_RGB.jpg"
              alt="KW Living - Keller Williams Realty"
              width={260}
              height={70}
              className="mb-7"
            />

            <div className="space-y-1 mb-5">
              <p className="text-gray-900 text-lg font-medium">130 W Grand River Ave.</p>
              <p className="text-gray-900 text-lg">Brighton, MI 48178</p>
            </div>

            <p className="text-gray-900 text-lg mb-7">
              Office{' '}
              <a href="tel:8102275500" className="hover:text-red-600 transition-colors">
                (810) 227-5500
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
              <a href="mailto:robhamade@kw.com" className="hover:text-red-600 transition-colors">
                robhamade@kw.com
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
                href="mailto:robhamade@kw.com"
                className="text-gray-900 hover:text-red-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* ── MIDDLE column: pages navigation ── */}
        <div className="py-12 sm:py-16 lg:py-20 px-10 lg:px-16 flex flex-col justify-center lg:border-l lg:border-gray-100">
          <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-5">Pages</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/buy" className="text-gray-700 hover:text-red-600 transition-colors">
                Buy
              </Link>
            </li>
            <li>
              <Link href="/sell" className="text-gray-700 hover:text-red-600 transition-colors">
                Sell
              </Link>
            </li>
            <li>
              <Link href="/home-value" className="text-gray-700 hover:text-red-600 transition-colors">
                Home Value
              </Link>
            </li>
            <li>
              <Link href="/start-your-search" className="text-gray-700 hover:text-red-600 transition-colors">
                Start Your Search
              </Link>
            </li>
          </ul>
        </div>

        {/* ── RIGHT column: full-height square map (desktop) ── */}
        {/*
          The map is absolutely positioned to fill the exact top/bottom of the white
          section. aspect-ratio:1/1 makes width === height automatically.
          A spacer div with the same aspect-ratio pushes the left columns left.
        */}
        <div
          className="hidden lg:block self-stretch"
          style={{ aspectRatio: '1 / 1', flexShrink: 0 }}
        >
          {/* Invisible spacer — reserves horizontal space equal to the map's width */}
        </div>

        <div
          className="hidden lg:block absolute top-0 right-0 bottom-0"
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
