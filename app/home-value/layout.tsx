import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Value Oakland County MI | Hamade Homes',
  description: 'Get an accurate home value in Oakland County MI. Hamade Homes provides structured market analysis across Oakland County and parts of Livingston County.',
};

export default function HomeValueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
