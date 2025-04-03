import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chicago Restaurants | Chi Voyage',
  description: 'Discover the best restaurants in Chicago. From Michelin-starred dining to local favorites, find where to eat in the Windy City.',
  keywords: 'Chicago restaurants, best restaurants in Chicago, Chicago dining, Chicago food',
  openGraph: {
    title: 'Chicago Restaurants | Chi Voyage',
    description: 'Discover the best restaurants in Chicago. From Michelin-starred dining to local favorites, find where to eat in the Windy City.',
    images: ['/images/restaurants/header.jpg'],
  },
};

export default function RestaurantsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 