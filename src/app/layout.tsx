import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breaking Waves - Boat Maintenance',
  description: 'Boat maintenance tracking for Breaking Waves sailing organization',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
