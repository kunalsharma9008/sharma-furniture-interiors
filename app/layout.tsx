import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sharma Furnitures & Interiors | Home Design and Furniture in Pune',
  description: 'Sharma Furnitures & Interiors makes custom furniture and designs homes, kitchens, and offices in Pune, Maharashtra.',
  keywords: [
    'Sharma Furnitures',
    'Sharma Interiors Pune',
    'Home Design Pune',
    'Custom Furniture Pune',
    'Kitchen Design Pune',
    'Teak Furniture Pune',
    'Wardrobe Design Pune'
  ],
  authors: [{ name: 'Sharma Furnitures & Interiors' }],
  openGraph: {
    title: 'Sharma Furnitures & Interiors | Home Design and Furniture in Pune',
    description: 'We make custom furniture and design homes, kitchens, and offices in Pune, Maharashtra.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://sharmafurnitures.com',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FAF7F1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Material Symbols Outlined */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface font-body text-body-md text-on-surface antialiased selection:bg-sage/40 selection:text-on-surface min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
