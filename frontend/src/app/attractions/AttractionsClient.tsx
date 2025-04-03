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

interface AttractionsClientProps {
  initialData: PlacesResponse;
}

export default function AttractionsClient({ initialData }: AttractionsClientProps) {
  const { ref, inView } = useInView();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [rating, setRating] = useState('');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['attractions'],
    queryFn: async ({ pageParam = 1 }) => {
      return getPlacesByCategory('attraction', pageParam);
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
    staleTime: 3600000, // 1 hour
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Filter and search the places
  const filteredPlaces = useMemo(() => {
    if (!data) return [];
    
    return data.pages.flatMap(page => page.places).filter(place => {
      const matchesSearch = searchQuery === '' || 
        place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.location?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = priceRange === '' || 
        place.price_range === priceRange;
      
      const matchesRating = rating === '' || 
        (place.rating && Number(place.rating) >= Number(rating));
      
      return matchesSearch && matchesPrice && matchesRating;
    });
  }, [data, searchQuery, priceRange, rating]);

  if (status === 'error') return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Attractions in Chicago</h1>
        
        <SearchAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          rating={rating}
          onRatingChange={setRating}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((attraction: Place) => (
            <Link 
              href={`/attractions/${attraction.slug}`} 
              key={attraction.id}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 group-hover:scale-105">
                <div className="relative aspect-[16/9] w-full">
                  <ImageWithFallback
                    src={attraction.imagePath}
                    alt={attraction.title}
                    fill
                    containerHeight="aspect-[16/9]"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{attraction.title}</h2>
                  {attraction.location && (
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{attraction.location}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    {attraction.rating && (
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{Number(attraction.rating).toFixed(1)}</span>
                      </div>
                    )}
                    {attraction.price_range && (
                      <div className="flex items-center text-gray-600">
                        <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                        <span>{attraction.price_range}</span>
                      </div>
                    )}
                  </div>
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
            <div className="text-gray-600">No more attractions to load</div>
          )}
        </div>
      </div>
    </div>
  );
} 