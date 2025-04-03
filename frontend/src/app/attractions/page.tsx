import { Metadata } from 'next';
import { getPlacesByCategory } from '@/lib/api';
import CategoryClient from '@/components/CategoryClient';

export const metadata: Metadata = {
  title: 'Chicago Attractions | Chi Voyage',
  description: 'Explore Chicago\'s top attractions. From museums to landmarks, discover the best places to visit in the Windy City.',
  keywords: 'Chicago attractions, Chicago museums, Chicago landmarks, Chicago sightseeing',
};

export const revalidate = 3600; // Revalidate every hour

export default async function AttractionsPage() {
  // Fetch initial data on the server
  const initialData = await getPlacesByCategory('attraction', 1);

  return <CategoryClient initialData={initialData} category="attraction" categoryTitle="Attractions" />;
} 