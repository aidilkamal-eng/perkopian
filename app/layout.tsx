import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/src/components/Providers';
import { EB_Garamond, Outfit, Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Perkopian - Find Work-Friendly Cafés',
};

const heading = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const subHeading = Outfit({
  subsets: ['latin'],
  variable: '--font-sub-heading',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${heading.variable} ${subHeading.variable} ${body.variable}`}>
      <body className='font-body bg-cream text-espresso'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}