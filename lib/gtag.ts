type GTagParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(eventName: string, params?: GTagParams): void {
  if (typeof window === 'undefined') return;
  const win = window as typeof window & { gtag?: (...args: unknown[]) => void };
  if (typeof win.gtag !== 'function') return;
  win.gtag('event', eventName, params ?? {});
}
