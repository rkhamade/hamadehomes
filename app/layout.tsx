import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hamade Homes | Oakland County Real Estate',
  description: 'Expert real estate services in Oakland County and Livingston County. Strategic guidance for buyers, sellers, and investors.',
  metadataBase: new URL('https://hamadehomes.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
document.addEventListener("DOMContentLoaded", function () {

  // Pages or paths where the REAL ESTATE AI should NOT load
  const excludedPaths = ["/multimodal", "/demo"];
  const currentPath = window.location.pathname;
  if (excludedPaths.some(path => currentPath.startsWith(path))) return;

  // Bot/crawler detection (used ONLY to disable auto-open for bots)
  const ua = (navigator.userAgent || "").toLowerCase();
  const botPattern =
    /(bot|crawler|spider|crawling|preview|slurp|baidu|bing|duckduck|yandex|yahoo|sogou|exabot|facebot|ia_archiver|mediapartners|lighthouse|pagespeed|headless|prerender)/i;

  const IS_BOT =
    botPattern.test(ua) ||
    navigator.webdriver === true ||
    !navigator.languages ||
    navigator.languages.length === 0;

  // Prevent double init / duplicate script injection
  if (window.__VG_INIT_DONE__) return;
  window.__VG_INIT_DONE__ = true;

  // Create container (launcher will exist for both humans + bots)
  const container = document.createElement("div");
  container.style.width = "0";
  container.style.height = "0";
  container.id = "VG_OVERLAY_CONTAINER";
  document.body.appendChild(container);

  // Config
  window.VG_CONFIG = {
    ID: "2hjh7fpxm13649bv",
    region: "na",
    render: "bottom-right",
    stylesheets: [
      "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
    ],

    // Humans: auto-open + intro can happen as normal
    // Bots: launcher shows, but no auto-open/intro until they click
    openOnLoad: IS_BOT ? false : true,

    // Extra compatibility (ignored if not supported)
    autoOpen: IS_BOT ? false : true,
    proactive: IS_BOT ? false : true
  };

  // Load script once
  if (!document.querySelector('script[src*="vg_bundle.js"]')) {
    const VG_SCRIPT = document.createElement("script");
    VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
    VG_SCRIPT.defer = true;
    document.body.appendChild(VG_SCRIPT);
  }

});
            `,
          }}
        />
      </body>
    </html>
  );
}
