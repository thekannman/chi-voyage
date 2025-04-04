import { Metadata } from 'next';
import { getPlacesByCategory } from '@/lib/api';
import CategoryClient from '@/components/CategoryClient';

export const metadata: Metadata = {
  title: 'Chicago Activities | Chi Voyage',
  description: 'Discover exciting activities in Chicago. From sports to entertainment, find the perfect things to do in the Windy City.',
  keywords: 'Chicago activities, things to do in Chicago, Chicago entertainment, Chicago sports',
};

export const revalidate = 3600;

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  // Fetch initial data on the server
  const initialData = await getPlacesByCategory('activity', 1, 12, searchParams.search);

  return (
    <CategoryClient 
      initialData={initialData} 
      category="activity" 
      categoryTitle="Activities"
      initialSearchQuery={searchParams.search}
    />
  );
} 