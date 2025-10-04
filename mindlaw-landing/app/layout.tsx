import type { Metadata } from 'next';
import { Inter, Playfair_Display, Noto_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
  weight: ['100', '400', '700'],
});

export const metadata: Metadata = {
  title: 'mindlaw - AI-Powered Legal Intelligence Platform',
  description: 'Next-generation AI platform transforming legal workflows with advanced document analysis, intelligent research, and automated compliance solutions.',
  keywords: ['legal AI', 'legal tech', 'document analysis', 'legal research', 'compliance automation', 'mindlaw'],
  openGraph: {
    title: 'mindlaw - AI-Powered Legal Intelligence Platform',
    description: 'Transform your legal practice with cutting-edge AI technology',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${notoSans.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
