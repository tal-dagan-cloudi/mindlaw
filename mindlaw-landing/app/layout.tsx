import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
