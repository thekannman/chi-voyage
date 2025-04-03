'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { getPlacesByCategory, getSubtypesForCategory } from '@/lib/api';
import { Place } from '@/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import ImageWithFallback from '@/components/ImageWithFallback';
import { StarIcon, MapPinIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import SearchAndFilters from '@/components/SearchAndFilters';
import { useDebounce } from '@/hooks/useDebounce';

interface PlacesResponse {
  places: Place[];
  total: number;
}

interface CategoryClientProps {
  initialData: PlacesResponse;
  category: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other';
  categoryTitle: string;
}

// Add mapping for category URLs
const categoryUrls: Record<CategoryClientProps['category'], string> = {
  activity: 'activities',
  restaurant: 'restaurants',
  attraction: 'attractions',
  event: 'events',
  other: 'other'
};

export default function CategoryClient({ initialData, category, categoryTitle }: CategoryClientProps) {
  const { ref, inView } = useInView();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [priceRange, setPriceRange] = useState('');
  const [rating, setRating] = useState('');
  const [subtype, setSubtype] = useState('');

  // Fetch available subtypes for this category
  const { data: availableSubtypes = [] } = useQuery({
    queryKey: ['subtypes', category],
    queryFn: () => getSubtypesForCategory(category),
    staleTime: Infinity,
  });

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isFetching
  } = useInfiniteQuery<PlacesResponse>({
    queryKey: [category, debouncedSearchQuery, priceRange, rating, subtype],
    queryFn: async ({ pageParam = 1 }: { pageParam: unknown }): Promise<PlacesResponse> => {
      const page = typeof pageParam === 'number' ? pageParam : 1;
      
      // Always get fresh data from the API
      const response = await getPlacesByCategory(category, page, 12, debouncedSearchQuery, priceRange, rating, subtype);
      
      // For pages after the first, check if we've already loaded all results
      if (page > 1) {
        const itemsSoFar = (page - 1) * 12;
        // If we've already loaded all items, return empty result
        if (itemsSoFar >= response.total) {
          return { places: [], total: response.total };
        }
      }
      
      return response;
    },
    initialData: {
      pages: [initialData],
      pageParams: [1],
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PlacesResponse, pages: PlacesResponse[]) => {
      // If we have no places, we're done
      if (!lastPage.places.length) {
        return undefined;
      }
      
      // Calculate total pages based on total count
      const totalPages = Math.ceil(lastPage.total / 12);
      
      // If we've reached the total number of pages, stop pagination
      if (pages.length >= totalPages) {
        return undefined;
      }
      
      // Return next page number
      return pages.length + 1;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: true
  });

  // Reset query data when filters change
  useEffect(() => {
    // The queryKey change will automatically trigger a refetch from the beginning
    // No need to call refetch() explicitly
  }, [debouncedSearchQuery, priceRange, rating, subtype]);

  useEffect(() => {
    // Only fetch next page if we're in view AND have a next page AND aren't currently fetching
    // AND we have more than one page of results
    if (inView && hasNextPage && !isFetchingNextPage && !isFetching) {
      const lastPage = data?.pages[data.pages.length - 1];
      // Only fetch page 2 if we have the page 1 response and it shows more than 12 results
      if (lastPage && lastPage.total > 12) {
        fetchNextPage();
      }
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching, data]);

  // Get all places from all pages
  const places = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.places);
  }, [data]);

  // Show loading state only when filters change
  const isLoading = isFetching && (debouncedSearchQuery || priceRange || rating || subtype);

  // Calculate if we've reached the end of results
  const hasReachedEnd = useMemo(() => {
    if (!data || data.pages.length === 0) return true;
    const lastPage = data.pages[data.pages.length - 1];
    return lastPage.places.length < 12 || data.pages.length * 12 >= lastPage.total;
  }, [data]);

  if (status === 'error') return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{categoryTitle} in Chicago</h1>
        
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
        
        {isLoading ? (
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
        ) : places.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {debouncedSearchQuery || priceRange || rating || subtype
                ? "No places found matching your filters. Try adjusting your search criteria."
                : `No ${categoryTitle.toLowerCase()} found.`}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place: Place) => (
                <Link 
                  href={`/${categoryUrls[category]}/${place.slug}`} 
                  key={place.id}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
                    <div className="relative aspect-[16/9] w-full">
                      <ImageWithFallback
                        src={place.imagePath}
                        alt={place.title}
                        fill
                        containerHeight="aspect-[16/9]"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{place.title}</h2>
                      {place.location && (
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (place.location) {
                                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.location)}`, '_blank');
                              }
                            }}
                            className="hover:text-blue-600 hover:underline text-left"
                          >
                            {place.location}
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-gray-600 mb-2">
                        {place.rating && (
                          <div className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{Number(place.rating).toFixed(1)}</span>
                            {place.reviews_count && (
                              <span className="text-sm ml-1">({place.reviews_count} reviews)</span>
                            )}
                          </div>
                        )}
                        {place.price_range && (
                          <div className="flex items-center">
                            <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                            <span>{place.price_range}</span>
                          </div>
                        )}
                      </div>
                      {place.details?.subtypes && place.details.subtypes.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {place.details.subtypes.slice(0, 2).map((subtype) => (
                            <span
                              key={subtype}
                              className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium"
                            >
                              {subtype}
                            </span>
                          ))}
                          {place.details.subtypes.length > 2 && (
                            <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
                              +{place.details.subtypes.length - 2} more
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
              ) : hasReachedEnd ? (
                <div className="text-gray-600">No more {categoryTitle.toLowerCase()} to load</div>
              ) : (
                <div className="text-gray-600">Load more</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 