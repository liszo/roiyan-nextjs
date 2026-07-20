import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import ChatWidget from '@/components/ChatWidget';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocaleProvider from '@/components/LocaleProvider';

const inter = Inter({
 subsets: ['latin'],
 variable: '--font-inter'
});

// Farsi fonts from Google Fonts (web imports handled via CSS)
// These fonts will be loaded dynamically based on locale

export const metadata: Metadata = {
 title: 'UAE Digital - Digital Solutions Agency',
 description: 'Transform your business with cutting-edge digital solutions',
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="en" suppressHydrationWarning={true} className={inter.variable}>
 <body suppressHydrationWarning={true}>
  <LocaleProvider>
   <Header />
   <main>{children}</main>
   <Footer />
   <ChatWidget />
  </LocaleProvider>
 </body>
 </html>
 );
}