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
 title: 'راهکارهای دیجیتال امارات - آژانس راهکارهای دیجیتال',
 description: 'کسب‌وکار خود را با راهکارهای دیجیتال پیشرفته تبدیل کنید',
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
 <html lang="fa" dir="rtl" suppressHydrationWarning={true} className={inter.variable}>
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