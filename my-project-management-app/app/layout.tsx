import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import clsx from 'clsx';
import './globals.css';
import { SuperTokensInit } from '@/components/SupertokensInit';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oneday - Project Management Tool',
  description: 'Modern project management solution',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(dmSans.className, 'antialiased')}>{children}</body>
      <SuperTokensInit />
    </html>
  );
}
