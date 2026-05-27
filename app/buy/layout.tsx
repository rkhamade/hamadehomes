import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy a home in Oakland County | Hamade Homes',
  description: 'Expert buyer representation in Oakland County, with additional coverage across Livingston County, western Wayne County, and northern Washtenaw County. Strategic guidance, strong negotiation, and local insight for your home purchase.',
};

export default function BuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
