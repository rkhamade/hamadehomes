import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Your Home Search in Oakland County Michigan | Hamade Homes',
  description:
    'Get matched with homes based on budget, timeline, and location goals. Hamade Homes primarily serves Oakland County, with additional coverage across Livingston County, western Wayne County, and northern Washtenaw County.',
};

export default function StartYourSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
