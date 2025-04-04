import { Place, Neighborhood } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getAllPlaces(
  page: number = 1,
  pageSize: number = 12,
  search?: string,
  priceRange?: string,
  rating?: string,
  subtype?: string
): Promise<{ places: Place[], total: number }> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(search && search.trim() !== '' && { search: search.trim() }),
    ...(priceRange && priceRange.trim() !== '' && { priceRange: priceRange.trim() }),
    ...(rating && rating.trim() !== '' && { rating: rating.trim() }),
    ...(subtype && subtype.trim() !== '' && { subtype: subtype.trim() })
  });

  const res = await fetch(`${API_BASE_URL}/places?${params.toString()}`, {
    next: {
      revalidate: 0 // Disable caching for this route
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch places');
  }
  
  const data = await res.json();
  console.log('API Response - getAllPlaces:', data);
  return data;
}

export async function getPlaceBySlug(slug: string): Promise<Place> {
  const res = await fetch(`${API_BASE_URL}/places/${slug}`, {
    next: {
      revalidate: 3600 // Revalidate every hour
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch place');
  }
  
  const data = await res.json();
  console.log('API Response - getPlaceBySlug:', data);
  return data;
}

export async function getPlacesByCategory(
  category: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other', 
  page: number = 1, 
  pageSize: number = 12,
  search?: string,
  priceRange?: string,
  rating?: string,
  subtype?: string
): Promise<{ places: Place[], total: number }> {
  const params = new URLSearchParams({
    category,
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(search && search.trim() !== '' && { search: search.trim() }),
    ...(priceRange && priceRange.trim() !== '' && { priceRange: priceRange.trim() }),
    ...(rating && rating.trim() !== '' && { rating: rating.trim() }),
    ...(subtype && subtype.trim() !== '' && { subtype: subtype.trim() })
  });

  const res = await fetch(
    `${API_BASE_URL}/places?${params.toString()}`, 
    {
      next: {
        revalidate: 0 // Disable caching for this route
      }
    }
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch places by category');
  }
  
  const data = await res.json();
  console.log('API Response - getPlacesByCategory:', { category, params: Object.fromEntries(params), data });
  return data;
}

export async function getAllNeighborhoods(): Promise<Neighborhood[]> {
  const res = await fetch(`${API_BASE_URL}/neighborhoods`, {
    next: {
      revalidate: 3600 // Revalidate every hour
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch neighborhoods');
  }
  
  const data = await res.json();
  console.log('API Response - getAllNeighborhoods:', data);
  return data;
}

export async function getNeighborhoodBySlug(slug: string): Promise<Neighborhood> {
  const res = await fetch(`${API_BASE_URL}/neighborhoods/${slug}`, {
    next: {
      revalidate: 3600 // Revalidate every hour
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch neighborhood');
  }
  
  const data = await res.json();
  console.log('API Response - getNeighborhoodBySlug:', data);
  return data;
}

export async function getNeighborhoodPlaces(neighborhoodId: string): Promise<Place[]> {
  const response = await fetch(`${API_BASE_URL}/neighborhoods/${neighborhoodId}/places`);
  if (!response.ok) {
    throw new Error('Failed to fetch neighborhood places');
  }
  const data = await response.json();
  console.log('API Response - getNeighborhoodPlaces:', data);
  return data;
}

export async function getSubtypesForCategory(
  category: 'activity' | 'restaurant' | 'attraction' | 'event' | 'other'
): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/categories/${category}/subtypes`, {
    next: {
      revalidate: 3600 // Revalidate every hour
    }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch subtypes');
  }
  
  const data = await res.json();
  console.log('API Response - getSubtypesForCategory:', data);
  return data;
} 