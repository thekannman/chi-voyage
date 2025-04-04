import { Metadata } from 'next';
import { getPlacesByCategory } from '@/lib/api';
import CategoryClient from '@/components/CategoryClient';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Events | Chi Voyage',
  description: 'Find upcoming events and happenings in Chicago.',
};

export default async function EventsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const initialData = await getPlacesByCategory('event', 1, 12, resolvedSearchParams.search as string);
  
  return (
    <CategoryClient
      initialData={initialData}
      category="event"
      categoryTitle="Events"
      initialSearchQuery={resolvedSearchParams.search as string}
    />
  );
} 