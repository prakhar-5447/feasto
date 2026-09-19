import type { Metadata } from 'next';
import { poppins } from './font';
import StoreProvider from '@/store/store-provider';
import './globals.sass';

export const metadata: Metadata = {
  title: 'Feasto - Restaurant Partner',
  description: 'Restaurant Partner Dashboard for Feasto',
};

export default function RootLayout({
  children,
}: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}