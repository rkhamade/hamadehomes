import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Your Home Search in Oakland County Michigan | Hamade Homes',
  description:
    'Get matched with homes based on budget, timeline, and location goals. Hamade Homes serves Oakland County, with additional coverage in parts of Livingston County.',
};

export default function StartYourSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
