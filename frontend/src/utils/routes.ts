import { MetadataRoute } from 'next'
import { Place } from '@/types'
import { Neighborhood } from '@/data/neighborhoods'

// Define the structure of your routes
interface Route {
  path: string
  priority?: number
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  lastModified?: Date
}

// Define your static routes
export const staticRoutes: Route[] = [
  {
    path: '/',
    priority: 1,
    changeFrequency: 'daily',
  },
  {
    path: '/about',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/contact',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
  {
    path: '/privacy',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/terms',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/faq',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/help',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  {
    path: '/careers',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  {
    path: '/cookies',
    priority: 0.3,
    changeFrequency: 'yearly',
  },
  {
    path: '/search',
    priority: 0.9,
    changeFrequency: 'daily',
  },
  {
    path: '/blog',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  {
    path: '/activities',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/events',
    priority: 0.9,
    changeFrequency: 'daily',
  },
  {
    path: '/attractions',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/restaurants',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/neighborhoods',
    priority: 0.8,
    changeFrequency: 'monthly',
  },
]

// Function to get all dynamic routes (you'll need to implement this based on your data)
export async function getDynamicRoutes(baseUrl: string): Promise<Route[]> {
  try {
    // Fetch all places with pagination
    let allPlaces: Place[] = [];
    let currentPage = 1;
    const pageSize = 12; // Match the backend's default page size
    let hasMorePages = true;
    
    while (hasMorePages) {
      const placesUrl = `${baseUrl}/places?page=${currentPage}&pageSize=${pageSize}`;
      const placesResponse = await fetch(placesUrl, {
        cache: 'no-store',
      });
      
      if (!placesResponse.ok) {
        console.error('Failed to fetch places:', {
          status: placesResponse.status,
          statusText: placesResponse.statusText,
          url: placesResponse.url
        });
        break;
      }
      
      const placesData = await placesResponse.json();
      const places = placesData.places || [];
      allPlaces = [...allPlaces, ...places];
      
      // Check if there are more pages based on the total and pageSize
      const total = placesData.total || 0;
      const totalPages = Math.ceil(total / pageSize);
      hasMorePages = currentPage < totalPages;
      currentPage++;
    }
    
    console.log(`Total places found: ${allPlaces.length}`);
    
    // Map places to routes
    const placeRoutes = allPlaces.map((place: Place) => {
      const categoryPath = place.category === 'activity' ? 'activities' :
                         place.category === 'restaurant' ? 'restaurants' :
                         place.category === 'attraction' ? 'attractions' :
                         place.category === 'event' ? 'events' : 'other';
      
      const route: Route = {
        path: `/${categoryPath}/${place.slug}`,
        priority: 0.9,
        changeFrequency: place.category === 'event' ? 'daily' : 'weekly',
        lastModified: place.updated_at ? new Date(place.updated_at) : new Date(),
      };
      
      return route;
    });
    
    // Fetch neighborhoods
    const neighborhoodsUrl = `${baseUrl}/neighborhoods`;
    const neighborhoodsResponse = await fetch(neighborhoodsUrl, {
      cache: 'no-store',
    });
    
    if (!neighborhoodsResponse.ok) {
      console.error('Failed to fetch neighborhoods:', {
        status: neighborhoodsResponse.status,
        statusText: neighborhoodsResponse.statusText,
        url: neighborhoodsResponse.url
      });
      return placeRoutes;
    }
    
    const neighborhoodsData = await neighborhoodsResponse.json();
    const neighborhoods = neighborhoodsData.neighborhoods || [];
    
    // Map neighborhoods to routes
    const neighborhoodRoutes = neighborhoods.map((neighborhood: Neighborhood) => {
      const route: Route = {
        path: `/neighborhoods/${neighborhood.slug}`,
        priority: 0.8,
        changeFrequency: 'monthly',
        lastModified: new Date(),
      };
      
      return route;
    });
    
    const allDynamicRoutes = [...placeRoutes, ...neighborhoodRoutes];
    console.log(`Total dynamic routes generated: ${allDynamicRoutes.length}`);
    
    return allDynamicRoutes;
  } catch (error) {
    console.error('Error in getDynamicRoutes:', error);
    return [];
  }
}

// Function to generate the complete sitemap
export async function generateSitemap(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const staticSitemapEntries = staticRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const dynamicRoutes = await getDynamicRoutes(baseUrl)
  const dynamicSitemapEntries = dynamicRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified || new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...staticSitemapEntries, ...dynamicSitemapEntries]
} 