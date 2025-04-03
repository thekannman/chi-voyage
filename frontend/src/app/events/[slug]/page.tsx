import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlaceBySlug, getAllPlaces } from '@/lib/api';
import { Place } from '@/types';
import Image from 'next/image';

interface EventPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getPlaceBySlug(params.slug);

  if (!event) {
    return {
      title: 'Event Not Found | Chi Voyage',
      description: 'The requested event could not be found.',
    };
  }

  return {
    title: `${event.title} | Chi Voyage`,
    description: event.description || '',
    openGraph: {
      title: `${event.title} | Chi Voyage`,
      description: event.description || '',
      images: event.imagePath ? [event.imagePath] : [],
    },
  };
}

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all events
export async function generateStaticParams() {
  const places = await getAllPlaces();
  return places
    .filter(place => place.category === 'event')
    .map((place) => ({
      slug: place.slug,
    }));
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getPlaceBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <div className="flex items-center mb-6">
          <span className="text-yellow-500">★</span>
          <span className="ml-1 text-xl">{event.rating}</span>
          <span className="mx-2">•</span>
          <span className="text-gray-600">{event.location}</span>
        </div>

        {event.imagePath && (
          <div className="relative h-96 w-full mb-8">
            <Image
              src={event.imagePath}
              alt={event.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <div className="prose max-w-none">
          <p className="text-lg mb-6">{event.description}</p>

          {event.price_range && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Price Range</h2>
              <p>{event.price_range}</p>
            </div>
          )}

          {event.working_hours && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Event Schedule</h2>
              <p>{JSON.stringify(event.working_hours)}</p>
            </div>
          )}

          {event.website && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Website</h2>
              <a 
                href={event.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Visit Website
              </a>
            </div>
          )}

          {event.phone && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Phone</h2>
              <a 
                href={`tel:${event.phone}`}
                className="text-gray-700 hover:text-gray-900"
              >
                {event.phone}
              </a>
            </div>
          )}

          {event.features && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Event Features</h2>
              <ul className="grid grid-cols-2 gap-2">
                {Object.entries(event.features).map(([key, value]) => (
                  <li key={key} className="flex items-center text-gray-700">
                    <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                    {key}: {String(value)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.reviews_count && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Reviews</h2>
              <p>{event.reviews_count} reviews</p>
            </div>
          )}

          {event.photos_count && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Photos</h2>
              <p>{event.photos_count} photos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 