import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Chivoyage - Your Guide to Chicago',
    template: '%s | Chivoyage'
  },
  description: "Discover the best of Chicago with Chivoyage. Find restaurants, attractions, events, and activities in the Windy City.",
  keywords: ["Chicago", "travel", "restaurants", "attractions", "events", "activities", "tourism"],
  authors: [{ name: 'Chivoyage Team' }],
  creator: 'Chivoyage',
  publisher: 'Chivoyage',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://chivoyage.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Chivoyage - Your Guide to Chicago',
    description: 'Discover the best of Chicago with Chivoyage. Find restaurants, attractions, events, and activities in the Windy City.',
    url: 'https://chivoyage.com',
    siteName: 'Chivoyage',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'Chivoyage - Your Guide to Chicago',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chivoyage - Your Guide to Chicago',
    description: 'Discover the best of Chicago with Chivoyage. Find restaurants, attractions, events, and activities in the Windy City.',
    images: ['/twitter-image.jpg'], // You'll need to add this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
