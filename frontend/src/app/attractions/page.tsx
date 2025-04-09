import { Metadata } from 'next';
import { getPlacesByCategory } from '@/lib/api';
import CategoryClient from '@/components/CategoryClient';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
  title: 'Attractions | Chi Voyage',
  description: 'Explore the best attractions and landmarks in Chicago.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function AttractionsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const initialData = await getPlacesByCategory('attraction', 1, 12, resolvedSearchParams.search as string);
  
  return (
    <CategoryClient
      initialData={initialData}
      category="attraction"
      categoryTitle="Attractions"
      categorySlug="attractions"
      initialSearchQuery={resolvedSearchParams.search as string}
    />
  );
} 