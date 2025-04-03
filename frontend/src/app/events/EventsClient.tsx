'use client';

import React, { useEffect } from 'react';
import { getPlacesByCategory } from '@/lib/api';
import { Place } from '@/types';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { StarIcon, MapPinIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

interface PlacesResponse {
  places: Place[];
  total: number;
}

interface EventsClientProps {
  initialData: PlacesResponse;
}

export default function EventsClient({ initialData }: EventsClientProps) {
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['events'],
    queryFn: async ({ pageParam = 1 }) => {
      return getPlacesByCategory('event', pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PlacesResponse, pages: PlacesResponse[]) => {
      const totalPages = Math.ceil(lastPage.total / 12);
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
    staleTime: 3600000, // 1 hour
    refetchOnWindowFocus: false,
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isFetching && !data) return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Events in Chicago</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((page: PlacesResponse, i: number) => (
          <React.Fragment key={i}>
            {page.places.map((event: Place) => (
              <Link 
                href={`/events/${event.slug}`} 
                key={event.id}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
                  <div className="relative aspect-[16/9] w-full">
                    <ImageWithFallback
                      src={event.imagePath}
                      alt={event.title}
                      fill
                      containerHeight="aspect-[16/9]"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                    {event.location && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      {event.rating && (
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{event.rating}</span>
                        </div>
                      )}
                      {event.price_range && (
                        <div className="flex items-center text-gray-600">
                          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                          <span>{event.price_range}</span>
                        </div>
                      )}
                    </div>
                    {event.working_hours && (
                      <div className="mt-2 flex items-center text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm">Event Schedule Available</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </React.Fragment>
        ))}
      </div>
      
      {/* Loading indicator */}
      <div
        ref={ref}
        className="flex justify-center items-center py-8"
      >
        {isFetchingNextPage ? (
          <div>Loading more events...</div>
        ) : hasNextPage ? (
          <div>Load more</div>
        ) : (
          <div>No more events to load</div>
        )}
      </div>
    </div>
  );
} 