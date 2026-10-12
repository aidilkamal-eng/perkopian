import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/src/components/Providers';

export const metadata: Metadata = {
  title: 'Perkopian - Find Work-Friendly Cafés',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}