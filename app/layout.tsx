import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/src/components/Providers';
import { EB_Garamond, Outfit, Inter, Kalam } from 'next/font/google';

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

const handwriting = Kalam({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-handwriting',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${heading.variable} ${subHeading.variable} ${body.variable} ${handwriting.variable}`}>
      <body className='font-body bg-cream text-espresso'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}