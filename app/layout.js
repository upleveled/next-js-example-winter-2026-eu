import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from './Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const dynamic = 'force-dynamic';

export const metadata = {
  title: {
    // If metadata exported from page, it will replace `%s` with the page title
    template: '%s - Widgets Anonymous',
    // If no metadata exported from page, it will use this default
    default: 'Widgets Anonymous',
  },
  description: 'Widgets Anonymous page without description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main>
          {
            // Page content
            children
          }
        </main>
      </body>
    </html>
  );
}
