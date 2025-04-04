import { Metadata } from 'next';
import { getPlacesByCategory } from '@/lib/api';
import CategoryClient from '@/components/CategoryClient';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: 'Activities | Chi Voyage',
  description: 'Discover exciting activities and things to do in Chicago.',
};

export default async function ActivitiesPage({ searchParams }: Props) {
  const initialData = await getPlacesByCategory('activity', 1, 12, searchParams.search as string);
  
  return (
    <CategoryClient
      initialData={initialData}
      category="activity"
      categoryTitle="Activities"
      initialSearchQuery={searchParams.search as string}
    />
  );
} 