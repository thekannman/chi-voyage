import { Metadata } from 'next';
import { getPlacesByCategory } from '@/lib/api';
import CategoryClient from '@/components/CategoryClient';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
  title: 'Restaurants | Chi Voyage',
  description: 'Discover the best restaurants and dining experiences in Chicago.',
};

export default async function RestaurantsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const initialData = await getPlacesByCategory('restaurant', 1, 12, resolvedSearchParams.search as string);
  
  return (
    <CategoryClient
      initialData={initialData}
      category="restaurant"
      categoryTitle="Restaurants"
      categorySlug="restaurants"
      initialSearchQuery={resolvedSearchParams.search as string}
    />
  );
} 