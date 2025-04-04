import { Metadata } from 'next';
import CategoryClient from '@/components/CategoryClient';
import { getPlacesByCategory } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Restaurants in Santiago | Chi Voyage',
  description: 'Discover the best restaurants in Santiago with Chi Voyage. Find detailed information about locations, ratings, and reviews.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function RestaurantsPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  // Fetch initial data on the server
  const initialData = await getPlacesByCategory('restaurant', 1, 12, searchParams.search);

  return (
    <CategoryClient 
      initialData={initialData} 
      category="restaurant" 
      categoryTitle="Restaurants"
      initialSearchQuery={searchParams.search}
    />
  );
} 