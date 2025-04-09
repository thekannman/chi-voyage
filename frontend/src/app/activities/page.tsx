import { Metadata } from 'next';
import { getPlacesByCategory } from '@/lib/api';
import CategoryClient from '@/components/CategoryClient';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
  title: 'Activities | Chi Voyage',
  description: 'Discover exciting activities and things to do in Chicago.',
};

export default async function ActivitiesPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const initialData = await getPlacesByCategory('activity', 1, 12, resolvedSearchParams.search as string);
  
  return (
    <CategoryClient
      initialData={initialData}
      category="activity"
      categoryTitle="Activities"
      categorySlug="activities"
      initialSearchQuery={resolvedSearchParams.search as string}
    />
  );
} 