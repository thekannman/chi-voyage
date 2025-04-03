'use client';

import React, { useEffect } from 'react';
import { getPlacesByCategory } from '@/lib/api';
import { Place } from '@/types';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { StarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

interface PlacesResponse {
  places: Place[];
  total: number;
}

interface ActivitiesClientProps {
  initialData: PlacesResponse;
}

export default function ActivitiesClient({ initialData }: ActivitiesClientProps) {
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
    queryKey: ['activities'],
    queryFn: async ({ pageParam = 1 }) => {
      return getPlacesByCategory('activity', pageParam);
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
      <h1 className="text-4xl font-bold mb-8">Activities in Chicago</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((page: PlacesResponse, i: number) => (
          <React.Fragment key={i}>
            {page.places.map((activity: Place) => (
              <Link 
                href={`/activities/${activity.slug}`} 
                key={activity.id}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
                  <div className="relative aspect-[4/3] w-full">
                    <ImageWithFallback
                      src={activity.imagePath}
                      alt={activity.title}
                      fill
                      containerHeight="aspect-[4/3]"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
                    {activity.location && (
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        <span>{activity.location}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      {activity.rating && (
                        <div className="flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{activity.rating}</span>
                        </div>
                      )}
                      {activity.price_range && (
                        <div className="flex items-center text-gray-600">
                          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                          <span>{activity.price_range}</span>
                        </div>
                      )}
                    </div>
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
          <div>Loading more activities...</div>
        ) : hasNextPage ? (
          <div>Load more</div>
        ) : (
          <div>No more activities to load</div>
        )}
      </div>
    </div>
  );
} 