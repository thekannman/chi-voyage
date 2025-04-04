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
    console.log('Starting getDynamicRoutes...');
    
    // Fetch places
    const placesUrl = `${baseUrl}/places`;
    console.log('Fetching places from:', placesUrl);
    const placesResponse = await fetch(placesUrl, {
      cache: 'no-store', // Disable caching for debugging
    });
    
    if (!placesResponse.ok) {
      console.error('Failed to fetch places:', {
        status: placesResponse.status,
        statusText: placesResponse.statusText,
        url: placesResponse.url
      });
      return [];
    }
    
    const placesData = await placesResponse.json();
    console.log('Places API response:', placesData);
    const places = placesData.places || [];
    console.log(`Found ${places.length} places`);
    
    // Map places to routes
    const placeRoutes = places.map((place: Place) => {
      const categoryPath = place.category === 'activity' ? 'activities' :
                         place.category === 'restaurant' ? 'restaurants' :
                         place.category === 'attraction' ? 'attractions' :
                         place.category === 'event' ? 'events' : 'other';
      
      return {
        path: `/${categoryPath}/${place.slug}`,
        priority: 0.9,
        changeFrequency: place.category === 'event' ? 'daily' : 'weekly',
        lastModified: place.updated_at ? new Date(place.updated_at) : new Date(),
      };
    });
    
    console.log('Generated place routes:', placeRoutes);
    
    // Fetch neighborhoods
    const neighborhoodsUrl = `${baseUrl}/neighborhoods`;
    console.log('Fetching neighborhoods from:', neighborhoodsUrl);
    const neighborhoodsResponse = await fetch(neighborhoodsUrl, {
      cache: 'no-store', // Disable caching for debugging
    });
    
    if (!neighborhoodsResponse.ok) {
      console.error('Failed to fetch neighborhoods:', {
        status: neighborhoodsResponse.status,
        statusText: neighborhoodsResponse.statusText,
        url: neighborhoodsResponse.url
      });
      return placeRoutes; // Return what we have so far
    }
    
    const neighborhoodsData = await neighborhoodsResponse.json();
    console.log('Neighborhoods API response:', neighborhoodsData);
    const neighborhoods = neighborhoodsData.neighborhoods || [];
    console.log(`Found ${neighborhoods.length} neighborhoods`);
    
    // Map neighborhoods to routes
    const neighborhoodRoutes = neighborhoods.map((neighborhood: Neighborhood) => ({
      path: `/neighborhoods/${neighborhood.slug}`,
      priority: 0.8,
      changeFrequency: 'monthly',
      lastModified: new Date(),
    }));
    
    console.log('Generated neighborhood routes:', neighborhoodRoutes);
    
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