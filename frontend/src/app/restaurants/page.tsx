import { Metadata } from 'next';
import CategoryClient from '@/components/CategoryClient';
import { getPlacesByCategory } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Restaurants in Santiago | ChiVoyage',
  description: 'Discover the best restaurants in Santiago, Chile. From local favorites to international cuisine, find your next dining destination.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function RestaurantsPage() {
  const initialData = await getPlacesByCategory('restaurant', 1);
  
  return (
    <CategoryClient 
      category="restaurant"
      initialData={initialData}
      categoryTitle="Restaurants"
    />
  );
} 