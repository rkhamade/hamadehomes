import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy a home in Oakland County | Hamade Homes',
  description: 'Expert buyer representation in Oakland County and Livingston County. Strategic guidance, strong negotiation, and local insight for your home purchase.',
};

export default function BuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
