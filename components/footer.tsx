'use client';

import { Facebook, Linkedin, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex flex-col justify-center">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/1/1c/Keller_Williams_Realty_logo.svg"
                alt="KW Living - Keller Williams Realty"
                width={300}
                height={80}
                className="mb-8"
              />

              <div className="space-y-2 mb-6">
                <p className="text-gray-900 text-lg font-medium">130 W Grand River Ave.</p>
                <p className="text-gray-900 text-lg">Brighton, MI 48178</p>
              </div>

              <p className="text-gray-900 text-lg mb-8">
                Office <a href="tel:8102275500" className="hover:text-red-600 transition-colors">(810) 227-5500</a>
              </p>

              <div className="border-t border-gray-300 pt-6 mb-6" />

              <div className="space-y-3 mb-6">
                <p className="text-gray-900 text-xl font-semibold">Robert Hamade</p>
                <p className="text-gray-900">REALTOR®</p>
                <p className="text-gray-600">6501466891</p>
              </div>

              <p className="text-gray-900 mb-4">
                Mobile <a href="tel:2482479014" className="hover:text-red-600 transition-colors">(248) 247-9014</a>
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

            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-4">Pages</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">Home</Link>
                  </li>
                  <li>
                    <Link href="/buy" className="text-gray-700 hover:text-red-600 transition-colors">Buy</Link>
                  </li>
                  <li>
                    <Link href="/sell" className="text-gray-700 hover:text-red-600 transition-colors">Sell</Link>
                  </li>
                  <li>
                    <Link href="/home-value" className="text-gray-700 hover:text-red-600 transition-colors">Home Value</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2943.7658484287867!2d-83.78391!3d42.52941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824ac94fff5ec99%3A0x1a8c5e4e7a8e5e5e!2s130%20W%20Grand%20River%20Ave%2C%20Brighton%2C%20MI%2048116!5e0!3m2!1sen!2sus!4v1645000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              />
            </div>
          </div>
        </div>
      </div>

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
