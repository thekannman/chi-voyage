'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { getPlacesByCategory } from '@/lib/api';
import { Place } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { StarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import SearchAndFilters from '@/components/SearchAndFilters';

interface PlacesResponse {
  places: Place[];
  total: number;
}

interface RestaurantsClientProps {
  initialData: PlacesResponse;
  searchQuery?: string;
}

export default function RestaurantsClient({ initialData, searchQuery: initialSearchQuery = '' }: RestaurantsClientProps) {
  const { ref, inView } = useInView();
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [priceRange, setPriceRange] = useState('');
  const [rating, setRating] = useState('');
  const [subtype, setSubtype] = useState('');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching,
    refetch
  } = useInfiniteQuery({
    queryKey: ['restaurants', searchQuery, priceRange, rating, subtype],
    queryFn: async ({ pageParam = 1 }) => {
      return getPlacesByCategory('restaurant', pageParam, 12, searchQuery, priceRange, rating, subtype);
    },
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PlacesResponse, pages: PlacesResponse[]) => {
      const totalPages = Math.ceil(lastPage.total / 12);
      return pages.length < totalPages ? pages.length + 1 : undefined;
    },
    staleTime: Infinity, // Never mark as stale
    refetchOnMount: false, // Don't refetch on mount
    refetchOnWindowFocus: false, // Don't refetch on window focus
    enabled: true, // Always fetch data
  });

  // Get unique subtypes from all places
  const availableSubtypes = useMemo(() => {
    if (!data) return [];
    const subtypes = new Set<string>();
    data.pages.forEach(page => {
      page.places.forEach(place => {
        if (place.details?.subtypes) {
          place.details.subtypes.forEach(subtype => subtypes.add(subtype));
        }
      });
    });
    return Array.from(subtypes).sort();
  }, [data]);

  // Reset query data when filters change
  useEffect(() => {
    if (searchQuery !== '' || priceRange !== '' || rating !== '' || subtype !== '') {
      refetch();
    }
  }, [searchQuery, priceRange, rating, subtype, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Get all places from all pages
  const places = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.places);
  }, [data]);

  if (status === 'error') return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Restaurants in Chicago</h1>
        
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          rating={rating}
          onRatingChange={setRating}
          subtype={subtype}
          onSubtypeChange={setSubtype}
          availableSubtypes={availableSubtypes}
        />
        
        {isFetching && !data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="aspect-[16/9] bg-gray-200" />
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((restaurant: Place) => (
                <Link 
                  href={`/restaurants/${restaurant.slug}`} 
                  key={restaurant.id}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
                    <div className="relative aspect-[16/9] w-full">
                      <ImageWithFallback
                        src={restaurant.imagePath}
                        alt={restaurant.title}
                        fill
                        containerHeight="aspect-[16/9]"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{restaurant.title}</h2>
                      {restaurant.location && (
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{restaurant.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-gray-600 mb-2">
                        {restaurant.rating && (
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{Number(restaurant.rating).toFixed(1)}</span>
                            {restaurant.reviews_count && (
                              <span className="text-sm ml-1">({restaurant.reviews_count})</span>
                            )}
                          </div>
                        )}
                        {restaurant.price_range && (
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                            <span>{restaurant.price_range}</span>
                          </div>
                        )}
                      </div>
                      {restaurant.details?.subtypes && restaurant.details.subtypes.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {restaurant.details.subtypes.slice(0, 2).map((subtype) => (
                            <span
                              key={subtype}
                              className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium"
                            >
                              {subtype}
                            </span>
                          ))}
                          {restaurant.details.subtypes.length > 2 && (
                            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
                              +{restaurant.details.subtypes.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Loading indicator */}
            <div ref={ref} className="flex justify-center items-center py-8">
              {isFetchingNextPage ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                      <div className="aspect-[16/9] bg-gray-200" />
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : hasNextPage ? (
                <div className="text-gray-600">Load more</div>
              ) : (
                <div className="text-gray-600">No more restaurants to load</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 