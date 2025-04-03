import { Metadata } from 'next';
import EventsClient from './EventsClient';
import { getPlacesByCategory } from '@/lib/api';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Chicago Events | Chi Voyage',
  description: 'Discover upcoming events in Chicago. From festivals to concerts, find the best events happening in the Windy City.',
  keywords: 'Chicago events, Chicago festivals, Chicago concerts, Chicago entertainment',
};

export default async function EventsPage() {
  // Fetch initial data on the server
  const initialData = await getPlacesByCategory('event', 1);

  return <EventsClient initialData={initialData} />;
} 